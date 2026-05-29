# A4R180 Structured Extraction — A4R179-SEL-0003 — SOURCE-SLICE-AMERICAN-1420-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0003
- inventoryId: A4R178-INV-0070
- probableEventKey: SOURCE-SLICE-AMERICAN-1420-A4R115
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-AMERICAN-1420-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB documenta overrun em pouso de American 1420 (MD-82) em Little Rock. Tripulação partiu tarde no último trecho do duty day com tempo adverso. Despachante sugeriu expedir chegada para superar trovoadas. ATC repetidamente forneceu informações de trovoada, vento, visibilidade e windshear. Tripulação perdeu/readquiriu referência visual, aceitou aproximação visual, depois recebeu vetores para ILS. No segmento final, ocorreram comentários de desvio de curso, dificuldade visual e GPWS "sink rate" em baixa altitude. Após pouso, aeronave overran; FDR indicou que flight spoilers não estenderam simetricamente. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Pré-aproximação | Despachante sugeriu expedir chegada por trovoadas; alternativas listadas | AA1420-E1 (linhas 530-545) | HIGH |
| Aproximação inicial | Tower reportou trovoada/vento/windshear; crew discutiu crosswind limit sem verificar manual | AA1420-E2 (linhas 580-626) | HIGH |
| Transição aproximação | Crew aceitou visual, depois perdeu contato visual, recebeu vetores para ILS 4R | AA1420-E3 (linhas 636-700) | HIGH |
| Aproximação final | Comentário fora de curso, "I can't see it", GPWS sink rate antes do touchdown | AA1420-E4 (linhas 740-774) | HIGH |
| Touchdown | Sequência FDR/CVR de touchdown, reversores e freios | AA1420-E5 (linhas 765-880) | HIGH |
| Pós-touchdown | Flight spoilers não desplegados simetricamente | AA1420-E6 (linhas 790-806) | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aproximação prosseguindo abaixo do gate de aproximação estabilizada com referência visual degradada, windshear ativo e perfil instável (sink rate alto) sem arremetida
- evidence: GPWS "sink rate"; perda de referência visual reportada pelo crew; condições de windshear avisadas
- confidence: MEDIUM-HIGH
- uncertainty: Gate exato de transição não isolado em momento discreto; possivelmente em zona entre vetor para ILS e GPWS sink rate

## 5. Possible escape point candidate
- possibleEscapePoint: Segmento final de aproximação quando windshear/crosswind/perda de referência visual estavam presentes antes do touchdown
- whyPotential: Slice identifica EP primário (segmento de aproximação final com instabilidade) e EP secundário (touchdown/rolagem com problema de spoiler)
- sourceAnchor: SOURCE-SLICE-AMERICAN-1420-A4R115 seção "4. Escape point candidate"
- confidence: PARTIAL-MEDIUM
- limitations: Boundary entre instabilidade vs problema técnico do spoiler como evento secundário; slice marca FULL_TRACE_POSSIBLE mas O/A devem separar continuação operacional de outcome meteorológico

## 6. Direct actor candidate
- directActorCandidate: Tripulação de voo (PF/PM) para o gate de aproximação final/decisão de prosseguir
- role: Decisão de continuação da aproximação sob condições degradadas
- evidence: Slice indica perda de visual, comentários do crew e GPWS warning
- confidence: PARTIAL
- uncertainty: Diferenciação entre PF (FO) e PM (Captain) requer análise adicional; multi-actor potential com despachante e ATC existe mas é contextual

## 7. Actor contribution candidates
- notApplicableReason: Slice trata o escape point primário como evento de tripulação integrada. Influências do despachante e ATC são contextuais e não tratadas como contribuições paralelas no escape point.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| AA1420-A4R180-F1 | AA1420-E1 | Despachante sugeriu expedir chegada para evitar trovoadas | Contexto operacional/pressão de tempo | Não é objetivo SERA |
| AA1420-A4R180-F2 | AA1420-E2 | Avisos de windshear/vento/visibilidade não fizeram tripulação verificar manual de crosswind | Suporta P (info disponível) e O (continuação) | Boundary entre axes |
| AA1420-A4R180-F3 | AA1420-E4 | Comentário fora de curso, perda visual, GPWS sink rate em baixa altitude | Suporta estado inseguro e instabilidade de aproximação | Não substitui análise causal |
| AA1420-A4R180-F4 | AA1420-E6 | Spoilers não estenderam simetricamente | Sistema/A-axis secundário | Boundary entre falha sistêmica e ação |

## 9. Information explicitly excluded
- outcome (overrun/fatalidades) não usado como prova SERA
- probable causes/contributing factors quarentenados
- findings/recommendations excluídos
- inferências sobre fadiga/treinamento como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Labels de "weather-risk" do relatório não importados

## 10. Uncertainty notes
- O-axis tem evidência forte mas distinguir objetivo de continuação vs outcome meteorológico requer adjudicação
- A-axis com sequência factual em torno de spoilers/freios/reversores precisa separar seleção de ação vs branch de implementação/capacidade
- Múltiplos EPs candidatos (aproximação final vs touchdown)

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

American Airlines 1420 era um vôo doméstico noturno de Dallas-Fort Worth (DFW) para Little Rock (LIT), operado em MD-82 em 1 jun 1999. Era o último trecho do duty cycle da tripulação (CPT e FO), com tempo significativo de duty já acumulado. O ambiente meteorológico ao longo da rota e em destino estava ativamente degradado: uma linha de trovoadas convectivas se movia sobre Little Rock no horário previsto de pouso, com fenômenos associados de gusty winds, windshear e chuva pesada.

