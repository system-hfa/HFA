# SERA Engine vNext Corpus Versioning Policy A4R113 v0.2.0

Status: ACTIVE_POLICY  
Scope: source-corpus hygiene and versioning boundaries

## Version by default
- CSV files (candidate lists, URL manifests, corpus manifests)
- TXT files (text-extracted corpus used for mining)
- Markdown governance/audit docs
- directory manifests that describe local archive composition

## Local-only by default
- PDF and HTML report binaries under `docs/sera-vnext/source-corpus/official-reports/**`
- local logs and candidate run outputs

## Size and safety rules
- Do not version files larger than 90MB.
- For binary source-report pools:
  - keep binaries local-only unless a small curated subset is explicitly approved;
  - keep TXT/CSV/manifest companions versioned for reproducibility.
- Never version nightly logs or noisy candidate outputs.

## A4R113 repository decision
- Keep `a4r111-full-pool` and `a4r111-new50-pool` PDF/HTML binaries as local-only archive.
- Preserve and version:
  - `a4r111-full-pool-txt/`
  - `a4r111-new50-pool-txt/`
  - `A4R111*_MANIFEST.csv`
  - consolidated URL manifests
  - candidate CSV lists

## Ignore targets aligned with this policy
- `tests/reports/candidates/*.json`
- `tests/reports/nightly/*.log`
- `docs/sera-vnext/source-corpus/official-reports/**/*.pdf`
- `docs/sera-vnext/source-corpus/official-reports/**/*.html`

## Methodological guardrail
This policy governs storage hygiene only. It does not authorize:
- P/O/A closure;
- release/downstream creation;
- canonical-tree changes;
- conversion of report conclusions/HFACS labels into SERA expected values.
