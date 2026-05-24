# SERA Engine vNext Repository Methodology Cleanup Audit A4R113 v0.2.0

Status: COMPLETED  
Scope: DOCS/GOVERNANCE/CORPUS-HYGIENE ONLY  
Date: 2026-05-24

## Objective
Audit and hygiene-pass for SERA vNext docs/corpus to reduce methodological contamination risk, separate active sources from non-active historical artifacts, and prepare a cleaner base for A4R112 full-corpus mining.

## Inputs and command evidence
- Initial state verified on `main` with `HEAD == origin/main == aa7a4131606205cc20bf4c4dbe0340edb8802840`.
- Contamination scans executed:
  - `rg -n "SERA/CERA|CERA/SERA|\\bCERA\\b" AGENTS.md docs/sera-vnext`
  - `rg -n "P1\\.|P2\\.|P3\\.|P4\\.|P5\\.|O1\\.|O2\\.|O3\\.|A1\\.|A2\\.|A3\\.|Question P|Question O|Question A|perguntas mínimas|didático e fiel|não precisa reproduzir" docs/sera-vnext`
  - `rg -n "INVALID_FOR_REFERENCE_USE|SUPERSEDED|PRE_CANONICAL|NOT_FOR_CANONICAL_REFERENCE_USE|CONTAMINATED|questionPath não canônico|questionPath nao canonico" docs/sera-vnext`
  - `rg -n "P-only|P only|Perception-only|referência P-only|P-only internal|P-only/internal" docs/sera-vnext`
  - `rg -n "O-E" docs/sera-vnext`
- Corpus size checks executed:
  - `a4r111-full-pool`: `194M`
  - `a4r111-new50-pool`: `100M`
  - `a4r111-full-pool-txt`: `10M`
  - `a4r111-new50-pool-txt`: `5.6M`
  - files `>90M`: none found.

## Contamination findings summary
- `CERA` appears only as negative guardrail wording in active docs.
- Noncanonical P1/P2/O1/A1 flow was confirmed in A4R95 legacy artifact.
- `questionPath/backfill` family remains legacy-format and noncanonical for reference-proof usage.
- Multiple active governance docs mention `P-only internal draft`; they are now treated as governance history only, not full-reference eligibility.

## Inventory classification table

