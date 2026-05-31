import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildCandidateTraversalFromAuthorNodeIntake,
  type AuthorNodeIntakeAxisResult,
  type AuthorNodeIntakeRecord,
} from '../../frontend/src/lib/sera-vnext/author-node-intake-adapter'
import { getCanonicalTraversalNode } from '../../frontend/src/lib/sera-vnext/canonical-traversal'
import type { CanonicalSeraAxis } from '../../frontend/src/lib/sera-vnext/types'

type CsvRow = Record<string, string>

function parseCsvLine(line: string): string[] {
  const out: string[] = []
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
      out.push(current)
      current = ''
      continue
    }
    current += ch
  }
  out.push(current)
  return out
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0)
  const header = parseCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const row: CsvRow = {}
    const values = parseCsvLine(line)
    for (let i = 0; i < header.length; i += 1) {
      row[header[i]] = values[i] ?? ''
    }
    return row
  })
}

function mkAccepted(input: {
  intakeId: string
  eventId: string
  axis: CanonicalSeraAxis
  nodeId: string
  answerValue: string
}): AuthorNodeIntakeRecord {
  return {
    intakeId: input.intakeId,
    eventId: input.eventId,
    eventName: `DIAG-${input.eventId}`,
    axis: input.axis,
    nodeId: input.nodeId,
    exactQuestionTextPt: getCanonicalTraversalNode(input.nodeId).exactQuestionTextPt,
    authorDecision: 'ACCEPT_NODE_ANSWER',
    answerValue: input.answerValue,
    authorDecisionRationale: 'Diagnostic trial accepted decision.',
    evidenceAnchor: `DIAG-EVID-${input.intakeId}`,
    notFinalClassification: true,
    poaClosureAllowed: false,
  }
}

function axisByEvent(
  output: ReturnType<typeof buildCandidateTraversalFromAuthorNodeIntake>,
  eventId: string,
  axis: CanonicalSeraAxis
): AuthorNodeIntakeAxisResult {
  const event = output.events.find((item) => item.eventId === eventId)
  assert.ok(event, `Missing event ${eventId}`)
  const axisResult = event.axisResults.find((item) => item.axis === axis)
  assert.ok(axisResult, `Missing axis ${axis} for event ${eventId}`)
  return axisResult
}

function assertCandidateOnlyLocks(record: Record<string, unknown>): void {
  assert.equal(record.selectedCodeAllowed, false)
  assert.equal(record.releasedCodeAllowed, false)
  assert.equal(record.poaClosureAllowed, false)
  assert.equal(record.classificationAllowed, false)
  assert.equal(record.downstreamAllowed, false)
  assert.equal(record.notFinalClassification, true)
  assert.equal('selectedCode' in record, false)
  assert.equal('releasedCode' in record, false)
  assert.notEqual(record.status, 'CLASSIFIED')
}

