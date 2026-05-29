# SERA Real Event Author Adjudication Pack A4R181 v0.2.0

Status: AUTHOR_ADJUDICATION_PACK_PREPARED
Phase: A4+R-181
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

A4R181 prepara uma camada de adjudicação autoral clara e revisável sobre as 24 extrações estruturadas e enriquecidas em A4R180/A4R180-b. O propósito é permitir que o autor decida caso a caso — com linguagem objetiva e dossiês curtos — sem precisar ler documentos longos.

Esta fase NÃO executa a decisão final. Ela prepara os dossiês de decisão, organiza os candidatos por batch, separa os casos prontos dos bloqueados, e formula uma pergunta simples por caso. A decisão do autor será registrada em A4R182.

## 2. Locks (esta fase não faz)

- Não fecha P, O ou A.
- Não cria selectedCode com status fechado.
- Não cria código liberado.
- Não cria fixture nem baseline.
- Não altera runner oficial, motor SERA, runtime, arquivos .ts.
- Não cria recomendações, HFACS, Risk/ERC, ARMS/ERC, finalConclusion, downstream.
- Não chama LLM/API externa.
- Não importa conclusão de relatório externo (NTSB/TSB) como código SERA.
- Não inventa fatos ausentes.
- Não transforma hipótese em classificação.

## 3. Por que o fechamento de eixo não ocorre aqui

A metodologia SERA exige que P (perception), O (objective) e A (action) sejam adjudicados pelo autor com base em evidência factual ancorada, evitando importar a probable cause externa como gabarito. Em A4R181 os campos `potentialP`, `potentialO` e `potentialA` são marcados como **hipótese de trabalho** (`HYP_*`) ou `UNKNOWN`. Nenhum é fechamento. A coluna `notFinalClassification=true` está presente em todas as 24 linhas da matriz de adjudicação. O fechamento, quando ocorrer, será objeto de fase posterior com revisão dual-autor.

## 4. Regra de ponto de fuga preservada

Conforme `SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`:
- Existe **um único** ponto de fuga (escapePointId) por escopo de análise.
- Em casos multiator, mantém-se um `escapePointId` único e separam-se as contribuições por `actorContributionId`.
- Eventos posteriores ao ponto de fuga são consequência/agravamento/recuperação — **não** criam novos pontos de fuga.
- Não se descreve o caso como tendo mais de um ponto de fuga. Quando há dúvida de escopo, formula-se como escopo próprio de ponto de fuga a ser decidido em fase futura.
- O outcome/acidente **não** é o ponto de fuga.

## 5. Estratégia de batches

| Batch | Descrição | Candidatos | Ação A4R181 |
|---|---|---|---|
| BATCH_A | Narrative sufficient / ready | 0001, 0002, 0003, 0006, 0017 | Dossiê individual + decisão direta |
| BATCH_B | Boundary / multi-actor (decisão de framing) | 0004, 0005, 0010, 0012, 0013, 0018 | Decisão de framing autoral (sem dossiê individual nesta fase) |
| BATCH_C | Duplicate consolidation | 0007+0008, 0009+0019, 0011+0016 | Consolidação obrigatória antes de decisão de eixo |
| BATCH_D | Source enrichment / repair / hold | 0014, 0015, 0020, 0021, 0022, 0023, 0024 | Adjudicação suspensa / cross-reference / ação prévia |

Ordem recomendada: BATCH_A → BATCH_B → BATCH_C → BATCH_D.

## 6. Resumo dos 24 candidatos

| ID | Evento | Batch | Status | narrativeSufficiency |
|---|---|---|---|---|
| 0001 | Asiana 214 SFO | A | READY_FOR_AUTHOR_DECISION | NARRATIVE_SUFFICIENT |
| 0002 | Comair 5191 LEX | A | READY_FOR_AUTHOR_DECISION | NARRATIVE_SUFFICIENT |
| 0003 | American 1420 LIT | A | READY_FOR_AUTHOR_DECISION | NARRATIVE_SUFFICIENT |
| 0004 | Colgan 3407 BUF | B | FRAMING_DECISION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0005 | Helios 522 | B | FRAMING_DECISION_REQUIRED | NARRATIVE_THIN_NEEDS_ENRICHMENT |
| 0006 | UPS 1354 BHM | A | READY_FOR_AUTHOR_DECISION | NARRATIVE_SUFFICIENT |
| 0007 | Atlas 3591 | C | CONSOLIDATION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0008 | Atlas 3591 (dup) | C | CONSOLIDATION_REQUIRED | SOURCE_PARTIAL_NEEDS_CAUTION |
| 0009 | US Airways 1549 | C | CONSOLIDATION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0010 | American 965 Cali | B | FRAMING_DECISION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0011 | Korean Air 801 Guam | C | CONSOLIDATION_REQUIRED | NARRATIVE_THIN_NEEDS_ENRICHMENT |
| 0012 | Bell 206L-4 Quebec | B | FRAMING_DECISION_REQUIRED | NARRATIVE_THIN_NEEDS_ENRICHMENT |
| 0013 | Bell 206B Fort McMurray | B | FRAMING_DECISION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0014 | Sikorsky S-76A | D | HOLD_REPAIR_REQUIRED | SOURCE_MISMATCH_REQUIRES_REPAIR |
| 0015 | USAir 427 | D | HOLD_BOUNDARY_REVIEW | SOURCE_PARTIAL_NEEDS_CAUTION |
| 0016 | Korean Air 801 (dup) | C | CONSOLIDATION_REQUIRED | NARRATIVE_THIN_NEEDS_ENRICHMENT |
| 0017 | United 173 PDX | A | READY_FOR_AUTHOR_DECISION | NARRATIVE_SUFFICIENT |
| 0018 | United 232 Sioux City | B | FRAMING_DECISION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0019 | US Airways 1549 (dup) | C | CONSOLIDATION_REQUIRED | NARRATIVE_SUFFICIENT |
| 0020 | REAL-EVENT-0003 Tofino | D | HOLD_UNRESOLVED | NARRATIVE_THIN_NEEDS_ENRICHMENT |
| 0021 | QuestionPath backfill | D | HOLD_CROSS_REFERENCE_ONLY | HOLD_NO_DIRECT_EVENT_SOURCE |
| 0022 | Queue B tracker | D | HOLD_CROSS_REFERENCE_ONLY | HOLD_NO_DIRECT_EVENT_SOURCE |
| 0023 | S-92A Sable Island | D | HOLD_SOURCE_ENRICHMENT_PENDING | NEEDS_SOURCE_ENRICHMENT |
| 0024 | AW139 night over-water | D | HOLD_SOURCE_ENRICHMENT_PENDING | NEEDS_SOURCE_ENRICHMENT |

