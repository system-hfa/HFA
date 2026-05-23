# SERA Engine vNext Review-to-Classification Policy v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-37 — Formal Review-to-Classification Transition Policy  
Scope: normative transition policy from unresolved/review states to axis-level classification in the causal core

## 1. Purpose
This policy governs when each P/O/A axis may transition from unresolved states (`INSUFFICIENT_EVIDENCE`, `REVIEW_REQUIRED`, `UNRESOLVED`) to `CLASSIFIED`.
The objective is to enforce methodological discipline, traceability, and guardrail integrity before any classification release.

## 2. Non-scope
This phase does not:
- release broad automatic classification;
- create preconditions logic;
- create recommendations logic;
- create final conclusion generation;
- integrate UI or DB;
- activate HFACS or Risk/ERC;
- create fixtures or baseline promotions.

## 3. Transition states
The normative state model is:
- `INSUFFICIENT_EVIDENCE`: statement/evidence package does not support classification.
- `REVIEW_REQUIRED`: evidence exists but unresolved uncertainty or guardrail risk blocks classification.
- `READY_FOR_HUMAN_CLASSIFICATION`: all eligibility gates pass; human decision is still required.
- `CLASSIFIED`: human-approved axis classification with complete contract fields.
- `BLOCKED_BY_GUARDRAIL`: hard guardrail violation; classification forbidden until resolved.

## 4. Universal minimum criteria
Any axis may leave unresolved status only when all minimum criteria are true:
- statement exists and is axis-specific;
- evidence is sufficient, explicit, and linked to the axis;
- linked uncertainties are resolved or explicitly accepted by human review;
- `blockingForClassification` is empty or formally waived under policy;
- `requiredHumanDecision` is present and completed;
- `transitionCriteria` are satisfied and traceable;
- semantic guardrails are not violated;
- causal assurance cannot be interpreted as passed solely because output exists.

## 5. Absolute blockers
Classification is prohibited when any condition below is true:
- missing statement;
- missing evidence;
- empty or absent reviewTrace;
- unresolved `blockingForClassification` items;
- essential direct-actor precision missing when required for axis attribution;
- risk of collapsing operational unsafe condition into forced active failure;
- attempt to emit HFACS or Risk/ERC from causal core;
- attempt to generate free-form final conclusion.

## 6. Perception axis transition policy
Perception can move to `READY_FOR_HUMAN_CLASSIFICATION` only if:
- cue availability evidence exists;
- cue uptake/recognition timing evidence exists;
- degraded cue environment is separated from actual cue misunderstanding/non-perception;
- no inference is made from weather degradation or warning failure alone.

Trial Set 1 references:
- Trial 001 remains review-required until recognition-timing evidence is explicit.
- Trial 004 may remain `INSUFFICIENT_EVIDENCE` without penalty or forced classification.

## 7. Objective axis transition policy
Objective can move to `READY_FOR_HUMAN_CLASSIFICATION` only if:
- objective/intent evidence exists;
- rule/procedure awareness evidence exists before violation-style classification;
- continuation context is separated from conscious deviation.

Trial Set 1 references:
- Trial 001 cannot transition to violation-style objective classification without explicit intent/rule-awareness support.
- Peasmarsh (Trial 002) must preserve ambiguity when intent evidence is not decisive.

## 8. Action axis transition policy
Action can move to `READY_FOR_HUMAN_CLASSIFICATION` only if:
- concrete action/non-action evidence exists;
- actor-action linkage is explicit;
- sequence and timing evidence exist;
- aircraft state is separated from action-quality judgment;
- A-D/inability requires explicit human physical/motor/ergonomic evidence.

Trial Set 1 references:
- Trial 001 cannot transition to A-D.
- Tofino (Trial 003) cannot convert energy/control state into action failure without control-input evidence.

## 9. Waiver policy
A human reviewer may waive residual uncertainty only when:
- waiver reason is explicitly recorded;
- supporting evidence is explicitly cited;
- residual uncertainty is explicitly listed;
- no absolute blocker is violated;
- waiver does not enable automatic downstream outputs.

Waiver cannot bypass guardrails for HFACS/Risk/ERC/final conclusion.

## 10. Required output contract for future classification
A future `CLASSIFIED` axis must provide:
- `selectedCode`;
- `codeMeaning`;
- `evidence`;
- `rejectedAlternatives`;
- `resolvedUncertainties`;
- `remainingUncertainties`;
- `humanReviewDecision`;
- `transitionCriteriaSatisfied`;
- `guardrailChecks`.

## 11. Downstream lock
Even after an axis reaches `CLASSIFIED`, the causal core remains locked from:
- HFACS output;
- Risk/ERC output;
- final conclusion output;
- operational recommendations output.

These downstream layers remain blocked until their dedicated phase authorization.

## 12. Decision for current project state
Current state decision:
- Trial Set 1 must not be promoted to final automatic classification;
- all current cases remain under review-first posture;
- next implementation step should add eligibility/readiness checking only, not broad final classification.

## 13. Next steps
Recommended next phase: **A4+R-38 — Classification Eligibility Checker**.

A4+R-38 should:
- implement deterministic `READY_FOR_HUMAN_CLASSIFICATION` eligibility checks;
- keep `CLASSIFIED` emission human-gated;
- keep downstream lock active (HFACS/Risk/ERC/final conclusion/recommendations).
