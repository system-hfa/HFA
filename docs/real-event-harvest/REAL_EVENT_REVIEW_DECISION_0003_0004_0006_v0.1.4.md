# Real Event Review Decision — REAL-EVENT-0003, REAL-EVENT-0004 and REAL-EVENT-0006 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-12 — Review Decision for Additional Batch 1 Events  
Scope: review decision for whether three additional real events can advance to candidate draft, remain factual harvest, or require more extraction  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document records the review decision for three additional real events already indexed and deeply extracted:
- REAL-EVENT-0003 — S-76C+ Tofino
- REAL-EVENT-0004 — S-76C+ EC-JES Vigo
- REAL-EVENT-0006 — S-76C++ 5N-BQJ Bristow Nigeria
The decision here is not to create fixtures.
The decision here is not to assign final expected P/O/A.
The decision here is only whether each event should advance to Markdown candidate draft, remain factual harvest, or require more source extraction.
All outputs remain:
```text
DRAFT_FOR_REVIEW
NOT_EXPECTED_VALUE
NO_FIXTURE_JSON
HUMAN_REVIEW_REQUIRED
```

---

## 2. Decision summary

Event    Decision    Rationale
REAL-EVENT-0003 — S-76C+ Tofino    APPROVE_FOR_CANDIDATE_DRAFT    Strong official source, clear night approach energy/control degradation, good P/A ambiguity, useful comparison with Thebaud and Peasmarsh.
REAL-EVENT-0004 — S-76C+ EC-JES Vigo    REQUIRES_MORE_SOURCE_EXTRACTION    Useful SAR/training/low-height case, but source detail must be expanded before candidate draft; likely multi-role and warning/barrier case.
REAL-EVENT-0006 — S-76C++ 5N-BQJ Bristow Nigeria    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Strong unsafe-condition and preconditions source, but insufficient for P/O/A candidate draft; high value for adversarial and risk-layer future use.

No JSON fixture should be created from this document.

---

PART A — REAL-EVENT-0003: S-76C+ Tofino

## 3. Decision

APPROVE_FOR_CANDIDATE_DRAFT

This means:

The event may advance to a Markdown candidate draft.
It must not become JSON.
It must not become baseline.
It must not receive final expected P/O/A yet.

---

## 4. Review basis

The factual basis is sufficient for candidate drafting because the event has:

* official source status;
* clear night visual approach context;
* identifiable approach phase;
* autopilot disengagement context;
* low-speed/high-descent-rate state;
* rotor speed decay;
* directional control degradation;
* extremely low recovery;
* clear precondition pattern around night visual cues, crew monitoring and energy management.

---

## 5. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT    Official TSB source.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_DRAFT    Enough for Markdown candidate draft; not enough for JSON expected values.
Safe operation escape point    ESCAPE_POINT_ACCEPT    Final approach after autopilot disengagement and energy/control degradation.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Night visual approach with limited cues and low-altitude recovery margin.
Unsafe act    UNSAFE_ACT_REVISE    Must avoid overstating deliberate continuation; better framed as manual management while energy/control margins degraded.
Direct actor    DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM    PF/PM split still required.
P candidate strength    P_STRONG_CANDIDATE    Non-detection of speed/descent/rotor-speed degradation is plausible and strong.
O candidate strength    O_WEAK_CANDIDATE    Objective to complete approach is factual, but unsafe objective not proven.
A candidate strength    A_PLAUSIBLE_CANDIDATE    Manual control/energy management may be central but may be downstream of perception.
Preconditions    PRECONDITIONS_STRONG    Night visual environment, temporary lighting, autopilot disengagement, workload, monitoring.
Candidate suitability    APPROVE_FOR_CANDIDATE_DRAFT    Good candidate draft, not JSON.

---

## 6. Preferred candidate draft wording

### 6.1 Safe operation escape point

The operation escaped safe functioning during the night final approach when, after autopilot disengagement, the helicopter entered a low-speed/high-descent-rate state with rotor-speed decay before recovery at extremely low height.

