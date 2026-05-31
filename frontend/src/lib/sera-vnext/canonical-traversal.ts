import { assertCanonicalSeraLeafCode } from './canonical-codes'
import { SERA_CANONICAL_TREE_NODES } from './canonical-tree'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraAxis,
  CanonicalSeraLeafCode,
} from './types'

export type CanonicalTraversalAnswerSource = 'AUTHOR_DECISION' | 'TEST_FIXTURE' | 'SYSTEM_DERIVED_BLOCK'

export type CanonicalTraversalStatus =
  | 'NODE_PENDING'
  | 'NODE_ANSWERED'
  | 'NEXT_NODE_READY'
  | 'LEAF_REACHED_NOT_CLASSIFIED'
  | 'TRAVERSAL_EXTENSION_REQUIRED'
  | 'AXIS_TRAVERSAL_BLOCKED'
  | 'INVALID_NODE'
  | 'INVALID_ANSWER'

export interface CanonicalTraversalLeafCandidate {
  axis: CanonicalSeraAxis
  candidateOnlyLeafCode: CanonicalSeraLeafCode
  status: 'LEAF_REACHED_NOT_CLASSIFIED'
  candidateOnly: true
  classificationAllowed: false
  notFinalClassification: true
  selectedCodeAllowed: false
  releasedCodeAllowed: false
}

export interface CanonicalTraversalRuntimeContextTrace {
  approvedEscapePointScopeStatus: ApprovedEscapePointScope['status'] | null
  approvedEscapePointScopeId: string | null
  enforcementStatus: 'PASSIVE_NOT_ENFORCED'
}

export interface CanonicalTraversalNodeTransition {
  answerValue: string
  transitionKind: 'NEXT_NODE' | 'LEAF'
  nextNodeId: string | null
  leafCode: CanonicalSeraLeafCode | null
  nodeInventoryId: string
}

export interface CanonicalTraversalNodeDescriptor {
  axis: CanonicalSeraAxis
  nodeId: string
  nodeOrder: number
  exactQuestionTextPt: string
  exactQuestionTextEn: string
  allowedAnswerValues: readonly string[]
  transitions: readonly CanonicalTraversalNodeTransition[]
}

export interface CanonicalTraversalAdvanceInput {
  axis: CanonicalSeraAxis
  currentNodeId: string
  answerValue: string
  answerSource: CanonicalTraversalAnswerSource
  approvedEscapePointScope?: ApprovedEscapePointScope
  evidenceReferences?: string[]
  intakeNodeIds?: readonly string[]
}

export interface CanonicalAxisTraversalAnswerInput {
  nodeId: string
  answerValue: string
  answerSource: CanonicalTraversalAnswerSource
  evidenceReferences?: string[]
}

export interface CanonicalAxisTraversalRunInput {
  axis: CanonicalSeraAxis
  answers: readonly CanonicalAxisTraversalAnswerInput[]
  approvedEscapePointScope?: ApprovedEscapePointScope
  intakeNodeIds?: readonly string[]
}

export interface CanonicalTraversalStepOutput {
  axis: CanonicalSeraAxis
  currentNodeId: string
  exactQuestionTextPt: string
  exactQuestionTextEn: string
  answerValue: string | null
  answerSource: CanonicalTraversalAnswerSource | null
  status: CanonicalTraversalStatus
  nextNodeId?: string
  leafCandidate?: CanonicalTraversalLeafCandidate
  blockingIssue?: string
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  notFinalClassification: true
  poaClosureAllowed: false
  approvedEscapePointScopeAccepted: boolean
  runtimeContextTrace: CanonicalTraversalRuntimeContextTrace
}

