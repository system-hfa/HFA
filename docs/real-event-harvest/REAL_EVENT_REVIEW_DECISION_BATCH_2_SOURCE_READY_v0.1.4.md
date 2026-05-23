# Real Event Review Decision — Batch 2 Source-Ready Events v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-15 — Review Decision for Batch 2 Source-Ready Events  
Scope: review decision for four source-ready Batch 2 events after deep factual extraction  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document records the review decision for four Batch 2 source-ready events:
- REAL-EVENT-0021 — Cessna 500 N8DX
- REAL-EVENT-0022 — S-76C++ N798P
- REAL-EVENT-0024 — S-76C+ 5N-BGD
- REAL-EVENT-0026 — S-76C++ N748P
The decision here is not to create fixtures.
The decision here is not to assign final expected P/O/A.
The decision here is only whether each event should advance to Markdown candidate draft, remain factual harvest, or remain an unsafe-condition / preconditions / risk-layer source.
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
REAL-EVENT-0021 — Cessna 500 N8DX    APPROVE_FOR_CANDIDATE_DRAFT_AS_AUTOMATION_ADVERSARIAL    Strong official NTSB source; automation / equipment knowledge / mode awareness and action-performance boundary; useful for P/A distinction.
REAL-EVENT-0022 — S-76C++ N798P    APPROVE_FOR_CANDIDATE_DRAFT_AFTER_REVIEW    Strong official NTSB source; helideck dynamic rollover with action timing / stabilization / wind context; useful for A-likely vs P-plausible.
REAL-EVENT-0024 — S-76C+ 5N-BGD    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Control pushrod / flight-control linkage failure; useful as preconditions/maintenance/system barrier case; not enough for P/O/A candidate.
REAL-EVENT-0026 — S-76C++ N748P    KEEP_AS_FACTUAL_HARVEST_ONLY_BARRIER_DESIGN_SOURCE    Bird strike and windshield/certification barrier case; high value for risk-layer and barrier design, not direct P/O/A.

No JSON fixture should be created from this document.

---
PART A — REAL-EVENT-0021: Cessna 500 N8DX

## 3. Decision

APPROVE_FOR_CANDIDATE_DRAFT_AS_AUTOMATION_ADVERSARIAL

This means:

The event may advance to a Markdown candidate draft as an automation / mode-awareness adversarial case.
It must not become JSON.
It must not become baseline.
It must not receive final expected P/O/A yet.

---
## 4. Review basis

The factual basis is sufficient for candidate drafting because the event has:

* official NTSB source;
* loss of control / stall-spin sequence;
* automation / equipment knowledge issues;
* potential single-pilot workload context;
* plausible perception/mode-awareness issue;
* plausible action/control execution issue;
* high value for P/A boundary testing.

---
## 5. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT    Official NTSB source.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_DRAFT    Enough for Markdown candidate draft; not JSON.
Safe operation escape point    ESCAPE_POINT_ACCEPT_WITH_REVIEW    Anchor at automation/mode-management no longer supporting safe control.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Automation/avionics interface, workload, equipment knowledge demands.
Unsafe act    UNSAFE_ACT_REVISE    Must avoid importing NTSB personnel issue directly as SERA A-code.
Direct actor    DIRECT_ACTOR_PILOT    Pilot is direct operator.
P candidate strength    P_STRONG_CANDIDATE    Mode/equipment awareness likely central.
O candidate strength    O_WEAK_CANDIDATE    Unsafe objective not established.
A candidate strength    A_PLAUSIBLE_CANDIDATE    Action/control/automation response plausible.
Preconditions    PRECONDITIONS_STRONG    Automation interface, single-pilot workload, equipment knowledge.
Candidate suitability    APPROVE_FOR_CANDIDATE_DRAFT_AS_AUTOMATION_ADVERSARIAL    Good automation adversarial case.

---
## 6. Preferred candidate draft wording

### 6.1 Safe operation escape point

The operation escaped safe functioning when the pilot's understanding or management of automation/avionics mode state no longer supported safe aircraft control, allowing loss of control and stall/spin development.

### 6.2 Unsafe act statement

The pilot managed or responded to automation/avionics and aircraft control in a way that allowed loss of control and stall/spin development.

Reviewer caution:

Do not copy NTSB personnel issues directly into SERA P/O/A. Reconstruct perception, objective and action from the factual sequence.

### 6.3 Unsafe condition statement

Automation/avionics interface complexity, mode-awareness demands, single-pilot workload and maneuvering/descent context.

### 6.4 Candidate axis status

