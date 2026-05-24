# SERA Engine vNext Prioritized Work Queue A4R101 v0.2.0

Status: PRIORITIZED_WORK_QUEUE  
Phase: A4+R-101  
DOCS_ONLY  
PRIORITIZATION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Queue Table
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Combined author review of A4R100 + A4R102 | REAL-EVENT-0003 plus withdrawn trio pack decision gate | A4R100 is `PASS_WITH_LIMITATIONS` and A4R102 is `REVIEW_REQUIRED`; both need explicit author decision before front-end use. | Chat + Codex | 2 artifacts | Author decision recorded for both artifacts (accepted with boundaries or correction requested). |
| P0 | Register Block 1 gate outcome | Governance docs and readiness sync | Block 1 is technically complete but remains gated by author review outcome. | Codex | 1 batch | Matrix/roadmap/readiness reflect final Block 1 review gate state. |
| P1 | Canonical reclassification sweep of tracked corpus | 37 tracked events in one pass | Consolidates method recovery and defines stable shortlist without microphase drift. | DeepSeek + Codex | 37 events | Matrix updated with canonical statuses, parked list finalized, and 5-8 solid candidates selected. |
| P1 | Candidate shortlist hardening | Best 5-8 from sweep | Moves from broad corpus to manageable high-quality reference pipeline. | DeepSeek | 5-8 events | Each shortlisted event has canonical eligibility rationale and next-action dossier target. |
| P2 | External solid-event expansion | New external sources/events | Increases diversity only after canonical recovery stabilizes internally. | ChatGPT (search/curation) + Codex (versioning) | 1 batch | New candidate batch documented with quarantine and source-quality fields completed. |
| P2 | Front-end data contract preparation | Canonical reference data model | Front-end should only consume approved canonical reference artifacts. | Codex | 1 contract package | Contract draft explicitly bound to canonical fields and excludes invalid artifacts. |

## Priority Guardrails
- No work item in this queue authorizes new release creation.
- No work item in this queue authorizes downstream opening.
- Any missing canonical node/question path must stop trace work (`CANONICAL_NODE_MISSING`).
