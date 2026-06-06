# SERA vNext Engine V0 Contract

Status: `IMPLEMENTED_CANDIDATE_ONLY`

The engine accepts raw narrative input and returns an executable candidate-only causal analysis. The contract is defined in `frontend/src/lib/sera-vnext/engine-contract.ts`.

Input fields:

- `inputId`
- `narrative`
- `locale`
- `sourceType`
- `sourceReference`
- `requestId`
- `mode`
- `options`

Output sections:

- `factualExtraction`
- `safeOperationModel`
- `escapePoint`
- `unsafeState`
- `unsafeActOrCondition`
- `directActor`
- `axes`
- `preconditions`
- `canonicalTraversal`
- `guardrails`
- `uncertainties`
- `limitations`
- `decisionTrace`
- `evidenceTrace`
- `humanReviewPackage`

Final output locks:

- `humanReviewRequired: true`
- `selectedCode: null`
- `releasedCode: null`
- `finalConclusion: null`
- `classifiedOutput: false`
- `readyPromotion: false`
- `downstreamAllowed: false`

Product Alpha adapter status:

- Calls `runSeraVNextEngineV0`.
- Returns `persisted: false`.
- Preserves candidate-only/non-final warnings.
- Does not write to database or enable Product Beta persistence.
