# SERA Reference Case Candidate Selection Log — A4R169 v0.2.0

Status:
- DRAFT_ONLY
- CANDIDATE_SELECTION
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Arquivos lidos

- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_EXTRACTION_LOG_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_REVIEW_LOG_A4R168_v0.2.0.md`

## 2. Criterios usados

- escape point com delimitacao factual clara;
- ator direto identificavel no ponto de fuga;
- trilha P/O/A rastreavel em documentacao existente;
- compatibilidade declarada com arvore canonica vNext;
- risco metodologico de ambiguidade;
- valor de cobertura taxonomica;
- risco de contaminacao por fatos posteriores;
- necessidade de separar contribuicoes de ator;
- aderencia ao modelo single escape point + multi-actor contributions quando aplicavel;
- bloqueios de governanca ativos (NO_RELEASED_CODE, NO_DOWNSTREAM).

## 3. Casos avaliados

- COMAIR-5191
- EXECUFLIGHT-1526
- US-AIRWAYS-1549
- DAUMAS-CASE-1
- DAUMAS-CASE-2
- DAUMAS-CASE-3
- DAUMAS-CASE-4

## 4. Candidatos selecionados

- `REFERENCE_CANDIDATE_STRONG`: DAUMAS-CASE-4
- `NEGATIVE_CONTROL_CANDIDATE`: US-AIRWAYS-1549
- `MULTI_ACTOR_REFERENCE_CANDIDATE`: EXECUFLIGHT-1526

## 5. Candidatos com cautela

- `REFERENCE_CANDIDATE_WITH_CAUTION`: COMAIR-5191
- `REFERENCE_CANDIDATE_WITH_CAUTION`: DAUMAS-CASE-1
- `REFERENCE_CANDIDATE_WITH_CAUTION`: DAUMAS-CASE-2 (2A only lock mantido)

## 6. Candidatos em hold/revisao futura

- `SOURCE_REPRODUCTION_ONLY`: DAUMAS-CASE-3

## 7. Duvidas para revisao autoral

1. COMAIR-5191 deve permanecer como referencia crew-level ou aguardar fase de separacao por contribuicao de ator?
2. EXECUFLIGHT-1526 pode seguir para pacote de referencia com duas contribuicoes de ator sem abrir novo escopo metodologico?
3. DAUMAS-CASE-3 deve permanecer apenas como SOURCE_REPRODUCTION_ONLY ate resolver cautela de caminho no eixo P?
4. DAUMAS-CASE-2 deve continuar somente em 2A only ate fase especifica de revisao, mantendo 500 ft como contexto/MDC?

## 8. Resultado

- Candidate selection A4R169 concluida em modo docs-only.
- Nenhum codigo P/O/A foi alterado.
- Nenhum caso foi reclassificado.
- Nenhuma fase de fixture, baseline, runtime, release ou downstream foi aberta.
