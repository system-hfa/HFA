import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const scriptPath = path.join(rootDir, 'scripts', 'sera-vnext', 'compute-human-pilot-metrics.ts')
const templatePath = path.join(
  rootDir,
  'docs',
  'sera-vnext',
  'human-pilot-preparation',
  'SERA_VNEXT_HUMAN_REVIEWER_RESULT_TEMPLATE.csv',
)
const outputPath = path.join(rootDir, 'tmp', 'sera-vnext-human-pilot-preparation', 'metrics-trial-output.md')

fs.mkdirSync(path.dirname(outputPath), { recursive: true })

const stdout = execFileSync('npx', ['tsx', scriptPath, '--input', templatePath, '--output', outputPath], {
  cwd: rootDir,
  encoding: 'utf8',
})

assert.equal(stdout.trim(), 'NO_REAL_HUMAN_RESULTS_YET')
assert.ok(fs.existsSync(outputPath), 'metrics output file must exist')

const content = fs.readFileSync(outputPath, 'utf8')
assert.ok(content.includes('NO_REAL_HUMAN_RESULTS_YET'))
assert.ok(content.includes('candidate_only_clear_rate'))
assert.ok(content.includes('does not infer, simulate, or declare pilot pass status'))

console.log('HUMAN_PILOT_METRICS_TRIAL_OK')

