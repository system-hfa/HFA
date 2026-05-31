# SERA A4R190-A to A4R190-I — Independent Runtime Audit
# Model: claude-sonnet-4-6 | Phase: A4R190-J | Version: v0.2.0
# Date: 2026-05-31

---

## 1. Git State

| Field | Value |
|---|---|
| Branch | main |
| HEAD | 7722e021a2bdb8f4aa08f78530aee4b97eecadef |
| origin/main | 7722e021a2bdb8f4aa08f78530aee4b97eecadef |
| HEAD == origin/main | **YES — CONFIRMED** |
| Tracked file changes | None (all changes are untracked new files in `tmp/` and `docs/`) |

---

## 2. Validations Executed

### 2.1 Test Suite (22 files total)

| Test File | Result |
|---|---|
| canonical-tree-trial-001.ts | **PASS** |
| canonical-codes-trial-001.ts | **PASS** |
| canonical-code-enforcement-trial-001.ts | **PASS** |
| oe-nonexistent-normalization-trial-001.ts | **PASS** |
| canonical-traversal-skeleton-trial-001.ts | **PASS** |
| canonical-traversal-adapter-trial-001.ts | **PASS** |
| canonical-traversal-hardening-trial-001.ts | **PASS** |
| canonical-traversal-leaf-coverage-trial-001.ts | **PASS** |
| canonical-traversal-exhaustive-leaf-trial-001.ts | **PASS** |
| author-node-intake-adapter-trial-001.ts | **PASS** |
| canonical-released-code-typing-trial-001.ts | **PASS** |
| adversarial-set-2-contract-trial-001.ts | **PASS** |
| code-release-gate-trial-001.ts | **PASS** |
| code-traceability-trial-001.ts | **PASS** |
| dry-run-trial-001.ts | **PASS** |
| dry-run-trial-set-1.ts | **PASS** |
| evidence-categories-passive-trial-001.ts | **PASS** |
| evidence-category-coverage-trial-001.ts | **PASS** |
| manual-classification-trial-001.ts | **PASS** |
| preconditions-from-released-codes-trial-001.ts | **PASS** |
| preconditions-traceability-refinement-trial-001.ts | **PASS** |
| semantic-consistency-released-codes-trial-001.ts | **PASS** |

**Overall: 22/22 PASS**

### 2.2 TypeScript Typecheck

```
cd frontend && npx tsc --noEmit
```
**Exit code: 0 — CLEAN**

### 2.3 Git Diff Checks

```
git diff --check     → EXIT 0 (no whitespace issues)
git diff --name-status → (empty — no tracked changes)
git diff --stat      → (empty)
git diff --name-only -- '*.ts' → (empty)
```

### 2.4 Manual Scans

| Pattern | Result | Classification |
|---|---|---|
| `\bCERA\b` in runtime/tests/docs | **0 matches** | CLEAN |
| `P-1\|P-2\|O-1\|O-2\|A-1\|A-2\|Pergunta por eixo\|case-specific\|auxiliary question` | **0 matches** | CLEAN |
| `O-E\|NON_EXISTENT_CODE\|NON_EXISTENT_IN_SERA_PT_V1` | 35 matches | All lock/guardrail or negative-test — see §4.3 |
| `selectedCode` (excluding Allowed suffix) | 68 matches | All type-def, guard, or negative-test — see §4.4 |
| `releasedCode` (excluding Allowed suffix) | 56 matches | All type-def, guard, or negative-test — see §4.4 |
| `CLASSIFIED` | 30 matches | All: type-def, prohibition-constant, or guard — see §4.5 |
| `A4R184` in runtime/tests | **0 matches** | CLEAN — no quarantine dependency |

---

## 3. Verdict

### **PASS_WITH_WARNINGS**

All tests pass. No active violations found. Two medium-impact items identified that are safe to carry forward but must be tracked and resolved before any real-author-decision production path.

---

## 4. Findings

### 4.1 BLOCKER — None

