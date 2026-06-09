# HFA/SERA — Events Lifecycle Audit

## Legacy event lifecycle (today)

```
[create]  POST /api/events
   → events row (status='received') → debit credit → run SERA pipeline
   → analyses row (1:1) → status='completed' | 'failed'
        ├─ completeness: complete | partial | failed | blocked (analyses.analysis_completeness)
        └─ failure path: events.status='failed' + credit refund
[view]    GET /api/events/:id  (joins analyses + risk_profile_exclusion flag)
[edit]    PATCH analyses via /api/analyses/:id/edits + /recalculate (manual reclassification)
[reanalyze] /api/analyses/:id/recalculate (legacy) — recomputes downstream steps
[exclude] POST /api/risk-profile/exclusions (source_type='legacy_event')  — admin only
[restore] DELETE /api/risk-profile/exclusions/:id                          — admin only
[delete]  DELETE /api/events/:id  — EXISTS in backend, NO UI, immediate hard delete
```

### States observed
| Phase | Mechanism | Reversible | UI present |
|---|---|---|---|
| Created | events.status='received' | — | ✅ /events/new |
| Processing | status='processing' | — | ✅ (auto-poll, see F-012) |
| Completed | status='completed' | — | ✅ /events/[id] |
| Failed | status='failed' (+ refund) | re-create | ✅ shows pending/failed |
| Excluded from Risk Profile | risk_profile_exclusions row | ✅ restore | ✅ admin |
| Archived | **NOT IMPLEMENTED for legacy events** | — | ❌ |
| Restored (from archive) | **NOT IMPLEMENTED for legacy events** | — | ❌ |
| Soft-deleted | **NOT IMPLEMENTED** (no events.deleted_at) | — | ❌ |
| Hard-deleted | DELETE /api/events/:id (immediate) | ❌ | ❌ no UI |

### Identity / ownership fields on `events`
`id` (uuid PK), `tenant_id` (FK tenants, CASCADE), `submitted_by` (FK users, SET NULL), `title`, `raw_input` (narrative — PII risk), `input_type`, `status`, `credits_used`, `occurred_at`, `operation_type`, `aircraft_type`, timestamps. **No `deleted_at`, no `archived_at`, no `created_by` audit beyond submitted_by.**

## vNext analysis lifecycle (today)

```
[create]    POST /api/admin/sera-vnext/analyses   (status='CANDIDATE_ANALYSIS_CREATED')
[review]    POST .../:id/reviews  → review_status transitions
            decisions: ACCEPT_AS_WORKING_HYPOTHESIS | REJECT | REQUIRES_MORE_EVIDENCE | RETURN_FOR_REANALYSIS
[reanalyze] POST .../:id/reanalyze → appends revision (append-only)
[archive]   POST .../:id/archive  → status='ARCHIVED' + deleted_at=now()  (== soft delete)
[restore]   POST .../:id/restore  → deleted_at=null, status restored from metadata
[export]    POST .../:id/export
[delete]    NONE — no hard delete; blocked by append-only triggers at DB layer
```

Status set (locked by CHECK constraints, all NON-FINAL):
`CANDIDATE_ANALYSIS_CREATED, UNDER_HUMAN_REVIEW, REQUIRES_MORE_EVIDENCE, RETURNED_FOR_REANALYSIS, HUMAN_REVIEW_COMPLETED_NON_FINAL, ARCHIVED`.

## Gap analysis: the five actions the spec asks us to separate

| Action | Legacy events | vNext analyses |
|---|---|---|
| **Arquivar** (keep data, hide from main list, restorable) | ❌ not implemented | ✅ `archive` (also sets deleted_at) |
| **Desconsiderar do Perfil de Risco** (keep event+analysis, drop from aggregates, restorable) | ✅ risk_profile_exclusions | ✅ risk_profile_exclusions |
| **Soft delete** (mark deleted, hide, keep for window, recoverable) | ❌ not implemented | ⚠️ conflated with archive |
| **Hard delete** (purge permanently, no restore, reinforced confirm) | ⚠️ exists but unsafe + no UI | ❌ blocked by triggers |
| **Restaurar** | only for exclusion | ✅ from archive |

### Conclusions
1. The legacy world has **exclusion** and an **unguarded hard delete with no UI**; it lacks archive and soft-delete.
2. The vNext world **conflates archive and soft-delete** (archive writes `deleted_at`), and **cannot hard-delete** by construction.
3. There is **no unified "delete this occurrence"** concept because the two worlds are not linked (see dependency map §6).
4. "Excluir definitivamente um evento analisado e todos os seus dados relacionados" is therefore **partially present (legacy backend only) and unsafe**, and **architecturally blocked for vNext**.
