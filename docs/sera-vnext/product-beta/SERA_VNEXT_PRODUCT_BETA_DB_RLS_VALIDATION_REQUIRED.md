# SERA vNext Product Beta — DB and RLS Validation Required

## Current Status

`SERA_VNEXT_PRODUCT_BETA_READY_WITH_LIMITATIONS`

## What is complete

- Motor v0.1 validated: 39/39 PASS
- Migration SQL written: `supabase/migrations/20260607135727_sera_vnext_product_beta.sql`
- Tables defined: `sera_vnext_analyses`, `sera_vnext_analysis_revisions`, `sera_vnext_analysis_reviews`, `sera_vnext_analysis_events`
- RLS policies defined and statically validated: `RLS_OK_STATIC_LIMITED`
- APIs implemented: POST/GET analyses, reanalyze, reviews, archive, restore, export
- UI implemented: list, create, detail, review pages
- Human review workflow: complete
- Audit trail: complete
- Export (non-final): complete
- Feature flags in place: all off by default
- Rollback plan: documented
- Build/typecheck/lint: passing
- Static and structural trials: passing

## What is NOT yet executed

- `MIGRATION_LOCAL_NOT_APPLIED_LOCAL_DB_UNAVAILABLE`
- Supabase local was unreachable at `127.0.0.1:54322` during initial product beta phase
- RLS has not been tested against a real PostgreSQL instance with real JWT claims
- APIs have not been exercised against a real database
- UI has not been exercised against a real database

## Blocker

```
BLOCKER_TO_INTERNAL_PILOT = REAL_MIGRATION_AND_RLS_NOT_EXECUTED
```

## Gates required before declaring INTERNAL_READY

1. Supabase local (`supabase start`) or authorized staging available
2. `supabase db reset` or equivalent applies migration successfully
3. Tables verified in `information_schema.tables`
4. RLS enabled verified in `pg_class`
5. Tenant isolation tested with real JWT claims
6. Append-only constraints verified against real DB
7. API smoke tests against real database pass
8. UI smoke tests against real database pass
9. Engine 39-case validation unchanged

## Upgrade path

Once all gates pass, update:
- `SERA_VNEXT_PRODUCT_BETA_FINAL_DECISION.md`: change to `SERA_VNEXT_PRODUCT_BETA_INTERNAL_READY`
- `SERA_VNEXT_PRODUCT_BETA_RBAC_RLS.md`: change to `RLS_REAL_OK`
- `SERA_VNEXT_PRODUCT_BETA_RUNBOOK.md`: check off all gates
- `SERA_VNEXT_PRODUCT_BETA_PILOT_RESULTS.md`: record real pilot results

## What this does NOT affect

- Methodology: frozen, not reopened
- Engine v0.1: frozen, not modified
- Canonical tree: frozen, not modified
- Baselines/fixtures: frozen, not modified
- Product Alpha: not reopened
- Engine contracts: not reopened
