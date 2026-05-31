import assert from 'node:assert/strict'
import {
  buildPassiveEscapePointIntake,
  validatePassiveEscapePointIntake,
  type BuildPassiveEscapePointIntakeInput,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import {
  assertEscapePointIntakeBridgeLocks,
  buildAuthorNodeIntakeAdapterInputFromEscapePointIntake,
  buildTraversalAdapterInputFromEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake-bridge'
import type { ApprovedEscapePointScope, SeraVNextEscapePointAnchor } from '../../frontend/src/lib/sera-vnext/types'

type ReentryStatus = 'READY_FOR_CANDIDATE_ONLY_TRIAL' | 'SOURCE_INSUFFICIENT_FOR_REENTRY'

interface ReentryScenario {
  eventId: string
  status: ReentryStatus
  intake: BuildPassiveEscapePointIntakeInput
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
  assert.equal('promoteToBaseline' in record, false, `${label}: baseline promotion marker must be absent.`)
}

function scope(
  scopeId: string,
  scopeStatement: string,
  anchor: SeraVNextEscapePointAnchor,
  boundaryEvidenceRefs: string[],
): ApprovedEscapePointScope {
  return {
    scopeId,
    scopeStatement,
    boundaryEvidenceRefs,
    rationale: 'A4R193-B real-event re-entry candidate-only scope.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor,
  }
}

const scenarios: ReentryScenario[] = [
  {
    eventId: 'REAL-EVENT-ASIANA214-SFO2013-REENTRY-001',
    status: 'READY_FOR_CANDIDATE_ONLY_TRIAL',
    intake: {
      intakeId: 'INTAKE-REENTRY-B2-ASIANA-001',
      eventId: 'REAL-EVENT-ASIANA214-SFO2013-REENTRY-001',
      source: 'neutral_trial',
      approvedEscapePointScope: scope(
        'scope-asiana-214-reentry-001',
        'A/T HOLD transition and unstable-profile continuation before timely go-around window closed.',
        {
          agentId: 'crew-integrated-asiana-214-approach',
          agentKind: 'crew_collective',
          unsafeActOrOmission: {
            kind: 'mixed_act_and_omission',
            statement:
              'Continued unstable visual approach after A/T HOLD transition without timely go-around at the stabilized-approach gate.',
          },
          operationalMoment: {
            description: 'Stabilized-approach gate before 500 ft AFE.',
            sequenceRef: 'seq:4',
          },
          pointTopology: 'progressive',
          zoneBoundary: {
            earliestControllableRef: 'seq:3',
            latestControllableRef: 'seq:5',
          },
          boundaryEvidenceRefs: ['ASIANA-A4R180-F1', 'ASIANA-A4R180-F2', 'ASIANA-A4R180-F3'],
        },
        ['ASIANA-A4R180-F1', 'ASIANA-A4R180-F2', 'ASIANA-A4R180-F3'],
      ),
      axisMetadata: {
        perception: {
          axisAgentRef: 'crew-integrated-asiana-214-approach',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['ASIANA-A4R180-F1', 'ASIANA-A4R180-F2'],
        },
        objective: {
          axisAgentRef: 'crew-integrated-asiana-214-approach',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['ASIANA-A4R180-F2', 'A4R182-DEC-0001'],
        },
        action: {
          axisAgentRef: 'crew-integrated-asiana-214-approach',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['ASIANA-A4R180-F3', 'A4R181-ADJ-0001'],
        },
      },
    },
  },
  {
    eventId: 'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001',
    status: 'READY_FOR_CANDIDATE_ONLY_TRIAL',
    intake: {
      intakeId: 'INTAKE-REENTRY-B2-COMAIR-001',
      eventId: 'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001',
      source: 'neutral_trial',
      approvedEscapePointScope: scope(
        'scope-comair-5191-reentry-001',
        'Wrong-runway lineup action before irreversible takeoff commitment.',
        {
          agentId: 'crew-integrated-comair-5191-runway-verification',
          agentKind: 'crew_collective',
          unsafeActOrOmission: {
            kind: 'mixed_act_and_omission',
            statement:
              'Aligned on runway 26 and continued toward takeoff commitment without reliable runway-identity verification.',
          },
          operationalMoment: {
            description: 'Runway-entry and lineup verification window.',
            sequenceRef: 'seq:4',
          },
          pointTopology: 'progressive',
          zoneBoundary: {
            earliestControllableRef: 'seq:3',
            latestControllableRef: 'seq:6',
          },
          boundaryEvidenceRefs: ['COMAIR-A4R180-F1', 'COMAIR-A4R180-F2', 'COMAIR-A4R180-F3'],
        },
        ['COMAIR-A4R180-F1', 'COMAIR-A4R180-F2', 'COMAIR-A4R180-F3'],
      ),
      axisMetadata: {
        perception: {
          axisAgentRef: 'crew-integrated-comair-5191-runway-verification',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['COMAIR-A4R180-F1', 'COMAIR-A4R180-F3'],
        },
        objective: {
          axisAgentRef: 'crew-integrated-comair-5191-runway-verification',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['COMAIR-A4R180-F2', 'A4R182-DEC-0002'],
          proposedCode: 'O-E',
        },
        action: {
          axisAgentRef: 'crew-integrated-comair-5191-runway-verification',
          axisMomentRef: 'seq:4',
          axisEvidenceRefs: ['COMAIR-A4R180-F3', 'A4R181-ADJ-0002'],
        },
      },
    },
  },
  {
    eventId: 'REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001',
    status: 'READY_FOR_CANDIDATE_ONLY_TRIAL',
    intake: {
      intakeId: 'INTAKE-REENTRY-B2-UNITED-001',
      eventId: 'REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001',
      source: 'neutral_trial',
      approvedEscapePointScope: scope(
        'scope-united-173-reentry-001',
        'Fuel-critical holding window where immediate landing transition was required.',
        {
          agentId: 'crew-integrated-united-173-fuel-window',
          agentKind: 'crew_collective',
          unsafeActOrOmission: {
            kind: 'mixed_act_and_omission',
            statement: 'Maintained troubleshooting priority while fuel-critical advisories required immediate landing transition.',
          },
          operationalMoment: {
            description: 'Fuel-critical holding decision window.',
            sequenceRef: 'seq:6',
          },
          pointTopology: 'progressive',
          zoneBoundary: {
            earliestControllableRef: 'seq:4',
            latestControllableRef: 'seq:7',
          },
          boundaryEvidenceRefs: [
            'UNITED-173-A4R180-F1',
            'UNITED-173-A4R180-F2',
            'UNITED-173-A4R180-F3',
            'UNITED-173-A4R180-F4',
          ],
        },
        ['UNITED-173-A4R180-F1', 'UNITED-173-A4R180-F2', 'UNITED-173-A4R180-F3', 'UNITED-173-A4R180-F4'],
      ),
      axisMetadata: {
        perception: {
          axisAgentRef: 'crew-integrated-united-173-fuel-window',
          axisMomentRef: 'seq:6',
          axisEvidenceRefs: ['UNITED-173-A4R180-F1', 'UNITED-173-A4R180-F2'],
        },
        objective: {
          axisAgentRef: 'crew-integrated-united-173-fuel-window',
          axisMomentRef: 'seq:6',
          axisEvidenceRefs: ['UNITED-173-A4R180-F3', 'A4R182-DEC-0005'],
        },
        action: {
          axisAgentRef: 'crew-integrated-united-173-fuel-window',
          axisMomentRef: 'seq:6',
          axisEvidenceRefs: ['UNITED-173-A4R180-F4', 'A4R181-ADJ-0017'],
        },
      },
    },
  },
  {
    eventId: 'REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001',
    status: 'SOURCE_INSUFFICIENT_FOR_REENTRY',
    intake: {
      intakeId: 'INTAKE-REENTRY-B2-USAIR-001',
      eventId: 'REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001',
      source: 'neutral_trial',
    },
  },
]

for (const scenario of scenarios) {
  const intake = buildPassiveEscapePointIntake(scenario.intake)
  const validation = validatePassiveEscapePointIntake(intake)
  const bridgeTraversal = buildTraversalAdapterInputFromEscapePointIntake({ intake })
  const bridgeAuthor = buildAuthorNodeIntakeAdapterInputFromEscapePointIntake({ intake })

  assert.equal(bridgeTraversal.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridgeTraversal.traversalAdapterInput.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(bridgeAuthor.authorNodeIntakeAdapterInput.enforcementMode, 'PASSIVE_COMPAT')

  if (scenario.status === 'READY_FOR_CANDIDATE_ONLY_TRIAL') {
    assert.notEqual(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
    assert.equal(bridgeTraversal.blocked, false)
    assert.ok(
      bridgeTraversal.status === 'BRIDGE_READY_PASSIVE' || bridgeTraversal.status === 'BRIDGE_READY_WITH_WARNINGS_PASSIVE',
      `${scenario.eventId}: expected passive bridge readiness`,
    )
  } else {
    assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_SCOPE_MISSING')
    assert.ok(validation.issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED'))
    assert.equal(bridgeTraversal.status, 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES')
    assert.equal(bridgeTraversal.blocked, true)
  }

  if (scenario.eventId.includes('COMAIR-5191')) {
    assert.equal(validation.readinessStatus, 'PASSIVE_INTAKE_READY_WITH_WARNINGS')
    assert.ok(validation.issues.some((item) => item.code === 'INTAKE_NON_EXISTENT_PROPOSED_CODE' && item.axis === 'O'))
    assert.equal(bridgeTraversal.traversalAdapterInput.proposedCodes?.O ?? null, null)
  }

  assertEscapePointIntakeBridgeLocks(bridgeTraversal)
  assertEscapePointIntakeBridgeLocks(bridgeAuthor)

  assertCandidateOnlyLocks(intake as unknown as Record<string, unknown>, `${scenario.eventId}: intake`)
  assertCandidateOnlyLocks(validation as unknown as Record<string, unknown>, `${scenario.eventId}: validation`)
  assertCandidateOnlyLocks(bridgeTraversal as unknown as Record<string, unknown>, `${scenario.eventId}: bridgeTraversal`)
  assertCandidateOnlyLocks(bridgeAuthor as unknown as Record<string, unknown>, `${scenario.eventId}: bridgeAuthor`)

  assertNoForbiddenFields(intake as unknown as Record<string, unknown>, `${scenario.eventId}: intake`)
  assertNoForbiddenFields(validation as unknown as Record<string, unknown>, `${scenario.eventId}: validation`)
  assertNoForbiddenFields(bridgeTraversal as unknown as Record<string, unknown>, `${scenario.eventId}: bridgeTraversal`)
  assertNoForbiddenFields(bridgeAuthor as unknown as Record<string, unknown>, `${scenario.eventId}: bridgeAuthor`)
}

console.log('real-event-reentry-batch2-trial-001: OK')
