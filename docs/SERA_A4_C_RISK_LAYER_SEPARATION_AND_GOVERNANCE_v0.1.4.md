# SERA v0.1.4-A4-c - Risk Layer Separation and Governance

Status: normative documentation draft  
Scope: methodology architecture and validation governance  
Non-scope: engine patch, expected calibration, fixture promotion, UI/API change, risk algorithm change

## 1. Executive Decision

| Decision | Normative position | Operational consequence |
|---|---|---|
| Current `erc_level` | HFA Risk Layer legacy metadata. It is not an original causal SERA/Hendy axis. | It must not be used to claim original Hendy/SERA causal validity. |
| Causal SERA layer | Unsafe act/condition, Perception, Objective/Goal, Action, preconditions, causal explanation. | This layer should be frozen before risk-layer redesign. |
| HFA Risk Layer | Later/integrative layer containing traditional matrix, ARMS/ERC, legacy `erc_level`, Hendy tactical/strategic risk management concepts, action priority, and dashboard/risk profile presentation. | It needs its own methodology contract and validation gates. |
| Baseline blocking | `erc_level` should not block a causal P/O/A/preconditions baseline unless the phase explicitly includes risk-layer validation. | A candidate can be causal-pass while remaining risk-layer-hold. |
| A0-VIS-003 | Causal classification pass; risk-layer hold. | No engine patch and no expected change in A4-c. |
| `erc_question_trace` | Remains blocked. | Do not reopen until the risk layer is redesigned and governed. |

This phase separates the investigation/classification methodology from the product risk assessment layer. It does not remove `erc_level`, rename fields, change tests, or promote any baseline.

## 2. Documentary Evidence

| Source | Evidence read | Governance interpretation |
|---|---|---|
| Hendy PDF: `metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf` | Text search found no standalone `ERC` acronym and no `Error Recovery Characteristics` phrase. The document describes SERA as Systematic Error and Risk Analysis/Assessment, with unsafe act/condition, Goal, Perception, Action, active failures, preconditions, and risk management. | Hendy supports causal classification and risk management concepts, but not the current HFA `erc_level` as an original SERA/Hendy causal axis. |
| Hendy/SERA risk management sections | Hendy proposes tactical and strategic risk management tools based on SERA factors. The tools are conceptual/notional and require validation before product baseline use. | Hendy risk management belongs in a later risk layer, not in the causal classification baseline by default. |
| HFA Risk Profile baseline | `docs/RISK_PROFILE_BASELINE_v1.0-A.md` freezes Risk Profile as product/risk presentation and explicitly distinguishes legacy motor ERC, HFA ERC category, ARMS presentation, data confidence, and qualitative trend. | Existing HFA product already has a distinct risk layer that should be governed separately from causal classification. |
| A4-b candidate admission | 9/9 candidates passed P/O/A causal classification; 8/9 passed complete current scorer; A0-VIS-003 was held only because `erc_level` oscillated 3/3/2 vs expected 2. | A4-b demonstrates why causal admission and risk-layer admission must be reported separately. |

## 3. Current Inventory

### 3.1 SERA Causal Layer

| Area | Current artifacts | Role |
|---|---|---|
| Engine | `frontend/src/lib/sera/pipeline.ts`, `frontend/src/lib/sera/all-steps.ts`, `frontend/src/lib/sera/types.ts` | Produces Perception, Objective/Goal, Action, preconditions, causal explanation, and currently also `erc_level`. |
| Methodology docs | `docs/SERA_METHOD_CONTRACT_v0.1.4.md`, `docs/SERA_A4_METHODOLOGY_CONSOLIDATION_AND_BASELINE_READINESS_v0.1.4.md`, `docs/SERA_A4_B_CANDIDATE_ADMISSION_READINESS_v0.1.4.md` | Define current methodology contract and admission status. Some claims about ERC/Hendy require future correction. |
| Tests | `tests/sera/compare.ts`, `tests/sera/runner.ts`, `tests/sera/pipeline_adapter.ts`, `tests/sera/fixtures/schema.ts` | Current scorer treats P/O/A as critical causal fields and `erc_level` as a field that can downgrade overall PASS to PARTIAL. |

### 3.2 HFA Risk Layer Legacy

| Area | Current artifacts | Role |
|---|---|---|
| Legacy field production | `frontend/src/lib/sera/all-steps.ts`, `frontend/src/lib/sera/pipeline.ts` | `erc_level` is requested/derived in the SERA flow and has fallback inference. |
| Stored field | `supabase/migrations/20260510000000_add_erc_fields.sql` | Adds `analyses.erc_level`. |
| Completeness/trace references | `frontend/src/lib/sera/pipeline.ts`, `supabase/migrations/20260519000000_add_traceability_fields.sql` | Current completeness/trace contracts still include ERC semantics. This is a future separation issue. |
| Test contracts | `tests/sera/fixtures/schema.ts`, `tests/sera/compare.ts` | Expected fixtures include `erc_level`; current overall PASS requires ERC match. |

