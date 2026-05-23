# Real Event Deep Extraction — REAL-EVENT-0001 and REAL-EVENT-0002 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-7 — Deep Factual Extraction  
Scope: deeper factual extraction for two selected real events  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document deepens the factual extraction for the two strongest initial real-event harvest cases:
- REAL-EVENT-0001 — S-92A CHO Thebaud
- REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh
The purpose is to move from preliminary factual harvest to a more traceable factual chronology and evidence-supported SERA hypothesis.
This document still does not create fixtures.
This document still does not assign expected P/O/A.
This document still does not approve any candidate.
All SERA interpretations remain:
```text
DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON
```

---

## 2. Methodological rules for this document

Use only factual material as the basis for SERA hypotheses.

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

PART A — REAL-EVENT-0001: S-92A CHO Thebaud

## 3. Identification

ID: REAL-EVENT-0001
Event: S-92A CHO Thebaud — inadvertent descent during offshore approach
Aircraft/system: Sikorsky S-92A, registration C-GICB
Operator: Canadian Helicopters Offshore
Occurrence date: 24 July 2019
Location/context: Thebaud Central Facility, approximately 155 NM ESE of Halifax, Nova Scotia
Operation type: Offshore helicopter transport
Persons on board: 2 pilots and 11 passengers
Source type: OFFICIAL_REPORT
Status: DRAFT_FOR_REVIEW

---

## 4. High-confidence factual chronology

### 4.1 Pre-approach context

* The helicopter departed Halifax/Stanfield International Airport on an IFR flight to the Thebaud Central Facility.
* The offshore destination was approximately 155 NM east-southeast of Halifax.
* Two pilots and 11 passengers were on board.
* The operation was offshore helicopter transport to a platform/facility.

### 4.2 Instrument approach attempts

* Two instrument approaches were attempted at the platform.
* Both instrument approaches were unsuccessful because of low clouds and poor visibility.
* During the second missed approach, the crew acquired visual contact with the platform.
* After acquiring visual contact, the crew elected to carry out a visual approach.

### 4.3 Unsafe-state development

* Shortly after commencing the visual approach, the helicopter developed:
    * high rate of descent;
    * low airspeed;
    * low-visibility operating context.
* During the descent, the engines were overtorqued and reached a maximum torque value of 146%.
* The crew regained control and arrested the descent at approximately 13 feet above the water.

### 4.4 Post-event sequence

* During the subsequent hand-flown departure, a second inadvertent descent occurred.
* The second descent was rectified in a timely manner.
* The aircraft returned to Halifax/Stanfield International Airport.
* There were no injuries.
* The extent of aircraft damage was unknown in the report summary because the aircraft was removed from service.

---

## 5. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
IFR offshore flight    Flight from Halifax to offshore facility    operational context    not causal by itself
Two failed instrument approaches    unsuccessful due to low clouds/poor visibility    environmental precondition    do not equate automatically to P failure
Visual contact acquired    visual contact during second missed approach    transition point    may influence objective/decision analysis
Visual approach elected    crew chose visual approach after visual contact    possible objective/plan issue    do not call O failure without evidence
High rate of descent    developed shortly after visual approach started    unsafe state    may support P/A but not automatic
Low airspeed    developed with high rate of descent    low-energy state    unsafe state evidence
Engines overtorqued to 146%    torque reached during recovery/descent    severity/recovery evidence    not P/O/A by itself
Descent arrested at 13 ft    very low recovery height    consequence/near-CFIT    avoid outcome bias
EGPWS did not alert    no warning in gear-down, below-50-KIAS condition    degraded barrier    not human error by itself
DVE / fog / no discernible horizon    crew focused on helideck above fog; DVE made unstable approach hard to recognize    perception precondition    not automatic P code

---

## 6. Safe operation definition

The safe operation was:

Maintain a stabilized, monitored offshore approach profile with adequate visual/instrument cues, safe airspeed, controlled descent rate, recoverable energy state, and timely go-around/missed-approach decision if the approach became unstable or cues were inadequate.

---

## 7. Probable safe operation escape point

Candidate escape point:

After the second missed approach, when the crew transitioned from unsuccessful instrument approaches to a visual approach based on acquired visual contact, and the helicopter shortly thereafter developed a low-airspeed/high-rate-of-descent state.

More operationally precise formulation:

The operation escaped safe functioning when the visual approach entered a low-energy state that was not detected or corrected before the helicopter descended to approximately 13 feet above the water.

Status:

DRAFT
HUMAN_REVIEW_REQUIRED

---

## 8. Unsafe act / unsafe condition separation

### 8.1 Candidate unsafe act

The flight crew continued or managed the visual offshore approach while the helicopter entered a low-airspeed, high-rate-of-descent state that was not corrected until very low height.

Limitations:

* This formulation may overstate action if the primary issue was non-detection.
* PF/PM role separation is still needed.
* It should not be converted directly into A-code.

### 8.2 Candidate unsafe condition

Low-visibility offshore visual approach environment with fog/degraded visual cues, no discernible horizon, and an EGPWS coverage gap for gear-down, below-50-KIAS inadvertent descent.

This unsafe condition is strong and should be retained even if P/O/A remains uncertain.

---

## 9. Direct actor analysis

Primary direct actor candidate:

Flight crew

Required later refinement:

PF/PM split
who was flying
who was monitoring
who acquired/announced visual contact
who initiated/continued the visual approach
who recognized the descent
who initiated recovery

Do not treat the entire crew as a single cognitive actor in a future fixture unless the report evidence does not support PF/PM separation.

---

## 10. Information available to the actors

Potentially available:

* flight instruments;
* visual contact with platform;
* airspeed;
* altitude/height;
* vertical speed/descent rate;
* pitch attitude;
* power/torque;
* SOP callouts;
* crew monitoring;
* EGPWS, although no alert was generated in this envelope.

Known/likely degraded:

* external horizon;
* stable visual references;
* alerting barrier from EGPWS under gear-down and below-50-KIAS condition.

---

## 11. Quarantined report material

The following must not be used directly as SERA expected values:

* TSB determination that low-energy state went undetected;
* TSB discussion of crew focus;
* TSB safety findings;
* TSB recommendations;
* TSB regulatory discussion about helicopter TAWS/EGPWS requirements;
* any report conclusion about safety deficiencies.

These can guide questions, but expected P/O/A must be supported by the reconstructed SERA chain.

---

## 12. Draft SERA hypothesis — NOT expected value

Status:

DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON

### 12.1 Candidate safe_operation_escape_point

The visual approach left safe operation when the helicopter entered a low-energy state after the crew acquired visual contact and elected to continue visually in degraded visibility.

### 12.2 Candidate unsafe_act_statement

The crew continued or managed the visual approach while the helicopter developed a low-airspeed/high-rate-of-descent state and recovery was delayed until very low height.

### 12.3 Candidate unsafe_condition_statement

DVE/fog offshore approach with no discernible horizon and EGPWS coverage gap in gear-down, below-50-KIAS configuration.

### 12.4 Candidate direct_actor

Flight crew, with PF/PM separation pending.

### 12.5 Candidate perception statement

The crew may not have perceived the low-energy/high-descent-rate state early enough, possibly due to focus on the helideck and degraded visual cues.

Evidence strength:

MEDIUM/HIGH as hypothesis; still report-derived and needs exact chronology.

### 12.6 Candidate objective statement

The crew objective appears to have shifted from missed approach/instrument approach attempts to completing a visual approach after acquiring platform contact.

Evidence strength:

HIGH for objective shift; LOW/MEDIUM for unsafe objective.

### 12.7 Candidate action statement

The crew managed the aircraft flight path/power/energy state in a way that allowed low airspeed and high descent rate to develop before recovery.

Evidence strength:

MEDIUM; exact control inputs and PF/PM responsibilities still needed.

### 12.8 Candidate P/O/A

P candidate: plausible/strong candidate if non-detection of low-energy state is accepted as central factual evidence.
O candidate: possible but weaker unless the visual-approach continuation objective is judged incompatible with safe operation under the actual cues.
A candidate: possible if later evidence shows the crew perceived the unsafe state but control/energy management was ineffective.

Recommended current status:

P-likely hypothesis, not expected value.

Do not promote to P-code without human review.

### 12.9 Candidate preconditions

DVE / fog
lack of discernible horizon
offshore helideck visual-cue environment
transition from instrument approaches to visual approach
crew focus on helideck
EGPWS coverage gap
low-speed/gear-down configuration
SOP/callout/monitoring context

---

## 13. Key unanswered questions

* Which pilot was PF during the visual approach?
* Which pilot was PM?
* Who acquired visual contact?
* Who made/accepted the decision to continue visually?
* What exact callouts occurred during low airspeed/high descent?
* Was the low-energy state evident on instruments before recovery?
* Did either pilot identify the unstable approach before the overtorque/recovery?
* What stabilized-approach criteria applied?
* What was the timing from visual contact to low-energy state?
* How should the second inadvertent descent be represented: same causal pattern, separate event, or corroborating pattern?

---

## 14. Candidate use recommendation for REAL-EVENT-0001

Recommended use:

HIGH_PRIORITY_DEEP_REVIEW
GOOD_BASELINE_CANDIDATE_AFTER_REVIEW
PRECONDITIONS_CATALOG_SOURCE
ADVERSARIAL_DVE_CASE

Do not create fixture yet.

---

PART B — REAL-EVENT-0002: S-76C++ G-WIWI Peasmarsh

## 15. Identification

