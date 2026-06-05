# SERA vNext Isolated Fixture Candidates - A4R212-BIG v0.2.0

Date: 2026-06-05
Phase: A4R212-BIG
Status: ISOLATED_FIXTURE_CANDIDATES_CREATED
Mode: CANDIDATE_ONLY_NON_FINAL

Required locks:
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

## 1. Human Authorization

The author explicitly authorized A4R212-BIG as an isolated fixture candidate phase only.

Authorized scope:

- create candidate fixture files only under `tests/sera-vnext/fixture-candidates/`
- create A4R212-BIG documentation only under `docs/sera-vnext/benchmark-a4r212/isolated-fixture-candidates-big/`
- create a dedicated A4R212-BIG validation trial

This authorization does not authorize official fixtures, baseline, product/runtime integration, operational final P/O/A, operational final escape point approval, READY, selectedCode, releasedCode, finalConclusion, CLASSIFIED output, or downstream behavior.

## 2. Isolation

The isolated candidate package was created under:

`tests/sera-vnext/fixture-candidates/`

Subdirectories:

- `positive/`
- `synthetic/`
- `controls/`

No candidate file belongs to `tests/sera/fixtures/`.

## 3. Candidates Created

Positive candidates:

- `A4R212-CAND-POS-COMAIR-5191`
- `A4R212-CAND-POS-ASIANA-214`
- `A4R212-CAND-POS-UPS-1354`

Synthetic candidate:

- `A4R212-CAND-SYN-GAP004-CONSEQUENCE-AS-CAUSE`

Control candidates:

- `A4R212-CAND-CTRL-DELTA-191`
- `A4R212-CAND-CTRL-USAIR-427`
- `A4R212-CAND-CTRL-5NBQJ`

## 4. Candidate Versus Official Fixture

A fixture candidate is an isolated, non-final testing instrument. It has expected behavior and guardrails, but it is not an official fixture and cannot be used as baseline evidence.

Every candidate explicitly sets:

- `officialFixture: false`
- `baselineEligibleNow: false`
- `productEligibleNow: false`
- `readyPromotion: false`
- `selectedCode: null`
- `releasedCode: null`
- `finalConclusion: null`
- `classifiedOutput: false`
- `downstreamAllowed: false`

## 5. Why This Is Not Baseline

This package is not baseline because:

1. it is stored in an isolated candidate-only directory;
2. it does not alter baseline reports;
3. it does not alter official fixtures;
4. it does not create final expected values;
5. it remains subject to later author review and freeze decision.

## 6. Why This Is Not Product

This package is not product because:

1. no product/runtime import was created;
2. no API/UI file was changed;
3. no engine file was changed;
4. no downstream behavior was enabled.

## 7. Candidate-Specific Locks

- `Asiana 214` includes `BOUNDARY_WARNING_REQUIRED`
- `UPS 1354` includes `BOUNDARY_WARNING_REQUIRED`
- `GAP-004 consequence-as-cause` includes `SYNTHETIC_ONLY`, `NOT_REAL_EVENT`, and `NO_SYNTHETIC_REAL_BLENDING`
- `Delta 191`, `USAir 427`, and `5N-BQJ` include `CONTROL_ONLY` and `NOT_POSITIVE_FIXTURE`

## 8. Lock Confirmations

- official fixture created: NO
- baseline created: NO
- engine/runtime changed: NO
- API/UI changed: NO
- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- downstream release behavior: BLOCKED
- synthetic-real blending: NO
