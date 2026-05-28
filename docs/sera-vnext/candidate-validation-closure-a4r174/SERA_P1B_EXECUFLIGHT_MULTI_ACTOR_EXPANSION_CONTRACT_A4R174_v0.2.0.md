# SERA P1-B EXECUFLIGHT Multi-Actor Expansion Contract — A4R174

Status:
- DRAFT_ONLY
- EXPANSION_CONTRACT_ONLY
- NO_FIXTURE_CREATED
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo
Preparar a expansao futura candidate-only para EXECUFLIGHT-1526 multiator, sem criar fixture nesta fase.

## 2. Fontes
- docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md
- docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_SOURCE_SLICE_A4R166_v0.2.0.md
- docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md
- docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md

## 3. Escape point unico
- `EXECUFLIGHT-1526-ESCAPE-001`
- Nao criar segundo ponto de fuga.
- Usar `actorContributionId` para separar FO/PF e Captain/PM.

## 4. Actor contributions

### FO/PF
- actorContributionId: `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF`
- expected P/O/A: `P-D / O-D / A-H`
- papel: controle de trajetoria, perfil vertical, velocidade e continuidade da aproximacao.

### Captain/PM
- actorContributionId: `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM`
- expected P/O/A: `P-A / O-D / A-G`
- papel: monitoramento, verbalizacoes e nao intervencao/takeover/missed approach no intervalo critico.

## 5. Requisitos para futuro fixture P1-B
- manter um `escapePointId`;
- usar dois `actorContributionId`;
- manter trilha candidate-only;
- nao abrir P1-B no runner oficial;
- nao tocar baseline.

## 6. Criterios de bloqueio
Parar implementacao futura se ocorrer qualquer tentativa de:
- criar segundo ponto de fuga;
- misturar FO/PF e Captain/PM em um unico actorContribution;
- incluir EXECUFLIGHT no runner oficial sem fase autorizada;
- alterar baseline;
- alterar motor sem autorizacao.

## 7. Proxima fase possivel
A4R175 — Implement P1-B EXECUFLIGHT Candidate Drafts, se autorizado.
