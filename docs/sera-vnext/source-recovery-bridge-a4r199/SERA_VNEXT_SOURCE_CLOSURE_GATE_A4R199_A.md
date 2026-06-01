# SERA vNext Source Closure Gate A4R199-A

Date: 2026-06-01
Phase: A4R199-A
Status: gate definition only

## 1. Gate

Gate name: `SOURCE_CLOSURE_GATE`

Objetivo do gate:
- permitir somente recovery assessment com rastreabilidade de fonte;
- bloquear qualquer classificacao ativa, promocao ou output final.

## 2. Criterios obrigatorios

Todos os itens abaixo devem estar presentes:
1. fonte primaria ou secundaria oficial claramente rastreavel;
2. locator/document reference verificavel;
3. factual evidence separado de conclusion externa;
4. chronology suficiente para ponto de fuga;
5. actor attribution suficiente;
6. PF/PM attribution suficiente quando aplicavel;
7. sequenceRef suficiente quando aplicavel;
8. outcome/consequence em quarentena;
9. sem P/O/A classification na fase de source recovery;
10. sem READY promotion;
11. sem fixture/baseline/product promotion.

## 3. Forbidden outputs

- selectedCode non-null
- releasedCode non-null
- finalConclusion
- CLASSIFIED
- P/O/A final classification
- automatic READY promotion
- fixture promotion
- baseline promotion
- product/UI/API promotion
- HFACS
- Risk/ERC
- ARMS/ERC
- recommendations

## 4. Verdicts permitidos

- SOURCE_RECOVERY_SUCCESS
- SOURCE_RECOVERY_PARTIAL
- SOURCE_STILL_INSUFFICIENT
- NEGATIVE_CONTROL_CANDIDATE
- BOUNDARY_CASE_ONLY
- DO_NOT_USE_FOR_REENTRY
- REQUIRES_HUMAN_DECISION

## 5. Exit states permitidos

- READY_FOR_FUTURE_SOURCE_RECOVERY_REVIEW
- HOLD_FOR_HUMAN_DECISION

## 6. Condicoes de bloqueio

Bloquear a execucao quando houver:
- fonte sem rastreabilidade;
- chronology insuficiente para escape point;
- ator direto nao sustentado por evidencia;
- PF/PM boundary nao sustentada quando aplicavel;
- sequenceRef sem suporte quando aplicavel;
- tentativa de usar consequencia pos ponto de fuga como causa;
- tentativa de classificacao final, READY automatico ou promocao.

## 7. Relacao metodologica

Relacao com escape point:
- P/O/A sempre no instante do ponto de fuga da operacao segura.
- evidencias posteriores permanecem como consequencia/contexto.

Relacao com actor attribution:
- ator direto deve estar fixado no ponto de fuga.
- migracao implicita de ator e invalida.

Relacao com PF/PM e sequenceRef:
- PF/PM exige evidencia de fronteira no ponto de fuga.
- sequenceRef exige marcador por ator para o primeiro instante controlavel.
