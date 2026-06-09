# SERA vNext — Database & Audit Trail

## Two complementary audit systems

| System | Table | Used by | Durability | Sanitization |
|---|---|---|---|---|
| Operational audit | `audit_log` | legacy + `/api/analyze` (incl. canonical_engine.used) | **best-effort** — `writeAuditLog` never throws; failure only `console.error` | metadata strips null/undefined; no narrative/tokens |
| Domain events | `sera_vnext_analysis_events` | vNext product (`createAuditEvent`) | **awaited** in create path (failure rejects the create) | `sanitizeObject` strips narrative/raw_input/token/secret/stack; truncates strings |

The original finding "`audit_log` ausente" is **inaccurate at HEAD** — `audit_log` exists and is written by the analyze route and risk endpoints. The vNext path additionally records domain events.

## Reconstructability ("who / what / when / tenant / object / version / requestId")

For a vNext canonical analysis, all seven are reconstructable:
- **who**: `actor_id` (events) / `user_id` (audit_log)
- **what**: `event_type` (`analysis.created`, `canonical_engine.used`, …)
- **when**: row timestamps
- **tenant**: `tenant_id` on every row
- **object**: `analysis_id` / `entity_id`
- **version**: `engine_runtime_version`, `methodology_version`, `canonical_tree_version`, `code_commit` (analysis row) + in audit payloads
- **requestId**: `request_id` on analysis, revision, and both audit systems

## Gaps / risks

1. **Best-effort `audit_log` can silently drop events.** A failed insert is only logged to stderr; the request still succeeds. So the operational trail is **not guaranteed complete**. Acceptable for a pilot if domain events (the vNext system) are treated as the system of record, but it means `audit_log` cannot be relied upon for compliance-grade completeness. (NF-05, LOW.)
2. **No transaction across analysis + revision + audit event.** If `createAuditEvent` fails after the analysis/revision are inserted, the analysis exists without its creation event. No silent catch, but no atomic guarantee. (LOW.)
3. **Legacy vs canonical engine is recorded** (`canonical_engine.used` + `source_flow`), so you can tell which engine produced any vNext row; legacy `analyses` rows carry `motor_version` in their audit metadata.
4. **Access-denied / cross-tenant attempts**: handled at API (requireBearerUser / requireAdmin / tenant filters), not necessarily emitted as audit events.

## Domain-event vs `audit_log` adequacy

The domain-event architecture (`sera_vnext_analysis_events`, awaited, sanitized, status-transition aware) is an **adequate and arguably stronger** audit substrate for vNext analyses than the best-effort `audit_log`. For the **pilot**, treat domain events as the authoritative trail and `audit_log` as supplementary operational telemetry.

## Verdict

Audit trail: **PASS_WITH_WARNINGS.** Strong, versioned, tenant-scoped provenance for vNext analyses; best-effort `audit_log` and non-atomic writes are acceptable pilot-grade but not compliance-grade.
