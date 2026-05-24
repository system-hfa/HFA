# SERA Engine vNext Batch 3 AI/Author Adjudication A4R77 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-77 — Batch 3 AI/Author Adjudication  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Aplicar adjudicação AI/Author controlada aos 15 casos extraídos no Batch 3, produzindo drafts P/O/A apenas quando sustentados por evidência e mantendo `UNRESOLVED` onde a base factual não fecha eixo com robustez.

## Relação com A4+R-76
- A4+R-76 entregou 15 extrações estruturadas (`A4R76-B3-001..015`) sem classificação.
- A4+R-77 converteu as extrações em 15 adjudicações draft, agora com `P_axis_questionPath`, `O_axis_questionPath` e `A_axis_questionPath`.
- Casos com `sourceEnrichmentNeeded=yes` não foram forçados para fechamento de eixo.

## Tabela dos 15 casos
| adjudicationId | sourceExtractionId | shortLabel | P draft | O draft | A draft | unresolvedAxes | maturityStatus | sourceEnrichmentNeeded | mainReason | nextStep |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-BATCH3-ADJUDICATION-001 | A4R76-B3-001 | Roncador post-takeoff ditching | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | EVIDENCE_ENRICHMENT_REQUIRED | yes | source partial + technical chain incomplete | primary source enrichment |
| REAL-EVENT-BATCH3-ADJUDICATION-002 | A4R76-B3-002 | N56RD Gulf forced ditching | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | emergency action boundary with technical anomaly | keep A unresolved |
| REAL-EVENT-BATCH3-ADJUDICATION-003 | A4R76-B3-003 | D-HHNH low-viz low-altitude incident | P-G | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | monitoring/callout boundary with partial action detail | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-004 | A4R76-B3-004 | G-BHYB night sea-contact event | P-F | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | night/offshore visual cue distortion candidate | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-005 | A4R76-B3-005 | HL9294 low-viz CFIT sequence | P-G | O-D | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | low-viz continuation and objective-diversity draft | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-006 | A4R76-B3-006 | PR-CHI helideck motion mismatch | P-H | O-A | UNRESOLVED | A | EVIDENCE_ENRICHMENT_REQUIRED | yes | vessel-crew information chain needs motion data | motion/communication enrichment |
| REAL-EVENT-BATCH3-ADJUDICATION-007 | A4R76-B3-007 | N200BK rooftop impact in IMC | P-G | O-A | UNRESOLVED | A | HOLD_UNRESOLVED | no | IMC monitoring/decision boundary with no action trace | hold unresolved |
| REAL-EVENT-BATCH3-ADJUDICATION-008 | A4R76-B3-008 | N109W mountain CFIT | P-G | O-D | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | VFR continuation in deteriorating mountain weather | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-009 | A4R76-B3-009 | N11NM missed-approach LOC | P-C | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | automation/mode interpretation boundary | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-010 | A4R76-B3-010 | N127LN fatigue LOC-I | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | fatigue is context/precondition, not automatic P/O/A | hold unresolved |
| REAL-EVENT-BATCH3-ADJUDICATION-011 | A4R76-B3-011 | N120HH uncontained engine failure | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | condition-dominant technical failure | hold unresolved |
| REAL-EVENT-BATCH3-ADJUDICATION-012 | A4R76-B3-012 | N525TA flight-test breakup | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | test-envelope condition-dominant human-system case | hold unresolved |
| REAL-EVENT-BATCH3-ADJUDICATION-013 | A4R76-B3-013 | BS211 unstable approach sequence | P-H | O-C | A-F | none | AUTHOR_REVIEW_READY | no | ATC/CRM communication + exceptional path deviation | author review |
| REAL-EVENT-BATCH3-ADJUDICATION-014 | A4R76-B3-014 | A320 G-EZWM correspondence triage | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | TRIAGE_ONLY | yes | listing-only source | source enrichment |
| REAL-EVENT-BATCH3-ADJUDICATION-015 | A4R76-B3-015 | B737 EI-EFB correspondence triage | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | TRIAGE_ONLY | yes | listing-only source | source enrichment |

## Métricas
- totalCases=15
- totalAxes=45
- proposedPAxes=8
- proposedOAxes=12
- proposedAAxes=1
- unresolvedPAxes=7
- unresolvedOAxes=3
- unresolvedAAxes=14
- totalUnresolvedAxes=24
- enrichmentRequiredCases=4
- authorReviewReadyCases=6
- holdUnresolvedCases=5
- triageOnlyCases=2
- releasedCodeCount=0

## Padrões metodológicos observados
- questionPath coverage: 15/15 adjudicações incluem `P_axis_questionPath`, `O_axis_questionPath` e `A_axis_questionPath`.
- condition-dominant cases: `001`, `011`, `012` (e parcialmente `002`, `006`).
- perception/action boundary cases: `003`, `004`, `005`, `007`, `008`, `009`.
- PF/PM ambiguity cases: `003`, `004`, `005`, `006`, `009`.
- objective-diversity cases: `005` (`O-D` draft), `008` (`O-D` draft), `013` (`O-C` draft).
- automation/mode awareness cases: `009`, `012`.
- source partial/triage cases: `001`, `014`, `015`; enrichment case with medium source: `006`.

## Confirmações de lock
- `proposedCode` permanece draft e não é `releasedCode`.
- nenhum `finalConclusion` foi gerado.
- nenhum HFACS ou Risk/ERC foi gerado.
- nenhuma recommendation foi gerada.
- nenhum fixture/baseline foi alterado.
- `O-E = NON_EXISTENT_IN_SERA_PT_V1` permanece apenas como guardrail negativo/adversarial.

## Próxima fase recomendada
- **A4+R-78 — Consolidated Metrics and QuestionPath Review for 30 Real Events**.
