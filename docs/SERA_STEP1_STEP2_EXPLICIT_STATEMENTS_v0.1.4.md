# SERA Step 1/Step 2 Explicit Statements
## v0.1.4-A3-d2

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d2  
**Tipo:** Evolução observacional de trace em `raw_llm_output` (sem alteração classificatória)

---

## 1. Objetivo da A3-d2

Preencher experimentalmente `goal_statement`, `perception_statement` e `action_statement` em `raw_llm_output.step1_step2_explicit_trace`, com extração conservadora e auditável baseada apenas em dados já existentes no pipeline.

---

## 2. O que foi adicionado ao trace

- Campos opcionais de evidência por statement:
  - `goal_evidence`
  - `perception_evidence`
  - `action_evidence`
- Novos helpers em `pipeline.ts` para extração local de statements por pistas textuais.
- Atualização de `evidence_quality` para considerar presença de evidência por statement.

---

## 3. Como goal/perception/action statements são extraídos

Sem nova chamada LLM. Fontes:

- `rawInput`
- `step2.agente`
- `step2.ato_inseguro_factual`
- `step2.momento`
- `step2.justificativa`
- `step3.nos_percorridos`
- `step4.nos_percorridos`
- `step5.nos_percorridos`

Regras:

- `goal_statement`: só é preenchido com sinal textual explícito de intenção/objetivo (ex.: `pretendia`, `tentava`, `objetivo era`, `buscava`, `planejava`).
- `perception_statement`: só é preenchido com sinal textual explícito de percepção/interpretação (ex.: `percebeu`, `não percebeu`, `entendeu`, `interpretou`, `viu`, `ouviu`, `radar mostrava`).
- `action_statement`: mantém `step2.ato_inseguro_factual` como base; quando possível, adiciona evidência textual de suporte por sobreposição de termos em `rawInput`/nodes.

---

## 4. Critérios de não invenção

- Nenhum statement é derivado apenas de código P/O/A.
- Sem evidência textual suficiente, o campo permanece `null`.
- Em lacuna de evidência, `unanswered_questions` registra o ponto pendente.
- A extração usa heurística conservadora e pode não preencher statement mesmo com classificação completa.

---

## 5. Evidence quality

Critérios aplicados:

- `sufficient`: há `safe_operation_escape_point`, `direct_actor`, `action_statement` com evidência, e pelo menos `goal_statement` ou `perception_statement` com evidência.
- `partial`: há base mínima (`escape_point`, `actor`, `action`), mas goal/perception estão ausentes ou sem robustez suficiente.
- `insufficient`: falta `escape_point`, `actor` ou `action_statement` com evidência.
- `unknown`: fallback para casos não classificáveis pela regra.

---

## 6. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates.
- Prompts classificatórios de Step 3/4/5.
- Fixtures/candidates/baseline.
- Schema/migrations.
- Top-level do payload (trace permanece dentro de `raw_llm_output`).

---

## 7. Limitações conhecidas

- Statements seguem sendo experimentais.
- Extração é heurística conservadora.
- Não há nova chamada LLM dedicada a Step 2 explícito.
- Evidência ainda pode depender de texto de nós internos, sinalizada em `unanswered_questions` quando parcial.

---

## 8. Próxima fase recomendada

**A3-d3**: evoluir separação explícita `unsafe_act` vs `unsafe_condition`, mantendo invariância classificatória.

