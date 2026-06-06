# SERA vNext Rollback Plan A4R220-MAX

Status: `ROLLBACK_DEFINED`

## Rollback Scope

If A4R220 must be reverted, remove only:

- `frontend/src/lib/sera-vnext-runtime/`
- `tests/sera-vnext/runtime-module-a4r220max-trial-001.ts`
- `docs/sera-vnext/runtime-readiness-a4r220/isolated-runtime-module/`

## Protected Areas

No rollback should touch product SERA runtime, API routes, UI, Supabase migrations, legacy fixtures, baseline reports, or risk-layer files.
