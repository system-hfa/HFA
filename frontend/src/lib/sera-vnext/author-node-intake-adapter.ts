import {
  buildCanonicalTraversalFromNodeDecisions,
  type CanonicalTraversalAdapterStatus,
  type SeraCanonicalNodeAuthorDecision,
  type SeraCanonicalNodeDecisionInput,
} from './canonical-traversal-adapter'
import {
  getCanonicalTraversalNode,
  runCanonicalAxisTraversal,
  validateCanonicalTraversalAnswer,
  type CanonicalTraversalLeafCandidate,
  type CanonicalTraversalStatus,
} from './canonical-traversal'
import type { CanonicalSeraAxis } from './types'

const FINAL_FREE_CONCLUSION_ALLOWED_KEY = 'final' + 'ConclusionAllowed'

export type AuthorNodeIntakeDecision = SeraCanonicalNodeAuthorDecision | 'PENDING_AUTHOR_DECISION'

export interface AuthorNodeIntakeRecord {
  eventId: string
  eventName?: string
  intakeId: string
  axis: CanonicalSeraAxis
  nodeId: string
  exactQuestionTextPt?: string | null
  preliminaryAnswerStatus?: string | null
  authorDecision?: AuthorNodeIntakeDecision | null
  authorDecisionRationale?: string | null
  evidenceAnchor?: string | null
  answerValue?: string | null
  notFinalClassification?: boolean
  poaClosureAllowed?: boolean
}

export type AuthorNodeIntakeAxisStatus = CanonicalTraversalAdapterStatus | 'AUTHOR_DECISION_PENDING' | 'AXIS_INPUT_INVALID'

export interface AuthorNodeIntakeAxisResult {
  eventId: string
  eventName: string | null
  axis: CanonicalSeraAxis
  status: AuthorNodeIntakeAxisStatus
  traversalStatus: CanonicalTraversalStatus
  pendingAuthorDecision: boolean
  extensionRequired: boolean
  blocked: boolean
  blockingIssues: string[]
  sourceIntakeIds: string[]
  consumedDecisionIds: string[]
  leafCandidate: CanonicalTraversalLeafCandidate | null
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  classificationAllowed: false
  notFinalClassification: true
  [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false
}

export interface AuthorNodeIntakeEventResult {
  eventId: string
  eventName: string | null
  axisResults: AuthorNodeIntakeAxisResult[]
  statusByAxis: Partial<Record<CanonicalSeraAxis, AuthorNodeIntakeAxisStatus>>
  hasPendingAuthorDecision: boolean
  hasBlockingIssues: boolean
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  classificationAllowed: false
  notFinalClassification: true
  [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false
}

export interface BuildCandidateTraversalFromAuthorNodeIntakeInput {
  records: readonly AuthorNodeIntakeRecord[]
}

export interface CandidateTraversalFromAuthorNodeIntakeResult {
  events: AuthorNodeIntakeEventResult[]
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  classificationAllowed: false
  notFinalClassification: true
  [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false
}

function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)]
}

function normalizeDecision(value: AuthorNodeIntakeRecord['authorDecision']): AuthorNodeIntakeDecision {
  if (!value) {
    return 'PENDING_AUTHOR_DECISION'
  }
  const normalized = value.trim().toUpperCase()
  const allowed: readonly AuthorNodeIntakeDecision[] = [
    'ACCEPT_NODE_ANSWER',
    'REJECT_NODE_ANSWER',
    'NEEDS_MORE_EVIDENCE',
    'BRANCH_BLOCKED',
    'AXIS_TRAVERSAL_BLOCKED',
    'PENDING_AUTHOR_DECISION',
  ]
  if ((allowed as readonly string[]).includes(normalized)) {
    return normalized as AuthorNodeIntakeDecision
  }
  return 'PENDING_AUTHOR_DECISION'
}

function sortRecordsForTraversal(records: readonly AuthorNodeIntakeRecord[]): AuthorNodeIntakeRecord[] {
  const cloned = [...records]
  cloned.sort((left, right) => {
    const leftNode = getCanonicalTraversalNode(left.nodeId)
    const rightNode = getCanonicalTraversalNode(right.nodeId)
    if (leftNode.nodeOrder !== rightNode.nodeOrder) {
      return leftNode.nodeOrder - rightNode.nodeOrder
    }
    return left.intakeId.localeCompare(right.intakeId)
  })
  return cloned
}

