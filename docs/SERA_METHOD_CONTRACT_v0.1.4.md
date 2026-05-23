# SERA Methodology Contract v0.1.4

## 1. Purpose

This document is the normative methodology contract for HFA/SERA v0.1.4.

It consolidates:

- Hendy / Systematic Error and Risk Analysis as the primary methodology source.
- Daumas / offshore aviation application as an applied methodological source.
- HFA/SERA adaptations required to operate SERA as a SaaS decision aid.
- Current software conventions for fixtures, candidates, traces, gates and baselines.

This contract does not change code, fixtures, candidates, reports, baseline files or ERC trace behavior.

## 2. Normative Status

| Item | Decision |
|---|---|
| Status | Methodology contract, not implementation patch. |
| Version | v0.1.4. |
| Scope | Perception, Objective, Action, Preconditions, ERC, evidence policy, baseline policy and trace policy. |
| Out of scope | Engine changes, expected changes, candidate promotion, baseline freeze, `erc_question_trace`. |
| Effective use | Must be used before A4-b candidate admission, A4-c ERC calibration and A4-d baseline freeze. |

## 3. Authority Order

When sources conflict, use this order.

| Rank | Authority | What it controls | What it does not control |
|---:|---|---|---|
| 1 | Hendy / SERA original method | Core causal questions, unsafe act/condition, Perception/Goal/Action structure, preconditions concept, risk/recovery framing. | Software scoring, SaaS trace fields, fixture governance. |
| 2 | Daumas / offshore aviation application | Applied use of SERA in offshore aviation, interview-derived event analysis, latent risk factor orientation, selected aviation scenarios. | General baseline behavior for all HFA/SERA SaaS use cases. |
| 3 | HFA/SERA adaptation | Conservative operational rules needed for product use: causal anchoring, O-C strictness, A-A vs A-B anti-double-counting, candidate isolation. | Original-source authority unless explicitly documented as adaptation. |
| 4 | Current engine behavior | Observed behavior of `pipeline.ts`, `all-steps.ts`, deterministic gates, runner scoring and traces. | Methodological truth. Engine behavior can be wrong or incomplete. |
| 5 | Official fixtures and baseline | Frozen regression expectations for current official baseline. | Broad methodology validation beyond covered cases. |
| 6 | Methodology candidates | Proposed future baseline cases, anchors and stress tests. | Official baseline until admitted by gate. |
| 7 | Experimental traces | Observability and audit support derived from snapshots. | Independent methodological evidence or classification authority. |

Normative rule: current engine behavior never overrides Hendy, Daumas or documented HFA/SERA adaptation. If the engine disagrees with a defensible methodological contract, classify the disagreement before patching or changing expected.

## 4. Source Separation

| Label | Meaning | Example |
|---|---|---|
| `SOURCE_DIRECT_HENDY` | Directly follows the SERA ladder/question structure. | Perception asks what the operator believed about the world state. |
| `SOURCE_INFERRED_FROM_HENDY` | Inferred from Hendy but operationalized for software. | ERC support from detectability/reversibility evidence. |
| `DAUMAS_OPERATIONALIZATION` | Applied offshore aviation use or Daumas case interpretation. | E01/E02 automation and attention-management examples. |
| `HFA_ADAPTATION_REQUIRES_NOTE` | HFA/SERA product adaptation requiring explicit rationale. | O-C strict awareness rule, A-A coherent action rule. |
| `TECHNICAL_HEURISTIC` | Internal software or runner convention. | Candidate runner scoring, trace isolation fields, deterministic matrix. |
| `GAP` | Methodological coverage not yet closed. | ERC 2 vs 3 calibration in candidates. |

## 5. Core Causal Contract

Hendy's SERA starts from the departure from safe operation: identify the observable unsafe act or unsafe condition, then explain why it emerged through three active-failure questions:

| Question | HFA/SERA axis |
|---|---|
| What did the operator believe was happening? | Perception |
| What was the operator trying to achieve? | Objective |
| How was the operator trying to achieve it? | Action |

HFA/SERA adds this operational rule:

| Rule | Contract |
|---|---|
| Causal anchoring | P/O/A must refer to the same agent, act/condition and moment of safe-operation escape. |
| No consequence migration | A later recovery attempt must not become the primary point of failure if an earlier controllable unsafe act/condition exists. |
| No double counting | The same causal deficit must not be counted as both perception failure and independent action omission unless there is a distinct action failure. |
| Candidate conservatism | Candidate expected values must not be weakened merely to match current engine behavior. |

