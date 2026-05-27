# SERA Engine vNext First P/O/A Pilot Draft Execution A4R165 v0.2.0

Status: POA_PILOT_DRAFT_EXECUTED_CONTROLLED
Phase: A4R165
methodology: SERA
releaseStatus: NO_RELEASE_SCOPE
flowStatus: NO_DOWNSTREAM

## Containment Override (A4R165-STOP)

- overrideStatus: METHODOLOGY_VIOLATION
- promotionStatus: REWORK_REQUIRED
- trustStatus: NOT_TRUSTED_UNTIL_CANONICAL_REWORK
- this draft must not be used for release, baseline, downstream, or methodology-proof use until canonical-question audit/rework is completed.

## Objective

Execute the first P/O/A pilot in draft-only mode for the five cases authorized in A4R164, applying the A4R163 protocol and guardrails without opening any release path.

## Inputs

- A4R164 authorization and scope lock package.
- A4R163 protocol and guardrail matrix.
- A4R162 final confirmed gates.
- A4R159 gate evidence basis and source-slice factual materials.

## Cases in Scope

- COMAIR-5191
- COLGAN-3407
- EXECUFLIGHT-1526
- HELIOS-522
- US-AIRWAYS-1549 (negative control)

## Execution Boundary

- Draft-only axis outcomes.
- UNRESOLVED allowed and applied where factual anchor was insufficient.
- No release artifacts.
- No downstream opening.
- No final synthesis judgment.
- No secondary taxonomy output.
- No risk-layer output.

## Draft Result Summary

| eventId | Perception draft | Objective draft | Action draft | status |
|---|---|---|---|---|
| COMAIR-5191 | DRAFT_CANDIDATE_RUNWAY_IDENTITY_MISMATCH | DRAFT_CANDIDATE_NOMINAL_DEPARTURE_OBJECTIVE_CONTINUITY | DRAFT_CANDIDATE_WRONG_RUNWAY_LINEUP_AND_TAKEOFF_CONTINUATION | DRAFT_COMPLETE_WITH_CAUTION |
| COLGAN-3407 | UNRESOLVED | DRAFT_CANDIDATE_NOMINAL_APPROACH_OBJECTIVE_CONTINUITY | DRAFT_CANDIDATE_NO_STABILIZING_RECOVERY_BEFORE_SHAKER | DRAFT_COMPLETE_WITH_CAUTION |
| EXECUFLIGHT-1526 | DRAFT_CANDIDATE_PROFILE_AND_SPEED_CUE_AVAILABLE | DRAFT_CANDIDATE_NOMINAL_APPROACH_OBJECTIVE_CONTINUITY | DRAFT_CANDIDATE_CONTINUE_UNSTABLE_PROFILE_INSTEAD_OF_DISCONTINUE | DRAFT_COMPLETE_WITH_CAUTION |
| HELIOS-522 | UNRESOLVED | UNRESOLVED | DRAFT_CANDIDATE_CONTINUED_CLIMB_WITH_NON_DEFENSIBLE_PRESSURIZATION_STATE | DRAFT_PARTIAL_WITH_HOLD |
| US-AIRWAYS-1549 | NO_HUMAN_P_O_A_AT_ESCAPE_POINT | NO_HUMAN_P_O_A_AT_ESCAPE_POINT | NO_HUMAN_P_O_A_AT_ESCAPE_POINT | NEGATIVE_CONTROL_PRESERVED |

## UNRESOLVED and Holds

- COLGAN-3407: Perception remains UNRESOLVED at the selected interval; available cues are factual, but direct at-gate state assignment is not sufficiently constrained without post-gate leakage.
- HELIOS-522: Perception and Objective remain UNRESOLVED due to interval-case capability boundary and actor-state uncertainty before incapacitation.
- HELIOS-522 is recorded as HOLD for future focused review on actor-capability boundary at interval onset.

## Negative Control Handling

US-AIRWAYS-1549 remained technical/environmental at escape-point onset. No forced human-origin axis was produced.

## Controlled Readiness Update

- Pilot executed as authorized scope only.
- Draft set is usable for author review.
- One case (HELIOS-522) remains partial with hold.
- Next phase should focus on author review/confirmation of A4R165 drafts before any further step.

## Metrics

- pilotCasesAuthorizedCount: 5
- pilotCasesExecutedCount: 5
- pilotCasesWithAnyUnresolvedCount: 2
- pilotCasesWithHoldCount: 1
- pilotNegativeControlsPreservedCount: 1
- draftAxisCandidatesCount: 10
- unresolvedAxisCount: 3
- noHumanOriginAxisCount: 3
- releaseArtifactsCreatedCount: 0
- downstreamOpenedCount: 0
- codeFilesChangedCount: 0
- corpusFilesChangedCount: 0

## Locks Preserved

- NO_RELEASE_SCOPE
- NO_DOWNSTREAM
- NO_FINAL_SYNTHESIS
- NO_SECONDARY_TAXONOMY_OUTPUT
- NO_RISK_LAYER_OUTPUT
