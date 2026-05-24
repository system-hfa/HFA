# SERA Engine vNext PDF24 Text Real Event Corpus Inventory A4R71 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-71 — Real Event Corpus Expansion from Uploaded pdf24 Text Set  
NO_CLASSIFICATION  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Inventariar fontes textuais convertidas dos PDFs (`pdf24_merged*.txt`) e selecionar candidatos reais para ampliar a amostra SERA vNext antes de nova extração estruturada.

## Decisão O-E
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Objective ativo: `O-A`, `O-B`, `O-C`, `O-D`.
- Qualquer menção a `O-E` deve funcionar apenas como guardrail negativo/adversarial; é NON_EXISTENT_IN_SERA_PT_V1 e não pode virar fallback para `O-A`.

## Fontes verificadas
| sourceName | localPath | availableLocal | sourceKind | contentType | eventRichness | helicopterRelevant | offshoreRelevant | extractionQuality | recommendedUse | notes |
|---|---|---|---|---|---|---|---|---|---|---|
| pdf24_merged.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | yes | TXT_CONVERTED_FROM_PDF | article/case commentary + trechos investigativos | MEDIUM | partial | partial | PARTIAL | BATCH_2_PRIMARY | contém N8DX + trechos de eventos de helicóptero; estrutura mista |
| pdf24_merged-2.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | yes | TXT_CONVERTED_FROM_PDF | article/case commentary + investigation excerpt | MEDIUM | yes | yes | PARTIAL | BATCH_2_PRIMARY | contém 5N-BQJ e blocos com estrutura de relatório |
| pdf24_merged-3.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-3.txt | yes | TXT_CONVERTED_FROM_PDF | accident reports/bulletins | HIGH | yes | partial | GOOD | BATCH_2_PRIMARY | AAIB Bulletin com alta densidade de eventos e delimitadores (Synopsis/History/Analysis) |
| pdf24_merged-5.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-5.txt | yes | TXT_CONVERTED_FROM_PDF | SMS/risk/methodology + mixed | LOW | partial | partial | PARTIAL | BACKLOG | majoritariamente Doc 9859/SMS; eventos presentes porém difusos |
| pdf24_merged-6.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-6.txt | yes | TXT_CONVERTED_FROM_PDF | academic dissertation + HFACS/methodology + mixed | LOW | partial | partial | PARTIAL | METHOD_REFERENCE_ONLY | foco forte em discussão teórica/educacional e HFACS |
| pdf24_merged-7.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-7.txt | yes | TXT_CONVERTED_FROM_PDF | HFACS/taxonomy | NONE | partial | partial | GOOD | EXCLUDE_FOR_REAL_EVENT_EXTRACTION | DoD HFACS; sem corpus factual primário adequado para extração de eventos |
| pdf24_merged-8.txt | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-8.txt | yes | TXT_CONVERTED_FROM_PDF | engineering/offshore non-aviation + mixed | LOW | partial | yes | PARTIAL | EXCLUDE_FOR_REAL_EVENT_EXTRACTION | predominância de engenharia offshore não aeronáutica |
| pdf24_merged.pdf | /Users/filipedaumas/Downloads/pdf24_merged.pdf | yes | PDF_ORIGINAL | mixed | MEDIUM | partial | partial | UNKNOWN | BACKLOG | referência original; fase privilegia `.txt` |
| pdf24_merged-2.pdf | /Users/filipedaumas/Downloads/pdf24_merged-2.pdf | yes | PDF_ORIGINAL | mixed | MEDIUM | yes | yes | UNKNOWN | BACKLOG | referência original |
| pdf24_merged-3.pdf | /Users/filipedaumas/Downloads/pdf24_merged-3.pdf | yes | PDF_ORIGINAL | accident reports/bulletins | HIGH | yes | partial | UNKNOWN | BACKLOG | referência original de alto valor |
| docs/real-event-harvest | /Users/filipedaumas/SAAS/HFA/docs/real-event-harvest | yes | EXISTING_EXTRACT | mixed | HIGH | yes | yes | GOOD | BATCH_2_PRIMARY | index e extrações já estruturadas com candidate rows |
| ACCIDENTS | /Users/filipedaumas/SAAS/HFA/ACCIDENTS | no | MIXED | unknown | NONE | unknown | unknown | UNKNOWN | EXCLUDE_FOR_REAL_EVENT_EXTRACTION | `UPLOADED_IN_CHAT_ONLY_OR_NOT_LOCAL` |
| metodologia | /Users/filipedaumas/SAAS/HFA/metodologia | yes | METHODOLOGY_ONLY | methodology | NONE | partial | partial | GOOD | METHOD_REFERENCE_ONLY | fonte metodológica, não corpus factual primário |
| docs/reference | /Users/filipedaumas/SAAS/HFA/docs/reference | yes | METHODOLOGY_ONLY | methodology | NONE | partial | partial | GOOD | METHOD_REFERENCE_ONLY | Hendy/Daumas em texto extraído |

