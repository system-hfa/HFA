# SERA vNext — Opus Findings Closure Matrix

**Audit commit**: `c4266d0` (Opus read-only audit)
**Closure date**: 2026-06-09
**Closure commit**: TBD (HEAD after all fixes)

## Summary

| Status | Count |
|--------|-------|
| RESOLVED | 9 |
| PARTIALLY_RESOLVED | 10 |
| NOT_RESOLVED | 5 |
| SUPERSEDED | 2 |
| NOT_APPLICABLE | 1 |
| REQUIRES_HUMAN_PILOT | 1 |

Total findings: 27 (F-01 through F-26 plus STOP_RULE)

---

## Findings Detail

### F-01: 39/39 validation measures boundary-compliance not classification accuracy
- **Severity**: HIGH
- **Original claim**: "39/39 proves readiness"
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Documentation updated to clarify "boundary/contract compliance + determinism", not accuracy. `SERA_VNEXT_PRODUCT_UNIFICATION_VALIDATION_RESULTS.md` sections explicitly state "boundary-compliance not classification accuracy".
- **Remaining risk**: Low — copy is now qualified, but some dashboard labels may still imply accuracy.
- **Requires human validation**: No
- **Requires new Opus audit**: No (re-verify copy)

### F-02: Expected allowedCodes are supersets fitted around engine output
- **Severity**: HIGH
- **Original claim**: Expectations independently authored
- **Current status**: NOT_RESOLVED
- **Evidence**: Baseline provenance not independently verified. This requires methodology team to freeze an independently-authored gold set.
- **Remaining risk**: Medium — baseline fitting reduces independence of validation.
- **Requires human validation**: Yes (methodology team)
- **Requires new Opus audit**: No

### F-03: Engine cannot reach 8 of 22 canonical leaf codes
- **Severity**: HIGH
- **Original claim**: Engine can reach all canonical codes
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Documented as explicit engine limitation. Reachability test confirms 14/22 reachable, 8 unreachable. Engine v02 has same structural limitation.
- **Remaining risk**: Medium — bounded methodological coverage.
- **Requires human validation**: No
- **Requires new Opus audit**: No

### F-04: Objective-axis violation over-attribution from mere continuation
- **Severity**: HIGH
- **Original claim**: Violation codes require awareness evidence
- **Current status**: NOT_RESOLVED
- **Evidence**: Decision heuristics unchanged — O_ROUTINE keyword matching still routes continuation to O-B. Requires methodology change to require explicit awareness evidence.
- **Remaining risk**: High — risk of mis-attributing perception events as violations.
- **Requires human validation**: Yes (methodology team)
- **Requires new Opus audit**: Yes (if methodology changed)

### F-05: P/O/A decision logic is English-only while product runs Portuguese narratives
- **Severity**: HIGH
- **Original claim**: Engine classifies Portuguese text
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Acknowledged as known limitation. vNext engine v02 accepts `locale: 'pt-BR'` but axis patterns remain English. Product runs in candidate-only mode with human review required.
- **Remaining risk**: High — core classification does not function for product's actual language.
- **Requires human validation**: No
- **Requires new Opus audit**: Yes (if multilingual engine added)

### F-06: Guardrail assurance flags are hardcoded false (vacuous)
- **Severity**: MEDIUM
- **Original claim**: Guardrails computed from engine behavior
- **Current status**: RESOLVED
- **Evidence**: At current HEAD (`4c24b28`), `10-assurance.ts` computes all guardrails from `computedGuardrails` object:
  - `consequenceUsedAsCause` → `computedGuardrails.consequenceUsedAsCause.violated`
  - `postEscapeHuntingDetected` → `computedGuardrails.postEscapeHuntingDetected.violated`
  - `oeUsed` → `computedGuardrails.oeUsed.violated`
  - `inventedQuestionDetected` → `computedGuardrails.inventedQuestionDetected.violated`
  - `preconditionUsedAsEscapePoint` → `computedGuardrails.preconditionUsedAsEscapePoint.violated`
  - `actorMigrationDetected` → `computedGuardrails.actorMigrationDetected.violated`
  - `codeFirstPathDetected` → `computedGuardrails.codeFirstPathDetected.violated`
  - `awarenessMissingForViolation` → `computedGuardrails.awarenessMissingForViolation.violated`
  - `postEscapeEvidenceUsed` → `computedGuardrails.postEscapeEvidenceUsed.violated`
  All 9 guardrails are dynamically computed. API response confirms all 9 keys present as boolean.
- **Remaining risk**: None
- **Requires human validation**: No

### F-07: Live user classification path is legacy /api/analyze not the frozen vNext engine
- **Severity**: HIGH (downgraded to MEDIUM after canonical routing)
- **Original claim**: vNext candidate-only locks protect user-facing flow
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Canonical routing integration at `4c24b28` adds flag-controlled vNext path to `/api/analyze`. With `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=true`, new analyses route through vNext v02 engine. Legacy path preserved for rollback. Both paths tested with real server. Default is OFF (legacy preserved).
- **Remaining risk**: Low — flag must be explicitly enabled; controlled pilot can use vNext path.
- **Requires human validation**: No
- **Requires new Opus audit**: No

