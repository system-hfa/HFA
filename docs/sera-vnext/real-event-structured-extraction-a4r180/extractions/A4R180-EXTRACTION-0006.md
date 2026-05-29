# A4R180 Structured Extraction — A4R179-SEL-0006 — SOURCE-SLICE-UPS-1354-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0006
- inventoryId: A4R178-INV-0077
- probableEventKey: SOURCE-SLICE-UPS-1354-A4R115
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-UPS-1354-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB documenta crash de UPS 1354 (Airbus A300-600F) durante aproximação noturna não-precisão em Birmingham (BHM). Aeronave foi escalada para chegar quando RWY 06/24 estava fechada, deixando RWY 18 (não-precisão). Crew briefou aproximação localizer RWY 18 com guidance vertical FMC. Pernas direct-to e descontinuidade FMC permaneceram, tornando glidepath gerado inutilizável. Autopilot não engajou em modo profile; captain selecionou modo vertical speed sem briefar FO. Aeronave desceu a 1.500 fpm através de gates de aproximação estabilizada e altitude mínima sem callouts ou level-off. EGPWS gerou "sink rate" caution antes do impacto. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Chegada planejada | RWY 06/24 fechada; RWY 18 (não-precisão) opção; condições de teto baixo não discutidas | UPS-E1 (linhas 492-498) | MEDIUM |
| Briefing | Crew briefou profile approach usando FMC vertical guidance até DA | UPS-E2 (linhas 503-511) | HIGH |
| Setup FMC | Descontinuidade FMC tornou glidepath gerado sem sentido; nenhum piloto reconheceu | UPS-E3 (linhas 515-541) | HIGH |
| Mode change | Captain mudou para vertical speed mode sem briefar FO | UPS-E4 (linhas 542-554) | HIGH |
| Aproximação final | Callout 1000 ft ocorreu, razão de descida 1.500 fpm, gate de estabilizada exigia go-around, callouts MDA não ocorreram, descida não interrompida | UPS-E5 (linhas 557-565) | HIGH |
| Pré-impacto | EGPWS "sink rate" caution próximo de 1.000 ft msl/~250 ft AGL | UPS-E6 (linhas 568-574) | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aproximação prosseguindo abaixo de 1.000 ft AFE com razão de descida > 1.000 fpm, sem atendimento aos critérios de aproximação estabilizada e sem arremetida
- evidence: Slice cita texto do relatório indicando que esta condição teria requerido go-around; razão 1.500 fpm sustentada
- confidence: HIGH
- uncertainty: Boundary entre cue de não-reconhecimento (P) e ausência de ação de go-around (A) é zona

## 5. Possible escape point candidate
- possibleEscapePoint: Momento abaixo de 1.000 ft AFE com razão de descida > 1.000 fpm e critérios estabilizados não atendidos
- whyPotential: Slice identifica este como EP primário com texto do relatório explicitamente declarando que go-around era requerido. EP secundário em MDA com callouts ausentes e ausência de level-off
- sourceAnchor: SOURCE-SLICE-UPS-1354-A4R115 seção "4. Escape point candidate"
- confidence: PARTIAL (slice marca clareza como PARTIAL)
- limitations: O e A devem separar continuação operacional, seleção de modo, monitoramento e omissões de callouts

## 6. Direct actor candidate
- directActorCandidate: Crew como bloco (PF/PM) com captain tendo mudado modo sem briefing
- role: Operação de aproximação não-precisão com guidance FMC degradada
- evidence: Slice indica captain mudou modo sem briefar FO; nenhum piloto reconheceu glidepath inválido
- confidence: PARTIAL
- uncertainty: Diferenciação entre captain (mode selection) e FO (monitoring/callouts) requer adjudicação

