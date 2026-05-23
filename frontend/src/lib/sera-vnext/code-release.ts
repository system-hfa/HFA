import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from './constants'
import { validateHumanDecisionInput } from './human-decision'
import type {
  CodeReleaseGateResult,
  HumanAxisDecisionInput,
  HumanDecisionInputSet,
  HumanDecisionInputValidation,
  HumanValidatedAxisClassification,
  PoaAxis,
  SeraVNextResult,
} from './types'

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function unique(items: string[]): string[] {
  return [...new Set(items)]
}

function hasRequiredProposalFields(input: HumanAxisDecisionInput): boolean {
  return (
    Boolean(input.proposedCode && input.proposedCode.trim().length > 0) &&
    input.evidenceReferences.length > 0 &&
    input.reviewerRationale.trim().length > 0 &&
    input.guardrailAcknowledgements.length > 0
  )
}

function hasForbiddenDownstreamRequest(input: HumanAxisDecisionInput): boolean {
  const requested = (input.requestedDownstreamOutputs || []).map(normalize)
  const requestedForbidden = SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS.map((item) => normalize(item))

  if (requested.some((item) => requestedForbidden.includes(item))) {
    return true
  }

  const text = [
    input.reviewerRationale,
    input.proposedCode || '',
    ...input.guardrailAcknowledgements,
    ...input.limitations,
  ]
    .join(' ')
    .toLowerCase()

  return ['final conclusion', 'finalconclusion', 'hfacs', 'risk/erc', 'arms/erc', 'classified'].some((token) =>
    text.includes(token)
  )
}

function axisInputByAxis(inputSet: HumanDecisionInputSet, axis: PoaAxis): HumanAxisDecisionInput | null {
  return inputSet.axisDecisions.find((item) => item.axis === axis) || null
}

function duplicateAxisDecisions(inputSet: HumanDecisionInputSet): PoaAxis[] {
  const seen = new Map<PoaAxis, number>()
  for (const decision of inputSet.axisDecisions) {
    seen.set(decision.axis, (seen.get(decision.axis) || 0) + 1)
  }
  return Array.from(seen.entries())
    .filter(([, count]) => count > 1)
    .map(([axis]) => axis)
}

export function buildCodeReleaseGateResult(input: {
  result: SeraVNextResult
  inputSet: HumanDecisionInputSet
}): {
  validatedHumanInputs: HumanDecisionInputValidation
  codeReleaseGateResult: CodeReleaseGateResult
} {
  const validatedHumanInputs = validateHumanDecisionInput(input.result.humanReviewDecisionGate, input.inputSet)

  const structuralIssues: string[] = []
  const duplicates = duplicateAxisDecisions(input.inputSet)
  if (duplicates.length > 0) {
    structuralIssues.push(`Duplicate axis decisions found: ${duplicates.join(', ')}`)
  }

  const downstreamAttemptDetected = input.inputSet.axisDecisions.some((decision) => hasForbiddenDownstreamRequest(decision))
  const globalBlockingIssues = [...structuralIssues]
  if (downstreamAttemptDetected) {
    globalBlockingIssues.push('Downstream output request detected in manual input; release blocked globally.')
  }

  const axisReleases: HumanValidatedAxisClassification[] = input.result.humanReviewDecisionGate.axisContracts.map((contract) => {
    const axisInput = axisInputByAxis(input.inputSet, contract.axis)
    const validation = validatedHumanInputs.results.find((item) => item.axis === contract.axis)
    const releaseBlockingIssues: string[] = []

    if (!axisInput) {
      releaseBlockingIssues.push('Missing manual axis decision input.')
    }

    if (!validation) {
      releaseBlockingIssues.push('Missing validation result for axis input.')
    }

    if (contract.decisionStatus !== 'READY_FOR_HUMAN_DECISION') {
      releaseBlockingIssues.push(`Axis decision contract is ${contract.decisionStatus}.`)
    }

    if (validation && !(validation.valid && validation.status === 'VALID_FOR_RELEASE_GATE' && validation.acceptedForNextGate)) {
      releaseBlockingIssues.push(`Validation status is ${validation.status}.`)
    }

    if (axisInput && !hasRequiredProposalFields(axisInput)) {
      releaseBlockingIssues.push('Missing required proposal fields (code/evidence/rationale/guardrail acknowledgements).')
    }

    if (axisInput && contract.waiverDecisionRequired && !axisInput.waiverDecision.approved) {
      releaseBlockingIssues.push('Required waiver was not approved for this axis.')
    }

    if (axisInput && axisInput.waiverDecision.approved && !contract.waiverDecisionAllowed) {
      releaseBlockingIssues.push('Waiver approval conflicts with contract waiver policy.')
    }

    if (axisInput && hasForbiddenDownstreamRequest(axisInput)) {
      releaseBlockingIssues.push('Forbidden downstream request detected in axis manual decision.')
    }

    if (downstreamAttemptDetected) {
      releaseBlockingIssues.push('Global downstream lock violation blocks all axis releases.')
    }

    if (structuralIssues.length > 0) {
      releaseBlockingIssues.push(...structuralIssues)
    }

    const releaseStatus: HumanValidatedAxisClassification['releaseStatus'] =
      releaseBlockingIssues.length === 0 ? 'RELEASED_BY_HUMAN_REVIEW' : 'RELEASE_BLOCKED'

    return {
      axis: contract.axis,
      releasedCode: releaseStatus === 'RELEASED_BY_HUMAN_REVIEW' ? axisInput?.proposedCode || null : null,
      source: 'HUMAN_REVIEW',
      reviewerRationale: axisInput?.reviewerRationale || '',
      evidenceReferences: axisInput?.evidenceReferences || [],
      acceptedUncertainties: axisInput?.acceptedUncertainties || [],
      waiverApplied: axisInput?.waiverDecision.approved || false,
      guardrailAcknowledgements: axisInput?.guardrailAcknowledgements || [],
      releaseStatus,
      releaseBlockingIssues: unique(releaseBlockingIssues),
      auditTrace: unique([
        `inputSet:${input.inputSet.inputId}`,
        `contractDecisionStatus:${contract.decisionStatus}`,
        `validationStatus:${validation?.status || 'MISSING'}`,
        `validationAcceptedForNextGate:${String(validation?.acceptedForNextGate || false)}`,
        ...contract.traceLinks,
      ]),
    }
  })

  const releasedAxisCount = axisReleases.filter((axis) => axis.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW').length
  const gateStatus: CodeReleaseGateResult['gateStatus'] =
    downstreamAttemptDetected || structuralIssues.length > 0
      ? 'RELEASE_BLOCKED'
      : releasedAxisCount === axisReleases.length
        ? 'RELEASE_READY_FOR_CAUSAL_CORE'
        : releasedAxisCount > 0
          ? 'PARTIAL_RELEASE'
          : 'RELEASE_BLOCKED'

  const codeReleaseGateResult: CodeReleaseGateResult = {
    inputId: input.result.inputId,
    gateStatus,
    axisReleases,
    globalBlockingIssues,
    outputLocks: unique([...input.result.humanReviewDecisionGate.globalProhibitedOutputs]),
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
  }

  return {
    validatedHumanInputs,
    codeReleaseGateResult,
  }
}
