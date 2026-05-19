# OPS Traceability P0 — Implementation Plan v0.3-I

**Versão:** v0.3-I
**Data:** 2026-05-19
**Fase:** PRODUCT/OPS — Traceability P0
**Branch base:** main @ `884d8841`
**Tipo:** DOCS-ONLY — nenhum código ou schema foi alterado

---

## 1. Objetivo

Definir o plano técnico cirúrgico para implementar os quatro P0 de rastreabilidade e completude identificados na fase v0.3-H, sem alterar o motor SERA nem as fixtures de teste.

O objetivo não é observabilidade completa — é eliminar os quatro pontos onde o sistema hoje:
- persiste análises sem identidade metodológica rastreável (`motor_version`);
- persiste análises incompletas silenciosamente (`analysis_completeness`);
- não registra quem fez o quê (`audit_log`);
- silencia falhas de bootstrap de tenant (`ensure-tenant`).

---

## 2. Escopo

| Item | Inclui |
|---|---|
| P0-001 | Campo `motor_version` em `analyses` |
| P0-002 | Campo `analysis_completeness` em `analyses` |
| P0-003 | Tabela `audit_log` com eventos mínimos da Fase I |
| P0-004 | Hardening do bootstrap silencioso (`ensure-tenant.ts`) |

---

## 3. Fora de escopo desta fase

- Logging estruturado completo com `request_id` (P1 — fase I-b)
- AI Insight persistência (P1)
- Métricas de custo/token por chamada LLM (P1)
- Audit trail de settings/AI (P2)
- Sistema de re-análise automática de eventos `failed` (P2)
- Sincronização trial/créditos (P2)
- Qualquer alteração no motor SERA (`all-steps.ts`, `pipeline.ts`, `rules/`)
- Qualquer alteração em fixtures ou baseline
- Alterações em billing/Stripe
- Alterações em Risk Profile

---

## 4. Estado Atual Observado

### 4.1 Tabela `analyses` — colunas existentes

Baseado na leitura das migrations (`20260507105001_initial_schema.sql` + subsequentes):

```
id, event_id, tenant_id,
event_summary, escape_point, unsafe_agent, unsafe_act,
perception_code, perception_name, perception_justification, perception_discarded,
objective_code, objective_name, objective_justification, objective_discarded,
action_code, action_name, action_justification, action_discarded,
conclusions, recommendations, preconditions,
erc_level, erc_label, erc_rationale, erc_technical_barriers,
erc_procedural_barriers, erc_hfa_adjustment,
has_manual_edits, edit_history, ai_provider, ai_model,
source_type, source_file_name, source_word_count, source_file_url,
pdf_url, raw_llm_output,
created_at, updated_at
```

**Ausentes:**
- `motor_version` — não existe
- `analysis_completeness` — não existe

### 4.2 Função `buildAnalysisUpsertPayload` (`pipeline.ts`)

Constrói o payload para upsert em `analyses`. Não inclui `motor_version` nem `analysis_completeness`. Não valida se `p3/p4/p5` são null antes de gravar.

### 4.3 Orquestrador `complete-sera-analysis.ts`

Sequência atual:
1. `events.status = 'processing'`
2. `runSeraPipeline(rawInput)` → `steps`
3. `buildAnalysisUpsertPayload(...)` → `payload`
4. `admin.from('analyses').upsert(payload)` — sem checagem de completude pós-pipeline
5. Upload de arquivo (se existir)
6. `events.status = 'completed', credits_used = 1`

**Não detecta** se `steps.step3.codigo`, `steps.step4.codigo` ou `steps.step5.codigo` são null/inválidos após o pipeline.

### 4.4 Bootstrap OAuth — `ensure-tenant.ts` (cliente)

```ts
try {
  // ... chama /auth/bootstrap
  if (!localRes.ok) throw new Error('bootstrap failed')
  await supabase.auth.refreshSession()
} catch {
  /* backend indisponível ou offline — evita bloquear a UI */
}
```

O catch vazio silencia tanto falhas de rede (tolerável) quanto falhas de lógica (intoleráveis). Se o bootstrap falhou porque o tenant não foi criado, o usuário continua sem `tenant_id` no JWT — e todas as rotas subsequentes retornarão 403.

### 4.5 Rota `/api/auth/oauth/bootstrap` (servidor)

