# SERA vNext — Opus Independent Closure Verification — Final Verdict

## Verdict

# CLOSURE_PARTIALLY_VERIFIED_PILOT_WITH_LIMITATIONS

## Why not "verified ready"

The v02 engine corrections are **real and run** — reachability (22/22), computed guardrails, the awareness gate, the no-default-SIM fix, and the final-output lock are all present in code and confirmed by execution, and several exceed what the team's own closure record admits. But three things prevent a clean "verified":

1. **The designated closure record is wrong about its own code** (NF-07) — it understates F-03/F-04/F-05/F-21. A sign-off based on it would be a sign-off on false data.
2. **Validation is lexical, not empirical** (NF-06, F-01/F-02/F-24) — PASS proves determinism and bilingual keyword matching, not real accuracy. My independent naturalistic test put real code-recall at 3/6 and Portuguese at 1/3.
3. **Real Portuguese capability and the common user flow are not ready** — the engine abstains on natural PT, and the vNext response cannot render in the common UI (NF-03).

## Why not "not verified" / "blocked"

- No CRITICAL finding. **No hard stop-rule triggered**: tree not invented, engine not code-first, P/O/A evaluated at the escape point, post-escape quarantined, final output blocked, no cross-tenant bypass found, no secret/PII exposure, RLS on.
- The engine is **safe by construction** for supervised use: conservative, locked to candidate-only, 0 incorrect codes in independent testing, full provenance + audit.

## Closure scorecard (26 findings + STOP_RULE)

| Independent status | Count | Findings |
|---|---|---|
| VERIFIED_RESOLVED | 5 | F-03, F-04, F-06, F-21, F-23 |
| PARTIALLY_RESOLVED | 11 | F-01, F-02, F-05, F-07, F-08, F-09, F-11, F-13, F-14, F-19, F-25 |
| NOT_RESOLVED | 6 | F-10, F-15, F-16, F-17, F-18, F-22 |
| REGRESSED | 0 | (F-04 over→under is a new finding NF-01, not a regression) |
| NOT_APPLICABLE / SUPERSEDED | 1 | F-20 |
| REQUIRES_HUMAN_VALIDATION / NOT_ASSESSED | 2 | F-24, F-26 |
| STOP_RULE | — | NOT_APPLICABLE (none triggered) |

New findings this audit: NF-01..NF-08 (1 HIGH NF-06, 4 MEDIUM, 2 LOW, 1 governance-blocking NF-07).

## One-line answer to the 15 audit questions

1. Resolved: F-03/04/06/21/23. 2. Documented-only: F-15/16/17/18/22 (+ F-10). 3. Still active: F-10/15/16/17/18/22 + NF-01..08. 4. Valid claims: final-output-blocked, dashboard parity, methodology preserved. 5. Overstated: "all blockers resolved", "Portuguese supported", "endpoint parity". 6. PT: bilingual lexicon real, real recall low. 7. Leaves: all 22 reachable. 8. Awareness: blocks false violations, now under-detects. 9. Guardrails: computed yes, UI no. 10. Tests: prove safety/determinism, not accuracy. 11. Common flow: legacy (vNext admin-only). 12. DB/traceability: complete for vNext (provenance migration required). 13. Dashboard/Risk Profile: coherent + audited, numbers heuristic. 14. Human pilot: yes, admin path, with limitations. 15. Mandatory fixes: NF-07 (reconcile record), NF-03 (common-flow render), NF-06 (gold set).

See remediation packages below and `SERA_VNEXT_OPUS_PILOT_GO_NO_GO.md`.

## Remediation packages

**PACKAGE 1 — Methodology / engine blockers**
- NF-06 author independent frozen PT/EN gold set (expert-labelled) before any accuracy claim.
- NF-01 fix violation-awareness under-attribution; broaden PT lexicon (F-05).
- F-16 source tree metadata; F-17 fix PT polarity; F-18 refine escape detection.

**PACKAGE 2 — Product / data / security blockers**
- NF-03 common-flow vNext renderer (or formally restrict pilot to admin).
- NF-02 dedicated guardrail UI; NF-04 sanitize /api/analyze errors.
- F-13 consolidate/retire /api/analyses/risk-profile; F-08 separate version distributions; F-09/F-10 document or relabel score/ERC; F-19 RLS depth; F-22 fail-loud security test; NF-05 audit completeness.

**PACKAGE 3 — Pilot-only limitations (track, brief reviewers)**
- NF-07 reconcile closure record (do first; cheap; unblocks honest sign-off).
- F-26 verify deploy/migrations/flags; F-25 doc archival; F-15 remove dead engine; NF-08 fix metric label.
- Reviewer briefing on abstention-as-default, low PT recall, heuristic scores.

## Confirmation

No code, documentation, database, flag, migration, or deploy was modified. Only audit reports (and one read-only test runner) were created, untracked: **AUDIT_REPORTS_CREATED_NOT_COMMITTED**.
