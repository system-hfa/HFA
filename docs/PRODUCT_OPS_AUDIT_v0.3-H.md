# PRODUCT OPS AUDIT — HFA v0.3-H

**Versão:** v0.3-H
**Branch:** opus-product-hardening-v0.3-H
**Worktree:** ~/Documents/HFA-opus-product
**Data:** 2026-05-19
**Tipo:** DOCS-ONLY — nenhum código foi alterado

---

## 1. Escopo

Esta auditoria cobre o estado atual observado do produto HFA (plataforma SaaS de análise de segurança operacional usando a metodologia SERA). A leitura foi feita diretamente no código-fonte do worktree opus-product-hardening-v0.3-H. Nenhuma modificação foi feita em código, testes, migrations, billing ou motor SERA.

Áreas cobertas:
- Fluxos de autenticação e bootstrap de tenant
- Criação e listagem de eventos de segurança
- Execução do pipeline de análise SERA
- Recomendações / AI Insight
- Ações corretivas
- Relatórios (executivo e individual de evento)
- Trial / uso
- Risk profile
- Configurações de IA (settings/ai)

---

## 2. Estado Atual Observado

### 2.1 Arquivos de referência lidos

| Arquivo | Conteúdo |
|---|---|
| `frontend/src/app/api/auth/bootstrap/route.ts` | Re-exporta `oauth/bootstrap` |
| `frontend/src/app/api/auth/oauth/bootstrap/route.ts` | Cria tenant + usuário público no bootstrap OAuth |
| `frontend/src/app/api/analyze/route.ts` | Ponto alternativo de análise (sem upload de arquivo) |
| `frontend/src/app/api/events/route.ts` | GET lista + POST cria evento + dispara pipeline SERA |
| `frontend/src/app/api/analyses/[analysisId]/route.ts` | GET análise individual |
| `frontend/src/app/api/analyses/[analysisId]/recalculate/route.ts` | POST recálculo seletivo |
| `frontend/src/app/api/analyses/[analysisId]/pdf/route.ts` | GET PDF individual do evento |
| `frontend/src/app/api/actions/route.ts` | GET lista + POST cria ação corretiva |
| `frontend/src/app/api/actions/[id]/route.ts` | PATCH atualiza status/responsável/prazo |
| `frontend/src/app/api/trial/status/route.ts` | GET status de uso do trial |
| `frontend/src/app/api/org/ai-insight/route.ts` | POST diagnóstico IA organizacional |
| `frontend/src/app/api/org/intelligence/route.ts` | GET métricas de inteligência organizacional |
| `frontend/src/app/api/risk-profile/route.ts` | GET agregado de falhas por tenant |
| `frontend/src/app/api/settings/ai/route.ts` | GET/POST configurações de provedor IA |
| `frontend/src/lib/server/api-auth.ts` | `requireBearerUser` — auth central |
| `frontend/src/lib/server/tenant-user.ts` | Débito/estorno de crédito + `ensurePublicUserRow` |
| `frontend/src/lib/server/complete-sera-analysis.ts` | Orquestrador: pipeline + upsert + storage |
| `frontend/src/lib/server/apply-user-ai-settings-to-env.ts` | Carrega AI settings do Supabase para env |
| `frontend/src/lib/sera/llm.ts` | Provedor LLM multi-provider + retry + safeParse |
| `frontend/src/lib/product/trial.ts` | Lógica de contagem e status do trial |
| `frontend/src/lib/ensure-tenant.ts` | `ensureOAuthTenant` — bootstrap do lado cliente |

### 2.2 Tabelas Supabase observadas

| Tabela | Função |
|---|---|
| `tenants` | Organização multi-tenant (plan, credits_balance) |
| `users` | Espelho público dos usuários auth |
| `events` | Evento de segurança operacional |
| `analyses` | Resultado completo do pipeline SERA por evento |
| `analysis_edits` | Histórico de edições manuais com valor_antes/depois |
| `corrective_actions` | Ações corretivas vinculadas a uma análise |
| `credit_transactions` | Registro de débito/estorno de crédito |
| `ai_settings` | Provedor e chaves de API por usuário (criptografadas) |
| `system_settings` | Configurações globais (provider, chaves) |

