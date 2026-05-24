# SERA Engine vNext Post Release Criteria Next Phase Plan A4R81 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM

## Objective
Evaluate next-phase options after release criteria design, without opening runtime, downstream, fixture, baseline, or product work.

## Option A — A4+R-82 Author Review of Release Eligibility Matrix
Purpose:
- review the A4+R-81 dry-run matrix axis by axis;
- decide whether any `ELIGIBLE_FOR_AUTHOR_REVIEW` axis should enter a future release pilot;
- confirm whether `DESIGN_ONLY_NOT_ASSESSED` axes in `HOLD_UNRESOLVED` cases may be reviewed independently.

Advantages:
- uses existing 30/30 questionPath coverage;
- keeps scope docs-only;
- creates author decisions before any release pilot.

Risks:
- 21 axes are eligible only for author review, not release;
- O-A frequency may tempt default release unless carefully guarded;
- rare O-C/A-F remain fragile.

## Option B — A4+R-82 External Investigation Report Harvest Strategy
Purpose:
- improve source quality before release review;
- target source partial, source identity mismatch, and evidence enrichment gaps;
- keep factual evidence separate from report conclusions.

Advantages:
- strengthens cases currently blocked or weak;
- helps P/A boundary and objective-diversity cases.

Risks:
- delays release-pilot design;
- requires disciplined quarantine of report analysis, conclusions, HFACS labels, and recommendations.

## Option C — A4+R-82 Source Enrichment Sprint for Release-Eligible Candidates
Purpose:
- enrich only the most promising release-review candidates;
- focus on axes already marked `ELIGIBLE_FOR_AUTHOR_REVIEW` or `NEEDS_ENRICHMENT`;
- avoid broad corpus expansion.

Advantages:
- practical if author wants fewer, stronger candidates;
- can reduce uncertainty in P-G/P-C/P-H and O-D/O-C edge cases.

Risks:
- may still not create enough support for A-axis release;
- could overfocus on release candidates before author validates the dry-run logic.

## Option D — A4+R-82 Product Display Contract for Proposed/Unresolved/Released Separation
Purpose:
- design how product surfaces would distinguish proposed, unresolved, and future released states.

Advantages:
- prevents UI/API confusion before runtime work.

Risks:
- premature while real release is not authorized;
- could imply product downstream before author release policy is settled.

## Recommendation
Recommend Option A first: **A4+R-82 — Author Review of Release Eligibility Matrix**.

Rationale:
- The dry-run matrix shows 21 axes that can be reviewed by the author and 52 axes blocked by `UNRESOLVED`.
- There are 6 axes needing enrichment and 11 axes left design-only because partial-axis policy is not yet decided.
- Author review should decide whether the eligibility logic is acceptable before source enrichment is narrowed or any pilot is designed.

Secondary option:
- If the author judges that too many eligible axes remain evidentially weak, move next to Option C, a focused Source Enrichment Sprint.

Do not recommend runtime, UI/API, fixture, baseline, or downstream work yet.

## A4+R-82 Update — Author Review of Release Eligibility Matrix

A4+R-82 executed the recommended author-review path as a documentary review only:
- author review of the A4+R-81 eligibility matrix created;
- future release pilot shortlist created;
- pre-release gap review created;
- release pilot plan created;
- no release executed;
- releasedCodeCount remains 0;
- no downstream opened;
- no fixture, baseline, code, UI/API/DB, migration, or runtime change introduced.

Review outcome:
- STRONG_RELEASE_PILOT_CANDIDATE: 4 axes;
- WEAK_RELEASE_PILOT_CANDIDATE: 6 axes;
- HOLD_FOR_ENRICHMENT: 1 axis;
- HOLD_FOR_AUTHOR_CLARIFICATION: 5 axes;
- HOLD_FOR_METHOD_REFINEMENT: 5 axes;
- REJECT_FOR_RELEASE_PILOT: 0 axes.

Next recommendation:
- **A4+R-83 — Author Approval Packet for P-Axis Micro-Pilot**, docs-only, if the author wants to prepare a first narrow pilot.
- Alternative: **A4+R-83 — Source Enrichment Sprint for Held Release Candidates**, if the priority is strengthening weak/held axes before any pilot packet.
