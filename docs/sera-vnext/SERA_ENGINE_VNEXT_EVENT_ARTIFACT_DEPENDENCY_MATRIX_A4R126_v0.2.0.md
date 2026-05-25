# SERA Engine vNext Event Artifact Dependency Matrix A4R126 v0.2.0

Status: EVENT_ARTIFACT_DEPENDENCY_MATRIX_RECORDED
Phase: A4+R-126
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Scan Snapshot
| metric | value |
|---|---:|
| totalFilesScanned | 638 |
| totalRelevantFiles | 406 |
| rawSourceHitsExcludedFromArtifactInventory | 162 |
| auditedUniqueEvents | 52 |
| escapePointWhenStatementStatus_VALID | 5 |
| escapePointWhenStatementStatus_UNRESOLVED | 47 |

Raw official-report text files are source evidence, not dependent classification artifacts. They remain available for later source enrichment.

## Escape Point When Statement Status
The dependency matrix uses `escapePointWhenStatementStatus` as an artifact-use note:

| escapePointWhenStatementStatus | events | dependencyEffect |
|---|---|---|
| VALID | UPS-1354; COLGAN-3407; US-AIRWAYS-1549; UNITED-173; UNITED-232 | The "Quando..." field is recorded, but this does not create release or downstream authority. Other audit blockers still apply where recorded. |
| UNRESOLVED | Remaining 47 tracked events | Dependent artifacts remain under pre-gate quarantine and `BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` until the field is factual and evidence-anchored. |
| NOT_APPLICABLE | Raw source files excluded from artifact inventory | Source files can support later enrichment but are not dependent classification artifacts. |

## Artifact Inventory
Rows use file path patterns where every file in the family shares the same artifact role and risk profile.

