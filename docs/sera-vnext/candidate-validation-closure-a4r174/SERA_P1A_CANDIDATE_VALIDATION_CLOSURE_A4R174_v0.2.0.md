# SERA P1-A Candidate Validation Closure — A4R174

Status:
- DRAFT_ONLY
- CANDIDATE_VALIDATION_CLOSURE
- NO_OFFICIAL_RUNNER_CHANGE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo
Fechar o estado metodologico e tecnico do pacote P1-A como candidate-only validado, sem promover para fixtures oficiais, sem alterar baseline e sem alterar runner oficial.

## 2. Fontes lidas
- docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_AUDIT_A4R173_v0.2.0.md
- docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_RESULT_A4R173_v0.2.0.md
- docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs
- docs/sera-vnext/fixture-implementation-contract-a4r172/SERA_FIXTURE_IMPLEMENTATION_RESULT_P1A_A4R172_v0.2.0.md
- docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs
- tests/sera/fixtures-candidates/reference-p1a/REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json
- tests/sera/fixtures-candidates/reference-p1a/REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json
- tests/sera/fixtures-candidates/reference-p1a/reference-p1a-fixtures.txt
- docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md
- docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_SOURCE_SLICE_A4R166_v0.2.0.md
- docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md
- docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md

## 3. Estado validado do P1-A
P1-A permanece isolado em `tests/sera/fixtures-candidates/reference-p1a/` com dois drafts:
- REF-P1A-DAUMAS-CASE-4-POSITIVE-001
- REF-P1A-US-AIRWAYS-1549-NEGATIVE-001

Este estado continua fora da trilha de fixtures oficiais e fora de baseline.

## 4. Resultado dos validadores
Execucoes registradas na fase:
- `node docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs`
- `node docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs`

Resultado consolidado:
- PASS estrutural para os dois drafts P1-A;
- `baselineTouched = false`;
- `officialFixturesTouched = false`;
- `apiCall = false`;
- `llmCall = false`.

## 5. Decisao: manter P1-A em candidate-only
P1-A continua candidate-only por decisao metodologica e de isolamento tecnico.

## 6. Decisao: nao adaptar runner oficial agora
A4R174 nao altera `tests/sera/runner.ts`, `tests/sera/run.ts` ou `tests/sera/report.ts`.

## 7. Decisao: NOT_APPLICABLE_AT_ESCAPE_POINT continua restrito a candidate-only
`NOT_APPLICABLE_AT_ESCAPE_POINT` segue aceito e validado no contrato candidate-only.
Qualquer extensao para runner oficial exige fase separada, autorizacao explicita e politica de schema/scoring dedicada.

## 8. Riscos
- Pressao para promover candidate sem gate metodologico completo.
- Interpretacao incorreta de US-AIRWAYS-1549 como caso humano no ponto de fuga.
- Tentativa de acoplamento precoce com runner oficial antes da definicao de politica para `NOT_APPLICABLE_AT_ESCAPE_POINT`.

## 9. Criterios para eventual promocao futura
- aprovacao autoral explicita;
- especificacao de compatibilidade com schema oficial;
- decisao formal sobre politica de scoring para `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- fase autorizada para integracao controlada, sem alterar baseline historico.

## 10. Proxima expansao recomendada: EXECUFLIGHT-1526 P1-B multiator candidate-only
Recomenda-se abrir A4R175 para drafts candidate-only de EXECUFLIGHT-1526 com:
- `EXECUFLIGHT-1526-ESCAPE-001` unico;
- `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF` com `P-D / O-D / A-H`;
- `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM` com `P-A / O-D / A-G`.
