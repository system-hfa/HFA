'use client'

interface Props {
  stepAltered: string
  newValue: string
  newValueName: string
  stepsRecalculated: number[]
  stepsPreserved: number[]
  reason: string
  onReasonChange: (v: string) => void
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

const STEP_LABELS: Record<string, string> = {
  '2': 'Ponto de Fuga (Etapa 2)',
  '3': 'Falha de Percepção (Etapa 3)',
  '4': 'Falha de Objetivo (Etapa 4)',
  '5': 'Falha de Ação (Etapa 5)',
  '6': 'Pré-condições e Conclusões (Etapa 6)',
  '7': 'Recomendações (Etapa 7)',
}

function stepToLabel(n: number) {
  const labels: Record<number, string> = {
    3: 'Percepção (Etapa 3)',
    4: 'Objetivo (Etapa 4)',
    5: 'Ação (Etapa 5)',
    6: 'Pré-condições + Conclusões',
    7: 'Recomendações',
  }
  return labels[n] || `Etapa ${n}`
}

export default function ConfirmRecalculateModal({
  stepAltered, newValue, newValueName,
  stepsRecalculated, stepsPreserved,
  reason, onReasonChange,
  onConfirm, onCancel, loading,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">

        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-semibold text-white">Recalcular análise dependente?</h2>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Você alterou <strong className="text-white">{STEP_LABELS[stepAltered]}</strong> para{' '}
            <strong className="text-emerald-400 font-mono">{newValue}</strong>{' '}
            <span className="text-slate-400">— {newValueName}</span>
          </p>
        </div>

        <div className="p-6 space-y-4">
          {stepsRecalculated.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">🔄 Será recalculado</p>
              <ul className="space-y-1">
                {stepsRecalculated.map(s => (
                  <li key={s} className="flex items-center gap-2 text-sm text-blue-300">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    {stepToLabel(s)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {stepsPreserved.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">✓ Será preservado</p>
              <ul className="space-y-1">
                {stepsPreserved.map(s => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                    {stepToLabel(s)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-2">
              Motivo da alteração <span className="text-slate-600">(opcional)</span>
            </label>
            <textarea
              value={reason}
              onChange={e => onReasonChange(e.target.value)}
              placeholder="Ex: Revisão com base em nova evidência do relatório..."
              rows={2}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Recalculando…
              </>
            ) : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}
