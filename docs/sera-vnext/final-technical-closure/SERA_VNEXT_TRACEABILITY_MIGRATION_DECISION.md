# SERA vNext — Traceability Migration Decision

**Date**: 2026-06-09
**Migration**: `20260519000000_add_traceability_fields.sql`

## Migration Analysis

### What it does
Adds three columns to `public.analyses`:
- `motor_version TEXT` — SERA engine version tag
- `analysis_completeness TEXT` — completeness state (complete/partial/failed/blocked)
- `completeness_reason TEXT` — reason when not complete
- Plus a partial index on `(tenant_id, analysis_completeness)`

### Safety assessment
- Uses `ADD COLUMN IF NOT EXISTS` — idempotent, safe to re-run
- Uses `CREATE INDEX IF NOT EXISTS` — idempotent
- No DROP, no data loss, no backfill
- Columns are nullable (NULL for historical rows)
- CHECK constraint on `analysis_completeness` only validates non-null values

### Current state
- Migration file exists in `supabase/migrations/`
- NOT applied to remote Supabase instance (`czwlmdsibwnclarqgjqo`)
- Code in `pipeline.ts:2373-2375` writes these columns on INSERT
- `complete-sera-analysis.ts` has runtime fallback: retries upsert without these columns if schema mismatch detected
- Local Supabase (Docker) not available during this phase

### Compatibility with later migrations
- `20260607135727_sera_vnext_product_beta.sql` — creates separate `sera_vnext_analyses` table (different table, no conflict)
- `20260608190000_risk_profile_exclusions.sql` — creates `risk_profile_exclusions` (different table)
- `20260608210000_sera_vnext_provenance_columns.sql` — adds columns to `sera_vnext_analyses` (different table)

No conflict with any later migration.

## Decision

**Status: APPLY_MIGRATION_AS_IS**

### Rationale
1. Migration is safe, additive, and idempotent
2. Code already writes these columns (with runtime fallback)
3. No conflict with any later migration
4. Legacy pipeline benefits from traceability metadata
5. Not blocking for candidate-only pilot (fallback handles missing columns)

### Action required
Apply to remote Supabase instance before production deployment:
```bash
supabase db push
```

Or execute via Supabase SQL Editor:
```sql
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS motor_version TEXT;
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS analysis_completeness TEXT;
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS completeness_reason TEXT;
```

### Pre-requisites
- Database password for remote instance
- Or Supabase CLI authenticated with management API access
