# SERA vNext — A4R202-OPUS-SUPPLEMENTAL
## Calibration Closure, Synthetic Fill & Future Baseline Criteria Audit

**Date:** 2026-06-02  
**Status:** Independent methodological audit (candidate-only, no promotion authorized)  
**Auditor:** Claude Opus  

---

## 1. Veredito geral

**`CALIBRATION_CLOSURE_PASS_WITH_WARNINGS`**

Rationale: the methodological discipline is genuinely strong — escape-point anchoring is consistent, locks are preserved across every phase, the candidate-only lane is intact, and three real events now carry explicit author approval for candidate-only review without any leakage into final P/O/A or promotion. Nothing is methodologically *broken* (so not `REQUIRES_CORRECTION` or `BLOCKED`). It is not a clean `PASS` for two reasons: (a) the corpus is viable for *review* but not yet a *calibrator* — synthetics are at zero materialization and several methodological families have no isolating case; (b) governance has proliferated to a scale (1081 docs, 50 readiness plans, 93 logs, 28 next-phase decisions, 47 gate files) that now creates a real risk of mistaking documental review for methodological validation.

---

## 2. Minimum corpus readiness verdict

**`MINIMUM_CORPUS_PARTIALLY_READY`**

Split explicitly:
- **For candidate-only *method review*** → ready now. Comair 5191, Asiana 214, UPS 1354 are author-approved (`AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`); G-WNSB and Execuflight 1526 are second-lane ready-with-limitation. `MINIMUM_CORPUS_READY_FOR_CANDIDATE_ONLY_REVIEW` holds for this narrow purpose.
- **For a minimum *calibrator* corpus** → not yet. Negative controls exist (Delta 191, USAir 427, 5N-BQJ) but two trap-isolating synthetic families (consequence-as-cause, agent migration) are unmaterialized, and the Daumas human-reference lane is planned but not extracted.

### Task-1 answers (closure criteria):

| # | Question | Answer |
|---|---|---|
| 1 | Strong reals to *start* calibrator | 3–5. We have 5 candidates (3 approved + 2 second-lane). **Sufficient to start.** |
| 2 | Negative controls needed | 2–3. Have 3 (Delta 191, USAir 427, 5N-BQJ). **Sufficient.** |
| 3 | Boundary cases needed | 2–3. Partially covered (USAir 427 / 5N-BQJ technical-human boundary; G-WNSB domain boundary). **Partial.** |
| 4 | Synthetics needed | Minimum 2 (GAP-004 consequence-as-cause, GAP-002 agent migration). GAP-001 PF/PM already a retained controlled draft. |
| 5 | Families required *before* any baseline talk | escape-point anchoring; consequence-as-cause isolation; agent-migration isolation; PF/PM separation; direct-actor preservation; technical/human boundary (negative control); perception & action evidence lanes. |
| 6 | Families OK to defer | offshore/SAR/training helicopter human-dominant; automation/mode-awareness depth; organizational boundary; CRM cross-check nuance; objective/goal ambiguity edge cases. |
| 7 | "Good enough now" for candidate-only review | Comair 5191, Asiana 214, UPS 1354 (approved); G-WNSB, Execuflight 1526 (second lane). |
| 8 | Should consume **no more** effort | Vigo (replace unless CIAIAC recovered); N109W / N11NM (frozen HOLD); Turkish 1951 (YouTube ≠ primary); C-030 (reject); Delta 191 / USAir 427 / 5N-BQJ (settled as negative controls — stop re-extracting). Colgan 3407: one focused re-audit only, no open-ended effort. |

**Search posture:** `STOP_SEARCHING_REAL_EVENTS_FOR_NOW` (broad). `CONTINUE_REAL_EVENT_SEARCH` only narrowly, for at most two named gaps (clean human-dominant helicopter/offshore beyond G-WNSB; clean CFIT with unambiguous chronology) — and even those are more cheaply served by synthetics. State summary: `REAL_EVENT_COVERAGE_PARTIAL` + `SYNTHETIC_FILL_REQUIRED` + `DAUMAS_CALIBRATION_REQUIRED`; `NEGATIVE_BOUNDARY_CONTROLS_REQUIRED` is **partially satisfied** (present, but not extracted to Batch-1 depth).

---

## 3. Event category criteria table

