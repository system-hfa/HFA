# SERA vNext Reviewer Utility — Root Cause Analysis

## Investigation Date

2026-06-07

## Pilot Signals That Triggered This Investigation

| Signal               | Before | Target |
| -------------------- | ------ | ------ |
| poa_useful           | 0/10   | ≥7/10  |
| preconditions_useful | 1/10   | ≥7/10  |
| escape_point_useful  | 8/10   | ≥9/10  |
| uncertainty_clear    | 10/10  | 10/10  |
| warnings_clear       | 10/10  | 10/10  |

## Hypothesis Evaluation

### Hypothesis A — ENGINE_EXPLANATION_LAYER_WEAK

**Assessment: NOT PRIMARY CAUSE**

The engine (`SeraVNextEngineOutput.axes`) produces per-axis `SeraAxisCandidate` objects with:
- `statementAtEscapePoint: string | null`
- `supportingEvidence: string[]`
- `counterEvidence: string[]`
- `excludedPostEscapeEvidence: string[]`
- `alternativesConsidered: string[]`
- `canonicalPath: string[]`
- `confidence: 'LOW' | 'MEDIUM' | 'HIGH'`
- `proposedCode: string | null`
- `status: 'CANDIDATE' | 'NO_FAILURE' | 'INSUFFICIENT_EVIDENCE' | 'UNRESOLVED'`

`SeraPreconditionCandidate` objects include:
- `label`, `description`, `category`, `evidence`, `relationship`, `confidence`
- `explicitlyNotEscapePoint: true`, `nonFinal: true`

The engine also produces `humanReviewPackage` with `unansweredQuestions`, `reviewerDecisionsRequired`, `criticalWarnings`.

**Finding:** The engine's output layer is rich enough for reviewer utility. The engine is not the bottleneck.

### Hypothesis B — SERIALIZATION_OR_MAPPING_BUG

**Assessment: PARTIAL CONTRIBUTOR**

The detail page (`[id]/page.tsx`) declares the `axes` UI type as:
```ts
axes?: Record<string, {
  proposedCode?: string | null
  status?: string
  statementAtEscapePoint?: string | null
  supportingEvidence?: string[]  // added but not rendered
}>
```

Fields `counterEvidence`, `alternativesConsidered`, `confidence`, `canonicalPath`, `actor` are absent from the UI type and NOT rendered, even though they exist in the persisted `engine_output`.

**Finding:** The serialization is lossless (full `engine_output` is stored and returned), but the UI mapping truncates the data.

### Hypothesis C — REVIEW_PRESENTATION_BUG

**Assessment: PRIMARY CAUSE**

Two distinct presentation failures:

**Failure 1 — Detail page shows minimal axis data**

`[id]/page.tsx` renders for each axis:
- Status (string)
- `proposedCode` (candidate code)
- `statementAtEscapePoint` (1 field, if present)

Not rendered:
- `supportingEvidence` (why this code was suggested)
- `counterEvidence` (why it may be wrong)
- `alternativesConsidered` (what was rejected and why)
- `confidence` (level of certainty)
- Code meaning (what the code signifies)
- Plain language question for reviewer
- What the reviewer must decide

**Failure 2 — Review page is completely blind**

`[id]/review/page.tsx` shows NO analysis data. The reviewer is presented with:
- A decision dropdown
- An evidence sufficiency dropdown
- A free-text textarea
- A checkbox

There is no presentation of:
- The escape point candidate
- Per-axis statements or evidence
- Precondition descriptions
- Uncertainties
- A structured review checklist

This directly explains why `poa_useful = 0/10`. Reviewers cannot use P/O/A they cannot see.

**Failure 3 — Preconditions shown as flat strings**

Detail page preconditions: `${item.category}: ${item.description ?? item.evidence?.join(' | ') ?? '-'}`

Not shown:
- `relationship` (whether precondition contributed or is context)
- `confidence`
- `label`
- Why it is explicitly NOT the escape point
- Reviewer question

### Hypothesis D — PILOT_RATING_CRITERIA_NEEDS_CLARIFICATION

**Assessment: NOT PRIMARY CAUSE**

The pilot correctly rated `poa_useful = 0` because reviewers genuinely could not use the P/O/A output — the review page shows no analysis. This is a real failure, not a measurement artifact.

## Classification

```
ROOT_CAUSE = REVIEW_PRESENTATION_BUG
CONTRIBUTING_FACTOR = SERIALIZATION_OR_MAPPING_BUG (UI type truncation)
ENGINE_STATUS = PASS (no changes required)
METHODOLOGY_STATUS = UNCHANGED (no reopening)
```

## Remediation Strategy

1. Create a `reviewer-output` derivation layer that transforms `SeraVNextEngineOutput` into a structured, human-readable `SeraReviewerOutput`.
2. Include `reviewerOutput` in API detail and export responses (preserved engine output intact).
3. Update detail page to show all 8 reviewer sections with full axis data.
4. Update review page to load the analysis and display a structured review checklist.
5. Fix CP-004 font preload warning in `layout.tsx`.
6. Re-run pilot with same 10 cases to validate ≥7/10 on P/O/A and preconditions.

## Invariants Preserved

- Motor output unchanged
- Methodology unchanged
- Baseline/fixtures/tree unchanged
- `selectedCode`, `releasedCode`, `finalConclusion` remain null
- `classifiedOutput`, `readyPromotion`, `downstreamAllowed` remain false
- Product Alpha locks unchanged
- RLS/migrations unchanged
