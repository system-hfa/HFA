import type { CausalAssurance, HumanReviewStatus, SeraVNextInput } from '../types'

export function runStep11HumanReview(
  _input: SeraVNextInput,
  _causalAssurance: CausalAssurance
): HumanReviewStatus {
  // TODO(A4+R-34): wire review checklist to future causal assurance outputs.
  return {
    required: true,
    rationale: 'Skeleton phase requires mandatory human review before any methodological interpretation.',
    checklist: [
      'Confirm operational unsafe state is explicit and evidence-based.',
      'Confirm decision antecedents are separated from unsafe state.',
      'Confirm P/O/A classification is validated in future phases.',
      'Confirm no downstream HFACS or Risk/ERC usage in causal core.',
    ],
  }
}
