'use client'
import { useState } from 'react'
import DidacticModal from './DidacticModal'
import ConfirmRecalculateModal from './ConfirmRecalculateModal'
import { FAILURE_NAMES } from '@/data/tutorials'
import { resolveApiUrl } from '@/lib/api'

const DEPENDENCY_MAP: Record<string, { recalculate: number[]; preserve: number[] }> = {
  '2': { recalculate: [3, 4, 5, 6, 7], preserve: [] },
  '3': { recalculate: [6, 7],           preserve: [4, 5] },
  '4': { recalculate: [6, 7],           preserve: [3, 5] },
  '5': { recalculate: [6, 7],           preserve: [3, 4] },
}

interface FlowNode {
  justificativa?: string
  resposta?: string
  [key: string]: unknown
}

interface Props {
  code: string
  name: string
  justification?: string
  flowPath?: FlowNode[]
  stepAltered: '2' | '3' | '4' | '5'
  field: string
  availableCodes: string[]
  analysisId: string
  token: string
  badge?: 'preserved' | 'recalculated' | null
  onUpdated: (data: unknown) => void
}

export default function EditableClassification({
  code, name, justification, flowPath,
  stepAltered, field, availableCodes,
  analysisId, token, badge,
  onUpdated,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [selectedCode, setSelectedCode] = useState(code)
  const [showDidactic, setShowDidactic] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const dep = DEPENDENCY_MAP[stepAltered]

  async function handleConfirm() {
    setLoading(true)
    try {
      const res = await fetch(resolveApiUrl(`/analyses/${analysisId}/recalculate`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          step_altered: stepAltered,
          field,
          new_value: selectedCode,
          reason,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      onUpdated(data)
      setEditing(false)
      setShowConfirm(false)
      setReason('')
    } catch (err) {
      console.error('Recalculate error:', err)
      alert('Erro ao recalcular. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Badge */}
      {badge === 'recalculated' && (
        <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full z-10">
          🔄 Recalculado
        </span>
      )}
      {badge === 'preserved' && (
        <span className="absolute -top-2 -right-2 text-xs bg-slate-600 text-slate-200 px-2 py-0.5 rounded-full z-10">
          ✓ Preservado
        </span>
      )}

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 relative">
        {!editing ? (
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-400 font-mono">{code}</span>
                <button
                  onClick={() => setShowDidactic(true)}
                  title="Explicação didática"
                  className="w-5 h-5 rounded-full bg-slate-700 text-slate-400 hover:bg-blue-800 hover:text-blue-300 text-xs flex items-center justify-center transition-colors"
                >
                  ?
                </button>
              </div>
              <p className="text-sm text-slate-300 font-medium mt-0.5">{name}</p>
              {justification && (
                <p className="text-xs text-slate-500 mt-2 line-clamp-3">{justification}</p>
              )}
            </div>
            <button
              onClick={() => { setSelectedCode(code); setEditing(true) }}
              className="shrink-0 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              Editar
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
              Nova classificação
            </label>
            <select
              value={selectedCode}
              onChange={e => setSelectedCode(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {availableCodes.map(c => (
                <option key={c} value={c}>
                  {c} — {FAILURE_NAMES[c] || c}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (selectedCode === code) { setEditing(false); return }
                  setShowConfirm(true)
                }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Confirmar →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Didactic modal */}
      {showDidactic && (
        <DidacticModal
          code={code}
          justification={justification}
          flowPath={flowPath}
          onEdit={() => { setSelectedCode(code); setEditing(true) }}
          onClose={() => setShowDidactic(false)}
        />
      )}

      {/* Confirm recalculate modal */}
      {showConfirm && (
        <ConfirmRecalculateModal
          stepAltered={stepAltered}
          newValue={selectedCode}
          newValueName={FAILURE_NAMES[selectedCode] || selectedCode}
          stepsRecalculated={dep.recalculate}
          stepsPreserved={dep.preserve}
          reason={reason}
          onReasonChange={setReason}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          loading={loading}
        />
      )}
    </div>
  )
}
