# SERA PIPELINE FAILURE MODES — v0.3-H

**Versão:** v0.3-H
**Data:** 2026-05-19
**Tipo:** DOCS-ONLY — motor SERA não foi alterado

---

## 1. Objetivo e Escopo

Este documento cataloga os modos de falha do pipeline de análise SERA do HFA. O motor SERA (`all-steps.ts`, `pipeline.ts`, `rules/`) não foi alterado nesta fase — apenas documentado com base na leitura das camadas de orquestração (`complete-sera-analysis.ts`, `analyze/route.ts`, `events/route.ts`, `llm.ts`, `recalculate.ts`).

O objetivo é estabelecer um contrato claro entre o motor e o produto: o que acontece quando o pipeline falha, o que deve ser mostrado ao usuário, o que deve ser logado, e quando um resultado pode ou não ser considerado formal.

---

## 2. Estados Possíveis do Pipeline

| Estado | Código | Descrição |
|---|---|---|
| Não iniciado | `NOT_STARTED` | Evento criado mas pipeline ainda não chamado |
| Validação de input falhou | `INPUT_VALIDATION_FAILED` | rawInput vazio ou inválido antes do pipeline |
| Extração falhou | `EXTRACTION_FAILED` | Step 1 ou 2 do SERA não conseguiu extrair elementos relevantes |
| IA indisponível | `AI_UNAVAILABLE` | Provider LLM offline, chave ausente ou quota excedida |
| Output IA inválido | `AI_INVALID_OUTPUT` | Resposta do LLM não parseável como JSON válido após retries |
| Classificação parcial | `PARTIAL_CLASSIFICATION` | Pipeline concluiu mas um ou mais de P/O/A ausentes |
| Classificação completa | `CLASSIFICATION_COMPLETED` | P, O e A classificados com sucesso |
| Recomendações falharam | `RECOMMENDATION_FAILED` | Classificação completa mas geração de recomendações falhou |
| Persistência falhou | `PERSISTENCE_FAILED` | Pipeline concluiu mas upsert em `analyses` falhou |
| Completo com avisos | `COMPLETED_WITH_WARNINGS` | Análise persistida com campos não-críticos ausentes |
| Completo | `COMPLETED` | Todos os campos preenchidos, análise persistida com sucesso |

---

## 3. Detalhamento por Estado

### 3.1 NOT_STARTED

| Campo | Detalhe |
|---|---|
| **Causa** | Evento inserido com `status='received'` mas `completeSeraAnalysisAfterEventCreated` ainda não foi chamada (cenário de falha antes do pipeline, ou chamada assíncrona futura) |
| **Detecção atual** | Evento com `status='received'` por tempo > threshold (não há polling atual) |
| **Resposta do sistema** | Evento fica em 'received' indefinidamente — sem mecanismo de detecção |
| **Mensagem ao usuário** | Nenhuma — usuário pode ver evento sem análise |
| **Log esperado** | Nenhum atualmente; deveria emitir `analysis.stale` após timeout |
| **Retry?** | Manual — usuário deve re-submeter |
| **Consome trial?** | Não (crédito só debitado antes do pipeline) |
| **Cria análise parcial?** | Não |

### 3.2 INPUT_VALIDATION_FAILED

| Campo | Detalhe |
|---|---|
| **Causa** | `rawInput` vazio, ausente, ou composto apenas de whitespace; ou `eventoNarrativa` não enviado no body |
| **Detecção atual** | Verificação explícita em `events/route.ts` e `analyze/route.ts` antes de qualquer operação |
| **Resposta do sistema** | HTTP 400 retornado imediatamente; nenhum evento criado, nenhum crédito debitado |
| **Mensagem ao usuário** | "Título e relato são obrigatórios" / "eventoNarrativa é obrigatório" |
| **Log esperado** | Nenhum log atual (retorno 400 apenas) |
| **Retry?** | Não — usuário deve corrigir o input |
| **Consome trial?** | Não |
| **Cria análise parcial?** | Não |

### 3.3 EXTRACTION_FAILED

| Campo | Detalhe |
|---|---|
| **Causa** | O pipeline SERA (Steps 1/2) não consegue extrair elementos relevantes do texto; ou o LLM retorna resposta que não contém os dados esperados para extração |
| **Detecção atual** | Exceção propagada de `runSeraPipeline` → capturada no caller → `events.status = 'failed'` |
| **Resposta do sistema** | HTTP 500; `events.status = 'failed'`; crédito estornado se debitado |
| **Mensagem ao usuário** | "Falha no pipeline SERA: [mensagem do erro]" |
| **Log esperado** | `logEventsError` com stage='run-pipeline'; sem identificação do step específico |
| **Retry?** | Sim — usuário pode re-submeter com texto mais rico |
| **Consome trial?** | Não (estorno automático implementado) |
| **Cria análise parcial?** | Não |

