# Real Event Review Decision — REAL-EVENT-0001 and REAL-EVENT-0002 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-9 — Human Review Decision  
Scope: review decision for whether two real events can advance to candidate draft in Markdown  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document records the first human-review-style decision for two real events already indexed, factually harvested, and deeply extracted:
- REAL-EVENT-0001 — S-92A CHO Thebaud
- REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh
The decision here is not to create fixtures.
The decision here is not to assign final expected P/O/A.
The decision here is only whether each event can advance to a candidate draft in Markdown for future review.
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
REAL-EVENT-0001 — S-92A CHO Thebaud    APPROVE_FOR_CANDIDATE_DRAFT    Strong official source, clear unsafe-state chronology, strong low-energy/DVE/perception-monitoring value, and well-defined degraded barrier context.
REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh    APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL    Strong official source but P/O/A remains deliberately ambiguous; excellent anti-shortcut case for warning, go-around planning, obstacle proximity and night private-site approach.

No JSON fixture should be created from this document.

---

PART A — REAL-EVENT-0001: S-92A CHO Thebaud

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
* clear operational context;
* identifiable offshore approach phase;
* identifiable transition from instrument approach attempts to visual approach;
* identifiable unsafe state: low airspeed / high descent rate;
* documented very low recovery height;
* documented degraded barrier context around EGPWS alerting envelope;
* strong precondition pattern: DVE, fog, no discernible horizon, offshore visual approach.

---

## 5. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT    Official investigation source.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_DRAFT    Enough for draft; not enough for JSON expected values.
Safe operation escape point    ESCAPE_POINT_ACCEPT    Best anchored at transition to visual approach and low-energy state development.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    DVE/fog/no discernible horizon/EGPWS gap are strong contextual facts.
Unsafe act    UNSAFE_ACT_REVISE    Wording must avoid overstating deliberate action; better phrased as managed/continued approach while low-energy state developed.
Direct actor    DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM    PF/PM split still required.
P candidate strength    P_STRONG_CANDIDATE    Low-energy state appears not detected early enough.
O candidate strength    O_WEAK_CANDIDATE    Objective shift to visual approach is factual, but unsafe objective is not yet proven.
A candidate strength    A_PLAUSIBLE_CANDIDATE    Energy/flight path management involved, but may be downstream of perception.
Preconditions    PRECONDITIONS_STRONG    Strong DVE, alerting, offshore visual-cue and monitoring context.
Candidate suitability    APPROVE_FOR_CANDIDATE_DRAFT    Good for candidate draft; not JSON.

---

## 6. Preferred candidate draft wording

### 6.1 Safe operation escape point

The operation escaped safe functioning when, after unsuccessful instrument approach attempts and a transition to a visual offshore approach, the helicopter entered a low-airspeed/high-rate-of-descent state that was not detected or corrected before reaching very low height above the water.

### 6.2 Unsafe act statement

The flight crew continued or managed the visual offshore approach while the aircraft energy state degraded into low airspeed and high descent rate before late recovery.

Reviewer caution:

Avoid wording that implies conscious continuation into an unsafe state unless supported by evidence.

### 6.3 Unsafe condition statement

Offshore visual approach in degraded visual environment, with limited external horizon/visual cues and an EGPWS coverage gap for gear-down, below-50-KIAS inadvertent descent.

### 6.4 Direct actor

Flight crew, PF/PM separation pending.

### 6.5 Perception statement

The crew did not appear to recognize the low-energy/high-descent-rate state early enough to prevent the descent to very low height.

### 6.6 Objective statement

The crew objective shifted from missed approach/instrument approach attempts to completing a visual approach after acquiring visual contact with the platform; evidence is insufficient to treat this objective as consciously unsafe.

### 6.7 Action statement

Flight path, power and energy management allowed low airspeed and high descent rate to develop before late recovery; exact control input attribution remains pending.

### 6.8 Candidate axis status

P-likely
A-plausible
O-weak
NOT_EXPECTED_VALUE

---

## 7. Anti-shortcut notes

Do not use the following shortcuts:

Shortcut    Decision
DVE = P automatically    REJECT
EGPWS gap = no human factor    REJECT
Visual approach after failed instrument approaches = O automatically    REJECT
Overtorque = A automatically    REJECT
Near-water recovery height = severity proves classification    REJECT

---

## 8. Remaining limitations

Before any JSON candidate:

* PF/PM split must be reviewed.
* Callout timing must be reviewed.
* Stabilized approach criteria must be reviewed.
* Exact evidence of non-perception must be separated from TSB conclusion.
* The second inadvertent descent must be classified as same pattern, corroborating event or separate event.

---

PART B — REAL-EVENT-0002: S-76C++ G-WIWI Peasmarsh

## 9. Decision

APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL

This means:

The event may advance to a Markdown candidate draft as an adversarial example.
It must not become JSON.
It must not become baseline.
It must not receive final expected P/O/A yet.
Its ambiguity is useful and should be preserved.

---

## 10. Review basis

The factual basis is sufficient for adversarial candidate drafting because the event has:

