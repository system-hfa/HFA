# Real Event Deep Extraction — REAL-EVENT-0003, REAL-EVENT-0004 and REAL-EVENT-0006 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-11 — Deep Factual Extraction  
Scope: deeper factual extraction for three additional Batch 1 real events  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document deepens the factual extraction for three additional real-event harvest cases:
- REAL-EVENT-0003 — S-76C+ Tofino
- REAL-EVENT-0004 — S-76C+ EC-JES Vigo
- REAL-EVENT-0006 — S-76C++ 5N-BQJ Bristow Nigeria
The purpose is to expand the real-event corpus beyond the first two candidate drafts before creating any JSON candidates.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not approve any candidate.
All SERA interpretations remain:
```text
DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON
```

---

## 2. Methodological rules for this document

Use factual material as the basis for SERA hypotheses.

Quarantine:

* probable cause;
* findings as to cause;
* recommendations;
* HFACS labels;
* investigator judgement;
* blame-like language;
* risk classifications from another method.

Allowed reasoning direction:

facts
→ safe operation escape point
→ unsafe act / unsafe condition
→ direct actor candidate
→ perception/objective/action questions
→ draft SERA hypothesis
→ human review

Forbidden reasoning direction:

report conclusion
→ SERA expected value

Also forbidden:

HFACS label
→ P/O/A code

---

PART A — REAL-EVENT-0003: S-76C+ Tofino

## 3. Identification

ID: REAL-EVENT-0003
Event: S-76C+ Tofino — loss of control during night approach / near CFIT
Aircraft/system: Sikorsky S-76C+, C-GHHJ
Operator: Helijet International Inc.
Occurrence date: 15 November 2015
Location/context: Tofino/Long Beach Airport, British Columbia
Operation type: night VFR medevac / helicopter transport
Source type: OFFICIAL_REPORT
Status: DRAFT_FOR_REVIEW

---

## 4. High-confidence factual chronology

### 4.1 Operational context

* The helicopter was operating a night VFR medical evacuation flight.
* Destination was Tofino/Long Beach Airport.
* The intended landing area was a temporarily lit helipad at the airport.
* The event occurred during a night visual approach.
* The occurrence involved two pilots and medical personnel.

### 4.2 Approach sequence

* The crew conducted a visual approach at night.
* The autopilot was disconnected during the approach.
* The aircraft manoeuvred toward the intended landing area.
* During final approach, the helicopter developed a low-speed and high-descent-rate state.
* Rotor speed decayed.
* Directional control degraded or was lost.
* The helicopter descended below the intended landing-area elevation and recovered at extremely low height.

### 4.3 Outcome

* The aircraft narrowly avoided terrain/water impact.
* The event is a near-CFIT / loss-of-control during night approach case.
* The later landing was completed after recovery.

---

## 5. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Night VFR medevac    medical evacuation operation at night    operational context    not causal by itself
Temporarily lit landing area    non-standard / temporary visual-cue environment    visual-cue precondition    not automatic P failure
Visual approach    final approach relied on external cues    context for P/O/A    not unsafe by itself
Autopilot disconnected    transition to manual/less automated handling    action/workload context    not causal by itself
Low speed    unsafe energy state    unsafe state evidence    not P/O/A by itself
High descent rate    unsafe flight path    unsafe state evidence    not P/O/A by itself
Rotor speed decay    reduced performance/control margin    unsafe state evidence    could be consequence or causal chain
Directional control degradation    loss-of-control cue    unsafe state    avoid outcome bias
Recovery at very low height    near-CFIT severity    consequence/recovery evidence    not classification proof

---

## 6. Safe operation definition

Conduct the night visual approach only while maintaining adequate visual/instrument cues, safe airspeed, controlled descent rate, rotor speed within limits, directional control, and sufficient altitude margin for recovery or go-around.

---

## 7. Probable safe operation escape point

Candidate escape point:

The operation escaped safe functioning on final night approach after autopilot disconnection, when airspeed, descent rate, rotor speed and control margins degraded outside a safe recoverable profile.

More operationally precise formulation:

The safe-operation escape point occurred when the aircraft entered a low-speed/high-descent-rate state with rotor-speed decay before the crew recovered at extremely low height.

