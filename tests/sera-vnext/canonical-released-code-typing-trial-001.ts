import assert from 'node:assert/strict'
import { analyzeSeraVNext } from '../../frontend/src/lib/sera-vnext'
import { buildCodeReleaseGateResult } from '../../frontend/src/lib/sera-vnext/code-release'
import { validateHumanAxisDecision } from '../../frontend/src/lib/sera-vnext/human-decision'
import type {
  HumanAxisDecisionInput,
  HumanDecisionInputSet,
  HumanReviewAxisDecisionContract,
  HumanValidatedAxisClassification,
  PoaAxis,
} from '../../frontend/src/lib/sera-vnext/types'

type ExpectNever<T extends never> = T

// Compile-time guard: O-E cannot exist in active releasedCode typing.
type _releasedCodeMustRejectOe = ExpectNever<
  Extract<NonNullable<HumanValidatedAxisClassification['releasedCode']>, 'O-E'>
>

function makeContract(axis: PoaAxis): HumanReviewAxisDecisionContract {
  return {
    axis,
    decisionStatus: 'READY_FOR_HUMAN_DECISION',
    eligibleForDecision: true,
    requiredInputs: ['proposedCode', 'evidenceReferences', 'reviewerRationale'],
    requiredEvidenceReferences: ['evidenceReferences'],
    waiverDecisionRequired: false,
    waiverDecisionAllowed: true,
    waiverDecisionProhibitedReason: null,
    allowedReviewerActions: ['PROPOSE_CODE'],
    prohibitedReviewerActions: ['emit hfacs labels'],
    decisionChecklist: ['keep_causal_core_only'],
    residualUncertainty: [],
    traceLinks: [`trace:${axis}:review`],
    outputLock: {
      autoClassificationForbidden: true,
      prohibitedOutputs: ['CLASSIFIED', 'HFACS', 'Risk/ERC', 'ARMS/ERC'],
      prohibitedStatuses: ['CLASSIFIED'],
    },
  }
}

function makeInput(axis: PoaAxis, proposedCode: string): HumanAxisDecisionInput {
  const acknowledgementsByAxis: Record<PoaAxis, string> = {
    perception: 'cue uptake recognition timing verified',
    objective: 'intent and rule awareness boundary checked',
    action: 'physical motor ergonomic evidence boundary checked',
  }

  return {
    axis,
    decisionIntent: 'PROPOSE_CODE',
    proposedCode,
    evidenceReferences: [`${axis} evidence anchor`],
    reviewerRationale: `${axis} rationale in causal-core scope only.`,
    acceptedUncertainties: [],
    rejectedUncertainties: [],
    waiverDecision: {
      requested: false,
      approved: false,
      rationale: null,
      acceptedResidualUncertainty: [],
      prohibitedIfAbsoluteBlocker: true,
    },
    guardrailAcknowledgements: [acknowledgementsByAxis[axis]],
    limitations: [],
    confidenceByReviewer: 'medium',
  }
}

async function buildBaseResult() {
  return analyzeSeraVNext({
    inputId: 'A4R190-G-TYPING-BASE',
    sourceType: 'neutral_trial',
    narrative: `A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.`,
    locale: 'en',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: false,
    },
  })
}

function assertNoFinalOrDownstreamFields(record: Record<string, unknown>) {
  assert.equal('selectedCode' in record, false, 'selectedCode must not be emitted.')
  assert.notEqual(record.status, 'CLASSIFIED', 'status must never be CLASSIFIED.')
  assert.equal('finalConclusion' in record, false, 'finalConclusion must remain locked.')
  assert.equal('hfacs' in record, false, 'hfacs output must remain absent.')
  assert.equal('riskProfile' in record, false, 'risk output must remain absent.')
  assert.equal('recommendations' in record, false, 'recommendations output must remain absent.')
}

