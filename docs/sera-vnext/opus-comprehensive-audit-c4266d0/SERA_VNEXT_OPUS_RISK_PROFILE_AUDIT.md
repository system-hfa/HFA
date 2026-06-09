# SERA vNext — Risk Profile Audit (c4266d0)

Scope: `lib/risk-profile/{server,erc,types}.ts`, `app/api/risk-profile/*`, `app/api/org/intelligence`, `app/api/analyses/risk-profile`, `app/(dashboard)/risk-profile/page.tsx`, `app/(dashboard)/events/page.tsx`.

## Canonical source & consolidation

`getRiskProfileSummaryForTenant` (`server.ts`) pulls four tenant-scoped datasets via the service-role client:
1. `events` + nested legacy `analyses` (perception/objective/action codes, preconditions)
2. `corrective_actions`
3. `risk_profile_exclusions` (active only, `restored_at is null`)
4. `sera_vnext_analyses` (candidate codes + engine_output preconditions)

Legacy events → `toLegacySource`; vNext analyses → `toVNextSource` (only those `isCompatibleVNextRow`, i.e., having at least one candidate code or precondition). Incompatible vNext rows are counted and surfaced as a limitation.

### Why it previously showed 0, and the 547 question
Before this commit the profile did not consolidate vNext analyses (or filtered them out). The fix adds the `sera_vnext_analyses` source. **But** because the engine cannot classify Portuguese (F-05), most real vNext analyses have **no candidate codes and no preconditions**, so `isCompatibleVNextRow` is false and they are excluded with the message *"N análise(s) SERA vNext foram ignoradas por ainda não exporem P/O/A…"*. So of ~547 vNext analyses, only those that happen to surface a code/precondition enter the profile; the rest are honestly reported as ignored. The "consolidate real analyses" fix is real but its yield is bounded by the engine.

## Double counting, status & orphans

- **No cross-source dedup:** a legacy event and a vNext analysis of the same incident count as two sources. Within legacy, `coerceLegacyAnalysis` takes only `analyses[0]` (multiple analyses per event collapse to one — possible undercount). Within vNext, one row = one source. (Contributes to F-08.)
- **Distribution inclusion = active AND status 'completed'.** vNext `'completed'` ⇔ `HUMAN_REVIEW_COMPLETED_NON_FINAL`; freshly created (`CANDIDATE_ANALYSIS_CREATED`) → `'draft'` → excluded from distributions but reported as `draftSources` limitation. Error/archived states are separated and reported. `erc_level=null` (no perception code) → simply not counted in ERC.
- Orphans: vNext rows without codes → ignored+counted; legacy events without analyses → category null, low/none ERC.

## Exclusion / restore (safe)

- `isExcludedFromRiskProfile` flag from active exclusions; excluded sources are removed from `activeSources` ⇒ **all aggregates exclude them**, and are surfaced in `source_events_excluded` with reason/at.
- Restore (set `restored_at`) ⇒ next load no longer sees the exclusion ⇒ **aggregates recompose**.
- Exclusion is a separate ledger row — **the analysis/event is never deleted** (stop-rule not triggered). Exclusion/restore are admin-only, tenant-scoped, source-validated, idempotent, race-guarded, and audited (`risk_profile.exclusion_created/restored`).
- Events list and Risk Profile stay consistent: `events/page.tsx` reads `/api/risk-profile/exclusions` and toggles per-event exclusion; both derive from the same ledger.

## Endpoint topology (F-13, MEDIUM)

- `/api/risk-profile` (GET) and `/api/org/intelligence` (GET) **both** call `getRiskProfileSummaryForTenant` ⇒ identical data; cannot diverge. Difference: `/api/risk-profile` writes a `risk_profile.generated` audit event, `/api/org/intelligence` does not. The **company dashboard reads `/api/org/intelligence`** (un-audited; F-23).
- `/api/analyses/risk-profile` (GET) is a **stale legacy-only** endpoint that queries the `analyses` table directly — **no vNext, no exclusions** ⇒ it *will* diverge from the consolidated profile if any client uses it.
- All three use `requireBearerUser` (any tenant user) and leak `String(e)`/`error.message` on 5xx (F-14).
- No explicit `no-store` on the risk GET routes; dynamic by virtue of per-request auth, but caching headers are not asserted (minor stale-data risk).

## Aggregate validity — are these inferences or counts?

The aggregates are **technical counts and heuristics presented as risk intelligence**:
- **Score (F-09):** `baseScore = (pTotal*1.0 + oTotal*0.8 + aTotal*0.6)/totalAnalyses/3*100` with undocumented weights, plus ad-hoc penalties; mapped to Crítico/Atenção/Normal. No methodological basis cited.
- **Recurring patterns (F-09):** top-10 P/O/A co-occurrence with **no count threshold** (a count of 1 is listed as a "pattern").
- **Trend:** monthly counts — weak with few months/small n.
- **ERC distribution (F-10):** `erc.ts` is a sparse ARMS lookup (only P-A/P-B/P-F have severity rows; else 'C') × barrier-count — under-specified for an "ERC 1–5" risk classification.
- **Mitigations present:** `data_confidence` (minimumRecommended=10) flags thin samples; limitations messages enumerate excluded/draft/error/archived/manually-excluded counts. These are good and should be foregrounded.

**Critical question answer:** the displayed aggregates are *technical counts*, partially honest about confidence, but the "score", "recurring pattern", and "organizational profile" framings exceed what the method formally supports — especially at the n≈10 threshold the UI itself advertises.

## Methodology mixing (F-08, MEDIUM)

Legacy and vNext codes are pooled into one set of P/O/A distributions and one ERC computation. This is code-space-compatible *only if* legacy `analyses` store SERA P-/O-/A- codes (the shared `computeHfaErcCategoryFromCodes` implies they do), but it still merges potentially different methodology versions/engines without tagging.

## Risk Profile verdict

**RISK_PROFILE_READINESS = PASS_WITH_WARNINGS.** Consolidation is functionally correct, tenant-safe, and exclusion/restore is safe and auditable (no evidence deletion). The warnings are about *claims and coherence*: an arbitrary risk score, unthresholded "patterns", a sparse ERC heuristic, legacy/vNext methodology mixing, three overlapping endpoints (one stale), and client-facing error leakage. The data plumbing is trustworthy; the interpretive labels need to be toned to the evidence.
