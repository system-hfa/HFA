import type { SeraEvidenceActorRelation } from './types'

export function detectEvidenceActor(statement: string): string | null {
  const text = statement.toLowerCase()
  if (/\bflight crew|\bcrew\b|tripula/.test(text)) return 'flight crew (collective)'
  if (/\bcaptain\b|comandante/.test(text)) return 'captain'
  if (/\bfirst officer\b|\bfo\b/.test(text)) return 'first officer'
  if (/\bpilot\b|piloto/.test(text)) return 'pilot'
  if (/\bmaintenance\b|manuten/.test(text)) return 'maintenance'
  if (/\bdispatch\b|operator pressure|organizational/.test(text)) return 'organization / dispatch context'
  if (/\bsystem\b|automation|autothrottle|fmc|dafcs|trim|rudder|control law|warning system/.test(text)) return 'technical system'
  if (/\bweather\b|windshear|microburst|visibility|fog|cloud|environment/.test(text)) return 'environment'
  return null
}

export function classifyActorRelation(args: {
  statement: string
  directActor: string | null
}): SeraEvidenceActorRelation {
  const actor = detectEvidenceActor(args.statement)
  if (!actor) return 'UNKNOWN'
  if (actor === 'technical system' || actor === 'environment') return 'SYSTEM_ENVIRONMENT'
  if (actor === 'organization / dispatch context' || actor === 'maintenance') return 'CONTEXT_ACTOR'
  if (!args.directActor) return 'DIRECT_ACTOR'
  return actor === args.directActor || args.directActor === 'flight crew (collective)' && ['captain', 'first officer'].includes(actor)
    ? 'DIRECT_ACTOR'
    : 'CONTEXT_ACTOR'
}
