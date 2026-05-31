# SERA A4R192 — Pre-Integration Plan v0.2.0

## Objective
Define integration prerequisites after A4R191 closure, without implementing UI/API/product wiring and without opening final classification outputs.

## Hard gate

- A4R192 must not start by directly wiring UI/API/product.
- No final classification output may be emitted in A4R192 (`selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, downstream).

## Work packages (plan only)

### A4R192-A — Structured escape-point intake design
- Define intake contract for agent/act/moment/topology/evidence metadata.
- Keep design detached from productive engine wiring.
- Document canonical field ownership and validation expectations.

### A4R192-B — Validation layer for intake completeness
- Add pre-analysis validation for scope integrity:
  - scope status compatibility
  - agent identity anchoring
  - act/omission observability
  - temporal anchor integrity
- Produce deterministic blocking diagnostics for incomplete or ambiguous intake payloads.

### A4R192-C — Negative integration tests (still candidate-only)
- Build negative tests proving integration remains blocked when required intake metadata is absent or inconsistent.
- Keep candidate-only locks asserted in every scenario.
- Do not open selected/released/final surfaces.

### A4R192-D — Independent review gate
- Run independent review on A4R192 outputs before any production integration proposal.
- Require explicit PASS gate and residual-risk decision record.

## Exit criteria for pre-integration

- Structured intake contract reviewed and stable.
- Validation layer deterministic and fully tested for negative paths.
- Candidate-only locks proven intact under all A4R192 tests.
- Independent review completed with explicit recommendation before any product wiring phase.

