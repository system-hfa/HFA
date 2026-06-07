import { buildPassiveEvidenceCategoryHints } from '../evidence-categories'
import { excludedPostEscapeEvidenceFromTimeline } from '../evidence/temporal-scope'
import type {
  SeraConfidence,
  SeraFact,
  SeraPreconditionCategory,
  SeraTimelineItem,
  SeraVNextEngineInput,
} from '../engine-contract'

export function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

export function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((pattern) => text.includes(pattern.toLowerCase()))
}

export function pushUnique(target: string[], value: string): void {
  if (value.trim().length === 0) return
  if (!target.includes(value)) target.push(value)
}

export function confidenceFromCount(size: number): SeraConfidence {
  if (size >= 3) return 'HIGH'
  if (size === 2) return 'MEDIUM'
  return 'LOW'
}

export function summarizeInput(input: SeraVNextEngineInput): string {
  return input.narrative.replace(/\s+/g, ' ').trim().slice(0, 280)
}

export function buildEvidenceTrace(facts: SeraFact[], usage: Record<string, string[]>): Array<{
  evidenceId: string
  statement: string
  category: SeraFact['category']
  sourceSentenceIndex: number
  usedBy: string[]
}> {
  return facts.map((fact) => ({
    evidenceId: fact.id,
    statement: fact.statement,
    category: fact.category,
    sourceSentenceIndex: fact.sourceSentenceIndex,
    usedBy: usage[fact.id] || [],
  }))
}

export function classifyPreconditionCategory(args: {
  text: string
  proposedCode: string | null
}): SeraPreconditionCategory | null {
  const normalized = args.text.toLowerCase()
  const mapped = buildPassiveEvidenceCategoryHints({
    releasedCode: args.proposedCode,
    evidenceRefs: [args.text],
  })[0]?.category

  const explicitMap: Array<[SeraPreconditionCategory, string[]]> = [
    ['SENSORY_LIMITATION', ['visibility', 'fog', 'night', 'sensory', 'low cloud', 'visual references']],
    ['KNOWLEDGE_TRAINING', ['training', 'knowledge', 'competence', 'unfamiliar']],
    ['TIME_PRESSURE', ['time pressure', 'urgency', 'rushed', 'late decision', 'very late']],
    ['COMMUNICATION_INFORMATION', ['communication', 'readback', 'briefing', 'callout']],
    ['PROCEDURAL_MONITORING', ['monitoring', 'cross-check', 'procedure', 'verification']],
    ['FEEDBACK_VERIFICATION', ['feedback', 'verify', 'verification']],
    ['INTENT_AWARENESS', ['intent', 'conscious', 'knowingly', 'decided', 'decision', 'start the crank']],
    ['TEAM_COORDINATION', ['crew coordination', 'team', 'captain', 'first officer', 'pf', 'pm']],
    ['ORGANIZATIONAL_CONTEXT', ['schedule', 'organizational', 'dispatch', 'operator pressure', 'reduced staffing', 'degraded supervision', 'staffing', 'supervision']],
    ['ENVIRONMENTAL_CONTEXT', ['weather', 'wind', 'rain', 'runway condition', 'terrain']],
    ['TECHNICAL_CONTEXT', ['warning', 'system', 'automation', 'fmc', 'equipment', 'control law', 'autothrottle', 'dafcs', 'trim fail', 'rudder', 'technical', 'malfunction', 'failure', 'fault']],
    ['PHYSICAL_CAPABILITY', ['physical', 'fatigue', 'ergonomic', 'motor', 'reach']],
  ]

  for (const [category, tokens] of explicitMap) {
    if (tokens.some((token) => normalized.includes(token))) return category
  }

  return (mapped as SeraPreconditionCategory | undefined) || null
}

export function excludedPostEscapeEvidence(timeline: SeraTimelineItem[], latestSourceSentenceIndex: number | null): string[] {
  return excludedPostEscapeEvidenceFromTimeline(timeline, latestSourceSentenceIndex)
}
