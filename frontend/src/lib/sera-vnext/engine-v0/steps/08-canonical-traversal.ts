import {
  runEvidenceTraversal,
  SERA_PT_V1_TREE,
  validateCanonicalTree,
} from '../../canonical-tree/index'
import type { SeraAxisCandidate, SeraCanonicalPath, SeraVNextEngineOutput } from '../../engine-contract'
import type { SeraEvidenceItem } from '../../evidence'
import { axisToEvidenceUse, isEvidenceUsableFor } from '../../evidence'
import type { CanonicalSeraAxis } from '../../types'
import { confidenceFromCount } from '../utils'

validateCanonicalTree(SERA_PT_V1_TREE)

function unique(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))]
}

function axisEvidence(args: {
  axis: CanonicalSeraAxis
  evidence: SeraEvidenceItem[]
  supplementalEvidence: string[]
}): string[] {
  const use = axisToEvidenceUse(args.axis)
  return unique([
    ...args.evidence.filter((item) => isEvidenceUsableFor(item, use)).map((item) => item.statement),
    ...args.supplementalEvidence,
  ])
}

function buildAxisCandidate(input: {
  axis: CanonicalSeraAxis
  statement: string | null
  actor: string | null
  supportingEvidence: string[]
  counterEvidence: string[]
  excludedPostEscapeEvidence: string[]
  evidence: SeraEvidenceItem[]
}): { axisCandidate: SeraAxisCandidate; path: SeraCanonicalPath; unansweredQuestions: string[] } {
  const traversal = runEvidenceTraversal({
    axis: input.axis,
    statementAtEscapePoint: input.statement,
    evidence: input.evidence,
  })

  const traversalSupport = unique(traversal.path.answers.flatMap((answer) => answer.supportingEvidence ?? []))
  const traversalCounter = unique(traversal.path.answers.flatMap((answer) => answer.counterEvidence ?? []))
  const supportingEvidence = axisEvidence({
    axis: input.axis,
    evidence: input.evidence,
    supplementalEvidence: traversalSupport.length ? traversalSupport : input.supportingEvidence,
  })
  const counterEvidence = unique([...input.counterEvidence, ...traversalCounter])

  return {
    axisCandidate: {
      axis: input.axis,
      proposedCode: traversal.candidateCode,
      status: traversal.status,
      actor: input.actor,
      statementAtEscapePoint: input.statement,
      supportingEvidence,
      counterEvidence,
      excludedPostEscapeEvidence: input.excludedPostEscapeEvidence,
      alternativesConsidered: traversal.path.answers.map((answer) => `${answer.nodeId}:${answer.answer}`),
      canonicalPath: traversal.path.nodeIds,
      confidence: confidenceFromCount(supportingEvidence.length),
    },
    path: traversal.path,
    unansweredQuestions: traversal.unansweredQuestions,
  }
}

export function runStep08CanonicalTraversal(input: {
  factualExtraction: SeraVNextEngineOutput['factualExtraction']
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
  const perception = buildAxisCandidate({
    axis: 'P',
    statement: input.axisStatements.perception.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.perception.supportingEvidence,
    counterEvidence: input.axisStatements.perception.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    evidence: input.factualExtraction.evidence,
  })
  const objective = buildAxisCandidate({
    axis: 'O',
    statement: input.axisStatements.objective.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.objective.supportingEvidence,
    counterEvidence: input.axisStatements.objective.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    evidence: input.factualExtraction.evidence,
  })
  const action = buildAxisCandidate({
    axis: 'A',
    statement: input.axisStatements.action.statement,
    actor: input.directActor.actor,
    supportingEvidence: input.axisStatements.action.supportingEvidence,
    counterEvidence: input.axisStatements.action.counterEvidence,
    excludedPostEscapeEvidence: input.escapePoint.excludedPostEscapeEvidence,
    evidence: input.factualExtraction.evidence,
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
