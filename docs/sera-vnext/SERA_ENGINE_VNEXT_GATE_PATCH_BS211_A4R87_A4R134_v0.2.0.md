# SERA Engine vNext Gate Patch BS211 and A4R87 A4R134 v0.2.0

Status: GATE_PATCH_RECORDED
Phase: A4+R-134
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective
Apply methodological gate patch to the "Quando..." escape-point statements for BS211-Q400 and A4R87-EXT-002, following the Opus review (A4R132) and the A4R133 status that identified these two cases as needing gate correction.

This phase does NOT approve codes, create releasedCode, open downstream, make final P/O/A, or process REAL-EVENT-0016 or ASIANA-214.

## Relation to A4R132 and A4R133
- A4R132 Opus review: BS211-Q400 escape point NOT approved (embeds violation language); A4R87-EXT-002 escape point needs review (EGPWS as temporal marker).
- A4R133 status: BS211-Q400 = NOT_APPROVED_REQUIRES_REBUILD; A4R87-EXT-002 = REQUIRES_ESCAPE_POINT_PATCH.
- A4R134: executes the gate patch for both, without approving anything.

## Scope
Processed:
- BS211-Q400 — gate rebuild for "Quando..." phrase
- A4R87-EXT-002 — escape point patch for "Quando..." phrase

Explicitly excluded:
- REAL-EVENT-0016 — AUTHOR_REVIEW_PENDING
- ASIANA-214 — AUTHOR_REVIEW_PENDING
- AMERICAN-965 — SOURCE_ENRICHMENT lane
- COMAIR-5191 — SOURCE_ENRICHMENT lane

## Rule for "Quando" Phrase
Each corrected phrase must follow the format:

"Quando [ato/condicao observavel] colocou [variavel operacional controlada] fora de [limite seguro/estado esperado]."

Prohibited as the nucleus:
- violated (violou), failed to comply (descumpriu);
- "fora da trajetoria atribuida" as violation language;
- ignored (ignorou), did not perceive (nao percebeu);
- decided wrong (decidiu errado);
- perception failure (falha de percepcao);
- lost situational awareness (perdeu consciencia situacional);
- EGPWS/TAWS alert as the first exit;
- any SERA code.

---

## BS211-Q400 — Gate Patch

### Prior When Statement
"Quando a aeronave prosseguiu fora da trajetoria/downwind atribuida e em aproximacao instavel, colocou a estabilidade da aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada."

### Problem With Prior Statement
1. "fora da trajetoria/downwind atribuida" embeds violation language — it states non-compliance with an assigned trajectory as the core observable act.
2. This pre-determines O-C by framing the exit as deliberate deviation from an assigned path.
3. The phrase combines two possibly distinct acts: exiting the assigned downwind and unstable approach.
4. The Opus review flagged this as a pre-classification vehicle.

### Revised When Statement Candidate
"Quando a aproximacao prosseguiu com perda de estabilidade e desalinhamento de pista apos o contexto de sequenciamento ATC, colocou o perfil de aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada."

### Unsafe Act or Condition
Aproximacao perdeu estabilidade e alinhamento de pista apos contexto de sequenciamento ATC, prosseguindo com margem de recuperacao reduzida ao inves de reentrada estabilizada ou aproximacao descontinuada.

### Controlled Variable
Estabilidade da aproximacao e alinhamento de pista.

### Safe Limit or Expected State
Reentrada estabilizada com alinhamento de pista mantido, ou aproximacao descontinuada antes da margem de recuperacao ficar reduzida.

### Evidence Basis From Existing Docs
- A4R76-B3-013 extraction eventSequence 2-5;
- A4R77 factualBasis and O/A reasoning;
- A4R104 canonical draft EV-002 to EV-007;
- A4R130 tracker: whyFirstDeparture = "the continued unstable and misaligned approach instead of assigned-path/stabilized re-entry".

### Temporal Confidence
MEDIUM. The existing docs support "unstable and misaligned approach" as the first departure, but separating "trajectory exit" from "approach instability" depends on the source granularity available locally. The revised phrase isolates the observable approach degradation without embedding violation.

### Escape Point Patch Status
PATCHED_GATE_DRAFT_NOT_APPROVED

### POA Status
NOT_REVIEWED_IN_THIS_PHASE — P-H/O-C/A-F from A4R130 remain as draft only and are not approved here.

### Quarantine Status
REMAINS_IN_QUARANTINE

### Next Action
AUTHOR_REVIEW_AFTER_GATE_PATCH — the author must review the revised gate before any P/O/A decision. O-C and A-F thresholds remain high risk and may need revision to UNRESOLVED or milder codes.

---

## A4R87-EXT-002 — Escape Point Patch

### Prior When Statement
"Quando o voo noturno sobre agua desceu em perfil degradado com multiplos alertas EGPWS ativos, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado."

