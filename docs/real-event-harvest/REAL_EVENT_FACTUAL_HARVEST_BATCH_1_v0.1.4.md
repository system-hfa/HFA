# Real Event Factual Harvest — Batch 1 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-6 — Real Event Factual Harvest — First 5 Events  
Scope: neutral factual sheets and preliminary SERA candidate hypotheses for selected real events  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document contains the first set of neutral factual harvest sheets for real events selected from the HFA/SERA real-event index.
The purpose is to transform real accident/incident reports into structured factual material for future SERA validation.
This file does not create fixtures.
This file does not assign expected P/O/A values.
This file does not approve candidates.
This file does not import probable causes, report conclusions, HFACS labels, findings or recommendations as SERA outputs.
Allowed flow:
```text
source report
→ neutral factual harvest
→ SERA hypothesis draft
→ human review
→ possible candidate later
```
Forbidden flow:
```text
report conclusion
→ expected SERA value
```
Also forbidden:
```text
HFACS label
→ P/O/A code
```

---

## 2. Events covered in this batch

ID    Event    Status
REAL-EVENT-0001    S-92A CHO Thebaud — inadvertent descent during offshore approach    DRAFT_FOR_REVIEW
REAL-EVENT-0002    S-76C++ G-WIWI Peasmarsh — night approach / near tree impact    DRAFT_FOR_REVIEW
REAL-EVENT-0003    S-76C+ Tofino — night approach / near CFIT    DRAFT_FOR_REVIEW
REAL-EVENT-0004    S-76C+ EC-JES Vigo — SAR training descent to low height    DRAFT_FOR_REVIEW
REAL-EVENT-0006    S-76C++ 5N-BQJ Bristow Nigeria — DAFCS/TRIM FAIL and ditching    DRAFT_FOR_REVIEW

---

## 3. REAL-EVENT-0001 — S-92A CHO Thebaud

### 3.1 Identification

ID: REAL-EVENT-0001
Event: S-92A CHO Thebaud — inadvertent descent during offshore approach
Aircraft/system: Sikorsky S-92A
Operation type: Offshore helicopter transport
Phase: Offshore approach
Status: DRAFT_FOR_REVIEW

### 3.2 Factual source

Primary source: TSB A19A0055, Sikorsky S-92A, Canadian Helicopters Offshore, Thebaud Central Facility, 24 July 2019.

The event is indexed as an inadvertent descent during offshore approach.

### 3.3 Neutral factual summary

During an offshore approach in degraded visual/environmental conditions, the helicopter entered an undesired descent / low-energy state. The event involved offshore approach context, degraded visual references, energy/flight path monitoring and alerting/barrier limitations.

The report material indicates relevance of:

* degraded visual environment;
* offshore approach;
* low speed / low-energy condition;
* cyclic trim release / aircraft handling context;
* warning/alerting envelope limitations;
* approach monitoring and barrier effectiveness.

### 3.4 Preliminary chronological sequence

1. Offshore helicopter transport operation.
2. Approach to offshore installation.
3. Degraded visual or environmental conditions affected approach context.
4. Aircraft entered a less-safe energy/flight-path state.
5. Descent became inadvertent or insufficiently controlled.
6. Alerting/barrier behaviour may have been limited by aircraft configuration/envelope.
7. Recovery occurred after the unsafe state developed.

### 3.5 Probable safe operation escape point

The likely safe-operation escape point occurred when the approach stopped remaining within a safely monitored and recoverable profile and entered an undesired descent / low-energy state.

### 3.6 Observable unsafe act

Preliminary unsafe act candidate:

The flight crew continued or managed the offshore approach while the helicopter entered an undesired descent / low-energy state that was not corrected early enough.

This remains a candidate formulation only.

### 3.7 Observable unsafe condition

Preliminary unsafe condition candidate:

Degraded visual environment during offshore approach, combined with low-speed/low-energy operation and degraded or limited alerting/barrier effectiveness.

### 3.8 Direct actor candidate

Primary direct actor candidate:

