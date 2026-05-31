# SERA A4R190-H Readiness Plan v0.2.0

## Objective
Prepare the next controlled step after A4R190-G, preserving passive deterministic behavior and strict methodological boundaries.

## Entry Criteria
1. A4R190-G tests all passing (including new typing and leaf-coverage trials).
2. `cd frontend && npx tsc --noEmit` passing.
3. Protected paths unchanged.
4. Candidate-only contract preserved.

## Recommended Next Scope
1. Expand deterministic traversal coverage to remaining canonical leaves not yet exercised in integration-style scenarios.
2. Add additional adversarial checks for malformed node-decision batches without unlocking productive behavior.
3. Keep release and semantic gates constrained to causal-core-only package.

## Must-Not
1. No productive pipeline integration.
2. No selected/released/final emission in traversal artifacts.
3. No O-E reactivation.
4. No downstream unlock (HFACS, Risk/ERC, ARMS/ERC, recommendations, final conclusion).

## Sonnet/Opus Guidance
- Sonnet review is recommended before A4R190-H implementation confirmation.
- Opus review is optional unless methodology semantics are changed.
