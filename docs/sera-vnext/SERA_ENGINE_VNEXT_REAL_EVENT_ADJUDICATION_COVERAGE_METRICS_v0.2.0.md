# SERA Engine vNext Real Event Adjudication Coverage Metrics v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-66 — Real Event Adjudication Coverage Metrics  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Medir cobertura metodológica da amostra real adjudicada sem alterar decisões de código draft, sem promover release e sem abrir downstream.

## Escopo
- Universo analisado: 5 casos em `docs/sera-vnext/real-event-adjudications/`.
- Eixos avaliáveis: 15 (`5 casos x P/O/A`).
- `proposedCode` draft e `UNRESOLVED` contados separadamente.
- Maturity status e enrichment status incluídos no recorte.

## Case-level metrics
- `totalCases`: 5
- `adjudicationDraftCases`: 4
- `triageOnlyCases`: 1
- `authorReviewReadyCases`: 1
- `holdUnresolvedCases`: 2
- `evidenceEnrichmentRequiredCases`: 2
- `notForDownstreamCases`: 5
- `notFixtureCases`: 5
- `notBaselineCases`: 5

## Axis-level metrics
- `totalAxes`: 15
- `proposedPAxes`: 1
- `proposedOAxes`: 4
- `proposedAAxes`: 0
- `unresolvedPAxes`: 4
- `unresolvedOAxes`: 1
- `unresolvedAAxes`: 5
- `totalUnresolvedAxes`: 10
- `totalDraftProposedCodes`: 5
- `releasedCodeCount`: 0

## Code distribution
- `P-G`: 1
- `O-A`: 4
- `UNRESOLVED` em P: 4
- `UNRESOLVED` em O: 1
- `UNRESOLVED` em A: 5
- Outros códigos propostos: 0

## Unresolved reason distribution
Distribuição por eixo `UNRESOLVED` (10 eixos), usando razão dominante por eixo:

- `insufficient_pf_pm_decomposition`: 2
- `warning_or_alert_mechanism_unclear`: 2
- `unsafe_condition_dominant`: 1
- `technical_failure_dominant`: 1
- `source_partial`: 3
- `multi_actor_not_decomposed`: 1
- `insufficient_human_evidence`: 0
- `unknown_or_other`: 0

## Evidence enrichment metrics
- `enrichmentRequiredCases`: 2 (`REAL-EVENT-ADJUDICATION-004`, `REAL-EVENT-TRIAGE-005`)
- `sourcePartialCases`: 1 (`REAL-EVENT-TRIAGE-005`)
- `technicalEnrichmentCases`: 1 (`REAL-EVENT-ADJUDICATION-004`)
- `actorDecompositionNeededCases`: 3 (`001`, `002`, `003`)

## Tabela por caso
| caseId | shortLabel | maturityStatus | P draft | O draft | A draft | unresolvedAxes | mainUnresolvedReason | enrichmentNeeded | authorDecisionStatus | nextStep |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-ADJUDICATION-001 | Thebaud S-92A offshore low-energy descent | AUTHOR_REVIEW_READY | P-G | O-A | UNRESOLVED | A | insufficient_pf_pm_decomposition | true | RULE_APPLIED | Refino PF/PM/callouts sem release |
| REAL-EVENT-ADJUDICATION-002 | Peasmarsh discontinued night approach near trees | HOLD_UNRESOLVED | UNRESOLVED | O-A | UNRESOLVED | P,A | warning_or_alert_mechanism_unclear | true | AUTHOR_DECISION_REQUIRED | Manter hold e reduzir ambiguidade warning/go-around |
| REAL-EVENT-ADJUDICATION-003 | Vigo SAR training low-height descent | HOLD_UNRESOLVED | UNRESOLVED | O-A | UNRESOLVED | P,A | multi_actor_not_decomposed | true | RULE_APPLIED | Refinar papéis PF/PM/mission crew |
| REAL-EVENT-ADJUDICATION-004 | 5N-BQJ DAFCS/TRIM FAIL offshore ditching | EVIDENCE_ENRICHMENT_REQUIRED | UNRESOLVED | O-A | UNRESOLVED | P,A | technical_failure_dominant | true | ENRICHMENT_REQUIRED | Enriquecimento técnico/factual antes de nova adjudicação |
| REAL-EVENT-TRIAGE-005 | HL9661 tail rotor strike (source partial) | TRIAGE_ONLY | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | source_partial | true | ENRICHMENT_REQUIRED | Permanecer triage-only até source anchor mínimo |

## Leitura metodológica
- A amostra favorece conservadorismo metodológico: `10/15` eixos (`66.7%`) ficaram `UNRESOLVED`.
- O processo está evitando overclassification: apenas `5` códigos draft ativos e nenhum fechamento forçado de eixo A.
- A maior perda de resolução está no eixo A (`5/5 unresolved`) e no eixo P (`4/5 unresolved`).
- Antes de qualquer avanço de release, os gaps críticos são: decomposição PF/PM/mission crew, cadeia de percepção de warning, e enriquecimento técnico/primário dos casos 004/005.
- Casos aptos a seguir para `guarded narrative draft` sem release: 001 e, de forma condicional, 002/003 mantendo locks e `UNRESOLVED` explícitos.
- Casos que devem permanecer bloqueados: 004 (enrichment técnico) e 005 (source partial/triage-only).

## Confirmações de lock
- `proposedCode` não é `releasedCode`.
- `releasedCodeCount = 0`.
- Nenhum `selectedCode=CLASSIFIED` foi criado.
- Nenhum `finalConclusion`, HFACS, Risk/ERC ou recommendations foi gerado.
- Nenhum fixture oficial/baseline foi criado/alterado.
- Nenhum runtime code foi alterado nesta fase.

## Próxima recomendação
A4+R-67 — Source Enrichment Execution for 004/005.
