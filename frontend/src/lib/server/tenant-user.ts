import type { SupabaseClient } from '@supabase/supabase-js'

export async function ensurePublicUserRow(
  admin: SupabaseClient,
  tenantId: string,
  authUserId: string,
  email: string | undefined,
  role: string
): Promise<string> {
  const em = email ?? ''
  const { data: existing } = await admin.from('users').select('id').eq('email', em).limit(1).maybeSingle()
  if (existing?.id) return existing.id as string
  await admin.from('users').insert({
    id: authUserId,
    tenant_id: tenantId,
    email: em,
    full_name: em ? em.split('@')[0] : 'user',
    role: role || 'admin',
    is_active: true,
  })
  return authUserId
}

export async function debitCreditForEvent(params: {
  admin: SupabaseClient
  tenantId: string
  submittedById: string
  eventId: string
  title: string
  isEnterprise: boolean
  currentBalance: number
}) {
  const { admin, tenantId, submittedById, eventId, title, isEnterprise, currentBalance } = params
  if (!isEnterprise) {
    await admin
      .from('tenants')
      .update({ credits_balance: currentBalance - 1 })
      .eq('id', tenantId)
  }
  await admin.from('credit_transactions').insert({
    tenant_id: tenantId,
    user_id: submittedById,
    type: 'consumption',
    amount: -1,
    event_id: eventId,
    description: `Análise SERA: ${title}`,
  })
}
