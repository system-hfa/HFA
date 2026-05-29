# SERA A4R181 Author Adjudication Real Event Batch — Plan v0.2.0

Status: PLAN_DRAFT
Phase: A4+R-181 (planejada)
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A_WITHOUT_AUTHOR_REVIEW, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

A4R181 — Author Adjudication Real Event Batch — submete as 24 extrações estruturadas de A4R180 a adjudicação metodológica autoral, para confirmar/refinar escape point, direct actor, multi-actor handling, negative control replication, hold handling e source enrichment, sem fechamento P/O/A sem revisão dual-autor e sem promoção para fixture/baseline.

## 2. Princípios metodológicos

- Sempre usar a terminologia SERA correta.
- Não fechar P/O/A em A4R181 isoladamente; A4R181 produz **draft autoral** com locks NOT_FINAL_P_O_A até dual-author confirmation em fase posterior.
- Não usar selectedCode com status fechado.
- Não usar released code SERA.
- Não criar fixture ou baseline.
- Não chamar LLM/API; adjudicação é tarefa autoral humana documentada.
- Multi-actor: um único `escapePointId` com múltiplos `actorContributionId`.
- Slice parcial: registrar `SOURCE_PARTIAL`.
- Sem fonte primária suficiente: registrar `SOURCE_ENRICHMENT_REQUIRED`.
- Tracker/backfill: registrar `NOT_DIRECT_EVENT_SOURCE` e cross-referenciar evento original.

## 3. Critérios para adjudicação

Para cada extração A4R180 elegível, o autor responde:

### 3.1 Escape point
- O escape point candidato é defensável como momento discreto OU zona com SOURCE_PARTIAL declarado?
- O statement segue o template "Quando, [contexto/condição], [estado inseguro] [excedeu/saiu] [limite/envelope esperado]"?
- A primeira deviation factual está isolada e separada de pre-escape context e post-escape consequences?
- O escape point evita confundir outcome/acidente com first departure?
- NÃO criar múltiplos escape points para o mesmo escopo (single escape point com actorContributionId quando multi-actor).

### 3.2 Direct actor
- O direct actor está identificado factualmente (papel + evidência)?
- Para single-pilot operação: confirmar direct actor único.
- Para multi-actor: definir escapePointId único + actorContributionId distintos.
- Para operação com falha técnica dominante: avaliar boundary técnico-vs-operador.

### 3.3 P/O/A draft
- O draft P, O, A é proposto **apenas como hipótese autoral, NÃO fechamento de código**?
- Cada axis tem racional separada e não double-counta o mesmo fato?
- UNRESOLVED é aceitável e preferível a fechamento prematuro.
- Cada draft P/O/A tem lock `NOT_FINAL_P_O_A_WITHOUT_DUAL_AUTHOR_REVIEW`.

### 3.4 Evidence anchoring
- Cada axis tem `sourceAnchor` específico (linhas/seção/CVR timestamp)?
- Citações quarentenam probable cause/findings/recommendations/HFACS/Risk/ERC?
- Paráfrase preferida; citação curta apenas quando útil.

### 3.5 Uncertainty registration
- Incertezas estão listadas explicitamente (ambiguidade, SOURCE_PARTIAL, multi-actor boundary)?
- Informação explicitamente excluída está registrada?

## 4. Perguntas que o autor deve responder por extração

1. O escape point é defensável como momento ou zona?
2. O direct actor é claro? Multi-actor é apropriado?
3. Qual draft P/O/A propor (ou UNRESOLVED)?
4. Que evidência factual ancora cada axis?
5. Que incertezas e exclusões devem ser registradas?
6. Esta extração deve ser consolidada com outra (duplicate)?
7. Esta extração precisa de source enrichment antes de adjudicação?
8. Esta extração deve permanecer HOLD?

## 5. Como lidar com negative controls (0009, 0019)

- Não procurar código de falha; documentar trajetória canônica nominal de P, O, A.
- Outcome (ditching bem-sucedido) NÃO é prova de "sem falha" — cada axis deve ser documentada explicitamente.
- Cross-referenciar com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 (já validado A4R173) — mas NÃO criar nova fixture nesta fase.
- Consolidar 0009 (slice) + 0019 (PDF full) como UMA adjudicação negative control.

## 6. Como lidar com multi-actor (0004, 0007, 0008, 0010, 0018)

