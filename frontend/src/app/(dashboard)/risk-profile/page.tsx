'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { OrgScoreCard } from '@/components/sera/OrgScoreCard'
import { AiInsightPanel } from '@/components/sera/AiInsightPanel'

interface Intelligence {
  score: { value: number; level: 'critical' | 'warning' | 'ok'; label: string }
  distribution: {
    perception: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
    objective: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
    action: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
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

// ── Shared mapping constants ──────────────────────────────────────────────────

const P_SEVERITY: Record<string, number> = {
  'P-B': 4, 'P-F': 4,
  'P-C': 3, 'P-E': 3, 'P-D': 3, 'P-G': 3,
  'P-H': 2,
}

const ARMS_SEV_ROW: Record<string, 'A' | 'B' | 'C' | 'D'> = {
  'P-B': 'B', 'P-F': 'B',
  'P-A': 'D',
}

const ARMS_ERC: Record<string, number> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}

const ERC_COLOR: Record<number, string> = {
  5: '#DC2626', 4: '#EA580C', 3: '#D97706', 2: '#84CC16', 1: '#16A34A',
}

function tCellColor(score: number): string {
  if (score >= 17) return '#DC2626'
  if (score >= 10) return '#EA580C'
  if (score >= 5) return '#D97706'
  return '#16A34A'
}

function barrierLevel(score: number): 1 | 2 | 3 | 4 {
  if (score >= 70) return 1
  if (score >= 40) return 2
  if (score >= 20) return 3
  return 4
}

// ── Traditional 5×5 Matrix ───────────────────────────────────────────────────

const SEV_LABELS = [
  { num: '5', name: 'Catastrófica' },
  { num: '4', name: 'Grave' },
  { num: '3', name: 'Moderada' },
  { num: '2', name: 'Menor' },
  { num: '1', name: 'Negligível' },
]

const PROB_LABELS = [
  { num: '1', name: 'Improvável' },
  { num: '2', name: 'Remoto' },
  { num: '3', name: 'Ocasional' },
  { num: '4', name: 'Provável' },
  { num: '5', name: 'Frequente' },
]

function TraditionalMatrix({ data }: { data: Intelligence }) {
  const topCodes = data.distribution.perception.top_codes ?? []

  const cellMap: Record<string, { count: number; codes: string[] }> = {}
  for (const tc of topCodes) {
    const sev = P_SEVERITY[tc.code] ?? 3
    const prob = Math.min(5, Math.max(1, Math.ceil(tc.count / 5)))
    const key = `${prob}-${sev}`
    if (!cellMap[key]) cellMap[key] = { count: 0, codes: [] }
    cellMap[key].count += tc.count
    cellMap[key].codes.push(tc.code)
  }

  const lp = 102   // left pad (Y labels)
  const tp = 10    // top pad
  const cw = 66    // cell width
  const ch = 54    // cell height
  const xh = 46    // x-label height
  const svgW = lp + 5 * cw + 10
  const svgH = tp + 5 * ch + xh

  return (
    <div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ minWidth: `${svgW}px` }} className="w-full max-w-full">
          {/* Axis title: SEVERIDADE (rotated) */}
          <text
            x={14}
            y={tp + (5 * ch) / 2}
            textAnchor="middle"
            fontSize={9}
            fill="#64748B"
            transform={`rotate(-90 14 ${tp + (5 * ch) / 2})`}
            fontWeight="600"
            letterSpacing="1"
          >
            SEVERIDADE
          </text>

          {/* Grid cells */}
          {SEV_LABELS.map((sevL, row) =>
            PROB_LABELS.map((_, col) => {
              const prob = col + 1
              const sev = 5 - row
              const score = prob * sev
              const color = tCellColor(score)
              const x = lp + col * cw
              const y = tp + row * ch
              const key = `${prob}-${sev}`
              const cell = cellMap[key]
              return (
                <g key={`${row}-${col}`}>
                  <rect
                    x={x} y={y} width={cw} height={ch}
                    fill={color} fillOpacity={0.18}
                    stroke="#1E293B" strokeWidth={1}
                  />
                  <text x={x + cw - 5} y={y + 13} textAnchor="end" fontSize={8} fill={color} fillOpacity={0.55}>
                    {score}
                  </text>
                  {cell && (
                    <g>
                      <title>{cell.codes.join(', ')} — {cell.count} análise{cell.count !== 1 ? 's' : ''}</title>
                      <circle cx={x + cw / 2} cy={y + ch / 2} r={15} fill={color} fillOpacity={0.9} />
                      <text x={x + cw / 2} y={y + ch / 2 + 5} textAnchor="middle" fontSize={12} fontWeight="bold" fill="white">
                        {cell.count}
                      </text>
                    </g>
                  )}
                </g>
              )
            })
          )}

