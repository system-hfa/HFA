import type { PoaAxisClassification, PoaClassification, PoaStatements } from '../types'

function buildStubAxis(axis: PoaAxisClassification['axis'], code: string): PoaAxisClassification {
  return {
    axis,
    selectedCode: code,
    confidence: 'low',
    evidence: [],
    alternativesConsidered: [],
    rejectionReason: 'Skeleton classifier: deterministic/LLM classification not implemented yet',
    humanReviewRequired: true,
  }
}

export function runStep06PoaClassification(_poaStatements: PoaStatements): PoaClassification {
  // TODO(A4+R-32): replace placeholder neutral codes with validated classifier.
  return {
    perception: buildStubAxis('perception', 'P-A'),
    objective: buildStubAxis('objective', 'O-A'),
    action: buildStubAxis('action', 'A-A'),
  }
}
