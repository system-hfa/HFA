# A4R180 Structured Extraction — A4R179-SEL-0010 — AERONAUTICA-CIVIL-COLOMBIA-BOEING-757-223

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0010
- inventoryId: A4R178-INV-0231
- probableEventKey: AERONAUTICA-CIVIL-COLOMBIA-BOEING-757-223 (American 965 Cali CFIT)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/24__1996__Aeronautica-Civil-Colombia__Boeing-757-223__Controlled-Flight-Into-Terrain-American-Air.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Negative control candidates
- selectionStatus: SELECT_AS_NEGATIVE_CONTROL
- sourceAccessStatus: ACCESSED_VIA_TXT_COMPANION (a4r111-full-pool-txt/24__...txt)
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
Aeronáutica Civil da Colômbia documenta CFIT de American Airlines 965 (Boeing 757-223) em 20 dez 1995 perto de Cali, Colombia. Voo MIA-Cali atrasou ~34 min por conexões e 1h21 por congestionamento de gate. Em descida, ATC ofereceu aproximação VOR DME pista 19 (vento calmo). Crew solicitou direto para Rozo, e iniciou descida com reset frequente do FMS. Após passar ULQ, aeronave começou a virar para esquerda e seguiu rumo leste por ~1 min, depois virou para direita. Captain comentou problemas em recuperar "Tulua" no FMS. GPWS soou "terrain, terrain, whoop, whoop". Captain comandou pull-up, mas speedbrakes estendidos durante a descida não foram retraídos. Aeronave entrou em stick shaker e impactou árvores no leste de El Deluvio em ~8.900 ft msl. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| 2103-2110 | Cleared para FL370 → FL240 → FL200; weather Cali clear; descent clearance solicitada | TXT linhas 150-200 | HIGH |
| 2136:31 | ATC ofereceu RWY 19 com vento calmo; captain aceitou pedindo "lower altitude right away" | TXT linhas ~150-200 | HIGH |
| 2137:29 | Crew solicitou direto para Rozo + Rozo 1 arrival; ATC affirmativo | TXT linhas ~150-200 | HIGH |
| 2137+ | Após ULQ, aeronave virou esquerda e voou rumo leste ~1 min, depois direita | TXT linhas ~200-220 | HIGH |
| 2140:40 | Captain: "Tulua I'm not getting for some reason"; tentativa de inserir Rozo | TXT linhas ~220-240 | HIGH |
| 2141:15 | GPWS "terrain, terrain, whoop, whoop"; captain "pull up baby"; speedbrakes NÃO retraídos | TXT linhas ~240-260 | HIGH |
| 2141:28 | Stick shaker entrou/saiu/reentrou; impacto contra árvores em ~8.900 ft msl no flanco leste de El Deluvio | TXT linhas ~260-280 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aceitação de mudança tardia de aproximação (direct Rozo + RWY 19) sem replanejamento completo do perfil de descida, com FMS sendo reprogramado em descida ativa em terreno montanhoso, e speedbrakes mantidos durante manobra de escape GPWS
- evidence: Aceitação de direct Rozo a 37 DME/10.000 ft; reset FMS em descida; speedbrakes não retraídos durante escape
- confidence: HIGH (factualmente confirmado pelo CVR/FDR)
- uncertainty: Boundary entre cue de awareness de terreno (P), continuação de aproximação modificada (O) e omissão de speedbrakes retract (A) é zona

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre solicitação de direct Rozo (2137:29) e divergência observada (2137+ virada para leste), antes do FMS confusion e da ativação do GPWS
- whyPotential: Este foi o momento em que mudança de plano + descida + terreno montanhoso + reset FMS criaram acúmulo de risco sem replanejamento; mudança de aproximação durante descida ativa abaixo de MSA era um cue critical
- sourceAnchor: TXT linhas ~150-260 — sequência factual completa
- confidence: PARTIAL
- limitations: Slice de A4R180 não tem fonte prévia processada (não há SOURCE-SLICE-AMERICAN-965-A4R-XXX); extração feita a partir do TXT primário. Tracker A4R129 marcou AMERICAN-965 como ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED com SOURCE_ENRICHMENT recommended

