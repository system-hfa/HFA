# SERA A4R193-G Readiness Plan v0.2.0

## 1. Recommended next phase

A4R193-G should run `Source Enrichment Batch` for selected holds before any synthetic execution.

## 2. Priority execution set

1. American 965
2. Delta 191
3. Colgan 3407 (controlled PF/PM decomposition gate)

## 3. Protected hold lane

- Keep USAir 427 and 5N-BQJ in technical-dominant hold until boundary evidence improves.
- Keep N109W and N11NM as superseded/quarantined historical context only.

## 4. Synthetic policy for G

- Synthetic work remains planning-only by default in G.
- Synthetic execution can be revisited only after enrichment evidence shows persistent uncovered gaps.

## 5. Product/UI/API gate

Remains blocked in G unless explicit closure evidence is produced for:
- RR-001
- RR-003
- technical-dominant hold boundary

## 6. Output lock continuity

- maintain candidate-only mode
- no selectedCode/releasedCode/finalConclusion
- no downstream HFACS/Risk/ERC/ARMS/ERC/recommendations
