import { SERA_VNEXT_ENGINE_VERSION, SERA_VNEXT_STEP_ORDER } from './constants'
import type { SeraVNextInput, SeraVNextResult } from './types'
import { runStep01FactualExtraction } from './steps/01-factual-extraction'
import { runStep02UnsafeState } from './steps/02-unsafe-state'
import { runStep03UnsafeActCondition } from './steps/03-unsafe-act-condition'
import { runStep04DirectActor } from './steps/04-direct-actor'
import { runStep05PoaStatements } from './steps/05-poa-statements'
import { runStep06PoaClassification } from './steps/06-poa-classification'
import { runStep07Preconditions } from './steps/07-preconditions'
import { runStep08Limitations } from './steps/08-limitations'
import { runStep09Recommendations } from './steps/09-recommendations'
import { runStep10CausalAssurance } from './steps/10-causal-assurance'
import { runStep11HumanReview } from './steps/11-human-review'

export async function analyzeSeraVNext(input: SeraVNextInput): Promise<SeraVNextResult> {
  const factualSummary = runStep01FactualExtraction(input)
  const unsafeState = runStep02UnsafeState(input, factualSummary)
  const unsafeActCondition = runStep03UnsafeActCondition(input, unsafeState)
  const directActor = runStep04DirectActor(input, unsafeActCondition)
  const poaStatements = runStep05PoaStatements(input, unsafeActCondition, directActor)
  const poaClassification = runStep06PoaClassification(poaStatements)
  const preconditions = runStep07Preconditions(poaClassification)
  const limitations = runStep08Limitations(input)
  const recommendations = runStep09Recommendations(poaClassification, preconditions, limitations)
  const causalAssurance = runStep10CausalAssurance(poaClassification, preconditions)
  const humanReview = runStep11HumanReview(input, causalAssurance)

  return {
    engineVersion: SERA_VNEXT_ENGINE_VERSION,
    inputId: input.inputId,
    factualSummary,
    unsafeState,
    unsafeActCondition,
    directActor,
    poaStatements,
    poaClassification,
    preconditions,
    limitations,
    recommendations,
    causalAssurance,
    humanReviewRequired: true,
    humanReview: {
      ...humanReview,
      required: true,
    },
    trace: {
      stepOrder: [...SERA_VNEXT_STEP_ORDER],
      stepStatus: Object.fromEntries(
        SERA_VNEXT_STEP_ORDER.map((stepId) => [stepId, 'stub'])
      ) as Record<string, 'stub' | 'done' | 'skipped'>,
      notes: [
        'A4+R-29 skeleton only: no LLM integration, no DB writes, no UI integration.',
        'Causal assurance status is SKELETON_NOT_VALIDATED until A4+R-34.',
      ],
    },
  }
}
