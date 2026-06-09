# SERA vNext — Common Flow Decision (NF-03)

## Decision
**Pilot restricted to admin vNext path. Common flow blocks vNext.**

## Rationale
The vNext engine output shape differs from the legacy SERA pipeline. Adapting the common flow to render vNext candidate-only results carries risk of misinterpretation by users expecting a "final classification."

## Implementation
1. `/api/analyze` with `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=true` returns:
   - `seraAnalysis: null`
   - `sourceFlow: "VNEXT_CANONICAL"`
   - `candidateOnly: true`
   - `humanReviewRequired: true`
   - `vnextNotice`: clear message directing to admin UI
2. Flag remains OFF for common users
3. No attempt to render vNext output in common UI

## Common Flow Response Shape (vNext enabled)
```json
{
  "event_id": "...",
  "analysis_id": "...",
  "sourceFlow": "VNEXT_CANONICAL",
  "seraAnalysis": null,
  "candidateOnly": true,
  "humanReviewRequired": true,
  "vnextNotice": "Esta análise usa o motor vNext..."
}
```

## Pilot Route
`/admin/sera-vnext/analyses` — authenticated admin access with Product Beta UI flag enabled.
