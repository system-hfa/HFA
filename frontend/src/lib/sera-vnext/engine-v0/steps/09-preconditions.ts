import type { SeraVNextEngineOutput, SeraPreconditionCandidate } from '../../engine-contract'
import type { SeraEvidenceItem, SeraEvidenceRelationshipToFailure } from '../../evidence'
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

function relationshipForEvidence(items: SeraEvidenceItem[]): SeraEvidenceRelationshipToFailure {
  if (items.some((item) => item.relationshipToFailure === 'CONTEXTUAL_PRECONDITION')) return 'CONTEXTUAL_PRECONDITION'
  if (items.some((item) => item.relationshipToFailure === 'ENABLING_PRECONDITION')) return 'ENABLING_PRECONDITION'
  if (items.some((item) => item.relationshipToFailure === 'DIRECT_ESCAPE_POINT')) return 'ENABLING_PRECONDITION'
  return 'UNRELATED_OR_UNSUPPORTED'
}

function pushEvidence(target: SeraEvidenceItem[], item: SeraEvidenceItem): void {
  if (!target.some((candidate) => candidate.evidenceId === item.evidenceId)) target.push(item)
}

export function runStep09Preconditions(input: {
  factualExtraction: SeraVNextEngineOutput['factualExtraction']
  escapePoint: SeraVNextEngineOutput['escapePoint']
  directActor: SeraVNextEngineOutput['directActor']
  axes: SeraVNextEngineOutput['axes']
}): SeraPreconditionCandidate[] {
  const categoryEvidence: Record<string, { texts: string[]; sourceEvidence: SeraEvidenceItem[] }> = {}
  const contextualEvidence = input.factualExtraction.evidence.filter(
    (item) => item.temporalRelation !== 'POST_ESCAPE' && item.supports.includes('PRECONDITION'),
  )

  for (const item of contextualEvidence) {
    const category = classifyPreconditionCategory({ text: item.statement, proposedCode: null })
    if (!category) continue
    categoryEvidence[category] ||= { texts: [], sourceEvidence: [] }
    pushUnique(categoryEvidence[category].texts, item.statement)
    pushEvidence(categoryEvidence[category].sourceEvidence, item)
  }

  return Object.entries(categoryEvidence).map(([category, evidenceSet]) => ({
    id: `PC-EVIDENCE-${category}`,
    label: `Candidate-only ${category} precondition from factual evidence.`,
    description: `Non-final ${category} precondition candidate retained separately from the escape point and active failure.`,
    category: category as SeraPreconditionCandidate['category'],
    evidence: evidenceSet.texts,
    relationship: relationshipForEvidence(evidenceSet.sourceEvidence),
    sourceEvidence: evidenceSet.sourceEvidence,
    sourceRuleIds: [CATEGORY_RULE_ID[category]],
    linkedActor: input.directActor.actor,
    explicitlyNotEscapePoint: true,
    basedOnCandidateCode: false,
    nonFinal: true,
    confidence: confidenceFromCount(evidenceSet.texts.length),
  }))
}
