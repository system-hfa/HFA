# Real Event Deep Extraction — Batch 2 Source-Ready Events v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-14 — Deep Factual Extraction for Source-Ready Batch 2 Events  
Scope: deeper factual extraction for four Batch 2 real events with confirmed official sources  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document deepens the factual extraction for the four Batch 2 real events classified as SOURCE_READY_OFFICIAL in the Batch 2 Source Quality Review (A4+R-13b):
- REAL-EVENT-0021 — Cessna 500 N8DX — Garmin/autopilot confusion and loss of control
- REAL-EVENT-0022 — S-76C++ N798P PHI — rollover on Vioska Knoll 956-A helideck
- REAL-EVENT-0024 — S-76C+ 5N-BGD — control pushrod separation, Lagos lagoon
- REAL-EVENT-0026 — S-76C++ N748P PHI — fatal bird strike / windshield penetration

These four events are selected because each has an identified official investigation source (NTSB, NSIB/AIB), avoiding placeholder-deepening risk.

REAL-EVENT-0023 (PK-TVY) and REAL-EVENT-0025 (PK-FUP) are deferred until further source enrichment.

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

Special rule for 0024 and 0026: when the dominant factor is an unsafe condition (mechanical failure, barrier/certification gap), do not force a human active failure. The methodology must allow UNSAFE_CONDITION_DOMINANT classification.

---
PART A — REAL-EVENT-0021: Cessna 500 N8DX

## 3. Identification

ID: REAL-EVENT-0021
Event: Cessna 500 N8DX — Garmin/autopilot confusion and loss of control
Aircraft/system: Cessna 500 Citation, registration N8DX
Operator: private operation
Occurrence date: 2 December 2016 (NTSB ERA17FA135)
Location/context: near Atlanta, Georgia area
Operation type: private IFR flight, single pilot
Source type: OFFICIAL_REPORT (NTSB ERA17FA135)
Status: DRAFT_FOR_REVIEW

---
## 4. High-confidence factual chronology

### 4.1 Operational context

* The aircraft was a Cessna 500 Citation operated under 14 CFR Part 91.
* The flight was a private IFR operation with a single pilot.
* The pilot was instrument-rated and had experience on the aircraft type.
* The aircraft was equipped with Garmin avionics and an autopilot system.

### 4.2 Event sequence

* During descent/approach phase, the pilot experienced difficulty with the avionics/autopilot interface.
* The aircraft entered an undesired flight path state.
* The pilot lost control of the aircraft.
* The aircraft entered a stall and/or spin condition.
* The aircraft impacted terrain.
* The accident was fatal.

### 4.3 Outcome

* Fatal accident.
* Aircraft destroyed.
* No survivors.

---
## 5. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Single-pilot IFR    one pilot managing all flight tasks    workload precondition    not causal by itself
Garmin avionics    glass-cockpit avionics suite    automation interface context    do not assume avionics design caused event
Autopilot confusion    difficulty with autopilot mode/modes    possible P or A evidence    do not assume mode confusion = P failure
Descent/approach phase    high-workload flight phase    task-saturation context    may support precondition, not axis
Loss of control    aircraft departed controlled flight    unsafe state    central to escape point
Stall/spin    aerodynamic stall/spin entry    unsafe state    consequence, not classification proof
Fatal outcome    no survivors    outcome severity    do not let severity drive classification

---
## 6. Safe operation definition

Maintain controlled IFR descent and approach with correct automation mode awareness, adequate airspeed and aircraft control throughout the descent/approach phase. If automation behaviour is unexpected or confusing, revert to basic manual control while maintaining safe flight parameters.

---
## 7. Safe operation escape point

### 7.1 Draft wording

The operation escaped safe functioning during the descent/approach when the pilot's interaction with the Garmin/autopilot interface resulted in loss of aircraft control, leading to a stall/spin entry from which recovery was not possible.

### 7.2 Reviewer notes

The escape point should focus on the transition from controlled IFR flight to loss of control.
Do not anchor the escape point at autopilot disengagement alone; the critical transition is when the flight path became unrecoverable.
Avoid language that assumes the pilot intentionally placed the aircraft in an unsafe state.