## 6. Axis Contract - Perception

### 6.1 Definition

Perception classifies what the actor believed or failed to perceive about the world state relevant to the goal at the point of safe-operation escape.

### 6.2 Source and Adaptation

| Layer | Contract |
|---|---|
| Hendy | Perception asks whether the assessment of the situation was correct/adequate and whether sensing, attention, knowledge or information exchange failed. |
| Daumas | Offshore aviation use highlights automation understanding, attentional capture, crew communication and operational context. |
| HFA/SERA adaptation | Adds causal anchoring, P-G organizational monitoring, P-H conflict between independent information sources and P-D operational attention capture. |
| Software convention | Current engine uses deterministic gates plus LLM nodes and final inference fallback. |

### 6.3 Operational Discriminators

| Code | Contract discriminator | Baseline examples | Candidate examples |
|---|---|---|---|
| P-A | No explicit independent perceptual failure. | `TEST-A-D-001`, `TEST-O-D-001`. | `A0-DAUMAS-E02-A`, `A0-AUTO-004-ADJ`. |
| P-B | Sensory input unavailable/degraded. | `TEST-P-B-001`, `TEST-P-B-002`. | None active. |
| P-C | Knowledge/perception gap, including automation logic. | `TEST-A-E-001`, `TEST-GEN-OC-NP-005`. | `A0-AUTO-001`, `A0-DAUMAS-E01-B`. |
| P-D | Attention overload/high demand/time-critical attentional capture. | `TEST-P-D-001`, `TEST-A-I-001`. | `A0-AUTO-003`, `A0-DAUMAS-E02-B`. |
| P-E | Temporal estimation or sequence timing failure. | `TEST-P-E-001`, `TEST-A-H-002`. | None active as baseline candidate. |
| P-F | Sensory/perceptual illusion. | `TEST-P-F-001`, `TEST-P-F-002`. | None active. |
| P-G | Available information not checked, monitored or tracked. | `TEST-P-G-001`, `TEST-COPTERLINE-S76C-001`. | `A0-CHK-001`, `A0-CHK-003`, `A0-FUEL-002`, `A0-VIS-003`. |
| P-H | Ambiguous/incomplete/conflicting information transfer or sources. | `TEST-P-H-001`, `TEST-P-H-002`. | `A0-VIS-004-ADJ`, `A0-VIS-005`. |

### 6.4 Precedence

| If evidence shows | Prefer | Unless |
|---|---|---|
| Knowledge/automation understanding deficit | P-C | The problem is merely failure to check available information. |
| Attentional capture by time-critical operational task | P-D | The problem is pure temporal estimation, then consider P-E. |
| Available parameter/checklist/system state not monitored | P-G | Independent information sources conflict, then consider P-H. |
| Conflicting independent information sources not integrated | P-H | It is only a single unchecked parameter, then P-G. |

### 6.5 Limits

| Limit | Status |
|---|---|
| P-D/P-G/P-H boundaries remain text-density sensitive. | Candidate-level, requires N_RUNS=3 before baseline admission. |
| Step 2 remains LLM-dependent for actor/act/moment extraction. | Known methodological and technical risk. |
| P axis cannot be considered fully validated by latest N_RUNS=1 only. | Baseline-blocking until A4-b. |

## 7. Axis Contract - Objective

### 7.1 Definition

Objective classifies what the actor was trying to achieve and whether that goal was compatible with safe operation, rules, procedures and operational constraints.

### 7.2 Source and Adaptation

| Layer | Contract |
|---|---|
| Hendy | Goal/objective asks intent and compatibility with rules/regulations, including routine and exceptional violations. |
| Daumas | Applied cases include operational objectives in offshore aviation and automation/approach contexts. |
| HFA/SERA adaptation | Defines strict O-C for explicit awareness of rule/limit crossing with continued operation, not only humanitarian/protective intent. |
| Software convention | `classifyObjectiveByRules` is a deterministic selector for strong O-B/O-C/O-D evidence before LLM fallback. |

### 7.3 Operational Discriminators

