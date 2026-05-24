# SERA Engine vNext External Batch 1 Next Phase Plan A4R89 v0.2.0

Status: NEXT_PHASE_PLAN  
Phase: A4+R-89  
DOCS_ONLY  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_NEW_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Select the next controlled phase after evidence normalization, trace anchoring, adjudication readiness review, and internal trace linkage for the 12 external Batch 1 extractions.

## Option A: A4+R-90 — External Batch 1 AI/Author Adjudication Pilot for Ready Cases
- Trigger: At least four extractions are READY_FOR_FUTURE_ADJUDICATION.
- Current signal: 7 ready extractions.
- Benefit: Tests external extraction-to-questionPath workflow on normalized evidence.
- Constraint: Must remain docs-only unless explicitly authorized otherwise; no automatic code proposal.
- Candidate pool: EXT-001, EXT-002, EXT-004, EXT-006, EXT-007, EXT-008, EXT-012.

## Option B: A4+R-90 — Source Recheck Sprint for Needs-Recheck Cases
- Trigger: Many extractions need URL/source-body recheck.
- Current signal: 3 need source recheck.
- Benefit: Improves weak or preliminary sources before adjudication.
- Candidate pool: EXT-005, EXT-010, EXT-011.
- Constraint: No new candidate discovery; only official URLs already listed or primary authority follow-up explicitly authorized.

## Option C: A4+R-90 — Release Impact Review of Four P-Axis Pilot Releases
- Trigger: External evidence presents strong challenge to current pilot release limitations.
- Current signal: no direct contradiction found in A4+R-89; rollback-signal potential exists but is not active.
- Benefit: Reviews released pilot stability before adding external adjudication load.
- Constraint: No release change without separate author decision.

## Option D: A4+R-90 — Product Contract for Released/Proposed/Unresolved Display
- Trigger: Need to formalize UI/runtime separation of released axis, proposed axes, and unresolved axes.
- Current signal: downstream remains locked; product contract is useful but not required before docs-only adjudication pilot.
- Constraint: No implementation in this option unless later phase explicitly authorizes runtime work.

## Recommendation
Recommend **A4+R-90 — External Batch 1 AI/Author Adjudication Pilot for Ready Cases**, limited to a small docs-only pilot using the 7 ready extractions.

Rationale:
- READY_FOR_FUTURE_ADJUDICATION count is 7, exceeding the 4-case threshold.
- NEEDS_SOURCE_RECHECK count is 3, which can run as a parallel backlog rather than blocking all ready cases.
- A4+R-89 found no active contradiction requiring immediate release impact review before a docs-only pilot.

## Required Guardrails for A4+R-90
- Use only A4+R-88 extraction files and A4+R-89 normalization/trace docs.
- Do not create proposed codes unless the A4+R-90 prompt explicitly authorizes an AI/Author proposal mode.
- Do not create new released codes.
- Preserve conclusion quarantine.
- Keep downstream locked.

