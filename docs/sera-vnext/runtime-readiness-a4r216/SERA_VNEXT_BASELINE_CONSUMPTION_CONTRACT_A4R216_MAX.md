# SERA vNext Baseline Consumption Contract - A4R216-MAX

Status: `RUNTIME_CONSUMPTION_CONTRACT_DESIGN_ONLY`
Runtime state: `NOT_RUNTIME_INTEGRATED`
Product state: `NOT_PRODUCT_INTEGRATED`

This document defines how the official isolated vNext baseline may be consumed by a future implementation phase. It is a design contract only. It does not wire the baseline into the runtime, API, UI, persistence, reports, or downstream behavior.

## 1. Source Inputs

The only valid vNext baseline inputs are:

| Input | Required status |
| --- | --- |
| `tests/sera-vnext/baselines/sera-vnext-baseline-v0.json` | `VNEXT_BASELINE_V0_OFFICIAL` |
| `tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json` | `VNEXT_FIXTURE_SET_OFFICIAL_NON_BASELINE` |
| `tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json` | `EXPECTED_OUTPUTS_OFFICIAL_VNEXT_NON_BASELINE` |

All future consumers must verify the source status before reading any record.

## 2. Permitted Future Consumption

A future read-only runtime adapter may consume:

| Data | Permitted use |
| --- | --- |
| baseline id and status | integrity check only |
| namespace | enforce `sera-vnext` isolation |
| fixture ids | controlled test selection |
| fixture group | positive, synthetic, or control separation |
| expected-output record status | validation contract only |
| boundary warnings | prevent product leakage |
| known case warnings | preserve case-specific caution notes |

This permitted consumption is not active in A4R216-MAX.

## 3. Prohibited Consumption

A future consumer must not:

| Field or behavior | Rule |
| --- | --- |
| `selectedCode` | must remain null or absent until a later authorized runtime design defines exact semantics |
| `releasedCode` | must remain null or absent until separate release authorization exists |
| `finalConclusion` | must remain null or absent in the vNext baseline contract |
| `classifiedOutput` | must remain false or absent |
| `readyPromotion` | must remain false or absent |
| `legacyFixture` | must remain false or absent |
| `legacyBaseline` | must remain false |
| `productEligibleNow` | must remain false |
| `runtimeIntegrationAllowed` | must remain false unless a later phase explicitly authorizes and implements it |
| `downstreamAllowed` | must remain false |

No expected-output record may become a direct product classification, released answer, database field update, report output, or UI display value without a later authorized implementation phase and human review.

## 4. Canonical Boundary Rules

Future implementation must preserve:

| Boundary | Rule |
| --- | --- |
| Protected causal baseline | No change to `P/O/A + preconditions` logic without explicit authorization. |
| Productive runtime | No direct import into `frontend/src/lib/sera/*` during this phase. |
| Productive API | No direct import into `frontend/src/app/api/*` during this phase. |
| Legacy fixtures | No copying into `tests/sera/fixtures/*` during this phase. |
| Database | No schema or migration change during this phase. |
| Downstream outputs | No product-facing activation during this phase. |

## 5. Case-Specific Contract

| Case | Contract |
| --- | --- |
| Asiana 214 | May remain an official isolated positive. Any future runtime test must preserve caution warnings and avoid treating report conclusions as automatic SERA outputs. |
| UPS 1354 | May remain an official isolated positive. Any future runtime test must preserve caution warnings and avoid treating report conclusions as automatic SERA outputs. |
| Comair 5191 | May remain an official isolated positive. |
| GAP-004 | Synthetic-only drift guard. It must never be blended with real-event evidence. |
| Delta 191 | Control-only. It must not be promoted as a positive fixture by implication. |
| USAir 427 | Control-only. It must not be promoted as a positive fixture by implication. |
| 5N-BQJ | Control-only. It must not be promoted as a positive fixture by implication. |

## 6. Readiness Requirement

A future consumer may only be implemented after:

1. `npm --prefix frontend exec -- tsc --noEmit` is clean.
2. The full `tests/sera-vnext/*.ts` sweep passes.
3. The vNext baseline v0 trial passes.
4. The official fixture set trial passes.
5. Protected runtime/product/API/database boundaries are explicitly authorized for the next phase.

Until then, this contract remains design-only.
