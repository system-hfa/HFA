# SERA Engine vNext Global Escape Point Reaudit A4R126 v0.2.0

Status: GLOBAL_ESCAPE_POINT_REAUDIT_RECORDED
Phase: A4+R-126
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: AUDIT_QUARANTINE_CLASSIFY_EXISTING_REAL_EVENT_PASSIVE

## Objective
Executar reauditoria global dos eventos reais SERA vNext existentes antes da formalizacao do gate Hendy de ponto de fuga da operacao segura.

Esta fase e auditoria, quarentena e classificacao do passivo. Ela nao reconstruiu P/O/A, nao classificou novos eventos, nao criou `releasedCode`, nao promoveu `selectedCode`, e nao abriu downstream.

## Scope
Arquivos varridos:
- `docs/sera-vnext/**`
- `tests/reports/candidates/**` somente para leitura e contagem de passivo local

Familias metodologicas auditadas:
- extracoes e adjudicacoes internas dos 30 eventos reais;
- questionPath/backfill interno;
- external Batch 1 extractions/adjudications;
- reference-case traces e dossiers canonicos;
- release pilot e author packets;
- readiness, trackers, matrizes, intakes e registros de governanca que dependem desses eventos.

Raw TXT/PDF de fonte oficial foi tratado como fonte factual, nao como artefato metodologico de classificacao.

## Hendy Definition Used
O ponto de fuga da operacao segura e o primeiro ponto na linha do tempo em que ha saida da operacao segura, marcado por ato inseguro observavel ou condicao insegura observavel.

O ponto deve ser:
- factual;
- observavel;
- ancorado em evidencia;
- vinculado a uma variavel operacional que saiu de limite seguro ou aceitavel;
- situado na trajetoria do acidente/incidente;
- contrafactualmente material para prevenir o evento ou mudar a trajetoria.

## Mandatory When Statement
Cada evento auditado agora exige `escapePointWhenStatement`.

Formato obrigatorio:

```text
Quando [ato/condicao observavel] colocou [variavel operacional controlada] fora de [limite seguro/estado esperado].
```

O campo nao pode conter causa, inferencia psicologica, julgamento interno, codigo SERA ou classificacao. Se a frase nao puder ser escrita com evidencia, o valor deve ser:

```text
ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED
```

Eventos com esse valor nao sao tratados como validados pelo gate Hendy.

A frase "Quando..." e um gate auxiliar de localizacao temporal. Ela nao substitui a definicao Hendy, o teste contrafactual, a evidencia factual, a variavel operacional controlada, o limite seguro ou a avaliacao de ator direto. Frases que dependem de causa cognitiva, julgamento interno, erro humano generico, codigo SERA ou classificacao nao validam o ponto de fuga.

## Method
1. Varrer arquivos e familias de artefatos por identificadores de evento, `proposedCode`, `releasedCode`, question paths, author approval, reference cases e release pilot.
2. Separar fonte factual, artefato metodologico e registro de governanca.
3. Deduplicar eventos ja adjudicados ou usados por artefatos dependentes.
4. Auditar o ponto de fuga sem refazer P/O/A.
5. Aplicar quarentena global a todo passivo pre-gate.
6. Classificar risco metodologico por evento e por familia de artefato.

## Quarantine Rule Applied
Todo evento real analisado antes desta fase permanece com cautela ate prova especifica contra o gate Hendy:

```text
SAFE_OPERATION_ESCAPE_POINT_NOT_AUDITED
PROPOSED_CODE_PRE_ESCAPE_POINT_GATE
NOT_FOR_RELEASE
NOT_FOR_CONSENSUS
NOT_FOR_REFERENCE_CASE
NOT_FOR_TRAINING
NOT_FOR_DOWNSTREAM
REQUIRES_ESCAPE_POINT_REAUDIT
```

Essa marcacao nao declara erro substantivo. Ela declara que o conteudo anterior ainda nao era validado pelo novo gate.

## Main Findings
- O passivo contem um conjunto misto de extracoes, adjudicacoes, backfills, reference traces, author packets e release pilots.
- A maior parte dos eventos anteriores nao contem `escapePointWhenStatement` nem separacao formal do primeiro ponto factual de fuga antes de P/O/A.
- Os backfills de questionPath continuam sendo `HELPER_TRACE_ONLY`; nao devem ser usados como caminho canonico real.
- O release pilot P-axis anterior afetou quatro eventos; tres ja tinham sido retirados por revisao autoral, e o unico mantido tambem fica em quarentena pre-gate ate reauditoria final do escape point.
- O conjunto A4R124/A4R125 ja continha disciplina explicita de ponto de fuga para seis eventos, mas o novo campo "Quando..." ainda nao existia nesses artefatos.
- Tres eventos ficam em `PASS_REQUIRES_MINOR_WORDING_FIX` porque o ponto de fuga e substancialmente definido, o P/O/A anterior parece alinhado ao recorte e o ajuste pendente e explicitar os campos Hendy novos.
- Eventos tecnicos/condition-dominant podem ter ponto de fuga factual definido, mas nao validam automaticamente um P/O/A humano causal quando nao ha ator humano direto claro.

## Escape Point When Statement Compliance
O complemento formal A4R126 adiciona o campo `escapePointWhenStatementPreviouslyExplicit` ao tracker. Como o campo obrigatorio "Quando..." foi introduzido nesta fase, nenhum evento tinha esse campo explicitamente registrado antes da reauditoria.