**Tabela `audit_log` — não existe no código observado.**

### 2.3 Logging observado

- `console.error` com `stage`, `userId`, `tenantId`, `message`, `stack` em: `/api/events`, `/api/risk-profile`, `/api/org/intelligence`, `/api/org/ai-insight`
- `console.log` para provider ativo em `/api/org/ai-insight` e `llm.ts`
- `console.warn` em `apply-user-ai-settings-to-env.ts` para falha de system_settings
- `console.warn` em `llm.ts` para retry transiente e modelo flash
- `/api/analyze/route.ts` — usa apenas `console.error(err)` sem stage/context (logging inferior)
- Não há `request_id`, `duration_ms`, `token_count`, ou `correlation_id` em nenhum log

### 2.4 Créditos e trial

- Trial: limite fixo de 10 análises (DEFAULT_TRIAL_LIMIT = 10), baseado em contagem da tabela `analyses`
- Créditos: `credits_balance` na tabela `tenants`; enterprise não debita
- Estorno automático implementado em `tenant-user.ts` via `refundCreditForFailedAnalysis`
- A rota `/api/trial/status` conta análises, não créditos — são dois sistemas paralelos não totalmente alinhados

---

## 3. Fluxos Críticos Mapeados

### 3.1 Auth / Login / Bootstrap

| Aspecto | Estado |
|---|---|
| **Entrada** | Bearer token JWT Supabase no header Authorization |
| **Auth/Tenant** | `requireBearerUser`: valida token via `supabase.auth.getUser`, extrai `tenant_id` do user_metadata; fallback: busca tabela `users` por id e email |
| **Persistência** | `tenants` (criado no bootstrap), `users` (espelho público) |
| **IA** | Não envolve IA |
| **Sucesso** | Retorna `{ ok: true, tenant_id, created }` |
| **Erro** | 401 (token inválido), 403 (tenant_id ausente após fallback), 500 (falha no insert) |
| **O que o usuário vê** | Redirecionado para dashboard (tratado pelo `ensureOAuthTenant` no cliente) |
| **Rastreabilidade atual** | Nenhum log estruturado no bootstrap; erros com `jsonError` retornam mensagem ao cliente |
| **Lacunas** | Sem log de criação de tenant/usuário; sem request_id; fallback OAuth silencioso ao falhar bootstrap no cliente (`ensure-tenant.ts` tem catch vazio) |

### 3.2 Criação de Evento

| Aspecto | Estado |
|---|---|
| **Entrada** | POST multipart/form-data ou JSON com `title`, `raw_input`, campos opcionais (operation_type, aircraft_type, occurred_at, source_*) |
| **Auth/Tenant** | `requireBearerUser` → `user.tenantId` filtrado em todas as queries |
| **Persistência** | INSERT em `events` (status=received); upsert em `analyses`; INSERT em `credit_transactions` |
| **IA** | Não no insert; pipeline IA disparado imediatamente após na mesma requisição |
| **Sucesso** | Retorna `{ event_id, status: 'completed', analysis_id, seraAnalysis }` |
| **Erro** | 400 (campos ausentes), 402 (créditos insuficientes), 503 (IA não configurada), 500 (pipeline falhou); status do evento atualizado para 'failed' |
| **O que o usuário vê** | Análise disponível imediatamente ou mensagem de erro |
| **Rastreabilidade atual** | `logEventsError` com stage, userId, tenantId, message, stack — implementado em `/api/events` |
| **Lacunas** | Sem `request_id`; `/api/analyze` usa apenas `console.error(err)` sem stage/context; sem duração da requisição; sem log de bytes de arquivo |

### 3.3 Execução de Análise SERA

