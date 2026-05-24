# SERA Engine vNext Release Eligibility Dry-Run Matrix A4R81 v0.2.0

Status: DESIGN_ONLY_DRY_RUN  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_PROPOSED_CODE_CHANGE  
NO_UNRESOLVED_REDUCTION  
NO_DOWNSTREAM

## Objective
Create a documentary eligibility dry run for the 30 real-event cases. This is not release. It is a design instrument for deciding which axes could be reviewed by the author in a future, separately authorized release pilot.

## Dry-Run Rules
- If an axis is `UNRESOLVED`, eligibility is `BLOCKED_UNRESOLVED`.
- If maturityStatus is `AUTHOR_REVIEW_READY`, a non-UNRESOLVED axis may be `ELIGIBLE_FOR_AUTHOR_REVIEW`, never released automatically.
- If maturityStatus is `EVIDENCE_ENRICHMENT_REQUIRED`, a non-UNRESOLVED axis is `NEEDS_ENRICHMENT`.
- If maturityStatus is `TRIAGE_ONLY`, the case is not releaseable; unresolved cells remain `BLOCKED_UNRESOLVED`.
- If maturityStatus is `HOLD_UNRESOLVED`, non-UNRESOLVED axes remain `DESIGN_ONLY_NOT_ASSESSED` pending author choice about whether partial axis review is appropriate.
- Rare or single-observation codes such as `O-C` and `A-F` are at most `ELIGIBLE_FOR_AUTHOR_REVIEW`, never direct release.
- This matrix creates no released codes.