No blockers found.

### 4.2 HIGH — None

No high-severity findings found.

### 4.3 MEDIUM

#### MEDIUM-01: `normalizeDecision` silent fallback to `PENDING_AUTHOR_DECISION`

**File:** `frontend/src/lib/sera-vnext/author-node-intake-adapter.ts:95-112`

**Description:** The `normalizeDecision` function maps any unrecognized `authorDecision` string value (e.g. a typo like `'ACCEPTED'`, `'APPROVE'`, `'ACCEPT'`) silently to `'PENDING_AUTHOR_DECISION'` without logging a blocking issue or warning. The behavior is conservative (axis becomes PENDING rather than proceeding), but the silence means bad data passes through the intake without an audit trail entry.

**Impact:** Low operational risk (conservative fallback blocks rather than permits). Medium data-quality risk: real author intake records with typos in the `authorDecision` field would silently stall a traversal as PENDING rather than being flagged for correction.

**Recommendation:** Add a `blockingIssues.push(...)` entry when fallback is triggered due to an unrecognized string value. Distinguish between: (a) truly null/empty → PENDING is correct; (b) non-null, unrecognized → PENDING + blocking issue.

**Severity:** MEDIUM — conservative but silent. Should be resolved before any production intake path.

---

### 4.4 LOW

#### LOW-01: `candidateOnlyLeafCode` accessible without programmatic barrier at field level

**File:** `frontend/src/lib/sera-vnext/canonical-traversal.ts` — `CanonicalTraversalLeafCandidate`

**Description:** The `candidateOnlyLeafCode: CanonicalSeraLeafCode` field is a typed leaf code. Its enclosing struct has `classificationAllowed: false`, `selectedCodeAllowed: false`, `notFinalClassification: true` — semantic guards. However, nothing in the TypeScript type system prevents a future frontend developer from reading `leafCandidate?.candidateOnlyLeafCode` and using it as a display code or passing it to a classification path without checking the guard fields. The naming `candidateOnlyLeafCode` is strong but not opaque.

**Impact:** LOW for current code (all assertNoFinalClassification checks catch violations at runtime). Medium risk for future integration paths if the lock fields are not respected.

**Recommendation:** Before A4R190-K integration, document the expected consumption contract explicitly in a TypeDoc comment or enforce via a branded/opaque type that prevents assignment to `CanonicalSeraLeafCode` in non-candidate contexts.

**Severity:** LOW — no current violation; flagged for integration hardening.

#### LOW-02: `exactQuestionTextPt` mismatch check is optional (nil-safe)

**File:** `frontend/src/lib/sera-vnext/author-node-intake-adapter.ts:249-253`

**Description:** The question text mismatch guard only fires when `record.exactQuestionTextPt` is non-null. Records from legacy intake pipelines that omit this field will bypass the question text cross-check. This is by-design for backwards compatibility but creates a potential gap if intake records are generated by tools that never populate this field.

**Impact:** LOW — traversal correctness is enforced by canonical node index regardless; question text is informational. Risk is that a methodologically different question text could slip in without flagging.

**Recommendation:** Consider making this check mandatory for new A4R187 intake records generated after A4R190 deployment. Flag as INFO in A4R190-K planning.

**Severity:** LOW.

---

### 4.5 INFO

#### INFO-01: O-E fully covered by multi-layer guards

All O-E paths verified:
- `assertCanonicalSeraLeafCode('O', 'O-E')` → throws NON_EXISTENT_IN_SERA_PT_V1
- `validateCanonicalTraversalAnswer('O_RULES', 'O-E')` → INVALID_ANSWER
- `advanceCanonicalTraversal` → AXIS_TRAVERSAL_BLOCKED if leaf code is O-E
- Human decision validation → blocks O-E in PROPOSE_CODE path
- Code release gate → assertCanonicalSeraLeafCode blocks O-E
- Precondition derivation → explicitly blocked for O-E
- Code traceability → O-E status = NON_EXISTENT_CODE
- Evidence category coverage → skips O-E
- 12+ dedicated negative tests passing

