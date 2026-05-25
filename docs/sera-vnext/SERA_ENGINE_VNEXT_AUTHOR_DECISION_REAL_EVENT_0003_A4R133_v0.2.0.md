# SERA Engine vNext Author Decision REAL-EVENT-0003 A4R133 v0.2.0

Status: AUTHOR_DECISION_RECORDED
Phase: A4+R-133
methodology: SERA
eventId: REAL-EVENT-0003
authorDecisionStatus: AUTHOR_APPROVED_DRAFT_PARTIAL
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective
Register the consolidated author decision for REAL-EVENT-0003, incorporating the source enrichment about the manual autopilot disconnect from A4R132, without creating releasedCode, without opening downstream, and without approving the other four A4R131 events.

## Context
The author questioned whether low speed, high descent rate and rotor decay could be a consequence of autopilot decoupling/disconnection. Therefore, before approving the escape point, it was necessary to know why the autopilot disconnected.

The A4R132 source enrichment registered that the best local evidence indicates a voluntary/manual disconnect by the PF at 0239:01, during the transition to visual/manual approach. No local support was found for automatic disconnect, system limit, technical failure, inadvertent command or loss of coupling due to operational condition. The exact subjective reason of the PF is not directly stated by the source.

## Author Decision

### Escape Point
APPROVED WITH NOTE.

Author note:
The escape point is only approved after source enrichment indicates that the autopilot disconnect was manual/voluntary by the PF at 0239:01 during the transition to visual/manual approach. The disconnect itself is not treated as a SERA failure nor as a sufficient escape point by itself. The approved escape point is the later degradation of the manual/visual profile into low speed, high descent rate, rotor decay and low height.

### Revised "Quando..." Statement
"Quando, apos a desconexao manual do autopilot pelo PF durante a transicao para aproximacao visual/manual, a aproximacao prosseguiu para baixa velocidade, alta razao de descida e decaimento de rotor em baixa altura, o perfil de energia e separacao vertical saiu do perfil seguro de aproximacao."

### P-axis
APPROVED — P-G

Justification:
Flight-state cues were available/monitorable, but were not integrated/monitored in time in the context of the degraded manual/visual approach.

### O-axis
APPROVED — O-A

Justification:
There is no evidence of a separate unsafe objective. The manual autopilot disconnect, by itself, does not prove an unsafe objective.

### A-axis
APPROVED — UNRESOLVED

Justification:
The PF/PM chain, the subjective motivation for the disconnect, the subsequent manual control and the action mechanism are not closed enough for A-F, A-C, A-D or another action code.

### Quarantine Exit
SIM — as AUTHOR_APPROVED_DRAFT_PARTIAL only.

### Future Release Candidate
SIM — limited to P-G/O-A, without downstream.

## Restrictions
- AUTHOR_APPROVED_DRAFT_PARTIAL only.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- NO_SELECTED_CODE_CLASSIFIED.
- No finalConclusion.
- No HFACS.
- No Risk/ERC.
- No ARMS/ERC.
- No recommendations.
- Not to be used as a complete A-axis reference.
- Any future release requires its own phase.

## Autopilot Enrichment Summary
| hypothesis | status | evidence |
|---|---|---|
| voluntary PF disengage | SUPPORTED | TSB: "PF disengaged the autopilot" at 0239:01; crew disengaged at 600 ft ASL |
| automatic disconnect | NOT_SUPPORTED | No local evidence found |
| system limit as cause | NOT_SUPPORTED | VMINI/low-speed limitations relevant after disconnect, not as cause |
| technical failure | NOT_SUPPORTED | TSB found no system malfunction indication during flight |
| incorrect mode as cause | INSUFFICIENT_DATA | SOP/mode context exists but no source states mode caused disconnect |
| inadvertent command | NOT_SUPPORTED | No local evidence found |
| pre-disconnect operational loss of coupling | NOT_SUPPORTED | Low-speed/high-descent developed after PF disengaged |
| subjective rationale | PARTIAL | PF action is manual/voluntary and timed, but internal reason not explicit |

## Locks Preserved
- AUTHOR_APPROVED_DRAFT_PARTIAL for REAL-EVENT-0003 only.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- AMERICAN-965 and COMAIR-5191 not processed.
- No runtime, UI, API, DB, migration, fixture, baseline or code changes.

## Metrics
| metric | value |
|---|---:|
| authorDecisionsRecordedCount | 1 |
| authorApprovedDraftPartialCount | 1 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| finalConclusionCreatedCount | 0 |
| poaChangedBeyondAuthorDecisionCount | 0 |
| sourceEnrichmentPerformedInThisPhaseCount | 0 |

## Next Steps
1. REAL-EVENT-0003 can advance as partial author draft (P-G/O-A/A-UNRESOLVED) for future release governance.
2. BS211-Q400 gate correction remains priority.
3. A4R87-EXT-002 escape-point patch remains pending.
4. REAL-EVENT-0016 and ASIANA-214 await conscious author decision on P/O/A boundaries.
5. AMERICAN-965 and COMAIR-5191 remain in source-enrichment lane.
6. Keep release/downstream blocked until explicit later governance.
