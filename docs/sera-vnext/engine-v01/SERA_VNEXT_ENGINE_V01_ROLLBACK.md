# SERA vNext Engine v0.1 Rollback

Date: 2026-06-07

## Rollback Scope

Rollback should remove only the v0.1 correction artifacts and restore the previous engine-v0 traversal behavior if required.

## Files To Revert

- `frontend/src/lib/sera-vnext/evidence/*`
- `frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/run-evidence-traversal.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/index.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/sera-pt-v1.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/traverse-tree.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/types.ts`
- `frontend/src/lib/sera-vnext/engine-contract.ts`
- `frontend/src/lib/sera-vnext/engine-v0/*` files changed by this phase
- `tests/sera-vnext/engine-validation-v01/*`
- `docs/sera-vnext/engine-v01/*`
- `tests/sera-vnext/engine-v0-preconditions-trial-001.ts`

## Validation After Rollback

Run narrow validation relevant to the rollback target. Do not run global smoke unless explicitly requested.

## Protected Areas

Rollback must not alter:

- legacy SERA engine files outside `sera-vnext`;
- official fixtures;
- baseline reports;
- database migrations;
- billing/Stripe code;
- risk-layer code;
- local untracked artifacts outside this phase.
