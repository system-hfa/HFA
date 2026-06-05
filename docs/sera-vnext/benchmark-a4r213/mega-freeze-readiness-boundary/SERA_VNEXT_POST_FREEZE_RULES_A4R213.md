# SERA vNext Post-Freeze Rules - A4R213

Date: 2026-06-05
Phase: A4R213-MEGA
Status: POST_FREEZE_RULES_DEFINED

## Rules

1. do not move candidates to `tests/sera/fixtures/`;
2. do not import candidates in the engine;
3. do not use candidates in baseline;
4. do not use candidates in product;
5. any candidate alteration requires a new authorized phase;
6. any promotion requires explicit human authorization;
7. baseline requires a separate gate;
8. product/runtime requires a separate gate;
9. if candidates are promoted later, preserve history and rollback;
10. keep `FIXTURE_CANDIDATE_SET_FROZEN_NON_OFFICIAL` until a later decision changes it.

## Current Freeze State

The current freeze state is non-official and candidate-only.

No official fixture, baseline, product, runtime, or downstream use is opened by this freeze.
