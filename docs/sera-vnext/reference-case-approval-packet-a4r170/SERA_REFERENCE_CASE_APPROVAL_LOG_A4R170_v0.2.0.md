# SERA Reference Case Approval Log — A4R170 v0.2.0

Status:
- DRAFT_ONLY
- AUTHOR_APPROVAL_PACKET
- REFERENCE_CANDIDATE_ONLY
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Arquivos lidos

### A4R169
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_A4R169_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_MATRIX_A4R169_v0.2.0.csv`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_LOG_A4R169_v0.2.0.md`

### A4R166
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_SOURCE_SLICE_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`

### A4R167/A4R168
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`

### Canonicos
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md`

## 2. Criterios usados

- manter codigos P/O/A inalterados;
- manter ponto de fuga inalterado;
- manter regra de single escape point + actor contributions quando aplicavel;
- preparar aprovacao documental P1 sem criar artefato executavel;
- preservar locks de governance (`NO_FIXTURE`, `NO_BASELINE`, `NO_RELEASED_CODE`, `NO_DOWNSTREAM`);
- registrar riscos e proxima acao sem abrir release.

## 3. P1 revisados

- DAUMAS-CASE-4
- US-AIRWAYS-1549
- EXECUFLIGHT-1526 (FO/PF e Captain/PM no mesmo `escapePointId`)

## 4. Aprovacao por candidato

- DAUMAS-CASE-4: `AUTHOR_APPROVED_REFERENCE_CANDIDATE`
- US-AIRWAYS-1549: `AUTHOR_APPROVED_REFERENCE_CANDIDATE`
- EXECUFLIGHT-1526-FO-PF: `AUTHOR_APPROVED_REFERENCE_CANDIDATE`
- EXECUFLIGHT-1526-CAPTAIN-PM: `AUTHOR_APPROVED_REFERENCE_CANDIDATE`

## 5. Riscos principais

- EXECUFLIGHT: risco de mistura de trilhas entre atores se a implementacao futura nao separar contribuicoes.
- DAUMAS-CASE-4: risco baixo, mas ainda em modo source reproduction.
- US-AIRWAYS-1549: risco baixo; cuidado principal e nao extrapolar para classificacao humana no ponto de fuga tecnico/ambiental.

## 6. Locks aplicados

- `NO_FIXTURE`
- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`
- `NO_FINAL_CONCLUSION`
- `NO_HFACS`
- `NO_RISK_ERC`
- `NO_ARMS_ERC`
- `NO_RECOMMENDATIONS`

## 7. Duvidas para revisao autoral

1. A4R171 deve iniciar primeiro por DAUMAS-CASE-4 + US-AIRWAYS-1549 (par positivo/negativo) antes de EXECUFLIGHT multiator?
2. EXECUFLIGHT deve entrar em A4R171 com dois artifacts separados de trace por actorContributionId, sob o mesmo `escapePointId`?
3. COMAIR-5191 permanece fora do pacote P1 e entra apenas em lote posterior de referencia secundaria?

## 8. Resultado

- Approval packet P1 A4R170 criado em modo docs-only.
- Nenhum codigo P/O/A foi alterado.
- Nenhum novo ponto de fuga foi criado.
- Nenhum artefato executavel foi aberto.
