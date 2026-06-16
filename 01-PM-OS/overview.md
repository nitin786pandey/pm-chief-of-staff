# PM OS — Overview

## What it is

PM OS is a Markdown-first operating system for product managers, powered by Claude. Four scheduled runs fire automatically every weekday. They share a persistent memory layer — six files with stable cross-referenced IDs — that grows more accurate over time.

Think of it as a second brain that never forgets what you committed to, why you made a decision, or what your customers said last week.

---

## The Operating Contract

The entire system is governed by a single authority document: **the Operating Contract**. It defines:

- Which runs are allowed to write memory (and which are not)
- Canonical file paths and filename formats for every artifact
- Required output sections — sections that must always appear, even when empty
- Memory entry schemas — every field, every ID format
- What the validator enforces

If any file or prompt disagrees with the Operating Contract, the Contract wins. This makes the system predictable and auditable.

---

## Run Ownership

| Run | When | Reads Memory | Writes Memory | Mode |
|-----|------|-------------|---------------|------|
| **Fireflies Harvest** | Nightly, 1 AM | — | ✅ Yes | Data ingestion |
| **Morning Brief** | 6 AM weekdays | ✅ Yes | ❌ Never | Read-only |
| **Evening Debrief** | 6–8 PM weekdays | ✅ Yes | ✅ Yes | Write-enabled |
| **Weekly Radar** | Saturday | ✅ Yes | ✅ Yes | Write-enabled |

**Write policy is enforced, not optional.** Morning Brief reads every memory file but is not allowed to mutate any of them. It may propose changes, but only Evening and Weekly runs execute write-backs. This prevents corrupted state from a run that fired while context was incomplete.

---

## Memory Files

Six persistent Markdown files. Each uses stable IDs so the AI can cross-reference across runs.

| File | Purpose | ID format |
|------|---------|-----------|
| `Open Loops.md` | Every active commitment and follow-up — the source of truth | `L-###` |
| `Decision Ledger.md` | Significant product decisions with rationale, alternatives, and revisit triggers | `D-###` |
| `Risk Register.md` | Active risks with evidence, mitigation, and escalation criteria | `R-###` |
| `Stakeholder Heatmap.md` | Relationship trust-state and wait-state per stakeholder | `S-###` |
| `Customer Themes.md` | Recurring customer signals with source count and weight | `T-###` |
| `Customer Insights — Latest.md` | Rolling 7-day window of processed meeting summaries | — |

### Cross-file linking

Stable IDs mean the system can reason across files. A risk (`R-005`) links to the decision that created it (`D-009`), which links to the open loop tracking its resolution (`L-021`), which links to the customer theme that motivated it (`T-003`). The AI doesn't re-derive this graph every run — it's encoded directly in the files and validated by the schema checker.

---

## Detection Rules

The Evening Debrief and Weekly Radar run four automatic detection checks before writing output:

### 🔴 SYSTEMIC
Triggered when an issue appears in 2+ distinct sources within a 7-day window. Sources count independently: Slack, Jira, Gmail, Calendar, Meeting Notes, Customer signal. When triggered: synthesize the root cause, flag the Risk Register, escalate priority.

### 🟠 COMMITMENT DRIFT
Triggered when a commitment made verbally (in a meeting or Slack) is not reflected in any tracked system within 24 hours. When triggered: surface in Morning Brief under open loops with source and age. Escalate if 48h+ unresolved.

### 🟠 DECISION DRIFT
Triggered when a significant product decision is made but not documented in the Decision Ledger within 48 hours. Significance test: would a new team member need to know this to do their job? If yes, it's significant. When triggered: flag in Evening Debrief, propose write-back.

### 🔴 TRUST RISK
Triggered when a stakeholder has been waiting on a response for 72+ hours. Sources: Slack DMs, meeting action items, Jira comments. When triggered: flag prominently in Morning Brief, draft a suggested reply.

---

## Evening Debrief — Two Modes

The Evening Debrief runs in one of two modes, selected automatically:

**Lightweight mode** (heavy days): Fires in under 2 minutes. Reads only today's brief and Open Loops. Produces a minimal but complete artifact — scorecard, carry-forward, and a note that no memory mutations were applied. Does not run Jira sub-agents, Slack fetches, or Granola in this mode.

**Full mode** (standard days): Reads all memory files in parallel, then fetches live data from Gmail, Calendar, Slack, Jira (via 4 parallel sub-agents), Fireflies, and Granola. Runs detection checks. Produces the full debrief artifact and executes memory write-backs.

### Open Loops Reconfirmation

Every full Evening Debrief run includes an active reconfirmation pass on Open Loops:

1. Pull every loop with `Status: Open` or `In Progress`
2. Check one source per loop (Slack, Jira, Calendar, prior brief) for closure evidence
3. If closed → write `Status: ✅ CLOSED`, date, and resolution note
4. If older than 14 days with no `Last Touched` update → flag as `STALE`, add to Quick Questions
5. Write a summary to `Memory Write-Back`: how many closed, how many stale, how many active

This prevents phantom open loops from accumulating and creating false anxiety in morning briefs.

---

## Weekly Radar — Subagent Orchestration

The Weekly Radar uses a two-subagent architecture:

**Subagent A — Memory Reader:** Reads all six PM OS memory files in parallel and returns a structured digest — IDs, statuses, cross-file relationships, trend signals.

**Subagent B — Live Data Gatherer:** Fetches all week-scoped live data in parallel — Gmail, Slack, Jira (4 sub-agents running simultaneous JQL queries), Fireflies, Granola, and the week's Evening Debriefs.

Both subagents fire simultaneously. The orchestrator waits for both digests, then synthesizes across them — cross-referencing memory state against live signals to produce patterns that neither source reveals alone.

Output: 9 required sections covering commitment health, risk trajectory, stakeholder health, decision quality, work shape, product signal, next-week moves, PM growth reflection, and memory update confirmation.

---

## Schema Validation

A Python validator (`validate_pm_os.py`) enforces the Operating Contract automatically.

It fails on:
- Artifacts written to non-canonical paths
- Missing required output sections
- Morning briefs missing a `⚡` leverage priority
- Evening debriefs missing a close-rate line
- Action plans with more than 8 numbered items
- Duplicate operational dates in canonical folders
- Duplicate IDs within memory files
- `Related IDs` that don't resolve to existing entries

This means a malformed run output is caught before it corrupts the memory state the next run depends on.

---

## What a typical day looks like

```
7:00 AM  →  Read Morning Brief (auto-generated, already waiting)
             — Top priorities, ranked by urgency
             — Open loops due today
             — Overnight customer signals from meeting harvest
             — Active risks and decisions pending revisit
             — Suggested replies for stakeholders waiting 72h+

[ work happens ]

6:00 PM  →  Evening Debrief fires
             — Selects Full or Lightweight mode automatically
             — Fetches Jira, Slack, Calendar, Fireflies in parallel
             — Runs Open Loops reconfirmation
             — Runs SYSTEMIC / DRIFT / TRUST RISK detection
             — Produces Commitment Scorecard with close rate
             — Writes back to memory files

6:05 PM  →  Memory is updated
             Tomorrow's Morning Brief will read the corrected state
```

---

## Sample artifacts

- [Sample Morning Brief →](./sample-morning-brief.md)
- [Sample Evening Debrief →](./sample-evening-debrief.md)
- [Open Loops (sample) →](./sample-memory-files/open-loops.md)
- [Decision Ledger (sample) →](./sample-memory-files/decision-ledger.md)
- [Risk Register (sample) →](./sample-memory-files/risk-register.md)