Tem tratamento de erros explícito (retorna 500 com mensagem). O problema está exclusivamente no **cliente** (`ensure-tenant.ts`), que não diferencia os casos de catch.

### 4.6 Tabela `audit_log`

Não existe em nenhuma migration. Nenhuma inserção de audit trail observada no código.

---

## 5. P0-001 — `motor_version` em `analyses`

### 5.1 Problema

Cada análise gravada em `analyses` é produzida por uma versão específica do motor SERA, mas essa versão não é registrada. Consequências:
- Impossível identificar quais análises foram produzidas por versões com bugs conhecidos (ex: A-G espúrio corrigido em v0.1.3-B).
- Impossível auditar impacto de regressões ou correções retroativamente.
- Relatórios formais não têm referência metodológica.

### 5.2 Impacto

| Aspecto | Impacto |
|---|---|
| Rastreabilidade | Crítico — análises são decisões com implicações de segurança |
| Auditoria | Impossível cumprir regra de ouro sem versão metodológica |
| Reprocessamento | Impossível identificar quais análises precisam re-análise pós-correção |

### 5.3 Proposta de Schema

```sql
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS motor_version TEXT;

COMMENT ON COLUMN public.analyses.motor_version IS
  'Versão do motor SERA que produziu esta análise. Ex: "v0.1.3-C". Preenchido por buildAnalysisUpsertPayload.';
```

### 5.4 Constante de versionamento sugerida

Criar constante em `frontend/src/lib/sera/pipeline.ts`:

```ts
export const SERA_MOTOR_VERSION = 'v0.1.3-C'
```

O valor deve seguir o padrão de versionamento já usado nos documentos internos (vX.Y.Z-LETRA). Decisão pendente sobre o formato exato — ver Seção 15.

### 5.5 Onde preencher

Em `buildAnalysisUpsertPayload` (`frontend/src/lib/sera/pipeline.ts`):

```ts
import { SERA_MOTOR_VERSION } from './pipeline'  // próprio arquivo
// ...
return {
  // ... campos existentes
  motor_version: SERA_MOTOR_VERSION,
}
```

Isso garante que toda análise nova carrega a versão. Análises existentes ficarão com `motor_version = null` — aceitável para histórico.

### 5.6 Como exibir/auditar

- UI: exibir no rodapé do relatório individual (`SERA Motor ${motor_version}`).
- API: incluir `motor_version` no response de `GET /api/analyses/[analysisId]`.
- Auditoria: campo obrigatório no schema do `audit_log` para `analysis.completed`.

### 5.7 Migration necessária

```sql
-- Migration: add_motor_version_to_analyses.sql
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS motor_version TEXT;
```

Sem valor default (null para análises históricas é semanticamente correto).

### 5.8 Risco

| Risco | Mitigação |
|---|---|
| Breaking change na UI | Nenhum — campo novo, null tolerado pela UI |
| Breaking change na API | Nenhum — campo adicional no response |
| Incompatibilidade com upsert | Nenhuma — `onConflict: 'event_id'` apenas atualiza campos presentes no payload |
| Análises históricas sem versão | Aceitável — documentar que `motor_version IS NULL` significa "pré-v0.3-I" |

### 5.9 Testes necessários

- Smoke SERA pós-deploy: verificar que `analyses.motor_version` é preenchido em nova análise.
- Verificar que análises históricas com `motor_version = null` não quebram a UI/API.
- Gate causal: não é afetado (motor não alterado).

---

## 6. P0-002 — `analysis_completeness`

### 6.1 Problema

O pipeline SERA pode retornar análises onde um ou mais de `perception_code`, `objective_code`, `action_code` são null (ex: LLM retornou código fora do conjunto válido e os fallbacks de inferência também falharam). Atualmente:
- O upsert ocorre sem checagem.
- O evento é marcado como `status = 'completed'` com `credits_used = 1`.
- O usuário vê a análise como completa.
- Relatórios formais podem ser gerados com campos críticos ausentes.

### 6.2 Quando uma análise é completa

Uma análise SERA é **completa** quando:
1. `perception_code` IN (P-A..P-H) — não null
2. `objective_code` IN (O-A..O-D) — não null
3. `action_code` IN (A-A..A-J) — não null
4. `erc_level` IS NOT NULL e entre 1 e 5

Uma análise é **parcial** quando os campos acima existem mas pelo menos um é null ou fora do conjunto esperado.

Uma análise é **failed** quando o pipeline lançou exceção (já tratado por `events.status = 'failed'`).

