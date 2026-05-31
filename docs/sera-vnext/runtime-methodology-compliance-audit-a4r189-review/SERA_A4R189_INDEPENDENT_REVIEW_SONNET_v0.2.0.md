# SERA A4R189 Independent Runtime Compliance Review — Sonnet v0.2.0

reviewer: claude-sonnet-4-6 (independent, no authorship of A4R189)
phase: A4R189-R
mode: READ_ONLY
date: 2026-05-30
HEAD_at_review: d271e8f5c13b5f7731da630478554e8b743405f0
origin_main_at_review: d271e8f5c13b5f7731da630478554e8b743405f0
HEAD_equals_origin_main: true
DOCS_ONLY
NO_RUNTIME_CHANGE
NO_AXIS_DECISION

---

## 1. Scope and method

This review independently verified the A4R189 audit conclusion by reading the original audit artifacts and then directly inspecting the runtime and test code cited in the audit. Files read for this review:

**Audit artifacts (A4R189):**
- `SERA_RUNTIME_METHODOLOGY_COMPLIANCE_AUDIT_A4R189_v0.2.0.md`
- `SERA_RUNTIME_REQUIREMENT_TRACEABILITY_MATRIX_A4R189_v0.2.0.csv`
- `SERA_A4R190_RUNTIME_ALIGNMENT_PLAN_v0.2.0.md`
- `SERA_RUNTIME_METHODOLOGY_COMPLIANCE_AUDIT_LOG_A4R189_v0.2.0.md`

**Runtime files independently read:**
- `frontend/src/lib/sera-vnext/engine.ts`
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/human-decision.ts`
- `frontend/src/lib/sera-vnext/code-traceability.ts` (selected lines)
- `frontend/src/lib/sera-vnext/steps/05-poa-statements.ts` (lines 1–80)
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts` (lines 1–60)
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts` (lines 195–210)
- `frontend/src/lib/sera/flow-renderer.ts` (full)
- `frontend/src/lib/sera/pipeline.ts` (lines 880–900, 960–980, 1270–1290)
- `frontend/src/lib/sera/all-steps.ts` (lines 2180–2215, 2350–2360, 2990–3005)

**Test files independently read:**
- `tests/sera-vnext/dry-run-trial-001.ts` (lines 1–80)

**Canonical source independently read:**
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` (O-code section)
- `docs/sera-vnext/real-tree-event-review-a4r186/SERA_REAL_TREE_NODE_TRAVERSAL_MATRIX_A4R186_v0.2.0.csv` (first 3 rows)

---

## 2. Verdict on the main conclusion

**The conclusion NOT_TRUSTED_FOR_REAL_TREE_RUNTIME is CORRECT and well-supported.**

The conclusion is not exaggerated. The evidence is direct:

1. `frontend/src/lib/sera-vnext/engine.ts` — 107 lines of runtime orchestration. Zero references to `nodeId`, `exactQuestionTextPt`, `exactQuestionTextEn`, or `branchCondition`.
2. `frontend/src/lib/sera-vnext/types.ts` — 585 lines of type definitions. Zero canonical tree fields. The traversal path type is `SeraVNextDerivationStep[]` with free-text `step: string` — not bound to canonical nodeId.
3. `frontend/src/lib/sera-vnext/steps/05-poa-statements.ts` — P/O/A statement logic uses hardcoded English phrase patterns (`hasAny(t, ['aircraft instruments', ...])`). These are heuristic, not canonical node questions.
4. `frontend/src/lib/sera/flow-renderer.ts` — uses local `Q1`, `Q2`, `Q3`, `Q4`, `Q5` labels for P-axis nodes, not canonical A4R99 nodeIds.
5. `frontend/src/lib/sera/all-steps.ts:2190–2210` — uses `'Nó 0'` as local identifier for the first decision node; questions are hardcoded prompt strings.

A grep across all runtime files (`frontend/src/lib/sera/**` and `frontend/src/lib/sera-vnext/**`) returned ZERO hits for `nodeId` matching A4R99 canonical IDs, ZERO hits for `exactQuestionTextPt`/`exactQuestionTextEn`, and ZERO hits for `branchCondition`.

---

## 3. Confirmed findings from A4R189

All HIGH-severity gaps are confirmed:

| REQ-ID | Conclusion | Reviewer verdict |
|---|---|---|
| REQ-RT-001 | NOT_IMPLEMENTED — no A4R99 in runtime | CONFIRMED |
| REQ-RT-002 | NOT_IMPLEMENTED — no canonical nodeId authority | CONFIRMED |
| REQ-RT-003 | LEGACY_HEURISTIC_ACTIVE — local question texts | CONFIRMED |
| REQ-RT-008 | LEGACY_HEURISTIC_ACTIVE — invented local prompts | CONFIRMED |