### 7.3 Status

ESCAPE_POINT_PLAUSIBLE_REQUIRES_REVIEW

---
## 8. Unsafe act / unsafe condition separation

### 8.1 Unsafe act candidate

The pilot's interaction with the Garmin/autopilot interface, possibly involving incorrect mode selection, misinterpretation of automation state, or failure to revert to basic manual control when automation behaviour became confusing.

Caution:
- Do not assume that mode confusion = deliberate unsafe act.
- Do not exclude the possibility that the avionics interface contributed to the confusion.
- The unsafe act may be cognitive (perception/understanding failure) rather than a deliberate control input error.

Status: UNSAFE_ACT_PLAUSIBLE_REQUIRES_REVIEW

### 8.2 Unsafe condition candidate

Single-pilot IFR operation with Garmin/autopilot interface complexity during a high-workload descent/approach phase. The avionics/autopilot interface may have presented ambiguous mode indications or unexpected behaviour that contributed to the pilot's loss of situational awareness and control.

Status: UNSAFE_CONDITION_PLAUSIBLE_REQUIRES_REVIEW

---
## 9. Direct actor

Single pilot — no PF/PM split applicable.
The direct actor is the sole pilot flying the aircraft.

Status: DIRECT_ACTOR_SINGLE_PILOT

---
## 10. Draft SERA hypothesis

### 10.1 Perception hypothesis

The pilot did not correctly perceive the autopilot mode state, the aircraft's energy/flight path degradation, or both, before loss of control became unrecoverable.

Candidate strength: P_STRONG_CANDIDATE

### 10.2 Objective hypothesis

The pilot's objective was to complete the descent/approach via the planned IFR routing. Evidence is insufficient to classify the objective itself as consciously unsafe.

Candidate strength: O_WEAK_CANDIDATE

### 10.3 Action hypothesis

The pilot's control inputs or automation commands placed or allowed the aircraft to enter an unrecoverable flight path. The action may have been downstream of perception failure rather than a consciously chosen unsafe action.

Candidate strength: A_PLAUSIBLE_CANDIDATE

### 10.4 Provisional axis status

P-likely
A-plausible
O-weak
NOT_EXPECTED_VALUE

---
## 11. Bias and anti-shortcut risks for 0021

Risk    Mitigation
Single-pilot = P failure automatically    REJECT — workload is a precondition, not an automatic P finding
Autopilot confusion = A failure    REJECT — mode confusion can be P (misperception) or UC (interface design)
Fatal outcome = severity proves classification    REJECT — outcome severity does not determine P/O/A
Glass cockpit = pilot should have known    REJECT — do not assume interface transparency
NTSB probable cause = SERA expected value    REJECT — quarantine report conclusions

---
## 12. Preconditions for 0021

Candidate preconditions:

* single-pilot IFR operation
* descent/approach phase workload
* Garmin avionics/autopilot interface
* possible automation mode ambiguity
* possible task saturation
* possible training/currency factors with glass-cockpit automation

Preconditions status: PRECONDITIONS_PLAUSIBLE_REQUIRES_REVIEW

---
PART B — REAL-EVENT-0022: S-76C++ N798P PHI

## 13. Identification

ID: REAL-EVENT-0022
Event: S-76C++ N798P PHI — rollover on Vioska Knoll 956-A helideck
Aircraft/system: Sikorsky S-76C++, registration N798P
Operator: PHI, Inc.
Occurrence date: 2010 (NTSB CEN10FA079)
Location/context: Vioska Knoll 956-A, Gulf of Mexico offshore helideck
Operation type: offshore helicopter transport, helideck repositioning
Source type: OFFICIAL_REPORT (NTSB CEN10FA079)
Status: DRAFT_FOR_REVIEW

---
## 14. High-confidence factual chronology

### 14.1 Operational context

* The helicopter was operating in support of offshore oil and gas operations in the Gulf of Mexico.
* The flight involved landing on an offshore helideck (Vioska Knoll 956-A).
* Two pilots were on board.

### 14.2 Event sequence

