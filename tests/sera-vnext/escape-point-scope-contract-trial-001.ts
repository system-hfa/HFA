import assert from 'node:assert/strict'
import {
  isEscapePointScopeReadyForFutureEnforcement,
  normalizeApprovedEscapePointScope,
  type SeraVNextEscapePointStatusMappingResult,
} from '../../frontend/src/lib/sera-vnext/escape-point-scope'
import type {
  ApprovedEscapePointScope,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

function assertNeverDownstream(result: SeraVNextEscapePointStatusMappingResult): void {
  assert.equal(result.enforcementActive, false, 'Enforcement must never be active in A4R191-A.')
  assert.equal(result.blocksTraversal, false, 'Normalization must never block traversal in A4R191-A.')
  assert.equal(result.normalizedEnforcementStatus, 'PASSIVE_NOT_ENFORCED', 'Enforcement stays passive.')
  assert.equal(result.enforcementMode, 'PASSIVE_CANDIDATE_ONLY', 'Enforcement mode stays passive candidate-only.')
  assert.equal(result.selectedCodeAllowed, false, 'selectedCode must never be allowed.')
  assert.equal(result.releasedCodeAllowed, false, 'releasedCode must never be allowed.')
  assert.equal(result.classificationAllowed, false, 'CLASSIFIED must never be allowed.')
  assert.equal(result.finalConclusionAllowed, false, 'finalConclusion must never be allowed.')
  assert.equal(result.downstreamAllowed, false, 'downstream must never be opened.')
  for (const item of result.issues) {
    assert.equal(item.blocksTraversal, false, 'No issue may block traversal in this phase.')
  }
}

function baseScope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-001',
    scopeStatement: 'Safe-operation escape point for the trial event.',
    boundaryEvidenceRefs: ['ev-1'],
    rationale: 'Trial rationale.',
    status: 'APPROVED_NOT_ENFORCED',
    ...overrides,
  }
}

function discreteAnchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'agent-1',
    agentKind: 'specific_actor',
    unsafeActOrOmission: { kind: 'unsafe_act', statement: 'Failed to arrest descent at decision height.' },
    operationalMoment: { description: 'At decision height during approach.' },
    pointTopology: 'discrete',
    ...overrides,
  }
}

// 1) Absent scope does not break runtime.
{
  const result = normalizeApprovedEscapePointScope(undefined)
  assert.equal(result.scopePresent, false, 'Absent scope is reported as not present.')
  assert.equal(result.anchorPresent, false)
  assert.equal(result.anchorReadiness, 'SCOPE_ABSENT')
  assert.equal(result.inputStatus, null)
  assert.equal(result.readyForFutureEnforcement, false)
  assert.equal(isEscapePointScopeReadyForFutureEnforcement(result), false)
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_SCOPE_ABSENT'))
  assertNeverDownstream(result)

  const nullResult = normalizeApprovedEscapePointScope(null)
  assert.equal(nullResult.anchorReadiness, 'SCOPE_ABSENT')
  assertNeverDownstream(nullResult)
}

// 2) Legacy scope without anchor is accepted as passive but not ready for enforcement.
{
  const result = normalizeApprovedEscapePointScope(baseScope({ status: 'DEFINED_NOT_ENFORCED' }))
  assert.equal(result.scopePresent, true, 'Legacy scope is accepted as present.')
  assert.equal(result.anchorPresent, false)
  assert.equal(result.anchorReadiness, 'LEGACY_NO_ANCHOR')
  assert.equal(result.inputStatus, 'DEFINED_NOT_ENFORCED')
  assert.equal(result.readyForFutureEnforcement, false, 'Legacy scope is not enforcement-ready.')
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_ANCHOR_MISSING'))
  assertNeverDownstream(result)
}

// 3) Complete discrete scope normalizes correctly and is enforcement-ready.
{
  const result = normalizeApprovedEscapePointScope(
    baseScope({ escapePointAnchor: discreteAnchor() }),
  )
  assert.equal(result.anchorReadiness, 'ANCHORED_DISCRETE')
  assert.equal(result.topology, 'discrete')
  assert.equal(result.anchorPresent, true)
  assert.equal(result.readyForFutureEnforcement, true)
  assert.equal(result.issues.length, 0, 'A complete discrete anchor produces no diagnostics.')
  assertNeverDownstream(result)
}

