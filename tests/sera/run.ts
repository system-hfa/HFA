// tests/sera/run.ts
import fs from 'fs'
import path from 'path'
import { loadFixtures, runAllFixtures, RunOptions } from './runner'
import type { SeraFixture } from './fixtures/schema'
import type { RunReport } from './fixtures/schema'
import { saveReport, printSummary, printCompact } from './report'

const HELP = `
SERA Validation Runner — economic modes

Uso:
  npx tsx tests/sera/run.ts [flags]

Flags:
  --n-runs <n>           Runs por fixture (default: 3, env: SERA_N_RUNS)
  --filter <text>        Filtra fixtures cujo ID contém <text> (env: SERA_FIXTURE)
  --group <nome>         Filtra por grupo: perception, objective, action, erc, combo, generalization, preconditions
  --fail-fast            Interrompe no primeiro FAIL ou ERROR
  --compact              Saída resumida no terminal
  --deterministic-only   Roda apenas fixtures determinísticas (requer --baseline)
  --baseline <path>      Caminho para JSON de baseline (ex: tests/reports/baseline/sera-baseline-v0.1-smoke.json)
  --help                 Mostra esta ajuda

Env vars mantidas para compatibilidade:
  SERA_N_RUNS            (default: 3)
  SERA_FIXTURE           Filtro por substring no ID
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

function filterByGroup(fixtures: SeraFixture[], group: string): SeraFixture[] {
  const prefixMap: Record<string, string> = {
    perception:      'TEST-P-',
    objective:       'TEST-O-',
    action:          'TEST-A-',
    erc:             'TEST-ERC-',
    combo:           'TEST-COMBO-',
    generalization:  'TEST-GEN-',
    preconditions:   'TEST-T2-',
  }
  const prefix = prefixMap[group]
  if (!prefix) {
    console.error(`Grupo desconhecido: "${group}". Use: ${Object.keys(prefixMap).join(', ')}`)
    process.exit(1)
  }
  return fixtures.filter(f => f.id.startsWith(prefix))
}

function filterDeterministic(fixtures: SeraFixture[], baselinePath: string): SeraFixture[] {
  const absPath = path.resolve(baselinePath)
  if (!fs.existsSync(absPath)) {
    console.error(`Baseline não encontrado: ${absPath}`)
    process.exit(1)
  }
  const baseline: RunReport = JSON.parse(fs.readFileSync(absPath, 'utf-8'))
  const detIds = new Set(
    baseline.by_fixture
      .filter(f => f.consistency.fully_deterministic)
      .map(f => f.fixture_id)
  )
  console.log(`[SERA] --deterministic-only: ${detIds.size}/${baseline.fixtures_tested} fixtures do baseline são determinísticas`)
  return fixtures.filter(f => detIds.has(f.id))
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const nRuns  = parseInt(String(args['n-runs'] ?? process.env.SERA_N_RUNS ?? '3'), 10)
  const filter = String(args['filter'] ?? process.env.SERA_FIXTURE ?? '')
  const group  = String(args['group'] ?? '')
  const compact = Boolean(args['compact'])
  const failFast = Boolean(args['fail-fast'])
  const deterministicOnly = Boolean(args['deterministic-only'])
  const baselinePath = String(args['baseline'] ?? '')

  const all = await loadFixtures()
  let fixtures = all

  if (filter) {
    fixtures = fixtures.filter(f => f.id.includes(filter))
  }

  if (group) {
    fixtures = filterByGroup(fixtures, group)
  }

  if (deterministicOnly) {
    if (!baselinePath) {
      console.error('--deterministic-only requer --baseline <path>')
      process.exit(1)
    }
    fixtures = filterDeterministic(fixtures, baselinePath)
  }

  if (!fixtures.length) {
    console.error('Nenhum fixture encontrado para os filtros aplicados')
    process.exit(1)
  }

  const runOptions: RunOptions = { failFast }

  const report = await runAllFixtures(fixtures, nRuns, runOptions)
  const file = saveReport(report)

  if (compact) {
    printCompact(report)
  } else {
    printSummary(report)
  }
  console.log(`  Relatório: ${file}\n`)

  if (report.summary.pass_rate < 0.7) {
    console.error(`  ⚠ Pass rate abaixo de 70%`)
    process.exit(1)
  }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1) })
