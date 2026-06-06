# Smoke Results A4R221-MAX

Smoke command:
- `tmp/a4r221max-validation/local-smoke.sh`

Smoke scope:
- `next start` structural smoke after successful build.
- Executive report page smoke.
- Endpoint flag-off smoke.
- Endpoint flag-on unauthenticated smoke.

Results:
- `/reports/executive`: HTTP 200.
- `/api/admin/sera-vnext/status` with `SERA_VNEXT_READONLY_ENABLED` unset: HTTP 404 and body `{"detail":"Not found"}`.
- `/api/admin/sera-vnext/status` with `SERA_VNEXT_READONLY_ENABLED=true` and no Bearer token: HTTP 401 and body `{"detail":"Não autorizado"}`.
- Structural smoke status: `A4R221_LOCAL_SMOKE_PASS_STRUCTURAL_AUTH_LIMITED`.

Limitations:
- Authorized admin endpoint smoke was not executed because it requires a configured local Supabase session and enterprise admin account.
- Diagnostics page with `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=true` was not browser-smoked after a flag-on rebuild; route/page behavior is covered structurally by tests and by the build route enumeration.
- No database writes were performed.
