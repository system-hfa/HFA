# SERA vNext — Audit Durability Contract (NF-05)

## Problem
`writeAuditLog` was best-effort for all events. Critical SERA domain events could fail silently, leaving no observable evidence of the failure.

## Solution
Classified audit events into two tiers:

### CRITICAL_AUDIT
Failure is thrown (not silent). Caller must handle.
- `canonical_engine.used` — which engine route was used
- `analysis_completed` — analysis finished successfully
- `analysis_partial` — analysis completed with gaps
- `analysis_failed` — analysis errored
- `event_created` — new event submitted
- `risk_profile.generated` — risk profile computed

### OPERATIONAL_TELEMETRY
Best-effort. Failure is logged but never propagated.
- All other event types

### Implementation
- `writeAuditLog()` — throws for critical events, silent-catch for telemetry
- `writeCriticalAuditLog()` — always throws on failure (for explicit critical-only writes)
- `CRITICAL_AUDIT_EVENTS` — readonly set of critical event types
- `isCriticalAuditEvent()` — classification function

### Rule
No critical audit event depends on silent best-effort. If the system-of-record write fails, the error is observable.
