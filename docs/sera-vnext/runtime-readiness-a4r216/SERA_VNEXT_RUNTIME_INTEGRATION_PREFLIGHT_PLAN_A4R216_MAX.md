# SERA vNext Runtime Integration Preflight Plan - A4R216-MAX

Status: `PREFLIGHT_PLAN_READY_NOT_EXECUTED_FOR_RUNTIME`

This plan defines the minimum checks required before a later phase may request permission to implement vNext runtime integration. It does not perform that integration.

## 1. Entry Conditions

| Gate | Required condition |
| --- | --- |
| Repository | Branch is `main`; HEAD equals `origin/main`; no unexpected tracked or cached changes. |
| Typecheck | `npm --prefix frontend exec -- tsc --noEmit` exits successfully. |
| vNext baseline | `tests/sera-vnext/vnext-baseline-v0-a4r215final-trial-001.ts` passes. |
| Official fixture set | `tests/sera-vnext/official-fixture-set-a4r214max-trial-001.ts` passes. |
| Full vNext sweep | Every `tests/sera-vnext/*.ts` trial passes. |
| Protected paths | No unapproved edit under productive runtime, productive API, database migration, legacy fixture, or downstream product paths. |

## 2. Boundary Checks

Before any future runtime code edit:

1. Re-read the vNext baseline contract.
2. Confirm all baseline isolation flags remain false where required.
3. Confirm GAP-004 remains synthetic-only.
4. Confirm Delta 191, USAir 427, and 5N-BQJ remain control-only.
5. Confirm Asiana 214 and UPS 1354 retain caution warnings.
6. Confirm no productive output field is being populated from vNext expected-output records.

## 3. Future Runtime Adapter Shape

A future implementation should start with a read-only adapter outside the productive runtime path unless explicitly authorized otherwise.

Minimum adapter behavior:

| Behavior | Requirement |
| --- | --- |
| Source loading | Load only the official vNext baseline v0 and fixture set v0. |
| Integrity validation | Fail closed if status, namespace, count, or isolation flags are wrong. |
| Output behavior | Return diagnostic readiness metadata only. |
| Product behavior | Do not write database rows, reports, UI state, or released answers. |
| Rollback | Remove the adapter without changing productive SERA behavior. |

## 4. Required Validation Order

The future implementation phase must run checks in this order:

1. Repository preflight.
2. Typecheck.
3. A4R216 runtime-readiness trial.
4. A4R215 baseline v0 trial.
5. A4R214 official fixture set trial.
6. A4R213 readiness boundary trial.
7. A4R212 isolated candidate trial.
8. Full `tests/sera-vnext/*.ts` sweep.
9. Targeted scans for forbidden productive activation.
10. Human review of the diff before staging.

## 5. Exit Conditions

Runtime integration remains blocked if any of the following is true:

| Condition | Exit status |
| --- | --- |
| Typecheck fails | `BLOCKED_TYPECHECK` |
| vNext baseline validation fails | `BLOCKED_BASELINE_VALIDATION` |
| Protected path changed without explicit scope | `BLOCKED_PROTECTED_SCOPE` |
| Product-facing field populated from expected-output records | `BLOCKED_PRODUCT_LEAKAGE` |
| Control fixture treated as a positive | `BLOCKED_CONTROL_DRIFT` |
| Synthetic fixture treated as real evidence | `BLOCKED_SYNTHETIC_DRIFT` |

A later implementation request must explicitly authorize the exact runtime files before any productive path is edited.
