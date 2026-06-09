# SERA vNext — Documentation & Governance Audit (c4266d0)

## Scale

`docs/sera-vnext/` contains **1,287 markdown files** (plus a large source/reference corpus and prior audit folders). The naming is dominated by sequential microphase tags (`A4R73`, `A4R74`, … `A4R217+`) with many `…_v0.2.0.md` variants and repeated "readiness/audit/reconciliation/freeze" reports.

## Findings

- **F-25 (MEDIUM) Documentation sprawl & readiness inflation.** The volume and microphase granularity make it impossible to identify the current authoritative state. Multiple documents assert "freeze", "closed", "ready", and "validated" at different points; later phases supersede earlier ones without the earlier ones being archived. This is the "microfases redundantes / readiness inflation / status inconsistente" pattern.
- **Conflicting status claims.** "methodology closed", "engine v0.1 validated", "Product Beta ready", "human pilot ready", "Risk Profile real data ready" appear across phase docs. Per this audit, several are overstated (see Claims Matrix): the methodology is *represented*, not *scientifically validated*; the engine is *boundary-validated*, not *accuracy-validated*; readiness is *controlled-pilot*, not *production*.
- **Positive: the canonical asset is well-sourced.** `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` is a genuine, cited mapping (Daumas, Hendy) and matches the code. This is the kind of living-state document the rest of the corpus should converge to.
- **Path/model references.** Node `sourcePath` in code points to the asset doc (exists). No references to a nonexistent model were found in the audited engine scope. O-E is consistently forbidden in both doc and code. No "invented questions" found (tree matches the asset).
- **Generated reports versioned in-repo.** `tests/sera-vnext/engine-validation-v01/reports/*` are committed generated artifacts; re-running the harness would overwrite them (this audit deliberately did **not**). Generated artifacts in version control add churn.

## Consistency across docs / code / tests / DB / frontend copy

| Dimension | State |
|---|---|
| Canonical tree (doc ↔ code) | **Consistent** (faithful encoding) |
| Engine candidate-only (code ↔ DB ↔ docs) | **Consistent** (locks everywhere) |
| "Methodology validated" (docs/copy ↔ evidence) | **Inconsistent** — overclaim (F-24, F-12) |
| "AI classifies" (frontend copy ↔ candidate-only) | **Inconsistent** (F-12) |
| Risk endpoints (code) | **Inconsistent** — 3 overlapping endpoints (F-13) |
| Legacy vs vNext engine (docs imply vNext is the product) | **Inconsistent** — live user path is legacy `/api/analyze` (F-07) |

## Proposed simplified documentation structure

Replace the 1,287-file sprawl with a small **living-state** set, archiving the rest:

```
docs/sera-vnext/
  STATE.md                     # single source of truth: versions, flags, what is live, readiness matrix
  METHODOLOGY.md               # the canonical method + the asset doc reference (authoritative)
  CANONICAL_TREE_ASSET.md      # = current A4R99 asset (keep)
  ENGINE.md                    # how engine-v0 works + known limitations (F-03..F-06)
  PRODUCT_BETA.md              # contracts, locks, status model
  RISK_PROFILE.md              # consolidation rules, exclusion semantics, aggregate caveats
  VALIDATION.md                # what 39/39 means and does not mean
  RUNBOOK.md                   # flags, deploy, migrations, pilot checklist
  archive/                     # all A4R### microphase + superseded readiness/audit docs (read-only)
```

Rule: any "ready/validated/closed" claim lives only in `STATE.md` and must cite evidence.

## Governance verdict

**DOCUMENTATION_GOVERNANCE = PASS_WITH_WARNINGS (process), with a MEDIUM debt (F-25).** The canonical methodology asset is exemplary; the surrounding corpus is unmanageable and contains readiness/validation overclaims that should be corrected and archived. No fabricated canonical content was found in the engine scope.
