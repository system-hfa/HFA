# A4R180 Structured Extraction — A4R179-SEL-0024 — EXT-BATCH1-EXTRACTION-002 (NEEDS_SOURCE_ENRICHMENT)

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0024
- inventoryId: A4R178-INV-0046
- probableEventKey: EXT-BATCH1-EXTRACTION-002 (Leonardo AW139 night over-water flight with EGPWS warning sequence; NTSB ERA19FA210)
- sourcePath: docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-002.md
- sourceBucket: EXTERNAL_CANDIDATE
- sourceQuality: MEDIUM (external extraction draft)
- selectionLane: Source enrichment candidates
- selectionStatus: SOURCE_ENRICHMENT_REQUIRED
- sourceAccessStatus: ACCESSED (header lido)
- sourceDirectness: SOURCE_PARTIAL (extraction draft prévia; fonte primária NTSB ERA19FA210 referenciada com URL ACCESSED)

## 2. Factual event summary
External extraction draft EXT-BATCH1-EXTRACTION-002 referencia NTSB ERA19FA210 — Leonardo AW139 night over-water flight com EGPWS warning sequence. Status do artifact: STRUCTURED_EXTERNAL_EXTRACTION_DRAFT, A4R88_BATCH_1, sem código fechado, NO_PROPOSED_CODE, NOT_FIXTURE, NOT_BASELINE.

Resumo factual do artifact: Relatório descreve night over-water profile em que múltiplos EGPWS alerts ocorreram antes da sequência de impacto, com evidência de crew-control e monitoring documentada no record. Source quality marcada como HIGH (NTSB official URL ACCESSED).

A4R179 selecionou como SOURCE_ENRICHMENT_REQUIRED — extraction draft prévia existe mas requer leitura adicional da fonte NTSB primária ERA19FA210 antes de adjudicação. Nesta fase, extração estruturada é parcial sob esse caveat.

NOTA: Tracker A4R129 lista A4R87-EXT-002 com priorProposedP=P-G, priorProposedO=UNRESOLVED, priorProposedA=UNRESOLVED, todos suspensos com escapePointWhenStatement UNRESOLVED.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Cruise/approach night over-water | Operação air medical transfer noturna | EXT extraction header | LOW |
| EGPWS alerts | Múltiplos EGPWS alerts antes da sequência de impacto | EXT extraction header | LOW |
| Pre-impact | Crew-control e monitoring documentados no record | EXT extraction header | LOW |

(Confidence LOW porque header foi lido mas factualTimeline detalhado não foi exposto; NEEDS_SOURCE_ENRICHMENT.)

## 4. Unsafe state / unsafe condition candidate
- candidate: Voo noturno over-water prosseguindo com múltiplos EGPWS alerts ativos sem resposta efetiva de level-off/climb antes do impacto
- evidence: EXT extraction header — múltiplos EGPWS alerts antes do impacto
- confidence: LOW (extraction draft; requer source enrichment)
- uncertainty: Sequência exata de alerts e crew response requer leitura direta da fonte NTSB ERA19FA210

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre primeiro EGPWS alert e impacto, em que crew response (climb/level-off) era requerida e ainda viável
- whyPotential: EGPWS warning sequence indica cue progressivo claro; tracker A4R129 nota "warning sequence; first departure not separated from warning response" como issue principal
- sourceAnchor: EXT extraction header + NTSB ERA19FA210 URL (ACCESSED)
- confidence: LOW (NEEDS_SOURCE_ENRICHMENT)
- limitations: Tracker A4R129 indica que first departure (escape point) não foi separada da warning response — boundary essential para A4R181

## 6. Direct actor candidate
- directActorCandidate: Crew (typically two-pilot em AW139 EMS night over-water)
- role: Crew operando voo noturno over-water com instrument monitoring demand
- evidence: EXT extraction header — operação EMS night over-water typically two-pilot
- confidence: LOW (NEEDS_SOURCE_ENRICHMENT)
- uncertainty: Diferenciação PF/PM requer source enrichment

## 7. Actor contribution candidates
- notApplicableReason: NEEDS_SOURCE_ENRICHMENT — multi-actor handling postponed para A4R181 após source enrichment com leitura direta da fonte NTSB ERA19FA210.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| EXT-002-A4R180-F1 | EXT extraction header | NTSB ERA19FA210 AW139 night over-water EGPWS warning sequence | Identifica fonte primária | URL ACCESSED no artifact original |
| EXT-002-A4R180-F2 | EXT extraction factualSummary | Múltiplos EGPWS alerts antes do impacto; crew-control e monitoring documentados | Suporta cue progressivo | LOW confidence; source enrichment needed |
| EXT-002-A4R180-F3 | Tracker A4R129 row A4R87-EXT-002 | "warning sequence; first departure not separated from warning response" | Suporta boundary entre escape point e warning response | Não importar conclusão do tracker como SERA |
| EXT-002-A4R180-F4 | NTSB ERA19FA210 URL referenciada | https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/99766/pdf | Fonte primária disponível para A4R181 | Não lido diretamente nesta fase |

