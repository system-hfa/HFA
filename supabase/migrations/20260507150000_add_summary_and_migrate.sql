-- ──────────────────────────────────────────────────────────────────────────────
-- Migration: add summary/flow/structured columns + migrate old PT→EN JSONB data
-- Run in Supabase SQL Editor
-- ──────────────────────────────────────────────────────────────────────────────

-- 1) Add missing columns
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS summary              TEXT,
  ADD COLUMN IF NOT EXISTS perception_flow      JSONB,
  ADD COLUMN IF NOT EXISTS objective_flow       JSONB,
  ADD COLUMN IF NOT EXISTS action_flow          JSONB,
  ADD COLUMN IF NOT EXISTS event_date           TEXT,
  ADD COLUMN IF NOT EXISTS event_location       TEXT,
  ADD COLUMN IF NOT EXISTS occupants_count      TEXT,
  ADD COLUMN IF NOT EXISTS flight_phase         TEXT,
  ADD COLUMN IF NOT EXISTS weather_conditions   TEXT,
  ADD COLUMN IF NOT EXISTS systems_involved     TEXT;


-- ──────────────────────────────────────────────────────────────────────────────
-- 2) Backup before migration
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.analyses_backup_pt_en AS
  SELECT * FROM public.analyses;


-- ──────────────────────────────────────────────────────────────────────────────
-- 3) Migrate preconditions: {codigo, descricao, evidencia_no_relato} → {code, name, justification}
--    Only rows where the first element still has the old PT key "codigo"
-- ──────────────────────────────────────────────────────────────────────────────
UPDATE public.analyses
SET preconditions = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'code',          COALESCE(item->>'codigo',           item->>'code',          ''),
      'name',          COALESCE(item->>'descricao',        item->>'name',          ''),
      'justification', COALESCE(item->>'evidencia_no_relato', item->>'justification', ''),
      'etapa',         COALESCE(item->>'etapa', '')
    )
  )
  FROM jsonb_array_elements(preconditions) AS item
)
WHERE
  preconditions IS NOT NULL
  AND jsonb_array_length(preconditions) > 0
  AND (preconditions->0->>'codigo') IS NOT NULL;   -- only rows with old PT keys


-- ──────────────────────────────────────────────────────────────────────────────
-- 4) Migrate recommendations: {acao, falha_relacionada, justificativa} → {title, related_code, description}
-- ──────────────────────────────────────────────────────────────────────────────
UPDATE public.analyses
SET recommendations = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'title',        COALESCE(item->>'acao',             item->>'title',       ''),
      'related_code', COALESCE(item->>'falha_relacionada', item->>'related_code', ''),
      'description',  COALESCE(item->>'justificativa',    item->>'description', '')
    )
  )
  FROM jsonb_array_elements(recommendations) AS item
)
WHERE
  recommendations IS NOT NULL
  AND jsonb_array_length(recommendations) > 0
  AND (recommendations->0->>'acao') IS NOT NULL;   -- only rows with old PT keys


-- ──────────────────────────────────────────────────────────────────────────────
-- 5) Backfill `summary` from event_summary for rows that don't have it yet
-- ──────────────────────────────────────────────────────────────────────────────
UPDATE public.analyses
SET summary = event_summary
WHERE summary IS NULL AND event_summary IS NOT NULL;


-- Verify
SELECT
  id,
  (preconditions->0->>'code')        AS pre_code_sample,
  (recommendations->0->>'title')     AS rec_title_sample,
  LEFT(summary, 60)                  AS summary_preview
FROM public.analyses
LIMIT 10;
