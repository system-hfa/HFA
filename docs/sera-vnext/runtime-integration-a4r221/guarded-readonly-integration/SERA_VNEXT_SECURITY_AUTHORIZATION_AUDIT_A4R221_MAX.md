# Security and Authorization Audit A4R221-MAX

Patterns located:
- Admin API routes use `requireAdmin(req)` from `frontend/src/lib/server/admin-auth.ts`.
- `requireAdmin(req)` calls `requireBearerUser(req)` and verifies enterprise tenant plan plus admin role.
- Admin pages live under `frontend/src/app/(dashboard)/admin/` and reuse `admin/layout.tsx`.
- Client admin pages obtain Supabase session and pass `Authorization: Bearer <token>`.

A4R221 implementation:
- Endpoint uses the existing `requireAdmin(req)` guard.
- Diagnostic page uses the existing admin shell and Bearer call pattern.
- Feature-off endpoint returns 404 before authorization details are exposed.
- Endpoint returns no content payload beyond sanitized status metadata.

Residual limitation:
- Authorized endpoint smoke depends on local Supabase configuration and a valid enterprise admin account.