Uma análise é **blocked** quando foi criada mas há impedimento explícito para completar (ex: quota excedida após insert — cenário raro mas possível).

### 6.3 Estados sugeridos

```
complete   — P, O, A, ERC todos preenchidos e válidos
partial    — pelo menos um de P/O/A/ERC é null ou inválido
failed     — pipeline lançou exceção (events.status já reflete isso)
blocked    — análise criada mas impedimento explícito de completar
```

### 6.4 Schema proposto

```sql
ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS analysis_completeness TEXT
    CHECK (analysis_completeness IN ('complete', 'partial', 'failed', 'blocked'));

COMMENT ON COLUMN public.analyses.analysis_completeness IS
  'Estado de completude da classificação SERA. complete: P/O/A/ERC preenchidos; partial: algum campo nulo/inválido; failed: pipeline lançou exceção; blocked: impedimento explícito.';
```

### 6.5 Como detectar P/O/A/ERC null

Em `complete-sera-analysis.ts`, após `runSeraPipeline`:

```ts
const { step3, step4, step5, step6_7 } = steps

const VALID_P = new Set(['P-A','P-B','P-C','P-D','P-E','P-F','P-G','P-H'])
const VALID_O = new Set(['O-A','O-B','O-C','O-D'])
const VALID_A = new Set(['A-A','A-B','A-C','A-D','A-E','A-F','A-G','A-H','A-I','A-J'])

const isComplete =
  VALID_P.has(step3.codigo) &&
  VALID_O.has(step4.codigo) &&
  VALID_A.has(step5.codigo) &&
  typeof step6_7.erc_level === 'number' &&
  step6_7.erc_level >= 1 &&
  step6_7.erc_level <= 5

const completeness = isComplete ? 'complete' : 'partial'
```

O campo `analysis_completeness` é então incluído no payload de upsert.

### 6.6 Como bloquear relatório formal

Relatório formal (PDF individual, relatório executivo exportado) não deve ser gerado se `analysis_completeness !== 'complete'`.

Em `frontend/src/app/api/analyses/[analysisId]/pdf/route.ts`:

```ts
// Verificação a adicionar após fetch da análise:
if (analysis.analysis_completeness && analysis.analysis_completeness !== 'complete') {
  return jsonError(
    'Análise incompleta — relatório formal indisponível. Reprocesse o evento.',
    422
  )
}
```

Decisão pendente: bloquear automaticamente ou apenas avisar? Ver Seção 15.

### 6.7 Como mostrar ao usuário

| Estado | O que mostrar |
|---|---|
| `complete` | Análise normal |
| `partial` | Banner amarelo: "Classificação incompleta — alguns campos não foram gerados. Reprocesse ou edite manualmente." |
| `failed` | Já tratado por `events.status = 'failed'` |
| `blocked` | Mensagem de suporte |

### 6.8 Testes necessários

- Testar com relato intencionalmente vazio/curto que force P/O/A null e verificar que `analysis_completeness = 'partial'` é gravado.
- Verificar que análise completa resulta em `analysis_completeness = 'complete'`.
- Verificar bloqueio de PDF para análise parcial (se implementado).
- Smoke global: não deve regredir fixtures existentes.

---

## 7. P0-003 — `audit_log`

### 7.1 Problema

Nenhum registro estruturado de quem fez o quê, quando. Consequências:
- Impossível auditar quem criou/editou uma análise em investigação regulatória.
- Impossível rastrear exportações de relatório.
- Impossível detectar uso indevido ou acesso não autorizado retroativamente.

### 7.2 Proposta de tabela

```sql
CREATE TABLE IF NOT EXISTS public.audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id   UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  object_type     TEXT NOT NULL,
  object_id       UUID,
  action          TEXT NOT NULL,
  before_state    JSONB,
  after_state     JSONB,
  reason          TEXT,
  source          TEXT NOT NULL DEFAULT 'api',
  request_id      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_log_org_time
  ON public.audit_log(organization_id, created_at DESC);

CREATE INDEX idx_audit_log_object
  ON public.audit_log(object_type, object_id);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Apenas service role pode inserir/ler audit_log (sem acesso direto por cliente)
CREATE POLICY "service_role_only_audit_log"
  ON public.audit_log
  FOR ALL
  USING (false)
  WITH CHECK (false);
```

