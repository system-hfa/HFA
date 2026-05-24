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
