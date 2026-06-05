# Fixture Candidate Contract - A4R212-BIG

Date: 2026-06-05
Phase: A4R212-BIG
Status: FIXTURE_CANDIDATE_ONLY

## Required JSON Contract

Every candidate JSON must contain:

- `status: FIXTURE_CANDIDATE_ONLY`
- `officialFixture: false`
- `baselineEligibleNow: false`
- `productEligibleNow: false`
- `readyPromotion: false`
- `selectedCode: null`
- `releasedCode: null`
- `finalConclusion: null`
- `classifiedOutput: false`
- `downstreamAllowed: false`
- `expectedBehaviorStatus: EXPECTED_BEHAVIOR_NON_FINAL`

Every candidate JSON must include the locks:

- FIXTURE_CANDIDATE_ONLY
- NOT_OFFICIAL_FIXTURE
- NOT_BASELINE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM
- EXPECTED_BEHAVIOR_NON_FINAL

## Additional Locks

Synthetic candidates must include:

- SYNTHETIC_ONLY
- NOT_REAL_EVENT
- NO_SYNTHETIC_REAL_BLENDING

Control candidates must include:

- CONTROL_ONLY
- NOT_POSITIVE_FIXTURE

Boundary-warning positive candidates must include:

- BOUNDARY_WARNING_REQUIRED

## Isolation Contract

These files may be validated by dedicated candidate-only trials only. They must not be imported by the SERA engine, official fixture loaders, baseline report generation, product code, API routes, or UI code.

Rollback is deletion of `tests/sera-vnext/fixture-candidates/` and the A4R212 documentation/trial only.
