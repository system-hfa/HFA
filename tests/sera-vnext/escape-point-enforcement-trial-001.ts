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
  assert.equal(result.classificationAllowed, false, 'CLASSIFIED must never be allowed.')
  assert.equal(result.downstreamAllowed, false, 'downstream must never be allowed.')
  assert.equal(result.finalConclusionAllowed, false, 'finalConclusion must never be allowed.')
  assert.equal(result.notFinalClassification, true, 'notFinalClassification must remain true.')
  const raw = result as unknown as Record<string, unknown>
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'selectedCode'), false, 'No selectedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'releasedCode'), false, 'No releasedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'finalConclusion'), false, 'No finalConclusion field.')
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
    scopeId: 'scope-ep-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

// 1. DISCRETE happy path with correct agent -> ENFORCED_OK.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.equal(result.enforced, true)
  assert.equal(result.blockingIssues.length, 0)
  assert.equal(result.agentId, 'maintenance-copterline')
  assertCandidateOnlyLocks(result)
}

// 2. Scope absent -> block in ENFORCE, passive in PASSIVE_COMPAT.
{
  const enforced = enforceEscapePointScope({ scope: undefined, axis: 'P', enforcementMode: 'ENFORCE' })
  assert.equal(enforced.status, 'ESCAPE_POINT_BLOCKED_SCOPE_ABSENT')
  assert.deepEqual(enforced.blockingIssues, ['EP-B08_SCOPE_ABSENT'])
  assert.equal(enforced.enforced, false)
  assertCandidateOnlyLocks(enforced)

  const passive = enforceEscapePointScope({ scope: null, axis: 'P', enforcementMode: 'PASSIVE_COMPAT' })
  assert.equal(passive.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.ok(passive.warnings.includes('EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'))
  assert.equal(passive.blockingIssues.length, 0)
  assertCandidateOnlyLocks(passive)

  // default mode is passive compat.
  const defaultMode = enforceEscapePointScope({ scope: undefined, axis: 'O' })
  assert.equal(defaultMode.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assertCandidateOnlyLocks(defaultMode)
}

// 3. Legacy scope without anchor in passive mode -> PASSIVE_NOT_ENFORCED.
{
  const legacy: ApprovedEscapePointScope = {
    scopeId: 'legacy-1',
    scopeStatement: 'Legacy scope.',
    boundaryEvidenceRefs: ['ev-1'],
    rationale: 'Legacy.',
    status: 'PASSIVE_NOT_ENFORCED',
  }
  const passive = enforceEscapePointScope({ scope: legacy, axis: 'A', enforcementMode: 'PASSIVE_COMPAT' })
  assert.equal(passive.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.equal(passive.anchorReadiness, 'LEGACY_NO_ANCHOR')
  assert.ok(passive.warnings.includes('EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'))
  assertCandidateOnlyLocks(passive)

  // Even when caller asks ENFORCE, an explicitly passive scope stays passive (never blocks, never OK).
  const passiveDespiteEnforce = enforceEscapePointScope({ scope: legacy, axis: 'A', enforcementMode: 'ENFORCE' })
  assert.equal(passiveDespiteEnforce.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assertCandidateOnlyLocks(passiveDespiteEnforce)

  // Active legacy scope (no anchor) in ENFORCE mode -> EP-B07 invalid.
  const activeLegacy: ApprovedEscapePointScope = { ...legacy, status: 'APPROVED_NOT_ENFORCED' }
  const blocked = enforceEscapePointScope({ scope: activeLegacy, axis: 'A', enforcementMode: 'ENFORCE' })
  assert.equal(blocked.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(blocked.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assertCandidateOnlyLocks(blocked)
}

// 4. Agent migration -> EP-B01.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'flight-crew',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION')
  assert.deepEqual(result.blockingIssues, ['EP-B01_AGENT_MIGRATION'])
  assert.equal(result.enforced, false)
  assertCandidateOnlyLocks(result)
}

// 5. Post-event analysis -> EP-B02.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:9',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assert.deepEqual(result.blockingIssues, ['EP-B02_POST_EVENT_ANALYSIS'])
  assertCandidateOnlyLocks(result)

  const markerResult = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'after-barrier recovery phase',
    proposedCode: 'A-G',
  })
  assert.equal(markerResult.status, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assertCandidateOnlyLocks(markerResult)
}

// 6. Consequence as basis -> EP-B03.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['pilots could not recover after the uncommanded extension (consequence)'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS')
  assert.deepEqual(result.blockingIssues, ['EP-B03_CONSEQUENCE_AS_BASIS'])
  assertCandidateOnlyLocks(result)
}

// 7. A-D forbidden for maintenance/organization agent -> EP-B04.
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.deepEqual(result.blockingIssues, ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'])
  assertCandidateOnlyLocks(result)

  // Exception: explicit physical-limitation evidence of the maintenance agent itself.
  const allowed = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1', 'physical limitation: technician could not reach the actuator without lift'],
    proposedCode: 'A-D',
  })
  assert.equal(allowed.status, 'ESCAPE_POINT_ENFORCED_OK')
  assertCandidateOnlyLocks(allowed)
}

