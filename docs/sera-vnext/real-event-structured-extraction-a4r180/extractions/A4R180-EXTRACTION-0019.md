# A4R180 Structured Extraction — A4R179-SEL-0019 — NTSB-USA-AIRBUS-A320-214 (DUPLICATE_REVIEW_REQUIRED)

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0019
- inventoryId: A4R178-INV-0241
- probableEventKey: NTSB-USA-AIRBUS-A320-214 (US Airways 1549 — full NTSB AAR-10-03 report)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Boundary/ambiguous candidates
- selectionStatus: DUPLICATE_REVIEW_REQUIRED
- sourceAccessStatus: ACCESSED_VIA_TXT_COMPANION (a4r111-full-pool-txt/39__...txt existe; mesmo evento já tratado em SEL-0009 via slice)
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE_DUPLICATE

## 2. Factual event summary
PDF NTSB AAR-10-03 é o relatório completo do mesmo evento já tratado em A4R180-EXTRACTION-0009 via slice SOURCE-SLICE-US-AIRWAYS-1549-A4R115. Slice A4R115 explicitamente nota que "duplicate TXT also exists in new50 pool as UC-063". Esta extração trata SEL-0019 como duplicate of SEL-0009.

Resumo factual: US Airways 1549 (A320-214) sofreu bird strike em ~2.818 ft AGL após decolagem do LaGuardia; ambos motores decaíram; captain assumiu controles, FO executou QRH dual-engine failure; runway return julgado inviável; ditching no Hudson River com evacuação. Cross-referência com REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 (fixture candidate P1A) e A4R180-EXTRACTION-0009.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Todas as fases | Idêntico a A4R180-EXTRACTION-0009 (mesmo evento físico) | NEW50-15 + slice A4R115 + AAR-10-03 PDF | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: NEGATIVE-CONTROL (mesmo do SEL-0009) — bird strike é condição técnica/ambiental, não ato inseguro humano
- evidence: Cross-referenciado a A4R180-EXTRACTION-0009
- confidence: HIGH (negative control intent)
- uncertainty: Duplicate handling — deve ser consolidado com SEL-0009 em A4R181

## 5. Possible escape point candidate
- possibleEscapePoint: Mesmo do SEL-0009 (negative control replication)
- whyPotential: Mesmo do SEL-0009
- sourceAnchor: Cross-referenciado a A4R180-EXTRACTION-0009 + AAR-10-03 PDF
- confidence: NEGATIVE_CONTROL
- limitations: DUPLICATE — não criar escape point distinto; consolidar com SEL-0009

## 6. Direct actor candidate
- directActorCandidate: Captain (cross-referência com SEL-0009)
- role: PIC (idêntico)
- evidence: Cross-referenciado
- confidence: HIGH
- uncertainty: Não há "ato inseguro" para atribuir; tratamento como negative control replication

## 7. Actor contribution candidates
- notApplicableReason: NEGATIVE CONTROL DUPLICATE — não há contribuição multi-actor para escape point de falha; mesmo evento físico que SEL-0009. Consolidar como UMA adjudicação em A4R181.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| US1549-FULL-A4R180-F1 | AAR-10-03 PDF (inventoryId A4R178-INV-0241) | Relatório completo NTSB AAR-10-03 do mesmo evento US Airways 1549 | Confirma fonte primária full report | DUPLICATE com SEL-0009 (slice) |
| US1549-FULL-A4R180-F2 | TXT companion 39__...txt | TXT existe em a4r111-full-pool-txt para leitura factual estendida se necessário | Permite enriquecimento em A4R181 | Não muda framing como negative control |
| US1549-FULL-A4R180-F3 | Cross-reference SEL-0009 + REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 | Mesmo evento físico tratado em três representações: slice A4R115, PDF full, P1A fixture candidate | Tratar como single adjudicação | Risco de double-counting se não consolidado |

## 9. Information explicitly excluded
- Probable cause, contributing factors, findings, safety recommendations excluídos
- Narrativa heróica/reputacional não é evidência SERA
- Outcome (ditching bem-sucedido) não usado como prova de "sem falha"
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- DUPLICATE com SEL-0009 — consolidar em A4R181 como UMA adjudicação
- Negative control replication framing aplica-se igualmente
- Cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 já validado em A4R173
- Para A4R181: NÃO criar dois escape points distintos para o mesmo evento físico

## 11. A4R181 readiness
READY_AS_NEGATIVE_CONTROL_REPLICATION (consolidar com SEL-0009 — UMA adjudicação)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

SEL-0019 referencia o PDF completo NTSB AAR-10-03 do mesmo evento físico de SEL-0009 (US Airways 1549, Airbus A320-214, ditching no Hudson River em 15 jan 2009). Esta extração é tratada como **DUPLICATE_PAIR + NEGATIVE_CONTROL_REPLICATION**; a narrativa operacional, sequência factual e contexto estão consolidados em A4R180-EXTRACTION-0009.

Contexto adicional desta representação (PDF full report como fonte primária independente do slice):
- O PDF `39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.pdf` e o TXT companion (`a4r111-full-pool-txt/39__...txt`) contêm o relatório NTSB AAR-10-03 completo: 213 páginas com Factual Information, Analysis, Conclusions, Probable Cause, Findings, e Recommendations. As seções Factual (1.1 History of Flight, 1.11 Flight Recorders) são fontes primárias para a narrativa que está sintetizada no slice A4R115 (e em SEL-0009).
- Slice A4R115 explicitamente nota "duplicate TXT also exists in new50 pool as UC-063" — confirmando que a mesma fonte primária aparece em múltiplos pools de inventário.
- A4R179 selecionou esta representação sob lane "Boundary/ambiguous candidates" com selectionStatus = DUPLICATE_REVIEW_REQUIRED, indicando que o duplicate handling era esperado no enrichment.

**Framing preservado**: NEGATIVE CONTROL REPLICATION — esta representação NÃO altera o framing definido em SEL-0009. Para A4R181, consolidação obrigatória.

## 14. Source-grounded event sequence

Idêntico a A4R180-EXTRACTION-0009 seção 14 (mesmo evento físico).

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| ref | (idêntico a 0009) | (cross-reference A4R180-EXTRACTION-0009) | (idem) | AAR-10-03 PDF + TXT + slice A4R115 | (idem) |

## 15. Human/technical boundary notes

Idêntico a A4R180-EXTRACTION-0009 seção 15. Framing NEGATIVE CONTROL preservado.

## 16. Escape point context

Idêntico a A4R180-EXTRACTION-0009 seção 16. CRITICAL: NÃO criar escape point distinto para SEL-0019 — mesmo evento físico, mesmo framing negative control. Para A4R181, registrar única adjudicação consolidada negative control.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT (negative control framing; conteúdo via cross-reference a 0009)
- sourceCompleteness: HIGH (fonte primária full report)
- extractionConfidence: HIGH
- missingForA4R181: nada estrutural; possível leitura de TXT companion para quotes CVR específicas
- recommendedA4R181Handling: BATCH_C_NEGATIVE_CONTROL_CONSOLIDATION — uma única adjudicação consolidando SEL-0009 + SEL-0019; cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.
