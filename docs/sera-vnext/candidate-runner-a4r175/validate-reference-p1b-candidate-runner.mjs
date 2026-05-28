import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = process.cwd()
const candidateDir = path.join(root, 'tests/sera/fixtures-candidates/reference-p1b')
const officialDir = path.join(root, 'tests/sera/fixtures')
const listPath = path.join(candidateDir, 'reference-p1b-fixtures.txt')

const fixtureSpecs = [
  {
    id: 'REF-P1B-EXECUFLIGHT-1526-FO-PF-001',
    file: 'REF-P1B-EXECUFLIGHT-1526-FO-PF-001.json',
    actorContributionId: 'EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF',
    actorRole: 'FO/PF',
    directActor: 'first_officer_pilot_flying',
    expected: {
      perception_code: 'P-D',
      objective_code: 'O-D',
      action_code: 'A-H',
    },
    requiredNodes: [
      'P_ROOT',
      'P_ASSESSMENT',
      'P_CAPABILITY',
      'P_TIME_PRESSURE',
      'O_ROOT',
      'O_RULES',
      'O_MANAGED_RISK',
      'A_ROOT',
      'A_IMPLEMENTED',
      'A_CORRECT',
      'A_CAPABILITY',
      'A_TIME_PRESSURE',
    ],
  },
  {
    id: 'REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001',
    file: 'REF-P1B-EXECUFLIGHT-1526-CAPTAIN-PM-001.json',
    actorContributionId: 'EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM',
    actorRole: 'Captain/PM',
    directActor: 'captain_pilot_monitoring',
    expected: {
      perception_code: 'P-A',
      objective_code: 'O-D',
      action_code: 'A-G',
    },
    requiredNodes: [
      'P_ROOT',
      'P_ASSESSMENT',
      'O_ROOT',
      'O_RULES',
      'O_MANAGED_RISK',
      'A_ROOT',
      'A_IMPLEMENTED',
      'A_CORRECT',
      'A_CAPABILITY',
      'A_TIME_PRESSURE',
      'A_FEEDBACK_OR_MONITORING',
    ],
  },
]

const requiredLocks = ['NO_BASELINE', 'NO_RELEASED_CODE', 'NO_DOWNSTREAM', 'NO_OFFICIAL_RUNNER']
const forbiddenKeys = [
  'selectedCode',
  'releasedCode',
  'downstream',
  'finalConclusion',
  'hfacs',
  'riskErc',
  'armsErc',
  'recommendations',
  'escapePointIds',
  'secondEscapePointId',
]

function fail(message) {
  throw new Error(message)
}

function ensure(pathToCheck, message) {
  if (!fs.existsSync(pathToCheck)) fail(message)
}

function readJson(fullPath) {
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

function walkJsonFiles(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walkJsonFiles(fullPath))
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.json')) out.push(fullPath)
  }
  return out
}

function ensureForbiddenKeysAbsent(obj, fixtureId) {
  const text = JSON.stringify(obj)
  for (const key of forbiddenKeys) {
    if (Object.prototype.hasOwnProperty.call(obj, key) || text.includes(`"${key}"`)) {
      fail(`${fixtureId}: forbidden key present: ${key}`)
    }
  }
}

function verifyNotInOfficialFixtures(fixtureId) {
  const files = walkJsonFiles(officialDir)
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    if (content.includes(`"id": "${fixtureId}"`)) {
      fail(`official fixtures already contain candidate id: ${fixtureId}`)
    }
  }
}

