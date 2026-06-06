# SERA vNext Runtime/Product Boundary Audit - A4R216-MAX

Status: `RUNTIME_PRODUCT_BOUNDARY_AUDIT_COMPLETE_NOT_INTEGRATED`

Phase: A4R216-MAX
Purpose: audit the boundary between the official isolated vNext baseline and productive HFA/SERA runtime/product surfaces.

## 1. Summary Decision

The A4R215-FINAL vNext baseline is official only inside the isolated `tests/sera-vnext` namespace.

Current runtime/product decision:

```text
NOT_RUNTIME_INTEGRATED
NOT_PRODUCT_INTEGRATED
NOT_DOWNSTREAM_ENABLED
```

The vNext baseline can be used as a methodological validation input for future engineering work. It cannot be consumed by productive runtime, API, UI, database persistence, reports, or downstream behavior in this phase.

## 2. Audited Surfaces

| Surface | Current role | A4R216 status |
| --- | --- | --- |
| `tests/sera-vnext/baselines/sera-vnext-baseline-v0.json` | Official isolated vNext baseline metadata | `READ_ONLY_METHOD_INPUT` |
| `tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json` | Official isolated vNext fixture set | `READ_ONLY_METHOD_INPUT` |
| `tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json` | Official isolated expected-output contract | `READ_ONLY_METHOD_INPUT` |
| `frontend/src/lib/sera/*` | Productive SERA runtime implementation | `BLOCKED_FOR_NOW` |
| `frontend/src/app/api/*` | Productive API boundary | `BLOCKED_FOR_NOW` |
| UI/report pages consuming productive analysis rows | Productive user-facing behavior | `BLOCKED_FOR_NOW` |
| Database schema and migrations | Persistence contract | `BLOCKED_FOR_NOW` |
| Future aggregation/dashboard layers | Future-facing product behavior | `BLOCKED_FOR_NOW` |

## 3. Productive Runtime Findings

The productive runtime is centered on `frontend/src/lib/sera/pipeline.ts`, which orchestrates current SERA analysis through the existing step registry, failure names, preconditions, and productive type contracts.

That path is protected and was not modified.

The current productive API routes, including analyze and recalculate routes under `frontend/src/app/api`, call the established runtime and persistence paths. Those routes were not modified.

## 4. vNext Isolation Findings

The vNext baseline carries explicit isolation flags:

| Flag | Required value |
| --- | --- |
| `namespace` | `sera-vnext` |
| `legacyBaseline` | `false` |
| `productEligibleNow` | `false` |
| `runtimeIntegrationAllowed` | `false` |
| `downstreamAllowed` | `false` |

The baseline contains seven official isolated fixtures and seven expected-output records. It does not authorize legacy fixture promotion or productive consumption.

## 5. Case Boundary Notes

| Case group | Boundary |
| --- | --- |
| Asiana 214 and UPS 1354 | Official isolated positives only; future runtime use requires warnings and separate implementation authorization. |
| Comair 5191 | Official isolated positive only. |
| GAP-004 | Synthetic control of consequence-as-cause drift; never a real-event source. |
| Delta 191, USAir 427, 5N-BQJ | Official isolated controls only; not positives and not productive behavior drivers. |

## 6. Audit Conclusion

A4R216-MAX does not open runtime/product integration.

The next eligible engineering phase must first repair the code-level typecheck errors. Only after a clean typecheck and repeated baseline validation may a separate authorization open a runtime adapter implementation phase.
