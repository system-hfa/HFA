# SERA A4R193 A–O — Independent Methodological Audit (Opus) v0.2.0

Status:

- READ_ONLY_AUDIT
- NO_FILE_MUTATION_EXCEPT_THIS_REPORT
- NO_COMMIT / NO_PUSH / NO_RUNTIME_CHANGE
- CANDIDATE_ONLY_SCOPE_CONFIRMED

Phase: `A4R193-R` — Independent audit of the real-event re-entry package A–O before any synthetic gap design pack or product/UI/API advance.

Auditor model: Claude Opus, high effort. No subagents used for report authorship. No web/external source used.

Terminology note: the correct entity name is **Daumas**. `DAL` / `Dalmos` / `Dalmais` are typo/search artifacts and were treated only as negative-control terminology, never as entities.

---

## 1. Git state

| Item | Value |
|---|---|
| Branch | `main` |
| HEAD | `343cc862c9784fa8d73be84e7d9126a9eb678fcb` |
| origin/main | `343cc862c9784fa8d73be84e7d9126a9eb678fcb` |
| HEAD == origin/main | YES |
| Tracked changes | NONE (working tree clean of tracked diffs) |
| `git diff --check` | clean (no whitespace/conflict markers) |
| Untracked | present only (tmp/ exports, four A4R192 docs, one Delta-191 source-corpus txt) |

Untracked files were **not** altered. The untracked Delta-191 corpus txt is the known operational hygiene item recorded as `RR-004` in the A4R191-H residual register (outside A4R191 commit scope).

## 2. Test results

Ran the full `tests/sera-vnext/*.ts` suite via `frontend/node_modules/.bin/tsx`.

- **Result: 50 / 50 PASS, 0 FAIL.**
- All audit-mandated trials executed and passed, including:
  - `real-event-consolidated-hold-closure-trial-001`
  - `real-event-peasmarsh-vigo-source-recovery-trial-001`
  - `real-event-thebaud-pfpm-sequence-recovery-trial-001`
  - `real-event-reentry-thebaud-gate-trial-001`
  - `real-event-reentry-american-965-trial-001` (+ post-metrics)
  - `real-event-reentry-batch2/batch3` (+ post-batch3 metrics)
  - `real-event-reentry-copterline-s76-trial-001`
  - `daumas-prior-work-reconciliation-trial-001`

The reconciliation trial asserts (and the suite confirms) that the legacy `DAL` trial artifact does **not** exist and that no `DAL`/`Dalmos`/`Dalmais` entity usage leaks into the matrix.

## 3. Typecheck result

`cd frontend && npx tsc --noEmit` → **exit 0, zero diagnostics.**

`git diff --stat` / `--name-status` after the run: empty (no tracked file was touched by the audit).

## 4. Overall verdict

### `PASS_WITH_WARNINGS`

The A4R193 A–O package is methodologically coherent with the escape-point contract derived from Hendy/Daumas, the agent–act–moment rule is applied correctly, candidate-only locks are intact, no prohibited output (`selectedCode`/`releasedCode`/`finalConclusion`/`CLASSIFIED`/HFACS/Risk-ERC/ARMS-ERC/recommendations) is emitted anywhere in `docs/sera-vnext/real-event-reentry-a4r193/`, and no synthetic case was created. No BLOCKER and no HIGH-severity finding was identified. Warnings are LOW/MEDIUM and do not require correction before an audited, human-authorized A4R193-P design-only phase.

## 5. Findings by severity

### BLOCKER

- None.

### HIGH

- None.

### MEDIUM

- **M-1 — American 965 is the weakest READY case (consequence/technical-dominance proximity).** Source quality `MEDIUM_HIGH` (lower than the other six), the EP1/EP2/EP3 framing is explicitly still open, and the event was reclassified from a technical/negative-control profile to a multi-actor candidate. The Cali accident carries a genuine automation/FMS-ambiguity (Rozo/"R") technical contributor. The chosen anchor (crew continued descent with late FMS reprogramming **before** the GPWS alert, terrain impact excluded) is defensible as a human escape point and the boundary is correctly drawn before the GPWS/consequence window. **Disposition: PASS_WITH_WARNINGS, not revert** — but it should be the first case re-examined for consequence-as-cause and technical-dominance before any candidate-only trial is allowed to approach closure.
- **M-2 — Colgan 3407 is the most promotable HOLD; held on boundary adjudication, not source.** Its limiting factor is author PF/PM boundary adjudication (`HIGH_FOR_FACTS_MEDIUM_FOR_BOUNDARY`), not source insufficiency. There is a defensible consistency question: crew_collective anchoring is accepted for Asiana 214 / American 1420 / UPS 1354 with open PF/PM splits, yet Colgan is held on agent-migration risk. The hold is nonetheless methodologically defensible because Colgan's two actors performed **distinct** unsafe acts (captain aft-column response to stick-shaker vs. FO flap retraction), so a crew_collective merge would blur two separable acts rather than capture one shared act. **Disposition: HOLD_CONFIRMED, but flag as the priority candidate for a controlled `READY_FOR_FUTURE_REENTRY_REVIEW` gate** once an explicit PF/PM boundary decision is recorded — this is a boundary-evidence task, not a source-recovery task.

