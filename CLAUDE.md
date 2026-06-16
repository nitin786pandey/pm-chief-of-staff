# CLAUDE.md — AI Workflow Showcase Operating System

> **What this file is:** Instructions for how Claude operates within this showcase workspace. It defines routing logic, behavioral protocols, and quality standards. Every subfolder has its own scoped CLAUDE.md that extends these rules for that section's context.

---

## Purpose of This Workspace

This folder is a sanitized, public-facing showcase of an AI-augmented PM workflow. It contains sample artifacts that demonstrate structure, depth, and system design — not real company data.

**When working in this folder, Claude should:**
- Treat all `[placeholder]` content as intentionally abstract — do not fill in with real details
- Preserve the showcase's anonymity — no company names, real URLs, real person names, or product-specific details
- Follow the section-specific CLAUDE.md rules when working within a subfolder

---

## Workspace Structure

```
AI Workflow Showcase/
├── CLAUDE.md                          ← this file (master operating rules)
├── README.md                          ← entry point for visitors
├── SHOWCASE.md                        ← standalone narrative document
├── 01-PM-OS/
│   ├── CLAUDE.md                      ← PM OS section rules
│   ├── overview.md
│   ├── sample-morning-brief.md
│   ├── sample-evening-debrief.md
│   └── sample-memory-files/
│       ├── open-loops.md
│       ├── decision-ledger.md
│       └── risk-register.md
├── 02-Connected-Tools/
│   ├── CLAUDE.md                      ← Connected Tools section rules
│   └── connected-tools.md
└── 03-Competitive-Intel/
    ├── CLAUDE.md                      ← Competitive Intel section rules
    ├── overview.md
    ├── sample-daily-intel.md
    └── sample-weekly-synthesis.md
```

---

## Core Operating Principles

### 1. Showcase integrity first

All artifacts in this folder are sanitized samples. When adding or editing content:

- Use `[Placeholder]` format for any specific names, URLs, IDs, or company references
- Never introduce real data — not even as an "example" of what real data looks like
- Stable IDs (`L-###`, `D-###`, `R-###`, `CI-###`) are fictional but follow the real system's format exactly

### 2. Skills-first workflow

Before doing any substantive work in this folder:

```
Request → Check relevant CLAUDE.md → Load skills if needed → Execute
```

For document creation tasks (`.md`, `.docx`, `.pdf`), read the appropriate skill file first.

### 3. Complexity routing

| Level | Signals | Action |
|-------|---------|--------|
| **Trivial** | Editing a single placeholder, fixing formatting | Execute directly |
| **Moderate** | Adding a new sample artifact, updating README | Brief plan, then execute |
| **Complex** | Adding a new section, restructuring the showcase | Research existing structure first, then plan |

---

## Adding New Content

### Adding a new sample artifact

1. Decide which section it belongs to (`01-PM-OS/`, `02-Connected-Tools/`, `03-Competitive-Intel/`)
2. Read the subfolder's `CLAUDE.md` for section-specific rules
3. Create the file using `[Placeholder]` conventions throughout
4. Link it from the section's `overview.md` and update `README.md` if the section changes significantly

### Adding a new section

1. Create the folder (`04-New-Section/`)
2. Create a `CLAUDE.md` scoped to that section's rules
3. Create an `overview.md` explaining what the section demonstrates
4. Add sample artifacts
5. Update the master `README.md` table and the structure diagram in `SHOWCASE.md`

---

## Quality Standards

### Placeholder conventions

| What | Format | Example |
|------|--------|---------|
| Companies / competitors | `[Competitor A]`, `[Company Name]` | `[Competitor A] shipped a new feature` |
| People / stakeholders | `[Stakeholder A]`, `[Engineering Lead]` | `Confirmed with [Engineering Lead]` |
| Features / initiatives | `[Feature X]`, `[Initiative Y]` | `[Feature X] was descoped` |
| Dates | `[Date]`, `[YYYY-MM-DD]` | `Last updated: [Date]` |
| URLs | `[URL redacted]` | `Source: [URL redacted]` |
| Stable IDs | Real format, fictional numbers | `L-014`, `D-009`, `CI-042` |

### Tone and format

- Write as if the system is live and real — present tense, confident, specific in structure
- Avoid "this is an example of..." framing inside artifact files — let them speak for themselves
- README and SHOWCASE.md may use explanatory framing for the visitor's benefit

---

## PM OS Scheduled Tasks (Reference)

The real system runs four scheduled tasks. This table is the sanitized reference version:

| Task | Cadence | Reads | Writes | Output |
|------|---------|-------|--------|--------|
| **Fireflies Harvest** | Nightly, 1 AM | Fireflies API (meeting transcripts) | `Customer Insights — Latest.md` | Nightly customer signal update |
| **Morning Brief** | 6 AM weekdays | All memory files + Calendar | ❌ Read-only | `YYYY-MM-DD-Morning-Briefing.md` |
| **Evening Debrief** | 6 PM weekdays | Today's brief + Slack + Calendar | Open Loops, Risk Register, Decision Ledger | `YYYY-MM-DD-Evening-Debrief.md` |
| **Weekly Radar** | Saturday, 3 AM | All memory files + week's briefs | Customer Insights — Weekly Rollups | `YYYY-MM-DD-Weekly-PM-Radar.md` |

**Write ownership rule:** Morning Brief is strictly read-only. Evening and Weekly runs may mutate memory files. This prevents the morning run from making changes without a human review loop.

---

## References

- [README.md](./README.md) — visitor entry point and system map
- [SHOWCASE.md](./SHOWCASE.md) — standalone narrative document
- [01-PM-OS/CLAUDE.md](./01-PM-OS/CLAUDE.md) — PM OS section rules
- [02-Connected-Tools/CLAUDE.md](./02-Connected-Tools/CLAUDE.md) — Connected Tools section rules
- [03-Competitive-Intel/CLAUDE.md](./03-Competitive-Intel/CLAUDE.md) — Competitive Intel section rules
