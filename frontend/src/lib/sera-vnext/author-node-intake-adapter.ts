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
type ValidAuthorNodeIntakeDecision = Exclude<AuthorNodeIntakeDecision, 'PENDING_AUTHOR_DECISION'>

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
export type AuthorNodeIntakeEscapePointScopeStatus = 'PASSIVE_NOT_ENFORCED'

export interface AuthorNodeIntakeAxisSummary {
  outcome: 'BLOCKED' | 'PENDING' | 'INCOMPLETE' | 'LEAF_REACHED'
  hasUnknownAuthorDecision: boolean
  hasInvalidNode: boolean
  hasInvalidAnswer: boolean
  hasQuestionMismatch: boolean
  hasLockConflict: boolean
  hasAuthorBlock: boolean
}

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
  warnings: string[]
  auditTrace: string[]
  nextRequiredAction: string
  axisSummary: AuthorNodeIntakeAxisSummary
  sourceIntakeIds: string[]
  consumedDecisionIds: string[]
  leafCandidate: CanonicalTraversalLeafCandidate | null
  approvedEscapePointScopeStatus: AuthorNodeIntakeEscapePointScopeStatus
  integrationFutureBlockers: string[]
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
  approvedEscapePointScopeStatus: AuthorNodeIntakeEscapePointScopeStatus
  integrationFutureBlockers: string[]
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
  approvedEscapePointScopeStatus: AuthorNodeIntakeEscapePointScopeStatus
  integrationFutureBlockers: string[]
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

const ESCAPE_POINT_SCOPE_STATUS: AuthorNodeIntakeEscapePointScopeStatus = 'PASSIVE_NOT_ENFORCED'
const ESCAPE_POINT_SCOPE_BLOCKER =
  'F-01 HIGH: approvedEscapePointScope is PASSIVE_NOT_ENFORCED; real integration/UI/API remains blocked until explicit enforcement phase (A4R191+).'

function hasIssue(blockingIssues: readonly string[], pattern: RegExp): boolean {
  return blockingIssues.some((issue) => pattern.test(issue))
}

function buildAxisSummary(input: {
  status: AuthorNodeIntakeAxisStatus
  blockingIssues: readonly string[]
  extensionRequired: boolean
  leafCandidate: CanonicalTraversalLeafCandidate | null
}): AuthorNodeIntakeAxisSummary {
  const hasInvalidNode = hasIssue(input.blockingIssues, /\bINVALID_NODE\b/)
  const hasInvalidAnswer = hasIssue(input.blockingIssues, /\bINVALID_CANONICAL_ANSWER_VALUE\b/)
  const hasUnknownAuthorDecision = hasIssue(input.blockingIssues, /\bUNKNOWN_AUTHOR_DECISION_VALUE:/)
  const hasQuestionMismatch = hasIssue(input.blockingIssues, /\bCANONICAL_QUESTION_MISMATCH\b/)
  const hasLockConflict = hasIssue(input.blockingIssues, /\bLOCK_CONFLICT\b/)
  const hasAuthorBlock = input.status === 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION'

  const outcome: AuthorNodeIntakeAxisSummary['outcome'] =
    input.leafCandidate !== null
      ? 'LEAF_REACHED'
      : input.status === 'AUTHOR_DECISION_PENDING'
        ? 'PENDING'
        : input.extensionRequired
          ? 'INCOMPLETE'
          : 'BLOCKED'

  return {
    outcome,
    hasUnknownAuthorDecision,
    hasInvalidNode,
    hasInvalidAnswer,
    hasQuestionMismatch,
    hasLockConflict,
    hasAuthorBlock,
  }
}

function classifyInvalidAxisStatus(blockingIssues: readonly string[]): AuthorNodeIntakeAxisStatus {
  if (hasIssue(blockingIssues, /\bINVALID_NODE\b/)) {
    return 'TRAVERSAL_BLOCKED_BY_INVALID_NODE'
  }
  if (hasIssue(blockingIssues, /\bINVALID_CANONICAL_ANSWER_VALUE\b/)) {
    return 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER'
  }
  return 'AXIS_INPUT_INVALID'
}

