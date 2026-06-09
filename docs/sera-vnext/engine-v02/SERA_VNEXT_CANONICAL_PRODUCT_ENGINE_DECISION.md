# SERA vNext Canonical Product Engine Decision

Current state:
- common user flow: legacy `/api/analyze`;
- Product Beta/admin flow: vNext candidate-only engine via `frontend/src/lib/sera-vnext-product`;
- future canonical causal engine: vNext engine v02, after migration.

Decision:
- vNext v02 is the canonical methodology implementation for future SERA causal classification support.
- Legacy `/api/analyze` must not be represented as the vNext canonical engine.
- Product Beta remains candidate-only and human-review-required.

Migration requirements for Macrophase 2:
- preserve existing legacy analyses and tag methodology/version provenance;
- add adapter output contract for legacy reads;
- keep rollback to legacy route until parity checks pass;
- deprecate legacy P/O/A claims before routing common users to vNext;
- do not pool legacy/vNext methodology distributions without source/version labeling.

Legacy removal may occur only after:
- user-facing vNext route parity is validated;
- rollback is documented and tested;
- existing data migration/provenance is complete;
- human review gate remains intact.
