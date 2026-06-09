# HFA/SERA — Frontend Readiness Matrix

Values: PASS · PASS_WITH_WARNINGS · NOT_READY · BLOCKED · NOT_ASSESSED

| Dimension | Verdict | Basis |
|---|---|---|
| FRONTEND_GLOBAL_READINESS | PASS_WITH_WARNINGS | Core app flows work on real data; executive report is demo (F-006), event report has demo fallback (F-007), minor polling bug (F-012) |
| DASHBOARD_READINESS | PASS_WITH_WARNINGS | Real unified data; parity gaps vs events list & admin stats; duplicated ERC math |
| EVENTS_READINESS | PASS_WITH_WARNINGS | List/detail/create/exclude work; no delete UI; vNext not shown in list |
| ANALYSIS_READINESS | PASS | Legacy analysis view, edit, recalculate wired and real |
| REVIEW_READINESS | PASS | vNext human review flow present and flag-gated |
| RISK_PROFILE_READINESS | PASS_WITH_WARNINGS | Real, derived-on-read, consistent with dashboard; needs deleted_at filter for soft delete |
| EVENT_ARCHIVE_READINESS | NOT_READY (legacy) / PASS (vNext) | Legacy events have no archive; vNext archive works but conflates with soft-delete |
| EVENT_EXCLUSION_READINESS | PASS | Desconsiderar/Restaurar implemented, audited, admin-gated, validated against canonical universe |
| EVENT_HARD_DELETE_READINESS | BLOCKED | No safe path: legacy endpoint unguarded/unaudited/no-UI; vNext blocked by append-only triggers |
| STORAGE_DELETE_READINESS | NOT_READY | Best-effort, non-transactional, single-artifact, no reconciliation/URL revocation |
| TENANT_SECURITY | PASS_WITH_WARNINGS | Tenant filters enforced on APIs incl. delete; middleware /admin is a no-op (defense-in-depth gap) |
| AUDIT_TRAIL | NOT_READY (for deletion) | Robust audit_log exists, but zero deletion event types; delete handler writes nothing |
| CONTROLLED_PILOT | PASS_WITH_WARNINGS | vNext beta + risk-profile usable internally behind flags; deletion must stay disabled |
| INTERNAL_BETA | PASS_WITH_WARNINGS | Acceptable for internal beta if delete remains hidden and demo reports are labeled |
| PRODUCTION | NOT_READY | Demo executive report, deletion gaps, parity confusion, no deletion tests |

## One-line summary
The product is **operationally usable for an internal, flag-gated beta**, but **event permanent deletion is not safe to expose** and several **data-parity / demo-data** issues must be closed before production.
