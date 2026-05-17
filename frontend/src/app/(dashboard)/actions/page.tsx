'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ── Static style maps (Tailwind-safe — no dynamic interpolation) ──────────────

const STATUS_LABEL: Record<string, string> = {
  pending:     'Pendente',
  in_progress: 'Em andamento',
  completed:   'Concluído',
  cancelled:   'Cancelado',
}

const STATUS_NEXT: Record<string, { status: string; label: string }> = {
  pending:     { status: 'in_progress', label: 'Iniciar' },
  in_progress: { status: 'completed',   label: 'Concluir' },
}

const STATUS_BADGE: Record<string, string> = {
  pending:     'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20',
  in_progress: 'text-blue-400 bg-blue-400/10 border border-blue-400/20',
  completed:   'text-green-400 bg-green-400/10 border border-green-400/20',
  cancelled:   'text-slate-400 bg-slate-800 border border-slate-700',
}

const FILTER_CARDS = [
  { key: 'pending',     label: 'Pendentes',    borderActive: 'border-yellow-500', textCount: 'text-yellow-400' },
  { key: 'in_progress', label: 'Em andamento', borderActive: 'border-blue-500',   textCount: 'text-blue-400'   },
  { key: 'completed',   label: 'Concluídas',   borderActive: 'border-green-500',  textCount: 'text-green-400'  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function isOverdue(dueDate: string | null | undefined, status: string): boolean {
  if (!dueDate || status === 'completed' || status === 'cancelled') return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate + 'T00:00:00') < today
}

function fmtDate(d: string | null | undefined): string {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR')
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ActionItem = {
  id: string
  title: string
  description?: string | null
  related_failure?: string | null
  status: string
  responsible?: string | null
  due_date?: string | null
  created_at: string
  analysis_id?: string | null
  event_id?: string | null
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ActionsPage() {
  const [actions, setActions]   = useState<ActionItem[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [filter, setFilter]     = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ responsible: '', due_date: '' })
  const [saving, setSaving]     = useState(false)

  const load = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const res = await fetch('/api/actions', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setActions(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => { void load() }, 0)
    return () => clearTimeout(timer)
  }, [load])

  async function patchAction(id: string, body: Record<string, unknown>) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch(`/api/actions/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  }

  async function advanceStatus(id: string, nextStatus: string) {
    try {
      await patchAction(id, { status: nextStatus })
      void load()
    } catch (e) {
      console.error('Erro ao atualizar status:', e)
    }
  }

  function startEdit(action: ActionItem) {
    setEditingId(action.id)
    setEditForm({ responsible: action.responsible ?? '', due_date: action.due_date ?? '' })
  }

  async function saveEdit(id: string) {
    setSaving(true)
    try {
      await patchAction(id, {
        responsible: editForm.responsible.trim() || null,
        due_date: editForm.due_date || null,
      })
      setEditingId(null)
      void load()
    } catch (e) {
      console.error('Erro ao salvar:', e)
    } finally {
      setSaving(false)
    }
  }

  const filtered = filter === 'all' ? actions : actions.filter((a) => a.status === filter)
  const counts: Record<string, number> = {
    pending:     actions.filter((a) => a.status === 'pending').length,
    in_progress: actions.filter((a) => a.status === 'in_progress').length,
    completed:   actions.filter((a) => a.status === 'completed').length,
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Ações Corretivas e Preventivas</h1>
        <p className="text-slate-400">Criadas a partir das recomendações das análises SERA</p>
      </div>

      {/* Filter cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {FILTER_CARDS.map((card) => (
          <button
            key={card.key}
            onClick={() => setFilter(filter === card.key ? 'all' : card.key)}
            className={`bg-slate-900 border rounded-xl p-5 text-left transition ${
              filter === card.key ? card.borderActive : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            <p className="text-slate-400 text-sm">{card.label}</p>
            <p className={`text-3xl font-bold ${card.textCount}`}>{counts[card.key] ?? 0}</p>
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 text-sm mb-4">
          Erro ao carregar ações: {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">Carregando...</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((action) => {
            const badgeClass = STATUS_BADGE[action.status] ?? STATUS_BADGE.pending
            const next = STATUS_NEXT[action.status]
            const overdue = isOverdue(action.due_date, action.status)
            const isEditing = editingId === action.id

            return (
              <div key={action.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Main content */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Badge row */}
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
                          {STATUS_LABEL[action.status] ?? action.status}
                        </span>
                        {action.related_failure && (
                          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {action.related_failure}
                          </span>
                        )}
                        {overdue && (
                          <span className="text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
                            Prazo vencido
                          </span>
                        )}
                      </div>

                      {/* Title + description */}
                      <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                      {action.description && (
                        <p className="text-slate-400 text-sm leading-relaxed mb-3">{action.description}</p>
                      )}

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        {action.responsible ? (
                          <span>
                            Responsável: <span className="text-slate-300">{action.responsible}</span>
                          </span>
                        ) : (
                          <span className="text-slate-600 italic">Sem responsável definido</span>
                        )}
                        {action.due_date ? (
                          <span className={overdue ? 'text-red-400' : ''}>
                            Prazo: {fmtDate(action.due_date)}
                          </span>
                        ) : (
                          <span className="text-slate-600 italic">Sem prazo</span>
                        )}
                        {action.event_id && (
                          <a
                            href={`/events/${action.event_id}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Ver evento →
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => (isEditing ? setEditingId(null) : startEdit(action))}
                        className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {isEditing ? 'Fechar' : 'Editar'}
                      </button>
                      {next && (
                        <button
                          onClick={() => advanceStatus(action.id, next.status)}
                          className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          {next.label} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline edit panel */}
                {isEditing && (
                  <div className="border-t border-slate-800 bg-slate-800/40 px-5 py-4 space-y-3">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Editar detalhes</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Responsável</label>
                        <input
                          type="text"
                          value={editForm.responsible}
                          onChange={(e) => setEditForm((p) => ({ ...p, responsible: e.target.value }))}
                          placeholder="Nome ou cargo"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Prazo</label>
                        <input
                          type="date"
                          value={editForm.due_date}
                          onChange={(e) => setEditForm((p) => ({ ...p, due_date: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        disabled={saving}
                        onClick={() => saveEdit(action.id)}
                        className="text-xs font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg transition"
                      >
                        {saving ? 'Salvando…' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
              <p className="text-slate-400">
                {filter !== 'all'
                  ? `Nenhuma ação com status "${STATUS_LABEL[filter] ?? filter}"`
                  : 'Nenhuma ação criada ainda.'}
              </p>
              {filter === 'all' && (
                <p className="text-slate-500 text-sm">
                  Para criar uma ação, abra o relatório de um evento e clique em{' '}
                  <span className="text-slate-300 font-medium">"Criar ação corretiva"</span>{' '}
                  em qualquer recomendação da Etapa 7.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
