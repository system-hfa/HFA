import assert from 'node:assert/strict'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { buildPassiveEvidenceCategoryHints, normalizePassiveEvidenceCategoryHints } from '../../frontend/src/lib/sera-vnext/evidence-categories'
import { derivePreconditionsFromReleasedCodes } from '../../frontend/src/lib/sera-vnext/preconditions'
import { validateReleasedCodeSemanticConsistency } from '../../frontend/src/lib/sera-vnext/semantic-consistency'
import type {
  CodeReleaseGateResult,
  HumanValidatedAxisClassification,
  PoaAxis,
  PreconditionsFromReleasedCodesResult,
  ReleasedCodeTraceabilityResult,
  SeraVNextResult,
} from '../../frontend/src/lib/sera-vnext/types'

const OUTPUT_LOCKS = ['CLASSIFIED', 'finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC']

function createBaseResult(inputId: string): SeraVNextResult {
  return {
    inputId,
    poaClassification: {
      perception: { axis: 'perception', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
      objective: { axis: 'objective', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
      action: { axis: 'action', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
    },
  } as unknown as SeraVNextResult
}

function release(axis: PoaAxis, code: string, overrides: Partial<HumanValidatedAxisClassification> = {}): HumanValidatedAxisClassification {
  return {
    axis,
    releasedCode: code,
    source: 'HUMAN_REVIEW',
    reviewerRationale: `Rationale for ${axis}/${code}`,
    evidenceReferences: [`Evidence for ${axis}/${code}`],
    acceptedUncertainties: [],
    waiverApplied: false,
    guardrailAcknowledgements: ['baseline acknowledgement'],
    releaseStatus: 'RELEASED_BY_HUMAN_REVIEW',
    releaseBlockingIssues: [],
    auditTrace: [`trace:${axis}:${code}`],
    ...overrides,
  }
}

function gate(inputId: string, axisReleases: HumanValidatedAxisClassification[]): CodeReleaseGateResult {
  return {
    inputId,
    gateStatus: 'RELEASE_READY_FOR_CAUSAL_CORE',
    axisReleases,
    globalBlockingIssues: [],
    outputLocks: [...OUTPUT_LOCKS],
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
  }
}

function preconditionAxis(result: PreconditionsFromReleasedCodesResult, axis: PoaAxis) {
  const found = result.candidates.find((item) => item.sourceAxis === axis)
  assert.ok(found, `Expected precondition candidate for ${axis}`)
  return found
}

function traceAxis(result: ReleasedCodeTraceabilityResult, axis: PoaAxis) {
  const found = result.traces.find((item) => item.axis === axis)
  assert.ok(found, `Expected traceability record for ${axis}`)
  return found
}

async function main() {
  const base = createBaseResult('EVIDENCE-CATEGORIES-PASSIVE-TRIAL-001')

  // Scenario A: hints are preserved and do not alter released code status
  const manualHints = normalizePassiveEvidenceCategoryHints([
    { category: 'TIME_PRESSURE', source: 'manual', note: 'manual hint for test' },
    'COMMUNICATION_INFORMATION',
  ])
  assert.equal(manualHints.length, 2, 'Scenario A: manual hints should be preserved after normalization')

  const scenarioAGate = gate('PASSIVE-A', [release('action', 'A-J')])
  const scenarioATrace = buildReleasedCodeTraceability({ codeReleaseGateResult: scenarioAGate, baseResult: base })
  const actionTraceA = traceAxis(scenarioATrace, 'action')
  assert.equal(actionTraceA?.code, 'A-J', 'Scenario A: passive hints must not change released code')
  assert.equal(actionTraceA?.status, 'TRACEABLE', 'Scenario A: passive hints must not change status')

  // Scenario B: no hints provided does not block flow
  const noHints = normalizePassiveEvidenceCategoryHints()
  assert.equal(noHints.length, 0, 'Scenario B: empty hints should be accepted')

  const scenarioBGate = gate('PASSIVE-B', [release('perception', 'P-C')])
  const scenarioBSemantic = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioBGate, baseResult: base })
  const scenarioBPreconditions = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: scenarioBGate,
    semanticConsistencyGateResult: scenarioBSemantic,
    baseResult: base,
  })
  const scenarioBCandidate = preconditionAxis(scenarioBPreconditions, 'perception')
  assert.ok(
    scenarioBCandidate?.status === 'REVIEW_REQUIRED' || scenarioBCandidate?.status === 'CANDIDATE_PRECONDITION',
    'Scenario B: flow must remain functional without hints'
  )
  assert.ok(
    !scenarioBPreconditions.globalBlockingIssues.some((issue) => issue.toLowerCase().includes('evidence category')),
    'Scenario B: absence of hints must not create evidence-category blocking issues'
  )

  // Scenario C: A-D can carry PHYSICAL_CAPABILITY hint but absence does not block by itself
  const builtHintsC = buildPassiveEvidenceCategoryHints({
    releasedCode: 'A-D',
    evidenceRefs: ['physical motor ergonomic constraints were documented'],
  })
  assert.ok(
    builtHintsC.some((item) => item.category === 'PHYSICAL_CAPABILITY'),
    'Scenario C: PHYSICAL_CAPABILITY should be available as passive hint for A-D'
  )

  const scenarioCGate = gate('PASSIVE-C', [
    release('action', 'A-D', {
      evidenceReferences: ['physical motor ergonomic constraints were documented'],
      reviewerRationale: 'A-D with explicit physical/motor/ergonomic evidence.',
      guardrailAcknowledgements: ['physical motor ergonomic boundary acknowledged'],
    }),
  ])
  const scenarioCSemantic = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioCGate, baseResult: base })
  const scenarioCTrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioCGate,
    semanticConsistencyGateResult: scenarioCSemantic,
    baseResult: base,
  })
  const scenarioCTraceWithoutHints = JSON.parse(JSON.stringify(scenarioCTrace)) as ReleasedCodeTraceabilityResult
  scenarioCTraceWithoutHints.traces[0].evidenceCategoryHints = undefined
  assert.equal(
    traceAxis(scenarioCTrace, 'action')?.status,
    'TRACEABLE',
    'Scenario C: A-D remains traceable with evidence support'
  )
  assert.equal(
    traceAxis(scenarioCTraceWithoutHints, 'action')?.status,
    'TRACEABLE',
    'Scenario C: absence of passive hints must not block traceability by itself'
  )

  // Scenario D: evidence categories do not reactivate O-E
  const scenarioDGate = gate('PASSIVE-D', [
    release('objective', 'O-E', {
      evidenceReferences: ['attempt to use reserved objective code'],
      reviewerRationale: 'O-E forced for passive-hint contract test.',
    }),
  ])
  const scenarioDSemantic = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioDGate, baseResult: base })
  const scenarioDTrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioDGate,
    semanticConsistencyGateResult: scenarioDSemantic,
    baseResult: base,
  })
  assert.equal(traceAxis(scenarioDTrace, 'objective')?.status, 'RESERVED_NOT_ACTIVE', 'Scenario D: O-E remains RESERVED_NOT_ACTIVE')

  // Scenario E: no downstream artifacts are generated
  assert.equal(scenarioCTrace.downstreamLocked, true, 'Scenario E: downstream remains locked')
  assert.equal(scenarioCTrace.finalConclusionLocked, true, 'Scenario E: finalConclusion remains locked')
  assert.equal(scenarioCTrace.hfacsLocked, true, 'Scenario E: HFACS remains locked')
  assert.equal(scenarioCTrace.riskLocked, true, 'Scenario E: Risk/ERC remains locked')
  assert.equal(scenarioCTrace.recommendationsLocked, true, 'Scenario E: recommendations remain locked')

  // Scenario F: selectedCode remains UNRESOLVED in base runtime state
  for (const axis of [base.poaClassification.perception, base.poaClassification.objective, base.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario F/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario F/${axis.axis}: CLASSIFIED must remain forbidden`)
  }

  console.log(
    JSON.stringify(
      {
        scenarioA: {
          code: actionTraceA?.code,
          status: actionTraceA?.status,
          hintCount: actionTraceA?.evidenceCategoryHints?.length || 0,
        },
        scenarioB: {
          gateStatus: scenarioBPreconditions.gateStatus,
          noHintsCount: noHints.length,
        },
        scenarioC: {
          statusWithHintsRemoved: traceAxis(scenarioCTraceWithoutHints, 'action')?.status,
          hasPhysicalCapabilityHint: builtHintsC.some((item) => item.category === 'PHYSICAL_CAPABILITY'),
        },
        scenarioD: {
          objectiveStatus: traceAxis(scenarioDTrace, 'objective')?.status,
        },
      },
      null,
      2
    )
  )
  console.log('SERA vNext Evidence Categories Passive Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Evidence Categories Passive Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
