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

## Updated Immediate Sequence
1. Run combined author review for A4R100 + A4R102.
2. Record author decision and front-end readiness gate.
3. Move to BLOCK 2 only after this combined review record.
