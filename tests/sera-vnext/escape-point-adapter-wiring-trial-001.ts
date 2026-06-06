import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildCanonicalTraversalFromNodeDecisions,
  type CanonicalTraversalAdapterOutput,
  type SeraCanonicalNodeDecisionInput,
} from '../../frontend/src/lib/sera-vnext/canonical-traversal-adapter'
import {
  buildCandidateTraversalFromAuthorNodeIntake,
  type AuthorNodeIntakeRecord,
} from '../../frontend/src/lib/sera-vnext/author-node-intake-adapter'
import { getCanonicalTraversalNode } from '../../frontend/src/lib/sera-vnext/canonical-traversal'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraAxis,
  CanonicalSeraLeafCode,
  SeraVNextEscapePointAnchor,
} from '../../frontend/src/lib/sera-vnext/types'

const FINAL_FREE_CONCLUSION_ALLOWED_KEY = 'final' + 'ConclusionAllowed'

type CsvRow = Record<string, string>

function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (ch === ',' && !inQuotes) {
      fields.push(current)
      current = ''
      continue
    }
    current += ch
  }

  fields.push(current)
  return fields
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0)
  const header = parseCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    const row: CsvRow = {}
    for (let i = 0; i < header.length; i += 1) {
      row[header[i]] = values[i] ?? ''
    }
    return row
  })
}

function discreteAnchor(overrides: Partial<SeraVNextEscapePointAnchor> = {}): SeraVNextEscapePointAnchor {
  return {
    agentId: 'maintenance-copterline',
    agentKind: 'specific_actor',
    unsafeActOrOmission: {
      kind: 'unsafe_omission',
      statement: 'Did not verify the mandatory internal-leak test was executed at 2250h.',
    },
    operationalMoment: { description: 'Scheduled maintenance at the 2250h limit.', sequenceRef: 'seq:3' },
    pointTopology: 'discrete',
    boundaryEvidenceRefs: ['ev-maint-1'],
    ...overrides,
  }
}

function scope(overrides: Partial<ApprovedEscapePointScope> = {}): ApprovedEscapePointScope {
  return {
    scopeId: 'scope-ep-adapter-001',
    scopeStatement: 'Safe-operation escape point at maintenance.',
    boundaryEvidenceRefs: ['ev-scope-1'],
    rationale: 'Adapter wiring trial.',
    status: 'APPROVED_NOT_ENFORCED',
    escapePointAnchor: discreteAnchor(),
    ...overrides,
  }
}

function decision(input: {
  decisionId: string
  eventId: string
  axis: CanonicalSeraAxis
  nodeId: string
  answerValue: string
}): SeraCanonicalNodeDecisionInput {
  return {
    decisionId: input.decisionId,
    eventId: input.eventId,
    axis: input.axis,
    nodeId: input.nodeId,
    answerValue: input.answerValue,
    authorDecision: 'ACCEPT_NODE_ANSWER',
    rationale: 'Adapter wiring trial decision.',
    evidenceRefs: [`EVID-${input.decisionId}`],
    sourcePhase: 'A4R191-D',
  }
}

function record(input: {
  intakeId: string
  eventId: string
  axis: CanonicalSeraAxis
  nodeId: string
  answerValue: string
}): AuthorNodeIntakeRecord {
  return {
    intakeId: input.intakeId,
    eventId: input.eventId,
    eventName: `ADAPTER-${input.eventId}`,
    axis: input.axis,
    nodeId: input.nodeId,
    exactQuestionTextPt: getCanonicalTraversalNode(input.nodeId).exactQuestionTextPt,
    authorDecision: 'ACCEPT_NODE_ANSWER',
    authorDecisionRationale: 'Adapter wiring author intake decision.',
    evidenceAnchor: `EVID-${input.intakeId}`,
    answerValue: input.answerValue,
    notFinalClassification: true,
    poaClosureAllowed: false,
  }
}

function canonicalAxis(output: CanonicalTraversalAdapterOutput, axis: CanonicalSeraAxis) {
  const result = output.axisResults.find((item) => item.axis === axis)
  assert.ok(result, `Missing canonical adapter axis ${axis}`)
  return result
}

