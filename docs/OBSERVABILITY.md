# OBSERVABILITY — HFA

**Versão:** v0.3-H
**Data:** 2026-05-19
**Tipo:** DOCS-ONLY — nenhum código foi alterado

---

## 1. Objetivo

Definir o estado atual de observabilidade do produto HFA, os eventos mínimos de log necessários, a taxonomia de erros, métricas recomendadas, alertas e a política de modo degradado. Este documento serve como contrato de referência para implementações futuras.

---

## 2. Estado Atual Observado

### 2.1 O que existe hoje

| Mecanismo | Localização | Estado |
|---|---|---|
| `console.error` com stage/userId/tenantId/message/stack | `/api/events`, `/api/risk-profile`, `/api/org/intelligence`, `/api/org/ai-insight` | Implementado |
| `console.log` para provider ativo | `/api/org/ai-insight`, `llm.ts` | Implementado |
| `console.warn` para falhas de system_settings | `apply-user-ai-settings-to-env.ts` | Implementado |
| `console.warn` para retry transiente LLM | `llm.ts` | Implementado |
| `console.warn` para modelo flash | `llm.ts` | Implementado |
| `console.error(err)` simples (sem contexto) | `/api/analyze` (fallback), `complete-sera-analysis.ts` | Implementado (incompleto) |
| Registro de crédito debitado/estornado | tabela `credit_transactions` | Implementado |
| Histórico de edições de análise | tabela `analysis_edits` | Implementado |

### 2.2 O que NÃO existe hoje

- Nenhum `request_id` / `correlation_id` gerado ou propagado
- Nenhum log de duração (`duration_ms`) de qualquer operação
- Nenhum log de tokens consumidos ou custo estimado por chamada LLM
- Nenhuma tabela `audit_log` estruturada
- Nenhum sistema de exportação de logs para plataforma externa (Datadog, Sentry, etc.)
- Nenhum log de exportação de PDF/relatório
- Nenhum log de bootstrap de tenant (criação de organização)
- Nenhum log de mudança de configurações de IA
- Nenhum log de tentativas de acesso não autorizado (além do HTTP 401/403)

---

## 3. Eventos Mínimos de Log Recomendados

| Evento | Estado |
|---|---|
| `auth.bootstrap` — tenant criado ou recuperado | Lacuna |
| `auth.unauthorized` — tentativa de acesso sem token válido | Lacuna |
| `auth.tenant_missing` — usuário autenticado sem tenant_id | Lacuna |
| `event.created` — evento inserido no banco | Lacuna (apenas `stage` no console.error) |
| `event.create_failed` — falha ao criar evento | Implementado parcialmente (logEventsError) |
| `analysis.started` — pipeline iniciado | Lacuna |
| `analysis.completed` — pipeline concluído com sucesso | Lacuna |
| `analysis.failed` — pipeline falhou | Implementado parcialmente (logEventsError + stage) |
| `analysis.partial` — resultado incompleto detectado | Lacuna |
| `analysis.credit_debited` — crédito debitado | Implementado (credit_transactions, sem log estruturado) |
| `analysis.credit_refunded` — crédito estornado | Implementado (credit_transactions, sem log estruturado) |
| `analysis.recalculate` — recálculo seletivo aplicado | Lacuna |
| `ai.provider_called` — chamada LLM iniciada | Lacuna |
| `ai.provider_success` — chamada LLM concluída | Lacuna |
| `ai.provider_error` — chamada LLM falhou | Implementado parcialmente (console.warn no retry) |
| `ai.provider_retry` — retry transiente | Implementado (console.warn) |
| `ai.settings_changed` — provider/chave de API alterada | Lacuna |
| `corrective_action.created` | Lacuna |
| `corrective_action.status_changed` | Lacuna |
| `report.pdf_exported` | Lacuna |
| `report.executive_viewed` | Lacuna |
| `trial.limit_reached` | Lacuna |
| `trial.near_limit` | Lacuna |
| `tenant.settings_updated` | Lacuna |

