#!/usr/bin/env node

const fs = require('fs')

function usage() {
  console.error('Usage: node scripts/assert-sera-report-clean.js <report.json> [--require-anchor FIXTURE=POA]...')
}

function toNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function loadReport(path) {
  const text = fs.readFileSync(path, 'utf8')
  return JSON.parse(text)
}

function buildFixtureMap(report) {
  const fixtures = Array.isArray(report.by_fixture) ? report.by_fixture : []
  const map = new Map()
  for (const fixture of fixtures) {
    if (fixture && typeof fixture.fixture_id === 'string') {
      map.set(fixture.fixture_id, fixture)
    }
  }
  return map
}

function getRunPoa(run) {
  const actual = (run && run.actual) || {}
  return `${actual.perception_code ?? 'null'}/${actual.objective_code ?? 'null'}/${actual.action_code ?? 'null'}`
}

function parseArgs(argv) {
  if (argv.length < 3) {
    usage()
    process.exit(2)
  }

  const reportPath = argv[2]
  const anchorRules = []

  for (let i = 3; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg !== '--require-anchor') {
      console.error(`Unknown argument: ${arg}`)
      usage()
      process.exit(2)
    }

    const value = argv[i + 1]
    if (!value || value.startsWith('--')) {
      console.error('--require-anchor requires a value in the format FIXTURE=POA')
      process.exit(2)
    }

    const splitIndex = value.indexOf('=')
    if (splitIndex <= 0 || splitIndex === value.length - 1) {
      console.error(`Invalid anchor rule: ${value}`)
      process.exit(2)
    }

    anchorRules.push({
      fixtureId: value.slice(0, splitIndex),
      expectedPoa: value.slice(splitIndex + 1),
    })

    i += 1
  }

  return { reportPath, anchorRules }
}

function main() {
  const { reportPath, anchorRules } = parseArgs(process.argv)

  let report
  try {
    report = loadReport(reportPath)
  } catch (error) {
    console.error(`Failed to read report: ${reportPath}`)
    console.error(error.message)
    process.exit(2)
  }

  const summary = report && report.summary ? report.summary : {}
  const fail = toNumber(summary.fail)
  const error = toNumber(summary.error)
  const pass = toNumber(summary.pass)
  const partial = toNumber(summary.partial)
  const determinismRate = summary.determinism_rate

  if (fail === null || error === null) {
    console.error('Invalid report: summary.fail or summary.error is missing/not numeric')
    process.exit(2)
  }

  console.log(`Report: ${reportPath}`)
  console.log(`Summary: pass=${pass ?? 'n/a'} partial=${partial ?? 'n/a'} fail=${fail} error=${error} determinism_rate=${determinismRate ?? 'n/a'}`)

  if (fail > 0 || error > 0) {
    console.error('Guardrail violation: fail > 0 or error > 0')
    process.exit(1)
  }

  const fixtureMap = buildFixtureMap(report)

  for (const rule of anchorRules) {
    const fixture = fixtureMap.get(rule.fixtureId)
    if (!fixture) {
      console.error(`Anchor rule failed: fixture not found: ${rule.fixtureId}`)
      process.exit(1)
    }

    const runs = Array.isArray(fixture.runs) ? fixture.runs : []
    if (runs.length === 0) {
      console.error(`Anchor rule failed: fixture has no runs: ${rule.fixtureId}`)
      process.exit(1)
    }

    for (const run of runs) {
      const poa = getRunPoa(run)
      if (poa !== rule.expectedPoa) {
        console.error(
          `Anchor rule failed: ${rule.fixtureId} run=${run.run_index ?? '?'} expected=${rule.expectedPoa} actual=${poa}`,
        )
        process.exit(1)
      }
    }

    console.log(`Anchor OK: ${rule.fixtureId} = ${rule.expectedPoa}`)
  }

  console.log('Guardrail OK: report is clean')
}

main()