| Aspecto | Estado |
|---|---|
| **Entrada** | `rawInput` (texto bruto do evento), `sourceMeta` (tipo, nome, tamanho do arquivo) |
| **Auth/Tenant** | Verificado antes de chamar `completeSeraAnalysisAfterEventCreated`; tenant_id no payload de upsert |
| **Persistência** | Upsert em `analyses` com todos os campos SERA (perception_code, objective_code, action_code, preconditions, escape_point, erc_level, recommendations, etc.); conflito resolvido por `event_id` |
| **IA** | Provider configurado por usuário (deepseek/openai/anthropic/google/groq); modelo default: deepseek-reasoner; timeout: 120s; retry automático para erros transientes (2 tentativas) |
| **Sucesso** | `analyses.status` não é atualizado explicitamente para 'completed' — `events.status` vai para 'completed'; `credits_used: 1` gravado no evento |
| **Erro** | Lança exceção que é capturada no caller; `events.status = 'failed'`; estorno de crédito tentado; `console.error(err)` |
| **O que o usuário vê** | Análise completa com todos os 7 passos SERA ou mensagem de erro HTTP 500 |
| **Rastreabilidade atual** | Estorno registrado em `credit_transactions` com tipo 'refund'; log de falha no caller (`logEventsError`) |
| **Lacunas** | Não há campo `analysis_status` separado (apenas `events.status`); sem log do tempo de execução do pipeline; sem log de qual passo SERA falhou; sem detecção de resultado parcial |

### 3.4 Recomendações / AI Insight

| Aspecto | Estado |
|---|---|
| **Entrada** | POST `/api/org/ai-insight` com campo `intelligence_data` (dados do dashboard) |
| **Auth/Tenant** | `requireBearerUser`; AI settings carregados via `applyUserAiSettingsToEnv` |
| **Persistência** | Nenhuma — resposta gerada na hora, não persiste no banco |
| **IA** | Mesmo provider configurado pelo usuário; system prompt com restrições metodológicas explícitas; resposta JSON com diagnóstico, nivel_risco, recomendações prioritárias |
| **Sucesso** | Retorna `{ insight, generated_at, model_used }` |
| **Erro** | 400 (body inválido), 500 (falha LLM) |
| **O que o usuário vê** | Diagnóstico organizacional em linguagem natural com recomendações priorizadas |
| **Rastreabilidade atual** | `logError` com stage, userId, message, stack; log do provider ativo |
| **Lacunas** | Insight não é salvo — sem histórico de diagnósticos; sem log de custo/tokens; sem versionamento do insight por data |

### 3.5 Criação de Ações Corretivas

| Aspecto | Estado |
|---|---|
| **Entrada** | POST `/api/actions` com `analysis_id`, `title`, `description`, `related_failure` |
| **Auth/Tenant** | `requireBearerUser`; verifica que `analysis_id` pertence ao `tenant_id` do usuário |
| **Persistência** | INSERT em `corrective_actions` com `status: 'pending'` |
| **IA** | Não envolve IA |
| **Sucesso** | Retorna `{ id, title, status, related_failure }` com HTTP 201 |
| **Erro** | 400 (campos obrigatórios ausentes), 404 (análise não encontrada), 500 (erro Supabase) |
| **O que o usuário vê** | Ação criada com status "pendente" |
| **Rastreabilidade atual** | Nenhum log estruturado |
| **Lacunas** | Sem log de criação; sem detecção de duplicatas (mesma análise + mesmo título); sem rastreabilidade de quem criou (actor_user_id ausente no insert) |

### 3.6 Atualização de Ações Corretivas

| Aspecto | Estado |
|---|---|
| **Entrada** | PATCH `/api/actions/[id]` com `status`, `responsible`, `due_date` |
| **Auth/Tenant** | `requireBearerUser` + filtro por `tenant_id` no update |
| **Persistência** | UPDATE em `corrective_actions`; `completed_at` setado quando status='completed' |
| **IA** | Não envolve IA |
| **Sucesso** | Retorna campos atualizados |
| **Lacunas** | Sem log de mudança de status; sem `value_before`/`value_after`; sem audit trail |

