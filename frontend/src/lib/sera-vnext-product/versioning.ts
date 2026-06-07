import {
  SERA_VNEXT_BASELINE_ID,
  SERA_VNEXT_ENGINE_VERSION,
  SERA_VNEXT_FIXTURE_SET_ID,
  SERA_VNEXT_METHODOLOGY_VERSION,
} from '@/lib/sera-vnext/ENGINE_VERSION'
import {
  SERA_VNEXT_PRODUCT_BETA_INPUT_SCHEMA_VERSION,
  SERA_VNEXT_PRODUCT_BETA_OUTPUT_SCHEMA_VERSION,
} from './constants'

export type SeraVNextProductVersionSet = {
  engineVersion: typeof SERA_VNEXT_ENGINE_VERSION
  methodologyVersion: typeof SERA_VNEXT_METHODOLOGY_VERSION
  baselineId: typeof SERA_VNEXT_BASELINE_ID
  fixtureSetId: typeof SERA_VNEXT_FIXTURE_SET_ID
  inputSchemaVersion: string
  outputSchemaVersion: string
  codeCommit: string
}

export function getSeraVNextProductVersionSet(): SeraVNextProductVersionSet {
  return {
    engineVersion: SERA_VNEXT_ENGINE_VERSION,
    methodologyVersion: SERA_VNEXT_METHODOLOGY_VERSION,
    baselineId: SERA_VNEXT_BASELINE_ID,
    fixtureSetId: SERA_VNEXT_FIXTURE_SET_ID,
    inputSchemaVersion: SERA_VNEXT_PRODUCT_BETA_INPUT_SCHEMA_VERSION,
    outputSchemaVersion: SERA_VNEXT_PRODUCT_BETA_OUTPUT_SCHEMA_VERSION,
    codeCommit:
      process.env.VERCEL_GIT_COMMIT_SHA?.trim() ||
      process.env.GIT_COMMIT_SHA?.trim() ||
      'LOCAL_OR_UNSET_COMMIT',
  }
}
