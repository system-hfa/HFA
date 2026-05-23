# SERA Engine vNext Trace-Link Completeness Fix v0.2.0

Status: IMPLEMENTED_FOR_REVIEW  
Phase: A4+R-36 — Deterministic Trace-Link Completeness Fix

## 1. Purpose
Fix deterministic trace-link completeness for unresolved P/O/A axes so that every `REVIEW_REQUIRED` or `INSUFFICIENT_EVIDENCE` axis remains auditable and reviewable.

## 2. Original problem
From A4+R-35:
- `TRIAL-SET1-004/perception: must link uncertainty or evidence`
- Perception axis was unresolved but had empty `linkedUncertainties` and empty `linkedEvidence`.

## 3. Files changed
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `tests/sera-vnext/dry-run-trial-set-1.ts`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_MULTI_CASE_REVIEW_TRACE_STABILITY_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_TRACE_LINK_COMPLETENESS_FIX_v0.2.0.md`

## 4. Deterministic completeness rule
For every unresolved axis (`REVIEW_REQUIRED` or `INSUFFICIENT_EVIDENCE`), Step 6 now guarantees:
- non-empty `reviewReasonCode`;
- `linkedUncertainties.length > 0` or `linkedEvidence.length > 0`;
- non-empty `blockingForClassification`;
- non-empty `requiredHumanDecision`;
- non-empty `transitionCriteria`;
- `reviewTrace` mirrors these fields.

## 5. Fallback strategy without inventing evidence
When no axis-specific evidence is extracted, fallback uses explicit uncertainty statements:
- Perception: `No perception-specific evidence was extracted from the neutral narrative.`
- Objective: `No objective/intent-specific evidence was extracted from the neutral narrative.`
- Action: `No action-execution-specific evidence was extracted from the neutral narrative.`

Additional uncertainty clarifies mechanism-level insufficiency instead of fabricating facts.

## 6. Standardized unresolved blockers
Axis-specific blockers are always injected for unresolved paths:
- Perception:
  - `perception_specific_evidence_missing`
  - `cue_recognition_not_established`
- Objective:
  - `objective_specific_evidence_missing`
  - `intent_rule_awareness_not_established`
- Action:
  - `action_execution_specific_evidence_missing`
  - `actor_action_link_not_established`

## 7. Causal assurance hardening
Step 10 now validates unresolved trace completeness by axis and field, failing with explicit details when missing:
- `reviewTrace`
- `reviewReasonCode`
- links (`linkedUncertainties|linkedEvidence`)
- `blockingForClassification`
- `requiredHumanDecision`
- `transitionCriteria`

## 8. Trial Set 1 before/after
Before fix:
- Trial Set 1 multi-case script failed on Trial 004 perception trace links.

After fix:
- `npx tsx tests/sera-vnext/dry-run-trial-set-1.ts` PASS
- Trial 004 perception remains `INSUFFICIENT_EVIDENCE`, now with complete trace links and blockers.

## 9. Scope confirmations
- No final conclusion emitted.
- No HFACS output.
- No Risk/ERC output.
- No legacy engine import.
- No UI integration.
- No DB/Supabase writes.
- `humanReview.required` remains true.
- Causal assurance remains not passed (`PARTIAL_POA_REVIEW_TRACEABLE`).

## 10. Next step
Proceed to next vNext phase only after human review of this fix and preserved unresolved posture discipline.
