# HFA/SERA — Frontend E2E Results

## Execution status: NOT EXECUTED THIS PASS (static analysis only)

### Rationale
This is a read-only independent audit. Running live Playwright smoke flows in this session was not performed because:
1. The application server was not started, and starting it requires the controlled internal env (`SERA_VNEXT_PRODUCT_BETA_ENABLED`, UI flags, `allowedDevOrigins`, Supabase service env — see project memory on Next.js dev testing config).
2. The audit mandate forbids any mutation; the deletion paths under test are destructive and there is no UI-level synthetic-only delete to exercise safely without touching real data.
3. The primary deliverable is a correctness/architecture audit, for which source + schema inspection is authoritative.

No browser session was launched; no `mcp__Claude_Preview__*` / `playwright` action was taken against the app; no event (synthetic or real) was deleted.

## Existing automated coverage found (not run here)
The repo contains trial-style scripts under `tests/sera-vnext/*.ts` (not a Jest/Vitest/Playwright-runner suite). Relevant to scope:
- `risk-profile-exclusion-trial-001.ts`, `risk-profile-real-data-trial-001.ts`
- `product-beta-api-trial-001.ts`, `product-beta-db-real-trial-001.ts`, `product-beta-rls-trial-001.ts`, `product-beta-schema-trial-001.ts`
- `staging-tenant-isolation-a4r224max-trial-001.ts`, `staging-rollback-a4r224max-trial-001.ts`
- `authenticated-smoke-a4r223max-trial-001.ts`
- `.playwright-cli/` and `output/playwright/sera-vnext-controlled-admin-pilot/` hold artifacts from **prior** manual Playwright pilot runs (console logs / page snapshots), evidencing earlier admin-pilot smoke testing — but none cover event deletion.

## Smoke checklist — status by static reasoning
| Flow | Static verdict | Note |
|---|---|---|
| Login | Plausibly working | supabase.auth wired; OAuth bootstrap routes present |
| Dashboard load | Working | `/api/risk-profile` real, empty-state handled |
| Events list | Working | `/api/events` real; no delete control |
| Event detail | Working | real fetch + flows; polling stale-closure caveat (F-012) |
| Analysis view | Working | editable classifications + recalc wired |
| Review (vNext) | Working (flag-gated) | admin review POST present |
| Risk Profile | Working | exclude/restore admin-only |
| Exclude from profile | Working | uses window.confirm/prompt (F-017) |
| Restore to profile | Working | admin DELETE exclusion |
| Archive (vNext) | Working | soft delete |
| Executive report | PLACEHOLDER | demo data (F-006) |
| Per-event report | Partial | demo fallback (F-007) |
| **Permanent delete** | **No UI** | endpoint unreachable (F-005) |
| Console/hydration errors | NOT_ASSESSED | requires live run |
| Network 4xx/5xx | NOT_ASSESSED | requires live run |
| Mobile/tablet | NOT_ASSESSED | requires live run |

## Recommendation
Before shipping the deletion feature, add a **runner-based** E2E (Playwright) suite that exercises: soft-delete → recovery → restore → window-expiry → tombstone, **against synthetic tenants/events only**, plus tenant-isolation and role-gate assertions. See `HFA_FRONTEND_TEST_GAP_ANALYSIS.md`.

**FRONTEND_E2E verdict: NOT_ASSESSED (live), with static smoke reasoning above.**
