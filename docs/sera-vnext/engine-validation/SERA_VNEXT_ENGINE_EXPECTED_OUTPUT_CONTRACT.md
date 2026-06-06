# SERA vNext Engine Expected Output Contract

Decision status: SERA_VNEXT_ENGINE_NOT_IMPLEMENTED

## Expected current output

The current executable paths must remain non-final until a complete Product Beta engine is implemented and validated.

Required current confirmations:

- base vNext dry-run must not emit `finalConclusion`;
- base vNext dry-run must not emit HFACS/Risk/ERC/ARMS outputs;
- base vNext dry-run P/O/A axes must not be `CLASSIFIED`;
- base vNext dry-run selected codes must remain `UNRESOLVED`;
- base vNext dry-run causal assurance must not be `PASSED`;
- base vNext dry-run preconditions remain empty and expose stub status;
- Product Alpha endpoint must return `CANDIDATE_ONLY`;
- Product Alpha endpoint must return `REAL_TREE_MISSING`;
- Product Alpha endpoint must keep `selectedCode`, `releasedCode`, and `finalConclusion` null;
- Product Alpha endpoint must keep `persisted`, `readyPromotion`, and `downstreamAllowed` false.

## Forbidden current output

The following outputs remain forbidden under this gate:

- Product Beta persistence;
- Product Beta review rows;
- Product Beta classification release;
- selected/released code exposure from automatic output;
- final conclusion;
- HFACS, Risk/ERC, ARMS/ERC;
- database writes;
- UI claims that Product Beta is live.
