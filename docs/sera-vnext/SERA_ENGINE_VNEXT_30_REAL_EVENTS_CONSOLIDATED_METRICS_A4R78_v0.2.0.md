# SERA Engine vNext 30 Real Events Consolidated Metrics A4R78 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-78 — Consolidated Metrics and QuestionPath Review for 30 Real Events  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Consolidar métricas dos 30 eventos reais extraídos/adjudicados em draft, sem alterar decisões de caso, sem promover release e sem abrir downstream.

## Escopo
- 5 eventos iniciais.
- 10 eventos Batch 2.
- 15 eventos Batch 3.
- totalCases=30.
- totalAxes=90.

## Métricas globais
- totalCases=30
- totalAxes=90
- proposedPAxes=12
- proposedOAxes=25
- proposedAAxes=1
- unresolvedPAxes=18
- unresolvedOAxes=5
- unresolvedAAxes=29
- totalUnresolvedAxes=52
- releasedCodeCount=0
- finalConclusionCount=0
- downstreamOpenedCount=0
- authorReviewReadyCases=10
- holdUnresolvedCases=10
- evidenceEnrichmentRequiredCases=10
- triageOnlyCases=4
- guardedNarrativeDraftCases=2

## Distribuição de códigos draft
| dimensão | count |
|---|---:|
| P-G | 7 |
| P-C | 2 |
| P-F | 1 |
| P-H | 2 |
| O-A | 22 |
| O-C | 1 |
| O-D | 2 |
| A-F | 1 |
| UNRESOLVED em P | 18 |
| UNRESOLVED em O | 5 |
| UNRESOLVED em A | 29 |
| Outros códigos P/O/A draft | 0 |

## Batch comparison
| batch | cases | proposedP | proposedO | proposedA | unresolvedP | unresolvedO | unresolvedA | authorReviewReady | holdUnresolved | enrichmentRequired | triageOnly | questionPathPresent |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Batch inicial | 5 | 1 | 4 | 0 | 4 | 1 | 5 | 1 | 3 | 1 | 1 | não padronizado |
| Batch 2 | 10 | 3 | 9 | 0 | 7 | 1 | 10 | 3 | 2 | 5 | 1 | não padronizado |
| Batch 3 | 15 | 8 | 12 | 1 | 7 | 3 | 14 | 6 | 5 | 4 | 2 | 15/15 |

## Leitura metodológica
### O método continua evitando overclassification?
Sim. Dos 90 eixos avaliados, 52 permanecem `UNRESOLVED`. A postura conservadora aparece principalmente no eixo A (`29/30` unresolved), em casos condition-dominant e em fontes parciais.

### A introdução do questionPath melhorou rastreabilidade?
Sim. O Batch 3 mostra, por eixo, as perguntas, respostas sintéticas, evidência usada e impacto no código. Isso reduz a aparência de conclusão livre e permite auditoria autoral mais direta.

### O eixo A ainda está excessivamente unresolved?
Sim em volume. Apenas `A-F` em BS211 aparece como draft. Isso ainda é metodologicamente correto porque a maioria dos casos não tem decomposição robusta de PF/PM, inputs, verificação pós-ação própria ou feedback de terceiro.

### O eixo O continua concentrado em O-A?
Sim, mas menos que nos 15 primeiros. O-A soma 22/30 casos, enquanto Batch 3 introduziu `O-C` e `O-D` como drafts controlados. A concentração ainda indica que objetivo não-nominal exige evidência muito mais específica.

### O aparecimento de O-C/O-D em Batch 3 é metodologicamente útil?
Sim. `O-D` em HL9294/N109W e `O-C` em BS211 criam casos de teste para objective diversity sem converter todo evento adverso em objetivo inadequado.

### O único A-F draft é suficiente para começar release?
Não. Um único draft `A-F`, ainda sob AI/Author review, não sustenta critérios de release automático nem baseline. Ele é útil para desenhar critérios de release, não para liberar código.

### Evidência que falta com mais frequência
- timeline PF/PM e callouts por ponto decisório;
- inputs, modos e feedback/checking após ação própria;
- dados de warning/cue availability e resposta;
- separação técnica vs resposta humana;
- fonte primária para casos source partial/triage;
- evidência explícita de intenção, rotina ou consciência de regra para O-B/O-C/O-D.

## Confirmações
- `proposedCode` não é `releasedCode`.
- `releasedCodeCount=0`.
- nenhum finalConclusion gerado.
- nenhum HFACS/Risk/ERC gerado.
- nenhuma recommendation gerada.
- nenhum fixture/baseline alterado.
- nenhum código alterado.