### 3.3 Traditional Matrix, ARMS/ERC, And Product Risk Profile

| Area | Current artifacts | Role |
|---|---|---|
| Legacy-to-HFA conversion | `frontend/src/lib/sera/erc-conversion.ts` | Converts legacy motor scale, where 1 is critical and 5 is minimal, to HFA visual category, where 5 is critical and 1 is acceptable. It explicitly states neither scale is ARMS Risk Index 1-2500. |
| Modal category | `frontend/src/lib/sera/erc-modal.ts` | Calculates modal HFA ERC category from raw `analyses.erc_level`. |
| ARMS presentation | `frontend/src/lib/sera/erc-presentation.ts` | Maps HFA ERC category to ARMS barrier-effectiveness column. |
| Qualitative trend | `frontend/src/lib/sera/risk-quality-trend.ts` | Builds observed distribution by HFA ERC category and explicitly does not estimate future probability, operational rate, or adjusted risk. |
| Product UI | `frontend/src/app/(dashboard)/risk-profile/page.tsx` | Presents traditional matrix, ARMS matrix, risk profile panels, caveats, and risk-layer views. |
| Product APIs | `frontend/src/app/api/org/intelligence/route.ts`, `frontend/src/app/api/org/ai-insight/route.ts`, `frontend/src/app/api/analyses/risk-profile/route.ts`, `frontend/src/app/api/risk-profile/route.ts` | Consume or describe `erc_level`, modal ERC, ARMS/ERC, ISO/ICAO-style matrix, HFA score, and risk profile outputs. |
| Product docs | `docs/RISK_PROFILE_BASELINE_v1.0-A.md`, `docs/RISK_PROFILE_DEMO_READINESS_v0.9-G.md`, `docs/PRODUCT_AUDIT_v0.2-A.md` | Freeze and describe existing Risk Profile as a product/risk layer, not external specialist validation. |

## 4. Layered Architecture

| Layer | Name | Contents | Baseline authority | Current status |
|---|---|---|---|---|
| 1 | SERA Investigation/Classification | Unsafe act/condition; Perception; Objective/Goal; Action; preconditions; causal explanation. | Hendy/Daumas plus formal HFA/SERA adaptations and official fixtures. | Candidate admission can proceed separately from risk layer. |
| 2 | HFA Risk Layer | Traditional risk matrix; ARMS/ERC; legacy `erc_level`; Hendy tactical/strategic risk factors; action priority; dashboard/risk profile inputs. | HFA product risk methodology plus future Hendy risk-management adaptation notes. | Not ready for broad baseline; requires redesign and validation. |
| 3 | Product Presentation | Reports; dashboards; caveats; executive summary; AI insight; product copy. | Product governance, caveat policy, and validated methodology labels. | Must avoid overstating ERC as original SERA/Hendy until redesigned. |

## 5. Consequence For A4-b

| Candidate set | Result | Decision |
|---|---:|---|
| Full current scorer admission | 8/9 ADMISSION_PASS | Eligible candidates may proceed toward causal baseline preparation only under causal gates. |
| P/O/A causal classification | 9/9 causal pass | No causal engine patch is justified by A4-b. |
| A0-VIS-003 | P-G/O-A/A-A stable; `erc_level` 3/3/2 vs expected 2 | ADMISSION_HOLD / RISK_LAYER_REVIEW, not causal failure. |
| FAIL/ERROR guardrail | 0 FAIL, 0 ERROR | Operational guard passed; baseline was not promoted. |

A4-b must not be used to claim complete risk-layer validation. It supports separation of causal admission from risk-layer admission.

## 6. Consequence For Baseline

### 6.1 Causal Classification Baseline

| Item | Requirement |
|---|---|
| Scope | Unsafe act/condition, P/O/A, preconditions, causal explanation. |
| Excludes by default | `erc_level`, ARMS/ERC, traditional matrix, HFA risk score, dashboard risk profile. |
| Minimum gate | PASS=100% for causal fields, PARTIAL=0 for causal scoring, FAIL=0, ERROR=0, deterministic causal outputs across approved N_RUNS=3, and human review of ambiguous cases. |
| Required tooling change before final freeze | A causal-only scorer or explicit causal baseline report is needed so legacy risk fields do not obscure causal validity. |

### 6.2 Risk Layer Baseline

| Item | Requirement |
|---|---|
| Scope | Traditional matrix, ARMS/ERC, HFA risk category/legacy `erc_level`, Hendy tactical/strategic risk management, action priority, risk profile presentation. |
| Minimum gate | Separate risk methodology contract, explicit scale definitions, calibration cases, product caveats, deterministic conversion helpers, and specialist/human review before claiming baseline. |
| Current status | Not ready for broad baseline in v0.1.4-A4-c. |

