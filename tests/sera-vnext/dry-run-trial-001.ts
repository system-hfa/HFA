import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import type { HumanDecisionInputSet } from '../../frontend/src/lib/sera-vnext/types'

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
      assert.equal(
        axis.classificationEligibility.absoluteBlockers.length,
        0,
        `${axis.axis} READY status must not have absolute blockers`
      )
      assert.equal(
        axis.classificationEligibility.eligibilityStatus,
        'ELIGIBLE_FOR_HUMAN_REVIEW',
        `${axis.axis} READY status must map to ELIGIBLE_FOR_HUMAN_REVIEW`
      )
    }
    assert.notEqual(axis.status, 'CLASSIFIED', `${axis.axis} must not be CLASSIFIED in eligibility phase`)
  }

  assert.ok(result.humanReviewDecisionGate, 'humanReviewDecisionGate must be present')
  assert.equal(result.humanReviewDecisionGate.required, true, 'humanReviewDecisionGate.required must be true')
  assert.equal(result.humanReviewDecisionGate.status, 'HUMAN_DECISION_GATE_READY', 'Trial 001 gate should be fully ready')
  assert.equal(result.humanReview.status, 'HUMAN_DECISION_REQUIRED', 'humanReview status must require human decision')

  const gateByAxis = new Map(result.humanReviewDecisionGate.axisContracts.map((contract) => [contract.axis, contract]))
  for (const axis of [result.poaClassification.perception, result.poaClassification.objective, result.poaClassification.action]) {
    const contract = gateByAxis.get(axis.axis)
    assert.ok(contract, `${axis.axis}: missing human review axis contract`)
    assert.equal(
      contract?.decisionStatus,
      'READY_FOR_HUMAN_DECISION',
      `${axis.axis}: Trial 001 must be READY_FOR_HUMAN_DECISION`
    )
    assert.equal(contract?.outputLock.autoClassificationForbidden, true, `${axis.axis}: auto-classification must be forbidden`)
    assert.ok(
      contract?.outputLock.prohibitedStatuses.includes('CLASSIFIED'),
      `${axis.axis}: CLASSIFIED must be explicitly prohibited`
    )
    for (const lockedOutput of ['finalConclusion', 'HFACS', 'Risk/ERC']) {
      assert.ok(
        contract?.outputLock.prohibitedOutputs.includes(lockedOutput),
        `${axis.axis}: outputLock must prohibit ${lockedOutput}`
      )
    }
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
  assert.ok(
    result.humanReviewDecisionGate.globalProhibitedOutputs.includes('finalConclusion') &&
      result.humanReviewDecisionGate.globalProhibitedOutputs.includes('HFACS') &&
      result.humanReviewDecisionGate.globalProhibitedOutputs.includes('Risk/ERC'),
    'global gate outputs must prohibit finalConclusion/HFACS/Risk/ERC'
  )
  assert.notEqual(result.causalAssurance.status, 'PASSED', 'causalAssurance must not be PASSED')

  const validDecisionInput: HumanDecisionInputSet = {
    inputId: 'HR-TRIAL-001-VALID',
    reviewerId: 'reviewer-alpha',
    reviewTimestamp: '2026-05-23T12:00:00Z',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: ['Instrument cues were available in the narrative context.'],
        reviewerRationale: 'Perception proposal references explicit cue processing evidence.',
        acceptedUncertainties: ['Exact recognition timing remains partially uncertain.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['cue uptake and recognition timing checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
      {
        axis: 'objective',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'O-B',
        evidenceReferences: ['Approach continuation after visual contact is observable in the sequence.'],
        reviewerRationale: 'Objective proposal remains tied to observed continuation context.',
        acceptedUncertainties: ['Intent framing remains partially uncertain.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['intent evidence reviewed with rule awareness boundary maintained'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
      {
        axis: 'action',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'A-C',
        evidenceReferences: ['A recovery action sequence is observed at very low height.'],
        reviewerRationale: 'Action proposal is tied to observed sequence and explicit residual waiver handling.',
        acceptedUncertainties: ['Exact control-input sequence unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty is explicit and acceptable for next gate review.',
          acceptedResidualUncertainty: ['exact_control_input_sequence_unresolved_but_waivable'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['physical motor ergonomic evidence boundary checked'],
        limitations: [],
        confidenceByReviewer: 'medium',
      },
    ],
  }

  const resultWithValidHumanInput = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    humanDecisionInput: validDecisionInput,
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })

  assert.equal(resultWithValidHumanInput.humanDecisionValidation.inputProvided, true, 'human decision input should be detected')
  assert.ok(resultWithValidHumanInput.humanDecisionValidation.results.length >= 3, 'human decision validation must include axis results')
  for (const axisResult of resultWithValidHumanInput.humanDecisionValidation.results) {
    assert.equal(axisResult.status, 'VALID_FOR_RELEASE_GATE', `${axisResult.axis}: expected VALID_FOR_RELEASE_GATE`)
    assert.equal(axisResult.valid, true, `${axisResult.axis}: valid input should pass`)
    assert.equal(axisResult.acceptedForNextGate, true, `${axisResult.axis}: valid proposal should be accepted for next gate`)
  }
  assert.equal(
    resultWithValidHumanInput.humanReview.status,
    'HUMAN_DECISION_CONTRACT_READY',
    'valid human input should mark contract as ready'
  )
  for (const axis of [resultWithValidHumanInput.poaClassification.perception, resultWithValidHumanInput.poaClassification.objective, resultWithValidHumanInput.poaClassification.action]) {
    assert.notEqual(axis.status, 'CLASSIFIED', `${axis.axis}: CLASSIFIED must remain forbidden`)
    assert.equal(axis.selectedCode, 'UNRESOLVED', `${axis.axis}: selectedCode must remain unresolved in this phase`)
  }

  const missingEvidenceInput: HumanDecisionInputSet = {
    inputId: 'HR-TRIAL-001-MISSING-EVIDENCE',
    axisDecisions: [
      {
        axis: 'perception',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'P-B',
        evidenceReferences: [],
        reviewerRationale: 'Rationale present but no evidence references.',
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
      },
    ],
  }

  const resultMissingEvidence = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    humanDecisionInput: missingEvidenceInput,
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })
  const missingEvidenceValidation = resultMissingEvidence.humanDecisionValidation.results.find((item) => item.axis === 'perception')
  assert.ok(missingEvidenceValidation, 'missing-evidence scenario must produce perception validation')
  assert.equal(missingEvidenceValidation?.valid, false, 'missing evidence must be invalid')
  assert.equal(
    missingEvidenceValidation?.status,
    'INVALID_MISSING_EVIDENCE_REFERENCES',
    'missing evidence should be rejected with INVALID_MISSING_EVIDENCE_REFERENCES'
  )

  const invalidAdInput: HumanDecisionInputSet = {
    inputId: 'HR-TRIAL-001-INVALID-AD',
    axisDecisions: [
      {
        axis: 'action',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'A-D',
        evidenceReferences: ['A recovery action sequence is observed at very low height.'],
        reviewerRationale: 'Attempting inability-style proposal without explicit required acknowledgement.',
        acceptedUncertainties: ['Exact control-input sequence unresolved.'],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted.',
          acceptedResidualUncertainty: ['exact_control_input_sequence_unresolved_but_waivable'],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['action evidence reviewed'],
        limitations: [],
        confidenceByReviewer: 'low',
      },
    ],
  }

  const resultInvalidAd = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    humanDecisionInput: invalidAdInput,
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })
  const adValidation = resultInvalidAd.humanDecisionValidation.results.find((item) => item.axis === 'action')
  assert.ok(adValidation, 'A-D scenario must produce action validation')
  assert.equal(adValidation?.valid, false, 'A-D without physical/motor/ergonomic acknowledgement must be invalid')
  assert.equal(adValidation?.status, 'INVALID_GUARDRAIL_CONFLICT', 'A-D scenario must fail guardrail validation')

  const downstreamAttemptInput: HumanDecisionInputSet = {
    inputId: 'HR-TRIAL-001-DOWNSTREAM',
    axisDecisions: [
      {
        axis: 'objective',
        decisionIntent: 'PROPOSE_CODE',
        proposedCode: 'O-B',
        evidenceReferences: ['Continuation context followed unsuccessful instrument approaches in degraded conditions.'],
        reviewerRationale: 'Attempt includes downstream unlock request.',
        acceptedUncertainties: [],
        rejectedUncertainties: [],
        waiverDecision: {
          requested: false,
          approved: false,
          rationale: null,
          acceptedResidualUncertainty: [],
          prohibitedIfAbsoluteBlocker: true,
        },
        guardrailAcknowledgements: ['intent and rule awareness boundary reviewed'],
        limitations: [],
        confidenceByReviewer: 'low',
        requestedDownstreamOutputs: ['finalConclusion'],
      },
    ],
  }

  const resultDownstream = await analyzeSeraVNext({
    inputId: 'TRIAL-SET1-001',
    sourceType: 'neutral_trial',
    narrative,
    locale: 'en',
    humanDecisionInput: downstreamAttemptInput,
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: true,
    },
  })
  const downstreamValidation = resultDownstream.humanDecisionValidation.results.find((item) => item.axis === 'objective')
  assert.ok(downstreamValidation, 'downstream scenario must produce objective validation')
  assert.equal(downstreamValidation?.valid, false, 'downstream unlock attempt must be invalid')
  assert.equal(downstreamValidation?.status, 'INVALID_GUARDRAIL_CONFLICT', 'downstream unlock should fail guardrail validation')
  for (const axis of [resultDownstream.poaClassification.perception, resultDownstream.poaClassification.objective, resultDownstream.poaClassification.action]) {
    assert.notEqual(axis.status, 'CLASSIFIED', `${axis.axis}: downstream attempt must not release CLASSIFIED`)
    assert.equal(axis.selectedCode, 'UNRESOLVED', `${axis.axis}: downstream attempt must not alter selectedCode`)
  }

  console.log('SERA vNext Trial 001 dry-run PASS')
}

main().catch((error) => {
  console.error('SERA vNext Trial 001 dry-run FAIL')
  console.error(error)
  process.exit(1)
})