### LOW

- **L-1 — Copterline axis evidence traceability.** The per-axis `axisEvidenceRefs` introduce anchor IDs (`...NO-INDEPENDENT-VERIFICATION`, `...NO-INTENTIONAL-DEVIATION-EVIDENCE`, `...TEST-NOT-VERIFIED-BEFORE-RELEASE`, `...MAINTENANCE-CONTROL-FAILURE`) that are not enumerated in the case-level `boundaryEvidenceRefs` block. All are derivable from escape-point spec §5, but the anchor set is not closed/consistent between the two blocks.
- **L-2 — Comair 5191 uses `O-E` as `proposedCode`.** `O-E` is the runtime NON_EXISTENT sentinel (`escape-point-enforcement.ts` `NON_EXISTENT_CODE = 'O-E'`). The doc's limitation text ("O-axis code remains non-existent by design and must not activate any objective release") is consistent with the runtime, and the negative test `evidence-categories-passive-trial-001` confirms `O-E` never reactivates. Still, placing `O-E` in a `proposedCode` field (where the other six cases use `null`) is visually ambiguous and could be misread as a proposed objective code. Recommend a one-line clarifier distinguishing "intentional non-existent objective" from "unset".
- **L-3 — Progressive-zone anchoring vs. the single-instant ideal.** Six of seven READY cases use `pointTopology: progressive` ("control zone"); only Copterline is `discrete`. The escape-point spec §1 stresses a single, temporally-localized point ("o momento mais cedo em que ainda havia controle"). Progressive topology is an allowed contract value and each doc is honest about using a zone, which is acceptable for candidate-only; it should be tightened toward a discrete first-degradation instant before any phase approaching release.
- **L-4 — N109W / N11NM still appear as HOLD rows.** Both are already classified `HOLD_SUPERSEDED_OR_QUARANTINED` / `historical_quarantine_only` (release-pilot path withdrawn, `synthetic_gap_candidate=NO`). They nonetheless persist as live rows in the O hold-and-gap matrix, which can read as active backlog. Recommend an explicit CLOSED/quarantine status to remove them from the working hold set.

### INFO

- **I-1** — Foundational PDFs are present (`HENDY_DRDC_TR_2002_057...pdf`, `DAUMAS_DISSERTACAO...pdf`) but text is FlateDecode-compressed and not raw-greppable. Methodological grounding was validated through the internal escape-point spec (`docs/SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`) and the D2 Daumas dissertation reconciliation, which records the dissertation as `METHODOLOGY_REFERENCE_ONLY` and the four Daumas cases as `SOURCE_EXTRACTION_REQUIRED` (not auto-reference). Limitation registered per instruction.
- **I-2** — RR-004 untracked Delta-191 corpus txt matches git status; no action in this audit.

### FALSE_POSITIVE

- **FP-1 — `DAL` scan hits.** All in negative tests / terminology-correction lines (`daumas-prior-work-reconciliation-trial-001`, D2 docs). No entity usage.
- **FP-2 — `CERA` scan hits.** All in forbidden-synonym guardrails / cleanup-audit wording. No methodology mislabeling.
- **FP-3 — "invented question pattern" scan (`P-1|O-1|A-1|...`).** Matches were event IDs and report numbers (`ASIANA-214`→`A-2`, `AO-2024`→`O-2`) and historical pre-escape-point P-O-A control-board docs (A4R106/A4R107/A4R135), **not** A4R193 invented per-axis questions. The A4R193 reentry package contains no invented SERA questions and no per-axis question numbering.
- **FP-4 — lock-opening (`*Allowed=true`) scan.** A4R193 hits are a negative-test forbidden-pattern list in `real-event-reentry-batch3-trial-001` asserting **absence**. Other `*Allowed: true` hits (`waiverDecisionAllowed`, `rebuildAllowed`) are unrelated pre-existing tests / historical reference docs, not A4R193 candidate-only lock openings.
- **FP-5 — output-token scan (`selectedCode`/`HFACS`/`CLASSIFIED`/...).** **Zero hits in `docs/sera-vnext/real-event-reentry-a4r193/`.** All hits are runtime lock definitions (`constants.ts`, `escape-point-enforcement.ts`, gated legacy pipeline steps) and negative tests asserting these outputs are absent.

