# Author Decision Packet — A4R181-ADJ-0006 — UPS 1354 BHM

Status: AUTHOR_DECISION_CANDIDATE
sourceExtractionId: A4R180-EXTRACTION-0006
eventKey: UPS 1354 BHM (Airbus A300-600F, aproximação não-precisão noturna, 2013)
batch: BATCH_A
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Resumo curto do evento

UPS 1354 executou aproximação noturna não-precisão à pista 18 de Birmingham com a pista principal fechada. Uma descontinuidade FMC tornou o glidepath gerado inválido, sem que nenhum piloto reconhecesse. O captain selecionou vertical speed sem briefar a FO; a aeronave desceu sustentado a 1.500 fpm através do gate de aproximação estabilizada sem arremetida e impactou terreno antes do limiar.

## 2. O que aconteceu (narrativa suficiente)

Vôo cargueiro noturno SDF → BHM em Airbus A300-600F, 14 ago 2013, no último trecho do duty cycle. Em BHM, a pista 06/24 (principal) estava fechada por obras, deixando a pista 18 — mais curta e apenas com aproximação não-precisão (localizer + glidepath FMC-gerado), em noite com teto baixo. No briefing, a tripulação configurou uma "profile approach" usando guidance vertical FMC até a decision altitude. O setup da rota FMC continha uma direct-to leg e uma descontinuidade remanescente, o que tornou o glidepath tecnicamente inválido; nenhum piloto reconheceu isso. O autopilot não engajou em modo profile como esperado. O captain selecionou modo vertical speed para forçar uma razão de descida — sem briefar a first officer, degradando a expectativa de modo ativo do PM. A aeronave desceu a ~1.500 fpm sustentado através do gate de aproximação estabilizada (1.000 ft AFE). O callout de 1.000 ft ocorreu, mas os critérios de estabilizada não foram avaliados/declarados; os callouts de MDA não ocorreram e não houve level-off. O EGPWS emitiu "sink rate" próximo a ~250 ft AGL. A aeronave impactou terreno árboreo elevado antes do limiar da 18. O outcome é consequência factual, não usado como prova SERA.

## 3. Ponto de fuga candidato

Zona do gate de aproximação estabilizada em 1.000 ft AFE, em que critérios de razão de descida (≤1.000 fpm), velocidade, configuração e perfil deveriam ser atendidos; o slice cita texto do relatório indicando que a descida sustentada a 1.500 fpm com critérios não atendidos teria requerido go-around. EP secundário na MDA (callouts ausentes, sem level-off). Formulado como zona com SOURCE_PARTIAL; há sobreposição implícita com o mode change (decisão sem briefing), que cria boundary multi-actor.

## 4. Ator direto candidato

Tripulação como bloco (PF/PM), com o captain tendo mudado o modo sem briefing. Diferenciação entre captain (mode selection) e FO (monitoring/callouts) requer adjudicação. Potencial multi-actor: manter um escapePointId único com actorContributionId distintos, caso o autor opte por desdobrar.

## 5. Fatos que sustentam

- Descontinuidade FMC tornou o glidepath inválido sem reconhecimento de qualquer piloto (UPS1354-A4R180-F1).
- Captain mudou para vertical speed sem briefar a FO (UPS1354-A4R180-F2).
- Callout de 1.000 ft, descida sustentada a 1.500 fpm, gate de estabilizada violado, descida não interrompida (UPS1354-A4R180-F3).
- Callouts de MDA ausentes, sem level-off; EGPWS "sink rate" ~250 ft AGL (UPS1354-A4R180-F4).

## 6. Fatos contra / limitações

- O slice marca a clareza do escape point como PARTIAL.
- Há três momentos candidatos (gate de 1.000 ft / MDA / mode change) cuja priorização muda o framing.
- O mesmo fato pode suportar mais de um eixo — o trace deve evitar double-count entre P (info não integrada), O (continuação) e A (omissão de go-around).
- Decisão entre single-actor (captain mode-changer) e multi-actor (captain + FO monitor) não resolvida.

## 7. Alternativas relevantes

- Selecionar o gate de 1.000 ft AFE como momento de referência, dado que o relatório o declara explicitamente como requerendo go-around.
- Tratar o mode change sem briefing como contribuição de ator distinta dentro do mesmo escapePointId (desdobramento multi-actor).
- Tratar a MDA como EP secundário (omissão de level-off).

## 8. Risco de overclassification

Médio. O risco principal é importar labels NTSB (fadiga, monitoring failure, procedural noncompliance) como código SERA e contar o mesmo fato em P, O e A sem racional distinta. Deve-se manter factual: gate violado e descida sustentada, sem fechar intenção. Não usar o impacto como prova de eixo.

## 9. Consequência se aprovado

O caso entra como adjudication candidate com escape point como zona do gate de estabilização e modelo de ator a confirmar (bloco vs multi-actor com captain mode-changer + FO monitor). Registrado em A4R182 como draft com lock NOT_FINAL_P_O_A.

## 10. Consequência se rejeitado

Retorna para priorização entre os três momentos candidatos e decisão de framing de ator. Permanece READY sem decisão registrada.

## 11. Pergunta simples de decisão autoral

O escopo de ponto de fuga (gate de aproximação estabilizada em 1.000 ft AFE como zona) e o modelo de ator (bloco de tripulação, com possível desdobramento multi-actor entre captain mode-changer e FO monitor) são defensáveis para esta adjudicação?

Resposta esperada:
- APROVO
- NÃO APROVO
- PRECISO REVISAR

## 12. Observação

Esta decisão não cria código liberado, fixture oficial ou baseline. É um draft autoral com lock NOT_FINAL_P_O_A, a ser registrado em A4R182.
