# P/O/A Pilot Case Drafts A4R165 v0.2.0

Status: DRAFT_ONLY_EXECUTION
Phase: A4R165

## COMAIR-5191

- sourceCaseId: COMAIR-5191
- sourcePath: `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/COMAIR-5191-NTSB-AAR0705.txt`
- escapePointAnchor: alignment and takeoff initiation on RWY 26 as if RWY 22

### Axis Draft
- Perception: DRAFT_CANDIDATE_RUNWAY_IDENTITY_MISMATCH
- Objective: DRAFT_CANDIDATE_NOMINAL_DEPARTURE_OBJECTIVE_CONTINUITY
- Action: DRAFT_CANDIDATE_WRONG_RUNWAY_LINEUP_AND_TAKEOFF_CONTINUATION

### Rationale by Axis
- Perception: runway-assignment and heading cues were available before roll commitment, but gate behavior reflects mismatch integration failure.
- Objective: at-gate objective remained continuity of a normal departure flow.
- Action: factual chain shows crossing hold-short, aligning on RWY 26, and continuing takeoff logic.

### Evidence Used
- Source slice A4R106: runway 22 clearance chain, heading-bug references, hold-short crossing, lineup/takeoff on RWY 26.
- Gate-prep A4R159 and A4R161/A4R162 gate confirmation records.

### Rejected Alternatives
- Impact/collision as axis anchor.
- Late outcome as proxy for objective.
- External probable-cause phrasing as axis answer key.

### Uncertainty Notes
- Perception micro-threshold between hold-short crossing and roll initiation remains a caution point.

### Locks Preserved
- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- DRAFT_ONLY

---

## COLGAN-3407

- sourceCaseId: COLGAN-3407
- sourcePath: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/1__2010__NTSB-USA__DHC-8-402-Q400__Loss-of-Control-on-Approach-Colgan-Air-Conti.txt`
- escapePointAnchor: energy/speed margin outside defensible range before stick shaker

### Axis Draft
- Perception: UNRESOLVED
- Objective: DRAFT_CANDIDATE_NOMINAL_APPROACH_OBJECTIVE_CONTINUITY
- Action: DRAFT_CANDIDATE_NO_STABILIZING_RECOVERY_BEFORE_SHAKER

### Rationale by Axis
- Perception: cues were available, but direct at-gate state assignment would require speculative closure beyond admissible evidence window.
- Objective: approach continuation objective exists factually before upset.
- Action: no stabilizing correction is evidenced before shaker onset in selected threshold window.

### Evidence Used
- Source slice A4R115 evidence IDs COL3407-E2 through COL3407-E6.
- Gate-prep A4R159 and second-author confirmation A4R162.

### Rejected Alternatives
- Stick shaker as automatic action answer key.
- Impact phase as action evidence.
- Outcome-severity logic as perception closure.

### Uncertainty Notes
- Perception remains UNRESOLVED.
- Action classification remains draft and caution-bound.

### Locks Preserved
- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- DRAFT_ONLY

---

## EXECUFLIGHT-1526

- sourceCaseId: EXECUFLIGHT-1526
- sourcePath: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt`
- escapePointAnchor: localizer-established but non-defensible vertical profile before MDA

### Axis Draft
- Perception: DRAFT_CANDIDATE_PROFILE_AND_SPEED_CUE_AVAILABLE
- Objective: DRAFT_CANDIDATE_NOMINAL_APPROACH_OBJECTIVE_CONTINUITY
- Action: DRAFT_CANDIDATE_CONTINUE_UNSTABLE_PROFILE_INSTEAD_OF_DISCONTINUE

### Rationale by Axis
- Perception: altitude/profile and speed cues were available before MDA threshold.
- Objective: objective remained approach completion under nominal framing.
- Action: continuation under unstable profile (instead of discontinuation) is observable before MDA crossing.

### Evidence Used
- Gate-prep A4R159 evidence basis and A4R161 approved gate update.
- Local TXT factual markers on localizer clearance, delayed descent, high profile, high descent recovery demand, and stabilization breach before MDA.

### Rejected Alternatives
- Below-MDA consequence as sole action anchor.
- Pull-up/late alert as first actionable evidence.
- Organizational context as direct objective assignment.

### Uncertainty Notes
- Progressive threshold case; exact micro-onset inside the interval remains caution-labeled.

### Locks Preserved
- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- DRAFT_ONLY

---

## HELIOS-522

- sourceCaseId: HELIOS-522
- sourcePath: `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-3__2006__AAIASB-Greece__Boeing-737-31S__Accident-Report-11-2006-Helios-Airways-Flig.txt`
- escapePointAnchor: takeoff-climb interval with non-defensible pressurization state until cabin-warning window

### Axis Draft
- Perception: UNRESOLVED
- Objective: UNRESOLVED
- Action: DRAFT_CANDIDATE_CONTINUED_CLIMB_WITH_NON_DEFENSIBLE_PRESSURIZATION_STATE

### Rationale by Axis
- Perception: warning and system cues are factual, but at-gate human state attribution is not safely closed in the interval window.
- Objective: line-level objective assignment during potential capability degradation remains uncertain.
- Action: continuation of climb with unresolved pressurization state is factually observable at interval level.

### Evidence Used
- Source slice A4R115 evidence IDs HEL522-E1 through HEL522-E5.
- Gate-confirmation records A4R161 and A4R162 preserving interval logic.

### Rejected Alternatives
- Warning-only collapse as single-point onset.
- Post-incapacitation sequence as objective/action evidence.
- Outcome phase as axis closure.

### Uncertainty Notes
- HOLD: actor-capability boundary review required for interval case.

### Locks Preserved
- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- DRAFT_ONLY

---

## US-AIRWAYS-1549 (Negative Control)

- sourceCaseId: US-AIRWAYS-1549
- sourcePath: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt`
- escapePointAnchor: bird strike with near-total bilateral thrust loss

### Axis Draft
- Perception: NO_HUMAN_P_O_A_AT_ESCAPE_POINT
- Objective: NO_HUMAN_P_O_A_AT_ESCAPE_POINT
- Action: NO_HUMAN_P_O_A_AT_ESCAPE_POINT

### Rationale by Axis
- At escape-point onset, origin is technical/environmental.
- Human response occurs after onset and is not reused as onset-origin evidence.

### Evidence Used
- Source slice A4R115 evidence IDs US1549-E1 through US1549-E4.
- Gate records A4R159/A4R161/A4R162 confirming technical-environmental negative-control role.

### Rejected Alternatives
- Ditching decision as onset-origin action.
- Successful response quality as human-origin onset proof.
- Outcome survival as objective/perception proxy.

### Uncertainty Notes
- Negative control preserved with no forced human-origin axis.

### Locks Preserved
- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- DRAFT_ONLY