| Code | Contract discriminator | Baseline examples | Candidate examples |
|---|---|---|---|
| O-A | Operationally appropriate/default objective; no deviant objective proven. | Most official fixtures. | Most active candidates. |
| O-B | Routine, normalized, habitual or culturally tolerated violation. | `TEST-O-B-001`, `TEST-GEN-OB-001`. | None active. |
| O-C | Exceptional violation or strict awareness rule: explicit knowledge of rule/limit crossing and continued operation; also explicit human/protective objective. | `TEST-O-C-001`, `TEST-GEN-OC-001`. | `A0-DAUMAS-E02-A`. |
| O-D | Efficiency/economy/time/productivity objective without normalization and without O-C evidence. | `TEST-O-D-001`, `TEST-ESCAPE-DISPATCH-001`. | None active as mismatch. |

### 7.4 Precedence

| Evidence | Precedence |
|---|---|
| Explicit human/protective objective | O-C over O-A/O-D. |
| Explicit awareness of known rule/limit deviation plus continued operation | O-C over O-D lexical efficiency. |
| Normalized/routine violation | O-B over O-D if time gain occurs inside habitual tolerated practice. |
| Efficiency/economy/time pressure without O-C or O-B evidence | O-D. |
| No deviant objective evidence | O-A. |

### 7.5 Limits

| Limit | Status |
|---|---|
| O-C strict awareness is HFA/SERA adaptation, not a raw mechanical Hendy reading. | Requires ADAPTATION_NOTE. |
| Current objective axis is strong in latest N_RUNS=1 but still requires N_RUNS=3 for candidate baseline admission. | A4-b. |

## 8. Axis Contract - Action

### 8.1 Definition

Action classifies how the actor tried to achieve the objective: action selection, execution, verification and communication at the point of safe-operation escape.

### 8.2 Source and Adaptation

| Layer | Contract |
|---|---|
| Hendy | Action asks whether implementation, selection or execution failed relative to the goal. |
| Daumas | Applied cases highlight automation mode selection, speed/attention management and operational action choices. |
| HFA/SERA adaptation | Adds A-A coherent-with-wrong-perception rule and A-G feedback/check formal extension. |
| Software convention | Current engine uses deterministic gates before LLM action ladder traversal. |

### 8.3 Operational Discriminators

| Code | Contract discriminator | Baseline examples | Candidate examples |
|---|---|---|---|
| A-A | No independent action error; action follows perception/objective. | Many O-B/O-C/O-D and P-H fixtures. | `A0-CHK-001`, `A0-FUEL-002`, `A0-VIS-003`, `A0-VIS-004-ADJ`, `A0-VIS-005`. |
| A-B | Specific procedural omission or lapse, distinct from perception failure. | `TEST-A-B-001`, `TEST-GEN-AB-001`. | CONFIG/SEP exploratory candidates only. |
| A-C | Failure to verify result of one's own action. | `TEST-A-C-001`, `TEST-GEN-AC-001`. | None active for admission. |
| A-D | Physical/ergonomic/reach/force/PPE execution incapacity. | `TEST-A-D-001`, `TEST-T2-W2-001`. | None active. |
| A-E | Knowledge/skill/training/technical competence action failure. | `TEST-A-E-001`. | `A0-AUTO-001`, `A0-DAUMAS-E01-B`. |
| A-F | Wrong selection among available alternatives. | `TEST-A-F-001`. | `A0-DAUMAS-E02-A`. |
| A-G | Supervision/delegation/third-party verification failure; HFA/SERA also includes explicit formal feedback/check failure. | `TEST-A-G-001`, `TEST-GEN-AG-001`. | `A0-AUTO-004-ADJ`, `A0-CHK-003`. |
| A-H | Temporal management failure during execution. | `TEST-A-H-002`, `TEST-GEN-AH-001`. | `A0-AUTO-003`, `A0-DAUMAS-E02-B`. |
| A-I | Wrong instruction/selection under explicit operational load. | `TEST-A-I-001`, `TEST-GEN-AI-001`. | None active. |
| A-J | Confirmation/readback/receipt/operational communication failure. | `TEST-A-J-001`, `TEST-GEN-AJ-001`. | None active. |

### 8.4 Precedence

