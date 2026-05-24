# SERA Engine vNext Release Criteria Design A4R81 v0.2.0

Status: DESIGN_ONLY  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objective
Define documentary criteria for future release of AI/Author proposed codes while preserving traceability, minimum evidence, questionPath discipline, and explicit author decision.

This document does not release any code. It designs the conditions that a future phase would need to apply before an axis-level `proposedCode` could become a real `releasedCode`.

## Principles
- Release is a methodological act, not an automatic transformation.
- A `proposedCode` does not become a `releasedCode` merely because it exists.
- `questionPath` is necessary for future release consideration, but it is not sufficient by itself.
- `evidenceRefs` must support the critical answers in the questionPath.
- `UNRESOLVED` is a valid methodological result and must not be reduced for completeness.
- No-failure is not a fallback for unknown evidence.
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`; active Objective codes are `O-A`, `O-B`, `O-C`, and `O-D`.
- One axis may be released in a future phase without all three axes being released, but partial axis release must be explicitly allowed by the release package.
- Future released codes do not automatically open finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixtures, baselines, UI, API, DB, or downstream outputs.

## Global Release Prerequisites
For any future axis-level release candidate, all of the following must be true:

| prerequisite | release design rule |
|---|---|
| sourceQuality | Minimum source quality must be defined and met for the axis. LOW/PARTIAL sources require enrichment before release consideration unless an author explicitly accepts a narrow documentary limitation. |
| questionPath | P/O/A questionPath must be present for the case, and the target axis questionPath must be complete enough to show critical answers and uncertainty. |
| evidenceRefs | Critical questionPath answers must cite factual anchors, not report conclusions as expected SERA values. |
| rationaleByAxis | The release package must include an axis-specific rationale explaining why the proposed code is better supported than alternatives. |
| uncertaintyByAxis | Residual uncertainty must be named, bounded, and either accepted or treated as blocking. |
| downstream locks | The release package must explicitly keep downstreamLocked=true. |
| O-E guardrail | `O-E` is blocked because it is not in SERA-PT v1.0. |
| conflict status | Any `POSSIBLE_CONFLICT_FOR_AUTHOR_REVIEW` or `BACKFILL_CONFLICT_FOR_AUTHOR_REVIEW` blocks release until resolved by author decision. |
| source identity | Source identity mismatch blocks release until reconciled. |
| source partial | Source partial cases require minimum factual anchors before release consideration. |
| author decision | Author decision is required. AI/Author draft alone is not sufficient. |

## Release Status Design
Future eligibility review may use these statuses:

| status | meaning |
|---|---|
| RELEASE_ELIGIBLE_DRAFT | The axis appears eligible for author release review, but no release is created by this status. |
| RELEASE_NOT_ELIGIBLE | The axis has a non-releaseable state, such as triage-only source state or missing minimum anchors. |
| RELEASE_NEEDS_AUTHOR_DECISION | The axis has enough structure for author judgment but still requires explicit approval. |
| RELEASE_NEEDS_SOURCE_ENRICHMENT | The axis depends on source details not yet available or not sufficiently anchored. |
| RELEASE_BLOCKED_BY_METHOD_LOCK | A downstream, fixture, baseline, or method lock is being violated. |
| RELEASE_BLOCKED_BY_CONFLICT | A questionPath or adjudication conflict requires author review before any release consideration. |
| RELEASE_BLOCKED_BY_NON_EXISTENT_CODE | The target code is not in the active taxonomy, including `O-E`. |

## Future Release Output Shape
If a future phase authorizes real release, an axis-level release record should include only controlled causal-core fields:

| field | requirement |
|---|---|
| axis | `P`, `O`, or `A`. |
| proposedCode | Existing draft code under review. |
| releasedCode | Future author-approved axis code; not created in A4+R-81. |
| source | Must be `AUTHOR_DECISION` or another explicitly approved author path. |
| evidenceRefs | Factual anchors used by the author decision. |
| questionPathRefs | References to the source questionPath or backfill annex. |
| rationale | Axis-specific release rationale. |
| acceptedUncertainty | Uncertainty accepted by the author as non-blocking. |
| rejectedAlternatives | Alternatives considered and rejected with reason. |
| releaseLimitations | Scope limits of the axis release. |
| downstreamLocked | Must remain true unless a later downstream phase changes that contract explicitly. |

## Universal Release Blockers
Block release if any of the following are present:

- target code is `O-E`;
- target code is `UNRESOLVED`;
- source is not an AI/Author or user-author approved path;
- questionPath is missing;
- evidenceRefs are absent for critical questions;
- source identity mismatch remains unresolved;
- source is partial and lacks minimum factual anchors;
- proposedCode contradicts questionPath;
- `A-A` is used as fallback for unknown action evidence;
- `O-A` is used as fallback for non-existent Objective alternatives or unknown intent;
- any attempt is made to produce finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixtures, baselines, UI/API/DB output, or automatic selected-code classification.

## Separation From Downstream
Even if a future phase creates real released codes:

- finalConclusion remains blocked until a separate contract exists;
- HFACS remains blocked;
- Risk/ERC and ARMS/ERC remain blocked;
- recommendations remain blocked;
- fixtures and baselines require a separate authorized phase;
- product display and API contracts require a separate authorized phase;
- release of one axis does not imply release of the other axes.

## A4+R-81 Confirmation
A4+R-81 is design-only. It creates criteria and a dry-run eligibility matrix, but it creates no released codes, changes no proposed codes, reduces no `UNRESOLVED`, and opens no downstream.
