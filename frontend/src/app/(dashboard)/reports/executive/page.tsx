import Link from 'next/link'
import { PrintReportButton } from '@/components/product/PrintReportButton'
import {
  demoAnalyses,
  demoCorrectiveActions,
  demoDataConfidence,
  demoQualityTrend,
  demoSafetyIssueCandidates,
} from '@/lib/demo/hfa-demo-data'

const OPEN_ACTION_STATUSES = new Set(['pending', 'in_progress'])

export default function ExecutiveReportPage() {
  const analysesCount = demoAnalyses.length
  const candidatesCount = demoSafetyIssueCandidates.length
  const openActionsCount = demoCorrectiveActions.filter((a) => OPEN_ACTION_STATUSES.has(a.status)).length
  const latestTrend = demoQualityTrend[demoQualityTrend.length - 1]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 report-page">
      <div className="screen-only flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Relatorio executivo HFA/SERA</h1>
          <p className="text-slate-400 mt-1">
            Resumo print-friendly para reuniao, auditoria ou acompanhamento SGSO/SMS.
          </p>
        </div>
        <div className="flex gap-2">
          <PrintReportButton />
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Voltar ao dashboard
          </Link>
        </div>
      </div>

      <article className="bg-white text-black rounded-lg p-8 shadow report-shell">
        <header className="border-b border-slate-300 pb-4 mb-6">
          <h2 className="text-2xl font-bold">Relatorio Executivo HFA/SERA</h2>
          <p className="text-sm text-slate-700 mt-1">
            Demonstracao com dados ficticios para formato executivo de compartilhamento.
          </p>
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            Este relatorio e um apoio a analise tecnica. Nao substitui investigacao humana, validacao de Safety Issues formais ou avaliacao de risco completa.
          </p>
        </header>

        <section className="report-section">
          <h3 className="report-title">1. Resumo executivo</h3>
          <p className="report-text">
            O conjunto demonstrativo inclui <strong>{analysesCount}</strong> analises, <strong>{candidatesCount}</strong> candidatos a Safety Issue, <strong>{openActionsCount}</strong> acoes corretivas em aberto e tendencia qualitativa recente com categoria dominante HFA ERC <strong>{latestTrend?.dominant_hfa_erc_category ?? '-'}</strong>.
          </p>
        </section>

        <section className="report-section">
          <h3 className="report-title">2. Confianca dos dados</h3>
          <p className="report-text">
            Nivel informado: <strong>{demoDataConfidence.level}</strong>. Base: {demoDataConfidence.valid_erc_count}/{demoDataConfidence.total_analyses} analises com ERC valido.
          </p>
          <ul className="report-list">
            {demoDataConfidence.messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <p className="report-note">
            Caveat: confianca dos dados mede robustez da base, nao nivel de risco.
          </p>
        </section>

        <section className="report-section">
          <h3 className="report-title">3. Principais padroes recorrentes</h3>
          <div className="space-y-2">
            {demoSafetyIssueCandidates.map((candidate) => (
              <div key={candidate.id} className="report-box">
                <p className="font-semibold">{candidate.label}</p>
                <p className="text-sm text-slate-700">
                  {candidate.count} ocorrencias ({Math.round(candidate.share * 100)}%) - confianca {candidate.confidence}.
                </p>
                <p className="text-xs text-slate-600 mt-1">{candidate.caveat}</p>
              </div>
            ))}
          </div>
          <p className="report-note">
            Candidatos apontam recorrencia observada e nao confirmam Safety Issue formal automaticamente.
          </p>
        </section>

        <section className="report-section">
          <h3 className="report-title">4. Tendencia qualitativa observada</h3>
          <div className="space-y-2">
            {demoQualityTrend.map((trend) => (
              <div key={trend.month} className="report-box">
                <p className="font-semibold">{trend.month}</p>
                <p className="text-sm text-slate-700">
                  Dominante HFA ERC {trend.dominant_hfa_erc_category} | Critico/alto: {Math.round(trend.critical_or_high_share * 100)}%
                </p>
                <p className="text-xs text-slate-600 mt-1">{trend.note}</p>
              </div>
            ))}
          </div>
          <p className="report-note">
            A tendencia e descritiva, nao estima probabilidade futura e nao esta normalizada por exposicao operacional.
          </p>
        </section>

        <section className="report-section">
          <h3 className="report-title">5. Acoes corretivas de exemplo</h3>
          <div className="space-y-2">
            {demoCorrectiveActions.map((action) => (
              <div key={action.id} className="report-box">
                <p className="font-semibold">{action.title}</p>
                <p className="text-sm text-slate-700">
                  Status: {action.status} | Prioridade: {action.priority}
                </p>
                <p className="text-xs text-slate-600 mt-1">{action.due_label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="report-section">
          <h3 className="report-title">6. Metodologia resumida</h3>
          <ul className="report-list">
            <li>SERA organiza evidencia em Percepcao, Objetivo e Acao (P/O/A).</li>
            <li>Classificacao exige evidencia suficiente; na ausencia de base, registrar incerteza.</li>
            <li>Analise causal e avaliacao de risco sao camadas distintas.</li>
            <li>HFA ERC Category nao representa ARMS Risk Index canonico (1-2500).</li>
          </ul>
        </section>

        <section className="report-section">
          <h3 className="report-title">7. Proximos passos sugeridos</h3>
          <ul className="report-list">
            <li>Registrar mais eventos para aumentar a base observacional.</li>
            <li>Completar evidencia com entrevista estruturada quando necessario.</li>
            <li>Converter recomendacoes em acoes corretivas rastreaveis.</li>
            <li>Acompanhar o Risk Profile como leitura preliminar de padroes.</li>
            <li>Revisar candidatos a Safety Issue em reuniao tecnica dedicada.</li>
          </ul>
        </section>
      </article>

      <div className="screen-only bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Fonte de dados desta fase</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Este relatorio usa dados ficticios versionados para demonstrar formato executivo de exportacao.
          Conexao com dados reais do Risk Profile fica para fase futura dedicada.
        </p>
      </div>

      <style jsx global>{`
        @media print {
          .screen-only {
            display: none !important;
          }
          body {
            background: #ffffff !important;
          }
          .report-page {
            margin: 0 !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .report-shell {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0.5in !important;
          }
          .report-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
        .report-section {
          margin-top: 1.25rem;
        }
        .report-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .report-text {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #334155;
        }
        .report-list {
          margin: 0.5rem 0 0 1rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #334155;
        }
        .report-box {
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          padding: 0.625rem;
        }
        .report-note {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #475569;
        }
      `}</style>
    </div>
  )
}