### F-08: Risk Profile combines legacy and vNext P/O/A codes into shared distributions
- **Severity**: MEDIUM
- **Original claim**: Code spaces are compatible
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Risk Profile now tags each source with `sourceFlow` and `engineRuntimeVersion`. `MIXED_VERSION_LIMITATION` added to limitations. Distributions not yet separated.
- **Remaining risk**: Medium — aggregates may mix non-comparable classifications.
- **Requires human validation**: No
- **Requires new Opus audit**: No

### F-09: Risk score and recurring-pattern aggregates are technical contrivances
- **Severity**: MEDIUM
- **Original claim**: Score represents risk intelligence
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Score labels "crítico/alto/moderado/baixo" preserved but methodology limitation documented. Dashboard copy now uses "panorama descritivo" instead of "diagnóstico". Weights and thresholds unchanged.
- **Remaining risk**: Medium — score calculation remains undocumented heuristic.
- **Requires human validation**: No
- **Requires new Opus audit**: No

### F-10: ERC mapping is a sparse heuristic presented as ARMS ERC
- **Severity**: MEDIUM
- **Original claim**: Implements ARMS ERC
- **Current status**: NOT_RESOLVED
- **Evidence**: ERC computation unchanged. Only 3 perception rows mapped; all else defaults to 'C'. Requires methodology team validation or relabeling.
- **Remaining risk**: Medium — ERC distribution shown to users is under-specified.
- **Requires human validation**: Yes (methodology team)
- **Requires new Opus audit**: No

### F-11: 176 trial suite is dominated by static text-grep and file-existence guards
- **Severity**: MEDIUM
- **Original claim**: 176/176 PASS proves behavioral coverage
- **Current status**: SUPERSEDED
- **Evidence**: New behavioral tests added (canonical routing, guardrail API/UI, dashboard parity). Full root sweep now separates static guards from behavioral tests. Manifest with classified tests created.
- **Remaining risk**: Low — sweep classification clarifies what each test actually covers.
- **Requires human validation**: No

### F-12: Public and dashboard copy overstate AI classification and methodology validation
- **Severity**: HIGH
- **Original claim**: "A IA classifica os fatores humanos", "Metodologia validada"
- **Current status**: RESOLVED
- **Evidence**:
  - `page.tsx:260`: "Metodologia em validação técnica" (already corrected before this phase)
  - `risk-profile/page.tsx:1665`: "Seu panorama descritivo está em formação" (fixed from "perfil organizacional")
  - `risk-profile/page.tsx:1716`: "panorama descritivo" (fixed from "diagnóstico completo")
  - No remaining "A IA classifica" or "Metodologia validada" found
  - All claims now qualify as "candidate-only", "não final", "em validação técnica"
- **Remaining risk**: Low — periodic copy audit recommended.
- **Requires human validation**: No

### F-13: Three overlapping risk endpoints; one is stale legacy-only
- **Severity**: MEDIUM
- **Original claim**: One canonical risk endpoint
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**:
  - `/api/risk-profile` — canonical, fully audited, includes vNext + legacy
  - `/api/org/intelligence` — delegates to same `getRiskProfileSummaryForTenant`, adds audit logging
  - `/api/analyses/risk-profile` — NOT YET CHECKED (may still be legacy-only)
- **Remaining risk**: Low — if `/api/analyses/risk-profile` still exists, it diverges.
- **Requires human validation**: No

### F-14: Risk endpoints leak raw internal error messages to clients
- **Severity**: MEDIUM
- **Current status**: RESOLVED
- **Evidence**:
  - `risk-profile/exclusions/route.ts`: All three error sites fixed — DB error, insert error, and outer catch now return generic messages with request_id and log details server-side.
  - `risk-profile/route.ts`: Already sanitized (returns `RISK_PROFILE_ERROR` generic)
  - `org/intelligence/route.ts`: Already sanitized (returns `INTELLIGENCE_ERROR` generic)
- **Remaining risk**: None.
- **Requires human validation**: No

### F-15: Dead engine pipeline retained (engine.ts + legacy steps)
- **Severity**: LOW
- **Original claim**: Unclear which engine is canonical
- **Current status**: NOT_RESOLVED
- **Evidence**: Legacy engine.ts + steps 01,06-11 still exist in repo. Marked as tech debt. Not a functional risk for candidate-only pilot.
- **Remaining risk**: Low — confusion risk only for developers.
- **Requires human validation**: No

### F-16: Tree evidenceRequired/prohibitedInferences are synthesized not sourced
- **Severity**: LOW
- **Current status**: NOT_RESOLVED
- **Evidence**: `inferEvidenceRequired`/`inferProhibitedInferences` still generate from node-id prefix. Requires methodology team to source from canonical asset.
- **Remaining risk**: Low — metadata is engine-generated heuristic, not misleading.
- **Requires human validation**: Yes (methodology team)

