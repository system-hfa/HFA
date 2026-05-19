-- ────────────────────────────────────────────────────────────────────────────
-- OPS v0.3-I-a — Campos de rastreabilidade e completude em analyses
-- ────────────────────────────────────────────────────────────────────────────

-- motor_version: versão do motor SERA que produziu a análise.
-- Formato: 'sera-vX.Y.Z-LETRA+<commit_hash_curto>'
-- NULL para análises históricas (pré-v0.3-I).
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS motor_version TEXT;

COMMENT ON COLUMN public.analyses.motor_version IS
  'Versão do motor SERA que produziu esta análise. Formato: sera-vX.Y.Z-LETRA+hash. NULL = pré-v0.3-I.';

-- analysis_completeness: estado de completude da classificação P/O/A/ERC.
-- complete  → P, O, A e ERC preenchidos e válidos.
-- partial   → pelo menos um de P/O/A/ERC é null ou fora do conjunto permitido.
-- failed    → pipeline lançou exceção (events.status=failed reflete isso).
-- blocked   → impedimento explícito antes da execução do pipeline.
-- NULL para análises históricas.
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS analysis_completeness TEXT
    CHECK (analysis_completeness IN ('complete', 'partial', 'failed', 'blocked'));

COMMENT ON COLUMN public.analyses.analysis_completeness IS
  'Estado de completude da classificação SERA. complete/partial/failed/blocked. NULL = pré-v0.3-I.';

-- completeness_reason: motivo textual quando analysis_completeness != complete.
-- Ex: "Campos ausentes ou inválidos: perception_code, erc_level"
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS completeness_reason TEXT;

COMMENT ON COLUMN public.analyses.completeness_reason IS
  'Detalhe do motivo de incompletude. Preenchido quando analysis_completeness = partial ou failed.';

-- Índice para facilitar queries de análises incompletas por tenant.
CREATE INDEX IF NOT EXISTS idx_analyses_completeness
  ON public.analyses(tenant_id, analysis_completeness)
  WHERE analysis_completeness IS NOT NULL;