## 7. Candidatos prontos para decisão autoral (dossiês criados)

Cinco candidatos BATCH_A têm dossiê individual em `author-decision-packets/`:

- A4R181-ADJ-0001 — Asiana 214 SFO
- A4R181-ADJ-0002 — Comair 5191 LEX
- A4R181-ADJ-0003 — American 1420 LIT
- A4R181-ADJ-0006 — UPS 1354 BHM
- A4R181-ADJ-0017 — United 173 PDX

Cada dossiê tem: resumo curto, narrativa do que aconteceu, ponto de fuga candidato, ator direto candidato, fatos a favor, fatos contra/limitações, alternativas, risco de overclassification, consequência se aprovado, consequência se rejeitado, e uma pergunta simples de decisão (APROVO / NÃO APROVO / PRECISO REVISAR).

## 8. Candidatos bloqueados / hold

Detalhados em `SERA_REAL_EVENT_AUTHOR_ADJUDICATION_HOLD_REGISTER_A4R181_v0.2.0.md`:

- 0014 — SOURCE_MISMATCH_REQUIRES_REPAIR (TXT companion contém evento errado).
- 0015 — TECHNICAL_DOMINANCE_BOUNDARY (boundary review técnico-vs-operador antes de trace).
- 0020 — UNRESOLVED preservado (SOURCE_PARTIAL).
- 0021 — HOLD tracker/backfill (cross-reference com 0020).
- 0022 — HOLD tracker Queue B (cross-reference com individuais).
- 0023 — NEEDS_SOURCE_ENRICHMENT (TSB A19A0055).
- 0024 — NEEDS_SOURCE_ENRICHMENT (NTSB ERA19FA210).
- Duplicatas que precisam consolidação antes de qualquer decisão dupla: 0007+0008, 0009+0019, 0011+0016.

## 9. Riscos metodológicos

1. **Outcome vs ponto de fuga**: o impacto/acidente é consequência; o ponto de fuga é a primeira deviation defensável anterior. Aplicável a todos os casos com outcome catastrófico.
2. **Negative control mal interpretado** (0009/0019, 0018): outcome bem-sucedido ou heroico não prova ausência de falha; os eixos nominais devem ser documentados explicitamente.
3. **Double-count de eixos**: o mesmo fato não deve preencher P, O e A sem racional distinta (forte em 0006, 0017).
4. **Boundary técnico vs humano**: falha técnica dominante não deve ser atribuída a operador (crítico em 0015 USAir 427; também 0003 spoiler, 0013 LTE).
5. **Multi-actor mal fundido**: não usar percepção de um ator para classificar ação de outro; manter escapePointId único com actorContributionId distintos (0004, 0007, 0010, 0018).
6. **Reframe single-pilot**: A4R179 rotulou 0012/0013 como multi-actor; operação é single-pilot — reframe necessário.
7. **Source mismatch**: 0014 não pode ser adjudicado com fonte de outro evento; risco de propagação a outros TXT companions.
8. **Reabertura de governance**: 0011/0016 Korean 801 tem P-only governance prévio (A4R109/A4R110) — respeitar ou justificar reabertura.

## 10. Próximos passos

1. Autor revisa os 5 dossiês BATCH_A e responde APROVO / NÃO APROVO / PRECISO REVISAR.
2. Decisões registradas em A4R182 (ver `SERA_A4R182_AUTHOR_DECISION_INTAKE_PLAN_v0.2.0.md`) sem fechar eixo, sem alterar runner ou baseline.
3. BATCH_B recebe decisão de framing autoral.
4. BATCH_C consolida os 3 pares de duplicatas em uma adjudicação por grupo.
5. BATCH_D aguarda ação prévia (repair de 0014, boundary review de 0015, source enrichment de 0023/0024) ou permanece hold/cross-reference (0020/0021/0022).