ID: REAL-EVENT-0002
Event: S-76C++ G-WIWI Peasmarsh — discontinued night approach and near tree impact
Aircraft/system: Sikorsky S-76C++ / S-76C variant as identified in AAIB materials
Registration: G-WIWI
Occurrence date/time: 03 May 2012, 2155 UTC
Location: Peasmarsh, East Sussex
Operation type: Public Transport / private landing site operation
Persons on board: 2 crew, 2 passengers
Injuries: none
Damage: none
Source type: OFFICIAL_REPORT / AAIB Field Investigation
Status: DRAFT_FOR_REVIEW

---

## 16. High-confidence factual chronology

### 16.1 Operation and preparation

* The helicopter was chartered to fly passengers on a return flight from a private landing site at Peasmarsh to Battersea Heliport.
* The helicopter was based at London Stansted and had to position empty from Stansted to Peasmarsh.
* The flight was conducted at night.
* The destination was a private landing site.
* Weather included reduced visibility and low cloud.

### 16.2 Approach and discontinued approach

* A night approach was made to the private landing site.
* The approach was discontinued.
* No go-around procedure or routing was available or briefed.
* After the discontinued approach, the helicopter descended toward the tops of trees.

### 16.3 Warning/barrier information

* Later AAIB correction/summary material states that the EGPWS issued warnings that the helicopter was approaching contact with the ground.
* The flight crew were not aware of these EGPWS warnings.
* No injuries occurred.
* No aircraft damage occurred.

---

## 17. Factual evidence table

Evidence item    Factual content    SERA relevance    Use caution
Public transport flight    crew/passenger commercial context    operational context    not causal by itself
Private landing site    non-standard landing environment    precondition/planning    not automatically unsafe
Night operation    reduced visual cue context    perception precondition    not automatic P failure
Reduced visibility / low cloud    degraded environment    perception/precondition    not automatic P failure
Discontinued approach    approach not continued to landing    escape point candidate    could be appropriate action
No go-around procedure/routing available or briefed    planning/briefing barrier absent    precondition/objective context    not direct P/O/A alone
Descent toward tree tops    unsafe flight path/proximity    unsafe state    avoid outcome bias
EGPWS warnings issued    warning barrier activated    information potentially available    crew not aware
Crew not aware of EGPWS warnings    warning not perceived/heard/acted on    P/precondition candidate    exact reason needs review
No injuries/damage    outcome    severity context    not causal evidence

---

## 18. Safe operation definition

The safe operation was:

Conduct the night approach to a private landing site only with adequate visual references, obstacle clearance, stabilized flight path, and a protected missed-approach/go-around plan; if visual/approach conditions became unsuitable, discontinue using a safe, briefed route that maintained obstacle clearance.

---

## 19. Probable safe operation escape point

Candidate escape point:

The operation escaped safe functioning when the night approach had to be discontinued in degraded conditions without an available or briefed go-around route, and the helicopter descended toward trees.

More precise formulation:

The escape point likely occurred at the transition from approach to discontinued approach/go-around, where the absence of a protected route and degraded visual conditions allowed the flight path to descend toward obstacles.

Status:

DRAFT
HUMAN_REVIEW_REQUIRED

---

## 20. Unsafe act / unsafe condition separation

### 20.1 Candidate unsafe act

The crew executed or transitioned into a discontinued approach/go-around flight path that descended toward the tops of trees.

Limitations:

* The discontinued approach itself may have been appropriate.
* The unsafe element is the resulting flight path/obstacle proximity.
* More detail is needed on control inputs, cues, and warning perception.

### 20.2 Candidate unsafe condition

Night private-site approach in reduced visibility/low cloud with obstacle environment and no available or briefed go-around procedure/routing.

This unsafe condition is strong and likely central to preconditions.

---

## 21. Direct actor analysis

Primary direct actor candidate:

Flight crew

Required later refinement:

PF/PM split
who was flying during discontinued approach
who was monitoring obstacles/altitude
who heard or did not hear EGPWS
who called for the discontinued approach
who selected the escape path

---

## 22. Information available to actors

Potentially available:

* visual cues from private landing site;
* weather/visibility information;
* instrument altitude and flight path cues;
* knowledge of obstacles/landing site environment;
* EGPWS alerts generated by the aircraft.

Known degraded or problematic:

* external visibility;
* low cloud;
* no briefed go-around route;
* EGPWS warnings not perceived/recognized by crew.

---

## 23. Quarantined report material

The following must not be used directly as SERA expected values:

* AAIB safety recommendation;
* AAIB judgement regarding go-around planning;
* any operator or regulatory action;
* any finding or recommendation beyond factual chronology;
* any implication of blame.

The AAIB itself states its investigation purpose is prevention and not apportioning blame/liability. This supports treating the report as factual and safety-learning material, not as direct SERA expected values.

