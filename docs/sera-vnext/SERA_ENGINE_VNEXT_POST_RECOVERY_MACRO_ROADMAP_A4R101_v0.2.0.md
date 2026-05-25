# SERA Engine vNext Post Recovery Macro Roadmap A4R101 v0.2.0

Status: POST_RECOVERY_MACRO_ROADMAP
Phase: A4+R-101
DOCS_ONLY
PRIORITIZATION_ONLY
NO_RELEASE
NO_DOWNSTREAM

## Macro Objective
Define one coherent post-recovery sequence after canonical cleanup, without micro-task fragmentation.

## BLOCK 1 — Canonical reference stabilization
### entrada
- `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- `REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md` (`PASS_WITH_LIMITATIONS`)
- withdrawn trio historical records (REAL-EVENT-0015, N109W, N11NM)

### saída
- Author-reviewed decision on A4R100 (ready or limitations that require correction)
- Canonical withdrawn/boundary pack rebuilt from asset for withdrawn trio
- Updated invalid register references from pre-canonical boundary artifacts to canonical replacements

### critérios de conclusão
- At least one positive canonical reference accepted by author
- At least one canonical boundary/withdrawn reference accepted by author
- No noncanonical artifact used as proof/front-end calibration

### o que não fazer
- Do not create new releases
- Do not change existing P/O/A operational status
- Do not use backfill/helper question text as canonical proof

### ferramenta sugerida
- DeepSeek: long-form audit/review writing
- Codex: repository-safe edits, validation, and versioned commit flow

## BLOCK 2 — Canonical reclassification sweep
### entrada
- 37 tracked events matrix and canonical asset/checklist
- Author-reviewed outcomes from Block 1

### saída
- Single canonical reclassification sweep for all tracked events
- Shortlist of solid candidates (target 5-8)
- Explicit parked list for ambiguous/unresolved cases

### critérios de conclusão
- Every shortlisted event has explicit canonical eligibility status
- Every parked event has explicit blocking reason (`NEEDS_SOURCE_ENRICHMENT`, `CANONICAL_NODE_MISSING`, or unresolved boundary)
- No event promoted via noncanonical question flow

### o que não fazer
- Do not run per-event microphases
- Do not force O/A release when evidence is insufficient
- Do not infer canonical nodes/questions absent from asset

### ferramenta sugerida
- DeepSeek: macro adjudication and prioritization sweep
- Codex: structured docs update and commit discipline

## BLOCK 3 — Solid event expansion
### entrada
- Stable shortlist from Block 2
- Known source gaps list

### saída
- New external event candidate batch focused on high-quality, high-traceability sources
- Candidate triage package with quarantine discipline preserved

### critérios de conclusão
- New candidates are evidence-rich and method-compatible
- Source provenance and quarantine fields are complete
- No direct import of external conclusions as SERA answers

### o que não fazer
- Do not bypass canonical-tree discipline
- Do not convert probable cause/HFACS text into direct P/O/A labels

### ferramenta sugerida
- ChatGPT: external search/curation planning and source triage
- Perplexity: only when official-source retrieval is hard
- Codex: versioning and repository documentation updates

## BLOCK 4 — Front-end data contract
### entrada
- Minimum approved set: at least 1 positive canonical reference + 1 boundary canonical reference
- Canonical trace schema and validation checklist outputs

### saída
- Stable front-end reference-case data contract proposal
- Display guardrails for quarantine, uncertainty, and non-causation warnings

### critérios de conclusão
- Contract maps exactly to canonical trace fields
- Front-end-ready artifacts are canonical and author-approved
- Noncanonical/invalid artifacts explicitly excluded

### o que não fazer
- Do not expose invalid/superseded traces in calibration views
- Do not present reference traces as final accident causation

### ferramenta sugerida
- Codex: contract drafting and repository governance docs
- DeepSeek: long-form consistency review before implementation handoff

## Single Next Macro Sequence
1. Complete BLOCK 1.
2. Complete BLOCK 2 in one consolidated pass.
3. Run BLOCK 3 only after BLOCK 2 shortlist stabilizes.
4. Open BLOCK 4 only after positive+boundary canonical approvals exist.

## A4+R-102 Execution Update (Block 1)
- Canonical withdrawn/boundary pack was built:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md`
- REAL-EVENT-0003 canonical positive trace remains:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md` (`PASS_WITH_LIMITATIONS`)
- Block 1 technical documentation status:
  - `BLOCK1_TECHNICAL_DOCS_COMPLETE_AUTHOR_REVIEW_PENDING`
- No release creation, no release restoration, and no downstream opening occurred.

## A4+R-103 Execution Update (Block 2)
- Canonical screening completed without author approval gate:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_BLOCK2_CANONICAL_EVENT_SCREENING_A4R103_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_ALL_EVENTS_SCREENING_MATRIX_A4R103_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_SOLID_REFERENCE_CANDIDATE_SHORTLIST_A4R103_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_PARKED_BOUNDARY_AND_AMBIGUOUS_EVENTS_A4R103_v0.2.0.md`
- Author approval is not required for screening.
- No reference case, front-end material, calibration proof, or release was promoted in A4R103.
- No release creation and no downstream opening occurred.

