# SERA A4R178 to A4R184 Macro Plan v0.2.0

Status:
- DRAFT_ONLY
- MACRO_PHASE_PLAN
- NO_RUNNER_IMPLEMENTATION
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## A4R178 — Real Event Corpus Inventory and Coverage Map

- objetivo:
  inventariar corpus real com mapa inicial de cobertura por eixo.
- entradas:
  corpus oficial, slices, trackers, matriz A4R177.
- saídas:
  inventario estruturado e coverage map real-event.
- critérios de parada:
  inventario rastreavel completo para lote inicial.
- o que nao pode fazer:
  nao classificar definitivamente todos os casos; nao alterar runner oficial/baseline.

## A4R179 — Real Event Batch Selection by Coverage Gap

- objetivo:
  selecionar lote de eventos reais por lacuna de cobertura.
- entradas:
  inventario A4R178 + matriz P/O/A.
- saídas:
  lote priorizado com justificativa por gap.
- critérios de parada:
  lote com diversidade minima por eixo e qualidade de fonte.
- o que nao pode fazer:
  nao introduzir sintéticos antes de esgotar selecao real viavel.

## A4R180 — Structured Extraction Real Event Batch

- objetivo:
  executar extracao estruturada dos eventos reais selecionados.
- entradas:
  lote A4R179 e protocolos de extracao.
- saídas:
  pacotes de extracao por evento com rastreabilidade.
- critérios de parada:
  extracoes completas para lote alvo.
- o que nao pode fazer:
  nao promover para baseline; nao alterar runner oficial.

## A4R181 — Author Adjudication Real Event Batch

- objetivo:
  adjudicacao autoral das extracoes reais.
- entradas:
  extracoes A4R180.
- saídas:
  decisoes autorais e status por evento.
- critérios de parada:
  lote adjudicado com bloqueios e pendencias explicitados.
- o que nao pode fazer:
  nao reescrever metodologia para forcar convergencia artificial.

## A4R182 — Synthetic Gap Set Design

- objetivo:
  desenhar set sintético apenas para lacunas reais persistentes.
- entradas:
  matriz de lacunas apos A4R181.
- saídas:
  plano sintético rastreavel por gap.
- critérios de parada:
  cada sintético com `gapTarget` e `prohibitedInference` claros.
- o que nao pode fazer:
  nao tratar sintético como evidencia historica.

## A4R183 — vNext Runner Implementation Candidate-Only

- objetivo:
  implementar runner vNext separado em trilha candidate-only.
- entradas:
  arquitetura A4R177 + lotes reais/sintéticos autorizados.
- saídas:
  runner vNext funcional e validadores dedicados.
- critérios de parada:
  execucao candidate-only com isolamento legado comprovado.
- o que nao pode fazer:
  nao alterar runner oficial; nao misturar baseline legado.

## A4R184 — vNext Baseline Candidate Policy and Trial

- objetivo:
  definir politica de baseline vNext candidate e rodar trial controlado.
- entradas:
  runner vNext A4R183 + suites aprovadas.
- saídas:
  baseline vNext candidate de teste e regras de governanca.
- critérios de parada:
  trial documentado com risco/limitacoes e gate de proxima decisao.
- o que nao pode fazer:
  nao substituir baseline legado automaticamente.
