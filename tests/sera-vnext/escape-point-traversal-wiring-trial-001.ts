import assert from 'node:assert/strict'
import {
  advanceCanonicalTraversal,
  assertNoFinalClassification,
  runCanonicalAxisTraversal,
  type CanonicalTraversalStepOutput,
} from '../../frontend/src/lib/sera-vnext/canonical-traversal'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraLeafCode,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

function assertCandidateOnlyLocks(output: CanonicalTraversalStepOutput): void {
  assert.equal(output.selectedCodeAllowed, false, 'selectedCode must never be allowed.')
  assert.equal(output.releasedCodeAllowed, false, 'releasedCode must never be allowed.')
  assert.equal(output.poaClosureAllowed, false, 'poaClosure must never be allowed.')
  assert.equal(output.notFinalClassification, true, 'notFinalClassification must remain true.')
  const raw = output as unknown as Record<string, unknown>
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'selectedCode'), false, 'No selectedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'releasedCode'), false, 'No releasedCode field.')
  assert.equal(Object.prototype.hasOwnProperty.call(raw, 'finalConclusion'), false, 'No finalConclusion field.')
  assert.notEqual(output.status, 'CLASSIFIED' as never, 'Status is never CLASSIFIED.')
  assertNoFinalClassification(output)
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
    scopeId: 'scope-ep-trav-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Wiring trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

// 1. Passive (default) without scope: traversal continues, trace passive.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'TEST_FIXTURE',
  })
  assert.equal(step.status, 'NEXT_NODE_READY', 'No scope + passive must not block traversal.')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.equal(step.runtimeContextTrace.enforcementMode, 'PASSIVE_COMPAT')
  assert.equal(step.runtimeContextTrace.enforcementBlockingIssues.length, 0)
  assertCandidateOnlyLocks(step)
}

// 2. Passive with legacy scope (no anchor): traversal continues, trace PASSIVE_NOT_ENFORCED.
{
  const legacy: ApprovedEscapePointScope = {
    scopeId: 'legacy-trav-1',
    scopeStatement: 'Legacy scope, no anchor.',
    boundaryEvidenceRefs: ['ev-1'],
    rationale: 'Legacy.',
    status: 'APPROVED_NOT_ENFORCED',
  }
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'TEST_FIXTURE',
    approvedEscapePointScope: legacy,
    enforcementMode: 'PASSIVE_COMPAT',
  })
  assert.equal(step.status, 'NEXT_NODE_READY', 'Legacy scope in passive mode must not block.')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.equal(step.runtimeContextTrace.anchorReadiness, 'LEGACY_NO_ANCHOR')
  assert.equal(step.approvedEscapePointScopeAccepted, true)
  assertCandidateOnlyLocks(step)
}

// 3. ENFORCE + discrete correct: traversal reaches a candidate-only leaf.
{
  const result = runCanonicalAxisTraversal({
    axis: 'A',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START', answerSource: 'AUTHOR_DECISION' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'SIM', answerSource: 'AUTHOR_DECISION' },
      { nodeId: 'A_CORRECT', answerValue: 'SIM', answerSource: 'AUTHOR_DECISION' },
    ],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-A',
  })
  assert.equal(result.status, 'LEAF_REACHED_NOT_CLASSIFIED', 'Correct ENFORCE path should reach the leaf candidate.')
  assert.equal(result.leafCandidate?.candidateOnlyLeafCode, 'A-A')
  assert.equal(result.leafCandidate?.candidateOnly, true)
  assert.equal(result.leafCandidate?.classificationAllowed, false)
  assert.equal(result.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_ENFORCED_OK')
  assert.equal(result.runtimeContextTrace.enforcementBlockingIssues.length, 0)
  assertCandidateOnlyLocks(result)
}

// 4. ENFORCE + agent migration: traversal blocks with EP-B01.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'flight-crew',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-A',
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B01_AGENT_MIGRATION'))
  assert.ok(step.blockingIssue?.includes('EP-B01_AGENT_MIGRATION'))
  assert.equal(step.leafCandidate, undefined, 'Blocked step must not emit a leaf candidate.')
  assertCandidateOnlyLocks(step)
}

// 5. ENFORCE + post-event moment: traversal blocks with EP-B02.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:9',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-A',
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B02_POST_EVENT_ANALYSIS'))
  assertCandidateOnlyLocks(step)
}

// 6. ENFORCE + consequence-as-basis: traversal blocks with EP-B03.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['pilots could not recover after the uncommanded extension (consequence)'],
    proposedCode: 'A-A',
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B03_CONSEQUENCE_AS_BASIS'))
  assertCandidateOnlyLocks(step)
}

// 7. ENFORCE + A-D forbidden for maintenance/organization agent: traversal blocks with EP-B04.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-D',
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B04_FORBIDDEN_CODE_FOR_AGENT'))
  assertCandidateOnlyLocks(step)

  // Same axis with design_mgmt agent blocks identically.
  const designStep = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'design_mgmt' }) }),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-D',
  })
  assert.equal(designStep.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.ok(designStep.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B04_FORBIDDEN_CODE_FOR_AGENT'))
  assertCandidateOnlyLocks(designStep)
}

// 8. ENFORCE + progressive zone complete: traversal continues with warning EP-W01.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq:2', latestControllableRef: 'seq:6' },
      }),
    }),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:2',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-A',
  })
  assert.equal(step.status, 'NEXT_NODE_READY', 'Complete progressive zone must not block traversal.')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_ENFORCED_OK')
  assert.ok(
    step.runtimeContextTrace.enforcementWarnings.includes('EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED'),
  )
  assertCandidateOnlyLocks(step)
}

// 9. ENFORCE + diffuse: traversal blocks with EP-B05.
{
  const step = advanceCanonicalTraversal({
    axis: 'A',
    currentNodeId: 'A_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-A',
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B05_DIFFUSE_REQUIRES_SPLIT'))
  assertCandidateOnlyLocks(step)
}

// 10. Locks preserved across every wired path (already asserted per case; re-assert a mixed batch).
{
  const batch: CanonicalTraversalStepOutput[] = [
    advanceCanonicalTraversal({ axis: 'P', currentNodeId: 'P_ROOT', answerValue: 'START', answerSource: 'TEST_FIXTURE' }),
    advanceCanonicalTraversal({
      axis: 'O',
      currentNodeId: 'O_ROOT',
      answerValue: 'START',
      answerSource: 'AUTHOR_DECISION',
      approvedEscapePointScope: scope(),
      enforcementMode: 'ENFORCE',
      axisAgentRef: 'maintenance-copterline',
      axisEvidenceRefs: ['ev-maint-1'],
      proposedCode: 'O-A',
    }),
  ]
  for (const out of batch) {
    assertCandidateOnlyLocks(out)
  }
}

// 11. O-E proposedCode blocks as non-existent/invalid, never an active leaf.
{
  const step = advanceCanonicalTraversal({
    axis: 'O',
    currentNodeId: 'O_ROOT',
    answerValue: 'START',
    answerSource: 'AUTHOR_DECISION',
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'O-E' as CanonicalSeraLeafCode,
  })
  assert.equal(step.status, 'AXIS_TRAVERSAL_BLOCKED')
  assert.equal(step.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.ok(step.runtimeContextTrace.enforcementBlockingIssues.includes('EP-B07_SCOPE_INVALID'))
  assert.equal(step.leafCandidate, undefined, 'O-E must never surface as an active leaf candidate.')
  assertCandidateOnlyLocks(step)
}

console.log('escape-point-traversal-wiring-trial-001: OK')
