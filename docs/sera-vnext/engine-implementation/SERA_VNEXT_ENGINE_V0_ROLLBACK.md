# SERA vNext Engine V0 Rollback

Rollback target:

- Return Product Alpha to the previous candidate-only non-final runtime path.
- Remove or disable `runSeraVNextEngineV0` integration from `frontend/src/lib/sera-vnext-runtime/candidate-only/candidate-service.ts`.

Rollback files:

- `frontend/src/lib/sera-vnext/ENGINE_VERSION.ts`
- `frontend/src/lib/sera-vnext/engine-contract.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/`
- `frontend/src/lib/sera-vnext/engine-v0/`
- `frontend/src/lib/sera-vnext-runtime/candidate-only/candidate-service.ts`
- `frontend/src/lib/sera-vnext-runtime/candidate-only/types.ts`
- `frontend/src/lib/sera-vnext-runtime/candidate-only/sanitize-output.ts`
- `frontend/src/lib/sera-vnext-runtime/candidate-only/validate-input.ts`
- `frontend/src/app/api/admin/sera-vnext/candidate/route.ts`
- `frontend/src/app/(dashboard)/admin/sera-vnext/candidate/page.tsx`
- `tests/sera-vnext/engine-validation-v0/`
- `tests/sera-vnext/engine-v0-*.ts`

Rollback validation:

- `npm --prefix frontend exec -- tsc --noEmit`
- `npm --prefix frontend run build`
- `npm --prefix frontend run lint`
- `npx tsx tests/sera-vnext/product-alpha-candidate-only-trial-001.ts`
- relevant engine validation trials after revert

Product Beta rollback:

- No Product Beta artifacts were created, so no migration or persistence rollback is required.
