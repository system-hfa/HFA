// tests/sera/compare-baseline.ts
import fs from 'fs'
import path from 'path'
import type { RunReport, FixtureReport, TestResult } from './fixtures/schema'

const HELP = `
SERA Baseline Comparator

Compara um relatório atual contra um baseline salvo, identificando
regressões, melhorias e mudanças por fixture.

Uso:
  npx tsx tests/sera/compare-baseline.ts --baseline <path> --current <path> [flags]

Flags:
  --baseline <path>       JSON do baseline
  --current <path>        JSON do relatório atual
  --compact               Saída resumida (1-2 linhas + lista de diferenças)
  --fail-on-regression    Exit code 1 se houver qualquer regressão
  --help                  Mostra esta ajuda
`

interface FixtureDiff {
  fixture_id: string
  category: 'regression' | 'improvement' | 'changed' | 'unchanged' | 'skipped' | 'missing_from_current' | 'new_in_current'
  details: string[]
}

interface ComparisonResult {
  baselineFile: string
  currentFile: string
  baselineRunId: string
  currentRunId: string
  partialCurrent: boolean
  fixturesCompared: number
  baselineNotEvaluated: number
  summary: {
    baseline: { pass_rate: number; determinism_rate: number; pass: number; partial: number; fail: number; error: number }
    current: { pass_rate: number; determinism_rate: number; pass: number; partial: number; fail: number; error: number }
    pass_rate_delta: number
    determinism_rate_delta: number
  }
  fixtures: FixtureDiff[]
  totals: { regression: number; improvement: number; changed: number; unchanged: number; skipped: number; missing: number; new: number }
}

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

function loadReport(filePath: string): RunReport {
  const absPath = path.resolve(filePath)
  if (!fs.existsSync(absPath)) {
    console.error(`Arquivo não encontrado: ${absPath}`)
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(absPath, 'utf-8')) as RunReport
}

function compareRuns(bRuns: TestResult[], cRuns: TestResult[]): string[] {
  const details: string[] = []
  const maxRuns = Math.max(bRuns.length, cRuns.length)

  for (let i = 0; i < maxRuns; i++) {
    const b = bRuns[i]
    const c = cRuns[i]
    if (!b || !c) {
      details.push(`run[${i}]: presente em apenas um lado`)
      continue
    }
    const changes: string[] = []
    if (b.actual.perception_code !== c.actual.perception_code) {
      changes.push(`perception ${b.actual.perception_code}→${c.actual.perception_code}`)
    }
    if (b.actual.objective_code !== c.actual.objective_code) {
      changes.push(`objective ${b.actual.objective_code}→${c.actual.objective_code}`)
    }
    if (b.actual.action_code !== c.actual.action_code) {
      changes.push(`action ${b.actual.action_code}→${c.actual.action_code}`)
    }
    if (b.actual.erc_level !== c.actual.erc_level) {
      changes.push(`erc ${b.actual.erc_level}→${c.actual.erc_level}`)
    }
    if (b.scores.overall !== c.scores.overall) {
      changes.push(`overall ${b.scores.overall}→${c.scores.overall}`)
    }
    if (b.error && !c.error) changes.push('error resolvido')
    if (!b.error && c.error) changes.push(`novo error: ${c.error}`)
    if (changes.length) {
      details.push(`run[${i}]: ${changes.join(', ')}`)
    }
  }
  return details
}