## Matrix
| caseId | P draft | O draft | A draft | questionPathPresent | sourceQuality | maturityStatus | conflictStatus | sourceEnrichmentNeeded | releaseEligibilityP | releaseEligibilityO | releaseEligibilityA | mainBlocker | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0001 | P-G | O-A | UNRESOLVED | yes | MEDIUM | AUTHOR_REVIEW_READY | NO_CONFLICT | yes | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | A-axis PF/PM/action mechanism unresolved | Guarded narrative exists, but release still needs author decision. |
| REAL-EVENT-0002 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | HOLD_UNRESOLVED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | warning/go-around chain and P/A unresolved | O-A not automatically releaseable while case is hold. |
| REAL-EVENT-0004 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | HOLD_UNRESOLVED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | actor decomposition and warning chain unresolved | Preserve conservative hold. |
| REAL-EVENT-0006 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW/MEDIUM | HOLD_UNRESOLVED | NO_CONFLICT | no (strict) | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | condition-dominant technical event | O-A only design-assessed until technical timeline is bounded. |
| REAL-EVENT-0028 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW/PARTIAL | TRIAGE_ONLY | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | source partial | Not eligible at case level; all axes unresolved. |
| REAL-EVENT-0003 | P-G | O-A | UNRESOLVED | yes | MEDIUM | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | A-axis PF/PM/callout mechanism unresolved | Good P/O review candidate; A remains blocked. |
| REAL-EVENT-0005 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | NEEDS_ENRICHMENT | BLOCKED_UNRESOLVED | helideck dynamics and PF/PM reconciliation needed | O-A needs stronger source support before release review. |
| REAL-EVENT-0010 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | condition/action boundary | Maintain hold pending action-vs-condition clarity. |
| REAL-EVENT-0013 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW/IDENTITY_MISMATCH | TRIAGE_ONLY | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | source identity mismatch | Reconcile source identity before any release review. |
| REAL-EVENT-0015 | P-G | O-A | UNRESOLVED | yes | MEDIUM | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | A-axis callout/input chain unresolved | High-value dark-night P/O candidate only. |
| REAL-EVENT-0016 | P-C | O-A | UNRESOLVED | yes | MEDIUM | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | action mechanism not separable from mode perception | Automation P-C candidate for author review. |
| REAL-EVENT-0007 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | NEEDS_ENRICHMENT | BLOCKED_UNRESOLVED | maintenance/technical chain incomplete | Technical-dominant negative control. |
| REAL-EVENT-0008 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | technical condition dominates | Preserve hold against forced human attribution. |
| REAL-EVENT-0009 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | NEEDS_ENRICHMENT | BLOCKED_UNRESOLVED | external barrier/bird-strike evidence needed | O-A source support insufficient for release review. |
| REAL-EVENT-0011 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | NEEDS_ENRICHMENT | BLOCKED_UNRESOLVED | infrastructure hazard awareness unclear | Needs source enrichment before release review. |
| REAL-EVENT-0014/0030 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW/PARTIAL | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | source partial and condition-dominant | No axis eligible. |
| N56RD | UNRESOLVED | O-A | UNRESOLVED | yes | HIGH | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | technical emergency/action boundary | O-A remains design-only pending partial-axis policy. |
| D-HHNH | P-G | O-A | UNRESOLVED | yes | MEDIUM | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | action trace unresolved | P-G source medium; author review required. |
| G-BHYB | P-F | O-A | UNRESOLVED | yes | HIGH | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | P-F single observed pattern and A unresolved | P-F vs P-G requires author decision. |
| HL9294 | P-G | O-D | UNRESOLVED | yes | HIGH | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | O-D requires objective-specific author review | Useful objective-diversity candidate. |
| PR-CHI | P-H | O-A | UNRESOLVED | yes | MEDIUM | EVIDENCE_ENRICHMENT_REQUIRED | NO_CONFLICT | yes | NEEDS_ENRICHMENT | NEEDS_ENRICHMENT | BLOCKED_UNRESOLVED | motion/communication chain needs enrichment | P-H not release-ready. |
| N200BK | P-G | O-A | UNRESOLVED | yes | HIGH | HOLD_UNRESOLVED | NO_CONFLICT | no | DESIGN_ONLY_NOT_ASSESSED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | IMC decision/control boundary | Partial-axis release policy needed before review. |
| N109W | P-G | O-D | UNRESOLVED | yes | HIGH | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | O-D requires author review | Strong design candidate, no automatic release. |
| N11NM | P-C | O-A | UNRESOLVED | yes | HIGH | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | BLOCKED_UNRESOLVED | automation mode/action boundary | P-C candidate for author review. |
| N127LN | UNRESOLVED | O-A | UNRESOLVED | yes | HIGH | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | fatigue precondition boundary | O-A not automatically releaseable. |
| N120HH | UNRESOLVED | O-A | UNRESOLVED | yes | HIGH | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | uncontained engine failure condition-dominant | Technical negative control. |
| N525TA | UNRESOLVED | O-A | UNRESOLVED | yes | HIGH | HOLD_UNRESOLVED | NO_CONFLICT | no | BLOCKED_UNRESOLVED | DESIGN_ONLY_NOT_ASSESSED | BLOCKED_UNRESOLVED | test-envelope human-system boundary | Keep design-only pending author policy. |
| BS211-Q400 | P-H | O-C | A-F | yes | HIGH | AUTHOR_REVIEW_READY | NO_CONFLICT | no | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | ELIGIBLE_FOR_AUTHOR_REVIEW | O-C/A-F rare observed codes | Eligible only for future author review, not release. |
| REAL-EVENT-0032 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW/PARTIAL | TRIAGE_ONLY | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | source partial triage | No axis eligible. |
| REAL-EVENT-0033 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW/PARTIAL | TRIAGE_ONLY | NO_CONFLICT | yes | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | BLOCKED_UNRESOLVED | source partial triage | No axis eligible. |

## Dry-Run Metrics
Across 30 cases and 90 axes:

| eligibility status | axis count |
|---|---:|
| ELIGIBLE_FOR_AUTHOR_REVIEW | 21 |
| NOT_ELIGIBLE | 0 |
| NEEDS_ENRICHMENT | 6 |
| BLOCKED_UNRESOLVED | 52 |
| DESIGN_ONLY_NOT_ASSESSED | 11 |
| Total | 90 |

Interpretation:
- `ELIGIBLE_FOR_AUTHOR_REVIEW` means author review could be considered in a future phase; it does not create release.
- `NOT_ELIGIBLE=0` at axis-cell level because all triage-only axes are already `UNRESOLVED` and therefore counted as `BLOCKED_UNRESOLVED`; triage-only cases remain not releaseable at case level.
- `DESIGN_ONLY_NOT_ASSESSED` is used for non-UNRESOLVED axes in `HOLD_UNRESOLVED` cases because a future partial-axis release policy is needed first.

## Confirmations
- releasedCodeCount=0.
- proposedCodeChanges=0.
- unresolvedReduced=0.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixture, baseline, UI/API/DB, migration, or runtime output is created.
