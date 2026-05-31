# REAL EVENT REENTRY — American 1420 — A4R193-E v0.2.0

Status:
- phase: A4R193-E
- mode: CANDIDATE_ONLY
- eventId: REAL-EVENT-AMERICAN-1420-LIT-1999-REENTRY-001
- reentryStatus: READY_FOR_CANDIDATE_ONLY_TRIAL

## 1. Source package interno

- `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0003.md`
- `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0003)
- `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` (A4R182-DEC-0003)
- `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0003-AMERICAN-1420.md`

sourceQuality: HIGH

## 2. escapePointScope candidate-only

```yaml
scopeId: scope-american-1420-reentry-001
scopeStatement: Continuacao da aproximacao final instavel com perda de referencia visual antes da janela de arremetida segura.
status: APPROVED_NOT_ENFORCED
```

agentId: crew-integrated-american-1420-final-approach
agentKind: crew_collective

unsafeActOrOmission:
```yaml
kind: mixed_act_and_omission
statement: Manteve continuacao de aproximacao final instavel sob cues degradados sem transicao tempestiva para go-around.
```

operationalMoment:
```yaml
description: Janela de aproximacao final antes do touchdown quando cues de degradacao visual e sink rate ja estavam presentes.
sequenceRef: seq:4
```

pointTopology: progressive

boundaryEvidenceRefs:
- AA1420-A4R180-F2
- AA1420-A4R180-F3
- AA1420-A4R180-F4
- A4R182-DEC-0003

## 3. Metadata P/O/A por eixo (candidate-only)

Perception:
```yaml
axisAgentRef: crew-integrated-american-1420-final-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - AA1420-A4R180-F2
  - AA1420-A4R180-F3
proposedCode: null
```

Objective:
```yaml
axisAgentRef: crew-integrated-american-1420-final-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - AA1420-A4R180-F2
  - A4R181-ADJ-0003
proposedCode: null
```

Action:
```yaml
axisAgentRef: crew-integrated-american-1420-final-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - AA1420-A4R180-F3
  - A4R182-DEC-0003
proposedCode: null
```

## 4. Validation status esperado

- intake: PASSIVE_INTAKE_READY
- bridge: BRIDGE_READY_PASSIVE ou BRIDGE_READY_WITH_WARNINGS_PASSIVE
- enforcementMode: PASSIVE_COMPAT

## 5. Uncertainties

- Boundary entre decisao de continuacao e desdobramento tecnico pos-touchdown.
- Split PF PM nao fechado nesta fase.

## 6. RR status

- RR-001: OPEN
- RR-003: PARTIALLY_MITIGATED

## 7. Lock and non-final declaration

- Sem selectedCode releasedCode finalConclusion downstream.
- Sem fixture/baseline.
- Sem HFACS Risk/ERC ARMS/ERC recommendations.
