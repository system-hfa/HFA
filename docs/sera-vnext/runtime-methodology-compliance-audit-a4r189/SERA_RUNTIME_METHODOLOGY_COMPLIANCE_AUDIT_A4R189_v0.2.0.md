# SERA Runtime Methodology Compliance Audit (A4R189) v0.2.0

## 1) Executive summary
This phase is a read-only runtime audit. The current runtime is **not executing the canonical A4R99 real tree** as an active decision engine. The repository has strong documentation locks (A4R185–A4R188) and multiple downstream output locks in `sera-vnext`, but canonical traversal requirements (`nodeId`, exact canonical question text, canonical branchCondition) are not active in runtime execution.

High-level conclusion:
- Legacy `frontend/src/lib/sera/*` is active with local/heuristic decision prompts and local node paths.
- `frontend/src/lib/sera-vnext/*` has strong guardrails and lock contracts, but still no canonical A4R99 node traversal.
- Methodology trust for **real-tree runtime** is not yet justified.

## 2) Repo state
- Branch: `main`
- HEAD: `5c8082b66b4fbb193ff0129523304c2354298319`
- origin/main: `5c8082b66b4fbb193ff0129523304c2354298319`
- HEAD == origin/main: `true`
- A4R188 committed: `true` (HEAD commit message references A4R188)
- Pre-existing untracked items observed before this phase:
  - `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt`
  - `tmp/`

