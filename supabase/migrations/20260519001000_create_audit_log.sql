-- ──────────────────────────────────────────────────────────────
-- OPS v0.3-I-c: Tabela audit_log (mínimo de rastreabilidade)
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.audit_log (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Contexto de quem fez o quê
  tenant_id   UUID        NULL,
  user_id     UUID        NULL,
  request_id  TEXT        NULL,

  -- Tipo de evento auditado (ex: event_created, analysis_completed)
  event_type  TEXT        NOT NULL,

  -- Entidade afetada
  entity_type TEXT        NULL,
  entity_id   UUID        NULL,

  -- Contexto técnico da requisição
  route       TEXT        NULL,
  method      TEXT        NULL,

  -- Estado de conclusão do evento
  status      TEXT        NOT NULL DEFAULT 'success',

  -- Dados adicionais não sensíveis
  metadata    JSONB       NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT audit_log_event_type_nonempty CHECK (event_type <> ''),
  CONSTRAINT audit_log_status_values       CHECK (status IN ('success', 'partial', 'failed', 'blocked'))
);

COMMENT ON TABLE public.audit_log IS
  'Registro de eventos auditáveis do sistema HFA. Gravado exclusivamente via service role. Nunca armazenar relato, transcrição, tokens ou PII no campo metadata.';

COMMENT ON COLUMN public.audit_log.event_type IS
  'Tipo do evento. Ex: event_created, analysis_started, analysis_completed, analysis_partial, analysis_failed, corrective_action_created, report_generated.';

COMMENT ON COLUMN public.audit_log.request_id IS
  'Correlation ID do request HTTP que gerou o evento (x-request-id). Usado para correlação com logs de servidor.';

COMMENT ON COLUMN public.audit_log.metadata IS
  'Dados técnicos não sensíveis do evento. Nunca incluir: relato completo, transcrição, e-mail, tokens, secrets.';

-- ── Índices ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_audit_log_tenant_time
  ON public.audit_log(tenant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_log_request_id
  ON public.audit_log(request_id)
  WHERE request_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_audit_log_event_type_time
  ON public.audit_log(event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_log_entity
  ON public.audit_log(entity_type, entity_id)
  WHERE entity_type IS NOT NULL;

-- ── RLS ──────────────────────────────────────────────────────
-- audit_log é acessível exclusivamente via service role (server-side).
-- A policy abaixo bloqueia todo acesso direto por client role.
-- Service role ignora RLS por definição no Supabase.

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_log_service_role_only"
  ON public.audit_log
  FOR ALL
  USING (false)
  WITH CHECK (false);