## Eventos candidatos identificados (25)
| candidateId | sourceFile | sourceLocator | aircraft/operation | eventType | factualAnchor | whyRelevantToSERA | extractionPriority | expectedDifficulty | sourceQuality | duplicateStatus | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PDF24-TXT-CAND-001 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0003 | S-76C+ / night approach | near-CFIT / LOC trend | black-hole + insufficient visual reference | fronteira percepção/monitoramento vs ação de controle | P1 | MEDIUM | HIGH | NEW | candidato forte de comparação com 001/002 |
| PDF24-TXT-CAND-002 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0005 | S-76++ / helideck | tumble near touchdown | offshore helideck + multi-ator | coordenação PF/PM e feedback cruzado | P1 | HIGH | MEDIUM | NEW | requer separação de atores |
| PDF24-TXT-CAND-003 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0007 | S-76C+ / offshore transport | control pushrod separation | falha mecânica de comando | evitar overclassification humana em condição técnica dominante | P2 | MEDIUM | HIGH | NEW | útil para guardrail de causalidade |
| PDF24-TXT-CAND-004 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0008 | S-76C+ | servo/rod-end separation | manutenção/barreira de sistema | fronteira condição técnica vs resposta operacional | P2 | MEDIUM | HIGH | NEW | provável enriched-condition case |
| PDF24-TXT-CAND-005 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0009 | S-76C++ / offshore cruise | bird strike | penetração windshield + emergência | comunicação/coordenação sob alta carga | P2 | MEDIUM | HIGH | NEW | evento forte de barreira degradada |
| PDF24-TXT-CAND-006 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0010 | S-76C++ / helideck landing | rollover | vento + reposition em helideck | fronteira percepção/ação em operação offshore | P1 | MEDIUM | HIGH | NEW | alto valor para batch 2 |
| PDF24-TXT-CAND-007 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0011 | S-76C+ / taxi | landing gear collapse | pothole strike no solo | separação hazard de infraestrutura vs ação ativa | P2 | LOW | MEDIUM | NEW | candidato de controle de inferência |
| PDF24-TXT-CAND-008 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0013 | S-76 / offshore en route | autorotation to water | transmissão óleo + ditching | condição técnica + resposta de emergência | P1 | HIGH | MEDIUM | NEW | útil para sequência factual de emergência |
| PDF24-TXT-CAND-009 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0014 | S-76 / post-takeoff | ditching report | detalhe factual limitado | caso de triage/source-quality | P3 | HIGH | LOW | NEW | source enrichment only provável |
| PDF24-TXT-CAND-010 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0015 | S-76B / offshore approach | approach accident | visibilidade/controle em aproximação | fronteira P/A em ambiente offshore | P1 | MEDIUM | MEDIUM | NEW | requer locator mais fino |
| PDF24-TXT-CAND-011 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0016 | Cessna 500 / IFR | automation confusion + LOC | N8DX + TAWS/EGPWS + autopilot | caso adversarial fora de helicóptero para P/A | P1 | MEDIUM | HIGH | NEW | forte utilidade metodológica |
| PDF24-TXT-CAND-012 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0017 | A320 | AAIB correspondence | ocorrência listada | diversidade de domínio e triagem factual | P3 | HIGH | LOW | NEW | baixa granularidade inicial |
| PDF24-TXT-CAND-013 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0018 | B737 | AAIB correspondence | ocorrência listada | diversidade de domínio e triagem factual | P3 | HIGH | LOW | NEW | baixa granularidade inicial |
| PDF24-TXT-CAND-014 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0019 | P66 Pembroke | AAIB correspondence | ocorrência listada | cobertura de operações não-heli | P3 | HIGH | LOW | NEW | provável backlog |
| PDF24-TXT-CAND-015 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | REAL-EVENT-0020 | Cessna P210N | AAIB correspondence | ocorrência listada | diversidade de casos GA | P3 | HIGH | LOW | NEW | provável backlog |
| PDF24-TXT-CAND-016 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0030 | S-76 / offshore | post-takeoff loss of height | ocorrência com detalhe insuficiente | caso de source partial para triagem controlada | P3 | HIGH | LOW | NEW | manter enrichment-first |
| PDF24-TXT-CAND-017 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0031 | S-76B / offshore | platform approach | abordagem offshore com visibilidade | útil para fronteira percepção/ação | P2 | MEDIUM | MEDIUM | NEW | provável batch seguinte |
| PDF24-TXT-CAND-018 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0036 | A320 family | unstable approach placeholder | source pending | útil só após confirmação de anchor | P3 | HIGH | PARTIAL | NEW | source enrichment only |
| PDF24-TXT-CAND-019 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0037 | TBD | TAWS/EGPWS response placeholder | source pending | potencial fronteira warning-response | P3 | HIGH | PARTIAL | NEW | source enrichment only |
| PDF24-TXT-CAND-020 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0038 | TBD | checklist omission placeholder | source pending | potencial fronteira ação/feedback | P3 | HIGH | PARTIAL | NEW | source enrichment only |
| PDF24-TXT-CAND-021 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0001 | S-92A Thebaud | inadvertent descent | evento já adjudicado | rastreabilidade histórica do corpus | P3 | LOW | HIGH | ALREADY_IN_SAMPLE | 001 já usado |
| PDF24-TXT-CAND-022 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0002 | S-76C++ G-WIWI | discontinued approach | evento já adjudicado | rastreabilidade histórica do corpus | P3 | LOW | HIGH | ALREADY_IN_SAMPLE | 002 já usado |
| PDF24-TXT-CAND-023 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0004 | S-76C+ EC-JES | SAR low-height descent | evento já adjudicado | rastreabilidade histórica do corpus | P3 | LOW | HIGH | ALREADY_IN_SAMPLE | 003 já usado |
| PDF24-TXT-CAND-024 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0006 | S-76C++ 5N-BQJ | ditching after failures | evento já adjudicado | rastreabilidade histórica do corpus | P3 | LOW | HIGH | ALREADY_IN_SAMPLE | 004 já usado |
| PDF24-TXT-CAND-025 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | REAL-EVENT-0028 | S-76C+ HL9661 | tail rotor strike | evento já triaged | rastreabilidade histórica do corpus | P3 | LOW | PARTIAL | ALREADY_IN_SAMPLE | 005 já usado |