P-likely
A-plausible
O-weak
AUTOMATION_ADVERSARIAL
NOT_EXPECTED_VALUE

---
## 7. Anti-shortcut notes

Reject:

Shortcut    Decision
Automation issue = P automatically    REJECT
Stall/spin = A automatically    REJECT
NTSB personnel issue = expected SERA value    REJECT
Single-pilot = workload causal automatically    REJECT
Fatal outcome = classification proof    REJECT

---
PART B — REAL-EVENT-0022: S-76C++ N798P

## 8. Decision

APPROVE_FOR_CANDIDATE_DRAFT_AFTER_REVIEW

This means:

The event may advance to a Markdown candidate draft after careful action/perception review.
It must not become JSON.
It must not become baseline.
It must not receive final expected P/O/A yet.

---
## 9. Review basis

The factual basis is sufficient for candidate drafting because the event has:

* official NTSB source;
* offshore helideck context;
* dynamic rollover sequence;
* touchdown / stabilization / turning or repositioning context;
* environmental/wind preconditions;
* plausible action-timing issue;
* plausible perception issue regarding touchdown/stabilization/wind/rollover risk.

---
## 10. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT    Official NTSB source.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_DRAFT    Enough for Markdown candidate draft; not JSON.
Safe operation escape point    ESCAPE_POINT_ACCEPT_WITH_REVIEW    Turning/repositioning before full landing/stabilization.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Helideck, wind/crosswind, dynamic rollover vulnerability.
Unsafe act    UNSAFE_ACT_ACCEPT_PRELIMINARY    Action timing likely central, but wording must remain cautious.
Direct actor    DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM    PF/PM split pending.
P candidate strength    P_PLAUSIBLE_CANDIDATE    Stabilization/touchdown/wind state perception may be relevant.
O candidate strength    O_WEAK_CANDIDATE    Repositioning objective not necessarily unsafe.
A candidate strength    A_STRONG_CANDIDATE    Turning/repositioning before stable landing appears central.
Preconditions    PRECONDITIONS_STRONG    Helideck, wind, rollover susceptibility, deck procedures.
Candidate suitability    APPROVE_FOR_CANDIDATE_DRAFT_AFTER_REVIEW    Good helideck action candidate.

---
## 11. Preferred candidate draft wording

### 11.1 Safe operation escape point

The operation escaped safe functioning when the helicopter entered or initiated a turn/repositioning maneuver before the aircraft was fully landed/stabilized on the helideck in strong crosswind conditions.

### 11.2 Unsafe act statement

The pilot initiated or allowed a turning/repositioning maneuver before the helicopter was fully landed and stabilized, leading to dynamic rollover.

Reviewer caution:

Do not convert NTSB probable cause directly into SERA A-code. Verify whether perception of touchdown/stabilization or action timing is dominant.

### 11.3 Unsafe condition statement

Offshore helideck environment with strong/crosswind conditions and rollover vulnerability during touchdown/repositioning.

### 11.4 Candidate axis status

A-likely
P-plausible
O-weak
HELIDECK_ACTION_CANDIDATE
NOT_EXPECTED_VALUE

---
## 12. Anti-shortcut notes

Reject:

Shortcut    Decision
Dynamic rollover = A automatically    REJECT
Crosswind = environment only, no human factors    REJECT
Helideck event = offshore precondition only    REJECT
NTSB probable cause = expected SERA value    REJECT
Fatal outcome = classification proof    REJECT

---
PART C — REAL-EVENT-0024: S-76C+ 5N-BGD

## 13. Decision

KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT

This means:

The event remains in the corpus as factual harvest, preconditions source, unsafe-condition-dominant case and future risk-layer source.
It should not advance to P/O/A candidate draft yet.
It must not become JSON.
It must not become baseline.

---
## 14. Review basis

This case has strong value because it includes:

* flight-control linkage / control pushrod failure;
* maintenance / inspection / design barrier implications;
* possible loss of control;
* unsafe condition and preconditions relevance;
* strong anti-bias value: do not force a human active failure when technical/system degradation dominates.

It is not ready for P/O/A candidate draft because current evidence does not establish a dominant flight-crew active failure.