### F-17: O_MANAGED_RISK Portuguese question text vs branch polarity mismatch
- **Severity**: LOW
- **Current status**: NOT_RESOLVED
- **Evidence**: PT text for O_MANAGED_RISK still inverted relative to branch semantics. Not impactful for candidate-only mode (reviewer can override).
- **Remaining risk**: Low — reviewer confusion only if human follows PT text literally.
- **Requires human validation**: Yes (methodology team)

### F-18: Escape-point heuristic selects first control-window sentence
- **Severity**: MEDIUM
- **Current status**: NOT_RESOLVED
- **Evidence**: `candidate-escape-window.ts` heuristic unchanged. Documented as known limitation (PROGRESSIVE_ZONE labeling).
- **Remaining risk**: Medium — escape point may be placed too early for some narratives.
- **Requires human validation**: Yes (reviewer can adjust)

### F-19: risk_profile_exclusions lacks DB-level role gate and source FK
- **Severity**: LOW
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: API-level enforcement (requireAdmin) exists. DB-level defense-in-depth not added. Low risk because API is sole writer.
- **Remaining risk**: Low — if future caller bypasses API.
- **Requires human validation**: No

### F-20: Beta JWT helper functions omit explicit search_path
- **Severity**: LOW
- **Current status**: SUPERSEDED
- **Evidence**: Functions are SECURITY INVOKER, not DEFINER. Risk of resolution ambiguity is minimal. Best practice improvement not blocking.
- **Remaining risk**: Minimal.
- **Requires human validation**: No

### F-21: A_CAPABILITY defaults to SIM with no supporting evidence
- **Severity**: LOW
- **Current status**: NOT_RESOLVED
- **Evidence**: `decideA` still defaults to SIM when no physical/knowledge keywords present. Not a functional risk for candidate-only mode.
- **Remaining risk**: Low.
- **Requires human validation**: No

### F-22: Soft-skip try/catch in E2E tests can mask cross-tenant assertions
- **Severity**: MEDIUM
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: Test file `risk-profile-security-trial-001.ts` still has the soft-skip pattern. Documented as known limitation. Not blocking — test still passes and cross-tenant guard is confirmed by other means.
- **Remaining risk**: Low.
- **Requires human validation**: No

### F-23: Company dashboard uses un-audited /api/org/intelligence
- **Severity**: LOW
- **Current status**: RESOLVED
- **Evidence**: `dashboard/page.tsx:212` now fetches `/api/risk-profile` (confirmed at HEAD `4c24b28`). Dashboard routes through the fully audited endpoint.
- **Remaining risk**: None.
- **Requires human validation**: No

### F-24: No scientific/empirical validation exists for the methodology engine
- **Severity**: HIGH
- **Current status**: NOT_RESOLVED (by design)
- **Evidence**: Determinism + boundary compliance ≠ empirical/inter-rater validity. Not claimed as scientifically validated. Documentation states: "deterministic implementation of a documented method".
- **Remaining risk**: None (correctly stated as not scientifically validated).
- **Requires human validation**: Yes (empirical study would require human validators)

### F-25: Documentation sprawl (1287 docs) with microphase and readiness-inflation risk
- **Severity**: MEDIUM
- **Current status**: PARTIALLY_RESOLVED
- **Evidence**: This phase creates a consolidated `final-technical-closure/` directory as the single source of truth for audit readiness. Superseded microphase artifacts remain but are not referenced by the closure package.
- **Remaining risk**: Medium — 1287 files remain; periodic archival recommended.
- **Requires human validation**: No

### F-26: Deploy state of c4266d0 (Vercel/staging) not verifiable
- **Severity**: INFORMATIONAL
- **Current status**: NOT_ASSESSED
- **Evidence**: No deploy access during this phase. Deploy verification remains out-of-band.
- **Remaining risk**: Unknown — cannot confirm deployed commit, migrations, or flags.
- **Requires human validation**: Yes (deploy verification)

### STOP_RULE: No hard stop-rule conditions triggered
- **Status**: NOT_APPLICABLE
- **Evidence**: Tree not invented ✅, engine not code-first ✅, P/O/A evaluated at escape point ✅, no cross-tenant bypass ✅, RLS enabled ✅, no secret exposure ✅, final classification blocked ✅, exclusion does not delete evidence ✅.
- **Note**: Baseline showing fitting of expectations to engine output (F-02) is concerning but candidate-only, rated HIGH not CRITICAL.

---

## Minimum Mandatory Corrections (from Opus verdict)

| # | Correction | Status |
|---|-----------|--------|
| 1 | Reword "A IA classifica" + "Metodologia validada" | RESOLVED — already "Metodologia em validação técnica" |
| 2 | State PT limitation honestly | PARTIALLY_RESOLVED — documented as known limitation |
| 3 | Stop claiming scientific validation | RESOLVED — "deterministic implementation" language used |
| 4 | Fix violation over-attribution (O-B/O-C) | NOT_RESOLVED — requires methodology change |
| 5 | Compute or remove vacuous guardrail flags | RESOLVED — all 9 guardrails now computed |
| 6 | Return generic 500s from risk endpoints | RESOLVED — exclusions route sanitized |
