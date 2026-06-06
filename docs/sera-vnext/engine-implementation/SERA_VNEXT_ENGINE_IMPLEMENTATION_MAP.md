# SERA vNext Engine Implementation Map

Date: 2026-06-06

Status: `ENGINE_V0_EXECUTABLE_CANDIDATE_ONLY_IMPLEMENTED`

Scope: candidate-only executable causal engine from raw narrative. This does not authorize final classification, persistence, Product Beta, HFACS, Risk/ERC, ARMS/ERC, recommendations, or downstream output.

| step | current_file | current_status | required_behavior | implementation_action | test_coverage |
|---|---|---|---|---|---|
| 1 factual extraction | `frontend/src/lib/sera-vnext/engine-v0/steps/01-factual-extraction.ts` | implemented | extract facts, actors, actions, timeline, cues, warnings, decisions, control inputs | reuses candidate-only extraction and normalizes evidence IDs/categories | `engine-v0-contract-trial-001`, runner v0 |
| 2 safe operation model | `frontend/src/lib/sera-vnext/engine-v0/steps/02-safe-operation-model.ts` | implemented | identify expected safe state/action with evidence | deterministic heuristic over narrative and extracted facts | runner v0 |
| 3 escape point | `frontend/src/lib/sera-vnext/engine-v0/steps/03-escape-point.ts` | implemented, partial on several boundary cases | identify candidate or progressive zone and exclude post-escape evidence | reuses candidate escape-window builder and records earliest/latest/support/counter evidence | runner v0 divergences |
| 4 unsafe state | `frontend/src/lib/sera-vnext/engine-v0/steps/04-unsafe-state.ts` | implemented | describe unsafe operational state near escape point | adapter over existing vNext unsafe-state step | runner v0 |
| 5 unsafe act/condition | `frontend/src/lib/sera-vnext/engine-v0/steps/05-unsafe-act-condition.ts` | implemented | separate unsafe act, unsafe condition, unresolved, technical dominant | adapter over existing vNext act/condition step | runner v0 |
| 6 direct actor | `frontend/src/lib/sera-vnext/engine-v0/steps/06-direct-actor.ts` | implemented, conservative | identify direct actor without organizational migration | deterministic actor extraction with system-dominant safeguards | Product Alpha parity, runner v0 |
| 7 P/O/A statements | `frontend/src/lib/sera-vnext/engine-v0/steps/07-axis-statements.ts` | implemented | produce perception/objective/action statements at escape point | adapter over existing P/O/A statement step | runner v0 |
| 8 canonical traversal | `frontend/src/lib/sera-vnext/engine-v0/steps/08-canonical-traversal.ts` | implemented candidate-only | execute real canonical tree path and return candidate codes | validates tree and builds canonical path from candidate leaf using exact tree asset | `engine-v0-canonical-tree-trial-001` |
| 9 preconditions | `frontend/src/lib/sera-vnext/engine-v0/steps/09-preconditions.ts` | implemented candidate-only | evidence-backed preconditions separate from active failure | creates candidate preconditions from evidence/category rules without `releasedCode` | `engine-v0-preconditions-trial-001` |
| 10 assurance/traces | `frontend/src/lib/sera-vnext/engine-v0/steps/10-assurance.ts` | implemented | guardrails, traces, uncertainties, human review package | builds non-final assurance envelope and locks final outputs | `engine-v0-contract-trial-001`, Product Alpha parity |

Entrypoints:

- Engine: `frontend/src/lib/sera-vnext/engine-v0/run-engine.ts`
- Product Alpha runtime: `frontend/src/lib/sera-vnext-runtime/candidate-only/candidate-service.ts`
- Product Alpha API: `frontend/src/app/api/admin/sera-vnext/candidate/route.ts`
- Validation runner: `tests/sera-vnext/engine-validation-v0/run-all.ts`