Flight crew, with later separation needed between PF and PM roles.

PF/PM role separation must be confirmed from the report before any SERA hypothesis can become candidate-quality.

### 3.9 Information available to actor

Potentially available:

* flight instruments;
* visual references;
* approach profile cues;
* aircraft energy/airspeed/descent parameters;
* SOP/callout structure;
* warning/alerting system behaviour;
* crew monitoring.

Missing or needing confirmation:

* exact PF/PM perception;
* exact callout timing;
* whether the descent/energy state was noticed before recovery;
* whether any warning was expected but absent;
* whether visual cues were sufficient or misleading.

### 3.10 Content to quarantine

Do not directly import as SERA output:

* TSB findings;
* causal findings;
* contributing factors;
* recommendations;
* any judgement assigning cause or responsibility;
* any risk/consequence ranking.

These may be reviewed as context only.

### 3.11 SERA candidate hypothesis — not expected value

Status:

DRAFT
REVIEW_REQUIRED
NOT_EXPECTED_VALUE

Candidate safe_operation_escape_point:

The approach left the safe monitored profile when the helicopter entered an undesired descent / low-energy state before recovery.

Candidate unsafe_act_statement:

The flight crew continued or managed the approach while descent/energy state degraded beyond the safe profile.

Candidate unsafe_condition_statement:

DVE offshore approach context with possible alerting/barrier limitation in low-speed/low-energy configuration.

Candidate direct_actor:

Flight crew; PF/PM separation pending.

Candidate P/O/A:

P candidate: possible if evidence shows the crew did not perceive the descent/energy state in time.
O candidate: possible if evidence shows continued approach objective despite insufficient cues or unstable profile.
A candidate: possible if evidence shows correct perception/objective but inadequate control or energy management.

Candidate preconditions:

DVE
offshore approach context
low-speed / low-energy configuration
alerting envelope limitation
SOP/callout monitoring
crew workload

### 3.12 Missing data / unanswered questions

* What did PF perceive at the first unsafe cue?
* What did PM call out and when?
* Was the flight path deviation visible on instruments?
* Was an alert expected but absent?
* Was the objective still to continue approach, stabilize, or go around?
* Was recovery initiated immediately after recognition?
* How did SOP define stabilized offshore approach parameters?

### 3.13 Bias risks

* Hindsight bias: assuming crew knew the actual energy/flight path state.
* Outcome bias: treating near-CFIT severity as proof of perceptual failure.
* Barrier bias: treating absence of warning as causal classification rather than unsafe condition/precondition.
* DVE shortcut: automatically mapping degraded visual environment to P-axis.

### 3.14 Potential use

Suitability:

GOOD_BASELINE_CANDIDATE
VALIDATION_EXPANSION
PRECONDITIONS_CATALOG_SOURCE

Recommendation:

Good candidate for deeper factual harvest and later SERA hypothesis review.
Do not convert to expected values yet.

---

## 4. REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh

### 4.1 Identification

ID: REAL-EVENT-0002
Event: S-76C++ G-WIWI Peasmarsh — discontinued night approach and near tree impact
Aircraft/system: Sikorsky S-76C++
Operation type: helicopter transport to private landing site
Phase: night approach / discontinued approach / go-around
Status: DRAFT_FOR_REVIEW

### 4.2 Factual source

Primary source: AAIB investigation / AAIB Bulletin material for Sikorsky S-76C++ G-WIWI, Peasmarsh, East Sussex, 03 May 2012.

### 4.3 Neutral factual summary

During a night approach to a private landing site in reduced visibility / low cloud conditions, the approach was discontinued and the helicopter descended toward trees. The source material indicates that a go-around procedure or routing had not been available or briefed.

This event is highly useful because it combines:

* night/private-site approach;
* degraded visual references;
* obstacle environment;
* go-around/discontinued approach;
* planning/briefing barrier;
* possible EGPWS/TAWS or warning response.

### 4.4 Preliminary chronological sequence

