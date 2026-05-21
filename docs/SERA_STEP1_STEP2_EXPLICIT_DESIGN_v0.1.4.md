# SERA Step 1/Step 2 Explicit Design
## v0.1.4-A3-d-plan

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d-plan  
**Tipo:** Desenho técnico-metodológico (documental) — sem alteração de código, fixtures, candidates, baseline, schema ou migrations

---

## 1. Propósito

Definir um desenho técnico-metodológico para evoluir o pipeline HFA/SERA de forma incremental, tornando explícito o fluxo Hendy/Daumas/HFA no trecho crítico:

`relato → ponto de fuga da operação segura → unsafe act/unsafe condition → ator direto → goal/perception/action statements → ladders P/O/A → active failure → preconditions → ERC → recomendações → decision_trace`

Objetivo desta fase: especificar contrato conceitual e estratégia de migração, **sem implementação**.

---

## 2. Estado Atual

### 2.1 O que o HFA Step 1 faz hoje

- `runStep1` extrai metadados factuais (summary, data, local, fase, clima, sistemas etc.).
- Não identifica formalmente o departure point.
- Funciona como contextualização do evento, não como Step 1 de Hendy.

### 2.2 O que o HFA Step 2 faz hoje

- `runStep2` identifica `agente`, `ato_inseguro_factual`, `momento`, `justificativa`.
- Na prática, aproxima o **Step 1 de Hendy** (ponto de fuga/departure from safe operation).
- Já gera `unsafe_agent` e `unsafe_act` no payload final.

### 2.3 O que está ausente frente ao Hendy Step 1/2

- Distinção explícita `unsafe_act` vs `unsafe_condition`.
- Campo explícito de `direct_actor` e nível do ator (`actor_level`) no output.
- Step 2 de Hendy explícito (goal/perception/action statements antes das ladders).
- Estrutura de `unanswered_questions` e estado formal de evidência insuficiente.

### 2.4 O que Daumas oferece como operacionalização aplicada

- Codificação P/O/A utilizável em banco/dashboards/relatórios.
- Organização didática das etapas e nomenclatura operacional.
- Aplicabilidade para investigação real com foco em rastreabilidade prática.

### 2.5 O que A3-b já resolveu

- `raw_llm_output.decision_trace` mínimo por eixo (fonte, código, nós, descartes, insuficiência detectada).
- `raw_llm_output.preconditions_trace` mínimo (mecanismo e source_rule_ids).
- Preservação de `sourceRuleId` nas preconditions quando disponível.

### 2.6 O que ainda falta

- Step 1/2 explícitos no sentido Hendy.
- question_trace estruturado por pergunta.
- cadeia causal explícita `active_failure -> precondition -> evidence`.
- separação de papéis da LLM como respondente estruturada (não classificadora livre).

---

## 3. Problema Metodológico

O pipeline atual é funcional e calibrado, mas o trecho pré-ladder está parcialmente implícito:

- O departure point existe, porém com semântica distribuída entre Step 2 e campos atuais.
- Goal/perception/action aparecem como resultado inferido das ladders, não como statements explícitos prévios.
- Isso reduz auditabilidade externa da cadeia causal e aumenta risco de leitura de P/O/A como classificação direta de relato.

---

## 4. Princípios de Governança

1. Hendy é fonte primária da lógica causal.
2. Daumas é operacionalização aplicada legítima.
3. HFA é implementação auditável; adaptações devem ser explícitas.
4. Fixtures/candidates validam motor; não definem metodologia.
5. Mudanças iniciais devem ser observacionais (trace), preservando comportamento classificatório.

---

## 5. Contrato Conceitual Proposto

```ts
safe_operation_escape_point?: string
unsafe_event_type?: 'unsafe_act' | 'unsafe_condition' | 'mixed' | 'unknown'
unsafe_act_statement?: string
unsafe_condition_statement?: string
direct_actor?: string
actor_level?: 'frontline_operator' | 'crew' | 'maintenance' | 'supervision' | 'organization' | 'unknown'
goal_statement?: string
perception_statement?: string
action_statement?: string
evidence_quality?: 'sufficient' | 'partial' | 'insufficient'
unanswered_questions?: string[]
```

### 5.1 Semântica, origem e destino por campo

