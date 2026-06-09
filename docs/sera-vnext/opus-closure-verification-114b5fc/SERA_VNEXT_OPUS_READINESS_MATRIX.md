# SERA vNext — Readiness Matrix

Values: PASS / PASS_WITH_WARNINGS / NOT_READY / BLOCKED / NOT_ASSESSED

| Dimension | Status | Basis |
|---|---|---|
| METHODOLOGY_REPRESENTATION | PASS_WITH_WARNINGS | tree faithful, evidence-first, no code-first; metadata synthesized (F-16) |
| ENGINE_TECHNICAL_VALIDATION | PASS_WITH_WARNINGS | deterministic, reachable, locked; accuracy unproven (lexical) |
| PORTUGUESE_LANGUAGE_SUPPORT | NOT_READY | bilingual lexicon exists but real PT recall 1/3; abstains on natural PT |
| LEAF_REACHABILITY | PASS | real engine 22/22 positive + negative |
| VIOLATION_AWARENESS | PASS_WITH_WARNINGS | over-attribution fixed; now under-attributes (NF-01) |
| GUARDRAIL_ENFORCEMENT (engine) | PASS | 9 guardrails computed from runtime |
| TEST_SUITE_RELIABILITY | PASS_WITH_WARNINGS | green & deterministic; lexicon-aligned; 2 misleading metrics; F-22 open |
| PRODUCT_BETA (admin) | PASS_WITH_WARNINGS | candidate-only, locked, provenance + audit; needs migration applied |
| CANONICAL_USER_FLOW | NOT_READY | common flow still legacy; vNext response not renderable by common UI (NF-03) |
| DATABASE_RLS | PASS_WITH_WARNINGS | RLS on; exclusion RLS depth gap (F-19) |
| AUDIT_TRAIL | PASS_WITH_WARNINGS | strong vNext domain events; best-effort audit_log (NF-05) |
| RISK_PROFILE | PASS_WITH_WARNINGS | tagged + disclosed mixing (F-08); score/ERC heuristics (F-09/F-10) |
| COMPANY_DASHBOARD | PASS_WITH_WARNINGS | routed through audited endpoint (F-23); parity holds; numbers unvalidated |
| FRONTEND | PASS_WITH_WARNINGS | admin reviewer UI rich + honest labels; visual not smoke-tested |
| CONTROLLED_HUMAN_PILOT | PASS_WITH_WARNINGS | viable via admin path with limitations briefed |
| INTERNAL_BETA | NOT_READY | needs common-flow integration + PT capability + guardrail UI |
| PRODUCTION | NOT_READY | accuracy, PT, deploy verification all open |
| SCIENTIFIC_VALIDATION | NOT_READY | no empirical/inter-rater study (correctly not claimed) |
| DEPLOY (env) | NOT_ASSESSED | no deploy access (F-26) |

## Reading

The system clears the bar for a **controlled human pilot on the admin vNext path** because every unsafe outcome is structurally prevented (final output locked, conservative abstention, no false codes in independent testing) and provenance/audit are strong. It does **not** clear the bar for internal beta, the common user flow, production, or any Portuguese/AI-classification value claim.
