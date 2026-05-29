# A4R180 Structured Extraction — A4R179-SEL-0013 — TSB-CANADA-BELL-206B (A13W0070)

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0013
- inventoryId: A4R178-INV-0347
- probableEventKey: TSB-CANADA-A13W0070 (Bell 206B C-FZWB, Wood Buffalo Helicopters, Fort McMurray)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool/NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Multi-actor candidates
- selectionStatus: SELECT_AS_MULTI_ACTOR
- sourceAccessStatus: ACCESSED_VIA_TXT_COMPANION (a4r111-recovered-pool-txt/NEW50-24__...txt — Summary e History of Flight lidos)
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
TSB A13W0070 documenta perda de eficácia do rotor de cauda (Loss of Tail Rotor Effectiveness — LTE) e colisão com terreno de Bell 206B C-FZWB (Aurora Helicopters / Wood Buffalo Helicopters), 29 mai 2013, 75 nm N de Fort McMurray. Voo contratado por Alberta Sustainable Resource Development (ASRD) para rastrear colares de rádio descartados de caribu. Dois biólogos a bordo, externamente acoplados a antena/receptor portátil. Decolagem 0928 MDT; chegada a área 1 às 1010 (até 100 ft AGL); progressão para área 2 às 1048. Em 1055, helicóptero orbitou área e executou curva ampla esquerda a 140 ft AGL. Em 1056:14: rumo leste a 120 ft AGL/36 kt GS. 1056:24: 105 ft AGL/27 kt GS. Vento componente predominantemente crosswind esquerda do norte ~5 kt. 1056:34: 115 ft AGL/16 kt GS; curva direita iniciada para sul (GS reduzida para 5 kt). Último GPS waypoint 1056:54: 18 ft AGL/3 kt GS. Após curva sul, helicóptero exposto a tail-wind. Entrou em rotação não-comandada para direita; sem indicações de malfunção mecânica antes ou durante a rotação. Desceu em stand de árvores de poplar 60-70 ft; descansou no lado direito. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| 0928 MDT | Decolagem de Wood Buffalo Helicopters / Fort McMurray Airport | TXT linhas ~70-85 | HIGH |
| 1010 | Área 1, orbitas com altitude até 100 ft AGL | TXT linhas ~95-100 | HIGH |
| 1048 | Chegada à área 2 | TXT linhas ~105-110 | HIGH |
| 1055 | Curva ampla esquerda a 140 ft AGL | TXT linhas ~110-115 | HIGH |
| 1056:14 | Rumo leste, 120 ft AGL, 36 kt GS | TXT linhas ~115-120 | HIGH |
| 1056:24 | 105 ft AGL, 27 kt GS; vento crosswind esquerda ~5 kt | TXT linhas ~115-125 | HIGH |
| 1056:34 | Curva direita para sul iniciada; 115 ft AGL, 16 kt GS | TXT linhas ~125-130 | HIGH |
| 1056:54 | Último GPS: 18 ft AGL, 3 kt GS; helicóptero exposto a tail-wind após curva | TXT linhas ~125-135 | HIGH |
| Impacto | Rotação não-comandada para direita; descida em árvores | TXT linhas ~125-140 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Configuração de voo em low-airspeed/low-altitude com curva para tail-wind, criando condições conhecidas para Loss of Tail Rotor Effectiveness (LTE) sem manter margem de potência/velocidade adequada
- evidence: Sequência decrescente de GS (36→27→16→5→3 kt) com altitude variando 120→105→115→18 ft AGL; transição de crosswind para tail-wind após curva; rotação não-comandada direita
- confidence: HIGH (FDR/GPS data factuais)
- uncertainty: Boundary entre cue de wind/altitude/airspeed (P) e seleção de manobra de curva (A) é zona; tema técnico LTE pode ser tratado como capacidade aerodinâmica, não falha humana isolada

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre 1056:14 (rumo leste estável) e 1056:34 (início de curva direita para sul), em que reconhecimento de tail-wind potencial + low GS deveria ter motivado abort de manobra ou aumento de power/altitude
- whyPotential: Sequência GPS oferece momento discreto observável de degradação progressiva; janela de ~20 s entre cue de baixa GS e início de curva que expôs helicóptero a tail-wind
- sourceAnchor: TXT linhas ~115-135 (GPS waypoints 1056:14 a 1056:54)
- confidence: PARTIAL
- limitations: Tema técnico (LTE) requer separação cuidadosa entre fenômeno aerodinâmico (capacidade) e seleção/execução de manobra (A); piloto único faleceu, não há cockpit comm para anchor de perception

