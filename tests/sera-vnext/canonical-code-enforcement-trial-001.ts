import assert from 'node:assert/strict'
import {
  assertCanonicalSeraLeafCode,
  SERA_CANONICAL_OBJECTIVE_LEAF_CODES,
} from '../../frontend/src/lib/sera-vnext/canonical-codes'
import {
  HUMAN_DECISION_OBJECTIVE_INTENT_CODES,
  validateHumanAxisDecision,
} from '../../frontend/src/lib/sera-vnext/human-decision'
import type {
  HumanAxisDecisionInput,
  HumanReviewAxisDecisionContract,
} from '../../frontend/src/lib/sera-vnext/types'

function makeObjectiveContract(): HumanReviewAxisDecisionContract {
  return {
    axis: 'objective',
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
    traceLinks: ['trace:objective:review'],
    outputLock: {
      autoClassificationForbidden: true,
      prohibitedOutputs: ['CLASSIFIED', 'HFACS', 'Risk/ERC', 'ARMS/ERC'],
      prohibitedStatuses: ['CLASSIFIED'],
    },
  }
}

function makeObjectiveInput(proposedCode: string): HumanAxisDecisionInput {
  return {
    axis: 'objective',
    decisionIntent: 'PROPOSE_CODE',
    proposedCode,
    evidenceReferences: ['objective evidence reference'],
    reviewerRationale: 'Objective rationale documented in causal core scope.',
    acceptedUncertainties: [],
    rejectedUncertainties: [],
    waiverDecision: {
      requested: false,
      approved: false,
      rationale: null,
      acceptedResidualUncertainty: [],
      prohibitedIfAbsoluteBlocker: true,
    },
    guardrailAcknowledgements: ['intent and rule-awareness boundary checked'],
    limitations: [],
    confidenceByReviewer: 'medium',
  }
}

function assertThrowsWithMessage(run: () => void, expectedText: string) {
  let threw = false
  try {
    run()
  } catch (error) {
    threw = true
    const message = error instanceof Error ? error.message : String(error)
    assert.ok(message.includes(expectedText), `Expected error message to include "${expectedText}", got "${message}"`)
  }
  assert.equal(threw, true, 'Expected function to throw.')
}

function main() {
  const contract = makeObjectiveContract()

  // 1) Canonical helper blocks O-E as non-existent.
  assertThrowsWithMessage(
    () => assertCanonicalSeraLeafCode('O', 'O-E'),
    'NON_EXISTENT_IN_SERA_PT_V1'
  )

  // 2) Human decision validation blocks O-E in active proposal path.
  const oeResult = validateHumanAxisDecision(contract, makeObjectiveInput('O-E'))
  assert.equal(oeResult.valid, false, 'O-E must be invalid in human objective proposal path.')
  assert.equal(oeResult.acceptedForNextGate, false, 'O-E must not be accepted for next gate.')
  assert.ok(
    oeResult.blockingIssues.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'O-E rejection must explicitly reference NON_EXISTENT_IN_SERA_PT_V1.'
  )

  // 3) Human decision validation blocks unknown objective code.
  const ozResult = validateHumanAxisDecision(contract, makeObjectiveInput('O-Z'))
  assert.equal(ozResult.valid, false, 'Unknown objective code must be invalid.')
  assert.equal(ozResult.acceptedForNextGate, false, 'Unknown objective code must not be accepted for next gate.')
  assert.ok(
    ozResult.blockingIssues.some((item) => item.toLowerCase().includes('allowlist violation')),
    'Unknown code rejection must reference allowlist violation.'
  )

  // 4) Canonical objective code remains valid in decision path.
  const oaResult = validateHumanAxisDecision(contract, makeObjectiveInput('O-A'))
  assert.equal(oaResult.valid, true, 'Canonical objective code O-A should remain valid.')
  assert.equal(oaResult.acceptedForNextGate, true, 'Canonical objective code O-A should be accepted for next gate.')

  // 5) Active objective intent list excludes O-E.
  assert.equal(
    (HUMAN_DECISION_OBJECTIVE_INTENT_CODES as readonly string[]).includes('O-E'),
    false,
    'Active objective intent list must not include O-E.'
  )
  assert.deepEqual(HUMAN_DECISION_OBJECTIVE_INTENT_CODES, ['O-C', 'O-D'], 'Active objective intent list must remain canonical.')

  // 6) O-E remains outside canonical objective allowlist.
  assert.equal(
    (SERA_CANONICAL_OBJECTIVE_LEAF_CODES as readonly string[]).includes('O-E'),
    false,
    'O-E must not appear in canonical objective allowlist.'
  )

  console.log('PASS canonical-code-enforcement-trial-001')
}

main()
