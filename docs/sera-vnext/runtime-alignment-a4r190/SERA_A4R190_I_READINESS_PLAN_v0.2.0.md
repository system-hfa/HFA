# SERA A4R190-I Readiness Plan v0.2.0

## Objective
Prepare controlled integration of canonical traversal adapter with real author-decision intake packages while preserving candidate-only behavior.

## Entry Criteria
1. A4R190-H exhaustive traversal tests passing.
2. Full `tests/sera-vnext/*.ts` suite passing.
3. Frontend typecheck passing.
4. Protected paths unchanged.

## Planned Scope
1. Integrate traversal-adapter intake handling with realistic multi-axis author decision batches.
2. Increase malformed-intake negative coverage (missing node sequence, duplicate decision IDs, mixed-event packages).
3. Preserve strict candidate-only output locks in all adapter outputs.

## Must-Not
1. No productive pipeline integration.
2. No UI/API integration.
3. No selected/released/final classification emission.
4. No downstream unlock (`HFACS`, `Risk/ERC`, `ARMS/ERC`, `recommendations`, `finalConclusion`).
5. No O-E reactivation.

## Sonnet/Opus Guidance
- Sonnet review recommended before closing A4R190-I.
- Opus needed only if methodology semantics are changed.
