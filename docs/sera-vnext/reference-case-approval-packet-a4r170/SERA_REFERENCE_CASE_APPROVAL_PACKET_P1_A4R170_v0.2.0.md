# SERA Reference Case Approval Packet P1 — A4R170

Status:
- DRAFT_ONLY
- AUTHOR_APPROVAL_PACKET
- REFERENCE_CANDIDATE_ONLY
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase prepara o pacote documental de aprovacao autoral para os tres candidatos P1 definidos no A4R169: DAUMAS-CASE-4, US-AIRWAYS-1549 e EXECUFLIGHT-1526. Nao ha criacao de teste executavel, fixture, baseline, releasedCode, artefato classificado ou downstream.

## 2. Fontes

### A4R169
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_A4R169_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_MATRIX_A4R169_v0.2.0.csv`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_LOG_A4R169_v0.2.0.md`

### A4R166 (EXECUFLIGHT e US-AIRWAYS)
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_SOURCE_SLICE_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`

### A4R167/A4R168 (DAUMAS-CASE-4)
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`

### Canonicos
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md`

## 3. Regra de aprovacao

- P1 nao significa fixture.
- P1 nao significa baseline.
- P1 nao significa release.
- P1 significa candidato documental aprovado para futura transformacao controlada.
- Qualquer teste executavel futuro exige fase separada.
- Esta fase nao reclassifica casos e nao altera P/O/A.

## 4. P1 candidatos

### 4.1 DAUMAS-CASE-4 — Positive reference candidate

- Source: Daumas A4R167/A4R168.
- P/O/A: `P-G / O-D / A-F`.
- Ponto de fuga: piloto decide realizar o pouso pelo proprio lado.
- Ato/condicao insegura: pouso pelo lado que oferecia risco maior do que o necessario.
- Ator direto: piloto entrevistado.
- Modelo de ator: single actor source reproduction.
- Papel metodologico:
  - referencia positiva limpa;
  - cobre P-G, O-D, A-F;
  - bom caso decisorio;
  - baixo risco de mapeamento vNext (A4R168: COMPATIBLE, LOW).

Fluxo de perguntas por eixo:

Percepcao:
- P_ROOT: START
- P_ASSESSMENT: NAO
- P_CAPABILITY: SIM
- P_TIME_PRESSURE: NAO
- P_INFORMATION_AMBIGUOUS: NAO
- P_INFORMATION_AVAILABLE: SIM
- Leaf: P-G

Objetivo:
- O_ROOT: START
- O_RULES: SIM
- O_MANAGED_RISK: NAO
- Leaf: O-D

Acao:
- A_ROOT: START
- A_IMPLEMENTED: SIM
- A_CORRECT: NAO
- A_CAPABILITY: SIM
- A_TIME_PRESSURE: NAO_SELECAO
- Leaf: A-F

Strengths:
- trilha canonica limpa nos 3 eixos;
- boa separacao entre percepcao, objetivo e acao;
- ancoragem textual forte em A4R167 e mapeamento vNext em A4R168.

Risks:
- caso de reproducao (nao reanalise oficial do evento primario externo);
- influencia de vies psicologico contextual exige leitura disciplinada do ponto de fuga.

Limits:
- SOURCE_REPRODUCTION;
- sem transformacao para fixture/baseline nesta fase.

Approval status:
- `AUTHOR_APPROVED_REFERENCE_CANDIDATE`

Locks:
- `NO_FIXTURE`
- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`

### 4.2 US-AIRWAYS-1549 — Negative control candidate

- Source: A4R166.
- P/O/A humano: `NOT_APPLICABLE_AT_ESCAPE_POINT`.
- Ponto de fuga: bird strike with substantial bilateral thrust loss.
- Unsafe condition: technical/environmental onset.
- Direct human actor at escape point: none.
- Modelo de ator: negative control / no human POA at technical-environmental escape point.
- Papel metodologico:
  - impede o motor/agente de forcar P/O/A humano quando o ponto de fuga e tecnico/ambiental;
  - controle negativo forte.

Fluxo:
- Escape point identified: yes.
- Unsafe condition: yes.
- Human unsafe act at escape point: no.
- P_ROOT: NOT_APPLICABLE_AT_ESCAPE_POINT.
- O_ROOT: NOT_APPLICABLE_AT_ESCAPE_POINT.
- A_ROOT: NOT_APPLICABLE_AT_ESCAPE_POINT.
- Result: NEGATIVE_CONTROL_CANDIDATE.

Strengths:
- regra de elegibilidade humana extremamente clara no ponto de fuga;
- evita falsa atribuicao de erro humano em onset tecnico/ambiental.

Risks:
- risco baixo; principal cuidado e manter o escopo estrito no ponto de fuga.