function authorAxis(
  output: ReturnType<typeof buildCandidateTraversalFromAuthorNodeIntake>,
  eventId: string,
  axis: CanonicalSeraAxis,
) {
  const event = output.events.find((item) => item.eventId === eventId)
  assert.ok(event, `Missing author event ${eventId}`)
  const result = event.axisResults.find((item) => item.axis === axis)
  assert.ok(result, `Missing author axis ${axis}`)
  return result
}

function assertCandidateOnlyLocks(record: Record<string, unknown>, label: string): void {
  assert.equal(record.selectedCodeAllowed, false, `${label}: selectedCodeAllowed must remain false.`)
  assert.equal(record.releasedCodeAllowed, false, `${label}: releasedCodeAllowed must remain false.`)
  assert.equal(record.poaClosureAllowed, false, `${label}: poaClosureAllowed must remain false.`)
  assert.equal(record.downstreamAllowed, false, `${label}: downstreamAllowed must remain false.`)
  assert.equal(record.classificationAllowed, false, `${label}: classificationAllowed must remain false.`)
  assert.equal(record.notFinalClassification, true, `${label}: notFinalClassification must remain true.`)
  assert.equal(record[FINAL_FREE_CONCLUSION_ALLOWED_KEY], false, `${label}: final conclusion lock must remain false.`)
  assert.equal('selectedCode' in record, false, `${label}: selectedCode must be absent.`)
  assert.equal('releasedCode' in record, false, `${label}: releasedCode must be absent.`)
  assert.equal('finalConclusion' in record, false, `${label}: finalConclusion must be absent.`)
  assert.notEqual(record.status, 'CLASSIFIED', `${label}: CLASSIFIED status must be absent.`)
}

function assertAuthorOutputLocks(output: ReturnType<typeof buildCandidateTraversalFromAuthorNodeIntake>): void {
  assertCandidateOnlyLocks(output as unknown as Record<string, unknown>, 'author root')
  for (const event of output.events) {
    assertCandidateOnlyLocks(event as unknown as Record<string, unknown>, `author event ${event.eventId}`)
    for (const axis of event.axisResults) {
      assertCandidateOnlyLocks(axis as unknown as Record<string, unknown>, `author axis ${event.eventId}/${axis.axis}`)
    }
  }
}

