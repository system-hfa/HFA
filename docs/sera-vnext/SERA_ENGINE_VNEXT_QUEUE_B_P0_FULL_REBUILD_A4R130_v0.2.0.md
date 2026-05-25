# SERA Engine vNext Queue B P0 Full Rebuild A4R130 v0.2.0

Status: QUEUE_B_P0_FULL_REBUILD_RECORDED
Phase: A4+R-130
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: FULL_REBUILD_WITH_ESCAPE_POINT_GATE_DRAFT_ONLY

## Objective
Reconstruir metodologicamente apenas os cinco eventos `QUEUE_B_POA_REVIEW` P0 que a A4R129 encaminhou para `FULL_REBUILD_WITH_ESCAPE_POINT_GATE`, aplicando primeiro o gate Hendy completo do ponto de fuga da operacao segura.

Esta fase produz somente `REBUILT_POA_DRAFT_NOT_RELEASED`. Ela nao cria `releasedCode`, nao transforma `proposedCode` em `selectedCode CLASSIFIED`, nao abre downstream e nao altera artefatos de fonte.

## Scope and Explicit Exclusions
Eventos processados:
- `REAL-EVENT-0003`
- `REAL-EVENT-0016`
- `BS211-Q400`
- `A4R87-EXT-002`
- `ASIANA-214`

Eventos excluidos nesta fase por decisao A4R129 de `SOURCE_ENRICHMENT`:
- `AMERICAN-965`
- `COMAIR-5191`

Nenhum evento P1, nenhuma outra fila e nenhum corpus novo foi usado como substituto.

