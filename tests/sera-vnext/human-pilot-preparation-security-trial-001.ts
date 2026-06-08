import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const docDir = path.join(rootDir, 'docs', 'sera-vnext', 'human-pilot-preparation')
const seedScriptPath = path.join(rootDir, 'scripts', 'sera-vnext', 'seed-human-reviewer-pilot.ts')
const constantsPath = path.join(rootDir, 'frontend', 'src', 'lib', 'sera-vnext-product', 'constants.ts')
const exportPath = path.join(rootDir, 'frontend', 'src', 'lib', 'sera-vnext-product', 'persistence', 'export-analysis.ts')
const createPath = path.join(rootDir, 'frontend', 'src', 'lib', 'sera-vnext-product', 'persistence', 'create-analysis.ts')

const docs = fs.readdirSync(docDir).map((name) => path.join(docDir, name))
const forbiddenPatterns: Array<{ label: string; pattern: RegExp }> = [
  { label: 'service role', pattern: /SUPABASE_SERVICE_ROLE|service_role/i },
  { label: 'database url', pattern: /DATABASE_URL\s*=/i },
  { label: 'jwt', pattern: /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/ },
  { label: 'token assignment', pattern: /\b(token|apikey|api_key)\b\s*[:=]\s*['"][^'"]+/i },
  { label: 'email address', pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
]

for (const file of docs) {
  const content = fs.readFileSync(file, 'utf8')
  for (const rule of forbiddenPatterns) {
    assert.equal(rule.pattern.test(content), false, `${path.basename(file)} leaks ${rule.label}`)
  }
}

const caseBank = fs.readFileSync(path.join(docDir, 'SERA_VNEXT_HUMAN_PILOT_CASE_BANK.csv'), 'utf8')
for (const forbidden of ['selectedCode', 'releasedCode', 'finalConclusion', 'CLASSIFIED', 'READY', 'downstream true', 'HFACS', 'ARMS/ERC', 'Risk/ERC']) {
  assert.equal(caseBank.includes(forbidden), false, `case bank must not contain forbidden term ${forbidden}`)
}

const constants = fs.readFileSync(constantsPath, 'utf8')
assert.ok(constants.includes('SERA_VNEXT_PRODUCT_BETA_ENABLED'))
assert.ok(constants.includes("=== 'true'"))

const seed = fs.readFileSync(seedScriptPath, 'utf8')
assert.ok(seed.includes('dryRun: true'))
assert.ok(seed.includes('SERA_VNEXT_HUMAN_PILOT_SEED_REQUIRES_EXPLICIT_CONTROLLED_STAGING_CONFIRMATION'))
assert.ok(seed.includes('SERA_VNEXT_HUMAN_PILOT_SEED_WRITE_ADAPTER_NOT_CONFIGURED'))

const createSource = fs.readFileSync(createPath, 'utf8')
for (const lock of ['selectedCode', 'releasedCode', 'finalConclusion', 'classifiedOutput', 'readyPromotion', 'downstreamAllowed']) {
  assert.ok(createSource.includes(lock), `create-analysis must keep final-output lock ${lock}`)
}

const exportSource = fs.readFileSync(exportPath, 'utf8')
assert.ok(exportSource.includes('[REDACTED_IN_EXPORT_SUMMARY]'))
assert.ok(exportSource.includes('reviewerOutput'))

console.log('HUMAN_PILOT_PREPARATION_SECURITY_OK')

