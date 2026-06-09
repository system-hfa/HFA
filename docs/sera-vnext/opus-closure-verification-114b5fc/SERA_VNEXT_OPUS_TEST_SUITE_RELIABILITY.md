# SERA vNext — Test Suite Reliability

## What I executed (not just read)

| Harness | Result | What it proves | What it does NOT prove |
|---|---|---|---|
| `engine-validation-v02/run-all.ts` (103 cases) | PASS_WITH_LIMITATIONS, 0 failures | determinism, leaf coverage, bilingual lexical matching, final-output lock, guardrail detection on boundary cases | real-narrative accuracy (cases authored to concept lexicon) |
| `engine-v02/reachability/run-reachability.ts` | positive=22, negative=22 | every active leaf is emittable by the real engine | that codes fire on real prose |
| my independent runner (12 cases) | 0 incorrect codes; 3 code / 6 abstain correct; 3 incorrect abstain | engine is conservative & safe; recall is low & PT-weak | — |

Reports regenerated only timestamps/ordering on tracked report files; **not staged**.

## Manifest freeze (F-02 mitigation) — verified real

`run-all.ts` recomputes `sha256(payload)` and asserts equality with `SERA_VNEXT_ENGINE_V02_EXPECTED_MANIFEST.json:casePayloadSha256` before running. The assertion passed, so expected codes cannot be silently re-fitted after observing output. **However**, the *narratives* are written to match `concepts.ts`, so coupling persists one layer up: the engine and its test corpus share a lexicon. This is the residual of F-01/F-02.

## Metric integrity issues

1. **`abstention_precision` is mislabeled.** Denominator includes `CORRECT_ABSTENTION` outcomes from `notCode` negative cases; numerator counts only `kind:'abstention'` cases. Result (0.2143) looks alarming but is an artifact. Redefine or drop.
2. **`classification_accuracy=1` is over crafted code cases only.** It measures lexicon-aligned emission, not field accuracy. My independent code-recall was 3/6.
3. **`language_parity=1` is circular** for the same reason (PT narratives written with PT lexicon).
4. **`product_parity`** = fraction with final output blocked = 1; this is a genuine, meaningful safety check (matches `assertNonFinalOutput`).

## Root suite (`tests/sera-vnext/*.ts`) — F-11 status

The v02 behavioral subset is real, but the broader root suite is still dominated by `readFileSync`/`existsSync`/grep guards (per F-11 classification, unchanged). Any aggregate "all trials pass" headline continues to overstate behavioral coverage. The v02 report does separate behavioral metrics, which is the partial fix.

## Reliability gaps still open

- F-22: `risk-profile-security-trial-001.ts` retains soft-skip `try/catch` that can pass cross-tenant negative checks vacuously. **Not resolved.**
- No real-DB/API/UI assertion of guardrail rendering exists; UI claims rest on structural reads only.
- No independent (non-lexicon) gold set exists; recommend authoring real anonymized PT narratives with expert labels, frozen before any engine tuning.

## Verdict

Test suite reliability: **PASS_WITH_WARNINGS.** Executed suites are deterministic and green and prove safety properties (reachability, final-output lock, conservative abstention). They do **not** establish classification accuracy or real Portuguese capability, and two headline metrics are misleading.