## Sources Used
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_POA_REVIEW_A4R129_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_B_P0_POA_REVIEW_TRACKER_A4R129_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/POST_A4R126_RECOVERY_QUEUE_A4R127_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_PRE_GATE_EVENT_QUARANTINE_REGISTER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`
- `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md`
- `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md`
- `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-006.md`
- `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-006.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0016-CANONICAL-DRAFT-A4R104.md`
- `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-013.md`
- `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-013.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-BS211-Q400-CANONICAL-DRAFT-A4R104.md`
- `docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-002.md`
- `docs/sera-vnext/external-candidates/adjudications-batch-1/EXT-BATCH1-ADJUDICATION-002.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-EXT-002-CANONICAL-DRAFT-A4R104.md`
- `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-ASIANA-214-A4R106.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-ASIANA-214-A4R115.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-ASIANA-214-CANONICAL-DRAFT-A4R106.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-ASIANA-214-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`

## Hendy Gate Method
For each eligible event, A4R130 rebuilt the sequence in this order:
1. define the safe-operation escape point;
2. write `escapePointWhenStatement`;
3. identify the factual unsafe act or unsafe condition;
4. identify the controlled operational variable;
5. identify the safe limit or expected state;
6. anchor the evidence;
7. apply the counterfactual preventability test;
8. identify the direct actor;
9. only then evaluate P/O/A as draft.

The `escapePointWhenStatement` is a temporal-location gate. It does not replace Hendy. It only forces the first observable departure to be written before P/O/A.

Invalid "Quando" wording would include cognitive cause, internal judgment, SERA code, or phrases such as "nao percebeu", "decidiu errado", "falhou em", "ficou fixado", "ignorou", "violou", "interpretou mal", "perdeu consciencia situacional", "falha de percepcao", or "falha de decisao". No A4R130 when-statement uses those forms as its nucleus.

## Metrics
| metric | value |
|---|---:|
| totalQueueBP0FullRebuildEligible | 5 |
| excludedForSourceEnrichment | 2 |
| escapePointDefinedCount | 5 |
| escapePointBlockedCount | 0 |
| whenStatementValidCount | 5 |
| whenStatementInvalidCount | 0 |
| classificationPermissionGrantedCount | 5 |
| classificationPermissionBlockedCount | 0 |
| poaRebuiltDraftCount | 5 |
| pAxisRetained | 4 |
| pAxisRevised | 1 |
| pAxisUnresolved | 0 |
| pAxisBlocked | 0 |
| oAxisRetained | 4 |
| oAxisRevised | 0 |
| oAxisUnresolved | 1 |
| oAxisBlocked | 0 |
| aAxisRetained | 1 |
| aAxisRevised | 1 |
| aAxisUnresolved | 3 |
| aAxisBlocked | 0 |
| requiresAuthorReviewCount | 5 |
| remainsInQuarantineCount | 5 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |

## Event Decision Summary
| eventId | escapePointStatus | classificationPermission | rebuilt draft | rebuildDecision | nextAction |
|---|---|---|---|---|---|
| REAL-EVENT-0003 | DEFINED | MAY_PROCEED_TO_POA_DRAFT | P-G / O-A / A=UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | AUTHOR_REVIEW_REQUIRED_FOR_ACTION_AXIS |
| REAL-EVENT-0016 | DEFINED | MAY_PROCEED_TO_POA_DRAFT | P-C / O-A / A=UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | AUTHOR_REVIEW_REQUIRED_FOR_ACTION_AXIS |
| BS211-Q400 | DEFINED | MAY_PROCEED_TO_POA_DRAFT | P-H / O-C / A-F | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | AUTHOR_REVIEW_REQUIRED_BEFORE_ANY_REFERENCE_USE |
| A4R87-EXT-002 | DEFINED | MAY_PROCEED_TO_POA_DRAFT | P-G / O=UNRESOLVED / A=UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | AUTHOR_REVIEW_REQUIRED_PLUS_WARNING_CHRONOLOGY_SLICE |
| ASIANA-214 | DEFINED | MAY_PROCEED_TO_POA_DRAFT | P-G / O-D / A-F | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | AUTHOR_REVIEW_REQUIRED_FOR_P_AND_A_BOUNDARIES |

## REAL-EVENT-0003 - Tofino Night Approach Near-CFIT
### Escape-Point Gate
- escapePointStatus: DEFINED
- escapePointWhenStatement: Quando a aproximacao noturna prosseguiu para um estado de baixa velocidade, alta razao de descida e decaimento de rotor em baixa altura, colocou o perfil de energia e separacao vertical fora do perfil seguro de aproximacao.
- unsafeActOrCondition: Aproximacao noturna em baixa altura entrou em estado de baixa energia, alta razao de descida e decaimento de rotor antes da recuperacao.
- controlledVariable: perfil de energia, razao de descida, velocidade e separacao vertical.
- safeLimitOrExpectedState: perfil seguro de aproximacao noturna com energia, razao de descida, rotor e margem vertical monitoraveis antes de baixa altura.
- evidenceAnchor: A4R72-B2-001 extraction event sequence 3-5; A4R73 adjudication factualBasis; A4R100 safe-operation escape point and evidence EV-002 to EV-004.
- timelinePosition: apos desconexao do autopilot e antes da recuperacao em altura extremamente baixa.
- whyFirstDeparture: a recuperacao em altura muito baixa e a exposicao near-CFIT sao consequencias posteriores; a primeira saida observavel e a degradacao do perfil de energia/trajetoria.
- preventabilityTest: PASS
- directActor: flight crew, with PF/PM micro-timeline not fully separated.
- criticality: FIRST_DEPARTURE_ONLY
- classificationPermission: MAY_PROCEED_TO_POA_DRAFT

### Hendy Three Questions
- Perception: The crew had to assess that the approach energy, descent and rotor margin were leaving the safe profile after autopilot disconnection.
- Goal: The observable goal remained completing the approach/landing safely; no objective deviation evidence is isolated.
- Action: The current packet does not isolate a specific PF/PM control-action mechanism strongly enough for an A leaf.

### P/O/A Draft
| axis | priorProposedCode | rebuiltDraftCode | axisStatus | evidence | rationale | uncertainty | rejectedAlternatives |
|---|---|---|---|---|---|---|---|
| P | P-G | P-G | RETAIN_PRIOR_DRAFT | Available low-speed/high-descent/rotor cues and A4R100 maintained P-G path. | Information was available in the monitored flight state but not integrated in time in the critical segment. | MEDIUM | P-C and P-F not dominant in the local packet; P-A rejected because the degraded state was not contained. |
| O | O-A | O-A | RETAIN_PRIOR_DRAFT | A4R73 found no evidence of deviating objective. | Objective evidence supports continuing the intended approach/landing, not a separate unsafe goal. | LOW | O-C/O-D rejected without evidence of rule-conscious or unmanaged-risk objective as primary mechanism. |
| A | UNRESOLVED | UNRESOLVED | UNRESOLVED | PF/PM action and callout sequence remains incomplete. | A4R130 does not infer action failure from outcome or late recovery alone. | HIGH | A-F not assigned because specific action selection is not isolated; A-A is not used as fallback. |

## REAL-EVENT-0016 - N8DX Automation Confusion LOC
### Escape-Point Gate
- escapePointStatus: DEFINED
- escapePointWhenStatement: Quando a aeronave prosseguiu em descida instavel com desvios de altitude e dificuldade de controle direcional reportada, colocou a trajetoria e o estado de controle fora do perfil IFR controlado esperado.
- unsafeActOrCondition: Trajetoria de descida tornou-se instavel com desvios de altitude, dificuldade de controle direcional reportada e alertas TAWS antes do impacto.
- controlledVariable: trajetoria IFR, altitude, estado de controle e estabilidade de descida.
- safeLimitOrExpectedState: perfil IFR controlado com altitude e trajetoria estaveis, automacao ou controle manual compreendidos e recuperaveis.
- evidenceAnchor: A4R72-B2-006 eventSequence 1-5 and evidence fragments; A4R73 adjudication factualBasis; A4R104 factual summary and evidence EV-002 to EV-005.
- timelinePosition: depois das dificuldades Garmin/autopilot e antes dos alertas finais TAWS e impacto.
- whyFirstDeparture: os alertas TAWS e o impacto sao consequencias posteriores da trajetoria instavel; a primeira saida observavel e a perda de estabilidade de trajetoria/controle.
- preventabilityTest: PASS
- directActor: single pilot.
- criticality: FIRST_DEPARTURE_ONLY
- classificationPermission: MAY_PROCEED_TO_POA_DRAFT

### Hendy Three Questions
- Perception: The pilot had to understand automation, steering and aircraft-state cues while managing the IFR trajectory.
- Goal: The observable goal remained completing the arrival/approach safely.
- Action: The local packet does not isolate whether the final control action mechanism was selection, execution or consequence of mode-state misunderstanding.

### P/O/A Draft
| axis | priorProposedCode | rebuiltDraftCode | axisStatus | evidence | rationale | uncertainty | rejectedAlternatives |
|---|---|---|---|---|---|---|---|
| P | P-C | P-C | RETAIN_PRIOR_DRAFT | Pilot-reported GPS/autopilot difficulty, steering concerns and A4R104 P-C draft. | The strongest draft mechanism remains automation/interface interpretation or mode-state understanding, not generic monitoring alone. | MEDIUM | P-G remains a possible comparator but was rejected as primary in A4R73/A4R104 due automation interpretation evidence. |
| O | O-A | O-A | RETAIN_PRIOR_DRAFT | No evidence of deviating operational objective in A4R73. | The goal appears to remain safe completion of the flight/arrival. | LOW | O-C/O-D not assigned without evidence of unsafe objective or risk-objective tradeoff. |
| A | UNRESOLVED | UNRESOLVED | UNRESOLVED | Autopilot mode states and control-input chain remain coarse in text-only source. | A4R130 does not convert automation confusion or TAWS warnings into an action leaf without a specific action chain. | HIGH | A-F/A-I rejected as current drafts because selection/execution mechanism is not closed. |

## BS211-Q400 - Unstable Approach Sequence
### Escape-Point Gate
- escapePointStatus: DEFINED
- escapePointWhenStatement: Quando a aeronave prosseguiu fora da trajetoria/downwind atribuida e em aproximacao instavel, colocou a estabilidade da aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada.
- unsafeActOrCondition: Aproximacao permaneceu instavel com conflito de trajetoria/alinhamento de pista apos contexto de sequenciamento ATC e downwind/orbit.
- controlledVariable: estabilidade da aproximacao, alinhamento de pista e cumprimento de sequenciamento atribuido.
- safeLimitOrExpectedState: stabilized re-entry, assigned downwind/orbit compliance or discontinued approach before reduced recovery margin.
- evidenceAnchor: A4R76-B3-013 eventSequence 2-5 and evidence fragments; A4R77 factualBasis and O/A reasoning; A4R104 safe-operation escape point and evidence EV-002 to EV-007.
- timelinePosition: after ATC runway/use sequencing and before the final misaligned/unstable accident outcome.
- whyFirstDeparture: the accident outcome is later; the first departure is the continued unstable and misaligned approach instead of assigned-path/stabilized re-entry.
- preventabilityTest: PASS
- directActor: flight crew; ATC interface remains contextual contributor.
- criticality: FIRST_DEPARTURE_ONLY
- classificationPermission: MAY_PROCEED_TO_POA_DRAFT

### Hendy Three Questions
- Perception: The crew had to understand ATC sequencing, runway/path alignment and unstable approach cues.
- Goal: The flight path indicates an exceptional assigned-path conflict in the approach sequence.
- Action: The selected/continued path remained inappropriate relative to known sequencing and stabilization alternatives.

### P/O/A Draft
| axis | priorProposedCode | rebuiltDraftCode | axisStatus | evidence | rationale | uncertainty | rejectedAlternatives |
|---|---|---|---|---|---|---|---|
| P | P-H | P-H | RETAIN_PRIOR_DRAFT | Repeated ATC exchanges, runway/alignment confusion and A4R104 P-H draft. | Communication/information-chain degradation is more specific than generic monitoring. | MEDIUM | P-G and P-F rejected as dominant in the current packet. |
| O | O-C | O-C | RETAIN_PRIOR_DRAFT | Textual anchor that the aircraft flew rather than joined the assigned downwind, plus orbit/downwind context. | A4R130 retains O-C as draft because assigned-path conflict is explicitly present, while keeping author review due intent threshold. | MEDIUM | O-D rejected as less specific than assigned-procedure conflict; O-A not retained after path conflict. |
| A | A-F | A-F | RETAIN_PRIOR_DRAFT | Continued path toward runway/threshold instead of assigned sequencing/stabilized re-entry. | The action selected/continued was inappropriate relative to available assigned-path and go-around/re-entry alternatives. | MEDIUM | A-J rejected because time pressure is not established as dominant; A-A not used as fallback. |

## A4R87-EXT-002 - AW139 Night Over-Water Warning Sequence
### Escape-Point Gate
- escapePointStatus: DEFINED
- escapePointWhenStatement: Quando o voo noturno sobre agua desceu em perfil degradado com multiplos alertas EGPWS ativos, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado.
- unsafeActOrCondition: Perfil noturno sobre agua degradou para estado de descida/clearance com alertas EGPWS repetidos antes do impacto na agua.
- controlledVariable: vertical separation over water, altitude path and monitored flight profile.
- safeLimitOrExpectedState: monitored night over-water profile maintaining safe clearance and timely recovery from EGPWS alerting.
- evidenceAnchor: EXT-BATCH1-EXTRACTION-002 factualTimeline and alertWarningChronology; EXT-BATCH1-ADJUDICATION-002 unsafeStateCandidate and P-axis evidence; A4R104 EXT-002 safe-operation escape point and evidence EV-001 to EV-007.
- timelinePosition: during the warning-rich descent profile before impact.
- whyFirstDeparture: impact is later; repeated alerts mark an already unsafe profile, but the first departure is the degraded altitude/clearance path that made those alerts active.
- preventabilityTest: PASS
- directActor: flight crew.
- criticality: FIRST_DEPARTURE_ONLY
- classificationPermission: MAY_PROCEED_TO_POA_DRAFT

### Hendy Three Questions
- Perception: The crew had to monitor and integrate EGPWS, instruments and clearance cues in a dark-night over-water environment.
- Goal: The current extraction does not isolate a specific unsafe objective beyond the mission flight profile.
- Action: Warning response and control-input timing remain insufficiently decomposed for an A leaf.

### P/O/A Draft
| axis | priorProposedCode | rebuiltDraftCode | axisStatus | evidence | rationale | uncertainty | rejectedAlternatives |
|---|---|---|---|---|---|---|---|
| P | P-G | P-G | RETAIN_PRIOR_DRAFT | Repeated EGPWS warnings and instrument-monitoring demand with A4R104 P-G draft. | Available warning/instrument cues were strongest for a monitoring/integration draft, while avoiding automatic alert-to-code mapping. | MEDIUM | P-C rejected because interpretation/knowledge threshold is not closed; P-F rejected because ambiguity is not dominant in current packet. |
| O | UNRESOLVED | UNRESOLVED | UNRESOLVED | Objective trace not isolated from medical mission/night operation context. | The source does not prove an unsafe objective or conscious rule/risk objective. | HIGH | O-C/O-D rejected as current drafts because intention/rule/risk-objective evidence is not isolated. |
| A | UNRESOLVED | UNRESOLVED | UNRESOLVED | Specific warning response and control-action mechanism are not isolated at sufficient granularity. | A4R130 does not turn alert non-response into an action code without a specific action loop. | HIGH | A-F rejected as current draft; A-A is not used as default. |

## ASIANA-214 - Visual Approach Energy and Glidepath Deviation
### Escape-Point Gate
- escapePointStatus: DEFINED
- escapePointWhenStatement: Quando a aproximacao visual continuou no portao de estabilizacao de 500 ft com PAPI, velocidade e razao de descida indicando perfil nao estabilizado, colocou a energia e trajetoria da aeronave fora do perfil seguro de aproximacao.
- unsafeActOrCondition: Visual approach continued through the 500 ft stabilization gate with PAPI, airspeed, idle thrust and descent-rate cues indicating an unstabilized profile.
- controlledVariable: energy state, airspeed, glidepath and descent profile.
- safeLimitOrExpectedState: stabilized visual approach profile at or before the 500 ft gate, with go-around/recovery before low altitude margin collapse.
- evidenceAnchor: A4R106 source slice safeOperationEscapePointCandidates and ASIANA-SRC-EV-001/003; A4R115 source slice evidence AS214-E4 to AS214-E6; A4R106 and A4R115 trace drafts.
- timelinePosition: at the 500 ft stabilization gate, before the approximately 200 ft low-speed/low-path awareness and late go-around below 100 ft.
- whyFirstDeparture: low-speed awareness around 200 ft and the late go-around are later in the trajectory; the first departure is continuation through the 500 ft stabilized-approach gate with unstable cues.
- preventabilityTest: PASS
- directActor: flight crew.
- criticality: FIRST_DEPARTURE_ONLY
- classificationPermission: MAY_PROCEED_TO_POA_DRAFT

### Hendy Three Questions
- Perception: The crew had to assess automation mode, airspeed, PAPI, descent-rate and glidepath cues against the stabilized approach gate.
- Goal: The observable goal shifted from normal visual approach completion into unmanaged-risk continuation after the 500 ft gate.
- Action: Flight mode/thrust management and late go-around timing are action-relevant, but author review remains required for A-F versus A-E.

### P/O/A Draft
| axis | priorProposedCode | rebuiltDraftCode | axisStatus | evidence | rationale | uncertainty | rejectedAlternatives |
|---|---|---|---|---|---|---|---|
| P | P-F/P-G contested | P-G | REVISE_DRAFT | A4R106 treats cue set as mostly non-ambiguous; A4R115 records P-F/P-G boundary and strong available-cue evidence. | A4R130 selects P-G as the safer draft because P-F requires dominant ambiguous, degraded or misleading information; PAPI/airspeed/descent cues were available and correct. | MEDIUM_HIGH | P-F remains an author-review alternative but is not selected without treating automation/HOLD ambiguity as dominant. P-C not primary. |
| O | O-D | O-D | RETAIN_PRIOR_DRAFT | A4R115 evidence at 500 ft stabilization gate and continuation after unstable cues. | Continuing the approach after the stable-approach gate supports unmanaged-risk objective draft, not a final classification. | MEDIUM | O-A rejected after the 500 ft gate; O-C not selected because conscious rule-deviation threshold is not the safer draft. |
| A | A-F/A-E review | A-F | REVISE_DRAFT | FLCH/autopilot/thrust sequence and late go-around timing in A4R115, with AS214-E2, E3 and E6. | The draft treats mode/thrust/go-around choices as action selection adequacy problem while reserving author review for A-E boundary. | MEDIUM_HIGH | A-E remains live author-review alternative; A-A not used as fallback. |

## Decisions
- All five eligible events have `escapePointStatus=DEFINED`.
- All five have valid `escapePointWhenStatement` wording.
- All five receive `classificationPermission=MAY_PROCEED_TO_POA_DRAFT`.
- All five remain draft-only and require author review before any reference, consensus, training, fixture, baseline, release or downstream use.
- `AMERICAN-965` and `COMAIR-5191` were not processed and remain `SOURCE_ENRICHMENT` cases.

## Limitations
- This phase did not use or create canonical SERA question paths for the rebuilt P/O/A drafts.
- Existing canonical trace artifacts are source context only; no helper question path was treated as canonical proof.
- Probable causes, report conclusions, safety actions and external causal labels remain quarantined.
- No source/corpus file was modified.
- No released or selected classification was created.

## Next Steps
1. Author review of the five `REBUILT_POA_DRAFT_NOT_RELEASED` rows, prioritizing ASIANA-214 P/A boundaries and BS211-Q400 O/A thresholds.
2. Source enrichment for `AMERICAN-965` and `COMAIR-5191` before any attempt to rebuild their gate.
3. Separate `QUEUE_C_FULL_REBUILD` phase for the four original A4R127 queue C events.
4. Do not open downstream until author review and release governance explicitly authorize it.
