import type { SeraTimelineItem } from '../engine-contract'
import type { SeraEvidenceTemporalRelation } from './types'

function normalize(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasConsequenceMarker(text: string): boolean {
  return /\b(crash|impact|impacted|collision|damage|damaged|fatal|injury|injured|ditch|ditched|struck|strike|hit|terrain|runway lights|very low height|acidente|impacto|colis[aã]o|dano|ferid|bateu)\b/i.test(text)
}

function hasRecoveryMarker(text: string): boolean {
  return /\b(recovery|recover(?:ed|y)?|arrested|corrected|go around|go-around|late corrective|correction|finally recognized|later recognition|recovery control inputs)\b/i.test(text)
}

function hasExplicitPostEscapeCue(text: string): boolean {
  const normalized = normalize(text)
  if (/\b(after|only after|only later|later|seconds later|subsequently|following)\b/.test(normalized) && (hasConsequenceMarker(text) || hasRecoveryMarker(text))) return true
  if (/\b(after .*already|already occurred|already below|had already (?:departed|occurred|escalated))\b/.test(normalized)) return true
  if (/\b(during the recovery|recovery control inputs|finally recognized|very low height above the water)\b/.test(normalized)) return true
  if (/\b(later (?:struck|impacted|ditched|crashed|hit)|struck terrain|struck runway lights|impact with terrain)\b/.test(normalized)) return true
  return false
}

function isOpeningTemporalContext(text: string): boolean {
  return /\b(after (?:takeoff|departure|offshore departure)|during (?:approach|taxi|final approach|compressor wash|execution)|on visual approach)\b/i.test(text)
}

export function classifyTemporalRelation(args: {
  statement: string
  sourceSentenceIndex: number
  latestEscapeSentenceIndex?: number | null
}): SeraEvidenceTemporalRelation {
  if (args.latestEscapeSentenceIndex != null && args.sourceSentenceIndex > args.latestEscapeSentenceIndex) return 'POST_ESCAPE'
  if (hasExplicitPostEscapeCue(args.statement)) return 'POST_ESCAPE'
  if (hasConsequenceMarker(args.statement) && !isOpeningTemporalContext(args.statement)) return 'POST_ESCAPE'
  if (args.latestEscapeSentenceIndex != null && args.sourceSentenceIndex === args.latestEscapeSentenceIndex) return 'AT_ESCAPE'
  if (args.latestEscapeSentenceIndex != null && args.sourceSentenceIndex < args.latestEscapeSentenceIndex) return 'PRE_ESCAPE'
  if (/\b(before|prior to|while|during|when|on visual approach|during approach|during taxi|during final approach)\b/i.test(args.statement)) return 'PRE_ESCAPE'
  return 'UNKNOWN'
}

export function isPostEscapeStatement(statement: string): boolean {
  return classifyTemporalRelation({ statement, sourceSentenceIndex: 0 }) === 'POST_ESCAPE'
}

export function excludedPostEscapeEvidenceFromTimeline(
  timeline: SeraTimelineItem[],
  latestEscapeSentenceIndex: number | null,
): string[] {
  return timeline
    .filter((item) => classifyTemporalRelation({
      statement: item.statement,
      sourceSentenceIndex: item.sourceSentenceIndex,
      latestEscapeSentenceIndex,
    }) === 'POST_ESCAPE')
    .map((item) => item.statement)
}
