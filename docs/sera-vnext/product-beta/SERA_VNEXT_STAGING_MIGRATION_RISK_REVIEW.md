# SERA vNext Product Beta — Staging Migration Risk Review

Migration: `supabase/migrations/20260607135727_sera_vnext_product_beta.sql`

## Scope Review

| Check | Result |
|-------|--------|
| Creates only `sera_vnext_*` objects | PASS |
| No ALTER on existing tables | PASS |
| No DROP statements | PASS |
| No changes to `auth.*` | PASS |
| No changes to `tenants` table | PASS |
| No changes to `users` table | PASS |
| No changes to `storage.*` | PASS |
| No changes to billing schema | PASS |
| No changes to risk layer | PASS |
| No RLS disabled on existing tables | PASS |
| No `anon` grants | PASS |
| All policies use `sera_vnext_beta_can_use()` | PASS (11 references) |
| `sera_vnext_beta_can_use()` checks tenant + role=admin | PASS |
| Constraints block final outputs | PASS |
| `CREATE TABLE IF NOT EXISTS` (idempotent) | PASS |
| `CREATE OR REPLACE FUNCTION` (idempotent) | PASS |
| `CREATE INDEX IF NOT EXISTS` (idempotent) | PASS |
| References `public.tenants(id)` (must exist) | OK — existing table |
| References `public.users(id)` (must exist) | OK — existing table |
| References `public.get_tenant_id()` (must exist) | OK — existing function |
| References `public.set_updated_at()` (must exist) | OK — existing function |

## Risk Level

LOW — purely additive, idempotent, no existing schema modified.

## Conclusion

MIGRATION_SCOPE_OK — safe to push.
