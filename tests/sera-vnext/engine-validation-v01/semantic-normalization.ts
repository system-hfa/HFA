import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'

export function semanticNormalize(output: SeraVNextEngineOutput) {
  return {
    escapePointStatus: output.escapePoint.status,
    directActor: output.directActor.actor,
    pStatus: output.axes.perception.status,
    pCode: output.axes.perception.proposedCode,
    oStatus: output.axes.objective.status,
    oCode: output.axes.objective.proposedCode,
    aStatus: output.axes.action.status,
    aCode: output.axes.action.proposedCode,
    unansweredQuestions: output.canonicalTraversal.unansweredQuestions,
    uncertainties: output.uncertainties,
    preconditionCategories: output.preconditions.map((item) => item.category).sort(),
    preconditionRelationships: output.preconditions.map((item) => `${item.category}:${item.relationship}`).sort(),
    excludedPostEscapeEvidence: output.escapePoint.excludedPostEscapeEvidence,
    canonicalAnswers: output.canonicalTraversal.paths.flatMap((path) => path.answers.map((answer) => `${answer.nodeId}:${answer.answer}:${answer.terminalCode ?? ''}`)),
    guardrails: output.guardrails,
    blockedFields: {
      selectedCode: output.selectedCode,
      releasedCode: output.releasedCode,
      finalConclusion: output.finalConclusion,
      classifiedOutput: output.classifiedOutput,
      readyPromotion: output.readyPromotion,
      downstreamAllowed: output.downstreamAllowed,
    },
  }
}