1. Helicopter flight to private landing site.
2. Night approach conducted in reduced visibility / low cloud.
3. External visual reference was likely limited or degraded.
4. Approach was discontinued.
5. Go-around/discontinued-approach path was not clearly pre-briefed or protected.
6. Helicopter descended toward trees.
7. Recovery occurred after an unsafe proximity state developed.

### 4.5 Probable safe operation escape point

The likely safe-operation escape point occurred when the crew entered or continued a discontinued approach / go-around situation without a pre-briefed and protected escape route in a visually degraded night environment.

### 4.6 Observable unsafe act

Preliminary unsafe act candidate:

The crew executed or transitioned into a discontinued approach/go-around path that allowed the helicopter to descend toward obstacles.

### 4.7 Observable unsafe condition

Preliminary unsafe condition candidate:

Night private-site approach with low visibility / low cloud, nearby obstacles, limited external references, and no available or briefed go-around routing.

### 4.8 Direct actor candidate

Primary direct actor candidate:

Flight crew, with PF/PM separation pending.

### 4.9 Information available to actor

Potentially available:

* preflight/approach planning information;
* visual references;
* knowledge of destination/private site;
* weather conditions;
* obstacle context;
* aircraft instruments;
* warning systems if active;
* briefing content.

Missing or needing confirmation:

* whether crew perceived the trees/obstacles before the warning/recovery;
* exact altitude/flight path;
* whether go-around was initiated deliberately or reactively;
* whether instrument references were used during go-around;
* division of duties between crew members.

### 4.10 Content to quarantine

Do not directly import as SERA output:

* AAIB findings;
* causal phrasing;
* recommendations;
* judgement on adequacy of planning;
* any conclusion that directly assigns why the crew acted.

### 4.11 SERA candidate hypothesis — not expected value

Status:

DRAFT
REVIEW_REQUIRED
NOT_EXPECTED_VALUE

Candidate safe_operation_escape_point:

The approach departed safe operation when the crew needed to discontinue or go around in degraded visual conditions without a protected and briefed escape path.

Candidate unsafe_act_statement:

The crew executed a discontinued approach/go-around trajectory that descended toward trees.

Candidate unsafe_condition_statement:

Night private-site approach with low cloud/visibility, obstacles, limited visual references and absent/unbriefed go-around route.

Candidate direct_actor:

Flight crew; PF/PM role separation pending.

Candidate P/O/A:

P candidate: possible if crew did not perceive altitude, obstacle proximity or descent path.
O candidate: possible if continuation/descent/discontinued approach objective was incompatible with safe operation under the conditions.
A candidate: possible if the intended go-around was appropriate but execution/flight path control was inadequate.

Candidate preconditions:

night operation
private landing site
reduced visibility / low cloud
obstacle environment
inadequate or absent go-around briefing
planning barrier degraded
crew workload during go-around

### 4.12 Missing data / unanswered questions

* Was the go-around planned before the approach?
* When did the crew decide to discontinue?
* Did the crew perceive the descent toward trees?
* Were visual references lost or misleading?
* Was the flight director/autopilot involved?
* What warnings or callouts occurred?
* What did the crew intend at the escape point?

### 4.13 Bias risks

* Treating poor visibility as automatic P failure.
* Treating absent go-around briefing as automatic O failure.
* Treating near tree impact as proof of action error.
* Importing AAIB conclusions as SERA expected values.

### 4.14 Potential use

Suitability:

GOOD_BASELINE_CANDIDATE
ADVERSARIAL_CASE
PRECONDITIONS_CATALOG_SOURCE

Recommendation:

Strong candidate for deeper factual harvest.
Good adversarial event because P, O and A are all plausible until detailed sequence is reviewed.

---

## 5. REAL-EVENT-0003 — S-76C+ Tofino

### 5.1 Identification

ID: REAL-EVENT-0003
Event: S-76C+ Tofino — loss of control during night approach / near CFIT
Aircraft/system: Sikorsky S-76C+
Operation type: medevac / helicopter transport
Phase: night visual approach
Status: DRAFT_FOR_REVIEW

