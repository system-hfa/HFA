import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildPassiveEscapePointIntake,
  validatePassiveEscapePointIntake,
  type BuildPassiveEscapePointIntakeInput,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake'
import {
  assertEscapePointIntakeBridgeLocks,
  buildTraversalAdapterInputFromEscapePointIntake,
} from '../../frontend/src/lib/sera-vnext/escape-point-intake-bridge'
import type { ApprovedEscapePointScope, SeraVNextEscapePointAnchor } from '../../frontend/src/lib/sera-vnext/types'

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
}

function assertCandidateOnlyLocks(record: Record<string, unknown>, label: string): void {
  assert.equal(record.selectedCodeAllowed, false, `${label}: selectedCodeAllowed must remain false.`)
  assert.equal(record.releasedCodeAllowed, false, `${label}: releasedCodeAllowed must remain false.`)
  assert.equal(record.classificationAllowed, false, `${label}: classificationAllowed must remain false.`)
  assert.equal(record.poaClosureAllowed, false, `${label}: poaClosureAllowed must remain false.`)
  assert.equal(record.downstreamAllowed, false, `${label}: downstreamAllowed must remain false.`)
  assert.equal(record.finalConclusionAllowed, false, `${label}: finalConclusionAllowed must remain false.`)
  assert.equal(record.notFinalClassification, true, `${label}: notFinalClassification must remain true.`)
}

function assertNoForbiddenOutputs(record: Record<string, unknown>, label: string): void {
  assert.equal('selectedCode' in record, false, `${label}: selectedCode must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion must be absent.`)
  assert.equal('hfacs' in record, false, `${label}: HFACS must be absent.`)
  assert.equal('risk' in record, false, `${label}: Risk/ERC must be absent.`)
  assert.equal('armsErc' in record, false, `${label}: ARMS/ERC must be absent.`)
  assert.equal('recommendations' in record, false, `${label}: recommendations must be absent.`)
}

function scope(
  scopeId: string,
  scopeStatement: string,
  anchor: SeraVNextEscapePointAnchor,
  boundaryEvidenceRefs: string[],
): ApprovedEscapePointScope {
  return {
    scopeId,
    scopeStatement,
    boundaryEvidenceRefs,
    rationale: 'A4R193-H American 965 candidate-only trial',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor,
  }
}

const american965Input: BuildPassiveEscapePointIntakeInput = {
  intakeId: 'INTAKE-A4R193H-AMERICAN-965-001',
  eventId: 'REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001',
  source: 'neutral_trial',
  approvedEscapePointScope: scope(
    'scope-american-965-cali-reentry-001',
    'Mudanca tardia de aproximacao com reprogramacao FMS em descida e perda de margem de escape antes do alerta GPWS.',
    {
      agentId: 'crew-integrated-american-965-cali-descent',
      agentKind: 'crew_collective',
      unsafeActOrOmission: {
        kind: 'mixed_act_and_omission',
        statement:
          'Prosseguiu a descida com mudanca tardia de navegacao e carga de FMS sem interromper a aproximacao quando cues criticos de desvio e terreno ficaram evidentes.',
      },
      operationalMoment: {
        description: 'Janela entre direct para Rozo e inicio do alerta GPWS em contexto de descida com terreno elevado.',
        sequenceRef: 'seq:5',
      },
      pointTopology: 'progressive',
      zoneBoundary: {
        earliestControllableRef: 'seq:4',
        latestControllableRef: 'seq:6',
      },
      boundaryEvidenceRefs: ['AMERICAN-965-A4R180-F2', 'AMERICAN-965-A4R180-F3', 'AMERICAN-965-A4R180-F4', 'A4R181-ADJ-0010'],
    },
    ['AMERICAN-965-A4R180-F2', 'AMERICAN-965-A4R180-F3', 'AMERICAN-965-A4R180-F4', 'A4R181-ADJ-0010'],
  ),
  axisMetadata: {
    perception: {
      axisAgentRef: 'crew-integrated-american-965-cali-descent',
      axisMomentRef: 'seq:5',
      axisEvidenceRefs: ['AMERICAN-965-A4R180-F2', 'AMERICAN-965-A4R180-F3'],
    },
    objective: {
      axisAgentRef: 'crew-integrated-american-965-cali-descent',
      axisMomentRef: 'seq:5',
      axisEvidenceRefs: ['AMERICAN-965-A4R180-F2', 'A4R181-ADJ-0010'],
    },
    action: {
      axisAgentRef: 'crew-integrated-american-965-cali-descent',
      axisMomentRef: 'seq:5',
      axisEvidenceRefs: ['AMERICAN-965-A4R180-F3', 'AMERICAN-965-A4R180-F4'],
    },
  },
}

const intake = buildPassiveEscapePointIntake(american965Input)
const validation = validatePassiveEscapePointIntake(intake)
const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

