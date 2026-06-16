# How I Use AI to Run My PM Workflow

**A walkthrough of a live, connected, scheduled AI operating system for product management**

---

## The Problem I Was Solving

Product management has two types of work: the actual thinking (what to build, why, for whom, in what order) and the meta-work that surrounds it — tracking commitments, updating stakeholders, reviewing competitor moves, synthesizing customer calls, maintaining documentation.

The meta-work is necessary but doesn't make the product better. And it compounds — miss a day of it and you're catching up on three.

I wanted to eliminate as much of the meta-work as possible. Not by ignoring it, but by having a system handle it automatically so I could focus on the thinking.

The result is what I call **PM OS** — a persistent, connected, scheduled AI operating system that runs alongside my workday.

---

## What It Does

Every morning, a brief is waiting for me — already pulled from my open commitments, active risks, past decisions, and overnight customer call transcripts. Throughout the day, I can ask Claude to search Slack, create Jira tickets from specs, update Notion pages, or do a competitive deep dive. Every evening, a debrief runs automatically — it compares what I planned against what happened, runs detection checks for drift and risk, updates my memory files, and sets up the next morning. I don't prompt any of this. It runs on a schedule.

---

## The Architecture

### Layer 1 — connected-tools

Claude has live read/write access to the tools I use every day:

| Tool | What Claude reads | What Claude writes |
|------|------------------|--------------------|
| **Fireflies + Granola** | Meeting transcripts and AI summaries | — |
| **Slack** | Channel messages, threads, search | Drafted messages (with approval) |
| **Jira** | Issue status, epic structure, search | New tickets, comments, status updates |
| **Notion** | Project pages, PRDs, docs | Status updates, new content |
| **Google Calendar** | Today's events, availability | — |
| **Gmail** | Inbound/outbound threads | — |

Each connection uses **MCP (Model Context Protocol)** — a standardized protocol that keeps credentials secure and actions auditable.

---

### Layer 2 — The Operating Contract

The entire system is governed by a single authority document: the Operating Contract. It defines:

- Which runs are allowed to write memory (and which are strictly read-only)
- Canonical artifact paths and filename formats
- Required output sections — sections that must always appear, even when empty
- Memory entry schemas — every field, every stable ID format
- What the validator enforces

**Write ownership is explicit and enforced:** Morning Brief reads every memory file but is not allowed to mutate any of them. Only Evening Debrief and Weekly Radar can write. This prevents corrupted state from a run that fired with incomplete context.

---

### Layer 3 — Four Scheduled Runs

**Fireflies Harvest (1 AM nightly)**
Pulls the previous day's meeting transcripts from Fireflies and Granola. Extracts customer signals — pain points, feature requests, sentiment patterns. Writes structured summaries into `Customer Insights — Latest.md`. Every morning brief reads this file.

**Morning Brief (6 AM weekdays) — Read-only**
Reads all six memory files in parallel, plus today's calendar and overnight customer signals. Produces:
- A ranked priority stack (max 5 items; at least one must be marked ⚡ as a leverage move)
- Open loops due today, with age and source
- System alerts: COMMITMENT DRIFT, TRUST RISK, SYSTEMIC flags
- Active risks with trend direction
- Decisions pending revisit (when trigger conditions are active)
- Suggested replies for stakeholders waiting 72+ hours
- An action plan (max 8 items)

Morning Brief proposes memory updates but executes none. The Operating Contract enforces this.

**Evening Debrief (6–8 PM weekdays) — Write-enabled**
Selects between two modes automatically:

*Lightweight mode* (heavy days): Fires in under 2 minutes. Reads only today's brief and Open Loops. Produces a minimal but complete artifact. No Jira sub-agents, no Slack fetches, no external calls.

*Full mode* (standard days): Reads all memory files, then fetches live data in parallel — Gmail, Calendar, Slack, Jira (via 4 simultaneous JQL sub-agent queries), Fireflies, and Granola. Then:

