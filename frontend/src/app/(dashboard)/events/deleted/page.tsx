'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { apiCall } from '@/lib/api'

type DeletedEventItem = {
  id: string
  title: string
  created_at: string
  deleted_at: string | null
  deletion_status: string | null
  recoverable_until: string | null
  deleted_by: string | null
  deletion_reason: string | null
  purge_scheduled_at: string | null
}

function responseErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback
  const error = (body as { error?: unknown }).error
  if (!error || typeof error !== 'object') return fallback
  return typeof (error as { message?: unknown }).message === 'string'
    ? String((error as { message: string }).message)
    : fallback
}

export default function DeletedEventsPage() {
  const [events, setEvents] = useState<DeletedEventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      setToken(session.access_token)
      const data = await apiCall('/events/?scope=deleted', {}, session.access_token)
      setEvents(data)
      setLoading(false)
    }
    void load()
  }, [])

  async function refresh() {
    if (!token) return
    const data = await apiCall('/events/?scope=deleted', {}, token)
    setEvents(data)
  }

  async function restoreEvent(id: string) {
    if (!token) return
    setBusyId(id)
    setError(null)
    try {
      const res = await fetch(`/api/events/${id}/restore`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(responseErrorMessage(body, `HTTP ${res.status}`))
      }
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Eventos excluídos</h1>
          <p className="text-slate-400">Área de recuperação para eventos fora da operação ativa.</p>
        </div>
        <Link href="/events" className="rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500">
          Voltar para eventos ativos
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">Carregando eventos excluídos...</p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
          Nenhum evento em recuperação.
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-semibold text-white">{event.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Excluído em {event.deleted_at ? new Date(event.deleted_at).toLocaleString('pt-BR') : 'n/d'}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Recuperável até {event.recoverable_until ? new Date(event.recoverable_until).toLocaleString('pt-BR') : 'n/d'}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Status: {event.deletion_status ?? 'SOFT_DELETED'}</p>
                  <p className="mt-1 text-sm text-slate-500">Motivo: {event.deletion_reason ?? 'n/d'}</p>
                  <p className="mt-1 text-sm text-slate-500">Actor: {event.deleted_by ? `${event.deleted_by.slice(0, 8)}...` : 'n/d'}</p>
                  {event.purge_scheduled_at && (
                    <p className="mt-1 text-sm text-amber-300">
                      Purge agendado em {new Date(event.purge_scheduled_at).toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/events/${event.id}?scope=deleted`} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">
                    Abrir
                  </Link>
                  <button
                    type="button"
                    onClick={() => void restoreEvent(event.id)}
                    disabled={busyId === event.id}
                    className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-200 transition-colors hover:bg-green-500/20 disabled:opacity-50"
                  >
                    {busyId === event.id ? 'Restaurando...' : 'Restaurar evento'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
