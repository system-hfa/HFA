'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { apiCall, resolveApiUrl } from '@/lib/api'
import FlowStep from '@/components/FlowStep'
import EditableClassification from '@/components/EditableClassification'
import EditHistoryPanel from '@/components/EditHistoryPanel'
import { STEP3_CODES, STEP4_CODES, STEP5_CODES } from '@/data/tutorials'
import { mapToHfacs, type HfacsEntry, type HfacsResult } from '@/lib/sera/hfacs-mapper'
import { useT } from '@/lib/i18n'

const FlowDiagram = dynamic(() => import('@/components/FlowDiagram'), { ssr: false })

type FlowTab = 'perception' | 'objective' | 'action'
type PdfState = 'idle' | 'loading' | 'done' | 'error'
type BadgeMap = Record<string, 'preserved' | 'recalculated' | null>

function MetaItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-slate-200 truncate">{value}</p>
    </div>
  )
}

function HfacsSection({ hfacs }: { hfacs: HfacsResult }) {
  const t = useT()

  const levels: { key: keyof HfacsResult; labelKey: string; color: string }[] = [
    { key: 'nivel1_unsafe_acts',   labelKey: 'hfacs.level1', color: 'border-red-700/50 bg-red-950/20' },
    { key: 'nivel2_preconditions', labelKey: 'hfacs.level2', color: 'border-orange-700/50 bg-orange-950/20' },
    { key: 'nivel3_supervision',   labelKey: 'hfacs.level3', color: 'border-yellow-700/50 bg-yellow-950/20' },
    { key: 'nivel4_organization',  labelKey: 'hfacs.level4', color: 'border-purple-700/50 bg-purple-950/20' },
  ]

  const hasAny = levels.some((l) => hfacs[l.key].length > 0)
  if (!hasAny) return null

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-6 py-3 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {t('hfacs.title')}
        </span>
        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-1.5 py-0.5 rounded">
          {t('hfacs.bonus')}
        </span>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-xs text-slate-500 leading-relaxed">{t('hfacs.subtitle')}</p>
        {levels.map(({ key, labelKey, color }) => {
          const entries: HfacsEntry[] = hfacs[key]
          if (entries.length === 0) return null
          return (
            <div key={key} className={`border rounded-xl p-4 ${color}`}>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {t(labelKey)}
              </p>
              <div className="space-y-3">
                {entries.map((item, i) => (
                  <div key={i} className="bg-slate-900/50 rounded-lg p-3 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                        {item.codigo_sera_origem}
                      </span>
                      <span className="text-xs text-slate-400">{t('hfacs.origin')}</span>
                      <span className="mx-1 text-slate-600">→</span>
                      <span className="text-xs font-semibold text-slate-200">
                        {t(item.categoria_key)}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-300">
                        {t(item.subcategoria_key)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.justificativa_pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        <p className="text-xs text-slate-600 pt-1">{t('hfacs.note')}</p>
        <p className="text-xs text-slate-600">{t('hfacs.reference')}</p>
      </div>
    </div>
  )
}

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent]         = useState<any>(null)
  const [analysis, setAnalysis]   = useState<any>(null)
  const [token, setToken]         = useState<string>('')
  const [loading, setLoading]     = useState(true)
  const [flows, setFlows]         = useState<any>(null)
  const [activeTab, setActiveTab] = useState<FlowTab>('perception')
  const [pdfState, setPdfState]   = useState<PdfState>('idle')
  const [badges, setBadges]       = useState<BadgeMap>({})

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      setToken(session.access_token)
      const data = await apiCall(`/events/${id}`, {}, session.access_token)
      setEvent(data)
      if (data?.analyses) setAnalysis(data.analyses)
      setLoading(false)

      if (data?.analyses?.id) {
        try {
          const flowData = await apiCall(`/analyses/${data.analyses.id}/flows`, {}, session.access_token)
          setFlows(flowData)
        } catch { /* flows are optional */ }
      }
    }
    load()
    const interval = setInterval(() => {
      // Only auto-refresh while processing
      if (event?.status === 'processing') load()
    }, 5000)
    return () => clearInterval(interval)
  }, [id])

  const handleRecalculated = useCallback((data: any) => {
    if (!data?.analysis) return
    setAnalysis(data.analysis)

    // Apply badges based on recalculate result
    const stepMap: Record<number, string> = { 3: 'perception', 4: 'objective', 5: 'action' }
    const newBadges: BadgeMap = {}
    data.steps_recalculated?.forEach((s: number) => {
      if (stepMap[s]) newBadges[stepMap[s]] = 'recalculated'
    })
    data.steps_preserved?.forEach((s: number) => {
      if (stepMap[s]) newBadges[stepMap[s]] = 'preserved'
    })
    setBadges(newBadges)

    // Clear badges after 8s
    setTimeout(() => setBadges({}), 8000)
  }, [])

  const downloadPdf = useCallback(async () => {
    if (!analysis || !token) return
    setPdfState('loading')
    try {
      const analysisId = analysis.id
      const res = await fetch(resolveApiUrl(`/analyses/${analysisId}/pdf`), {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const body = await res.text()
        console.error('PDF response error:', res.status, body)
        throw new Error(`HTTP ${res.status}: ${body}`)
      }
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      const date = new Date(event.created_at).toISOString().slice(0, 10)
      const name = (event.title ?? 'evento').replace(/\s+/g, '-').slice(0, 40)
      a.href     = url
      a.download = `SERA_${name}_${date}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setPdfState('done')
      setTimeout(() => setPdfState('idle'), 3000)
    } catch (err) {
      console.error('PDF error:', err)
      setPdfState('error')
      setTimeout(() => setPdfState('idle'), 3000)
    }
  }, [event, analysis, token])

  if (loading) return <div className="p-8 text-slate-400">Carregando...</div>
  if (!event)  return <div className="p-8 text-slate-400">Evento não encontrado</div>

  const pdfLabel: Record<PdfState, string> = {
    idle:    '⬇ Baixar PDF',
    loading: 'Gerando PDF…',
    done:    'PDF gerado ✓',
    error:   'Erro no PDF',
  }

  const tabLabels: Record<FlowTab, string> = {
    perception: `Percepção ${flows?.perception?.codigo ?? ''}`,
    objective:  `Objetivo ${flows?.objective?.codigo ?? ''}`,
    action:     `Ação ${flows?.action?.codigo ?? ''}`,
  }

  const summaryText = analysis?.summary || analysis?.event_summary || null

  // Flow path helpers
  const perceptionFlow = analysis?.perception_discarded?.nos_percorridos ?? []
  const objectiveFlow  = analysis?.objective_discarded?.nos_percorridos  ?? []
  const actionFlow     = analysis?.action_discarded?.nos_percorridos     ?? []

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{event.title}</h1>
          <p className="text-slate-400 text-sm">
            {event.operation_type} • {event.aircraft_type} •{' '}
            {new Date(event.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {analysis && (
            <button
              onClick={downloadPdf}
              disabled={pdfState === 'loading'}
              className={`text-sm px-4 py-2 rounded-lg transition font-medium ${
                pdfState === 'done'    ? 'bg-emerald-700 text-white' :
                pdfState === 'error'  ? 'bg-red-700 text-white' :
                pdfState === 'loading'? 'bg-slate-600 text-slate-400 cursor-wait' :
                'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {pdfLabel[pdfState]}
            </button>
          )}
          {event.status === 'processing' && (
            <div className="bg-blue-600/20 text-blue-400 border border-blue-600/30 px-4 py-2 rounded-lg text-sm animate-pulse">
              ⏳ Analisando...
            </div>
          )}
        </div>
      </div>

      {/* Pending / processing state */}
      {!analysis && event.status !== 'completed' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">
            {event.status === 'processing'
              ? 'Análise em andamento. A página atualiza automaticamente.'
              : 'Análise pendente.'}
          </p>
        </div>
      )}

      {analysis && (
        <>
          {/* Edit history banner */}
          {analysis.id && token && (
            <EditHistoryPanel
              analysisId={analysis.id}
              token={token}
              editCount={analysis.edit_count || 0}
              onReverted={handleRecalculated}
            />
          )}

          {/* ── ETAPA 1 — Resumo do Evento ───────────────────────────── */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-3 bg-slate-700/50 border-b border-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Etapa 1 — Resumo do Evento
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-700">
                <MetaItem
                  label="Data do evento"
                  value={analysis.event_date
                    || (event.occurred_at ? new Date(event.occurred_at).toLocaleDateString('pt-BR') : null)
                    || new Date(event.created_at).toLocaleDateString('pt-BR')}
                />
                <MetaItem label="Tipo de operação"    value={analysis.operation_type || event.operation_type} />
                <MetaItem label="Aeronave / tipo"     value={event.aircraft_type} />
                <MetaItem label="Local"               value={analysis.event_location} />
                <MetaItem label="Fase do voo"         value={analysis.flight_phase} />
                <MetaItem label="Cond. meteorológicas" value={analysis.weather_conditions} />
                <MetaItem label="Sistemas envolvidos"  value={analysis.systems_involved} />
                <MetaItem label="Ocupantes"            value={analysis.occupants_count} />
              </div>
              {summaryText ? (
                <p className="text-slate-200 leading-relaxed text-sm sm:text-base">{summaryText}</p>
              ) : (
                <p className="text-slate-500 text-sm italic">
                  Resumo narrativo gerado pela IA estará disponível nas próximas análises.
                </p>
              )}
            </div>
          </div>

          {/* ── ETAPA 2 — Ponto de Fuga ───────────────────────────────── */}
          <div className="bg-amber-950 border border-amber-700 rounded-xl overflow-hidden">
            <div className="px-6 py-3 bg-amber-900/40 border-b border-amber-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Etapa 2 — Ponto de Fuga da Operação Segura
              </span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {analysis.escape_point}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-900/40 rounded-lg p-3">
                  <p className="text-xs text-amber-400 mb-1">Agente</p>
                  <p className="text-sm text-slate-200">{analysis.unsafe_agent}</p>
                </div>
                <div className="bg-amber-900/40 rounded-lg p-3">
                  <p className="text-xs text-amber-400 mb-1">Ato Inseguro</p>
                  <p className="text-sm text-slate-200">{analysis.unsafe_act}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── ETAPAS 3 / 4 / 5 — Editable failure classifications ──── */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Etapas 3 · 4 · 5 — Falhas Ativas
              <span className="ml-2 normal-case text-slate-600 font-normal">(clique "Editar" para recalcular)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <EditableClassification
                code={analysis.perception_code}
                name={analysis.perception_name}
                justification={analysis.perception_justification}
                flowPath={perceptionFlow}
                stepAltered="3"
                field="perception_code"
                availableCodes={STEP3_CODES}
                analysisId={analysis.id}
                token={token}
                badge={badges['perception'] ?? null}
                onUpdated={handleRecalculated}
              />
              <EditableClassification
                code={analysis.objective_code}
                name={analysis.objective_name}
                justification={analysis.objective_justification}
                flowPath={objectiveFlow}
                stepAltered="4"
                field="objective_code"
                availableCodes={STEP4_CODES}
                analysisId={analysis.id}
                token={token}
                badge={badges['objective'] ?? null}
                onUpdated={handleRecalculated}
              />
              <EditableClassification
                code={analysis.action_code}
                name={analysis.action_name}
                justification={analysis.action_justification}
                flowPath={actionFlow}
                stepAltered="5"
                field="action_code"
                availableCodes={STEP5_CODES}
                analysisId={analysis.id}
                token={token}
                badge={badges['action'] ?? null}
                onUpdated={handleRecalculated}
              />
            </div>
          </div>

          {/* ── Fluxo de Decisão SERA ──────────────────────────────────── */}
          {flows && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Fluxo de Decisão SERA</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-6">
                {(['perception', 'objective', 'action'] as FlowTab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {tabLabels[tab]}
                  </button>
                ))}
              </div>
              <FlowDiagram chart={flows[activeTab].mermaid} id={activeTab} />
              <FlowStep
                nos={flows[activeTab].nos_percorridos}
                codigo={flows[activeTab].codigo}
                falhasDescartadas={flows[activeTab].falhas_descartadas}
              />
            </div>
          )}

          {/* ── Pré-condições ──────────────────────────────────────────── */}
          {analysis.preconditions?.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-3 bg-slate-800 border-b border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Pré-condições Identificadas
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.preconditions.map((p: any, i: number) => (
                    <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                          {p.code}
                        </span>
                        {p.etapa && (
                          <span className="text-xs text-slate-500">Etapa {p.etapa}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-200 mb-1">{p.name}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.justification}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ETAPA 6 — Conclusões ───────────────────────────────────── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-3 bg-slate-800 border-b border-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Etapa 6 — Conclusão da Análise
              </span>
            </div>
            <div className="p-6">
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base">{analysis.conclusions}</p>
            </div>
          </div>

          {/* ── ETAPA 7 — Recomendações ────────────────────────────────── */}
          {analysis.recommendations?.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-3 bg-slate-800 border-b border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Etapa 7 — Ações de Mitigação e Prevenção
                </span>
              </div>
              <div className="p-6 space-y-3">
                {analysis.recommendations.map((r: any, i: number) => (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-start gap-3"
                  >
                    <span className="flex-shrink-0 text-xs font-mono bg-blue-900 text-blue-300 px-2 py-1 rounded self-start">
                      {r.related_code}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 mb-1">{r.title}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── HFACS — Classificação Bônus ────────────────────────────── */}
          {(analysis.perception_code || analysis.objective_code || analysis.action_code) && (
            <HfacsSection
              hfacs={mapToHfacs({
                perception: analysis.perception_code,
                objective: analysis.objective_code,
                action: analysis.action_code,
              })}
            />
          )}
        </>
      )}
    </div>
  )
}
