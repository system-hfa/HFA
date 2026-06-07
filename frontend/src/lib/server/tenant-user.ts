import type { SupabaseClient } from '@supabase/supabase-js'

const VALID_USER_ROLES = new Set(['admin', 'analyst', 'viewer'])

export async function ensurePublicUserRow(
  admin: SupabaseClient,
  tenantId: string,
  authUserId: string,
  email: string | undefined,
  role: string
): Promise<string> {
  const normalizedEmail = (email ?? '').trim().toLowerCase() || `${authUserId}@auth.local`
  const normalizedRole = VALID_USER_ROLES.has(role) ? role : 'viewer'

  const { data: existingById, error: existingByIdError } = await admin
    .from('users')
    .select('id')
    .eq('id', authUserId)
    .maybeSingle()
  if (existingByIdError) {
    throw new Error(`ENSURE_PUBLIC_USER_ROW_LOOKUP_BY_ID_FAILED: ${existingByIdError.message}`)
  }
  if (existingById?.id) return authUserId

  const { data: existingByEmail, error: existingByEmailError } = await admin
    .from('users')
    .select('id')
    .eq('email', normalizedEmail)
    .limit(1)
    .maybeSingle()
  if (existingByEmailError) {
    throw new Error(`ENSURE_PUBLIC_USER_ROW_LOOKUP_BY_EMAIL_FAILED: ${existingByEmailError.message}`)
  }
  if (existingByEmail?.id) return existingByEmail.id as string

  const { error: insertError } = await admin.from('users').insert({
    id: authUserId,
    tenant_id: tenantId,
    email: normalizedEmail,
    full_name: normalizedEmail.split('@')[0] || 'user',
    role: normalizedRole,
    is_active: true,
  })
  if (insertError) {
    throw new Error(`ENSURE_PUBLIC_USER_ROW_INSERT_FAILED: ${insertError.message}`)
  }
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

/** Devolve 1 crédito ao tenant quando a análise falha após o débito (espelha lógica de enterprise). */
export async function refundCreditForFailedAnalysis(params: {
  admin: SupabaseClient
  tenantId: string
  submittedById: string
  eventId: string
  title: string
  isEnterprise: boolean
  /** Saldo atual já após o débito (para não-enterprise). */
  currentBalanceAfterDebit: number
}) {
  const { admin, tenantId, submittedById, eventId, title, isEnterprise, currentBalanceAfterDebit } =
    params
  if (!isEnterprise) {
    await admin
      .from('tenants')
      .update({ credits_balance: currentBalanceAfterDebit + 1 })
      .eq('id', tenantId)
  }
  await admin.from('credit_transactions').insert({
    tenant_id: tenantId,
    user_id: submittedById,
    type: 'refund',
    amount: 1,
    event_id: eventId,
    description: `Estorno: análise não concluída — ${title}`,
  })
}
