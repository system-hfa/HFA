# COLGAN-3407 Gate Prep A4R159

## Metadata
- eventId: COLGAN-3407
- eventName: Colgan Air Flight 3407
- sourceAuthorizationFromA4R158: AUTHORIZED_WITH_CAUTION
- sourcePathUsed: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/1__2010__NTSB-USA__DHC-8-402-Q400__Loss-of-Control-on-Approach-Colgan-Air-Conti.txt
- role: HF_POSITIVE_CANDIDATE
- gatePrepStatus: GATE_CANDIDATE_READY_WITH_CAUTION

## Safe-operation frame
- Operacao segura esperada: aproximacao ILS com controle de energia/velocidade, configuracao progressiva estabilizada e margem acima do limiar de estol.
- Trajetoria nominal/defensavel: degradacao de velocidade controlada, ajustes de configuracao dentro de envelope estabilizado, sem aproximacao do limiar de estol.
- Barreiras defensaveis antes da fuga: monitoramento de airspeed/energia, disciplina de perfil de aproximacao, decisao de arremeter se perfil perder defensabilidade.

## Candidate escape point
Candidate "Quando...":
"Quando, no segmento final de aproximacao, a margem de energia/velocidade entrou em degradacao progressiva nao defensavel antes da ativacao do stick shaker, a operacao deixou de estar em trajetoria segura/defensavel."

## Why this is not the accident outcome
- O impacto e o incendio sao consequencias tardias da perda de controle.
- O stick shaker e um marcador critico, mas pode aparecer depois de uma degradacao de margem ja estabelecida.

## Rejected alternatives
- Rejeitada: "o impacto" como ponto de fuga.
- Rejeitada: "a ativacao do stick shaker" como ponto de fuga automatico unico.
- Rejeitada: "a provavel causa oficial" como ponto de fuga SERA.
- Rejeitada: "a resposta final apos shaker/pusher" como primeiro desvio.

## Evidence basis
- Narrativa factual mostra desaceleracao e evolucao de configuracao/trim antes do stick shaker.
- Marcador de stick shaker aparece como alerta de fase ja critica.
- Sequencia final de upset e impacto confirma que o resultado ocorreu apos o limiar de fuga.

## Source and uncertainty limitations
- Cautela A4R158 por historico de alias/duplicata normalizado no overlay.
- Caso de limiar progressivo: janela de fuga e intervalo operacional, nao um unico frame perfeitamente discreto.
- Sem uso de classificacao P/O/A.

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