function buildNodeTransitionIndex(): Map<string, CanonicalTraversalNodeDescriptor> {
  const byNodeId = new Map<string, CanonicalTraversalNodeTransition[]>()

  for (const node of SERA_CANONICAL_TREE_NODES) {
    const list = byNodeId.get(node.nodeId) || []
    list.push({
      answerValue: node.branchCondition,
      transitionKind: node.transitionKind,
      nextNodeId: node.nextNodeId,
      leafCode: node.leafCode,
      nodeInventoryId: node.nodeInventoryId,
    })
    byNodeId.set(node.nodeId, list)
  }

  const descriptors = new Map<string, CanonicalTraversalNodeDescriptor>()
  for (const [nodeId, transitions] of byNodeId.entries()) {
    const sample = SERA_CANONICAL_TREE_NODES.find((node) => node.nodeId === nodeId)
    if (!sample) {
      continue
    }

    const allRows = SERA_CANONICAL_TREE_NODES.filter((node) => node.nodeId === nodeId)
    const sameAxis = allRows.every((node) => node.axis === sample.axis)
    if (!sameAxis) {
      throw new Error(`Canonical traversal node axis mismatch for nodeId ${nodeId}.`)
    }

    const sameQuestionPt = allRows.every((node) => node.exactQuestionTextPt === sample.exactQuestionTextPt)
    const sameQuestionEn = allRows.every((node) => node.exactQuestionTextEn === sample.exactQuestionTextEn)
    if (!sameQuestionPt || !sameQuestionEn) {
      throw new Error(`Canonical traversal question text mismatch for nodeId ${nodeId}.`)
    }

    descriptors.set(nodeId, {
      axis: sample.axis,
      nodeId,
      nodeOrder: sample.nodeOrder,
      exactQuestionTextPt: sample.exactQuestionTextPt,
      exactQuestionTextEn: sample.exactQuestionTextEn,
      allowedAnswerValues: transitions.map((item) => item.answerValue),
      transitions,
    })
  }

  return descriptors
}

const CANONICAL_TRAVERSAL_NODE_INDEX = buildNodeTransitionIndex()

const AXIS_ROOT_NODE: Readonly<Record<CanonicalSeraAxis, string>> = {
  P: 'P_ROOT',
  O: 'O_ROOT',
  A: 'A_ROOT',
}

function baseStepOutput(input: {
  axis: CanonicalSeraAxis
  nodeId: string
  answerValue: string | null
  answerSource: CanonicalTraversalAnswerSource | null
  status: CanonicalTraversalStatus
  exactQuestionTextPt: string
  exactQuestionTextEn: string
  approvedEscapePointScope?: ApprovedEscapePointScope
}): CanonicalTraversalStepOutput {
  const runtimeContextTrace: CanonicalTraversalRuntimeContextTrace = {
    approvedEscapePointScopeStatus: input.approvedEscapePointScope?.status ?? null,
    approvedEscapePointScopeId: input.approvedEscapePointScope?.scopeId ?? null,
    enforcementStatus: 'PASSIVE_NOT_ENFORCED',
  }

  return {
    axis: input.axis,
    currentNodeId: input.nodeId,
    exactQuestionTextPt: input.exactQuestionTextPt,
    exactQuestionTextEn: input.exactQuestionTextEn,
    answerValue: input.answerValue,
    answerSource: input.answerSource,
    status: input.status,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    notFinalClassification: true,
    poaClosureAllowed: false,
    approvedEscapePointScopeAccepted: Boolean(input.approvedEscapePointScope),
    runtimeContextTrace,
  }
}

export function getCanonicalTraversalNode(nodeId: string): CanonicalTraversalNodeDescriptor {
  const descriptor = CANONICAL_TRAVERSAL_NODE_INDEX.get(nodeId)
  if (!descriptor) {
    throw new Error(`INVALID_NODE: canonical nodeId not found: ${nodeId}`)
  }
  return descriptor
}

export function validateCanonicalTraversalAnswer(nodeId: string, answerValue: string): {
  valid: boolean
  status: 'NODE_ANSWERED' | 'INVALID_NODE' | 'INVALID_ANSWER'
  normalizedAnswerValue: string
  blockingIssue?: string
} {
  const normalizedAnswerValue = answerValue.trim()
  let node: CanonicalTraversalNodeDescriptor
  try {
    node = getCanonicalTraversalNode(nodeId)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      valid: false,
      status: 'INVALID_NODE',
      normalizedAnswerValue,
      blockingIssue: message,
    }
  }

  const hasTransition = node.transitions.some((transition) => transition.answerValue === normalizedAnswerValue)
  if (!hasTransition) {
    return {
      valid: false,
      status: 'INVALID_ANSWER',
      normalizedAnswerValue,
      blockingIssue: `INVALID_CANONICAL_ANSWER_VALUE: ${normalizedAnswerValue} is not a canonical branch for node ${nodeId}.`,
    }
  }

  return {
    valid: true,
    status: 'NODE_ANSWERED',
    normalizedAnswerValue,
  }
}

