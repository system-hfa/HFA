# SERA Engine vNext Structured Extraction Batch 2 A4R72 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-72 — Structured Extraction Batch 2 from PDF24 Text Corpus  
NO_CLASSIFICATION  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Executar extração factual estruturada em lote para os 10 candidatos `P1` definidos em A4+R-71, preservando guardrails metodológicos (sem classificação SERA, sem proposed/released code, sem fixture/baseline).

## Relação com A4+R-71
- A4+R-71 definiu `Batch 2 P1` com 10 candidatos prioritários.
- A4+R-72 materializa os 10 drafts de extração em `docs/sera-vnext/real-event-extractions-batch-2/`.
- Casos com lacuna de fonte permanecem no lote com `LOW` ou `sourceEnrichmentNeeded=yes`, sem inventar conteúdo.

## Tabela dos 10 casos extraídos
| extractionId | candidateId | originalRealEventId | shortLabel | sourceDocument | anchorQuality | extractionConfidence | sourceEnrichmentNeeded | mainUncertainty | nextStep |
|---|---|---|---|---|---|---|---|---|---|
| A4R72-B2-001 | PDF24-TXT-CAND-001 | REAL-EVENT-0003 | S-76C+ Tofino night approach near-CFIT trend | REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md | HIGH | HIGH | no | PF/PM timeline and cue-use split | adjudication A4+R-73 (perception vs action boundary) |
| A4R72-B2-002 | PDF24-TXT-CAND-002 | REAL-EVENT-0005 | PK-TVY S-76++ Soehanah helideck tumble near touchdown | pdf24_merged-3.txt | HIGH | MEDIUM | yes | PF/PM handover chronology and touchdown dynamics | enrich + adjudication A4+R-73 |
| A4R72-B2-003 | PDF24-TXT-CAND-006 | REAL-EVENT-0010 | N798P S-76C++ helideck rollover after ground reposition | pdf24_merged.txt | HIGH | HIGH | no | wind/deck interaction versus control input contribution | adjudication A4+R-73 |
| A4R72-B2-004 | PDF24-TXT-CAND-008 | REAL-EVENT-0013 | Aeroleo transmission-oil-loss autorotation to water | pdf24_merged-6.txt | MEDIUM | LOW | yes | aircraft identity mismatch (candidate S-76 vs anchor Bell 412) | source identity reconciliation + adjudication |
| A4R72-B2-005 | PDF24-TXT-CAND-010 | REAL-EVENT-0015 | PH-KHB S-76B offshore dark-night approach and water impact | pdf24_merged-3.txt | HIGH | HIGH | no | instrument/cue integration in final segment | adjudication A4+R-73 |
| A4R72-B2-006 | PDF24-TXT-CAND-011 | REAL-EVENT-0016 | N8DX Cessna 500 automation confusion and LOC sequence | pdf24_merged.txt | HIGH | HIGH | no | mode-awareness vs handling limitations split | adjudication A4+R-73 |
| A4R72-B2-007 | PDF24-TXT-CAND-003 | REAL-EVENT-0007 | 5N-BGD S-76C+ pushrod separation and lagoon crash | pdf24_merged-3.txt | HIGH | HIGH | yes | maintenance/inspection chain depth and actor assignability | enrich + adjudication |
| A4R72-B2-008 | PDF24-TXT-CAND-004 | REAL-EVENT-0008 | PK-FUP S-76C+ in-flight control failure | pdf24_merged-2.txt | HIGH | HIGH | no | pre-separation detectability and maintenance trace details | adjudication A4+R-73 |
| A4R72-B2-009 | PDF24-TXT-CAND-005 | REAL-EVENT-0009 | N748P S-76C++ fatal bird strike and barrier breach | pdf24_merged-2.txt | HIGH | HIGH | yes | post-impact controllability window and certification envelope | enrich + adjudication |
| A4R72-B2-010 | PDF24-TXT-CAND-007 | REAL-EVENT-0011 | N860AL S-76C+ taxi pothole and MLG collapse | pdf24_merged-2.txt | HIGH | HIGH | yes | known-hazard history and route-selection constraints | enrich + adjudication |

## Distribuição
- helicopter/offshore count: 7 (`0005`, `0010`, `0013`, `0015`, `0007`, `0009`, `0011`)
- fixed-wing count: 1 (`0016`)
- helicopter non-offshore/other mission count: 2 (`0003`, `0008`)
- technical-dominant candidates: 5 (`0013`, `0007`, `0008`, `0009`, `0011`)
- perception/attention candidates: 3 (`0003`, `0015`, `0016`)
- communication/coordination candidates: 3 (`0005`, `0010`, `0015`)
- sourceEnrichmentNeeded count: 5

## Confirmações metodológicas
- nenhuma classificação SERA foi executada nesta fase.
- nenhum `proposedCode` foi criado.
- nenhum `releasedCode` foi criado.
- nenhum downstream foi aberto.
- nenhum fixture oficial ou baseline foi alterado.

## Próxima fase recomendada
- **A4+R-73 — Batch 2 AI/Author Adjudication for 10 extracted cases**.

## A4+R-73 Update
- adjudicação Batch 2 executada em lote único.
- 10 arquivos de adjudicação criados em `docs/sera-vnext/real-event-adjudications-batch-2/`.
- nenhum `releasedCode` criado.
- nenhum downstream aberto.
- próxima fase recomendada: **A4+R-74 — Consolidated Metrics and Pattern Review for 15 Real Events**.
