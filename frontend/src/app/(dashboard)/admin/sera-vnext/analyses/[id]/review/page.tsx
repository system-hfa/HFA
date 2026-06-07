'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Lock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { SeraReviewerOutput } from '@/lib/sera-vnext-product/reviewer-output'

const betaUiEnabled = process.env.NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED?.trim().toLowerCase() === 'true'

type ReviewPayload = {
  analysis: { id: string; title: string; status: string; review_status: string }
  reviewerOutput?: SeraReviewerOutput
}

export default function SeraVNextReviewPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [reviewPayload, setReviewPayload] = useState<ReviewPayload | null>(null)
  const [loadError, setLoadError] = useState('')
  const [decision, setDecision] = useState('ACCEPT_AS_WORKING_HYPOTHESIS')
  const [evidenceSufficiency, setEvidenceSufficiency] = useState('UNRESOLVED')
  const [reviewNotes, setReviewNotes] = useState('')
  const [requiresMoreEvidence, setRequiresMoreEvidence] = useState(false)
  const [checklist, setChecklist] = useState<Record<number, boolean>>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function authFetch(path: string, init: RequestInit = {}) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) throw new Error('Sessão ausente')
    return fetch(path, {
      ...init,
      headers: {
        Authorization: `Bearer ${data.session.access_token}`,
        'Content-Type': 'application/json',
        'x-request-id': crypto.randomUUID(),
        ...(init.headers ?? {}),
      },
      cache: 'no-store',
    })
  }

  async function loadAnalysis() {
    try {
      const res = await authFetch(`/api/admin/sera-vnext/analyses/${params.id}`)
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(String(json.detail ?? 'Falha ao carregar análise.'))
      setReviewPayload(json as ReviewPayload)
      const suggested = (json as ReviewPayload).reviewerOutput?.humanDecisionGuide?.recommendedNextStep
      if (suggested) setDecision(suggested)
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Falha ao carregar análise.')
    }
  }

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
      const ro = reviewPayload?.reviewerOutput
      const res = await fetch(`/api/admin/sera-vnext/analyses/${params.id}/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
          'Content-Type': 'application/json',
          'x-request-id': crypto.randomUUID(),
        },
        cache: 'no-store',
        body: JSON.stringify({
          decision,
          evidenceSufficiency,
          reviewNotes,
          requiresMoreEvidence,
          escapePointAssessment: ro?.escapePointReview.candidateStatement ?? null,
          perceptionAssessment: ro?.axisReviews.perception.candidateCode ?? null,
          objectiveAssessment: ro?.axisReviews.objective.candidateCode ?? null,
          actionAssessment: ro?.axisReviews.action.candidateCode ?? null,
        }),
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (betaUiEnabled) void loadAnalysis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  if (!betaUiEnabled) return <div className="p-8 text-slate-300"><Lock className="mb-3 size-5" /> Product Beta UI disabled.</div>

  const ro = reviewPayload?.reviewerOutput

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Revisão humana</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Registrar decisão não final</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">A revisão aceita ou rejeita uma hipótese de trabalho. Não libera classificação final, READY, releasedCode ou downstream.</p>
        {reviewPayload?.analysis && (
          <p className="mt-1 text-sm text-slate-500">{reviewPayload.analysis.title} · {reviewPayload.analysis.status} · {reviewPayload.analysis.review_status}</p>
        )}
      </div>

      {loadError && (
        <div className="rounded-xl border border-amber-900 bg-amber-950/40 p-4 text-sm text-amber-300">{loadError}</div>
      )}

      {/* Ponto de fuga para referência */}
      {ro?.escapePointReview && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ponto de fuga candidato</h2>
          <p className="text-sm text-white">{ro.escapePointReview.candidateStatement ?? 'Não determinado.'}</p>
          <p className="text-xs text-slate-500">Confiança: {ro.escapePointReview.confidence}</p>
          {ro.escapePointReview.boundaryWarnings.length > 0 && (
            <ul className="space-y-1">
              {ro.escapePointReview.boundaryWarnings.map((w, i) => (
                <li key={i} className="text-xs text-amber-300">⚠ {w}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Eixos P/O/A */}
      {ro?.axisReviews && (
        <div className="grid gap-4 lg:grid-cols-3">
          {(['perception', 'objective', 'action'] as const).map((axis) => {
            const card = ro.axisReviews[axis]
            return (
              <div key={axis} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-cyan-900 px-2 py-1 text-xs font-bold text-cyan-200">{card.axis}</span>
                  <span className="text-sm font-medium text-white">{card.candidateCode ?? '—'}</span>
                </div>
                {card.candidateMeaning && (
                  <p className="text-xs text-slate-300">{card.candidateMeaning}</p>
                )}
                {card.statementAtEscapePoint && (
                  <p className="text-xs italic text-slate-400">&ldquo;{card.statementAtEscapePoint}&rdquo;</p>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Evidência de suporte</p>
                  {card.whyCandidateWasSuggested.slice(0, 2).map((e, i) => (
                    <p key={i} className="text-xs text-slate-400">• {e}</p>
                  ))}
                </div>
                <p className="text-xs text-slate-500">Confiança: {card.confidence}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Checklist de decisão */}
      {ro?.humanDecisionGuide && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Checklist de decisão</h2>
          <p className="text-sm text-slate-400">
            Sugestão do motor:{' '}
            <span className="font-medium text-cyan-300">{ro.humanDecisionGuide.recommendedNextStep}</span>
            {' — '}{ro.humanDecisionGuide.rationale}
          </p>
          <ul className="space-y-2">
            {ro.humanDecisionGuide.decisionChecklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`chk-${i}`}
                  checked={checklist[i] ?? false}
                  onChange={(e) => setChecklist((prev) => ({ ...prev, [i]: e.target.checked }))}
                  className="mt-0.5 size-4 accent-cyan-400"
                />
                <label htmlFor={`chk-${i}`} className="text-sm text-slate-300 cursor-pointer">{item}</label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Precondições candidatas */}
      {ro?.preconditionReview && (ro.preconditionReview.cards.length > 0 || ro.preconditionReview.absentOrInsufficient.length > 0) && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Precondições candidatas</h2>
          {ro.preconditionReview.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm">
              <span className="font-medium text-slate-200">{card.plainLanguageLabel}:</span>
              <span className="ml-2 text-slate-300">{card.description}</span>
              <span className="ml-2 rounded-lg bg-slate-800 px-2 py-0.5 text-xs text-amber-300">NÃO é ponto de fuga</span>
            </div>
          ))}
          {ro.preconditionReview.absentOrInsufficient.map((msg, i) => (
            <p key={i} className="text-sm text-slate-400">{msg}</p>
          ))}
        </div>
      )}

      {/* Incertezas */}
      {ro?.uncertaintyReview && ro.uncertaintyReview.uncertainties.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Incertezas</h2>
          {ro.uncertaintyReview.uncertainties.slice(0, 5).map((u, i) => (
            <p key={i} className="text-sm text-slate-400">• {u}</p>
          ))}
          {ro.uncertaintyReview.unansweredQuestions.filter(q => q !== 'Nenhuma pergunta aberta registrada.').slice(0, 3).map((q, i) => (
            <p key={`q${i}`} className="text-sm text-amber-400">? {q}</p>
          ))}
        </div>
      )}

      {/* Formulário de decisão */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Registrar decisão</h2>
        <select value={decision} onChange={(e) => setDecision(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400">
          <option value="ACCEPT_AS_WORKING_HYPOTHESIS">Aceitar como hipótese de trabalho</option>
          <option value="REJECT_WORKING_HYPOTHESIS">Rejeitar hipótese</option>
          <option value="REQUIRES_MORE_EVIDENCE">Requer mais evidência</option>
          <option value="RETURN_FOR_REANALYSIS">Retornar para reanálise</option>
        </select>
        <select value={evidenceSufficiency} onChange={(e) => setEvidenceSufficiency(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400">
          <option value="UNRESOLVED">Evidência não resolvida</option>
          <option value="SUFFICIENT_FOR_WORKING_HYPOTHESIS">Suficiente para hipótese</option>
          <option value="INSUFFICIENT">Insuficiente</option>
          <option value="CONFLICTING">Conflitante</option>
        </select>
        <textarea
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
          placeholder="Notas de revisão humana (justifique a decisão com base nos eixos acima)"
          className="min-h-40 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
        />
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" checked={requiresMoreEvidence} onChange={(e) => setRequiresMoreEvidence(e.target.checked)} className="accent-cyan-400" />
          Requer mais evidência factual
        </label>
        {error && <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">{error}</div>}
        <button
          type="button"
          disabled={loading}
          onClick={() => void submit()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:bg-slate-700 disabled:text-slate-400"
        >
          <Send className="size-4" /> {loading ? 'Registrando...' : 'Registrar revisão não final'}
        </button>
      </div>
    </div>
  )
}
