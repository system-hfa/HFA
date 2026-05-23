# SERA Engine vNext Human Review Decision Gate Contract v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-41 — Human Review Decision Gate Contract

## Purpose
Establish an explicit, deterministic human-decision contract per P/O/A axis before any future final classification release.

This phase requires structured human decision inputs and keeps automatic final outputs locked.

## Relation to A4+R-40
A4+R-40 refined readiness thresholds and produced mixed axis eligibility states (`ELIGIBLE_FOR_HUMAN_REVIEW` / `NOT_ELIGIBLE`) without `CLASSIFIED`.

A4+R-41 adds the mandatory contract layer on top of that eligibility:
- axis-level decision contracts;
- deterministic gate status;
- waiver governance at decision-contract level;
- explicit downstream output locks.

## Human Review Decision Gate Structure
`HumanReviewDecisionGate` includes:
- `required`;
- `status`: `HUMAN_DECISION_GATE_READY` | `HUMAN_DECISION_GATE_PARTIAL` | `HUMAN_DECISION_GATE_BLOCKED`;
- `axisContracts` (one per perception/objective/action);
- `globalProhibitedOutputs`;
- `globalDecisionRules`.

Each `HumanReviewAxisDecisionContract` includes:
- `axis`;
- `decisionStatus`: `HUMAN_DECISION_REQUIRED` | `READY_FOR_HUMAN_DECISION` | `NOT_READY_FOR_HUMAN_DECISION` | `BLOCKED_BY_GUARDRAIL`;
- `eligibleForDecision`;
- `requiredInputs`;
- `requiredEvidenceReferences`;
- `waiverDecisionRequired`;
- `waiverDecisionAllowed`;
- `waiverDecisionProhibitedReason`;
- `allowedReviewerActions`;
- `prohibitedReviewerActions`;
- `decisionChecklist`;
- `residualUncertainty`;
- `traceLinks`;
- `outputLock`.

## Axis Decision Status Rules
Deterministic mapping from eligibility:
- `ELIGIBLE_FOR_HUMAN_REVIEW` -> `READY_FOR_HUMAN_DECISION`;
- `NOT_ELIGIBLE` -> `NOT_READY_FOR_HUMAN_DECISION`;
- `BLOCKED_BY_GUARDRAIL` -> `BLOCKED_BY_GUARDRAIL`.

`CLASSIFIED` remains forbidden for all automatic dry-runs.

## Waiver Rules
Waiver decision is only allowed when all are true:
- `waiverAllowed == true`;
- no absolute blockers;
- residual uncertainty exists.

Waiver decision is prohibited when absolute blockers exist.

## Output Locks
Axis-level and global gate locks explicitly prohibit:
- `CLASSIFIED` automatic emission;
- `finalConclusion`;
- `HFACS`;
- `Risk/ERC`;
- `ARMS/ERC`.

## Trial 001 Result
Expected contract posture:
- Perception: `READY_FOR_HUMAN_DECISION`;
- Objective: `READY_FOR_HUMAN_DECISION`;
- Action: `READY_FOR_HUMAN_DECISION`;
- Gate status: `HUMAN_DECISION_GATE_READY`;
- Human decision still required;
- No final classification emitted.

## Trial Set 1 Result
Expected contract posture after deterministic mapping:
- Trial 001: P/O/A ready for human decision.
- Trial 002: perception ready; objective/action not ready.
- Trial 003: perception ready; objective/action not ready.
- Trial 004: P/O/A not ready.
- Trial 005: perception ready; objective/action not ready.

No axis is allowed to auto-classify.
No downstream output is unlocked.

## Confirmations
This phase confirms:
- no `CLASSIFIED` output;
- no final conclusion output;
- no HFACS output;
- no Risk/ERC output;
- no legacy import;
- no UI/DB/API integration;
- human review remains required;
- causal assurance remains non-passed (`PARTIAL_HUMAN_REVIEW_GATE_READY_NOT_CLASSIFIED`).

## Next Steps
Proceed to a dedicated human reviewer interaction phase that records explicit reviewer decisions against this contract, still without enabling automatic final classification or downstream layers.
