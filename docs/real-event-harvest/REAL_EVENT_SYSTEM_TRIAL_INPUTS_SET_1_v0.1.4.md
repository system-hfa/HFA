# Real Event System Trial Inputs — Set 1 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-18 — Neutral Input Narratives for First System Trial Set  
Scope: neutral factual narratives for first HFA/SERA real-event system analysis trial  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document defines the first set of neutral factual input narratives to be used in HFA/SERA system analysis trials.
The goal is to test whether HFA/SERA analyzes real events according to the SERA causal workflow.
This document does not run the system.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not alter SERA.
This document blocks A5 Risk Layer until real-event causal assurance is demonstrated.
---
## 2. Input narrative rules
Each narrative must be factual and neutral.
Allowed content:
```text
who / what / where / when
operation type
phase of operation
chronological sequence
unsafe state development
available cues and barriers
known missing data
```
Forbidden content:
```text
probable cause
findings
recommendations
HFACS labels
SERA candidate axis
review decision label
expected P/O/A
risk-layer language
blame-like language
```
The input narrative must not tell the system what to classify.

---
## 3. Trial set

Trial ID    Event ID    Event    Trial purpose
TRIAL-SET1-001    REAL-EVENT-0001    S-92A Thebaud    DVE / low-energy / monitoring / degraded warning barrier
TRIAL-SET1-002    REAL-EVENT-0002    S-76C++ G-WIWI Peasmarsh    ambiguous warning / go-around / planning / obstacle case
TRIAL-SET1-003    REAL-EVENT-0003    S-76C+ Tofino    night approach energy/control P-A boundary
TRIAL-SET1-004    REAL-EVENT-0006    S-76C++ 5N-BQJ Bristow Nigeria    unsafe-condition-dominant automation/trim abnormal case
TRIAL-SET1-005    REAL-EVENT-0021    Cessna 500 N8DX    automation/mode-awareness P-A boundary

---
PART A — TRIAL-SET1-001 / REAL-EVENT-0001

## 4. Event identity

Event ID: REAL-EVENT-0001
Trial ID: TRIAL-SET1-001
Aircraft: Sikorsky S-92A
Operation: offshore helicopter transport
Location/context: Thebaud Central Facility offshore approach
Input status: NEUTRAL_INPUT_DRAFT
Expected value status: NOT_EXPECTED_VALUE
Fixture status: NO_FIXTURE_JSON

---
## 5. Neutral input narrative

A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.

---
## 6. Input contamination check

Check    Status
Probable cause removed    YES
Findings removed    YES
Recommendations removed    YES
HFACS labels removed    YES
SERA axis hints removed    YES
Risk-layer wording removed    YES
Missing data retained    YES

---
PART B — TRIAL-SET1-002 / REAL-EVENT-0002

## 7. Event identity

Event ID: REAL-EVENT-0002
Trial ID: TRIAL-SET1-002
Aircraft: Sikorsky S-76C++ / S-76C variant as identified in source material
Operation: public transport / private landing site operation
Location/context: Peasmarsh, East Sussex
Input status: NEUTRAL_INPUT_DRAFT
Expected value status: NOT_EXPECTED_VALUE
Fixture status: NO_FIXTURE_JSON

---
## 8. Neutral input narrative

A Sikorsky S-76 helicopter was operating at night in connection with a flight involving a private landing site near Peasmarsh, East Sussex. The operation involved two crew members and passengers. Weather and visibility conditions included reduced visibility and low cloud.

During the night approach to the private landing site, the approach was discontinued. A protected or briefed go-around route was not available in the information prepared for the operation. After the approach was discontinued, the helicopter descended toward the tops of nearby trees.

The aircraft warning system generated terrain or ground-proximity warnings during the event. The crew did not become aware of those warnings in time to prevent the low-altitude proximity to obstacles. No injuries and no aircraft damage were reported in the summarized event information.

Available information included visual references at night, flight instruments, obstacle environment, crew monitoring, warning-system output and pre-approach planning or briefing. The neutral input does not establish the exact reason the warning was not perceived or registered, the exact flown path, the precise pilot flying / pilot monitoring roles, or the exact decision sequence during the discontinued approach.

---
## 9. Input contamination check

Check    Status
Probable cause removed    YES
Findings removed    YES
Recommendations removed    YES
HFACS labels removed    YES
SERA axis hints removed    YES
Risk-layer wording removed    YES
Missing data retained    YES

---
PART C — TRIAL-SET1-003 / REAL-EVENT-0003

## 10. Event identity

Event ID: REAL-EVENT-0003
Trial ID: TRIAL-SET1-003
Aircraft: Sikorsky S-76C+
Operation: night VFR medevac / helicopter transport
Location/context: Tofino/Long Beach Airport
Input status: NEUTRAL_INPUT_DRAFT
Expected value status: NOT_EXPECTED_VALUE
Fixture status: NO_FIXTURE_JSON

---
## 11. Neutral input narrative

A Sikorsky S-76C+ was conducting a night VFR medical evacuation flight to Tofino/Long Beach Airport. The operation involved a night visual approach to a landing area at or near the airport.

During the approach, the autopilot was disconnected. The helicopter was then maneuvered toward the intended landing area. During the final portion of the approach, the aircraft developed low airspeed and a high rate of descent. Rotor speed decreased, and directional control degraded.

The helicopter descended below the intended safe profile and recovered at extremely low height before completing a subsequent landing. The event occurred during a night visual approach environment with limited recovery margin.

