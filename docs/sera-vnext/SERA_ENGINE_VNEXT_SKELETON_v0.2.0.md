# SERA Engine vNext Skeleton v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-29 — SERA Engine vNext Skeleton  
Scope: isolated skeleton for causal engine bootstrap only  
Non-scope: methodological implementation, UI integration, DB persistence, legacy patching, fixture changes, baseline changes, HFACS integration, Risk/ERC integration

## 1. Purpose
This document records the creation of the first isolated TypeScript skeleton for SERA Engine vNext.
The objective is to establish contracts and module boundaries without implementing final causal logic.

## 2. Files created
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/engine.ts`
- `frontend/src/lib/sera-vnext/index.ts`
- `frontend/src/lib/sera-vnext/steps/01-factual-extraction.ts`
- `frontend/src/lib/sera-vnext/steps/02-unsafe-state.ts`
- `frontend/src/lib/sera-vnext/steps/03-unsafe-act-condition.ts`
- `frontend/src/lib/sera-vnext/steps/04-direct-actor.ts`
- `frontend/src/lib/sera-vnext/steps/05-poa-statements.ts`
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts`
- `frontend/src/lib/sera-vnext/steps/07-preconditions.ts`
- `frontend/src/lib/sera-vnext/steps/08-limitations.ts`
- `frontend/src/lib/sera-vnext/steps/09-recommendations.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `frontend/src/lib/sera-vnext/steps/11-human-review.ts`

## 3. Legacy isolation confirmation
Isolation constraints were preserved:
- no imports from `frontend/src/lib/sera/all-steps.ts`
- no imports from `frontend/src/lib/sera/pipeline.ts`
- no imports from `frontend/src/lib/sera/hfacs-mapper.ts`
- no writes to database
- no UI integration

## 4. HFACS and Risk/ERC exclusion confirmation
The skeleton explicitly excludes downstream outputs from causal core:
- HFACS
- Risk/ERC
- ARMS/ERC

No risk scoring, no ERC fields, and no HFACS mapping were added to vNext contracts.

## 5. Stub design summary
- `analyzeSeraVNext(input)` orchestrates 11 ordered steps.
- All step files are pure stubs with TODO markers for next phases.
- Output contract includes:
  - `operationalUnsafeState`
  - `decisionAntecedents`
  - `humanReviewRequired`
  - `causalAssurance`
- `causalAssurance.status` is intentionally `SKELETON_NOT_VALIDATED`.
- `humanReview.required` is forced to `true`.

## 6. Limitations
- No deterministic causal rules yet.
- No LLM integration.
- No full P/O/A classifier implementation.
- No preconditions reconciliation logic.
- No acceptance test execution in this phase.

## 7. Validations executed
- TypeScript compile gate:
  - `cd frontend && npx tsc --noEmit`
- Repository scope checks:
  - `git status --short`
  - `git diff --stat`
  - `git diff --name-status`

## 8. Trial status
Trial 001 has not been executed on vNext in this phase.
This phase only introduces the scaffold required for future implementation.

## 9. Next steps
- A4+R-30: implement Step 1–3 methodology-first logic.
- Keep vNext isolated from legacy and downstream layers.
- Run first controlled dry-run only after step logic exists.
