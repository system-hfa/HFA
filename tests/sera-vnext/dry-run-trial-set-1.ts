import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'

type TrialInput = {
  inputId: string
  narrative: string
}

type TrialSummary = {
  inputId: string
  assuranceStatus: string
  perceptionStatus: string
  perceptionReviewReasonCode: string
  perceptionEligibility: string
  objectiveStatus: string
  objectiveReviewReasonCode: string
  objectiveEligibility: string
  actionStatus: string
  actionReviewReasonCode: string
  actionEligibility: string
  unmetCriteriaCount: number
  absoluteBlockersCount: number
  dominance: string
  humanReviewRequired: boolean
  assertionsPassed: boolean
  assertionError?: string
}

const trialSet: TrialInput[] = [
  {
    inputId: 'TRIAL-SET1-001',
    narrative: `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`,
  },
  {
    inputId: 'TRIAL-SET1-002',
    narrative: `A Sikorsky S-76 helicopter was operating at night in connection with a flight involving a private landing site near Peasmarsh, East Sussex. The operation involved two crew members and passengers. Weather and visibility conditions included reduced visibility and low cloud.

During the night approach to the private landing site, the approach was discontinued. A protected or briefed go-around route was not available in the information prepared for the operation. After the approach was discontinued, the helicopter descended toward the tops of nearby trees.

The aircraft warning system generated terrain or ground-proximity warnings during the event. The crew did not become aware of those warnings in time to prevent the low-altitude proximity to obstacles. No injuries and no aircraft damage were reported in the summarized event information.

Available information included visual references at night, flight instruments, obstacle environment, crew monitoring, warning-system output and pre-approach planning or briefing. The neutral input does not establish the exact reason the warning was not perceived or registered, the exact flown path, the precise pilot flying / pilot monitoring roles, or the exact decision sequence during the discontinued approach.`,
  },
  {
    inputId: 'TRIAL-SET1-003',
    narrative: `A Sikorsky S-76C+ was conducting a night VFR medical evacuation flight to Tofino/Long Beach Airport. The operation involved a night visual approach to a landing area at or near the airport.

During the approach, the autopilot was disconnected. The helicopter was then maneuvered toward the intended landing area. During the final portion of the approach, the aircraft developed low airspeed and a high rate of descent. Rotor speed decreased, and directional control degraded.

The helicopter descended below the intended safe profile and recovered at extremely low height before completing a subsequent landing. The event occurred during a night visual approach environment with limited recovery margin.

Available information included flight instruments, airspeed, descent information, rotor speed, attitude, autopilot status, external visual references, crew monitoring and procedures. This neutral input does not establish the exact callouts, the exact visual cues available to the crew, the precise division of crew duties, or the exact timing of recognition and recovery.`,
  },
  {
    inputId: 'TRIAL-SET1-004',
    narrative: `A Sikorsky S-76C++ was operating an offshore transport flight involving Lagos and ERHA FPSO. During the return flight from the offshore facility toward Lagos, there were two flight crew members and passengers on board. The first officer was pilot flying and the captain was pilot monitoring according to the available source material.

During the flight, repeated DAFCS and TRIM FAIL indications occurred. Similar indications had reportedly occurred on an earlier sector and had been reset. During the return sector, emergency or abnormal procedure material was consulted, and the pilot flying was instructed to keep hands and feet on the controls.

The event developed into an offshore ditching. The occupants survived, and the aircraft was destroyed after saltwater submersion. The event occurred in an offshore environment with abnormal automation or trim indications and potential flight-control or handling concerns.

Available information included cockpit indications, emergency/abnormal procedures, aircraft handling cues, altitude/flight path information, crew role allocation, offshore location and communication with air traffic services. This neutral input does not establish the exact technical failure sequence, whether the indications were causal or symptomatic, the exact checklist steps performed, the crew's understanding of the system state, or whether ditching was selected or forced by aircraft controllability.`,
  },
  {
    inputId: 'TRIAL-SET1-005',
    narrative: `A Cessna 500 Citation was operating a private flight in instrument flight conditions or an instrument-flight context. The aircraft was being operated by a pilot who was managing aircraft flight path and equipment during the flight.

During the event sequence, aircraft control was lost, and the aircraft entered an aerodynamic stall/spin before colliding with terrain near Marietta, Georgia. The available source family identifies issues involving aircraft equipment knowledge, automation or avionics use, and control of the aircraft, but this neutral input does not import those findings as conclusions.

Available information included aircraft flight instruments, avionics or automation systems, pilot control inputs, flight path information, and equipment state or mode information. This neutral input does not establish the exact automation mode sequence, the exact pilot perception of avionics or automation state, the exact intended flight path, or the precise timing of any manual-control transition.`,
  },
]

const allowedStatuses = new Set([
  'REVIEW_REQUIRED',
  'INSUFFICIENT_EVIDENCE',
  'READY_FOR_HUMAN_CLASSIFICATION',
  'NOT_IMPLEMENTED',
])