## 6. READY case audit table

All seven READY cases carry `escapePointScope` (status `APPROVED_NOT_ENFORCED`), defensible `agentId`/`agentKind`, observable `unsafeActOrOmission`, an `operationalMoment`+`sequenceRef`, `pointTopology`, `boundaryEvidenceRefs`, complete per-axis P/O/A metadata, and explicit candidate-only locks (`selectedCodeAllowed=false` … `notFinalClassification=true`). None emits a final code.

| Event | agentKind | Topology | Source | Agent-migration handling | Consequence-as-cause guard | Verdict |
|---|---|---|---|---|---|---|
| Copterline S-76C+ | maintenance_or_org | discrete | HIGH | N/A (single org agent); pilot recovery correctly held as consequence | Explicit (uncommanded extension = consequence) | **PASS_READY** (L-1) |
| United 173 PDX | crew_collective | progressive | HIGH | Flagged (captain→FO/FE) | Explicit (fuel-exhaustion impact excluded) | **PASS_READY** |
| Asiana 214 SFO | crew_collective | progressive | HIGH | Flagged (crew→PF/PM drift) | Explicit (seawall impact = consequence) | **PASS_WITH_WARNINGS** (L-3) |
| Comair 5191 LEX | crew_collective | progressive | HIGH | Flagged (crew→ATC omission) | Explicit (crash = consequence) | **PASS_WITH_WARNINGS** (L-2, L-3) |
| American 1420 LIT | crew_collective | progressive | HIGH | PF/PM split deferred by design | Boundary before post-touchdown technical sequence | **PASS_WITH_WARNINGS** (L-3) |
| UPS 1354 BHM | crew_collective | progressive | HIGH | Captain/FO-monitor split deferred | Boundary before 1000 ft AFE gate | **PASS_WITH_WARNINGS** (L-3) |
| American 965 Cali | crew_collective | progressive | MEDIUM_HIGH | Flagged; ATC contextual contribution not promoted | Boundary before GPWS; terrain impact excluded | **PASS_WITH_WARNINGS** (M-1, L-3) |

**No READY case should revert to HOLD.** Each preserves candidate-only locks and explicitly names agent-migration, post-event-analysis, and consequence-as-basis risks.

## 7. HOLD case audit table

| Event | Hold reason | Hold correct? | Promotable? | Verdict |
|---|---|---|---|---|
| Thebaud | `HOLD_AGENT_ACT_MOMENT` — PF/PM + per-actor sequenceRef unclosed | YES | Not now; needs new actor-level evidence | **HOLD_CONFIRMED_WITH_SOURCE_RECOVERY_RECOMMENDED** |
| Peasmarsh | `SOURCE_EXTRACTION_REQUIRED` — warning/go-around actor chain ambiguous | YES | Status set allows future review; not met | **HOLD_CONFIRMED_WITH_SOURCE_RECOVERY_RECOMMENDED** |
| Vigo | `HOLD_SOURCE_INSUFFICIENT` — PF/PM + mission-crew decomposition incomplete | YES | Not met | **HOLD_CONFIRMED_WITH_SOURCE_RECOVERY_RECOMMENDED** |
| Delta 191 | `HOLD_TECHNICAL_OR_CONDITION_DOMINANT` — microburst/windshear; `TECHNICAL_DOMINANT_NEGATIVE_CONTROL` | YES | No — keep as negative control | **HOLD_CONFIRMED** (overclassification correctly avoided) |
| Colgan 3407 | `HOLD_AGENT_MIGRATION_RISK` — PF/PM boundary not migration-safe | YES | **Yes — priority** for controlled boundary-evidence review (not source) | **HOLD_CONFIRMED** (see M-2) |
| USAir 427 PIT | `HOLD_TECHNICAL_OR_CONDITION_DOMINANT` — rudder/PCU technical driver | YES | No — exemplary technical-dominance hold | **HOLD_CONFIRMED** |
| 5N-BQJ | `HOLD_TECHNICAL_OR_CONDITION_DOMINANT` — technical-failure-dominant | YES | No | **HOLD_CONFIRMED** |
| N109W | `HOLD_SUPERSEDED` — release-pilot path withdrawn | YES | No (historical) | **SHOULD_QUARANTINE_OR_CLOSE** (formalize; see L-4) |
| N11NM | `HOLD_SUPERSEDED` — release-pilot path withdrawn | YES | No (historical) | **SHOULD_QUARANTINE_OR_CLOSE** (formalize; see L-4) |