* The helicopter landed on the helideck.
* The crew initiated a repositioning manoeuvre — likely a turn or hover-taxi on the helideck.
* During the ground-repositioning/turn, the helicopter rolled over.
* The rollover occurred while the helicopter was in contact with the helideck surface or at very low height above it.
* The event involved wind conditions and possible helideck surface/contact dynamics.

### 14.3 Outcome

* Helicopter rolled over on the helideck.
* Extent of injuries and aircraft damage to be confirmed from NTSB report detail.
* The event is a helideck ground-handling rollover, not an in-flight loss of control.

---
## 15. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Offshore helideck    Vioska Knoll 956-A platform    operational context    not causal by itself
Helideck landing completed    aircraft was on deck before rollover    phase context    distinguishes from approach accident
Repositioning manoeuvre    turn or taxi on helideck    action context    critical for A analysis
Rollover    aircraft tipped/rolled on deck    unsafe state    central to escape point
Wind conditions    likely wind factor during repositioning    environmental precondition    do not equate wind = UC only
Helideck surface/contact    possible skid/surface interaction    precondition context    may be UC or barrier factor

---
## 16. Safe operation definition

Conduct helideck ground manoeuvres (repositioning, turns, hover-taxi) with adequate control margins for wind, helideck surface conditions and helicopter dynamics, maintaining full ground contact stability and preventing any tip/roll tendency.

---
## 17. Safe operation escape point

### 17.1 Draft wording

The operation escaped safe functioning during a helideck repositioning/turn manoeuvre when the helicopter exceeded its lateral stability margin and rolled over on the deck, transitioning from controlled ground handling to an unrecoverable tip/roll.

### 17.2 Reviewer notes

The escape point is a ground-handling dynamic rollover, not an in-flight event.
The critical question is whether the rollover resulted from a pilot control input, wind, helideck surface interaction, or a combination.
Do not assume the pilot intentionally placed the helicopter in an unstable attitude.

### 17.3 Status

ESCAPE_POINT_PLAUSIBLE_REQUIRES_REVIEW

---
## 18. Unsafe act / unsafe condition separation

### 18.1 Unsafe act candidate

The pilot's control inputs during the helideck repositioning/turn may have exceeded the helicopter's lateral stability margin for the prevailing wind and surface conditions. Alternatively, crew coordination during the turn may have contributed.

Caution:
- Do not assume the pilot intentionally made a sharp or unsafe turn.
- The rollover may have been initiated by wind gust or skid-surface contact dynamics.
- If the control input was appropriate for normal conditions, the event may be UC-dominant.

Status: UNSAFE_ACT_PLAUSIBLE_REQUIRES_REVIEW

### 18.2 Unsafe condition candidate

Helideck repositioning in wind conditions, with possible skid/surface interaction, limited visual references for deck-edge clearance, and the inherent narrow stability margin of a helicopter during ground-contact turns.

Status: UNSAFE_CONDITION_PLAUSIBLE_REQUIRES_REVIEW

---
## 19. Direct actor

Flight crew — PF/PM separation pending.
The pilot conducting the repositioning manoeuvre is the likely direct actor, but PF/PM roles during the turn must be confirmed from the NTSB report.

Status: DIRECT_ACTOR_FLIGHT_CREW_PENDING_PF_PM

---
## 20. Draft SERA hypothesis

### 20.1 Perception hypothesis

The pilot may not have perceived the developing roll tendency, the wind effect on lateral stability, or the proximity to the deck-edge stability limit in time to arrest the rollover.

Candidate strength: P_PLAUSIBLE_CANDIDATE

### 20.2 Objective hypothesis

The objective was to reposition the helicopter on the helideck. Evidence is insufficient to classify this objective as consciously unsafe.

Candidate strength: O_WEAK_CANDIDATE

### 20.3 Action hypothesis

The pilot's control inputs (cyclic, collective, pedal) during the turn/repositioning may have contributed to the rollover. The action may have been appropriate for normal conditions but inadequate for the prevailing wind/surface situation.

Candidate strength: A_PLAUSIBLE_CANDIDATE

### 20.4 Provisional axis status

P-plausible
A-plausible
O-weak
NOT_EXPECTED_VALUE

---
## 21. Bias and anti-shortcut risks for 0022