// 8. Progressive zone complete -> OK with EP-W01 using earliest boundary.
{
  const result = enforceEscapePointScope({
    scope: scope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: 'seq:6' },
      }),
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:2',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assert.ok(result.warnings.includes('EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED'))
  assert.equal(result.topology, 'progressive')
  assertCandidateOnlyLocks(result)
}

// 9. Progressive zone incomplete -> blocked (EP-B07).
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'progressive' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assertCandidateOnlyLocks(result)
}

// 10. Diffuse -> EP-B05.
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT')
  assert.deepEqual(result.blockingIssues, ['EP-B05_DIFFUSE_REQUIRES_SPLIT'])
  assert.ok(result.nextRequiredAction.toLowerCase().includes('decompose'))
  assertCandidateOnlyLocks(result)
}

// 11. O-E cannot be an active proposedCode.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'O',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'O-E' as CanonicalSeraLeafCode,
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.ok(result.diagnostics.some((d) => d.includes('NON_EXISTENT_IN_SERA_PT_V1')))
  assertCandidateOnlyLocks(result)
}

// 12 & 13. Locks candidate-only and no selected/released/CLASSIFIED/downstream across all multiplexed cases.
{
  const sixtyCases: EscapePointEnforcementResult[] = [
    enforceEscapePointScope({ scope: undefined, axis: 'P', enforcementMode: 'ENFORCE' }),
    enforceEscapePointScope({ scope: undefined, axis: 'P', enforcementMode: 'PASSIVE_COMPAT' }),
    enforceEscapePointScope({ scope: scope(), axis: 'A', enforcementMode: 'ENFORCE', axisAgentRef: 'maintenance-copterline', axisEvidenceRefs: ['ev-maint-1'], proposedCode: 'A-G' }),
    enforceEscapePointScope({ scope: scope(), axis: 'A', enforcementMode: 'PASSIVE_COMPAT' }),
    enforceEscapePointScope({ scope: scope(), axis: 'A', enforcementMode: 'ENFORCE', siblingEscapePointRefs: ['scope-ep-002'] }),
  ]
  for (const result of sixtyCases) {
    assertCandidateOnlyLocks(result)
    assert.equal(result.enforced, result.status === 'ESCAPE_POINT_ENFORCED_OK')
  }

  // Multiple points -> EP-B06.
  const multi = sixtyCases[4]
  assert.equal(multi.status, 'ESCAPE_POINT_BLOCKED_MULTIPLE_POINTS')
  assert.deepEqual(multi.blockingIssues, ['EP-B06_MULTIPLE_POINTS'])
}

console.log('escape-point-enforcement-trial-001: OK')
