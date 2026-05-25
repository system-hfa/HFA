# SERA Engine vNext Author Decision Prep Active Review A4R136 v0.2.0

Status: AUTHOR_DECISION_PREP_RECORDED
Phase: A4+R-136
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Prepare a concise, controlled author decision form for the two events marked ACTIVE_REVIEW in the A4R135 Control Board: REAL-EVENT-0016 and ASIANA-214.

This phase does NOT register author approval. This phase does NOT alter P/O/A. This phase does NOT create releasedCode or open downstream.

## Relation to Control Board A4R135

The A4R135 Control Board lists these two events as:

| eventId | currentStatus | P | O | A | nextAction |
|---|---|---|---|---|---|
| REAL-EVENT-0016 | ACTIVE_REVIEW | P-C | O-A | UNRESOLVED | COLLECT_AUTHOR_DECISION |
| ASIANA-214 | ACTIVE_REVIEW | P-G | O-D | A-F | COLLECT_AUTHOR_DECISION |

Both have valid escape-point "Quando..." statements from A4R130, and both were reviewed by Opus in A4R132. They are blocked only by pending conscious author decision on boundary choices.

## REAL-EVENT-0016 — Summary

N8DX Cessna 500 automation confusion and loss-of-control sequence. A single pilot reported Garmin/autopilot and steering difficulties, followed by altitude deviations, unstable descent and TAWS alerts before impact.

**Escape point (A4R130):** "Quando a aeronave prosseguiu em descida instavel com desvios de altitude e dificuldade de controle direcional reportada, colocou a trajetoria e o estado de controle fora do perfil IFR controlado esperado."

**Pending decision:** P-C vs P-G boundary.

### Arguments for P-C

- The strongest draft evidence concerns automation/interface interpretation and mode-state understanding.
- The pilot reported confusion about Garmin/autopilot behavior, suggesting a knowledge/interpretation deficit.
- TAWS alerts were a consequence, not the first departure.

### Arguments for P-G

- Flight instruments and mode annunciations were available and correct.
- The information was present but not monitored/integrated/attended in time.
- The descent instability and deviations were observable and monitorable.

### Risks

- Converting automation confusion into A-F or A-I without a specific action chain.
- O-A is plausible regardless of P decision. A-UNRESOLVED is defensible.
- The exact autopilot mode states and control-input chain remain coarse in local sources.

## ASIANA-214 — Summary

Asiana 214 visual approach energy and glidepath deviation. The approach continued through the 500 ft stabilization gate with PAPI, airspeed, thrust and descent-rate cues indicating an unstabilized profile.

**Escape point (A4R130):** "Quando a aproximacao visual continuou no portao de estabilizacao de 500 ft com PAPI, velocidade e razao de descida indicando perfil nao estabilizado, colocou a energia e trajetoria da aeronave fora do perfil seguro de aproximacao."

**Pending decisions:** P-G confirmation, O-D threshold, A-F vs A-E.

### Perception: P-G vs P-F

**Arguments for P-G (current draft):**
- PAPI, airspeed, and descent cues were available and correct at the 500 ft gate.
- The unstabilized profile was monitorable and the information was present.
- Opus review (A4R132) rated P-G as "strong."

**Arguments for P-F:**
- Automation mode ambiguity (HOLD/FLCH) may have created a genuine perception/interpretation problem.
- If the crew genuinely misinterpreted the automation state, this pushes toward P-F.

### Objective: O-D vs O-A

**Arguments for O-D (current draft):**
- Continuation through the 500 ft stabilization gate with known unstabilized cues represents a threshold/risk-management failure.
- The gate exists precisely to prevent this: continuing past it is an objective margin decision.

**Arguments for O-A:**
- If no separate unsafe objective can be isolated from the perception/action chain.
- The continuation may be a consequence of perception, not a separate objective choice.

### Action: A-F vs A-E

**Arguments for A-F (current draft):**
- The go-around was not initiated despite unstabilized cues; mode/thrust selection was inadequate.
- This is an action selection/execution problem, not a knowledge deficit.

**Arguments for A-E:**
- If the crew's automation mental model (HOLD/FLCH understanding) is treated as the dominant factor.
- Knowledge/understanding deficits that drive action choices fall under A-E.

### Risks

- Approving full P/O/A while P-F/P-G and A-F/A-E boundaries are live.
- O-D may be contested if the author views the threshold as too strong.
- The Opus review (A4R132) flagged A-F vs A-E as needing conscious author judgment.

## Locks Preserved

- NO_NEW_AUTHOR_DECISION in this phase.
- NO_RELEASED_CODE for both events.
- NO_DOWNSTREAM for both events.
- No P/O/A change from A4R130/A4R131.
- No source enrichment performed.
- No processing of BS211-Q400, A4R87-EXT-002, AMERICAN-965, or COMAIR-5191.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Next Steps

1. Author fills out the decision form for both events.
2. If decisions are recorded: next phase registers them (A4R137 or later).
3. If author defers: events remain ACTIVE_REVIEW.
4. REAL-EVENT-0003 awaits future release governance.
5. BS211-Q400 and A4R87-EXT-002 await gate patch author review.
6. AMERICAN-965 and COMAIR-5191 await source enrichment.
