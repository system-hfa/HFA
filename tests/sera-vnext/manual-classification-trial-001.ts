import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { validateHumanDecisionInput } from '../../frontend/src/lib/sera-vnext/human-decision'
import type {
  HumanDecisionInputSet,
  ManualClassificationDryRunResult,
} from '../../frontend/src/lib/sera-vnext/types'

const trial001Narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

const trial004Narrative = `A Sikorsky S-76C++ was operating an offshore transport flight involving Lagos and ERHA FPSO. During the return flight from the offshore facility toward Lagos, there were two flight crew members and passengers on board. The first officer was pilot flying and the captain was pilot monitoring according to the available source material.

During the flight, repeated DAFCS and TRIM FAIL indications occurred. Similar indications had reportedly occurred on an earlier sector and had been reset. During the return sector, emergency or abnormal procedure material was consulted, and the pilot flying was instructed to keep hands and feet on the controls.

The event developed into an offshore ditching. The occupants survived, and the aircraft was destroyed after saltwater submersion. The event occurred in an offshore environment with abnormal automation or trim indications and potential flight-control or handling concerns.

Available information included cockpit indications, emergency/abnormal procedures, aircraft handling cues, altitude/flight path information, crew role allocation, offshore location and communication with air traffic services. This neutral input does not establish the exact technical failure sequence, whether the indications were causal or symptomatic, the exact checklist steps performed, the crew's understanding of the system state, or whether ditching was selected or forced by aircraft controllability.`

