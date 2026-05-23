import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
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
    inputId: 'SEMANTIC-SCENARIO-A',
    reviewerId: 'semantic-reviewer-a',
    reviewTimestamp: '2026-05-23T13:30:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Cue uptake and recognition timing were explicitly considered for this candidate.',
        acceptedUncertainties: ['Recognition timing remains partially uncertain.'],
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
        evidenceReferences: ['Approach continuation after visual contact is observable in the sequence.'],
        reviewerRationale: 'Decision context and operational continuation rationale were explicitly assessed.',
        acceptedUncertainties: ['Intent framing remains partially uncertain.'],
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
        evidenceReferences: ['A recovery action sequence is observed at very low height.'],
        reviewerRationale: 'Action sequence timing and actor-action linkage were explicitly reviewed.',
        acceptedUncertainties: ['Exact control-input sequence unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted under explicit waiver path.',
          acceptedResidualUncertainty: ['exact_control_input_sequence_unresolved_but_waivable'],
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

  assert.ok(
    semanticScenarioA.gateStatus === 'SEMANTIC_GATE_READY' || semanticScenarioA.gateStatus === 'SEMANTIC_GATE_PARTIAL',
    'Scenario A: semantic gate must be READY or PARTIAL for conservative valid package'
  )
  assert.equal(semanticScenarioA.downstreamStillLocked, true, 'Scenario A: downstream must remain locked')
  assert.equal(semanticScenarioA.finalConclusionStillLocked, true, 'Scenario A: final conclusion must remain locked')
  for (const axis of [base001.poaClassification.perception, base001.poaClassification.objective, base001.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario A/${axis.axis}: base selectedCode must remain UNRESOLVED`)
  }

  // Scenario B: A-D without physical/motor/ergonomic evidence/acknowledgement -> semantic block
  const scenarioBGate = cloneGate(releaseScenarioA.codeReleaseGateResult)
  const actionRelease = scenarioBGate.axisReleases.find((axis) => axis.axis === 'action')
  assert.ok(actionRelease, 'Scenario B: action release must exist')
  if (actionRelease) {
    actionRelease.releasedCode = 'A-D'
    actionRelease.evidenceReferences = ['Recovery occurred at low height above water.']
    actionRelease.reviewerRationale = 'Action candidate based on aircraft state only.'
    actionRelease.guardrailAcknowledgements = ['action evidence reviewed']
    actionRelease.releaseStatus = 'RELEASED_BY_HUMAN_REVIEW'
    actionRelease.releaseBlockingIssues = []
  }
  const semanticScenarioB = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioBGate, baseResult: base001 })
  const semanticActionB = semanticScenarioB.axisResults.find((axis) => axis.axis === 'action')
  assert.equal(semanticActionB?.status, 'SEMANTICALLY_BLOCKED', 'Scenario B: A-D without physical/motor/ergonomic support must be blocked')

  // Scenario C: O-C/O-D/O-E without intent/rule-awareness -> semantic block
  const scenarioCGate = cloneGate(releaseScenarioA.codeReleaseGateResult)
  const objectiveRelease = scenarioCGate.axisReleases.find((axis) => axis.axis === 'objective')
  assert.ok(objectiveRelease, 'Scenario C: objective release must exist')
  if (objectiveRelease) {
    objectiveRelease.releasedCode = 'O-D'
    objectiveRelease.evidenceReferences = ['Approach continuation after visual contact is observable.']
    objectiveRelease.reviewerRationale = 'Continuation context used without explicit intent framing.'
    objectiveRelease.guardrailAcknowledgements = ['objective reviewed']
    objectiveRelease.releaseStatus = 'RELEASED_BY_HUMAN_REVIEW'
    objectiveRelease.releaseBlockingIssues = []
  }
  const semanticScenarioC = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioCGate, baseResult: base001 })
  const semanticObjectiveC = semanticScenarioC.axisResults.find((axis) => axis.axis === 'objective')
  assert.equal(semanticObjectiveC?.status, 'SEMANTICALLY_BLOCKED', 'Scenario C: O-D without intent/rule-awareness must be blocked')

  // Scenario D: Perception failure inferred only from weather/warning -> not semantically consistent
  const scenarioDGate = cloneGate(releaseScenarioA.codeReleaseGateResult)
  const perceptionRelease = scenarioDGate.axisReleases.find((axis) => axis.axis === 'perception')
  assert.ok(perceptionRelease, 'Scenario D: perception release must exist')
  if (perceptionRelease) {
    perceptionRelease.releasedCode = 'P-G'
    perceptionRelease.evidenceReferences = [
      'Low cloud and degraded visibility affected cue quality.',
      'Warning system did not generate alert in the envelope.',
    ]
    perceptionRelease.reviewerRationale = 'Perception failure inferred from weather and warning non-alert.'
    perceptionRelease.guardrailAcknowledgements = ['perception reviewed']
    perceptionRelease.releaseStatus = 'RELEASED_BY_HUMAN_REVIEW'
    perceptionRelease.releaseBlockingIssues = []
  }
  const semanticScenarioD = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: scenarioDGate, baseResult: base001 })
  const semanticPerceptionD = semanticScenarioD.axisResults.find((axis) => axis.axis === 'perception')
  assert.ok(
    semanticPerceptionD?.status === 'SEMANTICALLY_BLOCKED' || semanticPerceptionD?.status === 'SEMANTIC_REVIEW_REQUIRED',
    'Scenario D: weather/warning-only perception failure must not be semantically consistent'
  )
  assert.notEqual(
    semanticPerceptionD?.status,
    'SEMANTICALLY_CONSISTENT',
    'Scenario D: weather/warning-only perception failure cannot be SEMANTICALLY_CONSISTENT'
  )

  // Scenario E: downstream/final conclusion request should block semantic gate globally
  const scenarioEInput: HumanDecisionInputSet = {
    inputId: 'SEMANTIC-SCENARIO-E',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Attempting downstream unlock request.',
        acceptedUncertainties: [],
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
        confidenceByReviewer: 'low',
        requestedDownstreamOutputs: ['finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC', 'CLASSIFIED'],
      },
    ],
  }
  const releaseScenarioE = buildCodeReleaseGateResult({ result: base001, inputSet: scenarioEInput })
  const semanticScenarioE = validateReleasedCodeSemanticConsistency({
    codeReleaseGateResult: releaseScenarioE.codeReleaseGateResult,
    baseResult: base001,
  })
  assert.equal(semanticScenarioE.gateStatus, 'SEMANTIC_GATE_BLOCKED', 'Scenario E: downstream request must block semantic gate globally')
  assert.ok(
    semanticScenarioE.globalBlockingIssues.some((issue) => issue.toLowerCase().includes('downstream')),
    'Scenario E: global semantic blocking should include downstream reason'
  )

  const summary = {
    scenarioA: semanticScenarioA,
    scenarioB: semanticScenarioB,
    scenarioC: semanticScenarioC,
    scenarioD: semanticScenarioD,
    scenarioE: semanticScenarioE,
  }

  console.log(JSON.stringify(summary, null, 2))
  console.log('SERA vNext Semantic Consistency Released Codes Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Semantic Consistency Released Codes Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
