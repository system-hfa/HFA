import { NextResponse } from 'next/server'
import { requireAdmin, jsonError } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function monthRange(ref: Date): { start: Date; end: Date } {
  const start = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), 1, 0, 0, 0))
  const end = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth() + 1, 1, 0, 0, 0))
  return { start, end }
}

function growthPct(current: number, previous: number): number {
  if (previous <= 0) return current > 0 ? 100 : 0
  return Number((((current - previous) / previous) * 100).toFixed(2))
}

export async function GET(req: Request) {
  try {
    await requireAdmin(req)
    const admin = getSupabaseAdmin()

    const [tenants, analyses, transactions] = await Promise.all([
      admin.from('tenants').select('id, plan, created_at'),
      admin.from('analyses').select('id, created_at'),
      admin.from('credit_transactions').select('amount'),
    ])

    const t = tenants.data ?? []
    const a = analyses.data ?? []
    const tx = transactions.data ?? []

    const now = new Date()
    const { start: currentStart, end: currentEnd } = monthRange(now)
    const prevRef = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0))
    const { start: previousStart, end: previousEnd } = monthRange(prevRef)

    let currentMonthCount = 0
    let previousMonthCount = 0
    for (const item of a) {
      const created = parseDate(item.created_at as string | undefined)
      if (!created) continue
      if (created >= currentStart && created < currentEnd) {
        currentMonthCount += 1
      } else if (created >= previousStart && created < previousEnd) {
        previousMonthCount += 1
      }
    }

    const creditsConsumed = tx.reduce((s, x) => s + (x.amount < 0 ? Math.abs(x.amount) : 0), 0)

    return NextResponse.json({
      total_tenants: t.length,
      total_analyses: a.length,
      credits_consumed: creditsConsumed,
      enterprise_tenants: t.filter(x => x.plan === 'enterprise').length,
      free_tenants: t.filter(x => ['free', 'trial'].includes(x.plan ?? '')).length,
      growth: {
        current_month: currentMonthCount,
        previous_month: previousMonthCount,
        pct: growthPct(currentMonthCount, previousMonthCount),
      },
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
