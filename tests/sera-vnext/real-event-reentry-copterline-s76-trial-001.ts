import assert from 'node:assert/strict'
import {
  buildPassiveEscapePointIntake,
  convertIntakeToCanonicalRuntimeContext,
  validatePassiveEscapePointIntake,
  type SeraVNextEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import {
  assertEscapePointIntakeBridgeLocks,
  buildAuthorNodeIntakeAdapterInputFromEscapePointIntake,
  buildTraversalAdapterInputFromEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake-bridge'
import type { ApprovedEscapePointScope, SeraVNextEscapePointAnchor } from '../../frontend/src/lib/sera-vnext/types'

function anchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-management-copterline-oh-hci',
    agentKind: 'maintenance_or_org',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement:
        'Did not verify that the mandatory internal-leak test of the forward main-rotor actuator had been executed at the 2250h maintenance limit.',
    },
    operationalMoment: {
      description: 'Scheduled maintenance release checkpoint at/after the 2250h boundary before return-to-service.',
      sequenceRef: 'seq:3',
    },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: [
      'SAFE-EP-V01-SEC5-COPTERLINE-HELOTRAC-TASK-NOT-GENERATED',
      'SAFE-EP-V01-SEC5-COPTERLINE-NO-EXECUTION-RECORD',
    ],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-copterline-s76-reentry-001',
    scopeStatement: 'Safe-operation escape point in maintenance management chain before release.',
    boundaryEvidenceRefs: [
      'SAFE-EP-V01-SEC5-COPTERLINE-AGENT-ACT-MOMENT',
      'SAFE-EP-V01-SEC5-COPTERLINE-CONTAMINATION-NOT-DETECTED',
    ],
    rationale: 'A4R193-A controlled real-event re-entry under candidate-only contract.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor(),
    ...overrides,
  }
}

function buildCopterlineIntake(): SeraVNextEscapePointIntake {
  return buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-REAL-COPTERLINE-001',
    eventId: 'REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001',
    source: 'neutral_trial',
    approvedEscapePointScope: scope(),
    axisMetadata: {
      perception: {
        axisAgentRef: 'maintenance-management-copterline-oh-hci',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: [
          'SAFE-EP-V01-SEC5-COPTERLINE-HELOTRAC-TASK-NOT-GENERATED',
          'SAFE-EP-V01-SEC5-COPTERLINE-NO-INDEPENDENT-VERIFICATION',
        ],
        proposedCode: 'P-G',
      },
      objective: {
        axisAgentRef: 'maintenance-management-copterline-oh-hci',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: ['SAFE-EP-V01-SEC5-COPTERLINE-NO-INTENTIONAL-DEVIATION-EVIDENCE'],
        proposedCode: 'O-A',
      },
      action: {
        axisAgentRef: 'maintenance-management-copterline-oh-hci',
        axisMomentRef: 'seq:3',
        axisEvidenceRefs: [
          'SAFE-EP-V01-SEC5-COPTERLINE-TEST-NOT-VERIFIED-BEFORE-RELEASE',
          'SAFE-EP-V01-SEC5-COPTERLINE-MAINTENANCE-CONTROL-FAILURE',
        ],
        proposedCode: 'A-G',
      },
    },
  })
}

function assertCandidateOnlyLocks(record: Record<string, unknown>, label: string): void {
  assert.equal(record.selectedCodeAllowed, false, `${label}: selectedCodeAllowed must remain false.`)
  assert.equal(record.releasedCodeAllowed, false, `${label}: releasedCodeAllowed must remain false.`)
  assert.equal(record.classificationAllowed, false, `${label}: classificationAllowed must remain false.`)
  assert.equal(record.poaClosureAllowed, false, `${label}: poaClosureAllowed must remain false.`)
  assert.equal(record.downstreamAllowed, false, `${label}: downstreamAllowed must remain false.`)
  assert.equal(record.finalConclusionAllowed, false, `${label}: finalConclusionAllowed must remain false.`)
  assert.equal(record.notFinalClassification, true, `${label}: notFinalClassification must remain true.`)
}