Status:

DRAFT
HUMAN_REVIEW_REQUIRED

---

## 8. Unsafe act / unsafe condition separation

### 8.1 Candidate unsafe act

The crew continued or manually managed the night visual approach while the helicopter's energy state and control margins degraded to a near-CFIT condition before recovery.

Limitations:

* This may overstate action if the primary mechanism was non-detection.
* PF/PM separation is required.
* It should not be converted directly into A-code.

### 8.2 Candidate unsafe condition

Night visual approach to a temporarily lit landing area with potentially insufficient external visual references, autopilot disconnection, low-altitude recovery margin and high workload.

---

## 9. Direct actor analysis

Primary direct actor candidate:

Flight crew, with PF/PM separation pending.

Required later refinement:

who was PF
who was PM
who disconnected or accepted autopilot disconnect
who monitored speed/descent/rotor speed
who recognized the unsafe state
who initiated recovery

---

## 10. Information available to the actors

Potentially available:

* flight instruments;
* airspeed;
* vertical speed;
* radar/barometric altitude;
* rotor speed;
* attitude;
* autopilot status;
* external visual cues from temporary lighting;
* crew monitoring and callouts.

Potentially degraded:

* external visual references;
* depth/height perception;
* night visual horizon;
* workload after autopilot disconnection;
* crew monitoring reliability during final approach.

---

## 11. Quarantined report material

Do not directly import as SERA expected values:

* TSB findings;
* conclusions about adequate visual references;
* organizational or SOP findings;
* recommendations;
* post-event safety action;
* any report conclusion about why the crew acted as they did.

These can guide review questions, but expected P/O/A must be supported by reconstructed SERA logic.

---

## 12. Draft SERA hypothesis — NOT expected value

Status:

DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON

### 12.1 Candidate safe_operation_escape_point

The night approach left safe operation when, after autopilot disconnection, the helicopter entered a low-speed/high-descent-rate state with rotor-speed decay before recovery at extremely low height.

### 12.2 Candidate unsafe_act_statement

The crew continued or manually controlled the approach while energy state, descent path and control margins degraded into a near-CFIT condition.

### 12.3 Candidate unsafe_condition_statement

Night visual approach to a temporarily lit landing area with potentially insufficient visual cues, autopilot disconnection, workload and low-altitude recovery margin.

### 12.4 Candidate direct_actor

Flight crew, with PF/PM separation pending.

### 12.5 Candidate perception statement

The crew may not have perceived the airspeed/descent/rotor-speed degradation early enough to prevent loss of control and very-low-height recovery.

Evidence strength:

MEDIUM/HIGH as hypothesis; source detail must be reviewed for callouts and instrument monitoring.

### 12.6 Candidate objective statement

The crew objective appears to have been to complete a night visual approach to the temporary landing area; evidence is insufficient at this stage to treat the objective as consciously unsafe.

Evidence strength:

LOW/MEDIUM for unsafe objective.

### 12.7 Candidate action statement

Manual control and energy management during final approach allowed low airspeed, high descent rate and rotor-speed decay to develop before recovery.

Evidence strength:

MEDIUM; exact control input attribution remains pending.

### 12.8 Candidate P/O/A

P candidate: plausible/strong if non-detection of energy/descent/rotor-speed degradation is central.
O candidate: weak unless visual-approach continuation under inadequate cues is shown to be consciously unsafe.
A candidate: plausible if manual control/energy management is central after perception and objective are found adequate.

Recommended current status:

P-likely or P/A ambiguous
NOT_EXPECTED_VALUE

### 12.9 Candidate preconditions

night visual environment
temporary landing area lighting
possible insufficient visual references
autopilot disconnection
crew monitoring
workload
energy-state awareness
SOP/stabilized approach criteria

---

## 13. Key unanswered questions

* Which pilot was PF during final approach?
* Which pilot disconnected or managed the autopilot?
* What were the callouts for airspeed, descent rate and rotor speed?
* Was the unsafe energy state visible on instruments before recovery?
* Did the crew lose external visual reference, or were cues misleading?
* Was a go-around considered?
* Were stabilized approach criteria defined and triggered?
* Was the primary mechanism non-perception, manual-control execution, or continuation objective?

