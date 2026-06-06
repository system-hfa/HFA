# Observability Validation A4R222-MAX

Added helper:
- `frontend/src/lib/sera-vnext-runtime/runtime-observability.ts`

Events:
- `sera_vnext_runtime_status_requested`
- `sera_vnext_runtime_status_available`
- `sera_vnext_runtime_status_disabled`
- `sera_vnext_runtime_status_denied`
- `sera_vnext_runtime_status_failed`

Allowed fields:
- request ID.
- tenant ID from existing auth context.
- user role.
- baseline ID.
- namespace.
- fixture and expected output counts.
- status.
- sanitized error code.
- duration.

Prohibited fields verified absent from tests/log payloads:
- access token.
- stack trace in response.
- accident/event content.
- P/O/A output.
- selected/released/final outputs.

Validated by:
- `tests/sera-vnext/auth-feature-flags-a4r222max-trial-001.ts`
