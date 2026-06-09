-- SERA vNext: Additive provenance columns for engine runtime version, source flow,
-- and canonical tree version. Resolves the divergence between the DB contract version
-- (engine_version = 0.1.0, locked by the existing constraint) and the actual engine
-- runtime version (0.2.0) embedded in engine_output.engineVersion.
--
-- This migration is strictly additive. It does not alter existing constraints, drop
-- columns, or backfill historical rows with fabricated provenance data.
--
-- New analyses will carry full provenance. Existing rows will have NULL in the new
-- columns, which is the correct representation (their provenance was not tracked).
--
-- Rollback: DROP COLUMN each of the four columns added below.

-- sera_vnext_analyses provenance columns
alter table public.sera_vnext_analyses
  add column if not exists engine_runtime_version text null,
  add column if not exists source_flow text null,
  add column if not exists canonical_tree_version text null;

-- sera_vnext_analysis_revisions provenance columns (parallel tracking per revision)
alter table public.sera_vnext_analysis_revisions
  add column if not exists engine_runtime_version text null,
  add column if not exists source_flow text null;

-- Indices for provenance queries
create index if not exists sera_vnext_analyses_runtime_version_idx
  on public.sera_vnext_analyses(tenant_id, engine_runtime_version)
  where deleted_at is null;

create index if not exists sera_vnext_analyses_source_flow_idx
  on public.sera_vnext_analyses(tenant_id, source_flow)
  where deleted_at is null;

comment on column public.sera_vnext_analyses.engine_runtime_version is
  'Actual engine runtime version used (e.g. 0.2.0). Distinct from engine_version which carries the DB contract version (0.1.0). NULL for rows created before provenance tracking.';

comment on column public.sera_vnext_analyses.source_flow is
  'Origin flow that produced this analysis: VNEXT_PRODUCT_BETA, LEGACY_SERA, VNEXT_ALPHA, VNEXT_CANONICAL. NULL for rows created before provenance tracking.';

comment on column public.sera_vnext_analyses.canonical_tree_version is
  'Canonical tree version used for classification traversal (e.g. SERA_PT_V1). NULL for rows created before provenance tracking.';

comment on column public.sera_vnext_analysis_revisions.engine_runtime_version is
  'Actual engine runtime version for this revision. NULL for revisions created before provenance tracking.';

comment on column public.sera_vnext_analysis_revisions.source_flow is
  'Source flow for this revision. NULL for revisions created before provenance tracking.';
