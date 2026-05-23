import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from './constants'
import type {
  HumanAxisDecisionInput,
  HumanDecisionInputSet,
  HumanDecisionInputValidation,
  HumanDecisionValidationResult,
  HumanReviewAxisDecisionContract,
  HumanReviewDecisionGate,
  PoaAxis,
} from './types'

const OBJECTIVE_INTENT_CODES = new Set(['O-C', 'O-D', 'O-E'])
const PERCEPTION_FAILURE_CODES = new Set(['P-D', 'P-F', 'P-G'])

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function setInvalid(
  current: HumanDecisionValidationResult,
  status: HumanDecisionValidationResult['status'],
  issue: string
): HumanDecisionValidationResult {
  return {
    ...current,
    valid: false,
    status,
    acceptedForNextGate: false,
    blockingIssues: [...current.blockingIssues, issue],
  }
}

function hasAbsoluteBlocker(contract: HumanReviewAxisDecisionContract): boolean {
  return contract.traceLinks.some((item) => item.includes('blockingForClassification:absolute:'))
}

function hasKeywordMatch(values: string[], keywords: string[]): boolean {
  const merged = values.map(normalize).join(' ')
  return keywords.some((keyword) => merged.includes(normalize(keyword)))
}

function detectForbiddenDownstreamRequest(input: HumanAxisDecisionInput): string[] {
  const requested = (input.requestedDownstreamOutputs || []).map((item) => item.trim()).filter(Boolean)
  const fromText: string[] = []

  const combinedText = [
    input.reviewerRationale,
    input.proposedCode || '',
    ...input.guardrailAcknowledgements,
    ...input.limitations,
  ]
    .join(' ')
    .toLowerCase()

  const downstreamTokens = ['finalconclusion', 'final conclusion', 'hfacs', 'risk/erc', 'arms/erc', 'classified']
  if (downstreamTokens.some((token) => combinedText.includes(token))) {
    fromText.push('textual_downstream_release_request_detected')
  }

  const requestedForbidden = requested.filter((item) =>
    SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS.map((forbidden) => forbidden.toLowerCase()).includes(item.toLowerCase())
  )

  return [...requestedForbidden, ...fromText]
}