## 6. Direct actor candidate
- directActorCandidate: Captain (PIC/PM nesse vôo; FO estava nos controles)
- role: Captain fazendo comunicações de rádio e gerenciando FMS; FO PF
- evidence: TXT explicita "the captain made the radio communications and the first officer was at the controls"; captain inseriu "direct Cali" no FMS; captain comandou pull-up
- confidence: HIGH (papéis explícitos no relatório)
- uncertainty: Diferenciação entre captain (FMS/decisão) e FO (controle manual) é clara; potencial multi-actor com ATC (que omitiu confirmação de heading/curso ao oferecer Rozo direto)

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (Captain + FO; possível contribuição de ATC como contexto)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| AMERICAN-965-A4R180-ACTOR-CAPTAIN-PM | Captain/PM/FMS | Aceitação de mudança de aproximação tardia; tentativas repetidas de programar FMS em descida; speedbrakes não retraídos durante escape | TXT linhas ~150-260 | MEDIUM | Slice não processada previamente; requer adjudicação |
| AMERICAN-965-A4R180-ACTOR-FO-PF | First Officer/PF | Controles manuais durante descida e virada para esquerda inadvertida | TXT linhas ~200-220 | MEDIUM | Boundary entre execução e seguir-FMS |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| AMERICAN-965-A4R180-F1 | TXT 2136:31 | ATC ofereceu RWY 19; captain pediu "lower altitude right away" | Contexto de mudança tardia | Não é conclusão SERA |
| AMERICAN-965-A4R180-F2 | TXT 2137:29 | Solicitação de direct Rozo a 37 DME/10.000 ft | Cue critical de mudança em descida ativa | Boundary |
| AMERICAN-965-A4R180-F3 | TXT 2140:40 | "Tulua I'm not getting for some reason"; FMS struggles | Suporta P (info ambígua) e A (carga cognitiva) | Não substitui análise causal |
| AMERICAN-965-A4R180-F4 | TXT 2141:15 | GPWS terrain warning; pull-up sem retração de speedbrakes | Suporta cue final + A-axis omissão | Não é conclusão final |

## 9. Information explicitly excluded
- Probable cause, contributing factors, findings, recommendations da seção 3 do relatório quarentenados
- Análises da seção 2 (Decision to Accept Runway, Situational Awareness, Awareness of Terrain, Automation, CRM) não importadas como SERA keys
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- outcome (CFIT/fatalidades) não usado como prova SERA
- Discussões de oversight da FAA e do operador não importadas

## 10. Uncertainty notes
- Este evento foi selecionado em lane "Negative control candidates" — significa que pode servir como controle de referência onde axis específicas podem ser nominais apesar de outcome severo; tratamento como negative control vs positive failure case requer decisão autoral
- Tracker A4R129 marcou AMERICAN-965 como UNRESOLVED com SOURCE_ENRICHMENT — esta extração contribui com base factual, mas adjudicação final fica para A4R181
- Diferenciação multi-actor (captain FMS vs FO controles) é importante para A-axis

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION (negative control framing + multi-actor potential)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

American Airlines 965 era um vôo internacional Miami (MIA) → Cali, Colombia (SKCL), operado em Boeing 757-223 em 20 dez 1995. A tripulação composta de captain (PIC fazendo radio communications) e first officer (controlando manualmente o aircraft); operação noturna sobre terreno montanhoso colombiano. **NOTA IMPORTANTE**: este candidato foi selecionado em A4R179 sob lane "Negative control candidates" mas a evidência factual no TXT primário NÃO sustenta esse framing — é um caso de CFIT com múltiplas contribuições humanas observáveis. Esta extração é tratada como **BOUNDARY_OR_MULTI_ACTOR_REVIEW** com `negativeControlHandled=false`.

O vôo partiu MIA atrasado ~34 min por conexões e mais 1h21 por congestionamento de gate. Em cruise FL370, seguiu rota MIA → Cuba airspace → Jamaica airspace → Colombian airspace, sendo recleared por Barranquilla Center a navegar direto KILER → BUTAL e por Bogotá Center direto BUTAL → Tulua VOR (ULQ). Em 2126, requested descent clearance; recebeu FL240 → FL200. Em 2134, transferred to Cali Approach.

Em 2136:31, Cali Approach ofereceu a aproximação à RWY 19 (vento calmo); o captain aceitou pedindo "lower altitude right away". Em 2137:29, o crew solicitou direto para Rozo + Rozo One arrival, e ATC autorizou. Esta mudança tardia de aproximação — quando aeronave estava a 37 DME / FL100 sobre terreno montanhoso — criou cascata de eventos: a inserção de "Rozo" no FMS via direct-to selecionou um waypoint "R" (Romeo) em vez de Rozo (que tinha código "ROZO" mas era abreviado como "R" em algumas database), levando a aeronave a virar à esquerda para um heading de rumo leste por ~1 min após passar ULQ.

Em 2140:40, o captain verbalizou "that Tulua I'm not getting for some reason. see I can't get. OK now, no. Tulua's [expletive] up." A combinação de FMS struggles + descida ativa abaixo de MSA + terreno montanhoso criou cenário de alto risco. Durante toda essa sequência, os speedbrakes haviam sido estendidos para acelerar a descida e nunca foram retraídos. Em 2141:15, GPWS soou "terrain, terrain, whoop, whoop, pull up". O captain comandou "pull up baby" e a aeronave entrou em escape maneuver — mas os speedbrakes permaneceram estendidos, reduzindo a margem de climb. A aeronave entrou em stick shaker (stall warning) intermitente. Em 2141:28, CVR encerrou com impacto contra árvores em ~8.900 ft msl no flanco leste de El Deluvio.