export function advanceCanonicalTraversal(input: CanonicalTraversalAdvanceInput): CanonicalTraversalStepOutput {
  const normalizedAnswerValue = input.answerValue.trim()
  let node: CanonicalTraversalNodeDescriptor

  try {
    node = getCanonicalTraversalNode(input.currentNodeId)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: 'INVALID_NODE',
        exactQuestionTextPt: '',
        exactQuestionTextEn: '',
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      blockingIssue: message,
    }
  }

  if (node.axis !== input.axis) {
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: 'AXIS_TRAVERSAL_BLOCKED',
        exactQuestionTextPt: node.exactQuestionTextPt,
        exactQuestionTextEn: node.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      blockingIssue: `AXIS_TRAVERSAL_BLOCKED: node ${input.currentNodeId} belongs to axis ${node.axis}, not ${input.axis}.`,
    }
  }

  const answerValidation = validateCanonicalTraversalAnswer(input.currentNodeId, normalizedAnswerValue)
  if (!answerValidation.valid) {
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: answerValidation.status,
        exactQuestionTextPt: node.exactQuestionTextPt,
        exactQuestionTextEn: node.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      blockingIssue: answerValidation.blockingIssue,
    }
  }

  const transition = node.transitions.find((item) => item.answerValue === answerValidation.normalizedAnswerValue)
  if (!transition) {
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: 'INVALID_ANSWER',
        exactQuestionTextPt: node.exactQuestionTextPt,
        exactQuestionTextEn: node.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      blockingIssue: `INVALID_CANONICAL_ANSWER_VALUE: no canonical transition was found for ${input.currentNodeId} + ${normalizedAnswerValue}.`,
    }
  }

  if (transition.transitionKind === 'LEAF') {
    if (!transition.leafCode) {
      return {
        ...baseStepOutput({
          axis: input.axis,
          nodeId: input.currentNodeId,
          answerValue: normalizedAnswerValue,
          answerSource: input.answerSource,
          status: 'AXIS_TRAVERSAL_BLOCKED',
          exactQuestionTextPt: node.exactQuestionTextPt,
          exactQuestionTextEn: node.exactQuestionTextEn,
          approvedEscapePointScope: input.approvedEscapePointScope,
        }),
        blockingIssue: `AXIS_TRAVERSAL_BLOCKED: canonical leaf transition without leafCode in node ${input.currentNodeId}.`,
      }
    }

    try {
      assertCanonicalSeraLeafCode(input.axis, transition.leafCode)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return {
        ...baseStepOutput({
          axis: input.axis,
          nodeId: input.currentNodeId,
          answerValue: normalizedAnswerValue,
          answerSource: input.answerSource,
          status: 'AXIS_TRAVERSAL_BLOCKED',
          exactQuestionTextPt: node.exactQuestionTextPt,
          exactQuestionTextEn: node.exactQuestionTextEn,
          approvedEscapePointScope: input.approvedEscapePointScope,
        }),
        blockingIssue: `AXIS_TRAVERSAL_BLOCKED: ${message}`,
      }
    }

    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: 'LEAF_REACHED_NOT_CLASSIFIED',
        exactQuestionTextPt: node.exactQuestionTextPt,
        exactQuestionTextEn: node.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      leafCandidate: {
        axis: input.axis,
        candidateOnlyLeafCode: transition.leafCode,
        status: 'LEAF_REACHED_NOT_CLASSIFIED',
        candidateOnly: true,
        classificationAllowed: false,
        notFinalClassification: true,
        selectedCodeAllowed: false,
        releasedCodeAllowed: false,
      },
    }
  }

  if (!transition.nextNodeId) {
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: input.currentNodeId,
        answerValue: normalizedAnswerValue,
        answerSource: input.answerSource,
        status: 'AXIS_TRAVERSAL_BLOCKED',
        exactQuestionTextPt: node.exactQuestionTextPt,
        exactQuestionTextEn: node.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
      blockingIssue: `AXIS_TRAVERSAL_BLOCKED: NEXT_NODE transition without nextNodeId in ${input.currentNodeId}.`,
    }
  }

  const extensionRequired = Boolean(
    input.intakeNodeIds &&
      input.intakeNodeIds.length > 0 &&
      !input.intakeNodeIds.includes(transition.nextNodeId)
  )

  return {
    ...baseStepOutput({
      axis: input.axis,
      nodeId: input.currentNodeId,
      answerValue: normalizedAnswerValue,
      answerSource: input.answerSource,
      status: extensionRequired ? 'TRAVERSAL_EXTENSION_REQUIRED' : 'NEXT_NODE_READY',
      exactQuestionTextPt: node.exactQuestionTextPt,
      exactQuestionTextEn: node.exactQuestionTextEn,
      approvedEscapePointScope: input.approvedEscapePointScope,
    }),
    nextNodeId: transition.nextNodeId,
  }
}

