# Real Event Candidate Drafts — REAL-EVENT-0001 and REAL-EVENT-0002 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-10 — Candidate Drafts in Markdown  
Scope: candidate-quality Markdown drafts for two reviewed real events  
Non-scope: JSON fixture creation, final expected P/O/A assignment, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document converts the A4+R-9 review decisions for REAL-EVENT-0001 and REAL-EVENT-0002 into Markdown candidate drafts.
These drafts are intended to support future human review and possible later fixture design.
They do not create JSON fixtures.
They do not assign final expected P/O/A.
They do not promote any event to baseline.
They do not modify SERA engine behavior.
All classifications below remain:
```text
DRAFT_FOR_REVIEW
NOT_EXPECTED_VALUE
NO_FIXTURE_JSON
HUMAN_REVIEW_REQUIRED
```

---

## 2. Candidate draft status summary

Event    Draft status    Axis status    Intended use
REAL-EVENT-0001 — S-92A CHO Thebaud    APPROVE_FOR_CANDIDATE_DRAFT    P-likely, A-plausible, O-weak    candidate draft for DVE / low-energy / perception-monitoring
REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh    APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL    ambiguous P/O/A    adversarial candidate draft for warning/go-around/planning ambiguity

---

PART A — Candidate Draft: REAL-EVENT-0001

## 3. Candidate identity

ID: REAL-EVENT-0001
Event: S-92A CHO Thebaud — inadvertent descent during offshore approach
Aircraft/system: Sikorsky S-92A, C-GICB
Operation type: offshore helicopter transport
Primary source family: TSB A19A0055
Candidate draft status: APPROVE_FOR_CANDIDATE_DRAFT
Fixture status: NO_FIXTURE_JSON
Expected-value status: NOT_EXPECTED_VALUE

---

## 4. Candidate factual core

The factual core to preserve in future candidate design is:

* offshore IFR flight to Thebaud Central Facility;
* two instrument approaches attempted and unsuccessful due to low clouds / poor visibility;
* visual contact acquired during the second missed approach;
* crew elected to conduct a visual approach;
* shortly after commencing visual approach, high-rate-of-descent and low-airspeed condition developed;
* aircraft descended to very low height above water before recovery;
* engines reached 146% torque during recovery;
* EGPWS did not provide warning in the gear-down, below-50-KIAS envelope;
* no injuries.

Do not include report conclusions as expected values.

---

## 5. Candidate safe operation

Maintain a stabilized, monitored offshore approach profile with adequate visual/instrument cues, safe airspeed, controlled descent rate, recoverable energy state, and timely missed approach/go-around if the approach became unstable or cues were inadequate.

---

## 6. Candidate safe operation escape point

Preferred draft wording:

The operation escaped safe functioning when, after unsuccessful instrument approach attempts and a transition to a visual offshore approach, the helicopter entered a low-airspeed/high-rate-of-descent state that was not detected or corrected before reaching very low height above the water.

Review status:

ESCAPE_POINT_ACCEPT

---

## 7. Candidate unsafe act statement

Preferred draft wording:

The flight crew continued or managed the visual offshore approach while the aircraft energy state degraded into low airspeed and high descent rate before late recovery.

Review status:

UNSAFE_ACT_REVISE

Caution:

Avoid implying conscious continuation into a known unsafe state unless later evidence supports it.

---

## 8. Candidate unsafe condition statement

Preferred draft wording:

Offshore visual approach in degraded visual environment, with limited external horizon/visual cues and an EGPWS coverage gap for gear-down, below-50-KIAS inadvertent descent.

Review status:

UNSAFE_CONDITION_ACCEPT

---

## 9. Candidate direct actor

Flight crew, PF/PM separation pending.

Review status:

DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM

Do not force PF or PM attribution before source review supports it.

---

## 10. Candidate statements

### 10.1 Perception statement

The crew did not appear to recognize the low-energy/high-descent-rate state early enough to prevent the descent to very low height.

Candidate strength:

P_STRONG_CANDIDATE

### 10.2 Objective statement

The crew objective shifted from missed approach/instrument approach attempts to completing a visual approach after acquiring visual contact with the platform; evidence is insufficient to treat this objective as consciously unsafe.

Candidate strength:

