# Observability Runtime Results A4R223-MAX

Captured and validated event names:
- `sera_vnext_runtime_status_requested`
- `sera_vnext_runtime_status_available`
- `sera_vnext_runtime_status_disabled`
- `sera_vnext_runtime_status_denied`
- `sera_vnext_runtime_status_failed` through A4R222 regression coverage

Allowed metadata includes request ID, sanitized tenant identifier, role, baseline ID for available responses, namespace, counts, status, duration, and sanitized error code.

No token, cookie, authorization header, stack trace, event narrative, P/O/A, selected/released/final output, or personal email was captured. Logs were locally captured and were not persisted to an external observability system.

Denied events do not include role or tenant because authentication did not establish a trusted context. This is intentional fail-closed behavior.