---

## 14. Candidate use recommendation for REAL-EVENT-0003

Recommended use:

HIGH_PRIORITY_DEEP_REVIEW
GOOD_CANDIDATE_DRAFT_AFTER_REVIEW
ADVERSARIAL_NIGHT_APPROACH_CASE
PRECONDITIONS_CATALOG_SOURCE

Do not create fixture yet.

---

PART B — REAL-EVENT-0004: S-76C+ EC-JES Vigo

## 15. Identification

ID: REAL-EVENT-0004
Event: S-76C+ EC-JES Vigo — SAR training descent to low height
Aircraft/system: Sikorsky S-76C+, EC-JES
Operator: Babcock Mission Critical Services España
Occurrence date: 26 July 2019
Location/context: Vigo, Spain / Ria de Vigo
Operation type: nationally regulated Search and Rescue / training and validation exercise
Phase: approach / positioning for winch-operator training
Source type: OFFICIAL_REPORT / CIAIAC-led investigation, BEA notification
Status: DRAFT_FOR_REVIEW

---

## 16. High-confidence factual chronology

### 16.1 Operational context

* The helicopter was engaged in a Search and Rescue related operation/training context.
* The operation involved positioning for a training and validation exercise of a winch operator.
* The aircraft was in the approach/positioning phase.
* The event occurred over or near the sea in the Vigo area.

### 16.2 Unsafe-state development

* During positioning for the winch-operator training/validation exercise, the aircraft inadvertently descended.
* The helicopter reached approximately 50 ft above sea level.
* The descent occurred without a sound/aural warning.
* No injuries or aircraft damage were reported in the available notification summary.

---

## 17. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
SAR/training operation    mission/training context    task and workload precondition    not causal by itself
Winch-operator exercise    mission-specific task    attention/task management context    not direct P/O/A
Approach/positioning phase    low-height positioning context    escape point context    needs precise procedure
Inadvertent descent    unsafe flight path    unsafe state evidence    not automatic P/A
50 ft above sea level    very low height    severity / unsafe state    avoid outcome bias
No sound warning    degraded alerting barrier    precondition/barrier issue    not human error by itself
No damage/injury    outcome    consequence only    not causal evidence

---

## 18. Safe operation definition

Maintain the helicopter within the intended SAR/training positioning envelope, with altitude/height margins appropriate to the exercise, active monitoring of descent/height, and timely alerting or correction before the aircraft descends below the intended safe height.

---

## 19. Probable safe operation escape point

Candidate escape point:

The operation escaped safe functioning during positioning for the winch-operator training/validation exercise, when the aircraft descended below the intended safe height margin without timely warning or correction.

Status:

DRAFT
HUMAN_REVIEW_REQUIRED

---

## 20. Unsafe act / unsafe condition separation

### 20.1 Candidate unsafe act

The crew allowed or controlled the aircraft into a descent to very low height during SAR training positioning before timely correction.

Limitations:

* It is not yet clear whether the descent was commanded, automation-related, monitoring-related or perception-related.
* Mission-crew/flight-crew roles need separation.
* Do not convert directly into A-code.

### 20.2 Candidate unsafe condition

SAR/winch training positioning at low height over water, with high task workload and absent/degraded aural warning barrier.

---

## 21. Direct actor analysis

Primary direct actor candidate:

Flight crew during SAR positioning; possible mission-crew interaction pending.

Required later refinement:

PF/PM split
role of winch operator / mission crew
who monitored altitude/height
who controlled vertical profile
whether automation/hover modes were involved
who detected the low height

---

## 22. Information available to actors

Potentially available:

* radio/radar/barometric altitude;
* visual cues over water;
* intended training height/positioning profile;
* mission/task cues;
* crew monitoring;
* aural warning system, although no sound warning was triggered;
* SAR operating procedures.

Potentially degraded:

* warning barrier;
* visual height perception over water;
* attention allocation during training;
* monitoring discipline during mission-task positioning.

---

## 23. Quarantined report material

Do not directly import as SERA expected values:

* CIAIAC findings;
* causal statements;
* recommendations;
* judgement about training design;
* judgement about crew monitoring;
* system/automation conclusions beyond factual evidence.

