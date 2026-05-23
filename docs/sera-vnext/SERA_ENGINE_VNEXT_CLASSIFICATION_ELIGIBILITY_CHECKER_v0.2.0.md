# SERA Engine vNext Classification Eligibility Checker v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-38 — Classification Eligibility Checker  
Scope: deterministic axis-level eligibility/readiness checking without final classification emission

## 1. Purpose
Implement a deterministic eligibility layer that decides whether each P/O/A axis can transition from unresolved/review states to `READY_FOR_HUMAN_CLASSIFICATION`.

This phase does not emit `CLASSIFIED`.

## 2. Files changed
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `tests/sera-vnext/dry-run-trial-001.ts`
- `tests/sera-vnext/dry-run-trial-set-1.ts`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CLASSIFICATION_ELIGIBILITY_CHECKER_v0.2.0.md`

## 3. Eligibility contract
Each axis now carries `classificationEligibility` with:
- `eligibilityStatus` (`NOT_ELIGIBLE`, `ELIGIBLE_FOR_HUMAN_REVIEW`, `BLOCKED_BY_GUARDRAIL`)
- `eligibleForHumanClassification`
- `eligibilityChecks`
- `unmetCriteria`
- `waiverRequired`
- `absoluteBlockers`
- `readyForHumanClassificationReason`

Axis `status` now allows `READY_FOR_HUMAN_CLASSIFICATION`, while keeping `CLASSIFIED` blocked in this phase.

## 4. Universal criteria implemented
Eligibility gates require, per axis:
- statement present;
- non-empty evidence;
- review trace present;
- review reason code present;
- transition criteria present;
- semantic guardrails present;
- required human decision present;
- no downstream HFACS/Risk/ERC request/field in causal-core eligibility path;
- no final conclusion request/field in causal-core eligibility path;
- no unresolved blocking list for readiness.

## 5. Axis-specific criteria implemented
### Perception
- cue availability evidence required;
- cue uptake/recognition timing support required;
- weather/warning-only interpretation blocked as guardrail.

### Objective
- objective/intent evidence required;
- continuation context alone not enough;
- violation-style interpretation without rule-awareness evidence blocked.

### Action
- concrete action/non-action evidence required;
- actor-action link required;
- sequence/timing support required;
- aircraft-state collapse into action-failure blocked;
- inability-style path blocked without physical/motor/ergonomic evidence.

## 6. Absolute blockers
Eligibility is blocked when guardrail-critical violations are detected, including:
- missing statement/evidence/trace core fields;
- perception failure inferred from weather/warning alone;
- objective violation-style interpretation without rule-awareness evidence;
- action collapse (aircraft state -> action failure) or inability-style path without physical evidence.

## 7. Trial 001 result
- Dry-run PASS.
- No axis is `CLASSIFIED`.
- Axes remain conservative (`REVIEW_REQUIRED` or blocked/not eligible at eligibility layer).
- `humanReview.required` remains true.

## 8. Trial Set 1 result
- Dry-run PASS for multi-case matrix.
- No axis in Trial Set 1 became `CLASSIFIED`.
- Trial 004 remains conservative (`INSUFFICIENT_EVIDENCE` with blocked eligibility), without invented evidence.
- Eligibility output is now explicit per axis, including unmet criteria and absolute blockers counts.

## 9. Causal assurance updates
Step 10 now verifies:
- eligibility payload present for every axis;
- no axis auto-classified;
- no eligible axis with absolute blockers;
- no eligible axis missing transition criteria;
- no eligible axis missing required human decision;
- no downstream contamination.

Causal assurance status in this phase:
- `PARTIAL_ELIGIBILITY_CHECKED_NOT_CLASSIFIED`

## 10. Scope confirmations
- no `CLASSIFIED` emission in this phase;
- no final conclusion emitted;
- no HFACS output;
- no Risk/ERC output;
- no legacy import added;
- no UI integration;
- no DB/Supabase write.

## 11. Decision
Eligibility checker is implemented and operational.
Final classification remains blocked and human-gated.

## 12. Next steps
Proceed to next phase only to refine readiness calibration and waiver governance; keep automatic final classification disabled.
