'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { apiCall } from '@/lib/api'
import { useT } from '@/lib/i18n'

const statusLabel: Record<string, { label: string; color: string }> = {
  received:   { label: 'Recebido',    color: 'text-yellow-400' },
  processing: { label: 'Analisando…', color: 'text-blue-400' },
  completed:  { label: 'Concluído',   color: 'text-green-400' },
  failed:     { label: 'Erro',        color: 'text-red-400' },
}

// ── Risk badge helpers ────────────────────────────────────────────────────────

const ARMS_SEV_ROW: Record<string, 'A' | 'B' | 'C' | 'D'> = {
  'P-B': 'B', 'P-F': 'B', 'P-A': 'D',
}

const ARMS_ERC: Record<string, number> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}

const ERC_BADGE: Record<number, { text: string; bg: string; label: string }> = {
  5: { text: 'text-red-400',    bg: 'bg-red-900/30',    label: 'ERC 5 — Imediato' },
  4: { text: 'text-orange-400', bg: 'bg-orange-900/30', label: 'ERC 4 — Urgente' },
  3: { text: 'text-yellow-400', bg: 'bg-yellow-900/30', label: 'ERC 3 — Ação req.' },
  2: { text: 'text-slate-400',  bg: 'bg-slate-800',     label: 'ERC 2 — Monitorar' },
  1: { text: 'text-green-400',  bg: 'bg-green-900/30',  label: 'ERC 1 — Aceitável' },
}

function barrierLevel(p: string | null, o: string | null, a: string | null): 1 | 2 | 3 | 4 {
  const fails = [p && p !== 'P-A', o && o !== 'O-A', a && a !== 'A-A'].filter(Boolean).length
  if (fails >= 3) return 1
  if (fails === 2) return 2
  if (fails === 1) return 3
  return 4
}

function computeErc(p: string | null, o: string | null, a: string | null): number | null {
  if (!p) return null
  const sev = ARMS_SEV_ROW[p] ?? 'C'
  const bar = barrierLevel(p, o, a)
  return ARMS_ERC[`${sev}${bar}`] ?? null
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const t = useT()
  type EventItem = {
    id: string
    title: string
    status: string
    operation_type?: string | null
    aircraft_type?: string | null
    created_at: string
    perception_code?: string | null
    objective_code?: string | null
    action_code?: string | null
    is_excluded_from_risk_profile?: boolean
    risk_profile_exclusion_id?: string | null
    risk_profile_exclusion_reason?: string | null
  }
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [canManageProfile, setCanManageProfile] = useState(false)
  const [busyEventId, setBusyEventId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      setToken(session.access_token)
      setCanManageProfile(String(session.user.user_metadata?.role ?? '').toLowerCase() === 'admin')
      const data = await apiCall('/events/', {}, session.access_token)
      setEvents(data)
      setLoading(false)
    }
    void load()
  }, [])

  async function refreshEvents() {
    if (!token) return
    const data = await apiCall('/events/', {}, token)
    setEvents(data)
  }

  async function excludeFromProfile(event: EventItem) {
    if (!token) return
    if (!window.confirm('Desconsiderar este evento do Perfil de Risco? O evento continuará disponível na lista.')) return
    const reason = window.prompt('Motivo opcional para desconsiderar este evento do perfil:', event.risk_profile_exclusion_reason ?? '') ?? ''
    setBusyEventId(event.id)
    setActionError(null)
    try {
      const res = await fetch('/api/risk-profile/exclusions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sourceType: 'legacy_event',
          sourceId: event.id,
          reason: reason.trim() || undefined,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(typeof body.detail === 'string' ? body.detail : `HTTP ${res.status}`)
      }
      await refreshEvents()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : String(error))
    } finally {
      setBusyEventId(null)
    }
  }

  async function restoreToProfile(event: EventItem) {
    if (!token || !event.risk_profile_exclusion_id) return
    if (!window.confirm('Restaurar este evento no Perfil de Risco?')) return
    setBusyEventId(event.id)
    setActionError(null)
    try {
      const res = await fetch(`/api/risk-profile/exclusions/${event.risk_profile_exclusion_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(typeof body.detail === 'string' ? body.detail : `HTTP ${res.status}`)
      }
      await refreshEvents()
    } catch (error) {
      setActionError(error instanceof Error ? error.message : String(error))
    } finally {
      setBusyEventId(null)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('events.title')}</h1>
          <p className="text-slate-400">Histórico de análises da sua operação</p>
        </div>
        <Link href="/events/new"
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-sm font-medium text-white transition">
          + {t('events.newAnalysis')}
        </Link>
      </div>

      {actionError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm mb-4">
          {actionError}
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">{t('common.loading')}</p>
      ) : events.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-4">{t('events.noEvents')}</p>
          <Link href="/events/new" className="text-blue-400 hover:underline">
            {t('events.startAnalysis')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const s = statusLabel[event.status] || statusLabel.received
            const erc = event.status === 'completed'
              ? computeErc(event.perception_code ?? null, event.objective_code ?? null, event.action_code ?? null)
              : null
            const badge = erc !== null ? ERC_BADGE[erc] : null
            return (
              <div key={event.id} className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition">
                <div className="flex justify-between items-start gap-4">
                  <Link href={`/events/${event.id}`} className="flex-1 min-w-0 block">
                    <h3 className="font-semibold text-white mb-1 truncate">{event.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {event.operation_type && `${event.operation_type} • `}
                      {event.aircraft_type && `${event.aircraft_type} • `}
                      {new Date(event.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                    {event.is_excluded_from_risk_profile && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded text-amber-200 bg-amber-500/10 border border-amber-500/20">
                        Desconsiderado no perfil
                      </span>
                    )}
                    {badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badge.text} ${badge.bg}`}>
                        {badge.label}
                      </span>
                    )}
                    <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
                  </div>
                </div>
                {(event.risk_profile_exclusion_reason || canManageProfile) && (
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="min-h-[1.25rem]">
                      {event.risk_profile_exclusion_reason && (
                        <p className="text-xs text-slate-500">Motivo no perfil: {event.risk_profile_exclusion_reason}</p>
                      )}
                    </div>
                    {canManageProfile && (
                      event.is_excluded_from_risk_profile ? (
                        <button
                          type="button"
                          onClick={() => void restoreToProfile(event)}
                          disabled={busyEventId === event.id}
                          className="text-xs border border-green-500/30 bg-green-500/10 text-green-200 rounded-lg px-3 py-2 hover:bg-green-500/20 disabled:opacity-50 transition-colors"
                        >
                          {busyEventId === event.id ? 'Atualizando...' : 'Restaurar no perfil'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void excludeFromProfile(event)}
                          disabled={busyEventId === event.id}
                          className="text-xs border border-amber-500/30 bg-amber-500/10 text-amber-200 rounded-lg px-3 py-2 hover:bg-amber-500/20 disabled:opacity-50 transition-colors"
                        >
                          {busyEventId === event.id ? 'Atualizando...' : 'Desconsiderar do perfil'}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
