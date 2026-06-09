# HFA/SERA — Event Data Dependency Map

This is the authoritative map of what an *event* touches and what must be considered when deleting one. There are **two distinct analysis worlds** in this codebase, and they are **not joined at the row level**.

## 1. Legacy world (the only one anchored on `events`)

```
events (PK id, tenant_id, submitted_by)
  └─ analyses            event_id UNIQUE  ON DELETE CASCADE   (1:1)
       ├─ corrective_actions   analysis_id ON DELETE CASCADE
       ├─ analysis_edits       analysis_id ON DELETE CASCADE
       └─ storage: analyses.source_file_url → bucket 'analysis-documents/{auth.uid}/...'
  └─ credit_transactions  event_id ON DELETE SET NULL          (billing preserved)
  └─ audit_log            entity_id = event/analysis id (NO FK; soft reference)
  └─ risk_profile_exclusions  source_type='legacy_event', source_id=event.id (NO FK; soft reference)
```

### FK behaviour (from `20260507105001_initial_schema.sql`)
| Child table | FK column | ON DELETE | Effect when event deleted |
|---|---|---|---|
| analyses | event_id (UNIQUE) | CASCADE | analysis row removed |
| corrective_actions | analysis_id | CASCADE (via analyses) | actions removed |
| analysis_edits | analysis_id | CASCADE (via analyses) | edit history removed |
| credit_transactions | event_id | SET NULL | transaction kept, link nulled |
| events.submitted_by | users.id | SET NULL | n/a (parent side) |

### Soft references (NO foreign key — survive deletion as orphans)
| Table | Link | Behaviour today |
|---|---|---|
| `audit_log` | `entity_id` (uuid, no FK) | rows remain (correct for audit, but contain no narrative — OK) |
| `risk_profile_exclusions` | `source_id` (uuid, no FK) | **orphan rows remain** → Finding F-004 |

## 2. vNext Product Beta world (NOT linked to `events`)

```
sera_vnext_analyses (PK id, tenant_id, created_by)   -- standalone; has deleted_at (soft delete)
  ├─ sera_vnext_analysis_revisions   analysis_id ON DELETE CASCADE + APPEND-ONLY triggers
  ├─ sera_vnext_analysis_reviews     analysis_id ON DELETE CASCADE
  ├─ sera_vnext_analysis_events      analysis_id ON DELETE CASCADE + APPEND-ONLY triggers (sanitized audit)
  └─ risk_profile_exclusions   source_type='sera_vnext_analysis', source_id=analysis.id (NO FK)
```

Key facts:
- A vNext analysis has **no `event_id`** and does not appear in the `events` table. Deleting a legacy `event` has **zero effect** on vNext data.
- `sera_vnext_analysis_revisions` and `sera_vnext_analysis_events` carry **BEFORE UPDATE/DELETE triggers** (`prevent_sera_vnext_append_only_*`) that `raise exception`. A row-level `DELETE` of a parent `sera_vnext_analyses` would attempt a cascade delete of these children, **firing the triggers and aborting the whole transaction**. ⇒ **vNext rows cannot be hard-deleted via normal SQL** (Finding F-011).
- The only available vNext lifecycle "removal" is **archive = soft delete** (`status='ARCHIVED'`, `deleted_at=now()`), reversible via restore.

## 3. Dependency count summary

| Category | Legacy event | vNext analysis |
|---|---|---|
| Cascading child tables | 3 (analyses, corrective_actions, analysis_edits) | 3 (revisions, reviews, events) — but blocked by triggers |
| SET NULL links | 1 (credit_transactions) | 0 |
| Soft references (no FK) | 2 (audit_log, risk_profile_exclusions) | 2 (audit_log via service writes, risk_profile_exclusions) |
| Storage objects | 1 (analysis-documents path) | 0 (narrative stored in DB) |
| **Total tables implicated** | **~7** | **~6** |

## 4. What must be deleted vs preserved when an event is permanently removed

| Data | Action | Rationale |
|---|---|---|
| events row | DELETE (after soft window) | the target |
| analyses row + narrative columns | DELETE | personal/operational narrative |
| corrective_actions | DELETE or DETACH (see corrective-action report) | derived from analysis |
| analysis_edits | DELETE | edit narrative history |
| storage object (source_file_url) | DELETE + revoke | uploaded source document (PII risk) |
| credit_transactions | PRESERVE (event_id→NULL) | billing/financial integrity |
| audit_log entries | PRESERVE (already sanitized, no narrative) | regulatory traceability |
| risk_profile_exclusions | DELETE/tombstone matching source_id | avoid orphan rows |
| risk profile aggregates | RECOMPUTE on read (no materialized cache) | derived, not stored |

## 5. Caches / materialized data
- Risk profile is computed **on every request** in `getRiskProfileSummaryForTenant` — **no materialized view or persisted aggregate**. Deletion automatically drops the event from future aggregates (it is simply no longer in the source query). No cache invalidation step required server-side.
- Client pages hold the last fetched payload in React state only; a refetch reflects deletions.

## 6. Duplicate / dual-analysis risk
- A single real-world occurrence can exist **both** as a legacy `event`+`analyses` row **and** as a `sera_vnext_analyses` row (e.g. re-run under the Beta). They are **not linked**; deleting one does not delete the other. Any "delete the occurrence" feature must let the operator act on each world explicitly, or the model must add an occurrence-linking key (does not exist today).