No HOLD case is blocked by a methodology error. No HOLD case has ignored sufficient reentry evidence — the human-decision events with adequate evidence (Copterline, United, Asiana, Comair, American 1420/965, UPS) were promoted; the technical/condition-dominant events were correctly retained.

## 8. Escape point methodology assessment

Coherent with the v0.1 escape-point spec and Hendy/Daumas:

- **Single, factual, temporally-localized escape point**: respected (one `escapePointScope` per case; consequences excluded). Caveat L-3: six of seven use progressive zones rather than a discrete instant — allowed but a relaxation to tighten later.
- **Active failure vs. preconditions / departure from safe operation**: respected. Each anchor is an observable act/omission at the moment control still existed, not a latent factor.
- **Consequence ≠ cause**: respected and explicitly guarded in every case (impact/crash/exhaustion named as consequence only).
- **Decision-ladder Perception/Objective/Action (GOAL/PERCEPTION/ACTION)**: per-axis metadata is anchored to the same agent and moment as the escape point; codes are `proposedCode` candidate hypotheses (or `null`), never released.
- **MDC / Daumas dissertation**: reconciled as `METHODOLOGY_REFERENCE_ONLY`; the four Daumas cases are not used as automatic reference (D2 reconciliation). Grounding validated via internal docs (PDFs present but compressed — I-1).

## 9. Agent–act–moment assessment

Correctly applied. The anti-migration rule (spec §3.2) is honored throughout:

- All per-axis `axisAgentRef`/`axisMomentRef` match the escape-point agent and moment within each case — no axis silently switches agent.
- Maintenance/org case (Copterline) keeps the pilot's recovery attempt as consequence, never as the escape-point agent — the canonical correct pattern from spec §5.
- Technical-dominant cases (USAir 427, Delta 191, 5N-BQJ) refuse a human agent anchor (`agentKind: system_or_condition_dominant`, `kind: unknown`, null axes) rather than forcing crew attribution from a technical driver.
- Residual agent-migration risk (crew_collective → individual PF/PM) is the most common open item and is explicitly named in every multi-actor READY case and is the basis for the Colgan hold.

## 10. Risk of overclassification

Well controlled. No overclassification detected:

- Environment/technical-dominant events are held, not forced into human-error framing (Delta 191, USAir 427, 5N-BQJ).
- Severe-outcome events keep the outcome as consequence, not anchor.
- Objective axis is left non-final (`null` or the `O-E` non-existent sentinel), avoiding premature intent attribution.
- Locks (`classificationAllowed=false`, `poaClosureAllowed=false`, `downstreamAllowed=false`) prevent candidate hypotheses from hardening into releases.

The only residual overclassification *proximity* is American 965 (M-1), and it remains candidate-only with the boundary drawn before the GPWS/consequence window.

## 11. Synthetic gap design recommendation

### `SYNTHETIC_DESIGN_PACK_ALLOWED_WITH_WARNINGS`

- Confirmed: **no synthetic case, fixture, or instance was created** — all synthetic-named files are governance / template / taxonomy / workflow / gap-policy / preplan / decision docs. No `syntheticId`/`sourceStatus: SYNTHETIC` instances exist outside the template/governance docs.
- A4R147 governance is robust and consistent with the A4R193-O decision (`NAO_CRIAR_SINTETICOS_EM_O`): anti-contamination rules, precedence rules (Hendy/Daumas and real-event evidence supersede synthetics), and full output locks are in place.
- A4R193-O only *recommends* a future design pack and requires explicit human authorization.
- **Warnings / mandatory conditions for the design pack:** design-documentation only; no instance creation; strict candidate-only; no real-event reclassification from synthetics; no fixture/baseline/corpus change; per-case traceability of the target gap to a methodological rule. Synthetics must cover the **real observed gaps** (PF/PM separation, per-actor sequenceRef at first degradation, agent-migration control, condition-vs-act separation, warning/callout/go-around mechanism), not methodological convenience.

