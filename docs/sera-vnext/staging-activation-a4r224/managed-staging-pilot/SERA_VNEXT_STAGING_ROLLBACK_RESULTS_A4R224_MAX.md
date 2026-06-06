# Staging Rollback Results — A4R224-MAX

## Rollback Sequence Validated

| Step | Flags State | HTTP Status | Runtime Status | Result |
|---|---|---|---|---|
| 1 — initial AVAILABLE | readonly=on, pilot=on | 200 | AVAILABLE | PASS |
| 2 — pilot off | readonly=on, pilot=off | 404 | HIDDEN | PASS |
| 3 — all server flags off | readonly=off, pilot=off | 404 | HIDDEN | PASS |
| 4 — readonly off only | readonly=off, pilot=on | 404 | HIDDEN | PASS |
| 5 — restored | readonly=on, pilot=on | 200 | AVAILABLE | PASS |

## Activation/Deactivation Cycles

10 cycles validated: all on=200, all off=404. No residual state between cycles.

## Rollback Properties

| Property | Value |
|---|---|
| Restart required for server handler | NO |
| UI diagnostics flag requires rebuild/restart | YES |
| Database cleanup required | NO |
| Code revert required | NO |
| Baseline altered | NO |
| Fixtures altered | NO |
| Residual data | NONE |
| Public endpoint residual | NONE |
| Rollback reproducible | YES |

## Rollback Instruction (Immediate)

```
SERA_VNEXT_INTERNAL_PILOT_ENABLED=false
SERA_VNEXT_READONLY_ENABLED=false
NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=false
```

No deployment or restart required for server-side flags.  
UI flag (`NEXT_PUBLIC_*`) requires rebuild to take effect.

## Flag Guard Confirmed

UI flag alone does not activate the service. Server-side flags are independent.  
Route returns 404 when server flags are off, regardless of UI flag state.
