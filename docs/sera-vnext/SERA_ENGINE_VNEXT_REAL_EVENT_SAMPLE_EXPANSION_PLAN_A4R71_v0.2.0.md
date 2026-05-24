# SERA Engine vNext Real Event Sample Expansion Plan A4R71 v0.2.0

Status: DRAFT_FOR_REVIEW  
NO_CLASSIFICATION  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Transformar o inventário de candidatos do corpus `pdf24_merged*.txt` em uma nova rodada de extração estruturada, sem classificação SERA nesta fase.

## Tamanho recomendado da amostra
- Batch 2: 10 casos `P1`.
- Backlog: 10–20 casos `P2/P3`.

## Próxima rodada proposta
- **A4+R-72 — Structured Extraction Batch 2 from PDF24 Text Corpus**.

## Campos de extração
- `extractionId`
- `sourceDocument`
- `sourceLocator`
- `originalCandidateId`
- `shortLabel`
- `sourceType`
- `extractionConfidence`
- `factualSummary`
- `eventSequence`
- `unsafeStateCandidate`
- `unsafeActConditionCandidate`
- `directActorCandidate`
- `evidenceFragments`
- `uncertaintyNotes`
- `excludedInformation`
- `possibleEvidenceCategoryHints`
- `adjudicationQuestions`
- `nextStepRecommendation`

## Guardrails
- sem classificação SERA na extração;
- sem usar conclusão antiga como gabarito;
- sem HFACS/Risk/ERC;
- sem recommendation;
- sem releasedCode;
- sem fixture/baseline;
- sem downstream.

## Priorização
### Batch 2 P1 — extrair agora (10 casos)
- `PDF24-TXT-CAND-001` (REAL-EVENT-0003)
- `PDF24-TXT-CAND-002` (REAL-EVENT-0005)
- `PDF24-TXT-CAND-006` (REAL-EVENT-0010)
- `PDF24-TXT-CAND-008` (REAL-EVENT-0013)
- `PDF24-TXT-CAND-010` (REAL-EVENT-0015)
- `PDF24-TXT-CAND-011` (REAL-EVENT-0016)
- `PDF24-TXT-CAND-003` (REAL-EVENT-0007)
- `PDF24-TXT-CAND-004` (REAL-EVENT-0008)
- `PDF24-TXT-CAND-005` (REAL-EVENT-0009)
- `PDF24-TXT-CAND-007` (REAL-EVENT-0011)

### Batch 2 P2 — backlog próximo
- `PDF24-TXT-CAND-017` (REAL-EVENT-0031)
- `PDF24-TXT-CAND-009` (REAL-EVENT-0014)
- `PDF24-TXT-CAND-012` (REAL-EVENT-0017)
- `PDF24-TXT-CAND-013` (REAL-EVENT-0018)
- `PDF24-TXT-CAND-014` (REAL-EVENT-0019)
- `PDF24-TXT-CAND-015` (REAL-EVENT-0020)
- `PDF24-TXT-CAND-016` (REAL-EVENT-0030)

### Source enrichment only
- `PDF24-TXT-CAND-018` (REAL-EVENT-0036)
- `PDF24-TXT-CAND-019` (REAL-EVENT-0037)
- `PDF24-TXT-CAND-020` (REAL-EVENT-0038)

### Excluded/low value
- `PDF24-TXT-CAND-021..025`: casos já usados (`ALREADY_IN_SAMPLE`) mantidos apenas para rastreabilidade.

## Estratégia para não virar microfase
- **A4+R-72**: extrair 10 casos P1 em lote único.
- **A4+R-73**: adjudicar os 10 casos de uma vez (AI/Author, com locks).
- **A4+R-74**: consolidar métricas e patterns dos 15 casos totais (5 legados + 10 novos).

## Dependências externas
- confirmar anchors oficiais para candidatos com `source pending`/`UNKNOWN_SOURCE_TYPE`;
- enriquecer candidatos de baixa granularidade antes de promoção a P1;
- manter trilha de source-quality explícita durante todo o Batch 2.

## A4+R-72 Update
- Batch 2 `P1` extraído em lote único.
- 10 arquivos de extração estruturada criados em `docs/sera-vnext/real-event-extractions-batch-2/`.
- Nenhuma classificação SERA executada nesta etapa.
- Próxima fase mantida: **A4+R-73 — Batch 2 AI/Author Adjudication for 10 extracted cases**.
