# SERA Engine vNext All Events Screening Matrix A4R103 v0.2.0

Status: ALL_EVENTS_SCREENING_MATRIX  
Phase: A4+R-103  
DOCS_ONLY  
SCREENING_ONLY  
PRIORITIZATION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Coverage
- Internal real events: 30
- External adjudicated events: 7
- External extracted non-adjudicated candidates: 5
- Release/withdrawal records: 4
- Total screened rows: 46

| eventId | sourceGroup | aircraft/event | sourceStrength | factualTimelineClarity | safeOperationEscapePointClarity | canonicalSeraPathClarity | strongestAxisCandidate | ambiguityRisk | overclassificationRisk | category | reason | nextAction | authorApprovalNeededNow | authorApprovalNeededLater |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0001 | internal30 | Thebaud S-92A offshore low-energy descent | HIGH | MEDIUM | MEDIUM | MEDIUM | P | MEDIUM | MEDIUM | GOOD_CANDIDATE_NEEDS_SOURCE_SLICE | strong factual core but PF/PM decomposition still partial | targeted source slice then canonical trace build | false | yes |
| REAL-EVENT-0002 | internal30 | Peasmarsh discontinued night approach | MEDIUM | LOW | LOW | LOW | P/A boundary | HIGH | HIGH | SOURCE_ENRICHMENT_REQUIRED | warning/go-around evidence chain insufficient | enrich sources before any trace promotion | false | yes |
| REAL-EVENT-0004 | internal30 | Vigo SAR low-height descent | MEDIUM | LOW | LOW | LOW | P/A boundary | HIGH | HIGH | SOURCE_ENRICHMENT_REQUIRED | actor decomposition and cue chain incomplete | enrich source slices and keep unresolved | false | yes |
| REAL-EVENT-0006 | internal30 | 5N-BQJ technical anomaly/ditching | HIGH | MEDIUM | MEDIUM | LOW | Condition dominant | HIGH | LOW | BOUNDARY_ADVERSARIAL_USEFUL | strong control case against forced human coding | retain as adversarial boundary case | false | yes |
| REAL-EVENT-0028 | internal30 | HL9661 tail rotor strike (source partial) | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | NOT_REFERENCE_PRIORITY | source partial triage only | keep parked until primary-source upgrade | false | no |
| REAL-EVENT-0003 | internal30 | Tofino night approach near-CFIT | HIGH | HIGH | HIGH | HIGH | P | LOW | MEDIUM | STRONG_REFERENCE_CANDIDATE | canonical path already demonstrated in A4R100 with strong factual anchors | prioritize for repeatable reference pipeline | false | yes |
| REAL-EVENT-0005 | internal30 | PK-TVY helideck tumble | MEDIUM | LOW | LOW | LOW | P/A boundary | HIGH | HIGH | SOURCE_ENRICHMENT_REQUIRED | helideck dynamics and mechanism split still uncertain | enrich timeline and role split | false | yes |
| REAL-EVENT-0010 | internal30 | N798P helideck rollover reposition | MEDIUM | MEDIUM | LOW | LOW | Condition vs action | HIGH | HIGH | PARKED_UNRESOLVED | persistent ambiguity without mechanism closure | keep parked unresolved | false | yes |
| REAL-EVENT-0013 | internal30 | Aeroleo source identity mismatch | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | source identity mismatch blocks robust pathing | resolve source identity before screening upgrade | false | yes |
| REAL-EVENT-0015 | internal30 | PH-KHB S-76B dark-night offshore approach | HIGH | HIGH | MEDIUM | MEDIUM | P/A boundary | HIGH | HIGH | BOUNDARY_ADVERSARIAL_USEFUL | withdrawn case with canonical boundary lesson (A4R102) | keep as boundary calibration, no positive promotion | false | yes |
| REAL-EVENT-0016 | internal30 | N8DX automation confusion LOC | HIGH | HIGH | MEDIUM | MEDIUM | P (automation boundary) | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | strong automation-mode boundary with good chronology | include in top shortlist for canonical trace build | false | yes |
| REAL-EVENT-0007 | internal30 | 5N-BGD pushrod separation crash | MEDIUM | LOW | LOW | LOW | Condition dominant | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | maintenance chain still under-specified | enrich technical-to-human transition evidence | false | yes |
| REAL-EVENT-0008 | internal30 | PK-FUP control linkage failure | MEDIUM | MEDIUM | LOW | LOW | Condition dominant | HIGH | LOW | PARKED_UNRESOLVED | strong condition dominance and weak human mechanism closure | keep parked unresolved | false | yes |
| REAL-EVENT-0009 | internal30 | N748P bird strike barrier breach | MEDIUM | LOW | LOW | LOW | P/A boundary | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | barrier/response chain incomplete | enrich source before trace attempt | false | yes |
| REAL-EVENT-0011 | internal30 | N860AL taxi pothole collapse | MEDIUM | LOW | LOW | LOW | P/A boundary | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | route/hazard awareness evidence thin | source slice for hazard cue chain | false | yes |
| REAL-EVENT-0014/0030 | internal30 | Roncador post-takeoff ditching | LOW | LOW | LOW | LOW | Condition dominant | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | source partial and uncertain mechanism | enrich primary sources | false | yes |
| N56RD | internal30 | Gulf forced ditching | MEDIUM | MEDIUM | MEDIUM | LOW | Technical-emergency boundary | HIGH | MEDIUM | BOUNDARY_ADVERSARIAL_USEFUL | useful for boundary discipline without forced coding | keep as boundary/adversarial resource | false | yes |
| D-HHNH | internal30 | S-76B low-viz low-altitude incident | HIGH | HIGH | MEDIUM | MEDIUM | P | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | strong low-viz sequence and teachable monitoring boundary | prioritize for canonical trace build | false | yes |
| G-BHYB | internal30 | Night sea-contact event | HIGH | MEDIUM | MEDIUM | MEDIUM | P (P-F/P-G boundary) | MEDIUM | MEDIUM | GOOD_CANDIDATE_NEEDS_SOURCE_SLICE | good perceptual boundary but still requires tighter source slicing | targeted slicing then trace build | false | yes |
| HL9294 | internal30 | Gangnam low-viz CFIT | HIGH | HIGH | HIGH | MEDIUM | P/O boundary | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | objective-diversity plus clear continuation boundary | prioritize for canonical trace build | false | yes |
| PR-CHI | internal30 | Helideck motion mismatch | MEDIUM | LOW | LOW | LOW | Communication boundary | HIGH | MEDIUM | SOURCE_ENRICHMENT_REQUIRED | communication-motion chain not sufficiently anchored | enrich sources before promotion | false | yes |
| N200BK | internal30 | Rooftop impact in IMC | MEDIUM | MEDIUM | LOW | LOW | P/A boundary | HIGH | HIGH | PARKED_UNRESOLVED | unresolved action path dominates uncertainty | keep parked unresolved | false | yes |
| N109W | internal30 | A109A II mountain CFIT | HIGH | HIGH | HIGH | MEDIUM | Weather-source boundary | HIGH | HIGH | BOUNDARY_ADVERSARIAL_USEFUL | withdrawn case with degraded-source regime lesson | keep as boundary calibration, no positive promotion | false | yes |
| N11NM | internal30 | AW109S missed-approach LOC | HIGH | HIGH | MEDIUM | MEDIUM | P-C threshold boundary | HIGH | HIGH | BOUNDARY_ADVERSARIAL_USEFUL | withdrawn case for P-C threshold discipline | keep as boundary calibration, no positive promotion | false | yes |
| N127LN | internal30 | Fatigue LOC-I | MEDIUM | MEDIUM | LOW | LOW | Fatigue boundary | HIGH | HIGH | PARKED_UNRESOLVED | precondition-heavy with unresolved mechanism | keep parked unresolved | false | yes |
| N120HH | internal30 | Uncontained engine failure | MEDIUM | MEDIUM | LOW | LOW | Condition dominant | HIGH | LOW | PARKED_UNRESOLVED | condition-dominant event with limited discriminating human chain | keep parked unresolved | false | yes |
| N525TA | internal30 | Flight-test breakup | MEDIUM | MEDIUM | MEDIUM | LOW | Adversarial control | HIGH | LOW | BOUNDARY_ADVERSARIAL_USEFUL | high-value overclassification control event | retain as adversarial control | false | yes |
| BS211-Q400 | internal30 | Unstable approach sequence | HIGH | HIGH | HIGH | MEDIUM | Tri-axis (P/O/A) | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | strongest internal diversity exemplar with nontrivial A signal | top priority for canonical trace build | false | yes |
| REAL-EVENT-0032 | internal30 | A320 G-EZWM correspondence triage | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | NOT_REFERENCE_PRIORITY | source-partial correspondence triage | keep not-priority parked | false | no |
| REAL-EVENT-0033 | internal30 | B737 EI-EFB correspondence triage | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | NOT_REFERENCE_PRIORITY | source-partial correspondence triage | keep not-priority parked | false | no |
| EXT-001 | externalBatch1Adjudicated | TSB A19A0055 S-92A offshore | HIGH | HIGH | HIGH | MEDIUM | P | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | strong extraction quality and offshore comparator value | include in strong shortlist | false | yes |
| EXT-002 | externalBatch1Adjudicated | NTSB ERA19FA210 AW139 night over-water | HIGH | HIGH | HIGH | MEDIUM | P/A boundary | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | warning-response and monitoring boundary well documented | include in strong shortlist | false | yes |
| EXT-004 | externalBatch1Adjudicated | TSB A15P0217 S-76C+ | HIGH | HIGH | HIGH | MEDIUM | P | MEDIUM | LOW | DUPLICATE_OR_ALREADY_COVERED | external parallel of REAL-EVENT-0003 evidence family already covered | keep as supporting comparator, not primary shortlist item | false | no |
| EXT-006 | externalBatch1Adjudicated | NTSB AAR-18/02 C208B TAWS inhibited CFIT | HIGH | HIGH | HIGH | MEDIUM | O boundary | MEDIUM | MEDIUM | STRONG_REFERENCE_CANDIDATE | objective/procedure boundary with strong source quality | include in strong shortlist | false | yes |
| EXT-007 | externalBatch1Adjudicated | NTSB CEN10FA079 S-76C++ rollover | MEDIUM | MEDIUM | LOW | LOW | A boundary | HIGH | HIGH | SOURCE_ENRICHMENT_REQUIRED | terminal handling sequence enrichment still required | enrich before shortlist promotion | false | yes |
| EXT-008 | externalBatch1Adjudicated | TSB A11H0001 S-92A AFCS/go-around | HIGH | MEDIUM | MEDIUM | MEDIUM | P-C boundary | MEDIUM | MEDIUM | GOOD_CANDIDATE_NEEDS_SOURCE_SLICE | good automation boundary but needs tighter slices | targeted source slice then trace build | false | yes |
| EXT-012 | externalBatch1Adjudicated | NTSB CEN17FA072 CJ4 mode comparator | MEDIUM | MEDIUM | MEDIUM | MEDIUM | P-C boundary | MEDIUM | MEDIUM | GOOD_CANDIDATE_NEEDS_SOURCE_SLICE | useful comparator with medium confidence | source slice and comparator harmonization | false | yes |
| EXT-003 | externalBatch1Extracted | AAIB 5/1988 S-76A offshore night | MEDIUM | MEDIUM | MEDIUM | LOW | P boundary | MEDIUM | MEDIUM | GOOD_CANDIDATE_NEEDS_SOURCE_SLICE | partial access and legacy extraction limits | source recheck/slice before adjudication | false | yes |
| EXT-005 | externalBatch1Extracted | ATSB AO-2024-007 E190 mode confusion | LOW | LOW | LOW | LOW | P-C boundary | HIGH | HIGH | SOURCE_ENRICHMENT_REQUIRED | partial access and low extraction confidence | source retrieval and quality uplift first | false | yes |
| EXT-009 | externalBatch1Extracted | TSB A23P0136 S-76C++ lightning rapid descent | MEDIUM | MEDIUM | MEDIUM | LOW | Condition-dominant control | HIGH | LOW | BOUNDARY_ADVERSARIAL_USEFUL | explicit condition-dominant adversarial control value | retain as adversarial control case | false | yes |
| EXT-010 | externalBatch1Extracted | BEA PK-TVY notified page | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | NOT_REFERENCE_PRIORITY | notified-event locator only, not a full report | hold until primary-source report exists | false | no |
| EXT-011 | externalBatch1Extracted | BEA 5N-BQJ notified page | LOW | LOW | LOW | LOW | none | HIGH | MEDIUM | NOT_REFERENCE_PRIORITY | locator-only source is insufficient for canonical screening promotion | hold until primary-source report exists | false | no |
| P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85 | releasePilot | historical pilot release record (REAL-EVENT-0003) | HIGH | HIGH | HIGH | HIGH | P | LOW | LOW | DUPLICATE_OR_ALREADY_COVERED | already covered by A4R100 canonical trace | maintain as historical linkage only | false | no |
| P-AXIS-RELEASE-PILOT-REAL-EVENT-0015-PG-A4R85 | withdrawnPilot | historical withdrawn pilot record (0015) | HIGH | HIGH | MEDIUM | MEDIUM | boundary | HIGH | HIGH | DUPLICATE_OR_ALREADY_COVERED | already covered by A4R102 canonical boundary pack | maintain as historical linkage only | false | no |
| P-AXIS-RELEASE-PILOT-N109W-PG-A4R85 | withdrawnPilot | historical withdrawn pilot record (N109W) | HIGH | HIGH | HIGH | MEDIUM | boundary | HIGH | HIGH | DUPLICATE_OR_ALREADY_COVERED | already covered by A4R102 canonical boundary pack | maintain as historical linkage only | false | no |
| P-AXIS-RELEASE-PILOT-N11NM-PC-A4R85 | withdrawnPilot | historical withdrawn pilot record (N11NM) | HIGH | HIGH | MEDIUM | MEDIUM | boundary | HIGH | HIGH | DUPLICATE_OR_ALREADY_COVERED | already covered by A4R102 canonical boundary pack | maintain as historical linkage only | false | no |

## Category Totals
- STRONG_REFERENCE_CANDIDATE: 8
- GOOD_CANDIDATE_NEEDS_SOURCE_SLICE: 5
- BOUNDARY_ADVERSARIAL_USEFUL: 7
- PARKED_UNRESOLVED: 5
- SOURCE_ENRICHMENT_REQUIRED: 11
- NOT_REFERENCE_PRIORITY: 5
- CANONICAL_NODE_MISSING: 0
- DUPLICATE_OR_ALREADY_COVERED: 5
