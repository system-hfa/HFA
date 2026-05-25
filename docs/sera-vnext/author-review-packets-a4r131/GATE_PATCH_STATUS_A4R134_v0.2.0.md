# Gate Patch Status A4R134 v0.2.0

Status: GATE_PATCH_STATUS_RECORDED
Phase: A4+R-134
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective
Consolidate the gate patch status for BS211-Q400 and A4R87-EXT-002 after A4R134, alongside the unchanged status of the other three A4R131 events.

## Gate Patch Summary Table

| eventId | priorStatus (A4R133) | priorWhenStatement | issue | revisedWhenStatementCandidate | patchStatus | poaStatus | quarantineStatus | nextAction |
|---|---|---|---|---|---|---|---|---|
| BS211-Q400 | NOT_APPROVED_REQUIRES_REBUILD | Quando a aeronave prosseguiu fora da trajetoria/downwind atribuida e em aproximacao instavel, colocou a estabilidade da aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada. | "fora da trajetoria/downwind atribuida" embeds violation language; combines two distinct acts; pre-determines O-C | Quando a aproximacao prosseguiu com perda de estabilidade e desalinhamento de pista apos o contexto de sequenciamento ATC, colocou o perfil de aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada. | PATCHED_GATE_DRAFT_NOT_APPROVED | NOT_REVIEWED_IN_THIS_PHASE — P-H/O-C/A-F A4R130 drafts mantidos sem aprovacao | REMAINS_IN_QUARANTINE | AUTHOR_REVIEW_AFTER_GATE_PATCH |
| A4R87-EXT-002 | REQUIRES_ESCAPE_POINT_PATCH | Quando o voo noturno sobre agua desceu em perfil degradado com multiplos alertas EGPWS ativos, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado. | "multiplos alertas EGPWS ativos" usado como marcador temporal; EGPWS e consequencia da saida, nao a saida em si | Quando o voo noturno sobre agua desceu para um perfil de altitude degradado com separacao vertical reduzida, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado. | PATCHED_GATE_DRAFT_NOT_APPROVED | NOT_REVIEWED_IN_THIS_PHASE — P-G/UNRESOLVED/UNRESOLVED A4R130 drafts mantidos sem aprovacao | REMAINS_IN_QUARANTINE | AUTHOR_REVIEW_AFTER_GATE_PATCH |

## Patched Events Detail

### BS211-Q400 — PATCHED_GATE_DRAFT_NOT_APPROVED
- priorWhenStatement: "fora da trajetoria/downwind atribuida" (violation language).
- revisedWhenStatement: "com perda de estabilidade e desalinhamento de pista" (observable degradation, no violation).
- unsafeActOrCondition: aproximacao perdeu estabilidade e alinhamento apos contexto de sequenciamento ATC.
- controlledVariable: estabilidade da aproximacao e alinhamento de pista.
- safeLimit: reentrada estabilizada com alinhamento mantido ou aproximacao descontinuada com margem segura.
- evidence: A4R76-B3-013 extraction; A4R77 adjudication; A4R104 EV-002 to EV-007; A4R130 whyFirstDeparture.
- temporalConfidence: MEDIUM.
- O-C e A-F permanecem drafts de alto risco, nao aprovados.

### A4R87-EXT-002 — PATCHED_GATE_DRAFT_NOT_APPROVED
- priorWhenStatement: "multiplos alertas EGPWS ativos" (warning as temporal marker).
- revisedWhenStatement: "perfil de altitude degradado com separacao vertical reduzida" (profile degradation before warnings).
- unsafeActOrCondition: voo noturno entrou em perfil de descida com altitude degradada e separacao reduzida, ativando alertas EGPWS como consequencia.
- controlledVariable: separacao vertical sobre agua, altitude path e perfil de voo monitorado.
- safeLimit: perfil noturno monitorado mantendo separacao segura com recuperacao tempestiva antes de ativacao de alertas.
- evidence: EXT-BATCH1-EXTRACTION-002; EXT-BATCH1-ADJUDICATION-002; A4R104 EV-001 to EV-007; A4R130 whyFirstDeparture.
- temporalConfidence: MEDIUM — A4R130 explicita que degradacao precedeu os alertas.
- EGPWS chronology permanece valida como evidencia/anchor, nao como primeira saida.

## Unchanged Events (from A4R133)

| eventId | status | P | O | A | quarantineStatus | nextAction |
|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | AUTHOR_APPROVED_DRAFT_PARTIAL | P-G approved | O-A approved | UNRESOLVED | PARTIAL_EXIT — P-G/O-A only | FUTURE_RELEASE_GOVERNANCE |
| REAL-EVENT-0016 | AUTHOR_REVIEW_PENDING | P-C vs P-G boundary | O-A plausible | UNRESOLVED | NOT_EXITED | COLLECT_AUTHOR_DECISION |
| ASIANA-214 | AUTHOR_REVIEW_PENDING | P-G strong | O-D threshold | A-F vs A-E boundary | NOT_EXITED | COLLECT_AUTHOR_DECISION |

## Exclusions
| eventId | reason | status |
|---|---|---|
| AMERICAN-965 | source-enrichment lane | NOT_PROCESSED |
| COMAIR-5191 | source-enrichment lane | NOT_PROCESSED |

## Locks Preserved
- NO_NEW_AUTHOR_DECISION in this phase.
- NO_RELEASED_CODE for all 5 events.
- NO_DOWNSTREAM for all 5 events.
- No P/O/A change from A4R130/A4R131/A4R133.
- No source enrichment performed.
- No processing of AMERICAN-965 or COMAIR-5191.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline or code changes.

## Metrics
| metric | value |
|---|---:|
| eventsProcessedForGatePatch | 2 |
| gatePatchDraftedCount | 2 |
| gateRebuildIncompleteCount | 0 |
| escapePointSourceInsufficientCount | 0 |
| poaReviewedCount | 0 |
| authorDecisionRecordedCount | 0 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |

## Next Steps
1. Author reviews the gate patch for BS211-Q400 and A4R87-EXT-002.
2. If gates accepted: proceed to P/O/A author review for both.
3. If gates rejected: mark GATE_REBUILD_INCOMPLETE or ESCAPE_POINT_SOURCE_INSUFFICIENT.
4. BS211-Q400 O-C/A-F remain high risk — recommend UNRESOLVED/O-D for O and UNRESOLVED for A.
5. A4R87-EXT-002 P-G plausible but blocked by pending gate approval.
6. REAL-EVENT-0016 and ASIANA-214 still need author decision.
7. REAL-EVENT-0003 awaits future release governance.
