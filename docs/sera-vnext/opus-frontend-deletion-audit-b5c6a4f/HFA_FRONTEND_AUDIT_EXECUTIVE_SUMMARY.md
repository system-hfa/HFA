# HFA/SERA — Frontend & Event-Deletion Audit — Executive Summary

- **Model:** Claude Opus 4.8 (max effort) · **Mode:** independent, read-only
- **Repo:** `/Users/filipedaumas/SAAS/HFA` · **Branch:** `main` · **HEAD:** `b5c6a4f` (matches expected) · **origin/main:** in sync · **Worktree:** clean (untracked only)
- **Date:** 2026-06-09

## Headline
**`FRONTEND_PARTIALLY_READY_DELETE_REQUIRES_IMPLEMENTATION`.** The app runs on real, tenant-scoped data for its core flows, but **permanent event deletion is unsafe and unfinished**, and several screens show **demo data** or **divergent counts**.

## The deletion picture (the core ask)
- A backend `DELETE /api/events/:id` **exists** and does an **immediate, irreversible cascade** (analyses → corrective_actions → analysis_edits) plus a best-effort storage delete.
- It is **available to any authenticated user** (no admin gate), **writes no audit log**, has **no soft-delete/recovery**, leaves **orphan risk-profile exclusions**, and **silently destroys open corrective actions**.
- It has **no UI anywhere** — so the feature is unsafe where it exists and absent where users are.
- **vNext analyses cannot be hard-deleted at all**: their append-only audit triggers abort any cascade delete. vNext "archive" is really a soft delete.

**Recommendation:** do NOT ship immediate hard delete. Implement **admin-only soft delete + 30-day recovery + delayed audited purge**, with an immutable narrative-free tombstone, corrective-action detach, and hardened storage cleanup.

## Top findings
| Sev | Finding |
|---|---|
| HIGH | Event delete has no role gate (F-001) |
| HIGH | Event delete writes no audit (F-002) |
| HIGH | Immediate irreversible delete, no recovery (F-003) |
| HIGH | No UI to delete an event (F-005) |
| HIGH | Executive report is 100% demo data (F-006) |
| MEDIUM | vNext cannot be hard-deleted (append-only triggers) (F-011) |
| MEDIUM | Events list / dashboard count different universes (F-008) |
| MEDIUM | Orphan exclusions after delete (F-004) · Storage cleanup non-transactional (F-015) · No deletion tests (F-014) · Per-event report demo fallback (F-007) |
| LOW | Admin middleware is a no-op (F-010) · admin stats omit vNext (F-009) · stale polling (F-012) · window.confirm UX (F-017) |

## Readiness (abbreviated)
Frontend global: **PASS_WITH_WARNINGS** · Dashboard/Events/Risk-Profile: **PASS_WITH_WARNINGS** · Analysis/Review/Exclusion: **PASS** · **Hard delete: BLOCKED** · Storage delete: **NOT_READY** · Audit trail (deletion): **NOT_READY** · Production: **NOT_READY**.

## Plan (3 packages)
1. **Frontend correctness** — kill demo-as-production, reconcile counts, unify ERC, fix middleware/polling.
2. **Deletion data model + API + security** — soft-delete columns, detach corrective actions, audited delete-request/restore/permanent APIs, storage hardening, tombstone.
3. **E2E + release** — deletion contract/security/race tests on synthetic data, Playwright smoke, flag-gated rollout.

## Deliverables
21 reports in `docs/sera-vnext/opus-frontend-deletion-audit-b5c6a4f/`. Status: **AUDIT_REPORTS_CREATED_NOT_COMMITTED**. No code, DB, migration, flag, or deploy change was made.
