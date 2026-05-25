# SERA Engine vNext Queue A P0 When Recovery A4R128 v0.2.0

Status: QUEUE_A_P0_ESCAPE_POINT_GATE_RECOVERY_RECORDED
Phase: A4+R-128
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: HENDY_ESCAPE_POINT_GATE_COMPLEMENT_ONLY

## Objective
Formalizar o gate Hendy completo do ponto de fuga da operacao segura para os eventos P0 classificados em A4R127 como `QUEUE_A_WHEN_ONLY`, sem refazer P/O/A, sem expandir corpus, sem criar release e sem abrir downstream.

## Sources Used
- `docs/sera-vnext/real-event-escape-point-reaudit/POST_A4R126_RECOVERY_QUEUE_A4R127_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_A4R126_RECOVERY_TRIAGE_A4R127_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_PRE_GATE_EVENT_QUARANTINE_REGISTER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`
- Existing source-slice and canonical-draft trace documents cited in the tracker rows.

## Selection Rule
Only events satisfying both criteria were eligible:
- `assignedQueue = QUEUE_A_WHEN_ONLY`
- `priority = P0`

Eligible events:
- `UPS-1354`
- `COLGAN-3407`
- `UNITED-173`

No P1 event, `QUEUE_B` event, parked event, source-enrichment event or rebuild event was substituted into this lane.

## Method
A4R128 reused the A4R126 escape-point audit fields and A4R127 queue assignment. It checked each eligible row against the Hendy gate criteria:
- `escapePointStatus = DEFINED`
- valid `escapePointWhenStatement`
- factual unsafe act or condition
- controlled operational variable
- safe limit or expected state
- evidence anchor
- timeline position
- why the point is the first departure
- `preventabilityTest = PASS`
- direct actor clear
- `poaAlignment` not `NOT_ALIGNED`
- no invented or approximated SERA tree used as canonical proof

This phase did not change prior proposed P/O/A values and did not create any new classification output.

## When Statement Validation
The mandatory statement must begin with `Quando` and must express an observable act or condition placing a controlled operational variable outside a safe limit or expected state.

The three eligible statements were accepted because they do not use cognitive-cause language, internal judgment language, generic human-error language or SERA codes as the definition of the point of fuga.

## Result By Event
| eventId | recoveryDecision | reason |
|---|---|---|
| UPS-1354 | ESCAPE_POINT_GATE_RECOVERED | A4R126 records a defined escape point, valid when statement, PASS preventability, clear crew actor, aligned prior P/O/A draft and canonical trace confirmation. |
| COLGAN-3407 | ESCAPE_POINT_GATE_RECOVERED | A4R126 records a defined escape point, valid when statement, PASS preventability, clear crew actor, aligned prior P/O/A draft and canonical trace confirmation. |
| UNITED-173 | ESCAPE_POINT_GATE_RECOVERED | A4R126 records a defined escape point, valid when statement, PASS preventability, clear crew actor, aligned prior P/O/A draft and canonical trace confirmation, with OCR/source-quality caveat retained. |

## Metrics
| metric | value |
|---|---:|
| totalQueueAP0Eligible | 3 |
| escapePointGateRecovered | 3 |
| remainsInQuarantine | 0 |
| whenStatementValid | 3 |
| whenStatementInvalid | 0 |
| preventabilityPass | 3 |
| preventabilityUncertainOrFail | 0 |
| directActorClear | 3 |
| directActorUnclear | 0 |
| poaChangedCount | 0 |
| releasedCodeCreatedCount | 0 |
| downstreamOpenedCount | 0 |

## Recovered Events
The following events receive `ESCAPE_POINT_GATE_RECOVERED` for the escape-point gate only:
- `UPS-1354`
- `COLGAN-3407`
- `UNITED-173`

This recovery means the Hendy point-of-fuga fields are now formally complete for these rows. It does not convert proposed P/O/A into release authority.

## Events Maintained In Quarantine
No eligible `QUEUE_A_WHEN_ONLY` P0 event remained blocked in this phase.

All non-eligible A4R126/A4R127 events remain under their prior A4R126/A4R127 status and were not reprocessed here.

## Remaining Restrictions
- Prior P/O/A values remain draft/proposed.
- No `releasedCode` was created.
- No downstream output was opened.
- Reference, author-review, consensus and training reuse still require their own dedicated authorization.
- Existing source-quality and double-counting caveats remain active where previously recorded.

## Limitations
- This was not a rebuild and did not revisit P/O/A logic.
- This was not a new global audit and did not expand the event corpus.
- The recovery decision is limited to the Hendy escape-point gate.
- `UNITED-173` retains the A4R120 OCR/source-quality caveat.
- `UPS-1354` retains the A4R117 double-counting caution.

## Next Steps
1. Run `QUEUE_B_POA_REVIEW` only after each selected event has a valid `escapePointWhenStatement`.
2. Run `QUEUE_C_FULL_REBUILD` for events already marked as rebuild-required.
3. Run `QUEUE_D_SOURCE_ENRICHMENT` before attempting gate recovery for source-partial events.
4. Keep parked technical, condition, actor-unclear and real-tree blockers closed until their boundary issue is resolved.
