import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const scriptPath = path.join(rootDir, 'scripts', 'sera-vnext', 'compute-human-pilot-shared-case-agreement.ts')
const templatePath = path.join(
  rootDir,
  'docs',
  'sera-vnext',
  'human-pilot-preparation',
  'SERA_VNEXT_HUMAN_REVIEWER_RESULT_TEMPLATE.csv',
)
const sharedPlanPath = path.join(
  rootDir,
  'docs',
  'sera-vnext',
  'human-pilot-preparation',
  'SERA_VNEXT_HUMAN_PILOT_SHARED_CASES_PLAN.csv',
)
const outputPath = path.join(rootDir, 'tmp', 'sera-vnext-human-pilot-preparation', 'shared-agreement-trial-output.md')

fs.mkdirSync(path.dirname(outputPath), { recursive: true })

const stdout = execFileSync(
  'npx',
  ['tsx', scriptPath, '--input', templatePath, '--shared-plan', sharedPlanPath, '--output', outputPath],
  { cwd: rootDir, encoding: 'utf8' },
)

assert.equal(stdout.trim(), 'NO_REAL_SHARED_CASE_RESULTS_YET')
assert.ok(fs.existsSync(outputPath), 'shared agreement output file must exist')

const content = fs.readFileSync(outputPath, 'utf8')
assert.ok(content.includes('NO_REAL_SHARED_CASE_RESULTS_YET'))
assert.ok(content.includes('No kappa or agreement claim is calculated'))

console.log('HUMAN_PILOT_SHARED_AGREEMENT_TRIAL_OK')