Baseline governance must distinguish release guard, methodology gate, causal baseline gate, risk-layer baseline gate, product readiness, and scientific/methodological confidence.

## 7. Future Code Contract

A4-c changes no code. The following is a future target architecture, not an implementation instruction for this phase:

| Future field | Purpose |
|---|---|
| `risk_layer.legacy_erc_level` | Preserve current motor/test metadata without presenting it as original SERA/Hendy causal axis. |
| `risk_layer.traditional_matrix` | Hold traditional probability/severity or equivalent product matrix outputs. |
| `risk_layer.arms` | Hold ARMS/ERC-derived fields with explicit ARMS semantics and limitations. |
| `risk_layer.sera_risk_management` | Hold Hendy/SERA tactical/strategic risk-management factors after adaptation and validation. |
| `risk_layer.confidence` | Hold data/method confidence indicators separate from risk level. |

Future refactors must preserve backward compatibility for existing reports and analyses unless a migration plan explicitly replaces it. `erc_question_trace` remains blocked until the risk layer has a validated contract.

## 8. Future Documentation Corrections

| Document | Required future correction | Priority |
|---|---|---|
| `docs/SERA_METHOD_CONTRACT_v0.1.4.md` | Remove or qualify any claim that ERC / Error Recovery Characteristics is directly derived from Hendy. Reclassify ERC as HFA Risk Layer legacy/product metadata unless future evidence proves otherwise. | High |
| `docs/SERA_A4_METHODOLOGY_CONSOLIDATION_AND_BASELINE_READINESS_v0.1.4.md` | Update passages that describe ERC as a direct Hendy dependency or as a SERA axis equivalent to P/O/A/preconditions. | High |
| `frontend/src/lib/sera/rules/BASELINE.md` | Separate causal classification baseline from risk-layer baseline, and stop using a single PASS definition that hides this distinction. | High |
| `docs/SERA_QUESTION_TRACE_DESIGN_v0.1.4.md` and ERC trace docs | Mark ERC trace work as experimental/rejected until risk-layer redesign. | Medium |
| Product docs/copy | Avoid claims such as "original SERA ERC" or "Hendy ERC" until the risk layer is redesigned and validated. | High |

No existing document is edited in A4-c; this table defines future work.

## 9. Adjusted Roadmap

| Phase | Objective | Exit criteria |
|---|---|---|
| A4-d - Causal Baseline v0.1.4 Freeze Preparation | Prepare a causal-only baseline path for P/O/A/preconditions and causal explanation. | Causal scorer/report policy defined; candidates classified without legacy risk-layer blocking. |
| A5 - Risk Layer Redesign: Traditional Matrix + ARMS + Hendy Risk Management | Redesign the risk layer as a separate methodology with scale definitions and integration rules. | Risk-layer contract, calibration fixtures, and validation gates approved. |
| A6 - Product Risk Presentation and Caveats | Align UI/API/report language with the separated risk architecture. | Product copy, dashboards, reports, and caveats avoid overstated methodology claims. |
| A7 - Final Validation / Release Candidate | Validate causal baseline and risk-layer presentation together under explicit gates. | Release candidate report distinguishes causal confidence, risk-layer confidence, and product readiness. |

## 10. Residual Risks

| Risk | Why it matters | Mitigation path |
|---|---|---|
| Current scorer still includes `erc_level` in overall PASS | Causal-pass candidates can appear as PARTIAL when only risk layer differs. | A4-d should define causal-only scoring or separate report columns. |
| `analysis_completeness` and trace contracts include ERC semantics | Completeness can still imply ERC is part of the core SERA result. | Future code and schema contract review. |
| Existing docs contain direct Hendy/ERC claims | Methodology can be overstated if older docs are cited unqualified. | Future doc correction table above. |
| Product already exposes ARMS/ERC/risk profile language | Users may infer validated risk assessment beyond current evidence. | A6 product caveat and presentation review. |
| Preconditions selector references `erc_level` | Causal and risk layers are not fully isolated in implementation. | Future technical design must decide whether this is acceptable legacy coupling or requires refactor. |
| Historical reports and fixtures include `erc_level` expected values | Backward compatibility and baseline reproducibility may conflict with new methodology separation. | Preserve legacy data, but label it as risk-layer metadata in future reports. |

## 11. Non-Actions In This Phase

- No engine changes.
- No `pipeline.ts`, `all-steps.ts`, `types.ts`, `objective/select.ts`, or `BASELINE.md` changes.
- No candidate JSON, expected, fixture, baseline, risk algorithm, ARMS, traditional matrix, UI, API, or report changes.
- No `erc_question_trace` implementation.
- No N_RUNS=3 or smoke global execution.
- No commit and no push.
