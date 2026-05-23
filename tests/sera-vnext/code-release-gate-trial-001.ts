import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
import type { HumanDecisionInputSet } from '../../frontend/src/lib/sera-vnext/types'

const trial001Narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

const trial002Narrative = `A Sikorsky S-76 helicopter was operating at night in connection with a flight involving a private landing site near Peasmarsh, East Sussex. The operation involved two crew members and passengers. Weather and visibility conditions included reduced visibility and low cloud.

During the night approach to the private landing site, the approach was discontinued. A protected or briefed go-around route was not available in the information prepared for the operation. After the approach was discontinued, the helicopter descended toward the tops of nearby trees.

The aircraft warning system generated terrain or ground-proximity warnings during the event. The crew did not become aware of those warnings in time to prevent the low-altitude proximity to obstacles. No injuries and no aircraft damage were reported in the summarized event information.

Available information included visual references at night, flight instruments, obstacle environment, crew monitoring, warning-system output and pre-approach planning or briefing. The neutral input does not establish the exact reason the warning was not perceived or registered, the exact flown path, the precise pilot flying / pilot monitoring roles, or the exact decision sequence during the discontinued approach.`

const trial004Narrative = `A Sikorsky S-76C++ was operating an offshore transport flight involving Lagos and ERHA FPSO. During the return flight from the offshore facility toward Lagos, there were two flight crew members and passengers on board. The first officer was pilot flying and the captain was pilot monitoring according to the available source material.

During the flight, repeated DAFCS and TRIM FAIL indications occurred. Similar indications had reportedly occurred on an earlier sector and had been reset. During the return sector, emergency or abnormal procedure material was consulted, and the pilot flying was instructed to keep hands and feet on the controls.

The event developed into an offshore ditching. The occupants survived, and the aircraft was destroyed after saltwater submersion. The event occurred in an offshore environment with abnormal automation or trim indications and potential flight-control or handling concerns.

Available information included cockpit indications, emergency/abnormal procedures, aircraft handling cues, altitude/flight path information, crew role allocation, offshore location and communication with air traffic services. This neutral input does not establish the exact technical failure sequence, whether the indications were causal or symptomatic, the exact checklist steps performed, the crew's understanding of the system state, or whether ditching was selected or forced by aircraft controllability.`

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

  // Scenario A: valid release gate package from ready P/O/A
  const scenarioAInput: HumanDecisionInputSet = {
    inputId: 'RELEASE-GATE-SCENARIO-A',
    reviewerId: 'release-reviewer-a',
    reviewTimestamp: '2026-05-23T13:00:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Perception release candidate remains within human-review source constraints.',
        acceptedUncertainties: ['Recognition timeline partially unresolved.'],
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
        reviewerRationale: 'Objective release candidate is evidence-bound and non-downstream.',
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
        reviewerRationale: 'Action release candidate includes required waiver path and remains causal-core-only.',
        acceptedUncertainties: ['Exact control-input sequence unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted for release candidate gating.',
          acceptedResidualUncertainty: ['exact_control_input_sequence_unresolved_but_waivable'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['physical motor ergonomic evidence boundary checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
    ],
  }

  const scenarioA = buildCodeReleaseGateResult({ result: base001, inputSet: scenarioAInput })
  assert.equal(scenarioA.codeReleaseGateResult.gateStatus, 'RELEASE_READY_FOR_CAUSAL_CORE', 'Scenario A: gate should be release-ready')
  for (const axisRelease of scenarioA.codeReleaseGateResult.axisReleases) {
    assert.equal(axisRelease.releaseStatus, 'RELEASED_BY_HUMAN_REVIEW', `Scenario A/${axisRelease.axis}: axis should be released`)
    assert.ok(axisRelease.releasedCode, `Scenario A/${axisRelease.axis}: releasedCode should be present`)
    assert.equal(axisRelease.source, 'HUMAN_REVIEW', `Scenario A/${axisRelease.axis}: source must be HUMAN_REVIEW`)
  }
  assert.equal(scenarioA.codeReleaseGateResult.downstreamStillLocked, true, 'Scenario A: downstream must remain locked')
  assert.equal(scenarioA.codeReleaseGateResult.finalConclusionStillLocked, true, 'Scenario A: finalConclusion must remain locked')
  for (const axis of [base001.poaClassification.perception, base001.poaClassification.objective, base001.poaClassification.action]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario A/${axis.axis}: base selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario A/${axis.axis}: base status must not be CLASSIFIED`)
  }

  // Scenario B: not-ready axis should be blocked
  const base004 = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-004',
    sourceType: 'neutral_trial',
    narrative: trial004Narrative,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })
  const scenarioBInput: HumanDecisionInputSet = {
    inputId: 'RELEASE-GATE-SCENARIO-B',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['fallback_reference'],
        reviewerRationale: 'Not-ready axis release attempt.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Waiver fields satisfied only for not-ready test.',
          acceptedResidualUncertainty: ['trial004_not_ready_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['cue uptake recognition timing verified'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
    ],
  }
  const scenarioB = buildCodeReleaseGateResult({ result: base004, inputSet: scenarioBInput })
  assert.equal(scenarioB.codeReleaseGateResult.gateStatus, 'RELEASE_BLOCKED', 'Scenario B: gate should be blocked')
  assert.ok(
    scenarioB.codeReleaseGateResult.axisReleases.some((axis) => axis.releaseStatus === 'RELEASE_BLOCKED'),
    'Scenario B: at least one axis must be blocked'
  )

  // Scenario C: downstream request should block global release
  const scenarioCInput: HumanDecisionInputSet = {
    inputId: 'RELEASE-GATE-SCENARIO-C',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Attempting forbidden downstream output unlock.',
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
  const scenarioC = buildCodeReleaseGateResult({ result: base001, inputSet: scenarioCInput })
  assert.equal(scenarioC.codeReleaseGateResult.gateStatus, 'RELEASE_BLOCKED', 'Scenario C: global release must be blocked')
  assert.ok(
    scenarioC.codeReleaseGateResult.globalBlockingIssues.some((issue) => issue.toLowerCase().includes('downstream')),
    'Scenario C: global blocking issues should contain downstream reason'
  )

  // Scenario D: mixed partial release (Trial 002: P ready, O/A not-ready)
  const base002 = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-002',
    sourceType: 'neutral_trial',
    narrative: trial002Narrative,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })
  const scenarioDInput: HumanDecisionInputSet = {
    inputId: 'RELEASE-GATE-SCENARIO-D',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Perception ready-axis release candidate for partial release test.',
        acceptedUncertainties: ['Recognition timing partly unresolved.'],
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
        evidenceReferences: ['fallback_reference'],
        reviewerRationale: 'Objective not-ready release attempt in partial scenario.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Waiver accepted for partial test.',
          acceptedResidualUncertainty: ['not_ready_objective_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['intent and rule awareness boundary checked'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
      {
        axis: 'action',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'A-C',
        evidenceReferences: ['fallback_reference'],
        reviewerRationale: 'Action not-ready release attempt in partial scenario.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Waiver accepted for partial test.',
          acceptedResidualUncertainty: ['not_ready_action_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['physical motor ergonomic evidence boundary checked'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
    ],
  }

  const scenarioD = buildCodeReleaseGateResult({ result: base002, inputSet: scenarioDInput })
  assert.equal(scenarioD.codeReleaseGateResult.gateStatus, 'PARTIAL_RELEASE', 'Scenario D: gate should be PARTIAL_RELEASE')
  const perceptionRelease = scenarioD.codeReleaseGateResult.axisReleases.find((axis) => axis.axis === 'perception')
  const objectiveRelease = scenarioD.codeReleaseGateResult.axisReleases.find((axis) => axis.axis === 'objective')
  const actionRelease = scenarioD.codeReleaseGateResult.axisReleases.find((axis) => axis.axis === 'action')
  assert.equal(perceptionRelease?.releaseStatus, 'RELEASED_BY_HUMAN_REVIEW', 'Scenario D: perception should be released')
  assert.equal(objectiveRelease?.releaseStatus, 'RELEASE_BLOCKED', 'Scenario D: objective should remain blocked')
  assert.equal(actionRelease?.releaseStatus, 'RELEASE_BLOCKED', 'Scenario D: action should remain blocked')
  assert.equal(scenarioD.codeReleaseGateResult.downstreamStillLocked, true, 'Scenario D: downstream remains locked')
  assert.equal(scenarioD.codeReleaseGateResult.finalConclusionStillLocked, true, 'Scenario D: final conclusion remains locked')

  const summary = {
    scenarioA: scenarioA.codeReleaseGateResult,
    scenarioB: scenarioB.codeReleaseGateResult,
    scenarioC: scenarioC.codeReleaseGateResult,
    scenarioD: scenarioD.codeReleaseGateResult,
  }

  console.log(JSON.stringify(summary, null, 2))
  console.log('SERA vNext Code Release Gate Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Code Release Gate Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
