'use client'
import { useState, useEffect } from 'react'
import { FAILURE_NAMES } from '@/data/tutorials'
import { resolveApiUrl } from '@/lib/api'

interface EditRecord {
  id: string
  step_altered: string
  field_changed: string
  value_before: string | null
  value_after: string | null
  steps_recalculated: number[]
  steps_preserved: number[]
  reason: string | null
  created_at: string
}

interface Props {
  analysisId: string
  token: string
  editCount: number
  onReverted: (data: unknown) => void
}

const STEP_LABELS: Record<string, string> = {
  '2': 'Ponto de Fuga',
  '3': 'Percepção',
  '4': 'Objetivo',
  '5': 'Ação',
}

function parseValue(v: string | null): string {
  if (!v) return '—'
  try {
    const parsed = JSON.parse(v)
    if (typeof parsed === 'string') return `${parsed} — ${FAILURE_NAMES[parsed] || ''}`
    return String(parsed)
  } catch { return v }
}

export default function EditHistoryPanel({ analysisId, token, editCount, onReverted }: Props) {
  const [open, setOpen] = useState(false)
  const [edits, setEdits] = useState<EditRecord[]>([])
  const [reverting, setReverting] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    fetch(resolveApiUrl(`/analyses/${analysisId}/edits`), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(setEdits)
      .catch(console.error)
  }, [open, analysisId, token])

  async function handleRevert(editId: string) {
    if (!confirm('Reverter esta edição e recalcular os steps dependentes?')) return
    setReverting(editId)
    try {
      const res = await fetch(resolveApiUrl(`/analyses/${analysisId}/edits/${editId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      onReverted(data)
      setEdits(prev => prev.filter(e => e.id !== editId))
    } catch (err) {
      console.error(err)
      alert('Erro ao reverter edição.')
    } finally {
      setReverting(null)
    }
  }

  if (editCount === 0) return null

  return (
    <div className="border border-amber-700/50 rounded-xl overflow-hidden">
      {/* Banner */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-950/40 hover:bg-amber-950/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-400">⚠️</span>
          <span className="text-sm text-amber-300 font-medium">
            Esta análise contém {editCount} alteração{editCount > 1 ? 'ões' : ''} manual{editCount > 1 ? 'is' : ''}
          </span>
        </div>
        <span className="text-amber-400 text-xs">{open ? 'Fechar histórico ▲' : 'Ver histórico ▼'}</span>
      </button>

      {/* History list */}
      {open && (
        <div className="bg-slate-900/60 divide-y divide-slate-800">
          {edits.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">Carregando…</div>
          ) : (
            edits.map(edit => (
              <div key={edit.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded font-mono">
                        {STEP_LABELS[edit.step_altered] || `Step ${edit.step_altered}`}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(edit.created_at).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="text-slate-400 font-mono line-through">{parseValue(edit.value_before)}</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-emerald-400 font-mono">{parseValue(edit.value_after)}</span>
                    </div>
                    {edit.reason && (
                      <p className="text-xs text-slate-500 mt-1 italic">&quot;{edit.reason}&quot;</p>
                    )}
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {edit.steps_recalculated?.map(s => (
                        <span key={s} className="text-xs text-blue-400">🔄 Etapa {s}</span>
                      ))}
                      {edit.steps_preserved?.map(s => (
                        <span key={s} className="text-xs text-slate-500">✓ Etapa {s}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevert(edit.id)}
                    disabled={reverting === edit.id}
                    className="shrink-0 px-3 py-1.5 bg-slate-700 hover:bg-red-900 text-slate-300 hover:text-red-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {reverting === edit.id ? '…' : 'Reverter'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
