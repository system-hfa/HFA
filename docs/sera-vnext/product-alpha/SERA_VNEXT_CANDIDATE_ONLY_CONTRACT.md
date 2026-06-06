# SERA vNext Candidate-Only Contract

Date: 2026-06-06
Status: INTERNAL

## Entry Conditions

The endpoint is enabled only when all of the following are true:

1. `SERA_VNEXT_READONLY_ENABLED=true`
2. `SERA_VNEXT_INTERNAL_PILOT_ENABLED=true`
3. `SERA_VNEXT_CANDIDATE_ONLY_ENABLED=true`
4. requester is enterprise admin

The UI flag `NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED=true` exposes the page but does not enable the endpoint by itself.

## Runtime Contract

1. no DB writes;
2. no filesystem writes;
3. no external calls;
4. deterministic output;
5. sanitized errors and logs;
6. final fields remain null or false;
7. `REAL_TREE_MISSING` blocks canonical-tree output.

## Mandatory Output Boundary

The response remains:

1. `mode: CANDIDATE_ONLY_NON_FINAL`
2. `analysisStatus: CANDIDATE_ONLY`
3. `selectedCode: null`
4. `releasedCode: null`
5. `finalConclusion: null`
6. `classifiedOutput: false`
7. `readyPromotion: false`
8. `downstreamAllowed: false`
9. `persisted: false`
