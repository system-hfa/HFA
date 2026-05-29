# Author Decision Packet — A4R181-ADJ-0017 — United 173 PDX

Status: AUTHOR_DECISION_CANDIDATE
sourceExtractionId: A4R180-EXTRACTION-0017
eventKey: United 173 PDX (DC-8-61, fuel exhaustion após troubleshooting de gear, 1978)
batch: BATCH_A
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Resumo curto do evento

United 173 entrou em holding prolongado para troubleshooting de uma indicação anormal de trem de pouso. Enquanto o flight engineer verbalizava reduções progressivas de combustível, o foco do captain permaneceu no problema do trem e na preparação para pouso de emergência. A transição mental para "pousar imediatamente" não ocorreu a tempo; os motores apagaram por fuel exhaustion antes do pouso.

## 2. O que aconteceu (narrativa suficiente)

Vôo doméstico DEN → PDX em DC-8-61, 28 dez 1978, com captain, first officer e flight engineer. Por volta das 18:12 PST, na descida para Portland, ao baixar o trem a tripulação notou uma indicação anormal (right gear indicator anomaly), possível malfunção do uplock indicator. O captain solicitou holding ao ATC para troubleshooting e preparação de pouso de emergência. O holding estendeu-se por aproximadamente 1 hora: a tripulação executou checklists, coordenou com Portland Approach, discutiu opções e contactou maintenance via radio. O flight engineer monitorou e informou repetidamente reduções no fuel remaining. A janela crítica situa-se durante o holding, entre patamares ~5.000 lb e ~3.000 lb de combustível (DC-8-61 com final reserve de ~6.000 lb para 30 min). O FE verbalizou os updates; o captain manteve foco no troubleshooting/preparação; a transição de prioridade de "preparar emergência" para "pousar já, status do trem secundário" não ocorreu cedo o suficiente. Dois motores apagaram por fuel exhaustion na aproximação final, seguidos do terceiro e quarto; a aeronave impactou área residencial wooded ~6 nm SE de PDX antes do limiar. O outcome é consequência factual, não usado como prova SERA.

## 3. Ponto de fuga candidato

Zona durante o holding em que os fuel-state advisories e os cálculos de tempo restante indicavam transição imediata necessária de troubleshooting para execução de pouso. Possível anchor: o momento em que o combustível reduzido a níveis críticos (próximo ao final reserve) foi verbalizado pelo FE e o captain manteve foco no trem/preparação em vez de comandar pouso imediato. Formulado como zona com SOURCE_PARTIAL; o boundary entre attentional fixation (P) e adequacy de action selection (A) é zona, não momento.

## 4. Ator direto candidato

Tripulação como bloco coordenado, com o captain (PIC) detendo autoridade decisória, o FO como PF/PM e o FE como monitor de combustível/sistemas. Potencial multi-actor claro (Captain decisão + FO + FE fuel monitor); o slice trata o crew como bloco para o escape point, com possível desdobramento mantendo escapePointId único e actorContributionId distintos.

## 5. Fatos que sustentam

- CVR com fuel advisories repetidos e queries explícitas do crew sobre fuel restante (UNITED-173-A4R180-F1).
- Atenção do crew acoplada ao troubleshooting de trem enquanto o low-fuel risk escalava (UNITED-173-A4R180-F2).
- Objetivo de troubleshooting/preparação persistiu com o fuel risk piorando (UNITED-173-A4R180-F3).
- Timing das action choices sugere transição tardia de troubleshooting para fuel-preservation/landing (UNITED-173-A4R180-F4).

## 6. Fatos contra / limitações

- O slice marca o escape point como PARTIAL; o instante discreto (timestamp/fuel quantity) que deveria ter disparado "land now" não está isolado.
- O boundary entre P (attentional fixation) e A (action-selection adequacy) não está resolvido.
- OCR artifacts no TXT exigem verificação fina.
- O framing multi-actor estruturado (Captain + FO + FE) não está detalhado.
- A indicação de trem pode ter sido apenas do indicador (trem possivelmente down/locked) — não confundir a malfunção técnica com o eixo humano.

## 7. Alternativas relevantes

- Tratar a zona como single-actor (bloco de tripulação) vs multi-actor (Captain decisão + FE monitor + FO) — decisão de framing autoral.
- Ancorar a zona ao momento de verbalização de fuel crítico pelo FE como referência temporal candidata.

## 8. Risco de overclassification

Médio. O risco principal é importar conclusões NTSB sobre CRM/treinamento/policy como código SERA, e fechar attentional fixation como código antes de adjudicar o boundary P/A. Deve-se manter factual: informação de fuel disponível e verbalizada, transição de prioridade tardia, sem fechar intenção. Não usar o crash como prova de eixo.

## 9. Consequência se aprovado

O caso entra como adjudication candidate com escape point como zona durante o holding (janela de fuel crítico) e modelo de ator a confirmar (bloco vs multi-actor). Registrado em A4R182 como draft com lock NOT_FINAL_P_O_A.

## 10. Consequência se rejeitado

Retorna para isolamento de anchor temporal/fuel, resolução do boundary P/A, ou definição do framing multi-actor. Permanece READY sem decisão registrada.

## 11. Pergunta simples de decisão autoral

O escopo de ponto de fuga (janela de fuel crítico durante o holding como zona) e o modelo de ator (bloco de tripulação, com possível desdobramento multi-actor entre Captain, FO e FE) são defensáveis para esta adjudicação?

Resposta esperada:
- APROVO
- NÃO APROVO
- PRECISO REVISAR

## 12. Observação

Esta decisão não cria código liberado, fixture oficial ou baseline. É um draft autoral com lock NOT_FINAL_P_O_A, a ser registrado em A4R182.
