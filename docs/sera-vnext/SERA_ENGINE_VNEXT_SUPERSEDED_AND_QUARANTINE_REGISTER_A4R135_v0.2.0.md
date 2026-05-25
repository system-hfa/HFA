# SERA Engine vNext Superseded and Quarantine Register A4R135 v0.2.0

Status: SUPERSEDED_REGISTER_RECORDED
Phase: A4+R-135
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Register all document families and artifacts that must not be used as current methodological reference, training material, or calibration source. This register does not delete or move any file. It marks status for governance only.

## Reading Rules

- Documents listed here remain on disk for historical traceability.
- Marking here overrides any prior status that may appear inside the document itself.
- The Methodology Control Board (A4R135) is the only authoritative source for current event status.
- If a document is not listed here, it still requires Control Board verification before use as reference.

## Category 1 — pre_escape_point_gate_artifacts

Documents created before A4R126 (Global Escape Point Reaudit) that do not contain a validated "Quando..." statement.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-00*.md` | Pre-gate adjudications without mandatory Hendy "Quando..." statement. | A4R130 rebuild tracker for events 0003, 0016; A4R126 tracker for all others. | SUPERSEDED |
| `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-*.md` | Pre-gate Batch 2 adjudications without mandatory "Quando..." statement. | A4R130 rebuild tracker (BS211-Q400); A4R126 tracker (others). | SUPERSEDED |
| `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-*.md` | Pre-gate Batch 3 adjudications without mandatory "Quando..." statement. | A4R126 tracker. | SUPERSEDED |
| `docs/sera-vnext/external-candidates/adjudications-batch-1/EXTERNAL-BATCH1-ADJUDICATION-*.md` | Pre-gate external adjudications without mandatory "Quando..." statement. | A4R126 tracker; A4R130 rebuild (A4R87-EXT-002). | SUPERSEDED |
| `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-00*.md` | Factual extractions only; no escape-point gate. | A4R130/A4R133/A4R134 for rebuilt events. | HISTORICAL_ONLY |
| `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-*.md` | Factual extractions only; no escape-point gate. | A4R130/A4R133 for rebuilt events. | HISTORICAL_ONLY |
| `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-*.md` | Factual extractions only; no escape-point gate. | A4R126 tracker. | HISTORICAL_ONLY |

## Category 2 — helper_trace_or_noncanonical_question_path_artifacts

Documents built with helper questions or non-canonical question paths.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-*.md` | Helper-trace questions, not canonical SERA tree (A4R80). A4R98 confirmed helper contamination. | A4R99 canonical question tree asset; A4R100+ canonical traces. | INVALID_FOR_REFERENCE_USE |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` (in archive) | Explicitly invalidated by A4R96 (noncanonical question flow). | A4R100 canonical trace. | INVALID_FOR_REFERENCE_USE |
| `docs/sera-vnext/reference-cases/CRC-*-DRAFT-*.md` | Pre-canonical drafts without consensus validation. Never promoted. | N/A (no canonical replacement for these skeletons). | INVALID_FOR_REFERENCE_USE |
| `docs/sera-vnext/reference-cases/CRC-*-SKELETON-*.md` | Design skeletons only. Never materialized. | N/A. | HISTORICAL_ONLY |

## Category 3 — pre_A4R126_real_event_adjudications (without Hendy gate)

All adjudication documents created before the A4R126 global escape-point reaudit.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/real-event-adjudications/CONSOLIDATED_*_TRACKER_*.md` | Pre-gate consolidated trackers. Useful for traceability but not for current P/O/A status. | A4R135 Control Board. | HISTORICAL_ONLY |
| `docs/sera-vnext/real-event-adjudications/ADJUDICATION_COVERAGE_TRACKER_v0.2.0.md` | Pre-gate coverage metrics. | A4R135 Control Board. | HISTORICAL_ONLY |

## Category 4 — A4R131 packets superseded by A4R132/A4R133/A4R134