| category | minimum_requirements | allowed_next_action | forbidden_next_action | blocking_risks |
|---|---|---|---|---|
| STRONG_REFERENCE_CANDIDATE | Official traceable source + locator; chronology locating escape point; direct actor attributable at escape; pre-escape + at-escape evidence; fact/conclusion separated; outcome-bias & agent-migration **LOW–MEDIUM**; serves ≥1 active gap | Candidate-only method review; author dossier | Final P/O/A; escape-point approval; READY; fixture/baseline | Source becomes non-primary; escape point not locatable without outcome hindsight |
| PROCEED_WITH_LIMITATION | Same as strong **except** one dimension at MEDIUM-HIGH risk (e.g. technical-dominance, automation-state coupling) with the limitation named | Candidate-only review **with explicit written limitation**; second-lane intake | Treating limitation as resolved; single-actor closure where PM lane is material | Limitation silently dropped in review; technical framing displaces cockpit actor |
| BOUNDARY_CASE_ONLY | Real chronology but causal onset sits on technical/human or domain boundary; used to test where the method *should not* assign a human anchor | Use as method boundary probe; cross-case contrast | Use as a positive human-factors exemplar; baseline candidacy | Mislabeled as positive case; boundary smeared into human attribution |
| NEGATIVE_CONTROL_ONLY | Onset technical/environmental with strong evidence; correct method answer is "no human escape-point anchor" | Use to verify method *refuses* a false human anchor | Forcing a human P/O/A; counting toward positive coverage | Reactivation as positive case; outcome severity pulling a human label |
| HOLD | Event of interest but source insufficient / escape point not yet locatable / actor unsupported | `SOURCE_CLOSURE_GATE` recovery assessment **only** | READY; classification; any promotion from HOLD | Promotion before source closure; relative-date drift; silent reactivation |
| DISCARD_OR_REPLACE | Journalistic/secondary-only source; no usable chronology; unusable locator; value only from severity/outcome | Remove from active queue or replace with official-locator equivalent | Any extraction effort; any reference use | Sunk-cost re-extraction; contaminated-URL leakage into corpus |

Current mapping: Comair 5191 → STRONG; Asiana 214, UPS 1354, G-WNSB, Execuflight 1526 → PROCEED_WITH_LIMITATION; USAir 427, 5N-BQJ → BOUNDARY; Delta 191 → NEGATIVE_CONTROL; Colgan 3407 → HOLD-equivalent (`ESCAPE_POINT_REAUDIT_REQUIRED`); Vigo, N109W, N11NM, Turkish 1951, C-030 → DISCARD_OR_REPLACE / frozen.

---

## 4. Candidate-only review criteria table

| evidence_dimension | mandatory_or_desirable | minimum_threshold | missing_means | allowed_status_if_missing |
|---|---|---|---|---|
| Source officiality | mandatory | Primary, or secondary-official with caveat | Not reviewable | DISCARD_OR_REPLACE / HOLD |
| Source locator | mandatory | Verifiable document/locator reference | Untraceable | HOLD |
| Timeline sufficiency | mandatory | Enough chronology to locate escape point | Escape point not anchorable | HOLD |
| Candidate escape point | mandatory | One stated "quando…" anchor before any outcome | No defensible anchor | ESCAPE_POINT_REAUDIT_REQUIRED |
| Direct actor | mandatory | Attributable actor at escape instant | Anchor floats across agents | HOLD |
| PF/PM or role attribution | mandatory *when applicable* | Control vs monitoring lane separable | Risk of collective fallback | PROCEED_WITH_LIMITATION |
| Callout/communication | desirable | Evidenced where present | Weaker monitoring-lane read | PROCEED_WITH_LIMITATION |
| Warning/alert | desirable | Mechanism evidenced per actor | Late warning-anchoring risk | PROCEED_WITH_LIMITATION |
| Procedure/SOP | desirable | Relevant gate identified (e.g. 500 ft, MDA) | Gate-vs-act ambiguity | PROCEED_WITH_LIMITATION |
| Aircraft/system state | desirable | Configuration/automation state at escape | Automation-coupling ambiguity | PROCEED_WITH_LIMITATION |
| Technical/environmental context | desirable | Enough to separate tech vs human onset | Boundary unclear | BOUNDARY_CASE_ONLY |
| Perception evidence lane | mandatory | Evidence of recognition/non-recognition at escape | Perception inferred only | PROCEED_WITH_LIMITATION (note inference) |
| Objective/goal evidence lane | mandatory | Operational goal reconstructable at escape | Goal speculative | PROCEED_WITH_LIMITATION |
| Action evidence lane | mandatory | Concrete act/omission at escape | No anchorable act | HOLD |
| Precondition evidence lane | desirable | Preconditions delimitable without classifying | Coupled to context | PROCEED_WITH_LIMITATION |
| Outcome quarantine | mandatory | Post-escape consequence explicitly fenced | Consequence-as-cause risk | **HOLD until re-audit** |
| External conclusion quarantine | mandatory | Report probable-cause not used as expected value | Borrowed-conclusion contamination | **HOLD until re-audit** |
| Daumas comparison (if applicable) | desirable | Used only as human-method reference | None lost; never factual substitute | proceed without it |

