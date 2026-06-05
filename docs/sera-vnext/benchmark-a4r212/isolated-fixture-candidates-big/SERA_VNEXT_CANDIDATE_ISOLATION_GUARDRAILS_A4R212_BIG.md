# SERA vNext Candidate Isolation Guardrails - A4R212-BIG

Date: 2026-06-05
Phase: A4R212-BIG
Status: CANDIDATE_ISOLATION_GUARDRAILS_DEFINED

## Guardrails

1. no `tests/sera/fixtures/`
2. no baseline
3. no engine import
4. no product/runtime import
5. no API/UI import
6. no selectedCode active output
7. no releasedCode active output
8. no finalConclusion active output
9. no CLASSIFIED active output
10. no READY promotion
11. rollback by deletion of the isolated candidate directory and A4R212 artifacts only
12. dedicated trial required before closeout

## Candidate Locks

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

## Protected Areas

A4R212-BIG does not touch:

- `tests/sera/fixtures/`
- baseline reports
- `frontend/src/lib/sera/`
- `frontend/src/app/api/`
- `supabase/migrations/`
- engine/runtime files
- product/UI files