* official source status;
* night private landing site context;
* reduced visibility and low cloud;
* discontinued approach / go-around transition;
* no go-around procedure or route available/briefed;
* descent toward tree tops;
* EGPWS warning issue;
* strong ambiguity across P, O and A.

This event is not yet suitable as a simple baseline candidate because the active failure mechanism is not singular enough without further review.

---

## 11. Criteria review

Review criterion    Decision    Notes
Source sufficient?    SOURCE_SUFFICIENT    Official AAIB material.
Chronology sufficient?    CHRONOLOGY_SUFFICIENT_FOR_ADVERSARIAL_DRAFT    Enough for adversarial draft; not enough for final expected values.
Safe operation escape point    ESCAPE_POINT_REVISE    Anchor at transition to discontinued approach/go-around without protected route.
Unsafe condition    UNSAFE_CONDITION_ACCEPT    Night, private site, reduced visibility/low cloud, obstacles, absent/unbriefed route.
Unsafe act    UNSAFE_ACT_REVISE    Better framed as flown/transitioned path descended toward trees; avoid implying intentional unsafe path.
Direct actor    DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM    PF/PM split still required.
P candidate strength    P_PLAUSIBLE_CANDIDATE    EGPWS warnings not perceived/recognized; obstacle proximity may not have been perceived.
O candidate strength    O_PLAUSIBLE_CANDIDATE    Go-around/discontinued approach objective/path not protected.
A candidate strength    A_PLAUSIBLE_CANDIDATE    Flight path allowed descent toward obstacles.
Preconditions    PRECONDITIONS_STRONG    Strong planning/briefing/environment/obstacle context.
Candidate suitability    APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL    Preserve ambiguity intentionally.

---

## 12. Preferred candidate draft wording

### 12.1 Safe operation escape point

The operation escaped safe functioning during the transition from night approach to discontinued approach/go-around, when degraded visual conditions and absence of a protected/briefed go-around route allowed the flight path to descend toward obstacles.

### 12.2 Unsafe act statement

The flight crew executed or transitioned into a discontinued approach/go-around trajectory that descended toward tree tops.

Reviewer caution:

Do not treat the decision to discontinue as unsafe by itself; the unsafe element is the resulting flight path and obstacle proximity in the absence of a protected escape route.

### 12.3 Unsafe condition statement

Night private-site approach in reduced visibility/low cloud, with nearby trees/obstacles and no available or briefed go-around procedure/routing.

### 12.4 Direct actor

Flight crew, PF/PM separation pending.

### 12.5 Perception statement

The crew did not appear to perceive or register the EGPWS warnings and/or obstacle proximity in time to prevent descent toward trees.

### 12.6 Objective statement

The crew objective appears to have been to discontinue the approach and transition to an alternate path, but the escape path was not pre-briefed or operationally protected.

### 12.7 Action statement

The flown path during the discontinued approach/go-around allowed descent toward obstacles.

### 12.8 Candidate axis status

P-plausible
O-plausible
A-plausible
ADVERSARIAL_AMBIGUOUS_AXIS
NOT_EXPECTED_VALUE

---

## 13. Anti-shortcut notes

Do not use the following shortcuts:

Shortcut    Decision
Warning not perceived = P automatically    REJECT
No go-around route = O automatically    REJECT
Go-around trajectory issue = A automatically    REJECT
Night private site = P automatically    REJECT
Poor planning = direct actor classification    REJECT
Report finding = expected SERA value    REJECT

---

## 14. Remaining limitations

Before any JSON candidate:

* PF/PM split must be reviewed.
* Exact reason for EGPWS non-awareness must be reviewed.
* Go-around/discontinued approach sequence must be reconstructed in detail.
* Whether planning/briefing is precondition or part of escape point must be settled.
* Whether this case should be single-actor or multi-layer/multi-actor must be decided.

---

PART C — Cross-event decision

## 15. Comparative decision

Dimension    REAL-EVENT-0001 Thebaud    REAL-EVENT-0002 Peasmarsh
Candidate draft status    APPROVE_FOR_CANDIDATE_DRAFT    APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL
Most likely axis    P-likely    Ambiguous P/O/A
Best use    DVE/low-energy/perception-monitoring candidate    anti-shortcut adversarial candidate
Preconditions strength    Strong    Strong
Direct actor clarity    Partial    Partial
Ready for JSON?    No    No
Ready for baseline?    No    No

---

## 16. Next approved phase

Approved next phase:

A4+R-10 — Candidate Drafts for REAL-EVENT-0001 and REAL-EVENT-0002

Deliverable:

docs/real-event-harvest/REAL_EVENT_CANDIDATE_DRAFTS_0001_0002_v0.1.4.md

Allowed:

Markdown candidate drafts
P/O/A rationale as non-final
preconditions rationale
anti-shortcut notes
review checklist before fixture conversion

Forbidden:

JSON fixtures
expected P/O/A
baseline promotion
engine changes

---

## 17. Final status

This document approves both events only for Markdown candidate drafting.

It does not create expected values.

It does not create JSON candidates.

It does not alter SERA.

It does not alter the causal baseline.
