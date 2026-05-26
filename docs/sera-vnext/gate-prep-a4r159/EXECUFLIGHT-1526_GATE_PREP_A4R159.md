# EXECUFLIGHT-1526 Gate Prep A4R159

## Metadata
- eventId: EXECUFLIGHT-1526
- eventName: Execuflight 1526
- sourceAuthorizationFromA4R158: AUTHORIZED_WITH_CAUTION
- sourcePathUsed: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt
- role: HF_POSITIVE_CANDIDATE
- gatePrepStatus: GATE_CANDIDATE_READY_WITH_CAUTION

## Safe-operation frame
- Operacao segura esperada: aproximacao nao-precisa com gerenciamento vertical compativel com FAF/MDA, velocidade e razao de descida estabilizadas.
- Trajetoria nominal/defensavel: captura do perfil sem atraso de descida critica e sem necessidade de "mergulho" para recuperar altitude.
- Barreiras defensaveis antes da fuga: criterios de aproximacao estabilizada, chamada de minima, arremetida quando perfil deixa de ser defensavel.

## Candidate escape point
Candidate "Quando...":
"Quando, ja estabelecida no localizador, a aeronave permaneceu alta e passou a exigir recuperacao com razao de descida excessiva para tentar recompor o perfil antes da MDA, a operacao deixou de estar em trajetoria segura/defensavel."

## Why this is not the accident outcome
- A violacao de MDA, o stick shaker tardio e o impacto ocorrem apos a perda de defensabilidade do perfil de aproximacao.
- O ponto de fuga e o limiar de instabilidade operacional, nao o contato com o solo/edificacao.

## Rejected alternatives
- Rejeitada: "o impacto" como ponto de fuga.
- Rejeitada: "o alerta pull up" como primeiro ponto de fuga.
- Rejeitada: "descer abaixo da MDA" como unico primeiro evento, sem considerar a instabilidade previa.
- Rejeitada: "fatores organizacionais" como ponto de fuga operacional imediato.

## Evidence basis
- Factual timeline mostra atraso na descida apos liberacao para localizador, mantendo altitude acima do perfil.
- Sequencia registra aumento de razao de descida para recuperar perfil e chamadas no cockpit sobre condicao instavel.
- Continuidade abaixo da MDA e alertas finais aparecem depois, como fase consequencial.

## Source and uncertainty limitations
- Cautela A4R158 por historico de duplicata/alias normalizado.
- Limiar e progressivo (high profile -> recuperacao agressiva -> perda de estabilizacao).
- Sem inferencia de intencao ou classificacao P/O/A.

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
