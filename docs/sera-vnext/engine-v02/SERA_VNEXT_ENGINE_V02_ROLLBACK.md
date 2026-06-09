# SERA vNext Engine V02 Rollback

Runtime rollback:
1. revert `SERA_VNEXT_ENGINE_VERSION` from `0.2.0` to the previous value;
2. revert evaluator changes in `canonical-tree/evaluate-node.ts`;
3. revert bilingual evidence tags in `evidence/extract-evidence.ts`;
4. revert guardrail computation wiring in `engine-v0/steps/10-assurance.ts` and `run-engine.ts`;
5. keep reports/docs for audit trail unless explicitly superseded.

Product rollback:
- Product Beta/admin can continue to block final outputs because candidate-only locks are unchanged.
- Legacy `/api/analyze` remains separate and should not be used to claim vNext parity.

Validation after rollback:
- run `npx tsx tests/sera-vnext/engine-validation-v01/run-all.ts`;
- run final-output lock tests;
- document any v02 report invalidation.
