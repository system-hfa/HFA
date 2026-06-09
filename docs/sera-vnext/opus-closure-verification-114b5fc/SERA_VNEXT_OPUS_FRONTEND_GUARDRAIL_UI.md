# SERA vNext — Frontend & Guardrail UI

Method: static read of `frontend/src/app/...`. No browser smoke run was performed in this read-only audit (no running environment was started); visual claims are therefore stated as **NOT visually verified** where they depend on rendering.

## vNext UI surface (admin-only)

`/admin/sera-vnext/`: `page`, `candidate`, `analyses`, `analyses/new`, `analyses/[id]`, `analyses/[id]/review`. There is **no vNext surface in the common (dashboard) analyze flow** — the common flow is legacy.

### Detail page (`analyses/[id]/page.tsx`)
Renders a rich `reviewerOutput`: per-axis cards with `candidateCode ?? 'Sem código candidato'`, escape-point `boundaryWarnings`, uncertainties, preconditions, decision guide, overall usefulness warning.

### Review page (`analyses/[id]/review/page.tsx`)
Per-axis candidate codes, escape-point boundary warnings, uncertainties, unanswered questions; reviewer enters P/O/A assessments.

### Candidate page (`candidate/page.tsx`)
Candidate codes per axis/path, human-review package, **Warnings list** (`result.warnings`), Uncertainties list.

## Guardrail visibility — the contested finding

| Layer | Present? | Evidence |
|---|---|---|
| Engine computes guardrails | ✅ | `compute-guardrails.ts` |
| Stored in `engine_output` | ✅ | create-analysis persists engine_output |
| Violations in `warnings` | ✅ | `collectWarnings` adds `GUARDRAIL_VIOLATED_<NAME>` |
| Audit payload lists violations | ✅ | `analysis.created` `guardrailViolations` |
| Admin UI shows violations | ⚠️ partial | only as text entries inside the generic **Warnings** list |
| Dedicated guardrail panel/explanation | ❌ | grep for "guardrail" in `app/**/*.tsx` -> 0 matches (only the API route returns it) |
| Common analyze flow shows guardrails | ❌ | no guardrail UI outside admin |

**Conclusion:** the engine output is integrated and guardrail *violations* are technically visible to an admin reviewer **as warnings text**, but there is **no first-class, labelled guardrail surface** explaining what each guardrail means or which evidence triggered it, and nothing in the common flow. **The "Guardrail UI pending" finding remains substantially active** (NF-02, MEDIUM). A structural test asserting the string exists would not change this — the user-facing explanation layer is missing.

## Other frontend states

- Loading / error / empty states: present in candidate/detail/risk-profile pages (e.g. "panorama descritivo está em formação" empty state).
- Labels: candidate-only / "não final até revisão humana" / source & version shown on vNext detail.
- Archive / restore / exclusion-restore: admin routes exist (`archive`, `restore`, exclusions `[exclusionId]`).
- Mobile: not assessed (no smoke run).

## Verdict

Frontend: **PASS_WITH_WARNINGS** for the admin vNext path (rich reviewer output, honest labels). Guardrail UI: **NOT_READY** — violations are buried in a warnings list, no dedicated/explained surface, absent from the common flow. Visual behavior NOT verified (no environment run).
