# SERA A4R190-K Readiness Plan v0.2.0

## Objective
Prepare next K-phase work after K0 hardening, preserving candidate-only constraints.

## Entry Criteria
1. Unknown decision fallback fix validated (`UNKNOWN_AUTHOR_DECISION_VALUE:*`).
2. Full `tests/sera-vnext/*.ts` passing.
3. `cd frontend && npx tsc --noEmit` passing.
4. Protected areas unchanged.

## Planned K Scope
1. Extend intake diagnostics consistency across mixed-event/mixed-axis packages.
2. Harden audit trace fields for blocked/pending outcomes.
3. Keep strict candidate-only locks and non-integration posture.

## Must-Not
1. No productive legacy pipeline integration.
2. No UI/API coupling.
3. No selected/released/final classification output.
4. No downstream unlock (`HFACS`, `Risk/ERC`, `ARMS/ERC`, `recommendations`, `finalConclusion`).

## Review Recommendation
- Sonnet review is recommended before broader K-phase integration.
- Opus only if Sonnet finds semantic/methodological disagreement.