O_WEAK_CANDIDATE

### 10.3 Action statement

Flight path, power and energy management allowed low airspeed and high descent rate to develop before late recovery; exact control input attribution remains pending.

Candidate strength:

A_PLAUSIBLE_CANDIDATE

---

## 11. Candidate axis rationale

Current recommended non-final axis status:

P-likely
A-plausible
O-weak
NOT_EXPECTED_VALUE

Rationale:

* P is strongest because the unsafe low-energy/high-descent-rate state appears central and was not corrected before very low height.
* A remains plausible because aircraft energy/flight path management was involved.
* O remains weak because the transition to visual approach is factual, but evidence is insufficient to classify the objective itself as consciously or primarily unsafe.
* The EGPWS gap should be handled as barrier/precondition, not as proof against human-factor involvement.

---

## 12. Candidate preconditions rationale

Candidate preconditions:

DVE / fog
lack of discernible horizon
offshore helideck visual-cue environment
transition from instrument approach attempts to visual approach
crew focus on platform/helideck cues
EGPWS coverage gap
low-speed / gear-down configuration
SOP / callout / monitoring context

Preconditions status:

PRECONDITIONS_STRONG

---

## 13. Anti-shortcut notes for REAL-EVENT-0001

Reject the following shortcuts:

Shortcut    Decision
DVE = P automatically    REJECT
EGPWS gap = no human factor    REJECT
Visual approach after failed instrument approaches = O automatically    REJECT
Overtorque = A automatically    REJECT
Near-water recovery height = severity proves classification    REJECT

---

## 14. Before converting REAL-EVENT-0001 to JSON candidate

Required before JSON:

* PF/PM split reviewed.
* Callout timing reviewed.
* Stabilized approach criteria reviewed.
* Exact evidence of non-perception separated from TSB conclusions.
* The second inadvertent descent classified as separate event, corroborating event or same causal pattern.
* Human reviewer explicitly approves expected P/O/A.
* Regression risk against causal baseline reviewed.

---

PART B — Candidate Draft: REAL-EVENT-0002

## 15. Candidate identity

ID: REAL-EVENT-0002
Event: S-76C++ G-WIWI Peasmarsh — discontinued night approach and near tree impact
Aircraft/system: Sikorsky S-76C++ / S-76C variant as identified in AAIB materials
Operation type: public transport / private landing site operation
Primary source family: AAIB Special Bulletin / Field Investigation
Candidate draft status: APPROVE_FOR_CANDIDATE_DRAFT_AS_ADVERSARIAL
Fixture status: NO_FIXTURE_JSON
Expected-value status: NOT_EXPECTED_VALUE

---

## 16. Candidate factual core

The factual core to preserve in future candidate design is:

* night flight to or from a private landing site;
* reduced visibility and low cloud;
* approach discontinued;
* no go-around procedure or route available/briefed;
* helicopter descended toward tree tops;
* EGPWS warnings were generated;
* crew were not aware of the warnings;
* no injuries;
* no aircraft damage.

Do not include report conclusions as expected values.

---

## 17. Candidate safe operation

Conduct a night approach to a private landing site only with adequate visual references, obstacle clearance, stabilized flight path, and a protected missed-approach/go-around plan; if the approach becomes unsuitable, discontinue using a safe, briefed route that maintains obstacle clearance.

---

## 18. Candidate safe operation escape point

Preferred draft wording:

The operation escaped safe functioning during the transition from night approach to discontinued approach/go-around, when degraded visual conditions and absence of a protected/briefed go-around route allowed the flight path to descend toward obstacles.

Review status:

ESCAPE_POINT_REVISE

Caution:

Do not anchor the escape point only at poor planning; the operational escape occurs when the discontinued/go-around path becomes unsafe.

---

## 19. Candidate unsafe act statement

Preferred draft wording:

The flight crew executed or transitioned into a discontinued approach/go-around trajectory that descended toward tree tops.

Review status:

UNSAFE_ACT_REVISE

Caution:

Do not treat the decision to discontinue as unsafe by itself; the unsafe element is the resulting flight path and obstacle proximity in the absence of a protected escape route.

---

## 20. Candidate unsafe condition statement

Preferred draft wording:

Night private-site approach in reduced visibility/low cloud, with nearby trees/obstacles and no available or briefed go-around procedure/routing.

Review status:

UNSAFE_CONDITION_ACCEPT

---

## 21. Candidate direct actor

Flight crew, PF/PM separation pending.

Review status:

DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM

Do not force PF or PM attribution before source review supports it.

---

## 22. Candidate statements

### 22.1 Perception statement

The crew did not appear to perceive or register the EGPWS warnings and/or obstacle proximity in time to prevent descent toward trees.

Candidate strength:

P_PLAUSIBLE_CANDIDATE

### 22.2 Objective statement

The crew objective appears to have been to discontinue the approach and transition to an alternate path, but the escape path was not pre-briefed or operationally protected.

Candidate strength:

O_PLAUSIBLE_CANDIDATE

### 22.3 Action statement

The flown path during the discontinued approach/go-around allowed descent toward obstacles.

Candidate strength:

A_PLAUSIBLE_CANDIDATE

---

## 23. Candidate axis rationale

Current recommended non-final axis status:

P-plausible
O-plausible
A-plausible
ADVERSARIAL_AMBIGUOUS_AXIS
NOT_EXPECTED_VALUE

Rationale:

* P is plausible because EGPWS warnings were generated but not perceived/registered by the crew.
* O is plausible because the discontinued approach/go-around path was not protected by a briefed route.
* A is plausible because the flown trajectory allowed descent toward obstacles.
* The event is valuable precisely because no single axis should be selected automatically.

---

## 24. Candidate preconditions rationale

Candidate preconditions:

night operation
private landing site
reduced visibility
low cloud
obstacle/trees environment
no available or briefed go-around routing
EGPWS warning not perceived
crew workload during discontinued approach
planning / briefing barrier degraded

Preconditions status:

PRECONDITIONS_STRONG

---

## 25. Anti-shortcut notes for REAL-EVENT-0002

Reject the following shortcuts:

Shortcut    Decision
Warning not perceived = P automatically    REJECT
No go-around route = O automatically    REJECT
Go-around trajectory issue = A automatically    REJECT
Night private site = P automatically    REJECT
Poor planning = direct actor classification    REJECT
Report finding = expected SERA value    REJECT

---

## 26. Before converting REAL-EVENT-0002 to JSON candidate

Required before JSON:

* PF/PM split reviewed.
* Exact reason for EGPWS non-awareness reviewed.
* Go-around/discontinued approach sequence reconstructed in detail.
* Whether planning/briefing is precondition or part of escape point settled.
* Whether this is single-actor, multi-layer or multi-actor decided.
* Human reviewer explicitly approves expected P/O/A or approves adversarial multi-axis expected structure.
* Regression risk against causal baseline reviewed.

---

PART C — Cross-event candidate rationale

## 27. Why these two drafts matter

These two events are useful together because they test similar operational themes with different causal structures.

Dimension    REAL-EVENT-0001 Thebaud    REAL-EVENT-0002 Peasmarsh
Environment    DVE/fog/no discernible horizon    night/private site/low cloud/trees
Transition    instrument attempts to visual approach    night approach to discontinued approach/go-around
Warning/barrier    EGPWS did not alert in envelope    EGPWS alerted but crew not aware
Axis status    P-likely    ambiguous P/O/A
Best use    candidate draft    adversarial candidate draft

---

## 28. Why not JSON yet

JSON candidates are not approved because:

* expected P/O/A is not final;
* direct actor is not fully separated into PF/PM where needed;
* source conclusions must remain quarantined;
* exact factual evidence needs one more reviewer pass;
* baseline impact has not been assessed;
* no runner validation plan exists for real-event candidates yet.

---

## 29. Next approved phase

Recommended next phase:

A4+R-11 — Deep Factual Extraction for REAL-EVENT-0003, REAL-EVENT-0004 and REAL-EVENT-0006

Purpose:

Continue expanding the real-event corpus before creating any JSON candidates.

Optional parallel phase:

A4+R-10b — Human Review Completion for Candidate Drafts 0001/0002

Purpose:

Have a human reviewer decide whether the Markdown drafts should later become candidate JSONs.

---

## 30. Final status

This document creates Markdown candidate drafts only.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