A RLS bloqueia todos os acessos diretos por cliente. Inserções e leituras são feitas exclusivamente via `supabase-admin` (service role).

### 7.3 Campos mínimos

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | PK |
| `actor_user_id` | UUID | auth user_id de quem executou a ação |
| `organization_id` | UUID | tenant_id |
| `object_type` | TEXT | `'event'`, `'analysis'`, `'corrective_action'`, `'report'`, `'tenant'`, `'user'`, `'ai_settings'` |
| `object_id` | UUID | ID do objeto afetado (null para ações globais) |
| `action` | TEXT | Ver lista de eventos abaixo |
| `before_state` | JSONB | Estado anterior — apenas campos relevantes, nunca relato completo |
| `after_state` | JSONB | Novo estado — apenas campos relevantes |
| `reason` | TEXT | Obrigatório para `classification_overridden`; opcional demais |
| `source` | TEXT | `'api'`, `'admin'`, `'system'` |
| `request_id` | TEXT | Correlation ID (null até que P1 seja implementado) |
| `created_at` | TIMESTAMPTZ | Timestamp do evento |

### 7.4 Eventos mínimos — Fase I

| Evento (`action`) | `object_type` | `before_state` | `after_state` | Onde inserir |
|---|---|---|---|---|
| `event.created` | `event` | null | `{title, status, input_type}` | `/api/events` POST, após insert |
| `analysis.started` | `analysis` | null | `{event_id, motor_version}` | `complete-sera-analysis.ts`, antes do pipeline |
| `analysis.completed` | `analysis` | null | `{analysis_id, completeness, motor_version, perception_code, objective_code, action_code, erc_level}` | `complete-sera-analysis.ts`, após upsert |
| `analysis.partial` | `analysis` | null | `{analysis_id, completeness: 'partial', null_fields}` | `complete-sera-analysis.ts`, quando `completeness = 'partial'` |
| `analysis.failed` | `analysis` | null | `{event_id, stage, error_message}` | `/api/events` POST, bloco catch |
| `classification.overridden` | `analysis` | `{field, old_value}` | `{field, new_value}` | `reason` obrigatório | `/api/analyses/[analysisId]/edits` (já existe `analysis_edits`; adicionar aqui também) |
| `corrective_action.created` | `corrective_action` | null | `{title, related_failure, analysis_id}` | `/api/actions` POST |
| `report.pdf_exported` | `report` | null | `{analysis_id, file_name}` | `/api/analyses/[analysisId]/pdf` GET |

### 7.5 Política de before/after

- `before_state` e `after_state` contêm apenas os campos relevantes para o evento — não o objeto completo.
- **Nunca** incluir `raw_input` completo, `raw_llm_output`, nem chaves de API.
- Para `classification.overridden`: `before_state = {perception_code, objective_code, action_code, erc_level}` e `after_state` igual com os novos valores.
- Para `report.pdf_exported`: sem before/after de conteúdo; apenas metadata (`analysis_id`, `file_name`, `user_id`).

### 7.6 PII

- Não logar `raw_input` (relato sensível de evento de segurança).
- Não logar chaves de API em nenhuma circunstância.
- Não logar `email` de usuário — usar apenas `actor_user_id` (UUID interno).
- `full_name` pode ser incluído em `after_state` de `tenant.created` apenas se necessário para suporte — avaliar por caso.

### 7.7 Retenção sugerida

Decisão pendente — ver Seção 15. Recomendação técnica: 7 anos para dados de segurança operacional (padrão aeronáutico ICAO Annex 13), configurável por tenant enterprise.

### 7.8 Testes necessários

- Verificar inserção em `audit_log` após criação de evento.
- Verificar inserção após análise completa e parcial.
- Verificar inserção após exportação de PDF.
- Verificar que RLS bloqueia leitura direta de cliente.
- Verificar que `before_state`/`after_state` não contêm `raw_input` nem chaves.

---

## 8. P0-004 — Tenant/Bootstrap silencioso

### 8.1 Problema

`frontend/src/lib/ensure-tenant.ts` tem catch vazio:

```ts
} catch {
  /* backend indisponível ou offline — evita bloquear a UI */
}
```

O comentário justifica engolir erros de rede (razoável para progressive enhancement). Mas o mesmo catch também engole:
- `bootstrap failed` — o servidor respondeu com erro (tenant não foi criado).
- Falhas de `supabase.auth.refreshSession()` — JWT não atualizado com `tenant_id`.

