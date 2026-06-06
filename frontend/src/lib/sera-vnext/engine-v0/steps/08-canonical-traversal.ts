import { assertCanonicalSeraLeafCode } from '../../canonical-codes'
import {
  buildCanonicalPathForLeaf,
  collectAxisUnansweredQuestions,
  SERA_PT_V1_TREE,
  validateCanonicalTree,
} from '../../canonical-tree/index'
import type { SeraAxisCandidate, SeraCanonicalPath, SeraVNextEngineInput, SeraVNextEngineOutput } from '../../engine-contract'
import { confidenceFromCount, hasAny, normalizeText } from '../utils'

validateCanonicalTree(SERA_PT_V1_TREE)

function inferPerceptionCode(text: string): string | null {
  if (hasAny(text, ['does not establish', 'not established', 'not clearly established', 'unclear whether'])) return null
  if (hasAny(text, ['recognized the warning in time', 'noticed the warning in time', 'recognized the trend in time'])) return 'P-A'
  if (hasAny(text, ['communication failure', 'misheard', 'readback'])) return 'P-H'
  if (hasAny(text, ['distraction', 'workload', 'attention saturation', 'fixation', 'rushed'])) return 'P-D'
  if (hasAny(text, ['monitoring gap', 'cross-check', 'verification missing'])) return 'P-G'
  if (hasAny(text, ['unfamiliar', 'training', 'knowledge gap'])) return 'P-C'
  if (hasAny(text, ['visibility', 'fog', 'night', 'degraded visual', 'did not see', 'failed to notice'])) return 'P-B'
  if (hasAny(text, ['warning', 'cue', 'visual', 'instrument'])) return 'P-A'
  return null
}

function inferObjectiveCode(text: string): string | null {
  if (hasAny(text, ['discontinued the approach', 'executed a go-around', 'aborted the takeoff', 'preserving safe separation'])) return 'O-A'
  if (hasAny(text, ['does not establish', 'not established', 'not clearly established', 'unclear whether'])) return null
  if (hasAny(text, ['schedule pressure', 'save time', 'expedite', 'hurry'])) return 'O-D'
  if (hasAny(text, ['knowingly', 'deliberately', 'intentionally', 'consciously'])) return 'O-C'
  if (hasAny(text, ['despite warning', 'continued', 'wrong runway', 'pressed on', 'continued approach'])) return 'O-B'
  if (hasAny(text, ['goal', 'planned', 'intended', 'stabilized'])) return 'O-A'
  return null
}

function inferActionCode(text: string): string | null {
  if (hasAny(text, ['executed a go-around', 'discontinued the approach', 'aborted the takeoff', 'prompt correction'])) return 'A-A'
  if (hasAny(text, ['does not establish', 'not established', 'not clearly established', 'unclear whether'])) return null
  if (hasAny(text, ['readback', 'callout', 'communication breakdown'])) return 'A-J'
  if (hasAny(text, ['time pressure', 'rushed sequence', 'late decision'])) return 'A-H'
  if (hasAny(text, ['selected wrong', 'wrong runway', 'wrong mode'])) return 'A-I'
  if (hasAny(text, ['unable physically', 'ergonomic', 'could not reach', 'physical limitation'])) return 'A-D'
  if (hasAny(text, ['training', 'skill', 'unfamiliar'])) return 'A-E'
  if (hasAny(text, ['failed to monitor', 'did not verify', 'no feedback', 'late correction'])) return 'A-C'
  if (hasAny(text, ['technical dominant', 'system failure only', 'no human escape point'])) return 'A-A'
  if (hasAny(text, ['continued', 'descended', 'turned', 'configured'])) return 'A-C'
  return null
}

function candidateStatus(code: string | null): SeraAxisCandidate['status'] {
  if (!code) return 'INSUFFICIENT_EVIDENCE'
  if (['P-A', 'O-A', 'A-A'].includes(code)) return 'NO_FAILURE'
  return 'CANDIDATE'
}