Antes da descida, o despachante AA sugeriu via ACARS expedir a chegada para "beat the thunderstorms", citando alternativas em paperwork. A tripulação aceitou a tarefa e prosseguiu com a aproximação. ATC tower em LIT repetidamente forneceu informações de movimento de trovoada, ventos com rajadas variando de direção, visibilidade reduzida e alertas de windshear. Durante a discussão pré-aproximação, o slice nota que a tripulação discutiu o crosswind limit operacional mas não verificou o valor exato no manual da aeronave para pista molhada.

A tripulação inicialmente aceitou aproximação visual à pista 4R, perdeu contato visual com a pista por causa de chuva/visibilidade, e foi vetorada para ILS à mesma pista. No segmento final do ILS, comentários de CVR incluíram "I can't see it" e "off course" — indicando dificuldade visual significativa em final. O EGPWS gerou um alerta "sink rate" em baixa altitude antes do touchdown, marcando perfil de descida fora de parâmetros nominais para landing.

O touchdown ocorreu sob condições de windshear ativa, com tail wind e crosswind significativos. FDR registrou que os flight spoilers não desplegaram simetricamente após o touchdown — a sequência exata de auto-spoiler arming/deployment e ação manual subsequente é tema de análise detalhada do relatório. Sem deceleração total efetiva (spoilers + reversores + freios), a aeronave overran o fim da pista 4R (~7.200 ft), atravessou área não-pavimentada e impactou estruturas de aproximação ILS no extremo. Outcome registrado factualmente, NÃO usado como prova SERA.

A operação caracterizou-se por: pressão temporal explícita (despachante + duty time), informação meteorológica abundante mas não totalmente integrada em decisão (crosswind limit não verificado, gate de arremetida em windshear ativo não acionado), e cadeia técnica pós-touchdown (spoiler asymmetry) que reduziu margem de parada.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-descida | Despachante sugeriu expedir chegada para beat thunderstorms | Dispatch + Crew (ACARS) | AA1420-E1 (530-545) | HIGH |
| 2 | Aproximação inicial | ATC reportou trovoada/vento/visibilidade/windshear; crew discutiu crosswind limit sem verificar manual | ATC + Crew | AA1420-E2 (580-626) | HIGH |
| 3 | Transição de aproximação | Crew aceitou visual; perdeu contato visual; recebeu vetores para ILS 4R | Crew + ATC | AA1420-E3 (636-700) | HIGH |
| 4 | Aproximação final | Comentários "I can't see it", "off course"; EGPWS "sink rate" antes do touchdown | Crew + EGPWS | AA1420-E4 (740-774) | HIGH |
| 5 | Touchdown | Touchdown sob windshear ativa | Aeronave + ambiente | AA1420-E5 (765-880) | HIGH |
| 6 | Rolagem | Flight spoilers não desplegaram simetricamente | Sistema autospoiler/crew | AA1420-E6 (790-806) | HIGH |
| 7 | Overrun | Aeronave saiu do fim da pista 4R, impactou estruturas ILS | Aeronave + ambiente | AA1420-E5/E6 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: linha de trovoadas convectivas em LIT; windshear ativa; pista 4R molhada; aeronave MD-82 com autospoiler system; EGPWS funcional; sistema de reversores e freios.
- **Human-observable actions**: aceitação da sugestão de expedição; discussão de crosswind limit sem verificação de manual; aceitação inicial de visual approach; aceitação de vetores para ILS após perda visual; ausência de comando de go-around frente a comentários "I can't see it"/"off course" e EGPWS sink rate; aplicação de procedimento pós-touchdown.
- **Human-inference cautions**: NÃO inferir falha de gerenciamento de fadiga como código SERA; NÃO inferir pressão de despachante como objetivo SERA fechado; o slice marca O-axis com evidência forte mas exige distinguir intenção operacional vs outcome meteorológico; A-axis tem sequência factual em torno de spoilers/freios/reversores mas exige separação entre seleção de ação e branch de implementação/capacidade do sistema.
- **What must not be inferred yet**: código P, O ou A; diferenciação PF/PM no escape point; contribuição relativa do autospoiler asymmetry (sistema) vs configuração pré-touchdown (humano).

## 16. Escape point context

A zona candidata abrange dois momentos sucessivos: (EP primário) segmento de aproximação final em que perda de referência visual + windshear avisado + comentários "I can't see it"/"off course" + EGPWS sink rate eram cues integrados que deveriam ter disparado arremetida coordenada antes do touchdown; (EP secundário) touchdown/rolagem, em que assimetria de spoilers e dinâmica de deceleração tornou-se crítica. Permanece candidato porque (a) escolha entre EP primário (decisão de arremetida) e EP secundário (recuperação pós-touchdown) muda framing P/O vs A, (b) há boundary entre dimensão humana (decisão de prosseguir) e dimensão técnica (autospoiler asymmetry) que requer separação autoral, e (c) o slice marca FULL_TRACE_POSSIBLE mas com cautela em O/A. Falta confirmar: timestamp/altitude exato do EGPWS sink rate, callouts esperados vs realizados em final, e diferenciação PF/PM. Risco de confundir outcome com ponto de fuga: o overrun é consequência; o escape point é antes, na decisão de pousar sob windshear ativa.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R115 ADEQUATE_FOR_TRACE_DRAFT, FULL_TRACE_POSSIBLE)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: priorização EP primário vs EP secundário; separação fina entre componente humano (decisão) e componente técnico (spoiler asymmetry); diferenciação PF/PM
- recommendedA4R181Handling: BATCH_A_NARRATIVE_SUFFICIENT — adjudicação autoral de escape point primário com possível desdobramento técnico para A-axis.