Resultado: usuário vê o dashboard, tenta criar um evento, recebe 403 sem explicação.

### 8.2 Onde ocorre

Arquivo: `frontend/src/lib/ensure-tenant.ts`
Função: `ensureOAuthTenant()`
Ponto exato: bloco `catch { }` após `fetch('/auth/bootstrap')`.

A rota de servidor `/api/auth/oauth/bootstrap` tem tratamento de erros adequado — o problema está exclusivamente no cliente.

### 8.3 Proposta de tratamento

Diferenciar os dois casos de falha:

```ts
export async function ensureOAuthTenant(): Promise<{ ok: boolean; error?: string }> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return { ok: false, error: 'NO_SESSION' }
  const meta = session.user.user_metadata as Record<string, unknown> | undefined
  if (meta?.tenant_id) return { ok: true }

  try {
    const localRes = await fetch(resolveApiUrl('/auth/bootstrap'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: '{}',
    })

    if (!localRes.ok) {
      // Servidor respondeu com erro — bootstrap falhou de forma definida.
      // Deve ser reportado ao usuário.
      const body = await localRes.json().catch(() => ({}))
      return { ok: false, error: body?.detail || 'BOOTSTRAP_FAILED' }
    }

    await supabase.auth.refreshSession()
    return { ok: true }
  } catch {
    // Rede indisponível — tolerável. O usuário pode tentar novamente.
    return { ok: false, error: 'NETWORK_ERROR' }
  }
}
```

### 8.4 Mensagem ao usuário por tipo de erro

| Código | Mensagem sugerida (PT) |
|---|---|
| `BOOTSTRAP_FAILED` | "Não foi possível configurar sua organização. Tente fazer logout e login novamente, ou contate o suporte." |
| `NETWORK_ERROR` | "Falha de conexão ao iniciar sessão. Verifique sua internet e tente novamente." |
| `NO_SESSION` | (silencioso — usuário não estava autenticado) |

### 8.5 Log/Audit

No servidor (`/api/auth/oauth/bootstrap`):
- Adicionar `console.error` estruturado para falhas de insert de tenant/user (já existente).
- Adicionar inserção em `audit_log` com `action = 'tenant.created'` ou `action = 'tenant.bootstrap_failed'`.

### 8.6 Testes necessários

- Simular resposta 500 do bootstrap: verificar que `ensureOAuthTenant` retorna `{ ok: false, error: 'BOOTSTRAP_FAILED' }`.
- Simular rede offline: verificar que retorna `{ ok: false, error: 'NETWORK_ERROR' }`.
- Verificar que o caller exibe mensagem adequada ao usuário.
- Verificar que `NETWORK_ERROR` não exibe mensagem de erro alarmante (é recuperável).

---

## 9. Ordem recomendada de implementação

### Fase I-a — `motor_version` + `analysis_completeness` (menor risco, maior impacto imediato)

1. Migration: `ADD COLUMN motor_version TEXT` em `analyses`.
2. Migration: `ADD COLUMN analysis_completeness TEXT CHECK (...)` em `analyses`.
3. Constante `SERA_MOTOR_VERSION` em `pipeline.ts`.
4. `buildAnalysisUpsertPayload` inclui `motor_version`.
5. `complete-sera-analysis.ts` detecta completude e inclui `analysis_completeness` no payload.
6. Smoke test: verificar análise nova tem `motor_version` e `analysis_completeness` corretos.
7. (Opcional) UI: exibir `motor_version` no rodapé do relatório.

**Estimativa:** 1-2h de implementação, 30min de validação.

### Fase I-b — `request_id` + logs mínimos

1. Helper `generateRequestId()` (nanoid ou crypto.randomUUID).
2. Adicionar `request_id` no início de cada rota principal (`/api/events`, `/api/analyses/*`, `/api/actions`).
3. Propagar `request_id` no contexto de log.
4. Estruturar `logEventsError` para incluir `request_id`, `duration_ms`.

**Estimativa:** 2-3h. Não requer migration.

### Fase I-c — `audit_log`

1. Migration: criar tabela `audit_log` com RLS bloqueante.
2. Helper `insertAuditLog(admin, entry)` em `frontend/src/lib/server/audit.ts`.
3. Inserções nos 8 eventos mínimos da Fase I.
4. Testes de inserção e verificação de RLS.

**Estimativa:** 3-4h de implementação, 1h de testes.

