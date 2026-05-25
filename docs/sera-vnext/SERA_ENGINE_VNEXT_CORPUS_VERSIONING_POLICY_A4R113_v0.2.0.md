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

## A4R116 recovered-corpus policy application
- Version DeepSeek recovery metadata and manifests:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_FAILED_LINK_RECOVERY_A4R111_DEEPSEEK_v0.2.0.md`
  - `docs/sera-vnext/source-corpus/report-url-manifest/A4R111_FAILED_LINK_RECOVERY_DEEPSEEK.csv`
- Version recovered TXT files only when they contain usable extracted text.
- Keep recovered PDF/HTML files local-only under `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool/` unless explicitly approved later.
- Keep scanned or form-feed-only TXT placeholders local-only when the recovery report and CSV already preserve the OCR-required marker.
- Treat secondary-source-only TXT files as source-caveated corpus supplements; they require source-governance review before trace or expected-value use.

A4R116 does not change the storage policy into methodology authorization. Corpus inclusion does not authorize P/O/A closure, trace creation, release/downstream, or conversion of external report conclusions into SERA values.