---

## 24. Draft SERA hypothesis — NOT expected value

Status:

DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON

### 24.1 Candidate safe_operation_escape_point

The SAR training positioning task left safe operation when the helicopter descended below the intended height margin to approximately 50 ft above sea level without timely aural warning.

### 24.2 Candidate unsafe_act_statement

The crew allowed or controlled the helicopter into a very-low-height descent during positioning for SAR training.

### 24.3 Candidate unsafe_condition_statement

Low-height SAR/winch training over water with high task workload and absent/degraded aural warning barrier.

### 24.4 Candidate direct_actor

Flight crew, with possible mission-crew interaction pending.

### 24.5 Candidate perception statement

The crew may not have perceived the descent/height deviation early enough during the training positioning task, possibly because of workload, visual-height cue limitations or absent aural warning.

Evidence strength:

MEDIUM as hypothesis; full CIAIAC report needed for precise mechanism.

### 24.6 Candidate objective statement

The crew objective appears to have been to position the aircraft for SAR/winch training; evidence is insufficient to treat the training objective itself as unsafe.

Evidence strength:

LOW for unsafe objective.

### 24.7 Candidate action statement

Vertical profile/height control during positioning allowed descent to a very low height before recovery.

Evidence strength:

MEDIUM; exact control/automation status pending.

### 24.8 Candidate P/O/A

P candidate: plausible if descent/height deviation was not perceived early enough.
O candidate: weak unless training objective or planned height was incompatible with safe operation.
A candidate: plausible if vertical control/monitoring failed despite adequate perception and objective.

Recommended current status:

P/A ambiguous
NOT_EXPECTED_VALUE

### 24.9 Candidate preconditions

SAR training task
winch-operator validation
low-height over-water positioning
visual height cue limitations
aural warning barrier absent/degraded
crew workload
mission crew / flight crew interaction
monitoring responsibility

---

## 25. Key unanswered questions

* What was the intended training altitude/height?
* Was descent commanded, inadvertent, automation-related or monitoring-related?
* What alerting system should have generated a warning?
* Why was there no sound warning?
* Did the crew visually perceive height above water?
* Which crew member was responsible for altitude/height monitoring?
* What role did the winch operator or mission crew play?
* Was this a flight-crew active failure, mission-task precondition or system/barrier issue?

---

## 26. Candidate use recommendation for REAL-EVENT-0004

Recommended use:

VALIDATION_EXPANSION
MULTI_ACTOR_CASE
PRECONDITIONS_CATALOG_SOURCE
GOOD_CANDIDATE_DRAFT_AFTER_MORE_SOURCE_EXTRACTION

Do not create fixture yet.

---

PART C — REAL-EVENT-0006: S-76C++ 5N-BQJ Bristow Nigeria

## 27. Identification

ID: REAL-EVENT-0006
Event: S-76C++ 5N-BQJ Bristow Nigeria — DAFCS/TRIM FAIL and ditching
Aircraft/system: Sikorsky S-76C++, 5N-BQJ
Operator: Bristow Helicopters Nigeria Limited
Occurrence date: 03 February 2016
Location/context: offshore Lagos / 77 NM offshore
Operation type: offshore helicopter transport
Phase: return flight / en route offshore
Persons on board: 2 crew and 9 passengers
Source type: OFFICIAL_REPORT / PRELIMINARY_REPORT / INTERIM_STATEMENT
Status: DRAFT_FOR_REVIEW

---

## 28. High-confidence factual chronology

### 28.1 Operational context

* The helicopter was engaged in offshore transport between Lagos and ERHA FPSO.
* The return flight was from ERHA FPSO to Lagos.
* There were two crew and nine passengers on board.
* The First Officer was the Pilot Flying.
* The Captain was the Pilot Monitoring.
* The aircraft was maintaining approximately 3000 ft during the return sector.

### 28.2 Abnormal/system indications

* DAFCS and TRIM FAIL indications occurred during the outbound leg and were reset.
* During the inbound flight, repeated TRIM FAIL and DAFCS indications occurred again.
* Emergency/operating procedure material was consulted.
* The PF was instructed to keep hands and feet on the controls.

