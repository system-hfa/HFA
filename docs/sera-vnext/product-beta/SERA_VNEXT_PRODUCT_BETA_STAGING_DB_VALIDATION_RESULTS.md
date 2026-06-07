# SERA vNext Product Beta — Staging DB Validation Results

Date: 2026-06-07
Status: `SERA_VNEXT_PRODUCT_BETA_INTERNAL_READY_FOR_CONTROLLED_ADMIN_PILOT`

## Migration

| Field | Value |
|-------|-------|
| Migration file | `20260607135727_sera_vnext_product_beta.sql` |
| Applied via | `supabase db push` (Supabase CLI v2.48.3) |
| Migration history repair | 12 prior migrations marked applied before push |
| Result | SUCCESS — `NOTICE: extension "pgcrypto" already exists, skipping` (expected) |

## Tables Verified (real DB)

| Table | Exists | RLS Enabled |
|-------|--------|-------------|
| `sera_vnext_analyses` | YES | YES |
| `sera_vnext_analysis_revisions` | YES | YES |
| `sera_vnext_analysis_reviews` | YES | YES |
| `sera_vnext_analysis_events` | YES | YES |

## RLS Real Tests

| Check | Result |
|-------|--------|
| anon SELECT blocked — `sera_vnext_analyses` | PASS (rows=0) |
| anon SELECT blocked — `sera_vnext_analysis_revisions` | PASS (rows=0) |
| anon SELECT blocked — `sera_vnext_analysis_reviews` | PASS (rows=0) |
| anon SELECT blocked — `sera_vnext_analysis_events` | PASS (rows=0) |
| anon INSERT blocked — `sera_vnext_analyses` | PASS (RLS policy violation) |

## Constraint Real Tests

| Check | Result |
|-------|--------|
| `classifiedOutput=true` blocked | PASS (CHECK constraint) |
| `FINAL_CLASSIFICATION` status blocked | PASS (CHECK constraint) |
| wrong `engine_version` blocked | PASS (CHECK constraint) |
| Valid insert succeeds | PASS |
| Duplicate `client_request_id` blocked | PASS (unique index) |
| Audit event insert OK | PASS |
| Event UPDATE blocked (append-only) | PASS (trigger) |
| Event DELETE blocked (append-only) | PASS (trigger) |

## Trial Results

| Trial | Result |
|-------|--------|
| `product-beta-db-real-trial-001` | PASS 16/16 |
| `product-beta-rls-real-trial-001` | PASS 5/5 |
| `product-beta-schema-trial-001` | SCHEMA_OK |
| `product-beta-rls-trial-001` | RLS_OK_STATIC_LIMITED |
| `product-beta-api-trial-001` | API_OK |
| `product-beta-workflow-trial-001` | WORKFLOW_OK |
| `product-beta-security-trial-001` | SECURITY_OK |
| `product-beta-audit-trial-001` | AUDIT_OK |
| `product-beta-integrity-trial-001` | INTEGRITY_OK |
| `product-beta-pilot-trial-001` | PILOT_OK (8 cases, 39 events) |
| Engine validation v01 | PASS 39/39 |

## Build / Typecheck / Lint

| Check | Result |
|-------|--------|
| TypeScript typecheck | OK (0 errors) |
| Next.js build | OK |
| ESLint | OK (0 errors, 36 pre-existing warnings) |

## Integrity

| Asset | Status |
|-------|--------|
| Motor `engine-v0/` | UNCHANGED |
| Canonical tree | UNCHANGED |
| Baselines | UNCHANGED |
| Fixtures | UNCHANGED |
| Methodology | UNCHANGED |

## Remaining Limitations

- API smoke with real Next.js server + admin JWT: PENDING (not blocking pilot)
- UI browser smoke: PENDING (not blocking pilot)
- Real pilot with named admin users: PENDING (next phase)

## Final Decision

`SERA_VNEXT_PRODUCT_BETA_INTERNAL_READY_FOR_CONTROLLED_ADMIN_PILOT`

The database layer is fully validated. The Product Beta can proceed to
controlled internal pilot with named admin users, feature flags enabled per-tenant,
and mandatory human review for all analyses.