Risk    Mitigation
Helideck rollover = pilot mishandling    REJECT — wind/skid/contact dynamics may dominate
Helicopter dynamic rollover is well-known = P failure    REJECT — known hazard does not mean pilot perceived it in time
Offshore experience = should have prevented it    REJECT — experience does not guarantee perception of a fast-developing roll
Ground manoeuvre = minor event = low priority    REJECT — ground-handling rollovers can be fatal and are valid SERA cases
NTSB probable cause = SERA expected value    REJECT — quarantine report conclusions

---
## 22. Preconditions for 0022

Candidate preconditions:

* offshore helideck environment
* helideck surface condition and geometry
* wind conditions during ground manoeuvre
* helicopter lateral stability margin during ground contact
* PF/PM coordination during repositioning
* possible visual-reference limitations on helideck

Preconditions status: PRECONDITIONS_PLAUSIBLE_REQUIRES_REVIEW

---
PART C — REAL-EVENT-0024: S-76C+ 5N-BGD

## 23. Identification

ID: REAL-EVENT-0024
Event: S-76C+ 5N-BGD — control pushrod separation, Lagos lagoon
Aircraft/system: Sikorsky S-76C+, registration 5N-BGD
Operator: Nigerian operator
Occurrence date: to be confirmed from NSIB/AIB preliminary report
Location/context: Lagos lagoon, Nigeria
Operation type: offshore / transport helicopter operation
Source type: OFFICIAL_REPORT (NSIB/AIB preliminary)
Status: DRAFT_FOR_REVIEW

---
## 24. High-confidence factual chronology

### 24.1 Operational context

* The helicopter was a Sikorsky S-76C+ operating in Nigeria.
* The operation likely involved offshore or transport helicopter services.
* The exact date, operator name, persons on board, and flight phase to be confirmed from the NSIB/AIB preliminary report.

### 24.2 Event sequence

* During flight, a control pushrod separated.
* The pushrod separation resulted in a loss of or severe degradation of flight control in at least one axis.
* The crew was confronted with a critical mechanical failure.
* The helicopter was forced to ditch or conduct an emergency landing.
* The ditching/landing occurred in the Lagos lagoon area.

### 24.3 Outcome

* Forced ditching/emergency landing in water (Lagos lagoon).
* Injuries and aircraft damage to be confirmed from NSIB/AIB report.
* The event is a mechanical-failure-dominant case with potential maintenance and design/barrier implications.

---
## 25. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Control pushrod separation    mechanical failure of a flight-control component    unsafe condition    central UC evidence
Loss of control authority    flight control degraded or lost    unsafe state    not a human action
S-76C+ type    known pushrod/rod-end inspection history    barrier/design context    do not generalise from other S-76 pushrod events
Ditching in Lagos lagoon    forced water landing    outcome    outcome severity must not drive P/O/A
Nigerian operator    operating context    maintenance-practice context    do not assume maintenance deficiency without evidence

---
## 26. Safe operation definition

Operate the helicopter with all flight-control components intact, maintained in accordance with manufacturer requirements, with no undetected degradation or separation of any control pushrod, rod-end or linkage throughout the flight.

---
## 27. Safe operation escape point

### 27.1 Draft wording

Safe operation escaped when a control pushrod separated during flight, removing or severely degrading flight-control authority in at least one axis and forcing the crew into an emergency ditching/landing decision.

### 27.2 Reviewer notes

This is a mechanical-failure-dominant escape point.
The escape point should not be anchored at pilot response; it is anchored at the component separation.
The crew's response to the mechanical failure is a separate post-escape-point analysis — their actions may have mitigated or exacerbated the outcome but did not cause the escape from safe operation.

### 27.3 Status

ESCAPE_POINT_UNSAFE_CONDITION_DOMINANT

---
## 28. Unsafe act / unsafe condition separation

### 28.1 Unsafe act — preliminary assessment

The crew's response to the mechanical failure (ditching/landing execution, emergency-procedure compliance, crew coordination during the failure) may contain elements relevant to SERA analysis. However, the initiating event is mechanical, not a human active failure.

Status: UNSAFE_ACT_WEAK_OR_NONE

