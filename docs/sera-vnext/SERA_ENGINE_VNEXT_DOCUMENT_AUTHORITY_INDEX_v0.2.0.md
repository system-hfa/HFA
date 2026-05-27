# SERA Engine vNext — Document Authority Index v0.2.0

**Document Status**: ACTIVE / NORMATIVE
**Authority Tier**: Tier 0
**Can override canonical method lock?**: NO
**Can be used for P/O/A classification?**: NO (metadata only)

---

## 1. Purpose

This index defines the authority hierarchy of all documents under `docs/sera-vnext/`. Its purpose is to prevent agents and reviewers from using historical, exploratory, superseded, blocked, or REWORK_REQUIRED documents as if they were current methodology.

This document is the entry point for any agent or human reviewer entering this directory. Read this first.

## 2. Master Rule

**No agent shall use any document outside Tier 0 (Normative) to override, reinterpret, or amend the canonical method lock.**

If a document is not listed in Tier 0, it cannot define:
- P/O/A classification rules
- Question path structure
- Escape point placement
- Release criteria
- Code assignment semantics

Historical documents explain how we got here. They do not define where we are.

## 3. Mandatory Reading Order

Any P/O/A analysis, classification, or gate review MUST begin with these documents, in this order:

1. `SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md` — the canonical question tree lock
2. `SERA_ENGINE_VNEXT_A4R165_METHOD_VIOLATION_CONTAINMENT_v0.2.0.md` — what went wrong and what is blocked
3. `SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md` — methodology governance and decisions
4. `SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md` — candidate pool status and freeze criteria
5. `SERA_ENGINE_VNEXT_CLASSIFICATION_ELIGIBILITY_CHECKER_v0.2.0.md` — what can be classified
6. Active work package of the current phase (see Tier 1)

## 4. Authority Tiers

### Tier 0 — Normative / Active Method Lock

Documents that hold current methodological authority. These define the rules.

| Document | Role |
|----------|------|
| `SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md` | Canonical question tree. Defines the only valid question path for P/O/A. |
| `SERA_ENGINE_VNEXT_A4R165_METHOD_VIOLATION_CONTAINMENT_v0.2.0.md` | Records the A4R165 methodology violation and all containment measures. |
| `SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md` | All methodology decisions, locks, and governance records. |
| `SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md` | Candidate pool status, selection criteria, freeze rules. |
| `SERA_ENGINE_VNEXT_CODE_RELEASE_GATE_v0.2.0.md` | Release gate rules. Defines what can be released and when. |
| `SERA_ENGINE_VNEXT_CLASSIFICATION_ELIGIBILITY_CHECKER_v0.2.0.md` | Rules for determining classification eligibility. |
| `SERA_ENGINE_VNEXT_POA_CLASSIFICATION_GATEWAY_v0.2.0.md` | P/O/A classification entry point and constraints. |
| `SERA_ENGINE_VNEXT_ELIGIBILITY_CALIBRATION_AND_WAIVER_GOVERNANCE_v0.2.0.md` | Waiver governance and calibration rules. |
| `SERA_ENGINE_VNEXT_SUPERSEDED_AND_QUARANTINE_REGISTER_A4R135_v0.2.0.md` | Register of superseded/quarantined documents. |
| `SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md` | This document. |

**Allowed use**: Define methodology, classify P/O/A, set release criteria, resolve disputes.
**Not allowed for**: Nothing — these are authoritative for all methodology decisions.
**Misuse risk**: None when used as intended. Risk only arises if an agent ignores Tier 0 and reads lower tiers as normative.

### Tier 1 — Active Work Package

Documents of the current active phase. These are draft / in review. They implement Tier 0 rules, they do not replace them.

**Current active phase**: A4R166 — Minimal Canonical Event Test

