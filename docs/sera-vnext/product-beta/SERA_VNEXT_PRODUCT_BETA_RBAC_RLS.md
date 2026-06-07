# SERA vNext Product Beta RBAC and RLS

RBAC policy for this phase: restrict beta APIs to enterprise admins through existing `requireAdmin` server-side auth.

Migration RLS adds defense in depth:

- Tenant must match JWT tenant claim.
- Role must be `admin` from `app_metadata` or top-level JWT claim.
- `anon` receives no grants.
- Authenticated grants are scoped by RLS.
- Soft-deleted analyses are hidden by default select policy.

Static RLS validation: PASSED
Real RLS execution: PASSED — validated 2026-06-07 against real Supabase database

Status: `RLS_REAL_OK`

Validated:
- anon SELECT blocked on all 4 sera_vnext_* tables (rows=0, RLS enforced)
- anon INSERT blocked on sera_vnext_analyses (row-level security policy violation)
- service role can INSERT with valid tenant/admin context
- classifiedOutput=true blocked by CHECK constraint
- FINAL_CLASSIFICATION status blocked by CHECK constraint
- wrong engine_version blocked by CHECK constraint
- append-only triggers block UPDATE and DELETE on events and revisions
- idempotency: duplicate client_request_id blocked by unique index

Migration applied: `20260607135727_sera_vnext_product_beta.sql`
Trial: product-beta-rls-real-trial-001 — PASS 5/5
Trial: product-beta-db-real-trial-001 — PASS 16/16
