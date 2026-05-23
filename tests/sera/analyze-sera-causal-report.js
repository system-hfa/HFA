#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function usage() {
  console.error('Usage: node tests/sera/analyze-sera-causal-report.js <report.json>')
}

function loadReport(reportPath) {
  const absPath = path.resolve(reportPath)
  const raw = fs.readFileSync(absPath, 'utf8')
  return JSON.parse(raw)
}

function getCausalStatus(run) {
  if (run.error) return 'ERROR'

  const s = run.scores || {}
  const poaPass = s.perception === 'PASS' && s.objective === 'PASS' && s.action === 'PASS'

  if (poaPass && s.preconditions === 'PASS') return 'PASS'
  if (poaPass || s.perception === 'PASS' || s.objective === 'PASS' || s.action === 'PASS') return 'PARTIAL'
  return 'FAIL'
}

function analyze(report) {
  const fixtures = Array.isArray(report.by_fixture) ? report.by_fixture : []

  let causalPass = 0
  let causalPartial = 0
  let causalFail = 0
  let causalError = 0
  let deterministicFixtures = 0
  const perFixture = []
  const riskLayerDiff = []

  for (const fixture of fixtures) {
    const runs = Array.isArray(fixture.runs) ? fixture.runs : []
    const runStatuses = []
    const ercMismatches = []
    let poaPassRuns = 0
    let preconditionsPassRuns = 0

    for (const run of runs) {
      const s = run.scores || {}
      const poaPass = s.perception === 'PASS' && s.objective === 'PASS' && s.action === 'PASS'
      if (poaPass) poaPassRuns += 1
      if (s.preconditions === 'PASS') preconditionsPassRuns += 1

      const status = getCausalStatus(run)
      runStatuses.push(status)
      if (status === 'PASS') causalPass += 1
      else if (status === 'PARTIAL') causalPartial += 1
      else if (status === 'FAIL') causalFail += 1
      else causalError += 1

      if (s.erc_level === 'FAIL') {
        ercMismatches.push({
          run_index: run.run_index,
          expected_erc_level: run.expected?.erc_level ?? null,
          actual_erc_level: run.actual?.erc_level ?? null,
          overall: s.overall ?? null,
        })
      }
    }

    if (new Set(runStatuses).size === 1) deterministicFixtures += 1
    if (ercMismatches.length > 0) {
      riskLayerDiff.push({
        fixture_id: fixture.fixture_id,
        erc_mismatch_runs: ercMismatches.length,
        runs: ercMismatches,
      })
    }

    perFixture.push({
      fixture_id: fixture.fixture_id,
      total_runs: runs.length,
      poa_pass_runs: poaPassRuns,
      preconditions_pass_runs: preconditionsPassRuns,
      causal_status: poaPassRuns === runs.length && preconditionsPassRuns === runs.length ? 'CAUSAL_PASS' : 'CAUSAL_HOLD',
      risk_layer_status: ercMismatches.length > 0 ? 'RISK_HOLD' : 'RISK_PASS',
    })
  }

  const causalTotalRuns = causalPass + causalPartial + causalFail + causalError
  return {
    report_path: null,
    report_run_id: report.run_id ?? null,
    fixtures_tested: fixtures.length,
    n_runs_per_fixture: report.n_runs_per_fixture ?? null,
    causal_total_runs: causalTotalRuns,
    causal_pass: causalPass,
    causal_partial: causalPartial,
    causal_fail: causalFail,
    causal_error: causalError,
    causal_pass_rate: causalTotalRuns > 0 ? causalPass / causalTotalRuns : 0,
    causal_determinism_rate: fixtures.length > 0 ? deterministicFixtures / fixtures.length : 0,
    per_fixture: perFixture,
    risk_layer_diff: {
      erc_mismatch_fixture_count: riskLayerDiff.length,
      erc_mismatch_run_count: riskLayerDiff.reduce((acc, item) => acc + item.erc_mismatch_runs, 0),
      fixtures: riskLayerDiff,
    },
  }
}

function main() {
  if (process.argv.length < 3) {
    usage()
    process.exit(2)
  }

  const inputPath = process.argv[2]
  let report
  try {
    report = loadReport(inputPath)
  } catch (error) {
    console.error(`Failed to read report: ${inputPath}`)
    console.error(error.message)
    process.exit(2)
  }

  const out = analyze(report)
  out.report_path = path.resolve(inputPath)
  process.stdout.write(`${JSON.stringify(out, null, 2)}\n`)
}

main()