"When to hold": hold whenever **any mandatory** dimension is below threshold, **or** when outcome/external-conclusion quarantine cannot be demonstrated — these two are non-negotiable because they protect the central escape-point rule.

---

## 5. Future fixture/baseline gate table

*(Defining future criteria only — `NOT_AUTHORIZED_NOW` for all.)*

| gate_name | required_for_fixture | required_for_baseline | minimum_requirement | blocking_condition | status_now |
|---|---|---|---|---|---|
| SOURCE_TRACEABILITY_REQUIRED | yes | yes | Primary official locator per case | Any secondary-only / contaminated URL | Partially met (Asiana needs NTSB official locator; backlog open) |
| HUMAN_AUTHOR_DECISION_REQUIRED | yes | yes | Explicit per-case author authorization text | No written authorization | Met for candidate-only review only; NOT for fixture/baseline |
| ESCAPE_POINT_STABILITY_GATE | yes | yes | Candidate escape point survives focused re-audit | Rival anchor equally defensible | Not met (Colgan open; others candidate-only) |
| INTER_RATER_OR_CONSENSUS_REQUIRED | desirable | **yes** | ≥2 independent reviewers agree on escape point + actor | Single-reviewer closure | Not started |
| OUTCOME/CONCLUSION QUARANTINE PROOF | yes | yes | Demonstrated no post-escape/borrowed-cause leakage | Any consequence-as-cause | Held as lock, not yet case-certified |
| SYNTHETIC/REAL SEPARATION | yes | yes | Folder/lane labeling; no blending | Shared expected values | Met (policy) |
| FUTURE_FIXTURE_GATE_REQUIRED | yes | — | Author release text + re-audit + quarantine proof | Missing any of the three | NOT_AUTHORIZED_NOW |
| FUTURE_BASELINE_GATE_REQUIRED | — | yes | All fixture gates **plus** inter-rater consensus **plus** family coverage | Any family uncovered | NOT_AUTHORIZED_NOW |
| NO_DOWNSTREAM_WITHOUT_RELEASE_GATE | yes | yes | No selectedCode/releasedCode/finalConclusion absent release gate | Any active downstream output | Enforced |

### Task-4 direct answers:
1. **Candidate → fixture:** needs author release text + escape-point re-audit pass + demonstrated quarantine
2. **Baseline:** additionally needs inter-rater consensus + family coverage
3. **Number of raters:** ≥2 independent raters for baseline (1 acceptable for a single fixture)
4. **Keeping lanes separate:** keep Daumas / real / synthetic in separate labeled lanes with no shared expected values
5. **Indispensable gates:** source traceability, escape-point stability, quarantine proof, human release
6. **Redundant gates:** the duplicated per-phase "readiness plan + log + next-phase decision" triple (governance, not methodology)
7. **Auto-blockers:** consequence-as-cause, unresolved escape-point rivalry, unresolved external conclusion contamination, absent author release text

---

## 6. Daumas extraction plan

*(Design only — `DAUMAS_HUMAN_METHOD_REFERENCE`; never factual source for real events; never auto-reentry/baseline.)*