A4R131 author review packets whose status has evolved.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0003-A4R131.md` | Superseded by A4R133 author decision. | A4R133 Author Decision document. | SUPERSEDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-BS211-Q400-A4R131.md` | "Quando..." phrase superseded by A4R134 gate patch. | A4R134 Gate Patch document. | SUPERSEDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-A4R87-EXT-002-A4R131.md` | "Quando..." phrase superseded by A4R134 gate patch. | A4R134 Gate Patch document. | SUPERSEDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0016-A4R131.md` | Status unchanged (still AUTHOR_REVIEW_PENDING), but intake superseded by A4R132 Opus review context. | A4R132 Opus Review + A4R133 Status. | SUPERSEDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-ASIANA-214-A4R131.md` | Status unchanged (still AUTHOR_REVIEW_PENDING), but intake superseded by A4R132 Opus review context. | A4R132 Opus Review + A4R133 Status. | SUPERSEDED |

## Category 5 — documents with "Quando..." not validated

Documents containing a "Quando..." statement that was never validated or has been replaced.

| glob/path | reason | substitute | status |
|---|---|---|---|
| A4R130 rebuild drafts for BS211-Q400 and A4R87-EXT-002 | Original "Quando..." phrases (BS211: violation language; A4R87: EGPWS as temporal marker) replaced by A4R134. | A4R134 gate patch documents. | SUPERSEDED |
| `docs/sera-vnext/real-event-escape-point-reaudit/*` rows with `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` | 47 of 52 events have unresolved when-statements in A4R126. | A4R128 (Queue A), A4R130 (Queue B P0), A4R134 (BS211, A4R87) for recovered events. | SUPERSEDED (for recovered); ACTIVE (for still-unresolved) |

## Category 6 — documents with active P/O/A drafts not author-approved

| glob/path | reason | substitute | status |
|---|---|---|---|
| A4R130 rebuild tracker rows marked `REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED` | All 5 events have draft P/O/A not approved by author. | A4R133 (REAL-EVENT-0003 partial approval); A4R135 Control Board (others). | ACTIVE_REVIEW (not superseded, but not approved) |

## Category 7 — historical-only docs

Documents preserved for traceability but not for active methodological use.

| glob/path | reason | status |
|---|---|---|
| `docs/sera-vnext/release-pilot/P-AXIS-RELEASE-PILOT-*.md` | P-axis micro-pilot documents; 3 of 4 releases withdrawn in A4R92. | HISTORICAL_ONLY |
| `docs/sera-vnext/release-pilot/P_AXIS_RELEASE_PILOT_TRACKER_A4R85_v0.2.0.md` | Release pilot tracker; releases withdrawn or superseded. | HISTORICAL_ONLY |
| `docs/sera-vnext/release-pilot-author-packets/*.md` | Author approval packets for withdrawn micro-pilot. | HISTORICAL_ONLY |
| `docs/sera-vnext/reference-cases/REVIEW_DRY_RUN_A4R54_v0.2.0.md` | Pre-canonical dry run. | HISTORICAL_ONLY |
| `docs/sera-vnext/reference-cases/FORMAL_REVIEW_TRACKER_v0.2.0.md` | Formal review tracker; no consensus validation achieved. | HISTORICAL_ONLY |
| `docs/sera-vnext/archive/invalid-methodology/pre-canonical/*` | Explicitly archived as invalid. | HISTORICAL_ONLY |

## Category 8 — external report conclusion quarantine

Documents that reference external report conclusions.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/external-candidates/extractions-batch-1/*.md` | External report facts extracted under quarantine protocol (A4R87). | A4R89 normalization for ready cases. | HISTORICAL_ONLY (for facts); DO_NOT_USE_FOR_RELEASE (for conclusions) |

## Category 9 — poa_not_at_escape_point_artifacts (A4R137)

Documents whose P/O/A was not analyzed at the escape-point moment. All P/O/A in these documents is suspended as current reference.

| glob/path | reason | substitute | status |
|---|---|---|---|
| `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_POA_REVIEW_A4R129_v0.2.0.md` | POA review diagnostic; P/O/A not tied to escape-point moment. | A4R137 reset register. | POA_SUSPENDED |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_FULL_REBUILD_A4R130_v0.2.0.md` | Full rebuild drafts; P/O/A may include post-escape analysis. | A4R137 reset register; reaudit at escape point. | POA_SUSPENDED |
| `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_B_P0_FULL_REBUILD_TRACKER_A4R130_v0.2.0.md` | Rebuild tracker with P/O/A not validated at escape point. | A4R137 reset register. | POA_SUSPENDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-*-A4R131.md` | Author review packets; P/O/A was draft not validated at escape point. | A4R137 reset register. | POA_SUSPENDED |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_INDEPENDENT_OPUS_REVIEW_A4R132_v0.2.0.md` | Opus review P/O/A approval interpretations only (escape point and systemic risks sections remain valid). | A4R137 reset register. | POA_SUSPENDED (P/O/A interpretations only) |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_DECISION_REAL_EVENT_0003_A4R133_v0.2.0.md` | Author decision for REAL-EVENT-0003; P/O/A approval suspended (autopilot enrichment remains valid). | A4R137 reset register; reaudit at escape point. | POA_APPROVAL_SUSPENDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR_DECISION_STATUS_AFTER_A4R133_v0.2.0.md` | Consolidated decision status; P/O/A statuses suspended by A4R137. | A4R137 reset register. | POA_SUSPENDED |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_DECISION_PREP_ACTIVE_REVIEW_A4R136_v0.2.0.md` | Decision prep for REAL-EVENT-0016 and ASIANA-214; suspended before decision. | A4R137 reset register. | POA_SUSPENDED |
| `docs/sera-vnext/author-review-packets-a4r131/AUTHOR_DECISION_FORM_REAL_EVENT_0016_ASIANA_214_A4R136_v0.2.0.md` | Decision forms not to be used until at-escape-point reaudit. | A4R137 reset register. | POA_SUSPENDED |
| All 52 A4R126 event P/O/A drafts | Any P/O/A not explicitly reaudited under A4R137+ at-escape-point rule. | A4R137 reset register. | POA_SUSPENDED |

## Locks Preserved

- NO_RELEASED_CODE for all events.
- NO_DOWNSTREAM for all events.
- No documents deleted.
- No documents moved.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Next Steps

1. This register should be consulted before using any pre-A4R135 document as methodological reference.
2. Category 9 (A4R137) supersedes all prior P/O/A for reference use.
3. Documents not listed here are not automatically valid — verify against the Control Board.
4. Future phases may promote documents from SUPERSEDED to HISTORICAL_ONLY or restore them if rebuilt under the at-escape-point rule.
5. This register itself may be updated in future phases as statuses evolve.