- Single `escapePointId` com múltiplos `actorContributionId` distintos.
- Cada `actorContributionId` tem papel, contribuição, evidência específica.
- Para 0007+0008 (Atlas 3591): consolidar; um único escape point físico, atores PF (FO inputs nose-down) e Captain (intervention tardia).
- Para 0010 (American 965 Cali): Captain (FMS/decisão) + FO (controles); pode também ser tratado como negative control candidate dependendo de adjudicação.
- Revisar 0012, 0013 (single-pilot) — provavelmente reframe como single-actor com contexto operacional (não multi-actor formal).

## 7. Como lidar com holds (0015, 0021, 0022)

- 0015 USAir 427 — boundary review técnico-vs-operador dedicada antes de qualquer trace draft. Documentar HOLD_OVERCLASSIFICATION_RISK como decisão autoral consciente.
- 0021 QUESTIONPATH-BACKFILL-BATCH2-001 — NÃO duplicar adjudicação; cross-referência com 0020 (REAL-EVENT-0003).
- 0022 QUEUE_B tracker — NÃO duplicar adjudicação; cross-referência com extrações individuais.

## 8. Como lidar com source enrichment (0014, 0023, 0024)

- 0014 Sikorsky S-76A — corrigir TXT mismatch:
  - Opção 1: leitura direta do PDF NEW50-29.
  - Opção 2: re-extrair TXT do PDF.
  - Antes da correção, adjudicação está suspensa.
- 0023 EXT-001 S-92A Sable Island — leitura direta de TSB A19A0055 (URL acessada no artifact original).
- 0024 EXT-002 AW139 — leitura direta de NTSB ERA19FA210 (URL acessada).
- Após source enrichment, retornar à Tarefa 6 do A4R181 (adjudicação completa).

## 9. Como lidar com duplicates

Três pares apontam para o mesmo evento físico:
- 0007 + 0008 → Atlas Air 3591 — consolidar em UMA adjudicação multi-actor.
- 0009 + 0019 → US Airways 1549 — consolidar em UMA adjudicação negative control replication.
- 0011 + 0016 → Korean Air 801 — consolidar em UMA adjudicação boundary case.

Em A4R181 produzir documento de consolidação que mapeie extractionIds A4R180 → eventoId único e adjudicaçãoId única.

## 10. Como lidar com unresolved (0020) e boundary cases (0005, 0017, 0018)

- 0020 REAL-EVENT-0003 — manter UNRESOLVED como decisão autoral defensável dado SOURCE_PARTIAL e escape point como zona. Documentar racional explícita.
- 0005 HELIOS-522 — boundary capacidade/incapacitação; adjudicar com escopo de actor/capability decision dedicado.
- 0017 UNITED-173 — boundary attentional fixation vs action selection adequacy.
- 0018 UNITED-232 — adversarial framing: A-axis pode ser nominal apesar de outcome catastrófico.

## 11. Proibições

- NÃO criar fixture em A4R181.
- NÃO criar baseline em A4R181.
- NÃO promover candidate para official runner em A4R181.
- NÃO fechar P/O/A em A4R181 sem revisão dual-autor em fase posterior.
- NÃO alterar runtime, .ts, motor SERA, frontend/backend.
- NÃO chamar LLM/API.
- NÃO commitar/push sem autorização.

## 12. Entregáveis previstos de A4R181

- 24 adjudicações autorais (com algumas consolidadas em duplicates).
- Documento de consolidação de duplicates (3 pares).
- Matriz de adjudicação A4R181 (CSV) com colunas: adjudicationId, extractionIds, eventoId, escapePointFinal, directActorFinal, multiActorContributions, draftP, draftO, draftA, draftConfidence, unresolved, holdReason, sourceEnrichmentPerformed, nextStep.
- Summary de adjudicação A4R181.
- Plan A4R182 — Fixture Candidate Promotion Review (próxima fase após adjudicação consolidada).
- Log A4R181 com comandos, leituras, source enrichment realizado, decisões autorais.

## 13. Critério de conclusão de A4R181

A4R181 conclui quando:
- Todas as 24 extrações A4R180 têm um status final: ADJUDICATED, HOLD com racional, ou SOURCE_ENRICHMENT_PENDING com plano explícito.
- Duplicates estão consolidados.
- Source enrichment necessário foi executado ou explicitamente postponed.
- Drafts P/O/A têm lock NOT_FINAL_P_O_A.
- Sem alteração de fixtures/baseline/runner.

## 14. Ordem recomendada de adjudicação (A4R180-b enrichment)

