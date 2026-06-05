# SERA vNext Rollback Plan - A4R214-MAX

Date: 2026-06-05
Phase: A4R214-MAX
Status: SIMPLE_FILE_DELETION_ROLLBACK

Rollback steps:

1. Delete `tests/sera-vnext/fixtures/`
2. Delete `tests/sera-vnext/fixture-sets/`
3. Delete `tests/sera-vnext/baseline-candidates/`
4. Delete `tests/sera-vnext/official-fixture-set-a4r214max-trial-001.ts`
5. Delete `docs/sera-vnext/benchmark-a4r214/official-fixture-promotion-max/`

No legacy fixture, engine, API, UI, database, or product file rollback is required because those areas remain untouched in this phase.
