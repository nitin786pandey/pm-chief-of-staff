# Competitive Intelligence Pipeline — Overview

## What it is

An automated system that monitors competitor activity daily, classifies signals by strategic relevance, and synthesizes patterns weekly — without me having to manually track anything.

---

## Architecture

```
7:30 AM weekdays:
   Orchestrator fires
       │
       ├── Sub-agent A: fetches [Competitor 1] sources (blog, changelog, job posts)
       ├── Sub-agent B: fetches [Competitor 2] sources
       └── Sub-agent C: fetches [Competitor 3] sources
                │
                ▼ (parallel, map-reduce)
   Orchestrator merges results
       │
       ├── Classifies each signal: Product / Pricing / GTM / Hiring / Partnership
       ├── Assigns confidence: High / Medium / Low
       ├── Deduplicates against last-run.json (no re-reporting)
       └── Writes to:
           ├── Intel Log.md (CI-### stable IDs, append-only)
           └── Daily Output: YYYY-MM-DD-Daily-Intel.md

Friday 8 PM:
   Weekly Synthesis fires
       │
       ├── Reads all daily outputs from the week
       ├── Identifies cross-competitor patterns
       ├── Surfaces strategic implications
       └── Writes YYYY-MM-DD-Weekly-Intel-Synthesis.md
```

---

## Signal Classification

Every signal is tagged with:

| Field | Values |
|-------|--------|
| **Category** | Product, Pricing, GTM, Hiring, Partnership, Other |
| **Confidence** | High (official source), Medium (inferred), Low (rumor/secondary) |
| **Strategic relevance** | 🔴 Act now / 🟡 Monitor / 🟢 Note |
| **Related PM OS IDs** | Links to risks, decisions, or themes it affects |

---

## What gets monitored

Each competitor has a tiered source list:

- **Tier 1 (daily):** Official changelog, product blog, pricing page, job postings
- **Tier 2 (weekly):** Review sites, community forums, secondary press

RSS feeds are used where available (faster, lower cost). Direct page fetches used as fallback.

---

## Deduplication

A `last-run.json` file tracks:
- Date of last run
- Last CI-### ID assigned
- URLs already logged this week

This means the same blog post never gets reported twice, even if it stays at the top of a feed for days.

---

## Sample artifacts

- [Sample Daily Intel →](./sample-daily-intel.md)
- [Sample Weekly Synthesis →](./sample-weekly-synthesis.md)
