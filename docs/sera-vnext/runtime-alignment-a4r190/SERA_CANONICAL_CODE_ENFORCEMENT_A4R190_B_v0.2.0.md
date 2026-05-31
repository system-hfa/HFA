# SERA Canonical Code Enforcement — A4R190-B v0.2.0

## Objective
Apply minimum active enforcement of canonical SERA code allowlist in vNext human decision and causal assurance runtime paths.

## Active Enforcement Applied
1. `frontend/src/lib/sera-vnext/human-decision.ts`
- `validateHumanAxisDecision` now validates `proposedCode` through canonical allowlist helper `assertCanonicalSeraLeafCode`.
- `O-E` is rejected explicitly as `NON_EXISTENT_IN_SERA_PT_V1`.
- Unknown/out-of-axis codes are rejected as allowlist violations.
- Active objective intent set excludes `O-E` and remains limited to `O-C` and `O-D`.

2. `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- Removed local hardcoded active code token list.
- Statement code-token detection now derives from canonical active allowlist exports:
  - `SERA_CANONICAL_PERCEPTION_LEAF_CODES`
  - `SERA_CANONICAL_OBJECTIVE_LEAF_CODES`
  - `SERA_CANONICAL_ACTION_LEAF_CODES`
- `O-E` is not part of active objective list in this path.

## Runtime Wording Alignment
1. `frontend/src/lib/sera-vnext/code-traceability.ts`
- Runtime warning/derivation wording updated to `NON_EXISTENT_IN_SERA_PT_V1` for `O-E`.

2. `frontend/src/lib/sera-vnext/preconditions.ts`
- Blocking wording for `O-E` updated to `NON_EXISTENT_IN_SERA_PT_V1`.
- Compatibility note kept when traceability status token remains `RESERVED_NOT_ACTIVE`.

## Scope Protection
- Legacy runtime not changed:
  - `frontend/src/lib/sera/pipeline.ts`
  - `frontend/src/lib/sera/all-steps.ts`
- No fixture/baseline/source-corpus/supabase schema changes in this phase scope.
- No UI/API/Stripe/Risk/ERC changes.

## Remaining Limitations (Out of A4R190-B Scope)
1. Canonical traversal engine by `nodeId` is not yet implemented.
2. Escape-point gate remains passive/not enforced.
3. Runtime bilingual PT/EN canonical question delivery is not yet implemented.
