# A4R180 Structured Extraction — A4R179-SEL-0017 — SOURCE-SLICE-UNITED-173-A4R119

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0017
- inventoryId: A4R178-INV-0081
- probableEventKey: SOURCE-SLICE-UNITED-173-A4R119 (United 173 DC-8-61 fuel exhaustion)
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-173-A4R119.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: MEDIUM (slice marca MEDIUM por OCR noise; ADEQUATE_FOR_TRACE_DRAFT)
- selectionLane: Boundary/ambiguous candidates
- selectionStatus: SELECT_AS_BOUNDARY_CASE
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-79-07 documenta United 173 (McDonnell Douglas DC-8-61) que sofreu fuel exhaustion após troubleshooting prolongado de gear malfunction e holding. Crew gerenciou problema de gear indication enquanto atrasava pouso e coordenava possíveis preparações emergenciais. Comunicações crew/ATC incluíam estimativas de fuel e time planning enquanto troubleshooting continuava. CVR mostra sinais progressivos de awareness de low fuel e discussão do crew sobre fuel restante. Aeronave permaneceu em sequência estendida de approach/holding e experimentou fuel exhaustion em motores antes de successful runway landing. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Gear malfunction | Crew handled gear indication problem; delayed landing | U173-E1 | HIGH |
| Holding | Crew/ATC comm com fuel estimates e time planning enquanto troubleshooting | U173-E2 | HIGH |
| Progressão fuel | CVR com fuel advisories repetidos e queries explícitas do crew sobre fuel restante | U173-E1 | HIGH |
| Atenção dividida | Crew attention forte em gear troubleshooting enquanto fuel risk escalou | U173-E3 | HIGH |
| Objetivo persistente | Objetivo de resolver/confirmar gear status e preparar emergency landing persistiu | U173-E4/E5 | HIGH |
| Ação tardia | Crew actions não transitaram cedo o suficiente para fuel-preservation/landing execution | U173-E6/E7 | HIGH |
| Fuel exhaustion | Engines experimentaram fuel exhaustion antes de successful landing | U173-E1 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Continuação de troubleshooting de gear malfunction enquanto fuel risk escalava, com falha em transitar atenção e ação para fuel preservation a tempo
- evidence: CVR com queries repetidas sobre fuel restante; objetivo persistente em troubleshooting; ação não transitando cedo
- confidence: MEDIUM-HIGH
- uncertainty: Boundary entre attentional fixation (P) e adequacy de action selection (A) é zona

## 5. Possible escape point candidate
- possibleEscapePoint: Ponto em que fuel-state advisories e cálculos de remaining-time indicavam transição imediata necessária de troubleshooting para landing
- whyPotential: Slice identifica este como EP primário; janela em que decisão de prioridade era ainda possível
- sourceAnchor: SOURCE-SLICE-UNITED-173-A4R119 seção "4. Safe-operation escape point"
- confidence: PARTIAL
- limitations: Boundary entre P (attentional fixation) e A (action selection adequacy under rising risk) requer adjudicação; OCR artifacts no TXT requerem cuidado

## 6. Direct actor candidate
- directActorCandidate: Captain (PIC) com FO e FE coordenando troubleshooting
- role: PIC mantendo objetivo de troubleshooting enquanto crew gerenciava fuel awareness
- evidence: Slice indica crew como bloco coordenado; PIC tem autoridade decisória
- confidence: PARTIAL
- uncertainty: Multi-actor potential (Captain + FO + FE) é claro, mas slice trata crew como bloco para escape point

## 7. Actor contribution candidates
- notApplicableReason: Slice trata escape point como evento de crew como bloco coordenado. Multi-actor potential existe (Captain decisão + FO/FE fuel monitoring) mas não é tratado como multi-actor formal no slice. Tratamento como single escape point com possível desdobramento em A4R181.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| UNITED-173-A4R180-F1 | U173-E1 | CVR com fuel advisories repetidos e queries explícitas sobre fuel restante | Suporta P (info disponível) | OCR noise; verificação fina necessária |
| UNITED-173-A4R180-F2 | U173-E3 | Crew attention coupled a gear troubleshooting enquanto low-fuel risk escalou | Suporta P (attentional fixation) | Boundary com A |
| UNITED-173-A4R180-F3 | U173-E5 | Continuação de objetivo de troubleshooting persistiu com fuel risk piorando | Suporta O (intent failure em risk management sem evidência de violação deliberada) | Não substitui análise causal |
| UNITED-173-A4R180-F4 | U173-E6/E7 | Timing de action choices sugere boundary A entre selection adequacy e feedback integration | Suporta A-axis boundary | Não conclusão final |

## 9. Information explicitly excluded
- Probable cause quarentenada
- Findings quarentenados
- Contributing factors quarentenados
- Safety recommendations excluídas
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Conclusões sobre crew resource management ou fatigue não importadas como SERA

## 10. Uncertainty notes
- OCR artifacts no TXT exigem interpretação cuidadosa
- Algumas declarações factuais aparecem tanto em summary quanto em seções detalhadas e não devem ser double-counted
- Slice suporta full-axis drafting com handling conservador de boundaries de P (attentional fixation) e A (action-selection adequacy)

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION (boundary case com potencial multi-actor)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

