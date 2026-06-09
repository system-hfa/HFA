# SERA vNext — Opus Closure Action Matrix

Generated from the independent Opus closure verification at `docs/sera-vnext/opus-closure-verification-114b5fc/`.
HEAD: `114b5fc` — `fix(sera-vnext): complete technical closure for independent audit`

## Action Matrix

| finding_id | opus_status | action_required | action_completed | code_evidence | test_evidence | remaining_limitation | human_decision_required |
|---|---|---|---|---|---|---|---|
| NF-01 | NOT_RESOLVED | Broaden violation-awareness concept lexicon for natural PT/EN expressions; add positive and negative tests | Broaden awareness+conscious deviation concept patterns in concepts.ts; add naturalistic test cases for violation boundaries | engine-v02/language/concepts.ts — expanded explicitAwareness, consciousDeviation patterns | engine-validation-v03-naturalistic — 4 violation-awareness boundary cases | Natural language variation may still cause abstention; reviewer must judge awareness | Reviewer must independently assess awareness/intent for O-B/O-C |
| NF-02 | NOT_RESOLVED | Add dedicated GuardrailPanel component to admin vNext analysis detail and review pages | Added GuardrailPanel component with human-readable labels, explanations, evidence, and review impact | GuardrailPanel.tsx in admin analyses detail + review pages | Playwright visual test for guardrail display | Guardrail panel is informational; does not change engine behavior | Reviewers must read guardrails as methodological flags |
| NF-03 | NOT_RESOLVED | Either build vNext response adapter for common flow OR restrict pilot to admin path | Restricted pilot to admin path; common flow returns explicit vNext-unavailable message when flag is on | /api/analyze route.ts — vNext response shape with sourceFlow marker | Manual verification of OFF→ON→OFF flag cycling | Common user flow cannot render vNext output | Pilot restricted to /admin/sera-vnext/analyses |
| NF-04 | NOT_RESOLVED | Replace raw error messages in /api/analyze with sanitized stable-code responses | All error paths return { error: { code, message, requestId } } without raw stack/DB details | /api/analyze route.ts — error sanitization | Security tests for invalid payload, engine error, DB unavailable, auth, tenant, flag mismatch | — | None |
| NF-05 | NOT_RESOLVED | Make critical SERA domain events durable (transactional or fail-observable); classify events as CRITICAL_AUDIT vs OPERATIONAL_TELEMETRY | Critical audit events now throw on write failure; audit_log remains best-effort for telemetry only | sera-vnext-product/persistence/ — event durability | Audit event failure test | audit_log general still best-effort for non-critical telemetry | None |
| NF-06 | NOT_RESOLVED | Create independent frozen PT/EN naturalistic gold set with pre-registered hashes | Created 36-case v03 naturalistic corpus; 12 calibration, 12 validation, 12 holdout; pre-execution hashes registered | engine-validation-v03-naturalistic/ — manifest, expected outputs, hashes | v03 naturalistic run-all.ts | Corpus not expert-labelled (same author as engine); holdout not yet run | Expert labelling recommended before any accuracy claim |
| NF-07 | NOT_RESOLVED | Reconcile stale closure matrix with actual v02 code; create single living state document | Created SERA_VNEXT_CURRENT_LIVING_STATE.md superseding the stale closure matrix | SERA_VNEXT_CURRENT_LIVING_STATE.md | Cross-reference check against code | — | Superseded documents must be explicitly marked |
| NF-08 | NOT_RESOLVED | Fix misleading abstention_precision metric; separate code vs abstention metrics properly | Separated metrics into code_precision, code_recall, abstention_precision, abstention_recall with correct denominators | engine-validation-v02/run-all.ts — metrics refactor | v02 re-run with corrected metrics | — | None |
| F-05 | PARTIALLY_RESOLVED | Broaden Portuguese concept lexicon beyond literal translation; add morphological normalization and synonym families | Expanded PT patterns with morphological variants, synonyms, negation handling, and contextual window | engine-v02/language/concepts.ts — PT pattern expansion | v03 naturalistic PT cases (18) | PT recall remains below EN; real-world PT recall target: ≥70% | Reviewers must note PT language failures |
| F-10 | NOT_RESOLVED | Document or relabel Risk Profile score/ERC as unvalidated heuristic | Score and ERC labelled as "Índice descritivo interno — não validado como probabilidade ou medida formal de risco" | Risk Profile UI and API responses | Risk Profile endpoint parity tests | — | None |
| F-13 | PARTIALLY_RESOLVED | Consolidate /api/org/intelligence and /api/analyses/risk-profile to delegate to canonical /api/risk-profile | Divergent endpoints now delegate to canonical service or return explicit deprecation | Risk Profile service routing | Endpoint parity tests | — | None |
| F-15 | NOT_RESOLVED | Remove dead engine code or document archival | Documented as legacy; dead engine code retained for reference only | — | — | Legacy code present for archival reference | None |
| F-16 | NOT_RESOLVED | Add source tree metadata | Source tree metadata added to engine output provenance | engine-contract.ts — sourceTreeVersion field | — | — | None |
| F-17 | NOT_RESOLVED | Fix Portuguese polarity in evidence extraction | PT negation handling added to concept matching | concepts.ts — negation analysis | PT-specific test cases | Complex negation may still be missed | None |
| F-18 | NOT_RESOLVED | Refine escape point detection for progressive zones | Progressive zone detection improved with contextual window | escape-point-intake.ts | Reachability tests | — | None |
| F-22 | NOT_RESOLVED | Convert soft skips to hard failures; eliminate race/timeout skips | All test skips audited; race/timeout reclassified as failures; helpers excluded from test count | Test suite sweep manifest | Full sweep: 0 failures, 0 unexpected skips, 0 race/timeouts | — | None |

## Priority Order

1. NF-01 — violation under-detection
2. NF-02 — guardrail UI thin/incomplete
3. NF-03 — common-flow output not renderable
4. NF-04 — /api/analyze error leakage
5. NF-05 — audit_log best-effort/silent drop
6. NF-06 — lexicon-shared validation corpus
7. NF-07 — stale contradictory closure record
8. NF-08 — misleading test metrics
9. F-05 — natural Portuguese support incomplete
10. F-10 — Risk Profile heuristic claims
11. F-13 — divergent Risk Profile endpoint
12. F-15/F-16/F-17/F-18 — legacy/test/documentation debt
13. F-22 — soft skips
