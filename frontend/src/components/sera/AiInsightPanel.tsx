'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Recommendation {
  prioridade: number
  acao: string
  justificativa: string
  prazo_sugerido: string
  responsavel_sugerido: string
}

interface InsightData {
  diagnostico_principal: string
  causa_raiz_provavel: string
  nivel_risco: string
  recomendacoes_prioritarias: Recommendation[]
  padrao_combinacao: string
  pontos_positivos: string
  proximo_passo_imediato: string
}

interface AiInsightResult {
  insight: InsightData
  generated_at: string
  model_used: string
}

interface AiInsightPanelProps {
  intelligenceData: unknown
  token: string
}

const prazoColor: Record<string, string> = {
  imediato: 'text-red-400',
  '30 dias': 'text-amber-400',
  '90 dias': 'text-yellow-400',
  '6 meses': 'text-green-400',
}

export function AiInsightPanel({ intelligenceData, token }: AiInsightPanelProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<AiInsightResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function generate() {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/org/ai-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ intelligence_data: intelligenceData }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
        throw new Error(err.detail || `Erro ${res.status}`)
      }
      const data = await res.json() as AiInsightResult
      setResult(data)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e))
      setStatus('error')
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white">Diagnóstico Assistivo por IA</h3>
          <p className="text-slate-500 text-xs mt-0.5">Padrões identificados com apoio de modelo de linguagem — sujeito a revisão do investigador</p>
        </div>
        <Button
          onClick={generate}
          disabled={status === 'loading' || !intelligenceData}
          variant={status === 'done' ? 'outline' : 'default'}
          size="sm"
        >
          {status === 'loading' ? 'Analisando...' : status === 'done' ? 'Regerar' : 'Gerar Diagnóstico Assistivo'}
        </Button>
      </div>

      {status === 'loading' && (
        <div className="flex items-center gap-3 text-slate-400 py-6">
          <svg className="animate-spin size-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm">Analisando padrões organizacionais...</span>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{errorMsg}</p>
      )}

      {status === 'done' && result && (
        <div className="space-y-5">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Diagnóstico Principal</p>
            <p className="text-white text-sm leading-relaxed">{result.insight.diagnostico_principal}</p>
          </div>

          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Causa Raiz Provável</p>
            <p className="text-slate-300 text-sm leading-relaxed">{result.insight.causa_raiz_provavel}</p>
          </div>

          {result.insight.proximo_passo_imediato && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3">
              <p className="text-amber-400 text-xs uppercase tracking-wide mb-1 font-semibold">Próximo Passo Imediato</p>
              <p className="text-white text-sm">{result.insight.proximo_passo_imediato}</p>
            </div>
          )}

          {result.insight.recomendacoes_prioritarias?.length > 0 && (
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">Recomendações Prioritárias</p>
              <ol className="space-y-3">
                {result.insight.recomendacoes_prioritarias.map((r) => (
                  <li key={r.prioridade} className="bg-slate-800/60 rounded-lg px-4 py-3">
                    <div className="flex items-start gap-3">
                      <span className="text-slate-500 text-xs font-bold mt-0.5 shrink-0">#{r.prioridade}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{r.acao}</p>
                        <p className="text-slate-400 text-xs mt-1">{r.justificativa}</p>
                        <div className="flex gap-4 mt-2">
                          <span className={`text-xs font-medium ${prazoColor[r.prazo_sugerido] ?? 'text-slate-400'}`}>
                            ⏱ {r.prazo_sugerido}
                          </span>
                          <span className="text-slate-500 text-xs">👤 {r.responsavel_sugerido}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {result.insight.pontos_positivos && (
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Pontos Positivos</p>
              <p className="text-green-400 text-sm">{result.insight.pontos_positivos}</p>
            </div>
          )}

          <p className="text-slate-600 text-xs border-t border-slate-800 pt-3">
            Modelo: {result.model_used} · Gerado em {new Date(result.generated_at).toLocaleString('pt-BR')} · Este diagnóstico é assistivo — a decisão final pertence ao investigador.
          </p>
        </div>
      )}
    </div>
  )
}