| filePath | artifactType | eventIds mentioned | containsProposedCode | containsReleasedCode | containsQuestionPath | containsReferenceCase | containsAuthorApproval | containsEscapePoint | containsCanonicalTreeClaim | contaminationRisk | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-*.md` | EXTRACTION | REAL-EVENT-0001, 0002, 0004, 0006, 0028 | no | no | no | no | no | no | no | LOW | Factual extraction history; not a P/O/A proof artifact. |
| `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-*.md` | ADJUDICATION | REAL-EVENT-0001, 0002, 0004, 0006 | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | Draft adjudication predates escape-point gate. |
| `docs/sera-vnext/real-event-adjudications/REAL-EVENT-READJUDICATION-004-A4R68.md` | ADJUDICATION | REAL-EVENT-0004 | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | Re-adjudication history only. |
| `docs/sera-vnext/real-event-adjudications/REAL-EVENT-TRIAGE-005.md` | ADJUDICATION | REAL-EVENT-0028 | no | no | no | no | no | no | no | SOURCE_PARTIAL | Triage only. |
| `docs/sera-vnext/real-event-adjudications/CONSOLIDATED_15_REAL_EVENTS_TRACKER_A4R74_v0.2.0.md` | TRACKER | first 15 internal events | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | Consolidates prior proposed P/O/A. |
| `docs/sera-vnext/real-event-adjudications/CONSOLIDATED_30_REAL_EVENTS_TRACKER_A4R78_v0.2.0.md` | TRACKER | internal 30 | yes | no | yes | no | no | no | no | PRE_CANONICAL_ARTIFACT | Declares questionPath coverage, now helper/pre-gate only. |
| `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-*.md` | EXTRACTION | REAL-EVENT-0003, 0005, 0007, 0008, 0009, 0010, 0011, 0013, 0015, 0016 | no | no | partial prompts only | no | no | no | no | LOW | Factual extraction history. |
| `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-*.md` | ADJUDICATION | Batch 2 ten events | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | Prior draft P/O/A. |
| `docs/sera-vnext/real-event-adjudications-batch-2/BATCH_2_ADJUDICATION_TRACKER_A4R73_v0.2.0.md` | TRACKER | Batch 2 ten events | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | No release/downstream. |
| `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-*.md` | EXTRACTION | Batch 3 fifteen events | no | no | yes | no | no | no | no | HELPER_TRACE_ONLY | Contains native helper paths; not canonical proof. |
| `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-*.md` | ADJUDICATION | Batch 3 fifteen events | yes | no | yes | no | no | no | no | HELPER_TRACE_ONLY | Uses helper prompts; not canonical decision tree proof. |
| `docs/sera-vnext/real-event-adjudications-batch-3/BATCH_3_ADJUDICATION_TRACKER_A4R77_v0.2.0.md` | TRACKER | Batch 3 fifteen events | yes | no | yes | no | no | no | no | HELPER_TRACE_ONLY | Pre-gate tracker. |
| `docs/sera-vnext/real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-*.md` | QUESTION_PATH_BACKFILL | first 15 internal events | yes | no | yes | no | no | no | no | HELPER_TRACE_ONLY | A4R98 already marked high-risk for canonical proof use. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_EXECUTION_A4R80_v0.2.0.md` | SUMMARY | internal 30 | yes | no | yes | no | no | no | no | HELPER_TRACE_ONLY | Coverage history only. |
| `docs/sera-vnext/external-candidates/EXTERNAL_CANDIDATE_INDEX_A4R87_v0.2.0.md` | TRACKER | A4R87-EXT-001..016 | no | no | no | no | no | no | no | LOW | Discovery/index; unadjudicated rows not treated as audited P/O/A. |
| `docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-*.md` | EXTRACTION | A4R87-EXT-001..012 extracted rows | no | no | no | no | no | no | no | LOW | Extraction only; not an answer key. |
| `docs/sera-vnext/external-candidates/adjudications-batch-1/EXT-BATCH1-ADJUDICATION-*.md` | ADJUDICATION | A4R87-EXT-001, 002, 004, 006, 007, 008, 012 | yes | no | helper prompts | no | no | no | no | PRE_CANONICAL_ARTIFACT | External draft adjudication. |
| `docs/sera-vnext/external-candidates/adjudications-batch-1/EXTERNAL_BATCH_1_ADJUDICATION_TRACKER_A4R90_v0.2.0.md` | TRACKER | External adjudicated seven | yes | no | no | no | no | no | no | PRE_CANONICAL_ARTIFACT | No release/downstream. |
| `docs/sera-vnext/reference-cases/*.md` | REFERENCE_CASE | Skeletons and early drafts | mixed | no | no | yes | no | no | no | PRE_CANONICAL_ARTIFACT | Consensus/reference skeletons only unless later rebuilt. |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-*.md` | REFERENCE_CASE | REAL-EVENT-0003, 0015, 0016, N109W, N11NM, BS211-Q400, EXT-002, COMAIR-5191, KOREAN-801, ASIANA-214, UPS-1354, AMERICAN-1420, AMERICAN-965, COLGAN-3407, US-AIRWAYS-1549, ATLAS-3591, UNITED-173, UNITED-232, EASTERN-401 | yes | no | yes | yes | no | partial | yes | MIXED_CANONICAL_DRAFT | Canonical trace drafts remain draft; older withdrawn pack remains constrained. |
| `docs/sera-vnext/release-pilot/P-AXIS-RELEASE-PILOT-*.md` | RELEASE_PILOT | REAL-EVENT-0003, REAL-EVENT-0015, N109W, N11NM | yes | yes | no | no | yes | no | no | PRE_CANONICAL_ARTIFACT | Historical documentary P-axis pilot; downstream locked. |
| `docs/sera-vnext/release-pilot/P_AXIS_RELEASE_PILOT_TRACKER_A4R85_v0.2.0.md` | RELEASE_PILOT | four release pilot events | yes | yes | no | no | yes | no | no | PRE_CANONICAL_ARTIFACT | Tracks maintained/withdrawn status. |
| `docs/sera-vnext/release-pilot-author-packets/P-AXIS-AUTHOR-PACKET-*.md` | AUTHOR_APPROVAL_PACKET | four release pilot events | yes | no | no | no | yes | no | no | PRE_CANONICAL_ARTIFACT | Decision aid only. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_*A4R8*.md` | RELEASE_PILOT | four release pilot events | yes | yes | no | no | yes | no | no | PRE_CANONICAL_ARTIFACT | Pilot, audit, rollback and traceability history. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_*A4R92*.md` | RELEASE_PILOT | four release pilot events | yes | yes | no | no | yes | no | no | PRE_CANONICAL_ARTIFACT | Retrospective review and withdrawal history. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_CONTAMINATION_AUDIT_A4R98_v0.2.0.md` | SUMMARY | all pre-canonical families | no | no | yes | yes | no | no | yes | CANONICAL_GOVERNANCE | Source for helper/pre-canonical restrictions. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_ALL_TRACKED_EVENTS_CANONICAL_STATUS_MATRIX_A4R101_v0.2.0.md` | METRICS | 41 tracked rows | yes | yes | yes | yes | yes | no | yes | PRE_ESCAPE_GATE_SUMMARY | Useful as canonical-status history only. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R104_v0.2.0.md` | SUMMARY | REAL-EVENT-0016, BS211-Q400, EXT-002 | yes | no | yes | yes | no | no | yes | CANONICAL_TRACE_DRAFT | No release/downstream. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R106_v0.2.0.md` | SUMMARY | ASIANA-214, COMAIR-5191, KOREAN-801 | yes | no | yes | yes | yes | no | yes | CANONICAL_TRACE_DRAFT | P-focused history, not full escape gate. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_EXPANDED_FULL_AXIS_TRACE_DRAFT_BATCH_A4R115_v0.2.0.md` | SUMMARY | UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US-AIRWAYS-1549, AMERICAN-965, HELIOS-522, USAIR-427, TUROY EC225, KOREAN-801 | yes | no | yes | yes | no | partial | yes | CANONICAL_TRACE_DRAFT | Full-axis draft batch, pre-gate. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_PRIORITY_SOURCE_SLICE_TRACE_BATCH_A4R119_v0.2.0.md` | SUMMARY | UNITED-173, ATLAS-3591, EASTERN-401, UNITED-232 | yes | no | yes | yes | no | partial | yes | CANONICAL_TRACE_DRAFT | Priority trace batch and later update notes. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_REFERENCE_SET_CONSOLIDATION_A4R123_v0.2.0.md` | READINESS | six consolidated real events | yes | no | yes | yes | no | partial | yes | PRE_ESCAPE_GATE_SUMMARY | Superseded by A4R125 lane reduction. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_CANONICAL_TRACE_DOSSIER_A4R124_v0.2.0.md` | REFERENCE_CASE | six consolidated real events | yes | no | yes | yes | no | yes | yes | CANONICAL_TRACE_DRAFT | Strongest pre-gate dossier; lacks `escapePointWhenStatement`. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_AUTHOR_REVIEW_INTAKE_A4R125_v0.2.0.md` | AUTHOR_APPROVAL_PACKET | six consolidated real events | yes | no | no | no | yes | no | no | PRE_ESCAPE_GATE_SUMMARY | Author intake only, no release. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_ESCAPE_POINT_RECONCILIATION_A4R125_v0.2.0.md` | SUMMARY | six consolidated real events | yes | no | no | no | no | yes | no | PRE_ESCAPE_GATE_SUMMARY | Predecessor to this global audit; lacks mandatory "Quando" field. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md` | READINESS | repository-wide | yes | yes | yes | yes | yes | partial | yes | READINESS_PRE_GATE | Updated by A4R126. |

