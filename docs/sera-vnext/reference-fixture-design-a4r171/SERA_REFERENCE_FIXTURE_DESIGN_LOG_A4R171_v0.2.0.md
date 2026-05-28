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
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_LOG_A4R169_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`

## 2. Decisoes de design

- Escopo fechado em dois casos P1-A: DAUMAS-CASE-4 e US-AIRWAYS-1549.
- DAUMAS-CASE-4 mantido como positivo com `P-G / O-D / A-F`.
- US-AIRWAYS-1549 mantido como controle negativo com `NOT_APPLICABLE_AT_ESCAPE_POINT`.
- Nao ha desenho de fixture executavel, apenas contrato documental de transformacao futura.
- Expected canonical trace adicionado para DAUMAS-CASE-4 (nos por eixo e consequencias).
- Expected negative-control trace adicionado para US-AIRWAYS-1549 (gating de nao aplicacao da arvore humana).

## 3. Criterios de passagem

- input factual minimo definido;
- escape point unico e claro;
- ator direto (ou ausencia) explicito;
- output esperado inalterado em relacao a A4R170;
- locks de governanca preservados.

## 4. Criterios de falha

- reclassificacao de P/O/A;
- criacao de novo ponto de fuga;
- forcar P/O/A humano em US-AIRWAYS-1549 no ponto de fuga tecnico/ambiental;
- criar artefato executavel nesta fase.

## 5. Campos ainda nao implementados

- fixture payload executavel;
- baseline linkage;
- runner/checks automatizados;
- schema operacional de fixture serializada;
- gates de teste CI para esses dois casos.

## 6. Locks

- `NO_EXECUTABLE_FIXTURE`
- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`
- `NO_FINAL_CONCLUSION`
- `NO_HFACS`
- `NO_RISK_ERC`
- `NO_ARMS_ERC`
- `NO_RECOMMENDATIONS`

## 7. Recomendacao de ferramenta para proxima fase

- Proxima fase de implementacao (fixture executavel) recomendada com Codex, por exigir controle fino de estrutura de arquivos, validacao e gates metodologicos em repositorio.
