# SERA vNext Engine v0.1 Expected Outputs

Date: 2026-06-07

## Location

Expected outputs are stored at:

- `tests/sera-vnext/engine-validation-v01/expected/engine-v01-expected.json`

## Contract Change From V0

V0 treated `null` P/O/A codes as partial even when the canonical tree could not be answered from admissible evidence. v0.1 makes this explicit:

- `codeRequired=false` allows `null` when evidence is insufficient;
- `nullCodeAllowed=true` is not a pass-by-default for forbidden codes;
- forbidden codes remain critical findings;
- expected precondition categories remain critical when authored as boundary requirements;
- post-escape evidence exclusion remains critical.

## Product Locks

All expected outputs preserve candidate-only locks:

- `selectedCode: null`
- `releasedCode: null`
- `finalConclusion: null`
- `classifiedOutput: false`
- `readyPromotion: false`
- `downstreamAllowed: false`
