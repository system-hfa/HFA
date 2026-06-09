# HFA/SERA — Implementation Plan (MAX)

Three packages only. Not one micro-phase per finding.

---

## PACKAGE 1 — Frontend correctness & broken flows
Goal: every screen shows real, consistent data; no demo content masquerading as production.

1. **Executive report (F-006):** wire `/reports/executive` to `/api/risk-profile`, or gate it behind an explicit "amostra/demo" label until real wiring lands.
2. **Per-event report (F-007):** replace the silent demo fallback with explicit empty/error states (keep `/demo` as the only intentional demo surface).
3. **Parity (F-008, F-009):** decide and implement the events/dashboard universe story — either surface vNext analyses in the events experience or clearly label "legacy" vs "canônico"; include vNext in `/api/admin/stats`.
4. **ERC single source of truth (D-2):** collapse the duplicated client ARMS-ERC math in `events/page.tsx` and `events/[id]/page.tsx` into the shared `lib/risk-profile/erc` helpers.
5. **Event-detail polling (F-012):** fix stale-closure auto-refresh (use ref/state in deps).
6. **Middleware (F-010):** either enforce the `/admin` redirect at the edge or remove the dead role logic, keeping `requireAdmin` as the real gate.

Exit: route inventory all WORKING/PASS except intentional `/demo`; dashboard/events/risk-profile counts reconcile or are explicitly scoped.

---

## PACKAGE 2 — Event deletion data model, API & security
Goal: a safe, audited, recoverable "Excluir evento e dados relacionados".

1. **Migrations:**
   - `events`: add `deleted_at`, `recoverable_until`, `deleted_by`, `deletion_reason_category` (+ optional `archived_at`).
   - `corrective_actions.analysis_id`: make nullable, change `ON DELETE` to `SET NULL` (preserve closed actions; detach instead of destroy).
   - new append-only **deletion tombstone** table.
   - vNext: service-role **purge function** that controls the append-only triggers in a transaction (only if vNext erasure is required).
2. **Risk-profile query:** add `deleted_at IS NULL` to the `events` source select in `loadRiskProfileUniverse` (so soft-deleted events stop counting).
3. **APIs (all `requireAdmin`, tenant-scoped, audited, request-id):**
   - `GET /api/events/:id/deletion-impact`
   - `POST /api/events/:id/delete-request` (soft delete + reinforced confirm + reason)
   - `POST /api/events/:id/restore`
   - `DELETE /api/events/:id/permanent` (scheduled purge / admin-forced) — safe order: revoke→storage→dependents→analysis→event→tombstone.
   - Retire / lock down the current unguarded `DELETE /api/events/:id`.
4. **Audit:** add `event.deletion_requested/soft_deleted/restored/hard_delete_scheduled/hard_deleted/hard_delete_failed`; narrative-free metadata; permanent tombstone.
5. **Storage:** transactional/verified removal + signed-URL revocation + reconciliation job.
6. **Security:** role gate, block open-action/race/in-flight, no bulk endpoint, rate limit, tenant filter everywhere.

Exit: deletion is admin-only, recoverable for 30 days, fully audited, with no orphan/storage leaks; vNext hard delete returns the blocked error until its purge function exists.

---

## PACKAGE 3 — E2E validation & release
Goal: prove the deletion lifecycle and ship behind a flag.

1. **Automated deletion tests** (runner-based, synthetic tenants, teardown): soft-delete contract, recovery window, cascade, storage, security/role, race, tenant isolation, vNext block (see test-gap report).
2. **Playwright E2E smoke** for the guarded UX: impact modal → type-title confirm → soft delete → restore → window expiry → tombstone; plus regression of login/dashboard/events/risk-profile.
3. **Feature flag** the deletion UI; enable for controlled pilot first.
4. **Release checklist:** parity reconciled, audit verified, rollback path documented, Lixeira/Recuperação view live.

Exit: deletion feature passes E2E + security tests on synthetic data; ready for controlled pilot, then internal beta, then production.