export function runCanonicalAxisTraversal(input: CanonicalAxisTraversalRunInput): CanonicalTraversalStepOutput {
  const rootNodeId = AXIS_ROOT_NODE[input.axis]
  if (input.answers.length === 0) {
    const rootNode = getCanonicalTraversalNode(rootNodeId)
    return {
      ...baseStepOutput({
        axis: input.axis,
        nodeId: rootNodeId,
        answerValue: null,
        answerSource: null,
        status: 'NODE_PENDING',
        exactQuestionTextPt: rootNode.exactQuestionTextPt,
        exactQuestionTextEn: rootNode.exactQuestionTextEn,
        approvedEscapePointScope: input.approvedEscapePointScope,
      }),
    }
  }

  let expectedNodeId = rootNodeId
  let lastStep: CanonicalTraversalStepOutput | null = null

  for (const answer of input.answers) {
    if (answer.nodeId !== expectedNodeId) {
      const expectedNode = getCanonicalTraversalNode(expectedNodeId)
      return {
        ...baseStepOutput({
          axis: input.axis,
          nodeId: expectedNodeId,
          answerValue: answer.answerValue,
          answerSource: answer.answerSource,
          status: 'AXIS_TRAVERSAL_BLOCKED',
          exactQuestionTextPt: expectedNode.exactQuestionTextPt,
          exactQuestionTextEn: expectedNode.exactQuestionTextEn,
          approvedEscapePointScope: input.approvedEscapePointScope,
        }),
        blockingIssue: `AXIS_TRAVERSAL_BLOCKED: expected answer for node ${expectedNodeId}, received ${answer.nodeId}.`,
      }
    }

    const step = advanceCanonicalTraversal({
      axis: input.axis,
      currentNodeId: answer.nodeId,
      answerValue: answer.answerValue,
      answerSource: answer.answerSource,
      approvedEscapePointScope: input.approvedEscapePointScope,
      evidenceReferences: answer.evidenceReferences,
      intakeNodeIds: input.intakeNodeIds,
    })

    lastStep = step

    if (
      step.status === 'INVALID_NODE' ||
      step.status === 'INVALID_ANSWER' ||
      step.status === 'AXIS_TRAVERSAL_BLOCKED' ||
      step.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
      step.status === 'LEAF_REACHED_NOT_CLASSIFIED'
    ) {
      return step
    }

    if (step.status !== 'NEXT_NODE_READY' || !step.nextNodeId) {
      return {
        ...step,
        status: 'AXIS_TRAVERSAL_BLOCKED',
        blockingIssue: `AXIS_TRAVERSAL_BLOCKED: traversal reached inconsistent state after node ${answer.nodeId}.`,
      }
    }

    expectedNodeId = step.nextNodeId
  }

  const pendingNode = getCanonicalTraversalNode(expectedNodeId)
  const extensionRequired = Boolean(
    input.intakeNodeIds &&
      input.intakeNodeIds.length > 0 &&
      !input.intakeNodeIds.includes(expectedNodeId)
  )

  return {
    ...baseStepOutput({
      axis: input.axis,
      nodeId: expectedNodeId,
      answerValue: null,
      answerSource: null,
      status: extensionRequired ? 'TRAVERSAL_EXTENSION_REQUIRED' : 'NEXT_NODE_READY',
      exactQuestionTextPt: pendingNode.exactQuestionTextPt,
      exactQuestionTextEn: pendingNode.exactQuestionTextEn,
      approvedEscapePointScope: input.approvedEscapePointScope,
    }),
    ...(lastStep?.status === 'NEXT_NODE_READY' ? { nextNodeId: expectedNodeId } : {}),
  }
}

export function assertNoFinalClassification(output: CanonicalTraversalStepOutput): void {
  const rawOutput = output as unknown as Record<string, unknown>
  const exposesSelectedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'selectedCode')
  const exposesReleasedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'releasedCode')
  const finalFreeConclusionKey = 'final' + 'Conclusion'
  const exposesFinalFreeConclusion = Object.prototype.hasOwnProperty.call(rawOutput, finalFreeConclusionKey)

  if (
    output.selectedCodeAllowed ||
    output.releasedCodeAllowed ||
    !output.notFinalClassification ||
    output.poaClosureAllowed ||
    exposesSelectedCode ||
    exposesReleasedCode ||
    exposesFinalFreeConclusion
  ) {
    throw new Error('Traversal skeleton lock violation: final classification outputs are not allowed in A4R190-D.')
  }

  if (output.leafCandidate) {
    if (!output.leafCandidate.candidateOnly || output.leafCandidate.classificationAllowed || !output.leafCandidate.notFinalClassification) {
      throw new Error('Traversal skeleton lock violation: leaf candidate must remain candidate-only and non-final.')
    }
  }
}
