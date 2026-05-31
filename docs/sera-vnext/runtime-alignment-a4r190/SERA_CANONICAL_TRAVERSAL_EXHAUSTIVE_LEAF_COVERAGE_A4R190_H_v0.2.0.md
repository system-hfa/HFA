# SERA Canonical Traversal Exhaustive Leaf Coverage — A4R190-H v0.2.0

## Objective
Complete deterministic runtime coverage for every active canonical SERA leaf in candidate-only traversal mode, without productive integration and without any final classification outputs.

## Covered Active Leaf Codes (22)
Perception:
- P-A
- P-B
- P-C
- P-D
- P-E
- P-F
- P-G
- P-H

Objective:
- O-A
- O-B
- O-C
- O-D

Action:
- A-A
- A-B
- A-C
- A-D
- A-E
- A-F
- A-G
- A-H
- A-I
- A-J

## O-E Confirmation
- O-E remains `NON_EXISTENT_IN_SERA_PT_V1`.
- O-E is absent from active canonical leaf allowlists.
- O-E is validated only as negative/blocking path and is never reachable as active leaf output.

## Candidate-Only Confirmation
For all 22 deterministic paths:
- status is `LEAF_REACHED_NOT_CLASSIFIED`
- leaf is exposed only as `leafCandidate.candidateOnlyLeafCode`
- `candidateOnly=true`
- `classificationAllowed=false`
- `notFinalClassification=true`
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`

## Final/Downstream Output Lock Confirmation
Traversal outputs continue to exclude:
- `selectedCode`
- `releasedCode`
- `CLASSIFIED`
- `finalConclusion`
- `HFACS`
- `Risk/ERC`
- `ARMS/ERC`
- `recommendations`

## Case Sensitivity Note
Canonical answer matching remains exact and case-sensitive. Lowercase values (e.g., `sim`) are blocked as invalid canonical answers.

## semantic-consistency `.toUpperCase()` Note
A4R190-G-R finding G-L-002 was reviewed. `.toUpperCase()` calls in `semanticRuleSet()` were kept as defensive normalization in semantic gate checks. No semantic behavior change was introduced in A4R190-H.

## Remaining Limits
1. Traversal remains passive candidate-only runtime behavior.
2. No productive pipeline/UI/API integration.
3. No final P/O/A closure behavior.
4. Escape-point scope trace remains passive (`PASSIVE_NOT_ENFORCED`).
