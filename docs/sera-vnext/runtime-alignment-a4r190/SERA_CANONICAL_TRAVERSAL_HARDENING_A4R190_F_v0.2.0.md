# SERA Canonical Traversal Hardening — A4R190-F v0.2.0

## Objective
Harden canonical traversal and adapter outputs so leaf reach cannot be misread as final classification, while preserving deterministic candidate-only behavior.

## Implemented Hardening
1. H-001 mitigation:
- leaf output now exposes `leafCandidate.candidateOnlyLeafCode` instead of a plain `leafCode` field.
- leaf candidate carries explicit guards:
  - `candidateOnly=true`
  - `classificationAllowed=false`
  - `notFinalClassification=true`
  - `selectedCodeAllowed=false`
  - `releasedCodeAllowed=false`

2. Intake normalization:
- adapter now normalizes node decision intake (`trim` on IDs, nodeId, answerValue, rationale, source phase, evidence refs).

3. Canonical answer enforcement:
- answer values remain exact canonical values only.
- invalid values return clear error token in blocking message:
  - `INVALID_CANONICAL_ANSWER_VALUE`

4. Runtime context trace (passive):
- traversal and adapter outputs include passive scope trace:
  - `approvedEscapePointScopeStatus`
  - `approvedEscapePointScopeId`
  - `enforcementStatus=PASSIVE_NOT_ENFORCED`

## Candidate-Only Contract (Preserved)
- no selected code output
- no released code output
- no classified status output
- no downstream output
- no final free conclusion output

## O-E Semantic Lock
- O-E remains non-existent in active canonical taxonomy and cannot be traversed as active leaf.

## Scope Limits
1. No legacy pipeline integration.
2. No UI integration.
3. No LLM execution.
4. No final P/O/A closure.
5. Escape scope remains passive and non-blocking.