## Updated Immediate Sequence
1. Choose 3-5 strongest events from the A4R103 shortlist for canonical trace builds.
2. Build trace candidates from the A4R99 asset only.
3. Ask for author review only after trace candidates are ready for promotion decisions.

## A4+R-104 Execution Update (Trace Draft Batch)
- Canonical trace draft batch built for three strong candidates:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0016-CANONICAL-DRAFT-A4R104.md`
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-BS211-Q400-CANONICAL-DRAFT-A4R104.md`
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-EXT-002-CANONICAL-DRAFT-A4R104.md`
- Batch summary and gaps:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R104_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_GAPS_A4R104_v0.2.0.md`
- Author approval used in A4R104: no
- New release created in A4R104: no
- Downstream opened in A4R104: no
- Frontend readiness after A4R104: `NOT_READY_AUTHOR_REVIEW_REQUIRED`

## Updated Immediate Sequence After A4R104
1. Validate batch-level consistency across the three canonical drafts and prepare one author-review bundle only if at least two drafts are `PASS_WITH_LIMITATIONS` or better.
2. If fewer than two drafts satisfy that threshold, execute source-slice expansion before any author-review bundle.
3. Keep release/downstream/front-end promotion closed until post-review promotion decisions.

## A4+R-105 Execution Update (Curated Official Report Strategy)
- A4R104 was kept as `HELD_EXPLORATORY` (valid but not prioritized for immediate hardening).
- Curated official-report shortlist was completed:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CHATGPT_CURATED_OFFICIAL_REPORT_SHORTLIST_A4R105_v0.2.0.md`
- Official-source inventory and comparison package were added:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CURATED_SOURCE_INVENTORY_A4R105_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R104_HOLD_AND_OFFICIAL_REPORT_STRATEGY_A4R105_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R104_VS_CURATED_OFFICIAL_REPORTS_COMPARISON_A4R105_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_NEXT_CANONICAL_TRACE_BATCH_PLAN_A4R105_v0.2.0.md`
- No author approval used in A4R105.
- No release created in A4R105.
- No downstream opened in A4R105.

## Updated Immediate Sequence After A4R105
1. Execute A4R106 with the curated top-3 official reports (`ASIANA-214`, `COMAIR-5191`, `KOREAN-801`) to build canonical trace drafts.
2. Keep A4R104 as held exploratory fallback material for later source-slice rounds.
3. Keep release/downstream/front-end promotion closed until post-A4R106 review decisions.

## A4+R-106 Execution Update (Curated Official Top-3 Trace Drafts)
- Canonical trace draft batch built for curated official top-3:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-ASIANA-214-CANONICAL-DRAFT-A4R106.md`
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-COMAIR-5191-CANONICAL-DRAFT-A4R106.md`
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-KOREAN-801-CANONICAL-DRAFT-A4R106.md`
- Official source-slice package built:
  - `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-ASIANA-214-A4R106.md`
  - `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-COMAIR-5191-A4R106.md`
  - `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-KOREAN-801-A4R106.md`
- Batch-level controls:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R106_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_GAPS_A4R106_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_CROSS_CASE_CONSISTENCY_REVIEW_v0.2.0.md`
- Author approval used in A4R106: no
- New release created in A4R106: no
- Downstream opened in A4R106: no
- Frontend readiness after A4R106: `NOT_READY_AUTHOR_REVIEW_REQUIRED`

## Updated Immediate Sequence After A4R106
1. Prepare one author-review bundle for the three A4R106 drafts without release/front-end promotion.
2. If author review finds major weak-node gaps, execute targeted source-slice expansion before any O/A closure attempt.
3. Keep release/downstream/front-end promotion closed until post-review promotion decisions.

