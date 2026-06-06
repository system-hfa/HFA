import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'

export function semanticNormalize(output: SeraVNextEngineOutput) {
  return {
    escapePointStatus: output.escapePoint.status,
    directActor: output.directActor.actor,
    pCode: output.axes.perception.proposedCode,
    oCode: output.axes.objective.proposedCode,
    aCode: output.axes.action.proposedCode,
    unansweredQuestions: output.canonicalTraversal.unansweredQuestions,
    uncertainties: output.uncertainties,
    preconditionCategories: output.preconditions.map((item) => item.category).sort(),
    excludedPostEscapeEvidence: output.escapePoint.excludedPostEscapeEvidence,
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
