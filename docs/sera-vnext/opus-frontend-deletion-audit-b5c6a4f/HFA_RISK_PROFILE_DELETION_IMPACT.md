# HFA/SERA — Risk Profile Deletion Impact

## How the Risk Profile is built (audited)
`getRiskProfileSummaryForTenant` (`lib/risk-profile/server.ts`) loads, **on every request**:
- legacy `events` + embedded `analyses`,
- `corrective_actions`,
- active `risk_profile_exclusions` (`restored_at IS NULL`),
- `sera_vnext_analyses` (excluding `deleted_at`? — note: the query does **not** filter `deleted_at`; status normalization maps `deleted_at` or `ARCHIVED` → `archived`, and archived rows are excluded from `includedSources`).

It then computes distributions, ERC, combinations, score, trend — **no materialized cache**.

## Effect of each lifecycle action on the profile

| Action | Appears in `total_events`? | In `included` (aggregates)? | In `excluded` count? | Recompute trigger |
|---|---|---|---|---|
| **Desconsiderado** (exclusion) | yes | no | **yes** | next read |
| **Arquivado** (vNext archive) | counted in `sources` then classified `archived` → not included; listed under limitations | no | no | next read |
| **Soft deleted** (proposed `events.deleted_at`) | **must be excluded from the source query** | no | no | next read |
| **Hard deleted** | no (row gone) | no | no | next read |

## Required guarantees (per the brief: "não contar evento excluído em nenhuma métrica ativa")
1. A **soft-deleted** event must be dropped from the source queries in `loadRiskProfileUniverse` (add `is('deleted_at', null)` to the `events` select once the column exists). **Today this filter does not exist for events** because the column does not exist — so the proposed soft delete will silently keep counting unless the query is updated. This is a required code change in Package 2.
2. A **hard-deleted** event disappears automatically (no row), and because aggregates are recomputed per request, ERC / P-O-A / preconditions / score / trend / dashboard counts all self-correct. **No cache invalidation needed.**
3. The four states must remain distinguishable in the summary `limitations[]` (already done for archived/excluded/draft/error); add a soft-deleted note if a soft-deleted item could ever be surfaced (it should not be).

## Specific recompute checklist after deletion
- `total_events`, `included_events`, `excluded_events` — recomputed from sources ✅ (automatic for hard delete; needs query filter for soft delete).
- `modal_erc_level`, `erc_distribution` — recomputed from `includedSources` ✅.
- `distribution.perception/objective/action`, `top_preconditions`, `top_combinations`, `recurring_patterns` — recomputed ✅.
- `score`, `trend`, `quality_trend`, `data_confidence`, `safety_issue_candidates` — recomputed ✅.
- `recent_events`, `source_events_included/excluded` — recomputed ✅.
- Dashboard tiles (`/dashboard`) read the same payload → consistent ✅.

## Orphan exclusion caveat (F-004)
If an event is hard-deleted **without** removing its `risk_profile_exclusions` row, the orphan exclusion remains but **no longer matches any source**, so `exclusionLookup.get('legacy_event:<id>')` finds nothing for any live source and the orphan simply never attaches — it does **not** corrupt counts, but it is stale data and should be tombstoned during deletion.

## Verdict — RISK_PROFILE_READINESS for deletion
**PASS_WITH_WARNINGS.** The profile is correctly derived-on-read, so deletions propagate automatically for hard delete. The one mandatory change for the recommended soft-delete model is to add `deleted_at IS NULL` filtering to the events source query; without it, soft-deleted events would keep counting.
