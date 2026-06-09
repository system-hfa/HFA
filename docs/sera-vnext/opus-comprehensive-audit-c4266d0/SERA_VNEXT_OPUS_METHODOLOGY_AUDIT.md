# SERA vNext — Methodology Audit (c4266d0)

Scope: escape point, direct actor, P/O/A timing, O-C, A-A/A-C, preconditions, consequence quarantine, O-E.
Method: direct reading of engine-v0 steps, canonical tree, evidence module, and the canonical asset doc; runtime reproduction of the 39-case corpus.

## Source hierarchy verification

The canonical tree in code (`canonical-tree.ts`, `SERA_CANONICAL_TREE_NODES`) is built into `SERA_PT_V1_TREE` (`canonical-tree/sera-pt-v1.ts`). Each node row carries `sourcePath = docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` and `nodeIdType = TECHNICAL_STABLE_ID_NOT_ORIGINAL_SOURCE_ID`. The asset doc exists and is a sourced table citing **Daumas (offshore SERA dissertation, p.105–111)** and **Hendy SERA 2003 (Steps 3–4)**, with HFACS-style section anchors (e.g., "4.2.1 Intent failure (Routine violation)"). Spot-checks confirm the code faithfully encodes the doc:
- `O_RULES` SIM→`O_MANAGED_RISK`, NÃO→`O_ROUTINE`
- `O_ROUTINE` SIM→`O-B` (routine violation), NÃO→`O-C` (exceptional violation)
- `P_ASSESSMENT` SIM→`P-A`, NÃO→`P_CAPABILITY`

**Verdict: the tree is real and traceable. The stop-rule "árvore inventada/incompleta" is NOT triggered.** Hierarchy Hendy → HFA/SERA adaptation → Daumas → internal contract → code is respected, with technical-stable IDs disclosed (not original source IDs).

## Escape point (ponto de fuga)

`engine-v0/steps/03-escape-point.ts` + `candidate-escape-window.ts`.

- The escape statement is built from `earliestCandidate` ("Quando …") — i.e., the **first** pre-outcome control statement, consistent with "primeiro momento em que a operação deixa de ser segura". It is not chosen retrospectively from the latest/most-damaging event.
- **Consequence quarantine is present**: `excludedPostEscapeEvidence(timeline, latestSentenceIndex)` removes post-escape statements; `evidence/temporal-scope.isPostEscapeStatement` is consulted before a sentence can be a control-window candidate.
- Escape status can be `PROGRESSIVE_ZONE` (when counter-evidence exists), `CANDIDATE`, or `INSUFFICIENT_EVIDENCE`; progressive zones raise an uncertainty and require human boundary confirmation.
- **Limitation (F-18, MEDIUM):** the candidate window is the *first sentence containing any control keyword* (`crew/pilot/decided/continued/...`, bilingual) before the first outcome keyword. For narratives that open with routine actions, the boundary can be placed earlier than the true first-unsafe-moment. This is mitigated by PROGRESSIVE_ZONE labeling and mandatory human review, but it is a coarse heuristic.

P/O/A are evaluated using evidence scoped up to the latest pre-outcome control statement, with post-escape items excluded. **P/O/A are not evaluated using post-escape facts** — the stop-rule "P/O/A fora do ponto de fuga" is NOT triggered.

## Direct actor (ator direto)

`steps/04-direct-actor.ts` (reused by engine-v0 step 06).

- Conservative by design: defaults to `actor=null / actorKind='unknown'` with `humanReviewRequired=true`. PF/PM are *not* assigned when roles are not explicit (`pfOrPmExplicitlyMissing` → falls back to "flight crew (collective)").
- No actor migration: organization/supervision are not substituted for the direct actor; `system_or_condition_dominant` is used only when unsafe-condition evidence dominates and there is no human-action evidence. The assurance step computes `actorMigrationDetected` when an axis code exists but the actor is NOT_APPLICABLE.
- **Limitation:** actor detection keywords are English-only (`crew`, `first officer`, `captain`). PT narratives will usually yield `unknown` + human review. Related to F-05.

**Verdict: direct-actor handling is methodologically safe (no migration, conservative), weak on PT robustness.**

## P / O / A axes

`engine-v0/steps/08-canonical-traversal.ts` + `canonical-tree/run-evidence-traversal.ts` + `canonical-tree/evaluate-node.ts`.

