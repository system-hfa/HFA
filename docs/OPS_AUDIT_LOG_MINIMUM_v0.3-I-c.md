# OPS Audit Log Mínimo — v0.3-I-c

**Versão:** v0.3-I-c
**Data:** 2026-05-19
**Branch base:** main @ `00be4324`
**Tipo:** Implementação incremental — audit_log mínimo

---

## 1. Objetivo

Implementar rastreabilidade estruturada mínima das operações críticas do sistema HFA, permitindo:
- Saber quem criou um evento, quando e por qual rota.
- Saber quando uma análise SERA foi iniciada, completada, parcial ou falhou.
- Saber quando uma ação corretiva foi criada.
- Saber quando um relatório formal foi gerado.
- Correlacionar todos esses eventos com o `request_id` da fase I-b.

---

## 2. Escopo implementado

| Item | Implementado |
|---|---|
| Tabela `audit_log` | ✓ Migration criada |
| Helper `writeAuditLog` | ✓ `frontend/src/lib/observability/audit.ts` |
| Evento `event_created` | ✓ `POST /api/events` e `POST /api/analyze` |
| Evento `analysis_started` | ✓ `POST /api/events` e `POST /api/analyze` |
| Evento `analysis_completed` | ✓ `POST /api/events` e `POST /api/analyze` |
| Evento `analysis_partial` | ✓ `POST /api/events` e `POST /api/analyze` |
| Evento `analysis_failed` | ✓ `POST /api/events` e `POST /api/analyze` |
| Evento `corrective_action_created` | ✓ `POST /api/actions` |
| Evento `report_generated` | ✓ `GET /api/analyses/[analysisId]/pdf` |

---

## 3. Fora de escopo desta fase

- `classification_overridden` — a rota de override (`/api/analyses/[analysisId]/edits`) não foi instrumentada nesta fase; o tipo está reservado no helper.
- Audit trail visual / página de auditoria.
- Export de auditoria.
- Retenção automática de registros.
- Política avançada de PII (ex: hashing de e-mail, pseudonimização).
- Before/after state completo.
- Rotas `/api/admin/*`, `/api/auth/*`, `/api/settings/*`.
- `analysis_edits` — já existe tabela dedicada para edições manuais.
- Migration remota / deploy — a migration é local; aplicação em produção é responsabilidade do processo de deploy.

---

## 4. Migration criada

**Arquivo:** `supabase/migrations/20260519001000_create_audit_log.sql`

Criada mas **não aplicada remotamente**. Será aplicada no próximo deploy.

---

## 5. Schema de `audit_log`

```sql
CREATE TABLE public.audit_log (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL    DEFAULT now(),

  -- Contexto de quem fez o quê
  tenant_id   UUID        NULL,
  user_id     UUID        NULL,
  request_id  TEXT        NULL,

  -- Tipo de evento auditado
  event_type  TEXT        NOT NULL,

  -- Entidade afetada
  entity_type TEXT        NULL,
  entity_id   UUID        NULL,

  -- Contexto da requisição
  route       TEXT        NULL,
  method      TEXT        NULL,

  -- Estado de conclusão
  status      TEXT        NOT NULL DEFAULT 'success',

  -- Dados adicionais não sensíveis
  metadata    JSONB       NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT audit_log_event_type_nonempty CHECK (event_type <> ''),
  CONSTRAINT audit_log_status_values
    CHECK (status IN ('success', 'partial', 'failed', 'blocked'))
);
```

---

## 6. Índices

| Índice | Colunas | Condição | Uso |
|---|---|---|---|
| `idx_audit_log_tenant_time` | `(tenant_id, created_at DESC)` | — | Listar eventos por organização |
| `idx_audit_log_request_id` | `(request_id)` | `WHERE request_id IS NOT NULL` | Correlação com logs HTTP |
| `idx_audit_log_event_type_time` | `(event_type, created_at DESC)` | — | Filtrar por tipo de evento |
| `idx_audit_log_entity` | `(entity_type, entity_id)` | `WHERE entity_type IS NOT NULL` | Histórico de uma entidade |

---

## 7. RLS / Política aplicada

```sql
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_log_service_role_only"
  ON public.audit_log
  FOR ALL
  USING (false)
  WITH CHECK (false);
```

**Rationale:** A policy bloqueia todo acesso direto por client role (anon, authenticated). O service role do Supabase ignora RLS por definição — toda gravação via `getSupabaseAdmin()` é permitida. Clientes não têm acesso direto ao `audit_log`.

**Limitação documentada:** Enquanto não houver uma rota admin de leitura do audit_log, os dados só são consultáveis via Supabase Studio / service role. Isso é intencional para a fase I-c.

---

## 8. Helper criado

**Arquivo:** `frontend/src/lib/observability/audit.ts`

### Tipo `AuditEventType`

```ts
type AuditEventType =
  | 'event_created'
  | 'analysis_started'
  | 'analysis_completed'
  | 'analysis_partial'
  | 'analysis_failed'
  | 'corrective_action_created'
  | 'report_generated'
  | 'classification_overridden'  // reservado
```

### Função `writeAuditLog(params: WriteAuditLogParams): Promise<void>`

- **Best-effort**: nunca lança exceção.
- Em caso de falha: `console.error('[audit] insert failed', { requestId, eventType, error })`.
- Em exceção inesperada: `console.error('[audit] unexpected error', ...)`.
- Limpa `metadata`: remove `undefined` e `null` antes de inserir.
- Usa `getSupabaseAdmin()` internamente (service role — bypassa RLS).

---

## 9. Eventos implementados

