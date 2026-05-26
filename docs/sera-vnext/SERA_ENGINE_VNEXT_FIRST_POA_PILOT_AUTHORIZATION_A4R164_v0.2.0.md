# SERA Engine vNext First P/O/A Pilot Authorization A4R164 v0.2.0

Status: AUTHOR_AUTHORIZATION_SCOPE_LOCK_RECORDED
Phase: A4R164
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Record author authorization and scope lock for a future first P/O/A pilot using the A4R163 protocol, without executing any P/O/A classification in this phase.

## Author Decision

- authorAuthorizationDecision: AUTHOR_AUTHORIZES_FIRST_POA_PILOT_SCOPE_LOCK_ONLY

## Authorized Events for Future Pilot

- COMAIR-5191
- COLGAN-3407
- EXECUFLIGHT-1526
- HELIOS-522
- US-AIRWAYS-1549 (negative control)

## Included Negative Control

- US-AIRWAYS-1549 remains mandatory in scope to validate non-forced human-origin behavior.

## What Is Authorized

- future pilot scope may include the 5 listed events;
- A4R163 protocol is mandatory;
- A4R163 guardrails are mandatory;
- A4R165 may execute draft-only P/O/A only after explicit next-step user authorization.

## What Is Not Authorized

- no P/O/A axis classification in A4R164;
- no P-*, O-*, A-* selection;
- no releasedCode;
- no downstream;
- no finalConclusion;
- no HFACS;
- no Risk/ERC;
- no ARMS/ERC;
- no recommendations.

## Relation with A4R163

A4R164 consumes the A4R163 pilot design, readiness matrix, and guardrail matrix and converts them into an explicit authorization and scope lock layer.

## Mandatory Protocol and Guardrails

- protocol: `docs/sera-vnext/poa-pilot-design-a4r163/POA_AT_ESCAPE_POINT_PROTOCOL_A4R163_v0.2.0.md`
- guardrails: `docs/sera-vnext/poa-pilot-design-a4r163/POA_PILOT_GUARDRAIL_MATRIX_A4R163_v0.2.0.csv`

## Explicit Declaration

- A4R164 does not execute P/O/A.
- A4R164 does not classify any axis.
- A4R164 only locks scope and authorization conditions for A4R165.

## Next Phase

See `docs/sera-vnext/poa-pilot-authorization-a4r164/A4R165_NEXT_PHASE_DECISION_A4R164_v0.2.0.md`.

## Metrics

- authorAuthorizationScopeLockCreatedCount: 1
- authorizationMatrixCreatedCount: 1
- executionContractCreatedCount: 1
- authorAuthorizationRecordCreatedCount: 1
- eventsAuthorizedForFuturePilotCount: 5
- negativeControlsAuthorizedForFuturePilotCount: 1
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
