# SERA vNext — Test Suite Audit (c4266d0)

Scope: `tests/sera-vnext/*.ts` (176 trial files) plus the structured harnesses (`engine-validation-v01`, `engine-validation-v0`, `runtime-harness`, `runtime-adapter`).

## Classification (pattern-based over 176 trial files)

| Signal | Files | Interpretation |
|---|---|---|
| import/execute the engine (`run-engine`/`analyzeSeraVNext`/`runEvidenceTraversal`/`candidate-service`) | 16 | REAL behavioral (engine) |
| `readFileSync` (read source/docs as text) | 96 | STATIC / GREP_GUARD candidate |
| …of those asserting via `includes`/`match`/`test`/`toContain` on file text | 93 | STATIC text-grep guards |
| `existsSync` (file presence) | 75 | DOCUMENT_EXISTENCE |
| `fetch`/`localhost`/`playwright`/`chromium` | 20 | REAL_API / E2E (server-dependent) |
| reference supabase/service_role | 27 | REAL_DB candidates (some are migration-text greps) |
| SKIP handling present | 11 | skip-as-pass risk |
| use `node:assert` | 172 | assertion-based |

(Categories overlap; a file can both `readFileSync` and `existsSync`.)

### Reading
- **The suite is dominated by static guards.** ~96 trials assert that source/docs *contain strings*, and ~75 assert *files exist*. Only ~16 trials actually execute the engine, and ~20 exercise HTTP endpoints. **"176/176 PASS" therefore overstates behavioral coverage (F-11, MEDIUM).** The genuine behavioral core is the 16 engine trials + the 39-case `engine-validation-v01` harness + the ~20 server/E2E trials.

## Category map (representative)

- **REAL_ENGINE (deterministic, strong):** `engine-v0-contract-trial-001`, `engine-v0-preconditions-trial-001`, `engine-validation-v01/*`, `engine-validation-v0/*`. These run `runSeraVNextEngineV0` and assert boundary properties (see fixture/baseline report for what is and isn't asserted).
- **REAL_API / E2E (server + magic-link dependent, fragile):** `risk-profile-security-trial-001`, `risk-profile-api-trial-001`, `risk-profile-ui-trial-001`, `risk-profile-real-data-trial-001`, product-beta real trials. They require a running server (`waitForServer`, `buildBaseUrl`) and magic-link sessions (`createMagicLinkSession`). Fragile against server availability and magic-link stability.
- **REAL_DB:** product-beta DB/RLS trials hitting staging via service role.
- **STATIC / GREP_GUARD:** the A4R guardrail and "freeze readiness" trials largely assert that specific files contain specific tokens (locks present, codes spelled correctly, O-E absent, copy strings present).
- **DOCUMENT_EXISTENCE:** trials that assert report/asset files exist.
- **SKIPPABLE:** 11 trials contain skip logic.

## Guardrails A4R212–A4R217 and Risk-Profile allowlist

Reviewed: `isolated-fixture-candidates-a4r212big-trial-001`, `mega-freeze-readiness-boundary-a4r213-trial-001`, `official-fixture-set-a4r214max-trial-001`, `vnext-baseline-v0-a4r215final-trial-001`, `runtime-readiness-a4r216max-trial-001`, `typecheck-closure-runtime-gate-a4r217max-trial-001`, and `risk-profile-{api,dashboard,exclusion,integrity,real-data,security,ui}-trial-001`.

- These are predominantly **static guards + server-dependent integration**. They check that locks/strings/files exist and that the risk-profile API behaves on a live server.
- **Allowlist scope:** the risk-profile trials use specific tenant prefixes (`SERA_VNEXT_TEST_TENANT_PREFIX`, `SERA_VNEXT_TEST_BLOCKED_TENANT_PREFIX`). They are *scoped to test tenants*; no evidence of an over-broad allowlist that would weaken production guards. The cross-tenant negative test, however, has a **soft-skip risk (F-22, MEDIUM)**: blocked-tenant session creation is wrapped in try/catch and, on failure, the blocked-tenant assertions can be silently bypassed.

## SKIPPED-as-PASS

11 trials contain skip logic. Server/magic-link trials degrade when the environment is unavailable. The 39-case harness does **not** skip (it asserts each expected case exists). The risk is concentrated in the E2E/real-data trials, where an unavailable server or session can convert a meaningful assertion into a no-op. Recommend failing loudly on missing preconditions for negative-path (security) tests.

## Redundancy & consolidation

- Many A4R### trials are **point-in-time freeze/readiness snapshots** that overlap heavily and are superseded by later ones. They inflate the trial count and the "176/176" headline without adding behavioral coverage.
- Recommend: (1) separate "behavioral" vs "static-guard" vs "doc-existence" reporting; (2) keep one canonical guard per invariant; (3) retire superseded A4R freeze trials; (4) convert the high-value E2E security trials to hard-fail on setup errors.

## Gaps without coverage

- No behavioral test asserts **Portuguese** classification (all engine trials run `locale:'en'`), so F-05 is invisible to the suite.
- No test asserts the **reachability** of the full code set; the dead codes (F-03) are not caught.
- The **guardrail flags** are asserted `==false` but never asserted to be *computed*, so F-06 is invisible.
- O-axis over-attribution (F-04) is permitted by the allowlist boundaries and thus not caught.

## Test-suite verdict

**TEST_SUITE_RELIABILITY = PASS_WITH_WARNINGS.** The structured engine harness is real and deterministic; the broad 176-trial count is dominated by static text/existence guards and gives a misleading impression of behavioral coverage. The most important methodological gaps (PT, reachability, violation bias, vacuous guardrails) are not covered by any test.