| complianceItem | value | effect |
|---|---:|---|
| explicitEscapePointWhenStatementAlreadyPresent | 0 | No prior artifact already had the mandatory field as such. |
| escapePointWhenStatementDefinedByReaudit | 5 | Five rows contain a factual "Quando..." statement recorded by the reaudited tracker. |
| escapePointWhenStatementUnresolved | 47 | These rows remain blocked from release/reference/consensus/training/downstream use. |
| blockedEscapePointWhenStatementUnresolved | 47 | `BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` is recorded as an overlapping gate-compliance block. |

The 47 unresolved rows retain their stronger audit decision where applicable: source partiality, direct actor uncertainty, technical/condition dominance, real-tree absence, rebuild need, P/O/A review, or superseded identity. This phase did not rebuild P/O/A and did not reclassify prior codes.

## Metrics
| metric | value |
|---|---:|
| totalFilesScanned | 638 |
| totalRelevantFiles | 406 |
| totalEventsFound | 63 |
| totalUniqueEvents | 52 |
| eventsWithPriorProposedCode | 43 |
| eventsWithPriorReleasedCode | 4 |
| eventsUsedInReferenceCases | 18 |
| eventsUsedInAuthorApproval | 10 |
| eventsUsedInQuestionPathBackfill | 30 |
| eventsUsedInReleasePilot | 4 |
| explicitEscapePointAlreadyPresent | 6 |
| explicitEscapePointWhenStatementAlreadyPresent | 0 |
| escapePointDefinedByReaudit | 5 |
| escapePointWhenStatementDefinedByReaudit | 5 |
| escapePointWhenStatementUnresolved | 47 |
| escapePointUnresolved | 47 |
| sourcePartialCount | 11 |
| conflictingSourcesCount | 2 |
| directActorUnclearCount | 7 |
| technicalDominantCount | 6 |
| conditionDominantCount | 3 |
| multiActorNotDecomposedCount | 3 |
| passRetainWithNotes | 0 |
| passRequiresMinorWordingFix | 3 |
| partialRequiresPOAReview | 14 |
| failRequiresRebuild | 4 |
| blockedSourcePartial | 11 |
| blockedDirectActorUnclear | 7 |
| blockedTechnicalOrConditionDominant | 9 |
| blockedRealTreeMissing | 3 |
| blockedEscapePointWhenStatementUnresolved | 47 |
| duplicateOrSuperseded | 1 |
| priorProposedCodesQuarantined | 43 |
| releasedCodesAffected | 4 |
| downstreamOpenedCount | 0 |

Counts for risk dimensions can overlap. The audit-decision rows in the tracker remain mutually exclusive; the when-statement block is an overlapping gate-compliance status.

## Aggregate Decisions
| auditDecision | count | effect |
|---|---:|---|
| PASS_REQUIRES_MINOR_WORDING_FIX | 3 | Retain as draft-only after adding explicit Hendy fields; no release authority. |
| PARTIAL_REQUIRES_POA_REVIEW | 14 | Escape point may be recoverable, but prior P/O/A needs focused review. |
| FAIL_REQUIRES_REBUILD | 4 | Prior analysis or historical release path should not be reused without full gate rebuild. |
| BLOCKED_SOURCE_PARTIAL | 11 | Source, identity, or timeline is insufficient for a factual "Quando..." statement. |
| BLOCKED_DIRECT_ACTOR_UNCLEAR | 7 | Direct human actor or actor split is not sufficiently clear. |
| BLOCKED_TECHNICAL_OR_CONDITION_DOMINANT | 9 | First departure is technical/condition-dominant; human P/O/A must not be forced. |
| BLOCKED_REAL_TREE_MISSING | 3 | Artifact depends on pre-canonical/helper tree material. |
| DUPLICATE_OR_SUPERSEDED | 1 | Existing row is a merged/superseded event identity. |

## When Statement Gate Decision
| gateDecision | count | effect |
|---|---:|---|
| BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | 47 | Additional gate block for all rows whose `escapePointWhenStatement` is unresolved. Existing stronger audit decisions are preserved rather than overwritten. |

## Methodological Impact
- All prior `proposedCode` values remain draft/pre-gate only.
- Historical `releasedCode` records are affected by the quarantine register; no new release is created.
- Reference-case and author-review materials remain useful as audit history, but not as consensus, training, frontend calibration, or downstream material until the escape-point gate is satisfied.
- Existing canonical-question discipline remains in force; this phase does not repair or rebuild noncanonical paths.

## Limits
- This was repository-local documentary audit, not external factual reinvestigation.
- Raw official reports were not exhaustively reread where an event was already blocked by source partiality, actor ambiguity, technical dominance, or noncanonical trace risk.
- No P/O/A rebuild was attempted.
- No new events were classified.

## Next Phase
The next phase should not expand the corpus. Choose one of:
- rebuild `FAIL_REQUIRES_REBUILD` events with the full Hendy gate;
- focused P/O/A review for `PARTIAL_REQUIRES_POA_REVIEW`;
- source enrichment for `BLOCKED_SOURCE_PARTIAL`;
- cleanup/rebuild of artifacts contaminated by helper or pre-canonical question paths.

Only after those lanes should new real-event analysis resume.
