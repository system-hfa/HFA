# SERA Engine vNext Canonical Tree Coverage Matrix A4R99 v0.2.0

Status: READY_FOR_CANONICAL_TRACE  
Phase: A4+R-99  
DOCS_ONLY  
CANONICAL_ASSET_COVERAGE

## Coverage by Axis
| axis | totalNodes | totalLeafCodes | coveredLeafCodes | missingOrUncertainNodes | confidence | sourceAnchors | axisStatus |
|---|---:|---:|---|---|---|---|---|
| Objective | 4 | 4 | O-A, O-B, O-C, O-D | none | HIGH | `docs/reference/daumas-sera-offshore.txt` (pp. 104-109), `docs/reference/hendy-sera-2003.txt` (Step 4) | READY_FOR_CANONICAL_TRACE |
| Perception | 6 | 8 | P-A, P-B, P-C, P-D, P-E, P-F, P-G, P-H | none | HIGH | `docs/reference/daumas-sera-offshore.txt` (pp. 110-121), `docs/reference/hendy-sera-2003.txt` (Step 3) | READY_FOR_CANONICAL_TRACE |
| Action | 5 | 10 | A-A, A-B, A-C, A-D, A-E, A-F, A-G, A-H, A-I, A-J | none (with source-label formatting caveat handled by governance mapping) | MEDIUM/HIGH | `docs/reference/daumas-sera-offshore.txt` (pp. 122-131), `docs/reference/hendy-sera-2003.txt` (Step 5) | READY_FOR_CANONICAL_TRACE |

## Global Leaf Coverage
- Objective: `O-A`, `O-B`, `O-C`, `O-D` covered.
- Perception: `P-A`, `P-B`, `P-C`, `P-D`, `P-E`, `P-F`, `P-G`, `P-H` covered.
- Action: `A-A`, `A-B`, `A-C`, `A-D`, `A-E`, `A-F`, `A-G`, `A-H`, `A-I`, `A-J` covered.

## Guardrails
- `O-E = NON_EXISTENT_IN_SERA_PT_V1` (not covered as active leaf by design).
- Any missing node during trace build must be marked `CANONICAL_NODE_MISSING`.
- Any missing canonical tree text must be marked `REAL_TREE_MISSING`.

## Release Gate for Rebuild Use
A future rebuild phase can proceed only when:
1. the required path nodes exist in the A4R99 asset;
2. all used answer options map to defined next nodes/leaves;
3. validation checklist passes without blocked items.

Final status for this phase: `READY_FOR_CANONICAL_TRACE`.