## 7. Actor contribution candidates
- notApplicableReason: Slice trata escape point como evento de crew integrada; multi-ator potencial (captain como mode-changer + FO como monitor) existe mas não é tratado como multi-actor formal no slice. Tratamento como single escape point é apropriado.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| UPS1354-A4R180-F1 | UPS-E3 | Descontinuidade FMC tornou glidepath sem sentido; nenhum piloto reconheceu | Suporta P (info disponível mas não integrada) | Boundary entre sistema e crew |
| UPS1354-A4R180-F2 | UPS-E4 | Captain mudou para vertical speed sem briefar FO | Suporta A-axis (mode change sem coordenação) | Não é conclusão final |
| UPS1354-A4R180-F3 | UPS-E5 | 1.000 ft callout, 1.500 fpm descida, gate estabilizado violado, descida não interrompida | Suporta estado inseguro e omissão de ação | Fato pode suportar múltiplos axes; trace deve evitar double-count |
| UPS1354-A4R180-F4 | UPS-E6 | EGPWS sink rate caution ~250 ft AGL | Cue final disponível | Resposta requer análise separada |

## 9. Information explicitly excluded
- probable cause e contributing factors excluídos
- findings e safety recommendations excluídas
- labels externos (fadiga, monitoring failure, procedural noncompliance) não importados como código SERA
- outcome (crash/fatalidades) não usado como prova SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- Slice suporta tentativa de full-axis draft, mas O e A devem separar continuação operacional, mode selection, monitoramento e callout omissions
- Algumas evidências podem suportar mais de um axis; trace deve evitar contar o mesmo fato como P, O e A sem racional distinta
- Boundary entre P (info disponível não integrada) e A (não-execução de go-around) é zona

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

UPS 1354 era um vôo cargueiro noturno Louisville (SDF) → Birmingham (BHM), operado em Airbus A300-600F em 14 ago 2013. A tripulação composta de captain e first officer chegou a BHM no que era seu último trecho do duty cycle. Em BHM, a pista 06/24 (principal) estava fechada por obras programadas, deixando como opção a pista 18 — significativamente mais curta e com apenas aproximação não-precisão (localizer com glidepath FMC-gerado), em condições noturnas com teto baixo.

Durante o briefing pré-aproximação, a tripulação configurou uma "profile approach" usando guidance vertical FMC para construir uma trajetória virtual de descida até a decision altitude. O setup da rota FMC continha uma direct-to leg e uma descontinuidade FMC remanescente — combinação que tornou o glidepath gerado tecnicamente inválido. O slice nota que nenhum piloto reconheceu que a guidance vertical FMC estava sem sentido naquela configuração.

Quando a aeronave entrou no segmento de aproximação, o autopilot não engajou em modo "profile" como esperado. O captain (PM em parte do vôo, PF em parte) selecionou modo "vertical speed" para forçar uma razão de descida — uma decisão que mudou a natureza do controle vertical de gerenciamento de perfil (automação) para gerenciamento de razão de descida (input manual). O captain fez essa mudança de modo sem briefar a first officer, tornando o monitoramento da PM degradado quanto à expectativa de modo ativo.

A aeronave desceu a ~1.500 fpm sustentado através do gate de aproximação estabilizada (1.000 ft AFE com critérios de descida e velocidade). O callout requerido de 1.000 ft ocorreu segundo procedure, mas o cumprimento dos critérios de estabilizada não foi avaliado/declarado, e a razão de 1.500 fpm violava o gate (typically <1.000 fpm para estabilizada). Os callouts de MDA não foram realizados; nenhum level-off ocorreu na MDA. O EGPWS emitiu "sink rate" caution próximo a 1.000 ft msl / ~250 ft AGL.

