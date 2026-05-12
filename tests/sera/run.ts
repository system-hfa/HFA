// tests/sera/run.ts
import { loadFixtures, runAllFixtures } from './runner'
import { saveReport, printSummary } from './report'

const N_RUNS   = parseInt(process.env.SERA_N_RUNS   ?? '3', 10)
const FILTER   = process.env.SERA_FIXTURE

async function main() {
  const all = await loadFixtures()
  const fixtures = FILTER ? all.filter(f => f.id.includes(FILTER)) : all
  if (!fixtures.length) { console.error('Nenhum fixture encontrado'); process.exit(1) }
  const report = await runAllFixtures(fixtures, N_RUNS)
  const file = saveReport(report)
  printSummary(report)
  console.log(`  Relatório: ${file}
`)
  if (report.summary.pass_rate < 0.7) {
    console.error(`  ⚠ Pass rate abaixo de 70%`)
    process.exit(1)
  }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1) })
