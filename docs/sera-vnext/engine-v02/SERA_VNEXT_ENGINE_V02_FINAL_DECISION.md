# SERA vNext Engine V02 Final Decision

Decision:

```text
SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS
```

Basis:
- Opus audit incorporated and adjudicated.
- Priority findings F-01/F-02/F-03/F-04/F-05/F-12/F-24 addressed in code, tests, copy, or formal decision docs.
- pt-BR/en evidence traversal works in the v02 suite.
- O-B/O-C require explicit awareness.
- guardrails are computed and evidence-bearing.
- all 22 active canonical leaves are reachable by positive evidence and protected by negative controls.
- v02 independent validation is frozen by manifest and passes.
- v01 regression is preserved with two noncritical v02 guardrail-detection divergences.
- final outputs remain blocked.

Limits:
- not scientific validation;
- not production-ready;
- not human-validated;
- legacy common-user flow is not yet migrated to vNext.

Next authorized engineering decision: Macrophase 2 product migration from legacy `/api/analyze` to vNext v02, with provenance and rollback.