// 4) Complete progressive scope requires earliest+latest controllable refs and is enforcement-ready.
{
  const result = normalizeApprovedEscapePointScope(
    baseScope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: {
          earliestControllableRef: 'seq-3',
          latestControllableRef: 'seq-7',
          rationale: 'Window of controllability.',
        },
      }),
    }),
  )
  assert.equal(result.anchorReadiness, 'ANCHORED_PROGRESSIVE_COMPLETE')
  assert.equal(result.topology, 'progressive')
  assert.equal(result.readyForFutureEnforcement, true)
  assertNeverDownstream(result)
}

// 5) Incomplete progressive scope yields a diagnostic but does not block traversal.
{
  const missingZone = normalizeApprovedEscapePointScope(
    baseScope({ escapePointAnchor: discreteAnchor({ pointTopology: 'progressive' }) }),
  )
  assert.equal(missingZone.anchorReadiness, 'ANCHORED_PROGRESSIVE_INCOMPLETE')
  assert.equal(missingZone.readyForFutureEnforcement, false)
  assert.ok(missingZone.issues.some((i) => i.code === 'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_MISSING'))
  assertNeverDownstream(missingZone)

  const partialZone = normalizeApprovedEscapePointScope(
    baseScope({
      escapePointAnchor: discreteAnchor({
        pointTopology: 'progressive',
        zoneBoundary: { earliestControllableRef: 'seq-3', latestControllableRef: '' },
      }),
    }),
  )
  assert.equal(partialZone.anchorReadiness, 'ANCHORED_PROGRESSIVE_INCOMPLETE')
  assert.equal(partialZone.readyForFutureEnforcement, false)
  assert.ok(partialZone.issues.some((i) => i.code === 'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE'))
  assertNeverDownstream(partialZone)
}

// 6) Diffuse scope yields a future-split diagnostic but does not block traversal.
{
  const result = normalizeApprovedEscapePointScope(
    baseScope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
  )
  assert.equal(result.anchorReadiness, 'ANCHORED_DIFFUSE')
  assert.equal(result.topology, 'diffuse')
  assert.equal(result.readyForFutureEnforcement, false)
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_DIFFUSE_SPLIT_REQUIRED'))
  assertNeverDownstream(result)
}

// 7) All three status vocabularies map unambiguously to the passive enforcement status.
{
  for (const status of ['DEFINED_NOT_ENFORCED', 'APPROVED_NOT_ENFORCED', 'PASSIVE_NOT_ENFORCED'] as const) {
    const result = normalizeApprovedEscapePointScope(baseScope({ status, escapePointAnchor: discreteAnchor() }))
    assert.equal(result.inputStatus, status, `Status ${status} is preserved without ambiguity.`)
    assert.equal(result.normalizedEnforcementStatus, 'PASSIVE_NOT_ENFORCED')
    assert.equal(result.issues.some((i) => i.code === 'ESCAPE_POINT_UNKNOWN_STATUS_VOCABULARY'), false)
    assertNeverDownstream(result)
  }
}

// 8) Invalid anchor (missing required fields) is flagged but never blocks traversal or opens downstream.
{
  const result = normalizeApprovedEscapePointScope(
    baseScope({
      escapePointAnchor: {
        agentId: '',
        agentKind: 'unknown',
        unsafeActOrOmission: { kind: 'unknown', statement: '' },
        operationalMoment: { description: '' },
        pointTopology: 'discrete',
      },
    }),
  )
  assert.equal(result.anchorReadiness, 'INVALID_ANCHOR')
  assert.equal(result.readyForFutureEnforcement, false)
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_AGENT_MISSING'))
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_ACT_OR_OMISSION_MISSING'))
  assert.ok(result.issues.some((i) => i.code === 'ESCAPE_POINT_OPERATIONAL_MOMENT_MISSING'))
  assertNeverDownstream(result)
}

console.log('escape-point-scope-contract-trial-001: OK')
