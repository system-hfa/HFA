# SERA Reference Fixture Design Log — A4R171 v0.2.0

Status:
- DRAFT_ONLY
- FIXTURE_DESIGN_ONLY
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Arquivos lidos

- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_MATRIX_A4R170_v0.2.0.csv`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_LOG_A4R170_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_A4R169_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_MATRIX_A4R169_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md`

## 2. Decisoes de design

- Recriacao do A4R171 apos revert de commit prematuro.
- Escopo fechado em DAUMAS-CASE-4 e US-AIRWAYS-1549.
- DAUMAS-CASE-4 mantido como fixture design positivo com P-G / O-D / A-F.
- US-AIRWAYS-1549 mantido como fixture design negative control com NOT_APPLICABLE_AT_ESCAPE_POINT.
- Expected canonical trace adicionado para DAUMAS-CASE-4.
- Expected negative-control trace adicionado para US-AIRWAYS-1549.
- Ainda sem fixture executavel.

## 3. Criterios de passagem

- input factual minimo suficiente por caso;
- escape point preservado e unico por caso;
- ator direto (ou ausencia) explicito;
- output esperado inalterado;
- locks de governanca preservados.

## 4. Criterios de falha

- reclassificacao de P/O/A;
- criacao de novo ponto de fuga;
- aplicacao humana P/O/A indevida no controle negativo;
- abertura de baseline/release/downstream;
- qualquer implementacao executavel nesta fase.

## 5. Campos ainda nao implementados

- fixture executavel;
- JSON de fixture;
- integracao com tests/;
- baseline linkage;
- runtime hooks de validacao.

## 6. Recomendacao de ferramenta para proxima fase

- fase de implementacao executavel recomendada com Codex por exigir estrutura de artefato, gates e validacao de repositorio.

## 7. Registro de governanca desta recriacao

- Nao houve commit nesta recriacao.
- Nao houve push nesta recriacao.
- Nao houve stage nesta recriacao.
