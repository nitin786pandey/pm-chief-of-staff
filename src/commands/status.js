import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function status() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, '.pm-chief', 'config.json');

  if (!await fs.pathExists(configPath)) {
    console.error(chalk.red('pm-chief is not initialised. Run: pm-chief init'));
    return;
  }

  const config = await fs.readJson(configPath);

  console.log(chalk.bold('\npm-chief status\n'));
  console.log(`Timezone:  ${config.timezone}`);
  console.log(`Initiated: ${config.initialised}\n`);

  // Connector status
  console.log(chalk.bold('Connectors'));
  const connectors = ['slack', 'jira', 'notion', 'fireflies', 'granola', 'gmail', 'google-calendar'];
  for (const c of connectors) {
    const st = config.connectors?.[c];
    const icon = st === 'confirmed' ? chalk.green('✅') : st === 'skipped' ? chalk.yellow('⏭ ') : chalk.dim('⚠️ ');
    const label = st === 'confirmed' ? 'confirmed' : st === 'skipped' ? 'skipped' : 'not set up';
    console.log(`  ${icon}  ${c.padEnd(18)} ${label}`);
  }

  // Last run times
  if (config.lastRun) {
    console.log(chalk.bold('\nLast runs'));
    for (const [type, ts] of Object.entries(config.lastRun)) {
      console.log(`  ${type.padEnd(10)} ${ts}`);
    }
  }

  // pm2 status
  console.log(chalk.bold('\npm2 processes'));
  try {
    const out = execSync('pm2 jlist', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const procs = JSON.parse(out).filter(p => p.name?.startsWith('pm-chief-'));
    if (procs.length === 0) {
      console.log(chalk.dim('  No pm2 processes found. Run: pm-chief start'));
    } else {
      for (const p of procs) {
        const statusColor = p.pm2_env?.status === 'online' ? chalk.green : chalk.yellow;
        console.log(`  ${statusColor(p.pm2_env?.status?.padEnd(8))}  ${p.name}`);
      }
    }
  } catch {
    console.log(chalk.dim('  pm2 not available or not running'));
  }

  console.log('');
}
