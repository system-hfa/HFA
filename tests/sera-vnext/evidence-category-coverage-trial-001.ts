import assert from 'node:assert/strict'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { auditPassiveEvidenceCategoryCoverage } from '../../frontend/src/lib/sera-vnext/evidence-category-coverage'
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

function traceAxis(result: ReleasedCodeTraceabilityResult, axis: PoaAxis) {
  const found = result.traces.find((item) => item.axis === axis)
  assert.ok(found, `Expected traceability record for ${axis}`)
  return found
}

function preconditionAxis(result: PreconditionsFromReleasedCodesResult, axis: PoaAxis) {
  const found = result.candidates.find((item) => item.sourceAxis === axis)
  assert.ok(found, `Expected precondition candidate for ${axis}`)
  return found
}

async function main() {
  const base = createBaseResult('EVIDENCE-CATEGORY-COVERAGE-TRIAL-001')

  // Scenario A: sufficient hints -> coverage recorded, with no code/status mutation
  const scenarioAItems = [
    { axis: 'action' as const, code: 'A-D', evidenceCategoryHints: [{ category: 'PHYSICAL_CAPABILITY', source: 'manual' as const }] },
    { axis: 'objective' as const, code: 'O-B', evidenceCategoryHints: [{ category: 'INTENT_AWARENESS', source: 'manual' as const }] },
    { axis: 'perception' as const, code: 'P-D', evidenceCategoryHints: [{ category: 'TIME_PRESSURE', source: 'manual' as const }] },
    {
      axis: 'perception' as const,
      code: 'P-G',
      evidenceCategoryHints: [{ category: 'PROCEDURAL_MONITORING', source: 'manual' as const }],
    },
    {
      axis: 'perception' as const,
      code: 'P-H',
      evidenceCategoryHints: [{ category: 'COMMUNICATION_INFORMATION', source: 'manual' as const }],
    },
    { axis: 'perception' as const, code: 'P-B', evidenceCategoryHints: [{ category: 'SENSORY_LIMITATION', source: 'manual' as const }] },
    { axis: 'perception' as const, code: 'P-C', evidenceCategoryHints: [{ category: 'KNOWLEDGE_TRAINING', source: 'manual' as const }] },
    { axis: 'action' as const, code: 'A-E', evidenceCategoryHints: [{ category: 'KNOWLEDGE_TRAINING', source: 'manual' as const }] },
    {
      axis: 'action' as const,
      code: 'A-J',
      evidenceCategoryHints: [
        { category: 'TIME_PRESSURE', source: 'manual' as const },
        { category: 'COMMUNICATION_INFORMATION', source: 'manual' as const },
      ],
    },
    {
      axis: 'objective' as const,
      code: 'O-C',
      evidenceCategoryHints: [{ category: 'INTENT_AWARENESS', source: 'manual' as const }],
    },
  ]

  const scenarioAAudit = auditPassiveEvidenceCategoryCoverage({ items: scenarioAItems })
  assert.equal(scenarioAAudit.status, 'PASSIVE_COVERAGE_RECORDED', 'Scenario A: coverage should be recorded')
  assert.ok((scenarioAAudit.categoriesObservedCount.TIME_PRESSURE || 0) >= 1, 'Scenario A: TIME_PRESSURE must be counted')

  const scenarioATraceGate = gate('COVERAGE-A', [release('action', 'A-J')])
  const scenarioATrace = buildReleasedCodeTraceability({ codeReleaseGateResult: scenarioATraceGate, baseResult: base })
  const beforeCode = traceAxis(scenarioATrace, 'action')?.code
  const beforeStatus = traceAxis(scenarioATrace, 'action')?.status
  auditPassiveEvidenceCategoryCoverage({ traceability: scenarioATrace })
  assert.equal(traceAxis(scenarioATrace, 'action')?.code, beforeCode, 'Scenario A: coverage audit must not alter code')
  assert.equal(traceAxis(scenarioATrace, 'action')?.status, beforeStatus, 'Scenario A: coverage audit must not alter status')

  // Scenario B: hints absent -> incomplete coverage with passive gaps and no blocking behavior
  const scenarioBAudit = auditPassiveEvidenceCategoryCoverage({
    items: [
      { axis: 'action', code: 'A-D', evidenceCategoryHints: [] },
      { axis: 'objective', code: 'O-C', evidenceCategoryHints: [] },
    ],
  })
  assert.equal(scenarioBAudit.status, 'PASSIVE_COVERAGE_INCOMPLETE', 'Scenario B: coverage should be incomplete')
  assert.ok(
    scenarioBAudit.findings.some((item) => item.severity === 'PASSIVE_GAP'),
    'Scenario B: passive coverage gaps must be recorded'
  )

  // Scenario C: A-D without PHYSICAL_CAPABILITY -> passive gap only
  const scenarioCAudit = auditPassiveEvidenceCategoryCoverage({
    items: [{ axis: 'action', code: 'A-D', evidenceCategoryHints: [{ category: 'TIME_PRESSURE', source: 'manual' }] }],
  })
  const scenarioCGap = scenarioCAudit.findings.find((item) => item.code === 'A-D')
  assert.equal(scenarioCGap?.severity, 'PASSIVE_GAP', 'Scenario C: A-D should report passive gap')
  assert.ok(
    scenarioCGap?.missingCategories.includes('PHYSICAL_CAPABILITY'),
    'Scenario C: A-D gap should include PHYSICAL_CAPABILITY'
  )

  // Scenario D: O-C without INTENT_AWARENESS -> passive gap only
  const scenarioDAudit = auditPassiveEvidenceCategoryCoverage({
    items: [{ axis: 'objective', code: 'O-C', evidenceCategoryHints: [{ category: 'RULE_NORM_CONTEXT', source: 'manual' }] }],
  })
  const scenarioDGap = scenarioDAudit.findings.find((item) => item.code === 'O-C')
  assert.equal(scenarioDGap?.severity, 'PASSIVE_GAP', 'Scenario D: O-C should report passive gap')
  assert.ok(
    scenarioDGap?.missingCategories.includes('INTENT_AWARENESS'),
    'Scenario D: O-C gap should include INTENT_AWARENESS'
  )

  // Scenario E: O-E remains NON_EXISTENT_CODE after audit
  const scenarioEGate = gate('COVERAGE-E', [
    release('objective', 'O-E', {
      evidenceReferences: ['attempt to use non-existent objective code'],
      reviewerRationale: 'O-E non-existent contract test for coverage audit.',
    }),
  ])
  const scenarioESemantic = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioEGate, baseResult: base })
  const scenarioETrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioEGate,
    semanticConsistencyGateResult: scenarioESemantic,
    baseResult: base,
  })
  auditPassiveEvidenceCategoryCoverage({ traceability: scenarioETrace })
  assert.equal(traceAxis(scenarioETrace, 'objective')?.status, 'NON_EXISTENT_CODE', 'Scenario E: O-E must remain NON_EXISTENT_CODE')

  // Scenario F: downstream remains locked
  assert.equal(scenarioETrace.downstreamLocked, true, 'Scenario F: downstream must remain locked')
  assert.equal(scenarioETrace.finalConclusionLocked, true, 'Scenario F: finalConclusion must remain locked')
  assert.equal(scenarioETrace.hfacsLocked, true, 'Scenario F: HFACS must remain locked')
  assert.equal(scenarioETrace.riskLocked, true, 'Scenario F: Risk/ERC must remain locked')
  assert.equal(scenarioETrace.recommendationsLocked, true, 'Scenario F: recommendations must remain locked')

  // Scenario G: selectedCode remains UNRESOLVED
  const scenarioGGate = gate('COVERAGE-G', [release('action', 'A-C')])
  const scenarioGSemantic = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioGGate, baseResult: base })
  const scenarioGTrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioGGate,
    semanticConsistencyGateResult: scenarioGSemantic,
    baseResult: base,
  })
  const scenarioGPreconditions = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: scenarioGGate,
    semanticConsistencyGateResult: scenarioGSemantic,
    traceabilityResult: scenarioGTrace,
    baseResult: base,
  })
  auditPassiveEvidenceCategoryCoverage({ traceability: scenarioGTrace, preconditions: scenarioGPreconditions })

  for (const axis of [base.poaClassification.perception, base.poaClassification.objective, base.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario G/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario G/${axis.axis}: CLASSIFIED must remain forbidden`)
  }

  assert.ok(
    preconditionAxis(scenarioGPreconditions, 'action')?.sourceReleasedCode.length > 0,
    'Scenario G: precondition source code should remain available after passive audit'
  )

  console.log(
    JSON.stringify(
      {
        scenarioA: {
          status: scenarioAAudit.status,
          categoriesObserved: scenarioAAudit.categoriesObservedCount,
        },
        scenarioB: {
          status: scenarioBAudit.status,
          passiveGapCount: scenarioBAudit.findings.filter((item) => item.severity === 'PASSIVE_GAP').length,
        },
        scenarioC: scenarioCGap,
        scenarioD: scenarioDGap,
        scenarioE: {
          objectiveStatus: traceAxis(scenarioETrace, 'objective')?.status,
        },
      },
      null,
      2
    )
  )
  console.log('SERA vNext Evidence Category Coverage Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Evidence Category Coverage Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
