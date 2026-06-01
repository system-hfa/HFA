import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')
const gatePath = path.join(base, 'SERA_A4R193_L_THEBAUD_REENTRY_GATE_v0.2.0.md')
const holdPath = path.join(base, 'SERA_A4R193_L_THEBAUD_HOLD_DECISION_v0.2.0.md')
const batchPath = path.join(base, 'SERA_A4R193_L_THEBAUD_REENTRY_BLOCKED_BATCH_v0.2.0.md')
const logPath = path.join(base, 'SERA_A4R193_L_LOG_v0.2.0.md')
const readinessPath = path.join(base, 'SERA_A4R193_M_READINESS_PLAN_v0.2.0.md')
const reentryPath = path.join(base, 'REAL_EVENT_REENTRY_THEBAUD_A4R193_L_v0.2.0.md')

for (const p of [gatePath, holdPath, batchPath, logPath, readinessPath]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}
assert.equal(fs.existsSync(reentryPath), false, 'Thebaud must not be reentered when gate is blocked')

const gate = fs.readFileSync(gatePath, 'utf8')
const hold = fs.readFileSync(holdPath, 'utf8')
const batch = fs.readFileSync(batchPath, 'utf8')
const log = fs.readFileSync(logPath, 'utf8')
const readiness = fs.readFileSync(readinessPath, 'utf8')
const all = [gate, hold, batch, log, readiness].join('\n')

assert.equal(gate.includes('GATE_BLOCKED'), true, 'gate must be blocked')
assert.equal(gate.includes('INSUFFICIENT_FOR_REENTRY_GATE'), true, 'insufficiency must be explicit')
assert.equal(gate.includes('RISK_PRESENT'), true, 'risk presence must be explicit')

assert.equal(hold.includes('HOLD_AGENT_ACT_MOMENT_INSUFFICIENT'), true, 'hold status must be explicit')
assert.equal(batch.includes('Thebaud: `HOLD_AGENT_ACT_MOMENT_INSUFFICIENT`'), true, 'batch must preserve blocked Thebaud state')

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(all.includes(token), false, `${token} field must not appear`)
}
assert.equal(/\bCLASSIFIED\b/.test(all), false, 'CLASSIFIED must not appear')

assert.equal(all.includes('Sintéticos'), true, 'synthetics blocked statement must exist')
assert.equal(all.includes('Produto/UI/API'), true, 'product UI API blocked statement must exist')
assert.equal(all.includes('RR-001: `OPEN`'), true, 'RR-001 must be OPEN')
assert.equal(all.includes('RR-003: `PARTIALLY_MITIGATED`'), true, 'RR-003 must be PARTIALLY_MITIGATED')

console.log('real-event-reentry-thebaud-gate-trial-001: OK')
