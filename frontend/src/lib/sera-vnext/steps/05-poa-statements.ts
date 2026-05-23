import type {
  DirectActorAnalysis,
  PoaStatements,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
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

export function runStep05PoaStatements(
  input: SeraVNextInput,
  unsafeActCondition: UnsafeActConditionAnalysis,
  directActor: DirectActorAnalysis
): PoaStatements {
  const t = normalizeText(input.narrative)

  const perceptionEvidence: string[] = []
  const objectiveEvidence: string[] = []
  const actionEvidence: string[] = []

  const perceptionUncertainty: string[] = []
  const objectiveUncertainty: string[] = []
  const actionUncertainty: string[] = []

  if (hasAny(t, ['aircraft instruments', 'flight instruments'])) {
    perceptionEvidence.push('Instrument cues were available in the narrative context.')
  }
  if (hasAny(t, ['visual contact', 'visual references'])) {
    perceptionEvidence.push('Visual-reference cues were present but context-dependent.')
  }
  if (hasAny(t, ['high rate of descent', 'low airspeed'])) {
    perceptionEvidence.push('Energy-state cues were observable (airspeed/descent profile).')
  }
  if (hasAny(t, ['warning system did not generate an alert', 'failed to alert'])) {
    perceptionEvidence.push('Warning barrier did not provide alerting support in the relevant envelope.')
  }
  if (hasAny(t, ['degraded visual references', 'poor visibility', 'low cloud'])) {
    perceptionUncertainty.push('Visual cue quality was degraded by weather/reference conditions.')
  }
  if (hasAny(t, ['precise timing of recognition', 'exact timing of recognition'])) {
    perceptionUncertainty.push('Exact recognition timing is not established in the neutral input.')
  }

  if (hasAny(t, ['proceeded with a visual approach', 'continued visual approach'])) {
    objectiveEvidence.push('Approach continuation after visual contact is observable in the sequence.')
  }
  if (hasAny(t, ['unsuccessful because of low cloud and poor visibility', 'two instrument approaches'])) {
    objectiveEvidence.push('Continuation context followed unsuccessful instrument approaches in degraded conditions.')
  }
  objectiveUncertainty.push('Available evidence suggests continuation context, but direct intent framing is not explicitly established.')
  objectiveUncertainty.push('No direct support for explicit conscious non-compliance framing in neutral input.')

  if (hasAny(t, ['proceeded with a visual approach', 'visual approach began'])) {
    actionEvidence.push('Visual approach continuation is explicitly observed in the narrative.')
  }
  if (hasAny(t, ['descent was arrested at very low height', 'recovery occurred'])) {
    actionEvidence.push('A recovery action sequence is observed at very low height.')
  }
  if (hasAny(t, ['exact control inputs'])) {
    actionUncertainty.push('Exact control-input sequence is not established.')
  }
  if (hasAny(t, ['low airspeed', 'high rate of descent'])) {
    actionUncertainty.push('Low-airspeed/high-descent state is an aircraft condition and is not directly equivalent to action-quality determination.')
  }
  actionUncertainty.push('No explicit evidence of physical inability is present in this neutral input.')

  if (directActor.humanReviewRequired) {
    objectiveUncertainty.push('Direct-actor assignment remains under human review.')
    actionUncertainty.push('Direct-actor assignment uncertainty limits action attribution precision.')
  }

  const perceptionStatement =
    'Available evidence suggests that instrument, visual-reference, and energy-state cues were present; however, visual references were degraded and warning-barrier support was limited, while exact recognition timing remains uncertain.'

  const objectiveStatement =
    'Available evidence suggests an operational goal context of approach continuation after visual contact following unsuccessful instrument attempts; direct evidence of specific conscious intent framing is insufficient in the neutral input.'

  const actionStatement =
    'Available evidence suggests visual-approach continuation with subsequent recovery at very low height; exact control inputs are not established, and the observed low-airspeed/high-descent condition is treated as aircraft state rather than direct action-quality determination.'

  return {
    perceptionStatement,
    objectiveStatement,
    actionStatement,
    evidenceForEach: {
      perception: perceptionEvidence,
      objective: objectiveEvidence,
      action: actionEvidence,
    },
    uncertaintyForEach: {
      perception: perceptionUncertainty,
      objective: objectiveUncertainty,
      action: actionUncertainty,
    },
    statementMeta: {
      perception: {
        confidence: confidenceFromEvidence(perceptionEvidence.length),
        humanReviewRequired: true,
      },
      objective: {
        confidence: confidenceFromEvidence(objectiveEvidence.length),
        humanReviewRequired: true,
      },
      action: {
        confidence: confidenceFromEvidence(actionEvidence.length),
        humanReviewRequired: true,
      },
    },
  }
}
