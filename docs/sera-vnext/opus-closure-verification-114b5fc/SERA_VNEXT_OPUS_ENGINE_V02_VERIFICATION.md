# SERA vNext — Engine v02 Verification

Scope: `frontend/src/lib/sera-vnext/` at HEAD `114b5fc`, verified by reading the runtime and executing it.

## Executable flow (real, verified)

```
runSeraVNextEngineV0(input)                         engine-v0/run-engine.ts
  01 factual extraction            -> facts, timeline
  02 safe operation model
  03 escape point (candidate)      -> PROGRESSIVE_ZONE / boundary, post-escape quarantine
  04 unsafe state
  05 unsafe act / condition
  06 direct actor                  -> actor migration warnings
  -> extractEvidenceItems()        evidence/extract-evidence.ts  (bilingual P/O/A/PRECONDITION tagging,
                                                                  temporalRelation incl. POST_ESCAPE)
  07 axis statements
  08 canonical traversal           steps/08 -> evaluateCanonicalNode()  canonical-tree/evaluate-node.ts
        decideP/decideO/decideA consume ONLY axis-usable evidence concepts (concepts.ts, pt-BR+en)
        terminal leaf => proposedCode; else INSUFFICIENT_EVIDENCE (abstain)
  09 preconditions                 (explicitlyNotEscapePoint, nonFinal)
  10 assurance                     steps/10 -> computeSeraVNextGuardrails()  engine-v02/guardrails
        9 guardrails from runtime traces; warnings; humanReviewPackage
  =>  selectedCode=null, releasedCode=null, finalConclusion=null,
      classifiedOutput=false, readyPromotion=false, downstreamAllowed=false,
      humanReviewRequired=true     (final output structurally blocked)
```

## Architecture checklist

| Property | Verdict | Evidence |
|---|---|---|
| Evidence-first (no code-first reconstruction) | PASS | `evaluate-node.ts` answers nodes from evidence concepts; `codeFirstPathDetected` guardrail scans path text for code-first markers |
| Canonical traversal (tree not invented/reordered) | PASS | `canonical-tree.ts`/`sera-pt-v1.ts` define fixed nodes; engine traverses, does not synthesize questions |
| No expected-output import in runtime | PASS | runtime imports no test/expected modules (grep clean); manifest lives only in tests |
| No case-ID / accident-name overfit | PASS | `concepts.ts` patterns are methodological terms; no case-id/accident-name regexes (explicitly forbidden by bilingual strategy doc and confirmed) |
| Bilingual normalization | PARTIAL | pt-BR + en regexes per concept; lexical not semantic — PT gaps (e.g. "neblina") cause abstention |
| Awareness gate (O-B/O-C) | PASS (over-corrected) | requires knownRule ∧ explicitAwareness ∧ consciousDeviation; under-attributes on natural prose |
| A-A / A-C boundary | PASS | A_IMPLEMENTED branches safe/correct vs slip/lapse vs feedback-failure; IND-09 -> A-A correct |
| Abstention on insufficient evidence | PASS | every decide* returns INSUFFICIENT_EVIDENCE default; 6/6 abstention cases correct |
| Preconditions (non-escape, non-final) | PASS | step 09; `explicitlyNotEscapePoint:true`, `nonFinal:true` types |
| Post-escape quarantine | PASS | `excludedPostEscapeEvidence`; `postEscapeEvidenceUsed`/`postEscapeHuntingDetected` guardrails; IND-11 abstained on pure post-escape |
| Consequence-as-cause quarantine | PASS | `consequenceUsedAsCause` guardrail via `postEscapeOutcome` concept |
| Actor migration detection | PASS | step 06 warnings + `actorMigrationDetected` guardrail |
| A_CAPABILITY no default SIM | PASS (F-21) | returns INSUFFICIENT_EVIDENCE without `actionCapabilityPresent` |
| Determinism | PASS | run-all.ts determinism=1; pure functions, no randomness/IO in engine |

## Validation execution (reproduced, reports unchanged baseline-wise)

`npx tsx tests/sera-vnext/engine-validation-v02/run-all.ts`:
```
finalDecision: SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS
classification_accuracy 1, abstention_recall 1, guardrail_detection_rate 1,
leaf_coverage 1, language_parity {pt-BR:1, en:1}, determinism 1,
critical_boundary_pass_rate 1, product_parity 1
abstention_precision 0.2143  (see note)
cases 103
```

**`abstention_precision=0.2143` is a mislabeled-metric artifact, not over-abstention.** Negative leaf-reachability cases that abstain are scored `CORRECT_ABSTENTION` and counted in the precision *denominator*, while the *numerator* counts only `kind:'abstention'` cases. The metric does not measure what its name implies and should be redefined or removed.

`npx tsx tests/sera-vnext/engine-v02/reachability/run-reachability.ts`: `positive=22, negative=22` — all leaves reachable by the real engine.

## Key limitations (engine)

1. Classification is **lexical concept matching**; real accuracy is unmeasured and, per my independent test, modest (3/6 code-expected) and PT-weak (1/3).
2. The violation-awareness triad now **under-fires** on natural language (NF-01).
3. `engine.ts` legacy pipeline + legacy steps remain (F-15, dead in product).
4. `inferEvidenceRequired`/`inferProhibitedInferences` metadata is synthesized, not sourced (F-16).
