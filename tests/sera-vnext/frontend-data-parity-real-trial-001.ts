import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const statsRoute = readFileSync(path.join(rootDir, 'frontend', 'src', 'app', 'api', 'admin', 'stats', 'route.ts'), 'utf8')
const eventsRoute = readFileSync(path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', 'route.ts'), 'utf8')
const riskProfileServer = readFileSync(path.join(rootDir, 'frontend', 'src', 'lib', 'risk-profile', 'server.ts'), 'utf8')

for (const field of [
  'total_active_events',
  'soft_deleted_events',
  'analyzed_events',
  'legacy_analyses',
  'vnext_analyses',
  'risk_profile_included',
  'risk_profile_excluded',
]) {
  assert.ok(statsRoute.includes(field), `missing admin stats parity field: ${field}`)
}

assert.match(eventsRoute, /scope === 'deleted'/)
assert.match(eventsRoute, /\.is\('deleted_at', null\)/)
assert.match(riskProfileServer, /\.is\('deleted_at', null\)/)

console.log('FRONTEND_DATA_PARITY_CONTRACT_OK')
