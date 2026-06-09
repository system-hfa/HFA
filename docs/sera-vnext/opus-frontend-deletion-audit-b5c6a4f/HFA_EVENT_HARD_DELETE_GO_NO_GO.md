# HFA/SERA — Event Hard Delete GO / NO-GO

## Decision: **NO-GO** for immediate hard delete. Ship guarded soft-delete + delayed purge instead.

## Why immediate hard delete is NO-GO today
| Blocker | Finding |
|---|---|
| No role gate — any tenant user can permanently delete | F-001 (HIGH) |
| No audit trail of the deletion | F-002 (HIGH), audit-trail contract |
| No soft-delete / no recovery — irreversible on first click | F-003 (HIGH) |
| Open corrective actions silently destroyed | corrective-action report |
| Storage cleanup best-effort, non-transactional | F-015 / storage report |
| Orphan exclusion rows left behind | F-004 |
| Zero test coverage for deletion | F-014 / test-gap |
| vNext cannot be hard-deleted at all (append-only triggers) | F-011 |

## Objective answers (Part 19)
1. **Hard delete deve existir?** Yes — but only as the *terminal* stage after a recovery window, and only for the legacy world initially. vNext requires a purge function first.
2. **Deve ser imediato?** No. Immediate irreversible deletion is rejected.
3. **Deve haver soft delete antes?** Yes — mandatory.
4. **Prazo de recuperação?** 30 days (7 minimum).
5. **Quais dados são apagados?** event narrative (`raw_input`), `analyses` content, `analysis_edits`, storage source document, matching `risk_profile_exclusions`.
6. **Quais dados são anonimizados?** the free-text deletion reason → reduced to `reason_category` in the permanent tombstone.
7. **Quais dados permanecem?** `audit_log` (narrative-free), `credit_transactions` (event_id→NULL), the immutable deletion tombstone, closed corrective actions (detached).
8. **Quem pode excluir?** Admin (capability `delete:event`); decide if enterprise-plan gate applies. Never viewer/analyst.
9. **Quais bloqueios?** open corrective actions, in-flight reanalysis/export, cross-tenant, missing reason, title-mismatch.
10. **Quais migrations?** add `events.deleted_at/recoverable_until/deleted_by/deletion_reason_category` (+ optional `archived_at`); make `corrective_actions.analysis_id` nullable / SET NULL; deletion-tombstone table (append-only); for vNext a trigger-bypass purge function.
11. **Quais APIs?** `GET :id/deletion-impact`, `POST :id/delete-request`, `POST :id/restore`, `DELETE :id/permanent` (scheduled/admin-forced) — all `requireAdmin`, audited (see API contract).
12. **Quais telas?** events list overflow menu, event detail header, admin Lixeira/Recuperação view, confirmation modal (replace window.confirm/prompt).
13. **Quais testes?** soft-delete contract, recovery window, cascade, storage, security/role, race, tenant isolation, vNext block — all synthetic with teardown.

## Final state token
**EVENT_HARD_DELETE_BLOCKED_BY_SECURITY** and **EVENT_HARD_DELETE_BLOCKED_BY_AUDIT_REQUIREMENTS** for legacy; **EVENT_HARD_DELETE_BLOCKED_BY_DATA_MODEL** for vNext (append-only triggers).
