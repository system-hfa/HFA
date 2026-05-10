import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

const PRECONDITION_NAMES: Record<string, string> = {
  P1: 'Condição do Pessoal - Fisiológico',
  P2: 'Condição do Pessoal - Psicológico',
  P3: 'Condição do Pessoal - Conhecimento',
  P4: 'Condição do Pessoal - Habilidade',
  P5: 'Condição do Pessoal - Prontidão Pessoal',
  P6: 'Condição do Pessoal - Seleção e Treinamento',
  P7: 'Condição do Pessoal - Qualificação e Autorização',
  S1: 'Falhas em C/C/S - Liderança e Supervisão',
  S2: 'Falhas em C/C/S - Planejamento',
  S3: 'Falhas em C/C/S - Monitoramento e Supervisão',
  S4: 'Falhas em C/C/S - Comunicação',
  T1: 'Treinamento - Qualidade',
  T2: 'Treinamento - Adequação',
  W1: 'Condições de Trabalho - Tecnológico',
  W2: 'Condições de Trabalho - Organizacional',
  W3: 'Condições de Trabalho - Ambiente',
  W4: 'Condições de Trabalho - Equipe',
  O1: 'Influências Organizacionais - Recursos',
  O2: 'Influências Organizacionais - Clima',
  O3: 'Influências Organizacionais - Processos',
  O4: 'Influências Organizacionais - Gestão',
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function logError(error: unknown, stage: string, userId?: string, tenantId?: string) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[org/intelligence]', { stage, userId, tenantId, message: e.message, stack: e.stack })
}

function topCode(counts: Record<string, number>): string | null {
  const entries = Object.entries(counts)
  if (!entries.length) return null
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

function topCodes(counts: Record<string, number>, n: number): { code: string; count: number }[] {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([code, count]) => ({ code, count }))
}

