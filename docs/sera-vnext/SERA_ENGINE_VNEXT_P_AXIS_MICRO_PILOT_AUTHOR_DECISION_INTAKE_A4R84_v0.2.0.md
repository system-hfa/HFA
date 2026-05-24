# SERA Engine vNext P-Axis Micro-Pilot Author Decision Intake A4R84 v0.2.0

Status: AUTHOR_DECISION_INTAKE_DRAFT  
Phase: A4+R-84 — Author Decision Intake for P-Axis Micro-Pilot  
DOCS_ONLY  
DECISION_INTAKE_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objective
Record the author decision status for the 4 P-axis micro-pilot candidates without executing release.

No explicit case-by-case author decision was provided in the A4+R-84 prompt. Therefore all four candidates remain pending author decision.

## Scope
Included:
- REAL-EVENT-0003 P-G
- REAL-EVENT-0015 P-G
- N109W P-G
- N11NM P-C

Excluded:
- weak candidates;
- O-axis;
- A-axis;
- `UNRESOLVED` axes;
- `O-E`;
- downstream.

## Decision by Candidate
| candidateId | caseId | proposedCode | authorDecisionStatus | authorDecision | authorRationale | acceptedUncertainty | requiredBeforeFutureRelease | rollbackTriggers | notes |
|---|---|---|---|---|---|---|---|---|---|
| A4R83-P-001 | REAL-EVENT-0003 | P-G | PENDING_AUTHOR_DECISION | NONE_RECORDED | Not recorded in current prompt. | Not accepted yet. | Explicit author decision, evidenceRefs confirmation, release limitation, downstream lock confirmation. | New source contradiction; author disagreement; unresolved critical P question. | Awaiting explicit author decision. |
| A4R83-P-002 | REAL-EVENT-0015 | P-G | PENDING_AUTHOR_DECISION | NONE_RECORDED | Not recorded in current prompt. | Not accepted yet. | Explicit author decision, evidenceRefs confirmation, release limitation, downstream lock confirmation. | New source contradiction; author disagreement; unresolved critical P question. | Awaiting explicit author decision. |
| A4R83-P-003 | N109W | P-G | PENDING_AUTHOR_DECISION | NONE_RECORDED | Not recorded in current prompt. | Not accepted yet. | Explicit author decision, evidenceRefs confirmation, release limitation, downstream lock confirmation. | New source contradiction; author disagreement; unresolved critical P question. | Awaiting explicit author decision. |
| A4R83-P-004 | N11NM | P-C | PENDING_AUTHOR_DECISION | NONE_RECORDED | Not recorded in current prompt. | Not accepted yet. | Explicit author decision, evidenceRefs confirmation, release limitation, downstream lock confirmation. | New source contradiction; author disagreement; unresolved critical P question. | Awaiting explicit author decision. |

## Permitted Future Decision Values
Future author intake may record one of:
- `APPROVE_FOR_FUTURE_RELEASE_PILOT`
- `HOLD_FOR_AUTHOR_CLARIFICATION`
- `HOLD_FOR_SOURCE_ENRICHMENT`
- `HOLD_FOR_METHOD_REFINEMENT`
- `REJECT_FOR_RELEASE_PILOT`

None of those decisions is recorded in A4+R-84.

## Confirmations
- Author decision intake is not release.
- No releasedCode created.
- No proposedCode altered.
- No `UNRESOLVED` reduced.
- Downstream remains locked.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixture, baseline, UI/API/DB, migration, or runtime change is created.
