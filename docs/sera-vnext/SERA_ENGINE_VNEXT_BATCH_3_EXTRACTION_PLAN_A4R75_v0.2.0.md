# SERA Engine vNext Batch 3 Extraction Plan A4R75 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-75  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Transformar os 15 casos selecionados em uma rodada única de extração estruturada (`Batch 3`) sem classificação SERA nesta etapa.

## Lista dos 15 casos selecionados
- A4R75-B3-001 — REAL-EVENT-0014 (alias REAL-EVENT-0030) — BHS S-76 Roncador post-takeoff ditching
- A4R75-B3-002 — NEW-TXT-EVT-N56RD — S-76B Gulf of Mexico forced ditching
- A4R75-B3-003 — NEW-TXT-EVT-D-HHNH — S-76B low-viz low-altitude excursion
- A4R75-B3-004 — NEW-TXT-EVT-G-BHYB — S-76A Fulmar night near-sea impact
- A4R75-B3-005 — NEW-TXT-EVT-HL9294 — S-76C++ Gangnam CFIT
- A4R75-B3-006 — NEW-TXT-EVT-PR-CHI — S-76C++ helideck heave/pitch/roll mismatch
- A4R75-B3-007 — NEW-TXT-EVT-N200BK — A109E rooftop impact
- A4R75-B3-008 — NEW-TXT-EVT-N109W — A109A II mountain CFIT
- A4R75-B3-009 — NEW-TXT-EVT-N11NM — AW109S night IMC missed-approach LOC
- A4R75-B3-010 — NEW-TXT-EVT-N127LN — AS350B2 fatigue LOC-I
- A4R75-B3-011 — NEW-TXT-EVT-N120HH — Bell 407 uncontained engine failure
- A4R75-B3-012 — NEW-TXT-EVT-N525TA — Bell 525 flight-test vibration breakup
- A4R75-B3-013 — NEW-TXT-EVT-BS211-Q400 — US-Bangla BS211 unstable approach sequence
- A4R75-B3-014 — REAL-EVENT-0032 — A320 G-EZWM correspondence triage
- A4R75-B3-015 — REAL-EVENT-0033 — B737 EI-EFB correspondence triage

## Campos de extração a usar
- `extractionId`
- `batchId`
- `sourceCandidateId`
- `originalRealEventId`
- `sourceDocument`
- `sourceLocator`
- `shortLabel`
- `aircraftOperation`
- `eventType`
- `sourceType`
- `extractionConfidence`
- `anchorQuality`
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
- `sourceEnrichmentNeeded`
- `nextStepRecommendation`

## Guardrails
- sem classificação SERA nesta extração;
- sem `proposedCode`;
- sem `releasedCode`;
- sem `finalConclusion`;
- sem HFACS/Risk/ERC;
- sem recommendations;
- sem fixture/baseline;
- sem downstream.

## Estratégia para não virar microfase
- **A4+R-76:** extrair os 15 casos de uma vez (`Batch 3`).
- **A4+R-77:** adjudicar os 15 casos de uma vez (AI/Author draft).
- **A4+R-78:** consolidar métricas e padrões dos 30 eventos totais.

## Sequenciamento operacional proposto para A4+R-76
1. Validar anchors por caso (`rg` + locator mínimo).  
2. Executar extração factual neutra em lote único.  
3. Marcar `sourceEnrichmentNeeded` por caso quando houver lacuna de identidade/cronologia.  
4. Fechar summary único do Batch 3 com distribuição e lacunas.

## Confirmação metodológica
- `O-E = NON_EXISTENT_IN_SERA_PT_V1` permanece guardrail negativo/adversarial e não é código ativo.
- Esta fase e a próxima (`A4+R-76`) não executam classificação causal.

## A4+R-76 Update
- Batch 3 extraído em lote único com 15 arquivos em `docs/sera-vnext/real-event-extractions-batch-3/`.
- Nenhuma classificação SERA executada durante a extração.
- Nenhum `proposedCode` ou `releasedCode` criado.
- Nenhum downstream aberto.
- Próxima fase recomendada: **A4+R-77 — Batch 3 AI/Author Adjudication for 15 extracted cases**.