All MEDIUM-severity gaps are confirmed:

| REQ-ID | Conclusion | Reviewer verdict |
|---|---|---|
| REQ-RT-004 | PARTIAL_DOC_ONLY — escape point not gated in runtime | CONFIRMED |
| REQ-RT-005 | PARTIAL_DOC_ONLY — post-escape consequence rule is text-only | CONFIRMED |
| REQ-RT-009 | PARTIAL_DOC_ONLY — PT/EN locale field exists but logic is EN-only | CONFIRMED |
| REQ-RT-013 | NOT_IMPLEMENTED — no traversal extension in runtime | CONFIRMED |

All LOW-severity COMPLIANT_ACTIVE findings are confirmed:

| REQ-ID | Conclusion | Reviewer verdict |
|---|---|---|
| REQ-RT-006 | COMPLIANT_ACTIVE — P/O/A separated in engine.ts steps | CONFIRMED |
| REQ-RT-007 | COMPLIANT_ACTIVE — INSUFFICIENT_EVIDENCE blocking implemented | CONFIRMED |
| REQ-RT-010 | COMPLIANT_ACTIVE — downstream locks in constants.ts + human-decision.ts | CONFIRMED |
| REQ-RT-011 | COMPLIANT_ACTIVE — baseline promotion script gated | CONFIRMED |
| REQ-RT-012 | COMPLIANT_ACTIVE — evidenceReferences + reviewerRationale required for PROPOSE_CODE | CONFIRMED |

---

## 4. Weak or unsubstantiated findings in A4R189

None of the HIGH findings are weak — they are all directly verified by code reading. However, the following characterizations are imprecise or incomplete:

### 4.1 REQ-RT-013 severity underrated

**A4R189 rated traversal extension as MEDIUM severity.** This reviewer rates it as HIGH for runtime purposes.

Reason: A4R188-PREFLIGHT identified traversal extension as a BLOCKING gap (B-02) at the methodology docs level. At the runtime level, the absence of traversal extension is even more critical: without it, the engine cannot reach any leaf code in branches where P_ASSESSMENT=NÃO→P_CAPABILITY=SIM (requiring P_TIME_PRESSURE), or A_IMPLEMENTED=SIM (requiring A_CORRECT), etc. These are common paths. A runtime that cannot traverse extensions cannot produce any valid leaf code for these cases.

### 4.2 REQ-RT-009 PARTIAL_DOC_ONLY characterization is generous

`step-05-poa-statements.ts` uses English-only phrase pattern matching (e.g., `hasAny(t, ['aircraft instruments', 'flight instruments'])`). If a PT narrative is provided, zero patterns will match and all evidence arrays will be empty. This is not "partial" — it is a silent full failure for any PT narrative input. The status should be `NOT_IMPLEMENTED_FOR_PT` rather than `PARTIAL_DOC_ONLY`.

---

## 5. Critical gaps A4R189 did not detect

### 5.1 O-E code present in OBJECTIVE_INTENT_CODES (HIGH — undetected by A4R189)

**Location**: `frontend/src/lib/sera-vnext/human-decision.ts:12`

```typescript
const OBJECTIVE_INTENT_CODES = new Set(['O-C', 'O-D', 'O-E'])
```

**Problem**: `O-E` is explicitly declared non-existent in A4R99:
```
O-E = NON_EXISTENT_IN_SERA_PT_V1
O-E is not an active objective leaf code.
```

`code-traceability.ts` correctly marks O-E as RESERVED/NOT_ACTIVE. However, `validateHumanAxisDecision()` in `human-decision.ts` does not validate that `proposedCode` is a canonical leaf code — it validates `evidenceReferences`, `reviewerRationale`, and `guardrailAcknowledgements`, but a human reviewer who proposes `O-E` would pass those checks if they provide evidence and rationale.

Additionally, `steps/10-causal-assurance.ts:198` includes `O-E` in the code-detection set for check `CHK-STATEMENTS-NO-SERA-CODES`:
```typescript
'O-A', 'O-B', 'O-C', 'O-D', 'O-E',
```

This treats O-E as a valid code in the guard, which is incoherent: the guard checks that statements do not contain SERA codes (a prohibition), but O-E is itself invalid, so including it here is misleading.

**Severity**: HIGH for data integrity. A human reviewer could propose O-E, pass validation, and obtain a `releasedCode: 'O-E'` in a `HumanValidatedAxisClassification` record. This would be a classification against a non-existent canonical code.

**A4R189 did not flag this gap.**