## A4+R-107 Execution Update (Quality Audit + Review Bundle)
- A4R106 draft quality audit completed:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_CANONICAL_TRACE_QUALITY_AUDIT_A4R107_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_NODE_EVIDENCE_MATRIX_A4R107_v0.2.0.md`
- Author-review package prepared:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_AUTHOR_REVIEW_BUNDLE_A4R107_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_A4R106_REVIEW_GATE_PLAN_A4R107_v0.2.0.md`
- Author approval requested in A4R107 repo docs: no
- Release created in A4R107: no
- Downstream opened in A4R107: no

## Updated Immediate Sequence After A4R107
1. Execute one author review in chat using the A4R107 bundle.
2. If fewer than two cases remain eligible after review, activate reserve candidates from A4R105.
3. Keep release/downstream/front-end promotion closed until explicit post-review decision.

## A4+R-108 Execution Update (Chat Review Bundle Prep)
- Chat-review bundle prepared for eligible A4R106 cases:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_CHAT_AUTHOR_REVIEW_BUNDLE_A4R108_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_AUTHOR_DECISION_INTAKE_PLACEHOLDER_A4R108_v0.2.0.md`
- Included for review bundle: `COMAIR-5191`, `KOREAN-801`.
- Excluded from approval bundle in this phase: `ASIANA-214`.
- Author review performed in A4R108: no.
- Author decision recorded in A4R108: no.
- Release created in A4R108: no.
- Downstream opened in A4R108: no.

## Updated Immediate Sequence After A4R108
1. Conduct one chat-based author review for COMAIR-5191 and KOREAN-801.
2. Route ASIANA-214 to the pending review/source-slice refinement path before any new approval attempt.
3. Keep release/downstream/front-end promotion closed until explicit post-review decisions.

## A4+R-109 Execution Update (Author Decision Intake Recorded)
- Decision intake artifact created:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_CHAT_AUTHOR_DECISION_INTAKE_A4R109_v0.2.0.md`
- Outcomes recorded:
  - COMAIR-5191: approved with limitations (`P-G` internal draft)
  - KOREAN-801: approved with limitations (`P-F` internal boundary draft)
  - ASIANA-214: not reviewed in A4R109 (`REVIEW_REQUIRED`)
- Release created in A4R109: no
- Downstream opened in A4R109: no
- O/A closure in A4R109: no

## Updated Immediate Sequence After A4R109
1. Prepare controlled internal-reference package for COMAIR-5191 and KOREAN-801 with explicit limitations retained.
2. Keep ASIANA-214 in `REVIEW_REQUIRED` pathway until additional source-slice/method review is completed.
3. If a cleaner positive reference is required, activate reserve candidate pathway without release/downstream opening.

## A4+R-110 Execution Update (Objective/Action Feasibility Only)
- O/A feasibility package built for approved P internal references:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_OBJECTIVE_ACTION_FEASIBILITY_A4R110_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_OBJECTIVE_ACTION_SOURCE_GAPS_A4R110_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_O_A_BOUNDARY_REVIEW_A4R110_v0.2.0.md`
- Feasibility outcomes:
  - COMAIR-5191: `O_SOURCE_SLICE_REQUIRED` and `A_SOURCE_SLICE_REQUIRED`
  - KOREAN-801: `O_UNRESOLVED` and `A_UNRESOLVED`
  - ASIANA-214: unchanged (`REVIEW_REQUIRED`, excluded from expansion scope)
- O/A closure in A4R110: no
- release created in A4R110: no
- downstream opened in A4R110: no

## Updated Immediate Sequence After A4R110
1. Keep COMAIR-5191 and KOREAN-801 as P-only internal references while O/A remains unresolved or source-slice dependent.
2. If objective/action expansion is still desired, run focused source-slice expansion for COMAIR-5191 first, then reassess readiness for one O/A author-review bundle.
3. Keep ASIANA-214 on review-required pathway; use reserve pathway if cleaner multi-axis references are needed sooner.

## A4+R-111 Execution Update (Full-Axis Reference Candidate Rebalancing)
- Full-axis scope correction package created:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FULL_AXIS_REFERENCE_SCOPE_CORRECTION_A4R111_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R105_SHORTLIST_FULL_AXIS_COVERAGE_A4R111_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_AXIS_BALANCED_REFERENCE_CANDIDATE_MATRIX_A4R111_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_OFFICIAL_RESERVE_O_A_SCREENING_A4R111_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_NEXT_FULL_AXIS_TRACE_BATCH_PLAN_A4R111_v0.2.0.md`
- A4R111 re-scope decision:
  - COMAIR-5191 and KOREAN-801 approvals remain valid as P-only internal drafts.
  - They are not promoted as complete full-axis references.
  - Future reference traces must document P/O/A for every event.
