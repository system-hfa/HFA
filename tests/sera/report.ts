// tests/sera/report.ts
import fs from 'fs'
import path from 'path'
import type { RunReport } from './fixtures/schema'

const REPORTS_DIR = path.join(__dirname, '../../tests/reports')

export function saveReport(report: RunReport): string {
  fs.mkdirSync(REPORTS_DIR, { recursive: true })
  const filePath = path.join(REPORTS_DIR, `${report.run_id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2))
  return filePath
}

export function printSummary(report: RunReport): void {
  const s = report.summary
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`
  const fx = report.by_fixture
  const avg = (key: keyof typeof fx[0]['accuracy']) =>
    pct(fx.reduce((a,f) => a + f.accuracy[key], 0) / fx.length)

  console.log('\n' + '═'.repeat(60))
  console.log('  SERA CONFORMANCE REPORT')
  console.log('═'.repeat(60))
  console.log(`  Run       : ${report.run_id}`)
  console.log(`  Fixtures  : ${report.fixtures_tested} × ${report.n_runs_per_fixture} runs`)
  if (report.aborted) console.log(`  ⚠  EXECUÇÃO INTERROMPIDA (fail-fast)`)
  console.log(`\n  PASS      : ${s.pass} (${pct(s.pass_rate)})`)
  console.log(`  PARTIAL   : ${s.partial}`)
  console.log(`  FAIL      : ${s.fail}`)
  console.log(`  ERRORS    : ${s.error}`)
  console.log(`\n  DETERMINISMO : ${pct(s.determinism_rate)}`)
  console.log('\n  PRECISÃO POR ETAPA:')
  console.log(`    Percepção    : ${avg('perception_accuracy')}`)
  console.log(`    Objetivo     : ${avg('objective_accuracy')}`)
  console.log(`    Ação         : ${avg('action_accuracy')}`)
  console.log(`    ERC Level    : ${avg('erc_accuracy')}`)
  console.log(`    Pré-cond.    : ${avg('precondition_recall')} (recall)`)
  console.log('\n  FIXTURES MAIS FRACOS:')
  report.weakest_fixtures.forEach((id, i) => {
    const f = fx.find(x => x.fixture_id === id)!
    console.log(`    ${i+1}. ${id} — ${pct(f.accuracy.overall_accuracy)} — esperado: ${f.expected_codes}`)
  })
  console.log('═'.repeat(60) + '\n')
}

export function printCompact(report: RunReport): void {
  const s = report.summary
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`

  const nonPass = report.by_fixture.filter(f => f.accuracy.overall_accuracy < 1)
  const nonPassIds = nonPass.map(f =>
    `${f.fixture_id} (${pct(f.accuracy.overall_accuracy)})`
  )

  console.log(`[SERA] ${report.fixtures_tested}f × ${report.n_runs_per_fixture}r | PASS ${s.pass} | PARTIAL ${s.partial} | FAIL ${s.fail} | ERROR ${s.error} | rate ${pct(s.pass_rate)} | det ${pct(s.determinism_rate)}`)
  if (report.aborted) console.log('[SERA] ⚠ interrompido por fail-fast')
  if (nonPassIds.length) {
    console.log(`[SERA] não-PASS: ${nonPassIds.join(', ')}`)
  }
}