## Event Dependency Matrix
| eventId | extractions | adjudications | questionPaths | referenceCases | authorPackets | releasePilotDocs | trackers/readiness | riskClassification |
|---|---|---|---|---|---|---|---|---|
| Internal initial five | `real-event-extractions/*` | `real-event-adjudications/*` | A4R80 backfills | none | none | none | A4R74/A4R78/A4R101 | PRE_GATE; mixed partial/source/actor/technical risks |
| Batch 2 ten | `real-event-extractions-batch-2/*` | `real-event-adjudications-batch-2/*` | A4R80 backfills | REAL-EVENT-0003 and 0015 later reference/release history | REAL-EVENT-0003 and 0015 author packets | REAL-EVENT-0003 and 0015 P-axis pilot docs | A4R73/A4R74/A4R78/A4R101 | PRE_GATE; proposed codes quarantined; released histories affected |
| Batch 3 fifteen | `real-event-extractions-batch-3/*` | `real-event-adjudications-batch-3/*` | native helper paths | BS211-Q400, N109W, N11NM later reference history | N109W, N11NM author packets | N109W, N11NM P-axis pilot docs | A4R77/A4R78/A4R101 | PRE_GATE; helper path only; withdrawn release rows affected |
| External Batch 1 seven | `external-candidates/extractions-batch-1/*` | `external-candidates/adjudications-batch-1/*` | helper/pre-canonical only | EXT-002 later canonical draft | none | none | A4R87/A4R90/A4R91/A4R101 | PRE_GATE; source-slicing and P/O/A review required |
| A4R104 canonical trio | source slices where available | linked previous adjudications | canonical draft | REAL-EVENT-0016, BS211-Q400, EXT-002 | none | none | A4R104/A4R105/A4R101 | CANONICAL_TRACE_DRAFT but no escape-point gate |
| A4R106 top three | official report source slices | n/a | canonical draft | ASIANA-214, COMAIR-5191, KOREAN-801 | A4R109 decisions for COMAIR/KOREAN | none | A4R106-A4R111 | CANONICAL_TRACE_DRAFT; P-focused or O/A gaps |
| A4R115 full-axis batch | official report source slices | n/a | canonical draft | UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US-AIRWAYS-1549, AMERICAN-965 | none | none | A4R115-A4R117 | PRE_GATE; mixed pass/partial/fail/block |
| A4R119/A4R120 priority batch | `official-report-source-slices/a4r119/*` | n/a | canonical draft | UNITED-173, ATLAS-3591, UNITED-232 | none | none | A4R119/A4R120 | PRE_GATE; United-173 retained with wording fix, Atlas blocked actor |
| A4R121/A4R122 Eastern | `official-report-source-slices/a4r121/*` | n/a | canonical draft | EASTERN-401 | none | none | A4R121/A4R122/A4R125 | BLOCKED_SOURCE_PARTIAL pending pre/post evidence split |
| A4R123-A4R125 consolidated six | official sources and trace dossiers | n/a | canonical dossier | six consolidated real events | A4R125 intake | none | A4R123/A4R124/A4R125 | PRE_GATE; five have defined factual/condition points, only three pass wording-fix lane |

## Risk Classification Summary
| riskClassification | meaning |
|---|---|
| PRE_GATE | Artifact predates mandatory Hendy escape-point gate or lacks `escapePointWhenStatement`. |
| HELPER_TRACE_ONLY | Questions are helper/backfill prompts, not exact canonical tree paths. |
| CANONICAL_TRACE_DRAFT | Exact canonical-question artifact exists but remains draft/no release/no downstream. |
| PRE_CANONICAL_ARTIFACT | Artifact predates strict canonical tree discipline or cannot be used as canonical proof. |
| SOURCE_PARTIAL | Source, identity, timeline or pre/post evidence split is insufficient. |
| CONDITION_OR_TECHNICAL_DOMINANT | First departure is condition/technical; do not force human P/O/A. |