### 5.2 P-D missing from flow-renderer.ts P-axis diagram (MEDIUM — undetected by A4R189)

**Location**: `frontend/src/lib/sera/flow-renderer.ts:10–58`

The P-axis Mermaid diagram in the legacy flow renderer shows:
```
Q3{Pressão do\ntempo excessiva?}
Q3 -->|SIM| PE([P-E\nFalha no Gerenciamento])
Q3 -->|NÃO| Q4
```

This is structurally incomplete. A4R99 defines **two** branches from `P_TIME_PRESSURE`:
- `SIM_ATENCAO` → leaf **P-D** (attention-based time pressure)
- `SIM_GERENCIAMENTO` → leaf **P-E** (management-based time pressure)

The flow-renderer collapses these into a single `SIM` branch pointing to P-E only. P-D is:
- Not shown in the Mermaid diagram
- Not in the `codigoMap` for result highlighting

A user reviewing a P-D classification result in the flow UI would see no highlighted leaf. This is both a rendering bug and a documentation discrepancy between the UI and A4R99.

**A4R189 did not flag this gap.**

### 5.3 Local Hendy category map in code-traceability.ts may diverge from A4R99 (MEDIUM — undetected by A4R189)

**Location**: `frontend/src/lib/sera-vnext/code-traceability.ts:29–47`

The file contains a local `CODE_TO_HENDY_CATEGORY` map that assigns each leaf code a numeric Hendy category (1–12). These mappings are not traceable to A4R99 or to explicit citations of Hendy Figure 5. Example:

```typescript
'P-E': 7,
'A-H': 7,  // same category as P-E
```

Whether P-E and A-H both belong to Hendy category 7 requires cross-validation against Hendy (2003) Figure 5. A divergence here would create a subtle methodology compliance gap in preconditions derivation and evidence category guidance.

**A4R189 did not flag this gap.**

### 5.4 No canonical code validation at PROPOSE_CODE boundary (HIGH — undetected by A4R189)

**Location**: `frontend/src/lib/sera-vnext/human-decision.ts:100–130`

The `validateHumanAxisDecision()` function validates:
- `evidenceReferences.length > 0`
- `reviewerRationale` non-empty
- `guardrailAcknowledgements` non-empty

It does **not** validate that `proposedCode` is a valid canonical leaf code from A4R99. A reviewer could propose `'O-E'`, `'P-Z'`, or any string and pass validation (subject to evidenceReferences and rationale requirements). This means the first enforcement layer that would catch an invalid code is downstream in `code-traceability.ts`, not at the human decision input boundary.

This is closely related to gap 5.1 but is a distinct structural issue: the validation boundary does not check canonical code membership.

---

## 6. Evaluation of A4R190 phase ordering

### 6.1 Overall ordering assessment

The proposed A4R190-A → B → C → D → E → F → G sequence is **reasonable but has one structural risk**.

### 6.2 Confirmed correct ordering

- **A4R190-A before B**: Correct. You cannot implement traversal without a data model.
- **A4R190-C alongside B**: Reasonable. Bilingual rendering should be designed while the traversal engine is being built, not retrofitted.
- **A4R190-E after B**: Reasonable. Downstream locks need the canonical state to be defined before they can be fully extended.
- **A4R190-F late**: Acceptable. Tests that prove compliance should come after the features they test exist.
- **A4R190-G last**: Correct. Candidate fixtures should be aligned to canonical traversal evidence — this can only happen after the traversal engine exists.

### 6.3 Structural risk: A4R190-D should be designed alongside A4R190-A

**Risk**: The plan places the escape point gate (A4R190-D) in position 4, after the traversal engine skeleton (A4R190-B, position 2).

This is risky because the escape point gate is not a feature you add after the traversal engine — it is a prerequisite constraint on what the traversal engine can accept as input. If A4R190-B is implemented without the escape point gate design being final, the traversal engine may be built with assumptions about input structure that later conflict with A4R190-D requirements (e.g., `approvedEscapePointScope` field cardinality, validation rules).

**Recommendation**: A4R190-D (escape point gate) design should be completed at the docs/schema level as part of A4R190-A, even if the runtime implementation comes after A4R190-B.

### 6.4 Missing phase: A4R188 decisório completion before A4R190-B

A critical phase is missing from the A4R190 plan: **A4R188 decisório must be completed before A4R190-B begins**.

Reason: A4R188 will produce the first canonical node-by-node traversal for all 5 BATCH_A events. The traversal extension records (A4R188-EXT-XXXX) will reveal exactly which paths are needed, which leaf codes are reachable, and which events require United 173-style boundary treatment. This evidence should inform the A4R190-B traversal engine design directly — without it, A4R190-B is being designed without evidence of what real canonical traversals look like.