### 3.7 Relatório Executivo

| Aspecto | Estado |
|---|---|
| **Entrada** | GET `/api/org/intelligence` — agrega dados de todas as análises do tenant |
| **Auth/Tenant** | `requireBearerUser` + filtro `tenant_id` em todas as 4 queries paralelas |
| **Persistência** | Somente leitura; nenhum dado é persistido |
| **IA** | Não envolve IA diretamente (dados brutos; IA é chamada separadamente via `/api/org/ai-insight`) |
| **Sucesso** | Retorna score, distribution, top_preconditions, top_combinations, actions, trend, alerts, safety_issue_candidates, quality_trend, data_confidence |
| **Erro** | 500 com log estruturado para cada query que falhar |
| **O que o usuário vê** | Dashboard com painel de inteligência organizacional |
| **Rastreabilidade atual** | `logError` por stage de query |
| **Lacunas** | Score de risco calculado inline sem versão metodológica; fórmula de base_score hardcoded sem documentação; sem registro de quando o relatório foi gerado/visualizado |

### 3.8 Relatório Individual de Evento (PDF)

| Aspecto | Estado |
|---|---|
| **Entrada** | GET `/api/analyses/[analysisId]/pdf` |
| **Auth/Tenant** | `requireBearerUser` + filtro `tenant_id` |
| **Persistência** | Somente leitura; PDF gerado na hora |
| **IA** | Não envolve IA na geração do PDF |
| **Sucesso** | Retorna arquivo PDF com nome `SERA_{slug}_{data}.pdf` |
| **Erro** | 400 (erro Supabase), 404 (análise não encontrada), 500 (falha na geração do PDF) |
| **O que o usuário vê** | Download automático do PDF |
| **Rastreabilidade atual** | Nenhum registro de exportação |
| **Lacunas** | Sem registro de que o PDF foi gerado/exportado; sem audit de exportação; sem log de qual usuário exportou |

### 3.9 Trial / Uso

| Aspecto | Estado |
|---|---|
| **Entrada** | GET `/api/trial/status` |
| **Auth/Tenant** | `requireBearerUser` |
| **Persistência** | Somente leitura (conta análises na tabela `analyses`) |
| **IA** | Não envolve IA |
| **Sucesso** | Retorna `{ limit: 10, used, remaining, status, message }` |
| **Erro** | 500 com mensagem ao cliente |
| **O que o usuário vê** | Contador de análises disponíveis |
| **Lacunas** | Trial baseado em contagem de análises; créditos baseados em `credits_balance` — dois sistemas não necessariamente sincronizados; sem registro de quando o limite foi atingido; sem notificação proativa |

### 3.10 Risk Profile

| Aspecto | Estado |
|---|---|
| **Entrada** | GET `/api/risk-profile` |
| **Auth/Tenant** | `requireBearerUser` + filtro `tenant_id` |
| **Persistência** | Somente leitura (lê `analyses`) |
| **IA** | Não envolve IA |
| **Sucesso** | Retorna frequências agregadas de falhas (perception, objective, action, top_preconditions) |
| **Erro** | 500 com `logRiskProfileError` |
| **Rastreabilidade atual** | `logRiskProfileError` com stage, userId, tenantId |
| **Lacunas** | Sem versionamento do perfil; sem snapshot histórico; sem data de referência do cálculo |

### 3.11 Settings / AI

| Aspecto | Estado |
|---|---|
| **Entrada** | GET/POST `/api/settings/ai` |
| **Auth/Tenant** | `requireBearerUser`; chaves por `user_id` |
| **Persistência** | Upsert em `ai_settings` com chaves criptografadas (conflito por `user_id`) |
| **IA** | Configura qual provider será usado |
| **Sucesso** | GET retorna providers configurados com flag de configurado e sufixo da chave; POST confirma atualização |
| **Lacunas** | Sem log de quando as configurações foram alteradas; sem audit de qual chave foi adicionada/removida; as chaves são por usuário, não por organização — conflito com `system_settings` global |

