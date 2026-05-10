'use client'

interface ActionsData {
  open_total: number
  open_overdue: number
  open_no_owner: number
  resolution_rate: number
}

interface OrgScoreCardProps {
  score: number
  level: 'critical' | 'warning' | 'ok'
  label: string
  actions: ActionsData
}

const scoreColors: Record<string, string> = {
  critical: '#EF4444',
  warning: '#F59E0B',
  ok: '#22C55E',
}

export function OrgScoreCard({ score, level, label, actions }: OrgScoreCardProps) {
  const scoreColor = scoreColors[level]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 flex items-center gap-6">
      <div className="flex-shrink-0">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Score de Risco</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
          <span className="text-sm font-semibold" style={{ color: scoreColor }}>{label.toUpperCase()}</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${score}%`, background: scoreColor }}
          />
        </div>
        <p className="text-xs text-slate-600 mt-1">0 — 100 (maior = mais crítico)</p>
      </div>

      <div className="flex gap-6 flex-shrink-0 border-l border-slate-800 pl-6">
        <div className="text-center">
          <p className="text-xl font-bold text-white">{actions.open_overdue}</p>
          <p className="text-xs text-slate-500">Ações vencidas</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-white">{actions.open_no_owner}</p>
          <p className="text-xs text-slate-500">Sem responsável</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-white">{actions.resolution_rate}%</p>
          <p className="text-xs text-slate-500">Taxa resolução</p>
        </div>
      </div>
    </div>
  )
}
