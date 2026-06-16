# PM OS — Memory Files

The six persistent memory files that every scheduled run reads from and writes to. Each uses stable IDs so the AI can cross-reference across files and across days.

| File | Purpose | ID format |
|------|---------|-----------|
| `Open Loops.md` | Every active commitment and follow-up | `L-###` |
| `Decision Ledger.md` | Product decisions with rationale, alternatives, revisit triggers | `D-###` |
| `Risk Register.md` | Active risks with evidence, mitigation, escalation criteria | `R-###` |
| `Stakeholder Heatmap.md` | Relationship trust-state and wait-state | `S-###` |
| `Customer Themes.md` | Recurring customer signals with source count and weight | `T-###` |
| `Customer Insights — Latest.md` | Rolling 7-day window of processed meeting summaries | — |

**Write ownership:** Only Evening Debrief and Weekly Radar may mutate these files. Morning Brief reads them but never writes. This is enforced by the Operating Contract.

Sample memory files are in [`../01-PM-OS/sample-memory-files/`](../01-PM-OS/sample-memory-files/).
