# SERA Engine vNext Real Event Reaudit Protocol A4R138 v0.2.0

Status: REAUDIT_PROTOCOL_RECORDED
Phase: A4+R-138
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Define a mandatory protocol for SERA vNext real-event reaudit after the A4R137 methodological reset. This protocol establishes the required sequence, gates, and outputs for any reaudit of real-event P/O/A under the "P/O/A at escape point" rule.

This phase does NOT reaudit events. It defines the protocol only.

## Scope

This protocol applies to all 52 A4R126 real events and any future real events admitted under the SERA vNext methodology. It governs agent and human reaudit behavior.

## Rationale

After A4R137, all real-event P/O/A is suspended as current reference because the analysis was performed from post-escape events, not at the escape-point moment. Without a formal protocol, any reaudit risks reproducing the same error: classifying P/O/A from consequence, trajectory, or outcome instead of from the operator/crew state at the moment the operation left the safe state.

This protocol enforces the methodological correction systematically.

## Relation to A4R137

A4R137 established the rule: P/O/A must be analyzed at the escape-point moment. This protocol (A4R138) defines the mandatory procedure to execute that rule for every real event. A4R137 is the what; A4R138 is the how.

## Mandatory Sequence

### Step 1 — Temporal Separation

For each event, separate the facts into three temporal zones:

#### A. PRE-ESCAPE CONTEXT

What existed before the escape point:
- operational conditions (weather, aircraft state, ATC, crew state);
- automation/modes (autopilot, autothrottle, FMS, GPWS, TCAS);
- technical source (aircraft systems, navigation, instrumentation);
- operational intention (planned approach, route, profile);
- task context (phase of flight, workload, time pressure, distractions);
- source limitations (what the source evidence does and does not cover).

#### B. ESCAPE POINT MOMENT

The exact moment the operation left the safe state:
- observable act or condition;
- controlled operational variable;
- safe limit or expected state;
- evidence supporting the moment;
- direct actor (who performed the act, if any);
- uncertainty (what is not known about this moment).

#### C. POST-ESCAPE CONSEQUENCE

What happened after the escape point:
- trajectory degradation;
- warnings and alerts;
- loss of control;
- terrain impact;
- collision;
- late recovery;
- final outcome (accident, incident, near-miss).

**Rule:** POST-ESCAPE CONSEQUENCE cannot be the primary basis for P/O/A classification. It may only be used to confirm temporal sequence, consequence severity, or downstream trajectory.

### Step 2 — Escape Point Hendy Gate

Required fields for the escape-point gate:

| field | description |
|---|---|
| escapePointWhenStatement | "Quando..." phrase following the canonical template |
| unsafeActOrCondition | The observable act or condition that initiated the departure |
| controlledVariable | The operational variable that left its safe range |
| safeLimitOrExpectedState | The boundary that was crossed |
| evidenceAnchor | Specific source evidence locating this moment |
| timelinePosition | Where in the event timeline this moment occurs |
| whyFirstDeparture | Why this is the first departure from safe operation |
| preventabilityTest | Could this departure have been prevented by the crew at that moment? |
| directActor | Who performed the act (if any); empty if condition-dominant |
| technicalFailureAlternative | Could a technical failure explain this departure? |
| sourceConfidence | HIGH/MEDIUM/LOW — confidence in the escape-point definition |
| escapePointStatus | See status values below |

**escapePointStatus values:**

| value | meaning |
|---|---|
| DEFINED | Escape point defined with adequate source confidence |
| UNRESOLVED | Cannot define escape point from available sources |
| SOURCE_PARTIAL | Partial evidence; some aspects unclear |
| TECHNICAL_FAILURE_NOT_EXCLUDED | Technical failure is a plausible alternative explanation |
| DIRECT_ACTOR_UNCLEAR | The actor responsible for the departure is unclear |
| CONDITION_DOMINANT | The escape point is a condition, not an act |
| MULTI_ACTOR_NOT_DECOMPOSED | Multiple actors contributed but not decomposed |
| POST_ESCAPE_ONLY | Only post-escape evidence exists; pre-escape context missing |
| WARNING_AS_CONSEQUENCE_ONLY | Warning/alerts available but they are consequences, not the escape point |

### Step 3 — "Quando..." Gate Validation

The escape-point phrase must follow the canonical template:

> "Quando [ato/condicao observavel] colocou [variavel operacional] fora de [limite seguro/estado esperado]."

The phrase nucleus must NOT be:

- causa psicologica ("nao percebeu", "perdeu consciencia situacional");
- violation ("decidiu errado", "ignorou", "falhou em");
- codigo SERA (P-G, O-D, A-F);
- warning/alerta when the warning is a consequence of the escape point;
- resultado final (accident, impact, collision, crash);
- impacto ("colidiu com", "atingiu", "impactou");
- acidente ("sofreu acidente", "caiu").

If the "Quando..." phrase embeds any of these as its nucleus, the gate is NOT passed and the event cannot proceed to P/O/A analysis.

### Step 4 — P/O/A at the Escape Point Moment

Each axis must be analyzed exclusively at the escape-point moment:

#### P — Perception

Question: What did the operator/crew perceive or believe at the moment of the escape point?