function assertNoForbiddenTopLevel(result: Record<string, unknown>, inputId: string) {
  for (const forbidden of ['hfacs', 'erc_level', 'risk', 'arms', 'finalConclusion']) {
    assert.ok(!(forbidden in result), `${inputId}: forbidden top-level key present: ${forbidden}`)
  }
}

function assertAxisTrace(axis: any, inputId: string) {
  assert.ok(axis.reviewTrace, `${inputId}/${axis.axis}: missing reviewTrace`)
  assert.ok(axis.reviewReasonCode, `${inputId}/${axis.axis}: missing reviewReasonCode`)
  assert.ok(
    axis.linkedUncertainties.length > 0 || axis.linkedEvidence.length > 0,
    `${inputId}/${axis.axis}: must link uncertainty or evidence`
  )
  assert.ok(axis.blockingForClassification.length > 0, `${inputId}/${axis.axis}: blockingForClassification must be non-empty`)
  assert.ok(axis.requiredHumanDecision, `${inputId}/${axis.axis}: requiredHumanDecision missing`)
  assert.ok(axis.transitionCriteria.length > 0, `${inputId}/${axis.axis}: transitionCriteria missing`)
}

function assertCommon(result: any, inputId: string) {
  assert.ok(result.engineVersion, `${inputId}: engineVersion missing`)
  assert.ok(result.unsafeState?.operationalUnsafeState, `${inputId}: operationalUnsafeState missing`)
  assert.ok(Array.isArray(result.unsafeState?.decisionAntecedents), `${inputId}: decisionAntecedents missing`)
  assert.ok(result.poaStatements?.perceptionStatement, `${inputId}: missing perceptionStatement`)
  assert.ok(result.poaStatements?.objectiveStatement, `${inputId}: missing objectiveStatement`)
  assert.ok(result.poaStatements?.actionStatement, `${inputId}: missing actionStatement`)

  for (const axis of [result.poaClassification.perception, result.poaClassification.objective, result.poaClassification.action]) {
    assert.ok(allowedStatuses.has(axis.status), `${inputId}/${axis.axis}: unexpected status ${axis.status}`)
    assert.notEqual(axis.status, 'CLASSIFIED', `${inputId}/${axis.axis}: CLASSIFIED is forbidden in this phase`)
    assert.ok(axis.classificationEligibility, `${inputId}/${axis.axis}: missing classificationEligibility`)
    assert.ok(axis.classificationEligibility.eligibilityStatus, `${inputId}/${axis.axis}: missing eligibilityStatus`)
    assert.equal(
      axis.classificationEligibility.eligibleForHumanClassification,
      axis.status === 'READY_FOR_HUMAN_CLASSIFICATION',
      `${inputId}/${axis.axis}: eligibility flag must match READY status`
    )
    if (axis.status === 'REVIEW_REQUIRED' || axis.status === 'INSUFFICIENT_EVIDENCE') {
      assertAxisTrace(axis, inputId)
    }
    if (axis.status === 'READY_FOR_HUMAN_CLASSIFICATION') {
      assert.equal(axis.blockingForClassification.length, 0, `${inputId}/${axis.axis}: READY status must not keep blocking items`)
    }
  }

  assert.equal(result.humanReview.required, true, `${inputId}: humanReview.required must be true`)
  assert.notEqual(result.causalAssurance.status, 'PASSED', `${inputId}: assurance must not be PASSED`)

  assertNoForbiddenTopLevel(result as Record<string, unknown>, inputId)
}