---
## 15. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_PARTIAL_TO_SUFFICIENT_FOR_HARVEST    NSIB/AIB preliminary material supports harvest, but final detail preferred.
Chronology sufficient?    CHRONOLOGY_PARTIAL    Enough for unsafe condition; not for P/O/A.
Safe operation escape point    ESCAPE_POINT_ACCEPT_AS_UNSAFE_CONDITION    Control continuity degraded by pushrod/linkage separation.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Flight-control linkage/pushrod separation.
Unsafe act    UNSAFE_ACT_INSUFFICIENT    No established flight-crew active failure.
Direct actor    DIRECT_ACTOR_NOT_FLIGHT_CREW_AT_CURRENT_LEVEL    Maintenance/system/design actors possible, but not assigned.
P candidate strength    P_INSUFFICIENT    Crew perception failure not established.
O candidate strength    O_INSUFFICIENT    Unsafe objective not established.
A candidate strength    A_INSUFFICIENT    Crew action failure not established.
Preconditions    PRECONDITIONS_STRONG    Maintenance, control integrity, inspection/design barriers.
Candidate suitability    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Not P/O/A candidate yet.

---
## 16. Anti-shortcut notes

Reject:

Shortcut    Decision
Mechanical failure = crew error    REJECT
Accident severity = active failure    REJECT
Maintenance/system issue = direct actor without evidence    REJECT
Preliminary report = expected value    REJECT

---
PART D — REAL-EVENT-0026: S-76C++ N748P

## 17. Decision

KEEP_AS_FACTUAL_HARVEST_ONLY_BARRIER_DESIGN_SOURCE

This means:

The event remains in the corpus as factual harvest, barrier-design source, preconditions source and future risk-layer source.
It should not advance to P/O/A candidate draft yet.
It must not become JSON.
It must not become baseline.

---
## 18. Review basis

This case has strong value because it includes:

* bird strike hazard;
* windshield penetration / barrier vulnerability;
* certification / STC / design protection questions;
* crew incapacitation and emergency response constraints;
* strong future risk-layer and barrier-design relevance.

It is not ready for P/O/A candidate draft because the dominant mechanism is not a flight-crew perception/objective/action failure.

---
## 19. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT_FOR_BARRIER_DESIGN    Official NTSB/FAA material supports barrier-design review.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_HARVEST    Enough for hazard/barrier; not P/O/A.
Safe operation escape point    ESCAPE_POINT_ACCEPT_AS_BARRIER_FAILURE    Bird strike compromised windshield/canopy barrier and crew/aircraft controllability.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Bird-strike exposure and windshield/canopy vulnerability.
Unsafe act    UNSAFE_ACT_INSUFFICIENT    No established flight-crew active failure.
Direct actor    NO_FLIGHT_CREW_DIRECT_ACTOR_AT_CURRENT_LEVEL    Barrier/system/certification context dominates.
P candidate strength    P_INSUFFICIENT    Not dominant.
O candidate strength    O_INSUFFICIENT    No unsafe objective.
A candidate strength    A_INSUFFICIENT    Recovery constrained by sudden event/incapacitation.
Preconditions    PRECONDITIONS_STRONG    Bird hazard, windshield/certification/STC barriers.
Candidate suitability    KEEP_AS_FACTUAL_HARVEST_ONLY_BARRIER_DESIGN_SOURCE    Do not draft P/O/A candidate.

---
## 20. Anti-shortcut notes

Reject:

Shortcut    Decision
Catastrophic outcome = human error    REJECT
Lack of recovery = A failure    REJECT
Bird strike = external only, no organizational learning    REJECT
Certification issue = irrelevant to SERA preconditions    REJECT

---
PART E — Consolidated decision

## 21. Summary

Event    Decision    Next step
REAL-EVENT-0021 — N8DX    APPROVE_FOR_CANDIDATE_DRAFT_AS_AUTOMATION_ADVERSARIAL    Candidate draft in Markdown.
REAL-EVENT-0022 — N798P    APPROVE_FOR_CANDIDATE_DRAFT_AFTER_REVIEW    Candidate draft in Markdown.
REAL-EVENT-0024 — 5N-BGD    KEEP_AS_FACTUAL_HARVEST_ONLY_UNSAFE_CONDITION_DOMINANT    Keep as preconditions/unsafe-condition source.
REAL-EVENT-0026 — N748P    KEEP_AS_FACTUAL_HARVEST_ONLY_BARRIER_DESIGN_SOURCE    Keep as barrier/risk-layer source.

---
## 22. Next approved phase

Recommended next phase:

A4+R-16 — Candidate Drafts for REAL-EVENT-0021 and REAL-EVENT-0022

Deliverable:

docs/real-event-harvest/REAL_EVENT_CANDIDATE_DRAFTS_BATCH_2_SOURCE_READY_v0.1.4.md

Do not create JSON fixtures yet.

---
## 23. Final status

This document records review decisions only.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
