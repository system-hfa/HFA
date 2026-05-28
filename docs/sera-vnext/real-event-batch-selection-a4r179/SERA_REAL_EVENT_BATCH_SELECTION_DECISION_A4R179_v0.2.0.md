# SERA Real Event Batch Selection Decision — A4R179

## 1. Objetivo
Selecionar um primeiro lote real para A4R180 com foco em lacunas de cobertura P/O/A em nivel de hipotese, qualidade de fonte e diversidade metodologica, sem fechamento definitivo de classificacao SERA/P/O/A.

## 2. Entradas
- A4R177: arquitetura, matriz P/O/A alvo, politica de sinteticos e macro plano.
- A4R178: inventario estrutural, coverage map preliminar, deduplicacao preliminar e plano inicial de selecao.
- P1 candidate suite A4R176 para complementaridade (sem alterar P1).

## 3. Criterios de selecao
Scoring por criterio (HIGH/MEDIUM/LOW/BLOCKED):
- sourceQuality
- sourceBucket
- escapePointClarity
- actorClarity
- multiActorPotential
- negativeControlPotential
- likelyCoverageP/O/A (hipotese)
- dedupe risk
- source enrichment need
- coverage gap priority (A4R177)
- complementaridade com P1

Status usados nesta selecao:
- SELECT_FOR_A4R180_BATCH_1
- SELECT_AS_NEGATIVE_CONTROL
- P1_REPLICATION_NEGATIVE_CONTROL
- SELECT_AS_MULTI_ACTOR
- SELECT_AS_BOUNDARY_CASE
- SELECT_AS_UNRESOLVED_CANDIDATE
- SOURCE_ENRICHMENT_REQUIRED
- DUPLICATE_REVIEW_REQUIRED
- NOT_DIRECT_EVENT_SOURCE_FOR_A4R180

## 4. Lanes de selecao
- Positive source candidates: 8
- Negative control candidates: 2
- P1 replication negative control: 1
- Multi-actor candidates: 4
- Boundary/ambiguous candidates: 4
- Insufficient evidence / UNRESOLVED candidates: 1
- Tracker/backfill review candidates: 2
- Source enrichment candidates: 2

Nota de consistencia:
- `Positive source candidates` significa fonte forte para selecao inicial.
- Esse lane nao implica escape point ou ator ja claros; varios casos seguem com `PARTIAL`/`UNCLEAR`.

## 5. Lote selecionado
- total selecionado para matriz A4R179: 24

Distribuicao por prioridade:
- HIGH: 11
- MEDIUM: 9
- LOW: 4

Distribuicao por status:
- SELECT_FOR_A4R180_BATCH_1: 8
- SELECT_AS_NEGATIVE_CONTROL: 2
- P1_REPLICATION_NEGATIVE_CONTROL: 1
- SELECT_AS_MULTI_ACTOR: 4
- SELECT_AS_BOUNDARY_CASE: 3
- SELECT_AS_UNRESOLVED_CANDIDATE: 1
- SOURCE_ENRICHMENT_REQUIRED: 2
- DUPLICATE_REVIEW_REQUIRED: 1
- NOT_DIRECT_EVENT_SOURCE_FOR_A4R180: 2

Top candidatos HIGH (amostra):
- A4R179-SEL-0001 | A4R178-INV-0067 | SOURCE-SLICE-ASIANA-214-A4R106 | Positive source candidates
- A4R179-SEL-0002 | A4R178-INV-0068 | SOURCE-SLICE-COMAIR-5191-A4R106 | Positive source candidates
- A4R179-SEL-0003 | A4R178-INV-0070 | SOURCE-SLICE-AMERICAN-1420-A4R115 | Positive source candidates
- A4R179-SEL-0004 | A4R178-INV-0073 | SOURCE-SLICE-COLGAN-3407-A4R115 | Positive source candidates
- A4R179-SEL-0005 | A4R178-INV-0074 | SOURCE-SLICE-HELIOS-522-A4R115 | Positive source candidates
- A4R179-SEL-0012 | A4R178-INV-0246 | TSB-CANADA-LIGHT-HELICOPTER... | Multi-actor candidates

## 6. Casos nao selecionados e por que
- Itens fora do lote inicial permanecem para ondas seguintes por limite de capacidade da A4R180.
- Registros com risco de duplicata alto exigem consolidacao antes da extracao.
- Registros com necessidade forte de enriquecimento de fonte ficaram como SOURCE_ENRICHMENT_REQUIRED.
- Artefatos de tracker/backfill foram mantidos para rastreabilidade, mas nao sao fonte direta de evento para extracao.

## 7. Relacao com P1 candidate suite
- P1 permanece candidate-only e nao foi alterado.
- `US-AIRWAYS-1549` foi mantido como `P1 replication negative control`, nao como expansao primaria de cobertura.
- A4R179 amplia diversidade real alem dos quatro casos P1.

## 8. Lacunas que permanecem
- Lacunas `not_covered_in_P1` seguem abertas, ainda que com potencial reduzido.
- Casos `DUPLICATE_REVIEW_REQUIRED`, `SOURCE_ENRICHMENT_REQUIRED` e `NOT_DIRECT_EVENT_SOURCE_FOR_A4R180` exigem preparo antes de extracao.
- Codigos com fronteira ambigua seguem em NEEDS_REVIEW para A4R180.

## 9. O que sera feito em A4R180
- Extracao estruturada dos selecionados com foco em evidencias, timeline factual, escape point potencial e ator potencial.
- Tratamento separado para negative controls, multi-actor, boundary e UNRESOLVED.
- Tracker/backfill nao deve ser usado como fonte direta sem localizar evento/fonte primaria.

## 10. O que nao pode ser feito ainda
- sem fixture
- sem baseline
- sem runner
- sem sinteticos nesta etapa
- sem fechamento definitivo de P/O/A

## 11. Limitacoes
- selecao baseada em inventario estrutural e metadados de potencial.
- `likelyCoverageP/O/A` e hipotese ampla, nao resultado adjudicado.
- `HIGH_POTENTIAL` no coverage map nao equivale a cobertura metodologica validada.
- deduplicacao ainda preliminar para parte do corpus.
- sem classificação SERA final.
