# SERA vNext — Contradictions Resolution

Method: for each contradiction between prior reports and the final closure, resolve against actual code + executed tests at HEAD `114b5fc`.

## 0. Meta-contradiction: the two team records disagree with each other

The `engine-v02/` docs (8 Jun 21:15) claim F-03/F-04/F-05/F-21 **resolved** in code. The later `final-technical-closure/SERA_VNEXT_OPUS_FINDINGS_CLOSURE_MATRIX.md` (9 Jun 07:52) claims the same findings **partial / not resolved**, quoting pre-v02 code.

**Resolution:** the **code** matches the engine-v02 docs. `evaluate-node.ts` and `concepts.ts` contain the v02 branches and bilingual regexes; the closure matrix quotes obsolete `evaluate-node.ts` text. The closure matrix — the *designated* readiness record — is **stale and materially wrong**. Logged as NF-07 (governance).

## 1. Reachability: "22/22 PASS" vs "8/22 unreachable"

- **Canonical leaves**: 22 active (canonical-tree.ts).
- **Reachable by the real engine**: 22/22. `tests/sera-vnext/engine-v02/reachability/run-reachability.ts` calls `runSeraVNextEngineV0` on each leaf's narrative and asserts the emitted `proposedCode`. I executed it: `positive=22, negative=22`, no failures.
- **Are the tests synthetic paths?** No — they run the full engine on text, not a tree walker. But the narratives embed the engine's concept lexicon, so they prove *capability to emit*, not *real-world emission*.
- **Dead codes remaining**: none structurally. In practice, leaves requiring rare lexicon (e.g., P-G/P-H information-quality, A-F/A-G under-pressure subtypes) will seldom fire on real prose.

**Resolved in favour of reachable (22/22).** The closure matrix's "8/22 unreachable" reflects pre-v02 code and is obsolete.

## 2. Portuguese: "pt-BR supported" vs "English-only axis patterns"

- `concepts.ts` defines **both** English and Portuguese regexes for every one of ~38 concepts. Axis decisions are therefore bilingual — the closure matrix statement "axis patterns remain English" is **false** for current code.
- But coverage is **lexical, not semantic**. My independent PT test exposed gaps: "neblina" (PT for fog) is absent — the pattern uses "nevoeiro" — so IND-02 abstained. PT code-recall in my test was **1/3**; EN **2/3**.
- v02 `language_parity` reports pt-BR=1, en=1 only because its PT narratives are written with the exact PT lexicon.

**Resolution:** both records are partly wrong. Engine-v02 overstates ("removes the English-only dependency"); closure matrix understates ("English-only"). Truth: **bilingual lexicon exists; real Portuguese capability is limited and brittle.** Product Beta runs `locale: 'pt-BR'`; on real PT narratives it will mostly produce **abstention**, not codes.

## 3. Awareness/violation: "corrected" vs "over-attribution unresolved"

Direct tests of each boundary:

| Scenario | Engine result | Correct? |
|---|---|---|
| Continuation, no awareness (IND-05) | O = null (A-C on action) | ✅ no false O-B |
| Known rule + explicit awareness + conscious + routine (IND-04 PT) | O = null | ❌ should be O-B (under-attribution) |
| Same, EN (IND-10) | O = null | ❌ should be O-B (under-attribution) |
| Safe conservative goal (IND-06) | O = O-A | ✅ |

`O_RULES`/`O_ROUTINE` require `knownRule ∧ explicitAwareness ∧ consciousDeviation`, and a `awarenessMissingForViolation` guardrail flags O-B/O-C lacking that triad.

**Resolution:** the original finding (over-attribution from mere continuation) is **resolved** — the closure matrix's "NOT_RESOLVED" is contradicted by code and test. But the three-way AND gate plus axis-evidence routing now causes **under-attribution** on natural prose (NF-01). For candidate-only review this is the safer error direction.

## 4. Guardrails: "computed and integrated" vs "Guardrail UI pending"

| Layer | State |
|---|---|
| Engine computation | ✅ all 9 in `compute-guardrails.ts` |
| API persistence | ✅ stored in `engine_output`; violations in `warnings` and audit payload |
| Audit event | ✅ `analysis.created` payload lists `guardrailViolations` |
| reviewerOutput | ⚠️ violations surface only as text `warnings` entries |
| Detail UI | ⚠️ admin detail/candidate pages render `warnings` (incl. `GUARDRAIL_VIOLATED_*`); no dedicated guardrail panel |
| Common analyze UI | ❌ no guardrail display |
| Export | ✅ engine_output (with guardrails) exportable via admin export route |

**Resolution:** "computed and integrated" is true at the **engine/API/audit** layers; "Guardrail UI pending" is **substantially true** at the **presentation** layer. Reviewers can see violations as warnings but not as a first-class, explained surface, and only in the admin path.

## 5. Full sweep: "blocking skips = 0 / readiness proven"

- The v02 suite (103 cases) and reachability harness **executed in full** with zero failures and zero skips when I ran them.
- But they are **lexicon-aligned crafted cases**. They prove determinism, reachability, bilingual matching, and final-output locking — **not** readiness on real input.
- The broader `tests/sera-vnext/*.ts` root suite remains dominated by static `readFileSync`/`existsSync` guards (F-11), so an aggregate "all pass" still overstates behavioral coverage.

**Resolution:** "blocking skips = 0" is defensible for the v02 subset I ran, but **does not prove product readiness**. Sweep PASS ≠ real-world validity.
