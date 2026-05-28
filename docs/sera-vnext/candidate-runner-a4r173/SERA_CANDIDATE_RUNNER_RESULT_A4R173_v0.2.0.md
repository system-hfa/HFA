# SERA Candidate Runner Result — A4R173

Status:
- DRAFT_ONLY
- CANDIDATE_RUNNER_RESULT
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Technical Decision

A4R173 uses candidate-only validation, not official runner integration.

Reason:
- official runner is scoped to `tests/sera/fixtures/`;
- P1-A drafts are intentionally in `tests/sera/fixtures-candidates/reference-p1a/`;
- official schema/score path expects ERC in `expected`, while P1-A drafts intentionally avoid risk-layer scoring.

## 2. Files Created

- `docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_AUDIT_A4R173_v0.2.0.md`
- `docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs`
- `docs/sera-vnext/candidate-runner-a4r173/SERA_CANDIDATE_RUNNER_RESULT_A4R173_v0.2.0.md`

## 3. Validation Coverage

`validate-reference-p1a-candidate-runner.mjs` validates:

- reference list loading from `reference-p1a-fixtures.txt`;
- both candidate JSON fixture files exist and match IDs;
- expected outputs:
  - DAUMAS fixture: `P-G / O-D / A-F`
  - US-AIRWAYS fixture: `NOT_APPLICABLE_AT_ESCAPE_POINT` on P/O/A;
- `humanPoaApplicable` and `negativeControl` contracts;
- negative-control fields (`unsafeConditionType`, `directHumanActorAtEscapePoint`);
- required trace nodes per fixture;
- mandatory locks (`NO_BASELINE`, `NO_RELEASED_CODE`, `NO_DOWNSTREAM`);
- forbidden output fields are absent;
- official runner scope is still `tests/sera/fixtures/`;
- official fixtures do not contain candidate fixture IDs.

## 4. Why Baseline and Official Runner Were Not Touched

- No code change was made in `tests/sera/runner.ts`, `tests/sera/run.ts`, `tests/sera/compare.ts`, or official fixture schema.
- No file in `tests/sera/fixtures/` was modified.
- No file in `tests/reports/baseline/` was modified.

## 5. NOT_APPLICABLE Status

- `NOT_APPLICABLE_AT_ESCAPE_POINT` is validated in candidate-only script logic.
- It is not promoted to official runner behavior in this phase.
- Any official support change requires separate authorization and explicit schema/scoring design.

## 6. Limits

- No LLM/API calls.
- No runtime integration.
- No release/downstream artifacts.
- No baseline update.
- EXECUFLIGHT-1526 remains out of scope.

## 7. Next Recommended Step

Before any commit, perform author review on:

1. candidate-runner audit conclusions;
2. candidate-only validator output;
3. explicit decision whether to open a separate phase for official runner support of `NOT_APPLICABLE_AT_ESCAPE_POINT`.
