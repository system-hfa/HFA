import assert from 'node:assert/strict'
import { createAuditEvent, type InsertAuditEventRow } from '../../frontend/src/lib/sera-vnext-product'

const inserted: InsertAuditEventRow[] = []
const repository = {
  insertAuditEvent: async (row: InsertAuditEventRow) => {
    inserted.push(row)
    return { ...row, id: 'event-1', created_at: new Date(0).toISOString() }
  },
} as any


async function main() {
  await createAuditEvent({
    repository,
    context: {
      userId: 'user-1',
      tenantId: 'tenant-1',
      role: 'admin',
      email: 'admin@example.test',
      requestId: 'audit-request',
    },
    analysisId: 'analysis-1',
    eventType: 'analysis.created',
    fromStatus: null,
    toStatus: 'CANDIDATE_ANALYSIS_CREATED',
    payload: {
      title: 'Audit title',
      narrative: 'This full narrative must never be written into audit payload.',
      token: 'Bearer secret-token',
      nested: { eventText: 'nested full text must be removed', safe: 'ok' },
    },
    metadata: {
      raw_input: 'raw input must be removed',
      stack: 'stack must be removed',
      safeMetric: 7,
    },
  })

  assert.equal(inserted.length, 1)
  const eventText = JSON.stringify(inserted[0])
  for (const forbidden of ['full narrative', 'Bearer secret-token', 'raw input', 'stack must', 'nested full text']) {
    assert.equal(eventText.includes(forbidden), false, `audit event leaked ${forbidden}`)
  }
  assert.ok(eventText.includes('safeMetric'))
  assert.equal(inserted[0].request_id, 'audit-request')
  assert.equal(inserted[0].tenant_id, 'tenant-1')
  assert.equal(inserted[0].actor_id, 'user-1')

  console.log('AUDIT_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