| category | path | tracked/untracked | reason | risk level | recommended action | safe to move? |
|---|---|---|---|---|---|---|
| ACTIVE_CANONICAL | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` | tracked | canonical question tree source | LOW | keep active | no |
| ACTIVE_CANONICAL | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md` | tracked | canonical validation gate | LOW | keep active | no |
| ACTIVE_CANONICAL | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md` | tracked | canonical trace replacing A4R95 | LOW | keep active | no |
| ACTIVE_CANONICAL | `docs/sera-vnext/SERA_ENGINE_VNEXT_FULL_AXIS_REFERENCE_SCOPE_CORRECTION_A4R111_v0.2.0.md` | tracked | full-axis governance lock | LOW | keep active | no |
| ACTIVE_STATUS | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md` | tracked | active readiness ledger | LOW | keep active/update | no |
| ACTIVE_STATUS | `docs/sera-vnext/SERA_ENGINE_VNEXT_PRIORITIZED_WORK_QUEUE_A4R101_v0.2.0.md` | tracked | active work sequencing | LOW | keep active/update | no |
| ACTIVE_STATUS | `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_RECOVERY_MACRO_ROADMAP_A4R101_v0.2.0.md` | tracked | macro-phase sequencing | LOW | keep active/update | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/perplexity-candidates/50-sera-candidates.csv` | untracked | versionable candidate list CSV | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/perplexity-candidates/sera-new-50-only-v3.csv` | untracked | versionable candidate list CSV | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/report-url-manifest/a4r111_report_urls_consolidated.csv` | untracked | versionable URL manifest | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/report-url-manifest/a4r111_new50_report_urls_consolidated.csv` | untracked | versionable URL manifest | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/official-reports/A4R111_OFFICIAL_REPORT_ARCHIVE_MANIFEST.csv` | untracked | versionable archive manifest CSV | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/official-reports/A4R111_NEW50_OFFICIAL_REPORT_ARCHIVE_MANIFEST.csv` | untracked | versionable archive manifest CSV | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/` | untracked | text corpus for mining | MEDIUM | stage/version | no |
| ACTIVE_CORPUS | `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/` | untracked | text corpus for mining | MEDIUM | stage/version | no |
| SUPERSEDED | `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_RC1_A4R95_v0.2.0.md` | tracked | superseded by canonical reference trace controls | MEDIUM | keep for audit, reference archive path in index | no |
| SUPERSEDED | `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R106_AUTHOR_DECISION_INTAKE_PLACEHOLDER_A4R108_v0.2.0.md` | tracked | placeholder superseded by A4R109 intake | LOW | keep as historical marker | no |
| INVALID_METHOD_CONTAMINATION | `docs/sera-vnext/archive/invalid-methodology/pre-canonical/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | tracked | noncanonical P1/P2/O1/A1 flow | HIGH | moved to archive + archived header | yes |
| INVALID_METHOD_CONTAMINATION | `docs/sera-vnext/archive/invalid-methodology/pre-canonical/SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md` | tracked | pre-canonical/noncanonical boundary artifact | HIGH | moved to archive + archived header | yes |
| INVALID_METHOD_CONTAMINATION | `docs/sera-vnext/archive/invalid-methodology/pre-canonical/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | tracked | pre-canonical/noncanonical boundary artifact | HIGH | moved to archive + archived header | yes |
| EXPLORATORY_NOT_FOR_REFERENCE | `docs/sera-vnext/reference-cases/CRC-ADVERSARIAL-DRAFT-001.md` | tracked | adversarial draft, not reference proof | MEDIUM | keep outside active references, document as exploratory | no |
| EXPLORATORY_NOT_FOR_REFERENCE | `docs/sera-vnext/SERA_ENGINE_VNEXT_ADVERSARIAL_SET_2_DESIGN_v0.2.0.md` | tracked | design-only adversarial set | MEDIUM | keep as exploratory governance | no |
| EXPLORATORY_NOT_FOR_REFERENCE | `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_DRY_RUN_REVIEW_SUMMARY_v0.2.0.md` | tracked | dry-run synthesis, not canonical proof | MEDIUM | keep as exploratory history | no |
| LOCAL_ONLY_SHOULD_IGNORE | `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/**/*.pdf` | untracked | heavy binaries; local archive corpus | MEDIUM | ignore pattern added | no |
| LOCAL_ONLY_SHOULD_IGNORE | `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/**/*.html` | untracked | local archival HTML corpus | MEDIUM | ignore pattern added | no |
| LOCAL_ONLY_SHOULD_IGNORE | `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool/**/*.pdf` | untracked | heavy binaries; local archive corpus | MEDIUM | ignore pattern added | no |
| LOCAL_ONLY_SHOULD_IGNORE | `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool/**/*.html` | untracked | local archival HTML corpus | MEDIUM | ignore pattern added | no |
| REVIEW_BEFORE_MOVE | `docs/sera-vnext/real-event-questionpath-backfill/*.md` | tracked | legacy backfill family; noncanonical for proof use, but heavily referenced | HIGH | keep in place this phase; decide controlled move in dedicated phase | no |
| REVIEW_BEFORE_MOVE | `docs/sera-vnext/SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_EXECUTION_A4R80_v0.2.0.md` | tracked | governance doc tied to backfill chain | HIGH | keep in place this phase | no |
| REVIEW_BEFORE_MOVE | `docs/sera-vnext/SERA_ENGINE_VNEXT_QUESTION_PATH_COVERAGE_MATRIX_A4R79_v0.2.0.md` | tracked | coverage index tied to backfill chain | HIGH | keep in place this phase | no |

## Move actions executed in A4R113
- moved with `git mv`:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md`
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md`
- destination:
  - `docs/sera-vnext/archive/invalid-methodology/pre-canonical/`
- all moved files received `ARCHIVED / NOT ACTIVE` header.

## Summary counts by category
- ACTIVE_CANONICAL: 4
- ACTIVE_CORPUS: 8
- ACTIVE_STATUS: 3
- SUPERSEDED: 2
- INVALID_METHOD_CONTAMINATION: 3
- EXPLORATORY_NOT_FOR_REFERENCE: 3
- LOCAL_ONLY_SHOULD_IGNORE: 4
- REVIEW_BEFORE_MOVE: 3

## Scope controls
- No `.ts` files changed.
- No fixtures changed.
- No baseline report changed.
- No migration/API/UI/DB/runtime changed.
- No release/downstream artifact created.
