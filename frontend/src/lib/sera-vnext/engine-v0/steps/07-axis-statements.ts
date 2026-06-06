import type { SeraVNextEngineInput, SeraVNextEngineOutput } from '../../engine-contract'
import { runStep05PoaStatements as runLegacyPoaStatements } from '../../steps/05-poa-statements'

export type SeraAxisStatementBundle = {
  perception: {
    statement: string | null
    supportingEvidence: string[]
    counterEvidence: string[]
    alternativesConsidered: string[]
  }
  objective: {
    statement: string | null
    supportingEvidence: string[]
    counterEvidence: string[]
    alternativesConsidered: string[]
  }
  action: {
    statement: string | null
    supportingEvidence: string[]
    counterEvidence: string[]
    alternativesConsidered: string[]
  }
}

export function runStep07AxisStatements(input: {
  engineInput: SeraVNextEngineInput
  directActor: SeraVNextEngineOutput['directActor']
  unsafeActOrCondition: SeraVNextEngineOutput['unsafeActOrCondition']
}): SeraAxisStatementBundle {
  const legacy = runLegacyPoaStatements(
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
    },
    {
      actor: input.directActor.actor,
      actorKind: input.directActor.status === 'NOT_APPLICABLE' ? 'system_or_condition_dominant' : 'unknown',
      confidence: 'low',
      evidence: [],
      uncertainty: input.directActor.actorMigrationWarnings,
      humanReviewRequired: true,
    }
  )

  return {
    perception: {
      statement: legacy.perceptionStatement,
      supportingEvidence: legacy.evidenceForEach.perception,
      counterEvidence: legacy.uncertaintyForEach.perception,
      alternativesConsidered: ['P-A', 'P-B', 'P-C', 'P-D', 'P-G', 'P-H'],
    },
    objective: {
      statement: legacy.objectiveStatement,
      supportingEvidence: legacy.evidenceForEach.objective,
      counterEvidence: legacy.uncertaintyForEach.objective,
      alternativesConsidered: ['O-A', 'O-B', 'O-C', 'O-D'],
    },
    action: {
      statement: legacy.actionStatement,
      supportingEvidence: legacy.evidenceForEach.action,
      counterEvidence: legacy.uncertaintyForEach.action,
      alternativesConsidered: ['A-A', 'A-C', 'A-D', 'A-E', 'A-H', 'A-I', 'A-J'],
    },
  }
}
