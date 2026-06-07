# SERA vNext Controlled Admin Pilot — Runbook

## Preconditions

- Remote controlled environment linked to Supabase project
- Product Beta migrations applied
- Internal feature flags enabled only for the pilot process
- One named enterprise admin account available
- One blocked-access negative-control account available

## Core Validation Commands

```bash
npm --prefix frontend exec -- tsc --noEmit
npm --prefix frontend run build
npm --prefix frontend run lint
npx tsx tests/sera-vnext/engine-validation-v01/run-all.ts
npx tsx tests/sera-vnext/product-beta-db-real-trial-001.ts
npx tsx tests/sera-vnext/product-beta-rls-real-trial-001.ts
SERA_VNEXT_TEST_FLAG_OFF_BASE_URL=http://127.0.0.1:3102 npx tsx tests/sera-vnext/product-beta-api-real-trial-001.ts
npx tsx tests/sera-vnext/product-beta-ui-real-trial-001.ts
npx tsx tests/sera-vnext/controlled-pilot-api-real-trial-001.ts
npx tsx tests/sera-vnext/controlled-pilot-ui-real-trial-001.ts
for f in tests/sera-vnext/*.ts; do echo "RUN $f"; SERA_VNEXT_TEST_FLAG_OFF_BASE_URL=http://127.0.0.1:3102 npx tsx "$f"; done | tee tmp/sera-vnext-controlled-admin-pilot/full-sweep.log
```

## Rollback Procedure

1. Disable UI flag and confirm unavailable message on the admin pages.
2. Disable API flag and confirm HTTP 404 on Product Beta routes.
3. Restore flags and confirm the internal admin workflow becomes available again.
4. Do not revert code as part of rollback validation.

## Artifact Set

- `tmp/sera-vnext-controlled-admin-pilot/product-beta-api-real-trial-001.json`
- `tmp/sera-vnext-controlled-admin-pilot/product-beta-ui-real-trial-001.json`
- `tmp/sera-vnext-controlled-admin-pilot/controlled-pilot-api-real-trial-001.json`
- `tmp/sera-vnext-controlled-admin-pilot/controlled-pilot-ui-real-trial-001.json`
- `tmp/sera-vnext-controlled-admin-pilot/controlled-pilot-rollback-real.json`
- `tmp/sera-vnext-controlled-admin-pilot/full-sweep.log`

## Sanitization Rules

- Do not store service-role secrets, raw JWTs, cookies, or full DB URLs.
- Use sanitized participant and tenant identifiers in exported documentation.
- Keep Product Beta exports marked INTERNAL, NON_FINAL, and NOT_OPERATIONAL.