function main() {
  // 1) A4R187 real pending returns AUTHOR_DECISION_PENDING.
  const csv = parseCsv(
    fs.readFileSync(
      path.resolve('docs/sera-vnext/author-node-decision-intake-a4r187/SERA_AUTHOR_NODE_DECISION_INTAKE_MATRIX_A4R187_v0.2.0.csv'),
      'utf8'
    )
  )
  const pendingRows: AuthorNodeIntakeRecord[] = csv
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
  const pendingOutput = buildCandidateTraversalFromAuthorNodeIntake({ records: pendingRows })
  const pendingAxis = axisByEvent(pendingOutput, '0001', 'P')
  assert.equal(pendingAxis.status, 'AUTHOR_DECISION_PENDING')

  // 2) Unknown authorDecision returns auditable blocking issue.
  const unknownOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-UNK-001', eventId: 'DIAG-UNK', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        authorDecision: 'APPROVE' as AuthorNodeIntakeRecord['authorDecision'],
      },
    ],
  })
  const unknownAxis = axisByEvent(unknownOutput, 'DIAG-UNK', 'P')
  assert.equal(unknownAxis.status, 'AXIS_INPUT_INVALID')
  assert.ok(unknownAxis.blockingIssues.includes('UNKNOWN_AUTHOR_DECISION_VALUE:APPROVE'))

  // 3) Invalid node returns TRAVERSAL_BLOCKED_BY_INVALID_NODE.
  const invalidNodeOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-INVNODE-001', eventId: 'DIAG-INVNODE', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        nodeId: 'P_UNKNOWN_NODE',
        exactQuestionTextPt: 'Invalid node',
      },
    ],
  })
  const invalidNodeAxis = axisByEvent(invalidNodeOutput, 'DIAG-INVNODE', 'P')
  assert.equal(invalidNodeAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_NODE')

  // 4) Invalid answer returns TRAVERSAL_BLOCKED_BY_INVALID_ANSWER.
  const invalidAnswerOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-INVANS-001', eventId: 'DIAG-INVANS', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        answerValue: 'MAYBE',
      },
    ],
  })
  const invalidAnswerAxis = axisByEvent(invalidAnswerOutput, 'DIAG-INVANS', 'P')
  assert.equal(invalidAnswerAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')

  // 5) Question mismatch returns explicit blocking issue.
  const mismatchOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-QM-001', eventId: 'DIAG-QM', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
        exactQuestionTextPt: 'Pergunta divergente.',
      },
    ],
  })
  const mismatchAxis = axisByEvent(mismatchOutput, 'DIAG-QM', 'P')
  assert.ok(mismatchAxis.blockingIssues.some((item) => item.includes('CANONICAL_QUESTION_MISMATCH')))

  // 6) Branch blocked returns author-decision block.
  const branchBlockedOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      mkAccepted({ intakeId: 'DIAG-BB-001', eventId: 'DIAG-BB', axis: 'O', nodeId: 'O_ROOT', answerValue: 'START' }),
      {
        ...mkAccepted({ intakeId: 'DIAG-BB-002', eventId: 'DIAG-BB', axis: 'O', nodeId: 'O_RULES', answerValue: 'SIM' }),
        authorDecision: 'BRANCH_BLOCKED',
      },
    ],
  })
  const branchBlockedAxis = axisByEvent(branchBlockedOutput, 'DIAG-BB', 'O')
  assert.equal(branchBlockedAxis.status, 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION')

  // 7) Axis traversal blocked returns author-decision block.
  const axisBlockedOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-AB-001', eventId: 'DIAG-AB', axis: 'A', nodeId: 'A_ROOT', answerValue: 'START' }),
        authorDecision: 'AXIS_TRAVERSAL_BLOCKED',
      },
    ],
  })
  const axisBlockedAxis = axisByEvent(axisBlockedOutput, 'DIAG-AB', 'A')
  assert.equal(axisBlockedAxis.status, 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION')

  // 8) Traversal extension required.
  const extensionOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      mkAccepted({ intakeId: 'DIAG-EXT-001', eventId: 'DIAG-EXT', axis: 'O', nodeId: 'O_ROOT', answerValue: 'START' }),
      mkAccepted({ intakeId: 'DIAG-EXT-002', eventId: 'DIAG-EXT', axis: 'O', nodeId: 'O_RULES', answerValue: 'SIM' }),
    ],
  })
  const extensionAxis = axisByEvent(extensionOutput, 'DIAG-EXT', 'O')
  assert.equal(extensionAxis.status, 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED')

  // 9) Leaf reached and 10) leaf remains candidate-only.
  const leafOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      mkAccepted({ intakeId: 'DIAG-LEAF-001', eventId: 'DIAG-LEAF', axis: 'P', nodeId: 'P_ROOT', answerValue: 'START' }),
      mkAccepted({ intakeId: 'DIAG-LEAF-002', eventId: 'DIAG-LEAF', axis: 'P', nodeId: 'P_ASSESSMENT', answerValue: 'SIM' }),
    ],
  })
  const leafAxis = axisByEvent(leafOutput, 'DIAG-LEAF', 'P')
  assert.equal(leafAxis.status, 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED')
  assert.equal(leafAxis.leafCandidate?.candidateOnlyLeafCode, 'P-A')
  assert.equal('selectedCode' in (leafAxis as unknown as Record<string, unknown>), false)
  assert.equal('releasedCode' in (leafAxis as unknown as Record<string, unknown>), false)

  // 11) O-E injection blocked.
  const oEOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      mkAccepted({ intakeId: 'DIAG-OE-001', eventId: 'DIAG-OE', axis: 'O', nodeId: 'O_ROOT', answerValue: 'START' }),
      {
        ...mkAccepted({ intakeId: 'DIAG-OE-002', eventId: 'DIAG-OE', axis: 'O', nodeId: 'O_RULES', answerValue: 'SIM' }),
        answerValue: 'O-E',
      },
    ],
  })
  const oEAxis = axisByEvent(oEOutput, 'DIAG-OE', 'O')
  assert.equal(oEAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')

  // 12) Cross-axis node injection blocked.
  const crossAxisOutput = buildCandidateTraversalFromAuthorNodeIntake({
    records: [
      {
        ...mkAccepted({ intakeId: 'DIAG-CA-001', eventId: 'DIAG-CA', axis: 'O', nodeId: 'O_ROOT', answerValue: 'START' }),
        nodeId: 'P_ROOT',
        exactQuestionTextPt: getCanonicalTraversalNode('P_ROOT').exactQuestionTextPt,
      },
    ],
  })
  const crossAxis = axisByEvent(crossAxisOutput, 'DIAG-CA', 'O')
  assert.equal(crossAxis.status, 'AXIS_INPUT_INVALID')

  // 13) Candidate-only locks on all tested outputs.
  for (const output of [
    pendingOutput,
    unknownOutput,
    invalidNodeOutput,
    invalidAnswerOutput,
    mismatchOutput,
    branchBlockedOutput,
    axisBlockedOutput,
    extensionOutput,
    leafOutput,
    oEOutput,
    crossAxisOutput,
  ]) {
    assertCandidateOnlyLocks(output as unknown as Record<string, unknown>)
    for (const event of output.events) {
      assertCandidateOnlyLocks(event as unknown as Record<string, unknown>)
      for (const axis of event.axisResults) {
        assertCandidateOnlyLocks(axis as unknown as Record<string, unknown>)
      }
    }
  }

  // 14) Escape point scope stays passive trace-only.
  for (const output of [leafOutput, extensionOutput, unknownOutput]) {
    assert.equal(output.approvedEscapePointScopeStatus, 'PASSIVE_NOT_ENFORCED')
    assert.ok(
      output.integrationFutureBlockers.some((item) => item.includes('PASSIVE_NOT_ENFORCED')),
      'Expected passive-not-enforced blocker in root output.'
    )
    for (const event of output.events) {
      assert.equal(event.approvedEscapePointScopeStatus, 'PASSIVE_NOT_ENFORCED')
      for (const axis of event.axisResults) {
        assert.equal(axis.approvedEscapePointScopeStatus, 'PASSIVE_NOT_ENFORCED')
        assert.ok(
          axis.auditTrace.some((item) => item.includes('approvedEscapePointScope:PASSIVE_NOT_ENFORCED')),
          'Expected passive escape-point trace marker in axis auditTrace.'
        )
      }
    }
  }

  // 15) nextRequiredAction coherence checks.
  assert.ok(pendingAxis.nextRequiredAction.includes('Provide missing authorDecision values'))
  assert.ok(unknownAxis.nextRequiredAction.includes('Replace unknown authorDecision values'))
  assert.ok(invalidNodeAxis.nextRequiredAction.includes('Correct nodeId'))
  assert.ok(invalidAnswerAxis.nextRequiredAction.includes('Correct answerValue'))
  assert.ok(extensionAxis.nextRequiredAction.includes('Provide next canonical node decision'))
  assert.ok(leafAxis.nextRequiredAction.includes('Leaf reached in candidate-only mode'))

  console.log('PASS author-node-intake-diagnostics-trial-001')
}

main()