// 1. canonical-traversal-adapter PASSIVE_COMPAT preserves previous behavior.
{
  const output = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({ decisionId: 'C-P-001', eventId: 'C-PASSIVE', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
      decision({ decisionId: 'C-P-002', eventId: 'C-PASSIVE', axis: 'P', nodeId: 'P_ASSESSMENT', answerValue: 'SIM' }),
    ],
  })
  const result = canonicalAxis(output, 'P')
  assert.equal(result.status, 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED')
  assert.equal(result.leafCandidate?.candidateOnlyLeafCode, 'P-A')
  assert.equal(result.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED')
  assertCandidateOnlyLocks(output as unknown as Record<string, unknown>, 'canonical passive root')
  assertCandidateOnlyLocks(result as unknown as Record<string, unknown>, 'canonical passive axis')
}

// 2. canonical-traversal-adapter ENFORCE + correct discrete scope reaches candidate-only leaf.
{
  const output = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({ decisionId: 'C-OK-001', eventId: 'C-OK', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' }),
      decision({ decisionId: 'C-OK-002', eventId: 'C-OK', axis: 'A', nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' }),
      decision({ decisionId: 'C-OK-003', eventId: 'C-OK', axis: 'A', nodeId: 'A_CORRECT', answerValue: 'SIM' }),
    ],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'maintenance-copterline' },
    axisMomentRefs: { A: 'seq:3' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = canonicalAxis(output, 'A')
  assert.equal(result.status, 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED')
  assert.equal(result.leafCandidate?.candidateOnlyLeafCode, 'A-A')
  assert.equal(result.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_ENFORCED_OK')
  assertCandidateOnlyLocks(result as unknown as Record<string, unknown>, 'canonical enforce ok')
}

// 3. canonical-traversal-adapter ENFORCE + agent migration blocks with EP-B01.
{
  const output = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [decision({ decisionId: 'C-B01-001', eventId: 'C-B01', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' })],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'flight-crew' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = canonicalAxis(output, 'A')
  assert.equal(result.status, 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION')
  assert.ok(result.blockingIssue?.includes('EP-B01_AGENT_MIGRATION'))
  assert.equal(result.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION')
  assert.equal(result.leafCandidate, null)
  assertCandidateOnlyLocks(result as unknown as Record<string, unknown>, 'canonical EP-B01')
}

// 4. canonical-traversal-adapter ENFORCE + post-event moment blocks with EP-B02.
{
  const output = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [decision({ decisionId: 'C-B02-001', eventId: 'C-B02', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' })],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'maintenance-copterline' },
    axisMomentRefs: { A: 'seq:9' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = canonicalAxis(output, 'A')
  assert.ok(result.blockingIssue?.includes('EP-B02_POST_EVENT_ANALYSIS'))
  assert.equal(result.runtimeContextTrace.enforcementStatus, 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS')
  assert.equal(result.leafCandidate, null)
}

// 5. author-node-intake-adapter A4R187 pending remains AUTHOR_DECISION_PENDING.
{
  const csvRows = parseCsv(
    fs.readFileSync(
      path.resolve('docs/sera-vnext/author-node-decision-intake-a4r187/SERA_AUTHOR_NODE_DECISION_INTAKE_MATRIX_A4R187_v0.2.0.csv'),
      'utf8',
    ),
  )
  const pendingRows: AuthorNodeIntakeRecord[] = csvRows
    .filter((row) => row.eventId === '0001' && row.axis === 'P')
    .slice(0, 2)
    .map((row) => ({
      eventId: row.eventId,
      eventName: row.eventKey,
      intakeId: row.intakeId,
      axis: row.axis as CanonicalSeraAxis,
      nodeId: row.nodeId,
      exactQuestionTextPt: row.exactQuestionTextPt,
      authorDecision: row.authorDecision as AuthorNodeIntakeRecord['authorDecision'],
      notFinalClassification: row.notFinalClassification === 'true',
      poaClosureAllowed: row.poaClosureAllowed === 'true',
    }))
  const output = buildCandidateTraversalFromAuthorNodeIntake({ records: pendingRows })
  const result = authorAxis(output, '0001', 'P')
  assert.equal(result.status, 'AUTHOR_DECISION_PENDING')
  assert.equal(result.pendingAuthorDecision, true)
  assert.equal(result.leafCandidate, null)
  assertAuthorOutputLocks(output)
}

// 6. author-node-intake-adapter ENFORCE + correct metadata reaches candidate-only traversal.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      record({ intakeId: 'A-OK-001', eventId: 'A-OK', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' }),
      record({ intakeId: 'A-OK-002', eventId: 'A-OK', axis: 'A', nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' }),
      record({ intakeId: 'A-OK-003', eventId: 'A-OK', axis: 'A', nodeId: 'A_CORRECT', answerValue: 'SIM' }),
    ],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'maintenance-copterline' },
    axisMomentRefs: { A: 'seq:3' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = authorAxis(output, 'A-OK', 'A')
  assert.equal(result.status, 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED')
  assert.equal(result.leafCandidate?.candidateOnlyLeafCode, 'A-A')
  assert.equal(result.approvedEscapePointScopeStatus, 'ENFORCEMENT_REQUESTED')
  assert.deepEqual(result.integrationFutureBlockers, [])
  assertAuthorOutputLocks(output)
}

// 7. author-node-intake-adapter ENFORCE + agent migration blocks with EP-B01.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [record({ intakeId: 'A-B01-001', eventId: 'A-B01', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' })],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'flight-crew' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = authorAxis(output, 'A-B01', 'A')
  assert.equal(result.status, 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION')
  assert.ok(result.blockingIssues.join(' ').includes('EP-B01_AGENT_MIGRATION'))
  assert.equal(result.leafCandidate, null)
  assertAuthorOutputLocks(output)
}

// 8. author-node-intake-adapter ENFORCE + consequence-as-basis blocks with EP-B03.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [record({ intakeId: 'A-B03-001', eventId: 'A-B03', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' })],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'maintenance-copterline' },
    axisEvidenceRefs: { A: ['pilots could not recover after the uncommanded extension (consequence)'] },
    proposedCodes: { A: 'A-A' },
  })
  const result = authorAxis(output, 'A-B03', 'A')
  assert.ok(result.blockingIssues.join(' ').includes('EP-B03_CONSEQUENCE_AS_BASIS'))
  assert.equal(result.leafCandidate, null)
  assertAuthorOutputLocks(output)
}

// 9. author-node-intake-adapter ENFORCE + A-D forbidden blocks with EP-B04.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      record({ intakeId: 'A-B04-001', eventId: 'A-B04', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' }),
      record({ intakeId: 'A-B04-002', eventId: 'A-B04', axis: 'A', nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' }),
      record({ intakeId: 'A-B04-003', eventId: 'A-B04', axis: 'A', nodeId: 'A_CORRECT', answerValue: 'NÃO' }),
      record({ intakeId: 'A-B04-004', eventId: 'A-B04', axis: 'A', nodeId: 'A_CAPABILITY', answerValue: 'NÃO_INABILIDADE' }),
    ],
    approvedEscapePointScope: scope({ escapePointAnchor: discreteAnchor({ agentKind: 'maintenance_or_org' }) }),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { A: 'maintenance-copterline' },
    axisEvidenceRefs: { A: ['ev-maint-1'] },
    proposedCodes: { A: 'A-D' },
  })
  const result = authorAxis(output, 'A-B04', 'A')
  assert.ok(result.blockingIssues.join(' ').includes('EP-B04_FORBIDDEN_CODE_FOR_AGENT'))
  assert.equal(result.leafCandidate, null)
  assertAuthorOutputLocks(output)
}

// 10. unknown authorDecision remains blocked with UNKNOWN_AUTHOR_DECISION_VALUE.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...record({ intakeId: 'A-UNK-001', eventId: 'A-UNK', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        authorDecision: 'APPROVE' as AuthorNodeIntakeRecord['authorDecision'],
      },
    ],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
  })
  const result = authorAxis(output, 'A-UNK', 'P')
  assert.equal(result.status, 'AXIS_INPUT_INVALID')
  assert.ok(result.blockingIssues.includes('UNKNOWN_AUTHOR_DECISION_VALUE:APPROVE'))
  assertAuthorOutputLocks(output)
}

// 11. question mismatch remains blocked with CANONICAL_QUESTION_MISMATCH.
{
  const output = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...record({ intakeId: 'A-QM-001', eventId: 'A-QM', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        exactQuestionTextPt: 'Pergunta divergente de teste.',
      },
    ],
  })
  const result = authorAxis(output, 'A-QM', 'P')
  assert.equal(result.status, 'AXIS_INPUT_INVALID')
  assert.ok(result.blockingIssues.join(' ').includes('CANONICAL_QUESTION_MISMATCH'))
  assertAuthorOutputLocks(output)
}

// 12. O-E remains blocked/non-active.
{
  const output = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({ decisionId: 'C-OE-001', eventId: 'C-OE', axis: 'O', nodeId: 'O_ROOT', answerValue: 'START' }),
      decision({ decisionId: 'C-OE-002', eventId: 'C-OE', axis: 'O', nodeId: 'O_RULES', answerValue: 'O-E' }),
    ],
    approvedEscapePointScope: scope(),
    enforcementMode: 'ENFORCE',
    axisAgentRefs: { O: 'maintenance-copterline' },
    axisEvidenceRefs: { O: ['ev-maint-1'] },
    proposedCodes: { O: 'O-E' as CanonicalSeraLeafCode },
  })
  const result = canonicalAxis(output, 'O')
  assert.equal(result.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')
  assert.equal(result.leafCandidate, null)
  assertCandidateOnlyLocks(result as unknown as Record<string, unknown>, 'canonical O-E')
}

console.log('escape-point-adapter-wiring-trial-001: OK')
