import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const candidateDir = path.join(root, 'tests/sera/fixtures-candidates/reference-p1a')
const officialDir = path.join(root, 'tests/sera/fixtures')
const runnerPath = path.join(root, 'tests/sera/runner.ts')
const listPath = path.join(candidateDir, 'reference-p1a-fixtures.txt')

const fixtureSpecs = [
  {
    id: 'REF-P1A-DAUMAS-CASE-4-POSITIVE-001',
    file: 'REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json',
    sourceCaseId: 'DAUMAS-CASE-4',
    referenceStatus: 'READY_FOR_FIXTURE_DRAFT',
    expected: {
      perception_code: 'P-G',
      objective_code: 'O-D',
      action_code: 'A-F',
    },
    humanPoaApplicable: true,
    negativeControl: false,
    requiredNodes: [
      'P_ROOT',
      'P_ASSESSMENT',
      'P_CAPABILITY',
      'P_TIME_PRESSURE',
      'P_INFORMATION_AMBIGUOUS',
      'P_INFORMATION_AVAILABLE',
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
    id: 'REF-P1A-US-AIRWAYS-1549-NEGATIVE-001',
    file: 'REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json',
    sourceCaseId: 'US-AIRWAYS-1549',
    referenceStatus: 'READY_FOR_NEGATIVE_CONTROL_FIXTURE_DRAFT',
    expected: {
      perception_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      objective_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      action_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
    },
    unsafeConditionType: 'technical_environmental_onset',
    directHumanActorAtEscapePoint: 'none',
    humanPoaApplicable: false,
    negativeControl: true,
    requiredNodes: [
      'ESCAPE_POINT_IDENTIFIED',
      'UNSAFE_CONDITION_IDENTIFIED',
      'HUMAN_UNSAFE_ACT_AT_ESCAPE_POINT',
      'P_ROOT',
      'O_ROOT',
      'A_ROOT',
    ],
  },
]

function fail(message) {
  throw new Error(message)
}

function readJson(fullPath) {
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

function ensure(pathToCheck, message) {
  if (!fs.existsSync(pathToCheck)) {
    fail(message)
  }
}

function ensureForbiddenKeysAbsent(obj, forbidden, fixtureId) {
  const text = JSON.stringify(obj)
  for (const key of forbidden) {
    if (Object.prototype.hasOwnProperty.call(obj, key) || text.includes(`"${key}"`)) {
      fail(`${fixtureId}: forbidden key present: ${key}`)
    }
  }
}

function verifyRunnerScope() {
  const runnerText = fs.readFileSync(runnerPath, 'utf8')
  if (!runnerText.includes("const FIXTURES_DIR = path.join(__dirname, 'fixtures')")) {
    fail('runner.ts fixture scope changed: expected official fixtures directory declaration not found')
  }
  if (runnerText.includes('fixtures-candidates')) {
    fail('runner.ts appears to include fixtures-candidates, expected official-only scope')
  }
}

function verifyNotInOfficialFixtures(fixtureId) {
  const files = fs.readdirSync(officialDir).filter((f) => f.endsWith('.json'))
  for (const file of files) {
    const content = fs.readFileSync(path.join(officialDir, file), 'utf8')
    if (content.includes(`"id": "${fixtureId}"`)) {
      fail(`official fixtures already contain candidate id: ${fixtureId}`)
    }
  }
}

function main() {
  ensure(candidateDir, 'candidate directory missing')
  ensure(officialDir, 'official fixtures directory missing')
  ensure(runnerPath, 'runner.ts missing')
  ensure(listPath, 'reference fixture list missing')

  verifyRunnerScope()

  const listedIds = fs
    .readFileSync(listPath, 'utf8')
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)

  for (const spec of fixtureSpecs) {
    const fullPath = path.join(candidateDir, spec.file)
    ensure(fullPath, `fixture file missing: ${spec.file}`)
    const fixture = readJson(fullPath)

    if (fixture.id !== spec.id) fail(`${spec.file}: id mismatch`)
    if (!listedIds.includes(spec.id)) fail(`reference-p1a-fixtures.txt missing ${spec.id}`)
    if (fixture.sourceCaseId !== spec.sourceCaseId) fail(`${spec.id}: sourceCaseId mismatch`)
    if (fixture.fixtureStatus !== 'DRAFT_ONLY') fail(`${spec.id}: fixtureStatus must be DRAFT_ONLY`)
    if (fixture.referenceStatus !== spec.referenceStatus) fail(`${spec.id}: referenceStatus mismatch`)
    if (fixture.humanPoaApplicable !== spec.humanPoaApplicable) fail(`${spec.id}: humanPoaApplicable mismatch`)
    if (fixture.negativeControl !== spec.negativeControl) fail(`${spec.id}: negativeControl mismatch`)

    for (const [k, v] of Object.entries(spec.expected)) {
      if (fixture.expected?.[k] !== v) fail(`${spec.id}: expected.${k} mismatch`)
    }

    if (spec.unsafeConditionType && fixture.unsafeConditionType !== spec.unsafeConditionType) {
      fail(`${spec.id}: unsafeConditionType mismatch`)
    }
    if (
      spec.directHumanActorAtEscapePoint &&
      fixture.directHumanActorAtEscapePoint !== spec.directHumanActorAtEscapePoint
    ) {
      fail(`${spec.id}: directHumanActorAtEscapePoint mismatch`)
    }

    const nodeSet = new Set((fixture.expectedTrace ?? []).map((n) => n.node))
    for (const node of spec.requiredNodes) {
      if (!nodeSet.has(node)) fail(`${spec.id}: missing expectedTrace node ${node}`)
    }

    for (const lock of ['NO_BASELINE', 'NO_RELEASED_CODE', 'NO_DOWNSTREAM']) {
      if (!fixture.locks?.includes(lock)) fail(`${spec.id}: missing lock ${lock}`)
    }

    ensureForbiddenKeysAbsent(
      fixture,
      [
        'selectedCode',
        'releasedCode',
        'downstream',
        'finalConclusion',
        'hfacs',
        'riskErc',
        'armsErc',
        'recommendations',
      ],
      spec.id,
    )

    verifyNotInOfficialFixtures(spec.id)
  }

  const summary = {
    status: 'PASS',
    checkedRunnerScope: 'official fixtures only',
    candidateFixturesValidated: fixtureSpecs.map((s) => s.id),
    baselineTouched: false,
    officialFixturesTouched: false,
    apiCall: false,
    llmCall: false,
  }

  console.log('OK: candidate runner validation PASS')
  console.log(JSON.stringify(summary, null, 2))
}

main()
