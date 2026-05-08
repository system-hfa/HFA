'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { resolveApiUrl } from '@/lib/api'
import DocumentUpload from '@/components/sera/DocumentUpload'

type Tab = 'text' | 'upload'

export default function NewEventPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('text')
  const [form, setForm] = useState({
    title: '',
    raw_input: '',
    operation_type: '',
    aircraft_type: '',
    occurred_at: '',
  })
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [sourceMeta, setSourceMeta] = useState<{ fileName: string; wordCount: number } | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) throw new Error('Não autenticado')

      const url = resolveApiUrl('/events/')

      if (tab === 'upload' && sourceFile) {
        const fd = new FormData()
        fd.set('title', form.title)
        fd.set('raw_input', form.raw_input)
        fd.set('operation_type', form.operation_type)
        fd.set('aircraft_type', form.aircraft_type)
        fd.set('occurred_at', form.occurred_at)
        const kind = sourceFile.name.toLowerCase().endsWith('.docx') ? 'docx' : 'pdf'
        fd.set('input_type', kind)
        fd.set('source_type', kind)
        fd.set('source_file_name', sourceMeta?.fileName || sourceFile.name)
        if (sourceMeta?.wordCount) fd.set('source_word_count', String(sourceMeta.wordCount))
        fd.set('file', sourceFile)

        const res = await fetch(url, {
          method: 'POST',
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: fd,
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(typeof data.detail === 'string' ? data.detail : `HTTP ${res.status}`)
        }
        router.push(`/events/${data.event_id}`)
        return
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: form.title,
          raw_input: form.raw_input,
          operation_type: form.operation_type || null,
          aircraft_type: form.aircraft_type || null,
          occurred_at: form.occurred_at || null,
          input_type: 'text',
          source_type: 'text',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data.detail === 'string' ? data.detail : `HTTP ${res.status}`)
      }
      router.push(`/events/${data.event_id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar')
      setLoading(false)
    }
  }

  const showExtractBanner = tab === 'upload' && sourceMeta && form.raw_input.trim().length > 0

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">Nova Análise SERA</h1>
      <p className="text-slate-400 mb-8">Insira o relato do evento para análise automatizada</p>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => {
            setTab('text')
            setSourceFile(null)
            setSourceMeta(null)
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'text'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          ✏️ Digitar texto
        </button>
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          📄 Upload PDF/DOCX
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Título do evento *</label>
          <input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            placeholder="Ex: Aproximação em IMC — Plataforma Albacora"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tipo de operação</label>
            <input
              value={form.operation_type}
              onChange={(e) => setForm((p) => ({ ...p, operation_type: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Voo offshore"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Aeronave</label>
            <input
              value={form.aircraft_type}
              onChange={(e) => setForm((p) => ({ ...p, aircraft_type: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Sikorsky S-76"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Data do evento</label>
          <input
            type="date"
            value={form.occurred_at}
            onChange={(e) => setForm((p) => ({ ...p, occurred_at: e.target.value }))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {tab === 'upload' && (
          <DocumentUpload
            onFileReady={setSourceFile}
            onExtracted={(text, meta) => {
              setForm((p) => ({ ...p, raw_input: text }))
              setSourceMeta(meta)
            }}
          />
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Relato do evento *</label>
          {showExtractBanner && (
            <div className="mb-2 text-xs text-amber-200/90 bg-amber-950/40 border border-amber-800/40 rounded-lg px-3 py-2">
              ⚠️ Texto extraído automaticamente de {sourceMeta?.fileName}. Revise antes de
              submeter — erros de extração podem afetar a qualidade da análise.
            </div>
          )}
          <textarea
            value={form.raw_input}
            onChange={(e) => setForm((p) => ({ ...p, raw_input: e.target.value }))}
            className={`w-full border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none ${
              showExtractBanner
                ? 'bg-amber-950/25 border-amber-900/50'
                : 'bg-slate-800 border-slate-700'
            }`}
            rows={12}
            placeholder={
              tab === 'upload'
                ? 'O texto aparecerá aqui após o upload, ou digite manualmente…'
                : 'Cole aqui o relato completo do evento…'
            }
            required
          />
          <p className="text-xs text-slate-500 mt-1">
            Quanto mais detalhado o relato, mais precisa será a análise
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 py-3 rounded-lg font-medium transition text-white"
          >
            {loading ? '⏳ Analisando...' : '🔍 Iniciar Análise SERA'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition"
          >
            Cancelar
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-400">
          ⚡ Esta análise consumirá <strong className="text-white">1 crédito</strong>. O relatório
          será gerado automaticamente seguindo as 7 etapas da metodologia SERA.
        </div>
      </form>
    </div>
  )
}
