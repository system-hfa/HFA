# SERA vNext Product Beta Workflow

Analysis statuses:

- `CANDIDATE_ANALYSIS_CREATED`
- `UNDER_HUMAN_REVIEW`
- `REQUIRES_MORE_EVIDENCE`
- `RETURNED_FOR_REANALYSIS`
- `HUMAN_REVIEW_COMPLETED_NON_FINAL`
- `ARCHIVED`

Review statuses:

- `NOT_REVIEWED`
- `IN_REVIEW`
- `WORKING_HYPOTHESIS_ACCEPTED`
- `WORKING_HYPOTHESIS_REJECTED`
- `MORE_EVIDENCE_REQUIRED`
- `REANALYSIS_REQUIRED`
- `REVIEW_COMPLETED_NON_FINAL`

Valid transitions are centralized in `frontend/src/lib/sera-vnext-product/transitions.ts`. No final classification transition exists.
