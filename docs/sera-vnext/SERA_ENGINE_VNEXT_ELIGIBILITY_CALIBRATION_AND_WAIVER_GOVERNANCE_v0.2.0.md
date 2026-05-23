# SERA Engine vNext Eligibility Calibration and Waiver Governance v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-39 — Eligibility Calibration and Waiver Governance  
Scope: recalibration of eligibility semantics and deterministic waiver governance without final classification emission

## 1. Purpose
Calibrate the eligibility layer so that:
- `BLOCKED_BY_GUARDRAIL` represents only absolute methodological violations.
- `NOT_ELIGIBLE` represents insufficient evidence/criteria without prohibited classification attempts.
- `ELIGIBLE_FOR_HUMAN_REVIEW` represents readiness for human-only classification decision.

No `CLASSIFIED` output is emitted in this phase.

## 2. Problem observed in A4+R-38
A4+R-38 produced overuse of `BLOCKED_BY_GUARDRAIL` for scenarios that were mostly ordinary evidence insufficiency.
This mixed methodological hard-blocking with normal unresolved readiness gaps.

## 3. Calibrated eligibility semantics
### BLOCKED_BY_GUARDRAIL
Now used only when absolute guardrail violations are detected, such as:
- perception-failure claim inferred solely from weather/warning context;
- objective violation claim without intent/rule-awareness evidence;
- A-D/inability claim without physical/motor/ergonomic evidence;
- aircraft-state/unsafe-condition collapse into action-failure claim;
- downstream HFACS/Risk/ERC request;
- final conclusion request;
- automatic final classification request.

### NOT_ELIGIBLE
Now used for ordinary unresolved readiness gaps, including:
- missing/insufficient evidence;
- missing recognition timeline;
- missing actor-action precision;
- missing sequence/timing;
- unresolved but waivable criteria.

### ELIGIBLE_FOR_HUMAN_REVIEW
Reserved for axes that satisfy eligibility gates without absolute blockers, while still requiring human review and keeping automatic final classification disabled.

## 4. Absolute blockers vs unmet criteria
Eligibility payload now explicitly separates:
- `absoluteBlockers`: only hard methodological violations.
- `unmetCriteria`: non-absolute unresolved criteria.
- `whyBlocked` / `whyNotEligible`: deterministic explanation strings.

## 5. Waiver governance rules
Modeled deterministically in payload:
- `waiverAllowed`: false when absolute blockers exist.
- `waiverRequired`: true only for unresolved, waivable, non-absolute criteria.
- `waiverProhibitedReason`: populated when absolute blockers exist.

Policy modeled (no UI/DB implementation yet): waiver never overrides absolute blockers and never unlocks downstream layers.

## 6. Trial 001 result
- Dry-run PASS.
- No `CLASSIFIED` axis.
- Axes remain conservative under unresolved/readiness controls.
- `humanReview.required` remains true.
- Causal assurance stays non-pass and non-final.

## 7. Trial Set 1 result
- Dry-run PASS.
- No `CLASSIFIED` axis in any trial.
- Trial 004 calibrated posture: all three axes are `NOT_ELIGIBLE` (ordinary evidence insufficiency), with zero absolute blockers.
- Trial set now distinguishes ordinary non-eligibility from absolute guardrail blocking.

## 8. Before/after calibration summary
Before (A4+R-38):
- Multiple axes labeled `BLOCKED_BY_GUARDRAIL` in ordinary insufficiency scenarios.

After (A4+R-39):
- Trial Set 1 axes moved to `NOT_ELIGIBLE` when no absolute prohibited attempt is present.
- `BLOCKED_BY_GUARDRAIL` reserved for explicit methodological violations.

## 9. Scope confirmations
- no `CLASSIFIED` emission;
- no final conclusion;
- no HFACS output;
- no Risk/ERC output;
- no legacy import;
- no UI integration;
- no DB/Supabase write;
- human review remains required;
- causal assurance remains not passed.

## 10. Decision
Eligibility semantics and waiver governance are calibrated.
Final classification remains blocked and human-gated.

## 11. Next steps
Proceed to next phase only to refine readiness thresholds and optional waiver decision schema details, while keeping:
- no auto-`CLASSIFIED` emission;
- no downstream unlock.
