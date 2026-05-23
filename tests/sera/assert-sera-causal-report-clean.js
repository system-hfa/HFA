#!/usr/bin/env node

const fs = require('fs')

function usage() {
  console.error('Usage: node tests/sera/assert-sera-causal-report-clean.js <report.json>')
}

function loadReport(reportPath) {
  return JSON.parse(fs.readFileSync(reportPath, 'utf8'))
}

function getCausalRunStatus(run) {
  if (run.error) return 'ERROR'
  const s = run.scores || {}
  if (s.causal_overall) return s.causal_overall

  const poaPass = s.perception === 'PASS' && s.objective === 'PASS' && s.action === 'PASS'
  if (poaPass && s.preconditions === 'PASS') return 'PASS'
  if (poaPass || s.perception === 'PASS' || s.objective === 'PASS' || s.action === 'PASS') return 'PARTIAL'
  return 'FAIL'
}

function computeCausalSummary(report) {
  const fixtures = Array.isArray(report.by_fixture) ? report.by_fixture : []
  let pass = 0
  let partial = 0
  let fail = 0
  let error = 0
  let deterministicFixtures = 0

  for (const fixture of fixtures) {
    const runs = Array.isArray(fixture.runs) ? fixture.runs : []
    const statuses = []
    for (const run of runs) {
      const status = getCausalRunStatus(run)
      statuses.push(status)
      if (status === 'PASS') pass += 1
      else if (status === 'PARTIAL') partial += 1
      else if (status === 'FAIL') fail += 1
      else error += 1
    }
    if (statuses.length > 0 && new Set(statuses).size === 1) deterministicFixtures += 1
  }

  const totalRuns = pass + partial + fail + error
  return {
    total_runs: totalRuns,
    pass,
    partial,
    fail,
    error,
    pass_rate: totalRuns > 0 ? pass / totalRuns : 0,
    determinism_rate: fixtures.length > 0 ? deterministicFixtures / fixtures.length : 0,
  }
}

function main() {
  if (process.argv.length < 3) {
    usage()
    process.exit(2)
  }

  const reportPath = process.argv[2]
  let report
  try {
    report = loadReport(reportPath)
  } catch (error) {
    console.error(`Failed to read report: ${reportPath}`)
    console.error(error.message)
    process.exit(2)
  }

  const summary = report.causal_summary || computeCausalSummary(report)

  console.log(`Report: ${reportPath}`)
  console.log(`Causal summary: pass=${summary.pass} partial=${summary.partial} fail=${summary.fail} error=${summary.error} determinism_rate=${summary.determinism_rate}`)

  if (summary.fail > 0) {
    console.error('Causal guardrail violation: causal_fail > 0')
    process.exit(1)
  }
  if (summary.error > 0) {
    console.error('Causal guardrail violation: causal_error > 0')
    process.exit(1)
  }
  if (summary.partial > 0) {
    console.error('Causal guardrail violation: causal_partial > 0')
    process.exit(1)
  }
  if (summary.determinism_rate !== 1) {
    console.error('Causal guardrail violation: causal_determinism_rate != 1')
    process.exit(1)
  }

  console.log('Causal guardrail OK: freeze conditions satisfied (risk layer not required)')
}

main()
