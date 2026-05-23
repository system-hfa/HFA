import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'

const narrative = `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`

const forbiddenStatementPatterns = [
  /\bP-A\b/i,
  /\bO-A\b/i,
  /\bA-A\b/i,
  /\bA-D\b/i,
  /\bP-G\b/i,
  /falha de/i,
  /failure code/i,
  /routine violation/i,
]

async function main() {
  const result = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })

  console.log(JSON.stringify(result, null, 2))

  assert.ok(result.engineVersion, 'engineVersion missing')
  assert.ok(result.unsafeState?.operationalUnsafeState, 'unsafeState.operationalUnsafeState missing')
  assert.ok(Array.isArray(result.unsafeState?.decisionAntecedents), 'unsafeState.decisionAntecedents missing')
  assert.ok(result.unsafeActCondition, 'unsafeActCondition missing')

  assert.ok(result.directActor, 'directActor missing')
  assert.notEqual(result.directActor.actor, 'pilot flying', 'directActor must not assume PF')
  assert.notEqual(result.directActor.actor, 'pilot monitoring', 'directActor must not assume PM')

  assert.ok(result.poaStatements.perceptionStatement, 'perceptionStatement missing')
  assert.ok(result.poaStatements.objectiveStatement, 'objectiveStatement missing')
  assert.ok(result.poaStatements.actionStatement, 'actionStatement missing')

  const joinedStatements = [
    result.poaStatements.perceptionStatement,
    result.poaStatements.objectiveStatement,
    result.poaStatements.actionStatement,
  ]
    .filter(Boolean)
    .join(' ')

  for (const pattern of forbiddenStatementPatterns) {
    assert.ok(!pattern.test(joinedStatements), `forbidden statement pattern matched: ${String(pattern)}`)
  }

  const allowedStatuses = ['REVIEW_REQUIRED', 'INSUFFICIENT_EVIDENCE', 'READY_FOR_HUMAN_CLASSIFICATION']
  assert.ok(
    allowedStatuses.includes(result.poaClassification.perception.status),
    'perception status must be REVIEW_REQUIRED, INSUFFICIENT_EVIDENCE or READY_FOR_HUMAN_CLASSIFICATION'
  )
  assert.ok(
    allowedStatuses.includes(result.poaClassification.objective.status),
    'objective status must be REVIEW_REQUIRED, INSUFFICIENT_EVIDENCE or READY_FOR_HUMAN_CLASSIFICATION'
  )
  assert.ok(
    allowedStatuses.includes(result.poaClassification.action.status),
    'action status must be REVIEW_REQUIRED, INSUFFICIENT_EVIDENCE or READY_FOR_HUMAN_CLASSIFICATION'
  )

  for (const axis of [result.poaClassification.perception, result.poaClassification.objective, result.poaClassification.action]) {
    assert.ok(axis.classificationEligibility, `${axis.axis} must include classificationEligibility`)
    assert.ok(axis.classificationEligibility.eligibilityStatus, `${axis.axis} must include eligibilityStatus`)
    assert.equal(
      axis.classificationEligibility.eligibleForHumanClassification,
      axis.status === 'READY_FOR_HUMAN_CLASSIFICATION',
      `${axis.axis} readiness status must match eligibility flag`
    )
    if (axis.classificationEligibility.eligibilityStatus === 'BLOCKED_BY_GUARDRAIL') {
      assert.ok(
        axis.classificationEligibility.absoluteBlockers.length > 0,
        `${axis.axis} blocked status must include absolute blockers`
      )
      assert.equal(axis.classificationEligibility.waiverAllowed, false, `${axis.axis} blocked status must prohibit waiver`)
      assert.equal(axis.classificationEligibility.waiverRequired, false, `${axis.axis} blocked status must not require waiver`)
    }
    if (axis.classificationEligibility.eligibilityStatus === 'NOT_ELIGIBLE') {
      assert.equal(
        axis.classificationEligibility.absoluteBlockers.length,
        0,
        `${axis.axis} NOT_ELIGIBLE should not depend on absolute blockers`
      )
    }
    assert.ok(axis.reviewTrace, `${axis.axis} must include reviewTrace`)
    assert.ok(axis.reviewReasonCode, `${axis.axis} must include reviewReasonCode`)
    assert.ok(
      axis.linkedUncertainties.length > 0 || axis.linkedEvidence.length > 0,
      `${axis.axis} must link uncertainties or evidence`
    )
    assert.ok(
      axis.reviewTrace.linkedUncertainties.length > 0 || axis.reviewTrace.linkedEvidence.length > 0,
      `${axis.axis} reviewTrace must link uncertainties or evidence`
    )
    assert.ok(axis.transitionCriteria.length > 0, `${axis.axis} must include transitionCriteria`)
    if (axis.status === 'REVIEW_REQUIRED') {
      assert.ok(axis.blockingForClassification.length > 0, `${axis.axis} REVIEW_REQUIRED must include blockingForClassification`)
    }
    if (axis.status === 'READY_FOR_HUMAN_CLASSIFICATION') {
      assert.equal(axis.blockingForClassification.length, 0, `${axis.axis} READY status must not keep blocking items`)
    }
    assert.notEqual(axis.status, 'CLASSIFIED', `${axis.axis} must not be CLASSIFIED in eligibility phase`)
  }

  assert.notEqual(result.poaClassification.action.selectedCode, 'A-D', 'action must not classify as A-D')
  assert.ok(
    !['O-C', 'O-D', 'O-E'].includes(result.poaClassification.objective.selectedCode),
    'objective must not classify as O-C/O-D/O-E without explicit intent evidence'
  )
  assert.ok(
    !['P-G', 'P-F', 'P-D'].includes(result.poaClassification.perception.selectedCode),
    'perception must not classify as failure based only on environment/barrier degradation'
  )

  const resultAny = result as unknown as Record<string, unknown>
  for (const forbidden of ['hfacs', 'erc_level', 'risk', 'arms']) {
    assert.ok(!(forbidden in resultAny), `forbidden key present in output: ${forbidden}`)
  }

  assert.ok(!('finalConclusion' in resultAny), 'output must not include final free conclusion')
  assert.equal(result.humanReview.required, true, 'humanReview.required must be true')
  assert.notEqual(result.causalAssurance.status, 'PASSED', 'causalAssurance must not be PASSED')

  console.log('SERA vNext Trial 001 dry-run PASS')
}

main().catch((error) => {
  console.error('SERA vNext Trial 001 dry-run FAIL')
  console.error(error)
  process.exit(1)
})
