# SERA vNext Benchmark Fixture Design - A4R206-BIG v0.2.0

Date: 2026-06-05
Phase: A4R206-BIG
Status: BENCHMARK_FIXTURE_DESIGN_ONLY_COMPLETE
Scope: candidate benchmark and future fixture gate design only
Mode: NON_FINAL_DOCUMENTAL_ONLY

Required locks:
- NOT_FIXTURE
- NOT_BASELINE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM

## 1. Objective

Design a future candidate benchmark and future fixture gate system after A4R205-BIG closed the candidate-only calibration corpus.

This phase does not create a fixture, baseline, product behavior, runtime behavior, final P/O/A, final escape point approval, selectedCode, releasedCode, finalConclusion, CLASSIFIED output, or downstream behavior.

## 2. Benchmark Design Principles

1. Benchmark is not baseline.
2. Benchmark is not product.
3. Benchmark does not create final P/O/A.
4. Fixture requires a separate gate.
5. Baseline requires a later separate gate after fixture gating.
6. Real events, synthetic cases, Daumas, and human-applied references must remain separated.
7. Synthetic cases cannot prove operational reality.
8. Daumas cannot be a factual source.
9. Human-applied SERA cases can calibrate reasoning, but cannot become automatic fixtures.
10. Boundary and negative controls test locks and failure modes; they do not feed positive classification.

## 3. Benchmark Component Routing Summary

### Future positive benchmark candidates

- `Comair 5191`: positive reference candidate, future fixture design eligible only, not fixture now.
- `Asiana 214`: positive reference with boundary warning, future fixture design eligible only with automation and 500 ft gate limitation.
- `UPS 1354`: positive reference with boundary warning, future fixture design eligible only with setup, FMC, V-S, and MDA limitation.

### Boundary and negative controls

- `Colgan 3407`: boundary control only now; not fixture eligible now.
- `Delta 191`: negative control only, not a positive fixture.
- `USAir 427`: boundary control only, not a positive fixture.
- `5N-BQJ`: negative control only, not a positive fixture.

### Human and methodological references

- `2026-0001 crank event`: human-applied reference only; not automatic fixture.
- `Daumas`: methodological reference only; not factual source and not fixture source.

### Synthetic support

- `GAP-004 consequence-as-cause`: controlled synthetic candidate for future synthetic fixture design only if separately authorized; not fixture now.
- `GAP-002 agent_migration`: synthetic readiness only; not materialized and not fixture eligible now.
- `GAP-001 PF_PM separation`: retained reference only; not active fixture design material.

### Second wave and deferred components

- `G-WNSB`: second-wave candidate with actor-migration caution.
- `Execuflight 1526`: second-wave candidate with boundary and data-granularity caution.
- `Batch 2 deferred cases`: deferred; not benchmark-active in A4R206-BIG.

## 4. Candidate Fixture Eligibility Summary

Future fixture design requires:

1. stable source traceability;
2. stable candidate escape window;
3. acceptable actor attribution;
4. evidence against recorded;
5. no unresolved high agent migration;
6. no unresolved high outcome bias;
7. no final P/O/A ambiguity at fixture-design stage;
8. author review gate passed;
9. adversarial review passed;
10. explicit non-product status.

Current A4R206-BIG eligibility:

- `Comair 5191`: `FIXTURE_DESIGN_ELIGIBLE_FUTURE_ONLY`.
- `Asiana 214`: `FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY`.
- `UPS 1354`: `FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY`.
- `Colgan 3407`: `NOT_FIXTURE_ELIGIBLE_NOW`.
- `2026-0001 crank event`: `NEVER_FIXTURE_AUTOMATIC`.
- `Daumas`: `METHODOLOGY_REFERENCE_ONLY`.
- `GAP-004`: `SYNTHETIC_FIXTURE_DESIGN_ONLY_FUTURE`.
- `GAP-002`: `NOT_FIXTURE_ELIGIBLE_NOW`.
- `GAP-001`: `RETAINED_REFERENCE_ONLY`.
- negative controls: `CONTROL_ONLY_NOT_POSITIVE_FIXTURE`.

## 5. Fixture Gate Design Summary

The future gate system is design-only in A4R206-BIG.

Minimum future gates:

1. Source Traceability Gate.
2. Escape Window Stability Gate.
3. Actor Attribution Gate.
4. Evidence Sufficiency Gate.
5. Evidence Against Gate.
6. Boundary/Negative Role Gate.
7. Synthetic Separation Gate.
8. Daumas Non-Factual Use Gate.
9. Human-Applied Non-Automatic Gate.
10. Author Approval Gate.
11. Adversarial Review Gate.
12. No-Downstream Gate.

No gate is executed in this phase. The gate design exists to define the dry-run surface for A4R207-BIG.

## 6. Baseline Gate Summary

Baseline status:

`NOT_AUTHORIZED_NOW`

Baseline cannot follow directly from candidate-only corpus closure or benchmark design. It requires fixture gate execution first, stable expected outputs, deterministic validation, a regression policy, explicit human authorization, and a rollback/change-control policy.

Current baseline blocking conditions:

- unresolved Colgan ambiguity;
- GAP-002 not materialized;
- no-failure / A-A boundary weak;
- typecheck environment debt unresolved;
- no fixture gate execution;
- product/runtime not aligned;
- no final author approval.

## 7. Non-Use Summary

The benchmark design explicitly prohibits:

- using candidate-only material as final;
- using benchmark design as a real fixture;
- using a synthetic draft as a real event;
- using Daumas as a factual source;
- using a human-applied case as automatic baseline;
- using negative controls as positive examples;
- using boundary cases without warning;
- using Colgan as a positive reference;
- using Asiana or UPS without their boundary warnings;
- using GAP-004 as proof of real-world causality;
- using GAP-002 before materialization.

## 8. Future Validation Protocol Summary

The future protocol should separate:

- benchmark from fixture;
- fixture from baseline;
- positive references from boundary and negative controls;
- real events from synthetic cases;
- human-applied input from released vNext output;
- Daumas method depth from factual source evidence.

Future validation may define N_RUNS, PASS/PARTIAL/FAIL semantics, evidence update policy, supersession policy, author review requirements, and adversarial review requirements. A4R206-BIG only designs that protocol; it does not execute it.

## 9. Next Macrophase

Recommended next macrophase:

`A4R207-BIG - Fixture Gate Dry Run Design`

Reason:

- benchmark and fixture design is sufficiently defined for a dry-run design of the gates;
- the next missing work is gate dry-run design, not product/runtime planning;
- fixture creation, baseline creation, product planning, and runtime alignment remain blocked.

## 10. Lock Confirmations

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture created: NO
- baseline created: NO
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- Daumas used as factual source: NO
- Daumas automatic reentry: NO
- synthetic-real blending: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
- no final recommendation output
