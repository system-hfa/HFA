# SERA vNext Opus Review and Source Recovery Campaign Plan A4R197-A v0.2.0

Date: 2026-06-01
Phase: A4R197-A
Status:
- PLAN_ONLY
- CAMPAIGN_GOVERNANCE_ONLY
- NO_EXECUTION
- A4R197_B_NOT_STARTED

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## 1. Objetivo da campanha Opus

Esta campanha define governanca para uso futuro do Opus em duas frentes separadas:

1. revisao metodologica independente;
2. source recovery de eventos reais ja existentes.

A4R197-A nao executa revisao Opus, nao executa source recovery real, nao cria sintetico novo,
nao classifica P/O/A e nao promove fixture/baseline/produto.

## 2. Distincao de lanes

### Lane A - Revisao metodologica

- Escopo: auditoria de consistencia, risco metodologico e aderencia de locks.
- Foco: qualidade do metodo, rastreabilidade e risco de contaminacao.
- Resultado: verdicts de review controlados, sem promocao.

### Lane B - Source recovery

- Escopo: suficiência de fonte, lacunas documentais, riscos de uso indevido.
- Foco: se a fonte permite futura fase propria de reentry candidate-only.
- Resultado: verdicts de source recovery controlados, sem classificacao P/O/A.

## 3. Limites do Opus

- Opus e auditor/reviewer, nao autor soberano de classificacao.
- Opus nao pode abrir locks metodologicos.
- Opus nao substitui decisao humana final.
- Opus nao transforma source recovery em classificacao.
- Opus nao transforma evento real em sintetico nem sintetico em evento real.

## 4. Outputs permitidos nesta campanha

- plano de campanha;
- matriz de work packages;
- matriz de prioridade de source recovery;
- contrato de prompt de revisao;
- registro de outputs proibidos;
- log de fase;
- readiness plan da fase seguinte;
- trial documental de validacao.

## 5. Outputs proibidos nesta campanha

- selectedCode non-null;
- releasedCode non-null;
- finalConclusion;
- CLASSIFIED;
- fixture creation;
- baseline promotion;
- product UI API;
- HFACS;
- Risk/ERC;
- ARMS/ERC;
- recommendations;
- automatic READY;
- automatic reentry;
- automatic Daumas promotion;
- automatic synthetic promotion.

## 6. Relacao com A4R196-A

A4R196-A encerrou checkpoint documental com `NO_PROMOTION`, locks preservados e
decisao humana obrigatoria para qualquer rota futura. A4R197-A herda esse estado e define
somente o plano de campanha Opus, sem iniciar execucao de rota.

## 7. Relacao com GAP-001 PF/PM

- GAP-001 permanece controlled draft auditado e retido.
- A4R197-A nao altera boundary PF/PM e nao inicia PM-primary separate draft.
- Qualquer revisao Opus de GAP-001 ocorre apenas em fase futura autorizada.

## 8. Relacao com eventos reais HOLD

- Eventos HOLD permanecem HOLD nesta fase.
- Source recovery nesta fase e somente planejamento.
- Nenhum evento pode passar de HOLD para READY sem fase posterior propria, autorizada e
  validada.

## 9. Relacao com futuros sinteticos

- Futuros sinteticos continuam condicionados a decisao humana explicita.
- A4R197-A nao abre materializacao sintetica, fixture ou baseline.
- Separacao real-event vs synthetic permanece obrigatoria.

## 10. Decisoes explicitas

- Esta fase e `PLAN_ONLY`.
- Opus nao e autor soberano de classificacao.
- Source recovery nao equivale a classificacao P/O/A.
- Nenhum evento passa de HOLD para READY nesta fase.
- A4R197-B nao e iniciada por A4R197-A.

## 11. Non-initiation statement

- A4R197-B_NOT_STARTED.
- Source recovery NOT_STARTED.
- Nenhum sintetico novo iniciado.
- Fixture/baseline/produto permanecem bloqueados.