### 5.2 Factual source

Primary source: TSB A15P0217, Helijet International Inc., Sikorsky S-76C+, C-GHHJ, Tofino/Long Beach Airport, British Columbia, 15 November 2015.

### 5.3 Neutral factual summary

During a night VFR medevac flight, the crew conducted a visual approach. During final approach after autopilot disconnection, the helicopter developed a low-speed / high-descent-rate state with rotor speed decay and directional control degradation. The crew recovered at very low height and completed a later landing.

This event is useful for SERA because it includes:

* night visual approach;
* possible black-hole / insufficient visual reference context;
* autopilot disconnection;
* energy state degradation;
* high descent rate;
* rotor speed decay;
* directional control issue;
* recovery at very low altitude.

### 5.4 Preliminary chronological sequence

1. Medevac night flight conducted under VFR.
2. Visual approach planned/conducted at destination.
3. Autopilot disconnected during approach.
4. Aircraft manoeuvred toward landing area.
5. Airspeed reduced.
6. Descent rate increased.
7. Rotor speed began decreasing.
8. Directional control degraded.
9. Crew recovered at extremely low height.
10. Subsequent approach/landing completed.

### 5.5 Probable safe operation escape point

The likely safe-operation escape point occurred on final approach after autopilot disconnection when speed/descent/rotor parameters degraded outside safe margins.

### 5.6 Observable unsafe act

Preliminary unsafe act candidate:

The crew continued or manually managed the night approach while energy state and control margins degraded to an unsafe low-altitude condition.

### 5.7 Observable unsafe condition

Preliminary unsafe condition candidate:

Night visual approach environment with limited visual cues, autopilot disengagement, energy-state vulnerability and low-altitude recovery margin.

### 5.8 Direct actor candidate

Primary direct actor candidate:

Flight crew, likely requiring PF/PM distinction during the final approach.

### 5.9 Information available to actor

Potentially available:

* flight instruments;
* airspeed;
* vertical speed / altitude;
* rotor speed;
* aircraft attitude;
* external visual cues;
* autopilot status;
* crew monitoring and callouts.

Missing or needing confirmation:

* whether the crew perceived the speed/descent degradation in time;
* what callouts occurred;
* why the autopilot was disconnected;
* whether visual references were misleading or insufficient;
* whether the objective was to continue, stabilize, or recover.

### 5.10 Content to quarantine

Do not directly import as SERA output:

* TSB findings;
* contributing factors;
* safety action statements;
* conclusions on visual reference;
* conclusions on SOP/EGPWS guidance;
* organizational findings.

### 5.11 SERA candidate hypothesis — not expected value

Status:

DRAFT
REVIEW_REQUIRED
NOT_EXPECTED_VALUE

Candidate safe_operation_escape_point:

The night approach left safe operation when energy state and descent path degraded after autopilot disconnection and before recovery.

Candidate unsafe_act_statement:

The crew continued or controlled the approach into a low-speed / high-descent-rate / low-rotor-speed state at very low altitude.

Candidate unsafe_condition_statement:

Night visual approach with potentially limited visual cues, autopilot disengagement and low-altitude recovery margin.

Candidate direct_actor:

Flight crew; PF/PM distinction pending.

Candidate P/O/A:

P candidate: plausible if the crew did not perceive energy/descent/rotor degradation in time.
O candidate: plausible if continuing the visual approach was incompatible with safe operation under available cues.
A candidate: plausible if manual control/energy management failed despite adequate perception and objective.

Candidate preconditions:

night visual environment
possible black-hole / insufficient visual reference
autopilot disconnection
crew monitoring
workload
SOP/EGPWS guidance context

### 5.12 Missing data / unanswered questions

* What was the crew's perception at the first energy-state cue?
* Did PM call out airspeed/descent/rotor decay?
* Was the descent rate visible and monitored?
* Was the visual environment misleading?
* Was the aircraft in a recoverable profile before the final degradation?
* Did procedure specify go-around or stabilized criteria?

### 5.13 Bias risks

