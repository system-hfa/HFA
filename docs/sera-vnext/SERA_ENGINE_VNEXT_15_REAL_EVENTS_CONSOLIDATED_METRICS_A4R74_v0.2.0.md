# SERA Engine vNext 15 Real Events Consolidated Metrics A4R74 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-74 — Consolidated Metrics and Pattern Review for 15 Real Events  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Consolidar métricas metodológicas dos 15 eventos reais já extraídos/adjudicados, sem alterar decisões draft, sem promover release e sem abrir downstream.

## Escopo
- lote inicial: 5 eventos reais (A4+R-63..A4+R-70);
- lote Batch 2: 10 eventos reais (A4+R-72..A4+R-73);
- totalCases=15;
- totalAxes=45.

## Métricas globais
- totalCases=15
- totalAxes=45
- proposedPAxes=4
- proposedOAxes=13
- proposedAAxes=0
- unresolvedPAxes=11
- unresolvedOAxes=2
- unresolvedAAxes=15
- totalUnresolvedAxes=28
- releasedCodeCount=0
- finalConclusionCount=0
- downstreamOpenedCount=0
- authorReviewReadyCases=4
- holdUnresolvedCases=5
- evidenceEnrichmentRequiredCases=6
- triageOnlyCases=2
- guardedNarrativeDraftCases=2

## Distribuição de códigos draft
| dimensão | count |
|---|---:|
| P-G | 3 |
| P-C | 1 |
| O-A | 13 |
| UNRESOLVED em P | 11 |
| UNRESOLVED em O | 2 |
| UNRESOLVED em A | 15 |
| Outros códigos P/O/A draft | 0 |

## Maturity distribution
| bucket | count | notas |
|---|---:|---|
| AUTHOR_REVIEW_READY | 4 | 1 caso do lote inicial + 3 casos do Batch 2 |
| HOLD_UNRESOLVED | 5 | 3 casos do lote inicial + 2 casos do Batch 2 |
| EVIDENCE_ENRICHMENT_REQUIRED | 6 | 1 caso do lote inicial + 5 casos do Batch 2 |
| TRIAGE_ONLY | 2 | 1 caso do lote inicial + 1 caso do Batch 2 |
| Guarded Narrative Draft | 2 | sobreposição documental (`001` e `004` do lote inicial) |

## Pattern review consolidado
- condition-dominant cases: `REAL-EVENT-0006`, `0013`, `0007`, `0008`, `0009`, `0011`.
- perception/action boundary cases: `REAL-EVENT-0001`, `0003`, `0015`, `0016`.
- PF/PM ambiguity cases: `REAL-EVENT-0001`, `0002`, `0003`, `0005`, `0015`.
- automation/mode awareness cases: `REAL-EVENT-0016`.
- source identity mismatch case: `REAL-EVENT-0013`.
- source partial cases: `REAL-EVENT-0028` (HL9661 triage), `REAL-EVENT-0013` (mismatch until reconciliation).
- technical failure dominant cases: `REAL-EVENT-0006`, `0007`, `0008`, `0013`.
- bird strike/barrier breach: `REAL-EVENT-0009`.
- infrastructure hazard: `REAL-EVENT-0011`.

## Leitura metodológica
### O método está evitando overclassification?
Sim. Apenas 17 eixos com draft ativo (`4 P + 13 O + 0 A`) em 45 totais, com manutenção de 28 `UNRESOLVED` quando a evidência não fecha mecanismo.

### O eixo A está excessivamente unresolved?
Sim em volume (`15/15 unresolved`), porém consistente com os guardrails vigentes: ausência de decomposição PF/PM, dominância técnica e lacunas de timeline impedem fechamento robusto sem overfit.

### O eixo O está estável demais em O-A?
Há concentração alta (`13/15` em `O-A`). Isso é parcialmente esperado em eventos reais onde não há evidência de objetivo intencional desviante; ao mesmo tempo, indica necessidade de ampliar corpus (mais variedade de cenários) para testar estabilidade real do eixo O.

### Comportamento correto ou lacuna?
- Correto: postura conservadora em P/A, bloqueando inferência forçada.
- Lacuna: déficit recorrente de evidência mecanística (timing, actor split, cadeia de sinais) e poucos casos com evidência de objetivo não-nominal.

### Evidência que falta com mais frequência
- decomposição PF/PM/terceiros por linha temporal;
- cadeia warning/percepção/resposta com granularidade;
- diferenciação técnica vs resposta humana em casos condition-dominant;
- reconciliação de identidade de fonte/caso em casos de mismatch.

### Candidatos a future reference cases
- `REAL-EVENT-0001` (boundary P/A em ambiente offshore);
- `REAL-EVENT-0015` (dark-night approach com sequência rica de coordenação);
- `REAL-EVENT-0016` (automação/mode awareness adversarial fora do domínio helicóptero).

### Candidatos a adversarial naturais
- `REAL-EVENT-0006`, `0007`, `0008`, `0009`, `0011`, `0013` (todos com risco de overclassification humana quando a condição técnica/externa domina).

## Confirmações
- `proposedCode` não é `releasedCode`.
- `releasedCodeCount=0`.
- nenhum finalConclusion gerado.
- nenhum HFACS/Risk/ERC gerado.
- nenhuma recommendation gerada.
- nenhum fixture/baseline alterado.
- nenhum código alterado.