United 173 era um vôo doméstico Denver (DEN) → Portland (PDX), operado em McDonnell Douglas DC-8-61 em 28 dez 1978. Tripulação composta de captain, first officer e flight engineer. Aproximadamente 18:12 PST, na descida para Portland, ao baixar trem, a tripulação notou indicação anormal (right gear indicator anomaly) — possível malfunção mecânica de uplock indicator. O captain decidiu solicitar holding ao ATC para troubleshooting e preparação de emergency landing.

ATC autorizou holding em PDX. Durante o holding (que se estendeu por aproximadamente 1 hora), o crew executou checklists para gear malfunction, coordenou com Portland Approach, discutiu opções de pouso emergency e contactou maintenance via radio. O flight engineer monitorou consumo de combustível e informou repetidamente reduções no fuel remaining ao captain. CVR registra menções de fuel state em intervals: a quantidade indicada de fuel reduziu progressivamente de patamares operacionais para níveis críticos.

A janela crítica é durante o holding entre patamares ~5.000 lb e ~3.000 lb fuel remaining (típica para DC-8-61 com reserva de approximately 6.000 lb para 30 min final reserve). O flight engineer verbalizou updates de fuel state; o captain manteve foco no troubleshooting de gear/preparation; a transição mental de "prepare for emergency landing" para "land immediately, gear status secondary" não ocorreu cedo o suficiente. O slice indica que action selection demorou para transitar de troubleshooting para fuel-preservation/landing execution.

Eventualmente, dois motores apagaram por fuel exhaustion durante approach final. O terceiro e quarto motor apagaram em sequência. A aeronave entrou em descida gliding sem empuxo; impactou área residencial wooded ~6 nm sudeste do aeroporto PDX, antes do limiar da pista. Outcome registrado factualmente, NÃO usado como prova SERA.] A operação caracterizou-se por: attentional fixation em gear troubleshooting; awareness de fuel disponível mas não consolidada em ação; coordenação degradada entre Captain (decision authority), FO (PF/PM), e FE (fuel/systems monitor); transição tardia de prioridade.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Descida | Indicação anormal de gear ao baixar trem | Sistema gear + Crew | U173-E1 | HIGH |
| 2 | Decisão de holding | Captain solicitou holding para troubleshooting | Captain + ATC | U173-E1 | HIGH |
| 3 | Holding | Crew executou checklists, coordenou com ATC, contactou maintenance | Crew | U173-E1/E2 | HIGH |
| 4 | Fuel awareness | FE verbalizou fuel state updates repeated | Flight Engineer | U173-E1 | HIGH |
| 5 | Attentional fixation | Crew attention permaneceu coupled a gear troubleshooting | Crew | U173-E3 | HIGH |
| 6 | Objetivo persistente | Continuação de objetivo de troubleshooting/emergency prep | Captain (decision) | U173-E4/E5 | HIGH |
| 7 | Transição tardia | Action selection não transitou cedo para fuel-preservation/landing | Crew | U173-E6/E7 | HIGH |
| 8 | Fuel exhaustion | Motores apagaram sequencialmente por fuel exhaustion | Sistema engines | (contexto AAR-79-07) | HIGH |
| 9 | Impacto | Aeronave gliding impactou área residencial ~6 nm SE PDX | Aeronave + ambiente | U173-E1 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: gear indicator anomaly (possível malfunção do uplock indicator, gear pode ter estado realmente down e locked); DC-8-61 com four engines, fuel total ~12.000 lb at start of holding; ATC funcional; condições visuais nominais.
- **Human-observable actions**: solicitação de holding; execução de checklists; coordenação com maintenance via radio; verbalização repetida de fuel updates pelo FE; foco mental do captain em gear status; ausência de decisão imediata de "land now" em níveis críticos de fuel.
- **Human-inference cautions**: NÃO inferir treinamento ou CRM como código SERA; NÃO importar análises NTSB sobre training/policy como código; slice marca boundary entre attentional fixation (P) e action-selection adequacy (A); OCR artifacts no TXT exigem cuidado.
- **What must not be inferred yet**: código P, O ou A; categorização de attentional fixation como código P vs A; differential responsibility entre Captain, FO e FE.

## 16. Escape point context

A zona candidata é a janela durante o holding em que fuel-state advisories e cálculos de remaining-time indicavam transição imediata necessária de troubleshooting para landing execution. Possível anchor temporal: momento em que fuel reduzido a níveis críticos (próximo a final reserve) foi verbalizado pelo FE e Captain ainda manteve foco em gear/preparation em vez de comando imediato de land. Permanece candidato porque (a) boundary entre attentional fixation (P) e action selection adequacy (A) é zona, não momento, (b) há multi-actor potential (Captain decision + FO PF + FE fuel monitor) que requer separação, e (c) OCR artifacts requerem verificação fina. Falta confirmar: timestamp/fuel quantity exato em que decisão de "land now" era requerida; framing multi-actor estruturado. Risco de confundir outcome com ponto de fuga: o crash em área residencial é consequência; o escape point é durante o holding na janela de fuel crítico.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R119 ADEQUATE_FOR_TRACE_DRAFT; TXT NTSB AAR-79-07 disponível)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: timestamp/fuel quantity exato no escape point; framing multi-actor estruturado (Captain + FO + FE)
- recommendedA4R181Handling: BATCH_A_NARRATIVE_SUFFICIENT — adjudicação autoral com possível desdobramento multi-actor.
