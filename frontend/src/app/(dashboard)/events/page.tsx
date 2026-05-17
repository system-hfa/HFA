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
  }
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const data = await apiCall('/events/', {}, session.access_token)
      setEvents(data)
      setLoading(false)
    }
    load()
  }, [])

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
              <Link key={event.id} href={`/events/${event.id}`}
                className="block bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 truncate">{event.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {event.operation_type && `${event.operation_type} • `}
                      {event.aircraft_type && `${event.aircraft_type} • `}
                      {new Date(event.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badge.text} ${badge.bg}`}>
                        {badge.label}
                      </span>
                    )}
                    <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