function buildNextRequiredAction(input: {
  status: AuthorNodeIntakeAxisStatus
  blockingIssues: readonly string[]
  extensionRequired: boolean
  leafCandidate: CanonicalTraversalLeafCandidate | null
}): string {
  if (input.status === 'AUTHOR_DECISION_PENDING') {
    return 'Provide missing authorDecision values for pending intake records and rerun candidate-only traversal.'
  }
  if (hasIssue(input.blockingIssues, /\bUNKNOWN_AUTHOR_DECISION_VALUE:/)) {
    return 'Replace unknown authorDecision values with allowed contract values and rerun candidate-only traversal.'
  }
  if (hasIssue(input.blockingIssues, /\bINVALID_NODE\b/)) {
    return 'Correct nodeId to a canonical node in the same axis and rerun candidate-only traversal.'
  }
  if (hasIssue(input.blockingIssues, /\bINVALID_CANONICAL_ANSWER_VALUE\b/)) {
    return 'Correct answerValue to an allowed canonical answer for the node and rerun candidate-only traversal.'
  }
  if (hasIssue(input.blockingIssues, /\bCANONICAL_QUESTION_MISMATCH\b/)) {
    return 'Align exactQuestionTextPt with canonical tree question text and rerun candidate-only traversal.'
  }
  if (hasIssue(input.blockingIssues, /\bLOCK_CONFLICT\b/)) {
    return 'Restore candidate-only lock fields (notFinalClassification=true, poaClosureAllowed=false) and rerun.'
  }
  if (input.status === 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION') {
    return 'Resolve blocking author decision state or provide accepted node answers to continue candidate-only traversal.'
  }
  if (input.leafCandidate !== null) {
    return 'Leaf reached in candidate-only mode. Keep classification/release locked and proceed to human review workflow.'
  }
  if (input.extensionRequired || input.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED') {
    return 'Provide next canonical node decision(s) required by traversal extension and rerun candidate-only traversal.'
  }
  return 'Review blockingIssues and provide canonical intake corrections before rerun.'
}

function buildAxisWarnings(input: {
  blockingIssues: readonly string[]
  status: AuthorNodeIntakeAxisStatus
  extensionRequired: boolean
  leafCandidate: CanonicalTraversalLeafCandidate | null
}): string[] {
  const warnings: string[] = []
  if (input.status === 'AUTHOR_DECISION_PENDING') {
    warnings.push('Author decisions remain pending; traversal output is diagnostic-only and not classifiable.')
  }
  if (input.extensionRequired) {
    warnings.push('Traversal extension required: additional canonical node decisions are still missing.')
  }
  if (hasIssue(input.blockingIssues, /\bUNKNOWN_AUTHOR_DECISION_VALUE:/)) {
    warnings.push('Unknown authorDecision values were blocked and require explicit correction.')
  }
  if (input.leafCandidate !== null) {
    warnings.push('Leaf reached remains candidate-only; selected/released/classified/downstream outputs stay locked.')
  }
  warnings.push(ESCAPE_POINT_SCOPE_BLOCKER)
  return unique(warnings)
}

function buildAxisAuditTrace(input: {
  eventId: string
  axis: CanonicalSeraAxis
  status: AuthorNodeIntakeAxisStatus
  traversalStatus: CanonicalTraversalStatus
  sourceIntakeIds: readonly string[]
  consumedDecisionIds: readonly string[]
  blockingIssues: readonly string[]
  extensionRequired: boolean
  leafCandidate: CanonicalTraversalLeafCandidate | null
}): string[] {
  const trace = [
    `eventId:${input.eventId}`,
    `axis:${input.axis}`,
    `status:${input.status}`,
    `traversalStatus:${input.traversalStatus}`,
    `sourceIntakeCount:${input.sourceIntakeIds.length}`,
    `consumedDecisionCount:${input.consumedDecisionIds.length}`,
    `extensionRequired:${input.extensionRequired}`,
    `leafReached:${input.leafCandidate !== null}`,
    `approvedEscapePointScope:${ESCAPE_POINT_SCOPE_STATUS}`,
    `integrationBlocker:${ESCAPE_POINT_SCOPE_BLOCKER}`,
  ]

  for (const issue of input.blockingIssues) {
    trace.push(`blockingIssue:${issue}`)
  }

  return trace
}

