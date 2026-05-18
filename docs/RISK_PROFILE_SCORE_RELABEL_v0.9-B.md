# RISK Profile Score Relabel — v0.9-B

**Versão:** v0.9-B  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-B  
**Status:** Entregue — correção comunicacional, fórmula e API intocadas.

---

## Purpose

RISK v0.9-B addresses **F-001 (BLOCKER)** from the Risk Profile Methodology Audit v0.9-A.

The existing score was displayed with the label "Score de Risco" and sub-labels "Crítico / Atenção / Normal", but the underlying calculation mainly reflects analytical coverage/completeness across SERA P/O/A dimensions plus simple operational penalties. It does not directly measure organizational risk, severity, probability, exposure or Safety Issues.

**Example of the problem:** an organization where 100% of analyses are classified P-A/O-A/A-A (no failures) can produce a similar index value as one with 100% P-B/O-B/A-G (all severe failures), because the formula counts presence of a code, not its semantic severity.

---

## Decision

The UI now presents the value as **"Índice de Cobertura Analítica"**.

This is a **communication correction**, not a formula change.

---

## What was changed

| File | Change |
|---|---|
| `frontend/src/components/sera/OrgScoreCard.tsx` | Added card title "Índice de Cobertura Analítica"; replaced labels "Crítico/Atenção/Normal" with "Atenção operacional / Em acompanhamento / Perfil em formação" via a `COVERAGE_LABEL` map derived from the `level` prop; updated progress bar disclaimer text. |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | Two text references to "Score HFA" in the ARMS barrier reasoning panel replaced with "Índice de Cobertura". |
| `docs/RISK_PROFILE_SCORE_RELABEL_v0.9-B.md` | This document. |

### Label mapping

| Internal `level` | Old display | New display |
|---|---|---|
| `critical` | Crítico | Atenção operacional |
| `warning` | Atenção | Em acompanhamento |
| `ok` | Normal | Perfil em formação |

---

## What was NOT changed

- SERA causal motor (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures and baseline (`sera-v0.1.1`)
- API route `org/intelligence/route.ts` — field names and formula unchanged
- API JSON contract: `score.value`, `score.level`, `score.label` fields unchanged
- Score formula and thresholds
- ERC conversion / modal / presentation
- Matrices (traditional and ARMS)
- P/O/A logic

The API still returns `label: 'Crítico' | 'Atenção' | 'Normal'` — the UI overrides this via `COVERAGE_LABEL[level]` in the component. The `label` prop is retained in the interface for backwards compatibility but is no longer used for display.

---

## Methodological rationale

Organizational risk cannot be reduced to a single score based only on classification completeness. A defensible organizational risk profile requires:

1. Observed data (SERA analyses)
2. Recurrence patterns across P/O/A codes
3. Safety Issue candidates (systemic failures)
4. Operational exposure context
5. Temporal trend analysis
6. Explicit uncertainty communication

The index remains useful as an **operational indicator** of how actively and completely the organization is classifying events. It must not be interpreted as a direct measure of organizational risk.

**ISO 31000 / ISO IEC 31010 basis:** risk assessment techniques must be chosen according to the inference objective; a coverage proxy communicates something fundamentally different from a risk index. Communicating them as equivalent misleads users.

**Ordinal data caveat:** SERA P/O/A codes are ordered categorical variables. Treating them as linear numeric values without calibration introduces measurement-level errors. The current formula's weights (1.0 / 0.8 / 0.6) are undocumented approximations (F-010).

---

## Next recommended phase

**RISK v0.9-C — Safety Issue Candidates** (recommended if the goal is organizational diagnostic value during the 10-analysis trial), or alternatively:

**RISK v0.9-C — Score decomposition**: separate the index into its components (P/O/A coverage, overdue actions, volume) so users understand exactly what drives each dimension, rather than receiving a single opaque number.

---

## References

| Document | Relevance |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | Source of F-001 (BLOCKER) |
| `frontend/src/components/sera/OrgScoreCard.tsx` | Modified component |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | Minor text fixes |
| `frontend/src/app/api/org/intelligence/route.ts` | API unchanged — formula reference |
