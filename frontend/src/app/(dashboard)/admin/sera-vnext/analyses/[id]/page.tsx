'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Archive, Download, Lock, RefreshCw, RotateCcw, ShieldAlert } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const betaUiEnabled = process.env.NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED?.trim().toLowerCase() === 'true'

type DetailPayload = {
  analysis: {
    id: string
    title: string
    narrative: string
    status: string
    review_status: string
    engine_version: string
    methodology_version: string
    baseline_id: string
    fixture_set_id: string
    current_revision: number
    warnings: string[]
    uncertainties: string[]
    limitations: string[]
    engine_output: {
      factualExtraction?: { facts?: Array<{ id?: string; statement: string; category?: string }>; timeline?: Array<{ id?: string; statement: string }> }
      safeOperationModel?: { expectedSafeState?: string | null; expectedSafeAction?: string | null }
      escapePoint?: { status?: string; statement?: string | null; excludedPostEscapeEvidence?: string[] }
      directActor?: { actor?: string | null; status?: string }
      axes?: Record<string, { proposedCode?: string | null; status?: string; statementAtEscapePoint?: string | null; supportingEvidence?: string[] }>
      preconditions?: Array<{ id: string; category: string; description?: string; evidence?: string[] }>
      canonicalTraversal?: { paths?: Array<{ axis: string; candidateCode: string | null; nodeIds?: string[]; questionPath?: string[] }> }
      selectedCode: null
      releasedCode: null
      finalConclusion: null
      classifiedOutput: false
      readyPromotion: false
      downstreamAllowed: false
    }
  }
  revisions: Array<{ id: string; revision_number: number; created_at: string; reason: string; engine_output_hash: string }>
  reviews: Array<{ id: string; created_at: string; decision: string; review_notes: string | null }>
  events: Array<{ id: string; created_at: string; event_type: string; from_status: string | null; to_status: string | null }>
  locks: Record<string, unknown>
}

export default function SeraVNextAnalysisDetailPage() {
  const params = useParams<{ id: string }>()
  const [payload, setPayload] = useState<DetailPayload | null>(null)
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

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await authFetch(`/api/admin/sera-vnext/analyses/${params.id}`)
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(String(json.detail ?? 'Falha ao carregar análise.'))
      setPayload(json as DetailPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar análise.')
    } finally {
      setLoading(false)
    }
  }

  async function postAction(action: 'archive' | 'restore' | 'reanalyze') {
    setError('')
    try {
      const res = await authFetch(`/api/admin/sera-vnext/analyses/${params.id}/${action}`, { method: 'POST', body: JSON.stringify({ reason: action }) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(String(json.detail ?? `Falha em ${action}.`))
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : `Falha em ${action}.`)
    }
  }

  async function exportJson() {
    try {
      const res = await authFetch(`/api/admin/sera-vnext/analyses/${params.id}/export`)
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(String(json.detail ?? 'Falha ao exportar.'))
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `sera-vnext-beta-${params.id}.json`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao exportar.')
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (betaUiEnabled) void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  if (!betaUiEnabled) return <div className="p-8 text-slate-300"><Lock className="mb-3 size-5" /> Product Beta UI disabled.</div>
  const analysis = payload?.analysis
  const output = analysis?.engine_output

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div className="rounded-2xl border border-amber-800 bg-amber-950/20 p-4 text-sm text-amber-100">
        <div className="flex items-center gap-2 font-semibold"><ShieldAlert className="size-4" /> Resultado candidate-only não final.</div>
        <p className="mt-1">Exige revisão humana e não representa classificação SERA liberada. `selectedCode`, `releasedCode`, `finalConclusion`, `CLASSIFIED`, `READY` e downstream permanecem bloqueados.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Detalhe auditável</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{analysis?.title ?? 'Análise'}</h1>
          <p className="mt-2 text-sm text-slate-400">{analysis?.status ?? '...'} · {analysis?.review_status ?? '...'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/admin/sera-vnext/analyses/${params.id}/review`} className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Revisar</Link>
          <button type="button" onClick={() => void postAction('reanalyze')} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200"><RefreshCw className="size-4" /> Reanalisar</button>
          <button type="button" onClick={() => void postAction(analysis?.status === 'ARCHIVED' ? 'restore' : 'archive')} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">{analysis?.status === 'ARCHIVED' ? <RotateCcw className="size-4" /> : <Archive className="size-4" />} {analysis?.status === 'ARCHIVED' ? 'Restaurar' : 'Arquivar'}</button>
          <button type="button" onClick={() => void exportJson()} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200"><Download className="size-4" /> Export JSON</button>
        </div>
      </div>

      {loading && <div className="text-sm text-slate-400">Carregando...</div>}
      {error && <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">{error}</div>}

      {analysis && output && (
        <>
          <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="text-lg font-semibold text-white">Relato</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">{analysis.narrative}</p>
          </section>

          <div className="grid gap-4 lg:grid-cols-3">
            <InfoCard title="Versões" lines={[`engine ${analysis.engine_version}`, analysis.methodology_version, analysis.baseline_id, analysis.fixture_set_id]} />
            <InfoCard title="Ponto de fuga" lines={[output.escapePoint?.status ?? '-', output.escapePoint?.statement ?? '-']} />
            <InfoCard title="Ator direto" lines={[output.directActor?.status ?? '-', output.directActor?.actor ?? '-']} />
          </div>

          <section className="grid gap-4 xl:grid-cols-3">
            {Object.entries(output.axes ?? {}).map(([axis, axisOutput]) => (
              <div key={axis} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h2 className="capitalize text-lg font-semibold text-white">{axis}</h2>
                <p className="mt-2 text-sm text-slate-400">Status: {axisOutput.status ?? '-'}</p>
                <p className="mt-2 text-sm text-slate-300">Código candidato: {axisOutput.proposedCode ?? 'null'}</p>
                <p className="mt-3 text-sm text-slate-400">{axisOutput.statementAtEscapePoint ?? 'Sem statement suficiente.'}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <Panel title="Fatos" items={(output.factualExtraction?.facts ?? []).map((fact) => `${fact.category ?? 'fact'}: ${fact.statement}`)} />
            <Panel title="Precondições" items={(output.preconditions ?? []).map((item) => `${item.category}: ${item.description ?? item.evidence?.join(' | ') ?? '-'}`)} />
            <Panel title="Incertezas" items={analysis.uncertainties} />
            <Panel title="Audit timeline" items={(payload.events ?? []).map((event) => `${event.event_type}: ${event.from_status ?? '-'} -> ${event.to_status ?? '-'}`)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="text-lg font-semibold text-white">Revisions e reviews</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Panel title="Revisions" items={payload.revisions.map((revision) => `rev ${revision.revision_number}: ${revision.reason} · ${revision.engine_output_hash.slice(0, 12)}`)} />
              <Panel title="Reviews" items={payload.reviews.map((review) => `${review.decision}: ${review.review_notes ?? 'sem notas'}`)} />
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function InfoCard({ title, lines }: { title: string; lines: string[] }) {
  return <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>{lines.map((line, index) => <p key={`${title}-${index}`} className="mt-2 break-words text-sm text-slate-300">{line}</p>)}</div>
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><h2 className="text-lg font-semibold text-white">{title}</h2>{items.length === 0 ? <p className="mt-3 text-sm text-slate-500">Sem itens.</p> : <ul className="mt-3 space-y-2 text-sm text-slate-300">{items.map((item, index) => <li key={`${title}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">{item}</li>)}</ul>}</div>
}
