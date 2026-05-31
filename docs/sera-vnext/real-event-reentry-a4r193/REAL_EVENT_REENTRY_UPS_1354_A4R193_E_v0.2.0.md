# REAL EVENT REENTRY — UPS 1354 — A4R193-E v0.2.0

Status:
- phase: A4R193-E
- mode: CANDIDATE_ONLY
- eventId: REAL-EVENT-UPS-1354-BHM-2013-REENTRY-001
- reentryStatus: READY_FOR_CANDIDATE_ONLY_TRIAL

## 1. Source package interno

- `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0006.md`
- `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0006)
- `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` (A4R182-DEC-0004)
- `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0006-UPS-1354.md`

sourceQuality: HIGH

## 2. escapePointScope candidate-only

```yaml
scopeId: scope-ups-1354-reentry-001
scopeStatement: Nao percepcao do setup FMC invalido e da falha de engajamento do modo esperado antes da continuacao de descida fora do gate estabilizado.
status: APPROVED_NOT_ENFORCED
```

agentId: crew-integrated-ups-1354-approach
agentKind: crew_collective

unsafeActOrOmission:
```yaml
kind: mixed_act_and_omission
statement: Prosseguiu com descida de aproximacao sem reconhecer degradacao critica de setup e modo, sem transicao tempestiva para go-around.
```

operationalMoment:
```yaml
description: Janela de setup e mode management que antecede o gate de 1000ft AFE com razao de descida nao estabilizada.
sequenceRef: seq:4
```

pointTopology: progressive

boundaryEvidenceRefs:
- UPS1354-A4R180-F1
- UPS1354-A4R180-F2
- UPS1354-A4R180-F3
- UPS1354-A4R180-F4
- A4R182-DEC-0004

## 3. Metadata P/O/A por eixo (candidate-only)

Perception:
```yaml
axisAgentRef: crew-integrated-ups-1354-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - UPS1354-A4R180-F1
  - UPS1354-A4R180-F4
proposedCode: null
```

Objective:
```yaml
axisAgentRef: crew-integrated-ups-1354-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - UPS1354-A4R180-F3
  - A4R181-ADJ-0006
proposedCode: null
```

Action:
```yaml
axisAgentRef: crew-integrated-ups-1354-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - UPS1354-A4R180-F2
  - UPS1354-A4R180-F3
proposedCode: null
```

## 4. Validation status esperado

- intake: PASSIVE_INTAKE_READY
- bridge: BRIDGE_READY_PASSIVE ou BRIDGE_READY_WITH_WARNINGS_PASSIVE
- enforcementMode: PASSIVE_COMPAT

## 5. Uncertainties

- Boundary entre mode change e gate de 1000ft como ancora primaria.
- Split captain FO monitor nao fechado nesta fase.

## 6. RR status

- RR-001: OPEN
- RR-003: PARTIALLY_MITIGATED

## 7. Lock and non-final declaration

- Sem selectedCode releasedCode finalConclusion downstream.
- Sem fixture/baseline.
- Sem HFACS Risk/ERC ARMS/ERC recommendations.
