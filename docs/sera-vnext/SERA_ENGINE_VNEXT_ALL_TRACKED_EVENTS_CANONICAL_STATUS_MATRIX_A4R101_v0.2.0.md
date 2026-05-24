# SERA Engine vNext All Tracked Events Canonical Status Matrix A4R101 v0.2.0

Status: ALL_TRACKED_EVENTS_CANONICAL_STATUS_MATRIX  
Phase: A4+R-101  
DOCS_ONLY  
MACRO_AUDIT_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Scope
- Internal real events: 30
- External adjudicated events (Batch 1): 7
- Release/withdrawal records included: 4
- Total rows tracked in this matrix: 41

## Classification Rules Used
- Source of canonical flow: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `PASS_WITH_LIMITATIONS` trace outcome is treated as `POSITIVE_REFERENCE_CANDIDATE` pending author review before front-end use.
- Historical noncanonical artifacts are never treated as canonical trace readiness.

## Event Matrix
| eventId | sourceGroup | currentP | currentO | currentA | currentStatus | canonicalTraceStatus | referenceUseCategory | reason | nextAction |
|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0001 | internal30 | P-G | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | Draft status exists, but no canonical node-by-node trace yet. | Build canonical trace from asset and run checklist. |
| REAL-EVENT-0002 | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Evidence gaps remain active in P/A path. | Keep parked until source enrichment closes gaps. |
| REAL-EVENT-0004 | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Evidence/actor decomposition remains insufficient. | Keep parked until source enrichment closes gaps. |
| REAL-EVENT-0006 | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Condition-dominant technical profile with strict hold. | Park as unresolved unless new discriminating evidence appears. |
| REAL-EVENT-0028 | internal30 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | PARKED | PARKED_UNRESOLVED | Source partial triage only. | Keep parked; prioritize only after source upgrade. |
| REAL-EVENT-0003 | internal30 | P-G | O-A | UNRESOLVED | MAINTAIN_APPROVAL (A4R92) | CANONICAL_TRACE_DRAFT | POSITIVE_REFERENCE_CANDIDATE | A4R100 canonical trace exists with `PASS_WITH_LIMITATIONS`. | Author review for promotion to front-end-safe positive reference. |
| REAL-EVENT-0005 | internal30 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Helideck dynamics and PF/PM split still incomplete. | Keep enrichment queue; do not force coding. |
| REAL-EVENT-0010 | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Boundary remains condition-vs-action ambiguous. | Keep parked unresolved. |
| REAL-EVENT-0013 | internal30 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Source identity mismatch not solved. | Resolve source identity before any canonical trace attempt. |
| REAL-EVENT-0015 | internal30 | P-G (historical) | O-A | UNRESOLVED | WITHDRAWN_BY_AUTHOR_REVIEW (A4R92) | CANONICAL_TRACE_DRAFT | BOUNDARY_WITHDRAWN_REFERENCE | Canonical withdrawn/boundary pack created in A4R102; review still required. | Run author review before any front-end boundary calibration use. |
| REAL-EVENT-0016 | internal30 | P-C | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | Strong adversarial/boundary candidate pending canonical trace. | Build canonical trace and then decide positive vs adversarial control role. |
| REAL-EVENT-0007 | internal30 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Maintenance chain evidence incomplete. | Keep enrichment queue. |
| REAL-EVENT-0008 | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Technical condition dominant; avoid forced attribution. | Keep parked unresolved. |
| REAL-EVENT-0009 | internal30 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Barrier/response evidence remains insufficient. | Keep enrichment queue. |
| REAL-EVENT-0011 | internal30 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Taxi hazard awareness chain incomplete. | Keep enrichment queue. |
| REAL-EVENT-0014/0030 | internal30 | UNRESOLVED | UNRESOLVED | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Source partial and condition-dominant uncertainty. | Keep enrichment queue. |
| N56RD | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Technical emergency/action boundary unresolved. | Keep parked unresolved. |
| D-HHNH | internal30 | P-G | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | High-value candidate with no canonical trace built yet. | Build canonical trace and dossier. |
| G-BHYB | internal30 | P-F | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | Strong night/offshore perception boundary signal. | Build canonical trace and dossier. |
| HL9294 | internal30 | P-G | O-D | UNRESOLVED | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | Objective-diversity candidate pending canonical proof path. | Build canonical trace and dossier. |
| PR-CHI | internal30 | P-H | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | Communication/motion chain still thin. | Keep enrichment queue. |
| N200BK | internal30 | P-G | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | IMC decision/control boundary still unresolved in action. | Keep parked unresolved. |
| N109W | internal30 | P-G (historical) | O-D | UNRESOLVED | WITHDRAWN_BY_AUTHOR_REVIEW (A4R92) | CANONICAL_TRACE_DRAFT | BOUNDARY_WITHDRAWN_REFERENCE | Canonical withdrawn/boundary pack created in A4R102; review still required. | Run author review before any front-end boundary calibration use. |
| N11NM | internal30 | P-C (historical) | O-A | UNRESOLVED | WITHDRAWN_BY_AUTHOR_REVIEW (A4R92) | CANONICAL_TRACE_DRAFT | BOUNDARY_WITHDRAWN_REFERENCE | Canonical withdrawn/boundary pack created in A4R102; review still required. | Run author review before any front-end boundary calibration use. |
| N127LN | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Fatigue precondition boundary remains unresolved. | Keep parked unresolved. |
| N120HH | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | PARKED_UNRESOLVED | Uncontained failure remains condition-dominant. | Keep parked unresolved. |
| N525TA | internal30 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | PARKED | ADVERSARIAL_CONTROL | Test-envelope case is high-value as over-attribution control. | Keep parked as adversarial control candidate. |
| BS211-Q400 | internal30 | P-H | O-C | A-F | AUTHOR_REVIEW_READY | NO_CANONICAL_TRACE | POSITIVE_REFERENCE_CANDIDATE | High diversity across P/O/A but still noncanonical trace form. | Build full canonical trace before any reference promotion. |
| REAL-EVENT-0032 | internal30 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | NEEDS_SOURCE_ENRICHMENT | NOT_RELEASE_PRIORITY | Source partial correspondence triage only. | Keep triage parked. |
| REAL-EVENT-0033 | internal30 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | NEEDS_SOURCE_ENRICHMENT | NOT_RELEASE_PRIORITY | Source partial correspondence triage only. | Keep triage parked. |
| EXT-001 | externalBatch1 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | External adjudicated draft without canonical trace artifact. | Build canonical trace + author dossier before any reference use. |
| EXT-002 | externalBatch1 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | External adjudicated draft without canonical trace artifact. | Build canonical trace + author dossier before any reference use. |
| EXT-004 | externalBatch1 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | External adjudicated draft with good P signal but no canonical trace. | Build canonical trace + author dossier before any reference use. |
| EXT-006 | externalBatch1 | UNRESOLVED | O-D | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | Objective-boundary candidate with unresolved P/A. | Build canonical trace + author dossier before any reference use. |
| EXT-007 | externalBatch1 | UNRESOLVED | UNRESOLVED | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | External enrichment still required. | Keep enrichment queue parked. |
| EXT-008 | externalBatch1 | P-C | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | Automation-oriented candidate pending canonical trace. | Build canonical trace + author dossier before any reference use. |
| EXT-012 | externalBatch1 | P-C | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | NEEDS_AUTHOR_DOSSIER | POSITIVE_REFERENCE_CANDIDATE | Automation-oriented candidate pending canonical trace. | Build canonical trace + author dossier before any reference use. |
| P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85 | releasePilot | P-G | none | none | RELEASE_MAINTAINED_AFTER_A4R92 | CANONICAL_TRACE_DRAFT | POSITIVE_REFERENCE_CANDIDATE | Effective P release maintained and rebuilt canonically in A4R100 with limitations. | Keep as maintained pilot record linked to A4R100 author review. |
| P-AXIS-RELEASE-PILOT-REAL-EVENT-0015-PG-A4R85 | withdrawn | P-G (withdrawn) | none | none | WITHDRAWN_BY_AUTHOR_REVIEW | NONCANONICAL_TRACE_INVALID | BOUNDARY_WITHDRAWN_REFERENCE | Historical pilot release remains noncanonical artifact; canonical boundary replacement now exists in A4R102. | Keep historical status; use A4R102 pack after author review. |
| P-AXIS-RELEASE-PILOT-N109W-PG-A4R85 | withdrawn | P-G (withdrawn) | none | none | WITHDRAWN_BY_AUTHOR_REVIEW | NONCANONICAL_TRACE_INVALID | BOUNDARY_WITHDRAWN_REFERENCE | Historical pilot release remains noncanonical artifact; canonical boundary replacement now exists in A4R102. | Keep historical status; use A4R102 pack after author review. |
| P-AXIS-RELEASE-PILOT-N11NM-PC-A4R85 | withdrawn | P-C (withdrawn) | none | none | WITHDRAWN_BY_AUTHOR_REVIEW | NONCANONICAL_TRACE_INVALID | BOUNDARY_WITHDRAWN_REFERENCE | Historical pilot release remains noncanonical artifact; canonical boundary replacement now exists in A4R102. | Keep historical status; use A4R102 pack after author review. |

## Macro Totals (A4R101)
- CANONICAL_TRACE_READY: 0
- CANONICAL_TRACE_DRAFT: 5 (REAL-EVENT-0003 plus withdrawn trio canonical boundary draft rows)
- NONCANONICAL_TRACE_INVALID: 3
- NO_CANONICAL_TRACE: 11
- PARKED: 8
- NEEDS_AUTHOR_DOSSIER: 6
- NEEDS_SOURCE_ENRICHMENT: 8

## Notes
- `REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md` remains `PASS_WITH_LIMITATIONS`; therefore REAL-EVENT-0003 is still a candidate pending author confirmation before front-end calibration use.
- Withdrawn trio remains withdrawn and is explicitly separated as boundary-reference material with canonical pack drafted in A4R102:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md`
- A4R102 boundary pack and A4R100 positive pack both require author review before front-end use.
- No row in this matrix creates release, changes release, or reduces unresolved status.