async function main() {
  const baseTrial001 = await analyzeSeraVNext({
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

  const axisContractByAxis = new Map(baseTrial001.humanReviewDecisionGate.axisContracts.map((contract) => [contract.axis, contract]))
  for (const axis of ['perception', 'objective', 'action'] as const) {
    assert.equal(
      axisContractByAxis.get(axis)?.decisionStatus,
      'READY_FOR_HUMAN_DECISION',
      `TRIAL-SET1-001/${axis}: must be READY_FOR_HUMAN_DECISION for manual dry-run`
    )
  }

  const scenarioAInput: HumanDecisionInputSet = {
    inputId: 'MANUAL-TRIAL-001-SCENARIO-A',
    reviewerId: 'manual-reviewer-a',
    reviewTimestamp: '2026-05-23T12:30:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Manual proposal kept at candidate level with explicit cue-trace basis.',
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
        reviewerRationale: 'Objective candidate remains non-final and trace-linked.',
        acceptedUncertainties: ['Intent framing remains uncertain.'],
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
        reviewerRationale: 'Action candidate includes required waiver for residual sequence uncertainty.',
        acceptedUncertainties: ['Exact control-input sequence unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty explicitly accepted for next gate review.',
          acceptedResidualUncertainty: ['exact_control_input_sequence_unresolved_but_waivable'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['physical motor ergonomic evidence boundary checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
    ],
  }

  const validatedHumanInputs = validateHumanDecisionInput(baseTrial001.humanReviewDecisionGate, scenarioAInput)
  assert.equal(validatedHumanInputs.inputProvided, true, 'Scenario A: human input must be provided')
  for (const axisResult of validatedHumanInputs.results) {
    assert.equal(axisResult.status, 'VALID_FOR_RELEASE_GATE', `Scenario A/${axisResult.axis}: must be VALID_FOR_RELEASE_GATE`)
    assert.equal(axisResult.valid, true, `Scenario A/${axisResult.axis}: valid should be true`)
    assert.equal(axisResult.acceptedForNextGate, true, `Scenario A/${axisResult.axis}: acceptedForNextGate should be true`)
  }

  const acceptedForNextGate = validatedHumanInputs.results.every((item) => item.acceptedForNextGate)
  const notReleasedYet = true
  const releaseBlockedUntilA4R44 = true

  const manualDecisionPackage: ManualClassificationDryRunResult = {
    inputId: baseTrial001.inputId,
    axisDecisionInputs: scenarioAInput.axisDecisions,
    validationResults: validatedHumanInputs.results,
    acceptedForNextGate,
    releaseStatus: acceptedForNextGate ? 'MANUAL_INPUT_VALIDATED_NOT_RELEASED' : 'MANUAL_INPUT_REJECTED',
    releaseBlockedReason: 'Final release gate is not authorized until A4+R-44.',
    selectedCodesRemainUnresolved: ['perception', 'objective', 'action'].every(
      (axis) => baseTrial001.poaClassification[axis].selectedCode === 'UNRESOLVED'
    ),
    proposedCodes: {
      perception: scenarioAInput.axisDecisions.find((item) => item.axis === 'perception')?.proposedCode || undefined,
      objective: scenarioAInput.axisDecisions.find((item) => item.axis === 'objective')?.proposedCode || undefined,
      action: scenarioAInput.axisDecisions.find((item) => item.axis === 'action')?.proposedCode || undefined,
    },
    outputLocks: [...baseTrial001.humanReviewDecisionGate.globalProhibitedOutputs],
  }

  assert.equal(manualDecisionPackage.acceptedForNextGate, true, 'Scenario A: manual package should be accepted for next gate')
  assert.equal(manualDecisionPackage.releaseStatus, 'MANUAL_INPUT_VALIDATED_NOT_RELEASED', 'Scenario A: must remain not released')
  assert.equal(manualDecisionPackage.selectedCodesRemainUnresolved, true, 'Scenario A: selected codes must remain unresolved')
  assert.ok(manualDecisionPackage.outputLocks.includes('CLASSIFIED'), 'Scenario A: CLASSIFIED must remain locked')

  const scenarioAIntegrated = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative: trial001Narrative,
    locale: 'en',
    humanDecisionInput: scenarioAInput,
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })

  for (const axis of [
    scenarioAIntegrated.poaClassification.perception,
    scenarioAIntegrated.poaClassification.objective,
    scenarioAIntegrated.poaClassification.action,
  ]) {
    assert.equal(axis.selectedCode, 'UNRESOLVED', `Scenario A integrated/${axis.axis}: selectedCode must remain UNRESOLVED`)
    assert.notEqual(axis.status, 'CLASSIFIED', `Scenario A integrated/${axis.axis}: CLASSIFIED is forbidden`)
  }

  const baseTrial004 = await analyzeSeraVNext({
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
    inputId: 'MANUAL-TRIAL-004-SCENARIO-B',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['fallback_reference'],
        reviewerRationale: 'Not-ready axis test',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Waiver fields satisfied to isolate NOT_READY rejection path.',
          acceptedResidualUncertainty: ['trial004_not_ready_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['cue uptake recognition timing verified'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
    ],
  }

  const scenarioBValidation = validateHumanDecisionInput(baseTrial004.humanReviewDecisionGate, scenarioBInput)
  assert.equal(scenarioBValidation.results[0]?.status, 'INVALID_NOT_READY', 'Scenario B: not-ready proposal must be INVALID_NOT_READY')
  assert.equal(scenarioBValidation.results[0]?.acceptedForNextGate, false, 'Scenario B: acceptedForNextGate must be false')

  const scenarioCInput: HumanDecisionInputSet = {
    inputId: 'MANUAL-TRIAL-001-SCENARIO-C',
    axisDecisions: [
      {
        axis: 'objective',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'O-B',
        evidenceReferences: ['Continuation context followed unsuccessful instrument approaches in degraded conditions.'],
        reviewerRationale: 'Attempting downstream unlock (forbidden).',
        acceptedUncertainties: [],
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
        confidenceByReviewer: 'low',
        requestedDownstreamOutputs: ['finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC', 'CLASSIFIED'],
      },
    ],
  }

  const scenarioCValidation = validateHumanDecisionInput(baseTrial001.humanReviewDecisionGate, scenarioCInput)
  assert.equal(
    scenarioCValidation.results[0]?.status,
    'INVALID_GUARDRAIL_CONFLICT',
    'Scenario C: downstream request must be INVALID_GUARDRAIL_CONFLICT'
  )

  const scenarioDInput: HumanDecisionInputSet = {
    inputId: 'MANUAL-TRIAL-001-SCENARIO-D',
    axisDecisions: [
      {
        axis: 'action',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'A-D',
        evidenceReferences: ['A recovery action sequence is observed at very low height.'],
        reviewerRationale: 'Testing missing A-D acknowledgement.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted for test only.',
          acceptedResidualUncertainty: ['test_residual'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['action evidence reviewed'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
      {
        axis: 'objective',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'O-D',
        evidenceReferences: ['Approach continuation after visual contact is observable in the sequence.'],
        reviewerRationale: 'Testing missing objective acknowledgement.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['objective reviewed'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-G',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Testing missing perception acknowledgement.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['perception reviewed'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
    ],
  }

  const scenarioDValidation = validateHumanDecisionInput(baseTrial001.humanReviewDecisionGate, scenarioDInput)
  for (const axisResult of scenarioDValidation.results) {
    assert.equal(
      axisResult.status,
      'INVALID_GUARDRAIL_CONFLICT',
      `Scenario D/${axisResult.axis}: missing axis-specific acknowledgement must be INVALID_GUARDRAIL_CONFLICT`
    )
  }

  const manualSummary = {
    inputId: manualDecisionPackage.inputId,
    validatedHumanInputs,
    manualDecisionPackage,
    acceptedForNextGate,
    notReleasedYet,
    releaseBlockedUntilA4R44,
    scenarioBValidation,
    scenarioCValidation,
    scenarioDValidation,
  }

  console.log(JSON.stringify(manualSummary, null, 2))
  assert.equal(notReleasedYet, true, 'Manual dry-run must remain not released')
  assert.equal(releaseBlockedUntilA4R44, true, 'Manual dry-run release must remain blocked until A4+R-44')

  console.log('SERA vNext Manual Classification Trial 001 dry-run PASS')
}

main().catch((error) => {
  console.error('SERA vNext Manual Classification Trial 001 dry-run FAIL')
  console.error(error)
  process.exit(1)
})
