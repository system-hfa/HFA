import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { validateReleasedCodeSemanticConsistency } from '../../frontend/src/lib/sera-vnext/semantic-consistency'
import type { CodeReleaseGateResult, HumanDecisionInputSet } from '../../frontend/src/lib/sera-vnext/types'

const trial001Narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

function cloneGate(gate: CodeReleaseGateResult): CodeReleaseGateResult {
  return JSON.parse(JSON.stringify(gate)) as CodeReleaseGateResult
}

function makeSingleAxisGate(baseGate: CodeReleaseGateResult, axis: 'perception' | 'objective' | 'action', code: string): CodeReleaseGateResult {
  const gate = cloneGate(baseGate)
  gate.axisReleases = [
    {
      axis,
      releasedCode: code,
      source: 'HUMAN_REVIEW',
      reviewerRationale: `Traceability scenario for ${code}.`,
      evidenceReferences: [`Evidence anchor for ${code}.`],
      acceptedUncertainties: [],
      waiverApplied: false,
      guardrailAcknowledgements: [`ack ${code}`],
      releaseStatus: 'RELEASED_BY_HUMAN_REVIEW',
      releaseBlockingIssues: [],
      auditTrace: [`trace:${code}`],
    },
  ]
  gate.globalBlockingIssues = []
  gate.outputLocks = ['CLASSIFIED', 'finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC']
  gate.downstreamStillLocked = true
  gate.finalConclusionStillLocked = true
  gate.causalCoreOnly = true
  return gate
}

async function main() {
  const base001 = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative: trial001Narrative,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })

  const validInput: HumanDecisionInputSet = {
    inputId: 'TRACEABILITY-SCENARIO-A',
    reviewerId: 'traceability-reviewer-a',
    reviewTimestamp: '2026-05-23T16:00:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-D',
        evidenceReferences: ['High workload and degraded visual cues created attention saturation during approach transition.'],
        reviewerRationale: 'Perception candidate emphasizes attention overload and recognition timing context.',
        acceptedUncertainties: ['Recognition sequence remains partially uncertain.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['cue uptake recognition timing verified'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
      {
        axis: 'objective',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'O-B',
        evidenceReferences: ['Continuation objective is explicit in the approach continuation sequence context.'],
        reviewerRationale: 'Objective candidate remains conservative and fully human-reviewed.',
        acceptedUncertainties: ['Intent framing remains partial.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['intent and rule awareness boundary checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
      {
        axis: 'action',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'A-C',
        evidenceReferences: ['Action recovery sequence indicates post-action verification weakness under uncertainty.'],
        reviewerRationale: 'Action candidate constrained to post-action feedback semantics.',
        acceptedUncertainties: ['Exact control-input timing remains unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted for controlled next-gate processing.',
          acceptedResidualUncertainty: ['control_input_timing_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['physical motor ergonomic evidence boundary checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
    ],
  }

  const releaseScenarioA = buildCodeReleaseGateResult({ result: base001, inputSet: validInput })
  const semanticScenarioA = validateReleasedCodeSemanticConsistency({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    baseResult: base001,
  })

  // Scenario A: valid released package produces traceability records per released axis
  const traceabilityScenarioA = buildReleasedCodeTraceability({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioA,
    baseResult: base001,
  })

  assert.equal(traceabilityScenarioA.traces.length, 3, 'Scenario A: one trace per released axis is expected')
  for (const trace of traceabilityScenarioA.traces) {
    assert.ok(trace.code.length > 0, `Scenario A/${trace.axis}: code is required`)
    assert.ok(trace.evidenceRefs.length > 0, `Scenario A/${trace.axis}: evidence refs are required`)
    assert.ok(trace.rationaleRefs.length > 0, `Scenario A/${trace.axis}: rationale refs are required`)
    assert.equal(trace.taxonomyVersion, 'SERA_PT_CANONICAL_v1.0', `Scenario A/${trace.axis}: taxonomy version must be canonical`)
    assert.equal(
      trace.authorDecisionVersion,
      'SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0',
      `Scenario A/${trace.axis}: author decision version must be set`
    )
    assert.ok(trace.derivationPath.length > 0, `Scenario A/${trace.axis}: derivation path is required`)
  }

  // Scenario B: A-A must be no-failure with null Hendy category
  const scenarioBGate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, 'action', 'A-A')
  const traceabilityScenarioB = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioBGate,
    baseResult: base001,
  })
  const actionTraceB = traceabilityScenarioB.traces[0]
  assert.equal(actionTraceB?.code, 'A-A', 'Scenario B: action trace code should be A-A')
  assert.equal(actionTraceB?.isNoFailure, true, 'Scenario B: A-A must be marked as no-failure')
  assert.equal(actionTraceB?.hendyCategory, null, 'Scenario B: A-A must have null Hendy category')

  // Scenario C: O-E is reserved/not active and cannot be traced as active objective code
  const scenarioCGate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, 'objective', 'O-E')
  const traceabilityScenarioC = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioCGate,
    baseResult: base001,
  })
  const objectiveTraceC = traceabilityScenarioC.traces[0]
  assert.equal(objectiveTraceC?.status, 'RESERVED_NOT_ACTIVE', 'Scenario C: O-E must be RESERVED_NOT_ACTIVE')
  assert.ok(
    objectiveTraceC?.warnings.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'Scenario C: warning must explicitly reference NON_EXISTENT_IN_SERA_PT_V1'
  )

  // Scenario D: timePressureExcessive canonical mapping
  const temporalExpectations: Array<{ axis: 'perception' | 'action'; code: string; expected: boolean }> = [
    { axis: 'perception', code: 'P-D', expected: true },
    { axis: 'perception', code: 'P-G', expected: false },
    { axis: 'action', code: 'A-F', expected: false },
    { axis: 'action', code: 'A-G', expected: false },
    { axis: 'action', code: 'A-H', expected: true },
    { axis: 'action', code: 'A-I', expected: true },
    { axis: 'action', code: 'A-J', expected: true },
  ]

  for (const item of temporalExpectations) {
    const gate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, item.axis, item.code)
    const traceability = buildReleasedCodeTraceability({ codeReleaseGateResult: gate, baseResult: base001 })
    assert.equal(
      traceability.traces[0]?.timePressureExcessive,
      item.expected,
      `Scenario D/${item.code}: timePressureExcessive should be ${String(item.expected)}`
    )
  }

  // Scenario E: base selectedCode stays unresolved and no automatic CLASSIFIED
  for (const axis of [base001.poaClassification.perception, base001.poaClassification.objective, base001.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario E/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario E/${axis.axis}: CLASSIFIED must remain forbidden`)
  }

  // Scenario F: downstream/final/recommendation locks remain true
  assert.equal(traceabilityScenarioA.downstreamLocked, true, 'Scenario F: downstream must remain locked')
  assert.equal(traceabilityScenarioA.finalConclusionLocked, true, 'Scenario F: finalConclusion must remain locked')
  assert.equal(traceabilityScenarioA.hfacsLocked, true, 'Scenario F: HFACS must remain locked')
  assert.equal(traceabilityScenarioA.riskLocked, true, 'Scenario F: Risk/ERC must remain locked')
  assert.equal(traceabilityScenarioA.recommendationsLocked, true, 'Scenario F: recommendations must remain locked')

  const summary = {
    scenarioA: traceabilityScenarioA,
    scenarioB: actionTraceB,
    scenarioC: objectiveTraceC,
    scenarioD: temporalExpectations,
  }

  console.log(JSON.stringify(summary, null, 2))
  console.log('SERA vNext Code Traceability Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Code Traceability Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
