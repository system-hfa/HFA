// tests/sera/runner.ts
// ATENÇÃO: adapte o import do pipeline ao caminho real no seu projeto
import fs from 'fs'
import path from 'path'
import type { SeraFixture, TestResult, RunReport } from './fixtures/schema'
import { scoreResult, buildFixtureReport } from './compare'
import { runSeraPipeline } from './pipeline_adapter'

const FIXTURES_DIR = path.join(__dirname, 'fixtures')

export interface RunOptions {
  failFast?: boolean
  onFixtureStart?: (id: string) => void
  onRunResult?: (result: TestResult) => void
}

export async function loadFixtures(): Promise<SeraFixture[]> {
  return fs.readdirSync(FIXTURES_DIR)
    .filter(f => f.endsWith('.json') && !f.includes('schema') && !f.includes('index'))
    .map(f => JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, f), 'utf-8')))
}

export async function runSingleFixture(fixture: SeraFixture, runIndex: number): Promise<TestResult> {
  const start = Date.now()
  try {
    const result = await runSeraPipeline({ rawText: fixture.description })
    return scoreResult(fixture, {
      perception_code: result.perception_code ?? '',
      objective_code:  result.objective_code  ?? '',
      action_code:     result.action_code     ?? '',
      erc_level:       result.erc_level       ?? 0,
      preconditions:   result.preconditions?.map((p: any) => p.code ?? p) ?? [],
    }, runIndex, Date.now() - start)
  } catch (err: any) {
    return {
      fixture_id: fixture.id, title: fixture.title, run_index: runIndex,
      timestamp: new Date().toISOString(),
      actual: { perception_code: '', objective_code: '', action_code: '', erc_level: 0, preconditions: [] },
      expected: fixture.expected,
      scores: { perception:'FAIL', objective:'FAIL', action:'FAIL', erc_level:'FAIL', preconditions:'FAIL', overall:'FAIL' },
      duration_ms: Date.now() - start,
      error: err.message,
    }
  }
}

export async function runAllFixtures(
  fixtures: SeraFixture[],
  nRuns = 3,
  options?: RunOptions
): Promise<RunReport> {
  const runId = `run-${Date.now()}`
  const failFast = options?.failFast ?? false
  console.log(`
[SERA] ${fixtures.length} fixtures × ${nRuns} runs = ${fixtures.length * nRuns} chamadas
`)
  const byFixture = []
  const matrix: Record<string, Record<string, number>> = {}
  let aborted = false

  for (const fixture of fixtures) {
    if (aborted) break
    console.log(`  → ${fixture.id}`)
    options?.onFixtureStart?.(fixture.id)
    const results: TestResult[] = []
    for (let i = 0; i < nRuns; i++) {
      process.stdout.write(`     run ${i+1}/${nRuns}... `)
      const r = await runSingleFixture(fixture, i)
      results.push(r)
      options?.onRunResult?.(r)
      console.log(r.scores.overall + (r.error ? ` ⚠ ${r.error}` : ''))
      const exp = fixture.expected.perception_code
      const act = r.actual.perception_code
      if (!matrix[exp]) matrix[exp] = {}
      matrix[exp][act] = (matrix[exp][act] ?? 0) + 1
    }
    byFixture.push(buildFixtureReport(fixture, results))

    if (failFast) {
      const lastResult = results[results.length - 1]
      if (lastResult.scores.overall === 'FAIL' || lastResult.error) {
        aborted = true
        console.log(`\n  ⚠ fail-fast: interrompido em ${fixture.id}`)
        break
      }
    }

    if (!aborted) {
      await new Promise(r => setTimeout(r, 500))
    }
  }

  const all = byFixture.flatMap(f => f.runs)
  const pass    = all.filter(r => r.scores.overall === 'PASS').length
  const partial = all.filter(r => r.scores.overall === 'PARTIAL').length
  const fail    = all.filter(r => r.scores.overall === 'FAIL').length
  const errors  = all.filter(r => r.error).length
  const detCount = byFixture.filter(f => f.consistency.fully_deterministic).length

  return {
    run_id: runId,
    timestamp: new Date().toISOString(),
    n_runs_per_fixture: nRuns,
    fixtures_tested: fixtures.length,
    aborted: aborted || undefined,
    summary: { total_runs: all.length, pass, partial, fail, error: errors,
      pass_rate: all.length > 0 ? pass / all.length : 0,
      determinism_rate: byFixture.length > 0 ? detCount / byFixture.length : 0 },
    by_fixture: byFixture,
    confusion_matrix: matrix,
    weakest_fixtures: [...byFixture]
      .sort((a,b) => a.accuracy.overall_accuracy - b.accuracy.overall_accuracy)
      .slice(0,5).map(f => f.fixture_id),
  }
}
