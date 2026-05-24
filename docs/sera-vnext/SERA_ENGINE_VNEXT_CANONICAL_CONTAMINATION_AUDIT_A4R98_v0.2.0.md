# SERA Engine vNext Canonical Contamination Audit A4R98 v0.2.0

Status: CANONICAL_CONTAMINATION_AUDIT  
Phase: A4+R-98  
Scope: all `docs/sera-vnext`  
Purpose: identify documents contaminated by noncanonical question flows.

## Audit Rule
Any methodological flow that uses reconstructed/generic question text instead of exact canonical SERA tree questions is invalid for reference/front-end/calibration proof use.

## Classification Table
| file | contaminationRisk | reason | affectedUse | requiredAction | notes |
|---|---|---|---|---|---|
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | CONFIRMED_CONTAMINATED | Uses generic P1/P2/P3/P4/P5 and O1/A1 style questions instead of canonical O/P/A tree questions. | cannot use for reference trace; cannot use for front-end calibration; cannot use for author approval; cannot use for methodology proof | SUPERSEDE | Must remain audit history only; canonical rebuild required. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_RC1_A4R95_v0.2.0.md` | HIGH | Summarizes RC1 artifact that is noncanonical and superseded. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Keep only as historical record of invalidated RC1 attempt. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_PLAN_A4R94_v0.2.0.md` | MEDIUM | Contains historical references to contaminated RC1/withdrawn artifacts; now constrained by A4R98 lock. | none | KEEP_WITH_RESTRICTION | Valid as planning/governance only, not proof artifact. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_CANDIDATE_SHORTLIST_A4R94_v0.2.0.md` | MEDIUM | References historical contaminated trace and pre-canonical pack entries. | none | KEEP_WITH_RESTRICTION | Use as candidate triage list only. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_REAUDIT_SWEEP_ALL_EVENTS_A4R97_v0.2.0.md` | LOW | Sweep is triage/governance summary, not canonical step-by-step traversal. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | May be used only for prioritization/triage. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md` | CONFIRMED_CONTAMINATED | Depends on pre-canonical boundary trace without exact canonical Q-by-Q traversal. | cannot use for reference trace; cannot use for front-end calibration; cannot use for author approval; cannot use for methodology proof | ADD_WARNING_HEADER | Preserved for audit history only until canonical rebuild. |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | CONFIRMED_CONTAMINATED | Boundary-learning pack lacks canonical node-by-node exact-question record fields. | cannot use for reference trace; cannot use for front-end calibration; cannot use for author approval; cannot use for methodology proof | ADD_WARNING_HEADER | Rebuild required after canonical asset pack exists. |
| `docs/sera-vnext/real-event-questionpath-backfill/*.md` | HIGH | Backfill files use synthetic/auxiliary question IDs/text (`Was ...`) not canonical tree wording. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Keep as internal adjudication rationale history only; not canonical proof artifacts. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_EXECUTION_A4R80_v0.2.0.md` | HIGH | Declares questionPath coverage based on noncanonical backfill annexes. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Governance/coverage history only. |
| `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-*.md` | MEDIUM | Contains adjudication question-path prompts (`Was ...`) that are not canonical O/P/A exact text. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Keep for draft adjudication history; canonical trace required for proof usage. |
| `docs/sera-vnext/external-candidates/adjudications-batch-1/EXT-BATCH1-ADJUDICATION-*.md` | MEDIUM | Similar auxiliary question-path phrasing; no exact canonical question record format. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Keep for candidate review only. |
| `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-007.md` | LOW | Contains factual extraction prompts (`Was there ...`) outside canonical decision-trace context. | none | KEEP_WITH_RESTRICTION | Factual extraction aid only; cannot be promoted as canonical question trace. |
| `docs/sera-vnext/release-pilot/P-AXIS-RELEASE-PILOT-*.md` | MEDIUM | Pilot-release docs predate strict canonical trace contract. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | Keep documentary pilot history; no automatic proof authority. |
| `docs/sera-vnext/release-pilot-author-packets/P-AXIS-AUTHOR-PACKET-*.md` | MEDIUM | Author packets are decision aids, not canonical trace traversal artifacts. | cannot use for reference trace; cannot use for front-end calibration; cannot use for methodology proof | KEEP_WITH_RESTRICTION | May support historical context only. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_REFERENCE_TRACE_CONTRACT_A4R96_v0.2.0.md` | NONE | Canonical guardrail contract; exact-question discipline enforced. | none | KEEP | Primary governance lock. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_SERA_TREE_SOURCE_INVENTORY_A4R96_v0.2.0.md` | NONE | Canonical source inventory for Hendy/Daumas mapping. | none | KEEP | Primary source inventory. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_CONTRACT_A4R94_v0.2.0.md` | LOW | Contract updated to canonical field requirements; no generic flow allowed. | none | KEEP | Continue enforcing canonical schema. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_TEMPLATE_A4R94_v0.2.0.md` | LOW | Template now requires exact-question fields and stop flags. | none | KEEP | Canonical-ready template. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_APPROVAL_DOSSIER_STANDARD_A4R93_v0.2.0.md` | LOW | Dossier standard is governance-only; now constrained with canonical dependency rule. | none | KEEP | Not a substitute for canonical trace proof. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_APPROVAL_DOSSIER_TEMPLATE_A4R93_v0.2.0.md` | LOW | Template is decision-facing and now requires canonical-trace dependency declaration. | none | KEEP | Not proof unless canonical trace ref is present. |

## Audit Summary
- confirmed contaminated artifacts: 3 primary files.
- high-risk noncanonical methodological families: questionPath backfills and pre-contract adjudication question prompts.
- valid governance controls: A4R96 canonical contract + source inventory + updated A4R94/A4R93 contracts/templates.
- terminology normalized to `SERA` under A4R99 lock.
- canonical tree asset now available:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`

## Mandatory Use Restriction After A4R98
- No artifact with `CONFIRMED_CONTAMINATED` or `HIGH` risk can be used for front-end calibration, reference-case proof, release decision, or methodology demonstration.
- Such artifacts may remain only as audit/governance history until canonical rebuild.
