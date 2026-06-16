import fs from 'fs-extra';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const VALID_RUNS = ['morning', 'evening', 'weekly'];

export async function run(runType) {
  if (!VALID_RUNS.includes(runType)) {
    console.error(chalk.red(`Unknown run type: "${runType}"`));
    console.error(`Valid options: ${VALID_RUNS.join(', ')}`);
    process.exit(1);
  }

  const cwd = process.cwd();
  const configPath = path.join(cwd, '.pm-chief', 'config.json');

  if (!await fs.pathExists(configPath)) {
    console.error(chalk.red('pm-chief is not initialised in this directory.'));
    console.error('Run: pm-chief init');
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error(chalk.red('ANTHROPIC_API_KEY not set. Add it to .env'));
    process.exit(1);
  }

  console.log(chalk.bold(`\nFiring ${runType} run...\n`));

  const prompt = await buildPrompt(runType, cwd, config);
  const today = new Date().toISOString().split('T')[0];
  const outputDir = getOutputDir(runType, cwd);
  const outputFile = getOutputFilename(runType, today);
  const outputPath = path.join(outputDir, outputFile);

  await fs.ensureDir(outputDir);

  const client = new Anthropic({ apiKey });

  process.stdout.write(chalk.dim('Streaming response...\n\n'));

  let fullText = '';

  const stream = await client.messages.stream({
    model: 'claude-opus-4-8',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      process.stdout.write(chunk.delta.text);
      fullText += chunk.delta.text;
    }
  }

  console.log('\n');

  await fs.writeFile(outputPath, fullText);
  console.log(chalk.green(`✓ Saved to ${path.relative(cwd, outputPath)}`));

  // Update last-run timestamp in config
  config.lastRun = config.lastRun || {};
  config.lastRun[runType] = new Date().toISOString();
  await fs.writeJson(configPath, config, { spaces: 2 });
}

function getOutputDir(runType, cwd) {
  const map = {
    morning: 'Daily Briefs/Morning Briefs',
    evening: 'Daily Briefs/Evening Debriefs',
    weekly: 'Daily Briefs/Weekly Radars'
  };
  return path.join(cwd, map[runType]);
}

function getOutputFilename(runType, today) {
  const map = {
    morning: `${today}-Morning-Briefing.md`,
    evening: `${today}-Evening-Debrief.md`,
    weekly: `${today}-Weekly-PM-Radar.md`
  };
  return map[runType];
}

async function buildPrompt(runType, cwd, config) {
  const memoryDir = path.join(cwd, 'pm-os');
  const memoryFiles = [
    'open-loops.md',
    'decision-ledger.md',
    'risk-register.md',
    'stakeholder-heatmap.md',
    'customer-themes.md',
    'customer-insights-latest.md'
  ];

  // Read memory files that exist
  const memoryContext = [];
  for (const file of memoryFiles) {
    const filePath = path.join(memoryDir, file);
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf8');
      memoryContext.push(`## ${file}\n\n${content}`);
    }
  }

  const confirmedConnectors = Object.entries(config.connectors || {})
    .filter(([, v]) => v === 'confirmed')
    .map(([k]) => k);

  const today = new Date().toLocaleString('en-US', { timeZone: config.timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const promptDir = path.join(cwd, '.pm-chief', 'prompts');
  const promptFile = path.join(promptDir, `${runType}.md`);

  let systemPrompt = '';
  if (await fs.pathExists(promptFile)) {
    systemPrompt = await fs.readFile(promptFile, 'utf8');
  } else {
    systemPrompt = getDefaultPrompt(runType);
  }

  return `${systemPrompt}

---

## Context

**Date:** ${today}
**Timezone:** ${config.timezone}
**Connected tools:** ${confirmedConnectors.length ? confirmedConnectors.join(', ') : 'none confirmed — running from memory files only'}

---

## Memory Files

${memoryContext.length ? memoryContext.join('\n\n---\n\n') : '_No memory files found. This is your first run._'}
`;
}

function getDefaultPrompt(runType) {
  const prompts = {
    morning: `You are a Chief of Staff AI running the Morning Brief.

Read the memory files provided and produce a structured morning brief. Output format:

# Morning Brief — [DATE]

## Priority Stack (max 5 items; mark one as ⚡ leverage move)
## Open Loops Due Today
## System Alerts (COMMITMENT DRIFT / TRUST RISK / SYSTEMIC — only if triggered)
## Active Risks (with trend direction ↑↓→)
## Decisions Pending Revisit
## Suggested Replies (stakeholders waiting 72h+)
## Action Plan (max 8 items)

Rules:
- This is READ-ONLY. Do not suggest memory file changes.
- At least one priority must be marked ⚡ as a leverage move.
- Write as if the PM is reading this at 6 AM — concise, oriented, no fluff.`,

    evening: `You are a Chief of Staff AI running the Evening Debrief.

Read the memory files provided and produce a structured evening debrief. Output format:

# Evening Debrief — [DATE]

## Commitment Scorecard
## Detection Check Results (COMMITMENT DRIFT / DECISION DRIFT / TRUST RISK / SYSTEMIC)
## Open Loops Reconfirmation (check each loop — close confirmed, flag stale 14d+)
## Day Shape (meeting hours vs deep work, reactive vs proactive)
## Memory Files Updated
_List each file updated with what changed_

Rules:
- This is WRITE-ENABLED. Propose specific updates to memory files.
- Run all four detection checks. Show results even if none triggered.
- The "Memory Files Updated" section is required and must never be omitted.`,

    weekly: `You are a Chief of Staff AI running the Weekly PM Radar.

Read the memory files provided and produce a structured weekly synthesis. Output format:

# Weekly PM Radar — [DATE]

## Commitment Health (week summary)
## Risk Trajectory
## Stakeholder Health
## Decision Quality
## Work Shape
## Product Signal (from customer themes)
## Five High-Leverage Moves for Next Week
## PM Growth Reflection
## Memory Files Updated

Rules:
- This is WRITE-ENABLED. Propose specific updates to memory files.
- Surface patterns across the week, not just today.
- Five high-leverage moves must be specific and actionable.`
  };
  return prompts[runType];
}
