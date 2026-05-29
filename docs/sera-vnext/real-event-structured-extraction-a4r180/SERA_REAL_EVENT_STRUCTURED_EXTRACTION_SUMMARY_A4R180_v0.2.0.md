# SERA Real Event Structured Extraction Summary A4R180 v0.2.0

Status: STRUCTURED_EXTRACTION_BATCH_COMPLETE
Phase: A4+R-180
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

A4R180 transformou a seleção A4R179 de 24 eventos reais em artefatos de extração estruturada e auditável, com 12 seções padronizadas por candidato, sem classificação SERA final, sem fixture, sem baseline, sem runner, sem chamada LLM/API e sem alteração de runtime/.ts/motor/release/downstream. O objetivo é preparar adjudicação metodológica autoral em A4R181.

## 2. Entradas

- A4R179 (seleção):
  - `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_REAL_EVENT_BATCH_SELECTION_MATRIX_A4R179_v0.2.0.csv` (24 linhas)
  - `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_REAL_EVENT_BATCH_SELECTION_DECISION_A4R179_v0.2.0.md`
  - `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_A4R180_STRUCTURED_EXTRACTION_PLAN_v0.2.0.md`
  - `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_REAL_EVENT_BATCH_SELECTION_RISK_REGISTER_A4R179_v0.2.0.md`
- A4R178 (inventário):
  - `docs/sera-vnext/real-event-corpus-inventory-a4r178/SERA_REAL_EVENT_CORPUS_INVENTORY_A4R178_v0.2.0.csv`
  - `docs/sera-vnext/real-event-corpus-inventory-a4r178/SERA_REAL_EVENT_CORPUS_INVENTORY_SUMMARY_A4R178_v0.2.0.md`
- A4R177 (arquitetura): `docs/sera-vnext/evidence-expansion-runner-architecture-a4r177/SERA_EVIDENCE_EXPANSION_AND_VNEXT_RUNNER_ARCHITECTURE_A4R177_v0.2.0.md`
- Fontes versionadas (source slices A4R106/A4R115/A4R119, TXT pools full/new50/recovered, reaudits, backfill, external candidates) — leitura conforme escopo permitido.

## 3. Quantidade de candidatos processados

24 candidatos A4R179 processados — 100% de cobertura.

## 4. Quantidade de extrações completas

- Extrações completas (STRUCTURED_EXTRACTION_COMPLETE): 17
- Extrações completas como duplicate consolidável: 3 (0008, 0011 cross com 0016, 0019 cross com 0009)
- Extrações holds: 4 (0014 SOURCE_PARTIAL/TXT_MISMATCH, 0015 HELD_OVERCLASSIFICATION_RISK, 0021 tracker, 0022 tracker)
- Extrações parciais NEEDS_SOURCE_ENRICHMENT: 2 (0023, 0024)

Distribuição combinada:
- Complete + adequate para A4R181: 17
- Complete duplicate consolidável: 3
- Partial (source enrichment): 2
- Hold: 4 (sendo 2 trackers/backfill conforme lane A4R179 que já marcou NOT_DIRECT_EVENT_SOURCE)

Total: 24

## 5. Quantidade de holds

- HOLD_TRACKER_ONLY: 4 (0015, 0021, 0022 + 0014 sourcePartial txt_mismatch também recai em hold operacional)
  - 0015 — USAir 427 — HELD_OVERCLASSIFICATION_RISK
  - 0021 — QUESTIONPATH-BACKFILL-BATCH2-001 — tracker
  - 0022 — QUEUE B P0 POA REVIEW TRACKER A4R129 — tracker
- HOLD_SOURCE_NOT_FOUND: 0
- SOURCE_PARTIAL (mas processado): 1 (0014 — Sikorsky S-76A — TXT mismatch)

## 6. Quantidade de source enrichment required

3 candidatos: 0014 (S-76A TXT mismatch), 0023 (EXT-001 S-92A Sable Island), 0024 (EXT-002 AW139)

## 7. Quantidade por readiness A4R181