### 28.2 Unsafe condition

Control pushrod separation — a mechanical failure that removed normal flight-control authority. The unsafe condition may involve:
- a maintenance or inspection gap that did not detect the pushrod/rod-end degradation before failure;
- a design/barrier gap if the pushrod assembly lacks redundancy or if failure modes are not adequately protected;
- an operational exposure if the pushrod was subject to conditions outside its design limits.

This is the dominant unsafe element of the event.

Status: UNSAFE_CONDITION_DOMINANT

---
## 29. Direct actor

Not applicable in the traditional SERA sense — there is no clear human direct actor for the pushrod separation itself.
If a maintenance or inspection omission is identified, the direct actor may be maintenance personnel rather than flight crew.
If the pushrod failure was undetectable before flight, there may be no human direct actor.

Status: DIRECT_ACTOR_NOT_CLEAR_UNSAFE_CONDITION_DOMINANT

---
## 30. Draft SERA hypothesis

### 30.1 Perception hypothesis

The crew were confronted with a sudden control failure. Perception may be relevant to whether they correctly identified the nature of the failure, but perception of the initiating condition is not the primary axis.

Candidate strength: P_WEAK_OR_NOT_APPLICABLE

### 30.2 Objective hypothesis

The crew's objective shifted to emergency response. There is no evidence that the pre-failure objective was unsafe.

Candidate strength: O_WEAK_OR_NOT_APPLICABLE

### 30.3 Action hypothesis

The crew's emergency response actions (ditching execution, control of remaining axes, crew coordination) may be evaluated but are not the event's dominant causal factor. The primary unsafe element is the mechanical failure.

Candidate strength: A_WEAK_OR_NOT_APPLICABLE

### 30.4 Provisional axis status

P-weak/not applicable
O-weak/not applicable
A-weak/not applicable
UNSAFE_CONDITION_DOMINANT
NOT_EXPECTED_VALUE

---
## 31. Bias and anti-shortcut risks for 0024

Risk    Mitigation
Mechanical failure = must still find a human error    REJECT — this is the core anti-shortcut for UNSAFE_CONDITION_DOMINANT cases
Ditching = pilot could have prevented it    REJECT — the pilot's response is post-escape-point and must not be confused with causation
Pushrod separation = maintenance failure = human A    REJECT — maintenance gap is a separate inquiry and may be precondition or UC, not active failure
S-76 pushrod history = this event is the same    REJECT — each event must be evaluated on its own facts
NSIB/AIB preliminary = enough for expected value    REJECT — preliminary report is not a final classification

---
## 32. Preconditions for 0024

Candidate preconditions:

* S-76C+ control pushrod and rod-end assembly design
* maintenance and inspection programme for flight-control components
* possible undetected wear, corrosion or fatigue in the pushrod/rod-end
* operational exposure (cycles, environment, loading)
* single-point failure potential in the control system architecture

Preconditions status: PRECONDITIONS_STRONG_UNSAFE_CONDITION_CONTEXT

---
PART D — REAL-EVENT-0026: S-76C++ N748P PHI

## 33. Identification

ID: REAL-EVENT-0026
Event: S-76C++ N748P PHI — fatal bird strike / windshield penetration
Aircraft/system: Sikorsky S-76C++, registration N748P
Operator: PHI, Inc.
Occurrence date: 2009 (NTSB CEN09MA117)
Location/context: Gulf of Mexico, en route over water
Operation type: offshore helicopter transport, en route / cruise
Source type: OFFICIAL_REPORT (NTSB CEN09MA117)
Status: DRAFT_FOR_REVIEW

---
## 34. High-confidence factual chronology

### 34.1 Operational context

* The helicopter was operating in support of offshore oil and gas operations in the Gulf of Mexico.
* The flight was en route / cruise phase over water.
* Two pilots and passengers were on board (exact count to be confirmed from NTSB report).

### 34.2 Event sequence

* During cruise flight, a bird struck the helicopter windshield.
* The bird penetrated the windshield.
* The bird strike caused immediate and severe consequences for the cockpit environment and/or crew.
* The crew likely faced sudden incapacitation, loss of control, or emergency response challenges.
* The helicopter impacted the water or was forced to ditch.

