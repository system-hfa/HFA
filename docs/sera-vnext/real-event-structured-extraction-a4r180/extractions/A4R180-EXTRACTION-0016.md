# A4R180 Structured Extraction — A4R179-SEL-0016 — SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0016
- inventoryId: A4R178-INV-0075
- probableEventKey: SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115 (KAL801 Boeing 747-300 CFIT Guam — boundary)
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH (slice marca BOUNDARY_ONLY)
- selectionLane: Boundary/ambiguous candidates
- selectionStatus: SELECT_AS_BOUNDARY_CASE
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-00/01 documenta KAL801 (Boeing 747-300) que crashed em high terrain antes de Guam após cleared to land RWY 6L. Aproximação envolveu procedimento localizer-only (glideslope OTS). CVR/seções do relatório mostram ambiguidade/confusão sobre status do glideslope e perfil de altitude. Em segundos finais, comentários de missed approach ocorreram muito tarde. Evento permanece boundary porque A4R109/A4R110 já o tratou como P-only/internal com O/A unresolved. Cross-referência com SEL-0011 (PDF full report do mesmo evento). Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Pré-aproximação | Aeronave cleared to land RWY 6L | KAL801-E1 (linhas 445-459) | HIGH |
| Briefing | Discussão de localizer/glideslope references; missed approach references | KAL801-E2 (linhas 545-556) | HIGH |
| Aproximação | CVR com questões sobre status do glideslope, callouts radio altitude | KAL801-E3 (linhas 657-716) | HIGH |
| Profile | Procedimento não-precisão exigia step-down DME/VOR e gerenciamento MDA | KAL801-E4 (linhas 1876-1897) | HIGH |
| Pré-impacto | Comentários missed approach muito tarde | KAL801-E3 | HIGH |
| Impacto | Aeronave crashed em high terrain short do aeroporto | KAL801-E1 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aproximação não-precisão prosseguindo com confusão de glideslope status e ausência de identificação adequada de step-down DME/VOR e MDA management; descida abaixo de MDA sem visual de runway
- evidence: CVR com questões sobre glideslope; missed approach comments tardios
- confidence: MEDIUM (slice marca BOUNDARY_ONLY)
- uncertainty: P-axis boundary é útil; O/A permanecem unresolved sem expansão dedicada

## 5. Possible escape point candidate
- possibleEscapePoint: Fase de monitoramento de aproximação não-precisão com status do glideslope incerto, em que perfil de altitude e critérios de missed approach precisavam ser gerenciados
- whyPotential: Slice identifica este como boundary EP; A4R109/A4R110 já escopo como P-only/internal
- sourceAnchor: SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115 seção "4. Escape point candidate"
- confidence: PARTIAL (boundary)
- limitations: Slice marca BOUNDARY_ONLY; O/A sem expansão. DUPLICATE com SEL-0011 (NTSB-USA-BOEING-747-300) — mesmo evento físico

## 6. Direct actor candidate
- directActorCandidate: Captain como PF na aproximação
- role: PIC executando aproximação não-precisão com glideslope OTS
- evidence: NTSB seção 2.4.1 + slice
- confidence: PARTIAL
- uncertainty: Multi-actor potential com FO/FE; A4R109 prior escopo limita análise full multi-actor

## 7. Actor contribution candidates
- notApplicableReason: Boundary case marcado em A4R109/A4R110 como P-only/internal. Multi-actor handling não foi escopo prévio. Em A4R181 deve ser consolidado com SEL-0011 como UMA adjudicação.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| KAL801-BND-A4R180-F1 | KAL801-E1 | Aeronave crashed em high terrain após clear to land RWY 6L | Factual outcome | Probable cause nearby quarantined |
| KAL801-BND-A4R180-F2 | KAL801-E2 | Briefing com referências glideslope/localizer | Factual briefing | Não conclusão |
| KAL801-BND-A4R180-F3 | KAL801-E3 | CVR com glideslope status questions e radio altitude callouts | Suporta boundary review | Não conclusão limpa |
| KAL801-BND-A4R180-F4 | KAL801-E4 | Procedure step-down DME/VOR e MDA management requeridos | Suporta O/A boundary | Procedure facts only |

