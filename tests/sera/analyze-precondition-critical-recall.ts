// tests/sera/analyze-precondition-critical-recall.ts
//
// Report-only analysis: reads precondition-critical catalog and a runner report,
// calculates critical recall per fixture, and prints a diagnostic summary.
//
// DOES NOT affect runner overall, DOES NOT alter baseline, motor, or fixtures.
//
// Usage:
//   npx tsx tests/sera/analyze-precondition-critical-recall.ts \
//     --report tests/reports/baseline/sera-baseline-v0.1.1-smoke.json \
//     --catalog tests/sera/preconditions-critical-catalog.json
//
// Options:
//   --report  <path>   Path to runner JSON report (required)
//   --catalog <path>   Path to preconditions-critical-catalog.json (required)
//   --strict           Exit code 1 if any WARN_CRITICAL_MISSING (default: false)
//   --help             Show this help

import fs from 'fs'
import path from 'path'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CatalogPreconditions {
  critical: string[]
  expected: string[]
  optional: string[]
  noise_if_present: string[]
}

interface CatalogFixture {
  fixture_id: string
  catalog_role: 'active' | 'monitoring' | 'audit_anomaly'
  preconditions: CatalogPreconditions
}

interface Catalog {
  version: string
  fixtures: CatalogFixture[]
}

interface ReportRun {
  run_index: number
  actual: {
    preconditions: string[]
  }
  expected: {
    top_preconditions: string[]
  }
  scores: {
    preconditions: string
    overall: string
  }
}

interface ReportFixture {
  fixture_id: string
  runs: ReportRun[]
}

interface Report {
  run_id?: string
  timestamp?: string
  by_fixture: ReportFixture[]
}

// ─── Status types ─────────────────────────────────────────────────────────────

type FixtureStatus =
  | 'OK'
  | 'WARN_CRITICAL_MISSING'
  | 'NOT_IN_REPORT'
  | 'NO_CRITICAL'
  | 'SKIPPED_MONITORING'
  | 'SKIPPED_AUDIT_ANOMALY'

interface RunDetail {
  run_index: number
  present: string[]
  missing: string[]
  recall: number
}

interface FixtureResult {
  fixture_id: string
  catalog_role: 'active' | 'monitoring' | 'audit_anomaly'
  critical: string[]
  status: FixtureStatus
  runs: RunDetail[]
  avg_recall: number | null
  missing_in_n_runs: number | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const HELP = `
SERA Precondition Critical Recall — report-only analysis

Uso:
  npx tsx tests/sera/analyze-precondition-critical-recall.ts \\
    --report <path> \\
    --catalog <path>

Opções:
  --report  <path>   Report JSON do runner (obrigatório)
  --catalog <path>   Catálogo precondition-critical JSON (obrigatório)
  --strict           Exit code 1 se houver WARN_CRITICAL_MISSING
  --help             Exibe esta ajuda

Este script é report-only: não altera runner, motor, baseline, fixtures ou expected labels.
`

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help') {
      console.log(HELP)
      process.exit(0)
    }
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        args[key] = next
        i++
      } else {
        args[key] = true
      }
    }
  }
  return args
}

