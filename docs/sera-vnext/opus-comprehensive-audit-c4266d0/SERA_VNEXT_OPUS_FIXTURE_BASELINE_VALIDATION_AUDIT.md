# SERA vNext — Fixtures, Baseline & 39-Case Validation Audit (c4266d0)

## Reproduction (independent re-run, no versioned report modified)

A throwaway runner (`tmp/audit-run-validation.ts`, untracked) imported the existing cases, expected file, and `runValidationCase`, and computed counts **without** writing to `tests/sera-vnext/engine-validation-v01/reports/`.

```
total=39  pass=39  critical=0  noncriticalOnly=0
DETERMINISM: nondeterministic_cases=0/39
CODE TALLY across 117 axis slots (P/O/A × 39):
  null/UNRESOLVED = 80   O-B = 18   A-C = 5   P-A = 4   A-I = 3   O-A = 3   A-A = 3   P-B = 1
  → only 7 distinct codes EVER emitted on the whole corpus
```

**39/39 PASS is real and deterministic.** What it *means* is the central question.

## What the harness actually asserts

`compare-output.ts` is a **boundary/contract** comparison, not an accuracy comparison:

- Per axis it checks: status ∈ allowedStatuses; if a code is emitted it must be in `allowedCodes`; forbidden codes rejected; required-evidence fragments (fuzzy) present; forbidden-inference fragments absent (unless quarantined).
- **If `allowedCodes == 'UNRESOLVED_BY_AUTHOR'` the code check is skipped entirely** (`compare-output.ts:64`). The expected file contains **81 UNRESOLVED_BY_AUTHOR markers**.
- **Every axis of every case has `nullCodeAllowed=true` and `codeRequired=false`.** So the engine is *never required* to emit any code; emitting `null` always passes (subject to negative checks). Since the engine emits null 68% of the time, most axis comparisons reduce to "did it avoid a forbidden code?".
- `requiredGuardrails` asserts flags that are **hardcoded `false`** in the engine (`consequenceUsedAsCause`, `oeUsed`, `inventedQuestionDetected`, `postEscapeHuntingDetected`) → these assertions pass vacuously (F-06).

### Strong (meaningful) checks the harness DOES perform
- `forbiddenCodes` (incl. O-E) — real.
- `postEscapeEvidenceToExclude` must appear in `excludedPostEscapeEvidence` — real consequence-quarantine check.
- `forbiddenInferenceFragments` absent in evidence — real.
- `UNSUPPORTED_REPORT_ANALYSIS` not used as evidence — real.
- Determinism + Product-Alpha parity gates — real.

### Weak / circular aspects
- **F-01 (HIGH):** positive code correctness is largely waived (UNRESOLVED_BY_AUTHOR + nullCodeAllowed everywhere).
- **F-02 (HIGH):** for every coded case sampled, `allowedCodes` is a **superset containing exactly the engine's emitted code** plus an adjacent code. Examples:
  - `GEN-AIR-CANADA-759`: engine P-B/O-B/A-I; allowed {P-A,P-B}/{O-A,O-B}/{A-I,A-A}.
  - `ADV-VIOLATION-WITHOUT-AWARENESS`: engine …/O-B/A-I; allowed objective {O-A,O-B} (O-C,O-D forbidden) — the "no-awareness" case *permits* the routine-violation code O-B.
  - `OFFICIAL-COMAIR-5191`: allowed {P-A,P-B}/{O-A,O-B}/{A-C,A-I}; engine O-B/A-I.
  This is consistent with expectations authored *around* observed engine output (leakage between fixture and implementation).

## Corpus composition & independence

| Group | Count | Nature |
|---|---|---|
| official | 7 | derived from public reports (Comair-5191, Asiana-214, UPS-1354, Delta-191, USAir-427, 5N-BQJ, GAP-004) |
| human | 2 | human-applied analyses (Thebaud, Crank) |
| generalization | 10 | author-constructed |
| adversarial | 20 | author-constructed boundary traps |