A aeronave continuou em descida e impactou terreno árboreo elevado antes do limiar da pista 18. Outcome registrado factualmente, NÃO usado como prova SERA. A operação caracterizou-se por: aproximação não-precisão em noite com teto baixo; setup FMC com glidepath inválido não reconhecido; mode change sem briefing entre PF e PM; e violação sustentada de critérios de aproximação estabilizada sem decisão de arremetida.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-aproximação | RWY 06/24 fechada; RWY 18 (não-precisão) opção; condições de teto baixo | Aeroporto + ATC | UPS-E1 (492-498) | MEDIUM |
| 2 | Briefing | Crew briefou profile approach com FMC vertical guidance até DA | Crew | UPS-E2 (503-511) | HIGH |
| 3 | Setup FMC | Descontinuidade FMC tornou glidepath inválido; nenhum piloto reconheceu | Sistema FMC + Crew | UPS-E3 (515-541) | HIGH |
| 4 | Mode change | Captain mudou para vertical speed sem briefar FO | Captain (PF/PM) + automação | UPS-E4 (542-554) | HIGH |
| 5 | Gate 1.000 ft | Callout 1.000 ft ocorreu; descida sustentada a 1.500 fpm; gate de estabilizada não atendido | Sistema callout + Crew | UPS-E5 (557-565) | HIGH |
| 6 | MDA | Callouts MDA não realizados; sem level-off | Crew | UPS-E5 | HIGH |
| 7 | EGPWS warning | EGPWS "sink rate" caution ~250 ft AGL | Sistema EGPWS | UPS-E6 (568-574) | HIGH |
| 8 | Impacto | Aeronave impactou terreno árboreo antes do limiar da RWY 18 | Aeronave + ambiente | UPS-E5/E6 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: RWY 06/24 fechada; RWY 18 com aproximação não-precisão; FMC com discontinuity gerando glidepath inválido; autopilot com modos profile / vertical speed disponíveis; EGPWS funcional; aeronave A300-600F.
- **Human-observable actions**: setup FMC com discontinuity remanescente; ausência de reconhecimento explícito do glidepath inválido por qualquer piloto; mode change para vertical speed sem briefing; razão de descida sustentada a 1.500 fpm; ausência de callouts MDA; ausência de level-off na MDA; ausência de comando de go-around frente a gate de estabilizada violado e EGPWS sink rate.
- **Human-inference cautions**: NÃO inferir fadiga como código SERA; o slice marca clareza de escape point como PARTIAL e indica que O e A devem separar continuação operacional, mode selection, monitoring e callout omissions; múltiplas axes podem ser suportadas pelo mesmo fato — trace deve evitar double-count.
- **What must not be inferred yet**: priorização entre EP no gate de 1.000 ft vs MDA vs EGPWS warning; código P, O ou A; categorização do mode change como falha de seleção vs falha de coordenação.

## 16. Escape point context

A zona candidata é o gate de aproximação estabilizada em 1.000 ft AFE em que critérios de razão de descida (≤1.000 fpm), velocidade, configuração e perfil deveriam ser atendidos; o slice cita texto do relatório indicando que esta condição (descida sustentada a 1.500 fpm, configuração + critérios não atendidos) teria explicitamente requerido go-around. Um EP secundário é a MDA, em que callouts e level-off foram ausentes. Permanece candidato porque (a) escolha entre EP no gate de 1.000 ft (decisão de continuar com razão de descida inadequada) e EP na MDA (omissão de level-off) muda o framing, (b) há sobreposição com EP no mode change (decisão sem briefing) que cria boundary multi-actor implícito, e (c) o slice marca PARTIAL. Falta confirmar: priorização entre os três EPs, e decisão sobre tratamento como single-actor (captain como mode-changer) vs multi-actor (captain + FO como monitor). Risco de confundir outcome com ponto de fuga: o impacto contra terreno é consequência; o escape point é no gate de 1.000 ft AFE com razão de descida sustentada.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R115 ADEQUATE_FOR_TRACE_DRAFT, FULL_TRACE_POSSIBLE)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: priorização entre EP 1.000 ft / MDA / EGPWS; decisão sobre framing multi-actor (captain mode change + FO monitoring) ou single-actor
- recommendedA4R181Handling: BATCH_A_NARRATIVE_SUFFICIENT — adjudicação autoral com possível desdobramento multi-actor.
