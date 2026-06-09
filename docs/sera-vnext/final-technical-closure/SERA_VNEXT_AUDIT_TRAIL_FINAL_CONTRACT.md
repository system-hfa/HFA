# SERA vNext — Audit Trail Final Contract

**Date**: 2026-06-09
**Architecture**: Option B — Events by domain

## Decision

The project does NOT have a single centralized `audit_log` table. Instead, audit events are stored per domain:

### Domain event tables

| Table | Domain | Status |
|-------|--------|--------|
| `sera_vnext_analysis_events` | vNext Product Beta | ✅ Active (Supabase remote) |
| `risk_profile_exclusions` | Risk Profile exclusions | ✅ Active (Supabase remote) |
| `events` (status changes) | Legacy analyses | ✅ Active |
| `analyses` (edit_history) | Legacy edit tracking | ✅ Active |

### Code-level audit writers

| Function | Target | Status |
|----------|--------|--------|
| `writeAuditLog()` (`audit.ts`) | `public.audit_log` | ⚠️ Best-effort, fails silently (table missing on remote) |
| `createAuditEvent()` (`create-audit-event.ts`) | `sera_vnext_analysis_events` | ✅ Active |
| Risk Profile exclusion audit | `writeAuditLog()` → `audit_log` | ⚠️ Same as above |

### Resolution

1. **`audit_log` table does not exist on remote Supabase**. The `writeAuditLog()` function in `audit.ts` is best-effort — it catches errors silently and logs to console. No audit data is lost because:
   - vNext analyses are fully audited via `sera_vnext_analysis_events`
   - Legacy analyses track status via `events.status` and `analyses.edit_history`
   - Risk Profile exclusions are tracked in `risk_profile_exclusions` with `excluded_by`, `excluded_at`, `restored_at`

2. **Recommendation**: Either:
   a. Create the `audit_log` table on remote (simple, one-time), OR
   b. Remove `writeAuditLog` calls and rely on domain-specific event tables (cleaner architecture)

3. **For independent audit**: The domain event tables provide sufficient audit trail:
   - `sera_vnext_analysis_events`: who created/reviewed/reanalyzed/exported each vNext analysis, when, which engine version
   - `risk_profile_exclusions`: who excluded/restored which event, when, why
   - `analyses`: who edited what fields, when (edit_history JSONB)
   - `events`: status transitions (received → processing → completed/failed)

## Audit trail reconstruction

For any analysis, the following can be reconstructed:

| Question | Source |
|----------|--------|
| Who created it? | `sera_vnext_analyses.created_by` / `analyses` event relationship |
| When? | `created_at` on analysis row |
| Which tenant? | `tenant_id` on all rows |
| Which engine/runtime? | `engine_version`, `engine_runtime_version` on analysis/revision |
| Which methodology? | `methodology_version` on analysis |
| Which request? | `request_id` on analysis |
| Who reviewed it? | `sera_vnext_analysis_events` (event_type='analysis.review_submitted') |
| Who exported it? | `sera_vnext_analysis_events` (event_type='analysis.exported') |
| Who archived/restored? | `sera_vnext_analysis_events` |

No narrative content, tokens, or PII is stored in audit events.
