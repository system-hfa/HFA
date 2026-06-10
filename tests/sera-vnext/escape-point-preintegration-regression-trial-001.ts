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
  type SeraVNextEscapePointIntakeBridgeOutput,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake-bridge'
import type { ApprovedEscapePointScope, SeraVNextEscapePointAnchor } from '../../frontend/src/lib/sera-vnext/types'

function anchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-copterline',
    agentKind: 'specific_actor',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement: 'Did not verify leak test execution at maintenance boundary.',
    },
    operationalMoment: { description: 'Maintenance checkpoint.', sequenceRef: 'seq:3' },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: ['ev-boundary-1'],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-preintegration-001',
    scopeStatement: 'Preintegration passive regression scope.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'A4R192-D passive preintegration regression.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor(),
    ...overrides,
  }
}

function completeIntake(): SeraVNextEscapePointIntake {
  return buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-PRE-001',
    eventId: 'EVENT-PRE-001',
    source: 'neutral_trial',
    approvedEscapePointScope: scope(),
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
}

const bridgeOutputs: SeraVNextEscapePointIntakeBridgeOutput[] = []

// 1) Complete intake -> validation ready -> bridge ready -> adapter inputs ready without release.
{
  const intake = completeIntake()
  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(bridge.status, 'BRIDGE_READY_PASSIVE')
  assert.equal(bridge.blocked, false)
  assert.equal(bridge.traversalAdapterInput.approvedEscapePointScope?.scopeId, intake.approvedEscapePointScope?.scopeId)
  bridgeOutputs.push(bridge)
}

// 2) Missing scope -> passive issue -> bridge blocked.
{
  const intake = completeIntake()
  intake.approvedEscapePointScope = undefined
  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  assert.equal(bridge.blocked, true)
  bridgeOutputs.push(bridge)
}

// 3) Agent mismatch -> passive blocker -> bridge blocked.
{
  const intake = completeIntake()
  intake.axisMetadata.action.axisAgentRef = 'flight-crew'
  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISMATCH' && item.axis === 'A'))
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISMATCH' && item.axis === 'A'))
  bridgeOutputs.push(bridge)
}

// 4) O-E proposedCode -> non-existent issue and no active code propagation.
{
  const intake = completeIntake()
  intake.axisMetadata.objective.proposedCode = 'O-E'
  const validation = validatePassiveEscapePointIntake(intake)
  const context = convertIntakeToCanonicalRuntimeContext(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
  assert.deepEqual(context.nonExistentProposedCodeAxes, ['O'])
  assert.equal(bridge.traversalAdapterInput.proposedCodes?.O ?? null, null)
  bridgeOutputs.push(bridge)
}

// 5) Progressive zone keeps earliest/latest references and remains passively mappable.
{
  const intake = completeIntake()
  intake.approvedEscapePointScope = scope({
    scopeId: 'scope-preintegration-progressive',
    escapePointAnchor: anchor({
      pointTopology: 'progressive',
      zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: 'seq:6' },
    }),
  })
  intake.axisMetadata.perception.axisMomentRef = 'seq:2'
  intake.axisMetadata.objective.axisMomentRef = 'seq:2'
  intake.axisMetadata.action.axisMomentRef = 'seq:2'

  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY')
  assert.equal(
    bridge.traversalAdapterInput.approvedEscapePointScope?.escapePointAnchor?.zoneBoundary?.earliestControllableRef,
    'seq:2',
  )
  assert.equal(
    bridge.traversalAdapterInput.approvedEscapePointScope?.escapePointAnchor?.zoneBoundary?.latestControllableRef,
    'seq:6',
  )
  bridgeOutputs.push(bridge)
}

// 6) Diffuse topology remains split-required in passive regression.
{
  const intake = completeIntake()
  intake.approvedEscapePointScope = scope({
    scopeId: 'scope-preintegration-diffuse',
    escapePointAnchor: anchor({ pointTopology: 'diffuse' }),
  })

  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

  assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED')
  assert.ok(validation.issues.some((item) => item.code === 'INTAKE_DIFFUSE_SPLIT_REQUIRED'))
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  bridgeOutputs.push(bridge)
}

// 7) Bridge traversal adapter input carries axis maps.
{
  const intake = completeIntake()
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.traversalAdapterInput.axisAgentRefs?.P, 'maintenance-copterline')
  assert.equal(bridge.traversalAdapterInput.axisMomentRefs?.P, 'seq:3')
  assert.deepEqual(bridge.traversalAdapterInput.axisEvidenceRefs?.P, ['ev-p-1'])
  assert.equal(bridge.traversalAdapterInput.proposedCodes?.P, 'P-G')
  bridgeOutputs.push(bridge)
}

// 8) Bridge author-node-intake adapter input carries the same maps.
{
  const intake = completeIntake()
  const bridge = buildAuthorNodeIntakeAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.authorNodeIntakeAdapterInput.axisAgentRefs?.O, 'maintenance-copterline')
  assert.equal(bridge.authorNodeIntakeAdapterInput.axisMomentRefs?.O, 'seq:3')
  assert.deepEqual(bridge.authorNodeIntakeAdapterInput.axisEvidenceRefs?.O, ['ev-o-1'])
  assert.equal(bridge.authorNodeIntakeAdapterInput.proposedCodes?.O, 'O-A')
  bridgeOutputs.push(bridge)
}

// 9) Bridge default enforcement remains PASSIVE_COMPAT.
{
  const intake = completeIntake()
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridge.traversalAdapterInput.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridge.authorNodeIntakeAdapterInput.enforcementMode, 'PASSIVE_COMPAT')
  bridgeOutputs.push(bridge)
}

// 10 + 11) Candidate-only locks closed and forbidden output fields absent in all outputs.
for (const [index, output] of bridgeOutputs.entries()) {
  const label = `preintegration-output-${index + 1}`
  assertEscapePointIntakeBridgeLocks(output)
  assertCandidateOnlyLocks(output as unknown as Record<string, unknown>, label)
  assertNoForbiddenFields(output as unknown as Record<string, unknown>, label)
}

// 12) Existing behavior is unchanged: bridge does not mutate intake contracts from prior phases.
{
  const intake = completeIntake()
  const initialAgentRef = intake.axisMetadata.action.axisAgentRef
  const initialScopeId = intake.approvedEscapePointScope?.scopeId
  buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(intake.axisMetadata.action.axisAgentRef, initialAgentRef)
  assert.equal(intake.approvedEscapePointScope?.scopeId, initialScopeId)
}

console.log('escape-point-preintegration-regression-trial-001: OK')
