# SERA Engine vNext Causal Assurance Traceability v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-34 — Strengthen Causal Assurance and Review Traceability  
Scope: deterministic review-trace hardening for unresolved P/O/A axis decisions  
Non-scope: preconditions logic, recommendations logic, final conclusion generation, UI integration, DB writes, legacy integration, HFACS integration, Risk/ERC integration

## 1. Purpose
This phase strengthens the review traceability layer before any preconditions/recommendations expansion.
The key objective is to make unresolved axis outcomes explicit, traceable and auditable.

## 2. Files changed
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `tests/sera-vnext/dry-run-trial-001.ts`

## 3. Review trace implementation
Each unresolved axis (`REVIEW_REQUIRED` / `INSUFFICIENT_EVIDENCE`) now includes:
- `reviewReason`
- `reviewReasonCode`
- `linkedUncertainties`
- `linkedEvidence`
- `blockingForClassification`
- `requiredHumanDecision`
- `transitionCriteria`
- `reviewTrace` object with the same traceability payload

## 4. Transition criteria hardening
Transition to classified status is now constrained by explicit criteria, including:
- perception: cue recognition timing and cue uptake evidence;
- objective: explicit intent/rule-awareness evidence;
- action: concrete action-execution evidence with actor linkage and no aircraft-state collapse.

## 5. Blocking-for-classification controls
Trial 001 unresolved posture is now traceable by explicit blockers, for example:
- perception: recognition timing not established;
- objective: intent/rule-awareness not established;
- action: exact control-input sequence and actor-action linkage not established;
- action inability (A-D style) remains blocked without physical/motor/ergonomic evidence.

## 6. Trial 001 output summary
Dry-run indicates:
- all axes unresolved (`REVIEW_REQUIRED` expected);
- traceability payload present per axis;
- causal assurance status remains non-pass and trace-focused.

## 7. Assurance status
Assurance status in this phase:
- `PARTIAL_POA_REVIEW_TRACEABLE`

This indicates traceability completeness for unresolved outcomes, while still blocking production-level PASS.

## 8. Confirmations
- no final free conclusion field;
- no HFACS output;
- no Risk/ERC output;
- no legacy import in vNext modules/tests;
- no UI changes;
- no DB writes;
- human review required remains true;
- causal assurance remains not passed.

## 9. Next steps
- A4+R-35: broaden cross-trial comparison and stability checks for unresolved-to-classified transition policy.
- Formalize reviewer decision templates mapped to `reviewReasonCode` and `transitionCriteria`.
