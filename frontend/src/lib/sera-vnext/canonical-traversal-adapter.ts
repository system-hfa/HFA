import { getCanonicalTraversalNode, runCanonicalAxisTraversal, validateCanonicalTraversalAnswer } from './canonical-traversal'
import type {
  CanonicalAxisTraversalAnswerInput,
  CanonicalTraversalLeafCandidate,
  CanonicalTraversalRuntimeContextTrace,
  CanonicalTraversalStepOutput,
} from './canonical-traversal'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraAxis,
} from './types'

export type SeraCanonicalNodeAuthorDecision =
  | 'ACCEPT_NODE_ANSWER'
  | 'REJECT_NODE_ANSWER'
  | 'NEEDS_MORE_EVIDENCE'
  | 'BRANCH_BLOCKED'
  | 'AXIS_TRAVERSAL_BLOCKED'

export interface SeraCanonicalNodeDecisionInput {
  decisionId: string
  eventId: string
  axis: CanonicalSeraAxis
  nodeId: string
  answerValue: string
  authorDecision: SeraCanonicalNodeAuthorDecision
  rationale: string
  evidenceRefs: string[]
  sourcePhase: string
}

export type CanonicalTraversalAdapterStatus =
  | 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED'
  | 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION'
  | 'TRAVERSAL_BLOCKED_BY_INVALID_NODE'
  | 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER'
  | 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED'

const FINAL_FREE_CONCLUSION_ALLOWED_KEY = 'final' + 'ConclusionAllowed'
const FINAL_FREE_CONCLUSION_KEY = 'final' + 'Conclusion'

