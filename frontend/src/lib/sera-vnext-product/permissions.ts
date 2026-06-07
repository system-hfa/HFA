import type { SeraVNextProductContext } from './types'

export type SeraVNextBetaPermission = 'sera_vnext.beta.use' | 'sera_vnext.beta.review' | 'sera_vnext.beta.admin'

export function hasSeraVNextBetaPermission(context: Pick<SeraVNextProductContext, 'role'>, _permission: SeraVNextBetaPermission): boolean {
  return context.role.toLowerCase() === 'admin'
}

export function assertTenantScope(context: Pick<SeraVNextProductContext, 'tenantId'>, tenantId: string): void {
  if (context.tenantId !== tenantId) {
    throw new Response(JSON.stringify({ detail: 'Acesso cross-tenant bloqueado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
