# SERA vNext Batch 1 Source Recovery Next Phase Decision A4R197-E

Date: 2026-06-01
Phase: A4R197-E
Status: decision memo only (source recovery review)
Gate: SOURCE_CLOSURE_GATE

## 1. Eventos que podem ir para eventual deeper source recovery

Apenas como preparacao futura sob `SOURCE_CLOSURE_GATE`, sem promocao nesta fase:
- Colgan 3407 — fonte forte; condicionado ao fechamento de GAP-010 (decisao humana de fronteira PF/PM).
- Thebaud — fonte primaria TSB; precisa de timeline ator-especifico para PF/PM e sequenceRef.
- Peasmarsh — fonte AAIB; precisa separar warning chain da ancora de escape.

Esses eventos sao `SOURCE_RECOVERY_PARTIAL` e permanecem
`READY_FOR_FUTURE_SOURCE_RECOVERY_REVIEW`, nunca READY de classificacao.

## 2. Eventos que devem ficar HOLD

- N109W — `HOLD_FOR_HUMAN_DECISION` (superseded; DO_NOT_USE_FOR_REENTRY).
- N11NM — `HOLD_FOR_HUMAN_DECISION` (superseded; DO_NOT_USE_FOR_REENTRY).

Rascunhos historicos UNRESOLVED de A4R81 nao sao evidencia ativa e nao habilitam reentry.

## 3. Negative / boundary controls

- Delta 191 — `NEGATIVE_CONTROL_CANDIDATE` (technical/environmental, microburst).
- 5N-BQJ — `NEGATIVE_CONTROL_CANDIDATE` (offshore technical dominance, DAFCS/TRIM FAIL).
- USAir 427 — `BOUNDARY_CASE_ONLY` (fronteira technical-human, rudder dominance).

Nenhum desses pode sofrer forced human reentry nem ser convertido em falha humana por
resultado grave.

## 4. Insuficiencia documental

- Vigo — `SOURCE_STILL_INSUFFICIENT`. Fonte notification-level, sem paginacao primaria;
  necessario relatorio primario CIAIAC antes de qualquer review mais profundo. Sem
  crew-collective fallback.

## 5. Algum pode ser considerado para futura candidate-only adjudication?

Nao nesta fase. Source recovery review nao habilita candidate-only adjudication.
Qualquer transicao futura para candidate-only exigiria:
- fechamento do `SOURCE_CLOSURE_GATE` por item;
- decisao humana explicita;
- para Colgan 3407, decisao GAP-010 (BOUNDARY_DECISION_GATE) primeiro.

Daumas permanece methodology/reference-only e nao reabilita evento automaticamente.

## 6. Gates adicionais necessarios

- GAP-010 / BOUNDARY_DECISION_GATE para Colgan 3407 (fronteira PF/PM).
- NEGATIVE_CONTROL_BOUNDARY_GATE para Delta 191 / USAir 427 / 5N-BQJ (GAP-005).
- SOURCE_CLOSURE_GATE reforcado para Thebaud / Peasmarsh / Vigo (GAP-001/003/008).
- HOLD_RECONCILIATION para N109W / N11NM (GAP-008 superseded subset).

## 7. Recomendacao conservadora

`A4R197-E_BATCH_1_SOURCE_RECOVERY_REVIEW_COMPLETED_NO_PROMOTION`

Interpretacao:
- a review documental de suficiencia de fonte foi executada para os 9 eventos;
- verdicts controlados emitidos;
- nenhum evento promovido;
- separacao real/synthetic preservada;
- todos os locks permanecem fechados.

## 8. Proibicao explicita

- sem READY promotion;
- sem P/O/A final classification;
- sem selectedCode / releasedCode / finalConclusion / CLASSIFIED;
- sem fixture / baseline / produto;
- sem downstream;
- sem web search / download externo;
- sem alteracao de source-corpus;
- sem materializacao de sintetico.
