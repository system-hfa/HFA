# SERA A4R180 Structured Extraction Plan v0.2.0

## Objetivo
Executar extracao estruturada do lote A4R179 preservando rastreabilidade e incerteza, sem classificacao SERA final.

## Unidade de trabalho por evento selecionado
Para cada `selectionId` aprovado para onda de extracao:
- source excerpt: recortes de fonte com referencia de caminho
- factual timeline: linha do tempo estritamente factual
- possible escape point: candidato com clareza (CLEAR_POTENTIAL/PARTIAL/UNCLEAR/NOT_ASSESSED)
- unsafe act/condition candidate: candidato sem fechamento final
- direct actor candidate: candidato sem fechamento final
- actorContributionId: quando houver potencial multi-actor
- evidence fragments: fragmentos de evidencia rastreaveis
- uncertainty notes: incertezas e ambiguidades
- excluded information: o que foi excluido por baixa confianca, irrelevancia ou mistura indevida

## Regras operacionais
- separar fato de interpretacao e hipotese SERA.
- manter `NOT_FOR_FIXTURE_NOT_FOR_BASELINE_NOT_FINAL_P_O_A` para todo output intermediario.
- lanes `SOURCE_ENRICHMENT_REQUIRED` e `DUPLICATE_REVIEW_REQUIRED` exigem pre-check antes da extracao completa.
- status `NOT_DIRECT_EVENT_SOURCE_FOR_A4R180` exige localizar `eventId` e fonte primaria antes de qualquer extracao de evento.
- lane `P1 replication negative control` deve ser tratada como replicacao controlada, nao como expansao primaria de cobertura.

## Proibicoes
- no fechamento definitivo de P/O/A
- no fixture
- no baseline
- no runner
- no synthetic event nesta fase

## Entregaveis esperados da A4R180
- pacote de extracao por evento com trilha de evidencia.
- log de incerteza e bloqueios por evento.
- proposta de encaminhamento para adjudicacao autoral posterior (A4R181), sem classificar final.
