import assert from 'node:assert/strict'
import {
  enforceEscapePointScope,
  type EscapePointEnforcementResult,
} from '../../frontend/src/lib/sera-vnext/escape-point-enforcement'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraLeafCode,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

function assertCandidateOnlyLocks(result: EscapePointEnforcementResult): void {
  assert.equal(result.selectedCodeAllowed, false, 'selectedCode must never be allowed.')
  assert.equal(result.releasedCodeAllowed, false, 'releasedCode must never be allowed.')
  assert.equal(result.poaClosureAllowed, false, 'poaClosure must never be allowed.')
  assert.equal(result.classificationAllowed, false, 'classification must never be allowed.')
  assert.equal(result.downstreamAllowed, false, 'downstream must never be allowed.')
  assert.equal(result.finalConclusionAllowed, false, 'final conclusion must never be allowed.')
  assert.equal(result.notFinalClassification, true, 'notFinalClassification must remain true.')
  const raw = result as unknown as Record<string, unknown>
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'selectedCode'), false, 'No selectedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'releasedCode'), false, 'No releasedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'finalConclusion'), false, 'No finalConclusion field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'hfacs'), false, 'No HFACS field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'risk'), false, 'No Risk field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'armsErc'), false, 'No ARMS/ERC field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'recommendations'), false, 'No recommendations field.')
  assert.notEqual(result.status, 'CLASSIFIED' as never, 'Status is never CLASSIFIED.')
}

function discreteAnchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-copterline',
    agentKind: 'specific_actor',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement: 'Did not verify the mandatory internal-leak test was executed at 2250h.',
    },
    operationalMoment: { description: 'Scheduled maintenance at the 2250h limit.', sequenceRef: 'seq:3' },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: ['ev-maint-1'],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-ep-topology-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Topology guard trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

function enforce(input: Parameters<typeof enforceEscapePointScope>[0]): EscapePointEnforcementResult {
  const result = enforceEscapePointScope(input)
  assertCandidateOnlyLocks(result)
  return result
}

// 1. DISCRETE happy path -> ENFORCED_OK.
{
  const result = enforce({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.equal(result.enforced, true)
  assert.equal(result.topology, 'discrete')
}

// 2. DISCRETE missing required anchor fields -> EP-B07.
{
  const result = enforce({
    scope: scope({
      escapePointAnchor: {
        agentId: '',
        agentKind: 'unknown',
        unsafeActOrOmission: { kind: 'unknown', statement: '' },
        operationalMoment: { description: '' },
        pointTopology: 'discrete',
        boundaryEvidenceRefs: ['ev-maint-1'],
      },
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.equal(result.anchorReadiness, 'INVALID_ANCHOR')
}

// 3. DISCRETE missing boundary evidence -> EP-B07.
{
  const result = enforce({
    scope: scope({
      boundaryEvidenceRefs: [],
      escapePointAnchor: discreteAnchor({ boundaryEvidenceRefs: [] }),
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.ok(result.diagnostics.some((item) => item.includes('boundary evidence')))
}

// 4. PROGRESSIVE_ZONE complete -> ENFORCED_OK + EP-W01, using earliestControllableRef.
{
  const result = enforce({
    scope: scope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: 'seq:6' },
      }),
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:2',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.equal(result.topology, 'progressive')
  assert.ok(result.warnings.includes('EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED'))
  assert.ok(result.diagnostics.some((item) => item.includes('earliestControllableRef')))
}

// 5. PROGRESSIVE_ZONE incomplete -> EP-B07 diagnostic.
{
  const result = enforce({
    scope: scope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: '' },
      }),
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.equal(result.anchorReadiness, 'ANCHORED_PROGRESSIVE_INCOMPLETE')
}

// 6. DIFFUSE -> EP-B05.
{
  const result = enforce({
    scope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT')
  assert.deepEqual(result.blockingIssues, ['EP-B05_DIFFUSE_REQUIRES_SPLIT'])
}

// 7. Multiple sibling points -> EP-B06.
{
  const result = enforce({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
    siblingEscapePointRefs: ['scope-secondary-001'],
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_MULTIPLE_POINTS')
  assert.deepEqual(result.blockingIssues, ['EP-B06_MULTIPLE_POINTS'])
}

// 8. axisMomentRef after the escape point -> EP-B02.
{
  const result = enforce({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:9',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assert.deepEqual(result.blockingIssues, ['EP-B02_POST_EVENT_ANALYSIS'])
}

// 9. Consequence/recovery/outcome evidence as basis -> EP-B03.
{
  const result = enforce({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['pilot recovery attempt after impact was unsuccessful'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS')
  assert.deepEqual(result.blockingIssues, ['EP-B03_CONSEQUENCE_AS_BASIS'])
}

// 10. A-D for maintenance_or_org without own-agent limitation evidence -> EP-B04.
{
  const result = enforce({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.deepEqual(result.blockingIssues, ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'])
}

// 11. A-D for maintenance_or_org is not allowed by physical limitation evidence of another agent.
{
  const result = enforce({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['physical limitation: pilot could not recover after the failure'],
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.deepEqual(result.blockingIssues, ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'])
}

// 12. A-D for maintenance_or_org allowed only with own-agent physical/ergonomic limitation evidence.
{
  const result = enforce({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['physical limitation: maintenance technician could not reach the actuator without lift'],
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.equal(result.enforced, true)
}

// 13. Agent migration -> EP-B01.
{
  const result = enforce({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'flight-crew',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION')
  assert.deepEqual(result.blockingIssues, ['EP-B01_AGENT_MIGRATION'])
}

// 14. O-E proposedCode remains non-existent/non-canonical -> EP-B07.
{
  const result = enforce({
    scope: scope(),
    axis: 'O',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'O-E' as CanonicalSeraLeafCode,
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.ok(result.diagnostics.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')))
}

// 15. Unknown agent creates conservative warning, not silent OK.
{
  const result = enforce({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'unknown', agentId: 'unknown-agent' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'unknown-agent',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.ok(result.warnings.includes('EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW'))
}

// 16. Passive compatibility remains non-blocking with EP-W05.
{
  const result = enforce({ scope: undefined, axis: 'P', enforcementMode: 'PASSIVE_COMPAT' })
  assert.equal(result.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.ok(result.warnings.includes('EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'))
  assert.deepEqual(result.blockingIssues, [])
}

console.log('escape-point-enforcement-topology-trial-001: OK')