### Fase I-d — Tenant/Bootstrap hardening

1. Refatorar `ensureOAuthTenant()` retornando `{ ok, error }`.
2. Atualizar chamadores para tratar `ok = false`.
3. Adicionar mensagens de erro na UI.
4. Adicionar log no servidor para `bootstrap_failed`.

**Estimativa:** 1-2h. Sensível — requer teste de regressão de fluxo de login.

---

## 10. Matriz de arquivos prováveis por fase

| Fase | Arquivo | Operação |
|---|---|---|
| I-a | `supabase/migrations/YYYYMMDD_add_traceability_fields.sql` | CREATE (novo arquivo) |
| I-a | `frontend/src/lib/sera/pipeline.ts` | EDIT — constante + payload |
| I-a | `frontend/src/lib/server/complete-sera-analysis.ts` | EDIT — detecção de completude |
| I-b | `frontend/src/lib/server/request-id.ts` | CREATE (novo helper) |
| I-b | `frontend/src/app/api/events/route.ts` | EDIT — request_id + duration |
| I-b | `frontend/src/app/api/analyses/[analysisId]/route.ts` | EDIT |
| I-b | `frontend/src/app/api/actions/route.ts` | EDIT |
| I-c | `supabase/migrations/YYYYMMDD_add_audit_log.sql` | CREATE |
| I-c | `frontend/src/lib/server/audit.ts` | CREATE (novo helper) |
| I-c | `frontend/src/app/api/events/route.ts` | EDIT — chamadas audit |
| I-c | `frontend/src/lib/server/complete-sera-analysis.ts` | EDIT — chamadas audit |
| I-c | `frontend/src/app/api/actions/route.ts` | EDIT — chamada audit |
| I-c | `frontend/src/app/api/analyses/[analysisId]/pdf/route.ts` | EDIT — chamada audit |
| I-d | `frontend/src/lib/ensure-tenant.ts` | EDIT — catch diferenciado |
| I-d | `frontend/src/app/...` (caller de ensureOAuthTenant) | EDIT — tratar `ok: false` |

