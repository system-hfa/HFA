# HFA/SERA — Event Deletion API Contract

## Current state (audited)
| Method/Route | Auth | Behaviour | Problems |
|---|---|---|---|
| `DELETE /api/events/[eventId]` | `requireBearerUser` | immediate hard delete + storage object removal | no role gate (F-001), no audit (F-002), no soft delete (F-003), orphan exclusions (F-004), no UI (F-005) |
| `POST /api/risk-profile/exclusions` | `requireAdmin` | create exclusion (desconsiderar) | OK |
| `DELETE /api/risk-profile/exclusions/[exclusionId]` | `requireAdmin` | restore from exclusion | OK |
| `POST /api/admin/sera-vnext/analyses/[id]/archive` | `requireAdmin` + flag | vNext soft delete | OK (but conflates archive+soft-delete) |
| `POST /api/admin/sera-vnext/analyses/[id]/restore` | `requireAdmin` + flag | vNext restore | OK |
| vNext hard delete | — | **none** | blocked by append-only triggers |

## Recommended final contract (legacy events)

All routes: `requireAdmin` (or a dedicated `delete:event` capability), tenant-scoped, write `audit_log`, idempotent, return `x-request-id`.

### `GET /api/events/:id/deletion-impact`
Returns the blast radius for the confirmation modal. Read-only.
```json
{
  "event": 1,
  "analyses": 1,
  "revisions": 0,
  "reviews": 0,
  "auditEvents": 12,
  "attachments": 1,
  "evidenceItems": 0,
  "correctiveActions": 1,
  "riskProfileImpact": true,
  "blockedReasons": [],
  "recoverableUntil": "2026-07-09T00:00:00Z"
}
```
- `attachments` counts the stored `source_file_url` object(s).
- `blockedReasons` non-empty ⇒ deletion currently disallowed (e.g. reanalysis/export running).

### `POST /api/events/:id/delete-request`
Performs the **soft delete** (does not purge).
Body: `{ "confirmTitle": "<exact event title>", "reason": "<string>", "reasonCategory": "duplicate|test|privacy|other" }`
- Validates `confirmTitle` server-side against the row title.
- Sets `deleted_at`, `deletion_reason_category`, `deleted_by`, `recoverable_until = now()+30d`.
- Writes `event.deletion_requested` + `event.soft_deleted` audit rows.
- 409 if `blockedReasons` present. 403 if not authorized. 404 if not in tenant.

### `POST /api/events/:id/restore`
- Allowed only while `now() < recoverable_until`.
- Clears `deleted_at`/`recoverable_until`; writes `event.restored`.

### `DELETE /api/events/:id/permanent`
- Normally invoked by the **scheduled purge** after the window; may be admin-forced with an extra confirmation.
- Order (see storage report): mark deleting → revoke access → delete storage → delete dependent rows → delete analysis → delete event → write tombstone.
- Preserves `audit_log` and `credit_transactions`; removes/tombstones `risk_profile_exclusions`.
- Writes `event.hard_delete_scheduled` (at request) and `event.hard_deleted` / `event.hard_delete_failed`.

## vNext analyses
- Keep `archive`/`restore` as the **soft** path but **split the semantics**: archive should set `status='ARCHIVED'` without necessarily meaning "deleted"; a separate `deleted_at` soft-delete should be introduced if vNext needs a deletion concept distinct from archive.
- `DELETE /api/admin/sera-vnext/analyses/:id/permanent` must remain **unavailable** until the append-only trigger purge function (policy §5b) exists. Until then it returns `409 EVENT_HARD_DELETE_BLOCKED_BY_DATA_MODEL`.

## Cross-cutting requirements
- Every mutating route: `requireAdmin`, tenant filter on every query, `writeAuditLog`, `x-request-id` echo, structured error `{ detail, errorCode, request_id }`.
- Idempotency: `delete-request` is idempotent while already soft-deleted (return current state, `idempotent:true`).
- Rate/abuse: reject bulk/mass deletion (no array endpoint); one id per call.
