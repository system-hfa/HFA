import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..', '..')
const migration = readdirSync(path.join(rootDir, 'supabase', 'migrations')).find((name) => name.endsWith('_sera_vnext_product_beta.sql'))
assert.ok(migration)
const sql = readFileSync(path.join(rootDir, 'supabase', 'migrations', migration), 'utf8')

assert.match(sql, /sera_vnext_beta_jwt_tenant_id\(\)/)
assert.match(sql, /#>> '\{app_metadata,tenant_id\}'/)
assert.match(sql, /#>> '\{app_metadata,role\}'/)
assert.equal(sql.includes('user_metadata'), false, 'new beta RLS must not authorize from user_metadata')
assert.equal(/grant\s+[^;]*\s+to\s+anon/i.test(sql), false, 'anon grants are forbidden for beta tables')

for (const policy of [
  'sera_vnext_analyses_admin_select',
  'sera_vnext_analyses_admin_insert',
  'sera_vnext_analyses_admin_update',
  'sera_vnext_revisions_admin_select',
  'sera_vnext_revisions_admin_insert',
  'sera_vnext_reviews_admin_select',
  'sera_vnext_reviews_admin_insert',
  'sera_vnext_events_admin_select',
  'sera_vnext_events_admin_insert',
]) {
  assert.ok(sql.includes(policy), `missing policy: ${policy}`)
}

const canUseOccurrences = (sql.match(/public\.sera_vnext_beta_can_use\(tenant_id\)/g) ?? []).length
assert.ok(canUseOccurrences >= 9, 'all policies must use tenant-scoped admin predicate')
assert.match(sql, /deleted_at is null/, 'default select policy must hide soft-deleted rows')
assert.match(sql, /reviews_admin_insert[\s\S]*with check \(public\.sera_vnext_beta_can_use\(tenant_id\)\)/)
assert.match(sql, /events_admin_insert[\s\S]*with check \(public\.sera_vnext_beta_can_use\(tenant_id\)\)/)

console.log('RLS_OK_STATIC_LIMITED')
