# SERA Real Event Corpus Inventory Summary — A4R178

## 1. Objetivo
Criar inventario estrutural, auditavel e candidate-only do corpus de eventos reais para orientar selecao de lotes na A4R179, sem classificacao SERA definitiva.

## 2. Fontes lidas
- docs/sera-vnext/evidence-expansion-runner-architecture-a4r177/SERA_EVIDENCE_EXPANSION_AND_VNEXT_RUNNER_ARCHITECTURE_A4R177_v0.2.0.md
- docs/sera-vnext/evidence-expansion-runner-architecture-a4r177/SERA_REAL_EVENT_CORPUS_INVENTORY_PLAN_A4R177_v0.2.0.md
- docs/sera-vnext/evidence-expansion-runner-architecture-a4r177/SERA_P_O_A_COVERAGE_TARGET_MATRIX_A4R177_v0.2.0.csv
- docs/sera-vnext/evidence-expansion-runner-architecture-a4r177/SERA_A4R178_TO_A4R184_MACRO_PLAN_v0.2.0.md
- docs/sera-vnext/p1-candidate-suite-closure-a4r176/SERA_P1_CANDIDATE_SUITE_MATRIX_A4R176_v0.2.0.csv
- docs/sera-vnext/candidate-runner-a4r175/SERA_P1B_EXECUFLIGHT_CANDIDATE_MATRIX_A4R175_v0.2.0.csv
- tests/sera/fixtures-candidates/reference-p1a/**
- tests/sera/fixtures-candidates/reference-p1b/**

## 3. Contagens estruturais
- candidate_path_count: 526
- inventory_rows_csv_consolidado: 382
- source_corpus_file_count: 188
- source_corpus_txt_count: 89
- source_corpus_pdf_count: 74
- real_event_file_count: 89
- external_candidate_file_count: 22
- official_report_slice_count: 18
- event_tracker_like_count: 78
- markdown_count_in_candidate_paths: 306
- csv_count_in_candidate_paths: 37
- json_count_in_candidate_paths: 0
- txt_count_in_candidate_paths: 89
- pdf_count_in_candidate_paths: 74
- untracked_relevant_count: 1

Notas de contagem:
- `candidate_path_count` e contagens por extensao em candidate paths sao contagens brutas de caminhos candidatos no escopo `docs/sera-vnext` (fora de `tmp/`).
- `inventory_rows_csv_consolidado` e a contagem final de linhas do inventario consolidado A4R178.
- `json_count_in_candidate_paths: 0` refere-se apenas ao escopo de candidate paths em `docs/sera-vnext`; JSONs de contexto P1 em `tests/sera/fixtures-candidates/**` nao entram nessa contagem.

## 4. Principais buckets encontrados
- SOURCE_CORPUS_OFFICIAL_REPORT: 187
- REAL_EVENT_EXTRACTION: 89
- TRACKER_OR_INDEX: 64
- EXTERNAL_CANDIDATE: 21
- OFFICIAL_REPORT_SOURCE_SLICE: 17
- UNKNOWN_DOCS_SOURCE: 3
- LOCAL_UNTRACKED_SOURCE: 1

## 5. Qualidade inicial das fontes
- HIGH: 180
- MEDIUM: 110
- LOW: 65
- UNKNOWN: 27

## 6. Duplicatas provaveis
- grupos de duplicata preliminar: 19
- criterio: repeticao de `probableEventKey` normalizado em multiplos formatos/buckets.
- acao: DEFERRED_HUMAN_REVIEW, sem exclusao de arquivo.

## 7. Eventos com melhor potencial inicial
- prioridade estrutural para `SOURCE_CORPUS_OFFICIAL_REPORT`, `OFFICIAL_REPORT_SOURCE_SLICE` e `REAL_EVENT_EXTRACTION` com status `CANDIDATE_FOR_BATCH_SELECTION`.
- casos com `sourceQuality=HIGH` e `escapePointClarity/actorClarity=PARTIAL` entram como candidatos para lote real.

## 8. Eventos que precisam enriquecimento
- arquivos com `sourceQuality=LOW|UNKNOWN` marcados como `NEEDS_SOURCE_ENRICHMENT`.
- fontes `LOCAL_UNTRACKED_SOURCE` marcadas como `HOLD` ate versionamento formal.

## 9. Limitacoes
- inventario estrutural e heuristico; `probableEventKey` exige revisao humana.
- coverage map e hipotetico; nenhum codigo P/O/A foi classificado definitivamente.
- `likelyCoverageP/O/A` representa hipotese ampla de potencial de cobertura, nao cobertura metodologica comprovada.
- deduplicacao e conservadora, propositalmente limitada a alta confianca.

## 10. O que nao foi feito
- nenhuma classificacao SERA final.
- nenhuma criacao de fixture oficial.
- nenhuma alteracao de runner oficial, baseline ou motor SERA.
- nenhuma chamada de LLM/API.

## 11. Recomendacao para A4R179
Selecionar lote real inicial por lacunas P/O/A com prioridade P1 para codigos `not_covered_in_P1`, combinando casos positivos limpos, controles negativos, multiator e casos ambiguos com evidencia rastreavel.
