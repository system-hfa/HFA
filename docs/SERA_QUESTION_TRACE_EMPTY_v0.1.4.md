# SERA Question Trace Empty
## v0.1.4-A3-d5b

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5b  
**Tipo:** Implementação observacional mínima em `raw_llm_output` (sem alteração classificatória)

## 1. Objetivo da A3-d5b

Adicionar o primeiro artefato técnico de `question_trace` no pipeline SERA, sem preencher perguntas nesta fase e sem impactar qualquer decisão classificatória.

## 2. O que foi adicionado

- Tipos mínimos de `question_trace` em `frontend/src/lib/sera/types.ts`:
  - `SeraQuestionAnswer`
  - `SeraQuestionSource`
  - `SeraQuestionStep`
  - `SeraQuestionTraceItem`
- Novo campo no `raw_llm_output` em `frontend/src/lib/sera/pipeline.ts`:
  - `question_trace: []`

## 3. Onde foi armazenado

O novo campo foi armazenado exclusivamente em:

- `raw_llm_output.question_trace`

Não houve adição de campo top-level no payload nem alteração de schema.

## 4. Por que o array fica vazio nesta fase

A fase A3-d5b existe para introduzir apenas o recipiente técnico de auditabilidade, preservando invariância total do motor. O preenchimento de perguntas (`question_id`, `answer`, `evidence`, `confidence`) será feito somente nas fases posteriores.

## 5. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates.
- Prompts classificatórios.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.

## 6. Relação com SERA_QUESTION_TRACE_DESIGN_v0.1.4.md

Esta implementação executa exatamente o passo incremental definido no plano A3-d5:

- A3-d5b: adicionar `question_trace: []` em `raw_llm_output` sem uso classificatório.

## 7. Próxima fase recomendada

- **A3-d5c**: preencher perguntas de Step 1/2 com dados já existentes, mantendo pós-processamento puro/read-only e invariância classificatória.
