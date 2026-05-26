# SERA Engine vNext First P/O/A Pilot Design A4R163 v0.2.0

Status: POA_PILOT_DESIGN_CREATED_NOT_EXECUTED
Phase: A4R163
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Design the first P/O/A pilot protocol using the five A4R162 confirmed gates, without executing any P/O/A classification.

## Inputs

- A4R162 confirmed-gate package.
- A4R161 approved/provisional gate set package.
- A4R160 author gate decision intake package.

## Confirmed Gate Inputs (5)

- COMAIR-5191
- COLGAN-3407
- EXECUFLIGHT-1526
- HELIOS-522
- US-AIRWAYS-1549 (negative control)

## Future Pilot Scope (Design Only)

- define how P/O/A must be analyzed at-escape-point;
- define admissible evidence window and excluded evidence window;
- define required axis fields for Perception, Objective, and Action;
- define axis-level blocking criteria;
- define negative control behavior for technical/environmental onset;
- define guardrails preventing causal-key leakage from official probable cause.

## What A4R163 Does Not Do

- does not classify Perception, Objective, or Action;
- does not choose any P-*, O-*, or A-*;
- does not create releasedCode;
- does not open downstream;
- does not create finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.

## Methodological Risks Controlled

- probable-cause-as-answer-key leakage;
- post-escape evidence leakage into axis inference;
- consequence-as-action inversion;
- warning-as-automatic-gate behavior;
- forced human-origin inference in negative control.

## Core Protocol Rules

1. P/O/A can only use evidence available at the escape point or before it.
2. Post-escape evidence can only delimit consequences, not infer P/O/A.
3. Official probable cause is factual context and safety framing, not SERA answer key.
4. If evidence is insufficient at axis level, unresolved/blocked outcomes remain valid.
5. For negative control, NO_HUMAN_P_O_A_AT_ESCAPE_POINT is valid when onset is technical/environmental.

## Negative Control Handling

US-AIRWAYS-1549 remains explicitly in-scope to validate non-forced human-origin behavior at escape point.

## Next Phase Decision

See `docs/sera-vnext/poa-pilot-design-a4r163/A4R164_NEXT_PHASE_DECISION_A4R163_v0.2.0.md`.

## Metrics

- poaPilotDesignCreatedCount: 1
- poaProtocolCreatedCount: 1
- poaPilotTemplateCreatedCount: 1
- poaReadinessMatrixCreatedCount: 1
- poaGuardrailMatrixCreatedCount: 1
- casesIncludedInPilotDesignCount: 5
- confirmedGateInputCount: 5
- negativeControlIncludedCount: 1
- poaExecutedCount: 0
- poaClassifiedCount: 0
- pAxisClassifiedCount: 0
- oAxisClassifiedCount: 0
- aAxisClassifiedCount: 0
- releasedCodeCreatedCount: 0
- downstreamOpenedCount: 0
- finalConclusionCreatedCount: 0
- hfacsCreatedCount: 0
- riskErcCreatedCount: 0
- recommendationsCreatedCount: 0
- corpusFilesModifiedCount: 0
- corpusFilesMovedCount: 0
- corpusFilesDeletedCount: 0
- codeFixtureBaselineChangedCount: 0
- nextPhaseDecisionCreatedCount: 1

## Locks

- NO_P_O_A
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
