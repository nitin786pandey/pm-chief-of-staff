#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'init': {
      const { init } = await import('../src/commands/init.js');
      await init();
      break;
    }
    case 'run': {
      const { run } = await import('../src/commands/run.js');
      await run(args[0]);
      break;
    }
    case 'start': {
      const { start } = await import('../src/commands/start.js');
      await start();
      break;
    }
    case 'stop': {
      const { stop } = await import('../src/commands/stop.js');
      await stop();
      break;
    }
    case 'status': {
      const { status } = await import('../src/commands/status.js');
      await status();
      break;
    }
    case '--version':
    case '-v': {
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const pkg = require('../package.json');
      console.log(pkg.version);
      break;
    }
    default: {
      printHelp();
    }
  }
}

function printHelp() {
  console.log(`
pm-chief — AI Chief of Staff for PMs

COMMANDS
  pm-chief init          Scaffold pm-chief in the current workspace
  pm-chief run morning   Fire the Morning Brief now
  pm-chief run evening   Fire the Evening Debrief now
  pm-chief run weekly    Fire the Weekly Radar now
  pm-chief start         Start scheduled runs via pm2 (auto-cron)
  pm-chief stop          Stop scheduled runs
  pm-chief status        Show cron status and last run times

ONBOARDING
  After init, open Claude Code and run:
    /onboard

  This walks through connecting Slack, Jira, Notion, Fireflies,
  Granola, Gmail, and Google Calendar via MCP.

FLAGS
  --version, -v          Print version
`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
