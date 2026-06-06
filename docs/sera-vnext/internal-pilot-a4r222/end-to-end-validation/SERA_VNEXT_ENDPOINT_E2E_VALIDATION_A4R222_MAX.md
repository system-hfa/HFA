# Endpoint E2E Validation A4R222-MAX

Endpoint:
- `/api/admin/sera-vnext/status`

Validated behavior:
- Flags off: 404.
- Read-only on, pilot off: 404.
- Flags on, no auth: 401.
- Flags on, invalid token: 401 through auth mock.
- Flags on, non-admin/non-enterprise: 403 through auth mock.
- Flags on, authorized admin: 200 with sanitized summary.
- Baseline inconsistency: 503 with safe error code/message.
- Unexpected error: 500 with sanitized message.
- No stack trace in response.
- No selected/released/final fields in response.

Validation sources:
- `tests/sera-vnext/auth-feature-flags-a4r222max-trial-001.ts`
- `tmp/a4r222max-validation/local-smoke.log`