- P/O/A closure in A4R111: no
- release created in A4R111: no
- downstream opened in A4R111: no

## Updated Immediate Sequence After A4R111
1. Build the next full-axis trace draft batch with balanced P/O/A candidates (`UPS-1354`, `AMERICAN-1420`, `ASIANA-214`, `AIR-CANADA-624`).
2. Require explicit P/O/A axis sections for each event, including nominal/no-failure or unresolved handling where needed.
3. Keep COMAIR-5191 and KOREAN-801 as P-only internal drafts unless dedicated O/A source-slice expansion is executed.

## A4+R-113 Execution Update (Repository Methodology Cleanup and Corpus Hygiene)
- New governance outputs:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_REPOSITORY_METHODOLOGY_CLEANUP_AUDIT_A4R113_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CORPUS_VERSIONING_POLICY_A4R113_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_ACTIVE_SOURCE_INDEX_A4R113_v0.2.0.md`
  - `docs/sera-vnext/archive/README.md`
- Invalid/pre-canonical artifacts moved to archive:
  - `REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
  - `SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md`
  - `REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md`
- A4R113 controls:
  - no P/O/A closure;
  - no release created;
  - no downstream opened;
  - no runtime/UI/API/DB/fixture/baseline changes.

## Updated Immediate Sequence After A4R113
1. Keep canonical source-of-truth anchored on A4R99 asset/checklist and active-source index.
2. Start A4R112 mining from full corpus using versioned TXT/CSV/manifests and quarantine protocol.
3. Keep archived/pre-canonical artifacts outside active reference-proof flow; decide questionpath-backfill disposition in dedicated governance pass.

## A4+R-112 Execution Update (Full Official Report Corpus Mining and P/O/A Selection)
- Combined corpus mining package created from both A4R111 lots:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_OFFICIAL_REPORT_CORPUS_AUDIT_A4R112_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FULL_CORPUS_UNIFIED_CANDIDATE_INDEX_A4R112_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FULL_CORPUS_POA_SIGNAL_MINING_A4R112_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FULL_CORPUS_POA_CANDIDATE_MATRIX_A4R112_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_AXIS_BALANCED_SHORTLIST_A4R112_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_NEXT_FULL_AXIS_TRACE_BATCH_PLAN_A4R112_v0.2.0.md`
- Combined corpus numbers validated in A4R112:
  - 96 candidates in unified pool;
  - 59 downloaded report files;
  - 57 TXT files usable for mining.
- Governance continuity:
  - COMAIR-5191 and KOREAN-801 remain P-only internal drafts;
  - no promotion to complete full-axis reference status.
- P/O/A closure in A4R112: no
- release created in A4R112: no
- downstream opened in A4R112: no

## Updated Immediate Sequence After A4R112
1. Build full-axis trace drafts for the A4R112 selected balanced batch (`UPS-1354`, `AMERICAN-1420`, `ASIANA-214`, `COLGAN-3407`, `US AIRWAYS 1549`).
2. Enforce explicit P/O/A documentation for every selected event, including nominal/no-failure or unresolved handling where canonical closure is not supportable.
3. Keep COMAIR-5191 and KOREAN-801 as P-only internal drafts unless dedicated O/A expansion is separately executed.

## A4+R-114 Execution Update (A4R112/A4R113 Reconciliation)
- Reconciliation artifact created:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R112_A4R113_RECONCILIATION_A4R114_v0.2.0.md`
- Commit-lineage outcome:
  - A4R113 (`b3ad94c`) is contained in `HEAD`;
  - A4R112 (`702e8c0`) is contained in `HEAD`;
  - sequence is linear for this segment (`aa7a413` -> `b3ad94c` -> `702e8c0`).
- Active-source alignment:
  - A4R113 active source index now explicitly lists A4R112 mining outputs.
- Governance continuity:
  - COMAIR-5191 and KOREAN-801 remain P-only internal/boundary drafts;
  - no full-axis promotion from those P-only approvals.
- P/O/A closure in A4R114: no
- release created in A4R114: no
- downstream opened in A4R114: no

## Updated Immediate Sequence After A4R114
1. Execute full-axis trace batch from A4R112: `UC-003` UPS-1354, `UC-004` AMERICAN-1420, `UC-002` ASIANA-214, `UC-001` COLGAN-3407, `UC-039` US AIRWAYS 1549.
2. Enforce explicit P/O/A sections for each event, with canonical closure only when evidence supports it, otherwise `UNRESOLVED` or `SOURCE_SLICE_REQUIRED`.
3. Keep `a4r111-recovered-pool-txt/` deferred to a separate corpus-governance phase to preserve scope control.

