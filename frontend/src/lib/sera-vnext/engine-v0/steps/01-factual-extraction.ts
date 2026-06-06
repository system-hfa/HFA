import type { SeraVNextEngineInput, SeraVNextEngineOutput } from '../../engine-contract'
import { buildCandidateTimeline, extractCandidateFacts, OUTCOME_KEYWORDS } from '../factual-extraction-helpers'
import { pushUnique } from '../utils'

function normalizeCategory(value: string): SeraVNextEngineOutput['factualExtraction']['facts'][number]['category'] {
  if (value === 'actor') return 'actor'
  if (value === 'action') return 'action'
  if (value === 'condition') return 'condition'
  if (value === 'environment') return 'environment'
  if (value === 'timeline') return 'timeline'
  if (value === 'outcome') return 'outcome'
  return 'other'
}

export function runStep01FactualExtraction(input: SeraVNextEngineInput): SeraVNextEngineOutput['factualExtraction'] {
  const { facts, sentences } = extractCandidateFacts(input.narrative)
  const timeline = buildCandidateTimeline(sentences)

  const normalizedFacts = facts.map((fact: (typeof facts)[number], index: number) => {
    const statement = fact.statement
    const lower = statement.toLowerCase()
    let category = normalizeCategory(fact.category)
    if (/\b(decided|decision|chose|continue(?:d)?|abort(?:ed)?|go-around|decidiu|decisão)\b/i.test(statement)) {
      category = 'decision'
    } else if (/\b(input|control|throttle|pitch|bank|configured|flap|gear|controle|manche|potência)\b/i.test(statement)) {
      category = 'control_input'
    } else if (/\b(cue|warning|alert|awareness|sinal|alerta)\b/i.test(statement)) {
      category = /\b(warning|alert|alerta)\b/i.test(statement) ? 'warning' : 'cue'
    } else if (OUTCOME_KEYWORDS.some((keyword: string) => lower.includes(keyword))) {
      category = 'outcome'
    }

    return {
      id: `FACT-${index + 1}`,
      statement,
      category,
      sourceSentenceIndex: fact.sourceSentenceIndex,
    }
  })

  const explicitlyUnsupportedClaims: string[] = []
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase()
    if (
      /\b(probable cause|conclusion|recommendation|hfacs|risk\/erc|arms\/erc|causa provável|recomendação)\b/i.test(
        sentence
      )
    ) {
      pushUnique(explicitlyUnsupportedClaims, sentence)
    }
    if (/\b(selectedcode|releasedcode|finalconclusion|classified)\b/i.test(lower)) {
      pushUnique(explicitlyUnsupportedClaims, sentence)
    }
  }

  return {
    facts: normalizedFacts,
    timeline: timeline.map((item: (typeof timeline)[number]) => ({
      id: `TIME-${item.order}`,
      order: item.order,
      statement: item.statement,
      temporalCue: item.temporalCue,
      sourceSentenceIndex: item.sourceSentenceIndex,
    })),
    explicitlyUnsupportedClaims,
  }
}
