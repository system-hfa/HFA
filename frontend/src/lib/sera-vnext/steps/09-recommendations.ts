import type { Limitation, PoaClassification, PreconditionsAnalysis, Recommendation } from '../types'

export function runStep09Recommendations(
  _poaClassification: PoaClassification,
  _preconditions: PreconditionsAnalysis,
  _limitations: Limitation[]
): Recommendation[] {
  // TODO(A4+R-33): produce recommendations only from validated causal findings.
  return [
    {
      id: 'REC-SKELETON-001',
      statement: 'Perform human review before any operational use of this skeleton output.',
      linkedFinding: 'SKELETON_NOT_VALIDATED',
      confidence: 'low',
      scopeLimit: 'Applies only to scaffold verification in A4+R-29.',
    },
  ]
}