Limits:
- nao usar fases posteriores para retroforcar classificacao humana no onset;
- permanece controle negativo documental nesta fase.

Approval status:
- `AUTHOR_APPROVED_REFERENCE_CANDIDATE`

Locks:
- `NO_FIXTURE`
- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`

### 4.3 EXECUFLIGHT-1526 — Multi-actor reference candidate

- Source: A4R166.
- single escape point: `EXECUFLIGHT-1526-ESCAPE-001`
- actorContributionId:
  - `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF`
  - `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM`

FO/PF:
- P/O/A: `P-D / O-D / A-H`.
- Ator: First Officer / Pilot Flying.
- Papel: controle de trajetoria/perfil vertical/velocidade/continuidade da aproximacao.

Captain/PM:
- P/O/A: `P-A / O-D / A-G`.
- Ator: Captain / Pilot Monitoring.
- Papel: monitoramento, verbalizacoes, nao intervencao/takeover/missed approach no tempo critico.

Ponto de fuga comum:
- aircraft outside defensible vertical profile; continuation required aggressive vertical recovery before MDA.
- sem criacao de segundo ponto de fuga.

Fluxo FO/PF:

Percepcao:
- P_ROOT: START
- P_ASSESSMENT: NAO
- P_CAPABILITY: SIM
- P_TIME_PRESSURE: SIM_ATENCAO
- Leaf: P-D

Objetivo:
- O_ROOT: START
- O_RULES: SIM
- O_MANAGED_RISK: NAO
- Leaf: O-D

Acao:
- A_ROOT: START
- A_IMPLEMENTED: SIM
- A_CORRECT: NAO
- A_CAPABILITY: SIM
- A_TIME_PRESSURE: SIM_GERENCIAMENTO
- Leaf: A-H

Fluxo Captain/PM:

Percepcao:
- P_ROOT: START
- P_ASSESSMENT: SIM
- Leaf: P-A

Objetivo:
- O_ROOT: START
- O_RULES: SIM
- O_MANAGED_RISK: NAO
- Leaf: O-D

Acao:
- A_ROOT: START
- A_IMPLEMENTED: SIM
- A_CORRECT: NAO
- A_CAPABILITY: SIM
- A_TIME_PRESSURE: NAO_FEEDBACK
- A_FEEDBACK_OR_MONITORING: INSUFFICIENT_POSITIVE_INTERVENTION
- Leaf: A-G

Strengths:
- primeiro candidato de referencia com single escape point + actor contributions;
- boa separacao de contribuicoes FO/PF e Captain/PM;
- ancoragem forte de source slicing no relatorio oficial local.

Risks:
- complexidade metodologica maior do que casos single actor;
- exige disciplina para nao misturar percepcao de um ator com acao de outro.

Limits:
- AUTHOR_APPROVED_DRAFT no A4R166;
- sem promocao para fixture/baseline/release nesta fase.

Approval status:
- `AUTHOR_APPROVED_REFERENCE_CANDIDATE`

Locks:
- `NO_FIXTURE`
- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`

## 5. Approval matrix

| caseId | source | poa | approvalStatus | role | priority | riskLevel | nextAction |
|---|---|---|---|---|---|---|---|
| DAUMAS-CASE-4 | A4R167/A4R168 | P-G / O-D / A-F | AUTHOR_APPROVED_REFERENCE_CANDIDATE | single actor source reproduction | P1 | LOW | manter como referencia positiva documental para fase de design de fixture |
| US-AIRWAYS-1549 | A4R166 | NOT_APPLICABLE_AT_ESCAPE_POINT | AUTHOR_APPROVED_REFERENCE_CANDIDATE | negative control | P1 | LOW | manter como controle negativo fixo para gates de elegibilidade humana |
| EXECUFLIGHT-1526-FO-PF | A4R166 | P-D / O-D / A-H | AUTHOR_APPROVED_REFERENCE_CANDIDATE | actor contribution FO/PF | P1 | MEDIUM | preparar trilha de fixture separada por contribuicao de ator em fase futura |
| EXECUFLIGHT-1526-CAPTAIN-PM | A4R166 | P-A / O-D / A-G | AUTHOR_APPROVED_REFERENCE_CANDIDATE | actor contribution Captain/PM | P1 | MEDIUM | preparar trilha de fixture separada por contribuicao de ator em fase futura |

## 6. Limites

- sem fixture;
- sem baseline;
- sem release;
- sem downstream;
- sem runtime;
- sem reclassificacao;
- sem alteracao dos codigos;
- sem HFACS;
- sem Risk/ERC;
- sem recommendations.

## 7. Proxima fase possivel

A4R171 — Reference Case Fixture Design, somente se houver autorizacao explicita. Recomendado executar com Codex por envolver desenho controlado de teste executavel.
