# SERA Engine vNext QuestionPath Backfill Plan A4R79 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-79 — QuestionPath Template and Backfill Plan  
DOCS_ONLY  
NO_CODE_CHANGE  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Plan documentary `questionPath` backfill for:
- the 5 initial events;
- the 10 Batch 2 events.

The purpose is to make the first 15 adjudications comparable with Batch 3 before any release criteria design.

## Scope
- Add `questionPath` without altering `proposedCode`.
- Preserve `UNRESOLVED`.
- Preserve `maturityStatus`.
- Register uncertainty explicitly.
- Do not create `releasedCode`.
- Do not create fixtures, baselines, downstream contracts, or runtime schema.

## Target cases
| caseId | sourceBatch | existingP | existingO | existingA | currentMaturityStatus | missingQuestionPath | backfillPriority | backfillRisk | notes |
|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0001 | BATCH_INITIAL_5 | P-G | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | yes | P1 | MEDIUM | Guarded narrative exists; P/A boundary and PF/PM ambiguity require explicit traceability. |
| REAL-EVENT-0002 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | yes | P1 | MEDIUM | Warning/go-around ambiguity; backfill must preserve P/A unresolved and test the O-A rationale. |
| REAL-EVENT-0004 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | yes | P1 | MEDIUM | Mission/low-height event; risk of inferring perception/action from outcome. |
| REAL-EVENT-0006 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | yes | P1 | HIGH | Guarded narrative exists; technical-dominant scenario requires negative-control traceability. |
| REAL-EVENT-0028 | BATCH_INITIAL_5 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | yes | P2 | HIGH | Source partial; backfill should mostly record `UNCLEAR` and source-anchor limits. |
| REAL-EVENT-0003 | BATCH_2_10 | P-G | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | yes | P1 | MEDIUM | High-value perception/action boundary case. |
| REAL-EVENT-0005 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | yes | P2 | MEDIUM | Helideck dynamics and PF/PM ambiguity; use backfill to expose evidence gaps. |
| REAL-EVENT-0010 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | yes | P2 | LOW | Condition/action boundary; keep conservative hold. |
| REAL-EVENT-0013 | BATCH_2_10 | UNRESOLVED | UNRESOLVED | UNRESOLVED | TRIAGE_ONLY | yes | P2 | HIGH | Source identity mismatch; no causal inference from unstable source identity. |
| REAL-EVENT-0015 | BATCH_2_10 | P-G | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | yes | P1 | MEDIUM | Dark-night offshore approach; P/A traceability needed before release criteria. |
| REAL-EVENT-0016 | BATCH_2_10 | P-C | O-A | UNRESOLVED | AUTHOR_REVIEW_READY | yes | P1 | MEDIUM | Automation/mode-awareness boundary; explicit P-C vs P-G path required. |
| REAL-EVENT-0007 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | yes | P2 | MEDIUM | Technical/maintenance-chain case; avoid converting technical failure into human action. |
| REAL-EVENT-0008 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | HOLD_UNRESOLVED | yes | P2 | LOW | Condition-dominant technical hold; backfill should document negative evidence. |
| REAL-EVENT-0009 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | yes | P2 | MEDIUM | External barrier/bird-strike case; preserve response-window uncertainty. |
| REAL-EVENT-0011 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | yes | P2 | MEDIUM | Infrastructure/taxi hazard; do not infer hazard awareness without evidence. |

## Prioritization
P1 cases should be backfilled first when they meet one or more of the following:
- `AUTHOR_REVIEW_READY`;
- cases with non-`UNRESOLVED` draft P/O/A results that are methodologically informative;
- candidates for guarded narrative;
- cases with risk of free-form interpretation if the path remains implicit.

P2 cases should follow when they are primarily:
- `HOLD_UNRESOLVED`;
- `EVIDENCE_ENRICHMENT_REQUIRED`;
- `TRIAGE_ONLY`;
- source partial or source identity unstable.

When a case matches both P1 and P2 indicators, source instability and unresolved evidence gaps should be noted explicitly. Priority is operational sequencing, not methodological confidence.

## Backfill rules
- Do not alter `proposedCode`.
- Do not resolve a new axis.
- Do not reduce `UNRESOLVED`.
- Do not create release.
- Do not use an old report conclusion as an answer key.
- When evidence is absent, use `answer=UNCLEAR`.
- If `questionPath` exposes a strong inconsistency with the current `proposedCode`, mark `BACKFILL_CONFLICT_FOR_AUTHOR_REVIEW` and do not correct automatically.
- Do not convert HFACS labels, probable causes, findings, or recommendations into P/O/A expected values.
- Do not infer no-failure (`P-A`, `A-A`) merely because a mechanism is unknown.
- Do not include `O-E` as an active Objective code (O-E is NON_EXISTENT_IN_SERA_PT_V1).

## Operational plan for A4+R-80
1. Apply the canonical template to P/O/A for the 5 initial adjudications.
2. Apply the canonical template to P/O/A for the 10 Batch 2 adjudications.
3. Preserve existing `proposedPCode`, `proposedOCode`, `proposedACode`, and `maturityStatus`.
4. Add `BACKFILL_CONFLICT_FOR_AUTHOR_REVIEW` only where the question path conflicts strongly with a draft code.
5. Update the consolidated tracker to mark `questionPathPresent=yes` for the first 15 cases.
6. Recompute coverage metrics only; do not recompute code distribution unless explicitly requested.

## Expected result of future A4+R-80
- 15 files updated or backfill annexes created.
- Tracker updated.
- `questionPath` coverage reaches `30/30`.
- `releasedCodeCount=0`.
- No `finalConclusion`, HFACS, Risk/ERC, recommendations, fixture, baseline, UI/API/DB, or runtime change.

