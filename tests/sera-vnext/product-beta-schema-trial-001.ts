import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const migration = readdirSync(path.join(rootDir, 'supabase', 'migrations')).find((name) => name.endsWith('_sera_vnext_product_beta.sql'))
assert.ok(migration, 'product beta migration must exist')
const sql = readFileSync(path.join(rootDir, 'supabase', 'migrations', migration), 'utf8')

for (const table of [
  'sera_vnext_analyses',
  'sera_vnext_analysis_revisions',
  'sera_vnext_analysis_reviews',
  'sera_vnext_analysis_events',
]) {
  assert.match(sql, new RegExp(`create table if not exists public\\.${table}`, 'i'), `${table} table missing`)
  assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, 'i'), `${table} RLS missing`)
}

for (const required of [
  'tenant_id uuid not null',
  'created_by uuid not null',
  'narrative_hash text not null',
  'engine_output_hash text not null',
  'current_revision integer not null default 1',
  'sera_vnext_analyses_tenant_client_request_uidx',
  'sera_vnext_revisions_analysis_revision_uidx',
  'prevent_sera_vnext_revision_update',
  'prevent_sera_vnext_event_update',
  'grant select, insert, update on public.sera_vnext_analyses to authenticated',
]) {
  assert.ok(sql.includes(required), `missing schema fragment: ${required}`)
}

for (const forbiddenState of ['FINAL_CLASSIFICATION', 'RELEASED', 'CLASSIFIED', 'READY']) {
  assert.ok(sql.includes('no_final'), 'no-final constraints must exist')
  assert.equal(new RegExp(`decision in \\([^)]*${forbiddenState}`, 'i').test(sql), false, `${forbiddenState} must not be an allowed review decision`)
}

assert.match(sql, /coalesce\(engine_output ->> 'selectedCode', ''\) = ''/)
assert.match(sql, /coalesce\(engine_output ->> 'releasedCode', ''\) = ''/)
assert.match(sql, /coalesce\(engine_output ->> 'finalConclusion', ''\) = ''/)
assert.match(sql, /deleted_at timestamptz null/)
assert.match(sql, /jsonb_typeof\(warnings\) = 'array'/)

console.log('SCHEMA_OK')
