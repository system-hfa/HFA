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

function discreteAnchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maint-01',
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
    scopeId: 'scope-ep-hardening-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Hardening trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

function assertLocks(result: EscapePointEnforcementResult): void {
  assert.equal(result.selectedCodeAllowed, false)
  assert.equal(result.releasedCodeAllowed, false)
  assert.equal(result.poaClosureAllowed, false)
  assert.equal(result.classificationAllowed, false)
  assert.equal(result.downstreamAllowed, false)
  assert.equal(result.finalConclusionAllowed, false)
  assert.equal(result.notFinalClassification, true)
}

function assertNoDownstreamFields(result: EscapePointEnforcementResult): void {
  const raw = result as unknown as Record<string, unknown>
  assert.equal('selectedCode' in raw, false)
  assert.equal('releasedCode' in raw, false)
  assert.equal('finalConclusion' in raw, false)
  assert.equal('hfacs' in raw, false)
  assert.equal('risk' in raw, false)
  assert.equal('erc' in raw, false)
  assert.equal('armsErc' in raw, false)
  assert.equal('recommendations' in raw, false)
}

const cases: EscapePointEnforcementResult[] = []

// F-A 1) ENFORCE + valid scope + axisAgentRef missing => block.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_AXIS_AGENT_REF_REQUIRED')
  assert.deepEqual(result.blockingIssues, ['EP-B09_AXIS_AGENT_REF_REQUIRED'])
  cases.push(result)
}

// F-A 2) PASSIVE_COMPAT + axisAgentRef missing => non-blocking.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'PASSIVE_COMPAT',
  })
  assert.equal(result.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.equal(result.blockingIssues.length, 0)
  cases.push(result)
}

// F-A 3) ENFORCE + axisAgentRef equals anchor => OK.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  cases.push(result)
}

// F-A 4) ENFORCE + axisAgentRef diverges => EP-B01.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'pilot-01',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION')
  assert.deepEqual(result.blockingIssues, ['EP-B01_AGENT_MIGRATION'])
  cases.push(result)
}

// F-B 5) A-D + maintenance_or_org + own-agent physical evidence => allowed.
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org', agentId: 'maint-01' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['maintenance technician maint-01 had a documented hand injury limiting torque application'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  cases.push(result)
}

// F-B 6) A-D + maintenance_or_org + other actor physical evidence => blocked EP-B04.
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org', agentId: 'maint-01' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['pilot had physical limitation, while maintenance agent maint-01 performed inspection'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.deepEqual(result.blockingIssues, ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'])
  cases.push(result)
}

// F-B 7) A-D + design_mgmt + generic non-linked physical evidence => blocked EP-B04.
{
  const result = enforceEscapePointScope({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'design_mgmt', agentId: 'design-07' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'design-07',
    axisEvidenceRefs: ['physical limitation was discussed, but not linked to design-07'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-D',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT')
  assert.deepEqual(result.blockingIssues, ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'])
  cases.push(result)
}

// F-C 8) ENFORCE + no sequenceRef => blocked EP-B10.
{
  const result = enforceEscapePointScope({
    scope: scope({
      escapePointAnchor: discreteAnchor({
        operationalMoment: { description: 'Scheduled maintenance without sequence reference.' },
      }),
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SEQUENCE_REF_REQUIRED')
  assert.deepEqual(result.blockingIssues, ['EP-B10_SEQUENCE_REF_REQUIRED_FOR_ENFORCE'])
  cases.push(result)
}

// F-C 9) PASSIVE_COMPAT + no sequenceRef => non-blocking.
{
  const result = enforceEscapePointScope({
    scope: scope({
      escapePointAnchor: discreteAnchor({
        operationalMoment: { description: 'Scheduled maintenance without sequence reference.' },
      }),
    }),
    axis: 'A',
    enforcementMode: 'PASSIVE_COMPAT',
  })
  assert.equal(result.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assert.equal(result.blockingIssues.length, 0)
  cases.push(result)
}

// F-C 10) ENFORCE + sequenceRef present + later axisMomentRef => EP-B02.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:9',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assert.deepEqual(result.blockingIssues, ['EP-B02_POST_EVENT_ANALYSIS'])
  cases.push(result)
}

// F-C 11) ENFORCE + sequenceRef present + correct moment => OK.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'A-G',
  })
  assert.equal(result.status, 'ESCAPE_POINT_ENFORCED_OK')
  cases.push(result)
}

// 12 + 13) locks and forbidden outputs in all cases.
for (const result of cases) {
  assertLocks(result)
  assertNoDownstreamFields(result)
}

// 14) O-E remains blocked/non-existent and never active.
{
  const result = enforceEscapePointScope({
    scope: scope(),
    axis: 'O',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maint-01',
    axisEvidenceRefs: ['ev-maint-1'],
    axisMomentRef: 'seq:3',
    proposedCode: 'O-E' as CanonicalSeraLeafCode,
  })
  assert.equal(result.status, 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID')
  assert.deepEqual(result.blockingIssues, ['EP-B07_SCOPE_INVALID'])
  assert.ok(result.diagnostics.some((d) => d.includes('NON_EXISTENT_IN_SERA_PT_V1')))
  assertLocks(result)
  assertNoDownstreamFields(result)
}

console.log('escape-point-enforcement-hardening-trial-001: OK')
