# Queue A P0 When Recovery Tracker A4R128 v0.2.0

Status: QUEUE_A_P0_WHEN_RECOVERY_TRACKER_RECORDED
Phase: A4+R-128
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: HENDY_ESCAPE_POINT_GATE_COMPLEMENT_ONLY

## Reading Rules
- This tracker covers only events with `assignedQueue=QUEUE_A_WHEN_ONLY` and `priority=P0` in A4R127.
- It does not rebuild P/O/A, does not alter proposed P/O/A values, does not create release authority and does not open downstream.
- `ESCAPE_POINT_GATE_RECOVERED` is limited to the Hendy point-of-fuga gate.

## Recovery Table
| eventId | sourceFiles | previousA4R126Decision | previousA4R127Queue | priority | escapePointWhenStatement | unsafeActOrCondition | controlledVariable | safeLimitOrExpectedState | evidenceAnchor | timelinePosition | whyFirstDeparture | preventabilityTest | directActor | criticality | poaAlignment | treeTraceRisk | recoveryDecision | remainingRestrictions | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| UPS-1354 | `GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126`; `POST_A4R126_RECOVERY_QUEUE_A4R127`; `SOURCE-SLICE-UPS-1354-A4R115`; `REFERENCE-CASE-UPS-1354-FULL-AXIS-CANONICAL-DRAFT-A4R115`; A4R125 reconciliation | PASS_REQUIRES_MINOR_WORDING_FIX | QUEUE_A_WHEN_ONLY | P0 | Quando a continuacao da descida abaixo dos gates de estabilizacao colocou o perfil vertical da aproximacao fora do limite seguro. | Descent continued below stabilized-approach gates. | Vertical approach profile. | Stabilized approach and minimum-altitude gate state requiring go-around/level-off. | A4R126 row; A4R115 source slice UPS-E5; A4R115 trace escape-point definition; A4R125 KEEP_WITH_CORRECTION. | Nonprecision approach before impact, after profile mode/glidepath problem and before final terrain impact. | The stabilized-gate loss is the first recorded operational margin departure before later MDA, warning and impact consequences. | PASS | crew | FIRST_DEPARTURE_ONLY | ALIGNED | CANONICAL_TRACE_CONFIRMED | ESCAPE_POINT_GATE_RECOVERED | Draft/proposed P/O/A only; no release; no downstream; double-counting caution remains active. | Eligible for later author/reference review lane without changing P/O/A. |
| COLGAN-3407 | `GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126`; `POST_A4R126_RECOVERY_QUEUE_A4R127`; `SOURCE-SLICE-COLGAN-3407-A4R115`; `REFERENCE-CASE-COLGAN-3407-FULL-AXIS-CANONICAL-DRAFT-A4R115`; A4R125 reconciliation | PASS_REQUIRES_MINOR_WORDING_FIX | QUEUE_A_WHEN_ONLY | P0 | Quando a perda de velocidade ate o stick shaker colocou a margem de energia/estol fora do limite seguro. | Airspeed decayed to stick shaker/autopilot disconnect onset. | Energy/stall margin. | Safe approach energy margin before stick shaker/stall-warning state. | A4R126 row; A4R115 source slice COL3407-E2..E4 and COL3407-E6; A4R115 trace escape-point definition; A4R125 KEEP. | Final approach after configuration and before loss-of-control response sequence. | The low-speed/stick-shaker state is the first recoverability-critical departure before later control inputs, pusher activation, flap retraction and descent. | PASS | crew | BOTH_FIRST_AND_CRITICAL | ALIGNED | CANONICAL_TRACE_CONFIRMED | ESCAPE_POINT_GATE_RECOVERED | Draft/proposed P/O/A only; no release; no downstream; A-F/A-E boundary caution remains active. | Eligible for later author/reference review lane without changing P/O/A. |
| UNITED-173 | `GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126`; `POST_A4R126_RECOVERY_QUEUE_A4R127`; `SOURCE-SLICE-UNITED-173-A4R119`; `REFERENCE-CASE-UNITED-173-FULL-AXIS-CANONICAL-DRAFT-A4R119`; A4R120 source-quality caution; A4R125 reconciliation | PASS_REQUIRES_MINOR_WORDING_FIX | QUEUE_A_WHEN_ONLY | P0 | Quando a continuacao do troubleshooting com combustivel decrescente colocou a reserva de combustivel para pouso fora do estado esperado. | Troubleshooting continued as fuel decreased. | Landing fuel reserve. | Fuel margin required to complete landing before fuel exhaustion. | A4R126 row; A4R119 source slice U173-E1..E7; A4R119 trace escape-point definition; A4R120 OCR caveat; A4R125 KEEP. | Gear-troubleshooting and holding sequence before engine fuel exhaustion. | Continued troubleshooting with declining fuel is the first safe-operation departure before the later fuel-exhaustion outcome. | PASS | crew | FIRST_DEPARTURE_ONLY | ALIGNED | CANONICAL_TRACE_CONFIRMED | ESCAPE_POINT_GATE_RECOVERED | Draft/proposed P/O/A only; no release; no downstream; OCR/source-quality caveat remains active. | Eligible for later author/reference review lane without changing P/O/A. |

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
