export type SeraVNextProductBetaEventName =
  | 'sera_vnext_beta_analysis_created'
  | 'sera_vnext_beta_analysis_failed'
  | 'sera_vnext_beta_review_submitted'
  | 'sera_vnext_beta_reanalysis_completed'
  | 'sera_vnext_beta_analysis_archived'
  | 'sera_vnext_beta_analysis_restored'
  | 'sera_vnext_beta_access_denied'
  | 'sera_vnext_beta_tenant_violation'
  | 'sera_vnext_beta_analysis_exported'

export type SeraVNextProductBetaEvent = {
  event: SeraVNextProductBetaEventName
  requestId?: string
  tenantId?: string
  userRole?: string
  analysisId?: string
  status?: string
  errorCode?: string
  durationMs?: number
  pageSize?: number
}

export function logSeraVNextProductBetaEvent(event: SeraVNextProductBetaEvent): void {
  console.info('[sera-vnext-product-beta]', event)
}