### 3.4 AI_UNAVAILABLE

| Campo | Detalhe |
|---|---|
| **Causa** | Chave de API ausente (`assertLlmEnvConfigured` falha); provider offline; quota esgotada; network error não-transiente |
| **Detecção atual** | `assertLlmEnvConfigured` verifica antes do pipeline → 503; erros non-transient em `callAi` propagam imediatamente |
| **Resposta do sistema** | HTTP 503 (chave ausente) ou HTTP 500 (falha mid-pipeline); `events.status = 'failed'`; estorno de crédito |
| **Mensagem ao usuário** | "[PROVIDER]_API_KEY não definida" / "Falha no pipeline SERA: [mensagem]" |
| **Log esperado** | `logEventsError` com stage; `console.warn` para retries transientes em llm.ts |
| **Retry?** | Sim — após corrigir configuração de IA |
| **Consome trial?** | Não (estorno) |
| **Cria análise parcial?** | Não |

### 3.5 AI_INVALID_OUTPUT

| Campo | Detalhe |
|---|---|
| **Causa** | LLM retorna texto que não pode ser parseado como JSON válido após todas as tentativas de limpeza em `safeParse`; ou resposta vazia |
| **Detecção atual** | `safeParse` em `llm.ts` lança `Error("Falha ao parsear JSON na [step]")`; `askJson` tenta parse retry (1 extra attempt); exceção propagada |
| **Resposta do sistema** | HTTP 500; `events.status = 'failed'`; estorno de crédito |
| **Mensagem ao usuário** | "Falha no pipeline SERA: Falha ao parsear JSON na [step]" |
| **Log esperado** | `logEventsError` com mensagem de parse; preview dos primeiros 600 chars da resposta na mensagem de erro |
| **Retry?** | Sim (pode ser instabilidade do modelo) |
| **Consome trial?** | Não (estorno) |
| **Cria análise parcial?** | Não |

### 3.6 PARTIAL_CLASSIFICATION

| Campo | Detalhe |
|---|---|
| **Causa** | Pipeline executou mas um ou mais dos campos P/O/A (perception_code, objective_code, action_code) estão ausentes/null no resultado |
| **Detecção atual** | NÃO EXISTE — pipeline não detecta resultado parcial; análise é persistida normalmente |
| **Resposta do sistema** | `events.status = 'completed'`; análise salva com campos null |
| **Mensagem ao usuário** | Nenhuma — análise aparece como "completa" |
| **Log esperado** | Não existe; deveria emitir `PIPELINE_PARTIAL` |
| **Retry?** | Sim (manual — re-análise) |
| **Consome trial?** | Sim (crédito não é estornado em resultado parcial) |
| **Cria análise parcial?** | Sim — e persiste sem aviso |

**LACUNA CRÍTICA P1:** resultado parcial é indistinguível de resultado completo na perspectiva do sistema.

### 3.7 CLASSIFICATION_COMPLETED

| Campo | Detalhe |
|---|---|
| **Causa** | Pipeline executou com sucesso; P, O e A classificados |
| **Detecção atual** | Campos preenchidos na resposta de `runSeraPipeline`; upsert em `analyses` bem-sucedido |
| **Resposta do sistema** | `events.status = 'completed'`; `credits_used = 1`; análise disponível |
| **Mensagem ao usuário** | Análise completa visível na UI |
| **Log esperado** | Nenhum log de sucesso atualmente |
| **Retry?** | Não aplicável |
| **Consome trial?** | Sim |
| **Cria análise parcial?** | Não |

### 3.8 RECOMMENDATION_FAILED

| Campo | Detalhe |
|---|---|
| **Causa** | Classificação P/O/A bem-sucedida mas step de geração de recomendações falhou (LLM ou parse) |
| **Detecção atual** | Se lança exceção: pipeline falha inteiro → `EXTRACTION_FAILED` / `AI_INVALID_OUTPUT`. Se retorna null silenciosamente: `recommendations = null` na análise |
| **Resposta do sistema** | Depende da implementação do motor — pode falhar ou retornar null |
| **Mensagem ao usuário** | Erro 500 (se exceção) ou análise sem recomendações (se null silencioso) |
| **Log esperado** | Stage-level em logEventsError se exceção |
| **Retry?** | Sim |
| **Consome trial?** | Depende — sim se análise foi persistida com recommendations=null |
| **Cria análise parcial?** | Sim (se null silencioso) |

### 3.9 PERSISTENCE_FAILED

