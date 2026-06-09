import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const helperFile = path.join(rootDir, 'frontend', 'src', 'lib', 'server', 'event-deletion.ts')
const routeFile = path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'purge', 'route.ts')

const helper = readFileSync(helperFile, 'utf8')
const route = readFileSync(routeFile, 'utf8')

assert.match(helper, /mode: 'PURGE_DRY_RUN'/)
assert.match(helper, /storageObjects/)
assert.match(helper, /EVENT_PURGE_NOT_ELIGIBLE/)
assert.match(helper, /schedule_event_purge/)
assert.match(route, /EXECUTE_SYNTHETIC/)

console.log('STORAGE_DRY_RUN_OK')
