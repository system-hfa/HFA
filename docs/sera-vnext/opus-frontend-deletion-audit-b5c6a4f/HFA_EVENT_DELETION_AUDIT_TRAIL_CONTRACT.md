# HFA/SERA — Event Deletion Audit Trail Contract

## Current audit infrastructure (audited)
- `public.audit_log` — service-role-only (RLS `USING(false)`), narrative-free by policy (migration `20260519001000`). Columns: `tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, status, metadata`.
- `writeAuditLog` is called for event creation, analysis lifecycle, risk-profile generation, and exclusion create/restore.
- **Gap:** the event DELETE handler writes **no** audit row. There are **no deletion event types** anywhere (confirmed by grep over `lib/observability`).
- vNext has its own append-only `sera_vnext_analysis_events` with a constraint forbidding `narrative/raw_input/eventText` in payload/metadata — a good template.

## Required deletion event types
Emit into `audit_log` (legacy) and/or `sera_vnext_analysis_events` (vNext), via service role:

| event_type | when | status |
|---|---|---|
| `event.deletion_requested` | user submits delete-request | success |
| `event.soft_deleted` | row marked deleted_at | success |
| `event.restored` | restored within window | success |
| `event.hard_delete_scheduled` | enqueued for purge | success |
| `event.hard_deleted` | physical purge done | success |
| `event.hard_delete_failed` | purge error | failed |

## Metadata (per event) — non-sensitive only
```
tenant_id
event_id
analysis_ids        (array)
actor_id
request_id
reason_category     (NOT free-text reason in audit; store category only)
timestamp
data_categories_deleted   e.g. ["narrative","storage_object","corrective_actions"]
recoverable_until
```
**Never** store: full narrative, `raw_input`, transcripts, emails, tokens, secrets, stack traces. (Mirror the vNext `no_narrative_payload` CHECK.)

## Tombstone after hard delete (minimal, immutable, permanent)
Once the event is physically purged, retain only:
```
deletion_record_id
tenant_id
actor_id
timestamp
reason_category
request_id
```
Stored in a dedicated narrative-free table (or as the surviving `audit_log` rows). This proves *that* and *by whom* an erasure occurred without retaining the erased content — satisfying both audit and LGPD-erasure obligations.

## Anonymization requirements
- The free-text deletion **reason** (which may contain PII) belongs in the operational deletion record during the recovery window, and must be **dropped or redacted at hard delete**, leaving only `reason_category` in the permanent tombstone.
- `audit_log` already excludes narrative by design; verify no PII is added in `metadata` when wiring deletion events.

## Immutability
- Use the append-only pattern (`prevent_*_append_only_update/delete` triggers) for the deletion tombstone table so deletion records cannot themselves be altered or removed.
- `audit_log` is already service-role-write-only and client-unreadable (RLS false) — keep it that way.
