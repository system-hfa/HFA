# SERA vNext Product Beta RBAC and RLS

RBAC policy for this phase: restrict beta APIs to enterprise admins through existing `requireAdmin` server-side auth.

Migration RLS adds defense in depth:

- Tenant must match JWT tenant claim.
- Role must be `admin` from `app_metadata` or top-level JWT claim.
- `anon` receives no grants.
- Authenticated grants are scoped by RLS.
- Soft-deleted analyses are hidden by default select policy.

Static RLS validation: PASSED
Real RLS execution: NOT YET EXECUTED — blocked by `SUPABASE_LOCAL_UNAVAILABLE`

Status: `RLS_OK_STATIC_LIMITED`

Blocker: `REAL_MIGRATION_AND_RLS_NOT_EXECUTED`
Required: Supabase local or authorized staging with migration applied before declaring internal pilot ready.