* Mapping night/black-hole context automatically to P failure.
* Treating autopilot disconnection as causal rather than contextual.
* Treating low-altitude recovery as proof of action failure.
* Using TSB conclusions as expected values.

### 5.14 Potential use

Suitability:

GOOD_BASELINE_CANDIDATE
VALIDATION_EXPANSION
ADVERSARIAL_CASE

Recommendation:

Strong first-wave event for detailed SERA review because P/O/A are all plausible until the detailed timing of perception and action is reconstructed.

---

## 6. REAL-EVENT-0004 — S-76C+ EC-JES Vigo

### 6.1 Identification

ID: REAL-EVENT-0004
Event: S-76C+ EC-JES Vigo — SAR training descent to low height
Aircraft/system: Sikorsky S-76C+
Operation type: SAR / training / winch operator validation
Phase: approach / positioning
Status: DRAFT_FOR_REVIEW

### 6.2 Factual source

Primary source: CIAIAC-led investigation, indexed by BEA, Sikorsky S-76 EC-JES, Vigo, 26 July 2019.

### 6.3 Neutral factual summary

During a SAR-related training/validation operation, the helicopter was positioning for a winch-operator exercise and descended to a very low height over the sea without an aural warning. The event was categorized as an approach-phase serious incident with no injuries or aircraft damage in the available summary.

This event is useful because it includes:

* SAR/training operation;
* positioning for winch activity;
* low-height over-water operation;
* alerting/aural warning barrier issue;
* crew monitoring;
* possible task saturation / attention allocation.

### 6.4 Preliminary chronological sequence

1. National SAR-related helicopter operation.
2. Training or validation of winch operator.
3. Helicopter positioned for exercise near Vigo.
4. During approach/positioning, helicopter descended to a low height over the sea.
5. Aural warning did not occur or was not available.
6. Recovery occurred without reported injuries or aircraft damage.

### 6.5 Probable safe operation escape point

The likely safe-operation escape point occurred when the helicopter descended below the intended/safe height margin during SAR positioning without timely detection or warning.

### 6.6 Observable unsafe act

Preliminary unsafe act candidate:

The crew allowed or flew the helicopter to a very low height during SAR training positioning without timely correction.

### 6.7 Observable unsafe condition

Preliminary unsafe condition candidate:

SAR training/winch-positioning task with low-altitude over-water exposure, high workload and absent/degraded aural warning.

### 6.8 Direct actor candidate

Primary direct actor candidate:

Flight crew during SAR positioning; multi-crew/mission crew interactions may need review.

### 6.9 Information available to actor

Potentially available:

* altitude indications;
* visual reference over water;
* mission/task cues;
* crew monitoring;
* SAR/training procedure;
* warning/alerting system, though aural warning was reportedly absent.

Missing or needing confirmation:

* exact altitude reached;
* intended exercise height;
* PF/PM roles;
* winch-operator/mission crew role;
* whether visual cues over water were degraded;
* automation or hover modes involved;
* whether altitude was monitored by any crew member.

### 6.10 Content to quarantine

Do not directly import as SERA output:

* CIAIAC conclusions;
* causal findings;
* recommendations;
* any judgement about crew/training/automation;
* investigation-led classification beyond factual descriptors.

### 6.11 SERA candidate hypothesis — not expected value

Status:

DRAFT
REVIEW_REQUIRED
NOT_EXPECTED_VALUE

Candidate safe_operation_escape_point:

The SAR positioning task left safe operation when the helicopter descended below the intended low-height safety margin without timely warning/correction.

Candidate unsafe_act_statement:

The crew allowed or controlled descent to a very low height during positioning for SAR training.

Candidate unsafe_condition_statement:

Low-height SAR training over water with task workload and absent/degraded aural warning barrier.

Candidate direct_actor:

Flight crew; possible mission-crew interaction pending.

Candidate P/O/A:

P candidate: plausible if crew did not perceive altitude/descent in time.
O candidate: plausible if the training/positioning objective created an unsafe height margin.
A candidate: plausible if control/monitoring failed despite correct perception and objective.

