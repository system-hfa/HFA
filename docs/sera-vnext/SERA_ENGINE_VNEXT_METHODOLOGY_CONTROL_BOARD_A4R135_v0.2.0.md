# SERA Engine vNext Methodology Control Board A4R135 v0.2.0

Status: CONTROL_BOARD_RECORDED
Phase: A4+R-135
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Establish a single source of truth for the methodological status of all real events in the SERA vNext program. This document is the authoritative index for what can and cannot be used as reference, training material, calibration case, or release candidate.

## Rationale

After A4R126 through A4R134, the repository accumulated multiple layers of documents (pre-gate adjudications, helper traces, withdrawn releases, superseded artifacts). Without a control board, any agent or human could pick up a stale document and treat it as current methodology. This board prevents that.

## A4R137 OVERRIDE — P/O/A at Escape Point Rule

**A4R137 supersedes all prior P/O/A author draft statuses for real events unless explicitly reaudited under the "P/O/A at escape point" rule.**

- REAL-EVENT-0003 AUTHOR_APPROVED_DRAFT_PARTIAL is **suspended** for P/O/A reference use pending at-escape-point reaudit.
- All P/O/A from A4R129, A4R130, A4R131, A4R132 (approval interpretations), A4R133 (approval), and A4R136 (decision forms) is suspended as current reference.
- Control Board status must now be read through the [A4R137 Reset Register](./SERA_ENGINE_VNEXT_REAL_EVENT_POA_REAUDIT_RESET_REGISTER_A4R137_v0.2.0.md).
- P/O/A analysis must occur at the moment of the escape point, not from post-escape events.

## Supreme Rules

1. **Escape point before P/O/A.** No event can be used as a reference case without a validated Hendy escape-point gate ("Quando..." statement).
2. **P/O/A at escape point.** P/O/A must be analyzed at the moment the operation left the safe state, not from post-escape events. (A4R137)
3. **"Quando..." must not embed cause, violation, SERA code, or warning as first departure.** The phrase must describe an observable act/condition.
4. **The canonical SERA question tree must not be invented.** Only questions from the A4R99 canonical asset or the Hendy/Daumas source tree are valid.
5. **proposedCode is not releasedCode.** No draft P/O/A creates release authority.
6. **Author-approved draft partial is not full release.** AUTHOR_APPROVED_DRAFT_PARTIAL is scoped to the approved axes only.
7. **Downstream remains blocked.** No event has downstream opened.

## Valid Methodological Statuses

| status | description | usableAsReference | usableForTraining | usableForCalibration |
|---|---|---|---|---|
| CURRENT_VALID | Fully validated by author, Hendy gate, and canonical tree. | YES | YES | YES |
| AUTHOR_APPROVED_DRAFT_PARTIAL | Approved only on specific axes. | ONLY on approved axes | ONLY on approved axes | ONLY on approved axes |
| AUTHOR_APPROVED_DRAFT_FULL | Approved on all three axes. | YES | YES | YES |
| ACTIVE_REVIEW | Under author or methodological review. | NO | NO | NO |
| NEEDS_REBUILD | Requires full rebuild with escape-point gate. | NO | NO | NO |
| NEEDS_SOURCE_ENRICHMENT | Requires additional source evidence. | NO | NO | NO |
| PARKED | Parked for boundary, technical, or actor reasons. | NO | NO | NO |
| SUPERSEDED | Replaced by a newer document or analysis. | NO | NO | NO |
| INVALID_FOR_REFERENCE_USE | Contains methodological errors (noncanonical, contaminated). | NO | NO | NO |
| HISTORICAL_ONLY | Preserved for traceability only. | NO | NO | NO |
| DO_NOT_USE_FOR_TRAINING | Explicitly blocked from training use. | NO | NO | NO |
| DO_NOT_USE_FOR_RELEASE | Explicitly blocked from release. | NO | NO | NO |
| DO_NOT_USE_FOR_CALIBRATION | Explicitly blocked from calibration. | NO | NO | NO |

## Master Event Table — Priority 7 Events

