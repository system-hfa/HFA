# HFA Final Implementation Decision

## Decision

```text
RECOVERABLE_EVENT_DELETION_READY
HARD_PURGE_SYNTHETICALLY_VALIDATED
HARD_PURGE_REAL_DATA_NOT_AUTHORIZED
GLOBAL_REGRESSION_NOT_FULLY_GREEN
```

Recoverable deletion is ready for the validated staging contract: admin-only soft delete, 30-day recovery, restore, active-surface filtering, complete impact preview, atomic lifecycle/audit writes, and stable public errors.

Hard purge execution remains gated to staging fixtures whose title starts with `[EVENT_DELETE_TEST]`, with the explicit server flag and secondary confirmation. Purge of real or human data is not authorized.

## Implemented Contract

- `CompleteDeletionImpact` performs real inventory queries for legacy/vNext analyses, revisions, reviews, analysis events, audit, evidence, attachments, storage, exports, corrective actions, Risk Profile exclusions, related event references, blockers, and unknown dependencies.
- `resolvePublicUserId` resolves the canonical `public.users.id`; staging proved that the auth UUID and public-user UUID differ.
- Critical transitions use service-role-only RPCs with tenant/admin validation, row locks, idempotency or stable conflict handling, lifecycle append, and critical audit in the same transaction.
- `event_deletion_events` is append-only. `event_deletion_tombstones` is restricted to the minimal final purge snapshot.
- Soft-deleted and purged events are excluded from active Events, Dashboard, Risk Profile, and active report sources.
- Open corrective actions block soft delete. Closed actions remain preserved.
- Storage objects are parsed, inventoried, ownership-checked, removed before synthetic purge completion, and verified absent.
- `/events`, `/events/[id]`, and `/events/deleted` expose the recoverable deletion workflow. Deletion dialogs require reason and exact title, show real impact/blockers, trap keyboard focus, and support mobile/tablet layouts.

## Applied Staging Migrations

```text
20260609123000_safe_event_deletion_lifecycle.sql
20260609200000_event_deletion_lifecycle_events_and_rpcs.sql
20260609203626_complete_event_deletion_closure.sql
20260609204934_reconcile_missing_audit_log.sql
20260609205249_fix_event_purge_digest_cast.sql
20260609214000_reconcile_event_deletion_tombstone_select_policy.sql
```

`supabase migration list` confirmed `Local == Remote` for all six migrations on June 9, 2026. Remote corrections after the initial migration were additive; no applied migration was rewritten. The final policy reconciliation removes the invalid assumption that `auth.uid()` equals `public.users.id`.

## Validation Decision

Deletion-specific real staging gates passed, including identity/FKs, atomic soft delete, 10-way concurrency, idempotency, corrective actions, append-only lifecycle, audit atomicity, storage inventory/failure, restore/race/expiry, dry-run, filtering, and final-output locks.

The dedicated synthetic purge trial passed execution gating, storage removal, closed-action preservation, tombstone creation, and post-purge API hiding. No real-data purge was executed.

Authenticated Playwright passed the detail dialog, list dialog, wrong-title/empty-reason controls, soft delete, deleted list, restore, Dashboard/Risk Profile filtering, desktop/mobile/tablet layout, zero critical console errors, and zero requests with status 500.

## Remaining Limitations

- Global regression closure is not fully green. The protected naturalistic engine v03 runner remains `ENGINE_NATURALISTIC_VALIDATION_NOT_READY`; no methodology, tree, fixture, baseline, or expected output was changed to mask it.
- Root full sweep discovered 176 trials. The diagnostic pre-commit run recorded failures from intended protected-path/API diffs, plus pre-existing Product Alpha candidate-only and runtime-module boundary failures. These are reported separately from deletion readiness.
- The non-admin deletion gate passed at the API level. The optional blocked-user branch in one general Dashboard Playwright trial remained skipped because its blocked browser fixture was unavailable.
- Audit minimum and anonymized provenance are intentionally retained after synthetic purge; the system does not claim that every row is physically deleted.