A4R180-b classificou cada extração por `narrativeSufficiency` e atribuiu `recommendedA4R181Handling`. A ordem recomendada por batches:

Nota de governança: A matriz complementar `SERA_REAL_EVENT_STRUCTURED_EXTRACTION_ENRICHMENT_MATRIX_A4R180B_v0.2.0.csv` é a fonte operacional para roteamento, readiness e ordem de adjudicação em A4R181. A matriz original A4R180 permanece preservada apenas como artefato histórico/auditável da primeira extração e não deve ser usada isoladamente para decidir readiness, negative-control handling, duplicate consolidation ou boundary routing.

### BATCH A — Narrative sufficient / ready (adjudicação direta)
Candidatos com narrativa-base sólida; adjudicação autoral pode prosseguir sem source enrichment adicional. Trabalhar primeiro:
- A4R180-EXTRACTION-0001 — Asiana 214 SFO (P partial + A partial; gate de aproximação estabilizada)
- A4R180-EXTRACTION-0002 — Comair 5191 LEX (runway awareness; EP1/EP2/EP3)
- A4R180-EXTRACTION-0003 — American 1420 LIT (windshear + spoiler boundary)
- A4R180-EXTRACTION-0006 — UPS 1354 BHM (nonprecision approach)
- A4R180-EXTRACTION-0017 — United 173 PDX (attentional fixation + fuel)

### BATCH B — Boundary / multi-actor (decisão de framing)
Candidatos com framing especial; adjudicação requer decisão autoral explícita de boundary:
- A4R180-EXTRACTION-0004 — Colgan 3407 (multi-actor CPT + FO)
- A4R180-EXTRACTION-0007 — Atlas 3591 (multi-actor FO + CPT) — consolidar com 0008 em BATCH C
- A4R180-EXTRACTION-0005 — Helios 522 (boundary capability/incapacitação)
- A4R180-EXTRACTION-0010 — American 965 Cali (RECLASSIFY de negative control para multi-actor)
- A4R180-EXTRACTION-0012 — Bell 206L-4 Quebec (REFRAME multi-actor → single-pilot boundary)
- A4R180-EXTRACTION-0013 — Bell 206B Fort McMurray (REFRAME multi-actor → single-pilot LTE technical boundary)
- A4R180-EXTRACTION-0018 — United 232 (boundary adversarial — A nominal apesar de outcome catastrófico)

### BATCH C — Duplicate consolidation
3 grupos de duplicates. UMA adjudicação por grupo:
- Atlas 3591: A4R180-EXTRACTION-0007 + 0008 → consolidação multi-actor
- US Airways 1549: A4R180-EXTRACTION-0009 + 0019 → consolidação negative control replication
- Korean Air 801: A4R180-EXTRACTION-0011 + 0016 → consolidação boundary review (respeitar ou justificar reabertura de A4R109/A4R110 P-only)

### BATCH D — Source enrichment / repair / hold (adjudicação suspensa ou cross-reference)
- A4R180-EXTRACTION-0014 — Sikorsky S-76A: REPAIR_BEFORE_ADJUDICATION (TXT mismatch — ler PDF NEW50-29 ou re-extrair)
- A4R180-EXTRACTION-0015 — USAir 427: TECHNICAL_DOMINANCE_BOUNDARY_REVIEW (boundary review técnico-vs-operador formal antes de qualquer trace)
- A4R180-EXTRACTION-0020 — REAL-EVENT-0003: UNRESOLVED_CANDIDATE (manter UNRESOLVED ou propor source enrichment dedicado)
- A4R180-EXTRACTION-0021 — QuestionPath backfill: HOLD_CROSS_REFERENCE_ONLY (consolidar com 0020)
- A4R180-EXTRACTION-0022 — Queue B tracker: HOLD_CROSS_REFERENCE_ONLY (cross-references com individuais)
- A4R180-EXTRACTION-0023 — S-92A Sable Island: SOURCE_ENRICHMENT_PENDING (ler TSB A19A0055)
- A4R180-EXTRACTION-0024 — AW139 night over-water: SOURCE_ENRICHMENT_PENDING (ler NTSB ERA19FA210)

### Critério de ordem
BATCH A primeiro (alta confiança, narrativa sólida). BATCH B depois (decisões de framing). BATCH C consolida duplicates (evita work em paralelo no mesmo evento físico). BATCH D fica para o final ou requer ação prévia (repair, source enrichment, boundary review formal).
