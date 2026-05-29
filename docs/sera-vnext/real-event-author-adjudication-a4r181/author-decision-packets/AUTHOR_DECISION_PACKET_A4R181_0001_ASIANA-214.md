# Author Decision Packet — A4R181-ADJ-0001 — Asiana 214 SFO

Status: AUTHOR_DECISION_CANDIDATE
sourceExtractionId: A4R180-EXTRACTION-0001
eventKey: Asiana 214 SFO (Boeing 777-200ER, aproximação visual RWY 28L, 2013)
batch: BATCH_A
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Resumo curto do evento

Asiana 214 executou aproximação visual à RWY 28L de San Francisco com o glideslope do ILS inoperante. Seleções de modo/manete levaram o autothrottle a um estado HOLD sem controle automático ativo de velocidade. A tripulação não consolidou a percepção dessa transição enquanto velocidade e perfil vertical divergiam. Cues de aproximação instável estavam presentes antes do gate de estabilização; a arremetida foi comandada tarde, abaixo da margem efetiva de recuperação.

## 2. O que aconteceu (narrativa suficiente)

Vôo internacional de passageiros (Seul → SFO) em condições visuais diurnas. Tripulação composta de captain-instrutor, captain-em-treinamento (PF) e relief crew. A combinação operacional: wide-body em aproximação visual à 28L com glideslope OTS por NOTAM. No segmento final, seleção de modo no MCP e movimentação do thrust lever produziram transição para A/T HOLD — modo sem controle automático ativo de velocidade, embora o FMA continuasse exibindo estados que exigiam interpretação. PF, PM e observador não consolidaram a percepção dessa mudança enquanto a velocidade decaía e o perfil divergia abaixo do glidepath indicado pelo PAPI. Antes do gate de aproximação estabilizada (500/1.000 ft AFE conforme política), PAPI baixo, razão de descida elevada e velocidade abaixo da bug já sinalizavam perfil instável, sem decisão coordenada de arremetida. Abaixo de 200 ft AFE houve reconhecimento explícito tardio; o go-around foi comandado com margem já reduzida. O impacto contra o seawall é consequência factual, não usado como prova SERA.

## 3. Ponto de fuga candidato

Zona: o gate de aproximação estabilizada (tipicamente 500 ft AFE para visual, podendo recuar a 1.000 ft), no qual cues integrados (PAPI baixo + velocidade decaindo + razão de descida elevada + estado A/T HOLD) já indicavam que os critérios de estabilidade não estavam atendidos e a arremetida permanecia executável com margem nominal. Formulado como zona com SOURCE_PARTIAL declarado pelo slice, não como momento discreto.

## 4. Ator direto candidato

Tripulação de voo como bloco integrado (PF/PM/observador) para o gate de aproximação. Há potencial multi-actor (diferenciação PF vs PM vs observador na lacuna de mode awareness), mas o slice trata o bloco de forma integrada. Caso o autor opte por multi-actor, manter um escapePointId único com actorContributionId distintos.

## 5. Fatos que sustentam

- Glideslope ILS RWY 28L inoperante por NOTAM (fato técnico/ambiental).
- Transição para A/T HOLD após seleções de modo/thrust (ASIANA-SRC-EV-001/002).
- PAPI baixo + velocidade abaixo da bug + razão de descida elevada antes do gate (ASIANA-SRC-EV-001).
- Reconhecimento explícito tardio abaixo de 200 ft e go-around com margem reduzida (ASIANA-SRC-EV-003).

## 6. Fatos contra / limitações

- O slice marca a clareza do escape point como PARTIAL: o instante discreto que deveria ter disparado a decisão não está isolado em uma única evidência ancorada.
- A definição exata do gate (altitude/parâmetro discreto) varia entre seções do relatório.
- Boundary entre P (não-consciência do estado A/T HOLD) e A (ausência de go-around) não está resolvido.
- A diferenciação de papel PF/PM/observador não está detalhada no slice.

## 7. Alternativas relevantes

- Tratar o escape point como momento discreto (ex.: cruzamento de 500 ft com critérios não atendidos) em vez de zona — exigiria timestamp/altitude que o slice não isola.
- Tratar como single-actor (bloco de tripulação) vs multi-actor (PF/PM/observador) — decisão de framing autoral.

## 8. Risco de overclassification

Médio. O fato de a aproximação ter prosseguido instável pode tentar a importar a probable cause NTSB (mode confusion, automation reliance) como código SERA. Deve-se evitar: o slice é factual-first e não fecha intenção. Não usar o outcome (impacto) como prova de eixo.

## 9. Consequência se aprovado

O caso entra como adjudication candidate com escape point definido como zona (gate de estabilização) e modelo de ator a confirmar (bloco vs multi-actor). A decisão é registrada em A4R182 como draft autoral com lock NOT_FINAL_P_O_A. Nenhum código é fechado.

## 10. Consequência se rejeitado

O caso retorna para refinamento: isolar instante discreto do gate, decidir framing de ator, ou solicitar verificação adicional do slice. Permanece READY mas sem decisão registrada.

## 11. Pergunta simples de decisão autoral

O escopo de ponto de fuga (gate de aproximação estabilizada como zona) e o modelo de ator (bloco de tripulação, com possível desdobramento multi-actor) são defensáveis para esta adjudicação?

Resposta esperada:
- APROVO
- NÃO APROVO
- PRECISO REVISAR

## 12. Observação

Esta decisão não cria código liberado, fixture oficial ou baseline. É um draft autoral com lock NOT_FINAL_P_O_A, a ser registrado em A4R182.
