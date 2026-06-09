# SERA vNext Engine V02 Validation Protocol

The v02 suite is frozen before execution by `SERA_VNEXT_ENGINE_V02_EXPECTED_MANIFEST.json`.

Composition:
- 39 existing regression cases retained as boundary/final-output guardrail coverage;
- 20 independent accuracy cases, 10 pt-BR and 10 en;
- 22 leaf reachability positive cases;
- 22 leaf reachability negative cases.

Expected outcomes:
- unambiguous cases require a specific axis code;
- insufficient evidence cases require abstention;
- negative leaf cases prohibit a target code.

Metrics:
- classification_accuracy;
- abstention_precision;
- abstention_recall;
- guardrail_detection_rate;
- leaf_coverage;
- language_parity;
- determinism;
- critical_boundary_pass_rate;
- product_parity.

Allowed decisions:
- `SERA_VNEXT_ENGINE_V02_VALIDATED_FOR_CONTROLLED_PILOT`
- `SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS`
- `SERA_VNEXT_ENGINE_V02_NOT_READY`
