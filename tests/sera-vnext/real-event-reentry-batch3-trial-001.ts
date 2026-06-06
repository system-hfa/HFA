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
    rationale: 'A4R193-E batch3 candidate-only trial',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: anchor,
  }
}

const americanIntake: BuildPassiveEscapePointIntakeInput = {
  intakeId: 'INTAKE-A4R193E-AMERICAN-1420-001',
  eventId: 'REAL-EVENT-AMERICAN-1420-LIT-1999-REENTRY-001',
  source: 'neutral_trial',
  approvedEscapePointScope: scope(
    'scope-american-1420-reentry-001',
    'Continuacao da aproximacao final instavel com perda de referencia visual antes da janela de arremetida segura.',
    {
      agentId: 'crew-integrated-american-1420-final-approach',
      agentKind: 'crew_collective',
      unsafeActOrOmission: {
        kind: 'mixed_act_and_omission',
        statement: 'Manteve continuacao de aproximacao final instavel sem transicao tempestiva para go-around.',
      },
      operationalMoment: {
        description: 'Janela de aproximacao final com cues degradados antes do touchdown.',
        sequenceRef: 'seq:4',
      },
      pointTopology: 'progressive',
      zoneBoundary: {
        earliestControllableRef: 'seq:3',
        latestControllableRef: 'seq:5',
      },
      boundaryEvidenceRefs: ['AA1420-A4R180-F2', 'AA1420-A4R180-F3', 'A4R182-DEC-0003'],
    },
    ['AA1420-A4R180-F2', 'AA1420-A4R180-F3', 'A4R182-DEC-0003'],
  ),
  axisMetadata: {
    perception: {
      axisAgentRef: 'crew-integrated-american-1420-final-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['AA1420-A4R180-F2', 'AA1420-A4R180-F3'],
    },
    objective: {
      axisAgentRef: 'crew-integrated-american-1420-final-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['AA1420-A4R180-F2', 'A4R181-ADJ-0003'],
    },
    action: {
      axisAgentRef: 'crew-integrated-american-1420-final-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['AA1420-A4R180-F3', 'A4R182-DEC-0003'],
    },
  },
}

const upsIntake: BuildPassiveEscapePointIntakeInput = {
  intakeId: 'INTAKE-A4R193E-UPS-1354-001',
  eventId: 'REAL-EVENT-UPS-1354-BHM-2013-REENTRY-001',
  source: 'neutral_trial',
  approvedEscapePointScope: scope(
    'scope-ups-1354-reentry-001',
    'Nao percepcao do setup FMC invalido e da falha de engajamento do modo esperado antes da descida nao estabilizada.',
    {
      agentId: 'crew-integrated-ups-1354-approach',
      agentKind: 'crew_collective',
      unsafeActOrOmission: {
        kind: 'mixed_act_and_omission',
        statement: 'Prosseguiu com descida sem reconhecer degradacao critica de setup e modo e sem go-around tempestivo.',
      },
      operationalMoment: {
        description: 'Janela de setup e mode management antes do gate de 1000ft AFE.',
        sequenceRef: 'seq:4',
      },
      pointTopology: 'progressive',
      zoneBoundary: {
        earliestControllableRef: 'seq:3',
        latestControllableRef: 'seq:5',
      },
      boundaryEvidenceRefs: ['UPS1354-A4R180-F1', 'UPS1354-A4R180-F2', 'UPS1354-A4R180-F3', 'A4R182-DEC-0004'],
    },
    ['UPS1354-A4R180-F1', 'UPS1354-A4R180-F2', 'UPS1354-A4R180-F3', 'A4R182-DEC-0004'],
  ),
  axisMetadata: {
    perception: {
      axisAgentRef: 'crew-integrated-ups-1354-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['UPS1354-A4R180-F1', 'UPS1354-A4R180-F4'],
    },
    objective: {
      axisAgentRef: 'crew-integrated-ups-1354-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['UPS1354-A4R180-F3', 'A4R181-ADJ-0006'],
    },
    action: {
      axisAgentRef: 'crew-integrated-ups-1354-approach',
      axisMomentRef: 'seq:4',
      axisEvidenceRefs: ['UPS1354-A4R180-F2', 'UPS1354-A4R180-F3'],
    },
  },
}

const scenarios = [americanIntake, upsIntake]

