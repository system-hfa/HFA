# HFA Engine V03 Gate Semantics

Chosen semantic: Option B.

The naturalistic v03 runner remains a validation gate outside required technical regression pass/fail. It executes in the canonical runner as type GATE, requiredForRegression=false, expectedExit=1, expectedStatus=NOT_READY.

Final status remains ENGINE_NATURALISTIC_VALIDATION_NOT_READY. Expected outputs and corpus thresholds were not changed.

This separation means low naturalistic recall blocks production/scientific readiness claims, but does not contaminate the technical integrity sweep when the NOT_READY status is expected and documented.