| Campo | Significado | Origem no fluxo SERA | Status metodológico | Destino recomendado |
|---|---|---|---|---|
| `safe_operation_escape_point` | Frase canônica do ponto de fuga (momento crítico sem retorno seguro) | Step 1 Hendy (departure point) | SOURCE_DIRECT_HENDY + DAUMAS_TRANSLATION | Ambos (`output final` e `raw_llm_output`) |
| `unsafe_event_type` | Tipo do desvio primário (`unsafe_act`, `unsafe_condition`, `mixed`, `unknown`) | Step 1 Hendy (unsafe act/condition) | SOURCE_DIRECT_HENDY + GAP atual HFA | Inicialmente `raw_llm_output`; depois ambos |
| `unsafe_act_statement` | Statement factual do ato inseguro | Step 1 Hendy | SOURCE_DIRECT_HENDY + DAUMAS_OPERATIONALIZATION | Ambos |
| `unsafe_condition_statement` | Statement factual da condição insegura (quando houver) | Step 1 Hendy | SOURCE_DIRECT_HENDY + GAP atual HFA | Inicialmente `raw_llm_output`; depois ambos |
| `direct_actor` | Agente que controlava a variável crítica no ponto de fuga | Step 1 Hendy | SOURCE_INFERRED_FROM_HENDY + DAUMAS_OPERATIONALIZATION | Ambos |
| `actor_level` | Nível do ator para governança diagnóstica | Ponte Step 1 → pré-ladder/gates | HFA_ADAPTATION_REQUIRES_NOTE (com base em anti-gates atuais) | Inicialmente `raw_llm_output`; depois ambos |
| `goal_statement` | O que o ator direto tentava alcançar | Step 2 Hendy (pré-ladder) | SOURCE_DIRECT_HENDY | Inicialmente `raw_llm_output`; depois ambos |
| `perception_statement` | O que o ator direto percebeu/entendeu no momento | Step 2 Hendy (pré-ladder) | SOURCE_DIRECT_HENDY | Inicialmente `raw_llm_output`; depois ambos |
| `action_statement` | A ação executada no contexto da intenção e percepção | Step 2 Hendy (pré-ladder) | SOURCE_DIRECT_HENDY | Inicialmente `raw_llm_output`; depois ambos |
| `evidence_quality` | Suficiência global de evidência para os statements | Gate de qualidade metodológica antes da ladder | HFA adaptação necessária para controle de inferência | Inicialmente `raw_llm_output`; depois ambos |
| `unanswered_questions` | Perguntas que não puderam ser respondidas com evidência | Interface com question_trace | GAP atual HFA (alinhado à governança A3) | Inicialmente `raw_llm_output`; depois ambos |

### 5.2 Relação com ladders P/O/A e traces

- `goal_statement` alimenta interpretação de Step 4 (Objetivo).
- `perception_statement` alimenta interpretação de Step 3 (Percepção).
- `action_statement` alimenta interpretação de Step 5 (Ação).
- `decision_trace` passa a registrar: origem do código + consistência com statements.
- `preconditions_trace` passa a registrar: active failure selecionada + link causal + evidência textual.

---

## 6. Mapeamento HFA Atual vs Hendy/Daumas Desejado

| Elemento | HFA atual | Hendy/Daumas desejado | Status | Risco | Evolução |
|---|---|---|---|---|---|
| Step 1 metadata | Extrator factual de contexto | Manter como metadados, renomeando papel para evitar confusão com Hendy Step 1 | Parcial | Baixo | Documentar como pre-step contextual |
| Step 2 escape point | Já identifica agente/ato/momento/justificativa | Formalizar como `safe_operation_escape_point` + tipo do evento inseguro | Parcial | Médio | A3-d1/A3-d3 |
| unsafe_act | Existe (`unsafe_act`) | Manter com statement explícito | Parcial | Baixo | A3-d1 |
| unsafe_condition | Inexistente | Campo explícito para condição insegura | Gap | Alto | A3-d3 |
| direct_actor | Implícito em `unsafe_agent` | Campo explícito de ator direto | Parcial | Médio | A3-d4 |
| actor_level | Apenas lógica interna (anti-gates) | Campo explícito auditável | Gap | Médio/Alto | A3-d4 |
| goal_statement | Inexistente como etapa explícita | Statement pré-ladder | Gap | Alto | A3-d2 |
| perception_statement | Inexistente como etapa explícita | Statement pré-ladder | Gap | Alto | A3-d2 |
| action_statement | Parcial (`ato_inseguro_factual`) | Statement pré-ladder em formato canônico | Parcial | Médio | A3-d2 |
| question_trace | Nós/gates em estrutura heterogênea | Perguntas com IDs, answer/evidence/confidence | Gap | Alto | Pós A3-d2 |
| decision_trace | Mínimo em `raw_llm_output` (A3-b) | Manter + ampliar vínculo com statements | Parcial | Médio | A3-d1/A3-d2 |
| preconditions_trace | Mínimo em `raw_llm_output` (A3-b) | Cadeia causal explícita `active_failure -> precondition -> evidence` | Parcial | Alto | A3-d5/A3-d6 |

