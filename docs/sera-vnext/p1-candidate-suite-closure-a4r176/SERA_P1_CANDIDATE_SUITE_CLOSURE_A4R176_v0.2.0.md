# SERA P1 Candidate Suite Closure — A4R176

Status:
- DRAFT_ONLY
- CANDIDATE_SUITE_CLOSURE
- NO_OFFICIAL_RUNNER_CHANGE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Fechar formalmente a suite P1 candidate-only, consolidando P1-A e P1-B em um estado unico de referencia controlada, sem alteracao de baseline, runner oficial, motor ou fixtures oficiais.

## 2. Fontes lidas

- `docs/sera-vnext/fixture-implementation-contract-a4r172/SERA_FIXTURE_IMPLEMENTATION_CONTRACT_P1A_A4R172_v0.2.0.md`
- `docs/sera-vnext/fixture-implementation-contract-a4r172/SERA_FIXTURE_IMPLEMENTATION_RESULT_P1A_A4R172_v0.2.0.md`
- `docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_AUDIT_A4R173_v0.2.0.md`
- `docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_RESULT_A4R173_v0.2.0.md`
- `docs/sera-vnext/candidate-validation-closure-a4r174/SERA_P1A_CANDIDATE_VALIDATION_CLOSURE_A4R174_v0.2.0.md`
- `docs/sera-vnext/candidate-validation-closure-a4r174/SERA_P1B_EXECUFLIGHT_MULTI_ACTOR_EXPANSION_CONTRACT_A4R174_v0.2.0.md`
- `docs/sera-vnext/candidate-runner-a4r175/SERA_P1B_EXECUFLIGHT_CANDIDATE_IMPLEMENTATION_RESULT_A4R175_v0.2.0.md`
- `docs/sera-vnext/candidate-runner-a4r175/SERA_P1B_EXECUFLIGHT_CANDIDATE_MATRIX_A4R175_v0.2.0.csv`
- `tests/sera/fixtures-candidates/reference-p1a/REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json`
- `tests/sera/fixtures-candidates/reference-p1a/REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json`
- `tests/sera/fixtures-candidates/reference-p1a/reference-p1a-fixtures.txt`
- `tests/sera/fixtures-candidates/reference-p1b/REF-P1B-EXECUFLIGHT-1526-FO-PF-001.json`
- `tests/sera/fixtures-candidates/reference-p1b/REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001.json`
- `tests/sera/fixtures-candidates/reference-p1b/reference-p1b-fixtures.txt`

## 3. Estado atual da suite P1

A suite P1 contem 4 fixtures candidate-only, todos fora do runner oficial:

- P1-A: 2 fixtures (positive reference + negative control).
- P1-B: 2 fixtures multiator para EXECUFLIGHT-1526, com um unico `escapePointId` e dois `actorContributionId`.

Os 4 fixtures seguem bloqueios de baseline/release/downstream e nao alteram contratos oficiais.

## 4. Fixtures P1-A

- `REF-P1A-DAUMAS-CASE-4-POSITIVE-001`
  - expected: `P-G / O-D / A-F`
  - `humanPoaApplicable = true`
  - `negativeControl = false`
- `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001`
  - expected: `NOT_APPLICABLE_AT_ESCAPE_POINT` em P/O/A
  - `humanPoaApplicable = false`
  - `negativeControl = true`

## 5. Fixtures P1-B

- `REF-P1B-EXECUFLIGHT-1526-FO-PF-001`
  - `escapePointId = EXECUFLIGHT-1526-ESCAPE-001`
  - `actorContributionId = EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF`
  - expected: `P-D / O-D / A-H`
- `REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001`
  - `escapePointId = EXECUFLIGHT-1526-ESCAPE-001`
  - `actorContributionId = EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM`
  - expected: `P-A / O-D / A-G`

Confirmacao estrutural:
- um unico `escapePointId` em EXECUFLIGHT;
- separacao estrita FO/PF e Captain/PM por `actorContributionId`.

## 6. Resultado dos validadores

Execucoes A4R176:

- `node docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs` -> PASS
- `node docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs` -> PASS
- `node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1b-candidate-runner.mjs` -> PASS
- `node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1-candidate-suite.mjs` -> PASS

Consolidado:
- `totalFixtures = 4`
- `p1aNegativeControlPreserved = true`
- `p1bSingleEscapePoint = true`
- `officialRunnerTouched = false`
- `officialFixturesTouched = false`
- `baselineTouched = false`
- `apiCall = false`
- `llmCall = false`

## 7. Cobertura metodologica

Cobertura atual da suite P1:

- P1-A positive reference (ato humano direto com P/O/A aplicavel).
- P1-A negative control (onset tecnico/ambiental com P/O/A humano nao aplicavel no ponto de fuga).
- P1-B multiator no mesmo ponto de fuga (FO/PF e Captain/PM segregados por contribuicao).

Assim, a suite cobre:
- caso humano aplicavel;
- caso de controle negativo sem P/O/A humano no ponto de fuga;
- caso multiator com separacao de contribuicoes no mesmo `escapePointId`.

## 8. Limitacoes

- Suite permanece candidate-only e docs-only.
- Sem integracao com runner oficial.
- Sem schema oficial para `NOT_APPLICABLE_AT_ESCAPE_POINT`.
- Sem adaptacao oficial para multiator no fluxo atual.
- Sem promocao para baseline.

## 9. Decisao: manter P1 como candidate-only

Decisao mantida: P1-A e P1-B continuam candidate-only ate fase autorizada de promocao com gates metodologicos e tecnicos explicitos.

## 10. Decisao: nao adaptar runner oficial agora

Decisao mantida: nao alterar `tests/sera/runner.ts`, `tests/sera/run.ts`, `tests/sera/report.ts` nesta fase.

Justificativa:
- evita contaminacao de baseline e contratos legados;
- preserva isolamento de `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- evita acoplamento prematuro de multiator no pipeline oficial.

## 11. Decisao: runner vNext separado e o caminho recomendado

Decisao recomendada para fase futura: criar runner vNext separado para trilha candidate, com schema proprio e controles de compatibilidade, mantendo runner oficial intacto.

## 12. Criterios para promocao futura

Promocao somente com:

1. aprovacao humana explicita de cada fixture candidate;
2. contrato formal de schema/scoring para `NOT_APPLICABLE_AT_ESCAPE_POINT`;
3. contrato formal de multiator em escape point unico;
4. validadores de regressao entre suite candidate e contratos vNext;
5. fase autorizada para estrategia de convergencia com baseline.

## 13. Proxima fase recomendada

Abrir fase de desenho tecnico do runner vNext separado (sem alterar runner oficial), com:

- schema candidate vNext;
- politica de scoring causal para P/O/A e nao aplicabilidade;
- suporte estruturado a multiator no mesmo `escapePointId`;
- plano de teste e gates de promocao.
