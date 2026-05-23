import type { FactualSummary, OperationalUnsafeState, SeraVNextInput } from '../types'

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => text.includes(p))
}

export function runStep02UnsafeState(
  input: SeraVNextInput,
  factualSummary: FactualSummary
): OperationalUnsafeState {
  const t = normalizeText(input.narrative)

  const decisionAntecedents: string[] = []
  if (
    hasAny(t, ['unsuccessful because of low cloud and poor visibility', 'two instrument approaches']) &&
    hasAny(t, ['obtained visual contact', 'proceeded with a visual approach'])
  ) {
    decisionAntecedents.push(
      'After unsuccessful instrument approaches in low cloud/poor visibility, the crew transitioned to and continued a visual approach after visual contact.'
    )
  } else if (hasAny(t, ['visual approach'])) {
    decisionAntecedents.push('Crew proceeded with a visual approach in the prevailing context.')
  }

  let operationalUnsafeState: string | null = null
  const hasDegradedVisual = hasAny(t, ['degraded visual references', 'poor visibility', 'low cloud'])
  const hasLowEnergyState = hasAny(t, ['high rate of descent']) && hasAny(t, ['low airspeed'])
  const hasWarningGap = hasAny(t, ['warning system did not generate an alert', 'failed to alert'])

  if (hasDegradedVisual && hasLowEnergyState) {
    operationalUnsafeState =
      'The helicopter entered a low-airspeed/high-rate-of-descent condition below a safe approach profile in degraded visual references.'
    if (hasWarningGap) {
      operationalUnsafeState +=
        ' The available warning barrier did not provide timely alerting before recovery at very low height.'
    }
  } else if (hasLowEnergyState) {
    operationalUnsafeState =
      'The aircraft entered a low-energy unsafe approach state (low airspeed/high descent) below a safe profile.'
  } else if (factualSummary.sequence.length > 0) {
    operationalUnsafeState =
      'Operational unsafe state not fully resolved from current deterministic signals; human review required.'
  }

  let finalOutcome: string | null = null
  if (hasAny(t, ['very low height above the water', 'descent was arrested at very low height'])) {
    finalOutcome = hasAny(t, ['no injuries'])
      ? 'Recovery occurred at very low height above water, with no reported injuries.'
      : 'Recovery occurred at very low height above water.'
  }

  return {
    operationalUnsafeState,
    decisionAntecedents,
    finalOutcome,
  }
}
