import type { CausalAssuranceStatus, SeraVNextEngineVersion } from './types'

export const SERA_VNEXT_ENGINE_VERSION: SeraVNextEngineVersion = 'sera-vnext-v0.2.0'

export const SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS = [
  'HFACS',
  'Risk/ERC',
  'ARMS/ERC',
] as const

export const SERA_VNEXT_STATUS = {
  SKELETON_NOT_VALIDATED: 'SKELETON_NOT_VALIDATED',
  PARTIAL_STEPS_1_3_NOT_CLASSIFIED: 'PARTIAL_STEPS_1_3_NOT_CLASSIFIED',
  PARTIAL_STEPS_1_5_NOT_CLASSIFIED: 'PARTIAL_STEPS_1_5_NOT_CLASSIFIED',
  PARTIAL_POA_REVIEW_REQUIRED: 'PARTIAL_POA_REVIEW_REQUIRED',
  PARTIAL_POA_REVIEW_TRACEABLE: 'PARTIAL_POA_REVIEW_TRACEABLE',
  PARTIAL_ELIGIBILITY_CHECKED_NOT_CLASSIFIED: 'PARTIAL_ELIGIBILITY_CHECKED_NOT_CLASSIFIED',
  PARTIAL_ELIGIBILITY_CALIBRATED_NOT_CLASSIFIED: 'PARTIAL_ELIGIBILITY_CALIBRATED_NOT_CLASSIFIED',
  PARTIAL_READINESS_REFINED_NOT_CLASSIFIED: 'PARTIAL_READINESS_REFINED_NOT_CLASSIFIED',
  REVIEW_REQUIRED: 'REVIEW_REQUIRED',
  PASSED: 'PASSED',
  FAILED: 'FAILED',
} as const satisfies Record<string, CausalAssuranceStatus>

export const SERA_VNEXT_STEP_ORDER = [
  '01-factual-extraction',
  '02-unsafe-state',
  '03-unsafe-act-condition',
  '04-direct-actor',
  '05-poa-statements',
  '06-poa-classification',
  '07-preconditions',
  '08-limitations',
  '09-recommendations',
  '10-causal-assurance',
  '11-human-review',
] as const
