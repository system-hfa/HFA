/**
 * atomicity-rpc-contract-trial-001
 *
 * Static validation: verifica que softDeleteEvent e restoreSoftDeletedEvent
 * usam os RPCs transacionais finais
 * ao invés de múltiplos writes sequenciais sem transação.
 *
 * Verifica também que resolvePublicUserId é chamado nos sites corretos.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(__dirname, '..', '..', '..')
const helper = readFileSync(
  path.join(root, 'frontend', 'src', 'lib', 'server', 'event-deletion.ts'),
  'utf8'
)
const deleteRoute = readFileSync(
  path.join(root, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'delete-request', 'route.ts'),
  'utf8'
)
const restoreRoute = readFileSync(
  path.join(root, 'frontend', 'src', 'app', 'api', 'events', '[eventId]', 'restore', 'route.ts'),
  'utf8'
)

// RPCs existem no helper
for (const rpc of [
  'request_event_soft_delete',
  'restore_soft_deleted_event',
  'schedule_event_purge',
  'mark_event_purge_failed',
  'complete_event_purge',
]) {
  assert.match(helper, new RegExp(rpc), `helper: ${rpc} not called`)
}

// resolvePublicUserId existe e é usado
assert.match(helper, /resolvePublicUserId/, 'helper: resolvePublicUserId not defined')
assert.match(deleteRoute, /resolvePublicUserId/, 'delete-request: resolvePublicUserId not called')
assert.match(restoreRoute, /resolvePublicUserId/, 'restore: resolvePublicUserId not called')

// softDeleteEvent não faz upsert do tombstone diretamente (tombstone only at purge)
assert.doesNotMatch(
  // Look only in softDeleteEvent function body
  helper.slice(helper.indexOf('export async function softDeleteEvent'), helper.indexOf('export async function restoreSoftDeletedEvent')),
  /upsertDeletionTombstone|insertDeletionTombstone/,
  'softDeleteEvent must not write tombstone; tombstone is written only at purge'
)

// event_deletion_events table referenced in migration
const baseMigration = readFileSync(path.join(root, 'supabase', 'migrations', '20260609200000_event_deletion_lifecycle_events_and_rpcs.sql'), 'utf8')
const finalMigration = readFileSync(path.join(root, 'supabase', 'migrations', '20260609203626_complete_event_deletion_closure.sql'), 'utf8')
const migration = `${baseMigration}\n${finalMigration}`
assert.match(migration, /event_deletion_events/, 'migration: event_deletion_events table missing')
assert.match(migration, /prevent_event_deletion_events_delete/, 'migration: append-only delete trigger missing')
assert.match(migration, /prevent_event_deletion_events_update/, 'migration: append-only update trigger missing')
assert.match(migration, /prevent_event_deletion_tombstones_delete/, 'migration: tombstone append-only delete trigger missing')
assert.match(migration, /prevent_event_deletion_tombstones_update/, 'migration: tombstone append-only update trigger missing')
assert.match(migration, /request_event_soft_delete/, 'migration: request_event_soft_delete missing')
assert.match(migration, /restore_soft_deleted_event/, 'migration: restore_soft_deleted_event missing')
assert.match(migration, /schedule_event_purge/, 'migration: schedule_event_purge missing')
assert.match(migration, /mark_event_purge_failed/, 'migration: mark_event_purge_failed missing')
assert.match(migration, /complete_event_purge/, 'migration: complete_event_purge missing')
assert.match(migration, /FOR UPDATE/, 'migration: FOR UPDATE lock missing in RPCs')

// Concurrency guards present in RPCs
assert.match(migration, /EVENT_DELETE_CONFLICT/, 'migration: concurrent modification guard missing')
assert.match(migration, /insert into public\.audit_log/, 'migration: atomic audit inserts missing')

console.log('ATOMICITY_RPC_CONTRACT_OK')