Only **9 of 39** cases derive from real reports/human analyses; **30 are synthetic**. Adversarial cases are largely *negative* tests the engine passes by being conservative (emitting null / candidate-only). This is legitimate for boundary testing but means the corpus is weighted toward "does not over-reach" rather than "classifies correctly".

## Per-case results (reproduced)

Legend: ep=escapePointStatus; codes are proposedCode/status; all crit=0 nc=0 → PASS.

| case_id | group | ep | actor | P | O | A | audit_verdict |
|---|---|---|---|---|---|---|---|
| OFFICIAL-COMAIR-5191 | official | PROGRESSIVE_ZONE | crew | null | O-B | A-I | PASS (boundary) |
| OFFICIAL-ASIANA-214 | official | PROGRESSIVE_ZONE | crew | null | O-B | null | PASS (boundary) |
| OFFICIAL-UPS-1354 | official | PROGRESSIVE_ZONE | crew | null | null | A-C | PASS (boundary) |
| OFFICIAL-GAP-004 | official | CANDIDATE | crew | null | null | A-C | PASS (boundary) |
| OFFICIAL-DELTA-191 | official | PROGRESSIVE_ZONE | null | null | null | null | PASS (all-UNRESOLVED) |
| OFFICIAL-USAIR-427 | official | PROGRESSIVE_ZONE | null | null | null | null | PASS (all-UNRESOLVED) |
| OFFICIAL-5N-BQJ | official | INSUFFICIENT_EVIDENCE | null | null | null | null | PASS (all-UNRESOLVED) |
| HUMAN-THEBAUD | human | PROGRESSIVE_ZONE | crew | null | O-B | null | PASS (boundary) |
| HUMAN-CRANK-2026-0001 | human | CANDIDATE | pilot | null | null | null | PASS (all-UNRESOLVED) |
| GEN-AIR-CANADA-759 | generalization | PROGRESSIVE_ZONE | crew | P-B | O-B | A-I | PASS (only fully-coded case) |
| GEN-NO-FAILURE | generalization | PROGRESSIVE_ZONE | crew | P-A | O-A | A-A | PASS (no-failure path) |
| ADV-VIOLATION-WITHOUT-AWARENESS | adversarial | PROGRESSIVE_ZONE | crew | P-A | O-B | A-I | PASS — but emits O-B for a no-awareness case (F-04) |
| ADV-OE | adversarial | INSUFFICIENT_EVIDENCE | null | null | null | null | PASS (O-E never emitted) |
| ADV-CONSEQUENCE-AS-CAUSE | adversarial | CANDIDATE | crew | null | O-B | A-C | PASS (post-escape quarantined) |
| ADV-POST-ESCAPE-P/O/A | adversarial | PROGRESSIVE_ZONE | crew | null | O-B | A-C/null | PASS (quarantine works) |
| (remaining 22 cases) | mixed | — | — | mostly null | mostly null/O-B | mostly null | PASS (boundary/conservative) |

Full machine output is in `tmp/audit-run-validation.ts` stdout (untracked). The dominant pattern is **null/UNRESOLVED with occasional O-B/A-C/A-I**.

## Overfitting assessment

- The decision regexes embed accident-specific phrasing (`wrong runway`, `moved the lever out of stop`, `executed a go-around`). Combined with the engine producing only 7 codes and the expected boundaries being fitted around those outputs (F-02), there is a **moderate-to-high overfit signal** toward the validation corpus. The engine generalizes *safely* (it abstains) but not *richly*.

## Fixture/baseline verdict

**FIXTURES_BASELINE = PASS_WITH_WARNINGS.** 39/39 is reproducible, deterministic, and demonstrates real methodological-boundary compliance (no O-E, post-escape quarantine, no forbidden inference, candidate-only). It is **not** evidence of classification accuracy or coverage, the expected boundaries are partly fitted to the engine, and the guardrail assertions are vacuous. Any external claim must be worded as "boundary/contract compliance + determinism", never "validated classifier" or "proves readiness".