### 6.2 Unsafe act statement

The flight crew continued or manually managed the night approach while the helicopter's energy state, descent path and control margins degraded into a near-CFIT condition.

Reviewer caution:

Avoid wording that implies conscious continuation into a known unsafe state unless supported by evidence.

### 6.3 Unsafe condition statement

Night visual approach to a temporarily lit landing area with potentially insufficient external visual references, autopilot disengagement, workload and low-altitude recovery margin.

### 6.4 Candidate axis status

P-likely
A-plausible
O-weak
NOT_EXPECTED_VALUE

---

## 7. Anti-shortcut notes

Reject:

Shortcut    Decision
Night approach = P automatically    REJECT
Autopilot disconnected = A automatically    REJECT
Rotor speed decay = A automatically    REJECT
Near-CFIT severity proves classification    REJECT
TSB finding = expected value    REJECT

---

## 8. Remaining limitations

Before any JSON candidate:

* PF/PM split must be reviewed.
* Autopilot disengagement context must be clarified.
* Callouts must be reviewed.
* Stabilized criteria must be reviewed.
* Exact evidence of non-perception must be separated from report conclusions.
* Human reviewer must approve expected P/O/A.

---

PART B — REAL-EVENT-0004: S-76C+ EC-JES Vigo

## 9. Decision

REQUIRES_MORE_SOURCE_EXTRACTION

This means:

The event remains highly useful but should not advance to candidate draft yet.
It needs full source extraction, preferably CIAIAC final report review.
It must not become JSON.
It must not become baseline.

---

## 10. Review basis

The case is methodologically valuable because it involves:

* SAR/training context;
* winch-operator validation;
* low-height over-water positioning;
* descent to very low height;
* absence of sound warning;
* likely workload and multi-role coordination;
* potential interaction between flight crew, mission crew and alerting barriers.

However, it is not yet candidate-draft ready because the currently extracted facts do not sufficiently establish:

* intended training height;
* whether the descent was manual, automation-related, commanded or inadvertent;
* PF/PM role split;
* role of mission/winch crew;
* exact warning/barrier logic;
* whether P, A or multi-actor framing is strongest.

---

## 11. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_PARTIAL    BEA notification is useful; full CIAIAC report needed.
Chronology sufficient?    CHRONOLOGY_PARTIAL    Enough for harvest; not for candidate draft.
Safe operation escape point    ESCAPE_POINT_PLAUSIBLE_REQUIRES_REVIEW    Low-height descent during training positioning.
Unsafe condition    UNSAFE_CONDITION_ACCEPT_PRELIMINARY    SAR/winch training, low height, warning barrier issue.
Unsafe act    UNSAFE_ACT_INSUFFICIENT    Not enough to know control/monitoring mechanism.
Direct actor    DIRECT_ACTOR_INSUFFICIENT_MULTI_ROLE    Flight crew vs mission crew requires review.
P candidate strength    P_PLAUSIBLE_BUT_SOURCE_PARTIAL    Possible non-perception of height/descent.
O candidate strength    O_WEAK    Training objective not unsafe by itself.
A candidate strength    A_PLAUSIBLE_BUT_SOURCE_PARTIAL    Vertical control/monitoring possible but unresolved.
Preconditions    PRECONDITIONS_STRONG    Task workload, low-height over water, warning barrier.
Candidate suitability    REQUIRES_MORE_SOURCE_EXTRACTION    Not candidate draft yet.

---

## 12. Required next extraction for 0004

Before candidate draft:

Review CIAIAC final report if available.
Extract intended exercise height.
Extract PF/PM roles.
Extract mission/winch-operator role.
Extract automation/hover mode status.
Extract warning system design and why no sound warning occurred.
Extract whether descent was commanded or inadvertent.
Extract exact recovery trigger.

---

## 13. Anti-shortcut notes

Reject:

