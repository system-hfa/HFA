export const SERA_VNEXT_PRODUCT_BETA_INPUT_SCHEMA_VERSION = 'sera-vnext-product-beta-input-v1'
export const SERA_VNEXT_PRODUCT_BETA_OUTPUT_SCHEMA_VERSION = 'sera-vnext-product-beta-output-v1'
export const SERA_VNEXT_PRODUCT_BETA_INTERNAL_MARKERS = ['INTERNAL', 'NON_FINAL', 'NOT_OPERATIONAL'] as const
export const SERA_VNEXT_PRODUCT_BETA_MIN_NARRATIVE_LENGTH = 40
export const SERA_VNEXT_PRODUCT_BETA_MAX_NARRATIVE_LENGTH = 12000
export const SERA_VNEXT_PRODUCT_BETA_DEFAULT_PAGE_SIZE = 20
export const SERA_VNEXT_PRODUCT_BETA_MAX_PAGE_SIZE = 100

export function isSeraVNextProductBetaEnabled(): boolean {
  return process.env.SERA_VNEXT_PRODUCT_BETA_ENABLED?.trim().toLowerCase() === 'true'
}

export function isSeraVNextProductBetaUiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED?.trim().toLowerCase() === 'true'
}
