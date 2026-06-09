# SERA vNext — UI Terminology Contract

**Date**: 2026-06-09

## Standardized Terms

| Term | Used In | Definition |
|------|---------|------------|
| Análise SERA vNext | Detail page, list | Candidate-only analysis produced by vNext engine v0.2.0 |
| Hipótese não final | Detail page, export | Analysis is a candidate hypothesis, not a final classification |
| Revisão humana obrigatória | Review page | Human reviewer must confirm/adjust before any downstream use |
| Guardrail | Detail, review, export | Methodological safety check (e.g., consequenceUsedAsCause) |
| Precondição | Detail, export | Contextual factor present before the escape point |
| Ponto de fuga | Detail | Moment the operation stopped being safe |
| Panorama descritivo | Risk Profile, Dashboard | Descriptive aggregation of analyses (not organizational diagnosis) |
| Em formação | Risk Profile zero-state | Insufficient data for stable patterns |
| Fonte da análise | Risk Profile, detail | Which engine produced this analysis (legacy SERA or vNext v02) |
| Versão do motor | Risk Profile, detail | Engine runtime version (e.g., 0.2.0) |
| Em validação técnica | Landing page | Methodology badge — deterministic implementation, not scientifically validated |

## Prohibited Terms

| Term | Reason |
|------|--------|
| Diagnóstico | Implies clinical/organizational diagnosis |
| Perfil organizacional | Implies validated organizational assessment |
| IA classifica | Implies autonomous AI classification |
| Metodologia validada | Implies scientific validation |
| Production ready | Not true for candidate-only mode |

## Fixed in this phase

| File | Old text | New text |
|------|----------|----------|
| `risk-profile/page.tsx:1665` | "Seu perfil organizacional está em formação" | "Seu panorama descritivo está em formação" |
| `risk-profile/page.tsx:1716` | "diagnóstico completo" | "panorama descritivo" |
| `page.tsx:260` | Already "Metodologia em validação técnica" | (no change needed) |

## Endpoint terminology

| Endpoint | Label |
|----------|-------|
| `/api/risk-profile` | Canonical — fully audited |
| `/api/org/intelligence` | Deprecated alias — delegates to canonical |
| `/api/analyses/risk-profile` | Legacy-only — diverges (no vNext, no exclusions) |