## A4+R-115 Execution Update (Expanded Full-Axis Candidate Build)
- Expanded source-slice set built for 10 events:
  - `docs/sera-vnext/official-report-source-slices/a4r115/*.md`
- Full-axis canonical drafts built for 6 events:
  - `UPS-1354`, `AMERICAN-1420`, `ASIANA-214`, `COLGAN-3407`, `US AIRWAYS 1549`, `AMERICAN-965`
- Held or boundary-only outcomes applied where needed:
  - `HELIOS-522` (source insufficient)
  - `USAIR-427` (overclassification risk)
  - `TUROY EC225` (boundary-only)
  - `KOREAN-801` (boundary-only)
- No release created, no downstream opened, no finalConclusion/HFACS/Risk/ERC/recommendations created.

## Updated Immediate Sequence After A4R115
1. Prepare one full-axis author review bundle for `UPS-1354`, `AMERICAN-1420`, `COLGAN-3407`, and `US AIRWAYS 1549`.
2. Keep `ASIANA-214` and `AMERICAN-965` in targeted review-required/source-slice expansion before any closure attempt.
3. Keep `HELIOS-522`, `USAIR-427`, `TUROY EC225`, and `KOREAN-801` in held/boundary track until stronger evidence or dedicated boundary review is completed.
4. Maintain `COMAIR-5191` and `KOREAN-801` as P-only/internal boundary references, not complete full-axis references.

## A4+R-116 Execution Update (Recovered Corpus Integration and A4R115 QA)
- DeepSeek recovery metadata integrated:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FAILED_LINK_RECOVERY_A4R111_DEEPSEEK_v0.2.0.md`
  - `docs/sera-vnext/source-corpus/report-url-manifest/A4R111_FAILED_LINK_RECOVERY_DEEPSEEK.csv`
- Content-bearing recovered TXT files incorporated as active corpus supplement:
  - 10 TXT files under `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/`
- OCR/network/source-recheck items deferred:
  - 2 scanned recovered PDFs/TXTs need OCR;
  - 8 ATSB cases remain network-blocked;
  - 4 official URLs need retry/manual recovery;
  - 7 secondary-source-only cases need source-governance review;
  - 2 not-found cases need source-data verification;
  - 8 source-recheck cases remain unresolved.
- A4R115 independent QA completed:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R115_FULL_AXIS_TRACE_METHOD_QA_A4R116_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R115_REVIEW_BUNDLE_ELIGIBILITY_AUDIT_A4R116_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R115_REVIEW_REQUIRED_CASES_AUDIT_A4R116_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R115_HELD_BOUNDARY_AUDIT_A4R116_v0.2.0.md`
- No release created, no downstream opened, no final causation artifact, HF taxonomy artifact, risk layer, ERC, ARMS, or safety recommendation artifact created.

## Updated Immediate Sequence After A4R116
1. Superseded by A4R117 Opus intake.
2. Keep `ASIANA-214` and `AMERICAN-965` in the review-required/source-slice refinement track.
3. Use recovered content-bearing TXT files for a later future-batch planning pass, not to retrofit A4R115.
4. Keep OCR/network/source-recheck items deferred until usable text or source-governance status exists.

## A4+R-117 Execution Update (Opus Audit Intake and Trace Corrections)
- Opus external audit intake recorded:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_OPUS_EXTERNAL_AUDIT_INTAKE_A4R117_v0.2.0.md`
- UPS-1354 caution patch recorded:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_UPS1354_DOUBLE_COUNTING_CAUTION_PATCH_A4R117_v0.2.0.md`
- AMERICAN-1420 substantive patch recorded:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_AMERICAN_1420_SUBSTANTIVE_PATCH_A4R117_v0.2.0.md`
- Post-Opus plan recorded:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_OPUS_REVIEW_NEXT_PHASE_PLAN_A4R117_v0.2.0.md`
- Governance outcome:
  - stable next-phase bundle set: `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`;
  - `AMERICAN-1420` moved to `REWORK_REQUIRED` (substantive overclassification patch needed);
  - `ASIANA-214` and `AMERICAN-965` remain out;
  - held/boundary set unchanged;
  - no author decision, no release, no downstream.

## Updated Immediate Sequence After A4R117
1. Execute `A4R118` as minimal author-review bundle for `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`.
2. Keep `AMERICAN-1420` in dedicated retrace/rework path (`A4R118-B` option) before any bundle re-entry.
3. Keep review-required and held/boundary queues unchanged until dedicated evidence work is completed.
