import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { validateCreateAnalysisInput } from '../../frontend/src/lib/sera-vnext-product'

const rootDir = path.resolve(__dirname, '..', '..')
const validNarrative = 'During approach the crew noticed an unstable condition, continued briefly, and the operation left the safe envelope before recovery action was considered.'

assert.throws(() => validateCreateAnalysisInput({ title: 'x', narrative: 'short', clientRequestId: 'a' }), /pelo menos/)
assert.throws(() => validateCreateAnalysisInput({ title: 'x', narrative: `${validNarrative} http://example.com`, clientRequestId: 'a' }), /URLs/)
assert.throws(() => validateCreateAnalysisInput({ title: 'x', narrative: `<script>${validNarrative}</script>`, clientRequestId: 'a' }), /Scripts/)
assert.throws(() => validateCreateAnalysisInput({ title: 'x', narrative: 'a'.repeat(12001), clientRequestId: 'a' }), /no máximo/)

const sanitized = validateCreateAnalysisInput({
  title: 'Token case',
  narrative: `${validNarrative} Secret sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456 should be redacted before persistence output.`,
  clientRequestId: 'req-1',
})
assert.equal(sanitized.narrative.includes('sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'), false)
assert.ok(sanitized.narrative.includes('[REDACTED_SECRET]'))
assert.ok(sanitized.warnings.includes('SENSITIVE_TEXT_REDACTED'))

for (const file of [
  'frontend/src/app/(dashboard)/admin/sera-vnext/analyses/page.tsx',
  'frontend/src/app/(dashboard)/admin/sera-vnext/analyses/new/page.tsx',
  'frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/page.tsx',
  'frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/review/page.tsx',
]) {
  const source = readFileSync(path.join(rootDir, file), 'utf8')
  assert.equal(source.includes('SUPABASE_SERVICE_ROLE_KEY'), false, `${file}: service role must not be in UI`)
  assert.equal(source.includes('getSupabaseAdmin'), false, `${file}: admin client must not be in UI`)
}

const combined = [
  'frontend/src/lib/sera-vnext-product/persistence/create-analysis.ts',
  'frontend/src/lib/sera-vnext-product/api-handlers.ts',
].map((file) => readFileSync(path.join(rootDir, file), 'utf8')).join('\n')
for (const fragment of ['selectedCode', 'releasedCode', 'finalConclusion', 'classifiedOutput', 'readyPromotion', 'downstreamAllowed']) {
  assert.ok(combined.includes(fragment), `${fragment} lock must be checked in product beta code`)
}
assert.equal(combined.includes('FINAL_CLASSIFICATION'), false)

console.log('SECURITY_OK')
