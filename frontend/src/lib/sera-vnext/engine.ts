import { SERA_VNEXT_ENGINE_VERSION, SERA_VNEXT_STEP_ORDER } from './constants'
import type { PoaClassification, SeraVNextInput, SeraVNextResult } from './types'
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

function forceNotClassified(poa: PoaClassification): PoaClassification {
  return {
    perception: {
      ...poa.perception,
      selectedCode: 'NOT_CLASSIFIED',
      confidence: 'low',
      rejectionReason: 'P/O/A classification intentionally deferred in A4+R-30.',
      humanReviewRequired: true,
    },
    objective: {
      ...poa.objective,
      selectedCode: 'NOT_CLASSIFIED',
      confidence: 'low',
      rejectionReason: 'P/O/A classification intentionally deferred in A4+R-30.',
      humanReviewRequired: true,
    },
    action: {
      ...poa.action,
      selectedCode: 'NOT_CLASSIFIED',
      confidence: 'low',
      rejectionReason: 'P/O/A classification intentionally deferred in A4+R-30.',
      humanReviewRequired: true,
    },
  }
}

export async function analyzeSeraVNext(input: SeraVNextInput): Promise<SeraVNextResult> {
  const factualSummary = runStep01FactualExtraction(input)
  const unsafeState = runStep02UnsafeState(input, factualSummary)
  const unsafeActCondition = runStep03UnsafeActCondition(input, unsafeState)
  const directActor = runStep04DirectActor(input, unsafeActCondition)
  const poaStatements = runStep05PoaStatements(input, unsafeActCondition, directActor)
  const poaClassification = forceNotClassified(runStep06PoaClassification(poaStatements))
  const preconditions = runStep07Preconditions(poaClassification)
  const limitations = runStep08Limitations(input)
  const recommendations = runStep09Recommendations(poaClassification, preconditions, limitations)
  const causalAssurance = runStep10CausalAssurance({
    factualSummary,
    unsafeState,
    unsafeActCondition,
    limitations,
    poaClassification,
    preconditions,
  })
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
      stepStatus: {
        '01-factual-extraction': 'done',
        '02-unsafe-state': 'done',
        '03-unsafe-act-condition': 'done',
        '04-direct-actor': 'stub',
        '05-poa-statements': 'stub',
        '06-poa-classification': 'stub',
        '07-preconditions': 'stub',
        '08-limitations': 'stub',
        '09-recommendations': 'stub',
        '10-causal-assurance': 'done',
        '11-human-review': 'done',
      },
      notes: [
        'A4+R-30 implements deterministic minimum logic for steps 1-3.',
        'P/O/A remains NOT_CLASSIFIED in this phase by design.',
        'No DB writes, no UI integration, no legacy engine import, no HFACS/Risk/ERC output.',
      ],
    },
  }
}
