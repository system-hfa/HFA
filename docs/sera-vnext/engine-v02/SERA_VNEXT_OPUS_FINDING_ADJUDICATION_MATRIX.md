# SERA vNext Opus Finding Adjudication Matrix

Scope: adjudication of `docs/sera-vnext/opus-comprehensive-audit-c4266d0/` against code at the start of this macrophase (`c4266d0`) and the v02 corrections in this commit.

Opus artifacts present: 18/18. Reports were versioned unchanged.

| finding_id | opus_severity | opus_claim | confirmed_in_code | partially_confirmed | not_confirmed | evidence | decision | action_in_this_macrophase | deferred_reason | author_decision_required |
|---|---:|---|---|---|---|---|---|---|---|---|
| F-01 | HIGH | 39/39 is boundary compliance, not accuracy. | yes | no | no | `engine-validation-v01/compare-output.ts`, expected null allowances. | Confirmed. | Added v02 independent validation with code-required cases and separate metrics. | none | no |
| F-02 | HIGH | Expected outputs were fitted around engine output. | yes | no | no | v01 expected `allowedCodes`/`nullCodeAllowed`. | Confirmed. | Added frozen v02 manifest before execution. | empirical gold set still future. | yes, for future human gold set |
| F-03 | HIGH | 8 canonical leaves were unreachable. | yes | no | no | `canonical-tree/evaluate-node.ts` lacked branches for P-D/P-E/P-F/P-G/P-H/A-B/A-F/A-G. | Confirmed. | Added bilingual concept branches and reachability positive/negative tests for 22 leaves. | none | no |
| F-04 | HIGH | O-B/O-C over-attributed without awareness. | yes | no | no | `O_RULES`/`O_ROUTINE` continuation regexes. | Confirmed. | O-B/O-C now require known rule, explicit awareness, and conscious deviation. | none | yes, rule wording |
| F-05 | HIGH | P/O/A logic was English-only while product locale is pt-BR. | yes | no | no | `evaluate-node.ts` English regexes; product uses `pt-BR`. | Confirmed. | Added centralized pt-BR/en concept matcher and evidence tags. | none | no |
| F-06 | MEDIUM | Guardrails were hardcoded false. | yes | no | no | `engine-v0/steps/10-assurance.ts`. | Confirmed. | Added computed guardrails plus evidence traces. | detector refinement will continue. | no |
| F-07 | HIGH | Live user path is legacy `/api/analyze`, not vNext. | yes | yes | no | API/product data-flow audit; product beta imports vNext separately. | Confirmed as architectural split. | Added architecture decision doc; full migration deferred. | product migration is Macrophase 2. | yes |
| F-08 | MEDIUM | Risk Profile pools legacy and vNext codes. | yes | no | no | `risk-profile/server.ts` aggregate model. | Confirmed. | Documented decision and claim limits. | risk-layer redesign outside causal engine v02. | yes |
| F-09 | MEDIUM | Risk score/patterns over-claim risk intelligence. | yes | yes | no | risk score/pattern copy and heuristics. | Confirmed. | Tempered visible copy where in scope. | risk-layer code out of causal scope. | yes |
| F-10 | MEDIUM | ERC mapping is sparse heuristic. | yes | no | no | `risk-profile/erc.ts`. | Confirmed. | Documented limitation. | A5 Risk Layer future scope. | yes |
| F-11 | MEDIUM | Trial count dominated by static guards. | yes | no | no | `tests/sera-vnext/*.ts` scan. | Confirmed. | v02 reports behavioral metrics separately. | suite consolidation deferred. | no |
| F-12 | HIGH | Public/dashboard copy overstates AI classification/validation. | yes | no | no | `app/page.tsx`, `risk-profile/page.tsx`. | Confirmed. | Reworded to hypotheses/review and technical validation. | historical docs not mass-edited. | no |
| F-13 | MEDIUM | Three risk endpoints diverge. | not changed | yes | no | API scan. | Confirmed. | Documented in product engine decision. | Risk endpoint consolidation deferred. | yes |
| F-14 | MEDIUM | Risk endpoints leak raw errors. | not changed | yes | no | API scan. | Confirmed. | Documented only. | API security changes outside this causal engine correction. | no |
| F-15 | LOW | Dead overlapping engine pipeline. | yes | no | no | `sera-vnext/engine.ts` plus old steps. | Confirmed. | Documented; no removal. | removal would break older trials. | no |
| F-16 | LOW | tree metadata synthesized. | yes | no | no | `canonical-tree/sera-pt-v1.ts`. | Confirmed. | Documented; canonical question text untouched. | metadata sourcing future hygiene. | no |
| F-17 | LOW | O_MANAGED_RISK PT polarity confusing. | yes | no | no | `canonical-tree.ts`. | Confirmed. | Documented only. | canonical text change needs author approval. | yes |
| F-18 | MEDIUM | Escape heuristic coarse. | yes | no | no | `candidate-escape-window.ts`. | Confirmed. | Guardrails/validation document limits. | broader escape redesign deferred. | yes |
| F-19 | LOW | exclusion RLS lacks role/source FK depth. | not assessed | yes | no | Supabase migration audit. | Deferred. | No DB schema change. | protected DB schema. | yes |
| F-20 | LOW | beta JWT helper search_path. | not assessed | yes | no | Supabase migration audit. | Deferred. | No DB schema change. | protected DB schema. | yes |
| F-21 | LOW | A_CAPABILITY defaulted to SIM. | yes | no | no | `evaluate-node.ts`. | Confirmed. | Capability now requires positive evidence before A time-pressure branches. | none | no |
| F-22 | MEDIUM | soft-skip E2E can mask tenant checks. | not changed | yes | no | `risk-profile-security-trial-001.ts`. | Deferred. | Documented. | risk/security suite outside engine v02. | no |
| F-23 | LOW | dashboard uses unaudited org intelligence endpoint. | not changed | yes | no | dashboard endpoint audit. | Deferred. | Documented. | product endpoint work deferred. | yes |
| F-24 | HIGH | no scientific/empirical validation exists. | yes | no | no | v01 validation type and public copy. | Confirmed. | Removed/qualified validation claims; v02 says PASS_WITH_LIMITATIONS. | empirical/inter-rater study future. | yes |
| F-25 | MEDIUM | documentation sprawl/readiness inflation. | yes | no | no | docs count and historical A4R docs. | Confirmed. | Added concise v02 living docs. | archive cleanup deferred. | no |
| F-26 | INFO | deploy state not assessed. | yes | no | no | no deploy/staging check in audit. | Confirmed. | Documented. | external environment verification required. | yes |

Priority findings resolved in code/copy/tests: F-01, F-02, F-03, F-04, F-05, F-06, F-12, F-21, F-24.

F-07 decision: vNext product beta/admin path is canonical for future SERA methodology; legacy `/api/analyze` remains current common-user path until Macrophase 2 migration. It must not be advertised as vNext.
