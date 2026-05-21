# SERA Question Trace Step 1/Step 2
## v0.1.4-A3-d5c

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5c  
**Tipo:** Evolução observacional de `question_trace` em `raw_llm_output` (sem alteração classificatória)

## 1. Objetivo da A3-d5c

Preencher experimentalmente `raw_llm_output.question_trace` com perguntas de Step 1/2 usando apenas dados já existentes no pipeline, sem influenciar P/O/A/ERC.

## 2. Question IDs preenchidos

Step 1:
- `S1_ESCAPE_POINT_IDENTIFIED`
- `S1_UNSAFE_ACT_IDENTIFIED`
- `S1_UNSAFE_CONDITION_IDENTIFIED`
- `S1_DIRECT_ACTOR_IDENTIFIED`
- `S1_ACTOR_LEVEL_IDENTIFIED`

Step 2:
- `S2_GOAL_STATEMENT_EXPLICIT`
- `S2_PERCEPTION_STATEMENT_EXPLICIT`
- `S2_ACTION_STATEMENT_EXPLICIT`
- `S2_EVIDENCE_SUFFICIENT_FOR_LADDERS`

## 3. Como as respostas são derivadas

- O helper `buildStep1Step2QuestionTrace(...)` é puro/read-only e roda somente no pós-processamento da montagem de `raw_llm_output`.
- Não há nova chamada LLM.
- As respostas são derivadas de:
  - `step2.agente`
  - `step2.ato_inseguro_factual`
  - `step2.momento`
  - `step2.justificativa`
  - `step1_step2_explicit_trace` já calculado
- Cada item preenche:
  - `question_id`, `step`, `question_text`
  - `answer`, `evidence`, `confidence`
  - `source`, `methodological_status`
  - `produced_code: null`, `discarded_codes: []`
  - `unanswered_reason`, `limitations`

## 4. Regras anti-invenção

- Não há `yes` sem evidência textual.
- Sem evidência suficiente: `insufficient_evidence`.
- Evidência parcial/indireta: `partial`.
- `unsafe_condition` não é extraída nesta fase; sem evidência explícita, permanece `insufficient_evidence`.
- O `question_trace` não é usado por gates nem por inferência de P/O/A/ERC.

## 5. Relação com `step1_step2_explicit_trace`

`question_trace` Step 1/2 é uma camada auditável derivada do `step1_step2_explicit_trace`:
- reutiliza `safe_operation_escape_point`, `unsafe_act_statement`, `unsafe_condition_statement`;
- reutiliza `direct_actor`, `actor_level` e evidências associadas;
- reutiliza `goal/perception/action statements` e `evidence_quality`.

## 6. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.

## 7. Limitações conhecidas

- Esta fase cobre somente as 9 perguntas de Step 1/2.
- Não preenche perguntas de ladders Perception/Objective/Action.
- Não preenche perguntas de Preconditions/ERC.
- `unsafe_condition` segue com lacuna metodológica controlada (`unsafe_condition_not_extracted_in_this_phase`).

## 8. Próxima fase recomendada

- **A3-d5d**: preencher perguntas de Perception/Objective/Action a partir de `nos_percorridos`, mantendo pós-processamento read-only e invariância classificatória.
