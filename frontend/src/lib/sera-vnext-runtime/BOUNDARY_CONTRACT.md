# SERA vNext Runtime Boundary Contract

The runtime package is a read-only, candidate-only boundary. It may execute and
summarize SERA vNext engine behavior, but it must not become a product,
persistence, UI, billing, or release-output layer.

Allowed:
- read-only runtime summaries and validation helpers;
- deterministic engine execution and trace validation;
- non-final output lock assertions;
- feature-flag reads needed to fail closed.

Forbidden:
- database writes or Product Beta persistence coupling;
- UI/page imports;
- API route coupling, except explicit status/read-only contracts;
- legacy SERA fallback that silently changes vNext behavior;
- selectedCode, releasedCode, finalConclusion, classifiedOutput=true,
  readyPromotion=true, or downstreamAllowed=true as active runtime output;
- mutable global state used to alter methodology or release status.

Protected-path gates must verify behavior, not just file paths. Authorized
changes to protected files require semantic assertions in
`tests/sera-vnext/protected-path-contract.ts`.
