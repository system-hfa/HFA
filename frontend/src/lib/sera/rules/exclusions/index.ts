import actionExclusionsJson from './action-exclusions.json'
import objectiveExclusionsJson from './objective-exclusions.json'
import perceptionExclusionsJson from './perception-exclusions.json'

export type SeraExclusionRule = {
  code: string
  excludes: string[]
  when: string[]
  unless: string[]
  rationale: string
}

export type SeraExclusionSet = {
  domain: 'perception' | 'objective' | 'action'
  version: string
  rules: SeraExclusionRule[]
}

export const perceptionExclusions = perceptionExclusionsJson as SeraExclusionSet
export const objectiveExclusions = objectiveExclusionsJson as SeraExclusionSet
export const actionExclusions = actionExclusionsJson as SeraExclusionSet

export const exclusionSets: Record<SeraExclusionSet['domain'], SeraExclusionSet> = {
  perception: perceptionExclusions,
  objective: objectiveExclusions,
  action: actionExclusions,
}
