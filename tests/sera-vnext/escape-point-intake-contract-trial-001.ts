import assert from 'node:assert/strict'
import {
  buildPassiveEscapePointIntake,
  convertIntakeToCanonicalRuntimeContext,
  validatePassiveEscapePointIntake,
  type SeraVNextEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import { enforceEscapePointScope } from '../../frontend/src/lib/sera-vnext/escape-point-enforcement'
import type {
  ApprovedEscapePointScope,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

function discreteAnchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-copterline',
    agentKind: 'specific_actor',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement: 'Did not verify that the mandatory leak test was executed at 2250h.',
    },
    operationalMoment: { description: 'Scheduled maintenance at 2250h.', sequenceRef: 'seq:3' },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: ['ev-maint-1'],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-intake-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'A4R192-A intake contract trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

function assertCandidateLocks(record: Record<string, unknown>, label: string): void {
  assert.equal(record.selectedCodeAllowed, false, `${label}: selectedCodeAllowed must remain false.`)
  assert.equal(record.releasedCodeAllowed, false, `${label}: releasedCodeAllowed must remain false.`)
  assert.equal(record.classificationAllowed, false, `${label}: classificationAllowed must remain false.`)
  assert.equal(record.poaClosureAllowed, false, `${label}: poaClosureAllowed must remain false.`)
  assert.equal(record.downstreamAllowed, false, `${label}: downstreamAllowed must remain false.`)
  assert.equal(record.finalConclusionAllowed, false, `${label}: finalConclusionAllowed must remain false.`)
  assert.equal(record.notFinalClassification, true, `${label}: notFinalClassification must remain true.`)
}

function assertNoForbiddenOutputs(record: Record<string, unknown>, label: string): void {
  assert.equal('selectedCode' in record, false, `${label}: selectedCode field must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode field must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion field must be absent.`)
  assert.equal('hfacs' in record, false, `${label}: HFACS field must be absent.`)
  assert.equal('risk' in record, false, `${label}: Risk/ERC field must be absent.`)
  assert.equal('armsErc' in record, false, `${label}: ARMS/ERC field must be absent.`)
  assert.equal('recommendations' in record, false, `${label}: recommendations field must be absent.`)
}

function buildCompleteDiscreteIntake(): SeraVNextEscapePointIntake {
  return buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-001',
    eventId: 'EVENT-001',
    source: 'neutral_trial',
    approvedEscapePointScope: scope(),
    axisMetadata: {
      perception: {
        axisAgentRef: 'maintenance-copterline',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: ['ev-p-1'],
        proposedCode: 'P-G',
        questionNodeRefs: ['P_ROOT'],
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
        limitations: ['No structured MDC intake yet.'],
      },
    },
  })
}

// 1. Complete discrete intake is valid in passive mode.
{
  const intake = buildCompleteDiscreteIntake()
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(validation.readyForFutureEnforcement, true)
  assert.equal(validation.issues.length, 0)
  assertCandidateLocks(intake as unknown as Record<string, unknown>, 'intake complete')
  assertCandidateLocks(validation as unknown as Record<string, unknown>, 'validation complete')
}

// 2. Progressive intake with earliest/latest boundary is accepted as passive-ready.
{
  const intake = buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-002',
    eventId: 'EVENT-002',
    source: 'neutral_trial',
    approvedEscapePointScope: scope({
      scopeId: 'scope-intake-002',
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: 'seq:6' },
      }),
    }),
    axisMetadata: {
      perception: { axisAgentRef: 'maintenance-copterline' },
      objective: { axisAgentRef: 'maintenance-copterline' },
      action: { axisAgentRef: 'maintenance-copterline' },
    },
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(validation.readyForFutureEnforcement, true)
}

// 3. Diffuse intake remains passive and returns split-readiness issue.
{
  const intake = buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-003',
    eventId: 'EVENT-003',
    source: 'neutral_trial',
    approvedEscapePointScope: scope({
      scopeId: 'scope-intake-003',
      escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }),
    }),
    axisMetadata: {
      perception: { axisAgentRef: 'maintenance-copterline' },
      objective: { axisAgentRef: 'maintenance-copterline' },
      action: { axisAgentRef: 'maintenance-copterline' },
    },
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_DIFFUSE_SPLIT_REQUIRED'))
}

// 4. Missing scope returns required-scope issue.
{
  const intake = buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-004',
    eventId: 'EVENT-004',
    source: 'neutral_trial',
    axisMetadata: {
      perception: { axisAgentRef: 'maintenance-copterline' },
      objective: { axisAgentRef: 'maintenance-copterline' },
      action: { axisAgentRef: 'maintenance-copterline' },
    },
  })
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
}

// 5. Missing axisAgentRef in one axis returns readiness issue.
{
  const intake = buildCompleteDiscreteIntake()
  intake.axisMetadata.objective.axisAgentRef = null
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_INCOMPLETE')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISSING' && item.axis === 'O'))
}

// 6. Proposed O-E remains non-existent and is flagged as issue.
{
  const intake = buildCompleteDiscreteIntake()
  intake.axisMetadata.objective.proposedCode = 'O-E'
  const validation = validatePassiveEscapePointIntake(intake)
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_INCOMPLETE')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
}

// 7 + 8. Candidate-only locks stay closed and forbidden outputs stay absent.
{
  const intake = buildCompleteDiscreteIntake()
  const validation = validatePassiveEscapePointIntake(intake)
  const conversion = convertIntakeToCanonicalRuntimeContext(intake)

  assertCandidateLocks(conversion as unknown as Record<string, unknown>, 'conversion')
  assertNoForbiddenOutputs(intake as unknown as Record<string, unknown>, 'intake')
  assertNoForbiddenOutputs(validation as unknown as Record<string, unknown>, 'validation')
  assertNoForbiddenOutputs(conversion as unknown as Record<string, unknown>, 'conversion')
}

// 9. Passive conversion preserves approvedEscapePointScope and keeps non-enforcing mode.
{
  const intake = buildCompleteDiscreteIntake()
  const conversion = convertIntakeToCanonicalRuntimeContext(intake)
  assert.equal(conversion.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(conversion.approvedEscapePointScope?.scopeId, intake.approvedEscapePointScope?.scopeId)
  assert.equal(conversion.canonicalRuntimeContext?.approvedEscapePointScope.scopeId, intake.approvedEscapePointScope?.scopeId)
}

// 10. A4R191 behavior remains unchanged (same scope, same ENFORCE input, same outcome).
{
  const intake = buildCompleteDiscreteIntake()
  const conversion = convertIntakeToCanonicalRuntimeContext(intake)
  const baseline = enforceEscapePointScope({
    scope: intake.approvedEscapePointScope,
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: ['ev-a-1'],
    proposedCode: 'A-G',
  })
  const fromConversion = enforceEscapePointScope({
    scope: conversion.approvedEscapePointScope,
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: conversion.axisAgentRefs.A ?? undefined,
    axisMomentRef: conversion.axisMomentRefs.A ?? undefined,
    axisEvidenceRefs: conversion.axisEvidenceRefs.A,
    proposedCode: conversion.proposedCodes.A ?? undefined,
  })

  assert.equal(fromConversion.status, baseline.status)
  assert.deepEqual(fromConversion.blockingIssues, baseline.blockingIssues)
  assert.deepEqual(fromConversion.warnings, baseline.warnings)
}

console.log('escape-point-intake-contract-trial-001: OK')

