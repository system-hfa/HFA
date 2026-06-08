import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const scriptPath = path.join(rootDir, 'scripts', 'sera-vnext', 'seed-human-reviewer-pilot.ts')
const caseBankPath = path.join(
  rootDir,
  'docs',
  'sera-vnext',
  'human-pilot-preparation',
  'SERA_VNEXT_HUMAN_PILOT_CASE_BANK.csv',
)

assert.ok(fs.existsSync(scriptPath), 'seed script must exist')
assert.ok(fs.existsSync(caseBankPath), 'case bank must exist')

const output = execFileSync('npx', ['tsx', scriptPath, '--dry-run', '--limit', '2', '--shared-only'], {
  cwd: rootDir,
  encoding: 'utf8',
})
const parsed = JSON.parse(output)

assert.equal(parsed.status, 'HUMAN_PILOT_SEED_DRY_RUN_OK')
assert.equal(parsed.dryRun, true)
assert.equal(parsed.writeMode, false)
assert.equal(parsed.selectedCases, 2)
assert.equal(parsed.filters.sharedOnly, true)
assert.ok(Array.isArray(parsed.payloads) && parsed.payloads.length === 2, 'must emit two payloads')
for (const payload of parsed.payloads) {
  assert.equal(payload.request.sourceType, 'INTERNAL_PILOT')
  assert.equal(payload.request.metadata.internalUseConfirmed, true)
  assert.equal(String(payload.request.title).startsWith('[SERA_VNEXT_HUMAN_PILOT]'), true)
}

const source = fs.readFileSync(scriptPath, 'utf8')
assert.ok(source.includes('SERA_VNEXT_HUMAN_PILOT_SEED_REQUIRES_EXPLICIT_CONTROLLED_STAGING_CONFIRMATION'))
assert.ok(source.includes('SERA_VNEXT_HUMAN_PILOT_SEED_WRITE_ADAPTER_NOT_CONFIGURED'))
assert.equal(source.includes('SUPABASE_SERVICE_ROLE'), false)
assert.equal(source.includes('service_role'), false)

console.log('HUMAN_PILOT_SEED_TRIAL_OK')