| readiness | count | extractionIds |
|---|---:|---|
| READY_FOR_AUTHOR_ADJUDICATION | 8 | 0001, 0002, 0003, 0006, 0010, 0012, 0017, 0020 |
| READY_AS_MULTI_ACTOR_CANDIDATE | 3 | 0004, 0007, 0008 |
| READY_AS_BOUNDARY_CASE | 4 | 0005, 0011, 0016, 0018 |
| READY_AS_NEGATIVE_CONTROL_REPLICATION | 2 | 0009, 0019 |
| READY_FOR_AUTHOR_ADJUDICATION (multi-actor framing review) | 2 | 0013 (Bell 206B LTE), também 0012 já contado acima — duplicata da contagem original; 0013 sozinho aqui |
| NEEDS_SOURCE_ENRICHMENT | 3 | 0014, 0023, 0024 |
| HOLD_TRACKER_ONLY | 3 | 0015, 0021, 0022 |

Total (24): 8 + 3 + 4 + 2 + 1 + 3 + 3 = 24 ✓

(Nota: 0012 listado em "READY_FOR_AUTHOR_ADJUDICATION" não dupla-conta; 0013 entra como item próprio.)

## 8. Observações por lane

### Lane "Positive source candidates" (8 candidatos, 0001-0008)
- 7 source slices A4R106/A4R115/A4R119 com factualidade já versionada; extrações completas com confidence PARTIAL em escape point/direct actor.
- 1 candidato (0008) é PDF primário do mesmo evento Atlas Air 3591 já coberto pelo slice 0007 — consolidar em A4R181.
- 2 candidatos multi-actor (0004 Colgan, 0007 Atlas 3591) — handled como POTENCIAL_MULTI_ATOR com actorContributionId estruturados.
- 1 candidato boundary (0005 Helios) por incapacitação progressiva.

### Lane "P1 replication negative control" (1 candidato, 0009)
- US Airways 1549 (slice A4R115) tratado como negative control intencional (referência nominal, NÃO procurar falha).
- Cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 já validado em A4R173.

### Lane "Negative control candidates" (2 candidatos, 0010-0011)
- American 965 Cali (0010) — CFIT; selecionado como negative control candidate com multi-actor potential (Captain FMS + FO controles).
- Korean Air 801 (0011) — PDF do mesmo evento da slice 0016; consolidar em A4R181 como boundary case.

### Lane "Multi-actor candidates" (4 candidatos, 0012-0015)
- 0012 Bell 206L-4 Quebec CFIT — single-pilot operação; multi-actor framing requer revisão.
- 0013 Bell 206B Fort McMurray — single-pilot LTE event; multi-actor framing requer revisão.
- 0014 Sikorsky S-76A — TXT mismatch (NEEDS_SOURCE_ENRICHMENT).
- 0015 USAir 427 — HELD_OVERCLASSIFICATION_RISK por dominância de sistema rudder.

### Lane "Boundary/ambiguous candidates" (4 candidatos, 0016-0019)
- 0016 Korean 801 boundary slice — consolidar com 0011.
- 0017 United 173 — boundary attentional fixation vs action selection.
- 0018 United 232 — adversarial framing: A-axis pode ser nominal apesar de outcome catastrófico.
- 0019 US Airways 1549 full report — DUPLICATE com 0009; consolidar como negative control.

### Lane "Insufficient evidence / UNRESOLVED candidates" (1 candidato, 0020)
- REAL-EVENT-0003 (S-76C+ Tofino) — reaudit A4R139 marcou escape point como SOURCE_PARTIAL e P-axis UNRESOLVED. Selecionado para reduzir ambiguidade em A4R181.

### Lane "Tracker/backfill review candidates" (2 candidatos, 0021-0022)
- 0021 QUESTIONPATH-BACKFILL-BATCH2-001 — cross-referência a REAL-EVENT-0003.
- 0022 QUEUE_B_P0_POA_REVIEW_TRACKER_A4R129 — cross-referência a 7 eventos individuais.
- Ambos NOT_DIRECT_EVENT_SOURCE_FOR_A4R180 já marcado em A4R179.

### Lane "Source enrichment candidates" (2 candidatos, 0023-0024)
- 0023 EXT-BATCH1-EXTRACTION-001 (S-92A Sable Island TSB A19A0055) — NEEDS_SOURCE_ENRICHMENT.
- 0024 EXT-BATCH1-EXTRACTION-002 (AW139 NTSB ERA19FA210) — NEEDS_SOURCE_ENRICHMENT.

## 9. Principais incertezas

1. **TXT mismatch (0014)**: TXT companheiro do Sikorsky S-76A NEW50-29 contém conteúdo de outro evento (Cessna 172R FTW02LA122). Necessária leitura direta do PDF ou re-extração antes de A4R181. Risco: outros TXT podem ter mismatch similar — amostragem recomendada.

