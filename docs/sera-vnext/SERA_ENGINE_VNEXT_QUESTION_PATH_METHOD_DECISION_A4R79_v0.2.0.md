# SERA Engine vNext QuestionPath Method Decision A4R79 v0.2.0

Status: AUTHOR_METHOD_DECISION_DRAFT  
Phase: A4+R-79 — QuestionPath Template and Backfill Plan  
DOCS_ONLY  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Decision
`questionPath` becomes mandatory for new AI/Author adjudications.

`questionPath` becomes recommended and necessary before any future `releasedCode` consideration, because release criteria should compare cases with equivalent traceability.

`questionPath` is not an automatic release gate.

`questionPath` does not replace author decision.

`questionPath` is a documentary prerequisite for comparing cases across batches, especially where earlier adjudications used narrative reasoning without standardized question items.

## Consequences
- The initial batch and Batch 2 need backfill before release criteria design.
- Batch 3 becomes the current reference format for P/O/A `questionPath`.
- Future external searches and real-report harvests should use `questionPath` from the first adjudication pass.
- Backfill must preserve existing `proposedCode`, `UNRESOLVED`, and `maturityStatus`.
- Any strong inconsistency found during backfill must be marked `BACKFILL_CONFLICT_FOR_AUTHOR_REVIEW`, not corrected automatically.

## Objective-axis guardrail
`O-E = NON_EXISTENT_IN_SERA_PT_V1`.

Active Objective codes remain:
- `O-A`
- `O-B`
- `O-C`
- `O-D`
- `UNRESOLVED`

`O-E` must not be used as an active code or reserved future code. It may appear only as a negative/adversarial guardrail.

## Release posture
This decision does not authorize:
- `releasedCode`;
- `selectedCode=CLASSIFIED`;
- finalConclusion;
- HFACS;
- Risk/ERC;
- recommendations;
- fixture or baseline creation;
- downstream opening;
- UI/API/DB or runtime implementation.

## Next phase
Recommended next phase: **A4+R-80 — QuestionPath Backfill for First 15 Events**.

