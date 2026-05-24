# SERA Engine vNext Reference Case Candidate Shortlist A4R94 v0.2.0

Status: REFERENCE_CASE_CANDIDATE_SHORTLIST  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Define an initial shortlist of reference case candidates for calibration-trace construction, without changing functional adjudication or release status.

| caseId | referenceTypeCandidate | currentStatus | sourceStrength | traceCompleteness | whyCandidate | whyNotYetReference | tracePackCreated | tracePackFile | phaseStatus | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | POSITIVE_REFERENCE_CASE (REBUILD_REQUIRED) | effective P-axis maintained after A4+R-92; A4R95 trace superseded for reference use | HIGH | LOW | only effective P-axis maintained case after retrospective author review | A4R95 used noncanonical/generic questions and is invalid for reference/front-end use | yes (historical only) | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | A4R96_SUPERSEDED_INVALID_FOR_REFERENCE_USE | rebuild from canonical tree only after canonicalTreeStatus allows |
| REAL-EVENT-0015 | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | strong overclassification lesson (action-dominant versus prior P framing) | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as withdrawn/boundary calibration case in future UI trace set |
| N109W | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | degraded meteorology/perception-source boundary is highly calibrating | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as weather-source boundary calibration case |
| N11NM | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | IFR/disorientation context did not sustain prior P-C threshold | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as P-C threshold-discipline calibration case |
| EXT-001 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong external factual structure and offshore monitoring boundary value | pending simple author dossier and internal trace packaging | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| EXT-002 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong warning-response chronology for perception/action boundary teaching | pending simple author dossier and deeper timing slices | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| EXT-009 | ADVERSARIAL_REFERENCE_CASE | adversarial control status | MEDIUM | MEDIUM | condition-dominant signal is useful to prevent false human overclassification | not intended as positive/classification exemplar | no | n/a | PENDING_ADVERSARIAL_TRACE | package as adversarial reference trace with explicit non-claim boundary |

## Notes
- This shortlist is design/planning only.
- No release/proposed/adjudication status is changed by this document.
- A4+R-95 trace pack is superseded due to noncanonical/generic question flow.
- Reference-case work is blocked until canonical SERA/CERA tree sources are used with exact question text.
- Next reference-case phase selection depends on `canonicalTreeStatus` (FOUND_COMPLETE vs FOUND_PARTIAL vs NOT_FOUND).