export async function GET(req: Request) {
  let userId: string | undefined
  let tenantId: string | undefined

  try {
    const user = await requireBearerUser(req)
    userId = user.userId
    tenantId = user.tenantId
    const admin = getSupabaseAdmin()

    const now = new Date()
    const ninetyDaysAgo = new Date(now)
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const [analysesRes, actionsRes, eventsRes, recentEventsRes] = await Promise.all([
      admin
        .from('analyses')
        .select('id, event_id, perception_code, objective_code, action_code, preconditions, recommendations, created_at, erc_level')
        .eq('tenant_id', tenantId),
      admin
        .from('corrective_actions')
        .select('id, status, priority, due_date, analysis_id, created_at')
        .eq('tenant_id', tenantId),
      admin
        .from('events')
        .select('id, title, created_at')
        .eq('tenant_id', tenantId)
        .gte('created_at', ninetyDaysAgo.toISOString()),
      admin
        .from('events')
        .select('id, title, created_at')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false })
        .limit(5),
    ])

    if (analysesRes.error) {
      logError(analysesRes.error, 'query-analyses', userId, tenantId)
      return jsonError(`Falha ao consultar análises: ${analysesRes.error.message}`, 500)
    }
    if (actionsRes.error) {
      logError(actionsRes.error, 'query-actions', userId, tenantId)
      return jsonError(`Falha ao consultar ações: ${actionsRes.error.message}`, 500)
    }
    if (eventsRes.error) {
      logError(eventsRes.error, 'query-events', userId, tenantId)
      return jsonError(`Falha ao consultar eventos: ${eventsRes.error.message}`, 500)
    }
    if (recentEventsRes.error) {
      logError(recentEventsRes.error, 'query-recent-events', userId, tenantId)
    }

    const analyses = analysesRes.data ?? []
    const actions = actionsRes.data ?? []
    const events = eventsRes.data ?? []

    // --- Distribution ---
    const perceptionCounts: Record<string, number> = {}
    const objectiveCounts: Record<string, number> = {}
    const actionCounts: Record<string, number> = {}
    const preconditionCounts: Record<string, number> = {}
    const combinationCounts: Record<string, number> = {}
    const eventAnalysisMap: Record<string, { perception_code: string | null; objective_code: string | null; action_code: string | null }> = {}

    for (const a of analyses) {
      const p = a.perception_code as string | null
      const o = a.objective_code as string | null
      const ac = a.action_code as string | null

      if (p) perceptionCounts[p] = (perceptionCounts[p] || 0) + 1
      if (o) objectiveCounts[o] = (objectiveCounts[o] || 0) + 1
      if (ac) actionCounts[ac] = (actionCounts[ac] || 0) + 1

      const pre = a.preconditions as Array<{ code?: string }> | null
      if (pre) {
        for (const item of pre) {
          const c = item?.code
          if (c) preconditionCounts[c] = (preconditionCounts[c] || 0) + 1
        }
      }

      if (p && o) {
        const key = `${p} + ${o}`
        combinationCounts[key] = (combinationCounts[key] || 0) + 1
      }
      if (p && ac) {
        const key = `${p} + ${ac}`
        combinationCounts[key] = (combinationCounts[key] || 0) + 1
      }
      if (o && ac) {
        const key = `${o} + ${ac}`
        combinationCounts[key] = (combinationCounts[key] || 0) + 1
      }

      if (a.event_id) {
        eventAnalysisMap[a.event_id as string] = { perception_code: p, objective_code: o, action_code: ac }
      }
    }

    const total = analyses.length
    const pTotal = Object.values(perceptionCounts).reduce((s, v) => s + v, 0)
    const oTotal = Object.values(objectiveCounts).reduce((s, v) => s + v, 0)
    const aTotal = Object.values(actionCounts).reduce((s, v) => s + v, 0)

    const distribution = {
      perception: {
        count: pTotal,
        pct: total > 0 ? Math.round((pTotal / total) * 100) : 0,
        top_code: topCode(perceptionCounts),
        top_codes: topCodes(perceptionCounts, 3),
      },
      objective: {
        count: oTotal,
        pct: total > 0 ? Math.round((oTotal / total) * 100) : 0,
        top_code: topCode(objectiveCounts),
        top_codes: topCodes(objectiveCounts, 3),
      },
      action: {
        count: aTotal,
        pct: total > 0 ? Math.round((aTotal / total) * 100) : 0,
        top_code: topCode(actionCounts),
        top_codes: topCodes(actionCounts, 3),
      },
      total,
    }

    // --- Top preconditions ---
    const top_preconditions = Object.entries(preconditionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([code, count]) => ({
        code,
        count,
        pct: total > 0 ? Math.round((count / total) * 100) : 0,
        name: PRECONDITION_NAMES[code] ?? code,
      }))

    // --- Top combinations ---
    const top_combinations = Object.entries(combinationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([pair, count]) => ({
        pair,
        count,
        pct: total > 0 ? Math.round((count / total) * 100) : 0,
      }))

    // --- Actions ---
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const thirtyDaysAgo = new Date(today)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const openStatuses = new Set(['open', 'in_progress'])
    const openActions = actions.filter((a) => openStatuses.has(a.status as string))
    const open_total = openActions.length
    const open_overdue = openActions.filter((a) => a.due_date && new Date(a.due_date as string) < today).length
    const open_no_owner = 0
    const closed_last_30d = actions.filter(
      (a) =>
        a.status === 'closed' &&
        a.created_at &&
        new Date(a.created_at as string) >= thirtyDaysAgo
    ).length
    const closedTotal = actions.filter((a) => a.status === 'closed').length
    const resolution_rate =
      closedTotal + open_total > 0
        ? Math.round((closedTotal / (closedTotal + open_total)) * 100)
        : 0

    const actionsResult = { open_total, open_overdue, open_no_owner, closed_last_30d, resolution_rate }

    // --- Trend (last 6 months) ---
    const sixMonthsAgo = new Date(now)
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    sixMonthsAgo.setDate(1)
    sixMonthsAgo.setHours(0, 0, 0, 0)

    const trendCounts: Record<string, number> = {}
    for (const a of analyses) {
      const d = new Date(a.created_at as string)
      if (d < sixMonthsAgo) continue
      const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      trendCounts[month] = (trendCounts[month] || 0) + 1
    }

    const trend = Object.entries(trendCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({ month, count }))

    // --- Modal ERC level (from ARMS-ERC computation per analysis) ---
    const ercLevelCounts: Record<number, number> = {}
    for (const a of analyses) {
      const lvl = a.erc_level as number | null
      if (lvl) ercLevelCounts[lvl] = (ercLevelCounts[lvl] || 0) + 1
    }
    const ercEntries = Object.entries(ercLevelCounts)
    const modal_erc_level: number | null = ercEntries.length > 0
      ? Number(ercEntries.sort((a, b) => Number(b[1]) - Number(a[1]))[0][0])
      : null

    // --- Risk score ---
    const base_score =
      total > 0
        ? ((pTotal * 1.0 + oTotal * 0.8 + aTotal * 0.6) / total / 3) * 100
        : 0

    let penalties = 0
    if (open_overdue > 0) penalties += 15

    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const eventsThisMonth = events.filter((e) => new Date(e.created_at as string) >= thisMonthStart).length
    const monthsSpan = 3
    const monthlyAvg = events.length / monthsSpan
    if (monthlyAvg > 0 && eventsThisMonth > monthlyAvg * 1.5) penalties += 5

    const scoreValue = Math.min(Math.round(base_score + penalties), 100)
    const scoreLevel = scoreValue >= 70 ? 'critical' : scoreValue >= 40 ? 'warning' : 'ok'
    const scoreLabelMap: Record<string, string> = { critical: 'Crítico', warning: 'Atenção', ok: 'Normal' }
    const score = { value: scoreValue, level: scoreLevel, label: scoreLabelMap[scoreLevel] }

    // --- Alerts ---
    const alerts: string[] = []

    if (open_overdue > 0) {
      alerts.push(`${open_overdue} ação${open_overdue > 1 ? 'ões' : ''} corretiva${open_overdue > 1 ? 's' : ''} vencida${open_overdue > 1 ? 's' : ''} sem resolução`)
    }

    const topP = topCode(perceptionCounts)
    if (topP && total > 0) {
      const pct = Math.round((perceptionCounts[topP] / total) * 100)
      if (pct >= 30) alerts.push(`Falha ${topP} representa ${pct}% das análises — atenção`)
    }

    const monthlyAvgRounded = Math.round(monthlyAvg)
    alerts.push(`${eventsThisMonth} evento${eventsThisMonth !== 1 ? 's' : ''} este mês vs média de ${monthlyAvgRounded}/mês`)

    const analysisIdsWithActions = new Set(actions.map((a) => a.analysis_id as string))
    let unresolvedRecommendations = 0
    for (const a of analyses) {
      if (analysisIdsWithActions.has(a.id as string)) continue
      const recs = a.recommendations as unknown[] | null
      if (recs && recs.length > 0) unresolvedRecommendations += recs.length
    }
    if (unresolvedRecommendations > 0) {
      alerts.push(`${unresolvedRecommendations} recomendaç${unresolvedRecommendations > 1 ? 'ões' : 'ão'} sem ação corretiva criada`)
    }

    // --- Recent events (join with analyses via eventAnalysisMap) ---
    const recent_events = recentEventsRes.error
      ? []
      : (recentEventsRes.data ?? []).map((e) => ({
          id: e.id as string,
          title: e.title as string,
          created_at: e.created_at as string,
          ...(eventAnalysisMap[e.id as string] ?? { perception_code: null, objective_code: null, action_code: null }),
        }))

    return NextResponse.json({
      score,
      distribution,
      top_preconditions,
      top_combinations,
      actions: actionsResult,
      trend,
      alerts,
      total_analyses: total,
      total_events_90d: events.length,
      recent_events,
      modal_erc_level,
    })
  } catch (e) {
    if (e instanceof Response) return e
    logError(e, 'top-level', userId, tenantId)
    return jsonError(String(e), 500)
  }
}
