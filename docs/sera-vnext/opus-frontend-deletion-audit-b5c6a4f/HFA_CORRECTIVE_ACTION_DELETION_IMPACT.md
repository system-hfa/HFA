# HFA/SERA — Corrective Action Deletion Impact

## Data model (audited)
- `corrective_actions.analysis_id → analyses.id ON DELETE CASCADE`, `tenant_id → tenants ON DELETE CASCADE`.
- Created from analysis recommendations via `POST /api/actions` (event detail page "Criar ação corretiva").
- Surfaced in `/actions` and aggregated in the Risk Profile (`open_total`, `open_overdue`, `closed_last_30d`, `resolution_rate`).
- Status enum: `pending, in_progress, completed, cancelled`. Fields include `responsible`, `due_date`, `completed_at`.

## What happens today on event deletion
`DELETE /api/events/:id` → cascade deletes `analyses` → cascade deletes **all** `corrective_actions` for that analysis, **silently and immediately**, with no audit and no warning. Open/overdue actions vanish from `/actions` and from the profile's action metrics.

## Why silent cascade is wrong for safety actions
A corrective action is a **safety commitment** that may:
- be assigned to a responsible party with a due date,
- be partially executed / in progress,
- carry independent regulatory or operational value beyond the originating analysis.

Destroying it as a side-effect of deleting the source event erases an accountability record without trace.

## Recommended policy
| Situation | Recommended behaviour |
|---|---|
| Action `completed`/`cancelled` (closed) | **Archive / retain detached** (keep historical evidence; null or tombstone the analysis link) |
| Action `pending`/`in_progress` (open) | **Block deletion** (return in `deletion-impact.blockedReasons`) until the user explicitly resolves: cancel, complete, or confirm detach |
| User explicitly confirms detach | Set `analysis_id = NULL` (requires making the FK nullable) or move to an `archived_corrective_actions` store; write audit |

Rationale: never *silently* delete an open safety action. Force an explicit decision, and preserve historical (closed) actions as evidence.

## Required model change
- `corrective_actions.analysis_id` is currently `NOT NULL` with `ON DELETE CASCADE`. To support "detach instead of delete", make it **nullable** and change `ON DELETE` to `SET NULL` (or move closed actions to an archive table). This is a Package 2 migration.

## Impact surface to update
- `deletion-impact` endpoint must report `correctiveActions` count and whether any are **open** (drives `blockedReasons`).
- `/actions` and Risk Profile action metrics already recompute on read — detaching/archiving propagates automatically.

## Verdict
Corrective-action handling is the second-strongest reason (after security/audit) **not** to ship the current immediate cascade delete: it destroys open safety commitments without consent or record. Treat as a **blocking design requirement** for the deletion feature.