| Conflict | Decision |
|---|---|
| Communication/readback central vs general load | A-J beats A-I. |
| Third-party/delegated verification vs own-action verification | A-G beats A-C. |
| Own-action result not verified, communication not central | A-C beats A-J. |
| Perception failure already explains the action and no distinct action omission exists | A-A beats A-B. |
| Formal feedback/check explicitly expected and not performed | A-G beats A-B where the check is a distinct formal barrier. |
| Temporal execution failure with parameter degradation and task capture | A-H beats A-A/A-C. |

### 8.5 Limits

| Limit | Status |
|---|---|
| A-A coherent action rule is an HFA/SERA adaptation to prevent double counting. | Requires ADAPTATION_NOTE. |
| A-G formal feedback/check extends baseline wording and must not be treated as pure Hendy. | Requires ADAPTATION_NOTE. |
| `A0-CHK-002-ADJ` remains exploratory due P/A ambiguity. | Not baseline-ready. |

## 9. Axis Contract - Preconditions

### 9.1 Definition

Preconditions are contextual, organizational, operator, task or environmental factors that made the active failure more likely. They are not active-failure codes.

### 9.2 Source and Adaptation

| Layer | Contract |
|---|---|
| Hendy | Preconditions explain conditions behind active failures and support intervention points. |
| Daumas | Applied offshore analysis emphasizes latent factors such as crew relationship, emotional control, fatigue, planning and training. |
| HFA/SERA adaptation | Uses deterministic matrix after final P/O/A/ERC to select likely preconditions. |
| Software convention | `selectDeterministicPreconditions` and `preconditions_trace` are operational selectors, not independent clinical causal proof. |

### 9.3 Contract Rules

| Rule | Decision |
|---|---|
| Active failure separation | Preconditions must not duplicate P/O/A active-failure codes. |
| Evidence | A precondition should be tied to direct narrative evidence or declared as matrix-derived. |
| Trace confidence | Experimental precondition trace must remain conservative; `partial` can be maximum where causal link is matrix-derived. |
| Baseline | Preconditions may be scored in fixtures, but baseline confidence requires stable P/O/A/ERC plus stable precondition recall. |

### 9.4 Limits

| Limit | Status |
|---|---|
| Matrix selection is not an independent causal chain. | Must be documented in every methodology-facing use. |
| Candidates currently show operational PASS in latest N_RUNS=1, but this is not full methodological validation. | Requires A4-b/A4-d gates. |

## 10. Axis Contract - ERC

### 10.1 Definition

ERC is the Error Recovery Characteristics risk dimension: how detectable and reversible the unsafe act/condition was before consequences.

### 10.2 Source and Adaptation

| Layer | Contract |
|---|---|
| Hendy | ERC belongs to risk/recovery framing derived from SERA factors. |
| Daumas | Supports prevention/risk-factor orientation in offshore aviation, not a fully calibrated SaaS numeric scale. |
| HFA/SERA adaptation | Uses motor legacy numeric scale and product presentation mapping. |
| Software convention | Current runner compares numeric `expected.erc_level`; candidates historically used numeric ERC as compatibility placeholder. |

### 10.3 Current Decision

| Item | Decision |
|---|---|
| Baseline readiness | ERC is not calibrated enough for broad v0.1.4 baseline admission. |
| Known gap | Recurrent candidate divergence ERC 2 vs 3. |
| Required phase | A4-c ERC Calibration and Scale Governance. |
| `erc_question_trace` | Prohibited until ERC scale/threshold governance is complete. |
| Candidate interpretation | A PARTIAL caused only by ERC remains PARTIAL, not PASS. |

### 10.4 ERC Blockers

| Case | Current issue |
|---|---|
| `A0-CHK-001` | P/O/A correct, ERC 3 vs expected 2. |
| `A0-DAUMAS-E02-B` | P/O/A correct, ERC 3 vs expected 2. |
| `A0-FUEL-002` | P/O/A correct, ERC 3 vs expected 2. |
| `A0-VIS-003` | Current PASS but historical ERC 2/3 oscillation; monitor in N_RUNS=3. |

## 11. Formal ADAPTATION_NOTES

