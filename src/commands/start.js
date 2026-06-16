import { execSync, spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function start() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, '.pm-chief', 'config.json');

  if (!await fs.pathExists(configPath)) {
    console.error(chalk.red('pm-chief is not initialised. Run: pm-chief init'));
    process.exit(1);
  }

  // Check pm2 is available
  try {
    execSync('which pm2', { stdio: 'ignore' });
  } catch {
    console.error(chalk.red('pm2 is required for scheduled runs.'));
    console.error('Install it: npm install -g pm2');
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  const tz = config.timezone || 'UTC';

  // Write pm2 ecosystem file
  const ecosystemPath = path.join(cwd, '.pm-chief', 'ecosystem.config.cjs');
  const pmChiefBin = process.argv[1]; // path to the currently running pm-chief bin

  const ecosystem = `module.exports = {
  apps: [
    {
      name: 'pm-chief-morning',
      script: '${pmChiefBin}',
      args: 'run morning',
      cwd: '${cwd}',
      cron_restart: '0 6 * * 1-5',
      autorestart: false,
      watch: false,
      env: { TZ: '${tz}' }
    },
    {
      name: 'pm-chief-evening',
      script: '${pmChiefBin}',
      args: 'run evening',
      cwd: '${cwd}',
      cron_restart: '0 18 * * 1-5',
      autorestart: false,
      watch: false,
      env: { TZ: '${tz}' }
    },
    {
      name: 'pm-chief-weekly',
      script: '${pmChiefBin}',
      args: 'run weekly',
      cwd: '${cwd}',
      cron_restart: '0 3 * * 6',
      autorestart: false,
      watch: false,
      env: { TZ: '${tz}' }
    }
  ]
};
`;

  await fs.writeFile(ecosystemPath, ecosystem);

  try {
    execSync(`pm2 start ${ecosystemPath}`, { stdio: 'inherit', cwd });
    execSync('pm2 save', { stdio: 'inherit' });
    console.log(chalk.green('\n✓ Scheduled runs registered with pm2'));
    console.log(chalk.dim('  Morning Brief:  weekdays 6:00 AM'));
    console.log(chalk.dim('  Evening Debrief: weekdays 6:00 PM'));
    console.log(chalk.dim(`  Weekly Radar:   Saturday 3:00 AM`));
    console.log(chalk.dim(`  Timezone: ${tz}\n`));
    console.log('View status: pm-chief status');
    console.log('Stop:        pm-chief stop\n');
  } catch (err) {
    console.error(chalk.red('Failed to start pm2 processes:'), err.message);
    process.exit(1);
  }
}
