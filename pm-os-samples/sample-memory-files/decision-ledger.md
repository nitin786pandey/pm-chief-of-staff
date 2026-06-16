# Decision Ledger

> **Purpose:** A permanent log of significant product decisions — what was decided, why, what alternatives were considered, and when to revisit. Read by Morning Brief and Evening Debrief. Prevents re-litigating past decisions and surfaces when they need to be revisited.

**Format:** Each entry uses a stable `D-###` ID. Never deleted — only superseded.

---

## Active Decisions

### D-009 — [Feature X] timeline moved; [Lite variant] scoped for this cycle
- **Date:** [Date]
- **Decision:** Formally delay full [Feature X] to next cycle. Ship a lite variant this sprint that removes the [Third-party API] dependency.
- **Rationale:** [Third-party API] confirmed unavailable until Q2. No viable workaround within sprint constraints. Lite variant preserves user value and unblocks downstream work.
- **Alternatives considered:**
  - Wait for [Third-party API] — rejected: 6-week delay unacceptable for [downstream dependency]
  - Mock the integration — rejected: engineering estimated 3 days to mock + 3 days to rip out; not worth it
- **Stakeholders:** [Engineering Lead] (agreed), [Stakeholder A] (verbal OK, written pending), [Stakeholder B] (not yet informed — L-020)
- **Revisit trigger:** [Third-party API] reaches GA, or alternative integration found
- **Related:** L-020, L-021, R-005, R-010

---

### D-008 — [Approach A] chosen over [Approach B] for [Feature Z]
- **Date:** [Date - 5 days]
- **Decision:** Use [Approach A] for [Feature Z] implementation.
- **Rationale:** [Approach A] is simpler to implement and aligns with existing data model. [Approach B] offers more flexibility but adds 2 weeks of scope.
- **Alternatives considered:** [Approach B] — deferred for Phase 2 consideration
- **Stakeholders:** [Engineering Lead], [Design Lead]
- **Revisit trigger:** Engineering feedback due this week — if implementation reveals blockers, reconsider [Approach B]
- **Related:** D-007

---

### D-007 — [Initiative Y] scope locked for Phase 1
- **Date:** [Date - 2 weeks]
- **Decision:** Phase 1 of [Initiative Y] will include [Capability A] and [Capability B] only. [Capability C] moved to Phase 2.
- **Rationale:** Stakeholder pressure to ship something in Q1. [Capability C] adds 4 weeks of scope — not justified for Phase 1 learnings.
- **Alternatives considered:** Full scope (rejected — timeline), MVP without [Capability B] (rejected — too thin for meaningful signal)
- **Stakeholders:** [Stakeholder A] (approval pending — L-014), [PM Lead]
- **Revisit trigger:** Phase 1 launch learnings reviewed
- **Related:** L-014, R-007

---

## Superseded Decisions

| ID | Original decision | Superseded by | Date |
|----|------------------|--------------|------|
| D-004 | [Feature X] to ship this cycle with full [Third-party API] | D-009 | [Date] |
