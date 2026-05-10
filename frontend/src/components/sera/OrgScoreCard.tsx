'use client'

interface OrgScoreCardProps {
  score: number
  level: 'critical' | 'warning' | 'ok'
  label: string
  actions: {
    open_overdue: number
    open_no_owner: number
    resolution_rate: number
  }
}

const COLORS = {
  critical: '#EF4444',
  warning: '#F59E0B',
  ok: '#22C55E',
}

export function OrgScoreCard({ score, level, label, actions }: OrgScoreCardProps) {
  const color = COLORS[level]
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4
      flex items-center gap-8">

      {/* Score número */}
      <div className="flex-shrink-0 flex items-baseline gap-2">
        <span className="text-5xl font-bold tabular-nums"
          style={{ color, lineHeight: 1 }}>
          {score}
        </span>
        <span className="text-sm font-semibold" style={{ color }}>
          {label}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="flex-1 min-w-0">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full"
            style={{ width: `${score}%`, background: color,
              transition: 'width 0.6s ease' }} />
        </div>
        <p className="text-xs text-slate-600 mt-1.5">
          0 — 100 · quanto maior, mais crítico
        </p>
      </div>

      {/* 3 métricas */}
      <div className="flex gap-6 flex-shrink-0 pl-6
        border-l border-slate-800">
        {[
          { value: actions.open_overdue, label: 'Ações vencidas' },
          { value: actions.open_no_owner, label: 'Sem responsável' },
          { value: `${actions.resolution_rate}%`, label: 'Taxa resolução' },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-2xl font-bold text-white tabular-nums">
              {m.value}
            </p>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