| Campo | Detalhe |
|---|---|
| **Causa** | Pipeline SERA concluiu mas o upsert em `analyses` falhou (Supabase offline, conflito de schema, row level security) |
| **Detecção atual** | Verificação explícita em `complete-sera-analysis.ts`: `if (aerr || !upserted) throw new Error(aerr?.message)` |
| **Resposta do sistema** | Exceção propagada → HTTP 500; `events.status = 'failed'`; estorno de crédito |
| **Mensagem ao usuário** | "Falha no pipeline SERA: Falha ao gravar análise" |
| **Log esperado** | `logEventsError` com stage; mensagem do erro Supabase |
| **Retry?** | Sim (se Supabase transiente) |
| **Consome trial?** | Não (estorno) |
| **Cria análise parcial?** | Não (upsert falhou) |

### 3.10 COMPLETED_WITH_WARNINGS

| Campo | Detalhe |
|---|---|
| **Causa** | Análise persistida com sucesso mas campos não-críticos ausentes (ex: preconditions ausentes, erc_level null) |
| **Detecção atual** | NÃO EXISTE — não há verificação de campos não-críticos |
| **Resposta do sistema** | `events.status = 'completed'`; análise disponível sem distinção |
| **Mensagem ao usuário** | Nenhuma |
| **Log esperado** | Não existe; deveria emitir `COMPLETED_WITH_WARNINGS` com lista de campos ausentes |
| **Retry?** | Sim (re-análise manual) |
| **Consome trial?** | Sim |
| **Cria análise parcial?** | Sim (tecnicamente) |

### 3.11 COMPLETED

| Campo | Detalhe |
|---|---|
| **Causa** | Todos os campos do pipeline preenchidos, análise persistida |
| **Detecção atual** | Implícito — nenhuma verificação explícita de completude após upsert |
| **Resposta do sistema** | `events.status = 'completed'`; `credits_used = 1`; resposta ao cliente com seraAnalysis completo |
| **Mensagem ao usuário** | Análise disponível |
| **Retry?** | Não aplicável |
| **Consome trial?** | Sim |
| **Cria análise parcial?** | Não |

---

## 4. Política de Retry

### O que pode ser reexecutado

- `AI_UNAVAILABLE` — após corrigir configuração de IA
- `AI_INVALID_OUTPUT` — instabilidade do modelo; nova tentativa pode ter sucesso
- `EXTRACTION_FAILED` — com texto mais rico ou diferente
- `PERSISTENCE_FAILED` — se Supabase estava indisponível temporariamente

### O que não deve duplicar crédito

- Re-análise de evento existente (bodycom `eventId`): não débita crédito — implementado em `/api/analyze`
- Estorno automático: implementado em `tenant-user.ts` via `refundCreditForFailedAnalysis`

### Idempotência

- Upsert em `analyses` usa `onConflict: 'event_id'` — re-análise do mesmo evento sobrescreve, não duplica
- `credit_transactions`: sem proteção contra duplicidade — double-debit possível se cliente re-submete antes de confirmar

### Recálculo seletivo

- `/api/analyses/[analysisId]/recalculate` — altera um campo e propaga dependências via `DEPENDENCY_MAP`
- Registrado em `analysis_edits` com value_before/value_after
- Não consome crédito — não débita `credit_transactions`

---

## 5. Política de Resultado Parcial

### Quando é permitido

Atualmente: sempre — não há verificação. Resultado parcial é salvo silenciosamente.

### Como deveria ser mostrado (recomendação)

- Banner visível na tela de análise: "Análise incompleta — campos [X] não determinados. Revise ou re-analise."
- Status diferenciado: não usar o mesmo ícone/cor de "completo"
- Bloqueio de aprovação formal

### Como auditar

- Adicionar campo `analysis_completeness` em `analyses`: 'complete', 'partial', 'failed'
- Registrar campos ausentes em `analysis_warnings` JSONB

### O que nunca mostrar

- Resultado parcial como aprovado/final
- Classificação P/O/A sem evidência (null deve ser explicitamente visível)

---

## 6. Política de Erro de IA

### Provider timeout

- Timeout configurado: `LLM_TIMEOUT_MS = 120_000` (2 minutos)
- `maxDuration` das rotas Next.js: 300 segundos
- Comportamento: se LLM demorar >120s → erro transiente → retry (2x com backoff 1-2s)
- Conflito latente: se LLM demorar exatamente entre 120s e 300s após retries, a rota ainda responde; se somar ao timeout total e ultrapassar 300s, Next.js mata a conexão sem resposta ao cliente

### Output inválido

- `safeParse` tenta 4 estratégias de limpeza sequenciais
- `askJson` adiciona 1 retry de parse com nova chamada LLM
- Após todos os retries: lança exceção com preview dos primeiros 600 chars

### Baixa confiança (não implementado)

- O motor não expõe score de confiança por classificação
- Recomendação: adicionar campo `confidence_score` ou `confidence_level` no output do pipeline

### Inconsistência P/O/A

- O motor SERA tem regras de exclusão (`rules/exclusions/`) que previnem combinações inválidas
- Se regras forem violadas: depende do motor — documentado em `docs/SERA_CAUSAL_ANCHORING_GATE_v0.1.3-C.md`

