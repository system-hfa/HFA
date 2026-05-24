# SERA Engine vNext Real Event Sample Expansion Plan A4R71 v0.2.0

Status: DRAFT_FOR_REVIEW  
NO_CLASSIFICATION  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Definir a transição do inventário PDF24 para uma nova rodada controlada de extração estruturada, mantendo separação entre fatos e hipótese metodológica e sem executar classificação SERA nesta fase.

## Tamanho recomendado da amostra
- Próxima extração: 10 casos `P1`.
- Backlog: 10–20 casos `P2/P3`.

## Próxima rodada proposta
- **A4+R-72 — Structured Extraction Batch 2 from PDF24 Corpus**.

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
### Batch 2 P1 — extrair agora
- `PDF24-CAND-001` (REAL-EVENT-0003)
- `PDF24-CAND-002` (REAL-EVENT-0005)
- `PDF24-CAND-006` (REAL-EVENT-0010)
- `PDF24-CAND-008` (REAL-EVENT-0013)
- `PDF24-CAND-010` (REAL-EVENT-0015)
- `PDF24-CAND-011` (REAL-EVENT-0016)
- `PDF24-CAND-003` (REAL-EVENT-0007)
- `PDF24-CAND-004` (REAL-EVENT-0008)
- `PDF24-CAND-005` (REAL-EVENT-0009)
- `PDF24-CAND-007` (REAL-EVENT-0011)

### Batch 2 P2 — backlog próximo
- `PDF24-CAND-009` (REAL-EVENT-0014)
- `PDF24-CAND-012` (REAL-EVENT-0017)
- `PDF24-CAND-013` (REAL-EVENT-0018)
- `PDF24-CAND-014` (REAL-EVENT-0019)
- `PDF24-CAND-015` (REAL-EVENT-0020)

### Source enrichment only
- `PDF24-CAND-016` (REAL-EVENT-0036)
- `PDF24-CAND-017` (REAL-EVENT-0037)
- `PDF24-CAND-018` (REAL-EVENT-0038)
- `PDF24-CAND-019` (REAL-EVENT-0039)

### Excluded/low value
- `PDF24-CAND-020` (REAL-EVENT-0040): manter para trilha de insuficiência de evidência e guardrails de recusa, sem prioridade de extração factual rica.

## O que depende de fonte externa
- localizar/confirmar anchors oficiais para candidatos com `source pending`/`UNKNOWN_SOURCE_TYPE`;
- validar locator primário nos casos de correspondência AAIB com detalhe factual baixo;
- enriquecer placeholders 0036–0040 antes de qualquer extração substantiva.

## O que pode ser executado localmente
- iniciar Batch 2 com 10 casos P1 já indexados;
- registrar incerteza de origem e qualidade por caso desde a extração;
- manter rastreabilidade `alreadyInSample` para evitar duplicação dos 5 casos legados.
