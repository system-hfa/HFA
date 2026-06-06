# Internal Endpoint Contract A4R221-MAX

Endpoint:
- `GET /api/admin/sera-vnext/status`

Implementation:
- `frontend/src/app/api/admin/sera-vnext/status/route.ts`

Security:
- Uses the existing admin guard `requireAdmin(req)`.
- Requires enterprise tenant plan and admin role through the existing repository pattern.
- When `SERA_VNEXT_READONLY_ENABLED` is unset or false, returns 404 before auth details are exposed.
- Uses `Cache-Control: no-store` and `dynamic = 'force-dynamic'`.

Payload:
- Returns only sanitized status, counts, locks, and warnings.
- Does not return full fixture content, event narratives, personal data, selected code, released code, final conclusion, classified output, or ready status.

Limitations:
- Full authorized endpoint smoke requires a valid local Supabase admin session and enterprise admin account.