| eventId | name/alias | currentStatus | escapePointStatus | whenStatus | P | O | A | usableAsExampleFor | restrictions | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | Tofino night approach near-CFIT | PARTIAL_REAUDIT_AT_ESCAPE_POINT (A4R139) | SOURCE_PARTIAL (A4R139) | CANDIDATE (A4R139: progressive degradation zone, not single discrete moment) | UNRESOLVED (A4R139: perception evidence at first deviation moment insufficient) | O-A (A4R139: objective to land safely validated at escape point, HIGH confidence) | UNRESOLVED (A4R139: actions documented are post-escape corrective, not at escape-point moment) | O-A draft only | P and A UNRESOLVED; prior P-G NOT reinstated; NO_RELEASED_CODE; NO_DOWNSTREAM; PF/PM chain not closed | AUTHOR_REVIEW; P source enrichment or accept UNRESOLVED; A PF/PM decomposition |
| REAL-EVENT-0016 | N8DX automation confusion LOC | ACTIVE_REVIEW_SOURCE_ENRICHED (A4R141 + A4R141-b) | DEFINED (A4R130) | VALID (A4R130) | P-C | O-A | UNRESOLVED | NONE until pilot 2 reaudit at escape point | A4R141-b supplemental 89-TXT corpus search confirmed interpretation/mode-state evidence as dominant; no confirmed preimpact autopilot hardware failure; mode-state/action chain still partially unresolved; NO_RELEASED_CODE; NO_DOWNSTREAM | PILOT_2_REAUDIT_CONDITIONAL_ENTRY |
| BS211-Q400 | Unstable approach sequence | NEEDS_REBUILD | PATCHED (A4R134 gate patch draft) | REVISED (A4R134: "com perda de estabilidade e desalinhamento de pista") | P-H | O-C | A-F | NONE | Gate patch NOT approved; O-C/A-F high overclassification risk; "fora da trajetoria atribuida" removed but O-C/A-F not yet revised; NO_RELEASED_CODE; NO_DOWNSTREAM | AUTHOR_REVIEW_AFTER_GATE_PATCH |
| A4R87-EXT-002 | AW139 night over-water warning sequence | NEEDS_REBUILD | PATCHED (A4R134 escape point patch draft) | REVISED (A4R134: "perfil de altitude degradado com separacao vertical reduzida") | P-G | UNRESOLVED | UNRESOLVED | NONE | Gate patch NOT approved; EGPWS removed as temporal core but degradation timing confidence is MEDIUM; O/A UNRESOLVED; NO_RELEASED_CODE; NO_DOWNSTREAM | AUTHOR_REVIEW_AFTER_GATE_PATCH |
| ASIANA-214 | Asiana 214 visual approach energy deviation | ACTIVE_REVIEW | DEFINED (A4R130) | VALID (A4R130) | P-G | O-D | A-F | NONE until author decision | O-D threshold and A-F vs A-E boundary require conscious author decision; NO_RELEASED_CODE; NO_DOWNSTREAM | COLLECT_AUTHOR_DECISION |
| AMERICAN-965 | American 965 CFIT | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED (A4R126) | UNRESOLVED | review | O-D review | review | NONE | Source-enrichment lane; NO_RELEASED_CODE; NO_DOWNSTREAM | SOURCE_ENRICHMENT_BEFORE_REBUILD |
| COMAIR-5191 | Comair 5191 wrong-runway takeoff | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED (A4R126) | UNRESOLVED | P-G draft | UNRESOLVED | UNRESOLVED | NONE | P-G is internal/boundary draft only; O/A need source slice; NO_RELEASED_CODE; NO_DOWNSTREAM | SOURCE_ENRICHMENT_BEFORE_REBUILD |

## Master Event Table — All 52 A4R126 Events (Compact)

### QUEUE A — When-Only (3 events): CURRENT_VALID when-statement, P/O/A draft retained

| eventId | currentStatus | P | O | A | restrictions |
|---|---|---|---|---|---|
| UPS-1354 | CURRENT_VALID (when gate recovered A4R128) | P-G draft | O-D draft | A-F draft | Double-counting warning active; NO_RELEASE |
| COLGAN-3407 | CURRENT_VALID (when gate recovered A4R128) | P-G draft | O-A draft | A-F draft | A-F/A-E boundary live; NO_RELEASE |
| UNITED-173 | CURRENT_VALID (when gate recovered A4R128) | P-G draft | O-D draft | A-F draft | OCR/source-quality caveat; NO_RELEASE |