- Was the relevant information available?
- Was the information correct, ambiguous, degraded, conflicting, or absent?
- Was the issue human perception or a real technical failure?
- If human perception vs. technical failure cannot be distinguished, P = UNRESOLVED.

#### O — Objective

Question: What was the operator/crew objective at the moment of the escape point?

- Was the objective at that moment compatible with safe operation?
- Was the unsafe objective present at the escape-point moment, or only inferred from the post-escape sequence?
- If the objective at the escape-point moment was to land/fly/recover safely, O tends to O-A.
- Do not classify O-D/O-C based solely on post-escape continuation or final outcome.
- If the objective at the escape-point moment cannot be determined, O = UNRESOLVED.

#### A — Action

Question: What action was being executed/attempted at the moment of the escape point?

- Did the action cause the escape point, or was it a response after the escape point?
- Was an alternative known action available at that moment?
- What is the mechanism: selection, execution, knowledge, feedback, coordination, or not isolable?
- Do not classify A-F/A-E based on post-escape consequence.
- If the action at the escape-point moment cannot be determined, A = UNRESOLVED.

### Step 5 — Automatic Blocks

P/O/A classification must be blocked when any of the following conditions apply:

| blockCode | condition | requiredAction |
|---|---|---|
| BLOCK_POA_ESCAPE_POINT_UNRESOLVED | Escape point is not defined | Define escape point or send to SOURCE_ENRICHMENT |
| BLOCK_POA_SOURCE_PARTIAL | Source evidence is incomplete for the escape-point moment | Source enrichment targeting the escape-point moment |
| BLOCK_POA_TECHNICAL_FAILURE_NOT_EXCLUDED | Technical failure is a plausible alternative | Technical investigation or send to PARKED |
| BLOCK_POA_POST_ESCAPE_EVIDENCE_ONLY | Only post-escape evidence is available | Source enrichment for pre-escape/at-escape evidence |
| BLOCK_POA_DIRECT_ACTOR_UNCLEAR | The actor responsible is unclear | Multi-actor decomposition or send to PARKED |
| BLOCK_POA_WARNING_AS_ESCAPE_POINT | Warning/alert is used as escape point when it is a consequence | Move escape point earlier; isolate pre-warning moment |
| BLOCK_POA_OBJECTIVE_INFERRED_FROM_OUTCOME | Objective classified from post-escape continuation/outcome | Re-evaluate objective at the escape-point moment only |
| BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME | Action classified from post-escape consequence | Re-evaluate action at the escape-point moment only |

A blocked event cannot produce P/O/A classification. It must be sent to SOURCE_ENRICHMENT, FULL_REBUILD, or PARKED.

### Step 6 — Permitted Outputs

After reaudit, each event may receive one of the following statuses:

| outputStatus | meaning |
|---|---|
| REAUDITED_AT_ESCAPE_POINT_DRAFT | P/O/A reaudited at escape point; draft ready for review |
| PARTIAL_REAUDIT_AT_ESCAPE_POINT | Some axes reaudited; others unresolved or blocked |
| UNRESOLVED_AT_ESCAPE_POINT | Cannot determine P/O/A at escape point |
| NEEDS_SOURCE_ENRICHMENT | Requires additional source evidence |
| NEEDS_FULL_REBUILD | Requires complete rebuild with escape-point gate |
| PARKED | Boundary, technical, or actor issues prevent reaudit |
| TECHNICAL_FAILURE_DOMINANT | Technical failure dominates; human P/O/A not applicable |
| CONDITION_DOMINANT | Environmental/organizational condition dominates; act not isolable |

No output may be releasedCode.
No output may open downstream.
No output may include finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.

## Reaudit Template

Each reaudited event must use the canonical template: [REAL_EVENT_REAUDIT_TEMPLATE_A4R138.md](./REAL_EVENT_REAUDIT_TEMPLATE_A4R138.md).

## Pilot Plan

The first reaudits must follow the pilot plan defined in: [REAUDIT_PILOT_PLAN_A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PILOT_PLAN_A4R138_v0.2.0.md).

Pilot order:
1. REAL-EVENT-0003 — has autopilot manual disconnect enrichment
2. REAL-EVENT-0016 — needs GPS/autopilot failure vs interpretation distinction
3. ASIANA-214 — tests objective at escape-point moment
4. BS211-Q400 — only after gate patch review
5. A4R87-EXT-002 — only after pre-EGPWS moment isolation

No pilot reaudit is executed in this phase.

## Locks

- NO_NEW_AUTHOR_DECISION.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No P/O/A reclassification in this phase.
- No source enrichment in this phase.
- No reaudit execution in this phase.
- No documents deleted or moved.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Metrics

| metric | value |
|---|---:|
| protocolCreatedCount | 1 |
| templateCreatedCount | 1 |
| pilotPlanCreatedCount | 1 |
| eventsReauditedCount | 0 |
| poaReclassifiedCount | 0 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |
| documentsDeletedCount | 0 |
| documentsMovedCount | 0 |

## Next Steps

1. Author review and approval of this protocol.
2. Execute pilot reaudits in order: REAL-EVENT-0003, REAL-EVENT-0016, ASIANA-214.
3. Gate patch review for BS211-Q400 and A4R87-EXT-002 before their pilot reaudits.
4. Expand reaudit to remaining 52 events after pilot validation.
5. Protocol may be revised based on pilot findings.
