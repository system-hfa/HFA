# Fixture Candidate Index - A4R212-BIG

Date: 2026-06-05
Phase: A4R212-BIG
Status: FIXTURE_CANDIDATE_ONLY

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

## Positive Candidates

- `A4R212-CAND-POS-COMAIR-5191`: `positive/comair-5191.fixture-candidate.json`
- `A4R212-CAND-POS-ASIANA-214`: `positive/asiana-214.fixture-candidate.json`
- `A4R212-CAND-POS-UPS-1354`: `positive/ups-1354.fixture-candidate.json`

## Synthetic Candidate

- `A4R212-CAND-SYN-GAP004-CONSEQUENCE-AS-CAUSE`: `synthetic/gap004-consequence-as-cause.fixture-candidate.json`

## Control Candidates

- `A4R212-CAND-CTRL-DELTA-191`: `controls/delta-191-control.fixture-candidate.json`
- `A4R212-CAND-CTRL-USAIR-427`: `controls/usair-427-control.fixture-candidate.json`
- `A4R212-CAND-CTRL-5NBQJ`: `controls/5nbqj-control.fixture-candidate.json`

## Isolation

All files in this index are isolated under `tests/sera-vnext/fixture-candidates/`.

They are not official fixtures, not baseline records, not product records, and not runtime inputs.
