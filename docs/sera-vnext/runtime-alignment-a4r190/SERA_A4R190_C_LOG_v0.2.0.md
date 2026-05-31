# SERA A4R190-C Log v0.2.0

## Phase
A4R190-C — Normalize O-E residual semantics to `NON_EXISTENT_IN_SERA_PT_V1`.

## Summary
1. Replaced residual traceability status semantics for O-E from reserved/not-active wording to non-existent-code semantics.
2. Updated runtime blocking checks and messages to align with `NON_EXISTENT_IN_SERA_PT_V1`.
3. Updated negative-control vNext trials that still expected reserved wording.
4. Added dedicated normalization trial:
   - `tests/sera-vnext/oe-nonexistent-normalization-trial-001.ts`.

## Runtime Files Changed
1. `frontend/src/lib/sera-vnext/types.ts`
2. `frontend/src/lib/sera-vnext/code-traceability.ts`
3. `frontend/src/lib/sera-vnext/preconditions.ts`

## Test Files Updated
1. `tests/sera-vnext/code-traceability-trial-001.ts`
2. `tests/sera-vnext/evidence-category-coverage-trial-001.ts`
3. `tests/sera-vnext/adversarial-set-2-contract-trial-001.ts`
4. `tests/sera-vnext/evidence-categories-passive-trial-001.ts`
5. `tests/sera-vnext/preconditions-from-released-codes-trial-001.ts`
6. `tests/sera-vnext/preconditions-traceability-refinement-trial-001.ts`
7. `tests/sera-vnext/oe-nonexistent-normalization-trial-001.ts`

## Methodological Note
`RESERVED_NOT_ACTIVE` is historical/superseded wording for O-E in the A4R190 thread and should not be used as active runtime semantics.

## Out of Scope (Unchanged)
1. Legacy engine (`frontend/src/lib/sera/pipeline.ts`, `frontend/src/lib/sera/all-steps.ts`).
2. Fixtures/baseline/source-corpus/supabase/downstream layers.
3. Traversal by nodeId and escape-point enforcement.
