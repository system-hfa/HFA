# HFA/SERA — Frontend Test Gap Analysis

## What exists
- A collection of **trial scripts** in `tests/sera-vnext/*.ts` — bespoke `.ts` programs (e.g. `product-beta-api-trial-001.ts`, `product-beta-rls-trial-001.ts`, `risk-profile-exclusion-trial-001.ts`, `staging-tenant-isolation-a4r224max-trial-001.ts`). These are *verification scripts*, not a standard test-runner suite.
- No `*.test.ts` / `*.spec.ts` files were found in `frontend/` (search returned none).
- Prior Playwright pilot **artifacts** under `.playwright-cli/` and `output/playwright/sera-vnext-controlled-admin-pilot/` (console logs, page YML snapshots) — evidence of past manual smoke runs, not committed automated tests.

## Coverage matrix
| Concern | Covered? | By what |
|---|---|---|
| vNext API contract | partial | `product-beta-api-trial-001.ts` |
| vNext DB/RLS | partial | `product-beta-db-real-trial-001.ts`, `product-beta-rls-trial-001.ts`, `product-beta-schema-trial-001.ts` |
| Tenant isolation (vNext) | partial | `staging-tenant-isolation-a4r224max-trial-001.ts` |
| Risk-profile exclusion | partial | `risk-profile-exclusion-trial-001.ts` |
| Risk-profile real data | partial | `risk-profile-real-data-trial-001.ts` |
| Rollback (staging) | partial | `staging-rollback-a4r224max-trial-001.ts` |
| **Event hard/soft delete** | **NONE** | — |
| **Cascade behaviour** | **NONE** | — |
| **Storage object deletion** | **NONE** | — |
| **Deletion tenant-isolation** | **NONE** | — |
| **Deletion audit trail** | **NONE** | — |
| **Recovery/restore window** | **NONE** | — |
| Frontend component/unit | NONE | no jsdom/RTL suite |
| Live E2E (runner) | NONE | only manual CLI artifacts |

## Quality red flags
- **No test runner configured for assertions** (the trial scripts are imperative programs; pass/fail discipline is per-script, not standardized). Risk of "scripts masquerading as tests".
- **Skips/timeouts/fragile assertions** cannot be statically guaranteed absent; the trial-script style (manual sequencing, real DB) is prone to flakiness and to leaving test data behind ("dados de teste não limpos").
- **No deletion coverage at all** — the single most destructive operation has zero automated protection.

## Mandatory tests before deletion ships
1. **Soft-delete contract**: request → row hidden everywhere → excluded from all metrics → audit rows written.
2. **Recovery**: restore within window succeeds; restore after window fails.
3. **Hard-delete cascade**: analyses/edits/corrective_actions removed; credit_transactions preserved (event_id null); audit_log preserved; risk_profile_exclusions tombstoned.
4. **Storage**: object removed; reconciliation finds no orphan; signed URL no longer resolves.
5. **Security**: non-admin DELETE → 403; cross-tenant DELETE → 404; mass-delete loop rejected/rate-limited.
6. **Race**: delete blocked while reanalysis/export in flight.
7. **vNext**: hard delete returns `EVENT_HARD_DELETE_BLOCKED_BY_DATA_MODEL` until purge function exists; archive/restore round-trip.
8. All deletion tests run against **synthetic tenants** with guaranteed teardown.

## Verdict
**TEST GAP = SEVERE for deletion.** Existing trials give moderate confidence in vNext beta and risk-profile, but deletion (the subject of this audit) is entirely untested. Treat automated deletion tests as a release gate.
