/**
 * error-sanitization-contract-trial-001
 *
 * Static validation: verifica que todos os catch blocks nas rotas de exclusão
 * NÃO expõem String(e) ou error.message diretamente na resposta.
 * Qualquer ocorrência de `String(e)` ou template literal com erro é uma falha.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(__dirname, '..', '..', '..')
const apiBase = path.join(root, 'frontend', 'src', 'app', 'api', 'events', '[eventId]')

const routes = [
  'delete-request/route.ts',
  'deletion-impact/route.ts',
  'restore/route.ts',
  'purge/route.ts',
  'route.ts',
]

const FORBIDDEN_PATTERNS = [
  /jsonError\([^,]+,\s*String\(e\)/,
  /jsonError\([^,]+,\s*e\.message/,
  /jsonError\([^,]+,\s*error\.message/,
  /return.*json\([^)]*String\(e\)/,
]

const LEAKAGE_TERMS = ['postgres', 'postgrest', 'constraint', 'table', 'column', 'stack', 'supabase']

for (const rel of routes) {
  const src = readFileSync(path.join(apiBase, rel), 'utf8')

  for (const pattern of FORBIDDEN_PATTERNS) {
    assert.doesNotMatch(src, pattern, `[${rel}] forbidden pattern: ${pattern}`)
  }

  for (const term of LEAKAGE_TERMS) {
    const inErrorResponse = new RegExp(`jsonError.*${term}`, 'i')
    assert.doesNotMatch(src, inErrorResponse, `[${rel}] leaks DB term in jsonError: "${term}"`)
  }
  assert.match(src, /\{ error: \{ code, message, requestId \} \}/, `[${rel}] missing stable error envelope`)
}

// Verify the generic error message is present in each route
for (const rel of routes) {
  const src = readFileSync(path.join(apiBase, rel), 'utf8')
  assert.match(src, /Não foi possível/, `[${rel}] missing generic Portuguese error message in catch block`)
}

// Verify console.error is used in unexpected error paths (server-side logging)
for (const rel of routes) {
  const src = readFileSync(path.join(apiBase, rel), 'utf8')
  assert.match(src, /console\.error/, `[${rel}] missing console.error for server-side logging`)
}

console.log('ERROR_SANITIZATION_CONTRACT_OK')