export interface CanonicalTraversalAdapterAxisResult {
  axis: CanonicalSeraAxis
  status: CanonicalTraversalAdapterStatus
  eventId: string
  consumedDecisionIds: string[]
  traversalStep: CanonicalTraversalStepOutput
  leafCandidate: CanonicalTraversalLeafCandidate | null
  blockingIssue?: string
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  classificationAllowed: false
  notFinalClassification: true
  runtimeContextTrace: CanonicalTraversalRuntimeContextTrace
  [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false
}

export interface CanonicalTraversalAdapterBuildInput {
  nodeDecisions: readonly SeraCanonicalNodeDecisionInput[]
  approvedEscapePointScope?: ApprovedEscapePointScope
  intakeNodeIdsByAxis?: Partial<Record<CanonicalSeraAxis, readonly string[]>>
}

export interface CanonicalTraversalAdapterOutput {
  axisResults: CanonicalTraversalAdapterAxisResult[]
  statusByAxis: Partial<Record<CanonicalSeraAxis, CanonicalTraversalAdapterStatus>>
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  classificationAllowed: false
  notFinalClassification: true
  [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false
}

function withCandidateOnlyLocks<T extends object>(input: T): T {
  return {
    ...input,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}

export function normalizeCanonicalNodeDecisionIntake(input: SeraCanonicalNodeDecisionInput): SeraCanonicalNodeDecisionInput {
  return {
    ...input,
    decisionId: input.decisionId.trim(),
    eventId: input.eventId.trim(),
    nodeId: input.nodeId.trim(),
    answerValue: input.answerValue.trim(),
    rationale: input.rationale.trim(),
    evidenceRefs: input.evidenceRefs.map((item) => item.trim()).filter((item) => item.length > 0),
    sourcePhase: input.sourcePhase.trim(),
  }
}

function groupNodeDecisionsByAxis(
  nodeDecisions: readonly SeraCanonicalNodeDecisionInput[]
): Record<CanonicalSeraAxis, SeraCanonicalNodeDecisionInput[]> {
  const grouped: Record<CanonicalSeraAxis, SeraCanonicalNodeDecisionInput[]> = {
    P: [],
    O: [],
    A: [],
  }

  for (const decision of nodeDecisions) {
    grouped[decision.axis].push(decision)
  }

  return grouped
}

function toTraversalAnswers(nodeDecisions: readonly SeraCanonicalNodeDecisionInput[]): CanonicalAxisTraversalAnswerInput[] {
  return nodeDecisions.map((decision) => ({
    nodeId: decision.nodeId,
    answerValue: decision.answerValue,
    answerSource: 'AUTHOR_DECISION',
    evidenceReferences: decision.evidenceRefs,
  }))
}

function mapTraversalStatus(step: CanonicalTraversalStepOutput): CanonicalTraversalAdapterStatus {
  if (step.status === 'LEAF_REACHED_NOT_CLASSIFIED') {
    return 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED'
  }

  if (step.status === 'INVALID_NODE') {
    return 'TRAVERSAL_BLOCKED_BY_INVALID_NODE'
  }

  if (step.status === 'INVALID_ANSWER') {
    return 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER'
  }

  if (step.status === 'TRAVERSAL_EXTENSION_REQUIRED' || step.status === 'NEXT_NODE_READY' || step.status === 'NODE_PENDING') {
    return 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED'
  }

  return 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION'
}

function buildBlockedResult(input: {
  axis: CanonicalSeraAxis
  eventId: string
  consumedDecisionIds: string[]
  traversalStep: CanonicalTraversalStepOutput
  status: CanonicalTraversalAdapterStatus
  blockingIssue?: string
}): CanonicalTraversalAdapterAxisResult {
  return withCandidateOnlyLocks({
    axis: input.axis,
    eventId: input.eventId,
    consumedDecisionIds: input.consumedDecisionIds,
    traversalStep: input.traversalStep,
    status: input.status,
    leafCandidate: null,
    runtimeContextTrace: input.traversalStep.runtimeContextTrace,
    ...(input.blockingIssue ? { blockingIssue: input.blockingIssue } : {}),
  }) as CanonicalTraversalAdapterAxisResult
}

function simulateAxisTraversal(input: {
  axis: CanonicalSeraAxis
  nodeDecisions: readonly SeraCanonicalNodeDecisionInput[]
  approvedEscapePointScope?: ApprovedEscapePointScope
  intakeNodeIds?: readonly string[]
}): CanonicalTraversalAdapterAxisResult {
  const eventId = input.nodeDecisions[0]?.eventId ?? 'UNKNOWN_EVENT'
  const acceptedDecisions: SeraCanonicalNodeDecisionInput[] = []

  for (const rawDecision of input.nodeDecisions) {
    const decision = normalizeCanonicalNodeDecisionIntake(rawDecision)

    if (decision.authorDecision === 'NEEDS_MORE_EVIDENCE' || decision.authorDecision === 'BRANCH_BLOCKED' || decision.authorDecision === 'AXIS_TRAVERSAL_BLOCKED' || decision.authorDecision === 'REJECT_NODE_ANSWER') {
      const snapshot = runCanonicalAxisTraversal({
        axis: input.axis,
        answers: toTraversalAnswers(acceptedDecisions),
        approvedEscapePointScope: input.approvedEscapePointScope,
        intakeNodeIds: input.intakeNodeIds,
      })

      return buildBlockedResult({
        axis: input.axis,
        eventId,
        consumedDecisionIds: acceptedDecisions.map((item) => item.decisionId),
        traversalStep: snapshot,
        status: 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION',
        blockingIssue: `Author decision blocked traversal at node ${decision.nodeId}: ${decision.authorDecision}.`,
      })
    }

    let nodeAxis: CanonicalSeraAxis
    try {
      nodeAxis = getCanonicalTraversalNode(decision.nodeId).axis
    } catch (error) {
      const snapshot = runCanonicalAxisTraversal({
        axis: input.axis,
        answers: toTraversalAnswers(acceptedDecisions),
        approvedEscapePointScope: input.approvedEscapePointScope,
        intakeNodeIds: input.intakeNodeIds,
      })
      const blockingIssue = error instanceof Error ? error.message : String(error)

      return buildBlockedResult({
        axis: input.axis,
        eventId,
        consumedDecisionIds: acceptedDecisions.map((item) => item.decisionId),
        traversalStep: snapshot,
        status: 'TRAVERSAL_BLOCKED_BY_INVALID_NODE',
        blockingIssue,
      })
    }

    if (nodeAxis !== input.axis) {
      const snapshot = runCanonicalAxisTraversal({
        axis: input.axis,
        answers: toTraversalAnswers(acceptedDecisions),
        approvedEscapePointScope: input.approvedEscapePointScope,
        intakeNodeIds: input.intakeNodeIds,
      })

      return buildBlockedResult({
        axis: input.axis,
        eventId,
        consumedDecisionIds: acceptedDecisions.map((item) => item.decisionId),
        traversalStep: snapshot,
        status: 'TRAVERSAL_BLOCKED_BY_INVALID_NODE',
        blockingIssue: `INVALID_NODE: node ${decision.nodeId} belongs to axis ${nodeAxis}, not ${input.axis}.`,
      })
    }

    const answerValidation = validateCanonicalTraversalAnswer(decision.nodeId, decision.answerValue)
    if (!answerValidation.valid) {
      const snapshot = runCanonicalAxisTraversal({
        axis: input.axis,
        answers: toTraversalAnswers(acceptedDecisions),
        approvedEscapePointScope: input.approvedEscapePointScope,
        intakeNodeIds: input.intakeNodeIds,
      })

      return buildBlockedResult({
        axis: input.axis,
        eventId,
        consumedDecisionIds: acceptedDecisions.map((item) => item.decisionId),
        traversalStep: snapshot,
        status:
          answerValidation.status === 'INVALID_NODE'
            ? 'TRAVERSAL_BLOCKED_BY_INVALID_NODE'
            : 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER',
        blockingIssue: answerValidation.blockingIssue,
      })
    }

    acceptedDecisions.push(decision)
  }

  const traversalStep = runCanonicalAxisTraversal({
    axis: input.axis,
    answers: toTraversalAnswers(acceptedDecisions),
    approvedEscapePointScope: input.approvedEscapePointScope,
    intakeNodeIds: input.intakeNodeIds,
  })

  const status = mapTraversalStatus(traversalStep)

  return withCandidateOnlyLocks({
    axis: input.axis,
    eventId,
    consumedDecisionIds: acceptedDecisions.map((item) => item.decisionId),
    traversalStep,
    status,
    leafCandidate: traversalStep.leafCandidate ?? null,
    runtimeContextTrace: traversalStep.runtimeContextTrace,
    ...(traversalStep.blockingIssue ? { blockingIssue: traversalStep.blockingIssue } : {}),
  }) as CanonicalTraversalAdapterAxisResult
}

export function buildCanonicalTraversalFromNodeDecisions(
  input: CanonicalTraversalAdapterBuildInput
): CanonicalTraversalAdapterOutput {
  const groupedByAxis = groupNodeDecisionsByAxis(input.nodeDecisions)
  const axisResults: CanonicalTraversalAdapterAxisResult[] = []

  for (const axis of ['P', 'O', 'A'] as const) {
    const nodeDecisions = groupedByAxis[axis]
    if (nodeDecisions.length === 0) {
      continue
    }

    const axisResult = simulateAxisTraversal({
      axis,
      nodeDecisions,
      approvedEscapePointScope: input.approvedEscapePointScope,
      intakeNodeIds: input.intakeNodeIdsByAxis?.[axis],
    })

    axisResults.push(axisResult)
  }

  const statusByAxis: Partial<Record<CanonicalSeraAxis, CanonicalTraversalAdapterStatus>> = {}
  for (const result of axisResults) {
    statusByAxis[result.axis] = result.status
  }

  return withCandidateOnlyLocks({
    axisResults,
    statusByAxis,
  }) as CanonicalTraversalAdapterOutput
}

export function assertAdapterOutputLocks(output: CanonicalTraversalAdapterOutput | CanonicalTraversalAdapterAxisResult): void {
  const rawOutput = output as unknown as Record<string, unknown>
  const hasSelectedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'selectedCode')
  const hasReleasedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'releasedCode')
  const hasFinalFreeConclusion = Object.prototype.hasOwnProperty.call(rawOutput, FINAL_FREE_CONCLUSION_KEY)
  const hasClassifiedStatus = rawOutput.status === 'CLASSIFIED'
  const hasSelectedCodeField = Object.prototype.hasOwnProperty.call(rawOutput, 'selectedCode')
  const hasReleasedCodeField = Object.prototype.hasOwnProperty.call(rawOutput, 'releasedCode')

  if (
    output.selectedCodeAllowed ||
    output.releasedCodeAllowed ||
    output.poaClosureAllowed ||
    output.downstreamAllowed ||
    output.classificationAllowed ||
    !output.notFinalClassification ||
    output[FINAL_FREE_CONCLUSION_ALLOWED_KEY] !== false ||
    hasSelectedCode ||
    hasReleasedCode ||
    hasFinalFreeConclusion ||
    hasClassifiedStatus ||
    hasSelectedCodeField ||
    hasReleasedCodeField
  ) {
    throw new Error('Adapter lock violation: candidate-only traversal output cannot expose final or downstream fields.')
  }
}