## 6. Direct actor candidate
- directActorCandidate: Pilot (assento direito dianteiro, posição tradicional)
- role: Single-pilot helicóptero
- evidence: TXT explicita "pilot was occupying the right front seat, which is the traditional pilot position in helicopters"
- confidence: HIGH
- uncertainty: Operação single-pilot; passageiros (biólogos) não eram operacionais; multi-actor framing requer reavaliação

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (Pilot + ASRD operational context que pediu landing site identification a baixa altitude)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| TSB-A13W0070-A4R180-ACTOR-PILOT | Single-pilot | Execução de manobra de curva em low GS/low altitude que expôs aeronave a tail-wind e LTE | TXT linhas ~125-140 | MEDIUM | Boundary entre execução e fenômeno aerodinâmico |
| TSB-A13W0070-A4R180-ACTOR-ASRD-OPS | Charter/ASRD operations | Demanda operacional de identificação de landing site em baixa altitude para retrieval de colares | TXT linhas ~70-110 | LOW | Contextual; não direct |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| TSB-A13W0070-A4R180-F1 | TXT linhas ~70-100 | Voo charter ASRD para tracking de colares de caribu; biólogos a bordo | Contexto operacional | Não é classificação |
| TSB-A13W0070-A4R180-F2 | TXT linhas ~115-130 | Sequência GPS decrescente de GS em low altitude | Suporta cue progressivo de envelope marginal | Boundary técnico |
| TSB-A13W0070-A4R180-F3 | TXT linhas ~125-135 | Curva direita para sul expondo helicóptero a tail-wind | Suporta seleção de manobra | Boundary entre A e capacidade aerodinâmica |
| TSB-A13W0070-A4R180-F4 | TXT linhas ~125-145 | Rotação não-comandada direita; nenhuma indicação de malfunção mecânica | Confirma LTE como tema técnico (não falha mecânica) | Não substitui análise causal |

## 9. Information explicitly excluded
- Probable cause/findings as to causes/contributing factors quarentenados
- Findings as to risk excluídos
- Safety recommendations excluídas
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- outcome (2 fatalidades, 1 lesão séria) não usado como prova SERA
- conclusões de análise TSB sobre LTE/training não importadas como código SERA

## 10. Uncertainty notes
- Lane A4R179 selecionou como multi-actor, mas natureza single-pilot torna multi-actor framing menos óbvio; reavaliar em A4R181
- Tema técnico LTE pode confundir A-axis: fenômeno aerodinâmico é capacidade da aeronave, mas seleção de manobra é ação humana
- Sem CVR/cockpit recording de aeronave single-pilot, anchor de perception é limitado a inferência de cue de cockpit

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION (rever multi-actor framing — pode ser melhor tratado como boundary técnico/single-pilot)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

TSB A13W0070 documenta perda de eficácia de rotor de cauda (Loss of Tail Rotor Effectiveness — LTE) e colisão subsequente com terreno de um Bell 206B (C-FZWB) da Wood Buffalo Helicopters (operando para Aurora Helicopters Ltd.) em 29 mai 2013, ~75 nm N de Fort McMurray, Alberta. A operação era charter para Alberta Sustainable Resource Development (ASRD) para tracking de colares de rádio descartados de caribu (wildlife survey). A bordo: piloto único + dois biólogos. Equipamento incluía antena externa acoplada a receptor portátil para rastreamento de colares.

Decolagem da Wood Buffalo Helicopters/Fort McMurray Airport às 0928 MDT. Check call inicial à ASRD command centre às 0915. Posição call obrigatória a cada 30 min. Em 1010, helicóptero alcançou área 1, onde executou orbits para fix de localização de colar; voou tão baixo quanto 100 ft AGL mas não pousou nessa área. Em 1032, posição call indicou operações normais e progressão para área 2. Em 1048, chegada à área 2, com 8 min de orbits subsequentes para fixar localização e avaliar zona de pouso.

Em 1055, helicóptero orbitou área e executou curva ampla esquerda a 140 ft AGL. A sequência crítica seguinte foi capturada por GPS:
- 1056:14 — rumo leste, 120 ft AGL, 36 kt GS
- 1056:24 — 105 ft AGL, 27 kt GS; vento crosswind esquerda do norte ~5 kt
- 1056:34 — curva direita para sul iniciada; 115 ft AGL, 16 kt GS
- 1056:54 — último GPS waypoint: 18 ft AGL, 3 kt GS

Após completar a curva para sul, o helicóptero ficou exposto a uma tail-wind condition (vento de cauda) com baixa velocidade indicada — combinação aerodinâmica que é fator clássico para LTE em helicópteros de rotor único. O helicóptero entrou em rotação não-comandada para a direita (sentido oposto ao rotor de cauda). Não houve indicações de malfunção mecânica antes ou durante a rotação — todos os componentes verificados pelo investigation mostraram continuity. O helicóptero desceu em stand de árvores poplar 60-70 ft, descansou no lado direito.