| Document | Role |
|----------|------|
| `minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md` | A4R166 test plan |
| `minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv` | A4R166 test matrix |
| `minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md` | A4R166 author approval dossier |
| `minimal-canonical-event-test/EXECUFLIGHT-1526_SOURCE_SLICE_A4R166_v0.2.0.md` | A4R166 EXECUFLIGHT source slicing |
| `SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md` | Active A4R166 correction rule: single escape point + multi-actor contributions |
| `second-author-confirmed-gates-a4r162/` (all files) | Second author gate confirmations |
| `approved-gates-a4r161/` (all files) | Approved gate set |
| `SERA_ENGINE_VNEXT_APPROVED_GATE_SET_A4R161_v0.2.0.md` | Gate set summary |
| `SERA_ENGINE_VNEXT_SECOND_AUTHOR_GATE_CONFIRMATION_A4R162_v0.2.0.md` | Second author confirmation summary |
| `author-review-gates-a4r160/` (all files) | Author gate review decisions |
| `gate-prep-a4r159/` (all files) | Original gate prep drafts |
| `poa-pilot-authorization-a4r164/` (all files) | POA pilot authorization |
| `poa-pilot-design-a4r163/` (all files) | POA pilot design |

**Allowed use**: Read for context of current phase. Reference for gate decisions still in review.
**Not allowed for**: Overriding Tier 0. Defining new P/O/A rules. Setting release criteria not already in Tier 0.
**Misuse risk**: Medium — drafts may contain provisional language later revised. Always cross-check with Tier 0.

### Tier 2 — Historical / Context Only

Documents from previous phases. Useful for understanding the evolution of the methodology, but carry no normative authority.

This tier includes all documents under these directories and prefixes that are NOT listed in Tier 0 or Tier 1:

- `post-opus-a4r153/` — post-Opus audit planning
- `source-recovery-a4r154/`, `source-recovery-a4r155/`, `source-recovery-a4r156/` — source recovery phases
- `source-hygiene-a4r151/` — source hygiene execution
- `integrated-corpus-reconciliation-a4r150/` — corpus reconciliation
- `registry-integrity-a4r157/` — registry integrity audit
- `registry-correction-a4r158/` — registry correction overlay
- `lane-a-source-slices-a4r144/` — lane A source slices
- `gate-readiness-a4r145/` — gate readiness drafts
- `escape-point-gates-a4r146/` — escape point gate drafts
- `negative-controls-a4r145/` — negative control drafts
- `author-review-packets-a4r131/` — author review packets
- `real-event-escape-point-reaudit/` — escape point reaudit
- `real-event-reaudits-a4r139/` — reaudit execution
- `release-pilot/`, `release-pilot-author-packets/` — P-axis release pilot
- `official-report-source-slices/` — source slice archives
- `external-candidates/`, `external-candidates-a4r149/` — external candidate discovery
- `reference-cases/` — reference case designs
- `SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_*_A4R147_*.md` — synthetic event governance
- `SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_*_A4R142_*.md` — HF corpus screening
- `SERA_ENGINE_VNEXT_PROGRESSIVE_ESCAPE_POINT_GUIDANCE_A4R140_v0.2.0.md` — escape point guidance
- `SERA_ENGINE_VNEXT_POA_AT_ESCAPE_POINT_METHOD_RESET_A4R137_v0.2.0.md` — method reset
- All `SERA_ENGINE_VNEXT_A4R{68..158}_*.md` files not listed in Tier 0
- All `SERA_ENGINE_VNEXT_REAL_EVENT_*_A4R*.md` files not listed in Tier 0

**Allowed use**: Historical reference. Understanding why certain decisions were made. Tracing the evolution of a rule.
**Not allowed for**: Defining current P/O/A. Overriding Tier 0. Setting release criteria.
**Misuse risk**: High — these documents may contain rules that were later revised, superseded, or rejected. Always cross-check with Tier 0.

### Tier 3 — Blocked / Rework Required / Do Not Use for Classification

Documents that must not be used for any methodological decision, P/O/A classification, or release activity.

| Document / Directory | Block Reason | Date |
|---------------------|--------------|------|
| `poa-pilot-execution-a4r165/` (ALL files) | **METHODOLOGY_VIOLATION — REWORK_REQUIRED** | 2026-05-26 |
| `SERA_ENGINE_VNEXT_FIRST_POA_PILOT_DRAFT_EXECUTION_A4R165_v0.2.0.md` | **METHODOLOGY_VIOLATION — REWORK_REQUIRED** | 2026-05-26 |
| `SERA_ENGINE_VNEXT_MULTI_ACTOR_ESCAPE_POINT_RULE_A4R166_v0.2.0.md` | **SUPERSEDED_BY_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE / DO_NOT_USE_FOR_CLASSIFICATION** | 2026-05-27 |
| `archive/exploratory/` | Explored but rejected paths — never normative | — |
| `archive/invalid-methodology/` | Contains known-method-violation documents | — |
| `archive/pre-canonical/` | Pre-dates canonical question tree lock | — |
| `archive/superseded/` | Explicitly superseded by later documents | — |
| Any document referenced in `SERA_ENGINE_VNEXT_SUPERSEDED_AND_QUARANTINE_REGISTER_A4R135_v0.2.0.md` as QUARANTINED or SUPERSEDED | Per register | — |

