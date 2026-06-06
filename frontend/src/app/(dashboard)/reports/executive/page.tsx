import Link from 'next/link'
import { PrintReportButton } from '@/components/product/PrintReportButton'
import {
  demoAnalyses,
  demoCorrectiveActions,
  demoDataConfidence,
  demoQualityTrend,
  demoSafetyIssueCandidates,
} from '@/lib/demo/hfa-demo-data'
import styles from './page.module.css'

const OPEN_ACTION_STATUSES = new Set(['pending', 'in_progress'])

export default function ExecutiveReportPage() {
  const analysesCount = demoAnalyses.length
  const candidatesCount = demoSafetyIssueCandidates.length
  const openActionsCount = demoCorrectiveActions.filter((a) => OPEN_ACTION_STATUSES.has(a.status)).length
  const latestTrend = demoQualityTrend[demoQualityTrend.length - 1]

  return (
    <div className={`p-8 max-w-5xl mx-auto space-y-6 ${styles.reportPage}`}>
      <div className={`${styles.screenOnly} flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4`}>
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

      <article className={`bg-white text-black rounded-lg p-8 shadow ${styles.reportShell}`}>
        <header className="border-b border-slate-300 pb-4 mb-6">
          <h2 className="text-2xl font-bold">Relatorio Executivo HFA/SERA</h2>
          <p className="text-sm text-slate-700 mt-1">
            Demonstracao com dados ficticios para formato executivo de compartilhamento.
          </p>
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            Este relatorio e um apoio a analise tecnica. Nao substitui investigacao humana, validacao de Safety Issues formais ou avaliacao de risco completa.
          </p>
        </header>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>1. Resumo executivo</h3>
          <p className={styles.reportText}>
            O conjunto demonstrativo inclui <strong>{analysesCount}</strong> analises, <strong>{candidatesCount}</strong> candidatos a Safety Issue, <strong>{openActionsCount}</strong> acoes corretivas em aberto e tendencia qualitativa recente com categoria dominante HFA ERC <strong>{latestTrend?.dominant_hfa_erc_category ?? '-'}</strong>.
          </p>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>2. Confianca dos dados</h3>
          <p className={styles.reportText}>
            Nivel informado: <strong>{demoDataConfidence.level}</strong>. Base: {demoDataConfidence.valid_erc_count}/{demoDataConfidence.total_analyses} analises com ERC valido.
          </p>
          <ul className={styles.reportList}>
            {demoDataConfidence.messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <p className={styles.reportNote}>
            Caveat: confianca dos dados mede robustez da base, nao nivel de risco.
          </p>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>3. Principais padroes recorrentes</h3>
          <div className="space-y-2">
            {demoSafetyIssueCandidates.map((candidate) => (
              <div key={candidate.id} className={styles.reportBox}>
                <p className="font-semibold">{candidate.label}</p>
                <p className="text-sm text-slate-700">
                  {candidate.count} ocorrencias ({Math.round(candidate.share * 100)}%) - confianca {candidate.confidence}.
                </p>
                <p className="text-xs text-slate-600 mt-1">{candidate.caveat}</p>
              </div>
            ))}
          </div>
          <p className={styles.reportNote}>
            Candidatos apontam recorrencia observada e nao confirmam Safety Issue formal automaticamente.
          </p>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>4. Tendencia qualitativa observada</h3>
          <div className="space-y-2">
            {demoQualityTrend.map((trend) => (
              <div key={trend.month} className={styles.reportBox}>
                <p className="font-semibold">{trend.month}</p>
                <p className="text-sm text-slate-700">
                  Dominante HFA ERC {trend.dominant_hfa_erc_category} | Critico/alto: {Math.round(trend.critical_or_high_share * 100)}%
                </p>
                <p className="text-xs text-slate-600 mt-1">{trend.note}</p>
              </div>
            ))}
          </div>
          <p className={styles.reportNote}>
            A tendencia e descritiva, nao estima probabilidade futura e nao esta normalizada por exposicao operacional.
          </p>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>5. Acoes corretivas de exemplo</h3>
          <div className="space-y-2">
            {demoCorrectiveActions.map((action) => (
              <div key={action.id} className={styles.reportBox}>
                <p className="font-semibold">{action.title}</p>
                <p className="text-sm text-slate-700">
                  Status: {action.status} | Prioridade: {action.priority}
                </p>
                <p className="text-xs text-slate-600 mt-1">{action.due_label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>6. Metodologia resumida</h3>
          <ul className={styles.reportList}>
            <li>SERA organiza evidencia em Percepcao, Objetivo e Acao (P/O/A).</li>
            <li>Classificacao exige evidencia suficiente; na ausencia de base, registrar incerteza.</li>
            <li>Analise causal e avaliacao de risco sao camadas distintas.</li>
            <li>HFA ERC Category nao representa ARMS Risk Index canonico (1-2500).</li>
          </ul>
        </section>

        <section className={styles.reportSection}>
          <h3 className={styles.reportTitle}>7. Proximos passos sugeridos</h3>
          <ul className={styles.reportList}>
            <li>Registrar mais eventos para aumentar a base observacional.</li>
            <li>Completar evidencia com entrevista estruturada quando necessario.</li>
            <li>Converter recomendacoes em acoes corretivas rastreaveis.</li>
            <li>Acompanhar o Risk Profile como leitura preliminar de padroes.</li>
            <li>Revisar candidatos a Safety Issue em reuniao tecnica dedicada.</li>
          </ul>
        </section>
      </article>

      <div className={`${styles.screenOnly} bg-slate-900 border border-slate-800 rounded-xl p-5`}>
        <h3 className="text-white font-semibold mb-1">Fonte de dados desta fase</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Este relatorio usa dados ficticios versionados para demonstrar formato executivo de exportacao.
          Conexao com dados reais do Risk Profile fica para fase futura dedicada.
        </p>
      </div>
    </div>
  )
}
