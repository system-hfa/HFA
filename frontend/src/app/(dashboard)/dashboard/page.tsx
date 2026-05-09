'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { OrgScoreCard } from '@/components/sera/OrgScoreCard'
import { AiInsightPanel } from '@/components/sera/AiInsightPanel'

interface Intelligence {
  score: { value: number; level: 'critical' | 'warning' | 'ok'; label: string }
  distribution: {
    perception: { count: number; pct: number; top_code: string | null }
    objective: { count: number; pct: number; top_code: string | null }
    action: { count: number; pct: number; top_code: string | null }
    total: number
  }
  top_preconditions: { code: string; count: number; pct: number; name: string }[]
  top_combinations: { pair: string; count: number; pct: number }[]
  actions: {
    open_total: number
    open_overdue: number
    open_no_owner: number
    closed_last_30d: number
    resolution_rate: number
  }
  trend: { month: string; count: number }[]
  alerts: string[]
  total_analyses: number
  total_events_90d: number
}

interface Event {
  id: string
  title: string
  created_at: string
  perception_code?: string
  objective_code?: string
  action_code?: string
}

const subtitleMap = {
  critical: '⚠️ Atenção: sua operação requer intervenção imediata',
  warning: 'Monitoramento ativo recomendado',
  ok: 'Operação dentro dos parâmetros normais',
}

const distColors = {
  perception: { bar: 'bg-blue-500', border: 'border-blue-500/40', text: 'text-blue-400' },
  objective: { bar: 'bg-purple-500', border: 'border-purple-500/40', text: 'text-purple-400' },
  action: { bar: 'bg-orange-500', border: 'border-orange-500/40', text: 'text-orange-400' },
}

export default function DashboardPage() {
  const [data, setData] = useState<Intelligence | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const t = session.access_token
      setToken(t)
      try {
        const [intelRes, eventsRes] = await Promise.all([
          fetch('/api/org/intelligence', { headers: { Authorization: `Bearer ${t}` } }),
          fetch('/api/events', { headers: { Authorization: `Bearer ${t}` } }).catch(() => null),
        ])
        console.log('Intelligence status:', intelRes.status)
        const intel = await intelRes.json()
        console.log('Intelligence data:', intel)
        if (intelRes.ok && intel?.score) {
          setData(intel)
        } else if (!intelRes.ok) {
          setError(intel?.detail ?? `HTTP ${intelRes.status}`)
        }
        if (eventsRes?.ok) {
          const eventsData = await eventsRes.json().catch(() => [])
          setEvents((Array.isArray(eventsData) ? eventsData : (eventsData.events ?? [])).slice(0, 5))
        }
      } catch (err) {
        console.error('Intelligence fetch error:', err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Carregando...
      </div>
    )
  }

  const level = data?.score.level ?? 'ok'
  const domDist = data
    ? (['perception', 'objective', 'action'] as const).reduce((best, cur) =>
        (data.distribution[cur].pct > data.distribution[best].pct ? cur : best),
        'perception' as 'perception' | 'objective' | 'action'
      )
    : 'perception'

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">{subtitleMap[level]}</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 text-sm">
          Erro ao carregar dados: {error}
        </div>
      )}

      {/* 2. Score de Risco */}
      {data?.score && (
        <OrgScoreCard
          score={data.score.value}
          level={data.score.level}
          label={data.score.label}
          actions={data.actions}
        />
      )}

      {/* 3. Alertas */}
      {(data?.alerts ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data!.alerts.map((alert, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-full px-3 py-1"
            >
              ⚠ {alert}
            </span>
          ))}
        </div>
      )}

      {/* 4. Distribuição de falhas */}
      {data?.distribution && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['perception', 'objective', 'action'] as const).map((key) => {
            const dist = data.distribution[key]
            const c = distColors[key]
            const isDom = key === domDist
            const labels = { perception: 'Percepção', objective: 'Objetivo', action: 'Ação' }
            return (
              <div
                key={key}
                className={`bg-slate-900 border rounded-xl p-5 ${isDom ? c.border + ' ring-1 ring-inset ' + c.border : 'border-slate-800'}`}
              >
                <p className="text-slate-400 text-xs mb-1">{labels[key]}</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className={`text-4xl font-bold ${c.text}`}>{dist.pct}%</span>
                  {dist.top_code && (
                    <span className={`text-sm font-mono pb-1 ${c.text}`}>{dist.top_code}</span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${dist.pct}%` }} />
                </div>
                <p className="text-slate-500 text-xs mt-2">{dist.count} ocorrências</p>
                {isDom && (
                  <span className={`inline-block mt-2 text-xs ${c.text} font-semibold`}>▲ Categoria dominante</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* 5. Análise por IA */}
      {data?.score && token && (
        <AiInsightPanel intelligenceData={data} token={token} />
      )}

      {/* 6. Top precondições */}
      {(data?.top_preconditions ?? []).length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3">Top Precondições</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {data!.top_preconditions.map((p) => (
              <div key={p.code} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <p className="text-yellow-400 font-mono font-bold text-xl">{p.code}</p>
                <p className="text-white font-semibold text-lg">{p.count}x</p>
                <p className="text-slate-500 text-xs leading-tight mt-1">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Tendência SVG */}
      {(data?.trend ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Tendência — Últimos 6 Meses</h3>
          <TrendChart trend={data!.trend} />
        </div>
      )}

      {/* 8. Eventos recentes */}
      {events.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Eventos Recentes</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="text-left pb-2 font-medium">Data</th>
                <th className="text-left pb-2 font-medium">Título</th>
                <th className="text-left pb-2 font-medium">P / O / A</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id} className="border-b border-slate-800/50 last:border-0">
                  <td className="py-2.5 pr-4 text-slate-400 whitespace-nowrap">
                    {new Date(ev.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-2.5 pr-4 text-white">{ev.title}</td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-400">
                    {[ev.perception_code, ev.objective_code, ev.action_code].filter(Boolean).join(' / ') || '—'}
                  </td>
                  <td className="py-2.5 text-right">
                    <a href={`/events/${ev.id}`} className="text-blue-400 hover:text-blue-300 text-xs">Ver</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function TrendChart({ trend }: { trend: { month: string; count: number }[] }) {
  const maxCount = Math.max(...trend.map((t) => t.count), 1)
  const chartH = 120
  const barW = 40
  const gap = 16
  const padX = 12
  const totalW = trend.length * (barW + gap) - gap + padX * 2

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH + 40}`} className="w-full overflow-visible">
      {trend.map((t, i) => {
        const x = padX + i * (barW + gap)
        const barH = Math.max((t.count / maxCount) * chartH, 4)
        const y = chartH - barH
        const [year, month] = t.month.split('-')
        const label = new Date(Number(year), Number(month) - 1).toLocaleString('pt-BR', { month: 'short' })
        return (
          <g key={t.month}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} className="fill-blue-500/70" />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" className="fill-white text-[10px]" fontSize={11}>
              {t.count}
            </text>
            <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" className="fill-slate-400 text-[10px]" fontSize={10}>
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
