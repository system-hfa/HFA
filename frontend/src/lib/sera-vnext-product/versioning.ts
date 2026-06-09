import {
  SERA_VNEXT_BASELINE_ID,
  SERA_VNEXT_FIXTURE_SET_ID,
  SERA_VNEXT_METHODOLOGY_VERSION,
} from '@/lib/sera-vnext/ENGINE_VERSION'
import {
  SERA_VNEXT_PRODUCT_BETA_INPUT_SCHEMA_VERSION,
  SERA_VNEXT_PRODUCT_BETA_OUTPUT_SCHEMA_VERSION,
} from './constants'

export type SeraVNextProductVersionSet = {
  engineVersion: string
  methodologyVersion: typeof SERA_VNEXT_METHODOLOGY_VERSION
  baselineId: typeof SERA_VNEXT_BASELINE_ID
  fixtureSetId: typeof SERA_VNEXT_FIXTURE_SET_ID
  inputSchemaVersion: string
  outputSchemaVersion: string
  codeCommit: string
}

const SERA_VNEXT_PRODUCT_BETA_DB_ENGINE_VERSION = '0.1.0'

export function getSeraVNextProductVersionSet(): SeraVNextProductVersionSet {
  return {
    // The DB beta contract is locked to 0.1.0 until a migration authorizes the v02 row version.
    // The nested engine output still carries the executable engine version.
    engineVersion: SERA_VNEXT_PRODUCT_BETA_DB_ENGINE_VERSION,
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
