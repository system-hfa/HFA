-- ──────────────────────────────────────────────────────────────────────────────
-- SERA: configuração de provedores de IA + colunas extras em analyses
-- ──────────────────────────────────────────────────────────────────────────────

-- Colunas adicionais para persistir edições manuais e metadata de IA
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS has_manual_edits BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS edit_history JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS ai_provider TEXT,
  ADD COLUMN IF NOT EXISTS ai_model TEXT;

-- Configurações de IA por usuário/tenant
CREATE TABLE IF NOT EXISTS public.ai_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  active_provider TEXT DEFAULT 'deepseek',
  deepseek_api_key TEXT,
  openai_api_key TEXT,
  anthropic_api_key TEXT,
  google_api_key TEXT,
  groq_api_key TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_ai_settings"
  ON public.ai_settings
  FOR ALL
  USING (auth.uid() = user_id);

-- Atualizar updated_at em UPDATE
CREATE OR REPLACE FUNCTION public.set_ai_settings_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_ai_settings_updated_at_trigger ON public.ai_settings;
CREATE TRIGGER set_ai_settings_updated_at_trigger
BEFORE UPDATE ON public.ai_settings
FOR EACH ROW
EXECUTE FUNCTION public.set_ai_settings_updated_at();