## Critérios de seleção
- presença de sequência factual mínima (ainda que parcial) em índice/texto;
- ator operacional e/ou condição operacional identificável;
- possibilidade de unsafe state candidate em extração futura;
- utilidade metodológica para fronteiras P/O/A sem classificar nesta fase;
- cobertura de variedade: percepção, objetivo, ação/feedback, coordenação, automação, visibilidade, offshore/helicóptero e casos source-partial.

## Critérios de exclusão
- artigo puramente teórico sem evento específico;
- SMS/risk sem evento específico;
- HFACS/taxonomia sem evento específico;
- dissertação acadêmica sem ocorrência operacional delimitada;
- engenharia offshore não aeronáutica;
- duplicata de caso já usado sem ganho metodológico;
- evento sem sequência factual mínima;
- evento sem ator/condição operacional mínima;
- fonte com qualidade textual baixa demais para extração confiável.

## Relação com os 5 casos já usados
| case | status |
|---|---|
| 001 Thebaud | ALREADY_IN_SAMPLE |
| 002 Peasmarsh / G-WIWI | ALREADY_IN_SAMPLE |
| 003 Vigo | ALREADY_IN_SAMPLE |
| 004 5N-BQJ | ALREADY_IN_SAMPLE |
| 005 HL9661 | ALREADY_IN_SAMPLE |

Regra aplicada:
- os cinco casos legados não entram como novos candidatos nesta expansão; quando reaparecem, ficam marcados como `ALREADY_IN_SAMPLE`.
