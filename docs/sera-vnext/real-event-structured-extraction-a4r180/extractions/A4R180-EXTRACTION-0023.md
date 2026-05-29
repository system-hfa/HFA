# A4R180 Structured Extraction — A4R179-SEL-0023 — EXT-BATCH1-EXTRACTION-001 (NEEDS_SOURCE_ENRICHMENT)

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0023
- inventoryId: A4R178-INV-0045
- probableEventKey: EXT-BATCH1-EXTRACTION-001 (Sikorsky S-92A inadvertent descent near Sable Island; TSB Canada A19A0055)
- sourcePath: docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-001.md
- sourceBucket: EXTERNAL_CANDIDATE
- sourceQuality: MEDIUM (external extraction draft)
- selectionLane: Source enrichment candidates
- selectionStatus: SOURCE_ENRICHMENT_REQUIRED
- sourceAccessStatus: ACCESSED (header lido)
- sourceDirectness: SOURCE_PARTIAL (extraction draft prévia; fonte primária TSB A19A0055 referenciada com URL ACCESSED)

## 2. Factual event summary
External extraction draft EXT-BATCH1-EXTRACTION-001 referencia TSB Canada A19A0055 — S-92A inadvertent descent near Sable Island. Status do artifact: STRUCTURED_EXTERNAL_EXTRACTION_DRAFT, A4R88_BATCH_1, sem código fechado, NO_PROPOSED_CODE, NOT_FIXTURE, NOT_BASELINE.

Resumo factual do artifact: Voo partiu Halifax para offshore facility; após duas tentativas malsucedidas de instrument approach, crew transicionou para visual approach e entrou em condição de high-rate descent / low-airspeed em low visibility. Source quality marcada como HIGH no artifact original (TSB official URL ACCESSED).

A4R179 selecionou como SOURCE_ENRICHMENT_REQUIRED — extraction draft prévia existe mas requer leitura adicional da fonte TSB primária A19A0055 antes de adjudicação. Nesta fase, extração estruturada é parcial sob esse caveat.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Departure | Voo partiu Halifax para offshore facility | EXT extraction header | MEDIUM |
| Approach 1 (failed) | Primeira tentativa de instrument approach malsucedida | EXT extraction (factualTimeline trunc) | LOW |
| Approach 2 (failed) | Segunda tentativa de instrument approach malsucedida | EXT extraction (factualTimeline trunc) | LOW |
| Visual transition | Transição para visual approach em low visibility | EXT extraction | LOW |
| High-rate descent | High-rate descent / low-airspeed condition | EXT extraction header | LOW |

(Confidence MEDIUM/LOW porque header do EXT extraction foi lido mas factualTimeline detalhado não foi exposto na leitura desta fase — needs source enrichment.)

## 4. Unsafe state / unsafe condition candidate
- candidate: Transição de instrument approach malsucedido para visual approach em low visibility resultando em high-rate descent / low-airspeed
- evidence: EXT extraction header e factualSummary
- confidence: LOW (extraction draft prévia; details requerem source enrichment)
- uncertainty: Discrete observable de primeira deviation não isolado nesta leitura; requer leitura direta da fonte TSB A19A0055

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre segunda tentativa malsucedida de instrument approach e transição para visual em low visibility — ponto em que decisão de divert ou continued attempt era ainda viável
- whyPotential: External extraction marca low visibility + high-rate descent / low-airspeed como combinação de risco; janela de decisão estratégica
- sourceAnchor: EXT extraction factualSummary + TSB A19A0055 URL (ACCESSED)
- confidence: LOW (NEEDS_SOURCE_ENRICHMENT)
- limitations: Análise detalhada exige leitura direta da fonte TSB primária

## 6. Direct actor candidate
- directActorCandidate: Crew (typically PF/PM em S-92A offshore IFR) — detail requer source enrichment
- role: Crew operando aproximação IFR offshore com tentativas múltiplas e transição para visual
- evidence: EXT extraction header — operação offshore IFR typically two-pilot
- confidence: LOW (NEEDS_SOURCE_ENRICHMENT)
- uncertainty: Diferenciação PF/PM requer source enrichment

## 7. Actor contribution candidates
- notApplicableReason: NEEDS_SOURCE_ENRICHMENT — multi-actor handling postponed para A4R181 após source enrichment com leitura direta da fonte TSB A19A0055.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| EXT-001-A4R180-F1 | EXT extraction header | TSB Canada A19A0055 S-92A inadvertent descent near Sable Island | Identifica fonte primária | URL ACCESSED no artifact original |
| EXT-001-A4R180-F2 | EXT extraction factualSummary | Departure Halifax; 2 approaches malsucedidos; visual transition; high-rate descent/low-airspeed em low visibility | Suporta unsafe state candidate | LOW confidence; source enrichment needed |
| EXT-001-A4R180-F3 | TSB A19A0055 URL referenciado | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2019/a19a0055/a19a0055.html | Fonte primária disponível para A4R181 | Não lido diretamente nesta fase |

