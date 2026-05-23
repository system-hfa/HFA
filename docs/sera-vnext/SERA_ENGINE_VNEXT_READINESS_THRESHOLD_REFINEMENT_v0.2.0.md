# SERA Engine vNext Readiness Threshold Refinement v0.2.0
Status: DRAFT_FOR_REVIEW
Phase: A4+R-40 — Readiness Threshold Refinement

## Purpose
Refine deterministic readiness thresholds so P/O/A axes can transition from `NOT_ELIGIBLE` to `ELIGIBLE_FOR_HUMAN_REVIEW` when minimum evidence exists and remaining uncertainty is residual/waivable, without enabling final classification.

## Problem Observed in A4+R-39
The previous calibration correctly reduced improper `BLOCKED_BY_GUARDRAIL`, but produced a near-universal `NOT_ELIGIBLE` posture across Trial Set 1. This phase prevents `NOT_ELIGIBLE` from becoming a blanket block.

## Universal Thresholds
An axis may be `ELIGIBLE_FOR_HUMAN_REVIEW` when:
- statement exists;
- evidence is non-empty;
- review trace exists with `reviewReasonCode`;
- transition criteria exist;
- semantic guardrails are present;
- required human decision is explicit;
- absolute blockers are empty;
- no downstream/final-output prohibition is violated.

Residual uncertainty may remain if it is explicitly waivable.  
`CLASSIFIED` remains prohibited in this phase.

## Axis-Specific Thresholds
### Perception
- Eligible with cue availability plus minimum cue-context/uptake support.
- Exact recognition timing can remain residual/waivable.
- Not eligible if only weather/warning degradation appears without any cue-specific support.

### Objective
- Eligible with observable objective context (e.g., continuation context) and explicit decision context.
- Explicit intent/rule-awareness can remain residual for human review, as long as no violation classification is attempted.
- Not eligible when objective evidence is empty or trace/statement is missing.

### Action
- Eligible with observable action/non-action evidence and minimal sequence context.
- Exact control-input detail may remain residual/waivable.
- Not eligible when action evidence is empty.
- Absolute guardrail remains for A-D style inability without physical/motor/ergonomic evidence and for aircraft-state-to-action-failure collapse.

## Essential vs Residual Criteria
Readiness now distinguishes:
- essential unmet criteria: block readiness (`NOT_ELIGIBLE`);
- residual uncertainty / waivable criteria: allow readiness (`ELIGIBLE_FOR_HUMAN_REVIEW`) with waiver governance fields.

## Trial 001 Result
- Perception: `READY_FOR_HUMAN_CLASSIFICATION` / `ELIGIBLE_FOR_HUMAN_REVIEW`.
- Objective: `READY_FOR_HUMAN_CLASSIFICATION` / `ELIGIBLE_FOR_HUMAN_REVIEW`.
- Action: `READY_FOR_HUMAN_CLASSIFICATION` / `ELIGIBLE_FOR_HUMAN_REVIEW` with waiver required for residual uncertainty.
- No final classification emitted.

## Trial Set 1 Result
- Eligible axes emerged without forcing all axes eligible.
- Trial 004 remains conservative (`NOT_ELIGIBLE` across axes) due to stronger essential evidence gaps.
- Other trials remain mixed, with readiness only where minimum evidence thresholds are met.

## Eligible Axes and Why
- Eligible axes have:
  - non-empty statements and evidence;
  - complete review trace;
  - no absolute blockers;
  - only residual waivable uncertainty.

## Not Eligible Axes and Why
- Not eligible axes still show:
  - missing essential evidence or essential trace criteria;
  - unresolved non-waivable readiness gaps;
  - no absolute methodological violation necessarily required.

## Safety and Scope Confirmations
- no `CLASSIFIED` output;
- no final conclusion generation;
- no HFACS output;
- no Risk/ERC output;
- no legacy engine import;
- no UI integration;
- no DB writes;
- `humanReview.required` remains true;
- causal assurance remains non-passed (`PARTIAL_READINESS_REFINED_NOT_CLASSIFIED`).

## Decision
Readiness thresholds are refined and no longer universally blocking via `NOT_ELIGIBLE`. Final classification remains intentionally blocked.

## Next Steps
Proceed to the next phase focused on controlled readiness validation under human-review governance, still without automatic `CLASSIFIED` emission.
