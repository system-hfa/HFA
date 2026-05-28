import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = process.cwd()
const p1aDir = path.join(root, 'tests/sera/fixtures-candidates/reference-p1a')
const p1bDir = path.join(root, 'tests/sera/fixtures-candidates/reference-p1b')
const officialDir = path.join(root, 'tests/sera/fixtures')

const p1aExpected = {
  'REF-P1A-DAUMAS-CASE-4-POSITIVE-001': {
    expected: { perception_code: 'P-G', objective_code: 'O-D', action_code: 'A-F' },
    negativeControl: false,
    humanPoaApplicable: true,
  },
  'REF-P1A-US-AIRWAYS-1549-NEGATIVE-001': {
    expected: {
      perception_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      objective_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      action_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
    },
    negativeControl: true,
    humanPoaApplicable: false,
  },
}

const p1bExpected = {
  'REF-P1B-EXECUFLIGHT-1526-FO-PF-001': {
    expected: { perception_code: 'P-D', objective_code: 'O-D', action_code: 'A-H' },
    actorContributionId: 'EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF',
  },
  'REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001': {
    expected: { perception_code: 'P-A', objective_code: 'O-D', action_code: 'A-G' },
    actorContributionId: 'EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM',
  },
}

function fail(message) {
  throw new Error(message)
}

function ensure(pathToCheck, message) {
  if (!fs.existsSync(pathToCheck)) fail(message)
}

function readJson(fullPath) {
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

function readFixtureList(dir, listFileName) {
  const fullPath = path.join(dir, listFileName)
  ensure(fullPath, `${listFileName} missing`)
  return fs
    .readFileSync(fullPath, 'utf8')
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
}

function checkOfficialFixturesDoNotContain(ids) {
  const files = fs.readdirSync(officialDir).filter((entry) => entry.endsWith('.json'))
  for (const file of files) {
    const content = fs.readFileSync(path.join(officialDir, file), 'utf8')
    for (const id of ids) {
      if (content.includes(`"id": "${id}"`)) fail(`official fixtures contain candidate fixture id: ${id}`)
    }
  }
}

function ensureProtectedAreasUntouched() {
  const changedFiles = execSync('git diff --name-only', { cwd: root, encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean)

  const touchedOfficialRunner = changedFiles.some((file) =>
    ['tests/sera/runner.ts', 'tests/sera/run.ts', 'tests/sera/report.ts'].includes(file),
  )
  const touchedOfficialFixtures = changedFiles.some((file) => file.startsWith('tests/sera/fixtures/'))
  const touchedBaseline = changedFiles.some((file) => file.includes('baseline') || file.includes('reports/baseline'))
  const touchedTypeScript = changedFiles.some((file) => file.endsWith('.ts'))

  if (touchedOfficialRunner) fail('official runner files appear touched')
  if (touchedOfficialFixtures) fail('official fixtures appear touched')
  if (touchedBaseline) fail('baseline appears touched')
  if (touchedTypeScript) fail('.ts files appear touched in this phase')
}

function main() {
  ensure(p1aDir, 'P1-A candidate fixture directory missing')
  ensure(p1bDir, 'P1-B candidate fixture directory missing')
  ensure(officialDir, 'official fixture directory missing')

  const p1aIds = readFixtureList(p1aDir, 'reference-p1a-fixtures.txt')
  const p1bIds = readFixtureList(p1bDir, 'reference-p1b-fixtures.txt')

  if (p1aIds.length !== 2) fail('P1-A fixture list must contain exactly 2 ids')
  if (p1bIds.length !== 2) fail('P1-B fixture list must contain exactly 2 ids')

  const allIds = [...p1aIds, ...p1bIds]
  const allUniqueIds = new Set(allIds)
  if (allUniqueIds.size !== 4) fail('P1 candidate suite must contain exactly 4 unique fixture ids')

  for (const id of p1aIds) {
    const file = path.join(p1aDir, `${id}.json`)
    ensure(file, `P1-A fixture missing: ${id}.json`)
    const fixture = readJson(file)
    const spec = p1aExpected[id]
    if (!spec) fail(`unexpected P1-A fixture id in list: ${id}`)

    if (fixture.id !== id) fail(`${id}: fixture id mismatch`)
    if (fixture.fixtureStatus !== 'DRAFT_ONLY') fail(`${id}: fixtureStatus must be DRAFT_ONLY`)
    if (fixture.negativeControl !== spec.negativeControl) fail(`${id}: negativeControl mismatch`)
    if (fixture.humanPoaApplicable !== spec.humanPoaApplicable) fail(`${id}: humanPoaApplicable mismatch`)

    for (const [key, value] of Object.entries(spec.expected)) {
      if (fixture.expected?.[key] !== value) fail(`${id}: expected.${key} mismatch`)
    }
  }

  const p1bFixtures = []
  for (const id of p1bIds) {
    const file = path.join(p1bDir, `${id}.json`)
    ensure(file, `P1-B fixture missing: ${id}.json`)
    const fixture = readJson(file)
    const spec = p1bExpected[id]
    if (!spec) fail(`unexpected P1-B fixture id in list: ${id}`)
    p1bFixtures.push(fixture)

    if (fixture.id !== id) fail(`${id}: fixture id mismatch`)
    if (fixture.fixtureStatus !== 'DRAFT_ONLY') fail(`${id}: fixtureStatus must be DRAFT_ONLY`)
    if (fixture.multiActor !== true) fail(`${id}: multiActor must be true`)
    if (fixture.negativeControl !== false) fail(`${id}: negativeControl must be false`)
    if (fixture.humanPoaApplicable !== true) fail(`${id}: humanPoaApplicable must be true`)
    if (fixture.actorContributionId !== spec.actorContributionId) fail(`${id}: actorContributionId mismatch`)

    for (const [key, value] of Object.entries(spec.expected)) {
      if (fixture.expected?.[key] !== value) fail(`${id}: expected.${key} mismatch`)
    }
  }

  const escapePointIds = new Set(p1bFixtures.map((fixture) => fixture.escapePointId))
  if (escapePointIds.size !== 1) fail('P1-B fixtures must share one escapePointId')
  if ([...escapePointIds][0] !== 'EXECUFLIGHT-1526-ESCAPE-001') fail('unexpected P1-B escapePointId')

  const contributionIds = new Set(p1bFixtures.map((fixture) => fixture.actorContributionId))
  if (contributionIds.size !== 2) fail('P1-B fixtures must use two distinct actorContributionId values')

  ensureProtectedAreasUntouched()
  checkOfficialFixturesDoNotContain(allIds)

  const summary = {
    status: 'PASS',
    suite: 'P1-A + P1-B candidate fixtures',
    totalFixtures: 4,
    p1aFixtures: p1aIds,
    p1bFixtures: p1bIds,
    p1aNegativeControlPreserved: true,
    p1bSingleEscapePoint: true,
    p1bSharedEscapePointId: 'EXECUFLIGHT-1526-ESCAPE-001',
    p1bDistinctActorContributionIds: [...contributionIds].sort(),
    officialRunnerTouched: false,
    officialFixturesTouched: false,
    baselineTouched: false,
    apiCall: false,
    llmCall: false,
  }

  console.log('OK: reference P1 candidate suite validation PASS')
  console.log(JSON.stringify(summary, null, 2))
}

main()
