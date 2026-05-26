# HELIOS-522 Gate Prep A4R159

## Metadata
- eventId: HELIOS-522
- eventName: Helios 522
- sourceAuthorizationFromA4R158: AUTHORIZED_WITH_CAUTION
- sourcePathUsed: docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-3__2006__AAIASB-Greece__Boeing-737-31S__Accident-Report-11-2006-Helios-Airways-Flig.txt
- role: SYSTEMIC_BOUNDARY_CANDIDATE
- gatePrepStatus: GATE_CANDIDATE_READY_WITH_CAUTION

## Safe-operation frame
- Operacao segura esperada: decolagem e subida com sistema de pressurizacao em modo automatico funcional e monitoramento de altitude de cabine dentro do envelope.
- Trajetoria nominal/defensavel: controle de pressurizacao em AUTO durante subida, resposta efetiva antes de exposicao prolongada a altitude de cabine insegura.
- Barreiras defensaveis antes da fuga: configuracao preflight de pressurizacao, checklist de subida, confirmacoes de estado do sistema e acao de recuperacao oportuna.

## Candidate escape point
Candidate "Quando...":
"Quando, na subida inicial com anomalia de pressurizacao ativa e warning de altitude de cabine, o voo continuou a ascensao sem restaurar um estado de pressurizacao defensavel antes da incapacitação posterior, a operacao deixou de estar em trajetoria segura/defensavel."

## Why this is not the accident outcome
- Incapacitacao da tripulacao, padrao de espera, flameout e impacto sao eventos tardios.
- O warning de cabine e um marcador temporal relevante, mas o ponto de fuga operacional pode estar em intervalo anterior/precoce de configuracao-resposta.

## Rejected alternatives
- Rejeitada: "o impacto" como ponto de fuga.
- Rejeitada: "flameout final" como ponto de fuga.
- Rejeitada: "incapacitacao observada por interceptacao" como ponto inicial.
- Rejeitada: "provavel causa oficial" como substituto do gate SERA.

## Evidence basis
- Relatorio factual destaca contexto de pressurizacao e selecao de modo como elemento central da cadeia.
- Warning de altitude de cabine surge em subida inicial, com continuidade da ascensao.
- Sequencia posterior (incomunicabilidade, espera, flameout, impacto) confirma fase consequencial distante do onset.

## Source and uncertainty limitations
- Cautela alta: caso progressivo com intervalo de fuga (preflight/configuracao -> warning inicial -> continuidade de subida).
- Cautela A4R158: manter revisao humana sobre limiar exato entre estado ainda recuperavel e estado nao defensavel.
- Sem classificacao P/O/A nesta fase.

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
