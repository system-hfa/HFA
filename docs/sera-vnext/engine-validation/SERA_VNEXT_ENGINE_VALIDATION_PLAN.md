# SERA vNext Engine Validation Plan

Purpose: validate the mandatory executable engine gate before Product Beta foundation work.

## Scope

In scope:

- identify real executable entrypoints;
- execute current base vNext dry-run engine;
- execute current Product Alpha candidate-only route;
- verify determinism, boundary locks, and non-final output locks;
- decide whether Product Beta persistence/review/UI work is authorized.

Out of scope:

- migrations;
- Supabase schema or RLS;
- Product Beta persistence;
- Beta review UI/API;
- baseline fixture promotion;
- SERA engine correction or methodology redesign.

## Trial files

| Trial | Purpose |
| --- | --- |
| `tests/sera-vnext/engine-regression-validation-trial-001.ts` | Execute existing vNext dry-run path on regression narrative and confirm non-final blocking state. |
| `tests/sera-vnext/engine-generalization-validation-trial-001.ts` | Execute a second narrative and confirm the same non-final blocking state. |
| `tests/sera-vnext/engine-determinism-validation-trial-001.ts` | Confirm deterministic output for identical input in base dry-run and candidate-only runtime. |
| `tests/sera-vnext/engine-boundary-validation-trial-001.ts` | Confirm downstream/final-output requests remain blocked. |
| `tests/sera-vnext/engine-product-alpha-e2e-trial-001.ts` | Execute Product Alpha endpoint handler and confirm candidate-only/read-only state. |

## Decision criteria

`SERA_VNEXT_ENGINE_VALIDATED_FOR_PRODUCT_BETA` requires a complete executable causal chain including preconditions and an authorized Product Beta runtime contract.

The current criteria are not met. Validation therefore records `SERA_VNEXT_ENGINE_NOT_IMPLEMENTED` and blocks Product Beta foundation work.