function compareFixture(baseline: FixtureReport, current: FixtureReport): FixtureDiff {
  const details: string[] = []

  const accDelta = current.accuracy.overall_accuracy - baseline.accuracy.overall_accuracy
  if (accDelta !== 0) {
    const pct = (n: number) => `${(n * 100).toFixed(0)}%`
    details.push(`accuracy ${pct(baseline.accuracy.overall_accuracy)}→${pct(current.accuracy.overall_accuracy)} (${accDelta > 0 ? '+' : ''}${pct(accDelta)})`)
  }

  if (baseline.consistency.fully_deterministic !== current.consistency.fully_deterministic) {
    details.push(`deterministic ${baseline.consistency.fully_deterministic}→${current.consistency.fully_deterministic}`)
  }

  const runDiffs = compareRuns(baseline.runs, current.runs)
  details.push(...runDiffs)

  const bDet = baseline.consistency.fully_deterministic
  const cDet = current.consistency.fully_deterministic
  const bAcc = baseline.accuracy.overall_accuracy
  const cAcc = current.accuracy.overall_accuracy

  if (accDelta < 0 || (!cDet && bDet)) {
    return { fixture_id: baseline.fixture_id, category: 'regression', details }
  }
  if (accDelta > 0 || (cDet && !bDet)) {
    return { fixture_id: baseline.fixture_id, category: 'improvement', details }
  }
  if (details.length > 0) {
    return { fixture_id: baseline.fixture_id, category: 'changed', details }
  }
  return { fixture_id: baseline.fixture_id, category: 'unchanged', details: [] }
}

function compare(baseline: RunReport, current: RunReport): ComparisonResult {
  const bMap = new Map(baseline.by_fixture.map(f => [f.fixture_id, f]))
  const cMap = new Map(current.by_fixture.map(f => [f.fixture_id, f]))

  const partialCurrent = current.fixtures_tested < baseline.fixtures_tested

  const fixtures: FixtureDiff[] = []

  for (const [id, bFix] of bMap) {
    const cFix = cMap.get(id)
    if (!cFix) {
      if (partialCurrent) {
        fixtures.push({ fixture_id: id, category: 'skipped', details: [] })
      } else {
        fixtures.push({ fixture_id: id, category: 'missing_from_current', details: ['presente no baseline, ausente no current'] })
      }
    } else {
      fixtures.push(compareFixture(bFix, cFix))
    }
  }

  for (const [id] of cMap) {
    if (!bMap.has(id)) {
      fixtures.push({ fixture_id: id, category: 'new_in_current', details: ['ausente no baseline, presente no current'] })
    }
  }

  const bS = baseline.summary
  const cS = current.summary

  const comparedFixtures = fixtures.filter(f =>
    f.category === 'regression' || f.category === 'improvement' || f.category === 'changed' || f.category === 'unchanged'
  )

  return {
    baselineFile: '',
    currentFile: '',
    baselineRunId: baseline.run_id,
    currentRunId: current.run_id,
    partialCurrent,
    fixturesCompared: comparedFixtures.length,
    baselineNotEvaluated: fixtures.filter(f => f.category === 'skipped').length,
    summary: {
      baseline: { pass_rate: bS.pass_rate, determinism_rate: bS.determinism_rate, pass: bS.pass, partial: bS.partial, fail: bS.fail, error: bS.error },
      current: { pass_rate: cS.pass_rate, determinism_rate: cS.determinism_rate, pass: cS.pass, partial: cS.partial, fail: cS.fail, error: cS.error },
      pass_rate_delta: cS.pass_rate - bS.pass_rate,
      determinism_rate_delta: cS.determinism_rate - bS.determinism_rate,
    },
    fixtures: fixtures.sort((a, b) => a.fixture_id.localeCompare(b.fixture_id)),
    totals: {
      regression: fixtures.filter(f => f.category === 'regression').length,
      improvement: fixtures.filter(f => f.category === 'improvement').length,
      changed: fixtures.filter(f => f.category === 'changed').length,
      unchanged: fixtures.filter(f => f.category === 'unchanged').length,
      skipped: fixtures.filter(f => f.category === 'skipped').length,
      missing: fixtures.filter(f => f.category === 'missing_from_current').length,
      new: fixtures.filter(f => f.category === 'new_in_current').length,
    },
  }
}