---

## 7. Papel Futuro da LLM

### 7.1 A LLM deve atuar como

- extratora de evidência;
- respondente de perguntas estruturadas;
- geradora de statements com evidência;
- avaliadora de suficiência de evidência.

### 7.2 A LLM não deve atuar como

- classificador livre do evento inteiro;
- autoridade metodológica;
- substituto da ladder;
- geradora de fatos ausentes.

### 7.3 Formato futuro de resposta estruturada

```json
{
  "answer": "yes|no|partial|insufficient_evidence",
  "statement": "...",
  "evidence": "...",
  "confidence": "high|medium|low",
  "uncertainty": "..."
}
```

Aplicação: cada pergunta de step/ladder deve receber esse bloco, permitindo reconstruir decisão e identificar lacunas de evidência sem forçar classificação indevida.

---

## 8. Estratégia Incremental de Implementação

Sem reescrita ampla. Sequência proposta:

1. **A3-d1**: adicionar campos de trace em `raw_llm_output` apenas (sem schema).
2. **A3-d2**: extrair `goal/perception/action_statement` como trace experimental, sem afetar P/O/A.
3. **A3-d3**: adicionar `unsafe_act` vs `unsafe_condition` experimental.
4. **A3-d4**: adicionar `direct_actor/actor_level` experimental.
5. **A3-d5**: criar fixtures com `expected_trace`.
6. **A3-d6**: só então avaliar schema/migrations.
7. **A3-d7**: só então avaliar impacto em baseline.

---

## 9. Invariantes de Segurança

Nas fases iniciais (A3-d1 a A3-d5), não pode mudar:

- P/O/A/ERC;
- gates existentes;
- fixtures;
- baseline;
- schema (inicialmente).

Regras de inferência:

- campos novos entram primeiro em `raw_llm_output`;
- inferência sem evidência direta deve virar `insufficient_evidence`;
- ausência de dado não pode ser mascarada como certeza.

---

## 10. Riscos e Mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Aumento de custo LLM | Médio | Reuso de contexto, perguntas curtas, execução incremental e telemetria de tokens por fase |
| Statements inventados | Alto | Exigir `evidence` por statement + `insufficient_evidence` obrigatório sem suporte textual |
| Quebra de compatibilidade de API | Alto | Introduzir primeiro em `raw_llm_output`; só promover a schema após validação |
| Falso senso de precisão | Alto | Expor `evidence_quality`, `confidence` e `uncertainty` de forma explícita |
| Confusão entre unsafe act e unsafe condition | Alto | Definições canônicas + exemplos negativos + revisão por fixture traceada |
| `actor_level` virar classificação organizacional indevida | Médio/Alto | Limitar semântica ao ator direto no ponto de fuga; usar `unknown` quando ambíguo |
| Impacto em dashboards/produto | Médio | Fasear rollout: trace interno primeiro, contrato externo só após estabilidade |

---

## 11. Recomendação de Próxima Fase

Prosseguir com **A3-d1** apenas:

- foco exclusivo em enriquecimento observacional de `raw_llm_output`;
- sem alterar P/O/A/ERC;
- sem alterar schema, fixtures, baseline;
- com validação de não-regressão metodológica e técnica.

---

## 12. Conclusão

O desenho A3-d-plan estabelece uma ponte segura entre o estado atual do HFA/SERA e um fluxo mais explícito no sentido Hendy/Daumas, sem romper estabilidade do motor. A estratégia correta é incremental: primeiro rastrear melhor (trace), depois explicitar statements, só então discutir contrato externo/schema e impacto em baseline.

Este documento fecha o desenho metodológico necessário para iniciar A3-d1 com risco controlado.

