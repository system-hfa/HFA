# A4R180 Structured Extraction — A4R179-SEL-0008 — NTSB-USA-BOEING-767-375BCF

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0008
- inventoryId: A4R178-INV-0291
- probableEventKey: NTSB-USA-BOEING-767-375BCF (Atlas Air Flight 3591)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool/NEW50-1__2020__NTSB-USA__Boeing-767-375BCF__Atlas-Air-Flight-3591-Rapid-Descent-and-Cra.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED_VIA_COMPANION_SLICE (PDF não lido diretamente; TXT companheiro existe em NEW50-1__...txt; slice A4R119 cobre mesmo evento)
- sourceDirectness: SOURCE_PARTIAL (PDF primário; conteúdo factual já capturado em SOURCE-SLICE-ATLAS-3591-A4R119 — overlap com SEL-0007)

## 2. Factual event summary
PDF NTSB cobre o mesmo evento Atlas Air 3591 já tratado em A4R180-EXTRACTION-0007 via slice A4R119. O slice é a representação factual versionada do conteúdo deste PDF. Esta extração trata SEL-0008 como fonte primária complementar do mesmo evento, com remissão à extração 0007 para detalhamento factual.

Resumo (idêntico ao SEL-0007): Atlas Air 3591 (Boeing 767-375BCF) sofreu descida rápida após ativação inesperada de modo go-around. Nenhum piloto reconheceu a ativação; inputs manuais nose-down agressivos seguiram comandos automáticos de go-around. Intervenção do captain não estabeleceu transferência positiva de controle antes do impacto.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Descida/setup | Modo go-around ativou inesperadamente | NEW50-1 PDF + A4R119 slice | HIGH |
| Pós-ativação | Nenhum piloto fez callout ou reconheceu ativação | NEW50-1 PDF + A4R119 slice | HIGH |
| Inputs manuais | Inputs nose-down agressivos opondo-se a trajetória comandada | NEW50-1 PDF + A4R119 slice | HIGH |
| Intervenção | Intervenção do captain não estabeleceu controle estabilizado | NEW50-1 PDF + A4R119 slice | HIGH |
| Impacto | Descida rápida resultou em impacto | NEW50-1 PDF + A4R119 slice | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Idêntico a A4R180-EXTRACTION-0007 (Atlas 3591 via slice)
- evidence: Cross-referenciado a A4R180-EXTRACTION-0007
- confidence: MEDIUM-HIGH
- uncertainty: Mesmo do SEL-0007; cross-reference necessária para evitar double-counting em A4R181

## 5. Possible escape point candidate
- possibleEscapePoint: Reconhecimento imediato de mudança de modo inesperada e desconexão de automação/transferência positiva antes de inputs nose-down sustentados
- whyPotential: Mesmo do SEL-0007
- sourceAnchor: PDF NEW50-1 + slice A4R119 cross-reference
- confidence: PARTIAL
- limitations: Overlap com SEL-0007 deve ser tratado como representações da mesma fonte primária; não criar dois escape points distintos para o mesmo evento

## 6. Direct actor candidate
- directActorCandidate: First Officer/PF (inputs nose-down) com captain (PM/intervention)
- role: Idêntico a SEL-0007
- evidence: Cross-referenciado
- confidence: PARTIAL
- uncertainty: Mesma do SEL-0007

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (cross-referenced com SEL-0007)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| ATLAS-3591-A4R180-ACTOR-FO-PF | First Officer/PF | Inputs manuais nose-down (cross-referência com SEL-0007) | NEW50-1 PDF + A4R119 slice | MEDIUM | Mesmo escape point físico do SEL-0007 |
| ATLAS-3591-A4R180-ACTOR-CAPTAIN-PM | Captain/PM | Intervenção tardia (cross-referência com SEL-0007) | NEW50-1 PDF + A4R119 slice | MEDIUM | Mesmo escape point físico do SEL-0007 |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| ATLAS-3591-PDF-A4R180-F1 | NEW50-1 PDF (inventoryId A4R178-INV-0291) | PDF primário do mesmo evento; conteúdo factual representado no slice A4R119 | Confirma fonte primária | Texto não lido diretamente em A4R180; cross-reference com slice |
| ATLAS-3591-PDF-A4R180-F2 | NEW50-1 PDF + TXT companheiro | TXT extraído do PDF existe em a4r111-new50-pool-txt/NEW50-1__...txt | Permite leitura factual para A4R181 | TXT permite acesso direto para enriquecimento |