---

## 4. Campos Mínimos por Evento de Log

Cada entrada de log estruturado deve conter:

```
{
  request_id: string,          // UUID gerado no início do request (lacuna atual)
  user_id: string,             // hash ou UUID interno do usuário (nunca email em plaintext)
  organization_id: string,     // tenant_id
  event_id?: string,           // se aplicável
  analysis_id?: string,        // se aplicável
  route: string,               // ex: "/api/events"
  operation: string,           // ex: "analysis.started"
  status: "ok" | "error",
  duration_ms?: number,        // lacuna atual
  provider?: string,           // provider LLM, se aplicável
  model?: string,              // modelo LLM, se aplicável
  token_count?: number,        // tokens consumidos (lacuna — depende de provider)
  cost_usd?: number,           // custo estimado (lacuna — depende de provider)
  error_type?: string,         // ver taxonomia abaixo
  error_code?: string,
  retryable?: boolean,
  degraded_mode?: boolean,
  created_at: string           // ISO 8601
}
```

**O que já existe hoje em alguns logs:**
- `stage`, `userId`, `tenantId`, `message`, `stack` — em logEventsError, logError, logRiskProfileError

**O que falta em todos os logs:**
- `request_id`, `duration_ms`, `token_count`, `cost_usd`, `retryable`, `degraded_mode`

---

## 5. Taxonomia de Erro

| Código | Descrição | Retryable | Quando usar |
|---|---|---|---|
| `AUTH_ERROR` | Token inválido, expirado ou ausente | Não | 401 em requireBearerUser |
| `TENANT_ERROR` | tenant_id ausente no JWT após fallback | Não | 403 em requireBearerUser |
| `VALIDATION_ERROR` | Campos obrigatórios ausentes ou inválidos | Não | 400 em validações de input |
| `QUOTA_ERROR` | Créditos insuficientes ou trial esgotado | Não (decisão de negócio) | 402 em analyze/events |
| `EXTRACTION_ERROR` | rawInput vazio ou inválido para o pipeline | Não | Falha no Step 1/2 do SERA |
| `AI_PROVIDER_ERROR` | Erro de API do provider LLM (4xx/5xx) | Depende | Falha em callAi |
| `AI_TIMEOUT` | LLM excedeu LLM_TIMEOUT_MS | Sim | Timeout em callAi |
| `AI_INVALID_OUTPUT` | Resposta do LLM não parseable como JSON válido | Sim (1x) | Falha em safeParse após retries |
| `PIPELINE_PARTIAL` | Pipeline concluiu mas campos críticos ausentes | Não (requer revisão) | Resultado incompleto detectado |
| `DATABASE_ERROR` | Falha em query ou insert no Supabase | Sim (transiente) | Erros .error em queries |
| `STORAGE_ERROR` | Falha no upload do documento original | Não-bloqueante | Falha em supabase.storage.upload |
| `REPORT_FALLBACK` | PDF gerado com dados de fallback/demo | Sim (reprocessar) | Dados inconsistentes no PDF |
| `UNKNOWN_ERROR` | Erro não categorizado | Depende | catch genérico |

---

## 6. Métricas Recomendadas

| Métrica | Estado | Dificuldade |
|---|---|---|
| Taxa de sucesso de análise SERA (por tenant) | Lacuna | Fácil — já há eventos.status |
| Duração média do pipeline por provider | Lacuna | Médio — requer timestamp antes/depois de runSeraPipeline |
| Taxa de estorno de crédito | Lacuna | Fácil — já há credit_transactions.type='refund' |
| Número de análises por tenant por dia | Lacuna | Fácil — query em analyses com tenant_id + created_at |
| Taxa de erro por provider LLM | Lacuna | Médio — requer log estruturado por provider |
| Latência p95/p99 de chamadas LLM | Lacuna | Médio — requer instrumentação em llm.ts |
| Taxa de retry transiente | Implementado parcialmente | Fácil — já há console.warn, falta contagem |
| Ações corretivas criadas por análise | Lacuna | Fácil — query em corrective_actions |
| Taxa de resolução de ações corretivas | Implementado no /api/org/intelligence | Fácil |
| Exportações de PDF por tenant | Lacuna | Fácil — registrar em audit_log |
| Usuários sem tenant (erros 403) | Lacuna | Fácil — contar no log de requireBearerUser |
| Tentativas de análise com crédito insuficiente | Lacuna | Fácil — já há 402, falta contagem |