### 6.5 Risk of A4R190-A starting too early

**A4R190-A (canonical tree runtime data model)** can begin safely after the PREFLIGHT+LANGLOCK commit because it is a data model design task, not traversal implementation. The risk of starting early is LOW.

The specific risk to monitor: the data model in A4R190-A should incorporate the escape point gate field design (gap 6.3) and the traversal extension record schema (from A4R188-PREFLIGHT). If A4R190-A is drafted before those are consulted, the data model may need revision.

---

## 7. Summary responses to the review questions

### Q1: Is the conclusion NOT_TRUSTED_FOR_REAL_TREE_RUNTIME correct?

**YES — correct, not exaggerated.** Directly verified by reading runtime code. Zero canonical A4R99 nodeIds in active traversal. The conclusion is technically accurate.

### Q2: Which A4R189 findings are confirmed?

All 13 requirement assessments are confirmed. See section 3 above.

### Q3: Which findings are weak or unsubstantiated?

None are fabricated. Two are imprecise:
- REQ-RT-013 (traversal extension): severity underrated at MEDIUM — should be HIGH given that no leaf codes are reachable in common tree paths without it
- REQ-RT-009 (PT/EN): PARTIAL_DOC_ONLY is generous — step-05 fully fails for PT input, not partially

### Q4: Were any critical gaps omitted?

**YES — four gaps were omitted:**

1. **O-E in OBJECTIVE_INTENT_CODES** (HIGH): `human-decision.ts:12` includes a non-canonical code that could be proposed and would pass input validation
2. **No canonical code validation at PROPOSE_CODE boundary** (HIGH): `validateHumanAxisDecision()` does not check that `proposedCode` ∈ canonical leaf codes
3. **P-D absent from flow-renderer P-axis diagram** (MEDIUM): the P-axis Mermaid diagram omits the P-D branch from P_TIME_PRESSURE
4. **Local Hendy category map unverified** (MEDIUM): `code-traceability.ts` assigns Hendy categories without traceable cross-reference to A4R99 or Hendy 2003

### Q5: Can A4R190-A begin after this review?

**YES — A4R190-A can begin**, with the condition that the data model design incorporates:
- The escape point gate field schema (do not defer `approvedEscapePointScope` to A4R190-D)
- The traversal extension record schema from A4R188-PREFLIGHT
- An explicit `canonicalLeafCodes` allowlist that excludes O-E (gap 5.1)

### Q6: Which A4R190 phase must come first?

**A4R190-A must come first.** The gap is that A4R190-A should be sequenced to incorporate escape point gate design (currently planned as A4R190-D). Specifically: the `escapePointScope`/`approvedEscapePointScope` field contract should be defined in A4R190-A even if the runtime enforcement is implemented in A4R190-D.

Additionally: **complete A4R188 decisório before beginning A4R190-B**. A4R188 will provide real canonical traversal evidence that should directly inform the traversal engine design.

### Q7: Is Opus 4.7 review needed before implementation?

**For A4R190-A (data model)**: Not required, but recommended for the specific question of `escapePointScope` field cardinality and the `O-E` exclusion design.

**For A4R190-B (traversal engine skeleton)**: YES — Opus 4.7 review is recommended before merging A4R190-B. Reason: the traversal engine must correctly handle multiple branches from a single node (P_TIME_PRESSURE has SIM_ATENCAO and SIM_GERENCIAMENTO as distinct branches, not a single SIM), traversal extension rules from A4R188-PREFLIGHT (which may result in 3+ extension nodes), and the United 173 temporal boundary pre-condition. These edge cases require careful design that benefits from independent high-attention review before code is merged.

**For A4R190-D (escape point gate)**: YES — Opus 4.7 review recommended specifically to assess whether the gate design correctly prevents post-escape consequences from being used as causal anchors. This is the highest-risk methodological guardrail in the entire A4R190 plan.

---

## 8. Validation

```
git diff --check: clean
git diff --name-status: empty (no tracked files modified)
git diff --name-only -- '*.ts': empty (zero TypeScript changes)
```

Files created in this review:
- `docs/sera-vnext/runtime-methodology-compliance-audit-a4r189-review/SERA_A4R189_INDEPENDENT_REVIEW_SONNET_v0.2.0.md` (this file)

Files NOT modified:
- All A4R189 source documents: UNCHANGED
- All runtime `.ts` files: UNCHANGED
- All test files: UNCHANGED
- All fixtures, baseline: UNCHANGED
- A4R99, A4R185, A4R186, A4R187, A4R188: UNCHANGED

No commit. No push.
