# SERA Engine vNext Human Decision Input Schema v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-42 — Human Decision Input Schema

## Purpose
Define the structured human decision input schema and deterministic validation contract for axis-level reviewer decisions (P/O/A), without enabling final classification release.

## Relation to A4+R-41
A4+R-41 introduced the `HumanReviewDecisionGate` and axis contracts (`READY_FOR_HUMAN_DECISION`, `NOT_READY_FOR_HUMAN_DECISION`, `BLOCKED_BY_GUARDRAIL`).

A4+R-42 adds the human input schema and validation layer that binds reviewer submissions to those contracts.

## Human Input Schema
`HumanDecisionInputSet`:
- `inputId`
- `reviewerId?`
- `reviewTimestamp?`
- `axisDecisions`

`HumanAxisDecisionInput`:
- `axis`
- `decisionIntent`: `PROPOSE_CODE` | `DEFER_AXIS` | `REQUEST_MORE_EVIDENCE` | `REJECT_AXIS_CLASSIFICATION`
- `proposedCode`
- `evidenceReferences`
- `reviewerRationale`
- `acceptedUncertainties`
- `rejectedUncertainties`
- `waiverDecision`
- `guardrailAcknowledgements`
- `limitations`
- `confidenceByReviewer`
- `requestedDownstreamOutputs?` (explicit guardrail-blocked field)

`HumanWaiverDecision`:
- `requested`
- `approved`
- `rationale`
- `acceptedResidualUncertainty`
- `prohibitedIfAbsoluteBlocker`

`HumanDecisionValidationResult`:
- `axis`
- `valid`
- `status`:
  - `VALID_FOR_RELEASE_GATE`
  - `INVALID_NOT_READY`
  - `INVALID_MISSING_EVIDENCE_REFERENCES`
  - `INVALID_MISSING_RATIONALE`
  - `INVALID_WAIVER_CONFLICT`
  - `INVALID_GUARDRAIL_CONFLICT`
- `blockingIssues`
- `warnings`
- `acceptedForNextGate`

## Deterministic Validation Rules
1. `PROPOSE_CODE` is invalid unless axis contract is `READY_FOR_HUMAN_DECISION`.
2. `PROPOSE_CODE` requires:
- non-empty `proposedCode`;
- non-empty `evidenceReferences`;
- non-empty `reviewerRationale`;
- non-empty `guardrailAcknowledgements`.
3. Waiver approval requires:
- contract waiver allowed;
- no absolute blockers;
- waiver rationale;
- non-empty accepted residual uncertainty.
4. Any downstream unlock attempt (`CLASSIFIED`, `finalConclusion`, `HFACS`, `Risk/ERC`, `ARMS/ERC`) is invalid.
5. `A-D` proposal requires explicit physical/motor/ergonomic acknowledgement.
6. `O-C` / `O-D` / `O-E` proposal requires explicit intent and rule-awareness acknowledgement.
7. Perception failure-code proposal requires explicit cue uptake/recognition/timing acknowledgement.
8. Validation never throws for methodological invalidity; it always returns structured invalid results.

## Axis-Specific Guardrail Rules
- Perception failure proposals cannot be accepted from weather/warning-only posture.
- Objective violation-style proposals require intent/rule-awareness acknowledgement.
- Action inability-style proposal (`A-D`) requires physical/motor/ergonomic acknowledgement.

## Waiver Governance
- Waiver is allowed only when contract permits it.
- Required-waiver axes (e.g., action in Trial 001) must include approved waiver path in proposal intent.
- Waiver cannot bypass absolute blockers.

## Valid / Invalid Examples
Valid (ready axis):
- `decisionIntent=PROPOSE_CODE`
- `proposedCode` present
- evidence references present
- rationale present
- guardrail acknowledgements present
- waiver approved only when required/allowed

Invalid:
- missing `evidenceReferences` -> `INVALID_MISSING_EVIDENCE_REFERENCES`
- `A-D` without physical/motor/ergonomic acknowledgement -> `INVALID_GUARDRAIL_CONFLICT`
- downstream unlock request (`finalConclusion` etc.) -> `INVALID_GUARDRAIL_CONFLICT`
- proposal on non-ready axis -> `INVALID_NOT_READY`

## Trial 001 Result
- Ready axes (P/O/A) accept valid mock proposals as `VALID_FOR_RELEASE_GATE`.
- Invalid mock inputs are deterministically blocked.
- `proposedCode` never becomes `selectedCode`.
- No axis becomes `CLASSIFIED`.

## Trial Set 1 Result
- `PROPOSE_CODE` is accepted only when axis contract is `READY_FOR_HUMAN_DECISION`.
- `NOT_READY_FOR_HUMAN_DECISION` axes reject proposal with `INVALID_NOT_READY`.
- Trial 004 rejects proposal for all three axes.
- No valid/invalid input path unlocks final classification.

## Confirmations
- no `CLASSIFIED` output;
- no final conclusion output;
- no HFACS output;
- no Risk/ERC output;
- no legacy import;
- no UI/DB/API integration;
- causal assurance remains non-passed (`PARTIAL_HUMAN_DECISION_INPUT_VALIDATED_NOT_CLASSIFIED`).

## Next Steps
A4+R-43 — Manual Classification Dry-Run:
- exercise reviewer decision traces over this schema;
- continue blocking automatic final classification and downstream layers.