### 34.3 Outcome

* Fatal accident.
* Multiple fatalities confirmed.
* Aircraft likely destroyed or substantially damaged.

---
## 35. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Bird strike    collision with bird during cruise    initiating event    not a human action or failure
Windshield penetration    bird penetrated cockpit windshield    barrier failure    central UC/barrier evidence
Cruise flight over water    offshore en-route phase    operational context    not causal by itself
Fatal outcome    fatalities    outcome severity    do not let severity drive classification
S-76C++ windshield    certified barrier    certification/design context    barrier performance is the key question

---
## 36. Safe operation definition

Operate the helicopter with a windshield and airframe structure that provides adequate protection against bird strikes at cruise speeds, maintaining crew protection, aircraft controllability and the ability to continue safe flight after any reasonably foreseeable bird-strike event.

---
## 37. Safe operation escape point

### 37.1 Draft wording

Safe operation escaped when a bird penetrated the cockpit windshield during cruise flight, breaching the primary crew-protection barrier and creating conditions (possible crew incapacitation, cockpit environmental disruption, loss of control) from which safe flight could no longer be maintained.

### 37.2 Reviewer notes

This is a barrier/certification-dominant escape point.
The escape point is the windshield penetration, not any crew action.
The crew's post-strike response may be analysed separately, but the initiating escape from safe operation is the barrier breach.
Do not frame this as a crew-response failure unless post-penetration actions independently created an unsafe state that would not otherwise have existed.

### 37.3 Status

ESCAPE_POINT_UNSAFE_CONDITION_BARRIER_DOMINANT

---
## 38. Unsafe act / unsafe condition separation

### 38.1 Unsafe act — preliminary assessment

The crew may have had no opportunity to act before the consequences of the bird strike rendered them incapacitated or the aircraft uncontrollable.
If the crew were partially capable of responding, their post-strike actions (ditching, control, emergency procedures) may be analysed but are downstream of the initiating barrier breach.

Status: UNSAFE_ACT_WEAK_OR_NOT_APPLICABLE

### 38.2 Unsafe condition

The unsafe condition is the windshield penetration by a bird strike — a barrier/certification issue.
Key questions:
- Was the windshield certified for the bird mass and speed at the time of the strike?
- Was there a gap between certification requirements and the actual strike energy?
- Was the windshield maintained and inspected per requirements?
- Was the bird species/mass within or beyond the certification envelope?

This is the dominant unsafe element of the event.

Status: UNSAFE_CONDITION_DOMINANT_BARRIER_CERTIFICATION

---
## 39. Direct actor

Not applicable in the traditional SERA sense — there is no human direct actor for the bird strike or windshield penetration.
If the crew were incapacitated, they could not act.
If certification or design is the unsafe condition, the direct actor is not flight crew.

Status: DIRECT_ACTOR_NOT_CLEAR_UNSAFE_CONDITION_DOMINANT

---
## 40. Draft SERA hypothesis

### 40.1 Perception hypothesis

If the crew were immediately incapacitated by the windshield penetration, perception is not a meaningful axis. If the crew retained partial capability, perception of the emergency state may be analysed but is secondary to the barrier breach.

Candidate strength: P_WEAK_OR_NOT_APPLICABLE

### 40.2 Objective hypothesis

The pre-strike objective (cruise flight to destination) was not unsafe. Post-strike objectives may have included emergency response, but these are downstream of the initiating event.

Candidate strength: O_WEAK_OR_NOT_APPLICABLE

### 40.3 Action hypothesis

If the crew were incapacitated, no action analysis is possible. If partial capability remained, action analysis (ditching, mayday, control) is secondary and must not be confused with causation.

Candidate strength: A_WEAK_OR_NOT_APPLICABLE

### 40.4 Provisional axis status

P-weak/not applicable
O-weak/not applicable
A-weak/not applicable
UNSAFE_CONDITION_DOMINANT_BARRIER_CERTIFICATION
NOT_EXPECTED_VALUE

---
## 41. Bias and anti-shortcut risks for 0026

