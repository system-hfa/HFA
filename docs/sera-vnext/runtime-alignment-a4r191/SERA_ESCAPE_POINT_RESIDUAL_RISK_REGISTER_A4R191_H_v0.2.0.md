# SERA A4R191-H — Escape Point Residual Risk Register v0.2.0

## Scope note
Residuals below are evaluated under current candidate-only runtime constraints. They are not authorization for UI/API/product integration.

## RR-001 — Lexical residual in multi-agent ambiguous clause (F-B residual)

- Risk ID: `RR-001`
- Description: A narrow lexical path may still contain agent reference + physical marker + ownership wording in ambiguous multi-agent prose.
- Current severity: `LOW` while candidate-only locks remain active.
- Escalation condition: rises to `MEDIUM/HIGH` if real integration occurs without stronger semantic structure.
- Current mitigation:
  - Candidate-only locks enforced.
  - Human review remains mandatory.
  - No selected/released/final/downstream outputs.
- Future mitigation:
  - Structured agent-bound evidence contract.
  - Stronger semantic parser for ownership/link disambiguation.

## RR-002 — ENFORCE not integrated to UI/API/product

- Risk ID: `RR-002`
- Description: ENFORCE behavior is runtime-candidate validated only; no product surface wiring.
- Current severity: `INFO / EXPECTED`.
- Current mitigation:
  - Integration remains explicitly blocked by readiness gate.
  - Candidate-only documentation and tests provide controlled verification.
- Future mitigation:
  - A4R192 staged pre-integration plan and independent review gate.

## RR-003 — MDC/interview intake not present in runtime

- Risk ID: `RR-003`
- Description: Enforcement depends on scope/metadata supplied externally; runtime has no structured MDC/interview intake.
- Current severity: `LOW` in candidate-only, `MEDIUM` for real product scenarios.
- Current mitigation:
  - Candidate-only execution with explicit metadata in tests/adapters.
  - No production integration path opened.
- Future mitigation:
  - Mandatory structured escape-point intake before analysis.
  - Dedicated validation layer for scope/agent/act/moment completeness.

## RR-004 — Pre-existing untracked source-corpus item (operational)

- Risk ID: `RR-004`
- Description: Pre-existing untracked Delta 191 file under source-corpus is outside A4R191 scope.
- Current severity: `INFO operational`.
- Mitigation:
  - Keep out of A4R191 commits.
  - Treat as separate repository hygiene item.

## Residual acceptance statement
Residuals are accepted only for candidate-only runtime validation. No residual grants permission to open final classification or downstream product outputs.

