# SERA A4R191 — Independent Review Readiness v0.2.0

## Review package scope
Independent review should assess candidate-only escape-point enforcement hardening from A4R191-A to A4R191-F.

## Files to review

- `frontend/src/lib/sera-vnext/escape-point-scope.ts`
- `frontend/src/lib/sera-vnext/escape-point-enforcement.ts`
- `frontend/src/lib/sera-vnext/canonical-traversal.ts`
- `frontend/src/lib/sera-vnext/canonical-traversal-adapter.ts`
- `frontend/src/lib/sera-vnext/author-node-intake-adapter.ts`
- `tests/sera-vnext/escape-point-scope-contract-trial-001.ts`
- `tests/sera-vnext/escape-point-enforcement-trial-001.ts`
- `tests/sera-vnext/escape-point-traversal-wiring-trial-001.ts`
- `tests/sera-vnext/escape-point-adapter-wiring-trial-001.ts`
- `tests/sera-vnext/escape-point-enforcement-topology-trial-001.ts`
- `tests/sera-vnext/escape-point-enforcement-diagnostics-trial-001.ts`
- `docs/SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`
- `docs/sera-vnext/runtime-alignment-a4r191/*.md`

## Objective reviewer questions

1. Are Hendy/Daumas anchors respected (agent-act-moment at escape point)?
2. Is anti-migration enforced (EP-B01) without false positives in normal cases?
3. Is anti-post-event enforced (EP-B02) with sequence and marker evidence?
4. Is consequence-as-basis blocked (EP-B03) while allowing point-moment evidence?
5. Is A-D correctly blocked for `maintenance_or_org`/`design_mgmt` without own-agent physical evidence (EP-B04)?
6. Does `PROGRESSIVE_ZONE` use earliest controllable reference with explicit warning (EP-W01)?
7. Is `DIFFUSE` deterministically blocked and decomposition requested (EP-B05)?
8. Are multiple points blocked (EP-B06) and O-E non-existent/blocked (EP-B07 path)?
9. Are all EP-Bxx and EP-Wxx traceable in outputs and audit traces?
10. Are candidate-only locks always intact and downstream outputs always absent?

## PASS criteria

- EP-B01..EP-B08 all reproducible and traceable in result + audit trace.
- EP-W01..EP-W05 all reproducible and traceable when applicable.
- DISCRETE valid path reaches `ESCAPE_POINT_ENFORCED_OK`.
- PROGRESSIVE complete path reaches `ESCAPE_POINT_ENFORCED_OK` + `EP-W01`.
- DIFFUSE blocks with `EP-B05`.
- O-E remains non-existent and blocked (never active).
- Candidate-only locks remain false/locked in every output.
- No `selectedCode`, `releasedCode`, `finalConclusion`, HFACS/Risk/ERC/ARMS/recommendations outputs.

## BLOCK criteria

- Any missing EP-Bxx/EP-Wxx traceability.
- Any lock opening (`*Allowed=true`) in candidate-only outputs.
- Any active downstream/final output surface.
- Any methodology drift from escape-point agent-act-moment anchor.
- Any canonical question tree mutation outside authorized scope.

## Critical points

- Hendy/Daumas anchor fidelity.
- Agent-act-moment integrity.
- Anti-post-event barrier.
- `PROGRESSIVE_ZONE` earliest controllable reference behavior.
- `DIFFUSE` decomposition requirement.
- A-D prohibition for maintenance/org and design/management agents.
- O-E non-existent handling.
- Candidate-only locks and downstream absence.

