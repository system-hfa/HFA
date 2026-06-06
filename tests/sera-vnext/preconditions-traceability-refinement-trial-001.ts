import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { derivePreconditionsFromReleasedCodes } from '../../frontend/src/lib/sera-vnext/preconditions'
import { validateReleasedCodeSemanticConsistency } from '../../frontend/src/lib/sera-vnext/semantic-consistency'
import type { CodeReleaseGateResult, HumanDecisionInputSet, SemanticConsistencyGateResult } from '../../frontend/src/lib/sera-vnext/types'
type PreconditionsTrialReleasedCode = CodeReleaseGateResult['axisReleases'][number]['releasedCode'] | 'O-E'

const trial001Narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

function cloneGate(gate: CodeReleaseGateResult): CodeReleaseGateResult {
  return JSON.parse(JSON.stringify(gate)) as CodeReleaseGateResult
}

function cloneSemantic(gate: SemanticConsistencyGateResult): SemanticConsistencyGateResult {
  return JSON.parse(JSON.stringify(gate)) as SemanticConsistencyGateResult
}

function makeSingleAxisGate(
  baseGate: CodeReleaseGateResult,
  axis: 'perception' | 'objective' | 'action',
  code: PreconditionsTrialReleasedCode
): CodeReleaseGateResult {
  const gate = cloneGate(baseGate)
  gate.axisReleases = [
    {
      axis,
      releasedCode: code as CodeReleaseGateResult['axisReleases'][number]['releasedCode'],
      source: 'HUMAN_REVIEW',
      reviewerRationale: `Traceability refinement scenario for ${code}.`,
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
    inputId: 'PRECONDITION-TRACE-SCENARIO-A',
    reviewerId: 'precondition-trace-reviewer-a',
    reviewTimestamp: '2026-05-23T18:00:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-D',
        evidenceReferences: ['High workload and degraded visual cues created attention saturation during approach transition.'],
        reviewerRationale: 'Perception candidate for traceability-enriched precondition derivation.',
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
        reviewerRationale: 'Objective candidate for traceability-enriched precondition derivation.',
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
        reviewerRationale: 'Action candidate for traceability-enriched precondition derivation.',
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
  const traceabilityScenarioA = buildReleasedCodeTraceability({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioA,
    baseResult: base001,
  })

  // Scenario A: preconditions with traceability present include traceability fields
  const preconditionsScenarioA = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioA,
    traceabilityResult: traceabilityScenarioA,
    baseResult: base001,
  })

  for (const candidate of preconditionsScenarioA.candidates) {
    assert.ok(candidate.sourceTraceabilityRefs, `Scenario A/${candidate.sourceAxis}: sourceTraceabilityRefs should exist`)
    assert.ok(candidate.traceabilityVersion, `Scenario A/${candidate.sourceAxis}: traceabilityVersion should exist`)
    assert.equal(typeof candidate.sourceIsNoFailure, 'boolean', `Scenario A/${candidate.sourceAxis}: sourceIsNoFailure should be boolean`)
    assert.ok(
      typeof candidate.sourceTimePressureExcessive === 'boolean' || candidate.sourceTimePressureExcessive === null,
      `Scenario A/${candidate.sourceAxis}: sourceTimePressureExcessive should be boolean|null`
    )
  }
  assert.equal(preconditionsScenarioA.downstreamLocked, true, 'Scenario A: downstream lock must remain true')

  // Scenario B: traceability absent keeps compatibility mode with limitations
  const preconditionsScenarioB = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioA,
    baseResult: base001,
  })
  assert.ok(
    preconditionsScenarioB.candidates.some((candidate) =>
      candidate.limitations.some((limitation) => limitation.includes('A4+R-46 compatibility mode'))
    ),
    'Scenario B: compatibility-mode limitation must be present when traceability is absent'
  )

  // Scenario C: A-A trace means no-failure and blocks failure precondition derivation
  const scenarioCGate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, 'action', 'A-A')
  const scenarioCSemantic = cloneSemantic(semanticScenarioA)
  scenarioCSemantic.axisResults = [
    {
      axis: 'action',
      releasedCode: 'A-A',
      status: 'SEMANTICALLY_CONSISTENT',
      checks: [],
      blockingIssues: [],
      warnings: [],
      requiredEvidence: [],
      matchedEvidence: [],
      missingEvidence: [],
      acknowledgementChecks: [],
      waiverConsistency: {
        waiverRequired: false,
        waiverApplied: false,
        consistent: true,
        details: 'n/a',
      },
      semanticRuleVersion: 'v0.2.0',
    },
  ]
  const scenarioCTrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioCGate,
    semanticConsistencyGateResult: scenarioCSemantic,
    baseResult: base001,
  })
  const preconditionsScenarioC = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: scenarioCGate,
    semanticConsistencyGateResult: scenarioCSemantic,
    traceabilityResult: scenarioCTrace,
    baseResult: base001,
  })
  assert.equal(preconditionsScenarioC.candidates[0]?.sourceIsNoFailure, true, 'Scenario C: A-A should carry sourceIsNoFailure=true')
  assert.equal(preconditionsScenarioC.candidates[0]?.status, 'BLOCKED', 'Scenario C: A-A should block failure precondition derivation')

  // Scenario D: O-E trace marked non-existent blocks derivation
  const scenarioDGate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, 'objective', 'O-E')
  const scenarioDSemantic = cloneSemantic(semanticScenarioA)
  scenarioDSemantic.axisResults = [
      {
        axis: 'objective',
        releasedCode: 'O-E' as unknown as SemanticConsistencyGateResult['axisResults'][number]['releasedCode'],
        status: 'SEMANTICALLY_CONSISTENT',
      checks: [],
      blockingIssues: [],
      warnings: [],
      requiredEvidence: [],
      matchedEvidence: [],
      missingEvidence: [],
      acknowledgementChecks: [],
      waiverConsistency: {
        waiverRequired: false,
        waiverApplied: false,
        consistent: true,
        details: 'n/a',
      },
      semanticRuleVersion: 'v0.2.0',
    },
  ]
  const scenarioDTrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioDGate,
    semanticConsistencyGateResult: scenarioDSemantic,
    baseResult: base001,
  })
  const preconditionsScenarioD = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: scenarioDGate,
    semanticConsistencyGateResult: scenarioDSemantic,
    traceabilityResult: scenarioDTrace,
    baseResult: base001,
  })
  assert.equal(preconditionsScenarioD.candidates[0]?.status, 'BLOCKED', 'Scenario D: O-E should block derivation')

  // Scenario E: trace BLOCKED prevents candidate derivation
  const scenarioEGate = makeSingleAxisGate(releaseScenarioA.codeReleaseGateResult, 'action', 'A-C')
  const scenarioESemantic = cloneSemantic(semanticScenarioA)
  scenarioESemantic.axisResults = [
    {
      axis: 'action',
      releasedCode: 'A-C',
      status: 'SEMANTICALLY_CONSISTENT',
      checks: [],
      blockingIssues: [],
      warnings: [],
      requiredEvidence: [],
      matchedEvidence: [],
      missingEvidence: [],
      acknowledgementChecks: [],
      waiverConsistency: {
        waiverRequired: false,
        waiverApplied: false,
        consistent: true,
        details: 'n/a',
      },
      semanticRuleVersion: 'v0.2.0',
    },
  ]
  const scenarioETrace = buildReleasedCodeTraceability({
    codeReleaseGateResult: scenarioEGate,
    semanticConsistencyGateResult: scenarioESemantic,
    baseResult: base001,
  })
  scenarioETrace.traces[0].status = 'BLOCKED'
  scenarioETrace.traces[0].blockingIssues = ['forced_blocked_trace_for_test']

  const preconditionsScenarioE = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: scenarioEGate,
    semanticConsistencyGateResult: scenarioESemantic,
    traceabilityResult: scenarioETrace,
    baseResult: base001,
  })
  assert.equal(preconditionsScenarioE.candidates[0]?.status, 'BLOCKED', 'Scenario E: BLOCKED trace should block derivation')

  // Scenario F: base selectedCode remains unresolved/non-classified
  for (const axis of [base001.poaClassification.perception, base001.poaClassification.objective, base001.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario F/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario F/${axis.axis}: CLASSIFIED must remain forbidden`)
  }

  // Scenario G: downstream/final/HFACS/Risk/recommendations locks remain active
  assert.equal(preconditionsScenarioA.downstreamLocked, true, 'Scenario G: downstream must remain locked')
  assert.equal(preconditionsScenarioA.finalConclusionLocked, true, 'Scenario G: finalConclusion must remain locked')
  assert.equal(preconditionsScenarioA.hfacsLocked, true, 'Scenario G: HFACS must remain locked')
  assert.equal(preconditionsScenarioA.riskLocked, true, 'Scenario G: Risk/ERC must remain locked')
  assert.equal(preconditionsScenarioA.recommendationsLocked, true, 'Scenario G: recommendations must remain locked')

  console.log(
    JSON.stringify(
      {
        scenarioA: preconditionsScenarioA,
        scenarioB: preconditionsScenarioB,
        scenarioC: preconditionsScenarioC,
        scenarioD: preconditionsScenarioD,
        scenarioE: preconditionsScenarioE,
      },
      null,
      2
    )
  )
  console.log('SERA vNext Preconditions Traceability Refinement Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Preconditions Traceability Refinement Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
