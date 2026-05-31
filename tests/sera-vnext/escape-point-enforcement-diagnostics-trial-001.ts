import assert from 'node:assert/strict'
import {
  enforceEscapePointScope,
  summarizeEscapePointEnforcementDiagnostics,
  type EscapePointEnforcementBlockingIssueCode,
  type EscapePointEnforcementResult,
  type EscapePointEnforcementWarningCode,
} from '../../frontend/src/lib/sera-vnext/escape-point-enforcement'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraLeafCode,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

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
    scopeId: 'scope-ep-diagnostics-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Diagnostics trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

function run(input: Parameters<typeof enforceEscapePointScope>[0]): {
  result: EscapePointEnforcementResult
  summary: ReturnType<typeof summarizeEscapePointEnforcementDiagnostics>
} {
  const result = enforceEscapePointScope(input)
  const summary = summarizeEscapePointEnforcementDiagnostics(result)
  return { result, summary }
}

function assertBlockingTrace(
  bundle: ReturnType<typeof run>,
  code: EscapePointEnforcementBlockingIssueCode,
): void {
  assert.ok(bundle.result.blockingIssues.includes(code), `Blocking issue ${code} must be present in output.`)
  assert.ok(bundle.summary.auditTrace.some((item) => item.includes(`blocking:${code}`)), `${code} missing from auditTrace.`)
  assert.ok(
    bundle.summary.allBlockingIssueTrace.some((item) => item.code === code && item.present),
    `${code} missing from blocking catalog trace.`,
  )
}

function assertWarningTrace(
  bundle: ReturnType<typeof run>,
  code: EscapePointEnforcementWarningCode,
): void {
  assert.ok(bundle.result.warnings.includes(code), `Warning ${code} must be present in output.`)
  assert.ok(bundle.summary.auditTrace.some((item) => item.includes(`warning:${code}`)), `${code} missing from auditTrace.`)
  assert.ok(
    bundle.summary.allWarningTrace.some((item) => item.code === code && item.present),
    `${code} missing from warning catalog trace.`,
  )
}

function assertCandidateOnly(bundle: ReturnType<typeof run>): void {
  const { result, summary } = bundle
  assert.equal(result.selectedCodeAllowed, false)
  assert.equal(result.releasedCodeAllowed, false)
  assert.equal(result.poaClosureAllowed, false)
  assert.equal(result.classificationAllowed, false)
  assert.equal(result.downstreamAllowed, false)
  assert.equal(result.finalConclusionAllowed, false)
  assert.equal(result.notFinalClassification, true)
  assert.equal(summary.candidateOnlyLocksIntact, true)
  assert.equal(summary.downstreamOutputsAbsent, true)
  assert.equal(summary.readinessForIndependentReview, 'READY')
}

function assertNoForbiddenOutputs(bundle: ReturnType<typeof run>): void {
  const raw = bundle.result as unknown as Record<string, unknown>
  assert.equal('selectedCode' in raw, false)
  assert.equal('releasedCode' in raw, false)
  assert.equal('finalConclusion' in raw, false)
  assert.equal('hfacs' in raw, false)
  assert.equal('risk' in raw, false)
  assert.equal('erc' in raw, false)
  assert.equal('armsErc' in raw, false)
  assert.equal('recommendations' in raw, false)
  assert.notEqual(bundle.result.status, 'CLASSIFIED' as never)
}

const allResults: ReturnType<typeof run>[] = []

// 1) EP-B01
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'flight-crew',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assertBlockingTrace(caseResult, 'EP-B01_AGENT_MIGRATION')
  allResults.push(caseResult)
}

// 2) EP-B02
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:9',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assertBlockingTrace(caseResult, 'EP-B02_POST_EVENT_ANALYSIS')
  allResults.push(caseResult)
}

// 3) EP-B03
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['pilot recovery attempt after impact (consequence)'],
    proposedCode: 'A-G',
  })
  assertBlockingTrace(caseResult, 'EP-B03_CONSEQUENCE_AS_BASIS')
  allResults.push(caseResult)
}

// 4) EP-B04
{
  const caseResult = run({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-D',
  })
  assertBlockingTrace(caseResult, 'EP-B04_FORBIDDEN_CODE_FOR_AGENT')
  allResults.push(caseResult)
}

