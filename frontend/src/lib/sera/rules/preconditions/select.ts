import matrix from './matrix.json'

export type SeraCodesForPreconditions = {
  perception_code: string
  objective_code: string
  action_code: string
  erc_level?: number
}

export type SelectedPrecondition = {
  code: string
  priority: number
  sourceRuleId: string
  matchedEvidence: string[]
  required: boolean
}

type RuleMatch = Partial<{
  perception_code: string
  objective_code: string
  action_code: string
  erc_level: number
}>

type RankedPrecondition = {
  code: string
  priority: number
  required: boolean
  evidence: string[]
}

type MatrixRule = {
  id: string
  match: RuleMatch
  ranked_preconditions: RankedPrecondition[]
  blocked: string[]
  max_items: number
}

type MatrixFile = {
  version: string
  source: string
  rules: MatrixRule[]
}

const typedMatrix = matrix as MatrixFile

function normalizeToken(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function normalizeCode(input: string | undefined): string {
  return String(input || '').trim().toUpperCase()
}

function isMatch(rule: MatrixRule, codes: SeraCodesForPreconditions): boolean {
  const normalized = {
    perception_code: normalizeCode(codes.perception_code),
    objective_code: normalizeCode(codes.objective_code),
    action_code: normalizeCode(codes.action_code),
    erc_level: codes.erc_level,
  }

  if (rule.match.perception_code && normalizeCode(rule.match.perception_code) !== normalized.perception_code) return false
  if (rule.match.objective_code && normalizeCode(rule.match.objective_code) !== normalized.objective_code) return false
  if (rule.match.action_code && normalizeCode(rule.match.action_code) !== normalized.action_code) return false
  if (rule.match.erc_level != null && rule.match.erc_level !== normalized.erc_level) return false
  return true
}

function specificity(match: RuleMatch): number {
  let total = 0
  if (match.perception_code) total += 1
  if (match.objective_code) total += 1
  if (match.action_code) total += 1
  if (match.erc_level != null) total += 1
  return total
}

function collectMatchedEvidence(eventTextNormalized: string, evidence: string[]): string[] {
  const matches: string[] = []
  for (const item of evidence) {
    const token = normalizeToken(item)
    if (!token) continue
    if (eventTextNormalized.includes(token)) matches.push(item)
  }
  return matches
}

export function selectDeterministicPreconditions(
  codes: SeraCodesForPreconditions,
  eventText: string,
  options?: { maxItems?: number }
): SelectedPrecondition[] {
  const eventTextNormalized = normalizeToken(eventText || '')

  const matchedRules = typedMatrix.rules
    .map((rule, index) => ({ rule, index, specificity: specificity(rule.match) }))
    .filter((item) => isMatch(item.rule, codes))
    .sort((a, b) => b.specificity - a.specificity || a.index - b.index)

  if (!matchedRules.length) return []

  const blocked = new Set<string>()
  for (const item of matchedRules) {
    for (const code of item.rule.blocked || []) blocked.add(normalizeCode(code))
  }

  const dedup = new Map<string, SelectedPrecondition & { ruleSpecificity: number; ruleOrder: number }>()

  for (const item of matchedRules) {
    const sortedPreconditions = [...item.rule.ranked_preconditions].sort(
      (a, b) => a.priority - b.priority || a.code.localeCompare(b.code)
    )

    for (const precondition of sortedPreconditions) {
      const matchedEvidence = collectMatchedEvidence(eventTextNormalized, precondition.evidence || [])
      const includeByFallback = item.specificity >= 2 && precondition.priority <= 2
      const shouldInclude = precondition.required || matchedEvidence.length > 0 || includeByFallback
      if (!shouldInclude) continue

      const normalizedCode = normalizeCode(precondition.code)
      if (blocked.has(normalizedCode)) continue

      const candidate: SelectedPrecondition & { ruleSpecificity: number; ruleOrder: number } = {
        code: precondition.code,
        priority: precondition.priority,
        sourceRuleId: item.rule.id,
        matchedEvidence,
        required: Boolean(precondition.required),
        ruleSpecificity: item.specificity,
        ruleOrder: item.index,
      }

      const existing = dedup.get(normalizedCode)
      if (!existing) {
        dedup.set(normalizedCode, candidate)
        continue
      }

      const replace =
        candidate.priority < existing.priority ||
        (candidate.priority === existing.priority && candidate.ruleSpecificity > existing.ruleSpecificity) ||
        (candidate.priority === existing.priority &&
          candidate.ruleSpecificity === existing.ruleSpecificity &&
          candidate.ruleOrder < existing.ruleOrder)

      if (replace) dedup.set(normalizedCode, candidate)
    }
  }

  const topRule = matchedRules[0]
  const maxItems = options?.maxItems ?? topRule.rule.max_items

  return [...dedup.values()]
    .sort((a, b) => {
      if (b.ruleSpecificity !== a.ruleSpecificity) return b.ruleSpecificity - a.ruleSpecificity
      if (a.priority !== b.priority) return a.priority - b.priority
      return a.code.localeCompare(b.code)
    })
    .slice(0, Math.max(0, maxItems))
    .map(({ ruleSpecificity: _s, ruleOrder: _o, ...rest }) => rest)
}