function assertTrialSpecific(result: any, inputId: string) {
  const p = result.poaClassification.perception
  const o = result.poaClassification.objective
  const a = result.poaClassification.action

  if (inputId === 'TRIAL-SET1-001') {
    assert.notEqual(a.selectedCode, 'A-D', `${inputId}: action must not be A-D`)
    assert.ok(!['O-C', 'O-D', 'O-E'].includes(o.selectedCode), `${inputId}: objective overclassified`)
    assert.ok(!['P-G', 'P-F', 'P-D'].includes(p.selectedCode), `${inputId}: perception overclassified from env/warning`)
  }

  if (inputId === 'TRIAL-SET1-002') {
    assert.ok(result.unsafeActCondition.dominance !== 'unsafe_act_dominant', `${inputId}: should not force single-axis act dominance`)
    const traceText = `${p.reviewReasonCode} ${o.reviewReasonCode} ${a.reviewReasonCode} ${p.reviewReason} ${o.reviewReason} ${a.reviewReason}`.toLowerCase()
    assert.ok(
      traceText.includes('required') || traceText.includes('trace') || traceText.includes('evidence'),
      `${inputId}: review trace should reflect warning/go-around/planning/obstacle ambiguity`
    )
  }

  if (inputId === 'TRIAL-SET1-003') {
    assert.notEqual(a.selectedCode, 'A-D', `${inputId}: should not infer inability from energy/control state`)
    assert.ok(
      a.blockingForClassification.some((x: string) => x.includes('aircraft_state') || x.includes('control')),
      `${inputId}: action trace should keep aircraft-state vs action-quality boundary`
    )
  }

  if (inputId === 'TRIAL-SET1-004') {
    assert.ok(
      result.unsafeActCondition.dominance === 'unsafe_condition_dominant' ||
        result.unsafeActCondition.dominance === 'mixed' ||
        result.unsafeActCondition.dominance === 'insufficient_evidence',
      `${inputId}: should accept system/condition-dominant or unresolved posture`
    )
    const allBlocking = [...p.blockingForClassification, ...o.blockingForClassification, ...a.blockingForClassification].join(' ').toLowerCase()
    assert.ok(
      allBlocking.includes('actor') || allBlocking.includes('control') || allBlocking.includes('evidence') || allBlocking.includes('state'),
      `${inputId}: trace should indicate attribution/automation/system abnormal uncertainty`
    )
    assert.ok(
      p.linkedUncertainties.length > 0 || p.linkedEvidence.length > 0,
      `${inputId}: perception must include trace links after completeness fix`
    )
    assert.ok(
      ['NOT_ELIGIBLE', 'BLOCKED_BY_GUARDRAIL'].includes(p.classificationEligibility.eligibilityStatus),
      `${inputId}: perception must remain conservative (NOT_ELIGIBLE or BLOCKED_BY_GUARDRAIL)`
    )
  }

  if (inputId === 'TRIAL-SET1-005') {
    const joinedBlocking = [...p.blockingForClassification, ...a.blockingForClassification].join(' ').toLowerCase()
    assert.ok(
      joinedBlocking.includes('state') || joinedBlocking.includes('control') || joinedBlocking.includes('evidence'),
      `${inputId}: trace should differentiate automation/mode-awareness from direct action certainty`
    )
  }
}

async function main() {
  const summaries: TrialSummary[] = []
  const failures: string[] = []

  for (const trial of trialSet) {
    const result = await analyzeSeraVNext({
      inputId: trial.inputId,
      sourceType: 'neutral_trial',
      narrative: trial.narrative,
      locale: 'en',
      options: {
        allowLlm: false,
        requireHumanReview: true,
        includeDebugTrace: true,
      },
    })

    let assertionsPassed = true
    let assertionError: string | undefined
    try {
      assertCommon(result, trial.inputId)
      assertTrialSpecific(result, trial.inputId)
    } catch (error) {
      assertionsPassed = false
      assertionError = error instanceof Error ? error.message : String(error)
      failures.push(`${trial.inputId}: ${assertionError}`)
    }

    summaries.push({
      inputId: trial.inputId,
      assuranceStatus: result.causalAssurance.status,
      perceptionStatus: result.poaClassification.perception.status,
      perceptionReviewReasonCode: result.poaClassification.perception.reviewReasonCode,
      perceptionEligibility: result.poaClassification.perception.classificationEligibility.eligibilityStatus,
      objectiveStatus: result.poaClassification.objective.status,
      objectiveReviewReasonCode: result.poaClassification.objective.reviewReasonCode,
      objectiveEligibility: result.poaClassification.objective.classificationEligibility.eligibilityStatus,
      actionStatus: result.poaClassification.action.status,
      actionReviewReasonCode: result.poaClassification.action.reviewReasonCode,
      actionEligibility: result.poaClassification.action.classificationEligibility.eligibilityStatus,
      unmetCriteriaCount:
        result.poaClassification.perception.classificationEligibility.unmetCriteria.length +
        result.poaClassification.objective.classificationEligibility.unmetCriteria.length +
        result.poaClassification.action.classificationEligibility.unmetCriteria.length,
      absoluteBlockersCount:
        result.poaClassification.perception.classificationEligibility.absoluteBlockers.length +
        result.poaClassification.objective.classificationEligibility.absoluteBlockers.length +
        result.poaClassification.action.classificationEligibility.absoluteBlockers.length,
      dominance: result.unsafeActCondition.dominance,
      humanReviewRequired: result.humanReview.required,
      assertionsPassed,
      assertionError,
    })
  }

  const trial004 = summaries.find((item) => item.inputId === 'TRIAL-SET1-004')
  console.log(JSON.stringify({ trial_set: 'TRIAL-SET1', trial004_trace_summary: trial004, summaries, failures }, null, 2))
  if (failures.length > 0) {
    throw new Error(`Review-trace stability assertions failed for ${failures.length} trial(s).`)
  }
  console.log('SERA vNext Trial Set 1 review-trace stability PASS')
}

main().catch((error) => {
  console.error('SERA vNext Trial Set 1 review-trace stability FAIL')
  console.error(error)
  process.exit(1)
})