**Classification: LOCK/GUARDRAIL — fully compliant.**

#### INFO-02: CLASSIFIED emission blocked at all traversal layers

`CLASSIFIED` appears in:
- `types.ts` as enum value in `PoaAxisStatus` (type definition — expected)
- `constants.ts` as prohibited output
- `steps/11-human-review.ts` as prohibited status in axis contracts
- `canonical-traversal-adapter.ts` checking `status === 'CLASSIFIED'` as violation guard
- All traversal/adapter outputs have `selectedCodeAllowed: false`, `releasedCodeAllowed: false`
- No path in A4R190 scope emits `status: 'CLASSIFIED'`

**Classification: LOCK/GUARDRAIL — fully compliant.**

#### INFO-03: No invented questions, no event-specific questions

Zero matches for `P-1|P-2|O-1|O-2|A-1|A-2|Pergunta por eixo|case-specific question|auxiliary question` in runtime, tests, or docs.

All question texts are locked to `exactQuestionTextPt`/`exactQuestionTextEn` from SERA_CANONICAL_TREE_NODES (A4R99 asset). No question injection possible.

**Classification: CLEAN.**

#### INFO-04: No A4R184 quarantine dependency

Zero matches for A4R184 in runtime or test files. The runtime references A4R185 (node inventory), A4R187 (author intake), A4R99 (canonical tree). Quarantine boundary respected.

**Classification: CLEAN.**

#### INFO-05: Cross-axis injection protected at multiple layers

- `buildNodeTransitionIndex()`: validates all rows for a nodeId share same axis
- `advanceCanonicalTraversal`: checks `node.axis !== input.axis` → AXIS_TRAVERSAL_BLOCKED
- `simulateAxisTraversal`: checks `nodeAxis !== input.axis` → TRAVERSAL_BLOCKED_BY_INVALID_NODE
- `adaptAxisRecords`: checks `descriptor.axis !== record.axis` → adds to blockingIssues

**Classification: LOCK/GUARDRAIL — compliant.**

#### INFO-06: `selectedCode`/`releasedCode` scan classification

All 68 `selectedCode` matches and 56 `releasedCode` matches classified as:
- **Type definition** in `types.ts` (expected schema fields for legacy POA path and downstream pipeline)
- **Guard checks** in `preconditions.ts`, `semantic-consistency.ts`, `code-traceability.ts`, `steps/10-causal-assurance.ts` — all verify `selectedCode === 'UNRESOLVED'` or `status !== 'CLASSIFIED'` (lock enforcement)
- **Assertion guards** in `canonical-traversal.ts` and `canonical-traversal-adapter.ts` — `assertNoFinalClassification` and `assertAdapterOutputLocks` check that `selectedCode`/`releasedCode` are NOT properties on traversal outputs
- **Negative-control tests** asserting absence of these fields in traversal outputs

Zero hits represent unauthorized emission of classified codes from the A4R190 candidate-only layer.

**Classification: FALSE_POSITIVE (all documented as guards/locks/type-defs).**

---

## 5. Answers to 20 Audit Questions

**Q1. A árvore canônica A4R99 está representada corretamente em runtime?**
YES. `canonical-tree.ts` has 34 rows (NINV-0001 through NINV-0034), 15 unique nodeIds, covering P=13 rows, O=7 rows, A=14 rows. `assertCanonicalTreeInventoryInvariants()` enforces these counts at runtime. Node texts are bilingual PT/EN in `exactQuestionTextPt`/`exactQuestionTextEn`.

**Q2. Os 34 rows e 15 nodeIds continuam coerentes com A4R185?**
YES. Runtime invariant confirmed: 34 rows, P=13, O=7, A=14. Unique nodeIds: O_ROOT, O_RULES, O_ROUTINE, O_MANAGED_RISK (4); P_ROOT, P_ASSESSMENT, P_CAPABILITY, P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE (6); A_ROOT, A_IMPLEMENTED, A_CORRECT, A_CAPABILITY, A_TIME_PRESSURE (5) = 15 total.

