# SERA Engine vNext P-Axis Micro-Pilot Method Decision A4R83 v0.2.0

Status: AUTHOR_METHOD_DECISION_DRAFT  
Phase: A4+R-83 — Author Approval Packet for P-Axis Micro-Pilot  
DOCS_ONLY  
PACKET_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM

## Decision Draft
- A future micro-pilot should start with the P axis.
- The future pilot should be limited to the 4 strong candidates identified in A4+R-82.
- O-axis and A-axis candidates should not be included yet.
- Downstream remains closed.
- Axis-level release must not become whole-case conclusion.
- The author must explicitly decide before any real release exists.

## Justification
- P-axis has the strongest current pilot candidates.
- A-axis remains weak, with only 1/30 proposed A code and high residual uncertainty.
- O-axis has O-A overuse risk and rare-code threshold issues for O-C/O-D.
- A P-axis packet tests a bounded mechanism with lower downstream and overclassification risk.
- The selected P-axis candidates preserve `UNRESOLVED` on unresolved axes rather than forcing case completion.

## Candidate Scope
- REAL-EVENT-0003 P-G
- REAL-EVENT-0015 P-G
- N109W P-G
- N11NM P-C

## Exclusions
- Weak candidates remain in backlog.
- O-axis candidates are excluded.
- A-axis candidates are excluded.
- `O-E` is not an active code and is excluded.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixture, baseline, UI/API/DB, migration, or runtime output is authorized.

## Next Phase
Recommended next phase:
- **A4+R-84 — Author Decision Intake for P-Axis Micro-Pilot**.

A4+R-84 should remain docs-only and record explicit user/author decisions for the four prepared packets. It should still avoid real release unless separately and explicitly authorized.