function mainHumanDecisionChecks() {
  // 1) O-E and O-Z rejected.
  const objectiveContract = makeContract('objective')
  const oe = validateHumanAxisDecision(objectiveContract, makeInput('objective', 'O-E'))
  assert.equal(oe.valid, false, 'O-E must be rejected in objective human decision path.')
  assert.ok(
    oe.blockingIssues.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'O-E rejection must reference NON_EXISTENT_IN_SERA_PT_V1.'
  )

  const oz = validateHumanAxisDecision(objectiveContract, makeInput('objective', 'O-Z'))
  assert.equal(oz.valid, false, 'O-Z must be rejected in objective human decision path.')
  assert.ok(
    oz.blockingIssues.some((item) => item.toLowerCase().includes('allowlist violation')),
    'O-Z rejection should reference canonical allowlist violation.'
  )

  // 2) Wrong-axis codes rejected.
  const objectiveWithPerception = validateHumanAxisDecision(objectiveContract, makeInput('objective', 'P-A'))
  assert.equal(objectiveWithPerception.valid, false, 'Objective axis cannot accept P-A.')

  const perceptionWithObjective = validateHumanAxisDecision(makeContract('perception'), makeInput('perception', 'O-A'))
  assert.equal(perceptionWithObjective.valid, false, 'Perception axis cannot accept O-A.')

  const actionWithPerception = validateHumanAxisDecision(makeContract('action'), makeInput('action', 'P-G'))
  assert.equal(actionWithPerception.valid, false, 'Action axis cannot accept P-G.')

  // 3) Valid canonical codes accepted in their own axis.
  assert.equal(validateHumanAxisDecision(makeContract('perception'), makeInput('perception', 'P-A')).valid, true)
  assert.equal(validateHumanAxisDecision(makeContract('perception'), makeInput('perception', 'P-G')).valid, true)
  assert.equal(validateHumanAxisDecision(objectiveContract, makeInput('objective', 'O-A')).valid, true)
  assert.equal(validateHumanAxisDecision(objectiveContract, makeInput('objective', 'O-D')).valid, true)
  assert.equal(validateHumanAxisDecision(makeContract('action'), makeInput('action', 'A-A')).valid, true)
  assert.equal(validateHumanAxisDecision(makeContract('action'), makeInput('action', 'A-J')).valid, true)
}

async function mainReleaseGateChecks() {
  const baseResult = await buildBaseResult()

  const invalidInputSet: HumanDecisionInputSet = {
    inputId: 'A4R190-G-INVALID-RELEASE',
    axisDecisions: [
      makeInput('objective', 'O-E'),
      makeInput('perception', 'P-A'),
      makeInput('action', 'A-A'),
    ],
  }

  const invalidRelease = buildCodeReleaseGateResult({ result: baseResult, inputSet: invalidInputSet }).codeReleaseGateResult
  const objectiveInvalid = invalidRelease.axisReleases.find((axis) => axis.axis === 'objective')
  assert.equal(objectiveInvalid?.releaseStatus, 'RELEASE_BLOCKED', 'Release path must block O-E objective candidate.')
  assert.ok(
    objectiveInvalid?.releaseBlockingIssues.some((issue) => issue.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'Release blocking should propagate NON_EXISTENT_IN_SERA_PT_V1 for O-E.'
  )

  const validInputSet: HumanDecisionInputSet = {
    inputId: 'A4R190-G-VALID-RELEASE',
    axisDecisions: [
      makeInput('perception', 'P-B'),
      makeInput('objective', 'O-B'),
      {
        ...makeInput('action', 'A-C'),
        acceptedUncertainties: ['exact control-input sequence unresolved'],
        waiverDecision: {
          requested: true,
          approved: true,
          rationale: 'Residual uncertainty accepted for controlled release gate test.',
          acceptedResidualUncertainty: ['exact control-input sequence unresolved'],
          prohibitedIfAbsoluteBlocker: true,
        },
      },
    ],
  }

  const validRelease = buildCodeReleaseGateResult({ result: baseResult, inputSet: validInputSet }).codeReleaseGateResult
  assert.notEqual(
    validRelease.gateStatus,
    'RELEASE_BLOCKED',
    'Canonical axis proposals should not be globally blocked by canonical-code validation.'
  )
  assert.ok(
    validRelease.axisReleases.some((axis) => axis.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW'),
    'At least one axis should be released with valid canonical proposal inputs.'
  )
  for (const axisRelease of validRelease.axisReleases) {
    if (axisRelease.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW') {
      assert.ok(axisRelease.releasedCode)
      assert.equal(axisRelease.source, 'HUMAN_REVIEW')
    }
    assert.equal(
      axisRelease.releaseBlockingIssues.some((issue) =>
        issue.includes('NON_EXISTENT_IN_SERA_PT_V1') || issue.toLowerCase().includes('allowlist violation')
      ),
      false,
      `Valid canonical proposal for ${axisRelease.axis} must not fail by canonical-code violation.`
    )
    assertNoFinalOrDownstreamFields(axisRelease as unknown as Record<string, unknown>)
  }

  // 4) No selectedCode/classified/downstream payloads in release package.
  assert.equal('selectedCode' in (validRelease as unknown as Record<string, unknown>), false)
  assert.equal('CLASSIFIED' in (validRelease as unknown as Record<string, unknown>), false)
  assert.equal(validRelease.downstreamStillLocked, true)
  assert.equal(validRelease.finalConclusionStillLocked, true)
  assertNoFinalOrDownstreamFields(validRelease as unknown as Record<string, unknown>)
}

async function main() {
  mainHumanDecisionChecks()
  await mainReleaseGateChecks()
  console.log('PASS canonical-released-code-typing-trial-001')
}

main()