---

## 4. Tabela de Riscos Operacionais

| Risco | Severidade | Estado Atual |
|---|---|---|
| Falha de extração (Step 1/2 SERA — sem texto válido) | P0 | Parcialmente tratado: validação de `rawInput` no controller; erro surfaceado para o usuário; crédito não debitado antes da falha |
| Falha LLM (provider down / API key inválida) | P0 | `assertLlmEnvConfigured` verifica antes de criar evento/debitar; erro retorna 503; porém provider indisponível mid-pipeline retorna 500 genérico; estorno funciona |
| Timeout de IA | P1 | Timeout de 120s implementado em `llm.ts`; retry automático para erros transientes (2 tentativas, 1-2s delay); porém rota tem `maxDuration: 300s` — conflito latente |
| Resposta parcial SERA | P1 | Não detectado — pipeline pode retornar resultado incompleto sem sinalização; análise é persistida como se completa |
| Quota/trial excedido | P1 | Verificação de `credits_balance < 1` antes de criar evento; retorno 402; trial (10 análises) verificado em rota separada mas não bloqueia análise na criação |
| Usuário sem organização (tenant_id ausente) | P0 | `requireBearerUser` lança 403 se `tenant_id` ausente após fallback; bootstrap tenta recuperar via email; fallback silencioso no cliente (`ensure-tenant.ts`) |
| Evento sem análise | P1 | Possível: insert de evento bem-sucedido, pipeline falha; evento fica com `status='failed'`; não há mecanismo de re-análise automática |
| Análise sem recomendações | P2 | Possível: campo `recommendations` pode ser null/empty; pipeline não bloqueia; sem alerta ao usuário |
| Ação corretiva duplicada | P2 | Sem verificação de duplicidade; possível criar múltiplas ações com mesmo título + análise |
| Relatório com dados demo/fallback | P2 | Existe `hfa-demo-data.ts`; não observado fallback automático em produção, mas sem garantia explícita de não uso em prod |
| Erro de tenant | P0 | Tratado em `requireBearerUser`; mas fallback de busca por email pode ser custoso e silencioso em erros |
| Erro Supabase | P1 | Parcialmente tratado: erros de query retornam 400/500 com `error.message`; sem circuit breaker; sem retry em erros de escrita |
| Erro de autorização | P0 | Filtro por `tenant_id` em todas as queries observadas; sem RLS verificada no código (RLS delegado ao Supabase) |

---

## 5. Priorização P0/P1/P2/P3

### P0 — Bloqueadores de Produção (risco de dados corrompidos, acesso indevido, ou parada total)

1. **Fallback silencioso no bootstrap OAuth** (`ensure-tenant.ts`): catch vazio pode deixar usuário sem tenant sem aviso. Risco: usuário nunca consegue acessar o produto.
2. **Sem audit log**: nenhuma tabela `audit_log`; sem rastreabilidade de quem fez o quê. Risco: compliance e forense impossíveis.
3. **Usuário sem tenant_id em produção**: erro 403 sem diagnóstico adequado do lado servidor; difícil debugar.
4. **Análise persistida sem verificação de completude**: resultado parcial do pipeline pode ser salvo como completo.

### P1 — Alta Prioridade (degradação severa de funcionalidade)

1. **Sem request_id / correlation_id**: impossível correlacionar logs de erros entre etapas do mesmo request.
2. **Timeout 120s (LLM) vs maxDuration 300s (Next.js)**: conflito latente — se LLM demorar >120s, erro transiente; se demorar >300s, Next.js mata a conexão sem resposta ao cliente.
3. **Evento sem análise (pipeline falhou)**: sem mecanismo de re-análise; usuário precisa criar novo evento.
4. **Sem log de duração do pipeline**: impossível identificar regressões de performance.
5. **AI Insight não persiste**: histórico de diagnósticos organizacionais perdido; sem evolução temporal.
6. **Dois sistemas de limite (créditos + trial) não sincronizados**: possível inconsistência entre o que o usuário vê e o que é bloqueado.

