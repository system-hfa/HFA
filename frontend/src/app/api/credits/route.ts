import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

const PLAN_SETTING_KEYS = [
  'free_plan_credits',
  'free_plan_price_cents',
  'free_plan_features',
  'enterprise_plan_price_cents',
  'enterprise_plan_features',
] as const

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()

    const [tenantRes, packagesRes, transactionsRes, settingsRes] = await Promise.all([
      admin
        .from('tenants')
        .select('plan, credits_balance')
        .eq('id', user.tenantId)
        .single(),
      admin
        .from('credit_packages')
        .select('id, name, credits, price_cents, stripe_price_id, is_active, created_at')
        .eq('is_active', true)
        .order('credits', { ascending: true }),
      admin
        .from('credit_transactions')
        .select('id, created_at, description, amount')
        .eq('tenant_id', user.tenantId)
        .order('created_at', { ascending: false })
        .limit(20),
      admin
        .from('system_settings')
        .select('key, value')
        .in('key', [...PLAN_SETTING_KEYS]),
    ])

    if (tenantRes.error || !tenantRes.data) {
      return jsonError(tenantRes.error?.message || 'Tenant não encontrado', 400)
    }

    if (packagesRes.error) return jsonError(packagesRes.error.message, 400)
    if (transactionsRes.error) return jsonError(transactionsRes.error.message, 400)
    if (settingsRes.error) return jsonError(settingsRes.error.message, 400)

    const planSettings = Object.fromEntries(
      (settingsRes.data ?? []).map((row) => [String(row.key), String(row.value ?? '')])
    )

    return NextResponse.json({
      balance: Number(tenantRes.data.credits_balance ?? 0),
      plan: String(tenantRes.data.plan ?? 'free'),
      packages: packagesRes.data ?? [],
      transactions: transactionsRes.data ?? [],
      plan_settings: {
        free_plan_credits: planSettings.free_plan_credits ?? '5',
        free_plan_price_cents: planSettings.free_plan_price_cents ?? '0',
        free_plan_features: planSettings.free_plan_features ?? '5 análises gratuitas',
        enterprise_plan_price_cents: planSettings.enterprise_plan_price_cents ?? '0',
        enterprise_plan_features: planSettings.enterprise_plan_features ?? 'Análises ilimitadas',
      },
    })
  } catch (error) {
    if (error instanceof Response) return error
    return jsonError(error instanceof Error ? error.message : String(error), 500)
  }
}