          {/* Y axis labels */}
          {SEV_LABELS.map((l, i) => {
            const y = tp + i * ch + ch / 2
            return (
              <text key={i} x={lp - 8} y={y - 5} textAnchor="end" fontSize={9} fill="#94A3B8">
                <tspan x={lp - 8} dy="0" fontWeight="600">{l.num}</tspan>
                <tspan x={lp - 8} dy="12">{l.name}</tspan>
              </text>
            )
          })}

          {/* X axis labels */}
          {PROB_LABELS.map((l, i) => {
            const x = lp + i * cw + cw / 2
            return (
              <text key={i} x={x} y={tp + 5 * ch + 16} textAnchor="middle" fontSize={9} fill="#94A3B8">
                <tspan x={x} dy="0" fontWeight="600">{l.num}</tspan>
                <tspan x={x} dy="12">{l.name}</tspan>
              </text>
            )
          })}

          {/* Axis title: PROBABILIDADE */}
          <text
            x={lp + (5 * cw) / 2}
            y={svgH - 2}
            textAnchor="middle"
            fontSize={9}
            fill="#64748B"
            fontWeight="600"
            letterSpacing="1"
          >
            PROBABILIDADE
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        {[
          { color: '#16A34A', label: 'Verde — Risco aceitável: monitorar' },
          { color: '#D97706', label: 'Amarelo — Risco tolerável: ação planejada' },
          { color: '#EA580C', label: 'Laranja — Risco elevado: ação corretiva urgente' },
          { color: '#DC2626', label: 'Vermelho — Risco inaceitável: ação imediata' },
        ].map((item) => (
          <div key={item.color} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-600 text-xs mt-2">Referência: ISO 31000:2018 · ICAO Doc 9859 SMM</p>
    </div>
  )
}

// ── ARMS-ERC 4×4 Matrix ──────────────────────────────────────────────────────

const ARMS_SEV_LABELS = [
  { key: 'A' as const, name: 'Catastrófico', sub: 'fatalidades múltiplas' },
  { key: 'B' as const, name: 'Grave', sub: 'fatalidade ou lesão grave' },
  { key: 'C' as const, name: 'Significativo', sub: 'lesão leve, dano sério' },
  { key: 'D' as const, name: 'Menor', sub: 'sem lesão, dano menor' },
]

const ARMS_BARRIER_LABELS = [
  { key: 1 as const, name: 'Nenhuma', sub: 'dependeu de sorte' },
  { key: 2 as const, name: 'Mínima', sub: 'barreiras mínimas' },
  { key: 3 as const, name: 'Limitada', sub: 'efetividade limitada' },
  { key: 4 as const, name: 'Efetiva', sub: 'barreiras robustas' },
]

function ARMSMatrix({ data }: { data: Intelligence }) {
  const topCodes = data.distribution.perception.top_codes ?? []
  const barrier = barrierLevel(data.score.value)

  const cellMap: Record<string, { count: number; codes: string[] }> = {}
  for (const tc of topCodes) {
    const row = ARMS_SEV_ROW[tc.code] ?? 'C'
    const col = barrier
    const key = `${row}${col}`
    if (!cellMap[key]) cellMap[key] = { count: 0, codes: [] }
    cellMap[key].count += tc.count
    cellMap[key].codes.push(tc.code)
  }

  const lp = 118
  const tp = 10
  const cw = 72
  const ch = 62
  const xh = 50
  const svgW = lp + 4 * cw + 10
  const svgH = tp + 4 * ch + xh

  return (
    <div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ minWidth: `${svgW}px` }} className="w-full max-w-full">
          {/* Axis title: SEVERIDADE */}
          <text
            x={14}
            y={tp + (4 * ch) / 2}
            textAnchor="middle"
            fontSize={9}
            fill="#64748B"
            transform={`rotate(-90 14 ${tp + (4 * ch) / 2})`}
            fontWeight="600"
            letterSpacing="1"
          >
            SEVERIDADE DO RESULTADO
          </text>

          {/* Grid cells */}
          {ARMS_SEV_LABELS.map((sevL, row) =>
            ARMS_BARRIER_LABELS.map((barL, col) => {
              const cellKey = `${sevL.key}${barL.key}`
              const erc = ARMS_ERC[cellKey] ?? 2
              const color = ERC_COLOR[erc]
              const x = lp + col * cw
              const y = tp + row * ch
              const cell = cellMap[cellKey]
              return (
                <g key={cellKey}>
                  <rect
                    x={x} y={y} width={cw} height={ch}
                    fill={color} fillOpacity={0.18}
                    stroke="#1E293B" strokeWidth={1}
                  />
                  <text x={x + cw - 5} y={y + 13} textAnchor="end" fontSize={8} fill={color} fillOpacity={0.6}>
                    ERC{erc}
                  </text>
                  {cell && (
                    <g>
                      <title>{cell.codes.join(', ')} — {cell.count} análise{cell.count !== 1 ? 's' : ''}</title>
                      <circle cx={x + cw / 2} cy={y + ch / 2} r={15} fill={color} fillOpacity={0.9} />
                      <text x={x + cw / 2} y={y + ch / 2 + 5} textAnchor="middle" fontSize={12} fontWeight="bold" fill="white">
                        {cell.count}
                      </text>
                    </g>
                  )}
                </g>
              )
            })
          )}

          {/* Y axis labels */}
          {ARMS_SEV_LABELS.map((l, i) => {
            const y = tp + i * ch + ch / 2
            return (
              <text key={l.key} x={lp - 8} y={y - 6} textAnchor="end" fontSize={9} fill="#94A3B8">
                <tspan x={lp - 8} dy="0" fontWeight="700">{l.key}</tspan>
                <tspan x={lp - 8} dy="12" fontWeight="600">{l.name}</tspan>
                <tspan x={lp - 8} dy="11" fontSize={8} fill="#64748B">{l.sub}</tspan>
              </text>
            )
          })}

          {/* X axis labels */}
          {ARMS_BARRIER_LABELS.map((l, i) => {
            const x = lp + i * cw + cw / 2
            return (
              <text key={l.key} x={x} y={tp + 4 * ch + 16} textAnchor="middle" fontSize={9} fill="#94A3B8">
                <tspan x={x} dy="0" fontWeight="700">{l.key}</tspan>
                <tspan x={x} dy="12" fontWeight="600">{l.name}</tspan>
                <tspan x={x} dy="11" fontSize={8} fill="#64748B">{l.sub}</tspan>
              </text>
            )
          })}

          {/* Axis title: BARREIRAS */}
          <text
            x={lp + (4 * cw) / 2}
            y={svgH - 1}
            textAnchor="middle"
            fontSize={9}
            fill="#64748B"
            fontWeight="600"
            letterSpacing="1"
          >
            EFETIVIDADE DAS BARREIRAS REMANESCENTES
          </text>
        </svg>
      </div>

      {/* ERC Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        {[
          { erc: 5, label: 'ERC 5 — Ação imediata' },
          { erc: 4, label: 'ERC 4 — Urgente' },
          { erc: 3, label: 'ERC 3 — Ação requerida' },
          { erc: 2, label: 'ERC 2 — Monitorar' },
          { erc: 1, label: 'ERC 1 — Aceitável' },
        ].map((item) => (
          <div key={item.erc} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ERC_COLOR[item.erc] }} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ARMS explanation */}
      <div className="mt-5 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-xs text-slate-400 leading-relaxed space-y-2">
        <p>
          A matriz ARMS-ERC difere da matriz tradicional em um aspecto fundamental: em vez de usar probabilidade
          histórica (quantas vezes esse tipo de evento ocorreu no passado), ela avalia a efetividade das barreiras
          de segurança que estavam presentes no momento do evento.
        </p>
        <p>
          Esta abordagem é mais adequada para eventos de segurança operacional porque reflete o risco real que
          existia no momento — não uma estimativa estatística baseada em dados históricos que podem não refletir
          o contexto específico.
        </p>
        <p className="text-slate-500">
          Desenvolvida pelo ARMS Working Group (EASA, Eurocontrol, IATA, 2007–2010) e adotada pela regulação
          europeia de reporte de ocorrências (EU 376/2014).
        </p>
      </div>
    </div>
  )
}

