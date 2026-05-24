# SERA Engine vNext Real Event Consolidation Pack A4R68 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-68 — Real Event Adjudication Consolidation Pack  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Consolidar a rodada real-event após enrichment, re-adjudicar o caso 004 com base factual fortalecida, manter o 005 corretamente bloqueado e decidir a trilha metodológica imediata de continuidade.

## Casos revisados
| caseId | shortLabel | status anterior | status pós-A4+R68 | P draft | O draft | A draft | unresolvedAxes | enrichmentStatus | nextStep |
|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-ADJUDICATION-001 | Thebaud low-energy descent | AUTHOR_REVIEW_READY | AUTHOR_REVIEW_READY | P-G | O-A | UNRESOLVED | A | not blocking (minor refinement only) | Guarded narrative draft candidate |
| REAL-EVENT-ADJUDICATION-002 | Peasmarsh discontinued approach | HOLD_UNRESOLVED | HOLD_UNRESOLVED | UNRESOLVED | O-A | UNRESOLVED | P,A | not blocking, but unresolved maintained | Maintain hold and await author clarification on O-axis robustness |
| REAL-EVENT-ADJUDICATION-003 | Vigo SAR low-height descent | HOLD_UNRESOLVED | HOLD_UNRESOLVED | UNRESOLVED | O-A | UNRESOLVED | P,A | not blocking, but unresolved maintained | Maintain hold, refine PF/PM/mission crew decomposition |
| REAL-EVENT-ADJUDICATION-004 | 5N-BQJ DAFCS/TRIM FAIL ditching | EVIDENCE_ENRICHMENT_REQUIRED + HOLD_UNRESOLVED | HOLD_UNRESOLVED (enrichment cleared) | UNRESOLVED | O-A | UNRESOLVED | P,A | SOURCE_ENRICHED (IMPROVED_MEDIUM) | Controlled re-adjudication complete; eligible for guarded narrative (with unresolved locks) |
| REAL-EVENT-TRIAGE-005 | HL9661 tail rotor strike | TRIAGE_ONLY + EVIDENCE_ENRICHMENT_REQUIRED | TRIAGE_ONLY + EVIDENCE_ENRICHMENT_REQUIRED | UNRESOLVED | UNRESOLVED | UNRESOLVED | P,O,A | SOURCE_PARTIAL (IMPROVED_LOW) | Continue source enrichment backlog |

## Resultado do 004 pós-enrichment
- A qualidade de fonte subiu para `IMPROVED_MEDIUM`, com anchors oficiais AIB/NSIB/BEA e consistência interna reforçada.
- O caso sai de bloqueio estrito de enrichment e entra em `HOLD_UNRESOLVED` pós-re-adjudicação.
- Proposta pós-enrichment mantida de forma conservadora:
  - `P=UNRESOLVED`
  - `O=O-A`
  - `A=UNRESOLVED`
- Eixos abertos: P e A.
- Justificativa: ainda não há mecanismo humano suficientemente discriminado para P/A sem inferência forte; dominância técnica continua relevante.

## Resultado do 005
- Permanece `TRIAGE_ONLY` com `EVIDENCE_ENRICHMENT_REQUIRED`.
- Motivo: anchor factual ainda parcial, sem relatório oficial detalhado acessível/extraído com locator robusto.
- Fonte mínima ainda necessária:
  - relatório primário completo;
  - cronologia operacional detalhada;
  - decomposição de comunicação e coordenação solo-ar;
  - separação de atores voo vs solo.

## Métricas pós-A4+R68
- `totalCases=5`
- `adjudicationDraftCases=4`
- `triageOnlyCases=1`
- `authorReviewReadyCases=1`
- `holdUnresolvedCases=3` (002, 003, 004)
- `evidenceEnrichmentRequiredCases=1` (005 estrito)
- `totalAxes=15`
- `totalUnresolvedAxes=10`
- `proposedPAxes=1`
- `proposedOAxes=4`
- `proposedAAxes=0`
- `releasedCodeCount=0`

## Elegibilidade para próxima etapa

### A) Eligible for guarded narrative draft (sem finalConclusion)
- REAL-EVENT-ADJUDICATION-001
- REAL-EVENT-ADJUDICATION-004 (com locks explícitos e P/A unresolved mantidos)

### B) Hold unresolved
- REAL-EVENT-ADJUDICATION-002
- REAL-EVENT-ADJUDICATION-003
- REAL-EVENT-ADJUDICATION-004 (parcial, para eixos P/A)

### C) Enrichment backlog
- REAL-EVENT-TRIAGE-005

## Decisão de trilha A4+R-69
Recomendação composta:
1. Guarded Narrative Draft para casos elegíveis (001 e 004), sem `finalConclusion` e sem release.
2. Continuidade de source enrichment para 005 como backlog prioritário.

## Confirmações
- `proposedCode` não é `releasedCode`.
- `selectedCode` não é `CLASSIFIED`.
- nenhum `finalConclusion` foi gerado.
- nenhum HFACS/Risk/ERC foi gerado.
- nenhuma recommendation foi gerada.
- nenhum fixture/baseline foi criado/alterado.
- nenhum runtime foi alterado.
