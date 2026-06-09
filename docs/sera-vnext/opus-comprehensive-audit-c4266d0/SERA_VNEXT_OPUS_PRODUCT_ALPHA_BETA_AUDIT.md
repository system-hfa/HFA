# SERA vNext — Product Alpha & Product Beta Audit (c4266d0)

Scope: `sera-vnext-product/`, `sera-vnext-runtime/`, `app/api/admin/sera-vnext/`, `app/(dashboard)/admin/sera-vnext/`.

## Architecture

- **Product Alpha (candidate-only):** `sera-vnext-runtime/candidate-only/*` + `app/api/admin/sera-vnext/candidate/route.ts`. Calls `analyzeSeraVNextCandidateOnly` → `runSeraVNextEngineV0` → `sanitizeCandidateResponse`. Stateless, no DB.
- **Product Beta (persistence):** `sera-vnext-product/*` + `app/api/admin/sera-vnext/analyses/*`. Persists candidate analyses, revisions, human reviews, audit events.

## Final-output locks (verified at three layers)

1. **Engine:** `run-engine.ts:79-85` hardcodes `selectedCode/releasedCode/finalConclusion=null`, `classifiedOutput/readyPromotion/downstreamAllowed=false`, `humanReviewRequired=true`.
2. **Application:** `create-analysis.ts assertNonFinalOutput` throws `SERA_VNEXT_PRODUCT_BETA_FINAL_OUTPUT_LOCK_VIOLATED` if any final field is set; same enforced on reanalysis.
3. **Database:** `sera_vnext_analyses_non_final_output_lock` and `sera_vnext_revisions_no_final_output_lock` CHECK constraints; `sera_vnext_analyses_no_final_status` (status/review_status must not match FINAL|CLASSIFIED|READY|RELEASED); `sera_vnext_reviews_no_final_decision`. **These hold even under the service-role client (RLS-bypassing) because CHECK constraints are not bypassed.**

**`selectedCode`, `releasedCode`, `finalConclusion`, `CLASSIFIED`, `READY`, and downstream remain blocked. No alternate route bypasses the locks** — create, reanalyze, review, archive, restore, export all flow through the same repository and constraints.

## Output integrity

- Persisted `engine_output` is the verbatim engine result; `engine_output_hash` (`hashJson`) and a `revision` row preserve it. `perception/objective/action_candidate_code` columns mirror the engine's candidate codes (often null — consistent with F-05).
- **reviewerOutput** (`reviewer-output/build-reviewer-output.ts`) is a *formatting/presentation* layer over the engine output and human assessments; the DB review constraints (`decision` ∈ {ACCEPT_AS_WORKING_HYPOTHESIS, REJECT_WORKING_HYPOTHESIS, REQUIRES_MORE_EVIDENCE, RETURN_FOR_REANALYSIS}; `no_final_decision`) guarantee a human review **cannot** become a final classification or invent a released code.
- **List endpoint does not expose narrative:** `repositories.ts sanitizeSummary` strips `narrative`, `engine_input`, `engine_output` from list results.

## Reanalysis / archive / restore / export

- **Reanalyze:** re-runs the engine, inserts a **new append-only revision** (history preserved), bumps `current_revision`. `prevent_sera_vnext_append_only_update/delete` triggers protect revisions and events.
- **Archive:** soft — sets `deleted_at`; no DELETE grant exists on `sera_vnext_analyses`, so rows cannot be hard-deleted by the app role. **Archive does not erase evidence.**
- **Restore:** clears `deleted_at`; `getAnalysis(..., includeArchived)` controls visibility.
- **Export:** `export-analysis.ts` returns the analysis with its non-final status; the no-final-status constraint guarantees the exported status cannot assert a final classification.

## Idempotency & conflict

- Create: `findAnalysisByClientRequest(tenantId, clientRequestId)`; identical payload → returns existing (`idempotent:true`); **divergent payload with same key → 409 conflict** (`narrative_hash`/`title`/`source_type` mismatch). DB unique index `(tenant_id, client_request_id)` backs this.
- Exclusion POST/DELETE are idempotent and race-guarded (see Risk Profile report).

## AuthZ, tenant, errors, observability

- Every handler: `requireAdmin(req)` then context built with `tenantId/userId/role` from the authenticated user (not client). Feature flag off → **404 "Not found"** (no existence disclosure).
- Repository defaults to the **service-role** client; tenant isolation rests on explicit `.eq('tenant_id', tenantId)` on every read/update — present on all queries. `tenant_id` on inserts comes from the server context.
- Errors: `responseError` returns `{detail, errorCode, request_id}` for known errors and a generic 500 otherwise — **no stack trace leak**; `no-store` headers set. (Contrast: the risk-profile endpoints leak raw error text — F-14, a different module.)
- Audit events: `analysis.created/reanalyzed/review_submitted/archived/restored/exported/access_denied` with sanitized payloads; DB constraint `sera_vnext_events_no_narrative_payload` forbids narratives/raw_input in event payload/metadata.

## Material limitation (not a defect of the product layer)

The Product Beta layer is correct, but its **utility is bounded by the engine (F-05)**: because the engine cannot classify Portuguese, real product-beta analyses will mostly persist all-null candidate codes plus `CANONICAL_TRAVERSAL_REVIEW_REQUIRED`/`DIRECT_ACTOR_REVIEW_REQUIRED`/`NO_PRECONDITION_CANDIDATE` warnings. The locks are sound; the thing being locked is mostly "UNRESOLVED + review required".

## Product verdict

**PRODUCT_BETA_READINESS = PASS_WITH_WARNINGS.** Persistence, locks, idempotency, append-only history, soft archive/restore, sanitized audit, and admin+tenant gating are robust and defense-in-depth. The candidate-only contract is preserved end-to-end. The warning is utility, not safety: the persisted candidate output is thin for PT inputs (F-05), and the reviewer workflow is currently exercising a low-signal engine.
