# SERA Fixture Implementation Result P1-A — A4R172

Status:
- DRAFT_ONLY
- FIXTURE_DRAFT_IMPLEMENTED
- CANDIDATE_ONLY
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objective

This result records the controlled implementation of the two P1-A draft fixtures defined by A4R172-plan:

- `REF-P1A-DAUMAS-CASE-4-POSITIVE-001`
- `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001`

This phase creates candidate-only JSON drafts and a structural validator. It does not create official fixtures, baseline output, runtime integration, release, or downstream artifacts.

## 2. Files Created

- `tests/sera/fixtures-candidates/reference-p1a/REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json`
- `tests/sera/fixtures-candidates/reference-p1a/REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json`
- `tests/sera/fixtures-candidates/reference-p1a/reference-p1a-fixtures.txt`
- `docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs`
- `docs/sera-vnext/fixture-implementation-contract-a4r172/SERA_FIXTURE_IMPLEMENTATION_RESULT_P1A_A4R172_v0.2.0.md`

## 3. Directory Choice

The repository already contains:

- official fixtures in `tests/sera/fixtures/`;
- candidate fixtures in `tests/sera/fixtures-candidates/`;
- candidate subdirectories for methodology tracks.

The P1-A drafts were placed in `tests/sera/fixtures-candidates/reference-p1a/` to keep them isolated from the official runner, which loads only `tests/sera/fixtures/`.

## 4. Schema Used

The official fixture schema requires `id`, `title`, `domain`, `description`, `expected`, `rationale`, and `discriminators`, plus current runner fields such as `erc_level`. These P1-A files are candidate-only and intentionally not loaded by the official runner.

The draft schema preserves the contract fields required for methodology review:

- `fixtureStatus`
- `referenceStatus`
- `escapePointId`
- `humanPoaApplicable`
- `negativeControl`
- `expected`
- `expectedTrace`
- `assertions`
- `locks`

No ERC expected value is provided because this phase must not contaminate risk-layer scoring or baseline behavior.

## 5. Fixture Drafts

### DAUMAS-CASE-4

- fixtureId: `REF-P1A-DAUMAS-CASE-4-POSITIVE-001`
- sourceCaseId: `DAUMAS-CASE-4`
- expected P/O/A: `P-G / O-D / A-F`
- escapePointId: `DAUMAS-CASE-4-ESCAPE-001`
- humanPoaApplicable: `true`
- negativeControl: `false`
- referenceStatus: `READY_FOR_FIXTURE_DRAFT`

### US-AIRWAYS-1549

- fixtureId: `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001`
- sourceCaseId: `US-AIRWAYS-1549`
- expected P/O/A: `NOT_APPLICABLE_AT_ESCAPE_POINT / NOT_APPLICABLE_AT_ESCAPE_POINT / NOT_APPLICABLE_AT_ESCAPE_POINT`
- escapePointId: `US-AIRWAYS-1549-ESCAPE-001`
- unsafeConditionType: `technical_environmental_onset`
- directHumanActorAtEscapePoint: `none`
- humanPoaApplicable: `false`
- negativeControl: `true`
- referenceStatus: `READY_FOR_NEGATIVE_CONTROL_FIXTURE_DRAFT`

## 6. Limitations

- The JSON files are draft fixtures, not official fixtures.
- The official runner may not support `NOT_APPLICABLE_AT_ESCAPE_POINT`.
- The US-AIRWAYS-1549 negative control remains outside runner integration until a separate authorized phase adds explicit support.
- EXECUFLIGHT-1526 remains outside A4R172-impl.
- No baseline, release, runtime, UI, API, DB, migration, or SERA engine changes were made.

## 7. Validation

Validation is provided by:

`node docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs`

The validator:

- reads only the two P1-A JSON drafts;
- validates fixture IDs;
- validates expected P/O/A;
- validates `negativeControl`;
- validates `humanPoaApplicable`;
- validates locks;
- validates expected trace nodes;
- validates that forbidden output fields are absent;
- does not call an API;
- does not call an LLM;
- does not alter files.

## 8. Locks

- `NO_BASELINE`
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`
- `NO_OFFICIAL_FIXTURE_CHANGE`
- `NO_RUNTIME_CHANGE`
- `NO_EXECUFLIGHT_IN_SCOPE`
