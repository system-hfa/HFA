# SERA vNext — Product Routing & Provenance

## Routing (`frontend/src/app/api/analyze/route.ts`)

| Check | Verdict | Evidence |
|---|---|---|
| Flag off -> legacy | PASS | `isSeraVNextCanonicalAnalyzeEnabled()` false -> `completeSeraAnalysisAfterEventCreated` (legacy) |
| Flag on -> vNext | PASS | true -> `createSeraVNextAnalysis` with `sourceFlowOverride:'VNEXT_CANONICAL'` |
| Default false | PASS | `feature-flags.ts` `readBooleanEnv` returns false unless env == "true" |
| No silent fallback | PASS | vNext failure throws into the shared `catch` -> 500 + refund + `analysis_failed` audit; never falls back to legacy |
| Rollback | PASS | unset flag restores legacy path with no code change |
| Engine version | PASS | vNext path runs `runSeraVNextEngineV0` v0.2.0 |
| Audit on use | PASS | `canonical_engine.used` event with source_flow, engine_runtime_version, canonical_tree_version |
| Production current state | NOT_ASSESSED | flag value in deployed env unknown (F-26) |

### Routing risk (NF-03)

When the flag is **on**, the response is `{ analysis_id, source_flow, engine_runtime_version, guardrails, reviewer_output, seraAnalysis: null }`. The common `events/new` UI is built around `seraAnalysis`. So enabling the flag for the **common** flow would return data the legacy UI cannot render. **The vNext path is therefore usable in practice only via the dedicated admin vNext UI** (`/admin/sera-vnext/...`), not the common user flow. The closure claim that "controlled pilot can use the vNext path" is true **only for the admin path**.

## Provenance (`sera-vnext-product/persistence/create-analysis.ts`)

Every vNext analysis row stores: `engine_version`, `engine_runtime_version` (0.2.0), `methodology_version` (SERA_PT_V1_FROZEN), `baseline_id`, `fixture_set_id`, `input_schema_version`, `output_schema_version`, `code_commit`, `source_flow`, `canonical_tree_version`, `request_id`, `client_request_id`, `narrative_hash`, `engine_input`, `engine_output`, `engine_output_hash`, candidate codes, warnings, uncertainties, limitations. A parallel revision row + `analysis.created` audit event (with `guardrailViolations`) are written.

- **Idempotency**: `findAnalysisByClientRequest`; divergent payload on same `clientRequestId` -> conflict. PASS.
- **Final-output lock**: `assertNonFinalOutput` throws `SERA_VNEXT_PRODUCT_BETA_FINAL_OUTPUT_LOCK_VIOLATED` if any final field is set. PASS.
- **Version split documented**: `engine_version` (DB contract 0.1.0) vs `engine_runtime_version` (runtime 0.2.0). Resolved by the additive provenance migration.

## Migrations

| Migration | Purpose | Note |
|---|---|---|
| `20260519000000_add_traceability_fields.sql` | legacy traceability fields | pre-existing |
| `20260607135727_sera_vnext_product_beta.sql` | vNext product beta schema + JWT helpers | F-20 (search_path) accepted as non-issue (INVOKER) |
| `20260608190000_risk_profile_exclusions.sql` | exclusions table + tenant RLS | F-19: no DB role/source FK |
| `20260608210000_sera_vnext_provenance_columns.sql` | **additive** engine_runtime_version / source_flow / canonical_tree_version | **required** for canonical route insert |

### `APPLY_MIGRATION_AS_IS` assessment

The provenance migration is **strictly additive** (`add column if not exists`, new indices, comments; no constraint changes, no backfill). It is **safe to apply as-is** on the current schema. **It is also a hard dependency**: if it is not applied in the pilot environment, `createSeraVNextAnalysis` inserts will fail on unknown columns and the canonical route will 500. **I did not apply it** (read-only). Whether it is applied in any live/staging DB is **NOT_ASSESSED** (F-26) and must be verified out-of-band before enabling the flag.

## Verdict

Routing: **PASS_WITH_WARNINGS** (default-off, no silent fallback, audited; but vNext path practically admin-only — NF-03).
Provenance: **PASS** (complete lineage per analysis and revision).
Migrations: provenance migration **safe as-is but unverified in deploy** and is a precondition for the flag.
