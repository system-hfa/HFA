import type {
  DirectActorAnalysis,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
} from '../types'

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => text.includes(p))
}

function pushUnique(target: string[], value: string): void {
  if (!target.includes(value)) target.push(value)
}

export function runStep04DirectActor(
  input: SeraVNextInput,
  unsafeActCondition: UnsafeActConditionAnalysis
): DirectActorAnalysis {
  const t = normalizeText(input.narrative)
  const evidence: string[] = []
  const uncertainty: string[] = []

  const pfOrPmExplicitlyMissing = hasAny(t, [
    'which pilot was flying',
    'which pilot was monitoring',
    'pilot flying / pilot monitoring roles',
    'precise pilot flying / pilot monitoring roles',
  ])

  const crewMentioned = hasAny(t, ['crew', 'two pilots'])
  const multiActorSignal = hasAny(t, ['first officer', 'captain', 'two crew members'])
  const systemDominantSignal =
    unsafeActCondition.dominance === 'unsafe_condition_dominant' ||
    unsafeActCondition.unsafeCondition.evidence.length > unsafeActCondition.unsafeAct.evidence.length

  if (pfOrPmExplicitlyMissing) {
    pushUnique(uncertainty, 'Direct PF/PM assignment is not established in the neutral input.')
  }
  if (hasAny(t, ['exact callouts', 'exact control inputs', 'precise timing of recognition'])) {
    pushUnique(uncertainty, 'Detailed execution attribution (callouts/timing/inputs) is incomplete.')
  }

  if (multiActorSignal && !pfOrPmExplicitlyMissing) {
    evidence.push('Multiple crew roles are explicitly present in the narrative.')
    return {
      actor: 'multiple crew actors',
      actorKind: 'multi_actor',
      confidence: 'low',
      evidence,
      uncertainty,
      humanReviewRequired: true,
    }
  }

  if (crewMentioned && unsafeActCondition.unsafeAct.evidence.length > 0 && !systemDominantSignal) {
    evidence.push('Narrative references collective crew action in approach continuation context.')
    if (pfOrPmExplicitlyMissing) {
      uncertainty.push('Crew-level attribution is used to avoid unsupported PF/PM assignment.')
    }
    return {
      actor: 'flight crew (collective)',
      actorKind: 'crew_collective',
      confidence: 'low',
      evidence,
      uncertainty,
      humanReviewRequired: true,
    }
  }

  if (systemDominantSignal && unsafeActCondition.unsafeAct.evidence.length === 0) {
    evidence.push('Unsafe-condition evidence is dominant over explicit human-action evidence.')
    return {
      actor: null,
      actorKind: 'system_or_condition_dominant',
      confidence: 'low',
      evidence,
      uncertainty,
      humanReviewRequired: true,
    }
  }

  return {
    actor: null,
    actorKind: 'unknown',
    confidence: 'low',
    evidence,
    uncertainty: uncertainty.length
      ? uncertainty
      : ['Direct actor is not determined with current evidence granularity.'],
    humanReviewRequired: true,
  }
}
