# HFA Rollback Plan

Primary rollback:
1. Revert the closure commit.
2. Restore origin/main to the previous HEAD 87d0d0c0b85a011ccc62825f123c6b92cce5b513 if needed.
3. Re-run npm --prefix frontend exec -- tsc --noEmit, npm --prefix frontend run lint, npm --prefix frontend run build.
4. Re-run npx tsx scripts/run-sera-vnext-regression.ts once the runner exists again or use the archived root/subdir diagnostic command from this closure.

Targeted rollback if needed:
- Product Alpha behavior: revert only frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts.
- /api/analyze contract: revert frontend/src/app/api/analyze/route.ts and error-sanitization trial update.
- gate redesign: revert tests/sera-vnext/protected-path-contract.ts and the gate updates.
- artifact hygiene: revert .gitignore additions if local generated artifacts must be visible again.

Do not roll back generated reports, source corpus, fixtures, baselines, or methodology documents unless a future task explicitly authorizes that scope.
