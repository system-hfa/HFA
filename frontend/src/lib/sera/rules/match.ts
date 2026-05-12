import type { SeraRule } from './index'

export type RuleEvidenceMatch = {
  code: string
  positiveMatches: string[]
  negativeMatches: string[]
  score: number
}

export type DecisionTrace = {
  selected_code: string
  matched_positive: string[]
  matched_negative: string[]
  excluded_codes: string[]
  rule_source: string
}

export function normalizeRuleText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function matchesTerm(text: string, term: string): boolean {
  return text.includes(normalizeRuleText(term))
}

export function matchRuleEvidence(text: string, rule: SeraRule): RuleEvidenceMatch {
  const normalized = normalizeRuleText(text)
  const positiveMatches = rule.positive_evidence.filter((term) => matchesTerm(normalized, term))
  const negativeMatches = rule.negative_evidence.filter((term) => matchesTerm(normalized, term))

  return {
    code: rule.code,
    positiveMatches,
    negativeMatches,
    score: positiveMatches.length * rule.priority - negativeMatches.length * 10,
  }
}

export function createDecisionTrace(params: {
  selected_code: string
  matched_positive?: string[]
  matched_negative?: string[]
  excluded_codes?: string[]
  rule_source: string
}): DecisionTrace {
  return {
    selected_code: params.selected_code,
    matched_positive: params.matched_positive ?? [],
    matched_negative: params.matched_negative ?? [],
    excluded_codes: params.excluded_codes ?? [],
    rule_source: params.rule_source,
  }
}