| Evento | Rota(s) | Quando é gravado |
|---|---|---|
| `event_created` | `POST /api/events`, `POST /api/analyze` | Após insert bem-sucedido do evento |
| `analysis_started` | `POST /api/events`, `POST /api/analyze` | Após débito de crédito, antes do pipeline |
| `analysis_completed` | `POST /api/events`, `POST /api/analyze` | Após pipeline concluir com `completeness = 'complete'` |
| `analysis_partial` | `POST /api/events`, `POST /api/analyze` | Após pipeline concluir com `completeness = 'partial'` (ou null legado) |
| `analysis_failed` | `POST /api/events`, `POST /api/analyze` | No catch do pipeline |
| `corrective_action_created` | `POST /api/actions` | Após insert bem-sucedido da ação corretiva |
| `report_generated` | `GET /api/analyses/[analysisId]/pdf` | Após PDF gerado, antes de retornar o bytes |

---

## 10. Rotas instrumentadas

| Rota | Arquivo | Eventos gravados |
|---|---|---|
| `POST /api/events` | `frontend/src/app/api/events/route.ts` | `event_created`, `analysis_started`, `analysis_completed`, `analysis_partial`, `analysis_failed` |
| `POST /api/analyze` | `frontend/src/app/api/analyze/route.ts` | `event_created` (nova análise), `analysis_started`, `analysis_completed`, `analysis_partial`, `analysis_failed` |
| `POST /api/actions` | `frontend/src/app/api/actions/route.ts` | `corrective_action_created` |
| `GET /api/analyses/[analysisId]/pdf` | `frontend/src/app/api/analyses/[analysisId]/pdf/route.ts` | `report_generated` |

---

## 11. Metadados gravados por evento

| Evento | `metadata` |
|---|---|
| `event_created` | `{ source_type }` |
| `analysis_started` | `{ source }` (ex: `'new_event'`, `'new_analysis'`, `'reanalysis'`) |
| `analysis_completed` | `{ motor_version, analysis_completeness, completeness_reason, event_id }` |
| `analysis_partial` | `{ motor_version, analysis_completeness, completeness_reason, event_id }` |
| `analysis_failed` | `{ stage }` ou `{ source }` (sem mensagem de erro — evitar vazar stack trace em JSONB) |
| `corrective_action_created` | `{ analysis_id }` |
| `report_generated` | `{ report_type: 'analysis_pdf', analysis_completeness, motor_version }` |

---

## 12. Cuidados de PII

- **Nunca** gravado em `metadata`: relato completo (`raw_input`), transcrição, e-mail, tokens JWT/API, stacks completos de erro com dados de usuário.
- `tenant_id` e `user_id` são UUIDs internos — não PII direta.
- `request_id` é UUID gerado ou valor sanitizado (I-b) — sem PII.
- Erros de pipeline: apenas gravado `{ stage }` ou `{ source }`, sem mensagem de erro do LLM.
- `entity_id`: apenas UUID do registro afetado.
- `analysis_completeness`, `motor_version`, `completeness_reason`: campos técnicos de classificação — não PII.

---

## 13. Relação com `request_id` (fase I-b)

O campo `audit_log.request_id` é preenchido com o mesmo `requestId` gerado/recebido em cada handler. Isso permite:

```sql
-- Encontrar todos os eventos de auditoria de uma requisição específica:
SELECT * FROM audit_log WHERE request_id = 'uuid-do-request';

-- Correlacionar com logs de servidor:
-- Os logs de console.error dos handlers também incluem requestId.
```

---

## 14. Testes executados

| Teste | Resultado |
|---|---|
| `npx tsc --noEmit` | ✓ Sem erros |
| Gate causal SERA N=1 (14 fixtures) | ✓ 14/14 PASS |
| Smoke global | Não executado (fora de escopo) |
| Migration aplicada remotamente | Não executada — local apenas |

---

## 15. Limitações conhecidas

1. **Migration não aplicada em produção**: o banco de produção ainda não tem a tabela `audit_log`. Gravações via helper falharão silenciosamente (best-effort) até o próximo deploy.

2. **`classification_overridden` não instrumentado**: a rota de edição manual (`/api/analyses/[analysisId]/edits`) não foi alterada nesta fase. O tipo está reservado no `AuditEventType`.

3. **Sem before/after state**: `metadata` contém apenas estado final, não estado anterior. Para edições, `analysis_edits` já registra `value_before`/`value_after`.

4. **Sem leitura do audit_log por API**: não há rota GET de consulta. Dados acessíveis apenas via Supabase Studio / service role diretamente.

5. **Erro de pipeline sem detalhe**: `analysis_failed` não inclui a mensagem de erro no `metadata` para evitar vazar dados sensíveis em JSONB persistido. O erro completo está nos logs de servidor com `requestId` para correlação.

6. **`entity_id` pode ser null em `analysis_started`**: no momento em que `analysis_started` é gravado, o `analysisId` ainda não existe. O `entity_id` nesse caso é o `eventId` (entity_type = 'event').

---

## 16. Próxima fase recomendada

**OPS v0.3-I-d — Hardening do bootstrap OAuth (`ensure-tenant.ts`)**

Conforme plan v0.3-I seção 8:
- O catch vazio em `ensure-tenant.ts` silencia falhas de lógica (ex: tenant não criado, JWT sem `tenant_id`).
- Diferenciar: falha de rede (tolerável) vs. falha de lógica (intoleráve — deve exibir mensagem ao usuário).
- Adicionar logging mínimo no cliente para o caso de falha do bootstrap.
- Gravar `tenant.bootstrap_failed` no audit_log quando aplicável.
