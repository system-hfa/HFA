import assert from 'node:assert/strict'
import {
  buildPassiveEscapePointIntake,
  convertIntakeToCanonicalRuntimeContext,
  validatePassiveEscapePointIntake,
  type SeraVNextEscapePointIntake,
  type SeraVNextEscapePointIntakeValidationResult,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import type {
  ApprovedEscapePointScope,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

function anchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-copterline',
    agentKind: 'specific_actor',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement: 'Did not verify mandatory leak test execution at maintenance boundary.',
    },
    operationalMoment: { description: 'Scheduled maintenance release checkpoint.', sequenceRef: 'seq:3' },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: ['ev-boundary-1'],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-intake-validation-001',
    scopeStatement: 'Safe-operation escape point for passive validation trial.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'A4R192-B passive validation hardening trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor(),
    ...overrides,
  }
}

function completeIntake(overrides?: {
  scope?: ApprovedEscapePointScope | undefined
  axisOverrides?: Partial<SeraVNextEscapePointIntake['axisMetadata']>
}): SeraVNextEscapePointIntake {
  const intake = buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-VAL-001',
    eventId: 'EVENT-VAL-001',
    source: 'neutral_trial',
    approvedEscapePointScope: overrides?.scope ?? scope(),
    axisMetadata: {
      perception: {
        axisAgentRef: 'maintenance-copterline',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: ['ev-p-1'],
        proposedCode: 'P-G',
      },
      objective: {
        axisAgentRef: 'maintenance-copterline',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: ['ev-o-1'],
        proposedCode: 'O-A',
      },
      action: {
        axisAgentRef: 'maintenance-copterline',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: ['ev-a-1'],
        proposedCode: 'A-G',
      },
    },
  })

  if (overrides?.axisOverrides) {
    for (const axis of ['perception', 'objective', 'action'] as const) {
      if (overrides.axisOverrides[axis]) {
        intake.axisMetadata[axis] = {
          ...intake.axisMetadata[axis],
          ...overrides.axisOverrides[axis],
        }
      }
    }
  }
  return intake
}

function assertLocks(record: Record<string, unknown>, label: string): void {
  assert.equal(record.selectedCodeAllowed, false, `${label}: selectedCodeAllowed must remain false.`)
  assert.equal(record.releasedCodeAllowed, false, `${label}: releasedCodeAllowed must remain false.`)
  assert.equal(record.classificationAllowed, false, `${label}: classificationAllowed must remain false.`)
  assert.equal(record.poaClosureAllowed, false, `${label}: poaClosureAllowed must remain false.`)
  assert.equal(record.downstreamAllowed, false, `${label}: downstreamAllowed must remain false.`)
  assert.equal(record.finalConclusionAllowed, false, `${label}: finalConclusionAllowed must remain false.`)
  assert.equal(record.notFinalClassification, true, `${label}: notFinalClassification must remain true.`)
}

function assertNoForbiddenOutputFields(record: Record<string, unknown>, label: string): void {
  assert.equal('selectedCode' in record, false, `${label}: selectedCode field must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode field must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion field must be absent.`)
  assert.equal('hfacs' in record, false, `${label}: HFACS field must be absent.`)
  assert.equal('risk' in record, false, `${label}: Risk/ERC field must be absent.`)
  assert.equal('armsErc' in record, false, `${label}: ARMS/ERC field must be absent.`)
  assert.equal('recommendations' in record, false, `${label}: recommendations field must be absent.`)
}

const results: Array<{ intake: SeraVNextEscapePointIntake; validation: SeraVNextEscapePointIntakeValidationResult }> = []

// 1) Complete intake valid.
{
  const intake = completeIntake()
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(validation.readyForFutureEnforcement, true)
  assert.equal(validation.issues.length, 0)
  results.push({ intake, validation })
}

// 2) Scope absent.
{
  const intake = buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-VAL-002',
    eventId: 'EVENT-VAL-002',
    source: 'neutral_trial',
    axisMetadata: completeIntake().axisMetadata,
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
  results.push({ intake, validation })
}

