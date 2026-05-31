# SERA A4R193-D Real Event Expansion Decision v0.2.0

## Decision summary

- USAir 427 remains HOLD technical-dominant.
- A4R193-E may start with a small real-event re-entry batch of 2 candidates.
- Source enrichment remains mandatory for all unresolved named candidates.
- Product/UI/API remains blocked.

## Candidate classification

| candidate | classification | rationale |
|---|---|---|
| USAir 427 | HOLD_TECHNICAL_DOMINANT | A4R180/A4R181 technical dominance boundary and overclassification risk remain open |
| American 965 Cali | SOURCE_ENRICHMENT_REQUIRED | framing and source-directness hardening still required before re-entry |
| Delta 191 | SOURCE_ENRICHMENT_REQUIRED | OCR/corpus caution and no current A4R193 re-entry packet |
| American 1420 LIT | READY_FOR_A4R193_E_REENTRY | narrative and adjudication status support controlled candidate-only re-entry |
| UPS 1354 BHM | READY_FOR_A4R193_E_REENTRY | stabilized gate framing with sufficient structured extraction and adjudication support |
| Colgan 3407 BUF | HOLD_AGENT_MIGRATION_RISK | PF/PM decomposition still fragile and can induce agent migration |
| Thebaud S-92A | SOURCE_ENRICHMENT_REQUIRED | legacy unresolved package requires modern re-entry contract reconstruction |
| Peasmarsh | SOURCE_ENRICHMENT_REQUIRED | direct actor and warning chain ambiguity remain unresolved |
| Vigo | SOURCE_ENRICHMENT_REQUIRED | role decomposition remains incomplete |
| 5N-BQJ | HOLD_TECHNICAL_DOMINANT | condition-dominant legacy profile; forcing human anchor is high-risk |
| N109W | NOT_USE_NOW | historical release-pilot flow withdrawn and no current re-entry packet |
| N11NM | NOT_USE_NOW | historical release-pilot flow withdrawn and no current re-entry packet |

## Expansion gate for A4R193-E

A4R193-E authorization level:
- `Real Event Re-entry Batch 3` is allowed with exactly two READY candidates:
  - American 1420 LIT
  - UPS 1354 BHM

Non-ready candidates stay blocked until dedicated enrichment or boundary closure is documented.

## Methodological guardrails carried forward

- no final classification output
- no selected/released code output
- no synthetic creation
- no fixture/baseline promotion
- no product integration
