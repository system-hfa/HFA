# SERA vNext Reviewer Utility — Rollback Plan

## Scope

This rollback covers only the reviewer-output derivation layer and UI changes. Engine, methodology, DB, and migrations are unaffected.

## Rollback Steps

### Step 1 — Remove reviewer-output module

```bash
rm -rf frontend/src/lib/sera-vnext-product/reviewer-output/
```

### Step 2 — Revert types.ts imports and fields

Remove `import type { SeraReviewerOutput } from './reviewer-output'` from `types.ts`.
Remove `reviewerOutput: SeraReviewerOutput` from `SeraVNextAnalysisDetail` and `SeraVNextExportPayload`.

### Step 3 — Revert persistence files

Remove `import { buildReviewerOutput }` and `reviewerOutput: buildReviewerOutput(...)` from:
- `frontend/src/lib/sera-vnext-product/persistence/get-analysis.ts`
- `frontend/src/lib/sera-vnext-product/persistence/export-analysis.ts`

### Step 4 — Revert index.ts

Remove `export * from './reviewer-output'` from `index.ts`.

### Step 5 — Revert UI pages

Restore original `[id]/page.tsx` and `[id]/review/page.tsx` from git:
```bash
git checkout HEAD~1 -- "frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/page.tsx"
git checkout HEAD~1 -- "frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/review/page.tsx"
```

### Step 6 — Revert font fix

Remove `display: 'swap'` from `Inter` in `layout.tsx` (optional, no functional impact).

## Impact of Rollback

- Product Beta returns to `CONTROLLED_ADMIN_PILOT_CONTINUES_WITH_LIMITATIONS`
- P/O/A utility returns to 0/10
- Preconditions utility returns to 1/10
- Engine, DB, RLS, methodology, locks: unaffected

## No DB Rollback Needed

`reviewerOutput` is derived at API response time and never persisted. No migration required.
