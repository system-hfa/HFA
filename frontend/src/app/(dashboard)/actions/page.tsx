'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const statusConfig: Record<string, { label: string; color: string; next: string; nextLabel: string }> = {
  pending:     { label: 'Pendente',     color: 'yellow', next: 'in_progress', nextLabel: 'Iniciar' },
  in_progress: { label: 'Em andamento', color: 'blue',   next: 'completed',   nextLabel: 'Concluir' },
  completed:   { label: 'Concluído',    color: 'green',  next: '',            nextLabel: '' },
  cancelled:   { label: 'Cancelado',    color: 'slate',  next: '',            nextLabel: '' },
}

export default function ActionsPage() {
  const [actions, setActions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  async function load() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const res = await fetch('/api/actions', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setActions(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: string) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`/api/actions/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    load()
  }

  const filtered = filter === 'all' ? actions : actions.filter(a => a.status === filter)
  const counts = {
    pending: actions.filter(a => a.status === 'pending').length,
    in_progress: actions.filter(a => a.status === 'in_progress').length,
    completed: actions.filter(a => a.status === 'completed').length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Ações Corretivas</h1>
        <p className="text-slate-400">Geradas automaticamente a partir das análises SERA</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { key: 'pending', label: 'Pendentes', count: counts.pending, color: 'yellow' },
          { key: 'in_progress', label: 'Em andamento', count: counts.in_progress, color: 'blue' },
          { key: 'completed', label: 'Concluídas', count: counts.completed, color: 'green' },
        ].map(card => (
          <button key={card.key} onClick={() => setFilter(filter === card.key ? 'all' : card.key)}
            className={`bg-slate-900 border rounded-xl p-5 text-left transition ${
              filter === card.key ? `border-${card.color}-500` : 'border-slate-800 hover:border-slate-600'
            }`}>
            <p className="text-slate-400 text-sm">{card.label}</p>
            <p className={`text-3xl font-bold text-${card.color}-400`}>{card.count}</p>
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 text-sm mb-4">
          Erro ao carregar ações: {error}
        </div>
      )}

      {loading ? <p className="text-slate-400">Carregando...</p> : (
        <div className="space-y-3">
          {filtered.map((action: any) => {
            const s = statusConfig[action.status] || statusConfig.pending
            return (
              <div key={action.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-medium text-${s.color}-400 bg-${s.color}-400/10 border border-${s.color}-400/20 px-2 py-0.5 rounded-full`}>
                        {s.label}
                      </span>
                      {action.related_failure && (
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {action.related_failure}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                    <p className="text-slate-400 text-sm">{action.description}</p>
                    {action.responsible && (
                      <p className="text-xs text-slate-500 mt-2">Responsável: {action.responsible}</p>
                    )}
                  </div>
                  {s.next && (
                    <button onClick={() => updateStatus(action.id, s.next)}
                      className="shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-lg transition">
                      {s.nextLabel} →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
              <p className="text-slate-400">Nenhuma ação {filter !== 'all' ? `com status "${statusConfig[filter]?.label}"` : ''}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