### 28.3 Outcome

* The aircraft ditched in the sea.
* The ditching occurred approximately 77 NM offshore on radial 139.
* Visibility was above 5 km according to interim material.
* There were no fatalities.
* The aircraft was destroyed after saltwater submersion.

---

## 29. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Offshore transport    Lagos / ERHA FPSO operation    operational context    not causal by itself
2 crew / 9 passengers    crew/passenger context    workload / consequence    not P/O/A
FO as PF, Captain as PM    role allocation    direct actor refinement    role actions still need detail
3000 ft    cruise/en route altitude    state context    not causal by itself
DAFCS indications    automation/control abnormality    unsafe condition / precondition    not automatic P/A
TRIM FAIL indications    control/trim abnormality    unsafe condition / precondition    not automatic P/A
repeated indications    recurring abnormal state    decision/procedure context    not automatic O
EOP consulted    abnormal procedure response    action/procedure context    not proof of checklist error
hands and feet on controls    manual-control attention    workload/control context    not failure by itself
ditching offshore    outcome/emergency state    consequence/recovery    avoid outcome bias
no fatalities    outcome    consequence only    not causal evidence

---

## 30. Safe operation definition

Manage recurring DAFCS/TRIM FAIL abnormal indications and any associated handling/control degradation while maintaining controlled flight, clear crew coordination, correct abnormal procedure execution, and timely selection of safe diversion/landing/ditching strategy if continued flight became unsafe.

---

## 31. Probable safe operation escape point

Candidate escape point:

The operation escaped safe functioning when recurring DAFCS/TRIM FAIL indications and possible handling/control degradation could no longer be managed as a stable abnormal condition during the offshore return flight.

Alternative formulation:

The safe-operation escape point may have occurred when the abnormal automation/trim condition transitioned from manageable warning/procedure handling into a flight-control or handling state requiring ditching.

Status:

DRAFT
HUMAN_REVIEW_REQUIRED

---

## 32. Unsafe act / unsafe condition separation

### 32.1 Candidate unsafe act

Insufficient evidence at this stage. Possible unsafe act candidates include abnormal procedure execution, manual control response, continuation/diversion/ditching decision or crew coordination, but none should be selected without deeper source review.

### 32.2 Candidate unsafe condition

Repeated DAFCS/TRIM FAIL indications and possible degraded flight-control/automation condition during offshore flight.

This is the dominant current framing.

---

## 33. Direct actor analysis

Primary direct actor candidate:

Flight crew, with known PF/PM roles: First Officer as PF and Captain as PM.

But direct actor status remains limited because this may be an unsafe-condition-dominant technical/system case.

Required later refinement:

what PF perceived
what PM perceived
who consulted or directed EOP use
what control response occurred
whether maintenance/system condition dominates
whether ditching was selected or unavoidable

---

## 34. Information available to the actors

Potentially available:

* DAFCS indication;
* TRIM FAIL indication;
* EOP / abnormal procedure;
* aircraft handling feel;
* altitude and flight path data;
* ATC communication;
* offshore distance and location;
* crew role allocation;
* weather/visibility.

Potentially degraded:

* automation / flight control support;
* trim system;
* manual-control workload;
* certainty about system state;
* available time for diagnosis;
* safe landing/diversion options offshore.

---

## 35. Quarantined report material

Do not directly import as SERA expected values:

* preliminary/interim causal statements;
* later final cause if present, unless separately reviewed;
* maintenance/design conclusions;
* checklist compliance judgement;
* crew performance judgement;
* operator/regulator recommendations;
* media or secondary commentary.

---

## 36. Draft SERA hypothesis — NOT expected value

Status:

DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON

### 36.1 Candidate safe_operation_escape_point

The offshore return flight left safe operation when recurring DAFCS/TRIM FAIL indications and possible flight-control/automation degradation could no longer be managed as a stable abnormal condition.

### 36.2 Candidate unsafe_act_statement

Insufficient evidence. Candidate active failures may involve abnormal procedure execution, manual-control response, continuation/diversion/ditching decision or crew coordination, but the current evidence is unsafe-condition dominant.

