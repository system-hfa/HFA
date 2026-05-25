# SERA Engine vNext Post A4R126 Recovery Triage A4R127 v0.2.0

Status: POST_A4R126_RECOVERY_TRIAGE_RECORDED
Phase: A4+R-127
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: OPERATIONAL_TRIAGE_ONLY

## Objective
Transformar a reauditoria global A4R126 em um plano de recuperacao controlado para os 52 eventos reais pre-gate, sem reconstruir P/O/A, sem expandir corpus, sem classificar novos eventos e sem abrir downstream.

## Sources Used
- `docs/sera-vnext/SERA_ENGINE_VNEXT_GLOBAL_ESCAPE_POINT_REAUDIT_A4R126_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_PRE_GATE_EVENT_QUARANTINE_REGISTER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_EVENT_ARTIFACT_DEPENDENCY_MATRIX_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`

## Method
A4R127 maps each A4R126 event-level decision to one operational recovery queue. The mapping is conservative and preserves the A4R126 methodological decision; it does not change P/O/A, does not write new escape-point statements in bulk and does not treat helper question paths as canonical tree evidence.

| A4R126 decision family | A4R127 queue | operational meaning |
|---|---|---|
| PASS_REQUIRES_MINOR_WORDING_FIX | QUEUE_A_WHEN_ONLY | Point is substantially recoverable with Hendy field wording and no expected P/O/A change. |
| PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | Point may be recoverable, but prior P/O/A alignment requires focused review. |
| FAIL_REQUIRES_REBUILD | QUEUE_C_FULL_REBUILD | Prior analysis is not safe to reuse without a full Hendy-gated rebuild. |
| BLOCKED_SOURCE_PARTIAL | QUEUE_D_SOURCE_ENRICHMENT | Evidence is insufficient before any gate or rebuild work. |
| BLOCKED_DIRECT_ACTOR_UNCLEAR, BLOCKED_TECHNICAL_OR_CONDITION_DOMINANT, BLOCKED_REAL_TREE_MISSING | QUEUE_E_PARKED | Do not force P/O/A until actor, condition, technical or tree boundary is resolved. |
| DUPLICATE_OR_SUPERSEDED | QUEUE_F_DUPLICATE_OR_SUPERSEDED | Normalize identity and dependency records before any recovery. |

## Queue Metrics
| metric | value |
|---|---:|
| totalEventsTriaged | 52 |
| queueAWhenOnly | 3 |
| queueBPOAReview | 14 |
| queueCFullRebuild | 4 |
| queueDSourceEnrichment | 11 |
| queueEParked | 19 |
| queueFDuplicateOrSuperseded | 1 |
| priorityP0 | 19 |
| priorityP1 | 7 |
| priorityP2 | 10 |
| priorityP3 | 16 |
| priorReleasedCodeAffected | 4 |
| priorReferenceCaseAffected | 18 |
| priorAuthorApprovalAffected | 10 |
| priorQuestionPathAffected | 30 |
| priorProposedCodeAffected | 43 |
| downstreamOpenedCount | 0 |

## Queue Assignments
| queue | count | events |
|---|---:|---|
| QUEUE_A_WHEN_ONLY | 3 | UPS-1354; COLGAN-3407; UNITED-173 |
| QUEUE_B_POA_REVIEW | 14 | REAL-EVENT-0001; REAL-EVENT-0003; REAL-EVENT-0016; D-HHNH; G-BHYB; HL9294; BS211-Q400; A4R87-EXT-001; A4R87-EXT-002; A4R87-EXT-008; A4R87-EXT-012; ASIANA-214; AMERICAN-965; COMAIR-5191 |
| QUEUE_C_FULL_REBUILD | 4 | REAL-EVENT-0015; N109W; N11NM; AMERICAN-1420 |
| QUEUE_D_SOURCE_ENRICHMENT | 11 | REAL-EVENT-0028; REAL-EVENT-0005; REAL-EVENT-0013; REAL-EVENT-0007; REAL-EVENT-0009; REAL-EVENT-0011; REAL-EVENT-0032; REAL-EVENT-0033; A4R87-EXT-007; EASTERN-401; HELIOS-522 |
| QUEUE_E_PARKED | 19 | REAL-EVENT-0002; REAL-EVENT-0004; REAL-EVENT-0006; REAL-EVENT-0010; REAL-EVENT-0008; N56RD; PR-CHI; N200BK; N127LN; N120HH; N525TA; A4R87-EXT-004; A4R87-EXT-006; US-AIRWAYS-1549; UNITED-232; ATLAS-3591; USAIR-427; TUROY EC225; KOREAN-801 |
| QUEUE_F_DUPLICATE_OR_SUPERSEDED | 1 | REAL-EVENT-0014/0030 |