### 11.1 O-C Strict Awareness of Rule/Limit

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_OC_STRICT_AWARENESS_v0.1.4` |
| Source conflict | Hendy goal/violation structure vs software need for stable O-C/O-D boundary. |
| HFA/SERA rule | If the narrative shows explicit awareness of a known rule/limit, evidence of crossing/deviation and continued operation, classify as O-C even when efficiency/pressure terms are present. |
| Rationale | This prevents conscious rule/limit deviation from collapsing into O-D merely because operational pressure or efficiency vocabulary appears. |
| Constraints | No O-C without explicit awareness evidence. Generic pressure, hindsight or "should have known" is insufficient. |
| Examples | `A0-DAUMAS-E02-A`, O-C official fixtures. |
| Status | Required for baseline admission of strict O-C candidates. |

### 11.2 A-A Coherent Action Under Incorrect Perception

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_ACTION_AA_PERCEPTION_COHERENCE_v0.1.4` |
| Source conflict | LLM/action ladder may treat any unchecked item as A-B; HFA/SERA must avoid double-counting P-G/P-H as A-B. |
| HFA/SERA rule | If the unsafe action is coherent with the actor's incorrect/incomplete perception and there is no distinct procedural omission or action selection failure, classify A-A. |
| Rationale | The active failure is perceptual; classifying the same monitoring/integration gap again as A-B overstates action failure. |
| Constraints | A-B remains required for a distinct omitted physical/procedural step. |
| Examples | `A0-CHK-001`, `A0-FUEL-002`, `A0-VIS-003`, `A0-VIS-004-ADJ`, `A0-VIS-005`. |
| Status | Required before candidate baseline admission. |

### 11.3 A-G Formal Feedback/Check

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_ACTION_AG_FORMAL_FEEDBACK_CHECK_v0.1.4` |
| Source conflict | Baseline wording limits A-G to supervision/delegation/third-party verification; current HFA/SERA also uses A-G for explicit formal feedback/check barriers. |
| HFA/SERA rule | A-G may apply when a formal expected feedback/check step was available and not performed after a critical action, even if not a classic supervisor/third-party case. |
| Rationale | The missed barrier is a verification/feedback control function rather than a simple procedural omission. |
| Constraints | Do not use A-G for generic own-action checking; use A-C or A-B when no formal feedback/check barrier is explicit. |
| Examples | `A0-AUTO-004-ADJ`, `A0-CHK-003`. |
| Status | Must be reconciled with `BASELINE.md` in a future documentation update. |

### 11.4 Isolated Daumas Subcases

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_DAUMAS_SUBCASE_ISOLATION_v0.1.4` |
| Source conflict | Daumas cases may be multi-act or interview-derived; runner fixtures require a single expected P/O/A/ERC. |
| HFA/SERA rule | Daumas E01/E02 subcases can be isolated as candidate fixtures only when the single point of safe-operation escape is explicit. |
| Rationale | This allows useful applied anchors without pretending the fixture represents the whole event. |
| Constraints | Do not use isolated subcase as full-event classification. Multi-act structural cases remain outside automatic baseline until contract support exists. |
| Examples | `A0-DAUMAS-E01-B`, `A0-DAUMAS-E02-A`, `A0-DAUMAS-E02-B`. |
| Status | Required for all Daumas-derived candidates. |

### 11.5 Deterministic Preconditions Matrix

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_PRECONDITIONS_DETERMINISTIC_MATRIX_v0.1.4` |
| Source conflict | Hendy preconditions imply causal support; software matrix infers likely preconditions from P/O/A/ERC and textual cues. |
| HFA/SERA rule | Matrix-derived preconditions are operational hypotheses unless directly supported by narrative evidence. |
| Rationale | Supports consistent product behavior while preserving methodological humility. |
| Constraints | Experimental trace must disclose matrix/heuristic origin; no claim of independent causal proof. |
| Examples | Candidate reports where preconditions PASS; `preconditions_trace`. |
| Status | Required before UI/API treats preconditions as audited causal findings. |

### 11.6 ERC Legacy Motor vs HFA Presentation

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_ERC_LEGACY_PRESENTATION_v0.1.4` |
| Source conflict | Engine legacy numeric ERC and HFA product presentation can invert or re-label risk semantics. |
| HFA/SERA rule | Always state whether ERC is motor legacy score or HFA presentation category. |
| Rationale | Prevents apparent contradictions in risk severity and baseline reports. |
| Constraints | No baseline admission for ERC-sensitive candidates until A4-c calibrates 2 vs 3 thresholds. |
| Examples | `A0-CHK-001`, `A0-DAUMAS-E02-B`, `A0-FUEL-002`; risk fixtures. |
| Status | Blocking for ERC baseline expansion. |