1. Reconstructs the Commitment Scorecard (or reads from a triage file if one exists)
2. Runs four detection checks: COMMITMENT DRIFT, DECISION DRIFT, TRUST RISK, SYSTEMIC
3. Runs Open Loops Reconfirmation — actively checks each open loop against one live source for closure evidence; closes confirmed loops, flags stale ones (14+ days, no signal)
4. Computes Day Shape: meeting hours vs. deep work, reactive vs. proactive stance, context switching level
5. Writes back to memory files: closes loops, escalates risks, logs decisions, updates themes
6. Confirms `Memory files updated.` in the canonical output — this section is required and never omitted

**Weekly PM Radar (Saturday) — Write-enabled, Subagent Orchestration**
Uses a two-subagent architecture. Both subagents fire simultaneously:

*Subagent A — Memory Reader:* Reads all six PM OS memory files in parallel. Returns a structured digest: IDs, statuses, cross-file relationships, trend signals, and an empty PM Growth reflection template ready to fill.

*Subagent B — Live Data Gatherer:* Fetches all week-scoped live data in parallel — Gmail, Slack, Jira (4 more parallel JQL queries scoped to the week), Fireflies, Granola, and the week's Evening Debriefs.

The orchestrator waits for both digests, then synthesizes across them — producing patterns that neither source reveals alone. Output covers: commitment health, risk trajectory, stakeholder health, decision quality, work shape, product signal, five high-leverage moves for next week, and a PM growth reflection. Then writes back to all relevant memory files.

---

### Layer 4 — Persistent Memory

Six Markdown files with stable IDs. Every scheduled run reads from and writes to these files, creating continuity across days.

| Memory file | Purpose | ID format |
|-------------|---------|-----------|
| Open Loops | Active commitments and follow-ups | `L-###` |
| Decision Ledger | Product decisions with rationale, alternatives, and revisit triggers | `D-###` |
| Risk Register | Active risks with evidence, mitigation, and escalation criteria | `R-###` |
| Stakeholder Heatmap | Trust-state and wait-state per stakeholder | `S-###` |
| Customer Themes | Recurring signals with source count and weight | `T-###` |
| Customer Insights — Latest | Rolling 7-day meeting intelligence window | — |

**Cross-file linking:** Stable IDs mean the AI can cross-reference across files. A risk links to the decision that created it, which links to the open loop tracking its resolution, which links to the customer theme that motivated it. This isn't just note-taking — it's a live knowledge graph that the system actively maintains and validates.

---

### Layer 5 — Schema Validation

A Python validator enforces the Operating Contract after every run. It fails on:

- Artifacts written to non-canonical paths
- Missing required output sections
- Morning briefs missing a ⚡ leverage priority
- Evening debriefs missing a close-rate line
- Action plans exceeding 8 items
- Duplicate dates in canonical artifact folders
- Duplicate IDs within memory files
- `Related IDs` references that don't resolve to existing entries

A run that produces malformed output is caught before it corrupts the memory state the next run depends on.

---

### Layer 6 — Detection Rules

Four automatic detection checks run in every Evening Debrief and Weekly Radar:

**🔴 SYSTEMIC** — Triggered when an issue appears in 2+ distinct sources within 7 days. Sources count independently: Slack, Jira, Gmail, Calendar, meeting notes, customer signal. When triggered: synthesize root cause, escalate Risk Register, don't just log the symptom.

**🟠 COMMITMENT DRIFT** — Triggered when a verbal commitment isn't reflected in any tracked system within 24 hours. When triggered: surface in Morning Brief with source and age. Escalate at 48h+.

**🟠 DECISION DRIFT** — Triggered when a significant decision is made but not documented within 48 hours. Significance test: would a new team member need to know this? When triggered: propose Decision Ledger write-back.

**🔴 TRUST RISK** — Triggered when a stakeholder has been waiting 72+ hours. When triggered: flag in Morning Brief, draft a suggested reply.

---

### Layer 7 — On-Demand Skills