function assertNoForbiddenFields(record: Record<string, unknown>, label: string): void {
  assert.equal('selectedCode' in record, false, `${label}: selectedCode must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion must be absent.`)
  assert.equal('hfacs' in record, false, `${label}: HFACS must be absent.`)
  assert.equal('risk' in record, false, `${label}: Risk/ERC must be absent.`)
  assert.equal('armsErc' in record, false, `${label}: ARMS/ERC must be absent.`)
  assert.equal('recommendations' in record, false, `${label}: recommendations must be absent.`)
  assert.equal('promoteToFixture' in record, false, `${label}: fixture promotion marker must be absent.`)
}

// 1) Real-event intake is representable and candidate-only ready.
{
  const intake = buildCopterlineIntake()
  const validation = validatePassiveEscapePointIntake(intake)
  const bridgeTraversal = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  const bridgeAuthor = buildAuthorNodeIntakeAdapterInputFromEscapePointIntake({ intake })

  assert.equal(intake.source, 'neutral_trial')
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(bridgeTraversal.status, 'BRIDGE_READY_PASSIVE')
  assert.equal(bridgeTraversal.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridgeTraversal.traversalAdapterInput.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridgeAuthor.authorNodeIntakeAdapterInput.enforcementMode, 'PASSIVE_COMPAT')

  assert.equal(
    bridgeTraversal.traversalAdapterInput.approvedEscapePointScope?.escapePointAnchor?.agentId,
    'maintenance-management-copterline-oh-hci',
  )
  assert.equal(bridgeTraversal.traversalAdapterInput.axisAgentRefs?.P, 'maintenance-management-copterline-oh-hci')
  assert.equal(bridgeTraversal.traversalAdapterInput.axisMomentRefs?.P, 'seq:3')
  assert.equal(bridgeTraversal.traversalAdapterInput.proposedCodes?.P, 'P-G')

  assert.equal(bridgeAuthor.authorNodeIntakeAdapterInput.axisAgentRefs?.A, 'maintenance-management-copterline-oh-hci')
  assert.equal(bridgeAuthor.authorNodeIntakeAdapterInput.axisMomentRefs?.A, 'seq:3')
  assert.equal(bridgeAuthor.authorNodeIntakeAdapterInput.proposedCodes?.A, 'A-G')

  assertEscapePointIntakeBridgeLocks(bridgeTraversal)
  assertEscapePointIntakeBridgeLocks(bridgeAuthor)

  assertCandidateOnlyLocks(intake as unknown as Record<string, unknown>, 'intake')
  assertCandidateOnlyLocks(validation as unknown as Record<string, unknown>, 'validation')
  assertCandidateOnlyLocks(bridgeTraversal as unknown as Record<string, unknown>, 'bridgeTraversal')
  assertCandidateOnlyLocks(bridgeAuthor as unknown as Record<string, unknown>, 'bridgeAuthor')

  assertNoForbiddenFields(intake as unknown as Record<string, unknown>, 'intake')
  assertNoForbiddenFields(validation as unknown as Record<string, unknown>, 'validation')
  assertNoForbiddenFields(bridgeTraversal as unknown as Record<string, unknown>, 'bridgeTraversal')
  assertNoForbiddenFields(bridgeAuthor as unknown as Record<string, unknown>, 'bridgeAuthor')
}

// 2) O-E is never active when present in objective proposed code.
{
  const intake = buildCopterlineIntake()
  intake.axisMetadata.objective.proposedCode = 'O-E'

  const validation = validatePassiveEscapePointIntake(intake)
  const context = convertIntakeToCanonicalRuntimeContext(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
  assert.deepEqual(context.nonExistentProposedCodeAxes, ['O'])
  assert.equal(bridge.traversalAdapterInput.proposedCodes?.O ?? null, null)
  assert.equal(bridge.status, 'BRIDGE_READY_WITH_WARNINGS_PASSIVE')
  assert.equal(bridge.notFinalClassification, true)
}

// 3) Hold behavior remains passive/candidate-only when scope is missing.
{
  const intake = buildCopterlineIntake()
  intake.approvedEscapePointScope = undefined

  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  assert.equal(bridge.blocked, true)

  assertCandidateOnlyLocks(bridge as unknown as Record<string, unknown>, 'bridge-hold')
  assertNoForbiddenFields(bridge as unknown as Record<string, unknown>, 'bridge-hold')
}

console.log('real-event-reentry-copterline-s76-trial-001: OK')
