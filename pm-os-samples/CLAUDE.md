# CLAUDE.md — 01-PM-OS Section

> **Scope:** This file governs how Claude works within the `01-PM-OS/` section of the AI Workflow Showcase. It extends the master `CLAUDE.md` with rules specific to PM OS artifacts.

---

## What This Section Demonstrates

The PM OS section shows the **persistent memory + daily rhythm** layer of the workflow. Visitors should understand:

1. What a Morning Brief looks like — structure, depth, what it draws from
2. What an Evening Debrief looks like — plan vs. reality, memory write-back pattern
3. How memory files work — stable IDs, cross-referencing, the write-ownership model

Every artifact here is a sanitized sample. The format, field names, and ID conventions are identical to the live system.

---

## Memory File Rules

### Stable ID conventions

All memory file entries must use the correct ID prefix. These are fictional but structurally accurate:

| File | ID prefix | Example |
|------|-----------|---------|
| Open Loops | `L-###` | `L-014` |
| Decision Ledger | `D-###` | `D-009` |
| Risk Register | `R-###` | `R-005` |
| Stakeholder Heatmap | `S-###` | `S-003` |
| Customer Themes | `T-###` | `T-003` |
| PM Growth Log | `P-###` | `P-007` |

IDs must be unique within each file. Never reuse an ID even if an entry is resolved or superseded.

### Cross-referencing

Every memory entry should reference related entries using their stable IDs in a `Related:` field. This is one of the key things the showcase demonstrates — the knowledge graph property of the system.

**Example:** A risk entry (`R-005`) should reference the decision that created the risk (`D-009`) and the open loop tracking its mitigation (`L-021`).

### Write ownership model

When editing or adding to memory file samples, preserve this distinction:

- **Resolved/Closed entries** move to a `## Closed / Resolved` section — never deleted
- **New entries** are added at the top of the `## Active` section
- **Updated entries** show `Last updated:` with a `[Run type, Date]` annotation — e.g. `[Evening Debrief, Date]`

This models the actual system behavior where only certain scheduled runs can mutate memory.

---

## Daily Brief Rules

### Morning Brief format

Every Morning Brief sample must include these sections in order:

1. **Today's Priority Stack** — table of P0/P1/P2 items with "why it's hot" column
2. **Overnight Customer Signals** — from Fireflies harvest, with theme cross-references (`T-###`)
3. **Open Loops Due Today** — filtered view of `open-loops.md`, today's due items only
4. **Active Risks to Watch** — filtered view of `risk-register.md`, high + medium level
5. **Decisions Pending Revisit** — from `decision-ledger.md`, where revisit trigger has fired
6. **Yesterday's Debrief Summary** — one-paragraph recap of what the evening run captured

The header must include the auto-generation timestamp and source list.

### Evening Debrief format

Every Evening Debrief sample must include these sections in order:

1. **Plan vs. Reality** — table comparing what was planned (from morning brief) vs. what happened
2. **Key Events / Decisions Made** — structured decision entries ready for Decision Ledger
3. **Memory Write-Back** — explicit table of Open Loop, Risk, and Decision mutations
4. **Customer Signal Update** — any new signals from the day not yet in Fireflies
5. **Reflection** — what went well, what could be better, one thing to carry forward

The header must note that it is write-enabled and list the memory files it will mutate.

---

## Adding New Sample Artifacts

### New memory file sample (e.g. Stakeholder Heatmap, Customer Themes)

1. Create the file in `sample-memory-files/`
2. Include at least 3 active entries with cross-references
3. Include at least 2 resolved/closed entries in a trailing section
4. Link from `overview.md`

### New brief variant (e.g. Weekly Radar sample)

1. Create the file directly in `01-PM-OS/` (not in `sample-memory-files/`)
2. Follow the same header convention: auto-generation timestamp, sources read, write status
3. Link from `overview.md`

---

## Placeholder Conventions (this section)

Beyond the master CLAUDE.md conventions, use these patterns consistently in PM OS artifacts:

| What | Format |
|------|--------|
| Feature being tracked | `[Feature X]`, `[Feature Z]`, `[Feature X Lite]` |
| Initiatives | `[Initiative Y]` |
| Stakeholders | `[Stakeholder A]`, `[Stakeholder B]`, `[Engineering Lead]`, `[Design Lead]` |
| Teams | `[Team A]`, `[Team B]`, `[Team C]` |
| Customer segments | `[Segment A]`, `[Segment B]`, `[Segment C]` |
| Tool names | Generic names are fine (`Fireflies`, `Slack`, `Jira`, `Notion`) |
| Capabilities / approaches | `[Capability A]`, `[Approach A]`, `[Approach B]` |

---

## Files in This Section

| File | What it shows |
|------|--------------|
| `overview.md` | How PM OS works — scheduled runs table, memory file index, sample day walkthrough |
| `sample-morning-brief.md` | Full morning brief with all required sections |
| `sample-evening-debrief.md` | Full evening debrief with memory write-back |
| `sample-memory-files/open-loops.md` | Active + closed loops with cross-references |
| `sample-memory-files/decision-ledger.md` | Active + superseded decisions with rationale |
| `sample-memory-files/risk-register.md` | Active + resolved risks with mitigation links |