### Fallback de provider

- Não existe fallback automático entre providers — se o provider ativo falha, a análise falha
- Recomendação: documentar como operação manual (mudar AI settings + re-analisar)

---

## 7. Mensagens Padrão para Usuário (em Português)

| Estado | Mensagem |
|---|---|
| `INPUT_VALIDATION_FAILED` | "Título e relato são obrigatórios para iniciar a análise." |
| `AI_UNAVAILABLE` (chave ausente) | "Provedor de IA não configurado. Verifique as configurações de IA." |
| `AI_UNAVAILABLE` (provider offline) | "Serviço de análise temporariamente indisponível. Tente novamente em alguns minutos." |
| `AI_INVALID_OUTPUT` | "Não foi possível processar a resposta da IA. Tente novamente." |
| `EXTRACTION_FAILED` | "Falha na análise do relato. Verifique se o texto contém informações suficientes sobre o evento." |
| `PERSISTENCE_FAILED` | "Falha ao salvar a análise. Tente novamente." |
| `PARTIAL_CLASSIFICATION` (recomendado, não implementado) | "Análise incompleta: alguns campos não foram determinados. Revise os resultados ou re-analise o evento." |
| `QUOTA_ERROR` | "Créditos insuficientes para realizar a análise." |
| `COMPLETED` | "Análise concluída com sucesso." |

---

## 8. Critérios para Bloquear Aprovação Formal da Análise

Os seguintes critérios devem impedir que uma análise seja marcada como aprovada/formal (nenhum está implementado atualmente):

1. `perception_code`, `objective_code` ou `action_code` é null — classificação incompleta
2. `escape_point` é null — ponto de fuga da operação segura não identificado
3. `erc_level` é null — nível de risco não calculado
4. `events.status = 'failed'` — evento em estado de falha
5. Existência de `analysis_edits` sem `reason` preenchido — override sem justificativa
6. `recommendations` null ou array vazio — sem recomendações geradas

**Estado atual:** nenhum desses critérios é verificado; não existe campo `approved` ou `formal_status` em `analyses`.

---

## 9. Lacunas Atuais Observadas no Código

| Lacuna | Severidade |
|---|---|
| Resultado parcial (P/O/A null) não detectado nem sinalizado | P1 |
| Estado `COMPLETED_WITH_WARNINGS` não existe | P1 |
| Sem log de qual step SERA falhou (apenas stage 'run-pipeline') | P1 |
| Sem log de duração do pipeline | P1 |
| Sem campo `motor_version` em `analyses` | P1 |
| Sem campo `analysis_completeness` em `analyses` | P1 |
| Sem mecanismo de re-análise automática de eventos 'failed' | P1 |
| Sem campo `approved` / `formal_status` em `analyses` | P2 |
| Sem score de confiança por classificação | P2 |
| Sem fallback automático de provider LLM | P2 |
| Conflito latente entre LLM_TIMEOUT_MS e maxDuration | P1 |
| Double-debit possível se cliente re-submete antes de resposta | P2 |

---

## 10. Recomendações por Prioridade

### P0

- **Detectar resultado parcial**: após `runSeraPipeline`, verificar se `perception_code`, `objective_code`, `action_code` e `escape_point` estão preenchidos. Se não, persistir com `analysis_completeness = 'partial'` e sinalizar ao usuário.

### P1

- **Adicionar campo `motor_version`** em `analyses`: gravar a versão semântica do motor SERA no momento da análise (ex: "0.1.3-C").
- **Adicionar campo `analysis_completeness`** em `analyses`: valores 'complete', 'partial', 'failed'.
- **Adicionar log de `analysis.started`** e `analysis.completed` com duração e provider em `complete-sera-analysis.ts`.
- **Documentar explicitamente o comportamento de LLM_TIMEOUT_MS vs maxDuration** e alinhar os valores.
- **Mecanismo de re-análise**: rota PATCH `/api/events/[id]/retry` para re-disparo do pipeline sem novo crédito.

### P2

- **Adicionar campo `approved`** em `analyses` e critérios de bloqueio de aprovação formal.
- **Fallback manual de provider**: documentar o procedimento passo-a-passo para o operador quando o provider ativo estiver indisponível.
- **Proteção contra double-debit**: usar `credit_transactions` com idempotency key (ex: hash de event_id + timestamp).
- **Implementar `COMPLETED_WITH_WARNINGS`**: sinalizar quando campos não-críticos estão ausentes sem bloquear a análise.

### P3

- **Score de confiança por classificação**: adicionar campo opcional `confidence` no output do pipeline para cada classificação P/O/A.
- **Timeout adaptativo**: considerar aumentar `LLM_TIMEOUT_MS` para 180s para acomodar modelos mais lentos.
