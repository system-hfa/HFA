'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const betaUiEnabled = process.env.NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED?.trim().toLowerCase() === 'true'

export default function SeraVNextReviewPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [decision, setDecision] = useState('ACCEPT_AS_WORKING_HYPOTHESIS')
  const [evidenceSufficiency, setEvidenceSufficiency] = useState('UNRESOLVED')
  const [reviewNotes, setReviewNotes] = useState('')
  const [requiresMoreEvidence, setRequiresMoreEvidence] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    setError('')
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      setError('Sessão ausente')
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`/api/admin/sera-vnext/analyses/${params.id}/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
          'Content-Type': 'application/json',
          'x-request-id': crypto.randomUUID(),
        },
        cache: 'no-store',
        body: JSON.stringify({ decision, evidenceSufficiency, reviewNotes, requiresMoreEvidence }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(String(json.detail ?? 'Falha ao registrar revisão.'))
      router.push(`/admin/sera-vnext/analyses/${params.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao registrar revisão.')
    } finally {
      setLoading(false)
    }
  }

  if (!betaUiEnabled) return <div className="p-8 text-slate-300"><Lock className="mb-3 size-5" /> Product Beta UI disabled.</div>

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Revisão humana</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Registrar decisão não final</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">A revisão aceita ou rejeita uma hipótese de trabalho. Não libera classificação final, READY, releasedCode ou downstream.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <select value={decision} onChange={(event) => setDecision(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400">
          <option value="ACCEPT_AS_WORKING_HYPOTHESIS">Aceitar como hipótese de trabalho</option>
          <option value="REJECT_WORKING_HYPOTHESIS">Rejeitar hipótese</option>
          <option value="REQUIRES_MORE_EVIDENCE">Requer mais evidência</option>
          <option value="RETURN_FOR_REANALYSIS">Retornar para reanálise</option>
        </select>
        <select value={evidenceSufficiency} onChange={(event) => setEvidenceSufficiency(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400">
          <option value="UNRESOLVED">Evidência não resolvida</option>
          <option value="SUFFICIENT_FOR_WORKING_HYPOTHESIS">Suficiente para hipótese</option>
          <option value="INSUFFICIENT">Insuficiente</option>
          <option value="CONFLICTING">Conflitante</option>
        </select>
        <textarea value={reviewNotes} onChange={(event) => setReviewNotes(event.target.value)} placeholder="Notas de revisão humana" className="min-h-52 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400" />
        <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={requiresMoreEvidence} onChange={(event) => setRequiresMoreEvidence(event.target.checked)} /> Requer mais evidência factual</label>
        {error && <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">{error}</div>}
        <button type="button" disabled={loading} onClick={() => void submit()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:bg-slate-700 disabled:text-slate-400">
          <Send className="size-4" /> {loading ? 'Registrando...' : 'Registrar revisão não final'}
        </button>
      </div>
    </div>
  )
}