### Problem With Prior Statement
1. "multiplos alertas EGPWS ativos" is used as the temporal core marker.
2. EGPWS is a response to the exit, not necessarily the first exit itself.
3. The A4R130 analysis already acknowledged this: "the first departure is the degraded altitude/clearance path that made those alerts active."
4. The Opus review flagged warnings as temporal markers as a systemic risk.

### Revised When Statement Candidate
"Quando o voo noturno sobre agua desceu para um perfil de altitude degradado com separacao vertical reduzida, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado."

### Unsafe Act or Condition
Voo noturno sobre agua entrou em perfil de descida com altitude degradada e separacao vertical reduzida, ativando alertas EGPWS repetidos como consequencia, antes do impacto na agua.

### Controlled Variable
Separacao vertical sobre agua, altitude path e perfil de voo monitorado.

### Safe Limit or Expected State
Perfil noturno monitorado sobre agua mantendo separacao vertical segura, com recuperacao tempestiva antes de ativacao de alertas EGPWS.

### Evidence Basis From Existing Docs
- EXT-BATCH1-EXTRACTION-002 factualTimeline and alertWarningChronology;
- EXT-BATCH1-ADJUDICATION-002 unsafeStateCandidate;
- A4R104 canonical draft EV-001 to EV-007;
- A4R130 tracker: whyFirstDeparture = "repeated alerts mark an already unsafe profile, but the first departure is the degraded altitude/clearance path that made those alerts active."

### Temporal Confidence
MEDIUM. The A4R130 analysis explicitly states the degradation path preceded the alerts. The revised phrase removes EGPWS as the temporal core and focuses on the profile degradation. However, the exact moment of first departure from the safe profile cannot be timed precisely from local sources alone. EGPWS chronology remains valid as evidence/anchor, just not as the first exit.

### Escape Point Patch Status
PATCHED_GATE_DRAFT_NOT_APPROVED

### POA Status
NOT_REVIEWED_IN_THIS_PHASE — P-G/UNRESOLVED/UNRESOLVED from A4R130 remain as draft only and are not approved here.

### Quarantine Status
REMAINS_IN_QUARANTINE

### Next Action
AUTHOR_REVIEW_AFTER_GATE_PATCH — the author must review the revised gate. If the degradation timing cannot be isolated with sufficient confidence, escalate to ESCAPE_POINT_SOURCE_INSUFFICIENT. P-G remains plausible but blocked by pending gate approval.

---

## Limitations
- This phase only revises the "Quando..." escape-point statements for the two affected events.
- No P/O/A was reviewed, approved, or changed.
- No source enrichment was performed — all analysis used existing docs.
- No new corpus or external source was searched.
- BS211-Q400 O-C and A-F remain high-risk drafts.
- A4R87-EXT-002 degradation timing confidence is MEDIUM.

## Systemic Risks Referenced
1. "Quando" phrase as pre-classification vehicle — addressed for BS211-Q400 by removing "fora da trajetoria atribuida".
2. Warnings as escape-point temporal markers — addressed for A4R87-EXT-002 by removing EGPWS as temporal core.
3. A4R130 carryover bias — acknowledged; both revised phrases differ from A4R130 originals.
4. Boundary treatment — O-C/A-F (BS211) and P-G (A4R87) remain unresolved pending author review.

## Locks Preserved
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- NO_SELECTED_CODE_CLASSIFIED.
- AUTHOR_DECISION_PENDING for BS211-Q400 and A4R87-EXT-002.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No P/O/A change from A4R130.
- No source enrichment.
- No processing of AMERICAN-965 or COMAIR-5191.
- No processing of REAL-EVENT-0016 or ASIANA-214.
- No runtime, UI, API, DB, migration, fixture, baseline or code changes.

## Metrics
| metric | value |
|---|---:|
| eventsProcessedForGatePatch | 2 |
| gatePatchDraftedCount | 2 |
| gateRebuildIncompleteCount | 0 |
| escapePointSourceInsufficientCount | 0 |
| poaReviewedCount | 0 |
| authorDecisionRecordedCount | 0 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |

## Next Steps
1. Author reviews the gate patch for BS211-Q400 and A4R87-EXT-002.
2. If author accepts the revised gates: proceed to P/O/A review for those two events.
3. If author rejects the revised gates: consider GATE_REBUILD_INCOMPLETE or ESCAPE_POINT_SOURCE_INSUFFICIENT.
4. O-C and A-F for BS211-Q400 remain high-risk; author should consider UNRESOLVED or O-D/A-UNRESOLVED.
5. REAL-EVENT-0016 and ASIANA-214 remain pending author decision.
6. REAL-EVENT-0003 remains AUTHOR_APPROVED_DRAFT_PARTIAL.
7. AMERICAN-965 and COMAIR-5191 remain in source-enrichment lane.
