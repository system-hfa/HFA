import type {
  OperationalUnsafeState,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
  UnsafeActConditionDominance,
} from '../types'

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => text.includes(p))
}

function confidenceFromEvidence(size: number): 'low' | 'medium' | 'high' {
  if (size >= 3) return 'high'
  if (size === 2) return 'medium'
  return 'low'
}

function buildUncertainty(text: string): string[] {
  const uncertainty: string[] = []
  if (hasAny(text, ['which pilot was flying', 'pilot flying'])) uncertainty.push('PF role is not fully established.')
  if (hasAny(text, ['which pilot was monitoring', 'pilot monitoring'])) uncertainty.push('PM role is not fully established.')
  if (hasAny(text, ['exact callouts'])) uncertainty.push('Exact callouts are not fully established.')
  if (hasAny(text, ['precise timing of recognition', 'exact timing of recognition'])) {
    uncertainty.push('Timing of recognition/correction is not fully established.')
  }
  if (hasAny(text, ['exact control inputs'])) {
    uncertainty.push('Exact control inputs are not fully established.')
  }
  return uncertainty
}

export function runStep03UnsafeActCondition(
  input: SeraVNextInput,
  unsafeState: OperationalUnsafeState
): UnsafeActConditionAnalysis {
  const t = normalizeText(input.narrative)

  const unsafeActEvidence: string[] = []
  const unsafeConditionEvidence: string[] = []
  const uncertainty = buildUncertainty(t)

  if (hasAny(t, ['proceeded with a visual approach', 'continued visual approach', 'crew proceeded'])) {
    unsafeActEvidence.push('Crew proceeded with visual approach after visual contact.')
  }
  if (hasAny(t, ['unsuccessful instrument approaches', 'low cloud and poor visibility'])) {
    unsafeActEvidence.push('Visual continuation followed unsuccessful instrument attempts in degraded weather.')
  }

  if (hasAny(t, ['degraded visual references', 'low cloud', 'poor visibility'])) {
    unsafeConditionEvidence.push('Degraded visual-reference environment (low cloud/poor visibility).')
  }
  if (hasAny(t, ['high rate of descent']) && hasAny(t, ['low airspeed'])) {
    unsafeConditionEvidence.push('Aircraft entered low-airspeed/high-rate-of-descent unsafe state.')
  }
  if (hasAny(t, ['warning system did not generate an alert', 'failed to alert'])) {
    unsafeConditionEvidence.push('Warning/alert barrier did not provide timely alert.')
  }

  const unsafeActStatement = unsafeActEvidence.length
    ? 'Crew proceeded/continued visual approach in a degraded visual-reference context after unsuccessful instrument attempts.'
    : null

  const unsafeConditionStatement = unsafeConditionEvidence.length
    ? 'Unsafe condition included degraded visual references, low-energy approach state, and reduced warning-barrier effectiveness.'
    : unsafeState.operationalUnsafeState

  const dominance: UnsafeActConditionDominance = (() => {
    if (!unsafeActEvidence.length && !unsafeConditionEvidence.length) return 'insufficient_evidence'
    if (unsafeConditionEvidence.length >= 2 && unsafeActEvidence.length <= 1) return 'unsafe_condition_dominant'
    if (unsafeActEvidence.length >= 2 && unsafeConditionEvidence.length <= 1) return 'unsafe_act_dominant'
    return 'mixed'
  })()

  return {
    unsafeAct: {
      statement: unsafeActStatement,
      evidence: unsafeActEvidence,
      confidence: confidenceFromEvidence(unsafeActEvidence.length),
      uncertainty,
      humanReviewRequired: true,
    },
    unsafeCondition: {
      statement: unsafeConditionStatement,
      evidence: unsafeConditionEvidence,
      confidence: confidenceFromEvidence(unsafeConditionEvidence.length),
      uncertainty,
      humanReviewRequired: true,
    },
    dominance,
  }
}