export function validateHumanAxisDecision(
  contract: HumanReviewAxisDecisionContract,
  input: HumanAxisDecisionInput
): HumanDecisionValidationResult {
  let result: HumanDecisionValidationResult = {
    axis: contract.axis,
    valid: true,
    status: 'VALID_FOR_RELEASE_GATE',
    blockingIssues: [],
    warnings: [],
    acceptedForNextGate: input.decisionIntent === 'PROPOSE_CODE',
  }

  if (input.axis !== contract.axis) {
    result = setInvalid(result, 'INVALID_GUARDRAIL_CONFLICT', 'Input axis does not match decision contract axis.')
  }

  const forbiddenDownstream = detectForbiddenDownstreamRequest(input)
  if (forbiddenDownstream.length > 0) {
    result = setInvalid(
      result,
      'INVALID_GUARDRAIL_CONFLICT',
      `Forbidden downstream release request detected: ${forbiddenDownstream.join(', ')}`
    )
  }

  if (input.decisionIntent === 'PROPOSE_CODE' && contract.decisionStatus !== 'READY_FOR_HUMAN_DECISION') {
    result = setInvalid(
      result,
      'INVALID_NOT_READY',
      `Axis ${contract.axis} is ${contract.decisionStatus}; PROPOSE_CODE requires READY_FOR_HUMAN_DECISION.`
    )
  }

  if (input.decisionIntent === 'PROPOSE_CODE') {
    if (!input.proposedCode || input.proposedCode.trim().length === 0) {
      result = setInvalid(result, 'INVALID_GUARDRAIL_CONFLICT', 'proposedCode is required for PROPOSE_CODE intent.')
    }

    if (input.evidenceReferences.length === 0) {
      result = setInvalid(
        result,
        'INVALID_MISSING_EVIDENCE_REFERENCES',
        'evidenceReferences are required for PROPOSE_CODE intent.'
      )
    }

    if (!input.reviewerRationale || input.reviewerRationale.trim().length === 0) {
      result = setInvalid(result, 'INVALID_MISSING_RATIONALE', 'reviewerRationale is required for PROPOSE_CODE intent.')
    }

    if (input.guardrailAcknowledgements.length === 0) {
      result = setInvalid(
        result,
        'INVALID_GUARDRAIL_CONFLICT',
        'guardrailAcknowledgements are required for PROPOSE_CODE intent.'
      )
    }

    for (const action of contract.prohibitedReviewerActions) {
      if (hasKeywordMatch(input.guardrailAcknowledgements, [action])) {
        result = setInvalid(result, 'INVALID_GUARDRAIL_CONFLICT', `Prohibited reviewer action acknowledged as allowed: ${action}`)
      }
    }
  }

  const waiver = input.waiverDecision
  if (waiver.approved) {
    if (!contract.waiverDecisionAllowed || hasAbsoluteBlocker(contract)) {
      result = setInvalid(
        result,
        'INVALID_WAIVER_CONFLICT',
        'Waiver approval is not allowed for this axis contract.'
      )
    }
    if (!waiver.rationale || waiver.rationale.trim().length === 0) {
      result = setInvalid(result, 'INVALID_WAIVER_CONFLICT', 'Waiver rationale is required when waiver is approved.')
    }
    if (waiver.acceptedResidualUncertainty.length === 0) {
      result = setInvalid(
        result,
        'INVALID_WAIVER_CONFLICT',
        'acceptedResidualUncertainty is required when waiver is approved.'
      )
    }
  }

  if (contract.waiverDecisionRequired && input.decisionIntent === 'PROPOSE_CODE' && !waiver.approved) {
    result = setInvalid(
      result,
      'INVALID_WAIVER_CONFLICT',
      'Axis contract requires waiver decision approval for this proposal path.'
    )
  }

  if (waiver.requested && !contract.waiverDecisionAllowed) {
    result = setInvalid(
      result,
      'INVALID_WAIVER_CONFLICT',
      'Waiver was requested but contract does not allow waiver decision.'
    )
  }

  const proposedCode = (input.proposedCode || '').trim().toUpperCase()

  if (input.decisionIntent === 'PROPOSE_CODE' && proposedCode === 'A-D') {
    const adAckOk = hasKeywordMatch(input.guardrailAcknowledgements, ['physical', 'motor', 'ergonomic'])
    if (!adAckOk) {
      result = setInvalid(
        result,
        'INVALID_GUARDRAIL_CONFLICT',
        'A-D proposal requires explicit physical/motor/ergonomic evidence acknowledgement.'
      )
    }
  }

  if (input.decisionIntent === 'PROPOSE_CODE' && OBJECTIVE_INTENT_CODES.has(proposedCode)) {
    const objectiveAckOk =
      hasKeywordMatch(input.guardrailAcknowledgements, ['intent']) &&
      hasKeywordMatch(input.guardrailAcknowledgements, ['rule-awareness', 'rule awareness'])
    if (!objectiveAckOk) {
      result = setInvalid(
        result,
        'INVALID_GUARDRAIL_CONFLICT',
        `${proposedCode} proposal requires explicit intent and rule-awareness acknowledgement.`
      )
    }
  }

  if (input.decisionIntent === 'PROPOSE_CODE' && PERCEPTION_FAILURE_CODES.has(proposedCode)) {
    const perceptionAckOk = hasKeywordMatch(input.guardrailAcknowledgements, [
      'cue uptake',
      'recognition',
      'timing',
    ])
    if (!perceptionAckOk) {
      result = setInvalid(
        result,
        'INVALID_GUARDRAIL_CONFLICT',
        `${proposedCode} proposal requires explicit cue uptake/recognition/timing acknowledgement.`
      )
    }
  }

  if (input.decisionIntent !== 'PROPOSE_CODE') {
    result.acceptedForNextGate = false
    result.warnings.push('Decision intent is non-proposal; classification release gate remains locked in this phase.')
  }

  return result
}

function emptyValidation(inputId: string | null): HumanDecisionInputValidation {
  return {
    inputProvided: false,
    inputId,
    results: [],
    allValid: false,
    acceptedAxesForNextGate: [],
    rejectedAxesForNextGate: [],
    blockingIssues: [],
    warnings: ['No human decision input provided for this run.'],
  }
}

export function validateHumanDecisionInput(
  gate: HumanReviewDecisionGate,
  inputSet: HumanDecisionInputSet | undefined
): HumanDecisionInputValidation {
  if (!inputSet) {
    return emptyValidation(null)
  }

  const results: HumanDecisionValidationResult[] = []
  const warnings: string[] = []

  for (const axisInput of inputSet.axisDecisions) {
    const contract = gate.axisContracts.find((item) => item.axis === axisInput.axis)
    if (!contract) {
      results.push({
        axis: axisInput.axis,
        valid: false,
        status: 'INVALID_NOT_READY',
        blockingIssues: ['No matching axis contract found in HumanReviewDecisionGate.'],
        warnings: [],
        acceptedForNextGate: false,
      })
      continue
    }

    const axisResult = validateHumanAxisDecision(contract, axisInput)
    results.push(axisResult)
  }

  const acceptedAxesForNextGate = results.filter((item) => item.acceptedForNextGate).map((item) => item.axis)
  const rejectedAxesForNextGate = results.filter((item) => !item.acceptedForNextGate).map((item) => item.axis)
  const blockingIssues = results.flatMap((item) => item.blockingIssues.map((issue) => `${item.axis}: ${issue}`))

  if (inputSet.inputId.trim() !== '') {
    warnings.push(`Validated human decision input set: ${inputSet.inputId}`)
  }

  return {
    inputProvided: true,
    inputId: inputSet.inputId,
    results,
    allValid: results.length > 0 && results.every((item) => item.valid),
    acceptedAxesForNextGate,
    rejectedAxesForNextGate,
    blockingIssues,
    warnings: [...warnings, ...results.flatMap((item) => item.warnings)],
  }
}