// ── Utility components ────────────────────────────────────────────────────────

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
        <polyline points={polyline} fill="none" className="stroke-blue-500" strokeWidth={2} strokeLinejoin="round" />
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r={4} className="fill-blue-500" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={9} className="fill-white">{p.count}</text>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RiskProfilePage() {
  const [data, setData] = useState<Intelligence | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)
  const [matrixTab, setMatrixTab] = useState<'traditional' | 'arms'>('traditional')
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const t = session.access_token
      setToken(t)
      try {
        const res = await fetch('/api/org/intelligence', {
          headers: { Authorization: `Bearer ${t}` },
        })
        if (res.ok) {
          const intel = await res.json()
          if (intel?.score) setData(intel)
        }
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
      {data?.score && (
        <OrgScoreCard
          score={data.score.value}
          level={data.score.level}
          label={data.score.label}
          actions={data.actions}
        />
      )}

      {/* 3. Matrizes de Risco */}
      {data && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          {/* Tab header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-white font-semibold">Matriz de Risco</h3>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 text-sm">
              <button
                onClick={() => setMatrixTab('traditional')}
                className={`px-4 py-1.5 transition-colors ${matrixTab === 'traditional' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                ISO 31000 / ICAO
              </button>
              <button
                onClick={() => setMatrixTab('arms')}
                className={`px-4 py-1.5 transition-colors ${matrixTab === 'arms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                ARMS-ERC
              </button>
            </div>
          </div>

          {/* Matrix subtitle */}
          {matrixTab === 'traditional' ? (
            <p className="text-slate-500 text-xs">
              Matriz 5×5 baseada em Probabilidade × Severidade — ISO 31000:2018 e ICAO Doc 9859
            </p>
          ) : (
            <p className="text-slate-500 text-xs">
              Matriz 4×4 baseada em Severidade do resultado × Efetividade das barreiras — Aviation Risk Management Solutions (EASA, 2010)
            </p>
          )}

          {/* Matrix render */}
          {matrixTab === 'traditional' ? (
            <TraditionalMatrix data={data} />
          ) : (
            <ARMSMatrix data={data} />
          )}

          {/* Collapsible guide: Qual usar? */}
          <div className="border-t border-slate-800 pt-4">
            <button
              onClick={() => setShowGuide((v) => !v)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <span className={`transition-transform ${showGuide ? 'rotate-90' : ''}`}>▶</span>
              Qual matriz usar para cada situação?
            </button>
            {showGuide && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
                <div className="bg-slate-800/60 rounded-lg p-4 space-y-2">
                  <p className="text-white font-semibold text-sm mb-1">Use a Matriz Tradicional (ISO 31000) quando:</p>
                  <p>• Precisa de comparabilidade com outras organizações</p>
                  <p>• Está fazendo relatório para gestão ou auditoria</p>
                  <p>• Tem dados históricos suficientes para estimar probabilidade</p>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-4 space-y-2">
                  <p className="text-white font-semibold text-sm mb-1">Use a Matriz ARMS-ERC quando:</p>
                  <p>• Quer avaliar o risco real de um evento específico</p>
                  <p>• Está triando eventos para priorizar investigações</p>
                  <p>• Opera sob regulação europeia (EU 376/2014)</p>
                  <p>• Prefere uma abordagem baseada em barreiras de segurança</p>
                </div>
                <div className="sm:col-span-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-300 text-xs">
                    Na prática, organizações maduras usam as duas: a tradicional para comunicação executiva e
                    a ARMS-ERC para gestão operacional de riscos.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Mapa de combinações */}
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

      {/* 5. Ranking completo de precondições */}
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

      {/* 6. Análise por IA */}
      {data?.score && token && (
        <AiInsightPanel intelligenceData={data} token={token} />
      )}

      {/* 7. Distribuição temporal */}
      {(data?.trend ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Distribuição Temporal</h3>
          <TrendLine trend={data!.trend} />
        </div>
      )}
    </div>
  )
}