## 3) Methodology source of truth
Mandatory source artifacts were found:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/real-tree-lock-a4r185/SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv`
- `docs/sera-vnext/real-tree-event-review-a4r186/SERA_REAL_TREE_NODE_TRAVERSAL_MATRIX_A4R186_v0.2.0.csv`
- `docs/sera-vnext/author-node-decision-intake-a4r187/SERA_AUTHOR_NODE_DECISION_INTAKE_MATRIX_A4R187_v0.2.0.csv`
- `docs/sera-vnext/a4r188-preflight-traversal-guardrails/`
- `docs/sera-vnext/a4r188-language-lock/`

These artifacts are present as methodology lock/reference documents. Runtime integration into active engine logic is not yet demonstrated.

## 4) Runtime engine map
Primary runtime paths audited:
- Legacy engine path:
  - `frontend/src/lib/sera/pipeline.ts`
  - `frontend/src/lib/sera/all-steps.ts`
  - `frontend/src/lib/sera/llm.ts`
  - `frontend/src/lib/sera/prompts.ts`
- vNext guarded path:
  - `frontend/src/lib/sera-vnext/engine.ts`
  - `frontend/src/lib/sera-vnext/steps/*.ts`
  - `frontend/src/lib/sera-vnext/types.ts`
  - `frontend/src/lib/sera-vnext/human-decision.ts`
  - `frontend/src/lib/sera-vnext/code-release.ts`
- Test/runner paths:
  - `tests/sera/run.ts`, `tests/sera/runner.ts`, `tests/sera/pipeline_adapter.ts`, `tests/sera/compare.ts`
  - `tests/sera-vnext/*trial*.ts`
  - `scripts/run-sera-smoke-fast.sh`, `scripts/run-sera-v0.1.1-smoke.sh`, `scripts/run-sera-methodology-candidates*.sh`, `scripts/promote-sera-v0.1.1-baseline.sh`

## 5) Current compliance status
Classification requested in scope:
- **Real tree A4R99 import/read/use in runtime**: `NOT_IMPLEMENTED`
- **Canonical nodeId authority in active decisions**: `NOT_IMPLEMENTED`
- **exactQuestionTextPt/exactQuestionTextEn in runtime**: `NOT_IMPLEMENTED`
- **Canonical branchCondition execution**: `NOT_IMPLEMENTED`
- **P/O/A separated processing**: `COMPLIANT_ACTIVE` (but not canonical traversal)
- **Escape point anchoring**: `PARTIAL_DOC_ONLY`
- **Invented/local question blocking**: `LEGACY_HEURISTIC_ACTIVE`
- **Insufficient evidence block**: `COMPLIANT_ACTIVE` in `sera-vnext`
- **PT/EN stable node logic**: `PARTIAL_DOC_ONLY`
- **Downstream lock before P/O/A completion**: `COMPLIANT_ACTIVE` in `sera-vnext`

## 6) Major gaps
1. Canonical tree execution gap:
- No runtime evidence of canonical A4R99 traversal by canonical `nodeId`.
- Local hardcoded questions are used (example in `frontend/src/lib/sera/pipeline.ts:969` and many axis-local prompts in `frontend/src/lib/sera/all-steps.ts`).

2. Canonical text lock gap:
- Runtime does not consume `exactQuestionTextPt` / `exactQuestionTextEn` from canonical source.
- Question text is embedded locally and may diverge from canonical tree.

3. Language separation gap:
- `sera-vnext` has `locale` type support (`pt-BR`/`en`) but logic is not canonical-node driven and uses fixed phrase heuristics.

4. Escape-point gate formalization gap:
- Escape point appears in legacy structures, but no explicit canonical `escapePointScope/approvedEscapePointScope` gate contract was found in active runtime state machine.

5. False-confidence risk:
- Strong docs and guardrails can create appearance of full methodology enforcement while canonical runtime traversal is still absent.

## 7) Tests currently proving compliance
Evidence that is actually executable today:
- vNext downstream locks and non-classified posture:
  - `tests/sera-vnext/dry-run-trial-001.ts`
  - `tests/sera-vnext/code-release-gate-trial-001.ts`
  - `tests/sera-vnext/semantic-consistency-released-codes-trial-001.ts`
  - `tests/sera-vnext/preconditions-from-released-codes-trial-001.ts`
  - `tests/sera-vnext/evidence-category-coverage-trial-001.ts`
- Candidate/baseline process guards (script-level):
  - `scripts/run-sera-methodology-candidates.sh`
  - `scripts/promote-sera-v0.1.1-baseline.sh`

What these tests do **not** prove:
- They do not prove active canonical A4R99 node traversal in runtime.
- They do not prove exact canonical question text lock by node.

## 8) Tests missing
Missing executable proof for methodology runtime compliance:
- Real-tree traversal test proving canonical node-by-node execution (`nodeId`, answer, next node).
- PT/EN parity test proving identical node path across languages.
- Escape-point hard gate test proving post-escape consequence cannot become cause.
- Anti-invented-question test proving only canonical node questions are emitted/used.
- Negative controls for canonical tree absence (fail-fast when canonical node is missing).
- Rationale specificity test linked to factual evidence per canonical node.

## 9) Risk of false methodological confidence
Current risk level: **High**.

Reason:
- Documentation lock maturity (A4R185–A4R188) is high, but runtime canonical integration is low.
- A guarded dry-run engine can appear methodologically strict while still not executing canonical tree requirements.

## 10) Recommended implementation roadmap
Use phased implementation in A4R190 (planned in separate file):
- A4R190-A: canonical tree runtime data model.
- A4R190-B: canonical traversal engine skeleton.
- A4R190-C: PT/EN rendering bound to canonical nodeId.
- A4R190-D: explicit escape point gate.
- A4R190-E: downstream lock integration with canonical traversal states.
- A4R190-F: executable compliance suite.
- A4R190-G: candidate fixtures linked to real tree traversal evidence.

## 11) What NOT to implement yet
In this A4R189 phase (docs-only audit), do not implement:
- Runtime code changes.
- API/UI behavior changes.
- DB schema/migrations.
- Fixture promotion or baseline promotion.
- Any bypass/shortcuts that infer canonical compliance from docs alone.

## 12) Decision
**NOT_TRUSTED_FOR_REAL_TREE_RUNTIME**

Rationale:
- Current runtime and tests do not prove active execution of A4R99 canonical tree with canonical `nodeId` and exact canonical question text locks.
- Methodology documentation is ready; runtime alignment is still pending implementation.
