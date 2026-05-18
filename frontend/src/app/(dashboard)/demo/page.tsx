'use client'

import Link from 'next/link'
import {
  demoAnalyses,
  demoCorrectiveActions,
  demoDataConfidence,
  demoQualityTrend,
  demoRecurringPatterns,
  demoSafetyIssueCandidates,
} from '@/lib/demo/hfa-demo-data'

const PRIORITY_STYLES = {
  low: 'text-slate-300 bg-slate-800 border border-slate-700',
  medium: 'text-yellow-300 bg-yellow-500/10 border border-yellow-500/20',
  high: 'text-red-300 bg-red-500/10 border border-red-500/20',
} as const

const STATUS_STYLES = {
  pending: 'text-yellow-300 bg-yellow-500/10 border border-yellow-500/20',
  in_progress: 'text-blue-300 bg-blue-500/10 border border-blue-500/20',
  closed: 'text-green-300 bg-green-500/10 border border-green-500/20',
} as const

export default function DemoPage() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-white">Demonstracao HFA/SERA</h1>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
            Dados ficticios
          </span>
        </div>
        <p className="text-slate-400 max-w-4xl">
          Exemplo ficticio para visualizar como analises individuais se transformam em sinais organizacionais.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <p className="text-amber-200 text-sm leading-relaxed">
            Esta pagina nao usa dados reais da sua organizacao e nao deve ser usada para decisao operacional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-2">O que esta demo mostra</p>
          <h2 className="text-white font-semibold mb-1">Analises SERA de exemplo</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dez eventos ficticios com codigos P/O/A, categorias HFA ERC e recomendacoes resumidas.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-2">O que esta demo mostra</p>
          <h2 className="text-white font-semibold mb-1">Padroes recorrentes</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Recorrencias ficticias que ilustram como candidatos a Safety Issue emergem a partir de varias analises.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-2">O que esta demo mostra</p>
          <h2 className="text-white font-semibold mb-1">Perfil organizacional preliminar</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Confianca dos dados, tendencia qualitativa e a conversao de recomendacoes em acoes acompanhaveis.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div>
            <h2 className="text-white font-semibold">10 analises de exemplo</h2>
            <p className="text-slate-500 text-sm mt-1">
              Cada item abaixo representa um caso ficticio para treinamento e demonstracao.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            {demoAnalyses.length} analises de exemplo
          </div>
        </div>

        <div className="space-y-3">
          {demoAnalyses.map((analysis) => (
            <div key={analysis.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <h3 className="text-white text-sm font-semibold">{analysis.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{analysis.context}</p>
                </div>
                <span className="text-xs font-semibold text-white bg-slate-700 rounded-full px-3 py-1">
                  HFA ERC {analysis.hfa_erc_category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[analysis.perception_code, analysis.objective_code, analysis.action_code].map((code) => (
                  <span key={`${analysis.id}-${code}`} className="text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1">
                    {code}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{analysis.summary}</p>
              <p className="text-slate-500 text-xs mt-2">
                Recomendacao exemplo: {analysis.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Padroes recorrentes</h2>
          <div className="space-y-3">
            {demoRecurringPatterns.map((pattern) => (
              <div key={pattern.id} className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white font-mono text-sm">{pattern.label}</span>
                  <span className="text-slate-400 text-xs">{pattern.count} ocorrencias</span>
                </div>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{pattern.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Candidatos a Safety Issue</h2>
          <div className="space-y-3">
            {demoSafetyIssueCandidates.map((candidate) => (
              <div key={candidate.id} className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white text-sm font-semibold">{candidate.label}</span>
                  <span className="text-slate-400 text-xs">
                    {candidate.count} / {Math.round(candidate.share * 100)}%
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Confianca: <span className="text-slate-200">{candidate.confidence}</span>
                </p>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{candidate.caveat}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4 leading-relaxed">
            Candidatos indicam recorrencia observada; Safety Issue formal exige revisao humana, contexto, exposicao e barreiras.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Tendencia qualitativa</h2>
          <p className="text-slate-500 text-sm mb-4">
            Composicao mensal por categoria HFA ERC - exemplo ficticio.
          </p>
          <div className="space-y-3">
            {demoQualityTrend.map((point) => (
              <div key={point.month} className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white text-sm font-semibold">{point.month}</span>
                  <span className="text-slate-300 text-xs">
                    dominante HFA ERC {point.dominant_hfa_erc_category}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Critico ou alto: {Math.round(point.critical_or_high_share * 100)}%
                </p>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{point.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Confianca dos dados na demo</h2>
          <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 space-y-2">
            <p className="text-sm text-white">
              Nivel: <span className="font-semibold">{demoDataConfidence.level}</span>
            </p>
            <p className="text-xs text-slate-400">
              {demoDataConfidence.valid_erc_count}/{demoDataConfidence.total_analyses} analises com ERC valido
            </p>
            {demoDataConfidence.messages.map((message) => (
              <p key={message} className="text-xs text-slate-400 leading-relaxed">
                • {message}
              </p>
            ))}
            <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-700">
              {demoDataConfidence.caveat}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Acoes corretivas de exemplo</h2>
        <div className="space-y-3">
          {demoCorrectiveActions.map((action) => (
            <div key={action.id} className="border border-slate-700 rounded-lg p-4 bg-slate-800/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-white text-sm font-semibold">{action.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{action.due_label}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${PRIORITY_STYLES[action.priority]}`}>
                  prioridade {action.priority}
                </span>
                <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${STATUS_STYLES[action.status]}`}>
                  {action.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white font-semibold">Proximo passo</h2>
          <p className="text-slate-300 text-sm mt-1">
            Use a demonstracao para entender o fluxo e depois avance para eventos reais da sua organizacao.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/events/new"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Criar meu primeiro evento
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Comecar pelo onboarding
          </Link>
          <Link
            href="/risk-profile"
            className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Ver Risk Profile real
          </Link>
        </div>
      </div>
    </div>
  )
}
