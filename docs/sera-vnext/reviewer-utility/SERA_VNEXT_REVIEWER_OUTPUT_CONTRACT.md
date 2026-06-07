# SERA vNext Reviewer Output Contract

## Version

`reviewer-output-v1.0.0` — 2026-06-07

## Location

`frontend/src/lib/sera-vnext-product/reviewer-output/`

## Purpose

Derived human-readable layer over `SeraVNextEngineOutput`. Built at API response time; never stored in DB. Does not alter engine decisions, methodology, or locks.

## Type Contract

### SeraReviewerOutput

```ts
{
  summary: {
    headline: string
    nonFinalNotice: string
    overallUsefulnessWarning?: string
  }
  escapePointReview: SeraEscapePointReview
  axisReviews: {
    perception: SeraReviewerAxisCard
    objective: SeraReviewerAxisCard
    action: SeraReviewerAxisCard
  }
  preconditionReview: SeraPreconditionReview
  uncertaintyReview: SeraUncertaintyReview
  humanDecisionGuide: SeraHumanDecisionGuide
}
```

### SeraReviewerAxisCard

Per-axis card with:
- `plainLanguageQuestion` — reviewer-facing question
- `candidateCode` — proposed code (never selectedCode/releasedCode)
- `candidateMeaning` — human-readable code definition
- `statementAtEscapePoint` — engine statement
- `whyCandidateWasSuggested` — supportingEvidence from engine
- `whyItMayBeWrong` — counterEvidence from engine
- `alternativesConsidered` — rejectedAlternatives from engine
- `evidenceExcluded` — excludedPostEscapeEvidence from engine
- `confidence` — human-readable label
- `reviewerMustDecide` — explicit questions for human reviewer

### SeraPreconditionReviewerCard

Per-precondition card with:
- `plainLanguageLabel` — human-readable category
- `description` — what the precondition is
- `evidence` — supporting evidence items
- `relationship` — contributing_factor / context_only / enabling_condition / precursor
- `explicitlyNotEscapePoint: true` — invariant
- `reviewerQuestion` — specific question for reviewer
- `confidence` — human-readable label

## Invariants

- Engine output is NOT modified by this layer
- `selectedCode`, `releasedCode`, `finalConclusion` remain null
- `classifiedOutput`, `readyPromotion`, `downstreamAllowed` remain false
- `nonFinalNotice` is always present and non-empty
- This layer never generates code recommendations — only presents engine candidate data

## API Surface

`reviewerOutput` is added to:
- `GET /api/admin/sera-vnext/analyses/:id` → in `SeraVNextAnalysisDetail`
- `GET /api/admin/sera-vnext/analyses/:id/export` → in `SeraVNextExportPayload`

NOT present in:
- `GET /api/admin/sera-vnext/analyses` (list endpoint — no engine output by design)

## Entry Points

```ts
import { buildReviewerOutput } from '@/lib/sera-vnext-product/reviewer-output'
const ro = buildReviewerOutput(engineOutput)
```