- Each axis is traversed independently from its root; the proposed code is the leaf where the evidence-driven walk terminates (`terminalCode` from `node.branchMap[answer]`). Each axis can remain UNRESOLVED/INSUFFICIENT independently. **No code is selected before traversal; no synthetic path is built to reach a code.**
- Status vocabulary includes `NO_FAILURE` for the "-A" leaves (P-A/O-A/A-A), `CANDIDATE`, `UNRESOLVED`, `INSUFFICIENT_EVIDENCE` — codes are explicitly *candidates*, never final.

### O-C (violation) — F-04 (HIGH)

`decideO`:
- `O_RULES` answers NÃO (goal inconsistent with rules → violation path) when the text contains continuation cues: `continue/continued/decided to continue/pressed on/despite warning/wrong runway/below profile/unstable approach/moved the lever out of stop`.
- `O_ROUTINE` then answers SIM (routine) on essentially the *same* continuation cues, yielding **O-B (routine violation)**; O-C (exceptional) requires `knowingly/deliberately/intentionally/consciously`.
- **Problem:** mere *continuation* is mapped to a *violation* (O-B) without evidence of awareness of a known rule or conscious deviation. A perception-driven continuation (crew believed the approach was stable) is methodologically an objective/perception issue, not a violation. The 39-case tally shows **O-B emitted 18 times** (by far the most common code), and `ADV-VIOLATION-WITHOUT-AWARENESS` emits O-B and still passes. This is the methodology's most significant representation gap. Mitigated by candidate-only + human review, but the *default* attribution is biased toward violation.

### A-A / A-C — partially correct

`A_IMPLEMENTED` distinguishes `NÃO_DESLIZE_LAPSO_ERRO`→A-C (slip/lapse/error, pre-consequence) from `SIM`→A_CORRECT; A_CORRECT SIM→A-A (adequate, no failure). The logic does *not* force A-C from an undesired outcome — it keys on pre-escape implementation cues (`descended below`, `failed to monitor`, `did not verify`). **Outcome bias toward A-C is avoided.** However `A_IMPLEMENTED` never returns `NÃO_FEEDBACK`, so **A-B (feedback failure) is unreachable** (F-03), and `A_CAPABILITY` defaults to SIM without capability evidence (F-21, LOW).

### Preconditions — correct separation

`engine-v0/steps/09-preconditions.ts`:
- Derived only from non-POST_ESCAPE evidence that `supports` includes `PRECONDITION`.
- Each candidate carries `explicitlyNotEscapePoint=true`, `basedOnCandidateCode=false`, `nonFinal=true`, with traceable `sourceEvidence`.
- **This satisfies the audit's requirements**: preconditions are evidence-first, not derived from codes, not used as escape point or active failure, temporally separated, and absence is represented (no precondition → limitation message).

### Consequence / post-escape

- Post-escape evidence is quarantined from escape-point support, axis evidence, and preconditions. The assurance step raises "Post-escape evidence was quarantined from causal traversal" as an uncertainty.
- **Limitation (F-06):** the `guardrails.consequenceUsedAsCause` / `postEscapeHuntingDetected` flags that would *attest* to this are hardcoded `false` rather than computed. The behavior (quarantine) is real; the *attestation* is performative.

## Coverage and language limits (cross-cutting)

- **F-03 (HIGH):** only 14 of 22 leaf codes are reachable by the decision logic; P-D/P-E/P-F/P-G/P-H, A-B, A-F, A-G are dead. On the 39-case corpus only 7 distinct codes ever appear.
- **F-05 (HIGH):** all axis-decision regexes are English; with `locale: 'pt-BR'` the product's Portuguese narratives match almost nothing → UNRESOLVED. Escape-window detection is bilingual, so events are *located* but not *classified* in PT.

## Methodology verdict

**METHODOLOGY_REPRESENTATION = PASS_WITH_WARNINGS.** The methodology is correctly *represented in structure* (real tree, evidence-first traversal, escape-point and consequence quarantine, separated preconditions, O-E forbidden, candidate-only). The warnings are substantive: violation over-attribution (F-04), unreachable codes (F-03), English-only classification (F-05), coarse escape heuristic (F-18), and vacuous guardrail attestations (F-06). None of these produce a *released* incorrect classification because every output is candidate-only and human-review-gated.