Outcome registrado factualmente: piloto e passageiro no assento traseiro direito faleceram; passageiro no assento dianteiro esquerdo sobreviveu com lesões sérias. Tema técnico LTE é fenômeno aerodinâmico (capability boundary) — separação fina entre fenômeno técnico e seleção/execução de manobra é boundary central nesta extração.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | 0928 MDT | Decolagem Wood Buffalo / Fort McMurray | Pilot | TXT linhas ~70-85 | HIGH |
| 2 | 1010 | Área 1, orbits até 100 ft AGL | Pilot | TXT linhas ~95-100 | HIGH |
| 3 | 1048 | Chegada área 2 | Pilot | TXT linhas ~105-110 | HIGH |
| 4 | 1055 | Curva ampla esquerda a 140 ft AGL | Pilot | TXT linhas ~110-115 | HIGH |
| 5 | 1056:14 | Rumo leste, 120 ft AGL, 36 kt GS | Pilot + sistema GPS | TXT linhas ~115-120 | HIGH |
| 6 | 1056:24 | 105 ft AGL, 27 kt GS; vento crosswind ~5 kt esquerda do norte | Pilot + sistema | TXT linhas ~120-125 | HIGH |
| 7 | 1056:34 | Curva direita para sul iniciada; 115 ft AGL, 16 kt GS | Pilot + sistema | TXT linhas ~125-130 | HIGH |
| 8 | 1056:54 | Último GPS: 18 ft AGL, 3 kt GS; helicóptero exposto a tail-wind após curva | Pilot + ambiente | TXT linhas ~125-135 | HIGH |
| 9 | Pós-curva | Rotação não-comandada para direita (LTE); sem malfunção mecânica | Aeronave + ambiente aerodinâmico | TXT linhas ~125-145 | HIGH |
| 10 | Impacto | Descida em stand de árvores poplar 60-70 ft | Aeronave + terreno | TXT linhas ~125-145 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: Bell 206B (single rotor); vento crosswind/tail-wind variando conforme orientação; envelope LTE conhecido para helicópteros de rotor único em low airspeed + tail-wind + descending power conditions; sistema GPS funcional; sem malfunção mecânica documentada.
- **Human-observable actions**: execução de curva direita para sul a low GS (16→5→3 kt) e baixa altitude (115→18 ft AGL); não-execução de aumento de potência/abort de manobra após vento tail e GS decrescente; possível foco operacional em landing site assessment a custo de envelope monitoring.
- **Human-inference cautions**: NÃO inferir falha de treinamento LTE como código SERA; LTE é fenômeno aerodinâmico (capability) que ocorre quando combinação de fatores ambientais + manobra excede envelope — separação entre seleção de manobra (A-axis) e capability/envelope da aeronave é crítica; lane A4R179 multi-actor framing é menos óbvio para single-pilot — reframe sugerido.
- **What must not be inferred yet**: código P, O ou A; categorização da curva como erro de seleção vs erro de execução; tratamento de envelope LTE como contribuição.

## 16. Escape point context

A zona candidata é a janela ~20 s entre 1056:14 (rumo leste estável, 36 kt GS) e 1056:34 (início de curva direita para sul), em que reconhecimento de tail-wind potencial + GS decrescente + altitude baixa deveria ter motivado abort da manobra ou aumento de potência/altitude antes de exposição completa a tail-wind. EP alternativo: momento de início da curva (1056:34) em que decisão de prosseguir foi tomada com cues já degradados. Permanece candidato porque (a) tema técnico LTE requer separação cuidadosa entre fenômeno aerodinâmico (capability) e seleção/execução de manobra (A-axis), (b) sem CVR/cockpit recording de aeronave single-pilot, anchor de perception é limitado a inferência de cue de cockpit, e (c) lane A4R179 multi-actor framing requer reavaliação. Falta confirmar: framing multi-actor (single-pilot vs ASRD operational context); priorização EP; tratamento de LTE como boundary técnico. Risco de confundir outcome com ponto de fuga: o crash em árvores é consequência; o escape point é a janela pré-curva ou início da curva.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT (GPS data sustenta timeline detalhado)
- sourceCompleteness: HIGH (TSB report completo disponível; GPS data factual)
- extractionConfidence: MEDIUM
- missingForA4R181: framing multi-actor vs single-pilot; tratamento LTE como capability boundary
- recommendedA4R181Handling: BATCH_B_BOUNDARY + REFRAME_MULTI_ACTOR_TO_SINGLE_PILOT_TECHNICAL_BOUNDARY — adjudicação autoral com reframe; tratar LTE como capability/envelope.