---

## 7. Alertas Recomendados

| Alerta | Condição | Severidade |
|---|---|---|
| Taxa de falha de análise > 5% em 1h | `analysis.failed` / total > 0.05 | P0 |
| Provider LLM indisponível | 3+ `AI_PROVIDER_ERROR` em 5 min | P0 |
| Timeout LLM recorrente | 3+ `AI_TIMEOUT` em 5 min | P1 |
| Estornos anômalos | `credit_refunded` > 10 em 1h | P1 |
| Usuários sem tenant_id crescendo | `TENANT_ERROR` > 5 em 1h | P1 |
| Análises parciais detectadas | `PIPELINE_PARTIAL` > 0 em qualquer janela | P1 |
| Tempo de pipeline > 200s | `duration_ms` > 200000 | P2 |
| Trial limite atingido por organização | `trial.limit_reached` | P2 |

---

## 8. Modo Degradado

### Quando usar modo degradado

- Provider LLM primário indisponível mas a sessão do usuário é válida
- Resultado do pipeline retornado com campos parciais (campos críticos P/O/A ausentes)
- Supabase Storage indisponível (análise pode prosseguir sem arquivo anexo)

### O que mostrar ao usuário

- Mensagem explícita: "A análise foi concluída com dados parciais. Os campos [X, Y] não puderam ser determinados. Revise manualmente."
- Nunca ocultar que a análise está incompleta
- Nunca apresentar um resultado parcial como final/aprovado

### O que registrar

- `degraded_mode: true` no log estruturado
- Campos ausentes listados
- Provider/step que falhou

### O que nunca ocultar

- Resultado parcial — deve ser sempre visível para o operador
- Falha de provider LLM — não fingir que a análise foi feita por IA quando foi por fallback
- Crédito debitado quando análise falhou — deve ser visível o estorno

---

## 9. Política de Privacidade em Logs

- **Nunca logar o texto completo do relato do evento** (`raw_input`) em logs de erro ou console
- **Nunca logar PII em plaintext**: email, nome, CPF
- Usar IDs internos: `user_id` (UUID), `tenant_id` (UUID), `event_id` (UUID)
- Chaves de API: NUNCA logar em nenhum nível — apenas `suffix` (últimos 4 chars) se necessário identificar qual chave
- Em logs de erro, usar `event_id` e `analysis_id` como referência, não o conteúdo
- Ao logar `stage` + `context`, verificar que `context` não contém `rawInput` ou dados sensíveis

---

## 10. Checklist de Implementação Futura

| Item | Prioridade | Dificuldade Estimada |
|---|---|---|
| Gerar `request_id` no início de cada request e propagar em logs | P1 | Fácil |
| Adicionar `duration_ms` nos logs de análise | P1 | Fácil |
| Criar tabela `audit_log` e inserir nos eventos críticos | P0 | Médio |
| Instrumentar `llm.ts` com log estruturado de início/fim + provider/model | P1 | Fácil |
| Adicionar log de `analysis.started` em `complete-sera-analysis.ts` | P1 | Fácil |
| Adicionar log de `analysis.completed` com duration_ms | P1 | Fácil |
| Adicionar log de `report.pdf_exported` | P2 | Fácil |
| Adicionar log de `corrective_action.created` | P2 | Fácil |
| Integrar com plataforma de log externo (Datadog/Sentry/Axiom) | P2 | Difícil |
| Extrair token_count da resposta do provider (quando disponível) | P3 | Médio |
| Criar dashboard de métricas operacionais (taxa de sucesso, latência) | P3 | Difícil |
