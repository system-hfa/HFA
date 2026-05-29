# SERA Real Event Structured Extraction Enrichment Summary A4R180-b v0.2.0

Status: STRUCTURED_EXTRACTION_ENRICHMENT_COMPLETE
Phase: A4+R-180-b
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo da correção

A revisão metodológica pós-A4R180 indicou que as extrações originais, embora estruturalmente válidas, careciam de **densidade narrativa factual** suficiente para sustentar adjudicação SERA em A4R181. Ponto de fuga, ator direto e fronteira técnico/humano dependem de contexto operacional e sequência factual densos. A4R180-b adiciona cinco seções a cada extração existente (operational narrative, source-grounded event sequence, human/technical boundary notes, escape point context, evidence sufficiency assessment) e produz matriz complementar de avaliação, sem alterar matriz/log/plano originais e sem fechamento SERA.

## 2. Por que A4R180 original estava insuficiente

As 24 extrações originais focaram em estrutura (12 seções padronizadas) mas:
- Operational narrative era ausente — apenas resumo factual ≤1 parágrafo.
- Source-grounded event sequence reaproveitava timeline curto sem expansão.
- Não havia separação explícita entre technical/environmental facts, human actions e human-inference cautions.
- Escape point context era frase isolada — sem racional defensável de "por que é zona vs momento".
- Evidence sufficiency não era avaliada explicitamente (narrative + source + confidence + missing items).

Isso criava risco em A4R181: adjudicação autoral sem narrativa-base sólida tende a importar análise NTSB/TSB como código SERA ou confundir outcome com escape point.

## 3. Quantas extrações foram enriquecidas

24 / 24 (100%) receberam seções 13-17. Densidade real varia conforme suficiência da fonte:

- **Narrativa rica (3-8 parágrafos com timeline operacional completo)**: 12 (0001, 0002, 0003, 0004, 0006, 0007, 0009, 0010, 0013, 0017, 0018, 0019)
- **Narrativa moderada (cross-referência a duplicate ou source partial)**: 5 (0005, 0008, 0011, 0012, 0016)
- **Narrativa mínima por regra metodológica (HOLD/mismatch)**: 7 (0014, 0015, 0020, 0021, 0022, 0023, 0024)

## 4. Quantas ficaram narrative sufficient

12 com `narrativeSufficiency=NARRATIVE_SUFFICIENT`:
0001, 0002, 0003, 0004, 0006, 0007, 0009, 0010, 0013, 0017, 0018, 0019.

## 5. Quantas ficaram thin/partial/hold/mismatch

| narrativeSufficiency | count | extractionIds |
|---|---:|---|
| NARRATIVE_SUFFICIENT | 12 | 0001, 0002, 0003, 0004, 0006, 0007, 0009, 0010, 0013, 0017, 0018, 0019 |
| NARRATIVE_THIN_NEEDS_ENRICHMENT | 5 | 0005, 0011, 0012, 0016, 0020 |
| SOURCE_PARTIAL_NEEDS_CAUTION | 2 | 0008, 0015 |
| SOURCE_MISMATCH_REQUIRES_REPAIR | 1 | 0014 |
| HOLD_NO_DIRECT_EVENT_SOURCE | 2 | 0021, 0022 |
| NEEDS_SOURCE_ENRICHMENT | 2 | 0023, 0024 |

Total: 12+5+2+1+2+2 = 24. Esta distribuição está alinhada à matriz complementar CSV A4R180-b, que permanece como fonte canônica.

## 6. Duplicatas

3 duplicate groups identificados:
- **DUPLICATE_GROUP_ATLAS_3591**: 0007 (slice A4R119) + 0008 (PDF NEW50-1) → mesmo evento físico Atlas Air 3591.
- **DUPLICATE_GROUP_US_AIRWAYS_1549**: 0009 (slice A4R115) + 0019 (PDF AAR-10-03) → mesmo evento físico US Airways 1549.
- **DUPLICATE_GROUP_KOREAN_801**: 0011 (PDF) + 0016 (slice boundary A4R115) → mesmo evento físico Korean Air 801.

Para A4R181, consolidação em UMA adjudicação por grupo é obrigatória. Cada extração no grupo registra explicitamente cross-reference à outra.

## 7. Negative controls

2 extrações com `negativeControlReplication=true`:
- 0009 — US Airways 1549 (slice A4R115)
- 0019 — US Airways 1549 (PDF AAR-10-03 duplicate)

Cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 (já validado A4R173). Framing: trace deve documentar P, O, A canônicos NOMINAIS — outcome bem-sucedido (ditching) NÃO é prova de "ausência de falha".

A4R179 selecionou 0010 (American 965 Cali) também sob lane "Negative control candidates", mas evidência factual NÃO sustenta esse framing. A4R180-b corrigiu: `negativeControlHandled=false` para 0010; recommendedA4R181Handling = BATCH_B_MULTI_ACTOR_RECLASSIFY.

