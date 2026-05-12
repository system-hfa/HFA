// tests/sera/compare.ts
import fs from 'fs'
import path from 'path'
import type { SeraFixture, TestResult, FixtureReport } from './fixtures/schema'

export function scoreResult(
  fixture: SeraFixture,
  actual: TestResult['actual'],
  runIndex: number,
  durationMs: number
): TestResult {
  const perceptionPass = actual.perception_code === fixture.expected.perception_code
  const objectivePass  = actual.objective_code  === fixture.expected.objective_code
  const actionPass     = actual.action_code     === fixture.expected.action_code
  const ercPass        = actual.erc_level       === fixture.expected.erc_level

  let preconditionScore: 'PASS' | 'PARTIAL' | 'FAIL' = 'PASS'
  if (fixture.expected.top_preconditions?.length) {
    const expected = fixture.expected.top_preconditions
    const found = expected.filter(p => actual.preconditions.includes(p))
    const recall = found.length / expected.length
    preconditionScore = recall === 1 ? 'PASS' : recall >= 0.5 ? 'PARTIAL' : 'FAIL'
  }

  const criticalPass = perceptionPass && objectivePass && actionPass
  const overall: 'PASS' | 'PARTIAL' | 'FAIL' =
    criticalPass && ercPass ? 'PASS' :
    criticalPass ? 'PARTIAL' :
    (perceptionPass || objectivePass || actionPass) ? 'PARTIAL' : 'FAIL'

  return {
    fixture_id: fixture.id,
    title: fixture.title,
    run_index: runIndex,
    timestamp: new Date().toISOString(),
    actual,
    expected: fixture.expected,
    scores: {
      perception: perceptionPass ? 'PASS' : 'FAIL',
      objective:  objectivePass  ? 'PASS' : 'FAIL',
      action:     actionPass     ? 'PASS' : 'FAIL',
      erc_level:  ercPass        ? 'PASS' : 'FAIL',
      preconditions: preconditionScore,
      overall,
    },
    duration_ms: durationMs,
  }
}

export function buildFixtureReport(fixture: SeraFixture, results: TestResult[]): FixtureReport {
  const uniq = (arr: string[]) => [...new Set(arr)]
  return {
    fixture_id: fixture.id,
    title: fixture.title,
    expected_codes: `${fixture.expected.perception_code} / ${fixture.expected.objective_code} / ${fixture.expected.action_code}`,
    runs: results,
    consistency: {
      perception_consistent: uniq(results.map(r => r.actual.perception_code)).length === 1,
      objective_consistent:  uniq(results.map(r => r.actual.objective_code)).length === 1,
      action_consistent:     uniq(results.map(r => r.actual.action_code)).length === 1,
      erc_consistent:        uniq(results.map(r => String(r.actual.erc_level))).length === 1,
      fully_deterministic:   ['perception_code','objective_code','action_code'].every(
        k => uniq(results.map(r => (r.actual as any)[k])).length === 1
      ),
    },
    accuracy: {
      perception_accuracy: results.filter(r => r.scores.perception === 'PASS').length / results.length,
      objective_accuracy:  results.filter(r => r.scores.objective  === 'PASS').length / results.length,
      action_accuracy:     results.filter(r => r.scores.action     === 'PASS').length / results.length,
      erc_accuracy:        results.filter(r => r.scores.erc_level  === 'PASS').length / results.length,
      precondition_recall: results.filter(r => r.scores.preconditions !== 'FAIL').length / results.length,
      overall_accuracy:    results.filter(r => r.scores.overall === 'PASS').length / results.length,
    },
  }
}