for (const input of scenarios) {
  const intake = buildPassiveEscapePointIntake(input)
  const validation = validatePassiveEscapePointIntake(intake)
  const bridge = buildTraversalAdapterInputFromEscapePointIntake({ intake })

  assert.equal(
    validation.readinessStatus === 'PASSIVE_INTAKE_READY' || validation.readinessStatus === 'PASSIVE_INTAKE_READY_WITH_WARNINGS',
    true,
    `${input.eventId}: intake must be ready in candidate-only mode.`,
  )
  assert.equal(bridge.enforcementMode, 'PASSIVE_COMPAT', `${input.eventId}: bridge mode must be PASSIVE_COMPAT.`)
  assert.equal(bridge.blocked, false, `${input.eventId}: bridge must not be blocked for batch3.`)
  assert.ok(
    bridge.status === 'BRIDGE_READY_PASSIVE' || bridge.status === 'BRIDGE_READY_WITH_WARNINGS_PASSIVE',
    `${input.eventId}: bridge status must be ready passive.`,
  )

  assertCandidateOnlyLocks(intake as unknown as Record<string, unknown>, `${input.eventId}: intake`)
  assertCandidateOnlyLocks(validation as unknown as Record<string, unknown>, `${input.eventId}: validation`)
  assertEscapePointIntakeBridgeLocks(bridge)

  assertNoForbiddenOutputs(intake as unknown as Record<string, unknown>, `${input.eventId}: intake`)
  assertNoForbiddenOutputs(validation as unknown as Record<string, unknown>, `${input.eventId}: validation`)
  assertNoForbiddenOutputs(bridge as unknown as Record<string, unknown>, `${input.eventId}: bridge`)

  assert.notEqual(String(bridge.traversalAdapterInput.proposedCodes?.O ?? ''), 'O-E', `${input.eventId}: O-E cannot be active proposed code.`)
}

// Evidence lock checks from new docs.
const batchDoc = readFile('docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_REAL_EVENT_REENTRY_BATCH3_v0.2.0.md')
const americanDoc = readFile('docs/sera-vnext/real-event-reentry-a4r193/REAL_EVENT_REENTRY_AMERICAN_1420_A4R193_E_v0.2.0.md')
const upsDoc = readFile('docs/sera-vnext/real-event-reentry-a4r193/REAL_EVENT_REENTRY_UPS_1354_A4R193_E_v0.2.0.md')
const trackerCsv = readFile('docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_REAL_EVENT_REENTRY_BATCH3_TRACKER.csv')
const revisedReadiness = readFile('docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_REVISED_READINESS_PLAN_v0.2.0.md')

assert.ok(batchDoc.includes('Daumas permanece em lane metodologica/documental.'), 'Daumas lane decision must be explicit.')
assert.ok(batchDoc.includes('Prior real-event work permanece em lane paralela de enrichment e holds.'), 'Prior real-event lane decision must be explicit.')
assert.ok(batchDoc.includes('Sinteticos continuam bloqueados'), 'Synthetic lock decision must remain explicit.')
assert.ok(batchDoc.includes('Produto UI API continuam bloqueados'), 'Product lock decision must remain explicit.')

assert.ok(americanDoc.includes('reentryStatus: READY_FOR_CANDIDATE_ONLY_TRIAL'))
assert.ok(upsDoc.includes('reentryStatus: READY_FOR_CANDIDATE_ONLY_TRIAL'))
assert.ok(trackerCsv.includes('READY_FOR_CANDIDATE_ONLY_TRIAL'), 'Tracker must keep candidate-only readiness.')

// Ensure no automatic reference replacement by Daumas.
assert.equal(revisedReadiness.includes('Daumas') && revisedReadiness.includes('sem uso como referencia automatica'), true)

const forbiddenPatterns = [
  'selectedCode:',
  'releasedCode:',
  'finalConclusion:',
  'selectedCodeAllowed=true',
  'releasedCodeAllowed=true',
  'classificationAllowed=true',
  'poaClosureAllowed=true',
  'downstreamAllowed=true',
  'finalConclusionAllowed=true',
]

for (const text of [batchDoc, americanDoc, upsDoc]) {
  for (const pattern of forbiddenPatterns) {
    assert.equal(text.includes(pattern), false, `Forbidden output marker detected in batch3 docs: ${pattern}`)
  }
}

console.log('real-event-reentry-batch3-trial-001: OK')
