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

const combinationMeaning: Record<string, string> = {
  'P-F': 'falha de percepção por foco',
  'P-M': 'falha de percepção por memória',
  'O-B': 'objetivo baseado em viés',
  'O-A': 'objetivo inadequado',
  'A-I': 'ação incorreta',
  'A-O': 'ação omitida',
}

function combinationDescription(pair: string): string {
  const parts = pair.split(' + ')
  const descriptions = parts.map((p) => combinationMeaning[p] ?? p)
  return descriptions.join(' associada a ')
}

function TrendLine({ trend }: { trend: { month: string; count: number }[] }) {
  if (trend.length < 2) return null
  const maxCount = Math.max(...trend.map((t) => t.count), 1)
  const w = 600
  const h = 100
  const padX = 30
  const padY = 10
  const innerW = w - padX * 2
  const innerH = h - padY * 2
  const points = trend.map((t, i) => {
    const x = padX + (i / (trend.length - 1)) * innerW
    const y = padY + innerH - (t.count / maxCount) * innerH
    return { x, y, ...t }
  })
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')

  const last3 = trend.slice(-3)
  const trendDir =
    last3.length >= 2
      ? last3[last3.length - 1].count > last3[0].count
        ? '↑ Crescente'
        : last3[last3.length - 1].count < last3[0].count
          ? '↓ Decrescente'
          : '→ Estável'
      : '—'

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-slate-400 text-xs uppercase tracking-wide">Distribuição temporal</h4>
        <span className="text-xs text-slate-400">{trendDir}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full overflow-visible">
        <polyline
          points={polyline}
          fill="none"
          className="stroke-blue-500"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r={4} className="fill-blue-500" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={9} className="fill-white">
              {p.count}
            </text>
            <text x={p.x} y={h + 18} textAnchor="middle" fontSize={9} className="fill-slate-400">
              {new Date(Number(p.month.split('-')[0]), Number(p.month.split('-')[1]) - 1)
                .toLocaleString('pt-BR', { month: 'short' })}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function RiskProfilePage() {
  const [data, setData] = useState<Intelligence | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const t = session.access_token
      setToken(t)
      try {
        const intel = await fetch('/api/org/intelligence', {
          headers: { Authorization: `Bearer ${t}` },
        }).then(r => r.json())
        setData(intel)
      } catch {
        // setData stays null → empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Carregando perfil de risco...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Perfil de Risco Organizacional</h1>
          <p className="text-slate-400 mt-1">
            Baseado em {data?.total_analyses ?? 0} análises SERA
          </p>
        </div>
        <button
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 transition-colors"
          onClick={() => alert('Exportação PDF em desenvolvimento')}
        >
          Exportar Relatório PDF
        </button>
      </div>

      {/* 2. Score + semáforo */}
      {data && (
        <OrgScoreCard
          score={data.score.value}
          level={data.score.level}
          label={data.score.label}
          actions={data.actions}
        />
      )}

      {/* 3. Mapa de combinações */}
      {(data?.top_combinations ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Combinações de Falha Mais Frequentes</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-left">
                <th className="pb-2 font-medium pr-4">Combinação</th>
                <th className="pb-2 font-medium pr-4">Ocorrências</th>
                <th className="pb-2 font-medium pr-4">%</th>
                <th className="pb-2 font-medium">Significado operacional</th>
              </tr>
            </thead>
            <tbody>
              {data!.top_combinations.map((c) => (
                <tr key={c.pair} className="border-b border-slate-800/50 last:border-0">
                  <td className="py-3 pr-4 font-mono text-blue-400 whitespace-nowrap">{c.pair}</td>
                  <td className="py-3 pr-4 text-white font-semibold">{c.count}</td>
                  <td className="py-3 pr-4 text-slate-400">{c.pct}%</td>
                  <td className="py-3 text-slate-400 text-xs">{combinationDescription(c.pair)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Ranking completo de precondições */}
      {(data?.top_preconditions ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Ranking de Precondições</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-left">
                <th className="pb-2 font-medium pr-4">Rank</th>
                <th className="pb-2 font-medium pr-4">Código</th>
                <th className="pb-2 font-medium pr-4">Nome</th>
                <th className="pb-2 font-medium pr-4">Freq.</th>
                <th className="pb-2 font-medium pr-4">%</th>
                <th className="pb-2 font-medium w-32">Visual</th>
              </tr>
            </thead>
            <tbody>
              {data!.top_preconditions.map((p, i) => (
                <tr key={p.code} className="border-b border-slate-800/50 last:border-0">
                  <td className="py-3 pr-4 text-slate-500">#{i + 1}</td>
                  <td className="py-3 pr-4 font-mono text-yellow-400 font-bold">{p.code}</td>
                  <td className="py-3 pr-4 text-slate-300">{p.name}</td>
                  <td className="py-3 pr-4 text-white font-semibold">{p.count}</td>
                  <td className="py-3 pr-4 text-slate-400">{p.pct}%</td>
                  <td className="py-3">
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${p.pct}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Análise por IA */}
      {data && token && (
        <AiInsightPanel intelligenceData={data} token={token} />
      )}

      {/* 6. Distribuição temporal */}
      {(data?.trend ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Distribuição Temporal</h3>
          <TrendLine trend={data!.trend} />
        </div>
      )}
    </div>
  )
}
