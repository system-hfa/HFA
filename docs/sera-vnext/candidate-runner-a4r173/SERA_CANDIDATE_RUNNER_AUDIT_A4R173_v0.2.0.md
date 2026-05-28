# SERA Candidate Runner Audit — A4R173

Status:
- DRAFT_ONLY
- CANDIDATE_RUNNER_AUDIT
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Scope

Audit how the current `tests/sera` runner behaves, and define a safe validation path for P1-A candidate fixtures without touching official fixtures or baseline.

## 2. Evidence Read

- `tests/sera/runner.ts`
- `tests/sera/run.ts`
- `tests/sera/report.ts`
- `tests/sera/compare.ts`
- `tests/sera/fixtures/schema.ts`
- `tests/sera/fixtures/`
- `tests/sera/fixtures-candidates/`
- `docs/sera-vnext/fixture-implementation-contract-a4r172/*`
- `tests/sera/fixtures-candidates/reference-p1a/*`

## 3. Runner Findings

1. Fixture discovery in official runner:
`tests/sera/runner.ts` defines `FIXTURES_DIR = tests/sera/fixtures` and `loadFixtures()` reads only that directory.

2. Candidate directory support:
There is no native loading from `tests/sera/fixtures-candidates/` in the official runner path.

3. Expected code matching model:
`tests/sera/compare.ts` compares `perception_code`, `objective_code`, and `action_code` with exact string equality.
The token `NOT_APPLICABLE_AT_ESCAPE_POINT` would not break comparison itself.

4. `erc_level` requirement:
`tests/sera/fixtures/schema.ts` requires `expected.erc_level` and runner/score logic expects numeric ERC in both expected and actual paths.
Current P1-A draft fixtures intentionally omit ERC to avoid risk-layer contamination.

5. Why P1-A draft fixtures cannot be run by official runner now:
- they are outside `tests/sera/fixtures/`;
- they do not follow the full official fixture schema (`rationale`, `discriminators`, `expected.erc_level`).

6. Risk if forced into official runner:
Would require schema and scoring coupling changes or artificial ERC placeholders, both outside this phase.

7. Safe direction for A4R173:
Use a candidate-only validator script that reads only P1-A candidate fixtures and validates contract consistency, without LLM/API and without runner integration.

## 4. Technical Decision

For A4R173, implement candidate-only validation in `docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs`.

No modification to:
- `tests/sera/runner.ts`
- `tests/sera/run.ts`
- `tests/sera/report.ts`
- `tests/sera/compare.ts`
- official fixtures in `tests/sera/fixtures/`
- baseline artifacts.

## 5. NOT_APPLICABLE Support Status

- Supported in candidate-only contract validation.
- Not integrated into official runner flow for this phase.
- Any official runner support would require a separate authorized phase with schema/score policy decisions.