type NormalizedAuthorDecisionResult =
  | { kind: 'PENDING' }
  | { kind: 'VALID'; decision: ValidAuthorNodeIntakeDecision }
  | { kind: 'UNKNOWN'; rawValue: string; normalizedValue: string }

function normalizeDecision(value: AuthorNodeIntakeRecord['authorDecision']): NormalizedAuthorDecisionResult {
  if (!value) {
    return { kind: 'PENDING' }
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return { kind: 'PENDING' }
  }

  const normalized = trimmed.toUpperCase()
  const allowed: readonly AuthorNodeIntakeDecision[] = [
    'ACCEPT_NODE_ANSWER',
    'REJECT_NODE_ANSWER',
    'NEEDS_MORE_EVIDENCE',
    'BRANCH_BLOCKED',
    'AXIS_TRAVERSAL_BLOCKED',
    'PENDING_AUTHOR_DECISION',
  ]

  if ((allowed as readonly string[]).includes(normalized)) {
    if (normalized === 'PENDING_AUTHOR_DECISION') {
      return { kind: 'PENDING' }
    }

    return {
      kind: 'VALID',
      decision: normalized as ValidAuthorNodeIntakeDecision,
    }
  }

  return {
    kind: 'UNKNOWN',
    rawValue: trimmed,
    normalizedValue: normalized,
  }
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
  const normalizedBlockingIssues = unique(input.blockingIssues)
  const status = classifyInvalidAxisStatus(normalizedBlockingIssues)
  const traversalStatus: CanonicalTraversalStatus =
    status === 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER'
      ? 'INVALID_ANSWER'
      : status === 'TRAVERSAL_BLOCKED_BY_INVALID_NODE'
        ? 'INVALID_NODE'
        : 'AXIS_TRAVERSAL_BLOCKED'
  const extensionRequired = false
  const leafCandidate = null
  const nextRequiredAction = buildNextRequiredAction({
    status,
    blockingIssues: normalizedBlockingIssues,
    extensionRequired,
    leafCandidate,
  })
  const warnings = buildAxisWarnings({
    blockingIssues: normalizedBlockingIssues,
    status,
    extensionRequired,
    leafCandidate,
  })
  const auditTrace = buildAxisAuditTrace({
    eventId: input.eventId,
    axis: input.axis,
    status,
    traversalStatus,
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: [],
    blockingIssues: normalizedBlockingIssues,
    extensionRequired,
    leafCandidate,
  })

  return {
    eventId: input.eventId,
    eventName: input.eventName,
    axis: input.axis,
    status,
    traversalStatus,
    pendingAuthorDecision: false,
    extensionRequired,
    blocked: true,
    blockingIssues: normalizedBlockingIssues,
    warnings,
    auditTrace,
    nextRequiredAction,
    axisSummary: buildAxisSummary({
      status,
      blockingIssues: normalizedBlockingIssues,
      extensionRequired,
      leafCandidate,
    }),
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: [],
    leafCandidate,
    approvedEscapePointScopeStatus: ESCAPE_POINT_SCOPE_STATUS,
    integrationFutureBlockers: [ESCAPE_POINT_SCOPE_BLOCKER],
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

  const status: AuthorNodeIntakeAxisStatus = 'AUTHOR_DECISION_PENDING'
  const extensionRequired = snapshot.status === 'TRAVERSAL_EXTENSION_REQUIRED' || snapshot.status === 'NEXT_NODE_READY'
  const blockingIssues = unique([
    ...input.blockingIssues,
    'PENDING_AUTHOR_DECISION: intake contains unresolved author decision entries.',
  ])
  const leafCandidate = null
  const nextRequiredAction = buildNextRequiredAction({
    status,
    blockingIssues,
    extensionRequired,
    leafCandidate,
  })
  const warnings = buildAxisWarnings({
    blockingIssues,
    status,
    extensionRequired,
    leafCandidate,
  })
  const auditTrace = buildAxisAuditTrace({
    eventId: input.eventId,
    axis: input.axis,
    status,
    traversalStatus: snapshot.status,
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: input.acceptedDecisions.map((item) => item.decisionId),
    blockingIssues,
    extensionRequired,
    leafCandidate,
  })

  return {
    eventId: input.eventId,
    eventName: input.eventName,
    axis: input.axis,
    status,
    traversalStatus: snapshot.status,
    pendingAuthorDecision: true,
    extensionRequired,
    blocked: false,
    blockingIssues,
    warnings,
    auditTrace,
    nextRequiredAction,
    axisSummary: buildAxisSummary({
      status,
      blockingIssues,
      extensionRequired,
      leafCandidate,
    }),
    sourceIntakeIds: input.sourceIntakeIds,
    consumedDecisionIds: input.acceptedDecisions.map((item) => item.decisionId),
    leafCandidate,
    approvedEscapePointScopeStatus: ESCAPE_POINT_SCOPE_STATUS,
    integrationFutureBlockers: [ESCAPE_POINT_SCOPE_BLOCKER],
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

    const normalizedDecision = normalizeDecision(record.authorDecision)
    if (normalizedDecision.kind === 'PENDING') {
      hasPendingDecision = true
      continue
    }

    if (normalizedDecision.kind === 'UNKNOWN') {
      blockingIssues.push(`UNKNOWN_AUTHOR_DECISION_VALUE:${normalizedDecision.normalizedValue}`)
      continue
    }

    const decision = normalizedDecision.decision

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
    warnings: buildAxisWarnings({
      blockingIssues: unique([...(axisResult.blockingIssue ? [axisResult.blockingIssue] : [])]),
      status: axisResult.status,
      extensionRequired:
        axisResult.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'NEXT_NODE_READY',
      leafCandidate: axisResult.leafCandidate,
    }),
    auditTrace: buildAxisAuditTrace({
      eventId: input.eventId,
      axis: input.axis,
      status: axisResult.status,
      traversalStatus: axisResult.traversalStep.status,
      sourceIntakeIds,
      consumedDecisionIds: axisResult.consumedDecisionIds,
      blockingIssues: unique([...(axisResult.blockingIssue ? [axisResult.blockingIssue] : [])]),
      extensionRequired:
        axisResult.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'NEXT_NODE_READY',
      leafCandidate: axisResult.leafCandidate,
    }),
    nextRequiredAction: buildNextRequiredAction({
      status: axisResult.status,
      blockingIssues: unique([...(axisResult.blockingIssue ? [axisResult.blockingIssue] : [])]),
      extensionRequired:
        axisResult.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'NEXT_NODE_READY',
      leafCandidate: axisResult.leafCandidate,
    }),
    axisSummary: buildAxisSummary({
      status: axisResult.status,
      blockingIssues: unique([...(axisResult.blockingIssue ? [axisResult.blockingIssue] : [])]),
      extensionRequired:
        axisResult.status === 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'TRAVERSAL_EXTENSION_REQUIRED' ||
        axisResult.traversalStep.status === 'NEXT_NODE_READY',
      leafCandidate: axisResult.leafCandidate,
    }),
    sourceIntakeIds,
    consumedDecisionIds: axisResult.consumedDecisionIds,
    leafCandidate: axisResult.leafCandidate,
    approvedEscapePointScopeStatus: ESCAPE_POINT_SCOPE_STATUS,
    integrationFutureBlockers: [ESCAPE_POINT_SCOPE_BLOCKER],
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
      approvedEscapePointScopeStatus: ESCAPE_POINT_SCOPE_STATUS,
      integrationFutureBlockers: [ESCAPE_POINT_SCOPE_BLOCKER],
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
    approvedEscapePointScopeStatus: ESCAPE_POINT_SCOPE_STATUS,
    integrationFutureBlockers: [ESCAPE_POINT_SCOPE_BLOCKER],
    selectedCodeAllowed: false,
    releasedCodeAllowed: false,
    poaClosureAllowed: false,
    downstreamAllowed: false,
    classificationAllowed: false,
    notFinalClassification: true,
    [FINAL_FREE_CONCLUSION_ALLOWED_KEY]: false,
  }
}