### 11.7 Experimental Traces Derived From Snapshot

| Field | Value |
|---|---|
| ID | `ADAPTATION_NOTE_TRACE_SNAPSHOT_DERIVED_v0.1.4` |
| Source conflict | Trace output may look like independent reasoning, but current experimental traces are derived after final classification. |
| HFA/SERA rule | Snapshot-derived traces are observability aids only; they do not validate or alter classification. |
| Rationale | Prevents trace fields from being mistaken for independent methodological evidence. |
| Constraints | Keep `trace_experimental` separate; keep `erc_question_trace` absent until ERC governance is complete. |
| Examples | `perception_question_trace`, `objective_question_trace`, `action_question_trace`, `preconditions_question_trace`. |
| Status | Active limitation. |

## 12. Baseline, Candidate and Exploratory Definitions

| Status | Definition | Admission rule |
|---|---|---|
| Official baseline | Frozen expected behavior used as regression authority. | N_RUNS=3, PASS=100%, PARTIAL=0, FAIL=0, ERROR=0, determinism 100%, smoke/global gate as applicable. |
| Baseline candidate | Candidate eligible for admission testing. | Must pass N_RUNS=1 first; then N_RUNS=3 with no PARTIAL. |
| Methodology candidate | Isolated fixture used to test a methodological rule. | Can be PARTIAL during development; must not be treated as official baseline. |
| Exploratory | Ambiguous, thin, multi-act, unsupported by scorer or not yet stable. | Must not block release unless explicitly selected as gate; must not enter baseline. |
| Experimental trace | Derived observability data. | Never baseline evidence by itself. |

## 13. Evidence Policy

| Classification can be considered defensible when | Required evidence |
|---|---|
| Direct-source case | Clear alignment with Hendy ladder and no HFA adaptation required. |
| Daumas-applied case | Scenario is traceable to Daumas application and isolated to one point of safe-operation escape. |
| HFA/SERA adaptation | ADAPTATION_NOTE exists and constraints are satisfied. |
| Candidate gate case | Expected has rationale, discriminators and successful N_RUNS=3 before baseline. |
| Baseline case | Official report has PASS=100%, PARTIAL=0, FAIL=0, ERROR=0 and deterministic behavior. |

| Must become candidate when | Reason |
|---|---|
| It tests a new discriminator or boundary. | Avoid contaminating official baseline. |
| It depends on HFA/SERA adaptation not yet contracted. | Needs explicit note and validation. |
| It is based on applied Daumas subcase. | Needs isolation and single expected. |
| It stresses ERC threshold. | Needs A4-c calibration. |

| Must remain exploratory when | Reason |
|---|---|
| Multi-act structure cannot be represented by one expected. | Runner does not support multi-act expected. |
| Evidence is E1/thin or produced `relato insuficiente`. | Not robust enough for gate. |
| P/O/A ambiguity persists across reports. | Not baseline-ready. |
| It requires accepted alternatives or null ERC. | Scorer does not support this contract. |

| Requires human review when | Required decision |
|---|---|
| Any expected changes. | Methodology owner decision. |
| Any PARTIAL is accepted in a documentary phase. | Explicit exception rationale. |
| Any baseline promotion. | Formal approval. |
| Any ERC 2 vs 3 disagreement. | A4-c decision. |
| Any engine behavior conflicts with source hierarchy. | Decide patch vs expected vs exploratory. |

## 14. Validation Policy

| Gate | Purpose | Minimum pass condition |
|---|---|---|
| Release guard | Prevent commit/merge with technical failure. | `FAIL=0`, `ERROR=0`; PARTIAL requires explicit human/documentary decision. |
| Methodology gate | Validate candidate/evidence coherence. | Axis-specific expected behavior; PARTIAL remains unresolved. |
| Baseline gate | Freeze official behavior. | `PASS=100%`, `PARTIAL=0`, `FAIL=0`, `ERROR=0`, determinism 100%. |
| Product readiness gate | Expose or rely on result in product. | Baseline plus UI/API caveats and source labeling. |

