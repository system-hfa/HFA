# SERA vNext Engine Validation Rollback Plan

This phase adds only diagnostic docs and tests. No runtime promotion, persistence, migration, schema, or API behavior is changed.

## Rollback scope

Remove the following if this validation package must be reverted:

- `docs/sera-vnext/engine-validation/`;
- `tests/sera-vnext/engine-validation/`;
- `tests/sera-vnext/engine-regression-validation-trial-001.ts`;
- `tests/sera-vnext/engine-generalization-validation-trial-001.ts`;
- `tests/sera-vnext/engine-determinism-validation-trial-001.ts`;
- `tests/sera-vnext/engine-boundary-validation-trial-001.ts`;
- `tests/sera-vnext/engine-product-alpha-e2e-trial-001.ts`.

## No rollback needed for

- database schema;
- Supabase RLS;
- Product Beta tables;
- Product Beta API routes;
- Product Beta UI;
- legacy SERA engine;
- official fixture or baseline files.

Those areas were not changed.