| artifact | objective | input | output | permitted_use | prohibited_use | priority |
|---|---|---|---|---|---|---|
| Daumas methodological pattern extraction | Capture how an expert frames analysis at the escape point | Daumas docs | Pattern catalogue (anchoring, actor boundary, fact/conclusion split) | Calibrate reviewer reasoning; selection-criteria refinement | New real-event facts; classification | **P1** |
| Daumas P/O/A reasoning examples | Show worked P/O/A *reasoning shape* (not verdicts) | Daumas docs | Annotated reasoning exemplars | Reviewer training; synthetic design language | Expected values for real/synthetic cases | P1 |
| Daumas evidence-depth checklist | Define "enough decision-context granularity" | Daumas + A4R201-C depth note | Checklist applied during candidate review | Triage source sufficiency | Promote thin cases | P2 |
| Daumas vs Hendy mapping | Locate Daumas under Hendy precedence | Hendy + Daumas | Concordance + precedence notes (Hendy wins conflicts) | Conceptual grounding | Override Hendy causal logic | P2 |
| Daumas vs SERA vNext divergence register | Record where field operationalization diverges from contract | Daumas + method contract | Divergence register | Flag method-contract refinement candidates | Silently alter baseline/runtime | P3 |
| Daumas synthetic design support note | Inform trap design without contaminating | Daumas patterns + gap pack | Guardrail notes for GAP-004/002 | Make synthetics realistic-but-clean | Copy Daumas content into synthetic expected values | P3 |

---

## 7. Synthetic fill roadmap

| gap_or_family | current_real_event_coverage | Daumas_coverage | synthetic_needed | recommended_synthetic_type | priority | notes |
|---|---|---|---|---|---|---|
| Consequence-as-cause | Weak/indirect (American 965, Delta 191, USAir 427, 5N-BQJ — mostly controls) | Strong (anchoring patterns) | **Yes** | TYPE-08_OUTCOME_TRAP | **P1** | Reals can't *cleanly isolate* the trap; this is the keystone synthetic |
| Agent migration | Present as *risk* (G-WNSB HIGH, Colgan MED-HIGH) but not isolating | Strong (actor boundary) | **Yes** | TYPE-09_VIOLATION_LANGUAGE_TRAP | **P1** | Real events show pressure, not a controlled isolation |
| PF/PM separation | Partial (Execuflight FO-flying/captain-command; Colgan open) | Strong | Already a retained controlled draft (GAP-001) | TYPE-01/02 HF positive | P2 | Don't re-materialize; refine sequenceRef only if authorized |
| Warning/callout/go-around | Partial (Peasmarsh, Vigo HOLD) | Medium | Yes (later) | TYPE-07_WARNING_TRAP | P2 | Guard against late warning-anchoring |
| Automation/mode awareness | Medium (Asiana, UPS — but coupled) | Medium | Maybe | TYPE-05_MIXED_TECH_HUMAN_BOUNDARY | P3 | Real cases partly cover; synthetic only if review shows coupling confound |
| Technical/environmental neg. control | Strong (Delta 191) | Low | Optional | TYPE-03/04 negative control | P3 | Reals adequate |
| Technical-human boundary | Medium (USAir 427, 5N-BQJ) | Low | Maybe | TYPE-05 | P3 | One clean synthetic could sharpen the line |
| Unstable approach / continuation | Strong (UPS, Execuflight, Asiana) | Medium | No | — | — | Real coverage sufficient |
| CFIT clear chronology | Medium (UPS) | Medium | Maybe | TYPE-02 progressive HF | P3 | Synthetic cheaper than hunting a clean real |
| Offshore/helicopter human-dominant | Thin (G-WNSB only) | **Strong (Daumas MDC/offshore)** | Maybe | TYPE-02 | P3 | Daumas is the better lever here than more reals |
| CRM monitoring/cross-check | Partial | Strong | Later | TYPE-01 | P3 | Defer |
| Decision point before outcome | Strong (most cases) | Strong | No | — | — | Covered |
| SAR/training helicopter | None | Medium | Defer | — | P4 | Out of minimum scope |
| No-failure / A-A boundary | Weak | Low | Yes (later) | TYPE-03 negative control | P3 | Tests that method returns "no anchor" |
| Perception/action mismatch | Medium (Asiana A/T HOLD) | Strong | Maybe | TYPE-02 | P3 | Asiana partly covers |
| Objective/goal ambiguity | Medium | Strong | Defer | — | P4 | Defer |
| Precondition-rich cases | Medium (G-WNSB) | Medium | Defer | — | P4 | Defer |

**Bottom line:** only **GAP-004 (P1) and GAP-002 (P1)** are required before any baseline discussion; everything else is P2+ and several are better served by Daumas extraction than by new synthetics.

---

## 8. Synthetic red-team findings

