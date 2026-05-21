# SERA Step 1/Step 2 Explicit Trace
## v0.1.4-A3-d1

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d1  
**Tipo:** Implementação mínima observacional em `raw_llm_output` (sem alteração classificatória)

---

## 1. Objetivo da A3-d1

Introduzir um trace experimental explícito de Step 1/2 no sentido Hendy/Daumas/HFA, sem alterar a lógica de classificação do motor.

---

## 2. O que foi adicionado

- Novo objeto em `raw_llm_output`: `step1_step2_explicit_trace`.
- Novos tipos em `frontend/src/lib/sera/types.ts` para representar o trace:
  - `SeraEvidenceQuality`
  - `SeraUnsafeEventType`
  - `SeraActorLevel`
  - `SeraStep1Step2ExplicitTrace`
- Derivação local em `frontend/src/lib/sera/pipeline.ts`, sem nova chamada LLM.

---

## 3. De onde os campos são derivados

Derivação estritamente de dados já existentes no pipeline:

- `step2.agente`
- `step2.ato_inseguro_factual`
- `step2.momento`
- `step2.justificativa`
- `rawInput` (apenas para checagens conservadoras de sinal textual)

Regras implementadas:

- `safe_operation_escape_point`: composição conservadora de `momento`, `ato_inseguro_factual` e `justificativa`.
- `unsafe_act_statement`: `step2.ato_inseguro_factual` quando presente.
- `unsafe_condition_statement`: somente quando há sinal textual explícito de condição insegura; caso contrário `null`.
- `unsafe_event_type`: `unsafe_act`, `unsafe_condition`, `mixed` ou `unknown` conforme presença explícita dos statements.
- `direct_actor`: `step2.agente`.
- `actor_level`: heurística conservadora por texto do agente (`crew`, `maintenance`, `supervision`, `organization`, `frontline_operator`, `unknown`).
- `goal_statement` e `perception_statement`: `null` nesta fase (sem inferência nova).
- `action_statement`: proxy conservador com `step2.ato_inseguro_factual`.
- `evidence_quality`: `insufficient`, `partial`, `sufficient` ou `unknown` por presença de escape point/actor/action e ausência de statements explícitos.
- `unanswered_questions`: marca lacunas (`goal_statement_not_explicit`, `perception_statement_not_explicit`, etc.).
- `source`: `derived_from_existing_steps`.
- `limitations`: restrições explícitas da fase A3-d1.

---

## 4. Limitações

- Não implementa Hendy Step 2 completo.
- Não cria `question_trace` formal por pergunta.
- Não adiciona nova chamada LLM.
- Pode manter `goal_statement`/`perception_statement` nulos por desenho conservador.

---

## 5. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates existentes.
- Prompts classificatórios Step 3/4/5.
- Schema/migrations.
- Fixtures/candidates/baseline.
- Top-level do payload (trace adicionado apenas em `raw_llm_output`).

---

## 6. Relação com A3-d-plan

A implementação A3-d1 segue o desenho aprovado em `docs/SERA_STEP1_STEP2_EXPLICIT_DESIGN_v0.1.4.md`:

- primeiro adiciona observabilidade;
- preserva invariantes classificatórios;
- adia mudanças de schema e baseline para fases posteriores.

---

## 7. Próximas fases

1. **A3-d2:** extrair `goal/perception/action statements` experimentais sem afetar P/O/A.
2. **A3-d3:** separar `unsafe_act` vs `unsafe_condition` com maior robustez metodológica.
3. **A3-d4:** explicitar `direct_actor/actor_level` com validação ampliada.