Beyond scheduled runs, I can invoke specialized workflows:

- **Write spec / PRD:** Structured question-by-question PRD builder with success criteria, measurement approach, and phase breakdown
- **Sprint planning:** Capacity-aware sprint plan with P0/P1/stretch breakdown
- **Stakeholder update:** Audience-tuned status message (exec brief, engineering detail, or customer-facing)
- **Competitive brief:** Deep dive on a feature area, pulling from the Intel Log and live sources
- **Synthesize research:** Turns interview notes or Slack threads into structured insight themes

---

## What a Day Looks Like

```
6:00 AM
  → Morning Brief is already waiting (generated overnight)
  → Ranked priorities, open loops, system alerts, suggested replies
  → 5 minutes of reading vs. 20+ minutes of manual archaeology

9:30 AM
  → Customer call — Fireflies records and transcribes automatically

11:00 AM
  → Engineering sync reveals a dependency issue
  → "Log a new decision — we're descoping [Feature X], reason is [Z]"
  → Claude writes to Decision Ledger, creates a Jira comment, drafts Slack update

6:00 PM
  → Evening Debrief fires automatically
  → Runs SYSTEMIC / DRIFT / TRUST RISK detection
  → Closes loops confirmed done, flags stale ones, escalates risks
  → Writes back to memory files
  → Morning Brief is already updated for tomorrow
```

---

## The competitive-intelligence System

Separate from PM OS but integrated with it, a competitive intel pipeline runs automatically:

**Daily (7:30 AM weekdays):** An orchestrator spawns parallel sub-agents — one per competitor — each fetching Tier 1 sources (changelogs, blogs, job posts, pricing pages). Results are merged, classified by category and confidence level, deduplicated against a `last-run.json` file, and written to a dated output file and an append-only Intel Log with stable `CI-###` IDs.

**Weekly (Friday evening):** A synthesis run reads the week's daily outputs, identifies cross-competitor patterns, surfaces strategic implications, and writes a weekly synthesis document.

When a competitive signal is strategically relevant, it's linked to PM OS entries — a risk, a decision under review, or a customer theme being validated.

---

## Technical Stack

| Component | Technology |
|-----------|-----------|
| AI | Claude (Anthropic) |
| Scheduling | Cron-based scheduled tasks (IST timezone) |
| Tool connections | MCP (Model Context Protocol) |
| Memory layer | Markdown files with stable IDs, local workspace |
| Schema validation | Python — enforces Operating Contract after every write |
| Multi-agent | Sub-agents for parallel source fetching and memory reads |
| Version control | Git (local) |

---

## What This Has Changed

**Before:** Most mornings started with 20–30 minutes of email/Slack/Jira archaeology — reconstructing what I said I'd do, what's at risk, what customers said last week.

**After:** Context is reconstructed overnight. I open one file and I'm oriented.

**Before:** Decisions and their rationale lived in my head or scattered across Notion pages. Revisit triggers existed only if I remembered to check.

**After:** Every significant decision is logged with rationale, alternatives considered, and a revisit trigger. The morning brief surfaces them when the trigger condition is active.

**Before:** Commitments made verbally in meetings would drift — no system caught them within 24 hours.

**After:** COMMITMENT DRIFT detection fires every evening. Untracked verbal commitments surface the next morning with source, age, and suggested action.

**The net effect:** More time on actual PM thinking, less on meta-work. And better institutional memory — not just for me, but for the AI that works with me.

---

## Explore the Samples

- [PM OS — Full overview, detection rules, and validation →](./pm-os-samples/overview.md)
- [Sample Morning Brief →](./pm-os-samples/sample-morning-brief.md)
- [Sample Evening Debrief (with reconfirmation pass + detection checks) →](./pm-os-samples/sample-evening-debrief.md)
- [Sample memory files →](./pm-os-samples/sample-memory-files/)
- [connected-tools →](./connected-tools/connected-tools.md)
- [competitive-intel Pipeline →](./competitive-intel/overview.md)
