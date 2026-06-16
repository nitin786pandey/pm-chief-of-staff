# PM Chief of Staff

> An AI Chief of Staff for product managers — scheduled morning briefs, evening debriefs, persistent memory, and connected tools via Claude Code.

```bash
npm install -g pm-chief
cd your-pm-workspace
pm-chief init
# then open Claude Code and run /onboard
```

> **What this is:** A live, working system where AI acts as a Chief of Staff across my entire product management workflow — connected to real tools, governed by an Operating Contract, running on a schedule, and maintaining persistent memory across days and weeks.
>
> **What this is not:** A demo or prototype. Every component reflects how I actually work today.

---

## The Core Idea

Most PMs use AI like a search engine — ask a question, get an answer, move on. I built something different: **a governed, persistent operating system** where AI is woven into the daily rhythm of PM work.

It does four things that most AI setups don't:

1. **Remembers across time** — decisions, risks, commitments, and customer signals are stored in structured memory files with stable cross-referenced IDs that every scheduled run reads and writes back to.
2. **Connects to real tools** — reads and writes across Slack, Jira, Notion, Fireflies, Granola, Gmail, and Google Calendar — not just chat windows.
3. **Runs on a schedule** — morning briefs, evening debriefs, competitive intel harvests, and weekly syntheses fire automatically without any prompting.
4. **Enforces rules** — an Operating Contract defines write ownership, required output sections, and memory schemas. A Python validator enforces it after every run.

---

## System Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CONNECTED TOOLS                             │
│  Fireflies · Granola · Slack · Jira · Notion · Gmail · Calendar      │
└─────────────────────────────────┬────────────────────────────────────┘
                                  │ reads / writes via MCP
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       SCHEDULED RUNS (AI Layer)                      │
│                                                                      │
│  Fireflies Harvest (1AM)     Morning Brief (6AM) — read-only         │
│  Evening Debrief (6PM)       Weekly Radar (Sat) — subagent pair      │
│                                                                      │
│  On-Demand: spec writing · sprint planning · stakeholder updates     │
└──────────────┬──────────────────────────────────────┬───────────────┘
               │ reads / writes memory                │ writes artifacts
               ▼  governed by Operating Contract      ▼
┌──────────────────────────────┐  ┌───────────────────────────────────┐
│        PM OS / MEMORY        │  │           Daily Briefs/            │
│                              │  │                                   │
│  Open Loops      (L-###)     │  │  Morning Briefs/                  │
│  Decision Ledger (D-###)     │  │    YYYY-MM-DD-Morning-Briefing.md │
│  Risk Register   (R-###)     │  │  Evening Debriefs/                │
│  Stakeholder     (S-###)     │  │    YYYY-MM-DD-Evening-Debrief.md  │
│  Customer Themes (T-###)     │  │  Weekly Radars/                   │
│  Customer Insights (7-day)   │  │    YYYY-MM-DD-Weekly-PM-Radar.md  │
└──────────────────────────────┘  └───────────────────────────────────┘
               │
               ▼
      Python schema validator
  (enforces Operating Contract after every write)
```

---

## What Makes This Different

### Operating Contract
A single authority document governs the entire system — canonical artifact paths, required output sections, memory entry schemas, and write ownership. If any run or file disagrees with the Contract, the Contract wins.

### Write Ownership Is Enforced
Morning Brief is strictly read-only. It reads all six memory files but cannot mutate any of them. Only Evening Debrief and Weekly Radar can write. This prevents corrupted state from a run that fired with incomplete context.

### Detection Rules
Four automatic checks run in every Evening Debrief and Weekly Radar:
- 🔴 **SYSTEMIC** — same issue in 2+ distinct sources within 7 days → escalate, find root cause
- 🟠 **COMMITMENT DRIFT** — verbal commitment not in any tracked system within 24h → surface with source and age
- 🟠 **DECISION DRIFT** — significant decision not documented within 48h → propose write-back
- 🔴 **TRUST RISK** — stakeholder waiting 72h+ → flag, draft suggested reply

### Open Loops Reconfirmation
Every full Evening Debrief actively checks each open loop against a live source (Slack, Jira, Calendar). Confirmed-done loops are closed with a resolution note. Loops older than 14 days with no signal are flagged as stale. This prevents phantom open items from accumulating and creating false anxiety each morning.

### Subagent Orchestration
The Weekly Radar fires two subagents simultaneously — one reads all memory files in parallel, one fetches all week-scoped live data (Gmail, Slack, Jira via 4 parallel JQL queries, Fireflies, Granola, and the week's Evening Debriefs). The orchestrator synthesizes across both digests to surface patterns neither source reveals alone.

### Schema Validation
A Python validator runs after every write. It fails on missing required sections, duplicate IDs, unresolvable cross-references, artifacts in non-canonical paths, and output that violates the Operating Contract.

---

## What's in This Repo

| Section | What it shows |
|---------|--------------|
| [`pm-os-samples/`](./pm-os-samples/overview.md) | Full PM OS overview — memory layer, detection rules, write ownership, validation |
| [`pm-os-samples/sample-morning-brief.md`](./pm-os-samples/sample-morning-brief.md) | Sample brief with system alerts, suggested replies, ⚡ leverage priority |
| [`pm-os-samples/sample-evening-debrief.md`](./pm-os-samples/sample-evening-debrief.md) | Sample debrief with reconfirmation pass, detection checks, memory write-back |
| [`pm-os-samples/sample-memory-files/`](./pm-os-samples/sample-memory-files/) | Open Loops, Decision Ledger, Risk Register with cross-referenced IDs |
| [`connected-tools/`](./connected-tools/connected-tools.md) | How the AI reads/writes across each connected tool |
| [`competitive-intel/`](./competitive-intel/overview.md) | Automated daily competitor signal harvesting + weekly synthesis pipeline |
| [`SHOWCASE.md`](./SHOWCASE.md) | Full narrative — start here |

---

## Technical Stack

| Component | Detail |
|-----------|--------|
| **AI** | Claude (Anthropic) |
| **Scheduling** | Cron-based scheduled tasks (IST timezone) |
| **Tool connections** | MCP (Model Context Protocol) per connected app |
| **Memory** | Markdown files with stable IDs — `L-###`, `D-###`, `R-###`, `S-###`, `T-###` |
| **Governance** | Operating Contract (Markdown authority document) |
| **Validation** | Python validator — enforces Contract after every write |
| **Multi-agent** | Parallel sub-agents for Jira queries and weekly memory/data reads |

---

Start with **[SHOWCASE.md](./SHOWCASE.md)** for the full story, or jump directly into any section.
