# HFA Runtime Boundary Contract

The runtime boundary remains read-only and candidate-only. Runtime modules may expose readonly summaries, validate non-final locks, and execute engine traces. They must not depend on UI, DB writes, mutable global state, or Product Beta persistence.

This closure adds semantic guard helpers in tests/sera-vnext/protected-path-contract.ts and updates runtime/path gates so authorized changes must satisfy behavior contracts:

- /api/analyze is allowed only when ANALYZE_* sanitization is present and raw response leaks are absent.
- canonical-tree/evaluate-node.ts is allowed only when the conservative O_RULES known-rule anchor and final-output locks hold.
- feature flag imports from protected paths are limited to explicit authorized callers.

Verification:
- A4R220 isolated runtime module trial passed.
- Typecheck passed.
- Build passed.
- Final canonical manifest passed with zero required failures.