function printFull(result: ComparisonResult): void {
  const s = result.summary
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`
  const delta = (n: number) => n > 0 ? `+${pct(n)}` : pct(n)

  console.log('\n' + '═'.repeat(60))
  console.log('  SERA BASELINE COMPARISON')
  console.log('═'.repeat(60))
  console.log(`  Baseline : ${result.baselineFile}`)
  console.log(`  Current  : ${result.currentFile}`)
  if (result.partialCurrent) {
    console.log(`  ⚠  Current report is PARTIAL — ${result.fixturesCompared} fixtures compared, ${result.baselineNotEvaluated} not evaluated`)
  }
  console.log(`\n  SUMMARY:`)
  console.log(`    pass_rate       : ${pct(s.baseline.pass_rate)} → ${pct(s.current.pass_rate)} (${delta(s.pass_rate_delta)})`)
  console.log(`    determinism_rate: ${pct(s.baseline.determinism_rate)} → ${pct(s.current.determinism_rate)} (${delta(s.determinism_rate_delta)})`)
  console.log(`    PASS   : ${s.baseline.pass} → ${s.current.pass}`)
  console.log(`    PARTIAL: ${s.baseline.partial} → ${s.current.partial}`)
  console.log(`    FAIL   : ${s.baseline.fail} → ${s.current.fail}`)
  console.log(`    ERROR  : ${s.baseline.error} → ${s.current.error}`)

  const t = result.totals
  console.log(`\n  FIXTURES (${result.fixturesCompared} compared):`)
  console.log(`    regression  : ${t.regression}`)
  console.log(`    improvement : ${t.improvement}`)
  console.log(`    changed     : ${t.changed}`)
  console.log(`    unchanged   : ${t.unchanged}`)
  if (t.skipped) console.log(`    skipped (not evaluated) : ${t.skipped}`)
  if (t.missing) console.log(`    missing     : ${t.missing}`)
  if (t.new) console.log(`    new         : ${t.new}`)

  const diffs = result.fixtures.filter(f => f.category !== 'unchanged' && f.category !== 'skipped')
  if (diffs.length) {
    console.log(`\n  DIFFS:`)
    for (const d of diffs) {
      const tag = { regression: '▼', improvement: '▲', changed: '●', missing_from_current: '✗', new_in_current: '+' }[d.category] ?? ' '
      console.log(`    ${tag} ${d.fixture_id} [${d.category}]`)
      for (const detail of d.details) {
        console.log(`      ${detail}`)
      }
    }
  }
  console.log('═'.repeat(60) + '\n')
}

function printCompact(result: ComparisonResult): void {
  const s = result.summary
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`
  const t = result.totals

  let line = `[BASELINE] ${result.fixturesCompared} compared`
  line += ` | ${pct(s.baseline.pass_rate)} → ${pct(s.current.pass_rate)}`
  if (s.pass_rate_delta !== 0) {
    line += ` (${s.pass_rate_delta > 0 ? '+' : ''}${pct(s.pass_rate_delta)})`
  }
  line += ` | ▼${t.regression} ▲${t.improvement} ●${t.changed} =${t.unchanged}`
  if (t.skipped) line += ` | skipped ${t.skipped}`
  if (result.partialCurrent) line += ' | PARTIAL'
  console.log(line)

  const diffs = result.fixtures.filter(f => f.category !== 'unchanged' && f.category !== 'skipped')
  if (diffs.length) {
    const list = diffs.map(d => {
      const tag = { regression: '▼', improvement: '▲', changed: '●', missing_from_current: '✗', new_in_current: '+' }[d.category] ?? ' '
      return `${tag}${d.fixture_id}`
    })
    console.log(`[BASELINE] diffs: ${list.join(' ')}`)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const baselinePath = String(args['baseline'] ?? '')
  const currentPath = String(args['current'] ?? '')
  const compact = Boolean(args['compact'])
  const failOnRegression = Boolean(args['fail-on-regression'])

  if (!baselinePath || !currentPath) {
    console.error('--baseline e --current são obrigatórios. Use --help para ajuda.')
    process.exit(1)
  }

  const baseline = loadReport(baselinePath)
  const current = loadReport(currentPath)

  const result = compare(baseline, current)
  result.baselineFile = path.basename(baselinePath)
  result.currentFile = path.basename(currentPath)

  if (compact) {
    printCompact(result)
  } else {
    printFull(result)
  }

  if (failOnRegression && result.totals.regression > 0) {
    console.error(`  ⚠ fail-on-regression: ${result.totals.regression} regressões detectadas`)
    process.exit(1)
  }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1) })
