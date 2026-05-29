# A4R180 Structured Extraction — A4R179-SEL-0011 — NTSB-USA-BOEING-747-300

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0011
- inventoryId: A4R178-INV-0250
- probableEventKey: NTSB-USA-BOEING-747-300 (Korean Air 801 CFIT Guam — KAL801)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/5__2000__NTSB-USA__Boeing-747-300__Controlled-Flight-Into-Terrain-Korean-Air-Fl.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Negative control candidates
- selectionStatus: SELECT_AS_NEGATIVE_CONTROL
- sourceAccessStatus: ACCESSED_VIA_TXT_COMPANION (a4r111-full-pool-txt/5__...txt; sumário/índice lidos)
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-00/01 documenta CFIT de Korean Air 801 (Boeing 747-300, HL7468) em Nimitz Hill, Guam, 6 ago 1997. Voo cleared to land RWY 6L; crashed em high terrain short do aeroporto. Aproximação envolveu procedimento localizer-only (glideslope inoperante). CVR/relatório mostram ambiguidade/confusão sobre status do glideslope e perfil de altitude. Em segundos finais, comentários de missed approach ocorreram muito tarde. Tópicos de análise NTSB incluem: weather factors, accident sequence, flight crew performance, ATC factors (MSAW system inhibited), pilot training, emergency response, oversight. CROSS-REFERENCE: SEL-0016 (SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115) trata o mesmo evento como boundary case; A4R109/A4R110 já tratou como P-only/internal com O/A unresolved.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Pré-aproximação | Aeronave cleared para land RWY 6L | NTSB AAR-00/01 section 1.1; A4R115 slice KAL801-E1 (linhas 445-459) | HIGH |
| Briefing | Briefing incluía referências de localizer/glideslope | A4R115 slice KAL801-E2 (linhas 545-556) | HIGH |
| Aproximação não-precisão | Procedimento localizer-only requeria identificação DME/VOR de step-down e gerenciamento de MDA | A4R115 slice KAL801-E4 (linhas 1876-1897) | HIGH |
| CVR cues | Referências a status de glideslope, callouts de radio altitude | A4R115 slice KAL801-E3 (linhas 657-716) | HIGH |
| Pré-impacto | Comentários de missed approach muito tarde | A4R115 slice KAL801-E3 | HIGH |
| Impacto | Aeronave bateu em terreno alto antes do aeroporto | A4R115 slice KAL801-E1 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aproximação não-precisão com perfil de altitude inadequado para a fase do procedimento (descida abaixo de MDA ou abaixo de step-down DME), sem reconhecimento ou correção
- evidence: Cleared to land mas crashed em terreno alto antes do aeroporto; ambiguidade sobre glideslope; callouts de radio altitude
- confidence: HIGH (factualmente confirmado)
- uncertainty: Tracker A4R129/A4R109 marca este como boundary; análise causal complexa envolve MSAW inhibited (ATC), glideslope OTS, e fatigue

## 5. Possible escape point candidate
- possibleEscapePoint: Fase de briefing/monitoramento de aproximação não-precisão com status do glideslope incerto, perfil de altitude e critérios de missed approach a serem gerenciados
- whyPotential: Boundary case já marcado em A4R109/A4R110 como P-only/internal; SEL-0011 (full report) e SEL-0016 (slice boundary) referem-se ao mesmo evento e devem ser tratados como UMA adjudicação
- sourceAnchor: A4R115 slice KAL801-E2/E3/E4 + NTSB AAR-00/01 section 2.3, 2.4
- confidence: PARTIAL (boundary)
- limitations: Slice marca BOUNDARY_ONLY; O/A unresolved sem expansão dedicada além de governance prévia. Cross-referência com SEL-0016