// 5) EP-B05
{
  const caseResult = run({
    scope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assertBlockingTrace(caseResult, 'EP-B05_DIFFUSE_REQUIRES_SPLIT')
  allResults.push(caseResult)
}

// 6) EP-B06
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
    siblingEscapePointRefs: ['scope-ep-secondary'],
  })
  assertBlockingTrace(caseResult, 'EP-B06_MULTIPLE_POINTS')
  allResults.push(caseResult)
}

// 7) EP-B07 (invalid scope anchor)
{
  const caseResult = run({
    scope: scope({
      escapePointAnchor: {
        agentId: '',
        agentKind: 'unknown',
        unsafeActOrOmission: { kind: 'unknown', statement: '' },
        operationalMoment: { description: '' },
        pointTopology: 'discrete',
      },
    }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assertBlockingTrace(caseResult, 'EP-B07_SCOPE_INVALID')
  allResults.push(caseResult)
}

// 8) EP-B08
{
  const caseResult = run({
    scope: undefined,
    axis: 'A',
    enforcementMode: 'ENFORCE',
  })
  assertBlockingTrace(caseResult, 'EP-B08_SCOPE_ABSENT')
  allResults.push(caseResult)
}

// 9) EP-W01 (progressive complete)
{
  const caseResult = run({
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
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assertWarningTrace(caseResult, 'EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED')
  allResults.push(caseResult)
}

// 10) EP-W02 (unknown agent)
{
  const caseResult = run({
    scope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'unknown', agentId: 'unknown-agent' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'unknown-agent',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assertWarningTrace(caseResult, 'EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW')
  allResults.push(caseResult)
}

// 11) EP-W03 (weak/absent axis evidence)
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: [],
    proposedCode: 'A-G',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assertWarningTrace(caseResult, 'EP-W03_AXIS_EVIDENCE_BOUNDARY_WEAK')
  allResults.push(caseResult)
}

// 12) EP-W04 (other-agent response in context)
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: ['ev-maint-1'],
    analysisContext: 'pilot response after technical failure should be handled separately',
    proposedCode: 'A-G',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_ENFORCED_OK')
  assertWarningTrace(caseResult, 'EP-W04_SECONDARY_ANALYSIS_REQUIRED_FOR_OTHER_AGENT_RESPONSE')
  allResults.push(caseResult)
}

// 13) EP-W05 (passive mode)
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'PASSIVE_COMPAT',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assertWarningTrace(caseResult, 'EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE')
  allResults.push(caseResult)
}

// 14) DISCRETE happy path is ENFORCED_OK.
{
  const caseResult = run({
    scope: scope(),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisMomentRef: 'seq:3',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_ENFORCED_OK')
  allResults.push(caseResult)
}

// 15) PROGRESSIVE_ZONE uses earliestControllableRef.
{
  const caseResult = run({
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
  assert.ok(caseResult.result.diagnostics.some((item) => item.includes('earliestControllableRef')))
  assert.ok(caseResult.summary.auditTrace.some((item) => item.includes('earliestControllableRef')))
  allResults.push(caseResult)
}

// 16) DIFFUSE blocks and requires split.
{
  const caseResult = run({
    scope: scope({ escapePointAnchor: discreteAnchor({ pointTopology: 'diffuse' }) }),
    axis: 'A',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'A-G',
  })
  assert.equal(caseResult.result.status, 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT')
  assert.ok(caseResult.result.nextRequiredAction.toLowerCase().includes('decompose'))
  allResults.push(caseResult)
}

// 17) O-E remains non-existent/blocked.
{
  const caseResult = run({
    scope: scope(),
    axis: 'O',
    enforcementMode: 'ENFORCE',
    axisAgentRef: 'maintenance-copterline',
    axisEvidenceRefs: ['ev-maint-1'],
    proposedCode: 'O-E' as CanonicalSeraLeafCode,
  })
  assertBlockingTrace(caseResult, 'EP-B07_SCOPE_INVALID')
  assert.ok(caseResult.result.diagnostics.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')))
  allResults.push(caseResult)
}

// 18, 19, 20) Candidate-only locks, no downstream outputs, and no CLASSIFIED status in every case.
for (const caseResult of allResults) {
  assertCandidateOnly(caseResult)
  assertNoForbiddenOutputs(caseResult)
}

console.log('escape-point-enforcement-diagnostics-trial-001: OK')