| Run type | Use |
|---|---|
| N_RUNS=1 | Fast canary, triage, documentary confirmation. Never enough for baseline. |
| N_RUNS=3 | Baseline admission, ERC calibration, milestone validation, suspected LLM variance. |
| Smoke-fast | PR/cycle gate over sensitive official fixtures. Does not replace smoke global. |
| Causal anchoring gate | Mandatory before motor/rule/prompt changes and baseline promotion. |
| Smoke global | Mandatory for release/freeze baseline. |

## 15. Baseline Policy v0.1.4

| Rule | Decision |
|---|---|
| PARTIAL is not PASS | No exception for baseline. |
| `FAIL/ERROR=0` is not enough | It is a release guard, not a baseline gate. |
| Candidates are not baseline | They require admission, N_RUNS=3 and review. |
| Reports are evidence, not decisions | Human review and contract alignment are required. |
| ERC-sensitive cases are blocked | Until A4-c. |
| `erc_question_trace` is blocked | Until ERC calibration is complete and separately approved. |

Minimum v0.1.4 baseline freeze:

| Metric | Required |
|---|---|
| PASS | 100% |
| PARTIAL | 0 |
| FAIL | 0 |
| ERROR | 0 |
| Determinism | 100% |
| Candidate N_RUNS | 3 for admitted candidates |
| Causal anchoring | PASS |
| Smoke global | PASS |

## 16. Conflicts and Gaps in `frontend/src/lib/sera/rules/BASELINE.md`

`BASELINE.md` is useful but incomplete for v0.1.4. Do not edit it in this phase.

| Area | Current BASELINE.md state | Gap | Future correction |
|---|---|---|---|
| Authority order | Not explicit. | Does not separate Hendy, Daumas, HFA adaptation, engine behavior, fixtures and traces. | Add source hierarchy section. |
| O-C | Describes explicit human/protective objective. | Missing strict awareness of rule/limit crossing as HFA/SERA adaptation. | Add O-C strict awareness with ADAPTATION_NOTE. |
| A-A | Says no specific action error / unsafe act derives from objective. | Missing perception-coherent A-A rule used to avoid P/A double counting. | Add A-A coherent-with-wrong-perception discriminator. |
| A-G | Says supervision/delegation/third-party action. | Missing formal feedback/check barrier adaptation. | Add A-G feedback/check note or split future code if needed. |
| Preconditions | Says deterministic matrix. | Does not state matrix is not independent causal proof. | Add limitation and evidence policy. |
| ERC | Says basic ERC but not calibrated issues. | Missing ERC 2/3 candidate divergence and legacy-vs-HFA presentation caveat. | Add ERC governance and block `erc_question_trace` until A4-c. |
| Candidate policy | Mentions N_RUNS usage generally. | Missing candidate/exploratory/baseline definitions and PARTIAL policy. | Add validation policy. |
| Traces | Not covered. | Missing snapshot-derived trace limitations. | Add trace policy or link to A3 docs. |

## 17. A4-b and A4-c Blockers

| Blocked item | Until |
|---|---|
| Promoting any candidate to baseline | A4-b admission N_RUNS=3 passes with no PARTIAL. |
| Including `A0-CHK-002-ADJ` in baseline gate | It is reclassified or resolved by human methodological decision. |
| Changing ERC expected for `A0-CHK-001`, `A0-DAUMAS-E02-B`, `A0-FUEL-002` | A4-c ERC calibration. |
| Implementing or exposing `erc_question_trace` | A4-c completes and separate trace readiness is approved. |
| Updating `BASELINE.md` | Future documentation phase after this contract is accepted. |
| Product-facing methodological claims beyond current baseline | Baseline v0.1.4 freeze and product readiness review. |

## 18. Final Normative Decisions

1. Hendy remains the primary source for SERA structure.
2. Daumas is an applied source, especially for offshore aviation and selected cases, but Daumas subcases require isolation when converted to single-expected candidates.
3. HFA/SERA adaptations are valid only when explicitly documented with ADAPTATION_NOTE and constraints.
4. Current engine behavior is evidence of implementation state, not methodology authority.
5. Official baseline is stronger than release guard and stronger than candidate PASS in N_RUNS=1.
6. PARTIAL never counts as PASS for baseline.
7. ERC is not ready for broad baseline expansion and must go through A4-c.
8. Experimental traces are derived observability artifacts and must not be used as independent proof.
9. No baseline v0.1.4 promotion is authorized by this document.