## Priority Assignments
| priority | count | events |
|---|---:|---|
| P0 | 19 | REAL-EVENT-0003; REAL-EVENT-0015; REAL-EVENT-0016; N109W; N11NM; BS211-Q400; A4R87-EXT-002; UPS-1354; COLGAN-3407; US-AIRWAYS-1549; UNITED-173; UNITED-232; EASTERN-401; ATLAS-3591; AMERICAN-1420; ASIANA-214; AMERICAN-965; KOREAN-801; COMAIR-5191 |
| P1 | 7 | REAL-EVENT-0001; D-HHNH; G-BHYB; HL9294; A4R87-EXT-001; A4R87-EXT-008; A4R87-EXT-012 |
| P2 | 10 | REAL-EVENT-0028; REAL-EVENT-0005; REAL-EVENT-0013; REAL-EVENT-0007; REAL-EVENT-0009; REAL-EVENT-0011; REAL-EVENT-0032; REAL-EVENT-0033; A4R87-EXT-007; HELIOS-522 |
| P3 | 16 | REAL-EVENT-0002; REAL-EVENT-0004; REAL-EVENT-0006; REAL-EVENT-0010; REAL-EVENT-0008; REAL-EVENT-0014/0030; N56RD; PR-CHI; N200BK; N127LN; N120HH; N525TA; A4R87-EXT-004; A4R87-EXT-006; USAIR-427; TUROY EC225 |

## Priority Rules
| priority | rule |
|---|---|
| P0 | Historical releasedCode, reference case, author approval, release pilot or high-contamination dependency. Recover before any consensus, training, reference or release reuse. |
| P1 | Viable proposed-code or P/O/A-review candidate with usable source basis and no immediate release-pilot dependency. |
| P2 | Recoverable source-enrichment case where primary evidence or timeline split must be strengthened first. |
| P3 | Parked, technical/condition dominant, real-tree missing, direct-actor unclear, or duplicate/superseded material. |

## Recommended Execution Plan
1. Run a narrow P0 lane first, split by queue: A for wording-only, B for focused P/O/A review, C for full rebuild, D for source enrichment, and E for parked boundary decisions.
2. Recover `QUEUE_A_WHEN_ONLY` before heavier work. These three cases are the lowest-effort path to clean Hendy-field completeness, still without release authority.
3. Run `QUEUE_C_FULL_REBUILD` for historical release-pilot or high-contamination cases before reuse in any reference or author context.
4. Run `QUEUE_B_POA_REVIEW` only after the relevant escape point is explicitly restated with a valid `escapePointWhenStatement`.
5. Run `QUEUE_D_SOURCE_ENRICHMENT` before any attempted rebuild. These rows need evidence, source identity or pre/post escape split first.
6. Keep `QUEUE_E_PARKED` closed until technical, condition, direct-actor or real-tree boundaries are resolved.
7. Clean `QUEUE_F_DUPLICATE_OR_SUPERSEDED` as dependency hygiene, not as causal recovery.

## Methodological Risks
- Do not use A4R127 as a P/O/A answer key. It is only a recovery queue.
- Do not treat `escapePointWhenStatementStatus=VALID` as release, reference, consensus, training or downstream authorization.
- Do not rebuild events from helper question paths or approximated tree traces.
- Do not force human P/O/A where A4R126 recorded technical or condition dominance.
- Do not use prior report conclusions, causal labels or safety actions as SERA expected values.

## Next Phase Options
- `QUEUE_A_WHEN_ONLY`: Hendy field wording patch for UPS-1354, COLGAN-3407 and UNITED-173.
- `QUEUE_C_FULL_REBUILD`: full Hendy-gated rebuild for REAL-EVENT-0015, N109W, N11NM and AMERICAN-1420.
- `QUEUE_B_POA_REVIEW`: focused P/O/A review batch after valid `escapePointWhenStatement` drafting.
- `QUEUE_D_SOURCE_ENRICHMENT`: evidence-first source enrichment batch.
- `QUEUE_E_PARKED`: boundary decision batch for technical, condition, actor and real-tree blockers.

No automatic expansion should start after this triage.
