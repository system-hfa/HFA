-- Tabela de histórico de edições manuais de análises SERA
CREATE TABLE IF NOT EXISTS public.analysis_edits (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id     UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    tenant_id       UUID NOT NULL,
    step_altered    TEXT NOT NULL,          -- '2','3','4','5','precondition'
    field_changed   TEXT NOT NULL,          -- 'perception_code', 'objective_code', etc.
    value_before    JSONB,
    value_after     JSONB,
    steps_recalculated  INTEGER[],
    steps_preserved     INTEGER[],
    reason          TEXT,                   -- justificativa opcional do usuário
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Coluna edit_count na tabela analyses para exibir banner
ALTER TABLE public.analyses
    ADD COLUMN IF NOT EXISTS edit_count   INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS edited_at    TIMESTAMPTZ;

-- RLS
ALTER TABLE public.analysis_edits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation" ON public.analysis_edits
    USING (tenant_id = (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::UUID);

-- Índice
CREATE INDEX IF NOT EXISTS idx_analysis_edits_analysis_id
    ON public.analysis_edits(analysis_id);
