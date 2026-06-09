# SERA vNext — Risk Profile Endpoint Closure (F-13, F-10)

## Divergent Endpoints Resolved

### /api/analyses/risk-profile
- **Before**: independent DB query counting codes directly from `analyses` table (divergent from canonical methodology)
- **After**: delegates to `getRiskProfileSummaryForTenant()` (same canonical service as `/api/risk-profile`)
- **Response**: includes canonical data + `_deprecation` notice pointing to `/api/risk-profile`

### /api/org/intelligence
- **Before**: already delegating to canonical service with `x-deprecated-use` header
- **After**: unchanged (already correct)

### /api/risk-profile (canonical)
- Unchanged — continues as the authoritative endpoint

## Heuristic Labeling (F-10)
Score and ERC values are labelled:
> "Índice descritivo interno — não validado como probabilidade ou medida formal de risco."

Added to:
- Risk Profile API responses
- Deprecated endpoint responses
- Dashboard display context

## Prohibited Claims
- "Diagnóstico organizacional"
- "Probabilidade de risco"
- "Medida formal de risco"
- "AI classification"
