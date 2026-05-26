# US-AIRWAYS-1549 Gate Prep A4R159

## Metadata
- eventId: US-AIRWAYS-1549
- eventName: US Airways Flight 1549
- sourceAuthorizationFromA4R158: AUTHORIZED_WITH_CAUTION
- sourcePathUsed: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt
- role: NEGATIVE_CONTROL
- gatePrepStatus: GATE_CANDIDATE_READY_WITH_CAUTION

## Safe-operation frame
- Operacao segura esperada: subida inicial com empuxo bilateral disponivel e envelope de desempenho normal.
- Trajetoria nominal/defensavel: continuidade de subida/retorno com motores operacionais; sem degradacao abrupta de propulsao.
- Barreiras defensaveis antes da fuga: separacao de fauna, protecoes de projeto, disponibilidade de empuxo.

## Candidate escape point
Candidate "Quando...":
"Quando houve ingestao de aves com perda quase total de empuxo nos dois motores, antes das decisoes de retorno/desvio/ditching, a operacao deixou de estar em trajetoria segura/defensavel."

## Why this is not the accident outcome
- O ditching e a evacuacao sao respostas consequenciais apos o onset tecnico-ambiental.
- A qualidade da resposta da tripulacao nao altera o fato de que o primeiro desvio operacional foi a perda de empuxo bilateral.

## Rejected alternatives
- Rejeitada: "ditching no Hudson" como ponto de fuga.
- Rejeitada: "chamadas de checklist QRH" como ponto inicial.
- Rejeitada: "decisao de alternar aeroporto" como onset.
- Rejeitada: "provavel causa oficial" como atalho metodologico.

## Evidence basis
- CVR/FDR registram encontro com aves e deceleracao imediata de N1/N2 em ambos motores.
- Sequencia de checklist e decisao taticas aparece depois do onset de perda de empuxo.
- Narrativa factual confirma natureza tecnica-ambiental do ponto inicial.

## Source and uncertainty limitations
- Cautela A4R158: manter anotacao de duplicate-copy lane, usando path canonico desta fase.
- Caso intencionalmente usado como negative control de onset tecnico-ambiental.
- Sem inferencia de desempenho humano como gatilho inicial.

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
