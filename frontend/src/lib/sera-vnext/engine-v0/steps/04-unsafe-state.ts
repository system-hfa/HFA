import type { SeraVNextEngineInput, SeraVNextEngineOutput } from '../../engine-contract'
import { runStep02UnsafeState as runLegacyUnsafeState } from '../../steps/02-unsafe-state'

export function runStep04UnsafeState(input: {
  engineInput: SeraVNextEngineInput
  factualExtraction: SeraVNextEngineOutput['factualExtraction']
}): SeraVNextEngineOutput['unsafeState'] {
  const legacy = runLegacyUnsafeState(
    {
      inputId: input.engineInput.inputId,
      narrative: input.engineInput.narrative,
      sourceType: 'neutral_trial',
      locale: input.engineInput.locale,
    },
    {
      actors: [],
      aircraftOrSystem: [],
      operationType: null,
      phase: null,
      location: null,
      sequence: input.factualExtraction.timeline.map((item) => item.statement),
      environment: input.factualExtraction.facts.filter((fact) => fact.category === 'environment').map((fact) => fact.statement),
      availableCues: input.factualExtraction.facts.filter((fact) => fact.category === 'cue').map((fact) => fact.statement),
      availableBarriers: input.factualExtraction.facts.filter((fact) => fact.category === 'warning').map((fact) => fact.statement),
      missingData: [],
    }
  )

  return {
    statement: legacy.operationalUnsafeState,
    evidence: [
      ...legacy.decisionAntecedents,
      ...input.factualExtraction.facts.filter((fact) => fact.category === 'condition').slice(0, 3).map((fact) => fact.statement),
    ].filter(Boolean),
  }
}
