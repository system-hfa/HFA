import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const routeFile = path.join(rootDir, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'route.ts')
const source = readFileSync(routeFile, 'utf8')

assert.match(source, /export async function DELETE/)
assert.match(source, /requireAdmin\(req\)/)
assert.match(source, /event\.hard_delete_denied/)
assert.match(source, /EVENT_PURGE_DRY_RUN_ONLY/)
assert.match(source, /HARD_DELETE_DENIED/)

console.log('HARD_DELETE_DISABLED_OK')