## 9. Information explicitly excluded
- Prior A4R109 author decision tratou KAL801 como P-F boundary; não tratar como full reference
- Probable cause, contributing factors, findings, safety recommendations excluídos
- Análises de Flight Crew Performance, ATC Factors, MSAW inhibition não importadas como SERA keys
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- P-axis boundary é útil
- O/A permanecem unresolved sem expansão dedicada além de governance prévia
- DUPLICATE com SEL-0011 — tratar como UMA adjudicação consolidada em A4R181
- Multi-actor context (MSAW inhibition ATC) é sistêmico, não direct actor

## 11. A4R181 readiness
READY_AS_BOUNDARY_CASE (cross-referenciar com SEL-0011 — uma única adjudicação)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

SEL-0016 (SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115) é o slice boundary do mesmo evento físico de SEL-0011 (Korean Air 801, Boeing 747-300 CFIT em Nimitz Hill, Guam, 6 ago 1997). Esta extração é tratada como **DUPLICATE_PAIR + BOUNDARY_REVIEW_REQUIRED**; a narrativa operacional completa, sequência factual, boundary notes e contexto de escape point estão consolidados em A4R180-EXTRACTION-0011. Esta extração registra formalmente a representação boundary específica do slice A4R115 e a decisão prévia A4R109/A4R110 que escopou o evento como P-only/internal.

Contexto adicional desta representação boundary:
- O slice A4R115 com nome "KOREAN-801-BOUNDARY" foi explicitamente criado para registrar tratamento boundary do evento, refletindo decisão prévia A4R109/A4R110 que limitou expansão O/A.
- Esse tratamento boundary reconhece que (a) o evento tem contribuição sistêmica significativa (MSAW inhibited, glideslope OTS, NOTAM handling) que confunde "direct actor humano único", (b) a sequência factual cockpit é ambígua o suficiente para que O/A não sejam limpos sem expansão de fonte além do que governance prévia permitiu.
- Para A4R181, a consolidação com SEL-0011 deve preservar o framing boundary — uma única adjudicação consolidada que respeite ou justificadamente reabra o P-only governance.

Esta extração serve para (i) registrar formalmente que o slice boundary foi acessado, (ii) confirmar que o evento físico é o mesmo de SEL-0011, e (iii) que consolidação + boundary review em A4R181 é obrigatória.

## 14. Source-grounded event sequence

Idêntico a A4R180-EXTRACTION-0011 seção 14 (mesmo evento físico).

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| ref | (idêntico a 0011) | (cross-reference A4R180-EXTRACTION-0011) | (idem) | A4R115 slice + NTSB AAR-00/01 | (idem) |

## 15. Human/technical boundary notes

Idêntico a A4R180-EXTRACTION-0011 seção 15. Importante para boundary review:
- A4R109/A4R110 prévia tratou KAL801 como P-F boundary, não full reference.
- MSAW inhibition é contribuição sistêmica ATC; glideslope OTS é contribuição sistêmica NOTAM/airport.
- Adjudicação A4R181 deve respeitar ou justificar reabertura desse escopo.

## 16. Escape point context

Idêntico a A4R180-EXTRACTION-0011 seção 16. CRITICAL: NÃO criar escape point distinto para SEL-0016 — mesmo evento físico, mesmo escape point candidato. Para A4R181, registrar única adjudicação consolidada com framing boundary que reflete decisão prévia A4R109/A4R110.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_THIN_NEEDS_ENRICHMENT (slice boundary específico, conteúdo principal via cross-reference a 0011)
- sourceCompleteness: HIGH (mesma fonte primária NTSB de SEL-0011)
- extractionConfidence: MEDIUM (boundary governance prévia limita escopo)
- missingForA4R181: consolidação com SEL-0011; decisão sobre respeitar ou reabrir P-only governance
- recommendedA4R181Handling: BATCH_C_DUPLICATE_CONSOLIDATION + BOUNDARY_REVIEW — uma única adjudicação consolidando SEL-0011 + SEL-0016 com framing boundary.