**Arquivos que NÃO devem ser tocados em nenhuma fase I:**
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/pipeline.ts` — exceto constante `SERA_MOTOR_VERSION` e payload
- `frontend/src/lib/sera/rules/**`
- `tests/sera/**`
- `scripts/run-sera-causal-anchoring.sh`
- `docs/SERA_CAUSAL_ANCHORING_GATE_v0.1.3-C.md`

---

## 11. Matriz de risco

| Item | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| P0-001 migration `motor_version` | Coluna nova quebra upsert | Baixa | Nenhum | `ADD COLUMN IF NOT EXISTS`, sem NOT NULL, sem default |
| P0-001 constante errada | Versão gravada incorreta | Baixa | Médio | Constante declarada no módulo, revisada no commit |
| P0-002 detecção de completude | False positive de 'partial' | Média | Alto | Validar contra fixtures: smoke global pós-deploy |
| P0-002 bloqueio de PDF | Bloqueia relatórios legítimos | Baixa | Alto | Implementar como aviso antes de bloquear; decisão pendente |
| P0-003 audit_log migration | Tabela nova não afeta existentes | Nenhum | Nenhum | Migration aditiva pura |
| P0-003 inserção falha silenciosamente | Audit perdido | Média | Médio | Logar falha de insert; não relançar (audit não deve bloquear fluxo principal) |
| P0-003 RLS mal configurada | Dados auditáveis expostos | Baixa | Crítico | Testar RLS explicitamente; usar service role |
| P0-004 bootstrap hardening | Regressão de fluxo de login | Média | Crítico | Testar todos os caminhos de `ensureOAuthTenant` antes de deploy |

---

## 12. Critérios de aceitação

### P0-001 (`motor_version`)
- [ ] Nova análise tem `motor_version = 'v0.1.3-C'` (ou a versão corrente definida).
- [ ] Análises históricas com `motor_version = null` não quebram UI nem API.
- [ ] Gate causal `SERA_N_RUNS=1` passa 14/14 após as alterações em `pipeline.ts`.

### P0-002 (`analysis_completeness`)
- [ ] Análise com P/O/A e ERC válidos tem `analysis_completeness = 'complete'`.
- [ ] Relato forçado a produzir campo null tem `analysis_completeness = 'partial'`.
- [ ] Smoke global passa sem regressões.

### P0-003 (`audit_log`)
- [ ] Criação de evento insere registro em `audit_log`.
- [ ] Conclusão de análise insere registro com `completeness` e `motor_version`.
- [ ] Criação de ação corretiva insere registro.
- [ ] Exportação de PDF insere registro.
- [ ] `SELECT * FROM audit_log` via cliente (sem service role) retorna 0 linhas.
- [ ] `before_state`/`after_state` não contêm `raw_input` nem chaves de API.

### P0-004 (bootstrap)
- [ ] Bootstrap server 500 → UI exibe mensagem de erro específica, não redireciona silenciosamente.
- [ ] Rede offline → UI exibe mensagem de rede, não mensagem de erro de organização.
- [ ] Login bem-sucedido continua funcionando sem regressão.

---

## 13. Plano de rollback

### P0-001 e P0-002 (colunas em `analyses`)

```sql
-- Rollback de colunas aditivas (seguro — não altera dados existentes)
ALTER TABLE public.analyses DROP COLUMN IF EXISTS motor_version;
ALTER TABLE public.analyses DROP COLUMN IF EXISTS analysis_completeness;
```

No código: reverter os commits de `pipeline.ts` e `complete-sera-analysis.ts`.

### P0-003 (audit_log)

```sql
-- Rollback completo (perde dados de audit, aceitável em rollback de emergência)
DROP TABLE IF EXISTS public.audit_log;
```

No código: reverter commits de inserção de audit_log.

### P0-004 (bootstrap)

Reverter apenas `ensure-tenant.ts` para o estado anterior. O servidor não muda.

---

## 14. O que não fazer

- **Não alterar `all-steps.ts`** para incluir versão — a versão é responsabilidade do orquestrador, não do motor.
- **Não adicionar NOT NULL** em `motor_version` ou `analysis_completeness` na primeira migration — análises históricas não têm o campo.
- **Não bloquear o upsert** quando `analysis_completeness = 'partial'` — o dado parcial tem valor diagnóstico; bloquear apenas o relatório formal.
- **Não logar `raw_input`** em nenhum campo do `audit_log`.
- **Não usar `git add .`** nos commits de implementação.
- **Não alterar fixtures** para refletir os novos campos — os campos são de infra, não de metodologia.
- **Não implementar `audit_log` antes de `motor_version` + `analysis_completeness`** — a sequência I-a → I-c é importante porque o audit de análise deve registrar `motor_version`.

---

## 15. Decisões necessárias antes de implementar

### D-001 — Formato de `motor_version`

Opções:
1. **String semântica fixa** (ex: `'v0.1.3-C'`) — simples, visível, controlada manualmente. Risco: esquecer de atualizar.
2. **Hash do commit git** (ex: `git rev-parse HEAD`) — automático, imutável. Risco: não-legível por humanos.
3. **Tag semântica + hash curto** (ex: `'v0.1.3-C@5c1a502'`) — combina legibilidade e rastreabilidade. Implementação: constante + variável de ambiente no build.
4. **Apenas de variável de ambiente** (ex: `process.env.SERA_MOTOR_VERSION`) — flexível para CI/CD.

**Recomendação técnica:** opção 3 (`semântica + hash curto`) como constante em `pipeline.ts`, atualizada manualmente a cada release do motor SERA.

**Decisão necessária:** qual formato adotar?

---

### D-002 — Tipo de `analysis_completeness`

Opções:
1. **Enum textual** (`complete | partial | failed | blocked`) — expressivo, extensível, sem ambiguidade.
2. **Boolean `is_complete` + coluna `completeness_reason` TEXT** — mais simples para queries booleanas, menos expressivo.
3. **Integer** (0=failed, 1=partial, 2=complete) — compacto, não autoexplicativo.

**Recomendação técnica:** opção 1 (enum textual).

**Decisão necessária:** confirmar enum ou preferir outra estrutura?

---

### D-003 — `audit_log`: JSONB before/after completo ou diff mínimo?

Opções:
1. **Diff mínimo** — apenas os campos alterados. Menor tamanho, mais trabalho para reconstruir estado completo.
2. **Snapshot dos campos relevantes** — snapshot apenas dos campos críticos da entidade (P/O/A/ERC para análises). Equilibrado.
3. **Objeto completo** — toda a linha da tabela. Máxima rastreabilidade, maior volume, risco de PII acidental.

**Recomendação técnica:** opção 2 (snapshot dos campos relevantes por tipo de evento).

**Decisão necessária:** confirmar abordagem ou definir campos relevantes por tipo?

---

### D-004 — Retenção de `audit_log`: 7 anos padrão ou configurável?

Opções:
1. **7 anos padrão fixo** — simples, atende ICAO Annex 13 para dados de segurança aeronáutica.
2. **Configurável por tenant** (campo `retention_years` em `tenants`) — flexível para diferentes regulações por cliente.
3. **Sem política formal agora** — implementar com retenção indefinida; definir política antes do primeiro cliente enterprise.

**Recomendação técnica:** opção 3 para a Fase I; definir antes do primeiro enterprise.

**Decisão necessária:** confirmar abordagem de retenção?

---

### D-005 — Análise parcial consome crédito/trial?

Estado atual: análise parcial (`analysis_completeness = 'partial'`) é persistida com `events.status = 'completed'` e `credits_used = 1`. O crédito é consumido mesmo que a análise esteja incompleta.

Opções:
1. **Consumir crédito mesmo em parcial** — simples; o pipeline executou, houve custo LLM.
2. **Estornar crédito se parcial** — generoso para o usuário, mas abre espaço para abuso.
3. **Meia cobrança** — complexo, não recomendado.

**Recomendação técnica:** opção 1 para a Fase I, com `analysis_completeness = 'partial'` visível ao usuário para que possa decidir reprocessar.

**Decisão necessária:** confirmar política?

---

### D-006 — Relatório formal: bloquear automaticamente se partial/failed?

Estado atual: PDF pode ser gerado para qualquer análise.

Opções:
1. **Bloquear automaticamente** (HTTP 422 se `analysis_completeness != 'complete'`) — mais seguro, pode frustrar usuário em testes.
2. **Avisar mas não bloquear** — banner de aviso, download disponível com marca d'água "RASCUNHO".
3. **Bloquear apenas na UI, não na API** — fronteira inconsistente.

**Recomendação técnica:** opção 1 para análises com `analysis_completeness = 'partial'`; opção 2 para `analysis_completeness` ainda null (análises históricas).

**Decisão necessária:** confirmar abordagem?

---

### D-007 — `request_id`: middleware central ou helper por rota?

Opções:
1. **Middleware Next.js** (`middleware.ts`) — gera `request_id` para todas as rotas, passa via header `x-request-id`. Centralizado, mas requer cuidado com Edge Runtime.
2. **Helper por rota** (`const reqId = generateRequestId()` no início do handler) — explícito, sem risco de middleware, mais verboso.
3. **`x-request-id` do cliente** — aceitar do header se presente, gerar se ausente. Padrão de proxies.

**Recomendação técnica:** opção 2 para Fase I-b (helper por rota); opção 3 como evolução futura.

**Decisão necessária:** confirmar abordagem?

---

## 16. Referências internas

| Documento | Relevância |
|---|---|
| [`docs/PRODUCT_OPS_AUDIT_v0.3-H.md`](PRODUCT_OPS_AUDIT_v0.3-H.md) | Fonte dos P0/P1 identificados |
| [`docs/OBSERVABILITY.md`](OBSERVABILITY.md) | Taxonomia de erro e campos de log |
| [`docs/AUDIT.md`](AUDIT.md) | Schema de auditoria e entidades auditáveis |
| [`docs/SERA_PIPELINE_FAILURE_MODES_v0.3-H.md`](SERA_PIPELINE_FAILURE_MODES_v0.3-H.md) | Estados do pipeline e modos de falha |
| [`docs/SERA_CAUSAL_ANCHORING_GATE_v0.1.3-C.md`](SERA_CAUSAL_ANCHORING_GATE_v0.1.3-C.md) | Gate de regressão SERA — não alterar |
| [`frontend/src/lib/sera/pipeline.ts`](../frontend/src/lib/sera/pipeline.ts) | Motor — modificar apenas constante e payload |
| [`frontend/src/lib/server/complete-sera-analysis.ts`](../frontend/src/lib/server/complete-sera-analysis.ts) | Orquestrador — ponto de inserção de completeness e audit |
| [`frontend/src/lib/ensure-tenant.ts`](../frontend/src/lib/ensure-tenant.ts) | Bootstrap silencioso — P0-004 |
| [`supabase/migrations/`](../supabase/migrations/) | Migrations existentes — base para novas |