**Q3. Os 22 leaf codes ativos estão cobertos e O-E permanece NON_EXISTENT_IN_SERA_PT_V1?**
YES. P: 8 (P-A through P-H), O: 4 (O-A through O-D), A: 10 (A-A through A-J) = 22 active. O-E is in `SERA_CANONICAL_NON_EXISTENT_CODES` and `SERA_CANONICAL_FORBIDDEN_CODES`. `assertCanonicalSeraLeafCode('O', 'O-E')` throws.

**Q4. A travessia canonical-traversal continua candidate-only?**
YES. Every output from `advanceCanonicalTraversal` and `runCanonicalAxisTraversal` carries `selectedCodeAllowed: false`, `releasedCodeAllowed: false`, `notFinalClassification: true`, `poaClosureAllowed: false`. Leaf structs carry `candidateOnly: true`, `classificationAllowed: false`.

**Q5. candidateOnlyLeafCode está suficientemente protegido contra uso indevido como classificação?**
MOSTLY. Structural guards are in place (classificationAllowed: false, notFinalClassification: true, assertNoFinalClassification). Gap: TypeScript type does not prevent direct field access without checking guards. See LOW-01.

**Q6. O adapter A4R190-E preserva locks?**
YES. `withCandidateOnlyLocks()` is applied to every return path. `assertAdapterOutputLocks()` is available for explicit verification. Lock fields are false literal types enforced at compile time.

**Q7. O adapter A4R190-I lida corretamente com A4R187 real PENDING_AUTHOR_DECISION?**
YES. `normalizeDecision(null|undefined|empty)` → 'PENDING_AUTHOR_DECISION'. When `hasPendingDecision` is true, `buildPendingAxisResult()` returns `AUTHOR_DECISION_PENDING`, `leafCandidate: null`, locks enforced. Real PENDING entries do NOT produce leaf candidates.

**Q8. Mock decisions nos testes estão claramente isolados de decisão autoral real?**
YES. Tests use `answerSource: 'TEST_FIXTURE'`. Real intake adapter path uses `'AUTHOR_DECISION'`. The `author-node-intake-adapter-trial-001.ts` explicitly labels mock decisions. No real A4R187 fixtures are loaded in tests.

**Q9. Existe qualquer caminho que gere selectedCode, releasedCode, CLASSIFIED ou downstream indevido?**
NO, within A4R190 scope. The candidate-only traversal layer cannot emit these. The downstream pipeline (code-release, semantic-consistency, traceability, preconditions) can produce `releasedCode` but only AFTER explicit human-review gate passage (assertCanonicalSeraLeafCode enforced). No auto-promotion path exists.

**Q10. Existe qualquer pergunta inventada ou pergunta por evento?**
NO. Zero matches in scan. All questions are locked to `exactQuestionTextPt`/`exactQuestionTextEn` from canonical tree asset A4R99.

**Q11. Existe qualquer dependência indevida de A4R184 quarantined?**
NO. Zero matches for A4R184 in runtime or test files. Quarantine boundary respected.

**Q12. Existe risco de o frontend futuro ler leaf candidate como resultado final?**
LOW risk. Field naming (`candidateOnlyLeafCode`) is strong deterrent. Lock fields protect against compliant use. No structural enforcement at TypeScript type level preventing bypass. See LOW-01. Recommend branded type or access contract before A4R190-K integration.

**Q13. Existe risco de o intake adapter normalizar erro como pending indevidamente?**
LOW. When `blockingIssues.length > 0`, `buildInvalidAxisResult` is correctly returned (not pending). The pending path is only reached after zero blocking issues. Structural guards are in place. See MEDIUM-01 for the silent fallback case.

