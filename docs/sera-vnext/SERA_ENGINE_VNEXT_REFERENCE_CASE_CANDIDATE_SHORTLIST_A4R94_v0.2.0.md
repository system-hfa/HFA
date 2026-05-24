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
| REAL-EVENT-0003 | POSITIVE_REFERENCE_CASE (REBUILD_REQUIRED) | effective P-axis maintained after A4+R-92; A4R95 trace superseded for reference use | HIGH | LOW | only effective P-axis maintained case after retrospective author review | A4R95 used noncanonical/generic questions and is invalid for reference/front-end use | yes (historical only) | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | A4R96_SUPERSEDED_INVALID_FOR_REFERENCE_USE | rebuild now enabled using canonical tree (`FOUND_COMPLETE`) |
| REAL-EVENT-0015 | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | strong overclassification lesson (action-dominant versus prior P framing) | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as withdrawn/boundary calibration case in future UI trace set |
| N109W | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | degraded meteorology/perception-source boundary is highly calibrating | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as weather-source boundary calibration case |
| N11NM | WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE | withdrawn by author review in A4+R-92 | MEDIUM | HIGH | IFR/disorientation context did not sustain prior P-C threshold | n/a for boundary-pack baseline | yes | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | A4R96_WITHDRAWN_BOUNDARY_PACK_CREATED | use as P-C threshold-discipline calibration case |
| EXT-001 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong external factual structure and offshore monitoring boundary value | pending simple author dossier and internal trace packaging | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| EXT-002 | POSITIVE_REFERENCE_CASE candidate | READY_FOR_AUTHOR_REVIEW, no release | HIGH | MEDIUM | strong warning-response chronology for perception/action boundary teaching | pending simple author dossier and deeper timing slices | no | n/a | PENDING_RC2_AUTHOR_REVIEW | run simple author dossier; then decide on full trace pack |
| BS211-Q400 | POSITIVE_REFERENCE_CASE candidate (HIGH_PRIORITY_AFTER_A4R97_SWEEP) | AUTHOR_REVIEW_READY with tri-axis diversity (`P-H`, `O-C`, `A-F`) | HIGH | MEDIUM | strongest current in-repo diversity exemplar with non-trivial O/A path | canonical reference trace not yet rebuilt under exact-question contract | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | draft canonical trace after REAL-EVENT-0003 rebuild |
| REAL-EVENT-0016 | BOUNDARY/ADVERSARIAL_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-C`, automation/mode-awareness boundary), no release | MEDIUM | MEDIUM | strong automation-mode awareness boundary case for threshold discipline | canonical micro-trace and evidence disambiguation still pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | build canonical micro-trace and decide boundary type |
| HL9294 | BOUNDARY_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-G`, `O-D`, `A unresolved`) | MEDIUM | MEDIUM | objective/perception boundary case with continuation pressure signal | unresolved A-axis and canonical trace rebuild pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace before promotion decision |
| G-BHYB | BOUNDARY_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-F`, `O-A`, `A unresolved`) | MEDIUM | MEDIUM | night-offshore perceptual boundary diversity (P-F pattern) | unresolved A-axis and canonical trace rebuild pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace before promotion decision |
| D-HHNH | BOUNDARY_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-G`, `O-A`, `A unresolved`) | MEDIUM | MEDIUM | low-visibility boundary case with actor/attention uncertainty | unresolved A-axis and canonical trace rebuild pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace before promotion decision |
| EXT-006 | POSITIVE_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`O-D` draft, `P/A unresolved`) | MEDIUM | MEDIUM | external objective-boundary diversity beyond P-only candidates | canonical trace rebuild and boundary disambiguation pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace and objective-branch validation |
| EXT-008 | BOUNDARY_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-C` draft), no release | MEDIUM | MEDIUM | external automation/perception threshold calibration candidate | canonical micro-trace and threshold evidence still pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace before promotion decision |
| EXT-012 | BOUNDARY_REFERENCE_CASE candidate | AUTHOR_REVIEW_READY (`P-C` draft), no release | MEDIUM | MEDIUM | complementary external P-C threshold discipline case | canonical micro-trace and threshold evidence still pending | no | n/a | A4R97_HIGH_POTENTIAL_IDENTIFIED | canonical micro-trace before promotion decision |
| EXT-009 | ADVERSARIAL_REFERENCE_CASE | adversarial control status | MEDIUM | MEDIUM | condition-dominant signal is useful to prevent false human overclassification | not intended as positive/classification exemplar | no | n/a | PENDING_ADVERSARIAL_TRACE | package as adversarial reference trace with explicit non-claim boundary |

## Notes
- This shortlist is design/planning only.
- No release/proposed/adjudication status is changed by this document.
- A4+R-95 trace pack is superseded due to noncanonical/generic question flow.
- Canonical O/P/A tree sources are confirmed in A4+R-96 (`FOUND_COMPLETE`).
- Full-scope canonical re-audit sweep is recorded in A4+R-97:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_REAUDIT_SWEEP_ALL_EVENTS_A4R97_v0.2.0.md`
- Next reference-case phase is the canonical rebuild of REAL-EVENT-0003.
