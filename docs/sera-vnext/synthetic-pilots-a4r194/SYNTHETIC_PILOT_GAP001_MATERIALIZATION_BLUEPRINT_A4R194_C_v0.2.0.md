# Synthetic Pilot GAP-001 Materialization Blueprint A4R194-C v0.2.0

Status:
- BLUEPRINT_ONLY
- NO_SYNTHETIC_CASE_INSTANCE
- NO_SYNTHETIC_EVENT_NARRATIVE
- NO_FIXTURE
- NO_BASELINE
- PRODUCT_BLOCKED

## 1. Objetivo

Definir o pacote minimo de campos e controles para futura materializacao controlada de um unico piloto sintetico PF/PM do GAP-001, sem criar o caso nesta fase.

Fonte operacional de desenho: Daumas.

## 2. Campos minimos para futura materializacao

A futura fase de materializacao precisaria preencher, no minimo:

- `syntheticCaseId` (futuro, unico e rastreavel)
- `syntheticType`
- `learningGap`
- `agentSet`
- `pfAgentId`
- `pmAgentId`
- `crewCollectiveContext` (opcional, nunca substitutivo de PF/PM)
- `pfUnsafeActOrOmission`
- `pmMonitoringOrCalloutObligation`
- `pfOperationalMomentSequenceRef`
- `pmOperationalMomentSequenceRef`
- `pointTopology`
- `boundaryEvidenceRefs` (somente sinteticas)
- `prohibitedEvidenceRefs`
- `consequenceBoundary`
- `locks`
- `auditTrail`

## 3. Regras de materializacao futura (nao executar agora)

- materializacao limitada a um unico caso piloto;
- separacao PF/PM obrigatoria e imutavel apos definicao do anchor;
- `crewCollectiveContext` opcional nao pode virar fallback causal;
- `consequenceBoundary` deve impedir consequence-as-cause;
- `boundaryEvidenceRefs` deve manter rotulo sintetico explicito;
- evidencias reais nao podem ser tratadas como sinteticas nem o inverso;
- proibido uso como referencia de evento real.

## 4. Restricoes desta fase

Esta fase nao pode:

- criar narrativa completa de evento sintetico;
- materializar synthetic case instance;
- classificar fechamento P/O/A;
- gerar selectedCode/releasedCode;
- gerar finalConclusion;
- gerar HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- criar fixture;
- promover baseline;
- abrir produto/UI/API.

## 5. Criterios minimos para proxima fase

A proxima fase so pode iniciar materializacao se todos os itens forem verdadeiros:

- autorizacao humana explicita registrada;
- auditoria independente com Opus ou GPT-5.5 concluida antes da materializacao;
- checklist A4R194-A aprovado;
- A4R194-B sem blocker;
- escopo limitado a um caso piloto;
- confirmacao de que o caso sintetico nao sera usado como referencia real.

## 6. Resultado da A4R194-C

A4R194-C entrega apenas blueprint e governanca documental para futura materializacao controlada.
Nenhuma instancia de caso foi criada nesta fase.
