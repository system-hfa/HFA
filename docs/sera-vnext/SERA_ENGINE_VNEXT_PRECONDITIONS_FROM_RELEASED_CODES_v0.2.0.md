# SERA Engine vNext Preconditions from Released Codes v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-46 — Preconditions from Released Codes

## Objetivo
Definir e validar uma camada conservadora de derivação de preconditions candidatas a partir de códigos já liberados por revisão humana e guardados semanticamente, sem abrir downstream e sem promover classificação final.

## Relação com A4+R-45 / A4+R-45c / A4+R-45d
- A4+R-45 introduziu Code Release Gate e isolou `releasedCode` em pacote auditável.
- A4+R-45c canonizou a taxonomia SERA-PT v1.0.
- A4+R-45d confirmou decisão autoral: `A-A` significa ausência de falha de ação específica.
- Esta fase usa esses contratos como pré-requisito metodológico para derivar apenas candidatos de preconditions.

## Contrato de Input
A derivação recebe:
- `CodeReleaseGateResult` com `releasedCode.source = HUMAN_REVIEW`;
- `SemanticConsistencyGateResult` sem abertura downstream;
- `SeraVNextResult` base opcional para verificar que `selectedCode` permanece `UNRESOLVED`.

Critérios de elegibilidade para candidate automático:
1. axis release com `releaseStatus = RELEASED_BY_HUMAN_REVIEW`;
2. `releasedCode` presente;
3. evidência referenciada presente;
4. rationale humano presente;
5. semantic status não bloqueado;
6. mapeamento canônico explícito disponível;
7. locks downstream preservados.

## Contrato de Output
`PreconditionsFromReleasedCodesResult`:
- `gateStatus`: `PRECONDITION_CANDIDATES_READY | PRECONDITION_CANDIDATES_PARTIAL | PRECONDITION_CANDIDATES_BLOCKED`;
- `candidates`: lista de `VNextPreconditionCandidate` com rastreabilidade total;
- `globalBlockingIssues`;
- locks explícitos preservados:
  - `downstreamLocked = true`
  - `finalConclusionLocked = true`
  - `hfacsLocked = true`
  - `riskLocked = true`
  - `recommendationsLocked = true`
- `selectedCodesRemainUnresolved`;
- `causalCoreOnly = true`.

Cada `VNextPreconditionCandidate` inclui:
- `id`, `label`, `category`;
- `sourceAxis`, `sourceReleasedCode`;
- `sourceEvidenceRefs`, `sourceRationaleRefs`;
- `confidence` (`LOW | MEDIUM | HIGH`);
- `status` (`CANDIDATE_PRECONDITION | REVIEW_REQUIRED | BLOCKED`);
- `limitations`, `blockingIssues`;
- `derivedBy = SERA_VNEXT_PRECONDITION_RULE`;
- `taxonomyVersion = SERA_PT_CANONICAL_v1.0`;
- `authorDecisionVersion = SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0`.

## Mapeamento Inicial Conservador
Esta fase aplica mapeamento mínimo e explícito:
- `P-C` -> `knowledge_training_context`
- `P-D` -> `attention_management_context`
- `P-G` -> `procedural_monitoring_context`
- `P-H` -> `communication_information_context`
- `O-B` -> `rule_norm_context`
- `O-C` -> `rule_norm_context`
- `O-D` -> `operational_efficiency_pressure_context`
- `A-C` -> `procedural_monitoring_context`
- `A-E` -> `knowledge_training_context`
- `A-G` -> `supervision_coordination_context`
- `A-H` -> `time_pressure_context`
- `A-I` -> `time_pressure_context`
- `A-J` -> `communication_information_context`

## Decisão Autoral A-A/A-C Respeitada
- `A-A` não deriva precondition de falha de ação.
- `A-A` gera bloqueio/limitação explícita de derivação (`no action-failure precondition derived`).
- `A-C` permanece ativo como falha de feedback/verificação pós-ação própria.

## O-E RESERVED / NOT_ACTIVE
- `O-E` é tratado como `RESERVED / NOT_ACTIVE`.
- Qualquer tentativa de derivação a partir de `O-E` retorna `BLOCKED` com issue explícito.

## Backlog Opus Preservado (não implementado)
Itens reconhecidos, mas fora de escopo desta fase:
- `hendyCategory`;
- `derivationPath`;
- `timePressureExcessive` explícito em schema;
- `evidenceRefs` categorizadas;
- `isNoFailure` derivado.

## Cenários Testados
Arquivo: `tests/sera-vnext/preconditions-from-released-codes-trial-001.ts`

- Cenário A: pacote válido Trial 001 -> candidatos rastreáveis com locks preservados.
- Cenário B: semantic blocked -> eixo bloqueado para derivação.
- Cenário C: `O-E` reservado -> bloqueio obrigatório.
- Cenário D: `releasedCode.source != HUMAN_REVIEW` -> bloqueio.
- Cenário E: tentativa downstream/final outputs -> bloqueio global.
- Cenário F: `selectedCode` base permanece `UNRESOLVED`, sem `CLASSIFIED` automático.
- Cenário G: `A-A` tratado como ausência de falha de ação específica, sem derivação de falha de ação.

## Limitações
- Não há mapeamento completo de todas as combinações P/O/A.
- Não há inferência organizacional livre sem evidência.
- Não há integração com recommendations, HFACS, Risk/ERC, ARMS/ERC ou conclusão final.
- Não há alteração de `selectedCode` base e não há promoção automática de `CLASSIFIED`.

## Bloqueios e Locks
A derivação bloqueia quando detecta:
- violação de lock downstream/final;
- ausência de evidência ou rationale;
- semantic blocking;
- `releasedCode` sem `HUMAN_REVIEW`;
- código reservado (`O-E`).

## Próxima fase recomendada
A4+R-47 — Code Assignment Traceability Model (ou equivalente), para aprofundar rastreabilidade de derivação sem abrir downstream final.

## A4+R-48 Update
- `derivePreconditionsFromReleasedCodes(...)` agora suporta input opcional de traceability (`ReleasedCodeTraceabilityResult`).
- Quando traceability está presente, candidatos carregam referência de origem (`sourceTraceabilityRefs`) e metadados (`sourceHendyCategory`, `sourceIsNoFailure`, `sourceTimePressureExcessive`, `traceabilityVersion`).
- Quando traceability está ausente, a função preserva compatibilidade com A4+R-46 e registra limitação de modo compatível.
- `isNoFailure=true` via traceability bloqueia derivação de precondition de falha.
- `RESERVED_NOT_ACTIVE` ou `BLOCKED` em traceability bloqueiam derivação.
- Downstream permanece bloqueado.
