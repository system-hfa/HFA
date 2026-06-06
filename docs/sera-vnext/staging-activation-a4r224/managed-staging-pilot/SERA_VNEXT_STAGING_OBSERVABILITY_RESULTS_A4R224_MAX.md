# Staging Observability Results — A4R224-MAX

## Events Validated

| Event | Captured | Scenario |
|---|---|---|
| `sera_vnext_runtime_status_requested` | YES | authorized admin request |
| `sera_vnext_runtime_status_available` | YES | 200 response path |
| `sera_vnext_runtime_status_disabled` | YES | flags off path |
| `sera_vnext_runtime_status_denied` | YES | 401/403 path |
| `sera_vnext_runtime_status_failed` | YES | error path (fail-closed) |

## Event Fields Confirmed

| Field | Included | Sanitized |
|---|---|---|
| requestId | YES | YES (generated UUID) |
| durationMs | YES | N/A |
| status | YES (string) | N/A |
| tenantId | YES (when available) | Passed from ApiUserContext — not raw JWT |
| userRole | YES (when available) | Role string only |
| baselineId | YES (on AVAILABLE) | Non-sensitive |
| namespace | YES (on AVAILABLE) | Non-sensitive |
| fixtureCount | YES (on AVAILABLE) | Non-sensitive |
| expectedOutputCount | YES (on AVAILABLE) | Non-sensitive |
| errorCode | YES (on ERROR) | Safe code only |

## Forbidden Fields in Events (All Absent)

| Field | Absent |
|---|---|
| Bearer token | YES |
| Cookies | YES |
| Service-role key | YES |
| Stack trace | YES |
| Fixture content / P/O/A | YES |
| selectedCode | YES |
| Personal data | YES |

## Logging Backend

`console.info("[sera-vnext-runtime]", event)` — server-side console logging.  
In production: logs will appear in Vercel/provider log stream.  
Real structured logging pipeline not configured at this phase — limitation recorded.

## Duration Measurements

- Sequential 50 calls: avg 0.29 ms, p95 0.51 ms, max 3.78 ms
- Concurrent 100 calls: avg 5.27 ms, p95 5.41 ms
- Unauthorized 25 calls: avg 0.04 ms
- No timeouts, no anomalous latency spikes