function buildAxisCandidate(input: {
  axis: 'P' | 'O' | 'A'
  statement: string | null
  actor: string | null
  supportingEvidence: string[]
  counterEvidence: string[]
  excludedPostEscapeEvidence: string[]
  proposedCode: string | null
}): { axisCandidate: SeraAxisCandidate; path: SeraCanonicalPath; unansweredQuestions: string[] } {
  const unresolvedPath: SeraCanonicalPath = {
    axis: input.axis,
    candidateCode: null,
    status: input.supportingEvidence.length ? 'PARTIAL' : 'INSUFFICIENT_EVIDENCE',
    nodeIds: [],
    questionPath: [],
    answers: [],
  }

  if (!input.proposedCode) {
    return {
      axisCandidate: {
        axis: input.axis,
        proposedCode: null,
        status: input.supportingEvidence.length ? 'UNRESOLVED' : 'INSUFFICIENT_EVIDENCE',
        actor: input.actor,
        statementAtEscapePoint: input.statement,
        supportingEvidence: input.supportingEvidence,
        counterEvidence: input.counterEvidence,
        excludedPostEscapeEvidence: input.excludedPostEscapeEvidence,
        alternativesConsidered: [],
        canonicalPath: [],
        confidence: confidenceFromCount(input.supportingEvidence.length),
      },
      path: unresolvedPath,
      unansweredQuestions: collectAxisUnansweredQuestions({ tree: SERA_PT_V1_TREE, axis: input.axis }),
    }
  }

  const leafCode = assertCanonicalSeraLeafCode(input.axis, input.proposedCode)
  const trace = buildCanonicalPathForLeaf({
    tree: SERA_PT_V1_TREE,
    axis: input.axis,
    leafCode,
  })

  return {
    axisCandidate: {
      axis: input.axis,
      proposedCode: leafCode,
      status: candidateStatus(leafCode),
      actor: input.actor,
      statementAtEscapePoint: input.statement,
      supportingEvidence: input.supportingEvidence,
      counterEvidence: input.counterEvidence,
      excludedPostEscapeEvidence: input.excludedPostEscapeEvidence,
      alternativesConsidered: [],
      canonicalPath: trace.map((item: (typeof trace)[number]) => item.nodeId),
      confidence: confidenceFromCount(input.supportingEvidence.length),
    },
    path: {
      axis: input.axis,
      candidateCode: leafCode,
      status: 'COMPLETED_CANDIDATE_ONLY',
      nodeIds: trace.map((item: (typeof trace)[number]) => item.nodeId),
      questionPath: trace.map((item: (typeof trace)[number]) => item.question),
      answers: trace,
    },
    unansweredQuestions: [],
  }
}

export function runStep08CanonicalTraversal(input: {
  engineInput: SeraVNextEngineInput
  axisStatements: {
    perception: { statement: string | null; supportingEvidence: string[]; counterEvidence: string[] }
    objective: { statement: string | null; supportingEvidence: string[]; counterEvidence: string[] }
    action: { statement: string | null; supportingEvidence: string[]; counterEvidence: string[] }
  }
  directActor: SeraVNextEngineOutput['directActor']
  escapePoint: SeraVNextEngineOutput['escapePoint']
}): {
  axes: SeraVNextEngineOutput['axes']
  canonicalTraversal: SeraVNextEngineOutput['canonicalTraversal']
} {
  const text = normalizeText(input.engineInput.narrative)
  const perception = buildAxisCandidate({
    axis: 'P',
    statement: input.axisStatements.perception.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.perception.supportingEvidence,
    counterEvidence: input.axisStatements.perception.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    proposedCode: inferPerceptionCode(text),
  })
  const objective = buildAxisCandidate({
    axis: 'O',
    statement: input.axisStatements.objective.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.objective.supportingEvidence,
    counterEvidence: input.axisStatements.objective.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    proposedCode: inferObjectiveCode(text),
  })
  const action = buildAxisCandidate({
    axis: 'A',
    statement: input.axisStatements.action.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.action.supportingEvidence,
    counterEvidence: input.axisStatements.action.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    proposedCode: inferActionCode(text),
  })

  const paths = [perception.path, objective.path, action.path]
  const unansweredQuestions = [
    ...perception.unansweredQuestions,
    ...objective.unansweredQuestions,
    ...action.unansweredQuestions,
  ]

  return {
    axes: {
      perception: perception.axisCandidate,
      objective: objective.axisCandidate,
      action: action.axisCandidate,
    },
    canonicalTraversal: {
      status: paths.every((path) => path.status === 'COMPLETED_CANDIDATE_ONLY')
        ? 'COMPLETED_CANDIDATE_ONLY'
        : paths.some((path) => path.status === 'PARTIAL')
          ? 'PARTIAL'
          : 'INSUFFICIENT_EVIDENCE',
      paths,
      unansweredQuestions,
    },
  }
}