Candidate preconditions:

SAR training task
winch-positioning workload
low-height over-water operation
aural warning barrier absent/degraded
crew monitoring
possible task fixation

### 6.12 Missing data / unanswered questions

* What was the intended altitude/height for the exercise?
* Was the low height perceived before recovery?
* Was the descent commanded or inadvertent?
* What visual references existed over water?
* Was automation used?
* What procedures defined warning/monitoring responsibilities?
* What role did the mission/winch crew have?

### 6.13 Bias risks

* Treating absence of aural warning as active human failure.
* Treating SAR/training workload as causal without evidence.
* Collapsing flight crew and mission crew into a single actor.
* Inferring P/O/A without full CIAIAC report detail.

### 6.14 Potential use

Suitability:

VALIDATION_EXPANSION
GOOD_BASELINE_CANDIDATE if full report supports actor/perception reconstruction
MULTI_ACTOR_CASE
PRECONDITIONS_CATALOG_SOURCE

Recommendation:

Useful for preconditions and multi-crew/task workload analysis; needs full report before expected values.

---

## 7. REAL-EVENT-0006 — S-76C++ 5N-BQJ Bristow Nigeria

### 7.1 Identification

ID: REAL-EVENT-0006
Event: S-76C++ 5N-BQJ Bristow Nigeria — DAFCS/TRIM FAIL and ditching
Aircraft/system: Sikorsky S-76C++
Operation type: offshore helicopter transport
Phase: return flight / en route offshore
Status: DRAFT_FOR_REVIEW

### 7.2 Factual source

Primary source family: NSIB/AIB Nigeria preliminary/interim material for Bristow Helicopters Nigeria Ltd Sikorsky S-76C++ 5N-BQJ accident, 03 February 2016, offshore Lagos.

### 7.3 Neutral factual summary

During an offshore return flight from ERHA FPSO to Lagos, the helicopter experienced repeated DAFCS/TRIM FAIL indications. The crew consulted emergency procedure material, the flight was continued under degraded/control-attention conditions, and the aircraft ultimately ditched offshore. No fatalities were reported, while the aircraft was destroyed after saltwater submersion.

This event is useful because it separates:

* technical/automation unsafe condition;
* crew response to abnormal indications;
* checklist/EOP handling;
* manual control / workload;
* offshore risk context;
* potential but not automatic human factor classification.

### 7.4 Preliminary chronological sequence

1. Offshore charter/transport flight operated by Bristow Nigeria.
2. Initial flight from Lagos to ERHA FPSO.
3. DAFCS and TRIM FAIL indications reportedly occurred during outbound leg and were reset.
4. Return flight from ERHA FPSO to Lagos commenced with passengers and crew.
5. Copilot acted as PF and commander as PM according to preliminary material.
6. Aircraft cruised at offshore altitude.
7. TRIM FAIL / DAFCS indications recurred.
8. Emergency procedure material was consulted.
9. PF was reportedly instructed to keep hands and feet on the controls.
10. Event evolved to ditching offshore.
11. Occupants survived.
12. Aircraft was destroyed after saltwater submersion.

### 7.5 Probable safe operation escape point

The likely safe-operation escape point occurred when repeated automation/trim failure indications and aircraft handling/control degradation moved the flight from a manageable abnormal state into a state requiring ditching.

### 7.6 Observable unsafe act

Preliminary unsafe act candidate:

Not yet sufficiently defined. Possible candidates include emergency procedure management, manual control response, checklist execution, continuation/return decision or crew coordination, but none should be selected before deeper factual review.

### 7.7 Observable unsafe condition

Preliminary unsafe condition candidate:

Repeated DAFCS/TRIM FAIL indications and possible degraded control/automation state during offshore flight.

### 7.8 Direct actor candidate

Primary direct actor candidate:

Flight crew; however this may be primarily an unsafe condition / system degradation case rather than a clear active-failure case.

PF/PM distinction is important because preliminary material identifies the copilot as PF and commander as PM.