### P2 — Média Prioridade (impacto na experiência, auditoria e qualidade)

1. **Ações corretivas sem actor_user_id no insert**: sem rastreabilidade de quem criou.
2. **Duplicidade de ações corretivas**: sem prevenção.
3. **PDF exportado sem registro**: sem audit de exportação.
4. **Recomendações sem ação corretiva**: alerta gerado em `/api/org/intelligence` mas sem bloqueio ou notificação.
5. **Risk profile sem snapshot histórico**: impossível ver evolução.
6. **AI settings por usuário vs system_settings global**: conflito de precedência não totalmente claro.

### P3 — Baixa Prioridade (melhoria de qualidade)

1. **Score de risco hardcoded sem versionamento metodológico**.
2. **Sem log de tokens/custo de LLM**.
3. **`/settings/ai` fora do layout dashboard** (bug de navegação já documentado em v0.2-A).
4. **Trial message com acentos incorretos** (`Voce` sem acento).

---

## 6. Recomendações por Prioridade

> IMPORTANTE: as seções a seguir descrevem RECOMENDAÇÕES para implementação futura. Nenhuma dessas implementações existe no código atual.

### P0

- **Criar tabela `audit_log`** com campos: actor_user_id, organization_id, object_type, object_id, action, before, after, reason, request_id, timestamp. Registrar no mínimo: criação de tenant, análise iniciada/concluída/falhou, exportação de PDF.
- **Corrigir fallback silencioso no bootstrap**: logar erro no servidor quando `ensureOAuthTenant` falhar; exibir erro ao usuário ao invés de continuar silenciosamente.
- **Adicionar detecção de resultado parcial no pipeline**: verificar se campos críticos (perception_code, objective_code, action_code) estão preenchidos antes de persistir como completo.

### P1

- **Gerar `request_id` (UUID) no início de cada request** e propagá-lo em todos os logs e na resposta como header `X-Request-Id`.
- **Alinhar timeout LLM com maxDuration**: ajustar LLM_TIMEOUT_MS para ~250s ou documentar explicitamente o comportamento esperado no conflito.
- **Persistir AI Insights**: criar tabela `org_insights` com tenant_id, generated_at, model_used, insight_json.
- **Implementar mecanismo de re-análise de eventos com status 'failed'**: rota PATCH `/api/events/[id]/retry`.
- **Alinhar trial e créditos**: decidir se o trial é contado por análise (tabela `analyses`) ou por crédito (`credits_balance`); unificar.

### P2

- **Adicionar `created_by` em `corrective_actions`**: gravar `user_id` no insert.
- **Adicionar verificação de duplicidade em ações corretivas**: pelo menos retornar warning se título idêntico já existe para a mesma análise.
- **Registrar exportação de PDF** em `audit_log` ou tabela `report_exports`.
- **Snapshot periódico do risk profile**: salvar versão mensal para análise de tendência.

### P3

- **Adicionar log de tokens/custo**: quando possível extrair da resposta do provider, registrar em log.
- **Versionar fórmula de score de risco**: adicionar campo `score_version` na resposta do intelligence.
- **Corrigir bug de navegação `/settings/ai`** (já documentado em v0.2-A).
- **Corrigir acentos no trial message**.

---

## 7. O Que NÃO Foi Alterado Nesta Fase

- Motor SERA: `all-steps.ts`, `pipeline.ts`, `rules/`
- Fixtures de teste: `tests/sera/`
- Migrations: `migrations/`
- Billing/Stripe
- Risk Profile core/baseline
- UI/API (nenhum arquivo de código foi modificado)
- Scripts do gate causal: `scripts/run-sera-causal-anchoring.sh`
- Documentos SERA: `SERA_CAUSAL_ANCHORING_GATE_v0.1.3-C.md`, `SERA_ESCAPE_POINT_ADVERSARIAL_VALIDATION_v0.1.3-A.md`