function pad(s: string, n: number) {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

function hr(char = '─', len = 70) {
  return char.repeat(len)
}

// ─── Core logic ───────────────────────────────────────────────────────────────

function analyzeFixture(
  catalogFx: CatalogFixture,
  reportMap: Map<string, ReportFixture>
): FixtureResult {
  const { fixture_id, catalog_role, preconditions } = catalogFx
  const { critical } = preconditions

  // Skip non-active roles
  if (catalog_role === 'monitoring') {
    return { fixture_id, catalog_role, critical, status: 'SKIPPED_MONITORING', runs: [], avg_recall: null, missing_in_n_runs: null }
  }
  if (catalog_role === 'audit_anomaly') {
    return { fixture_id, catalog_role, critical, status: 'SKIPPED_AUDIT_ANOMALY', runs: [], avg_recall: null, missing_in_n_runs: null }
  }

  // Active — but no critical defined
  if (critical.length === 0) {
    return { fixture_id, catalog_role, critical, status: 'NO_CRITICAL', runs: [], avg_recall: null, missing_in_n_runs: null }
  }

  // Look up in report
  const reportFx = reportMap.get(fixture_id)
  if (!reportFx) {
    return { fixture_id, catalog_role, critical, status: 'NOT_IN_REPORT', runs: [], avg_recall: null, missing_in_n_runs: null }
  }

  // Per-run analysis
  const runDetails: RunDetail[] = reportFx.runs.map(run => {
    const actual = new Set(run.actual.preconditions)
    const present = critical.filter(c => actual.has(c))
    const missing = critical.filter(c => !actual.has(c))
    const recall = critical.length > 0 ? present.length / critical.length : 1
    return { run_index: run.run_index, present, missing, recall }
  })

  const missingInNRuns = runDetails.filter(r => r.missing.length > 0).length
  const avgRecall = runDetails.reduce((sum, r) => sum + r.recall, 0) / runDetails.length

  const status: FixtureStatus = missingInNRuns >= 2 ? 'WARN_CRITICAL_MISSING' : 'OK'

  return {
    fixture_id,
    catalog_role,
    critical,
    status,
    runs: runDetails,
    avg_recall: avgRecall,
    missing_in_n_runs: missingInNRuns,
  }
}

// ─── Output ───────────────────────────────────────────────────────────────────

function statusLabel(status: FixtureStatus): string {
  switch (status) {
    case 'OK': return '✓ OK'
    case 'WARN_CRITICAL_MISSING': return '⚠ WARN_CRITICAL_MISSING'
    case 'NOT_IN_REPORT': return '- NOT_IN_REPORT'
    case 'NO_CRITICAL': return '- NO_CRITICAL'
    case 'SKIPPED_MONITORING': return '~ SKIPPED (monitoring)'
    case 'SKIPPED_AUDIT_ANOMALY': return '~ SKIPPED (audit_anomaly)'
  }
}

function printResult(result: FixtureResult) {
  const { fixture_id, critical, status, runs, avg_recall, missing_in_n_runs } = result

  const critStr = critical.length > 0 ? critical.join(', ') : '—'
  const recallStr = avg_recall !== null ? avg_recall.toFixed(2) : '—'
  const runsStr = runs.length > 0 ? `${runs.length}/runs` : '—'

  console.log(
    `  ${pad(fixture_id, 38)} ${pad(critStr, 12)} ${pad(runsStr, 7)} recall=${pad(recallStr, 5)} ${statusLabel(status)}`
  )

  if (status === 'WARN_CRITICAL_MISSING' || status === 'OK') {
    for (const run of runs) {
      if (run.missing.length > 0) {
        const presentStr = run.present.length > 0 ? run.present.join(', ') : '(none)'
        const missingStr = run.missing.join(', ')
        console.log(`      run ${run.run_index}: present=[${presentStr}]  missing=[${missingStr}]`)
      }
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args['report'] || !args['catalog']) {
    console.error('Erro: --report e --catalog são obrigatórios.')
    console.error('Use --help para ver as opções.')
    process.exit(1)
  }

  const reportPath = path.resolve(String(args['report']))
  const catalogPath = path.resolve(String(args['catalog']))
  const strict = Boolean(args['strict'])

  if (!fs.existsSync(reportPath)) {
    console.error(`Erro: report não encontrado: ${reportPath}`)
    process.exit(1)
  }
  if (!fs.existsSync(catalogPath)) {
    console.error(`Erro: catalog não encontrado: ${catalogPath}`)
    process.exit(1)
  }

  const report: Report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
  const catalog: Catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))

  // Build report lookup map
  const reportMap = new Map<string, ReportFixture>()
  for (const fx of report.by_fixture) {
    reportMap.set(fx.fixture_id, fx)
  }

  // Analyze all catalog fixtures
  const results = catalog.fixtures.map(fx => analyzeFixture(fx, reportMap))

  // ─── Print ─────────────────────────────────────────────────────────────────

  const lineLen = 72
  console.log('━'.repeat(lineLen))
  console.log('  SERA Precondition Critical Recall — report-only')
  console.log('  ⚠  Este relatório não afeta o overall do runner. Uso: diagnóstico.')
  console.log('━'.repeat(lineLen))
  console.log()
  console.log(`  Report:  ${args['report']}`)
  console.log(`  Catalog: ${args['catalog']}`)
  if (report.run_id) console.log(`  Run ID:  ${report.run_id}`)
  console.log()

  // Active fixtures
  const activeResults = results.filter(r =>
    r.catalog_role === 'active' && r.status !== 'NO_CRITICAL'
  )
  const skippedResults = results.filter(r =>
    r.status === 'SKIPPED_MONITORING' || r.status === 'SKIPPED_AUDIT_ANOMALY'
  )

  console.log('ACTIVE FIXTURES (candidates for critical recall)')
  console.log(hr())
  console.log(
    `  ${pad('Fixture', 38)} ${pad('Critical', 12)} ${pad('Runs', 7)} Recall   Status`
  )
  console.log(hr('─', 70))

  for (const result of activeResults) {
    printResult(result)
  }
  console.log()

  if (skippedResults.length > 0) {
    console.log('SKIPPED (monitoring / audit_anomaly — not release-blocking)')
    console.log(hr())
    for (const result of skippedResults) {
      const note =
        result.status === 'SKIPPED_MONITORING'
          ? 'no critical preconditions defined'
          : 'top_preconditions require review before use'
      console.log(`  ${pad(result.fixture_id, 38)} ${pad(result.catalog_role, 14)} — ${note}`)
    }
    console.log()
  }

  // ─── Summary ───────────────────────────────────────────────────────────────

  const totalCatalog = catalog.fixtures.length
  const activeFixtures = results.filter(r => r.catalog_role === 'active')
  const activeWithCritical = activeFixtures.filter(r => r.critical.length > 0)
  const activeFoundInReport = activeWithCritical.filter(r => r.status !== 'NOT_IN_REPORT')
  const activeNotInReport = activeWithCritical.filter(r => r.status === 'NOT_IN_REPORT')

  const criticalItemsTotal = activeWithCritical.reduce((sum, r) => sum + r.critical.length, 0)

  // Critical items seen: per fixture, count unique critical preconditions seen in at least 1 run
  const criticalItemsSeen = activeFoundInReport.reduce((sum, r) => {
    const seenSet = new Set<string>()
    for (const run of r.runs) {
      for (const p of run.present) seenSet.add(p)
    }
    return sum + seenSet.size
  }, 0)

  const recallValues = activeFoundInReport
    .filter(r => r.avg_recall !== null)
    .map(r => r.avg_recall as number)

  const avgCriticalRecall =
    recallValues.length > 0
      ? recallValues.reduce((s, v) => s + v, 0) / recallValues.length
      : null

  const warnFixtures = results.filter(r => r.status === 'WARN_CRITICAL_MISSING')
  const skippedMonitoring = results.filter(r => r.status === 'SKIPPED_MONITORING').length
  const skippedAudit = results.filter(r => r.status === 'SKIPPED_AUDIT_ANOMALY').length

  console.log('SUMMARY')
  console.log(hr())
  console.log(`  Total catalog fixtures:           ${totalCatalog}`)
  console.log(`  Active fixtures (catalog_role):   ${activeFixtures.length}`)
  console.log(`  Active with Critical defined:     ${activeWithCritical.length}`)
  console.log(`  Active found in report:           ${activeFoundInReport.length}`)
  console.log(`  Active not in report (N/A):       ${activeNotInReport.length}${activeNotInReport.length > 0 ? '  (' + activeNotInReport.map(r => r.fixture_id).join(', ') + ')' : ''}`)
  console.log(`  Critical items total:             ${criticalItemsTotal}`)
  console.log(`  Critical items seen (≥1 run):     ${criticalItemsSeen}`)
  console.log(`  Avg critical recall (active/found):  ${avgCriticalRecall !== null ? avgCriticalRecall.toFixed(3) : 'N/A'}`)
  console.log(`  Fixtures WARN_CRITICAL_MISSING:   ${warnFixtures.length}${warnFixtures.length > 0 ? '  (' + warnFixtures.map(r => r.fixture_id).join(', ') + ')' : ''}`)
  console.log(`  Skipped monitoring:               ${skippedMonitoring}`)
  console.log(`  Skipped audit_anomaly:            ${skippedAudit}`)

  console.log()
  console.log('━'.repeat(lineLen))
  console.log('  report-only — does not affect runner overall')
  if (strict && warnFixtures.length > 0) {
    console.log('  --strict: exit code 1 (WARN_CRITICAL_MISSING encontrado)')
    console.log('━'.repeat(lineLen))
    process.exit(1)
  }
  console.log('  exit code: 0')
  console.log('━'.repeat(lineLen))
}

main()