function ensureNoBaselineTouched() {
  const changedFiles = execSync('git diff --name-only', { cwd: root, encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean)
  const baselineTouched = changedFiles.some((file) => file.includes('baseline') || file.includes('reports/baseline'))
  if (baselineTouched) fail('baseline appears touched in current working tree diff')
}

function main() {
  ensure(candidateDir, 'candidate directory missing')
  ensure(officialDir, 'official fixtures directory missing')
  ensure(listPath, 'reference-p1b-fixtures.txt missing')

  const listedIds = fs
    .readFileSync(listPath, 'utf8')
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)

  if (listedIds.length !== 2) fail('reference-p1b-fixtures.txt must contain exactly 2 fixture ids')

  const fixtures = []

  for (const spec of fixtureSpecs) {
    const fullPath = path.join(candidateDir, spec.file)
    ensure(fullPath, `fixture missing: ${spec.file}`)
    const fixture = readJson(fullPath)
    fixtures.push(fixture)

    if (fixture.id !== spec.id) fail(`${spec.file}: id mismatch`)
    if (!listedIds.includes(spec.id)) fail(`reference-p1b-fixtures.txt missing ${spec.id}`)
    if (fixture.sourceCaseId !== 'EXECUFLIGHT-1526') fail(`${spec.id}: sourceCaseId mismatch`)
    if (fixture.fixtureStatus !== 'DRAFT_ONLY') fail(`${spec.id}: fixtureStatus must be DRAFT_ONLY`)
    if (fixture.referenceStatus !== 'READY_FOR_MULTI_ACTOR_CANDIDATE_DRAFT') {
      fail(`${spec.id}: referenceStatus mismatch`)
    }
    if (fixture.actorContributionId !== spec.actorContributionId) fail(`${spec.id}: actorContributionId mismatch`)
    if (fixture.actorRole !== spec.actorRole) fail(`${spec.id}: actorRole mismatch`)
    if (fixture.directActor !== spec.directActor) fail(`${spec.id}: directActor mismatch`)
    if (fixture.multiActor !== true) fail(`${spec.id}: multiActor must be true`)
    if (fixture.negativeControl !== false) fail(`${spec.id}: negativeControl must be false`)
    if (fixture.humanPoaApplicable !== true) fail(`${spec.id}: humanPoaApplicable must be true`)

    for (const [key, value] of Object.entries(spec.expected)) {
      if (fixture.expected?.[key] !== value) fail(`${spec.id}: expected.${key} mismatch`)
    }

    const nodeSet = new Set((fixture.expectedTrace ?? []).map((node) => node.node))
    for (const node of spec.requiredNodes) {
      if (!nodeSet.has(node)) fail(`${spec.id}: missing expectedTrace node ${node}`)
    }

    if (fixture.assertions?.singleEscapePoint !== true) fail(`${spec.id}: assertions.singleEscapePoint must be true`)
    if (fixture.assertions?.noSecondEscapePoint !== true) fail(`${spec.id}: assertions.noSecondEscapePoint must be true`)
    if (fixture.assertions?.actorContributionSeparated !== true) {
      fail(`${spec.id}: assertions.actorContributionSeparated must be true`)
    }

    for (const lock of requiredLocks) {
      if (!fixture.locks?.includes(lock)) fail(`${spec.id}: missing lock ${lock}`)
    }

    ensureForbiddenKeysAbsent(fixture, spec.id)
    verifyNotInOfficialFixtures(spec.id)
  }

  const sharedEscapePointIds = new Set(fixtures.map((fixture) => fixture.escapePointId))
  if (sharedEscapePointIds.size !== 1) fail('P1-B fixtures must share exactly one escapePointId')
  if ([...sharedEscapePointIds][0] !== 'EXECUFLIGHT-1526-ESCAPE-001') {
    fail('P1-B fixtures use unexpected escapePointId')
  }
  const contributionIds = new Set(fixtures.map((fixture) => fixture.actorContributionId))
  if (contributionIds.size !== 2) fail('P1-B fixtures must use two distinct actorContributionId values')

  ensureNoBaselineTouched()

  const summary = {
    status: 'PASS',
    fixtureCount: fixtures.length,
    sharedEscapePointId: 'EXECUFLIGHT-1526-ESCAPE-001',
    actorContributionIds: [...contributionIds].sort(),
    baselineTouched: false,
    officialFixturesTouched: false,
    apiCall: false,
    llmCall: false,
  }

  console.log('OK: reference P1-B candidate runner validation PASS')
  console.log(JSON.stringify(summary, null, 2))
}

main()
