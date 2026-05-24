# SERA Engine vNext Release Criteria Method Decision A4R81 v0.2.0

Status: AUTHOR_METHOD_DECISION_DRAFT  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASED_CODE_CREATED

## Decision Draft
- Release criteria can be designed now because the 30-event corpus has consolidated P/O/A drafts, 30/30 questionPath coverage, and A4+R-80 audits.
- Real release is still not authorized.
- At least one separate future phase is required for author review and any release pilot.
- Any future release must be axis-by-axis.
- Downstream remains blocked even after any future axis-level release.
- External investigation report harvest may improve evidence quality, but it does not replace release criteria or author decision.

## Conditions Before Any Release Pilot
Before a future pilot can release even one axis, the following conditions must be met:

| condition | required state |
|---|---|
| eligibility dry run | Reviewed and accepted by author for pilot scope. |
| author approval | Explicit author decision for each axis under review. |
| O-E residual issue | No active attempt to use `O-E`; `O-E = NON_EXISTENT_IN_SERA_PT_V1`. |
| method locks | No downstream, finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixture, baseline, UI/API/DB, or automatic selected-code classification violation. |
| source identity | No unresolved source identity mismatch for any pilot axis. |
| conflict status | No unresolved questionPath conflict or backfill conflict. |
| evidence package | Axis-level evidenceRefs and questionPathRefs sufficient for author review. |

## Partial Axis Policy
A future release pilot may review one axis without reviewing the other two axes only if the pilot explicitly preserves:
- unresolved axes as `UNRESOLVED`;
- no finalConclusion;
- no automatic narrative closure;
- no HFACS/Risk/ERC/recommendations;
- no fixture or baseline promotion;
- no product downstream dependency.

## A4+R-81 Confirmation
This decision is a draft method decision. It does not create a released code, does not alter any existing proposed code, does not reduce `UNRESOLVED`, and does not change maturityStatus for any case.
