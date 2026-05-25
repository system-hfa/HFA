# SERA Engine vNext Synthetic Event Governance A4R147 v0.2.0

Status: SYNTHETIC_GOVERNANCE_RECORDED
Phase: A4R147
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Define governance for synthetic events in SERA vNext without creating final synthetic cases in this phase.

## why synthetic events are useful

Synthetic events are useful to:
- test methodological boundaries under controlled conditions;
- test anti-overclassification behavior;
- test discrete escape point versus progressive escape zone handling;
- test clean "Quando..." gate behavior;
- test warning/outcome traps;
- test source-insufficient blocking behavior;
- support internal calibration and adversarial validation.

## why synthetic events are dangerous

Synthetic events can create methodological risk if used without strict controls:
- they can be mistaken for real empirical evidence;
- they can be used to force P/O/A outputs without valid evidence logic;
- they can contaminate real-event trackers;
- they can create false confidence in method performance;
- they can be used as external proof claims when they are only engineered scenarios.

## relationship to A4R137 / A4R138 / A4R140 / A4R143 / A4R146

- A4R137: P/O/A must be anchored at escape point.
- A4R138: gate and block protocol remains mandatory for any future synthetic P/O/A simulation.
- A4R140: progressive escape handling rules apply to synthetic progressive designs.
- A4R143: intake layering discipline applies; synthetic design is not sovereign authority.
- A4R146: real-event gate drafting remains separate from synthetic design governance.

## definitions

### Synthetic Event
Artificially created event for testing one or more methodological mechanisms.

### Real Event
Historical/documented event grounded in real sources.

### Synthetic Case
Controlled narrative that can be designed with sufficient or intentionally insufficient evidence.

### Synthetic Fixture
Future structured test object (not created in this phase).

### Synthetic Adversarial Case
Synthetic case designed to induce method errors and verify safeguards.

### Negative Control Synthetic
Synthetic case that should not yield positive frontline human-factor classification at first departure.

### Boundary Synthetic
Synthetic case designed to test specific classification boundaries or gate boundaries.

## allowed uses

Synthetic events are allowed for:
- internal test and calibration;
- adversarial validation;
- boundary documentation;
- anti-overclassification validation;
- training on gate logic and blocking rules;
- protocol rehearsal before controlled pilot execution.

## prohibited uses

Synthetic events are prohibited for:
- replacing real events;
- external empirical validity claims;
- real-world frequency/statistical claims;
- scientific proof of method validity;
- overriding real-event adjudication or control board state;
- opening release/downstream without dedicated governance.

## synthetic type taxonomy

Governed types for future design:

1. TYPE-01_DISCRETE_HF_POSITIVE
2. TYPE-02_PROGRESSIVE_HF_POSITIVE
3. TYPE-03_TECHNICAL_NEGATIVE_CONTROL
4. TYPE-04_ENVIRONMENTAL_NEGATIVE_CONTROL
5. TYPE-05_MIXED_TECH_HUMAN_BOUNDARY
6. TYPE-06_SOURCE_INSUFFICIENT
7. TYPE-07_WARNING_TRAP
8. TYPE-08_OUTCOME_TRAP
9. TYPE-09_VIOLATION_LANGUAGE_TRAP
10. TYPE-10_ORGANIZATIONAL_BOUNDARY

Detailed behavior is defined in:
- [SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_TAXONOMY_A4R147_v0.2.0.md](./SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_TAXONOMY_A4R147_v0.2.0.md)

## evidence requirements for future synthetic cases

Every future synthetic case must define:
- `syntheticId`
- `syntheticType`
- `designPurpose`
- `intendedBoundary`
- `whatItTests`
- `whatItMustNotTest`
- `sourceStatus: SYNTHETIC`
- `realEventContaminationRisk`
- `escapePointTemporalType`
- `operationSafeState`
- `controlledVariable`
- `safeLimitOrExpectedBoundary`
- `unsafeActOrConditionCandidate`
- `candidateWhenStatement`
- `evidencePack`
- `expectedBlockers`
- `expectedAllowedOutputs`
- `prohibitedInferences`
- `knownTrap`
- `authorNotes`
- `releaseStatus: NO_RELEASED_CODE`
- `downstreamStatus: NO_DOWNSTREAM`

## escape-point requirements

Synthetic events must follow the same gate discipline as real events:
1. define pre-escape context, escape anchor, and post-escape consequences;
2. avoid warning/critical point/outcome as escape anchor;
3. declare temporal type (discrete/progressive/marker-only/unresolved);
4. keep "Quando..." nucleus observable and neutral;
5. block unsupported inferences using A4R138/A4R140 block logic.

## anti-contamination rules

1. Synthetic artifacts must use dedicated synthetic labels and directories.
2. Synthetic artifacts must not be merged into real-event trackers as if real evidence.
3. Real-event control board and reset register remain authoritative for real events only.
4. No synthetic case can alter real-event status, readiness, or adjudication state.
5. Synthetic examples must carry explicit disclaimers: `sourceStatus: SYNTHETIC`.

## precedence rules

Synthetic artifacts never supersede:
1. canonical SERA methodology;
2. Hendy/Daumas method constraints;
3. well-documented real-event evidence;
4. registered author decisions;
5. methodology control board governance;
6. frozen real-event decisions.

## future workflow

Planned sequencing:
- A4R148: synthetic case design pack (documents only);
- A4R149: adversarial synthetic case pack;
- A4R150: synthetic fixture schema draft.

Detailed workflow is defined in:
- [SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_FUTURE_WORKFLOW_A4R147_v0.2.0.md](./SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_FUTURE_WORKFLOW_A4R147_v0.2.0.md)

## locks preserved

- no synthetic final cases created in this phase
- no synthetic fixtures created in this phase
- no real-event P/O/A classified
- no releasedCode
- no selectedCode CLASSIFIED
- no downstream
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations
- no code, fixture, baseline, or corpus modification
