# SERA Engine vNext Structured Extraction Batch 3 A4R76 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-76 — Structured Extraction Batch 3 from Selected 15 Events  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Executar extração factual estruturada em lote para os 15 casos selecionados em A4+R-75, preservando guardrails metodológicos (sem classificação SERA, sem proposed/released code, sem fixture/baseline e sem downstream).

## Relação com A4+R-75
- A4+R-75 selecionou 15 casos para ampliar o corpus extraído de 15 para 30 eventos.
- A4+R-76 materializa os 15 drafts de extração em `docs/sera-vnext/real-event-extractions-batch-3/`.
- Casos com limitação de fonte foram mantidos no lote com `LOW`/`MEDIUM` e `sourceEnrichmentNeeded=yes`, sem inventar conteúdo.

## Tabela dos 15 casos extraídos
| extractionId | batch3Id | shortLabel | sourceDocument | anchorQuality | extractionConfidence | sourceEnrichmentNeeded | mainUncertainty | nextStep |
|---|---|---|---|---|---|---|---|---|
| A4R76-B3-001 | A4R75-B3-001 | BHS S-76 Roncador post-takeoff ditching | pdf24_merged-6.txt | MEDIUM | LOW | yes | fonte secundária e cadeia técnica incompleta | enrich + adjudicação A4+R-77 |
| A4R76-B3-002 | A4R75-B3-002 | N56RD S-76B Gulf forced ditching | pdf24_merged-2.txt | HIGH | HIGH | no | mecanismo detalhado de perda de potência por motor específico | adjudicação A4+R-77 |
| A4R76-B3-003 | A4R75-B3-003 | D-HHNH S-76B low-viz low-altitude incident | pdf24_merged-2.txt | MEDIUM | MEDIUM | no | cronologia/callouts PF/PM parcial | adjudicação A4+R-77 |
| A4R76-B3-004 | A4R75-B3-004 | G-BHYB S-76A Fulmar night sea-contact event | pdf24_merged-2.txt | HIGH | HIGH | no | separação percepção vs ação na fase final | adjudicação A4+R-77 |
| A4R76-B3-005 | A4R75-B3-005 | HL9294 S-76C++ Gangnam low-viz CFIT sequence | pdf24_merged-2.txt | HIGH | HIGH | no | decomposição de decisão/coordenação antes do impacto | adjudicação A4+R-77 |
| A4R76-B3-006 | A4R75-B3-006 | PR-CHI S-76C++ helideck motion mismatch event | pdf24_merged-2.txt | MEDIUM | MEDIUM | yes | limites de motion data + cadeia de informação vessel-crew | enrich + adjudicação A4+R-77 |
| A4R76-B3-007 | A4R75-B3-007 | N200BK A109E rooftop impact in IMC | pdf24_merged.txt | HIGH | HIGH | no | decisão meteorológica e sequência de controle completa | adjudicação A4+R-77 |
| A4R76-B3-008 | A4R75-B3-008 | N109W A109A II mountain CFIT | pdf24_merged.txt | HIGH | HIGH | no | alternativas de decisão em deterioração meteo | adjudicação A4+R-77 |
| A4R76-B3-009 | A4R75-B3-009 | N11NM AW109S missed-approach LOC | pdf24_merged.txt | HIGH | HIGH | no | timeline de automação/modo e cross-monitoring | adjudicação A4+R-77 |
| A4R76-B3-010 | A4R75-B3-010 | N127LN AS350B2 fatigue LOC-I | pdf24_merged.txt | HIGH | HIGH | no | elo temporal entre prontidão/fadiga e sequência de voo | adjudicação A4+R-77 |
| A4R76-B3-011 | A4R75-B3-011 | N120HH Bell 407 uncontained engine failure | pdf24_merged.txt | HIGH | HIGH | no | detectabilidade inicial e janela de resposta humana | adjudicação A4+R-77 |
| A4R76-B3-012 | A4R75-B3-012 | N525TA Bell 525 flight-test vibration breakup | pdf24_merged.txt | HIGH | HIGH | no | transferibilidade metodológica test-envelope vs operação | adjudicação A4+R-77 |
| A4R76-B3-013 | A4R75-B3-013 | US-Bangla BS211 Q400 unstable approach sequence | pdf24_merged.txt | HIGH | HIGH | no | separação comunicação ATC/CRM e decisão de continuidade | adjudicação A4+R-77 |
| A4R76-B3-014 | A4R75-B3-014 | A320 G-EZWM correspondence triage extraction | pdf24_merged-3.txt | MEDIUM | LOW | yes | granularidade insuficiente de factual chain | triage enrich + adjudicação limitada |
| A4R76-B3-015 | A4R75-B3-015 | B737 EI-EFB correspondence triage extraction | pdf24_merged-3.txt | MEDIUM | LOW | yes | granularidade insuficiente de factual chain | triage enrich + adjudicação limitada |

## Distribuição
- helicopter/offshore count: 6
- helicopter non-offshore count: 6
- fixed-wing count: 3
- procedural/decision candidates: 11
- action/feedback candidates: 8
- PF/PM/CRM candidates: 5
- objective-diversity candidates: 9
- condition-dominant candidates: 3
- sourceEnrichmentNeeded count: 4

## Confirmações metodológicas
- nenhuma classificação SERA foi executada nesta fase.
- nenhum `proposedCode` foi criado.
- nenhum `releasedCode` foi criado.
- nenhum downstream foi aberto.
- nenhum fixture oficial ou baseline foi alterado.
- `O-E = NON_EXISTENT_IN_SERA_PT_V1` permanece somente como guardrail negativo/adversarial.

## Próxima fase recomendada
- **A4+R-77 — Batch 3 AI/Author Adjudication for 15 extracted cases**.

## A4+R-77 Update
- adjudicação Batch 3 executada em lote único.
- 15 arquivos de adjudicação criados em `docs/sera-vnext/real-event-adjudications-batch-3/`.
- `questionPath` por eixo introduzido em todos os 15 drafts (`P_axis_questionPath`, `O_axis_questionPath`, `A_axis_questionPath`).
- nenhum `releasedCode` criado.
- nenhum downstream aberto.
- próxima fase recomendada: **A4+R-78 — Consolidated Metrics and QuestionPath Review for 30 Real Events**.
