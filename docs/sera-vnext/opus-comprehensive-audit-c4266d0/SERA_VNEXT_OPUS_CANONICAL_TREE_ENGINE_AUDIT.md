# SERA vNext — Canonical Tree & Executable Engine Audit (c4266d0)

## Which engine actually runs

Two pipelines exist. Only one is used by the product/runtime:

- **engine-v0** (`engine-v0/run-engine.ts`, `runSeraVNextEngineV0`) — **LIVE**. Called by `sera-vnext-product/persistence/create-analysis.ts:70`, `reanalyze-analysis.ts:40`, `sera-vnext-runtime/candidate-only/candidate-service.ts:11`, and the 39-case harness.
- **engine.ts** (`analyzeSeraVNext`, the `steps/01..11` pipeline) — **DEAD in product**. Referenced only by `index.ts` (re-export) and legacy trial tests. engine-v0 *reuses* legacy steps 02–05 (`unsafe-state`, `unsafe-act-condition`, `direct-actor`, `poa-statements`); legacy steps 01, 06–11 + the `engine.ts` orchestrator are not used by the product (F-15, LOW tech-debt).

## Real engine pipeline (as executed)

```
SeraVNextEngineInput
 └─ 01 factual-extraction  (timeline, facts; evidence extracted later with actor + escape index)
 └─ 02 safe-operation-model
 └─ 03 escape-point        (earliest pre-outcome control statement; post-escape excluded)
 └─ 04 unsafe-state        (legacy step 02)
 └─ 05 unsafe-act/condition (legacy step 03)
 └─ 06 direct-actor        (legacy step 04; conservative, no migration)
 └─ [evidence re-extracted with directActor + latestEscapeSentenceIndex]
 └─ 07 axis-statements     (legacy step 05 → P/O/A statements)
 └─ 08 canonical-traversal (per-axis runEvidenceTraversal over SERA_PT_V1_TREE)
 └─ 09 preconditions       (non-POST_ESCAPE evidence; nonFinal; not from codes)
 └─ 10 assurance           (uncertainties, decisionTrace, evidenceTrace, humanReviewPackage, guardrails)
Output: humanReviewRequired=true; selectedCode/releasedCode/finalConclusion=null;
        classifiedOutput/readyPromotion/downstreamAllowed=false  (run-engine.ts:79-85)
```

## Canonical tree

- `SERA_CANONICAL_TREE_NODES` (`canonical-tree.ts`): 34 branch-rows, 15 unique nodes. Axis branch-row distribution P=13, O=7, A=14 (asserted by `assertCanonicalTreeInventoryInvariants`).
- Unique nodes: P_ROOT, P_ASSESSMENT, P_CAPABILITY, P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE; O_ROOT, O_RULES, O_ROUTINE, O_MANAGED_RISK; A_ROOT, A_IMPLEMENTED, A_CORRECT, A_CAPABILITY, A_TIME_PRESSURE.
- Code space (`canonical-codes.ts`): P-A..P-H (8), O-A..O-D (4), A-A..A-J (10); **O-E forbidden** (`SERA_CANONICAL_NON_EXISTENT_CODES`).
- `validate-tree.ts` runs at import and enforces: question source present, non-empty branch map, leaf codes in allowlist, no orphan targets, roots present, **cycle detection**, O-E rejected. This is a genuine validator.
- Node IDs are stable technical IDs (disclosed `nodeIdType`), not original source IDs — acceptable and documented.

### Tree fidelity findings
- **F-16 (LOW):** `evidenceRequired` and `prohibitedInferences` are *synthesized from the node-id prefix* (`sera-pt-v1.ts inferEvidenceRequired/inferProhibitedInferences`), not taken from the asset doc — apparent methodological metadata that is actually engine-generated.
- **F-17 (LOW):** `O_MANAGED_RISK` PT question text describes the non-conservative case while SIM→O-A (conservative) / NÃO→O-D — PT wording vs branch polarity are inverted.

## Evidence-first vs code-first

`run-evidence-traversal.ts` walks from `ROOT_BY_AXIS[axis]`, evaluating each node and following `nextNodeId` or stopping at `terminalCode`. `terminalCode = branchTarget?.includes('-') ? branchTarget : null` — the leaf is whatever the branch map points to, decided by the evidence-driven `answer`. **There is no `buildCanonicalPathForLeaf` and no pre-selection of a code.** Fallbacks return `INSUFFICIENT_EVIDENCE`/`UNRESOLVED`, never a known code. **The stop-rule "motor code-first" is NOT triggered.**

## Decision logic (the real constraint)

`evaluate-node.ts` decides each node by **regex/keyword matching** over usable statements (axis-scoped evidence + escape statement). This is the engine's weakest link:

1. **English-only (F-05, HIGH):** every pattern is English. With PT input the engine returns UNRESOLVED on all axes.
2. **Unreachable codes (F-03, HIGH):** `decideP` never returns `SIM` for `P_CAPABILITY` → P_TIME_PRESSURE/P_INFORMATION_* never reached → P-D/P-E/P-F/P-G/P-H dead. `decideA` `A_IMPLEMENTED` never returns `NÃO_FEEDBACK` (A-B dead); `A_TIME_PRESSURE` never returns `NÃO_SELECAO`/`NÃO_FEEDBACK` (A-F, A-G dead). 8 of 22 codes unreachable.
3. **Violation over-attribution (F-04, HIGH):** continuation cues drive O_RULES=NÃO then O_ROUTINE=SIM → O-B without awareness evidence.
4. **A_CAPABILITY default SIM (F-21, LOW):** proceeds without capability evidence.
5. **Fixture-flavored vocabulary:** patterns like `wrong runway|wrong surface`, `moved the lever out of stop`, `executed a go-around` echo specific accident phrasings (Comair, etc.), indicating tuning toward the validation corpus (overfit risk; see fixture/baseline report).

## Determinism, contradictory/empty input

- **Determinism reproduced:** 0/39 nondeterministic (full-JSON equality across repeated runs). No hidden nondeterminism, no run-to-run mutation observed.
- **Empty/insufficient input:** returns escape `INSUFFICIENT_EVIDENCE`, axes UNRESOLVED, preconditions empty + limitation — safe degradation.
- **Technical/condition-dominant input:** actor → `system_or_condition_dominant`/null, axes UNRESOLVED (e.g., ADV-TECHNICAL-DOMINANT, ADV-ENVIRONMENTAL-DOMINANT both all-null).
- **No-failure input:** reaches P-A/O-A/A-A (GEN-NO-FAILURE, ADV-NO-FAILURE).

## Engine verdict

**ENGINE_VALIDATION = PASS_WITH_WARNINGS.** The engine is evidence-first, deterministic, traverses the real tree, and hard-locks all final outputs. Its *capability* is narrow and brittle: English-only regex decisions, 8 unreachable codes, 68% UNRESOLVED on the official corpus, violation bias, and performative guardrail flags. It is a defensible *candidate-only assistant scaffold*, not a validated classifier.
