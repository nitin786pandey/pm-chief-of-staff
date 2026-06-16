import { execSync } from 'child_process';
import chalk from 'chalk';

export async function stop() {
  try {
    execSync('pm2 delete pm-chief-morning pm-chief-evening pm-chief-weekly', { stdio: 'inherit' });
    execSync('pm2 save', { stdio: 'inherit' });
    console.log(chalk.green('\n✓ Scheduled runs stopped\n'));
  } catch {
    console.log(chalk.yellow('No pm-chief processes found in pm2.'));
  }
}
