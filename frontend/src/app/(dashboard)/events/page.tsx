'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { apiCall } from '@/lib/api'
import { useT } from '@/lib/i18n'

const statusLabel: Record<string, { label: string; color: string }> = {
  received: { label: 'Recebido', color: 'text-yellow-400' },
  processing: { label: 'Analisando...', color: 'text-blue-400' },
  completed: { label: 'Concluído', color: 'text-green-400' },
  failed: { label: 'Erro', color: 'text-red-400' },
}

export default function EventsPage() {
  const t = useT()
  const [events, setEvents] = useState<any[]>([])
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
          {events.map((event: any) => {
            const s = statusLabel[event.status] || statusLabel.received
            return (
              <Link key={event.id} href={`/events/${event.id}`}
                className="block bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {event.operation_type && `${event.operation_type} • `}
                      {event.aircraft_type && `${event.aircraft_type} • `}
                      {new Date(event.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