Available information included flight instruments, airspeed, descent information, rotor speed, attitude, autopilot status, external visual references, crew monitoring and procedures. This neutral input does not establish the exact callouts, the exact visual cues available to the crew, the precise division of crew duties, or the exact timing of recognition and recovery.

---
## 12. Input contamination check

Check    Status
Probable cause removed    YES
Findings removed    YES
Recommendations removed    YES
HFACS labels removed    YES
SERA axis hints removed    YES
Risk-layer wording removed    YES
Missing data retained    YES

---
PART D — TRIAL-SET1-004 / REAL-EVENT-0006

## 13. Event identity

Event ID: REAL-EVENT-0006
Trial ID: TRIAL-SET1-004
Aircraft: Sikorsky S-76C++
Operation: offshore helicopter transport
Location/context: return flight from ERHA FPSO toward Lagos
Input status: NEUTRAL_INPUT_DRAFT
Expected value status: NOT_EXPECTED_VALUE
Fixture status: NO_FIXTURE_JSON

---
## 14. Neutral input narrative

A Sikorsky S-76C++ was operating an offshore transport flight involving Lagos and ERHA FPSO. During the return flight from the offshore facility toward Lagos, there were two flight crew members and passengers on board. The first officer was pilot flying and the captain was pilot monitoring according to the available source material.

During the flight, repeated DAFCS and TRIM FAIL indications occurred. Similar indications had reportedly occurred on an earlier sector and had been reset. During the return sector, emergency or abnormal procedure material was consulted, and the pilot flying was instructed to keep hands and feet on the controls.

The event developed into an offshore ditching. The occupants survived, and the aircraft was destroyed after saltwater submersion. The event occurred in an offshore environment with abnormal automation or trim indications and potential flight-control or handling concerns.

Available information included cockpit indications, emergency/abnormal procedures, aircraft handling cues, altitude/flight path information, crew role allocation, offshore location and communication with air traffic services. This neutral input does not establish the exact technical failure sequence, whether the indications were causal or symptomatic, the exact checklist steps performed, the crew's understanding of the system state, or whether ditching was selected or forced by aircraft controllability.

---
## 15. Input contamination check

Check    Status
Probable cause removed    YES
Findings removed    YES
Recommendations removed    YES
HFACS labels removed    YES
SERA axis hints removed    YES
Risk-layer wording removed    YES
Missing data retained    YES

---
PART E — TRIAL-SET1-005 / REAL-EVENT-0021

## 16. Event identity

Event ID: REAL-EVENT-0021
Trial ID: TRIAL-SET1-005
Aircraft: Cessna 500 Citation
Operation: private IFR / single-pilot or private operation context
Location/context: near Marietta, Georgia
Input status: NEUTRAL_INPUT_DRAFT
Expected value status: NOT_EXPECTED_VALUE
Fixture status: NO_FIXTURE_JSON

---
## 17. Neutral input narrative

A Cessna 500 Citation was operating a private flight in instrument flight conditions or an instrument-flight context. The aircraft was being operated by a pilot who was managing aircraft flight path and equipment during the flight.

During the event sequence, aircraft control was lost, and the aircraft entered an aerodynamic stall/spin before colliding with terrain near Marietta, Georgia. The available source family identifies issues involving aircraft equipment knowledge, automation or avionics use, and control of the aircraft, but this neutral input does not import those findings as conclusions.

Available information included aircraft flight instruments, avionics or automation systems, pilot control inputs, flight path information, and equipment state or mode information. This neutral input does not establish the exact automation mode sequence, the exact pilot perception of avionics or automation state, the exact intended flight path, or the precise timing of any manual-control transition.

---
## 18. Input contamination check

Check    Status
Probable cause removed    YES
Findings removed    YES
Recommendations removed    YES
HFACS labels removed    YES
SERA axis hints removed    YES
Risk-layer wording removed    YES
Missing data retained    YES

---
PART F — Trial execution guidance

## 19. How these inputs should be used

Each narrative should be pasted into HFA/SERA as the event report/narrative.

The system output should then be evaluated against:

* Real Event SERA Method Assurance Protocol;
* Model Analysis Readiness Matrix;
* factual harvest;
* deep extraction;
* review decision;
* candidate draft where available.

The system should not be judged only by whether it selects the same P/O/A suggested in previous drafts.

It should be judged by whether the reasoning chain is methodologically sound.

---
## 20. Minimum acceptance criteria for the trial

For each output, check:

factual grounding
safe operation escape point
unsafe act / unsafe condition separation
direct actor
perception / objective / action statements
P/O/A rationale
preconditions
limitations
recommendations
anti-shortcut behavior

A system output may be acceptable even if P/O/A differs from the draft, provided the reasoning is evidence-supported and avoids shortcuts.

A system output must be rejected if it:

imports report conclusions as SERA expected values
forces human error in unsafe-condition-dominant cases
omits safe operation escape point
collapses unsafe act and unsafe condition
inventes actor intent
ignores missing data
uses severity as classification proof

---
## 21. Next phase

Recommended next phase:

A4+R-19 — Run First Real Event System Trial and Capture Outputs

Deliverable:

docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_RESULTS_SET_1_v0.1.4.md

That document should capture the HFA/SERA output for each trial input and score it using the Method Assurance Protocol.

---
## 22. Final status

This document creates neutral input narratives only.

It does not run the system.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
