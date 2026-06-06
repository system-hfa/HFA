# SERA vNext Staging Deactivation Runbook — A4R224-MAX

## Immediate Deactivation (< 5 minutes)

```bash
# 1. Turn off pilot flag (endpoint returns 404 immediately)
SERA_VNEXT_INTERNAL_PILOT_ENABLED=false

# 2. Turn off read-only flag
SERA_VNEXT_READONLY_ENABLED=false

# 3. Verify deactivation
curl http://localhost:3000/api/admin/sera-vnext/status
# Expected: 404 {"detail":"Not found"}

# 4. Turn off UI diagnostics flag (requires rebuild)
NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=false
# Then rebuild: npm --prefix frontend run build
```

## Verification After Deactivation

```bash
npx tsx tests/sera-vnext/staging-rollback-a4r224max-trial-001.ts
# Expected: ROLLBACK_OK
```

## What Deactivation Does NOT Require

- No DB cleanup (no data was written)
- No code revert (flags are env-only)
- No migration rollback
- No baseline changes
- No fixture changes
- No secret rotation (no secret was exposed)

## Deactivation Criteria (Any of these triggers immediate action)

1. Unexpected HTTP 200 for non-admin user
2. Any DB write detected
3. Token, cookie, or secret appears in logs
4. selectedCode / releasedCode / finalConclusion appears in response
5. CLASSIFIED or READY appears anywhere
6. Baseline or fixture hash mismatch
7. Endpoint accessible without authentication
8. Production environment flag accidentally set

## Post-Deactivation Integrity Check

```bash
npx tsx tests/sera-vnext/staging-integrity-a4r224max-trial-001.ts
git diff -- tests/sera-vnext/baselines/ tests/sera-vnext/fixture-sets/ tests/sera-vnext/baseline-candidates/ tests/sera-vnext/fixtures/
# All diffs must be empty
```
