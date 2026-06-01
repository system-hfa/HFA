# SERA A4R193-N Peasmarsh Retry Decision v0.2.0

## 1. Allowed status set

- `PEASMARSH_READY_FOR_FUTURE_REENTRY_REVIEW`
- `PEASMARSH_REMAINS_SOURCE_EXTRACTION_REQUIRED`
- `PEASMARSH_REMAINS_HOLD_SOURCE_INSUFFICIENT`

## 2. Decision

`PEASMARSH_REMAINS_SOURCE_EXTRACTION_REQUIRED`

## 3. Why this status

- Factual source quality improved versus J/K continuity, but PF/PM split remains unresolved.
- Warning/go-around chain remains ambiguous for actor-level mechanism closure.
- A4R126 still blocks the case as `BLOCKED_DIRECT_ACTOR_UNCLEAR / SOURCE_ENRICHMENT`.
- Not enough closure for future reentry review in this phase.

## 4. Guardrails

- No reentry execution in N.
- No selectedCode/releasedCode/finalConclusion/downstream.
- RR-001 remains `OPEN`.
- RR-003 remains `PARTIALLY_MITIGATED`.
