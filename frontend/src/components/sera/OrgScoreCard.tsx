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

const levelStyles = {
  critical: {
    text: 'text-red-400',
    bar: 'bg-red-500',
    border: 'border-red-500/40',
    bg: 'bg-red-500/10',
  },
  warning: {
    text: 'text-amber-400',
    bar: 'bg-amber-400',
    border: 'border-amber-400/40',
    bg: 'bg-amber-400/10',
  },
  ok: {
    text: 'text-green-400',
    bar: 'bg-green-400',
    border: 'border-green-400/40',
    bg: 'bg-green-400/10',
  },
}

export function OrgScoreCard({ score, level, label, actions }: OrgScoreCardProps) {
  const s = levelStyles[level]

  return (
    <div className={`bg-slate-900 border ${s.border} rounded-xl p-6 flex flex-col sm:flex-row gap-6`}>
      <div className="flex-1">
        <p className="text-slate-400 text-sm mb-1">Score de Risco</p>
        <div className="flex items-end gap-3 mb-3">
          <span className={`text-6xl font-bold ${s.text}`}>{score}</span>
          <span className={`text-lg font-semibold pb-1 ${s.text}`}>{label.toUpperCase()}</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${s.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-1">0 — 100 (maior = mais crítico)</p>
      </div>

      <div className="flex sm:flex-col gap-4 sm:gap-3 sm:justify-center sm:border-l sm:border-slate-800 sm:pl-6">
        <Metric label="Ações vencidas" value={actions.open_overdue} highlight={actions.open_overdue > 0} />
        <Metric label="Sem responsável" value={actions.open_no_owner} highlight={actions.open_no_owner > 0} />
        <Metric label="Taxa resolução" value={`${actions.resolution_rate}%`} />
      </div>
    </div>
  )
}

function Metric({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="text-center sm:text-right">
      <p className={`text-2xl font-bold ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
      <p className="text-slate-500 text-xs">{label}</p>
    </div>
  )
}
