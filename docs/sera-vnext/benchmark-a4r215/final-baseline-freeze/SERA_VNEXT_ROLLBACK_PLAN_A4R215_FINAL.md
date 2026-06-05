# SERA vNext Rollback Plan - A4R215-FINAL

Date: 2026-06-05
Phase: A4R215-FINAL
Status: `A4R215_BASELINE_LAYER_ROLLBACK_READY`

Rollback steps:

1. Delete `tests/sera-vnext/baselines/`
2. Delete `tests/sera-vnext/baseline-candidates/SERA_VNEXT_BASELINE_CANDIDATE_V0_SUPERSEDED_BY_BASELINE_V0.md`
3. Delete `tests/sera-vnext/vnext-baseline-v0-a4r215final-trial-001.ts`
4. Delete `docs/sera-vnext/benchmark-a4r215/final-baseline-freeze/`
5. If a commit-level rollback is needed, revert the A4R215 commit only

Fixtures, fixture set, and expected outputs from A4R214 can remain intact if the rollback is limited to the baseline layer.
