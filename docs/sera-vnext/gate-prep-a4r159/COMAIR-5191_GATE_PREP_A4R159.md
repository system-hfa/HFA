# COMAIR-5191 Gate Prep A4R159

## Metadata
- eventId: COMAIR-5191
- eventName: COMAIR Flight 5191
- sourceAuthorizationFromA4R158: AUTHORIZED
- sourcePathUsed: docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/COMAIR-5191-NTSB-AAR0705.txt
- role: HF_POSITIVE_CANDIDATE
- gatePrepStatus: GATE_CANDIDATE_READY_FOR_AUTHOR_REVIEW

## Safe-operation frame
- Operacao segura esperada: taxi e alinhamento para decolagem na pista autorizada (RWY 22), com verificacoes de alinhamento antes da corrida.
- Trajetoria nominal/defensavel: sequencia taxi -> hold short correto -> alinhamento na pista autorizada -> corrida de decolagem em pista compativel com performance.
- Barreiras defensaveis antes da fuga: briefing de pista, referencias de heading, verificacao externa de alinhamento, checagens de cabine/cockpit antes da potencia de decolagem.

## Candidate escape point
Candidate "Quando...":
"Quando a aeronave cruzou o hold-short e alinhou para decolagem na RWY 26 como se estivesse na pista autorizada, antes do fim de pista e dos impactos subsequentes, a operacao deixou de estar em trajetoria segura/defensavel."

## Why this is not the accident outcome
- O impacto em berm/arvores e a destruicao da aeronave ocorreram depois da corrida em pista errada.
- O ponto de fuga operacional ocorre na transicao para uma corrida de decolagem em pista nao pretendida, nao no dano final.

## Rejected alternatives
- Rejeitada: "o impacto com berm/arvores" como ponto de fuga.
- Rejeitada: "o crash/fogo" como ponto de fuga.
- Rejeitada: "a provavel causa oficial" como ponto de fuga SERA.
- Rejeitada: "chamada tardia de V1/rotate" como primeiro ponto de fuga.

## Evidence basis
- Factual timeline registra autorizacao final de decolagem sem repeticao explicita do numero da pista no ultimo intercambio.
- Groundpath/timeline mostra cruzamento de hold-short e alinhamento em RWY 26 antes da aceleracao.
- Corrida de decolagem e callouts acontecem ja na pista incorreta, indicando que o desvio operacional critico ocorreu antes do impacto.

## Source and uncertainty limitations
- Sem bloqueio de fonte no A4R158 para este caso.
- Ainda existe necessidade de revisao humana do limiar exato (cruzar hold-short vs inicio de roll).
- Nao ha uso de inferencia de intencao/percepcao nesta fase.

## Future author-review questions
- O "quando" esta cedo demais?
- O "quando" esta tarde demais?
- Ha outro limiar operacional mais defensavel?
- O ponto escolhido depende de evento posterior?
- A formulacao embute percepcao/objetivo/acao indevidamente?

## Explicit locks
- NO_P_O_A
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
