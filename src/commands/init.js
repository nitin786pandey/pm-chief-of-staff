import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { input, confirm } from '@inquirer/prompts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCAFFOLD_DIR = path.resolve(__dirname, '../../scaffold');

export async function init() {
  const cwd = process.cwd();

  console.log(chalk.bold('\npm-chief init\n'));
  console.log('This will scaffold the PM Chief of Staff system in:');
  console.log(chalk.cyan(cwd));
  console.log('');

  const proceed = await confirm({ message: 'Continue?', default: true });
  if (!proceed) {
    console.log('Aborted.');
    return;
  }

  // Check for existing install
  const configPath = path.join(cwd, '.pm-chief', 'config.json');
  if (await fs.pathExists(configPath)) {
    const overwrite = await confirm({
      message: chalk.yellow('pm-chief is already initialised here. Re-scaffold? (existing memory files will not be overwritten)'),
      default: false
    });
    if (!overwrite) return;
  }

  // Collect timezone
  const timezone = await input({
    message: 'Your timezone (e.g. Asia/Kolkata, America/New_York):',
    default: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  // Collect Anthropic API key
  const apiKey = await input({
    message: 'Anthropic API key (stored in .env, never committed):',
    validate: v => v.startsWith('sk-ant-') ? true : 'Key should start with sk-ant-'
  });

  console.log(chalk.dim('\nScaffolding workspace...'));

  // Copy scaffold (skip existing memory files)
  await fs.copy(SCAFFOLD_DIR, cwd, {
    overwrite: false,
    filter: src => {
      // Never overwrite existing memory files — they may have real data
      if (src.includes('/pm-os/') && !src.endsWith('/pm-os')) return !fs.pathExistsSync(src.replace(SCAFFOLD_DIR, cwd));
      return true;
    }
  });

  // Write .pm-chief/config.json
  await fs.ensureDir(path.join(cwd, '.pm-chief'));
  await fs.writeJson(path.join(cwd, '.pm-chief', 'config.json'), {
    version: '0.1.0',
    timezone,
    connectors: {},
    initialised: new Date().toISOString()
  }, { spaces: 2 });

  // Write .env (append, don't overwrite)
  const envPath = path.join(cwd, '.env');
  const envLine = `ANTHROPIC_API_KEY=${apiKey}\n`;
  if (await fs.pathExists(envPath)) {
    const existing = await fs.readFile(envPath, 'utf8');
    if (!existing.includes('ANTHROPIC_API_KEY')) {
      await fs.appendFile(envPath, '\n' + envLine);
    }
  } else {
    await fs.writeFile(envPath, envLine);
  }

  // Ensure .gitignore covers sensitive files
  const gitignorePath = path.join(cwd, '.gitignore');
  const gitignoreLines = ['.env', '.pm-chief/'];
  if (await fs.pathExists(gitignorePath)) {
    const existing = await fs.readFile(gitignorePath, 'utf8');
    const toAdd = gitignoreLines.filter(l => !existing.includes(l));
    if (toAdd.length) await fs.appendFile(gitignorePath, '\n' + toAdd.join('\n') + '\n');
  } else {
    await fs.writeFile(gitignorePath, gitignoreLines.join('\n') + '\n');
  }

  console.log(chalk.green('\n✓ Workspace scaffolded'));
  console.log(chalk.green('✓ .env written (gitignored)'));
  console.log(chalk.green('✓ .pm-chief/config.json written\n'));

  console.log(chalk.bold('Next step:'));
  console.log('  Open Claude Code in this directory and run:');
  console.log(chalk.cyan('  /onboard'));
  console.log('');
  console.log('  This walks you through connecting Slack, Jira, Notion,');
  console.log('  Fireflies, Granola, Gmail, and Google Calendar via MCP.\n');
}
