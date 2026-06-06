import type { SeraVNextEngineOutput, SeraPreconditionCandidate } from '../../engine-contract'
import { classifyPreconditionCategory, confidenceFromCount, pushUnique } from '../utils'

const CATEGORY_RULE_ID: Record<string, string> = {
  PHYSICAL_CAPABILITY: 'PC-RULE-PHYSICAL_CAPABILITY',
  SENSORY_LIMITATION: 'PC-RULE-SENSORY_LIMITATION',
  KNOWLEDGE_TRAINING: 'PC-RULE-KNOWLEDGE_TRAINING',
  TIME_PRESSURE: 'PC-RULE-TIME_PRESSURE',
  COMMUNICATION_INFORMATION: 'PC-RULE-COMMUNICATION_INFORMATION',
  PROCEDURAL_MONITORING: 'PC-RULE-PROCEDURAL_MONITORING',
  FEEDBACK_VERIFICATION: 'PC-RULE-FEEDBACK_VERIFICATION',
  INTENT_AWARENESS: 'PC-RULE-INTENT_AWARENESS',
  TEAM_COORDINATION: 'PC-RULE-TEAM_COORDINATION',
  ENVIRONMENTAL_CONTEXT: 'PC-RULE-ENVIRONMENTAL_CONTEXT',
  TECHNICAL_CONTEXT: 'PC-RULE-TECHNICAL_CONTEXT',
  ORGANIZATIONAL_CONTEXT: 'PC-RULE-ORGANIZATIONAL_CONTEXT',
}

export function runStep09Preconditions(input: {
  factualExtraction: SeraVNextEngineOutput['factualExtraction']
  escapePoint: SeraVNextEngineOutput['escapePoint']
  directActor: SeraVNextEngineOutput['directActor']
  axes: SeraVNextEngineOutput['axes']
}): SeraPreconditionCandidate[] {
  const candidates: SeraPreconditionCandidate[] = []
  const sourceTexts = input.factualExtraction.facts
    .filter((fact) => ['condition', 'environment', 'warning', 'decision', 'cue'].includes(fact.category))
    .map((fact) => fact.statement)

  for (const [axisName, axis] of Object.entries(input.axes) as Array<[string, SeraVNextEngineOutput['axes'][keyof SeraVNextEngineOutput['axes']]]>) {
    const evidence = [...axis.supportingEvidence, ...axis.counterEvidence].slice(0, 3)
    const categoryEvidence: Record<string, string[]> = {}

    for (const text of [...sourceTexts, ...evidence]) {
      const category = classifyPreconditionCategory({ text, proposedCode: axis.proposedCode })
      if (!category) continue
      categoryEvidence[category] ||= []
      pushUnique(categoryEvidence[category], text)
    }

    for (const [category, items] of Object.entries(categoryEvidence)) {
      candidates.push({
        id: `PC-${axisName.toUpperCase()}-${category}`,
        label: `Candidate-only precondition for ${axisName} derived from contextual evidence.`,
        category: category as SeraPreconditionCandidate['category'],
        evidence: items,
        sourceRuleIds: [CATEGORY_RULE_ID[category]],
        linkedActor: input.directActor.actor,
        explicitlyNotEscapePoint: true,
        basedOnCandidateCode: true,
        nonFinal: true,
        confidence: confidenceFromCount(items.length),
      })
    }
  }

  return candidates
}