### 36.3 Candidate unsafe_condition_statement

Repeated DAFCS/TRIM FAIL indications and possible degraded flight-control/automation condition during offshore return flight.

### 36.4 Candidate direct_actor

Flight crew; FO was PF and Captain was PM, but unsafe-condition-dominant framing remains possible.

### 36.5 Candidate perception statement

The crew may have had incomplete or unstable understanding of the actual automation/trim/control state as repeated indications occurred.

Evidence strength:

LOW/MEDIUM; do not infer automation confusion without further evidence.

### 36.6 Candidate objective statement

The crew objective appears to have been to manage the abnormal condition and continue toward a safe outcome; evidence is insufficient to classify the objective as unsafe.

Evidence strength:

LOW for unsafe objective.

### 36.7 Candidate action statement

Manual control, abnormal procedure execution, or emergency-response actions may be relevant, but current evidence does not support selecting one as the dominant active failure.

Evidence strength:

LOW/MEDIUM; requires deeper report review.

### 36.8 Candidate P/O/A

P candidate: possible if crew misunderstood the actual automation/control state.
O candidate: weak unless continuation/strategy is shown to be incompatible with safe operation.
A candidate: possible if abnormal procedure execution or manual control response is shown to be central.
Current status: insufficient for P/O/A candidate draft; preserve as unsafe-condition-dominant adversarial case.

Recommended current status:

INSUFFICIENT_FOR_AXIS_EXPECTED
UNSAFE_CONDITION_DOMINANT
NOT_EXPECTED_VALUE

### 36.9 Candidate preconditions

DAFCS/TRIM FAIL recurrence
automation / flight-control system degradation
manual-control workload
EOP/checklist workload
offshore distance
known PF/PM role allocation
emergency/ditching context
uncertainty about technical failure mode

---

## 37. Key unanswered questions

* What exactly failed?
* Were DAFCS/TRIM FAIL indications causal, symptomatic or recoverable?
* What EOP steps were performed?
* What was reset and when?
* What did PF and PM believe the aircraft state was?
* Was manual control degraded?
* Was ditching selected proactively or forced by aircraft state?
* Were maintenance/system factors more central than crew response?
* Is there enough factual material for a SERA active failure, or should this remain unsafe-condition dominant?

---

## 38. Candidate use recommendation for REAL-EVENT-0006

Recommended use:

ADVERSARIAL_UNSAFE_CONDITION_DOMINANT
PRECONDITIONS_CATALOG_SOURCE
RISK_LAYER_FUTURE_SOURCE
REQUIRES_MORE_SOURCE_EXTRACTION_BEFORE_CANDIDATE_DRAFT

Do not create fixture yet.

---

PART D — Comparative methodological value

## 39. Why these three events belong together

These events extend the real-event corpus beyond the first two candidate drafts.

Dimension    REAL-EVENT-0003 Tofino    REAL-EVENT-0004 Vigo    REAL-EVENT-0006 5N-BQJ
Core theme    night approach energy/control    SAR training low-height descent    automation/trim/control system abnormality
Likely use    P/A candidate after review    P/A or multi-actor case after more source extraction    unsafe-condition-dominant adversarial case
Main risk of shortcut    night/black-hole = P automatically    warning absent = human failure automatically    technical failure = crew error automatically
Candidate readiness    medium/high after review    medium after more source review    low for P/O/A, high for preconditions/adversarial use

---

## 40. Recommended next phase

Recommended next phase:

A4+R-12 — Review Decision for REAL-EVENT-0003, REAL-EVENT-0004 and REAL-EVENT-0006

Expected decisions likely:

REAL-EVENT-0003:
possible APPROVE_FOR_CANDIDATE_DRAFT after review
REAL-EVENT-0004:
likely REQUIRES_MORE_SOURCE_EXTRACTION or MULTI_ACTOR_CANDIDATE_DRAFT
REAL-EVENT-0006:
likely KEEP_AS_FACTUAL_HARVEST_ONLY / PRECONDITIONS_CATALOG_SOURCE / UNSAFE_CONDITION_DOMINANT_ADVERSARIAL

Do not create JSON fixtures yet.

---

## 41. Final status

This document deepens factual extraction only.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