**Allowed use**: Understanding what went wrong (A4R165). Understanding rejected paths. Reference for containment rules.
**Not allowed for**: Any P/O/A classification. Any releasedCode. Any downstream. Any methodology decision. Any gate definition.
**Misuse risk**: Critical — using Tier 3 documents can reintroduce methodology violations that were explicitly blocked.

### Tier 4 — Source / Corpus / Candidate Material

Documents that contain evidence, extraction data, adjudications, or candidate information. These feed Tier 0 analysis but cannot define methodology.

This tier includes:

- `source-corpus/` — all subdirectories (official-reports, txt-events, perplexity-candidates)
- `source-enrichment/` — source enrichment executions
- `reference-case-traces/` — canonical trace drafts for reference cases
- `real-event-extractions/`, `real-event-extractions-batch-2/`, `real-event-extractions-batch-3/` — structured extractions
- `real-event-adjudications/`, `real-event-adjudications-batch-2/`, `real-event-adjudications-batch-3/` — adjudication records
- `real-event-narratives/` — guarded narrative drafts
- `real-event-questionpath-backfill/` — question path backfill records

**Allowed use**: Source evidence for Tier 0 analysis. Feeding candidate data into classification. Verifying factual claims.
**Not allowed for**: Defining P/O/A rules. Setting methodology. Overriding Tier 0.
**Misuse risk**: Medium — evidence can be misinterpreted as methodology. Always apply Tier 0 rules to Tier 4 data.

## 5. A4R165 — Registration of Blocked Work

A4R165 (First POA Pilot Draft Execution) is **BLOCKED** with the following status:

- **Reason**: METHODOLOGY_VIOLATION — used non-canonical questions, produced P/O/A draft outputs without acceptable canonical-method demonstration and was blocked before any release/downstream use.
- **Containment**: All A4R165 documents are in `poa-pilot-execution-a4r165/` and marked REWORK_REQUIRED.
- **Containment document**: `SERA_ENGINE_VNEXT_A4R165_METHOD_VIOLATION_CONTAINMENT_v0.2.0.md`
- **Status**: DO NOT USE for any methodological reference, P/O/A classification, releasedCode, or downstream.
- **Next**: Rework is required before any A4R165 content can be reconsidered.

## 6. A4R166 — Active Work Package

A4R166 (Minimal Canonical Event Test) is the **current active phase**:

- **Status**: Draft-only. Pending author approval.
- **Scope**: Minimal canonical event test — testing whether the canonical question tree lock correctly handles a minimal event.
- **Downstream**: NO downstream allowed. No releasedCode. No finalClassification.
- **Files**: `minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md` and associated matrix.
- **After approval**: May proceed to broader test execution.

## 7. Future Document Marking Requirement

All new documents created under `docs/sera-vnext/` MUST declare at the top:

```markdown
**Document Status**: [ACTIVE / DRAFT / SUPERSEDED / BLOCKED / HISTORICAL]
**Authority Tier**: [0 / 1 / 2 / 3 / 4]
**Can be used for P/O/A classification?**: [YES / NO]
**Can override canonical method lock?**: NO
**Downstream allowed?**: [YES / NO]
```

Existing documents will be marked progressively. Tier 0 documents should be marked first.

## 8. Recommended Next Step

After this index receives author approval:
1. Mark all Tier 0 documents with status headers.
2. Consider moving documents currently in Tier 3 to `archive/` subdirectories (NOT deletion — archive only).
3. Add a pre-commit or pre-agent hook that warns if a document outside Tier 0 is used as a methodology reference.

Do NOT move or archive Tier 2 documents yet — some may be needed as context for the current A4R166 phase.

## 9. Validity

This index is valid until the next Methodology Control Board update. It must be reviewed whenever a new phase begins or when a document changes tier.