### 7.9 Information available to actor

Potentially available:

* DAFCS/TRIM FAIL cockpit indications;
* EOP/emergency procedure;
* aircraft handling feel;
* altitude/airspeed/flight path;
* ATC communication;
* offshore location and distance from land;
* crew coordination and role allocation.

Missing or needing confirmation:

* precise failure mode;
* final report conclusions;
* CVR/FDR sequence;
* exact checklist steps;
* timing of decision to ditch;
* whether system condition was correctly understood;
* what warnings or flight control degradations occurred.

### 7.10 Content to quarantine

Do not directly import as SERA output:

* preliminary/interim causal statements;
* final cause if later identified;
* maintenance/design conclusions;
* checklist compliance judgement;
* crew performance judgement;
* operator/regulator recommendations.

### 7.11 SERA candidate hypothesis — not expected value

Status:

DRAFT
REVIEW_REQUIRED
NOT_EXPECTED_VALUE

Candidate safe_operation_escape_point:

The offshore return flight left safe operation when repeated automation/trim failure indications and control/handling degradation could no longer be managed as a stable abnormal condition.

Candidate unsafe_act_statement:

Insufficient evidence at this stage. Candidate act may involve abnormal procedure execution, manual control response, return/ditching decision or crew coordination.

Candidate unsafe_condition_statement:

DAFCS/TRIM FAIL recurrence and possible degraded flight control / automation condition during offshore flight.

Candidate direct_actor:

Flight crew; unsafe-condition-dominant framing remains possible.

Candidate P/O/A:

P candidate: possible if crew misunderstood the actual automation/control state.
O candidate: possible if the chosen abnormal-operation strategy was incompatible with safe operation.
A candidate: possible if the correct abnormal objective was selected but control/procedure execution failed.
Insufficient evidence for expected P/O/A without deeper report extraction.

Candidate preconditions:

automation / flight control system degradation
EOP/checklist workload
offshore environment
IFR/IMC context if confirmed
crew role allocation
manual-control workload
distance from land
emergency/ditching decision context

### 7.12 Missing data / unanswered questions

* What exactly failed?
* Was the DAFCS/TRIM FAIL condition causal, symptomatic or recoverable?
* What checklist steps were completed?
* What was reset and when?
* What did PF and PM believe the aircraft state was?
* Was manual control degraded?
* Why was ditching selected or unavoidable?
* Were maintenance/systemic issues more central than crew response?

### 7.13 Bias risks

* Treating technical failure as human error.
* Treating ditching outcome as proof of action error.
* Treating checklist mention as checklist error.
* Assuming automation confusion without evidence.
* Importing preliminary report statements as final causal truth.

### 7.14 Potential use

Suitability:

ADVERSARIAL_CASE
VALIDATION_EXPANSION
PRECONDITIONS_CATALOG_SOURCE
RISK_LAYER_FUTURE_SOURCE

Recommendation:

Very useful as an adversarial case because the system must avoid forcing P/O/A when unsafe condition and technical degradation dominate the evidence.

---

## 8. Batch 1 review summary

### 8.1 Strongest candidates for deeper factual extraction

REAL-EVENT-0001 — S-92A Thebaud
REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh
REAL-EVENT-0003 — S-76C+ Tofino

These three have the clearest likely connection to SERA P/O/A analysis.

### 8.2 Best preconditions / multi-actor cases

REAL-EVENT-0004 — EC-JES Vigo
REAL-EVENT-0006 — 5N-BQJ Bristow Nigeria

These two are especially useful for task workload, warning barriers, technical/system conditions and multi-role analysis.

### 8.3 Events not ready for expected values

All events remain:

NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED

No P/O/A code should be promoted from this document.

---

## 9. Recommended next step

Recommended next phase:

A4+R-7 — Deep Factual Extraction for REAL-EVENT-0001 and REAL-EVENT-0002

Purpose:

Move from preliminary factual harvest to detailed chronology and evidence-supported SERA hypothesis for the two strongest first events.

Do not create fixture JSONs yet.
