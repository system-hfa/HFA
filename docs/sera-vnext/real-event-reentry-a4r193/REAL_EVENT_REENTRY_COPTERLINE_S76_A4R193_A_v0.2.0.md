# REAL EVENT REENTRY — Copterline S-76C+ (Estonia 2005) — A4R193-A v0.2.0

## Status

- phase: `A4R193-A`
- mode: `CANDIDATE_ONLY`
- eventId: `REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001`
- decision: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- final-classification: `NOT_ALLOWED_IN_THIS_PHASE`

## Internal sources found

1. `docs/SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md` (Section 5, Copterline S-76C+ example)
2. `tests/sera-vnext/escape-point-intake-contract-trial-001.ts`
3. `tests/sera-vnext/escape-point-enforcement-trial-001.ts`
4. `tests/sera-vnext/escape-point-enforcement-hardening-trial-001.ts`
5. `docs/sera-vnext/runtime-alignment-a4r191/SERA_ESCAPE_POINT_RESIDUAL_RISK_REGISTER_A4R191_H_v0.2.0.md`

## Proposed escapePointScope (candidate-only re-entry)

```yaml
scopeId: scope-copterline-s76-reentry-001
scopeStatement: Safe-operation escape point in maintenance management chain before release of the main-rotor forward actuator.
status: APPROVED_NOT_ENFORCED
```

### agentId

- `maintenance-management-copterline-oh-hci`

### agentKind

- `maintenance_or_org`

### unsafeActOrOmission

```yaml
kind: unsafe_omission
statement: Did not verify that the mandatory internal-leak test of the forward main-rotor actuator had been executed at the 2250h maintenance limit.
```

### operationalMoment

```yaml
description: Scheduled maintenance release checkpoint at/after the 2250h boundary, before return-to-service of the helicopter.
sequenceRef: seq:3
```

Note: `sequenceRef` is a candidate-only ordering anchor for runtime contract compatibility, not a final temporal adjudication.

### pointTopology

- `discrete`

### boundaryEvidenceRefs

- `SAFE-EP-V01-SEC5-COPTERLINE-AGENT-ACT-MOMENT`
- `SAFE-EP-V01-SEC5-COPTERLINE-HELOTRAC-TASK-NOT-GENERATED`
- `SAFE-EP-V01-SEC5-COPTERLINE-NO-EXECUTION-RECORD`
- `SAFE-EP-V01-SEC5-COPTERLINE-CONTAMINATION-NOT-DETECTED`

## Axis metadata (candidate-only, non-final)

### Perception axis

```yaml
axisAgentRef: maintenance-management-copterline-oh-hci
axisMomentRef: seq:3
axisEvidenceRefs:
  - SAFE-EP-V01-SEC5-COPTERLINE-HELOTRAC-TASK-NOT-GENERATED
  - SAFE-EP-V01-SEC5-COPTERLINE-NO-INDEPENDENT-VERIFICATION
proposedCode: P-G
limitations:
  - Candidate-only hypothesis from internal methodology document; not a final adjudicated release code.
```

### Objective axis

```yaml
axisAgentRef: maintenance-management-copterline-oh-hci
axisMomentRef: seq:3
axisEvidenceRefs:
  - SAFE-EP-V01-SEC5-COPTERLINE-NO-INTENTIONAL-DEVIATION-EVIDENCE
proposedCode: O-A
limitations:
  - Candidate-only non-final objective hypothesis; intent evidence depth remains limited in this phase.
```

### Action axis

```yaml
axisAgentRef: maintenance-management-copterline-oh-hci
axisMomentRef: seq:3
axisEvidenceRefs:
  - SAFE-EP-V01-SEC5-COPTERLINE-TEST-NOT-VERIFIED-BEFORE-RELEASE
  - SAFE-EP-V01-SEC5-COPTERLINE-MAINTENANCE-CONTROL-FAILURE
proposedCode: A-G
limitations:
  - Candidate-only non-final action hypothesis; no release/classification allowed in A4R193-A.
```

## Candidate-only lock expectation

- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `classificationAllowed=false`
- `poaClosureAllowed=false`
- `downstreamAllowed=false`
- `finalConclusionAllowed=false`
- `notFinalClassification=true`

## Limitations and uncertainties

1. This re-entry uses internal repository methodological evidence and contract examples; no product integration evidence is introduced.
2. `sequenceRef` is a candidate-only sequencing placeholder for contract compatibility.
3. RR-001 lexical multi-agent residual remains open and outside A4R193-A scope.
4. RR-003 remains partially mitigated by intake/validation/bridge only; structured MDC/interview intake is still required for product-grade decisions.

## Explicit non-final declarations

- No final P/O/A classification is produced in this phase.
- No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations output is allowed.
- This event is **not** promoted to fixture/baseline and is **not** an automatic reference truth.