2. **Duplicates físicos**: 3 pares apontam para o mesmo evento físico:
   - 0007 (slice A4R119) + 0008 (PDF NEW50-1) → Atlas Air 3591
   - 0009 (slice A4R115) + 0019 (PDF AAR-10-03) → US Airways 1549 (negative control)
   - 0011 (PDF) + 0016 (slice boundary) → Korean Air 801
   - Consolidação em A4R181 essencial para evitar double-counting.

3. **Multi-actor framing review**: 0012 e 0013 são single-pilot mas selecionados como multi-actor. Lane A4R179 framing requer revisão.

4. **Escape point como zona vs momento discreto**: vários candidatos (especialmente 0005 Helios, 0020 REAL-EVENT-0003) têm degradação descrita como processo. Documentação de escape point como zona com SOURCE_PARTIAL é apropriada.

5. **Boundary técnico vs humano**: 0015 USAir 427 (rudder reversals) e 0013 Bell 206B (LTE) têm boundary entre fenômeno técnico/aerodinâmico e ação humana.

6. **Source partiality**: 6 candidatos têm sourceDirectness=SOURCE_PARTIAL: 0008, 0014, 0020, 0023, 0024 (mais a representação 0019 como duplicate).

## 10. Casos recomendados para A4R181 primeiro

Prioridade A (alta confiança, fonte direta, escape point relativamente isolável):
- 0001 ASIANA-214 — escape point gate de aproximação estabilizada
- 0002 COMAIR-5191 — runway awareness gate
- 0003 AMERICAN-1420 — aproximação final instável
- 0006 UPS-1354 — aproximação não-precisão abaixo de stabilized gate
- 0009 US-AIRWAYS-1549 — negative control replication (referência nominal)

Prioridade B (multi-actor / boundary):
- 0004 COLGAN-3407 — Captain PF + FO PM
- 0007 ATLAS-3591 — FO PF + Captain intervention (consolidar com 0008)
- 0018 UNITED-232 — adversarial framing nominal sob constraint

Prioridade C (boundary case / consolidação):
- 0017 UNITED-173 — attentional fixation
- 0011/0016 KOREAN-801 — consolidar duplicate
- 0019 USAIRWAYS-1549 DUPLICATE — consolidar com 0009

Prioridade D (unresolved / hold / source enrichment):
- 0020 REAL-EVENT-0003 — adjudicar UNRESOLVED ou propor enrichment
- 0005 HELIOS-522 — boundary capacidade/incapacitação
- 0010 AMERICAN-965 Cali — multi-actor com decisão de framing (negative control vs full positive)
- 0012, 0013 — review framing single-pilot vs multi-actor
- 0014 — corrigir TXT mismatch antes
- 0015 — boundary review técnico-vs-operador
- 0021, 0022 — não duplicar; cross-references
- 0023, 0024 — source enrichment com TSB A19A0055 e NTSB ERA19FA210

## 11. O que não foi feito

- **Não foi feito**: fechamento P/O/A, fixture, baseline, runner, smoke global, chamada LLM/API, alteração de runtime/.ts/motor SERA/release/downstream, released-code-output, finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, promoção candidate para oficial.
- **Não foi feito**: leitura direta de PDFs (apenas TXT companions ou source slices).
- **Não foi feito**: leitura completa de TXT do Korean Air 801 (apenas estrutura/índice consultada; conteúdo factual via slice A4R115).
- **Não foi feito**: git add, commit, push.

## 12. Próximo passo

A4R181 — Author Adjudication Real Event Batch (ver `SERA_A4R181_AUTHOR_ADJUDICATION_PLAN_v0.2.0.md`):
1. Consolidar duplicates (0007+0008, 0009+0019, 0011+0016) em adjudicações únicas.
2. Resolver TXT mismatch do 0014 (Sikorsky S-76A) por leitura direta do PDF ou re-extração.
3. Decidir framing multi-actor de 0012, 0013 (single-pilot vs multi-actor com contexto operacional).
4. Adjudicar UNRESOLVED candidate (0020) e holds (0015).
5. Source enrichment para 0023, 0024 antes de adjudicação.
6. Para os 8 READY_FOR_AUTHOR_ADJUDICATION primários: produzir draft P/O/A com locks (NOT_FINAL_P_O_A até dual-author confirmation).