| synthetic_gap | issue | severity | risk | recommended_action |
|---|---|---|---|---|
| GAP-004 consequence-as-cause | Blueprint is abstract (`OUTCOME_SIGNAL_Q`, `POST_ESCAPE_CONSEQUENCE_Z`) — isolates the right variable, but an over-clean distractor could make the trap obvious and untestable | Medium | Test passes trivially; false confidence | Add a *plausible* outcome distractor calibrated against a real pattern (Delta 191 / American 965) **as design reference only**, no blending |
| GAP-004 | Risk of being too simple → not a real discriminator | Medium | Method "passes" without proving robustness | Include one near-miss where post-escape evidence is *tempting* but must be refused |
| GAP-002 agent migration | Five-actor abstract ladder (A–E) is correct in structure but could become too complex to author cleanly | Medium | Over-engineered case; ambiguous expected behavior | Materialize with **one** migration temptation (violation-language) first; defer multi-actor ladder |
| GAP-002 | Violation-language trap risks being artificial if no realistic crew context | Medium-High | Synthetic feels contrived; weak transfer to real review | Borrow *reasoning shape* from Daumas actor-boundary patterns, not real-event content |
| GAP-001 PF/PM (retained draft) | `sequenceRef` is coarse (`pf:03`/`pm:03`); PM-primary lane never drafted | Medium | Boundary cases (Colgan-style) under-tested | Refine sequenceRef design-only **or** open PM-primary separate draft — only with explicit authorization |
| All synthetics | Synthetic-real blending if expected values ever copied from real cases | High (if it happens) | Corpus integrity loss; calibrator invalidated | Enforce separate labeled lanes + non-promotion log every iteration (policy already exists — keep it) |
| Materialization order | Doing GAP-002 before GAP-004 | Low | Out-of-order risk per A4R197-D/A4R198 | Keep order: **GAP-004 first, GAP-002 second** |

**Materialize first:** GAP-004 (single clean outcome-trap). **Defer:** GAP-002 multi-actor ladder (start with single-temptation version), and all P3+ types.

---

## 9. Governance simplification table

| area | current_problem | recommendation | priority | risk_if_ignored |
|---|---|---|---|---|
| Document volume | 1081 md/txt across ~90 phase dirs | **Consolidate**: one living STATE doc + one decision log; archive per-phase intermediates | High | Reviewers can't find current truth; documental review masquerades as method validation |
| Triple per phase (readiness plan + log + next-phase decision) | 50 + 93 + 28 near-duplicative files | **Stop creating** the triple; collapse into a single phase record | High | Effort spent on bookkeeping, not method |
| Gate proliferation | 47 "gate" files; overlap between source gate, candidate review, author decision, baseline readiness | **Consolidate** into 3 canonical gates: SOURCE_CLOSURE, CANDIDATE_REVIEW, RELEASE(future) | High | False sense of safety from many locks; gate drift |
| Author decision vs source gate vs candidate review | Redundant approval surfaces | **Keep separate** the *purposes* (source / method / release) but **one artifact each** | Medium | Approval ambiguity; double-counting |
| Daumas lane docs | Plan + depth note + integration note scattered | **Consolidate** into one Daumas reference dossier (feeds §6) | Medium | Lane fragmentation |
| Superseded/quarantine/historical | Preserved but mixed with active | **Archive** explicitly under `/archive` with a SUPERSEDE index | Medium | Stale docs re-enter reasoning |
| Lock-confirmation boilerplate | Repeated verbatim in every doc | **Keep** (cheap, protective) but reference a single canonical lock list | Low | Minor noise |

**Practical disposition:** 
- **keep:** SOURCE_CLOSURE_GATE, the candidate-only review lane, author-decision intake, the lock list
- **consolidate:** per-phase triple + Daumas docs + gate files
- **archive:** superseded/quarantine/historical
- **supersede:** A4R193 B–Q intermediate readiness plans with one state doc
- **stop creating:** readiness/log/decision triple
- **required before product:** release gate + family coverage
- **required before baseline:** inter-rater consensus + escape-point stability proof

**Answer to "is documental review being confused with methodological validation?"** — **Yes, that is the single biggest latent risk.** The volume of gates and logs can read as rigor while the actual method (escape-point reasoning on real cases) has only been *reviewed candidate-only*, never independently re-rated.

---

## 10. Short-term route recommendation

### Primary Route: A — Candidate-only method review of the top-3

*Comair 5191, Asiana 214, UPS 1354*

- **Por que agora:** the author has already authorized exactly this (`AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`); it needs no new sourcing and directly tests whether the method produces stable escape-point reasoning. Leaving an approved, ready action unused is the opposite of closure.
- **Risco:** drifting into final P/O/A or escape-point approval
- **Pré-condições:** locks held; no fixture/baseline
- **Output esperado:** a candidate-only method-review record per event + a cross-case consistency note
- **O que não fazer:** no classification, no Colgan, no synthetic materialization
- **Ferramenta:** **Codex/ChatGPT** (author explicitly answered "Opus needed? não" for all three)
- **Próxima fase:** cross-case method-consistency audit (Opus) → then Daumas extraction