## 6. Direct actor candidate
- directActorCandidate: Captain como PF na aproximação
- role: PIC executando aproximação não-precisão com glideslope OTS
- evidence: NTSB AAR-00/01 section 2.4.1 (Captain's Performance of the Approach)
- confidence: PARTIAL
- uncertainty: Multi-actor potential (Captain + FO + FE; mais ATC com MSAW inhibited — boundary entre direct actor humano cockpit e contribuição externa)

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (Captain/FO/FE cockpit + ATC contexto)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| KAL801-A4R180-ACTOR-CAPTAIN-PF | Captain/PF | Execução de aproximação com confusão de glideslope/DME | NTSB 2.4.1; A4R115 slice | MEDIUM | Boundary; A4R109 já marcou P-only |
| KAL801-A4R180-ACTOR-FOFE-MONITORING | First Officer/Flight Engineer/PM | Monitoramento de aproximação não interrompendo descida | NTSB 2.4.2 (Flight Crew Monitoring) | MEDIUM | Análise NTSB pode importar conclusão; manter factual |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| KAL801-A4R180-F1 | A4R115 slice KAL801-E1 | Aeronave crashed em high terrain após clear to land RWY 6L | Factual; outcome | Probable cause text nearby quarantined |
| KAL801-A4R180-F2 | A4R115 slice KAL801-E2 | Briefing com referências localizer/glideslope | Factual briefing | Apenas factual |
| KAL801-A4R180-F3 | A4R115 slice KAL801-E3 | CVR: questões de glideslope, callouts radio altitude | Suporta boundary review | Não conclusão limpa |
| KAL801-A4R180-F4 | A4R115 slice KAL801-E4 | Procedimento requeria step-down DME/VOR e MDA management | Suporta O/A boundary | Procedure facts only |

## 9. Information explicitly excluded
- Decisão de autor A4R109 prévia tratou KAL801 como P-F boundary, NÃO referência completa
- Probable cause, contributing factors, findings, safety recommendations excluídos
- Análises NTSB (Approach Briefing, Possible Explanations, Pilot Training, ATC Factors, MSAW inhibition) não importadas como SERA keys
- Performance/Training/Fatigue/CRM discussion não usada como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- P-axis boundary é útil
- O/A permanecem unresolved sem expansão dedicada além de governance prévia
- DUPLICATE da SEL-0016 (SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115) — tratar como UMA adjudicação em A4R181
- Multi-actor boundary inclui MSAW inhibition (ATC) que é contexto sistêmico

## 11. A4R181 readiness
READY_AS_BOUNDARY_CASE (cross-referenciar com SEL-0016)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Korean Air 801 era um vôo internacional Seul-Gimpo (GMP) → Agana, Guam (GUM), operado em Boeing 747-300 em 6 ago 1997. Operação noturna sob condições parcialmente chuvosas em Guam. A tripulação incluía captain (PIC/PF), first officer e flight engineer. **Esta extração e SEL-0016 (slice boundary) referem-se ao mesmo evento físico** — DUPLICATE_PAIR; em A4R181 uma única adjudicação consolida ambas.

Em descida e aproximação para RWY 6L em Guam International, a aproximação selecionada era localizer-only (glideslope ILS estava inoperante por manutenção, NOTAM em vigor). O procedimento exigia step-down DME / VOR fixes com altitudes mínimas em cada step, terminando em uma minimum descent altitude (MDA) antes de visual contact com pista. Adicionalmente, MSAW (Minimum Safe Altitude Warning) em Guam Approach estava inhibido por decisão administrativa devido a alarmes false positives recorrentes — contexto sistêmico relevante.

Durante a aproximação, CVR registra ambiguidade sobre o status do glideslope: comentários do captain sugerem expectativa/uso de glideslope mesmo com NOTAM indicando OTS, possivelmente confundindo um sinal espúrio com glideslope válido. O briefing da aproximação, segundo análise NTSB section 2.4.1, foi conduzido de modo abreviado pelo captain. Callouts de altitude pelo PM (first officer) ocorreram em intervalos, mas a sequência completa de step-down DME / altitude crossing foi degradada.

A aeronave entrou em descida contínua abaixo dos step-downs sucessivos, terminando abaixo da MDA sem visual contact com pista. Em segundos finais, comentários de missed approach ocorreram muito tarde. A aeronave impactou terreno alto em Nimitz Hill (terreno mountainous antes do limiar de RWY 6L) em ~660 ft msl. Outcome registrado factualmente, NÃO usado como prova SERA.

A operação caracterizou-se por: aproximação não-precisão em noite/chuva; ambiguidade de glideslope status; briefing abreviado; sequência de step-down degradada; MSAW inhibited contributing sistêmica; missed approach call tardio. Decisão prévia A4R109/A4R110 já tratou KAL801 como P-only/internal boundary, com O/A unresolved — adjudicação A4R181 deve respeitar essa governance ou justificar reabertura.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-aproximação | NOTAM glideslope OTS RWY 6L Guam; aproximação localizer-only requerida | NOTAM + dispatch | A4R115 slice KAL801-E2 + NTSB section 1.10.3.1 | HIGH |
| 2 | Briefing | Briefing abreviado pelo captain; referências glideslope/localizer | Captain | A4R115 slice KAL801-E2 (545-556) | HIGH |
| 3 | Aproximação | CVR com questões de glideslope status; possível interpretação errônea de sinal | Captain + sistema | A4R115 slice KAL801-E3 (657-716) | HIGH |
| 4 | Step-downs | Sequência de step-down DME degradada; callouts intermitentes | Crew + procedure | A4R115 slice KAL801-E4 (1876-1897) | HIGH |
| 5 | Abaixo MDA | Descida continuada abaixo de MDA sem visual contact | Crew | A4R115 slice KAL801-E3/E4 | HIGH |
| 6 | MSAW inhibited | Sistema MSAW não disparou alarm (inhibited) | ATC Guam Approach system | NTSB section 2.6.2 | HIGH |
| 7 | Missed approach call tardio | Comentários missed approach muito tarde | Crew | A4R115 slice KAL801-E3 | HIGH |
| 8 | Impacto | Aeronave impactou terreno em Nimitz Hill ~660 ft msl | Aeronave + ambiente | A4R115 slice KAL801-E1 (445-459) | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: ILS glideslope RWY 6L OTS (NOTAM); MSAW inhibited em Guam Approach por decisão administrativa; terreno alto antes do limiar; condições noturnas com precipitação; rádio altímetro funcional; FMS standard.
- **Human-observable actions**: briefing abreviado; comentários de captain sobre glideslope status; sequência de step-down callouts degradada; descida abaixo de MDA; comando missed approach tardio.
- **Human-inference cautions**: NÃO inferir fadiga como código SERA; NÃO importar análises de Korean Air training (NTSB section 1.17.2) como código SERA; A4R109/A4R110 prévia tratou como P-only/internal boundary — qualquer expansão para full multi-actor requer justificativa autoral; MSAW inhibition é contexto sistêmico/ATC, não direct actor.
- **What must not be inferred yet**: código P/O/A; expansão para full multi-actor; tratamento de MSAW inhibition como contribuição SERA.

## 16. Escape point context

A zona candidata abrange a fase de monitoramento de aproximação não-precisão, com foco em (a) interpretação do status de glideslope durante briefing/setup (P-axis), (b) sequência de step-down DME/altitude crossing (P + A), e (c) violação de MDA sem visual contact (A-axis). Decisão prévia A4R109/A4R110 já escopou como P-only/internal; expansão para O/A em A4R181 requer racional explícito. Permanece candidato porque (a) o slice marca BOUNDARY_ONLY, (b) governance prévia limitou framing, e (c) há boundary entre captain (briefing + flying) e FO (monitoring callouts). Falta confirmar: respeito a A4R109 P-only ou reabertura; cross-referência com SEL-0016 (slice boundary) para consolidação. Risco de confundir outcome com ponto de fuga: o impacto em Nimitz Hill é consequência; o escape point é durante o briefing/step-down/MDA violation.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_THIN_NEEDS_ENRICHMENT (slice cross-referenced; PDF/TXT NTSB existe mas não lido detalhadamente nesta fase)
- sourceCompleteness: HIGH (fonte primária NTSB AAR-00/01 disponível via TXT companion + slice A4R115)
- extractionConfidence: MEDIUM (constrained by A4R109 governance prévia)
- missingForA4R181: decisão sobre respeitar P-only governance vs reabertura; consolidação com SEL-0016
- recommendedA4R181Handling: BATCH_C_DUPLICATE_CONSOLIDATION + BOUNDARY_REVIEW — adjudicação autoral consolidando SEL-0011 + SEL-0016; respeitar ou reabrir P-only governance.
