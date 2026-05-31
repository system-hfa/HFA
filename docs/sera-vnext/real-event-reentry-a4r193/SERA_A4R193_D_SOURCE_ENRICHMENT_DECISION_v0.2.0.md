# SERA A4R193-D Source Enrichment Decision v0.2.0

## Scope

Decision-only phase for source enrichment and real-event expansion readiness.

Hard boundaries preserved:
- no product/UI/API integration
- no synthetic event creation
- no final classification release
- candidate-only controls remain active

## Internal evidence reviewed

Primary A4R193 package:
- `SERA_A4R193_C_REAL_EVENT_REENTRY_CONSOLIDATED_METRICS_v0.2.0.md`
- `SERA_A4R193_C_REAL_EVENT_REENTRY_TRACKER.csv`
- `SERA_A4R193_C_GAP_AND_RISK_REGISTER_v0.2.0.md`
- `REAL_EVENT_REENTRY_*_A4R193_A/B_v0.2.0.md`

Source and adjudication evidence:
- `docs/sera-vnext/real-event-structured-extraction-a4r180/SERA_REAL_EVENT_STRUCTURED_EXTRACTION_ENRICHMENT_MATRIX_A4R180B_v0.2.0.csv`
- `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0015.md`
- `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv`
- `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_HOLD_REGISTER_A4R181_v0.2.0.md`

Legacy-source context for additional named candidates:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_TXT_CORPUS_INVENTORY_FOR_OPUS_A4R118_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SOURCE_RECOVERY_OCR_A4R156_v0.2.0.md`
- `docs/sera-vnext/real-event-adjudications/CONSOLIDATED_30_REAL_EVENTS_TRACKER_A4R78_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`

## USAir 427 decision

Decision: `USAir 427` does not exit HOLD.

Status kept:
- `SOURCE_INSUFFICIENT_FOR_REENTRY`
- `HOLD_TECHNICAL_DOMINANCE_BOUNDARY`

Evidence basis:
- A4R180 extraction marks `HELD_OVERCLASSIFICATION_RISK` and technical dominance boundary.
- A4R181 adjudication keeps `HOLD_BOUNDARY_REVIEW` with technical-versus-operator gating.
- A4R193-B re-entry artifact already blocks human anchor and P/O/A axis closure.

Conclusion:
- no defensible human escape-point anchor was added in A4R193-D
- USAir 427 remains a controlled HOLD case

## Additional candidate findings

Candidates with sufficient internal narrative for A4R193-E re-entry trial planning:
- `American 1420 LIT` (A4R181-ADJ-0003: READY_FOR_AUTHOR_DECISION)
- `UPS 1354 BHM` (A4R181-ADJ-0006: READY_FOR_AUTHOR_DECISION)

Candidates with partial sufficiency but still requiring enrichment or framing hardening:
- `American 965 Cali` (A4R181-ADJ-0010: FRAMING_DECISION_REQUIRED; source directness caution)
- `Delta 191` (OCR and corpus-lane caution in A4R118/A4R156 chain)
- `Thebaud` (legacy unresolved with PF/PM decomposition gap)
- `Peasmarsh` (direct actor unclear; unresolved warning/go-around chain)
- `Vigo` (multi-actor decomposition incomplete)

Candidates remaining on technical-dominant hold lane:
- `5N-BQJ`
- `USAir 427`

Not prioritized for current real-event re-entry expansion:
- `N109W`
- `N11NM`

## Real-event expansion decision

A4R193-D approves a conservative expansion set for next phase planning:
- approve `2` candidates as `READY_FOR_A4R193_E_REENTRY`
- keep all other named candidates in `SOURCE_ENRICHMENT_REQUIRED` or HOLD classes

## Synthetic decision

Decision: `SYNTHETIC_GAP_DESIGN_PACK_ALLOWED_AS_PLANNING_ONLY`.

Constraints preserved:
- no synthetic event is created in A4R193-D
- no synthetic candidate is promoted to runtime use

## Product/UI/API decision

Decision: `NOT_READY_FOR_PRODUCT`.

Rationale:
- RR-001 remains open
- RR-003 remains partially mitigated
- technical-dominant hold remains active
- additional real-event enrichment is still required
