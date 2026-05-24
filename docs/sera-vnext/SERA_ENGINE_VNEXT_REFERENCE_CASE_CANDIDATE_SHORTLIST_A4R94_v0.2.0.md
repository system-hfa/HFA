# SERA Engine vNext Reference Case Candidate Shortlist A4R94 v0.2.0

Status: REFERENCE_CASE_CANDIDATE_SHORTLIST  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Define an initial shortlist of reference case candidates for calibration-trace construction, without changing functional adjudication or release status.

| caseId | referenceTypeCandidate | currentStatus | sourceStrength | traceCompleteness | whyCandidate | whyNotYetReference | tracePackCreated | tracePackFile | A4R95status | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | POSITIVE_REFERENCE_CASE | effective P-axis maintained after A4+R-92 | HIGH | HIGH | only effective P-axis maintained case after retrospective author review | n/a for first pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | RC1_TRACE_PACK_CREATED | use as first positive reference trace; later convert to front-end data contract |
| REAL-EVENT-0015 | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | MEDIUM | strong overclassification lesson (action-dominant versus prior P framing) | withdrawn boundary needs explicit question-shift narrative in one trace artifact | no | n/a | PENDING_RC1_WITHDRAWN_PACK | create withdrawn/boundary trace pack |
| N109W | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | LOW-MEDIUM | degraded meteorology/perception-source boundary is highly calibrating | needs compact escape-point and perceptual-boundary reconstruction | no | n/a | PENDING_RC1_WITHDRAWN_PACK | create withdrawn/boundary trace pack |
| N11NM | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | LOW-MEDIUM | IFR/disorientation context did not sustain prior P-C threshold | needs explicit mode/knowledge-evidence boundary articulation | no | n/a | PENDING_RC1_WITHDRAWN_PACK | create withdrawn/boundary trace pack |
| EXT-001 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong external factual structure and offshore monitoring boundary value | pending simple author dossier and internal trace packaging | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| EXT-002 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong warning-response chronology for perception/action boundary teaching | pending simple author dossier and deeper timing slices | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| EXT-009 | ADVERSARIAL_REFERENCE_CASE | adversarial control status | MEDIUM | MEDIUM | condition-dominant signal is useful to prevent false human overclassification | not intended as positive/classification exemplar | no | n/a | PENDING_ADVERSARIAL_TRACE | package as adversarial reference trace with explicit non-claim boundary |

## Notes
- This shortlist is design/planning only.
- No release/proposed/adjudication status is changed by this document.
