# SERA Evidence Expansion and vNext Runner Architecture — A4R177

Status:
- DRAFT_ONLY
- ARCHITECTURE_AND_EVIDENCE_EXPANSION_PLAN
- NO_RUNNER_IMPLEMENTATION
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Definir a arquitetura do runner vNext separado e o plano de expansao de evidencia metodologica antes de qualquer implementacao de runner, mantendo o legado intocado.

## 2. Estado atual P1

A suite P1 candidate-only esta fechada com 4 fixtures validados:
- P1-A positive: `REF-P1A-DAUMAS-CASE-4-POSITIVE-001` -> `P-G / O-D / A-F`;
- P1-A negative control: `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001` -> `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- P1-B multiator FO/PF: `REF-P1B-EXECUFLIGHT-1526-FO-PF-001` -> `P-D / O-D / A-H`;
- P1-B multiator Captain/PM: `REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001` -> `P-A / O-D / A-G`.

## 3. Por que P1 nao basta para validacao metodologica

- P1 cobre poucos pontos do espaco P/O/A;
- P1 nao representa distribuicao real de cenarios do corpus amplo;
- P1 nao cobre amplitude de qualidade de evidencia de eventos reais;
- P1 nao cobre lacunas de fronteira para todos os codigos ativos.

## 4. Arquitetura proposta do runner vNext separado

- runner vNext separado do runner legado;
- leitura de diretórios candidate/reference dedicados;
- pipeline de validacao causal sem alterar contratos oficiais;
- relatorios e baseline vNext em trilha separada.

## 5. Schema conceitual de fixture vNext

Campos nucleares:
- `id`, `sourceCaseId`, `fixtureStatus`, `referenceStatus`;
- `escapePointId`, `actorContributionId` (quando aplicavel), `multiActor`;
- `expected` (P/O/A ou nao classificavel no ponto de fuga);
- `expectedTrace`, `assertions`, `locks`;
- metadados de evidencia: `sourceType`, `evidenceQuality`, `sourcePath`.

## 6. Suporte a `NOT_APPLICABLE_AT_ESCAPE_POINT`

- manter restrito a trilha candidate/vNext;
- explicitar no schema vNext o estado de nao aplicabilidade;
- nao acoplar ao runner oficial nesta etapa.

## 7. Suporte a multiator por `actorContributionId`

- um unico `escapePointId` por escopo de analise;
- contribuicoes separadas por `actorContributionId`;
- proibido criar linguagem de novo ponto de fuga.

## 8. Isolamento do runner legado

Manter intocados:
- `tests/sera/runner.ts`
- `tests/sera/run.ts`
- `tests/sera/report.ts`
- `tests/sera/fixtures/**`
- baseline legado.

## 9. Politica de baseline vNext separada

- baseline vNext nao substitui baseline legado;
- baseline vNext e candidate-only inicialmente;
- convergencia futura exige fase autorizada e gates formais.

## 10. Papel dos eventos reais

Eventos reais sao a fonte primaria de robustez metodologica:
- priorizar diversidade de contexto operacional;
- priorizar evidencia oficial e rastreavel;
- preservar separacao entre fato, interpretacao original e hipotese SERA.

## 11. Papel dos eventos sintéticos

Eventos sintéticos sao instrumentos de cobertura de lacuna:
- usados somente apos triagem real;
- nunca tratados como evidencia historica;
- focados em gaps de codigo, fronteira e armadilhas metodologicas.

## 12. Ordem correta: real events primeiro, sintéticos depois

1. inventariar corpus real;
2. mapear cobertura real por P/O/A;
3. identificar lacunas persistentes;
4. planejar eventos sintéticos de forma rastreavel.

## 13. Matriz de cobertura P/O/A

A matriz inicial foi definida em:
- `SERA_P_O_A_COVERAGE_TARGET_MATRIX_A4R177_v0.2.0.csv`

Ela combina:
- cobertura atual por P1;
- necessidade de eventos reais adicionais;
- permissao condicional de sintéticos por gap persistente.

## 14. Critérios de seleção dos 100+ eventos reais

- fonte oficial ou corpus interno rastreavel;
- clareza de ponto de fuga;
- potencial de cobertura para codigos pouco representados;
- qualidade minima de evidencias para adjudicacao posterior;
- distribuicao por tipo de evento e configuracao de ator.

## 15. Critérios para criação de eventos sintéticos

So criar se:
- gap nao coberto por eventos reais suficientes;
- objetivo de coverage estiver explicito na matriz;
- houver `prohibitedInference` claro;
- houver trilha de aprovacao autoral.

## 16. Riscos e bloqueios

- risco de pressao para promover candidate cedo;
- risco de contaminacao do runner oficial por acoplamento precoce;
- risco de inferencia indevida ao usar eventos sintéticos sem gate;
- bloqueio: nenhuma implementacao de runner nesta fase.

## 17. Plano macro A4R178–A4R184

A sequencia macro foi consolidada em:
- `SERA_A4R178_TO_A4R184_MACRO_PLAN_v0.2.0.md`

Diretriz central:
- primeiro inventario e expansao de eventos reais;
- depois desenho de sintéticos por lacuna;
- implementacao do runner vNext separado apenas apos gates.