## 12. Product / UI / API recommendation

### `PRODUCT_BLOCKED`

Initial hypothesis (BLOCKED) is upheld; no strong evidence to change it.

- Product/UI/API implementation: **blocked.**
- API integration: **blocked.**
- UI design-only (no implementation, no wiring): there is enough methodological maturity to *think about* design, but it should not begin until after the human-authorized synthetic design phase and is not part of this audit's authorization. Recommendation remains `PRODUCT_BLOCKED` for this gate.

## 13. RR-001 status

`OPEN`. Lexical residual in multi-agent ambiguous clauses. Severity LOW only while candidate-only locks hold; **escalates to MEDIUM/HIGH if real integration occurs without a stronger semantic agent-bound contract.** Directly justifies keeping product blocked. The package's persistent crew_collective→PF/PM agent-migration warnings are the same residual surfacing at the case level.

## 14. RR-003 status

`PARTIALLY_MITIGATED`. No structured MDC/interview intake exists in the runtime; enforcement still depends on externally-supplied scope/metadata. Severity LOW candidate-only, MEDIUM for real product scenarios. Mitigated by the A4R192 intake/validation/bridge layer but not closed. Independently justifies keeping product blocked until mandatory structured escape-point intake exists.

## 15. Is A4R193-P allowed?

**Yes, conditionally.** A4R193-P = `SYNTHETIC_GAP_DESIGN_PACK_ONLY` is allowed **only** with explicit human authorization and design-only scope. This independent audit satisfies the conservative "audit-first" alternative that A4R193-O / O-Next-Phase listed as a precondition. No reentry, no synthetic instances, no product in P.

## 16. Is further source recovery recommended?

- **Yes, targeted:** Peasmarsh and Vigo (source/actor-chain insufficiency) and Thebaud (per-actor sequenceRef / PF/PM) — internal recovery to its limit, then **authorized external source** if internal recovery cannot close actor-level evidence.
- **No (do not pursue to force human framing):** Delta 191, USAir 427, 5N-BQJ — retain as technical/condition-dominant holds / negative controls.
- **Boundary decision, not source:** Colgan 3407 — needs an author PF/PM boundary adjudication, not more source.

## 17. Should any READY case be downgraded?

No. None should revert to HOLD. American 965 (M-1) carries the most warnings and should be re-examined first, but its candidate-only anchor is defensible.

## 18. Should any HOLD case be promoted?

- **Colgan 3407** is the priority promotion candidate — to `READY_FOR_FUTURE_REENTRY_REVIEW` under a controlled gate once an explicit PF/PM boundary decision is recorded (M-2). Holding it now is defensible.
- No other HOLD should be promoted in this phase.

## 19. Required corrections before P

**None are blocking.** Recommended (non-blocking) hardening before or during P:

1. Formalize N109W / N11NM as CLOSED/quarantine to remove them from the active hold set (L-4).
2. Add a one-line clarifier on Comair's `O-E` `proposedCode` distinguishing "intentional non-existent objective" from "unset" (L-2).
3. Reconcile Copterline's per-axis evidence anchors with its `boundaryEvidenceRefs` block (L-1).
4. Record the rationale for accepting crew_collective anchoring in READY cases while holding Colgan, to remove the apparent consistency gap (M-2).
5. Plan to tighten progressive-zone anchors toward a discrete first-degradation instant before any phase approaching release (L-3).

## 20. Recommended model / tool for next phase

- Use **Claude Opus, high effort** for the A4R193-P synthetic design pack — it is methodologically sensitive (boundary design, anti-overclassification traps).
- **Do not use subagents** for methodological authorship of design-pack content or governance decisions.
- Keep the phase **read/design-only**: no instance creation, no runtime/fixture/baseline/corpus mutation, no commit until human review.

---

### Audit limits

- Read-only; no tracked file altered; nothing committed or pushed. This report is the only file created (plus an optional ZIP if requested).
- Foundational PDFs present but compressed; grounding validated via internal consolidated docs (I-1).
- No web/external source used; no SERA questions invented; no P-1/O-1/A-1 per-axis numbering used.
