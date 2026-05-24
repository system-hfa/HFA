# SERA Engine vNext Batch 2 AI/Author Adjudication A4R73 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-73 — Batch 2 AI/Author Adjudication  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Aplicar adjudicação AI/Author controlada aos 10 casos extraídos no Batch 2, produzindo drafts P/O/A quando sustentados por evidência e mantendo `UNRESOLVED` onde a base factual não fecha eixo com robustez.

## Relação com A4+R-72
- A4+R-72 entregou 10 extrações estruturadas (`A4R72-B2-001..010`) sem classificação.
- A4+R-73 converteu as extrações em 10 adjudicações draft, preservando locks de não-release e não-downstream.
- Casos com `sourceEnrichmentNeeded=yes` não foram forçados para fechamento de eixo.

## Tabela dos 10 casos
| adjudicationId | sourceExtractionId | shortLabel | P draft | O draft | A draft | unresolvedAxes | maturityStatus | sourceEnrichmentNeeded | mainReason | nextStep |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-BATCH2-ADJUDICATION-001 | A4R72-B2-001 | Tofino night approach near-CFIT | P-G | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | PF/PM timing ainda limita fechamento de A | consolidar padrão P/A em A4+R-74 |
| REAL-EVENT-BATCH2-ADJUDICATION-002 | A4R72-B2-002 | PK-TVY helideck tumble | UNRESOLVED | O-A | UNRESOLVED | P,A | EVIDENCE_ENRICHMENT_REQUIRED | yes | ambiguidade PF/PM e dinâmica final | enrichment PF/PM + adjudicação refinada |
| REAL-EVENT-BATCH2-ADJUDICATION-003 | A4R72-B2-003 | N798P helideck rollover reposition | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | fronteira ação vs condição de deck/vento | manter hold e consolidar padrão |
| REAL-EVENT-BATCH2-ADJUDICATION-004 | A4R72-B2-004 | Aeroleo source identity mismatch | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | TRIAGE_ONLY | yes | mismatch de identidade documental | reconciliar fonte e reextrair |
| REAL-EVENT-BATCH2-ADJUDICATION-005 | A4R72-B2-005 | PH-KHB dark-night approach | P-G | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | boundary percepção/coordenação com A ainda aberto | consolidar em A4+R-74 |
| REAL-EVENT-BATCH2-ADJUDICATION-006 | A4R72-B2-006 | N8DX automation confusion LOC | P-C | O-A | UNRESOLVED | A | AUTHOR_REVIEW_READY | no | automação/mode awareness com mecanismo A não fechado | consolidar caso adversarial de automação |
| REAL-EVENT-BATCH2-ADJUDICATION-007 | A4R72-B2-007 | 5N-BGD pushrod separation | UNRESOLVED | O-A | UNRESOLVED | P,A | EVIDENCE_ENRICHMENT_REQUIRED | yes | condition-dominant com cadeia manutenção incompleta | enrichment maintenance-chain |
| REAL-EVENT-BATCH2-ADJUDICATION-008 | A4R72-B2-008 | PK-FUP control linkage failure | UNRESOLVED | O-A | UNRESOLVED | P,A | HOLD_UNRESOLVED | no | condition-dominant sem ator humano iniciador robusto | manter hold conservador |
| REAL-EVENT-BATCH2-ADJUDICATION-009 | A4R72-B2-009 | N748P bird strike barrier breach | UNRESOLVED | O-A | UNRESOLVED | P,A | EVIDENCE_ENRICHMENT_REQUIRED | yes | barrier breach com janela de resposta não delimitada | enrichment certificação/cronologia |
| REAL-EVENT-BATCH2-ADJUDICATION-010 | A4R72-B2-010 | N860AL pothole/MLG collapse | UNRESOLVED | O-A | UNRESOLVED | P,A | EVIDENCE_ENRICHMENT_REQUIRED | yes | hazard de infraestrutura vs decisão local de taxi | enrichment de hazard awareness/rota |

## Métricas
- totalCases=10
- totalAxes=30
- proposedPAxes=3
- proposedOAxes=9
- proposedAAxes=0
- unresolvedPAxes=7
- unresolvedOAxes=1
- unresolvedAAxes=10
- totalUnresolvedAxes=18
- enrichmentRequiredCases=5
- authorReviewReadyCases=3
- holdUnresolvedCases=2
- triageOnlyCases=1
- releasedCodeCount=0

## Padrões metodológicos observados
- condition-dominant cases: `004`, `007`, `008`, `009`, `010`
- perception/action boundary cases: `001`, `005`, `006`
- PF/PM ambiguity cases: `001`, `002`, `005`
- source identity mismatch case: `004`
- automation/mode awareness case: `006`

## Confirmações de lock
- proposedCode permanece draft e não é `releasedCode`.
- nenhum `finalConclusion` foi gerado.
- nenhum HFACS ou Risk/ERC foi gerado.
- nenhuma recommendation foi gerada.
- nenhum fixture/baseline foi alterado.

## Próxima fase recomendada
- **A4+R-74 — Consolidated Metrics and Pattern Review for 15 Real Events**.
