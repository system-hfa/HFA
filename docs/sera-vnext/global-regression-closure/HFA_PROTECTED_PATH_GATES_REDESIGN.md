# HFA Protected Path Gates Redesign

The old gates mixed methodology protection with path-only diff rejection. That blocked authorized fixes to /api/analyze and canonical-tree/evaluate-node.ts.

New approach:
- keep path protection for methodology, baseline, fixtures, Risk/ERC, billing, migrations, and final outputs;
- allow a narrow protected path only after semantic assertions pass;
- use tests/sera-vnext/protected-path-contract.ts as the shared gate contract.

Updated gates include runtime readiness/module, typecheck closure runtime gate, official/isolated/mega/vnext baseline guards, human pilot preparation integrity, and Product Beta integrity.

The redesign does not create a broad directory allowlist. It binds each protected change to explicit forbidden-field and required-test assertions.
