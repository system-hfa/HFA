import type { SeraVNextEngineInput, SeraVNextEngineOutput } from '../../engine-contract'
import { runStep04DirectActor as runLegacyDirectActor } from '../../steps/04-direct-actor'

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((pattern) => text.includes(pattern))
}

export function runStep06DirectActor(input: {
  engineInput: SeraVNextEngineInput
  unsafeActOrCondition: SeraVNextEngineOutput['unsafeActOrCondition']
}): SeraVNextEngineOutput['directActor'] {
  const text = normalizeText(input.engineInput.narrative)
  const crewOrPilotMention = hasAny(text, ['crew', 'pilot', 'captain', 'first officer'])
  const systemDominant =
    (input.unsafeActOrCondition.type === 'UNSAFE_CONDITION' && !crewOrPilotMention) ||
    hasAny(text, ['technical condition', 'system failure', 'automation failure', 'rudder movement', 'microburst', 'windshear'])

  const legacy = runLegacyDirectActor(
    {
      inputId: input.engineInput.inputId,
      narrative: input.engineInput.narrative,
      sourceType: 'neutral_trial',
      locale: input.engineInput.locale,
    },
    {
      unsafeAct: {
        statement: input.unsafeActOrCondition.type === 'UNSAFE_ACT' ? input.unsafeActOrCondition.statement : null,
        evidence: input.unsafeActOrCondition.type === 'UNSAFE_ACT' ? input.unsafeActOrCondition.evidence : [],
        confidence: 'low',
        uncertainty: [],
        humanReviewRequired: true,
      },
      unsafeCondition: {
        statement: input.unsafeActOrCondition.type === 'UNSAFE_CONDITION' ? input.unsafeActOrCondition.statement : null,
        evidence: input.unsafeActOrCondition.type === 'UNSAFE_CONDITION' ? input.unsafeActOrCondition.evidence : [],
        confidence: 'low',
        uncertainty: [],
        humanReviewRequired: true,
      },
      dominance:
        input.unsafeActOrCondition.type === 'UNSAFE_ACT'
          ? 'unsafe_act_dominant'
          : input.unsafeActOrCondition.type === 'UNSAFE_CONDITION'
            ? 'unsafe_condition_dominant'
            : 'mixed',
    }
  )

  if (!systemDominant) {
    if (hasAny(text, ['captain decided', 'captain continued', 'captain selected', 'captain turned'])) {
      return {
        actor: 'captain',
        status: 'IDENTIFIED',
        alternatives: ['flight crew (collective)'],
        actorMigrationWarnings: [],
      }
    }
    if (hasAny(text, ['first officer decided', 'first officer continued', 'first officer selected'])) {
      return {
        actor: 'first officer',
        status: 'IDENTIFIED',
        alternatives: ['flight crew (collective)'],
        actorMigrationWarnings: [],
      }
    }
    if (
      hasAny(text, [
        'crew',
        'the crew',
        'flight crew',
        'two pilots',
        'crew continued',
        'crew lined up',
        'crew descended',
        'crew did not perceive',
      ])
    ) {
      return {
        actor: 'flight crew (collective)',
        status: 'IDENTIFIED',
        alternatives: ['captain', 'first officer', 'crew collective'],
        actorMigrationWarnings: [],
      }
    }
    if (hasAny(text, ['the pilot', 'pilot decided', 'pilot moved', 'pilot continued'])) {
      return {
        actor: 'pilot',
        status: 'IDENTIFIED',
        alternatives: ['flight crew (collective)'],
        actorMigrationWarnings: [],
      }
    }
    if (hasAny(text, ['maintenance technician', 'maintenance team', 'mechanic'])) {
      return {
        actor: 'maintenance',
        status: 'IDENTIFIED',
        alternatives: [],
        actorMigrationWarnings: [],
      }
    }
    if (hasAny(text, ['controller', 'atc', 'air traffic control'])) {
      return {
        actor: 'atc',
        status: 'IDENTIFIED',
        alternatives: [],
        actorMigrationWarnings: [],
      }
    }
  }

  if (legacy.actorKind === 'system_or_condition_dominant') {
    return {
      actor: null,
      status: 'NOT_APPLICABLE',
      alternatives: [],
      actorMigrationWarnings: [],
    }
  }

  return {
    actor: legacy.actor,
    status: legacy.actor ? 'IDENTIFIED' : 'AMBIGUOUS',
    alternatives: legacy.actorKind === 'crew_collective' ? ['captain', 'first officer', 'crew collective'] : [],
    actorMigrationWarnings:
      legacy.actorKind === 'unknown' ? ['Direct actor remains unresolved; avoid actor migration beyond available evidence.'] : [],
  }
}
