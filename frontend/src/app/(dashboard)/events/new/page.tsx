'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { apiCall } from '@/lib/api'

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    raw_input: '',
    operation_type: '',
    aircraft_type: '',
    occurred_at: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Não autenticado')
      const result = await apiCall('/events/', {
        method: 'POST',
        body: JSON.stringify(form)
      }, session.access_token)
      router.push(`/events/${result.event_id}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">Nova Análise SERA</h1>
      <p className="text-slate-400 mb-8">Insira o relato do evento para análise automatizada</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Título do evento *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            placeholder="Ex: Aproximação em IMC — Plataforma Albacora" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tipo de operação</label>
            <input value={form.operation_type} onChange={e => setForm(p => ({ ...p, operation_type: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Voo offshore" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Aeronave</label>
            <input value={form.aircraft_type} onChange={e => setForm(p => ({ ...p, aircraft_type: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Sikorsky S-76" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Data do evento</label>
          <input type="date" value={form.occurred_at} onChange={e => setForm(p => ({ ...p, occurred_at: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Relato do evento *</label>
          <textarea value={form.raw_input} onChange={e => setForm(p => ({ ...p, raw_input: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
            rows={12}
            placeholder="Cole aqui o relato completo do evento, entrevista ou narrativa..."
            required />
          <p className="text-xs text-slate-500 mt-1">Quanto mais detalhado o relato, mais precisa será a análise</p>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 py-3 rounded-lg font-medium transition text-white">
            {loading ? '⏳ Analisando...' : '🔍 Iniciar Análise SERA'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-8 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition">
            Cancelar
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-400">
          ⚡ Esta análise consumirá <strong className="text-white">1 crédito</strong>.
          O relatório será gerado automaticamente seguindo as 7 etapas da metodologia SERA.
        </div>
      </form>
    </div>
  )
}
