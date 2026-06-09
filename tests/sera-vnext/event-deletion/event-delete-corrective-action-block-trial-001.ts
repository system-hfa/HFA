import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const helperFile = path.join(rootDir, 'frontend', 'src', 'lib', 'server', 'event-deletion.ts')
const routeFile = path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'delete-request', 'route.ts')

const helper = readFileSync(helperFile, 'utf8')
const route = readFileSync(routeFile, 'utf8')

assert.match(helper, /correctiveActionsOpen/)
assert.match(helper, /open_corrective_actions/)
assert.match(route, /EVENT_DELETE_CORRECTIVE_ACTION_BLOCK/)

console.log('CORRECTIVE_ACTION_BLOCK_OK')