---

## 24. Draft SERA hypothesis — NOT expected value

Status:

DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON

### 24.1 Candidate safe_operation_escape_point

The approach left safe operation at the transition into a discontinued night approach/go-around without a protected and briefed escape route, in reduced visibility and low cloud.

### 24.2 Candidate unsafe_act_statement

The crew executed or transitioned into a discontinued approach/go-around trajectory that descended toward tree tops.

### 24.3 Candidate unsafe_condition_statement

Night private-site approach with reduced visibility, low cloud, nearby trees/obstacles and no available or briefed go-around procedure/routing.

### 24.4 Candidate direct_actor

Flight crew, with PF/PM separation pending.

### 24.5 Candidate perception statement

The crew may not have perceived or registered the EGPWS warnings and/or obstacle proximity in time to prevent the descent toward trees.

Evidence strength:

MEDIUM as hypothesis; warning non-awareness is reported, but exact perceptual mechanism is not yet reconstructed.

### 24.6 Candidate objective statement

The crew objective appears to have been to discontinue the night approach and transition to an alternative flight path; the safety issue may relate to the lack of a pre-briefed/protected go-around objective/path rather than an intentionally unsafe goal.

Evidence strength:

MEDIUM/HIGH for discontinued approach context; LOW/MEDIUM for unsafe objective.

### 24.7 Candidate action statement

The crew's flight path during the discontinued approach/go-around allowed descent toward obstacles.

Evidence strength:

MEDIUM; exact control and navigation actions need review.

### 24.8 Candidate P/O/A

P candidate: plausible because EGPWS warnings were generated but not perceived/recognized by the crew, and obstacle/terrain proximity may not have been recognized in time.
O candidate: plausible if the operative objective/path for go-around was insufficiently defined or incompatible with safe obstacle clearance.
A candidate: plausible if the intended go-around/discontinued approach was appropriate, but the flown trajectory/control execution was inadequate.

Recommended current status:

Ambiguous P/O/A; preserve as adversarial case.

Do not promote to P/O/A expected value without detailed human review.

### 24.9 Candidate preconditions

night operation
private landing site
reduced visibility
low cloud
obstacle/trees environment
no available or briefed go-around routing
EGPWS warning not perceived
crew workload during discontinued approach
planning/briefing barrier degraded

---

## 25. Key unanswered questions

* What exactly caused the first approach to be discontinued?
* Was the approach discontinued before or after sufficient visual reference was lost?
* Who was PF during the discontinued approach?
* Did either pilot hear any EGPWS alert?
* If not, why not: audio masking, workload, headset/system issue, expectation, attention?
* What altitude and vertical profile existed during the descent toward trees?
* Was the go-around path selected dynamically or improvised?
* Did the crew have a mental model of obstacle location?
* Was the lack of go-around briefing the dominant failure, or only a precondition?
* Could this event be represented as a multi-layer case: planning precondition + perceptual non-detection + action/path issue?

---

## 26. Candidate use recommendation for REAL-EVENT-0002

Recommended use:

HIGH_PRIORITY_DEEP_REVIEW
ADVERSARIAL_CASE
GOOD_BASELINE_CANDIDATE_AFTER_REVIEW
PRECONDITIONS_CATALOG_SOURCE

Do not create fixture yet.

---

PART C — Comparative methodological value

## 27. Why these two events belong together

REAL-EVENT-0001 and REAL-EVENT-0002 are methodologically valuable as a pair.

Both involve:

helicopter approach
degraded visual/environmental cues
low-altitude unsafe state
warning/barrier issues
crew monitoring and perception questions
go-around / missed-approach / escape-path logic
strong preconditions

But they differ in useful ways:

Dimension    REAL-EVENT-0001 Thebaud    REAL-EVENT-0002 Peasmarsh
Operation    offshore platform approach    private landing site public transport
Main transition    instrument approaches → visual approach    night approach → discontinued approach/go-around
Environment    fog/DVE/no discernible horizon    reduced visibility/low cloud/night/trees
Warning barrier    EGPWS did not alert in envelope    EGPWS issued warnings but crew not aware
Key ambiguity    perception vs objective vs action during visual approach    perception vs planning/objective vs action during go-around
SERA value    low-energy non-detection and DVE    unbriefed escape route and warning non-awareness

This contrast is useful for avoiding lazy rules such as:

DVE = P failure
go-around problem = A failure
warning issue = P failure
poor planning = O failure

Each event still requires reconstruction from factual evidence.

---

## 28. Recommended next phase

Recommended next phase:

A4+R-8 — Human Review Questions for REAL-EVENT-0001 and REAL-EVENT-0002

Purpose:

Create a review checklist for a human SERA reviewer to decide whether these events can become candidate-quality examples.

Do not create fixture JSONs yet.