## 9. Information explicitly excluded
- Probable cause/contributing factors da fonte TSB quarentenados
- Recommendations excluídas
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Inferências detalhadas pendentes source enrichment

## 10. Uncertainty notes
- NEEDS_SOURCE_ENRICHMENT: extraction draft prévia (A4R88_BATCH_1) precisa de validação contra fonte TSB primária
- Em A4R181, leitura direta de TSB A19A0055 deve preceder adjudicação
- High-rate descent / low-airspeed é tema técnico que pode confundir A-axis vs capability
- S-92A offshore IFR typically two-pilot; multi-actor potential a confirmar

## 11. A4R181 readiness
NEEDS_SOURCE_ENRICHMENT (leitura direta de TSB A19A0055 antes de adjudicação)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

**NEEDS_SOURCE_ENRICHMENT — narrativa intencionalmente limitada**

EXT-BATCH1-EXTRACTION-001 é uma extraction draft externa do A4R88 batch 1 que referencia TSB Canada A19A0055 (S-92A inadvertent descent near Sable Island). A extraction draft foi criada com base em URL TSB acessada mas conteúdo factual detalhado não foi reprocessado em A4R180. Por regra metodológica de NÃO INVENTAR e NÃO chamar API/LLM externa, esta narrativa permanece esquemática até source enrichment direto da fonte TSB primária.

Resumo factual disponível no header do artifact original (informação não-fabricada):
- Aircraft: Sikorsky S-92A
- Operação: offshore IFR (oil & gas helicopter operations) com platform approaches em baixa visibilidade
- Departure: Halifax para offshore facility
- Eventos: após duas tentativas malsucedidas de instrument approach, crew transicionou para visual approach e entrou em condição de high-rate descent / low-airspeed em low visibility
- Outcome: ocorrência ATR (Air Transportation Safety Investigation), report A19A0055

Para enriquecimento metodologicamente válido em A4R181, ações requeridas:
1. Leitura direta de TSB A19A0055 (URL ACCESSED no artifact original — https://www.tsb.gc.ca/eng/rapports-reports/aviation/2019/a19a0055/a19a0055.html);
2. Extração de history of flight, CVR/FDR data se disponíveis, e analysis sections;
3. Validação contra extraction draft prévia (A4R88) para coerência.

## 14. Source-grounded event sequence

**NEEDS_SOURCE_ENRICHMENT — sequência limitada ao header do artifact**

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Departure | Voo partiu Halifax para offshore facility | Crew + dispatch | EXT extraction header | LOW (source enrichment needed) |
| 2 | Approach 1 | Primeira tentativa de instrument approach malsucedida | Crew | EXT extraction header | LOW |
| 3 | Approach 2 | Segunda tentativa de instrument approach malsucedida | Crew | EXT extraction header | LOW |
| 4 | Visual transition | Transição para visual approach em low visibility | Crew | EXT extraction header | LOW |
| 5 | High-rate descent | High-rate descent / low-airspeed condition | Aeronave + Crew | EXT extraction header | LOW |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: S-92A offshore IFR; platform approach environment; low visibility weather; (detalhes específicos NEEDS_SOURCE_ENRICHMENT).
- **Human-observable actions**: duas tentativas de instrument approach; transição para visual; high-rate descent (sequência exata e timing NEEDS_SOURCE_ENRICHMENT).
- **Human-inference cautions**: NÃO inferir nada além do que está no header do artifact; NÃO inventar quotes ou timing; high-rate descent + low-airspeed é tema técnico que pode confundir A-axis vs capability — separação requer leitura direta de TSB.
- **What must not be inferred yet**: código P/O/A; framing multi-actor (S-92A typically two-pilot mas detalhes operacionais não confirmados); todos os timestamps e quotes específicos.

## 16. Escape point context

A zona candidata, com base no resumo disponível, parece ser a janela entre a segunda tentativa malsucedida de instrument approach e a transição para visual em low visibility — ponto em que decisão de divert ou continued attempt era ainda viável. Permanece candidato porque (a) NEEDS_SOURCE_ENRICHMENT impede confirmação precisa, (b) high-rate descent + low-airspeed é boundary técnico-aerodinâmico, e (c) framing multi-actor requer confirmação via leitura direta. Falta confirmar: timeline detalhado das duas tentativas; momento exato da transição para visual; cues disponíveis; differentiation PF/PM. Risco de confundir outcome com ponto de fuga: outcome da ocorrência (provavelmente CFIT ou near-CFIT) é consequência; escape point é antes, na decisão de transição para visual ou nas tentativas anteriores.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NEEDS_SOURCE_ENRICHMENT
- sourceCompleteness: LOW (artifact é draft prévia; fonte primária TSB acessível mas não lida nesta fase)
- extractionConfidence: LOW
- missingForA4R181: leitura direta de TSB A19A0055 (URL no artifact); validação do conteúdo da extraction draft prévia
- recommendedA4R181Handling: BATCH_D_SOURCE_ENRICHMENT_PENDING — adjudicação suspensa até source enrichment com leitura direta de TSB A19A0055.