## 8. Boundary cases

7 extrações com `boundaryFlag=true`:
- 0005 — Helios 522 (boundary capability/incapacitação)
- 0011 — Korean 801 (boundary P-only governance prévia)
- 0012 — Bell 206L-4 Quebec (boundary flat light single-pilot)
- 0013 — Bell 206B Fort McMurray (boundary LTE técnico)
- 0015 — USAir 427 (boundary técnico dominance — PCU rudder)
- 0016 — Korean 801 boundary slice (mesma boundary que 0011)
- 0018 — United 232 (boundary adversarial — A-axis nominal apesar de outcome catastrófico)

## 9. Multiator

5 extrações com `multiActorReviewNeeded=true`:
- 0004 — Colgan 3407: Captain (PF aft column) + FO (PM flap retraction)
- 0007/0008 — Atlas 3591: FO (PF nose-down inputs) + Captain (PM intervention) — consolidado
- 0010 — American 965 Cali: Captain (FMS/decisão) + FO (controles) + ATC (oferecimento tardio)
- 0017 — United 173: Captain (decision) + FO (PF) + FE (fuel monitor)
- 0018 — United 232: Captain + FO + FE + Check Airman (off-duty integrado)

Lane A4R179 selecionou também 0012 e 0013 como multi-actor, mas a4r180-b reframed para single-pilot boundary (operações single-pilot; multi-actor framing não defensável).

## 10. Casos que não devem ir para adjudicação ainda

7 candidatos com `readyForA4R181AfterEnrichment=false` ou que requerem ação pré-adjudicação:

- **0014 (Sikorsky S-76A)**: SOURCE_MISMATCH_REQUIRES_REPAIR — TXT companion contém Cessna 172R FTW02LA122, evento distinto. Adjudicação suspensa até reparo de fonte (PDF read ou re-extração TXT).
- **0015 (USAir 427)**: TECHNICAL_DOMINANCE_BOUNDARY — boundary review técnico-vs-operador formal requerida antes de qualquer trace draft.
- **0021 (QuestionPath backfill)**: HOLD_NO_DIRECT_EVENT_SOURCE — tracker; cross-reference com 0020 obrigatória; não adjudicar separadamente.
- **0022 (Queue B tracker)**: HOLD_NO_DIRECT_EVENT_SOURCE — tracker; cross-references com extrações individuais; não adjudicar separadamente.
- **0023 (S-92A Sable Island)**: NEEDS_SOURCE_ENRICHMENT — leitura direta de TSB A19A0055 requerida.
- **0024 (AW139 night over-water)**: NEEDS_SOURCE_ENRICHMENT — leitura direta de NTSB ERA19FA210 requerida.

## 11. Como isso afeta A4R181

A4R181 (plano atualizado em `SERA_A4R181_AUTHOR_ADJUDICATION_PLAN_v0.2.0.md`) reorganiza adjudicação em quatro batches sequenciais:

Nota de governança: A matriz complementar `SERA_REAL_EVENT_STRUCTURED_EXTRACTION_ENRICHMENT_MATRIX_A4R180B_v0.2.0.csv` é a fonte operacional para roteamento, readiness e ordem de adjudicação em A4R181. A matriz original A4R180 permanece preservada apenas como artefato histórico/auditável da primeira extração e não deve ser usada isoladamente para decidir readiness, negative-control handling, duplicate consolidation ou boundary routing.

- **BATCH A — Narrative sufficient / ready**: 5 candidatos prioritários (0001, 0002, 0003, 0006, 0017). Adjudicação direta com narrativa-base sólida.
- **BATCH B — Boundary / multi-actor**: 7 candidatos com framing especial (0004, 0005, 0010, 0012, 0013, 0018, + 0007 multi-actor). Adjudicação com decisão de framing autoral explícita.
- **BATCH C — Duplicate consolidation**: 3 grupos de duplicates (Atlas 3591: 0007+0008; US Airways 1549: 0009+0019; Korean 801: 0011+0016). Uma adjudicação consolidada por grupo.
- **BATCH D — Source enrichment / repair / hold**: 6 candidatos (0014 repair, 0015 boundary review, 0020 UNRESOLVED, 0021/0022 holds cross-reference, 0023/0024 source enrichment). Adjudicação suspensa ou cross-reference only.

## 12. O que não foi feito

- **Não foi feito**: fechamento P/O/A, fixture, baseline, runner, alteração de motor SERA/release/downstream, chamada LLM/API, leitura direta de PDFs nesta fase, source enrichment de fontes externas para 0023/0024, reparo do TXT mismatch de 0014.
- **Não foi feito**: alteração de matriz/summary/log A4R180 originais (preservados); matriz complementar A4R180-b adicionada como novo artifact.
- **Não foi feito**: git add, commit, push.
