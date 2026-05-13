'use client'

import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import type { SufficiencyResult } from '@/lib/sera/interview/types'

type Props = {
  result: SufficiencyResult
}

const DIMENSION_LABELS: Record<string, string> = {
  perception: 'Percepção',
  objective: 'Objetivo',
  action: 'Ação',
  preconditions: 'Pré-condições',
}

const DIMENSION_ORDER = ['perception', 'objective', 'action', 'preconditions']

export function SufficiencyResultPanel({ result }: Props) {
  return (
    <div className="space-y-5">
      {/* Overall status */}
      <div
        className={`flex items-start gap-4 rounded-xl border p-5 ${
          result.ready
            ? 'bg-emerald-500/5 border-emerald-500/20'
            : 'bg-red-500/5 border-red-500/20'
        }`}
      >
        {result.ready ? (
          <CheckCircle2 className="size-6 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="size-6 text-red-400 shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`font-semibold ${result.ready ? 'text-emerald-400' : 'text-red-400'}`}>
            {result.ready ? 'Pronto para análise SERA' : 'Ainda há lacunas críticas'}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {result.ready
              ? 'Todas as evidências obrigatórias foram coletadas. A análise pode ser iniciada.'
              : `${result.missingRequired.length} evidência${result.missingRequired.length !== 1 ? 's' : ''} obrigatória${result.missingRequired.length !== 1 ? 's' : ''} ainda ${result.missingRequired.length !== 1 ? 'estão' : 'está'} faltando.`}
          </p>
        </div>
      </div>

      {/* By dimension */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DIMENSION_ORDER.map((dim) => {
          const dimResult = result.byDimension[dim]
          if (!dimResult) return null
          return (
            <div
              key={dim}
              className={`rounded-xl border p-4 space-y-2 ${
                dimResult.ready
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-slate-900 border-red-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{DIMENSION_LABELS[dim]}</span>
                {dimResult.ready ? (
                  <CheckCircle2 className="size-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="size-4 text-red-400" />
                )}
              </div>

              {dimResult.missingRequired.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">
                    Obrigatórios ausentes
                  </p>
                  <ul className="space-y-0.5">
                    {dimResult.missingRequired.map((id) => (
                      <li key={id} className="text-xs text-red-300/80">
                        {id}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dimResult.missingRecommended.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-yellow-500/80 uppercase tracking-wider mb-1">
                    Recomendados ausentes
                  </p>
                  <ul className="space-y-0.5">
                    {dimResult.missingRecommended.map((id) => (
                      <li key={id} className="text-xs text-yellow-400/60">
                        {id}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dimResult.ready && dimResult.missingRecommended.length === 0 && (
                <p className="text-xs text-slate-500">Completo</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Follow-up questions */}
      {result.followUpQuestions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-white">Perguntas complementares sugeridas</h3>
          <p className="text-xs text-slate-500">
            Use estas perguntas para retornar ao entrevistado e preencher as lacunas antes de
            iniciar a análise.
          </p>
          <ul className="space-y-2">
            {result.followUpQuestions.map((q, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 text-sm ${
                  i < result.missingRequired.length ? 'text-red-300/90' : 'text-yellow-300/70'
                }`}
              >
                <span className="mt-1 size-1.5 rounded-full bg-current shrink-0" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
