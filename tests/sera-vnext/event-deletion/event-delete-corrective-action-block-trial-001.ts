import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const helperFile = path.join(rootDir, 'frontend', 'src', 'lib', 'server', 'event-deletion.ts')
const routeFile = path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'delete-request', 'route.ts')

const helper = readFileSync(helperFile, 'utf8')
const route = readFileSync(routeFile, 'utf8')

assert.match(helper, /getOpenCorrectiveActionCount/)
assert.match(helper, /EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS/)
assert.match(helper, /\.in\('status', \['pending', 'in_progress'\]\)/)
assert.match(route, /EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS/)

console.log('CORRECTIVE_ACTION_BLOCK_OK')
