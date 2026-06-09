import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const helperFile = path.join(rootDir, 'frontend', 'src', 'lib', 'server', 'event-deletion.ts')
const routeFile = path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'purge', 'route.ts')

const helper = readFileSync(helperFile, 'utf8')
const route = readFileSync(routeFile, 'utf8')

assert.match(helper, /mode: 'DRY_RUN'/)
assert.match(helper, /storageObjects/)
assert.match(helper, /EVENT_PURGE_NON_DRY_RUN_BLOCKED/)
assert.match(route, /event\.purge_started/)
assert.match(route, /event\.purge_scheduled/)

console.log('STORAGE_DRY_RUN_OK')