**Q14. Existe risco de authorDecision inválido virar PENDING_AUTHOR_DECISION silenciosamente?**
**YES — MEDIUM.** `normalizeDecision()` silently maps any unrecognized string to `PENDING_AUTHOR_DECISION` without emitting a blocking issue. This is conservative (blocks traversal) but silent (no audit trail of the bad value). Must be corrected before any production intake path. See MEDIUM-01.

**Severity: MEDIUM. Recommendation: add `blockingIssues.push('UNKNOWN_AUTHOR_DECISION_VALUE: [value]')` when a non-null, non-empty, unrecognized value falls through to the PENDING fallback.**

**Q15. Existe risco de exactQuestionTextPt divergente não bloquear corretamente?**
LOW. The check fires only when the field is provided. For records that omit `exactQuestionTextPt`, no mismatch check occurs. Traversal correctness is maintained by the node index regardless. See LOW-02.

**Q16. Existe risco de cross-axis injection?**
VERY LOW. Four independent guards: (1) buildNodeTransitionIndex axis homogeneity check, (2) advanceCanonicalTraversal axis mismatch block, (3) simulateAxisTraversal axis mismatch block, (4) adaptAxisRecords axis mismatch blockingIssue.

**Q17. Existe risco de O-E injection?**
VERY LOW. Seven independent layers block O-E. All negative-control tests pass. See INFO-01.

**Q18. Existe risco de leaf code ser usado como answerValue?**
VERY LOW. BranchConditions are semantic labels (SIM, NÃO, SIM_ATENCAO, NÃO_SENSORIAL, etc.). Leaf codes (P-A, A-J, etc.) are not valid branchCondition values. `validateCanonicalTraversalAnswer` rejects any value not in `node.transitions[*].answerValue`. Hardening tests pass.

**Q19. O modelo PT/EN permanece seguro, sem idioma influenciar decisão metodológica?**
YES. Locale only controls display (`getCanonicalQuestionText`). Traversal logic uses `branchCondition` identifiers, never question text. No language-driven routing. CLEAN.

**Q20. A próxima fase pode avançar para integração limitada ou ainda precisa hardening?**
**CAN ADVANCE to limited integration (A4R190-K)**, with one tracked correction before any real-author production path: resolve MEDIUM-01 (silent normalizeDecision fallback). LOW-01 and LOW-02 should be tracked but do not block A4R190-K scoped integration.

---

## 6. Objective Recommendations

### A4R190-K Direction

**Recommendation: Limited integration with pre-integration hardening of MEDIUM-01.**

- Before A4R190-K: resolve MEDIUM-01 (`normalizeDecision` silent fallback)
- A4R190-K may proceed as: intake adapter integration into real pipeline with real A4R187 records in controlled/isolated scope
- All candidate-only locks must remain enforced in A4R190-K output
- No P/O/A closure, no downstream unlock

### Opus Requirement

**Opus is NOT required for A4R190-K.** Sonnet-level audit is sufficient. Opus may be optionally invoked if methodological disagreement emerges between Sonnet and a prior ChatGPT review on semantic classification questions (per A4R190-J readiness plan guidance).

---

## 7. ZIP for ChatGPT

ZIP file created at:
`tmp/a4r190j-independent-runtime-review-for-chatgpt-TIMESTAMP.zip`

(See §8 for path with timestamp)

---

## 8. Confirmations

| Item | Status |
|---|---|
| git add | NOT executed |
| git commit | NOT executed |
| git push | NOT executed |
| Runtime modified | NO — only audit documents created |
| Tests modified | NO |
| Frontend UI modified | NO |
| API modified | NO |
| DB/supabase/migrations modified | NO |
| Fixtures/baseline modified | NO |
| Source-corpus modified | NO |
| LLM pipeline run | NO |
| P/O/A closure | NO |
| selectedCode/releasedCode/finalConclusion generated | NO |

---

*Generated by: claude-sonnet-4-6 | Phase: A4R190-J | Date: 2026-05-31*
