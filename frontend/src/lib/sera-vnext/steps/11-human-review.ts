import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from '../constants'
import type {
  CausalAssurance,
  HumanReviewAxisDecisionContract,
  HumanReviewDecisionGate,
  HumanReviewStatus,
  PoaAxis,
  PoaAxisClassification,
  PoaClassification,
  SeraVNextInput,
} from '../types'

function unique(items: string[]): string[] {
  return [...new Set(items)]
}

function toDecisionStatus(
  axis: PoaAxisClassification
): HumanReviewAxisDecisionContract['decisionStatus'] {
  const eligibilityStatus = axis.classificationEligibility.eligibilityStatus
  if (eligibilityStatus === 'ELIGIBLE_FOR_HUMAN_REVIEW') {
    return 'READY_FOR_HUMAN_DECISION'
  }
  if (eligibilityStatus === 'BLOCKED_BY_GUARDRAIL') {
    return 'BLOCKED_BY_GUARDRAIL'
  }
  return 'NOT_READY_FOR_HUMAN_DECISION'
}

function hasResidualUncertainty(axis: PoaAxisClassification): boolean {
  return (
    axis.linkedUncertainties.length > 0 ||
    axis.blockingForClassification.some((item) => item.startsWith('waivable:'))
  )
}

function buildAxisContract(axis: PoaAxisClassification): HumanReviewAxisDecisionContract {
  const decisionStatus = toDecisionStatus(axis)
  const absoluteBlockers = axis.classificationEligibility.absoluteBlockers
  const residualUncertaintyExists = hasResidualUncertainty(axis)

  const waiverDecisionAllowed =
    axis.classificationEligibility.waiverAllowed &&
    absoluteBlockers.length === 0 &&
    residualUncertaintyExists
  const waiverDecisionRequired =
    axis.classificationEligibility.waiverRequired &&
    waiverDecisionAllowed &&
    residualUncertaintyExists

  let waiverDecisionProhibitedReason: string | null = null
  if (absoluteBlockers.length > 0) {
    waiverDecisionProhibitedReason =
      'Waiver decision is prohibited because absolute methodological blockers are present.'
  } else if (!residualUncertaintyExists) {
    waiverDecisionProhibitedReason = 'Waiver decision is not applicable because no residual uncertainty is present.'
  } else if (!axis.classificationEligibility.waiverAllowed) {
    waiverDecisionProhibitedReason =
      axis.classificationEligibility.waiverProhibitedReason || 'Waiver decision is prohibited by eligibility policy.'
  }

  const requiredInputs: string[] = [
    `Record human decision for axis ${axis.axis}.`,
    `Resolve/acknowledge required decision intent: ${axis.requiredHumanDecision}`,
    ...axis.transitionCriteria.map((criterion) => `Confirm transition criterion: ${criterion}`),
  ]

  if (waiverDecisionRequired) {
    requiredInputs.push('Provide explicit waiver decision rationale for residual uncertainty.')
  }

  const requiredEvidenceReferences = unique([...axis.evidence, ...axis.linkedEvidence])

  return {
    axis: axis.axis,
    decisionStatus,
    eligibleForDecision: decisionStatus === 'READY_FOR_HUMAN_DECISION',
    requiredInputs,
    requiredEvidenceReferences,
    waiverDecisionRequired,
    waiverDecisionAllowed,
    waiverDecisionProhibitedReason,
    allowedReviewerActions: [
      'Confirm axis-specific readiness for human decision without emitting final classification.',
      'Request additional evidence and keep axis unresolved when readiness is insufficient.',
      'Record waiver rationale only when waiver is explicitly allowed.',
    ],
    prohibitedReviewerActions: [
      'Emit CLASSIFIED automatically.',
      'Emit finalConclusion from causal core.',
      'Emit HFACS/Risk/ERC/ARMS outputs from causal core.',
      'Bypass absolute guardrail blockers via waiver.',
    ],
    decisionChecklist: [
      'Statement/evidence package remains axis-linked and traceable.',
      'Transition criteria are explicitly checked by human reviewer.',
      'Residual uncertainty handling is documented (waiver or unresolved).',
      'Downstream outputs remain locked regardless of axis readiness.',
    ],
    residualUncertainty: unique(axis.linkedUncertainties),
    traceLinks: unique([
      `reviewReasonCode:${axis.reviewReasonCode}`,
      ...axis.transitionCriteria.map((criterion) => `transitionCriteria:${criterion}`),
      ...axis.blockingForClassification.map((item) => `blockingForClassification:${item}`),
    ]),
    outputLock: {
      autoClassificationForbidden: true,
      prohibitedOutputs: [...SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS],
      prohibitedStatuses: ['CLASSIFIED'],
    },
  }
}

function buildDecisionGate(poaClassification: PoaClassification): HumanReviewDecisionGate {
  const axisOrder: PoaAxis[] = ['perception', 'objective', 'action']
  const axisContracts = axisOrder.map((axis) => buildAxisContract(poaClassification[axis]))

  const hasBlockedAxis = axisContracts.some((contract) => contract.decisionStatus === 'BLOCKED_BY_GUARDRAIL')
  const allAxesReady = axisContracts.every((contract) => contract.decisionStatus === 'READY_FOR_HUMAN_DECISION')

  const status: HumanReviewDecisionGate['status'] = hasBlockedAxis
    ? 'HUMAN_DECISION_GATE_BLOCKED'
    : allAxesReady
      ? 'HUMAN_DECISION_GATE_READY'
      : 'HUMAN_DECISION_GATE_PARTIAL'

  return {
    required: true,
    status,
    axisContracts,
    globalProhibitedOutputs: [...SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS],
    globalDecisionRules: [
      'CLASSIFIED emission remains prohibited in all automatic dry-runs.',
      'Human reviewer decision is required before any future classification phase.',
      'Final conclusion and HFACS/Risk/ERC outputs remain locked in causal core.',
      'Waiver decision is prohibited when absolute blockers are present.',
    ],
  }
}

export function runStep11HumanReview(input: {
  input: SeraVNextInput
  poaClassification: PoaClassification
  causalAssurance: CausalAssurance
}): { humanReview: HumanReviewStatus; humanReviewDecisionGate: HumanReviewDecisionGate } {
  const decisionGate = buildDecisionGate(input.poaClassification)

  return {
    humanReview: {
      required: true,
      status: 'HUMAN_DECISION_REQUIRED',
      rationale:
        'Human decision gate contract is mandatory before any future classification release; automatic CLASSIFIED output remains forbidden.',
      checklist: [
        'Review each axis contract decisionStatus and requiredInputs.',
        'Confirm prohibited outputs remain locked (CLASSIFIED/finalConclusion/HFACS/Risk/ERC/ARMS).',
        'Record waiver decision only when explicitly allowed and residual uncertainty exists.',
        `Confirm causal assurance remains non-passed (${input.causalAssurance.status}).`,
      ],
      prohibitedOutputs: [...SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS],
    },
    humanReviewDecisionGate: decisionGate,
  }
}