## 9. Information explicitly excluded
- probable cause quarentenada
- findings quarentenados
- contributing factors quarentenados
- safety recommendations excluídas
- conclusões organizacionais/de treinamento não importadas como SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- Duplicate-of relationship com SEL-0007: ambos referem-se ao mesmo evento físico (Atlas Air 3591)
- Em A4R181, deve ser tratado como UMA fonte com duas representações (slice + PDF); não criar dois escape points distintos
- Para extração detalhada, slice A4R119 (SEL-0007) é a fonte factual processada

## 11. A4R181 readiness
READY_AS_MULTI_ACTOR_CANDIDATE (mesmo evento que SEL-0007 — tratar como única adjudicação consolidada)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

SEL-0008 referencia o PDF completo do mesmo evento físico de SEL-0007 (Atlas Air 3591, 23 fev 2019). A narrativa operacional, sequência de eventos e considerações de boundary humano/técnico são idênticas à extração 0007. Para evitar dupla narração que pode levar a tratamento como dois eventos distintos em A4R181, esta extração assume framing DUPLICATE_PAIR explícito e remete à A4R180-EXTRACTION-0007 para a narrativa operacional, sequência factual, boundary notes e contexto de escape point.

Contexto adicional desta representação (PDF full report como fonte primária independente do slice):
- O PDF NEW50-1 (inventoryId A4R178-INV-0291) e o TXT companion `a4r111-new50-pool-txt/NEW50-1__...txt` contêm o relatório NTSB AAR-20-02 completo, com capítulos de Factual Information, Analysis, Conclusions e Recommendations. As seções Factual e CVR/FDR data são as fontes primárias para a narrativa que está sintetizada no slice A4R119 (e em SEL-0007).
- Para A4R181, source enrichment marginal (leitura de seções específicas do TXT companion para timestamps/altimetria/quotes de CVR) pode reforçar timeline e callout sequence — mas não cria evento físico distinto.

Esta extração serve para registrar formalmente que (i) o PDF foi acessado como fonte (via TXT companion existente), (ii) o evento é o mesmo do SEL-0007, e (iii) consolidação em A4R181 é obrigatória.

## 14. Source-grounded event sequence

Idêntico a A4R180-EXTRACTION-0007 seção 14 (mesmo evento físico). Para enriquecimento detalhado de timestamps/altitudes específicas via TXT companion, ver plano A4R181.

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| ref | (idêntico a 0007) | (cross-reference A4R180-EXTRACTION-0007) | (idem) | NEW50-1 PDF + TXT + slice A4R119 | (idem) |

## 15. Human/technical boundary notes

Idêntico a A4R180-EXTRACTION-0007 seção 15. Para A4R181, evitar duplicação de boundary analysis — uma única adjudicação cobre tanto SEL-0007 quanto SEL-0008.

## 16. Escape point context

Idêntico a A4R180-EXTRACTION-0007 seção 16. CRITICAL: NÃO criar escape point distinto para SEL-0008 — mesmo evento físico, mesmo escape point candidato. Para A4R181, registrar única adjudicação com fontes referenciando tanto o slice A4R119 (SEL-0007) quanto o PDF/TXT NEW50-1 (SEL-0008).

## 17. Evidence sufficiency assessment

- narrativeSufficiency: SOURCE_PARTIAL_NEEDS_CAUTION (PDF não lido diretamente; TXT companion disponível mas não detalhado neste batch; narrativa via slice cross-reference)
- sourceCompleteness: HIGH (fonte primária full report existe; slice processou seções factual)
- extractionConfidence: MEDIUM (depende do framing duplicate consolidation)
- missingForA4R181: leitura de TXT companion para timestamps específicos e quotes CVR (source enrichment marginal opcional)
- recommendedA4R181Handling: BATCH_C_DUPLICATE_CONSOLIDATION — uma única adjudicação multi-actor consolidando SEL-0007 + SEL-0008.