### Secondary Route: B — Daumas calibration extraction (§6 P1 artifacts)

No external dependencies; builds the missing human-reference lane that both review and synthetic design need.

### Parallel housekeeping (low cost): F — Simplification checkpoint (§9 consolidation)

Mechanical, high-leverage, frees the corpus from documental noise.

### O que não fazer agora:
- **C:** synthetic materialization — wait until the method review validates the escape-point reasoning the synthetics must protect
- **D:** Colgan re-audit — isolated, author parked it; do it as a focused single memo, not now
- **E:** Batch-2 deep extraction — reconciliation says close the source-link backlog first
- **G:** stop-and-hold — unnecessary, author gave a green light

---

## 11. Tooling allocation

| tool | use_for | do_not_use_for | next_recommended_task |
|---|---|---|---|
| **Opus** | High-judgment ambiguity: Colgan 3407 escape-point re-audit; cross-case method-consistency audit *after* the review; red-team of GAP-004 before materialization | Routine extraction, intake registration, logging, source-locator cleanup, doc consolidation; anything the author already decided | Cross-case method-consistency audit of the 3 reviewed events (only after route A) |
| **Codex** | Candidate-only method review execution of the 3; Daumas pattern-extraction drafting; governance consolidation/archive; source-locator normalization; eventual synthetic JSON *when authorized* (needs repo/test/commit) | Deciding alone: escape-point approval, P/O/A classification, READY/baseline promotion, category reclassification | Execute candidate-only method review of the top-3 (author said no Opus) |
| **Perplexity** | Narrow targeted search for two named uncovered families (clean human-dominant helicopter/offshore beyond G-WNSB; clean CFIT chronology) — **only after** source-link backlog closed | Ingestion matrix; supplying primary sources (YouTube/Skybrary/SimpleFlying); requesting more events while C-002/006/009/… hygiene backlog is open | None now — hold until backlog closed |
| **ChatGPT** | Strategy framing; prompt drafting for the other tools; critical review of audit logic; governance simplification proposals; Daumas-vs-Hendy conceptual mapping | Final methodological adjudication; source verification | Draft the candidate-only review prompt + simplification proposal |

**When to stop using Opus:** once a case is settled/approved and only mechanical registration/formatting remains; never spend Opus re-deciding what the author already decided.

---

## 12. Confirmação de bloqueios

Confirmo explicitamente que nesta auditoria **NÃO**:

- produzi P/O/A final — **NÃO**
- aprovei ponto de fuga final — **NÃO**
- promovi READY — **NÃO**
- criei selectedCode/releasedCode/finalConclusion — **NÃO**
- criei fixture/baseline/produto — **NÃO**
- usei Daumas como fonte factual de evento real — **NÃO**
- criei HFACS/Risk/ERC/ARMS/recommendations — **NÃO**
- criei recomendação operacional — **NÃO**

Adicionalmente: não acessei git (apenas leitura autorizada), não commitei, não rodei testes, não fiz busca externa, não baixei novas fontes.

---

## Resumo Executivo

**`CALIBRATION_CLOSURE_PASS_WITH_WARNINGS`** — O corpus está pronto para *candidate-only method review* (3 eventos aprovados pelo author), mas ainda `PARTIALLY_READY` como um calibrador completo (sintéticos não materializados, Daumas não extraído).

**Rota mais curta para o próximo marco:**
1. Executar a revisão candidate-only dos top-3 (Comair, Asiana, UPS) via Codex/ChatGPT (author explicitou "Opus? não")
2. Extração Daumas em paralelo (P1 artefatos de padrão/reasoning/checklist)
3. Simplificação de governança como housekeeping de baixo custo

**Maior risco latente:** confundir o volume de governança (1081 docs, 1080 "phase" dirs, 50 readiness plans, 93 logs, 28 next-phase decisions) com validação metodológica real. A disciplina de locks é forte, mas precisa ser testada em uma revisão de método independente.

**Próximas P1 sintéticas (se autorizado):** GAP-004 (consequence-as-cause trap) primeiro, depois GAP-002 (agent migration). Ambos necessários antes de qualquer discussão de baseline.