### QUEUE B — POA Review (14 events)

| eventId | currentStatus | P | O | A | nextAction |
|---|---|---|---|---|---|
| REAL-EVENT-0001 | PARKED (P1, viable draft) | P-G | O-A | UNRESOLVED | POA_REVIEW |
| REAL-EVENT-0003 | AUTHOR_APPROVED_DRAFT_PARTIAL | P-G | O-A | UNRESOLVED | FUTURE_RELEASE_GOVERNANCE |
| REAL-EVENT-0016 | ACTIVE_REVIEW_SOURCE_ENRICHED (A4R141 + A4R141-b) | P-C | O-A | UNRESOLVED | PILOT_2_REAUDIT_CONDITIONAL_ENTRY |
| BS211-Q400 | NEEDS_REBUILD | P-H | O-C | A-F | AUTHOR_REVIEW_AFTER_GATE_PATCH |
| A4R87-EXT-002 | NEEDS_REBUILD | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_AFTER_GATE_PATCH |
| D-HHNH | PARKED (P1) | P-G | O-A | UNRESOLVED | POA_REVIEW |
| G-BHYB | PARKED (P1) | P-F | O-A | UNRESOLVED | POA_REVIEW |
| HL9294 | PARKED (P1) | P-G | O-D | UNRESOLVED | POA_REVIEW |
| A4R87-EXT-001 | PARKED (P1) | P-G | UNRESOLVED | UNRESOLVED | POA_REVIEW |
| A4R87-EXT-008 | PARKED (P1) | P-C | UNRESOLVED | UNRESOLVED | POA_REVIEW |
| A4R87-EXT-012 | PARKED (P1) | P-C | UNRESOLVED | UNRESOLVED | POA_REVIEW |
| ASIANA-214 | ACTIVE_REVIEW | P-G | O-D | A-F | COLLECT_AUTHOR_DECISION |
| AMERICAN-965 | NEEDS_SOURCE_ENRICHMENT | review | O-D review | review | SOURCE_ENRICHMENT |
| COMAIR-5191 | NEEDS_SOURCE_ENRICHMENT | P-G draft | UNRESOLVED | UNRESOLVED | SOURCE_ENRICHMENT |

### QUEUE C — Full Rebuild (4 events)

| eventId | currentStatus | priorP | priorO | priorA | nextAction |
|---|---|---|---|---|---|
| REAL-EVENT-0015 | NEEDS_REBUILD | P-G (withdrawn A4R92) | O-A | UNRESOLVED | FULL_REBUILD |
| N109W | NEEDS_REBUILD | P-G (withdrawn A4R92) | O-D | UNRESOLVED | FULL_REBUILD |
| N11NM | NEEDS_REBUILD | P-C (withdrawn A4R92) | O-A | UNRESOLVED | FULL_REBUILD |
| AMERICAN-1420 | NEEDS_REBUILD | P-D contested | O-C | A-C | FULL_REBUILD |

### QUEUE D — Source Enrichment (11 events): NEEDS_SOURCE_ENRICHMENT

REAL-EVENT-0028, REAL-EVENT-0005, REAL-EVENT-0013, REAL-EVENT-0007, REAL-EVENT-0009, REAL-EVENT-0011, REAL-EVENT-0032, REAL-EVENT-0033, A4R87-EXT-007, EASTERN-401, HELIOS-522

### QUEUE E — Parked (19 events): PARKED

REAL-EVENT-0002, REAL-EVENT-0004, REAL-EVENT-0006, REAL-EVENT-0010, N56RD, PR-CHI, N200BK, N127LN, N120HH, N525TA, A4R87-EXT-004, A4R87-EXT-006, US-AIRWAYS-1549, UNITED-232, ATLAS-3591, USAIR-427, TUROY EC225, KOREAN-801, plus REAL-EVENT-0014/0030 moved to QUEUE_F

### QUEUE F — Duplicate/Superseded (1 event)

| eventId | currentStatus | nextAction |
|---|---|---|
| REAL-EVENT-0014/0030 | SUPERSEDED | DEPENDENCY_CLEANUP |

## Scope of Permitted Use

