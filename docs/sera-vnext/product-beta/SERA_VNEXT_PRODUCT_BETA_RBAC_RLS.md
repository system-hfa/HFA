# SERA vNext Product Beta RBAC and RLS

RBAC policy for this phase: restrict beta APIs to enterprise admins through existing `requireAdmin` server-side auth.

Migration RLS adds defense in depth:

- Tenant must match JWT tenant claim.
- Role must be `admin` from `app_metadata` or top-level JWT claim.
- `anon` receives no grants.
- Authenticated grants are scoped by RLS.
- Soft-deleted analyses are hidden by default select policy.

Static RLS validation passed. Real RLS execution is limited unless Supabase local/staging is available.