A operação caracterizou-se por: aceitação de mudança de aproximação durante descida ativa sobre terreno montanhoso; ambiguidade de FMS database (R vs ROZO); ausência de retração de speedbrakes durante manobra de escape GPWS; e divisão de papéis (captain rádio/FMS + FO controles manuais) que pode ter degradado coordenação.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Cruise / descida inicial | FL370 → FL240 → FL200; weather Cali clear; ULQ as next fix | Crew + ATC | TXT linhas ~150-200 | HIGH |
| 2 | 2136:31 | ATC ofereceu RWY 19 (vento calmo); captain pediu "lower altitude right away" | Captain + ATC | TXT linhas ~200-210 | HIGH |
| 3 | 2137:29 | Crew solicitou direto Rozo + Rozo One arrival; ATC autorizou | Captain + ATC | TXT linhas ~200-215 | HIGH |
| 4 | 2137-2140 | Após ULQ, aeronave virou à esquerda (rumo leste) por ~1 min; depois virou direita | FO (PF) + FMS guidance | TXT linhas ~210-220 | HIGH |
| 5 | 2140:40 | Captain: "Tulua I'm not getting"; FMS struggles | Captain + FMS | TXT linhas ~220-235 | HIGH |
| 6 | 2141:15 | GPWS "terrain, terrain, whoop, whoop, pull up"; captain comandou pull-up | Crew + GPWS | TXT linhas ~235-255 | HIGH |
| 7 | 2141:15-28 | Aeronave em escape maneuver; speedbrakes permaneceram estendidos; stick shaker intermitente | Aeronave + Crew | TXT linhas ~240-260 | HIGH |
| 8 | 2141:28 | Impacto contra árvores ~8.900 ft msl flanco leste El Deluvio | Aeronave + ambiente | TXT linhas ~250-280 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: terreno montanhoso colombiano (MSA elevada); FMS database com R vs ROZO ambiguity; speedbrakes funcionando; GPWS funcional; stick shaker em envelope protection; condições visuais (weather clear).
- **Human-observable actions**: aceitação de RWY 19 + Rozo One arrival como mudança tardia em descida; pedido "lower altitude right away"; inserção de direct-to "R" no FMS (captain); ausência de cross-check da seleção de waypoint após divergência observada; ausência de retração de speedbrakes durante escape; comando pull-up tardio.
- **Human-inference cautions**: NÃO inferir oversight FAA ou treinamento como código SERA (análises do relatório em seções 2.8, 2.9 são quarantinadas); NÃO importar conclusões de "automation" como código SERA; NÃO tratar como negative control — outcome (CFIT) e cadeia humana observável não sustentam essa categorização; multi-actor (Captain FMS/decisão + FO controles + ATC oferecimento tardio + FMS database ambiguity) requer separação cuidadosa.
- **What must not be inferred yet**: priorização entre EP (aceitação Rozo direct), EP (inserção FMS sem cross-check), EP (não-retração de speedbrakes); código P, O ou A; contribuição relativa de cada actor.

## 16. Escape point context

A zona candidata abrange três momentos sucessivos com diferentes framings: (EP1) aceitação tardia de RWY 19 + Rozo One arrival em 2137:29 a 37 DME/FL100 sobre terreno montanhoso, sem replanejamento completo de descida; (EP2) inserção de direct-to "R" no FMS sem verificação de waypoint correto, durante descida ativa; (EP3) ausência de retração de speedbrakes durante manobra de escape GPWS em 2141:15-28, reduzindo margem de climb crítica. Permanece candidato porque (a) escolha entre EP1 (decisão estratégica), EP2 (FMS operation) e EP3 (manobra de escape) muda framing P vs O vs A, (b) há contribuição multi-actor (Captain rádio/FMS + FO controles + ATC tardio + FMS database ambiguity), e (c) tracker A4R129 marca AMERICAN-965 com SOURCE_ENRICHMENT recommended e ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED. Falta confirmar: priorização entre EP1/EP2/EP3; estrutura actorContributionId; tratamento de FMS database como contexto técnico ou contribuição. Risco de confundir outcome com ponto de fuga: o CFIT é consequência; o escape point é em EP1/EP2/EP3 — provavelmente EP3 como momento mais crítico de margem reduzida.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (TXT companion lido detalhadamente; relatório AeroNáutica Civil completo via TXT)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: priorização EP1/EP2/EP3; decisão sobre framing multi-actor estruturado; reframe formal de negative control para BOUNDARY_OR_MULTI_ACTOR
- recommendedA4R181Handling: BATCH_B_MULTI_ACTOR + RECLASSIFY_FROM_NEGATIVE_CONTROL — adjudicação autoral com possível desdobramento multi-actor; corrigir framing de A4R179 lane que selecionou como negative control. negativeControlHandled = false.
