# SERA vNext Product Beta — Staging DB Validation Environment

## Environment Record

| Field | Value |
|-------|-------|
| Date | 2026-06-07 |
| Commit | 6393798f605abe49a966ca67c5d118a37ee29045 |
| Project ref | czwlmds...gjqo (sanitized) |
| Region | West US (North California) |
| Environment type | Single project — owner authorized migration as additive-only |
| Public users | Active project, migration is purely additive (new tables only) |
| Real sensitive data | Existing tables untouched; new `sera_vnext_*` tables receive only synthetic pilot data |
| Migration | `supabase/migrations/20260607135727_sera_vnext_product_beta.sql` |
| Migration type | ADDITIVE ONLY — no existing tables modified, no drops |
| Rollback | Drop `sera_vnext_*` tables and functions if needed |

## Authorization

Owner explicitly authorized migration application on 2026-06-07.
Migration scope confirmed: creates only `sera_vnext_*` objects.

## What is NOT recorded here

- Database password
- Service role key
- JWT tokens
- Full connection string
- Any credentials or secrets

## Migration scope confirmation

Objects created (all new, no existing table touched):
- `public.sera_vnext_beta_jwt_tenant_id()` — function
- `public.sera_vnext_beta_jwt_role()` — function
- `public.sera_vnext_beta_can_use()` — function
- `public.prevent_sera_vnext_append_only_update()` — trigger function
- `public.prevent_sera_vnext_append_only_delete()` — trigger function
- `public.sera_vnext_analyses` — table
- `public.sera_vnext_analysis_revisions` — table
- `public.sera_vnext_analysis_reviews` — table
- `public.sera_vnext_analysis_events` — table
- Indexes on all four tables
- RLS enabled on all four tables
- Policies scoped to `authenticated` role with tenant+admin check
- No grants to `anon`
- Triggers for `updated_at` and append-only enforcement

Objects NOT touched:
- `tenants`, `users`, `auth.*`, `storage.*`
- Any existing SERA tables
- Billing, risk layer, legacy analysis schema