// 3) Anchor absent.
{
  const intake = completeIntake({
    scope: scope({ escapePointAnchor: undefined }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_INCOMPLETE')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_ANCHOR_MISSING'))
  results.push({ intake, validation })
}

// 4) agentId absent.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({ agentId: '' }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AGENT_MISSING'))
  results.push({ intake, validation })
}

// 5) unsafeActOrOmission statement absent.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({ unsafeActOrOmission: { kind: 'unsafe_omission', statement: '' } }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_ACT_OR_OMISSION_MISSING'))
  results.push({ intake, validation })
}

// 6) operationalMoment description absent.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({ operationalMoment: { description: '', sequenceRef: 'seq:3' } }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_OPERATIONAL_MOMENT_MISSING'))
  results.push({ intake, validation })
}

// 7) Future ENFORCE temporal anchor absent.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({
        operationalMoment: { description: 'Moment without sequence or phase.' },
      }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_FUTURE_ENFORCE_TEMPORAL_ANCHOR_MISSING'))
  results.push({ intake, validation })
}

// 8) Axis without axisAgentRef.
{
  const intake = completeIntake()
  intake.axisMetadata.objective.axisAgentRef = null
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISSING' && item.axis === 'O'))
  results.push({ intake, validation })
}

// 9) Axis with divergent axisAgentRef.
{
  const intake = completeIntake()
  intake.axisMetadata.action.axisAgentRef = 'flight-crew'
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISMATCH' && item.axis === 'A'))
  results.push({ intake, validation })
}

// 10) Axis without axisMomentRef.
{
  const intake = completeIntake()
  intake.axisMetadata.perception.axisMomentRef = null
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_MOMENT_REF_MISSING' && item.axis === 'P'))
  results.push({ intake, validation })
}

// 11) Axis without axisEvidenceRefs.
{
  const intake = completeIntake()
  intake.axisMetadata.perception.axisEvidenceRefs = []
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_EVIDENCE_REFS_MISSING' && item.axis === 'P'))
  results.push({ intake, validation })
}

// 12) proposedCode O-E.
{
  const intake = completeIntake()
  intake.axisMetadata.objective.proposedCode = 'O-E'
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
  results.push({ intake, validation })
}

// 13) proposedCode invalid.
{
  const intake = completeIntake()
  intake.axisMetadata.objective.proposedCode = 'O-Z' as unknown as 'O-E'
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_INVALID_PROPOSED_CODE' && item.axis === 'O'))
  results.push({ intake, validation })
}

// 14) progressive incomplete.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: '' },
      }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE'))
  results.push({ intake, validation })
}

// 15) diffuse requires split.
{
  const intake = completeIntake({
    scope: scope({
      escapePointAnchor: anchor({
        pointTopology: 'diffuse',
      }),
    }),
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_DIFFUSE_SPLIT_REQUIRED'))
  results.push({ intake, validation })
}

// 16 + 17) Candidate-only locks closed and forbidden outputs absent in all cases.
for (const [index, result] of results.entries()) {
  const label = `case-${index + 1}`
  const conversion = convertIntakeToCanonicalRuntimeContext(result.intake)

  assertLocks(result.intake as unknown as Record<string, unknown>, `${label}: intake`)
  assertLocks(result.validation as unknown as Record<string, unknown>, `${label}: validation`)
  assertLocks(conversion as unknown as Record<string, unknown>, `${label}: conversion`)

  assertNoForbiddenOutputFields(result.intake as unknown as Record<string, unknown>, `${label}: intake`)
  assertNoForbiddenOutputFields(result.validation as unknown as Record<string, unknown>, `${label}: validation`)
  assertNoForbiddenOutputFields(conversion as unknown as Record<string, unknown>, `${label}: conversion`)
}

console.log('escape-point-intake-validation-trial-001: OK')

