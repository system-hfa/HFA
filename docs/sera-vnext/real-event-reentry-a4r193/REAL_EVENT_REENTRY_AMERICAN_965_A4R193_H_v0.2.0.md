# REAL EVENT REENTRY — American 965 Cali — A4R193-H v0.2.0

Status:
- phase: A4R193-H
- mode: CANDIDATE_ONLY
- eventId: REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001
- reentryStatus: READY_FOR_CANDIDATE_ONLY_TRIAL

## 1. Source package interno usado

- `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0010.md`
- `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0010)
- `docs/sera-vnext/real-event-structured-extraction-a4r180/SERA_REAL_EVENT_STRUCTURED_EXTRACTION_ENRICHMENT_SUMMARY_A4R180B_v0.2.0.md`
- `docs/sera-vnext/source-corpus/report-url-manifest/a4r111_report_urls_consolidated.csv` (entry 24)
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_G_AMERICAN_965_ENRICHMENT_DECISION_v0.2.0.md`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_G_SOURCE_ENRICHMENT_MATRIX.csv`

sourceQuality: MEDIUM_HIGH

## 2. escapePointScope candidate-only

```yaml
scopeId: scope-american-965-cali-reentry-001
scopeStatement: Mudanca tardia de aproximacao com reprogramacao FMS em descida e perda de margem de escape antes do alerta GPWS.
status: APPROVED_NOT_ENFORCED
```

escapePointScope: candidate-only

agentId: crew-integrated-american-965-cali-descent
agentKind: crew_collective

unsafeActOrOmission:
```yaml
kind: mixed_act_and_omission
statement: Prosseguiu a descida com mudanca tardia de navegacao e carga de FMS sem interromper a aproximacao quando cues criticos de desvio e terreno ficaram evidentes.
```

operationalMoment:
```yaml
description: Janela entre direct para Rozo e inicio do alerta GPWS em contexto de descida com terreno elevado.
sequenceRef: seq:5
```

pointTopology: progressive

boundaryEvidenceRefs:
- AMERICAN-965-A4R180-F2
- AMERICAN-965-A4R180-F3
- AMERICAN-965-A4R180-F4
- A4R181-ADJ-0010

## 3. Metadata P/O/A por eixo (candidate-only)

Perception:
```yaml
axisAgentRef: crew-integrated-american-965-cali-descent
axisMomentRef: seq:5
axisEvidenceRefs:
  - AMERICAN-965-A4R180-F2
  - AMERICAN-965-A4R180-F3
proposedCode: null
```

Objective:
```yaml
axisAgentRef: crew-integrated-american-965-cali-descent
axisMomentRef: seq:5
axisEvidenceRefs:
  - AMERICAN-965-A4R180-F2
  - A4R181-ADJ-0010
proposedCode: null
```

Action:
```yaml
axisAgentRef: crew-integrated-american-965-cali-descent
axisMomentRef: seq:5
axisEvidenceRefs:
  - AMERICAN-965-A4R180-F3
  - AMERICAN-965-A4R180-F4
proposedCode: null
```

## 4. Validation and bridge status

- passive intake target: PASSIVE_INTAKE_READY ou PASSIVE_INTAKE_READY_WITH_WARNINGS
- passive bridge target: BRIDGE_READY_PASSIVE ou BRIDGE_READY_WITH_WARNINGS_PASSIVE
- enforcementMode: PASSIVE_COMPAT

## 5. Candidate-only locks

- selectedCodeAllowed=false
- releasedCodeAllowed=false
- classificationAllowed=false
- poaClosureAllowed=false
- downstreamAllowed=false
- finalConclusionAllowed=false
- notFinalClassification=true

## 6. Uncertainties

- Framing entre EP1 EP2 EP3 permanece aberto para refinamento documental sem fechamento final de eixo.
- Split formal PF/PM e contribuicao contextual ATC permanecem sem liberacao para fechamento final.
- Reclassificacao de negative control para multi-actor ja foi registrada, mas continua candidate-only.

## 7. RR status

- RR-001: OPEN
- RR-003: PARTIALLY_MITIGATED

## 8. Lock and non-final declaration

- Sem selectedCode releasedCode finalConclusion downstream.
- Sem fixture baseline ou promocao metodologica.
- Sem taxonomias externas nem camadas finais nesta fase.

## 9. Fase decision

`READY_FOR_CANDIDATE_ONLY_TRIAL`
