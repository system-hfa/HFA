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
| P0 | Select first canonical trace build batch | 3-5 events from A4R103 shortlist | Screening is complete; next work is trace construction for strongest candidates. | Codex | 3-5 events | Batch chosen without treating selection as author approval. |
| P0 | Build canonical trace candidates | Selected strong candidates | Trace candidates are needed before author review is meaningful. | Codex | 3-5 traces | Each trace uses A4R99 asset and checklist, with no release or front-end promotion. |
| P1 | Candidate shortlist hardening | Remaining strong/good candidates | Moves from broad corpus to manageable high-quality reference pipeline. | Codex | 5-8 events | Each shortlisted event has canonical eligibility rationale and next-action dossier target. |
| P1 | Boundary/adversarial package planning | A4R103 parked/boundary list | Boundary cases are useful after positive trace candidates are stable. | Codex | 1 batch | Boundary candidates are separated from positive reference candidates. |
| P2 | External solid-event expansion | New external sources/events | Increases diversity only after canonical recovery stabilizes internally. | ChatGPT (search/curation) + Codex (versioning) | 1 batch | New candidate batch documented with quarantine and source-quality fields completed. |
| P2 | Front-end data contract preparation | Canonical reference data model | Front-end should only consume approved canonical reference artifacts. | Codex | 1 contract package | Contract draft explicitly bound to canonical fields and excludes invalid artifacts. |

## Priority Guardrails
- No work item in this queue authorizes new release creation.
- No work item in this queue authorizes downstream opening.
- Any missing canonical node/question path must stop trace work (`CANONICAL_NODE_MISSING`).
- A4R103 screening is complete and did not require author approval.

## A4+R-104 queue update
- Completed in A4R104:
  - P0 batch selection and canonical trace drafts for `REAL-EVENT-0016`, `BS211-Q400`, and `EXT-002`.
  - Execution remained docs-only, no release, no downstream, no author approval.

## Immediate queue after A4R104
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Batch author-review bundle preparation (conditional) | A4R104 three-trace batch | Move from draft build to comparable review package without promotion. | Codex | 1 bundle | At least two A4R104 drafts are `PASS_WITH_LIMITATIONS` or better; bundle excludes any release action. |
| P0 | Source-slice expansion fallback (conditional) | Any A4R104 draft below threshold | Prevent overclassification when canonical confidence is insufficient. | Codex | 1 focused slice batch | Missing/weak evidence for weak nodes is explicitly reduced before review bundle. |
| P1 | Candidate shortlist hardening | Remaining strong/good candidates | Keeps reference pipeline scalable after first draft batch. | Codex | 5-8 events | Updated shortlist with explicit draft-readiness flags and blocking reasons. |
