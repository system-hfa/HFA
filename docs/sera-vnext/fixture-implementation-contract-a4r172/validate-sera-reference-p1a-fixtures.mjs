import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const fixtureDir = path.join(root, 'tests/sera/fixtures-candidates/reference-p1a')

const required = [
  {
    file: 'REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json',
    id: 'REF-P1A-DAUMAS-CASE-4-POSITIVE-001',
    sourceCaseId: 'DAUMAS-CASE-4',
    escapePointId: 'DAUMAS-CASE-4-ESCAPE-001',
    humanPoaApplicable: true,
    negativeControl: false,
    expected: {
      perception_code: 'P-G',
      objective_code: 'O-D',
      action_code: 'A-F',
    },
    nodes: [
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
    file: 'REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json',
    id: 'REF-P1A-US-AIRWAYS-1549-NEGATIVE-001',
    sourceCaseId: 'US-AIRWAYS-1549',
    escapePointId: 'US-AIRWAYS-1549-ESCAPE-001',
    humanPoaApplicable: false,
    negativeControl: true,
    unsafeConditionType: 'technical_environmental_onset',
    directHumanActorAtEscapePoint: 'none',
    expected: {
      perception_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      objective_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
      action_code: 'NOT_APPLICABLE_AT_ESCAPE_POINT',
    },
    nodes: [
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

function readJson(file) {
  const fullPath = path.join(fixtureDir, file)
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

function assertAbsentKeys(fixture, forbiddenKeys) {
  const text = JSON.stringify(fixture)
  for (const key of forbiddenKeys) {
    if (Object.prototype.hasOwnProperty.call(fixture, key) || text.includes(`"${key}"`)) {
      fail(`${fixture.id}: forbidden key present: ${key}`)
    }
  }
}

for (const spec of required) {
  const fixture = readJson(spec.file)
  if (fixture.id !== spec.id) fail(`${spec.file}: id mismatch`)
  if (fixture.sourceCaseId !== spec.sourceCaseId) fail(`${spec.id}: sourceCaseId mismatch`)
  if (fixture.fixtureStatus !== 'DRAFT_ONLY') fail(`${spec.id}: fixtureStatus must be DRAFT_ONLY`)
  if (fixture.escapePointId !== spec.escapePointId) fail(`${spec.id}: escapePointId mismatch`)
  if (fixture.humanPoaApplicable !== spec.humanPoaApplicable) fail(`${spec.id}: humanPoaApplicable mismatch`)
  if (fixture.negativeControl !== spec.negativeControl) fail(`${spec.id}: negativeControl mismatch`)

  for (const [key, value] of Object.entries(spec.expected)) {
    if (fixture.expected?.[key] !== value) fail(`${spec.id}: expected.${key} mismatch`)
  }

  if (spec.unsafeConditionType && fixture.unsafeConditionType !== spec.unsafeConditionType) {
    fail(`${spec.id}: unsafeConditionType mismatch`)
  }
  if (spec.directHumanActorAtEscapePoint && fixture.directHumanActorAtEscapePoint !== spec.directHumanActorAtEscapePoint) {
    fail(`${spec.id}: directHumanActorAtEscapePoint mismatch`)
  }

  const nodes = new Set((fixture.expectedTrace ?? []).map((entry) => entry.node))
  for (const node of spec.nodes) {
    if (!nodes.has(node)) fail(`${spec.id}: missing expectedTrace node ${node}`)
  }

  for (const lock of ['NO_BASELINE', 'NO_RELEASED_CODE', 'NO_DOWNSTREAM']) {
    if (!fixture.locks?.includes(lock)) fail(`${spec.id}: missing lock ${lock}`)
  }

  assertAbsentKeys(fixture, [
    'selectedCode',
    'releasedCode',
    'downstream',
    'finalConclusion',
    'hfacs',
    'riskErc',
    'armsErc',
    'recommendations',
  ])
}

const list = fs.readFileSync(path.join(fixtureDir, 'reference-p1a-fixtures.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

for (const spec of required) {
  if (!list.includes(spec.id)) fail(`reference-p1a-fixtures.txt missing ${spec.id}`)
}

console.log('OK: SERA reference P1-A draft fixtures are structurally valid')
