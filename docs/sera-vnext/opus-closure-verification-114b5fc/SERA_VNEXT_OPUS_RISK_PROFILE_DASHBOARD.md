# SERA vNext — Risk Profile & Dashboard

## Endpoints

| Endpoint | Role | State |
|---|---|---|
| `/api/risk-profile` | canonical; legacy + vNext; exclusions; audited; generic 500 | PASS |
| `/api/org/intelligence` | delegates to same summary fn; generic 500 (`INTELLIGENCE_ERROR`) | OK (duplicate) |
| `/api/analyses/risk-profile` | **still present**; legacy-only, no vNext, no exclusions | **F-13 unresolved** |
| `/api/risk-profile/exclusions[/:id]` | admin-gated; generic 500 + request_id | PASS (F-14) |

Dashboard now fetches `/api/risk-profile` (`dashboard/page.tsx:212`) — **F-23 resolved** (audited endpoint). The divergent `/api/analyses/risk-profile` remains a latent inconsistency if any client calls it (F-13 partial).

## Source / version handling (F-08)

`risk-profile/server.ts` tags each row with `sourceFlow` (`LEGACY_SERA` default for legacy, `source_flow` else) and `engineRuntimeVersion`, and emits an explicit limitation when mixing:

> "Agregados combinam N análise(s) LEGACY_SERA e M análise(s) VNEXT: versões metodológicas distintas. Classificação: MIXED_VERSION_LIMITATION."

But distributions are **still pooled** into shared P/O/A counts. So the mixing is *disclosed* but not *eliminated* — aggregates may combine non-comparable code spaces. **F-08 partial.**

## Score / ERC / patterns

| Aspect | Verdict |
|---|---|
| Risk score (weights 1.0/0.8/0.6, /3*100) | F-09 partial — undocumented heuristic; copy tempered to "panorama descritivo" |
| ERC (`erc.ts`) | F-10 unresolved — 3 perception rows mapped, rest default 'C'; sparse heuristic labelled ARMS |
| Recurring patterns | thresholding still weak; gated behind n=10 "panorama" copy |
| Confidence / sample size | `data_confidence` + "X de 10 análises" gating present |

## Factual vs heuristic vs inferential — is the UI honest?

The risk-profile UI now frames outputs as **descriptive** and **non-final**:
- "Seu panorama descritivo está em formação"
- "Percepção, Objetivo e Ação — não final até revisão humana"
- "Candidatos a Safety Issue" (not asserted issues)
- "X de 10 análises para panorama descritivo"

This is a meaningful improvement (F-12). However the **score number and ERC level** are still rendered as if quantitative facts, without surfacing that the weights/ERC mapping are unvalidated heuristics. The distinction between *factual count*, *descriptive heuristic*, and *methodological inference* is **partially** clear: counts and candidate framing are honest; the score/ERC numerals still imply more rigor than exists.

## Dashboard parity

Dashboard and Risk Profile read the same canonical summary function, so **values are consistent between them** ("dashboard parity" claim holds for the audited endpoint). Parity does **not** mean the underlying numbers are methodologically validated.

## Verdict

Risk Profile / Dashboard: **PASS_WITH_WARNINGS.** Endpoint consolidation incomplete (F-13), version mixing disclosed-not-separated (F-08), score/ERC remain unvalidated heuristics (F-09/F-10); copy honesty much improved (F-12) and dashboard routed through the audited endpoint (F-23).
