# SERA A4R193-F Source Enrichment Next Decision v0.2.0

Status:
- DECISION_ONLY
- REAL_EVENT_FIRST
- CANDIDATE_ONLY_LOCKS_PRESERVED

## 1. Next enrichment batch selection (2-3 events)

Selected for next enrichment execution:
1. American 965 Cali
2. Delta 191
3. Colgan 3407 (controlled enrichment with PF/PM split gate)

## 2. Why these three

- American 965 and Delta 191 close high-value gaps on source-hardening and actor framing with broad methodological coverage impact.
- Colgan 3407 directly targets PF/PM decomposition risk that is currently blocking migration-safe reentry expansion.
- This combination reduces unresolved backlog while keeping technical-dominant holds protected.

## 3. Decision on American 965, Delta 191, Thebaud, Peasmarsh, Vigo

- American 965: `PRIORITIZE_NOW`
- Delta 191: `PRIORITIZE_NOW`
- Thebaud: `PRIORITIZE_NEXT_WAVE` (after first 2-3 batch closure)
- Peasmarsh: `KEEP_IN_ENRICHMENT_BACKLOG` (direct-actor ambiguity still high)
- Vigo: `KEEP_IN_ENRICHMENT_BACKLOG` (role decomposition still incomplete)

## 4. Decision on Colgan 3407

Current state remains `HOLD_AGENT_MIGRATION_RISK` for release, but it enters controlled enrichment now.
Gate condition:
- no reentry release until PF/PM decomposition evidence is documented as migration-safe.

## 5. Decision on USAir 427 and 5N-BQJ

- USAir 427: keep `HOLD_TECHNICAL_DOMINANT`
- 5N-BQJ: keep `HOLD_TECHNICAL_DOMINANT`

Rationale:
- both remain technical/condition-dominant and high-risk for forced human anchoring over weak evidence boundaries.

## 6. Guardrails carried forward

- no synthetic event creation in this phase
- no product/UI/API opening
- no final classification outputs
- no selected/released code outputs
- no fixture/baseline promotion
