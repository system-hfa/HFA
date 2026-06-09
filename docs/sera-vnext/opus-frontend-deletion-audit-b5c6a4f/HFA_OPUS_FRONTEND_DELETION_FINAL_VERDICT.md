# HFA/SERA — Opus Frontend & Deletion Final Verdict

## FINAL STATE
# `FRONTEND_PARTIALLY_READY_DELETE_REQUIRES_IMPLEMENTATION`

Supplementary blocking tokens for the deletion feature specifically:
- `EVENT_HARD_DELETE_BLOCKED_BY_SECURITY` (legacy: no role gate)
- `EVENT_HARD_DELETE_BLOCKED_BY_AUDIT_REQUIREMENTS` (legacy: no deletion audit / no soft-delete)
- `EVENT_HARD_DELETE_BLOCKED_BY_DATA_MODEL` (vNext: append-only triggers prevent purge)

## Rationale (one paragraph)
The frontend is largely real and functional: dashboard, events, analysis, review, risk profile, actions, credits and the flag-gated vNext admin flows all read live, tenant-scoped data and are internally consistent. The blocking problems are concentrated in two areas. First, **data honesty / parity**: the executive report is 100% demo data, the per-event report silently falls back to demo, the events list and admin stats count a different universe than the dashboard, and ERC is computed by two different client formulas. Second, and decisively, **permanent event deletion is not safe**: a backend `DELETE /api/events/:id` exists that performs an immediate, irreversible, un-audited cascade available to *any* authenticated user — yet it has **no UI**, so the advertised "excluir definitivamente um evento" is simultaneously **unsafe where it exists and absent where users are**. The recommended model — reinforced-confirm soft delete with a 30-day recovery window, admin-only, fully audited, with corrective-action and storage handling and an immutable tombstone — must be built. vNext data additionally cannot be hard-deleted at all because of its append-only audit triggers.

## What is ready
- Event creation → SERA pipeline → analysis view/edit/recalculate.
- Risk Profile (unified, derived-on-read) and its dashboard.
- "Desconsiderar do Perfil de Risco" + "Restaurar" (audited, admin-gated, validated).
- vNext candidate creation, human review, archive/restore — behind flags.
- Tenant isolation on all data APIs (delete included).

## What is not ready
- Permanent event deletion (security, audit, recovery, cascade, storage, tests, vNext data model) — **the subject of this audit**.
- Executive/per-event reports using real data.
- Cross-screen count parity and unified ERC math.
- Storage deletion robustness and audit-trail deletion events.

## Bottom line
Keep the unguarded delete endpoint disabled/locked. Do **not** expose hard delete. Implement the guarded soft-delete + delayed-purge design (Packages 2 & 3) and close the demo-data/parity issues (Package 1) before production.
