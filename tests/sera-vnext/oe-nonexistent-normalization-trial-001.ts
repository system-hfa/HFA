import assert from 'node:assert/strict'
import {
  SERA_CANONICAL_FORBIDDEN_CODES,
  SERA_CANONICAL_NON_EXISTENT_CODES,
  isCanonicalSeraLeafCode,
} from '../../frontend/src/lib/sera-vnext/canonical-codes'
import { validateHumanAxisDecision } from '../../frontend/src/lib/sera-vnext/human-decision'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { derivePreconditionsFromReleasedCodes } from '../../frontend/src/lib/sera-vnext/preconditions'
import { auditPassiveEvidenceCategoryCoverage } from '../../frontend/src/lib/sera-vnext/evidence-category-coverage'
import type {
  CodeReleaseGateResult,
  HumanReviewAxisDecisionContract,
  SemanticConsistencyGateResult,
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

function makeGateWithOe(): CodeReleaseGateResult {
  return {
    inputId: 'OE-NONEXISTENT-TRIAL',
    gateStatus: 'RELEASE_READY_FOR_CAUSAL_CORE',
    axisReleases: [
      {
        axis: 'objective',
        releasedCode: 'O-E',
        source: 'HUMAN_REVIEW',
        reviewerRationale: 'O-E negative-control injection for non-existent-code normalization.',
        evidenceReferences: ['Attempt to force O-E as objective code.'],
        acceptedUncertainties: [],
        waiverApplied: false,
        guardrailAcknowledgements: ['intent and rule-awareness boundary checked'],
        releaseStatus: 'RELEASED_BY_HUMAN_REVIEW',
        releaseBlockingIssues: [],
        auditTrace: ['trace:oe:nonexistent'],
      },
    ],
    globalBlockingIssues: [],
    outputLocks: ['CLASSIFIED', 'finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC'],
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
  }
}

function makeSemanticGateWithOe(): SemanticConsistencyGateResult {
  return {
    inputId: 'OE-NONEXISTENT-TRIAL',
    gateStatus: 'SEMANTIC_GATE_READY',
    axisResults: [
      {
        axis: 'objective',
        releasedCode: 'O-E',
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
          details: 'N/A',
        },
        semanticRuleVersion: 'v0.2.0',
      },
    ],
    globalBlockingIssues: [],
    outputLocks: ['CLASSIFIED', 'finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC'],
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
  }
}

function includesReservedText(values: string[]): boolean {
  const text = values.join(' ').toUpperCase()
  return text.includes('RESERVED_NOT_ACTIVE') || text.includes('RESERVED/NOT_ACTIVE')
}

function main() {
  // 1) O-E is not canonical leaf code.
  assert.equal(isCanonicalSeraLeafCode('O', 'O-E'), false, 'O-E must not be canonical leaf code.')

  // 2) O-E is explicitly non-existent and forbidden.
  assert.ok(SERA_CANONICAL_NON_EXISTENT_CODES.includes('O-E'), 'O-E must be in non-existent list.')
  assert.ok(SERA_CANONICAL_FORBIDDEN_CODES.includes('O-E'), 'O-E must be in forbidden list.')

  // 3) Human decision rejects O-E.
  const contract = makeObjectiveContract()
  const humanResult = validateHumanAxisDecision(contract, {
    axis: 'objective',
    decisionIntent: 'PROPOSE_CODE',
    proposedCode: 'O-E',
    evidenceReferences: ['Evidence anchor for O-E rejection'],
    reviewerRationale: 'Negative-control objective code test.',
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
  })
  assert.equal(humanResult.valid, false, 'Human decision must reject O-E.')
  assert.ok(
    humanResult.blockingIssues.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'Human decision rejection must reference NON_EXISTENT_IN_SERA_PT_V1.'
  )

  // 4) Traceability / preconditions / evidence coverage never treat O-E as active code.
  const gate = makeGateWithOe()
  const traceability = buildReleasedCodeTraceability({ codeReleaseGateResult: gate })
  const trace = traceability.traces[0]
  assert.equal(trace?.status, 'NON_EXISTENT_CODE', 'Traceability status for O-E must be NON_EXISTENT_CODE.')
  assert.ok(
    trace?.warnings.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'Traceability warning must reference NON_EXISTENT_IN_SERA_PT_V1.'
  )

  const preconditions = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: gate,
    semanticConsistencyGateResult: makeSemanticGateWithOe(),
    traceabilityResult: traceability,
  })
  const precondition = preconditions.candidates[0]
  assert.equal(precondition?.status, 'BLOCKED', 'Preconditions derivation must block O-E.')
  assert.ok(
    precondition?.blockingIssues.some((item) => item.includes('NON_EXISTENT_IN_SERA_PT_V1')),
    'Preconditions blocking issue must reference NON_EXISTENT_IN_SERA_PT_V1.'
  )

  const coverage = auditPassiveEvidenceCategoryCoverage({ traceability })
  assert.equal(coverage.findings.length, 0, 'Evidence coverage must not treat O-E as active code candidate.')

  // 5) Runtime-relevant messages for this flow must not use RESERVED_NOT_ACTIVE wording.
  assert.equal(includesReservedText(trace?.warnings || []), false, 'Traceability warnings must not use RESERVED_NOT_ACTIVE wording.')
  assert.equal(includesReservedText(precondition?.blockingIssues || []), false, 'Preconditions blocking messages must not use RESERVED_NOT_ACTIVE wording.')

  console.log('PASS oe-nonexistent-normalization-trial-001')
}

main()
