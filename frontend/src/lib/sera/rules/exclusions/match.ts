import { exclusionSets } from './index'
import type { SeraExclusionRule, SeraExclusionSet } from './index'

export function findExclusionsForCode(
  code: string,
  domain: SeraExclusionSet['domain']
): SeraExclusionRule[] {
  return exclusionSets[domain].rules.filter((rule) => rule.code === code)
}

export function explainExclusion(
  code: string,
  excludedCode: string,
  domain: SeraExclusionSet['domain']
): string | null {
  const rule = findExclusionsForCode(code, domain).find((candidate) =>
    candidate.excludes.includes(excludedCode)
  )

  return rule?.rationale ?? null
}