| scope | CURRENT_VALID only | AUTHOR_APPROVED_DRAFT_PARTIAL | all others |
|---|---|---|---|
| Reference case for methodology | YES | Only on approved axes | NO |
| Training material | YES | Only on approved axes, with caveats | NO |
| Frontend calibration | YES | Only on approved axes, with caveats | NO |
| Release candidate | NO (requires separate governance) | NO | NO |
| Downstream consumption | NO | NO | NO |
| Consensus validation | NO (requires separate governance) | NO | NO |
| Historical traceability | YES | YES | YES |

## A4R142 Intake Note

A4R142 corpus screening artifacts are intake/screening material only.
They do not constitute P/O/A reference authority and must not be used as classified P/O/A evidence without event-level escape-point processing under A4R137/A4R138/A4R140.

## A4R143 Audit Overlay Note

- A4R143 audit overlay governs use of A4R142 screening artifacts.
- A4R142 does not create reference authority.
- Future Claude/Opus audit may be recorded as A4R144.

## A4R144 Source-Slice Intake Note

- A4R144 source-slice intake does not create P/O/A reference authority.
- A4R144 is planning-layer material for future reaudits under A4R137/A4R138/A4R140.

## A4R145 Gate Readiness and Negative Control Note

- A4R145 remains pre-gate and negative-control validation only.
- A4R145 does not create P/O/A reference authority.

## A4R146 Escape-Point Gate Draft Note

- A4R146 creates escape-point gate drafts only.
- A4R146 does not create P/O/A reference authority.

## A4R147 Synthetic Governance Note

- A4R147 governs future synthetic cases only.
- Synthetic cases do not create real-event reference authority.
- Synthetic cases cannot supersede real-event adjudications.

## A4R148 Opus Audit Handoff Note

- A4R148 is audit handoff prep only.
- A4R148 does not revise real events, synthetic cases, P/O/A, or reference authority.

## A4R149 External Candidate Discovery Note

- A4R149 external candidates are discovery-only.
- A4R149 external candidates do not create corpus authority.
- A4R149 external candidates do not create P/O/A reference authority.
- A4R149 external candidates must pass source recovery and extraction before operational use.

## A4R150 Integrated Reconciliation Note

- A4R150 integrated reconciliation does not create P/O/A reference authority.
- External candidates and local TXT candidates remain non-authoritative until source recovery + extraction + escape-point gate.

## A4R151 Source Hygiene Note

- A4R151 source hygiene verifies official-source readiness only.
- A4R151 does not create P/O/A reference authority.
- Source status upgrades in A4R151 do not authorize extraction or P/O/A without subsequent gated phases.

## A4R151b Source Recovery Addendum Note

- A4R151b does not change event methodology status.
- A4R151b corrects source readiness and Opus audit scope only.
- A4R151b confirms that OPUS_READY lanes are deep-review priorities and not an audit scope limit.

## A4R152 Opus Packet Assembly Note

- A4R152 assembles a local Opus audit packet only.
- The packet preserves integrated 89+25 audit scope and method locks.
- A4R152 does not create P/O/A authority, release authority, or downstream authority.

## Restrictions Preserved

- NO_RELEASED_CODE for all events.
- NO_DOWNSTREAM for all events.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No P/O/A change from prior phases.
- No source enrichment executed in this phase.
- No new events classified.
- No documents deleted or moved.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Next Steps

1. Author review of BS211-Q400 and A4R87-EXT-002 gate patches (A4R134).
2. Collect conscious author decision for REAL-EVENT-0016 (P-C vs P-G) and ASIANA-214 (O-D, A-F vs A-E).
3. Source enrichment for AMERICAN-965 and COMAIR-5191.
4. Rebuild QUEUE_C events (REAL-EVENT-0015, N109W, N11NM, AMERICAN-1420) with full Hendy gate.
5. POA review for QUEUE_B P1 events after when-statement resolution.
6. Source enrichment for QUEUE_D events.
7. Boundary resolution for QUEUE_E parked events.
8. All release/downstream decisions require separate explicit governance.

## A4R153 Source Governance Override

- A4R153 introduces source-status overlays only.
- No event methodology status is changed by A4R153.
- Real-event P/O/A remains blocked unless reaudit is performed at escape point under A4R137/A4R140.
- BS211, G-WNSB, Delta, QF32/QF72/AF66 are blocked for deep-review use until source correction/hardening is completed.
