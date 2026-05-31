import assert from 'node:assert/strict'
import {
  assertEscapePointIntakeBridgeLocks,
  buildAuthorNodeIntakeAdapterInputFromEscapePointIntake,
  buildTraversalAdapterInputFromEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake-bridge'
import { buildPassiveEscapePointIntake, type SeraVNextEscapePointIntake } from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import { buildCanonicalTraversalFromNodeDecisions } from '../../frontend/src/lib/sera-vnext/canonical-traversal-adapter'
import { buildCandidateTraversalFromAuthorNodeIntake } from '../../frontend/src/lib/sera-vnext/author-node-intake-adapter'
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
    scopeId: 'scope-bridge-001',
    scopeStatement: 'Bridge trial scope.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'A4R192-C passive bridge trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor(),
    ...overrides,
  }
}

function completeIntake(): SeraVNextEscapePointIntake {
  return buildPassiveEscapePointIntake({
    intakeId: 'INTAKE-BRIDGE-001',
    eventId: 'EVENT-BRIDGE-001',
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

function assertNoForbiddenFields(record: Record<string, unknown>, label: string): void {
  assert.equal('selectedCode' in record, false, `${label}: selectedCode must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion must be absent.`)
  assert.equal('hfacs' in record, false, `${label}: HFACS must be absent.`)
  assert.equal('risk' in record, false, `${label}: Risk/ERC must be absent.`)
  assert.equal('armsErc' in record, false, `${label}: ARMS/ERC must be absent.`)
  assert.equal('recommendations' in record, false, `${label}: recommendations must be absent.`)
}

const allBridgeOutputs: ReturnType<typeof buildTraversalAdapterInputFromEscapePointIntake>[] = []

// 1) Valid discrete intake -> traversal adapter input maps scope and axis metadata.
{
  const intake = completeIntake()
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({
    intake,
    traversalNodeDecisions: [
      {
        decisionId: 'D-001',
        eventId: 'EVENT-BRIDGE-001',
        axis: 'A',
        nodeId: 'A_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Bridge trial',
        evidenceRefs: ['EVID-001'],
        sourcePhase: 'A4R192-C',
      },
    ],
  })
  assert.equal(bridge.status, 'BRIDGE_READY_PASSIVE')
  assert.equal(bridge.traversalAdapterInput.approvedEscapePointScope?.scopeId, intake.approvedEscapePointScope?.scopeId)
  assert.equal(bridge.traversalAdapterInput.axisAgentRefs?.A, 'maintenance-copterline')
  assert.equal(bridge.traversalAdapterInput.axisMomentRefs?.A, 'seq:3')
  assert.deepEqual(bridge.traversalAdapterInput.axisEvidenceRefs?.A, ['ev-a-1'])
  assert.equal(bridge.traversalAdapterInput.proposedCodes?.A, 'A-G')

  const adapterResult = buildCanonicalTraversalFromNodeDecisions(bridge.traversalAdapterInput)
  assert.equal(adapterResult.selectedCodeAllowed, false)
  allBridgeOutputs.push(bridge)
}

// 2) Valid intake -> author-node-intake adapter input maps scope and axis metadata.
{
  const intake = completeIntake()
  const bridge = buildAuthorNodeIntakeAdapterInputFromEscapePointIntake({
    intake,
    authorNodeRecords: [
      {
        eventId: 'EVENT-BRIDGE-002',
        intakeId: 'REC-001',
        axis: 'A',
        nodeId: 'A_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        authorDecisionRationale: 'Bridge trial',
      },
    ],
  })
  assert.equal(bridge.status, 'BRIDGE_READY_PASSIVE')
  assert.equal(bridge.authorNodeIntakeAdapterInput.approvedEscapePointScope?.scopeId, intake.approvedEscapePointScope?.scopeId)
  assert.equal(bridge.authorNodeIntakeAdapterInput.axisAgentRefs?.A, 'maintenance-copterline')
  assert.equal(bridge.authorNodeIntakeAdapterInput.axisMomentRefs?.A, 'seq:3')
  assert.deepEqual(bridge.authorNodeIntakeAdapterInput.axisEvidenceRefs?.A, ['ev-a-1'])
  assert.equal(bridge.authorNodeIntakeAdapterInput.proposedCodes?.A, 'A-G')

  const adapterResult = buildCandidateTraversalFromAuthorNodeIntake(bridge.authorNodeIntakeAdapterInput)
  assert.equal(adapterResult.selectedCodeAllowed, false)
  allBridgeOutputs.push(bridge)
}

// 3) Intake with warnings -> READY_WITH_WARNINGS and no release.
{
  const intake = completeIntake()
  intake.axisMetadata.perception.axisMomentRef = null
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.status, 'BRIDGE_READY_WITH_WARNINGS_PASSIVE')
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_AXIS_MOMENT_REF_MISSING'))
  allBridgeOutputs.push(bridge)
}

// 4) Intake with passive blocker -> BLOCKED_BY_PASSIVE_INTAKE_ISSUES.
{
  const intake = completeIntake()
  intake.approvedEscapePointScope = undefined
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  assert.equal(bridge.blocked, true)
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
  allBridgeOutputs.push(bridge)
}

// 5) proposedCode O-E does not pass as active code.
{
  const intake = completeIntake()
  intake.axisMetadata.objective.proposedCode = 'O-E'
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.status, 'BRIDGE_READY_WITH_WARNINGS_PASSIVE')
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
  assert.equal(bridge.traversalAdapterInput.proposedCodes?.O ?? null, null)
  allBridgeOutputs.push(bridge)
}

// 6) Divergent agentRef appears as blocked issue.
{
  const intake = completeIntake()
  intake.axisMetadata.action.axisAgentRef = 'flight-crew'
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_AXIS_AGENT_REF_MISMATCH' && item.axis === 'A'))
  allBridgeOutputs.push(bridge)
}

// 7) Missing axis evidence appears as warning issue.
{
  const intake = completeIntake()
  intake.axisMetadata.perception.axisEvidenceRefs = []
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(bridge.status, 'BRIDGE_READY_WITH_WARNINGS_PASSIVE')
  assert.ok(bridge.issues.some((item) => item.code === 'INTAKE_AXIS_EVIDENCE_REFS_MISSING' && item.axis === 'P'))
  allBridgeOutputs.push(bridge)
}

// 8 + 9) Candidate-only locks are closed and forbidden outputs are absent.
for (const [index, bridge] of allBridgeOutputs.entries()) {
  const label = `bridge-${index + 1}`
  assertEscapePointIntakeBridgeLocks(bridge)
  assertNoForbiddenFields(bridge as unknown as Record<string, unknown>, label)
}

// 10) Existing A4R191/A4R192 behavior remains unchanged (bridge layer does not mutate existing contracts).
{
  const intake = completeIntake()
  const beforeAgent = intake.axisMetadata.action.axisAgentRef
  buildTraversalAdapterInputFromEscapePointIntake({ intake })
  assert.equal(intake.axisMetadata.action.axisAgentRef, beforeAgent)
}

console.log('escape-point-intake-bridge-trial-001: OK')