## 9. Information explicitly excluded
- Probable cause/findings da fonte NTSB quarentenados
- Recommendations excluídas
- Prior P-G/UNRESOLVED do tracker A4R129 não tratados como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Inferências detalhadas pendentes source enrichment

## 10. Uncertainty notes
- NEEDS_SOURCE_ENRICHMENT: extraction draft prévia precisa de validação contra fonte NTSB primária
- Em A4R181, leitura direta de NTSB ERA19FA210 deve preceder adjudicação
- Boundary entre escape point e warning response é issue conhecido (tracker A4R129)
- AW139 EMS night over-water typically two-pilot; multi-actor potential a confirmar

## 11. A4R181 readiness
NEEDS_SOURCE_ENRICHMENT (leitura direta de NTSB ERA19FA210 antes de adjudicação)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

**NEEDS_SOURCE_ENRICHMENT — narrativa intencionalmente limitada**

EXT-BATCH1-EXTRACTION-002 é uma extraction draft externa do A4R88 batch 1 que referencia NTSB ERA19FA210 (Leonardo AW139 night over-water flight com EGPWS warning sequence). A extraction draft foi criada com base em URL NTSB acessada (https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/99766/pdf) mas conteúdo factual detalhado não foi reprocessado em A4R180. Por regra metodológica de NÃO INVENTAR e NÃO chamar API/LLM externa, esta narrativa permanece esquemática até source enrichment direto da fonte NTSB primária.

Resumo factual disponível no header do artifact original (informação não-fabricada):
- Aircraft: Leonardo AW139
- Operação: night offshore/over-water air medical transfer com instrument monitoring demand
- Eventos: night over-water profile em que múltiplos EGPWS alerts ocorreram antes da sequência de impacto
- Evidence documentado no record: crew-control e monitoring
- Outcome: ERA19FA210 = NTSB Aviation Accident report number (FA = Final Accident)

NOTA: O tracker A4R129 (visto em SEL-0022) lista A4R87-EXT-002 com priorProposedP=P-G, priorProposedO=UNRESOLVED, priorProposedA=UNRESOLVED — todos suspensos com escapePointWhenStatement UNRESOLVED. Esses prior proposals NÃO são tratados como código SERA aqui.

Para enriquecimento metodologicamente válido em A4R181, ações requeridas:
1. Leitura direta de NTSB ERA19FA210 (URL no artifact);
2. Extração de history of flight, CVR/FDR data se disponíveis (FA reports typically incluem factual sections), e analysis;
3. Validação contra extraction draft prévia.

## 14. Source-grounded event sequence

**NEEDS_SOURCE_ENRICHMENT — sequência limitada ao header do artifact**

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Cruise night over-water | Operação air medical transfer noturna | Crew + aeronave | EXT extraction header | LOW |
| 2 | EGPWS alerts | Múltiplos EGPWS alerts antes da sequência de impacto | Sistema EGPWS | EXT extraction header | LOW |
| 3 | Crew control/monitoring | Crew control e monitoring documentados no record | Crew | EXT extraction header | LOW |
| 4 | Pré-impacto | Sequência de impacto (detalhes NEEDS_SOURCE_ENRICHMENT) | Aeronave + ambiente | NTSB ERA19FA210 URL referenciada | LOW |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: AW139 EMS night over-water; sistema EGPWS funcional (alertas registrados); ambiente noturno over-water (referências visuais limitadas).
- **Human-observable actions**: crew control e monitoring documentados (detalhes específicos NEEDS_SOURCE_ENRICHMENT); resposta a EGPWS alerts não detalhada no header.
- **Human-inference cautions**: NÃO inferir nada além do header; tracker A4R129 marca este evento com "warning sequence; first departure not separated from warning response" — esta é a issue principal para A4R181: boundary entre escape point e warning response não está clara sem source enrichment.
- **What must not be inferred yet**: código P/O/A; categorização de response a EGPWS; framing multi-actor.

## 16. Escape point context

A zona candidata, com base no resumo disponível, é a janela entre primeiro EGPWS alert e impacto, em que crew response (climb / level-off) era requerida e ainda viável. Tracker A4R129 identifica como issue: "first departure not separated from warning response" — boundary essential para A4R181. Permanece candidato porque (a) NEEDS_SOURCE_ENRICHMENT impede confirmação, (b) boundary entre first departure (P/A escape point) e warning response (resposta SOP a alert) não está separada sem source primária, e (c) AW139 EMS night over-water typically two-pilot — framing multi-actor a confirmar. Falta confirmar: sequência exata de EGPWS alerts; response do crew; timeline; differentiation actor. Risco de confundir outcome com ponto de fuga: outcome (impacto) é consequência; escape point é antes, na primeira deviation a partir do safe envelope (que precede o primeiro EGPWS warning).

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NEEDS_SOURCE_ENRICHMENT
- sourceCompleteness: LOW (artifact é draft prévia; fonte primária NTSB acessível mas não lida nesta fase)
- extractionConfidence: LOW
- missingForA4R181: leitura direta de NTSB ERA19FA210 (URL no artifact); separação first departure vs warning response; framing multi-actor
- recommendedA4R181Handling: BATCH_D_SOURCE_ENRICHMENT_PENDING — adjudicação suspensa até source enrichment com leitura direta de NTSB ERA19FA210.