Shortcut    Decision
Warning absent = human error    REJECT
SAR training = workload causal automatically    REJECT
Low height = A automatically    REJECT
Multi-role event = single direct actor automatically    REJECT
BEA notification summary = enough for expected value    REJECT

---

PART C — REAL-EVENT-0006: S-76C++ 5N-BQJ Bristow Nigeria

## 14. Decision

KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT

This means:

The event remains in the corpus as factual harvest, preconditions source, unsafe-condition-dominant adversarial case and future risk-layer source.
It should not advance to P/O/A candidate draft yet.
It must not become JSON.
It must not become baseline.

---

## 15. Review basis

The case has strong factual and methodological value because it includes:

* offshore transport;
* known PF/PM role split;
* DAFCS/TRIM FAIL recurrence;
* abnormal procedure context;
* manual-control workload;
* offshore ditching;
* no fatalities;
* high value for unsafe condition, preconditions and risk-layer analysis.

However, it is not ready for P/O/A candidate draft because current evidence does not establish a dominant active human failure.

The case is best preserved as an adversarial example where the methodology must avoid forcing human error when technical/system degradation may dominate.

---

## 16. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_PARTIAL_FOR_AXIS / SOURCE_USEFUL_FOR_HARVEST    Interim material is useful but not enough for P/O/A expected.
Chronology sufficient?    CHRONOLOGY_PARTIAL    Enough for abnormal sequence, not active failure.
Safe operation escape point    ESCAPE_POINT_PLAUSIBLE_REQUIRES_REVIEW    When abnormal condition became unmanageable.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Repeated DAFCS/TRIM FAIL and possible degraded control/automation.
Unsafe act    UNSAFE_ACT_INSUFFICIENT    Multiple possible active failures; none established.
Direct actor    DIRECT_ACTOR_FLIGHT_CREW_BUT_AXIS_INSUFFICIENT    PF/PM known, but active failure not clear.
P candidate strength    P_WEAK_POSSIBLE    Automation/control-state misunderstanding possible but unproven.
O candidate strength    O_WEAK    Unsafe objective not established.
A candidate strength    A_WEAK_POSSIBLE    Procedure/control response possible but not enough evidence.
Preconditions    PRECONDITIONS_STRONG    Automation/control degradation, EOP workload, offshore context.
Candidate suitability    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Do not advance to P/O/A draft yet.

---

## 17. Required next extraction for 0006

Before any candidate draft:

Review final report if available.
Extract exact technical failure sequence.
Extract EOP steps performed.
Extract reset actions and timing.
Extract PF/PM communications and decisions.
Extract whether ditching was selected or forced.
Separate maintenance/system findings from crew-response evidence.
Determine whether there is any active failure or only unsafe condition.

---

## 18. Anti-shortcut notes

Reject:

Shortcut    Decision
Technical failure = crew error    REJECT
Ditching = action failure    REJECT
Checklist consulted = checklist error    REJECT
Automation warning = P failure automatically    REJECT
Known PF/PM = direct actor clarity    REJECT
Interim report = expected value    REJECT

---

PART D — Consolidated decision

## 19. Summary

Event    Decision    Next step
REAL-EVENT-0003 — Tofino    APPROVE_FOR_CANDIDATE_DRAFT    Include in future Markdown candidate drafts.
REAL-EVENT-0004 — Vigo    REQUIRES_MORE_SOURCE_EXTRACTION    Deepen source extraction, preferably CIAIAC final.
REAL-EVENT-0006 — 5N-BQJ    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Keep as preconditions/adversarial/risk-layer source.

---

## 20. Next approved phase

Recommended next phase:

A4+R-13 — Real Event Index Batch 2

Purpose:

Expand the real-event index from 20 to 40 events before creating any JSON candidates.

Parallel later phase:

A4+R-14 — Candidate Drafts for REAL-EVENT-0003 and selected Batch 1 cases

Do not create JSON fixtures yet.

---

## 21. Final status

This document records review decisions only.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
