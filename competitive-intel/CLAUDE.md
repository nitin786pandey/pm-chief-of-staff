# CLAUDE.md — 03-Competitive-Intel Section

> **Scope:** This file governs how Claude works within the `03-Competitive-Intel/` section of the AI Workflow Showcase. It extends the master `CLAUDE.md` with rules specific to the competitive intelligence pipeline documentation and sample artifacts.

---

## What This Section Demonstrates

The Competitive Intel section shows an **automated, multi-agent signal harvesting system** that runs without manual intervention. Visitors should understand:

1. The multi-agent architecture — orchestrator + parallel sub-agents (map-reduce pattern)
2. How signals are classified, deduplicated, and stored with stable IDs (`CI-###`)
3. What a daily intel output looks like vs. what a weekly synthesis looks like
4. How competitive signals connect back to PM OS memory (risks, decisions, themes)

---

## Signal Classification Rules

Every signal in any sample artifact must have all four classification fields. This is what separates this system from a simple news scraper — it contextualizes signals for PM decision-making.

| Field | Required values |
|-------|----------------|
| **Category** | `Product`, `Pricing`, `GTM`, `Hiring`, `Partnership`, `Other` |
| **Confidence** | 🟢 `High` (official source), 🟡 `Medium` (inferred/secondary), 🔴 `Low` (rumor) |
| **Relevance** | 🔴 `Act now`, 🟡 `Monitor`, 🟢 `Note` |
| **Related PM OS** | Comma-separated stable IDs (`R-005, D-007`) or `None currently` |

The `Related PM OS` field is important — it's what demonstrates the integration between the intel system and PM OS memory. At least some signals should have PM OS references; not all need to.

---

## Daily Intel Format Rules

Every `sample-daily-intel.md` file must follow this structure exactly:

### Required sections (in order)

1. **Header** — auto-generation timestamp, sources checked count, new signals count, deduplicated count
2. **Run Metadata block** — JSON with `run_date`, `last_ci_id_before_run`, `new_signals`, `skipped_duplicates`, `sources_checked`, `sources_failed`
3. **New Signals** — one `###` subsection per signal, each with all four classification fields + Source + Implication + Related PM OS
4. **Skipped (already logged)** — table of deduplicated URLs with first-logged CI-ID and date
5. **Source Health** — table of competitors × sources with ✅ / ⚠️ / ❌ status

### Signal subsection format

```markdown
### CI-### — [Competitor X] did [thing]
- **Category:** [Category]
- **Confidence:** 🟢/🟡/🔴 [Level] ([source type])
- **Relevance:** 🔴/🟡/🟢 [Level]
- **Summary:** [2-3 sentence description of what happened and why it matters]
- **Source:** [[Source description] — URL redacted]
- **Implication:** [1-2 sentences on strategic impact]
- **Related PM OS:** [IDs or "None currently"]
```

### CI-### ID sequencing

Daily output IDs must be sequential and consistent with the run metadata block. If `last_ci_id_before_run` is `CI-041`, new signals start at `CI-042`.

---

## Weekly Synthesis Format Rules

Every `sample-weekly-synthesis.md` file must follow this structure:

### Required sections (in order)

1. **Header** — auto-generation timestamp, week range, signals reviewed count, new CI-### entries count
2. **This Week's Top Themes** — 2–4 `###` subsections, each covering a cross-competitor pattern
3. **Week-over-Week Signal Volume** — table by category, this week vs. last week, trend arrow
4. **Signals That Didn't Make the Themes** — table of signals logged but not significant enough for a theme
5. **Carry-Forward Watch Items** — table of items to monitor in coming weeks

### Theme subsection format

```markdown
### [N]. [Theme name — what the pattern is about]
- **Signals this week:** [CI-IDs] ([brief description of each])
- **Pattern:** [2-3 sentences explaining what these signals have in common]
- **Strategic implication:** [What this means for our product / roadmap]
- **Recommended action:** [Concrete next step — often linked to PM OS]
- **Related PM OS:** [IDs]
```

Themes should feel like strategic insights, not signal summaries. The synthesis is where the system earns its value — individual signals are noise; patterns are signal.

---

## Deduplication System (for samples)

The `last-run.json` pattern is part of what makes the system production-grade. When referencing or demonstrating deduplication:

- Always include a "Skipped" section in daily samples showing at least 1–2 deduplicated URLs
- Reference the `last-run.json` `logged_signal_urls` field as the dedup mechanism
- The implication to communicate: the same blog post doesn't get re-reported for 5 days just because it stays top of a competitor's feed

---

## Adding New Sample Artifacts

### New daily intel sample (different date / different signal mix)

1. Create file as `sample-daily-intel-[variant].md` or simply add another dated sample
2. Maintain CI-### ID continuity with existing samples (don't reuse IDs)
3. Vary the signal mix — include at least one signal per confidence level across samples
4. Ensure at least one signal has a `Related PM OS` cross-reference

### New competitor / source (in overview.md)

When adding competitor tiers or sources to the overview:
- Keep competitor names as `[Competitor A]`, `[Competitor B]`, etc.
- Source types can be named generically: `Official changelog`, `Product blog`, `Job board`, `Community forum`, `Review site`
- Never add real competitor URLs — use `[URL redacted]` or `[Source description — URL redacted]`

---

## Placeholder Conventions (this section)

| What | Format |
|------|--------|
| Competitors | `[Competitor A]`, `[Competitor B]`, `[Competitor C]` |
| Feature areas | `[Feature Area X]`, `[Feature Category X]` |
| Capabilities | `[Capability Type]`, `[Capability A]` |
| Customer segments | `[Customer Segment A]`, `[Segment B]` |
| Partners | `[Partner Type]`, `[Partner Name]` |
| Roles (hiring signals) | `[Role Type]`, `[Role Name]` |
| Regions | `[Region]` |
| Source URLs | `[URL redacted]` |
| Plan names | `[Plan Name]` |
| Prices | `[Price A]`, `[Price B]` |

---

## Integration with PM OS

One of the most important things to demonstrate is that competitive intel isn't siloed — signals feed back into PM OS memory. When adding or editing sample artifacts, ensure:

- At least one daily signal per sample links to a Risk Register entry (`R-###`)
- At least one weekly theme links to a Decision Ledger entry (`D-###`) or a Customer Theme (`T-###`)
- The `Recommended action` in weekly themes references an open loop or suggests creating one

This cross-referencing is what turns the intel system from "interesting reading" into "actionable PM intelligence."

---

## Files in This Section

| File | What it shows |
|------|--------------|
| `overview.md` | Multi-agent architecture, source tiers, signal classification, dedup system |
| `sample-daily-intel.md` | Full daily output with run metadata, classified signals, source health |
| `sample-weekly-synthesis.md` | Weekly pattern synthesis with strategic themes and WoW volume table |