assert.equal(
  validation.readinessStatus === 'PASSIVE_INTAKE_READY' || validation.readinessStatus === 'PASSIVE_INTAKE_READY_WITH_WARNINGS',
  true,
  'American 965 intake must be ready under candidate-only mode.',
)
assert.equal(bridge.enforcementMode, 'PASSIVE_COMPAT', 'Bridge mode must be PASSIVE_COMPAT.')
assert.equal(bridge.blocked, false, 'Bridge must not be blocked for American 965 candidate-only reentry.')
assert.ok(
  bridge.status === 'BRIDGE_READY_PASSIVE' || bridge.status === 'BRIDGE_READY_WITH_WARNINGS_PASSIVE',
  'Bridge status must be passive-ready.',
)

assert.equal(intake.approvedEscapePointScope?.scopeId, 'scope-american-965-cali-reentry-001')
assert.equal(bridge.traversalAdapterInput.approvedEscapePointScope?.scopeId, 'scope-american-965-cali-reentry-001')
assert.ok(bridge.traversalAdapterInput.axisAgentRefs, 'axisAgentRefs must exist')
assert.ok(bridge.traversalAdapterInput.axisMomentRefs, 'axisMomentRefs must exist')
assert.ok(bridge.traversalAdapterInput.axisEvidenceRefs, 'axisEvidenceRefs must exist')
assert.equal(bridge.traversalAdapterInput.axisAgentRefs.P, 'crew-integrated-american-965-cali-descent')
assert.equal(bridge.traversalAdapterInput.axisAgentRefs.O, 'crew-integrated-american-965-cali-descent')
assert.equal(bridge.traversalAdapterInput.axisAgentRefs.A, 'crew-integrated-american-965-cali-descent')
assert.equal(bridge.traversalAdapterInput.axisMomentRefs.P, 'seq:5')
assert.equal(bridge.traversalAdapterInput.axisMomentRefs.O, 'seq:5')
assert.equal(bridge.traversalAdapterInput.axisMomentRefs.A, 'seq:5')
assert.equal(Array.isArray(bridge.traversalAdapterInput.axisEvidenceRefs.P), true)
assert.equal(Array.isArray(bridge.traversalAdapterInput.axisEvidenceRefs.O), true)
assert.equal(Array.isArray(bridge.traversalAdapterInput.axisEvidenceRefs.A), true)

assertCandidateOnlyLocks(intake as unknown as Record<string, unknown>, 'intake')
assertCandidateOnlyLocks(validation as unknown as Record<string, unknown>, 'validation')
assertEscapePointIntakeBridgeLocks(bridge)
assertNoForbiddenOutputs(intake as unknown as Record<string, unknown>, 'intake')
assertNoForbiddenOutputs(validation as unknown as Record<string, unknown>, 'validation')
assertNoForbiddenOutputs(bridge as unknown as Record<string, unknown>, 'bridge')

const batchDoc = readFile('docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_H_REAL_EVENT_REENTRY_BATCH4_v0.2.0.md')
const reentryDoc = readFile('docs/sera-vnext/real-event-reentry-a4r193/REAL_EVENT_REENTRY_AMERICAN_965_A4R193_H_v0.2.0.md')
const trackerCsv = readFile('docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_H_REAL_EVENT_REENTRY_BATCH4_TRACKER.csv')

assert.ok(batchDoc.includes('American 965 Cali: `READY_FOR_CANDIDATE_ONLY_TRIAL`'))
assert.ok(batchDoc.includes('Delta 191: `HOLD_ENVIRONMENT_DOMINANT`'))
assert.ok(batchDoc.includes('Colgan 3407 BUF: `HOLD_AGENT_MIGRATION_RISK`'))
assert.ok(batchDoc.includes('Sinteticos continuam bloqueados.'))
assert.ok(batchDoc.includes('Produto UI API continuam bloqueados.'))

assert.ok(reentryDoc.includes('RR-001: OPEN'))
assert.ok(reentryDoc.includes('RR-003: PARTIALLY_MITIGATED'))
assert.ok(reentryDoc.includes('`READY_FOR_CANDIDATE_ONLY_TRIAL`'))

assert.ok(trackerCsv.includes('REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001'))
assert.ok(trackerCsv.includes('READY_FOR_CANDIDATE_ONLY_TRIAL'))
assert.ok(trackerCsv.includes(',OPEN,PARTIALLY_MITIGATED,'))

const forbiddenPatterns = [
  'selectedCode:',
  'releasedCode:',
  'finalConclusion:',
  'CLASSIFIED',
  'HFACS',
  'Risk/ERC',
  'ARMS/ERC',
  'recommendations',
]

for (const text of [batchDoc, reentryDoc, trackerCsv]) {
  for (const pattern of forbiddenPatterns) {
    assert.equal(text.includes(pattern), false, `Forbidden marker detected in A4R193-H artifacts: ${pattern}`)
  }
}

console.log('real-event-reentry-american-965-trial-001: OK')
