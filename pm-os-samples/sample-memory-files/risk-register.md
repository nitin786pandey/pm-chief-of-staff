# Risk Register

> **Purpose:** Active tracking of risks that could affect delivery, stakeholder relationships, or customer outcomes. Read every morning. Updated by Evening Debrief after new signals arrive. Risks are never deleted — only resolved or downgraded.

**Format:** Each entry uses a stable `R-###` ID. Level: 🔴 High / 🟡 Medium / 🟢 Low.

---

## Active Risks

### R-010 — Timeline slip communication risk
- **Risk:** [Stakeholder B] not yet informed of [Feature X] delay. Longer the gap, worse the trust impact.
- **Level:** 🔴 High
- **Likelihood:** Certain if not addressed today
- **Impact:** Stakeholder alignment, downstream planning disruption
- **Mitigation:** L-020 (communicate today, before EOD)
- **Owner:** Me
- **Related:** D-009, L-020
- **Last updated:** [Evening Debrief, Date]

---

### R-005 — [Feature X] scope / delivery risk
- **Risk:** [Feature X] was 40% over original engineering estimate even before the API issue. Lite variant still carries risk if [Capability A] is more complex than estimated.
- **Level:** 🔴 High
- **Likelihood:** Medium — engineering flagged caution
- **Impact:** Sprint completion, next cycle sequencing
- **Mitigation:** L-021 (scope down spec, confirm with design), daily check-in with engineering this week
- **Owner:** Me + [Engineering Lead]
- **Related:** D-009, L-021
- **Last updated:** [Evening Debrief, Date]

---

### R-007 — [Stakeholder A] alignment drift
- **Risk:** [Stakeholder A] has given verbal agreement to multiple items but hasn't formally confirmed in writing. Creates ambiguity in scope ownership.
- **Level:** 🟡 Medium
- **Likelihood:** Low but pattern is concerning
- **Impact:** Scope disputes at launch, accountability gaps
- **Mitigation:** L-014 (get written confirmation for [Initiative Y]). Longer term: change loop-closing protocol for this stakeholder.
- **Owner:** Me
- **Related:** L-014, D-007
- **Last updated:** [Evening Debrief, Date]

---

### R-009 — Customer churn signal in [Segment C]
- **Risk:** Two separate [Segment C] customers mentioned the same friction point in calls this week. Not yet acted on.
- **Level:** 🟡 Medium
- **Likelihood:** Medium — pattern is early but worth watching
- **Impact:** Retention, [Segment C] expansion potential
- **Mitigation:** Flagged in T-003 (Customer Theme). Raise in next [Team C] sync. No immediate action required.
- **Owner:** Me
- **Related:** T-003, L-022
- **Last updated:** [Morning Brief, Date]

---

## Resolved Risks

| ID | Risk | Resolved on | Resolution |
|----|------|------------|-----------|
| R-003 | Data model incompatibility with [Integration X] | [Date] | Engineering confirmed compatible after schema review |
| R-006 | Design resource availability for [Feature Z] | [Date] | [Design Lead] confirmed availability next week |