Risk    Mitigation
Fatal outcome = must find a human error    REJECT — the barrier/certification gap is the primary unsafe element
Bird strike is an act of nature = not a SERA case    REJECT — barrier and certification analysis is well within SERA scope for UC and preconditions
Crew could have avoided the bird    REJECT — bird-strike avoidance in cruise at altitude is not a reasonable expectation
Windshield certification = no safety issue    REJECT — certification standards may not match real-world strike energies
NTSB probable cause = SERA expected value    REJECT — quarantine report conclusions

---
## 42. Preconditions for 0026

Candidate preconditions:

* offshore cruise flight over water
* bird species and mass relative to windshield certification envelope
* windshield design, certification standard and maintenance history
* possible crew incapacitation from windshield penetration
* single-pilot or dual-pilot post-strike controllability
* ditching/emergency-landing options over open water

Preconditions status: PRECONDITIONS_STRONG_BARRIER_CERTIFICATION_CONTEXT

---
PART E — Cross-event analysis

## 43. Why these four events together

These four Batch 2 source-ready events complement the Batch 1 deep extractions by expanding the SERA corpus across new dimensions:

Dimension    0021 N8DX    0022 N798P    0024 5N-BGD    0026 N748P
Aircraft type    fixed-wing (Cessna 500)    helicopter (S-76)    helicopter (S-76)    helicopter (S-76)
Operation    private IFR    offshore helideck    offshore/transport    offshore transport
Primary theme    automation/avionics confusion    helideck ground rollover    mechanical failure    barrier/certification breach
Axis profile    P-likely, A-plausible    P/A ambiguous    UNSAFE_CONDITION_DOMINANT    UNSAFE_CONDITION_DOMINANT
Serum for    single-pilot automation cognitive cases    helideck ground-handling cases    mechanical/UC adversarial cases    barrier/certification adversarial cases
SERA value    broadens beyond helicopter    expands helideck corpus    protects against forced human error    protects against forced human error

---
## 44. Relationship to Batch 1 events

Reference event    Relationship to Batch 2
REAL-EVENT-0001 Thebaud    0021 shares automation/mode-awareness theme but in fixed-wing single-pilot context
REAL-EVENT-0002 Peasmarsh    0022 shares approach-transition theme but as ground rollover, not in-flight CFIT
REAL-EVENT-0006 5N-BQJ    0024 parallels as mechanical/UC-dominant S-76 case; together they strengthen the UC-adversarial corpus
REAL-EVENT-0003 Tofino    0022 and 0021 share unsafe-state-from-transition theme in different aircraft types

---
## 45. Recommended split for A4+R-15 review decision

Based on the deep extraction, the A4+R-15 review decision should separate these four events into two tracks:

Track 1 — Candidate draft candidates:
- REAL-EVENT-0021 N8DX — strong P/A candidate, single-pilot automation
- REAL-EVENT-0022 N798P — P/A candidate, helideck ground handling

Track 2 — Unsafe-condition/preconditions/risk-layer sources:
- REAL-EVENT-0024 5N-BGD — UNSAFE_CONDITION_DOMINANT, mechanical/barrier
- REAL-EVENT-0026 N748P — UNSAFE_CONDITION_DOMINANT, barrier/certification

Track 2 events should remain as factual harvest and not be forced into P/O/A candidate drafts.
They retain high value for adversarial testing, preconditions cataloguing and future risk-layer work.

---
## 46. Next approved phase

Recommended next phase:

A4+R-15 — Review Decision for Batch 2 Source-Ready Events

Purpose: separate the four deep extractions into candidate-draft track (0021, 0022) and unsafe-condition/preconditions track (0024, 0026), applying the same review criteria as the Batch 1 review decisions.

Do not create JSON fixtures yet.
Do not assign final expected P/O/A.

---
## 47. Final status

This document deepens factual extraction for four Batch 2 source-ready events.

It does not create expected values.
It does not create JSON fixtures.
It does not alter SERA.
It does not alter the causal baseline.
It does not approve any event for baseline or candidate JSON.

All events remain:
```text
DRAFT_FOR_REVIEW
NOT_EXPECTED_VALUE
NO_FIXTURE_JSON
HUMAN_REVIEW_REQUIRED
```
