export const OUTCOME_KEYWORDS = [
  'crash',
  'impact',
  'collision',
  'injury',
  'fatal',
  'damage',
  'ditch',
  'fell',
  'hit',
  'strike',
  'acidente',
  'impacto',
  'colisão',
  'colisao',
  'ferido',
  'fatal',
  'dano',
  'queda',
  'bateu',
]

type ExtractedFactCategory = 'actor' | 'action' | 'condition' | 'environment' | 'timeline' | 'outcome' | 'other'

type ExtractedFact = {
  statement: string
  category: ExtractedFactCategory
  sourceSentenceIndex: number
}

type ExtractedTimelineItem = {
  order: number
  statement: string
  temporalCue: string | null
  sourceSentenceIndex: number
}

const TEMPORAL_CUES = [
  'before',
  'after',
  'during',
  'then',
  'when',
  'while',
  'antes',
  'depois',
  'durante',
  'então',
  'entao',
  'quando',
  'enquanto',
]

function classifyFactCategory(sentence: string): ExtractedFactCategory {
  const text = sentence.toLowerCase()
  if (/\b(crew|pilot|captain|first officer|operator|maintenance|controller|tripula|comandante)\b/.test(text)) {
    return 'actor'
  }
  if (/\b(before|after|during|then|when|while|antes|depois|durante|ent[aã]o|quando)\b/.test(text)) {
    return 'timeline'
  }
  if (/\b(cloud|visibility|weather|wind|rain|fog|night|wx|nuvem|visibilidade|tempo|chuva|nevoeiro|vento)\b/.test(text)) {
    return 'environment'
  }
  if (/\b(alert|warning|system|failure|fault|degraded|condition|unsafe|alerta|falha|condi[cç][aã]o|degradad)\b/.test(text)) {
    return 'condition'
  }
  if (/\b(crash|impact|collision|injury|fatal|damage|acidente|impacto|colis[aã]o|ferid|fatal|dano)\b/.test(text)) {
    return 'outcome'
  }
  if (/\b(did|failed|continued|descended|climbed|turned|landed|executed|applied|fez|falhou|continuou|desceu|subiu|virou|pousou|executou|aplicou)\b/.test(text)) {
    return 'action'
  }
  return 'other'
}

function extractTemporalCue(sentence: string): string | null {
  const lower = sentence.toLowerCase()
  return TEMPORAL_CUES.find((cue) => lower.includes(cue)) ?? null
}

export function splitNarrativeIntoSentences(input: string): string[] {
  return input
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 20)
}

export function extractCandidateFacts(input: string): {
  facts: ExtractedFact[]
  sentences: string[]
} {
  const sentences = splitNarrativeIntoSentences(input)
  const facts = sentences.slice(0, 12).map((statement, index) => ({
    statement,
    category: classifyFactCategory(statement),
    sourceSentenceIndex: index,
  }))

  return { facts, sentences }
}

export function buildCandidateTimeline(sentences: string[]): ExtractedTimelineItem[] {
  return sentences.slice(0, 8).map((statement, index) => ({
    order: index + 1,
    statement,
    temporalCue: extractTemporalCue(statement),
    sourceSentenceIndex: index,
  }))
}
