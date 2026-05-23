import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
import { derivePreconditionsFromReleasedCodes } from '../../frontend/src/lib/sera-vnext/preconditions'
import { validateReleasedCodeSemanticConsistency } from '../../frontend/src/lib/sera-vnext/semantic-consistency'
import type { HumanDecisionInputSet, SemanticConsistencyGateResult } from '../../frontend/src/lib/sera-vnext/types'

const trial001Narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

function cloneSemantic(gate: SemanticConsistencyGateResult): SemanticConsistencyGateResult {
  return JSON.parse(JSON.stringify(gate)) as SemanticConsistencyGateResult
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

  const validInputScenarioA: HumanDecisionInputSet = {
    inputId: 'PRECONDITION-SCENARIO-A',
    reviewerId: 'precondition-reviewer-a',
    reviewTimestamp: '2026-05-23T15:00:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-D',
        evidenceReferences: [
          'High workload and degraded visual cues created attention saturation during approach transition.',
        ],
        reviewerRationale: 'Perception candidate reflects attention overload with cue-uptake and timing checks.',
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
        reviewerRationale: 'Objective candidate kept conservative and trace-linked to decision context.',
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
        reviewerRationale: 'Action candidate constrained to causal-core and explicit review evidence.',
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

  const releaseScenarioA = buildCodeReleaseGateResult({ result: base001, inputSet: validInputScenarioA })
  assert.equal(releaseScenarioA.codeReleaseGateResult.gateStatus, 'RELEASE_READY_FOR_CAUSAL_CORE', 'Scenario A: release gate should be ready')

  const semanticScenarioA = validateReleasedCodeSemanticConsistency({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    baseResult: base001,
  })

  const preconditionsScenarioA = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioA,
    baseResult: base001,
  })

  assert.ok(
    preconditionsScenarioA.gateStatus === 'PRECONDITION_CANDIDATES_READY' ||
      preconditionsScenarioA.gateStatus === 'PRECONDITION_CANDIDATES_PARTIAL',
    'Scenario A: gate should be ready or partial under conservative policy'
  )
  assert.equal(preconditionsScenarioA.downstreamLocked, true, 'Scenario A: downstream must remain locked')
  assert.equal(preconditionsScenarioA.finalConclusionLocked, true, 'Scenario A: final conclusion must remain locked')
  assert.equal(preconditionsScenarioA.hfacsLocked, true, 'Scenario A: HFACS must remain locked')
  assert.equal(preconditionsScenarioA.riskLocked, true, 'Scenario A: Risk/ERC must remain locked')
  assert.equal(preconditionsScenarioA.recommendationsLocked, true, 'Scenario A: recommendations must remain locked')
  assert.equal(preconditionsScenarioA.selectedCodesRemainUnresolved, true, 'Scenario A: base selectedCode must remain unresolved')

  const scenarioACandidates = preconditionsScenarioA.candidates.filter((item) => item.status !== 'BLOCKED')
  assert.ok(scenarioACandidates.length > 0, 'Scenario A: should produce at least one non-blocked candidate')
  for (const candidate of scenarioACandidates) {
    assert.ok(candidate.sourceReleasedCode.length > 0, `Scenario A/${candidate.sourceAxis}: sourceReleasedCode is required`)
    assert.ok(candidate.sourceEvidenceRefs.length > 0, `Scenario A/${candidate.sourceAxis}: sourceEvidenceRefs are required`)
  }

  // Scenario B: semantic blocked axis should not produce candidate precondition
  const semanticScenarioB = cloneSemantic(semanticScenarioA)
  const actionSemanticB = semanticScenarioB.axisResults.find((axis) => axis.axis === 'action')
  assert.ok(actionSemanticB, 'Scenario B: action semantic result must exist')
  if (actionSemanticB) {
    actionSemanticB.status = 'SEMANTICALLY_BLOCKED'
    actionSemanticB.blockingIssues = ['Action semantic consistency blocked for test scenario.']
  }
  const preconditionsScenarioB = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioA.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioB,
    baseResult: base001,
  })
  const actionCandidateB = preconditionsScenarioB.candidates.find((item) => item.sourceAxis === 'action')
  assert.equal(actionCandidateB?.status, 'BLOCKED', 'Scenario B: semantic blocked axis must remain BLOCKED')

  // Scenario C: O-E is RESERVED/NOT_ACTIVE and must block derivation
  const releaseScenarioC = JSON.parse(JSON.stringify(releaseScenarioA.codeReleaseGateResult))
  const objectiveReleaseC = releaseScenarioC.axisReleases.find((axis: { axis: string }) => axis.axis === 'objective')
  assert.ok(objectiveReleaseC, 'Scenario C: objective release must exist')
  if (objectiveReleaseC) {
    objectiveReleaseC.releasedCode = 'O-E'
    objectiveReleaseC.evidenceReferences = ['Objective code O-E forced for reserved-code negative scenario.']
    objectiveReleaseC.reviewerRationale = 'Reserved code test'
  }
  const semanticScenarioC = cloneSemantic(semanticScenarioA)
  const objectiveSemanticC = semanticScenarioC.axisResults.find((axis) => axis.axis === 'objective')
  if (objectiveSemanticC) {
    objectiveSemanticC.releasedCode = 'O-E'
    objectiveSemanticC.status = 'SEMANTICALLY_CONSISTENT'
    objectiveSemanticC.blockingIssues = []
    objectiveSemanticC.warnings = []
  }
  const preconditionsScenarioC = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioC,
    semanticConsistencyGateResult: semanticScenarioC,
    baseResult: base001,
  })
  const objectiveCandidateC = preconditionsScenarioC.candidates.find((item) => item.sourceAxis === 'objective')
  assert.equal(objectiveCandidateC?.status, 'BLOCKED', 'Scenario C: O-E must be blocked')
  assert.ok(
    objectiveCandidateC?.blockingIssues.some((issue) => issue.includes('RESERVED/NOT_ACTIVE')),
    'Scenario C: O-E blocking issue should reference RESERVED/NOT_ACTIVE'
  )

  // Scenario D: released code without HUMAN_REVIEW source should be blocked
  const releaseScenarioD = JSON.parse(JSON.stringify(releaseScenarioA.codeReleaseGateResult))
  ;(releaseScenarioD.axisReleases[0] as { source: string }).source = 'AUTO_CLASSIFIER'
  const preconditionsScenarioD = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioD,
    semanticConsistencyGateResult: semanticScenarioA,
    baseResult: base001,
  })
  const sourceCandidateD = preconditionsScenarioD.candidates.find((item) => item.sourceAxis === 'perception')
  assert.equal(sourceCandidateD?.status, 'BLOCKED', 'Scenario D: non-human source should be blocked')

  // Scenario E: downstream/final output request must preserve lock and block derivation
  const invalidDownstreamInput: HumanDecisionInputSet = {
    inputId: 'PRECONDITION-SCENARIO-E',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-D',
        evidenceReferences: ['High workload and degraded visual cues created attention saturation during approach transition.'],
        reviewerRationale: 'Attempting forbidden downstream request.',
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
  const releaseScenarioE = buildCodeReleaseGateResult({ result: base001, inputSet: invalidDownstreamInput })
  const semanticScenarioE = validateReleasedCodeSemanticConsistency({
    codeReleaseGateResult: releaseScenarioE.codeReleaseGateResult,
    baseResult: base001,
  })
  const preconditionsScenarioE = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioE.codeReleaseGateResult,
    semanticConsistencyGateResult: semanticScenarioE,
    baseResult: base001,
  })
  assert.equal(preconditionsScenarioE.downstreamLocked, true, 'Scenario E: downstream remains locked')
  assert.equal(preconditionsScenarioE.finalConclusionLocked, true, 'Scenario E: finalConclusion remains locked')
  assert.equal(preconditionsScenarioE.gateStatus, 'PRECONDITION_CANDIDATES_BLOCKED', 'Scenario E: downstream request must block gate')

  // Scenario F: selectedCode remains UNRESOLVED and no automatic CLASSIFIED
  for (const axis of [base001.poaClassification.perception, base001.poaClassification.objective, base001.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario F/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario F/${axis.axis}: CLASSIFIED must remain forbidden`)
  }

  // Scenario G: A-A means no specific action failure and must not derive action-failure precondition
  const releaseScenarioG = JSON.parse(JSON.stringify(releaseScenarioA.codeReleaseGateResult))
  const actionReleaseG = releaseScenarioG.axisReleases.find((axis: { axis: string }) => axis.axis === 'action')
  assert.ok(actionReleaseG, 'Scenario G: action release must exist')
  if (actionReleaseG) {
    actionReleaseG.releasedCode = 'A-A'
    actionReleaseG.evidenceReferences = ['Action remained coherent with perception and objective in released package context.']
    actionReleaseG.reviewerRationale = 'No specific action failure candidate in released code.'
  }
  const semanticScenarioG = cloneSemantic(semanticScenarioA)
  const actionSemanticG = semanticScenarioG.axisResults.find((axis) => axis.axis === 'action')
  if (actionSemanticG) {
    actionSemanticG.releasedCode = 'A-A'
    actionSemanticG.status = 'SEMANTICALLY_CONSISTENT'
    actionSemanticG.blockingIssues = []
    actionSemanticG.warnings = []
  }
  const preconditionsScenarioG = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: releaseScenarioG,
    semanticConsistencyGateResult: semanticScenarioG,
    baseResult: base001,
  })
  const actionCandidateG = preconditionsScenarioG.candidates.find((item) => item.sourceAxis === 'action')
  assert.equal(actionCandidateG?.sourceReleasedCode, 'A-A', 'Scenario G: action candidate source code should be A-A')
  assert.equal(actionCandidateG?.status, 'BLOCKED', 'Scenario G: A-A must block action-failure precondition derivation')
  assert.ok(
    actionCandidateG?.limitations.some((item) => item.toLowerCase().includes('no action-failure precondition derived')),
    'Scenario G: limitation should explicitly state no action-failure precondition derived'
  )

  const summary = {
    scenarioA: {
      gateStatus: preconditionsScenarioA.gateStatus,
      candidateStatuses: preconditionsScenarioA.candidates.map((item) => ({
        axis: item.sourceAxis,
        code: item.sourceReleasedCode,
        status: item.status,
        category: item.category,
      })),
    },
    scenarioB: {
      gateStatus: preconditionsScenarioB.gateStatus,
      actionStatus: actionCandidateB?.status,
    },
    scenarioC: {
      objectiveStatus: objectiveCandidateC?.status,
      objectiveBlockingIssues: objectiveCandidateC?.blockingIssues,
    },
    scenarioD: {
      sourceStatus: sourceCandidateD?.status,
    },
    scenarioE: {
      gateStatus: preconditionsScenarioE.gateStatus,
      globalBlockingIssues: preconditionsScenarioE.globalBlockingIssues,
    },
    scenarioG: {
      actionStatus: actionCandidateG?.status,
      actionLimitations: actionCandidateG?.limitations,
    },
  }

  console.log(JSON.stringify(summary, null, 2))
  console.log('SERA vNext Preconditions From Released Codes Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Preconditions From Released Codes Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
