# HFA Staging Validation Results

## Environment

- Date: June 9, 2026
- Project ref: `czwlmdsi...gjqo` (sanitized)
- Local application: `http://127.0.0.1:3100`
- Fixture prefix: `[EVENT_DELETE_TEST]`
- Real-data purge: not authorized and not executed

## Migration And Schema

`supabase migration list` confirmed the six deletion-phase migrations are present locally and remotely. Real staging checks exercised the lifecycle columns, append-only lifecycle/tombstone triggers, RLS/grants, indexes, actor FKs, audit table, and the five final RPCs:

```text
request_event_soft_delete
restore_soft_deleted_event
schedule_event_purge
mark_event_purge_failed
complete_event_purge
```

Staging exposed three real schema/runtime gaps, corrected additively: missing `public.audit_log` despite historical migration metadata, the `digest(varchar, text)` overload needed by synthetic purge, and a tombstone read policy that incorrectly assumed the auth UUID equals the public-user UUID. No applied migration was rewritten.

## Real Deletion Gates

| Gate | Result |
|---|---|
| Complete impact with real counts and structured storage | PASS |
| Unknown dependencies block purge | PASS |
| Auth UUID to public-user UUID mapping and actor FK | PASS |
| Cross-tenant, anonymous, non-admin, and inactive/missing actor rejection | PASS |
| Atomic soft delete, lifecycle, and critical audit | PASS |
| Same-key idempotency and 10 concurrent requests | PASS |
| Open corrective action block and closed action preservation | PASS |
| Append-only lifecycle UPDATE/DELETE rejection | PASS |
| Stable error envelope without raw database terms | PASS |
| Storage inventory and missing-object blocker | PASS |
| Complete restore, concurrent restore, expiry, and delete/restore race | PASS |
| Dashboard, Events, Risk Profile, and report active-source filtering | PASS |
| Final selected/released/conclusion outputs remain blocked | PASS |

The consolidated real trial reports 22 PASS and delegates only gates 19-21 to the dedicated synthetic purge trial. The dedicated trial reports PASS for all three delegated gates.

## Synthetic Purge

| Gate | Result |
|---|---|
| Dry-run impact and eligibility | PASS |
| Explicit synthetic execute gate | PASS |
| Storage object removed and absence confirmed | PASS |
| Minimal final tombstone persisted | PASS |
| Closed corrective action preserved | PASS |
| Active and deleted detail APIs hide purged fixture | PASS |

Final state:

```text
HARD_PURGE_SYNTHETICALLY_VALIDATED
HARD_PURGE_REAL_DATA_NOT_AUTHORIZED
```

## Frontend And Product Data

- Authenticated deletion Playwright: PASS for detail/list dialogs, deletion, deleted list, restore, desktop, mobile, tablet, no critical console errors, and no request 500.
- Risk Profile parity: PASS with exact active analyzed universe; completed legacy events without an analysis are no longer counted.
- Dashboard trial: PASS against the canonical `/api/risk-profile` source; deprecated `/api/org/intelligence` is rejected by the contract trial.
- Product Beta real API, DB, RLS, security, workflow, and UI trials passed in the root sweep.

## Global Regression Evidence

```text
typecheck: PASS
lint: PASS with 26 pre-existing warnings and 0 errors
build: PASS
engine v01: PASS, 0 critical failures
engine v02: PASS_WITH_LIMITATIONS
engine v03 naturalistic: FAIL, ENGINE_NATURALISTIC_VALIDATION_NOT_READY
reachability: PASS, positive=22 negative=22
root trials discovered: 176
root diagnostic sweep: 162 PASS / 14 FAIL
deletion trials discovered: 8
deletion final sweep: 8 PASS / 0 FAIL
product-unification sweep: 16 PASS / 1 pre-existing error-sanitization failure in /api/analyze
```

The root diagnostic failures include gates intentionally designed to reject any pre-commit diff in protected/API paths, two stale product-data assertions corrected and revalidated, one Risk Profile parity defect corrected and revalidated, and pre-existing Product Alpha/runtime boundary failures. Engine v03 and those pre-existing boundary failures remain explicitly unresolved; deletion readiness is not presented as full-repository readiness.

## Evidence Paths

Generated evidence is kept out of Git and packaged in the final sanitized ZIP:

```text
tmp/hfa-event-deletion-final-closure/
tmp/sera-vnext-controlled-admin-pilot/complete-event-deletion-real-trial-001.json
tmp/sera-vnext-controlled-admin-pilot/purge-execute-synthetic-real-trial-001.json
tmp/sera-vnext-controlled-admin-pilot/event-deletion-ui-real-trial-001.json
output/playwright/sera-vnext-controlled-admin-pilot/event-deletion-*.png
```
