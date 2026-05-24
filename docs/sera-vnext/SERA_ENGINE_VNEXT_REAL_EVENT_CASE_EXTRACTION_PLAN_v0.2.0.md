# SERA Engine vNext Real Event Case Extraction Plan v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-61 — Real Event Case Extraction Plan

## Objetivo
Definir o plano de extração estruturada para a próxima fase com base no inventário documental A4+R-61, preservando os locks metodológicos do vNext e sem executar classificação causal nesta etapa.

## Relação com o corpus inventory
Este plano operacionaliza o inventário em:
- fila de casos candidatos priorizados;
- estrutura padrão de campos extraíveis;
- critérios de escalonamento para adjudicação AI/Author quando houver ambiguidade.

Documento de origem:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_CORPUS_INVENTORY_v0.2.0.md`

## O que será extraído na fase futura
Para cada caso selecionado, extrair apenas conteúdo factual e metadados de confiança:
- `sourceDocument`
- `sourceLocator`
- `factualSummary`
- `eventSequence`
- `unsafeStateCandidate`
- `unsafeActConditionCandidate`
- `directActorCandidate`
- `evidenceFragments`
- `uncertaintyNotes`
- `extractionConfidence`
- `excludedInformation`

## O que NÃO será extraído ainda
- `releasedCode`
- `selectedCode` como `CLASSIFIED`
- `finalConclusion`
- `HFACS`
- `Risk/ERC`
- `recommendations`

## Critérios para chamar o usuário/adjudicador
Escalonar para o usuário/adjudicador durante a execução quando houver:
- caso ambíguo sobre cadeia factual mínima;
- contexto insuficiente para separar fato vs inferência;
- dúvida se o evento é analisável no escopo SERA;
- dúvida de fronteira A-A/A-C;
- dúvida de fronteira O-A/O-C/O-D;
- dúvida de fronteira P-A vs falha perceptiva específica;
- dúvida de evidência insuficiente (UNRESOLVED/INSUFFICIENT_EVIDENCE).

## Fluxo proposto para A4+R-62
1. Selecionar subconjunto inicial da amostra (por prioridade e qualidade de fonte).
2. Extrair `factualSummary` neutro e `eventSequence` por caso.
3. Registrar apenas candidatos de estado/ato/ator, sem classificação final.
4. Marcar incertezas e exclusões explicitamente.
5. Consolidar pacote de casos extraídos para revisão AI/Author.

## Guardrails operacionais
- Sem abertura downstream.
- Sem criação de fixture oficial.
- Sem alteração de baseline.
- Sem alteração de código/motor.
- Sem promoção para consensus reference.

## A4+R-62 — Execução realizada
- Extração estruturada inicial executada com subamostra de 5 casos:
  - REAL-EVENT-0001
  - REAL-EVENT-0002
  - REAL-EVENT-0004
  - REAL-EVENT-0006
  - REAL-EVENT-0028
- Limitações encontradas:
  - referências `pdf24_merged*.pdf` ainda sem arquivo físico local;
  - heterogeneidade de qualidade de fonte entre os casos;
  - um caso mantido com `SOURCE_PARTIAL` (extração de baixa confiança) para trilha de ambiguidade.

## A4+R-63 — Adjudicação piloto executada
- Adjudicação AI/Author piloto executada em 4 casos:
  - REAL-EVENT-0001
  - REAL-EVENT-0002
  - REAL-EVENT-0004
  - REAL-EVENT-0006
- Triage-only executado para 1 caso de baixa confiança:
  - REAL-EVENT-0028 (`SOURCE_PARTIAL`)
- Nenhum `releasedCode` foi gerado.
- Nenhum downstream foi habilitado.

## Próxima fase sugerida
A4+R-64 — AI/Author Adjudication Refinement + Evidence Enrichment Gate.