function buildInvalidAxisResult(input: {
  eventId: string
  eventName: string | null
  axis: CanonicalSeraAxis
  sourceIntakeIds: string[]
  blockingIssues: string[]
}): AuthorNodeIntakeAxisResult {
  return {
    eventId: input.eventId,
    eventName: input.eventName,
    axis: input.axis,
    status: 'AXIS_INPUT_INVALID',
    traversalStatus: 'AXIS_TRAVERSAL_BLOCKED',
    pendingAuthorDecision: false,
    extensionRequired: false,
    blocked: true,
    blockingIssues: unique(input.blockingIssues),
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: [],
    leafCandidate: null,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}

function buildPendingAxisResult(input: {
  eventId: string
  eventName: string | null
  axis: CanonicalSeraAxis
  sourceIntakeIds: string[]
  acceptedDecisions: readonly SeraCanonicalNodeDecisionInput[]
  intakeNodeIds: readonly string[]
  blockingIssues: string[]
}): AuthorNodeIntakeAxisResult {
  const snapshot = runCanonicalAxisTraversal({
    axis: input.axis,
    answers: input.acceptedDecisions.map((decision) => ({
      nodeId: decision.nodeId,
      answerValue: decision.answerValue,
      answerSource: 'AUTHOR_DECISION',
      evidenceReferences: decision.evidenceRefs,
    })),
    intakeNodeIds: input.intakeNodeIds,
  })

  return {
    eventId: input.eventId,
    eventName: input.eventName,
    axis: input.axis,
    status: 'AUTHOR_DECISION_PENDING',
    traversalStatus: snapshot.status,
    pendingAuthorDecision: true,
    extensionRequired: snapshot.status === 'TRAVERSAL_EXTENSION_REQUIRED' || snapshot.status === 'NEXT_NODE_READY',
    blocked: false,
    blockingIssues: unique([
      ...input.blockingIssues,
      'PENDING_AUTHOR_DECISION: intake contains unresolved author decision entries.',
    ]),
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: input.acceptedDecisions.map((item) => item.decisionId),
    leafCandidate: null,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}

function adaptAxisRecords(input: {
  eventId: string
  eventName: string | null
  axis: CanonicalSeraAxis
  records: readonly AuthorNodeIntakeRecord[]
}): AuthorNodeIntakeAxisResult {
  const sourceIntakeIds = input.records.map((item) => item.intakeId)
  const blockingIssues: string[] = []

  let ordered: AuthorNodeIntakeRecord[]
  try {
    ordered = sortRecordsForTraversal(input.records)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return buildInvalidAxisResult({
      eventId: input.eventId,
      eventName: input.eventName,
      axis: input.axis,
      sourceIntakeIds,
      blockingIssues: [`Invalid canonical node in intake set: ${message}`],
    })
  }

  const acceptedDecisions: SeraCanonicalNodeDecisionInput[] = []
  const otherAuthorDecisions: SeraCanonicalNodeDecisionInput[] = []
  const intakeNodeIds: string[] = []
  let hasPendingDecision = false

  for (const record of ordered) {
    intakeNodeIds.push(record.nodeId)

    let descriptor
    try {
      descriptor = getCanonicalTraversalNode(record.nodeId)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      blockingIssues.push(`INVALID_NODE: ${message}`)
      continue
    }

    if (descriptor.axis !== record.axis) {
      blockingIssues.push(
        `AXIS_TRAVERSAL_BLOCKED: node ${record.nodeId} belongs to axis ${descriptor.axis}, not ${record.axis}.`
      )
    }

    if (record.exactQuestionTextPt && record.exactQuestionTextPt.trim() !== descriptor.exactQuestionTextPt) {
      blockingIssues.push(
        `CANONICAL_QUESTION_MISMATCH: intake question mismatch for node ${record.nodeId}.`
      )
    }

    if (record.notFinalClassification === false) {
      blockingIssues.push(`LOCK_CONFLICT: notFinalClassification must remain true for intakeId ${record.intakeId}.`)
    }

    if (record.poaClosureAllowed === true) {
      blockingIssues.push(`LOCK_CONFLICT: poaClosureAllowed must remain false for intakeId ${record.intakeId}.`)
    }

    const decision = normalizeDecision(record.authorDecision)
    if (decision === 'PENDING_AUTHOR_DECISION') {
      hasPendingDecision = true
      continue
    }

    if (decision === 'ACCEPT_NODE_ANSWER') {
      const answerValue = (record.answerValue || '').trim()
      if (answerValue.length === 0) {
        blockingIssues.push(`INVALID_CANONICAL_ANSWER_VALUE: missing answerValue for ACCEPT_NODE_ANSWER in ${record.intakeId}.`)
        continue
      }

      const answerValidation = validateCanonicalTraversalAnswer(record.nodeId, answerValue)
      if (!answerValidation.valid) {
        blockingIssues.push(answerValidation.blockingIssue || `INVALID_CANONICAL_ANSWER_VALUE: ${answerValue}`)
        continue
      }

      acceptedDecisions.push({
        decisionId: record.intakeId,
        eventId: record.eventId,
        axis: record.axis,
        nodeId: record.nodeId,
        answerValue: answerValidation.normalizedAnswerValue,
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: (record.authorDecisionRationale || record.preliminaryAnswerStatus || '').trim(),
        evidenceRefs: [(record.evidenceAnchor || '').trim()].filter((item) => item.length > 0),
        sourcePhase: 'A4R187',
      })
      continue
    }

    otherAuthorDecisions.push({
      decisionId: record.intakeId,
      eventId: record.eventId,
      axis: record.axis,
      nodeId: record.nodeId,
      answerValue: (record.answerValue || '').trim(),
      authorDecision: decision,
      rationale: (record.authorDecisionRationale || record.preliminaryAnswerStatus || '').trim(),
      evidenceRefs: [(record.evidenceAnchor || '').trim()].filter((item) => item.length > 0),
      sourcePhase: 'A4R187',
    })
  }

  if (blockingIssues.length > 0) {
    return buildInvalidAxisResult({
      eventId: input.eventId,
      eventName: input.eventName,
      axis: input.axis,
      sourceIntakeIds,
      blockingIssues,
    })
  }

  if (hasPendingDecision) {
    return buildPendingAxisResult({
      eventId: input.eventId,
      eventName: input.eventName,
      axis: input.axis,
      sourceIntakeIds,
      acceptedDecisions,
      intakeNodeIds: unique(intakeNodeIds),
      blockingIssues,
    })
  }

  const adapterOutput = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [...acceptedDecisions, ...otherAuthorDecisions],
    intakeNodeIdsByAxis: {
      [input.axis]: unique(intakeNodeIds),
    },
  })

  const axisResult = adapterOutput.axisResults.find((item) => item.axis === input.axis)
  if (!axisResult) {
    return buildPendingAxisResult({
      eventId: input.eventId,
      eventName: input.eventName,
      axis: input.axis,
      sourceIntakeIds,
      acceptedDecisions,
      intakeNodeIds: unique(intakeNodeIds),
      blockingIssues: ['No axis traversal result generated from author intake decisions.'],
    })
  }

  return {
    eventId: input.eventId,
    eventName: input.eventName,
    axis: input.axis,
    status: axisResult.status,
    traversalStatus: axisResult.traversalStep.status,
    pendingAuthorDecision: false,
    extensionRequired:
      axisResult.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED' ||
      axisResult.traversalStep.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
      axisResult.traversalStep.status === 'NEXT_NODE_READY',
    blocked: Boolean(axisResult.blockingIssue) || axisResult.status.includes('BLOCKED'),
    blockingIssues: unique([...(axisResult.blockingIssue ? [axisResult.blockingIssue] : [])]),
    sourceIntakeIds,
    consumedDecisionIds: axisResult.consumedDecisionIds,
    leafCandidate: axisResult.leafCandidate,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}

function groupRecordsByEvent(input: readonly AuthorNodeIntakeRecord[]): Map<string, AuthorNodeIntakeRecord[]> {
  const grouped = new Map<string, AuthorNodeIntakeRecord[]>()
  for (const record of input) {
    const eventId = record.eventId.trim()
    const list = grouped.get(eventId) || []
    list.push({
      ...record,
      eventId,
      intakeId: record.intakeId.trim(),
      nodeId: record.nodeId.trim(),
      eventName: record.eventName?.trim(),
      exactQuestionTextPt: record.exactQuestionTextPt?.trim(),
      preliminaryAnswerStatus: record.preliminaryAnswerStatus?.trim(),
      authorDecision: record.authorDecision?.trim() as AuthorNodeIntakeDecision | undefined,
      authorDecisionRationale: record.authorDecisionRationale?.trim(),
      evidenceAnchor: record.evidenceAnchor?.trim(),
      answerValue: record.answerValue?.trim(),
    })
    grouped.set(eventId, list)
  }
  return grouped
}

export function buildCandidateTraversalFromAuthorNodeIntake(
  input: BuildCandidateTraversalFromAuthorNodeIntakeInput
): CandidateTraversalFromAuthorNodeIntakeResult {
  const events: AuthorNodeIntakeEventResult[] = []
  const groupedEvents = groupRecordsByEvent(input.records)

  for (const [eventId, records] of groupedEvents.entries()) {
    const axisResults: AuthorNodeIntakeAxisResult[] = []
    const eventName = records.find((item) => item.eventName && item.eventName.length > 0)?.eventName || null

    for (const axis of ['P', 'O', 'A'] as const) {
      const axisRecords = records.filter((item) => item.axis === axis)
      if (axisRecords.length === 0) {
        continue
      }
      axisResults.push(
        adaptAxisRecords({
          eventId,
          eventName,
          axis,
          records: axisRecords,
        })
      )
    }

    const statusByAxis: Partial<Record<CanonicalSeraAxis, AuthorNodeIntakeAxisStatus>> = {}
    for (const axisResult of axisResults) {
      statusByAxis[axisResult.axis] = axisResult.status
    }

    events.push({
      eventId,
      eventName,
      axisResults,
      statusByAxis,
      hasPendingAuthorDecision: axisResults.some((item) => item.pendingAuthorDecision),
      hasBlockingIssues: axisResults.some((item) => item.blocked || item.blockingIssues.length > 0),
      selectedCodeAllowed: false,
      releasedCodeAllowed: false,
      poaClosureAllowed: false,
      downstreamAllowed: false,
      classificationAllowed: false,
      notFinalClassification: true,
      [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
    })
  }

  return {
    events,
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}
