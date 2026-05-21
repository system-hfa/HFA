# SERA Trace Isolation Implementation
## v0.1.4-A3-isolation-implementation

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-isolation-implementation  
**Tipo:** Implementação mínima de isolamento pós-classificação para traces avançados

## 1. Objetivo da fase

Implementar uma base técnica mínima de isolamento read-only para traces avançados, sem alterar classificação P/O/A/ERC e sem retentar A3-d3/A3-d5d.

## 2. Ponto seguro de snapshot identificado

No `buildAnalysisUpsertPayload(...)`, após:

- definição final de `p3`, `p4`, `p5`;
- definição de `erc_level` em `step6_7` (já finalizada em `runSeraPipeline`);
- construção de `decision_trace`, `preconditions_trace`, `step1_step2_explicit_trace` e `question_trace` Step 1/2;
- normalização de `preconditions` e `recommendations`.

Esse ponto permite capturar snapshot sem recálculo de classificação e sem acoplamento com gates.

## 3. O que foi implementado

Em `frontend/src/lib/sera/pipeline.ts`:

- tipo local `DeepReadonly<T>` (somente para uso interno);
- tipo local `SeraFinalClassificationSnapshot`;
- helper puro `buildFinalClassificationSnapshot(...)`;
- helper puro `compareFinalClassificationSnapshot(before, after)`;
- extração conservadora de `precondition_codes` e `recommendations_count`;
- comparação de invariância em campos críticos do estado final.

Não houve nova chamada LLM.
Não houve alteração em gates/prompt/classificação.

## 4. Onde `trace_isolation` foi armazenado

Novo subcampo observacional em:

- `raw_llm_output.trace_isolation`

Estrutura mínima:

- `version`
- `snapshot_created`
- `invariant_fields`
- `stable_after_trace_build`
- `changed_fields`

## 5. Campos comparados

- `perception_code`
- `objective_code`
- `action_code`
- `erc_level`
- `precondition_codes`
- `recommendations_count`

## 6. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- `all-steps.ts`.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.

## 7. Como isso prepara A3-d3b e A3-d5d2

- Estabelece captura pós-classificação em ponto seguro.
- Introduz comparação explícita de invariância.
- Cria local único de observabilidade (`trace_isolation`) para futuras fases de trace avançado.
- Reduz risco de acoplamento por mutação em objetos compartilhados.

## 8. Limitações conhecidas

- Snapshot ainda é interno e mínimo; não expõe conteúdo completo no payload.
- Comparação atual não bloqueia runtime; é observacional.
- Não inclui validação de anchors por fixture no próprio runtime (continua externa via candidate-only).
- Não implementa A3-d3b nem A3-d5d2; apenas a base de isolamento.

## 9. Próxima fase recomendada

- A3-isolation-check: usar essa base para validar invariância em tentativa controlada e incremental (um subtrace por vez), antes de reabrir A3-d3b/A3-d5d2.
