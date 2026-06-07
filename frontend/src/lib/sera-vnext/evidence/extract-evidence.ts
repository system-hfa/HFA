import type { SeraFact, SeraTimelineItem } from '../engine-contract'
import { confidenceFromCount } from '../engine-v0/utils'
import { detectEvidenceActor, classifyActorRelation } from './actor-scope'
import { classifyTemporalRelation } from './temporal-scope'
import type { SeraEvidenceItem, SeraEvidenceUse } from './types'

function pushUnique<T>(target: T[], value: T): void {
  if (!target.includes(value)) target.push(value)
}

function classifyEvidenceType(statement: string, category: SeraFact['category']): SeraEvidenceItem['evidenceType'] {
  if (/\b(probable cause|conclusion|recommendation|hfacs|risk\/erc|arms\/erc|causa provável|recomendação)\b/i.test(statement)) return 'UNSUPPORTED_REPORT_ANALYSIS'
  if (category === 'outcome') return 'OUTCOME'
  if (['decision', 'control_input', 'action'].includes(category)) return 'ACTION_OR_DECISION'
  if (['cue', 'warning'].includes(category)) return 'REPORTED_CUE'
  if (['condition', 'environment', 'timeline'].includes(category)) return 'CONTEXT'
  return 'OBSERVED_FACT'
}

function classifySupportedUses(statement: string, category: SeraFact['category']): SeraEvidenceUse[] {
  const supports: SeraEvidenceUse[] = []
  if (/\b(crew|pilot|captain|continued|decided|moved|turned|descended|approach|lever|line(?:d)? up|go-around|executed|failed to|did not)\b/i.test(statement)) pushUnique(supports, 'ESCAPE_POINT')
  if (/\b(perceiv|notice|recogniz|warning|alert|cue|visual|visibility|cloud|fog|night|instrument|deviation|awareness|did not see|failed to notice)\b/i.test(statement)) pushUnique(supports, 'PERCEPTION')
  if (/\b(objective|goal|intent|decided|continued|chose|planned|approach|takeoff|go-around|discontinued|aborted|despite warning|wrong runway|wrong surface)\b/i.test(statement)) pushUnique(supports, 'OBJECTIVE')
  if (/\b(action|input|control|executed|turned|descended|climbed|moved|lever|line(?:d)? up|selected|configured|go-around|correction|continued below|below profile)\b/i.test(statement)) pushUnique(supports, 'ACTION')
  if (/\b(visibility|fog|cloud|weather|wind|night|system|automation|warning|failure|fault|rudder|technical|training|knowledge|time pressure|rushed|dispatch|organizational|staffing|supervision|maintenance|coordination|intent|decided|decision|conscious|physical|fatigue|ergonomic|fmc|autothrottle|dafcs|trim|control law)\b/i.test(statement)) pushUnique(supports, 'PRECONDITION')
  if (category === 'outcome') pushUnique(supports, 'LIMITATION')
  return supports
}

function classifyProhibitedUses(statement: string, temporalRelation: SeraEvidenceItem['temporalRelation'], evidenceType: SeraEvidenceItem['evidenceType']): SeraEvidenceUse[] {
  const prohibited: SeraEvidenceUse[] = []
  if (temporalRelation === 'POST_ESCAPE') {
    pushUnique(prohibited, 'ESCAPE_POINT')
    pushUnique(prohibited, 'PERCEPTION')
    pushUnique(prohibited, 'OBJECTIVE')
    pushUnique(prohibited, 'ACTION')
  }
  if (evidenceType === 'OUTCOME' || evidenceType === 'UNSUPPORTED_REPORT_ANALYSIS') {
    pushUnique(prohibited, 'ESCAPE_POINT')
    pushUnique(prohibited, 'PERCEPTION')
    pushUnique(prohibited, 'OBJECTIVE')
    pushUnique(prohibited, 'ACTION')
  }
  if (/\b(hfacs|risk\/erc|arms\/erc|probable cause|recommendation)\b/i.test(statement)) {
    pushUnique(prohibited, 'PERCEPTION')
    pushUnique(prohibited, 'OBJECTIVE')
    pushUnique(prohibited, 'ACTION')
    pushUnique(prohibited, 'PRECONDITION')
  }
  return prohibited
}

function classifyRelationship(item: Omit<SeraEvidenceItem, 'relationshipToFailure'>): SeraEvidenceItem['relationshipToFailure'] {
  if (item.temporalRelation === 'POST_ESCAPE' || item.evidenceType === 'OUTCOME') return 'POST_ESCAPE_CONSEQUENCE'
  if (item.supports.includes('ESCAPE_POINT') && ['DIRECT_ACTOR', 'UNKNOWN'].includes(item.actorRelation)) return 'DIRECT_ESCAPE_POINT'
  if (item.supports.includes('PRECONDITION')) {
    return item.actorRelation === 'CONTEXT_ACTOR' || item.actorRelation === 'SYSTEM_ENVIRONMENT'
      ? 'CONTEXTUAL_PRECONDITION'
      : 'ENABLING_PRECONDITION'
  }
  return 'UNRELATED_OR_UNSUPPORTED'
}

export function extractEvidenceItems(args: {
  facts: SeraFact[]
  timeline: SeraTimelineItem[]
  directActor?: string | null
  latestEscapeSentenceIndex?: number | null
}): SeraEvidenceItem[] {
  const timelineByStatement = new Map(args.timeline.map((item) => [item.statement, item]))
  return args.facts.map((fact, index) => {
    const timelineItem = timelineByStatement.get(fact.statement)
    const sourceSentenceIndex = timelineItem?.sourceSentenceIndex ?? fact.sourceSentenceIndex
    const temporalRelation = classifyTemporalRelation({
      statement: fact.statement,
      sourceSentenceIndex,
      latestEscapeSentenceIndex: args.latestEscapeSentenceIndex,
    })
    const actor = detectEvidenceActor(fact.statement)
    const actorRelation = classifyActorRelation({ statement: fact.statement, directActor: args.directActor ?? null })
    const evidenceType = classifyEvidenceType(fact.statement, fact.category)
    const supports = classifySupportedUses(fact.statement, fact.category)
    const prohibitedFor = classifyProhibitedUses(fact.statement, temporalRelation, evidenceType)
    const base = {
      evidenceId: `EVID-${index + 1}`,
      statement: fact.statement,
      category: fact.category,
      sourceSentenceIndex,
      temporalRelation,
      actorRelation,
      actor,
      evidenceType,
      supports,
      contradicts: [],
      prohibitedFor,
      confidence: confidenceFromCount(supports.length),
      rationale: [
        `temporalRelation=${temporalRelation}`,
        `actorRelation=${actorRelation}`,
        `evidenceType=${evidenceType}`,
      ],
    } satisfies Omit<SeraEvidenceItem, 'relationshipToFailure'>

    return {
      ...base,
      relationshipToFailure: classifyRelationship(base),
    }
  })
}
