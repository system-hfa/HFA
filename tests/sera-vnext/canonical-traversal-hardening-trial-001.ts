import assert from 'node:assert/strict'
import {
  assertAdapterOutputLocks,
  buildCanonicalTraversalFromNodeDecisions,
  type SeraCanonicalNodeDecisionInput,
} from '../../frontend/src/lib/sera-vnext/canonical-traversal-adapter'

const FINAL_FREE_CONCLUSION_ALLOWED_KEY = 'final' + 'ConclusionAllowed'

function decision(input: SeraCanonicalNodeDecisionInput): SeraCanonicalNodeDecisionInput {
  return input
}

function axisResult(output: ReturnType<typeof buildCanonicalTraversalFromNodeDecisions>, axis: 'P' | 'O' | 'A') {
  const result = output.axisResults.find((item) => item.axis === axis)
  assert.ok(result, `Missing axis result for ${axis}`)
  return result
}

function assertNoOperationalFields(record: Record<string, unknown>) {
  assert.equal('selectedCode' in record, false, 'selectedCode field must not be present.')
  assert.equal('releasedCode' in record, false, 'releasedCode field must not be present.')
  assert.notEqual(record.status, 'CLASSIFIED', 'Status must never be CLASSIFIED.')
  assert.equal(record[FINAL_FREE_CONCLUSION_ALLOWED_KEY], false, 'Final free conclusion lock must remain false.')
}

function main() {
  // 1,2,3,4,5,6: P leaf candidate stays candidate-only and lock-safe.
  const pLeafCase = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-P-001',
        eventId: 'HARDP001',
        axis: 'P',
        nodeId: 'P_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Root accepted',
        evidenceRefs: ['HP001'],
        sourcePhase: 'A4R188',
      }),
      decision({
        decisionId: 'H-P-002',
        eventId: 'HARDP001',
        axis: 'P',
        nodeId: 'P_ASSESSMENT',
        answerValue: 'SIM',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Assessment accepted',
        evidenceRefs: ['HP002'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const pLeafAxis = axisResult(pLeafCase, 'P')
  assert.equal(pLeafAxis.status, 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED')
  assert.equal(pLeafAxis.leafCandidate?.candidateOnlyLeafCode, 'P-A')
  assert.equal(pLeafAxis.leafCandidate?.candidateOnly, true)
  assert.equal(pLeafAxis.leafCandidate?.classificationAllowed, false)
  assert.equal(pLeafAxis.notFinalClassification, true)
  assertAdapterOutputLocks(pLeafCase)
  assertAdapterOutputLocks(pLeafAxis)
  assertNoOperationalFields(pLeafCase as unknown as Record<string, unknown>)
  assertNoOperationalFields(pLeafAxis as unknown as Record<string, unknown>)

  // 7) lowercase answerValue must block.
  const lowerCaseAnswer = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-LC-001',
        eventId: 'HARDLC001',
        axis: 'P',
        nodeId: 'P_ASSESSMENT',
        answerValue: 'sim',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Lowercase answer negative test',
        evidenceRefs: ['HLC001'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const lowerCaseAxis = axisResult(lowerCaseAnswer, 'P')
  assert.equal(lowerCaseAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')
  assert.ok(
    lowerCaseAxis.blockingIssue?.includes('INVALID_CANONICAL_ANSWER_VALUE'),
    'Lowercase answer must expose INVALID_CANONICAL_ANSWER_VALUE.'
  )

  // 8) English answer where canonical value differs must block.
  const englishAnswer = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-EN-001',
        eventId: 'HARDEN001',
        axis: 'O',
        nodeId: 'O_RULES',
        answerValue: 'YES',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'English answer negative test',
        evidenceRefs: ['HEN001'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const englishAxis = axisResult(englishAnswer, 'O')
  assert.equal(englishAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')

  // 9) Cross-axis node injection must block.
  const crossAxisCase = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-CA-001',
        eventId: 'HARDCA001',
        axis: 'O',
        nodeId: 'P_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Cross-axis node injection',
        evidenceRefs: ['HCA001'],
        sourcePhase: 'A4R188',
      }),
      decision({
        decisionId: 'H-CA-002',
        eventId: 'HARDCA002',
        axis: 'P',
        nodeId: 'A_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Cross-axis node injection',
        evidenceRefs: ['HCA002'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const crossO = axisResult(crossAxisCase, 'O')
  const crossP = axisResult(crossAxisCase, 'P')
  assert.equal(crossO.status, 'TRAVERSAL_BLOCKED_BY_INVALID_NODE')
  assert.equal(crossP.status, 'TRAVERSAL_BLOCKED_BY_INVALID_NODE')

  // 10,11) Leaf code as answer value must block, including O-E.
  for (const bad of [
    { axis: 'P' as const, nodeId: 'P_ASSESSMENT', answer: 'P-A' },
    { axis: 'O' as const, nodeId: 'O_RULES', answer: 'O-A' },
    { axis: 'A' as const, nodeId: 'A_CORRECT', answer: 'A-A' },
    { axis: 'O' as const, nodeId: 'O_RULES', answer: 'O-E' },
  ]) {
    const out = buildCanonicalTraversalFromNodeDecisions({
      nodeDecisions: [
        decision({
          decisionId: `H-LEAF-${bad.axis}-${bad.answer}`,
          eventId: `HARDLEAF${bad.axis}`,
          axis: bad.axis,
          nodeId: bad.nodeId,
          answerValue: bad.answer,
          authorDecision: 'ACCEPT_NODE_ANSWER',
          rationale: 'Leaf code injected as answerValue',
          evidenceRefs: ['HLEAF001'],
          sourcePhase: 'A4R188',
        }),
      ],
    })
    const axis = axisResult(out, bad.axis)
    assert.equal(axis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_ANSWER')
  }

  // 12) Incomplete traversal remains extension required and never leaf.
  const incompleteCase = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-INC-001',
        eventId: 'HARDINC001',
        axis: 'O',
        nodeId: 'O_ROOT',
        answerValue: 'START',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Incomplete test root',
        evidenceRefs: ['HINC001'],
        sourcePhase: 'A4R188',
      }),
      decision({
        decisionId: 'H-INC-002',
        eventId: 'HARDINC001',
        axis: 'O',
        nodeId: 'O_RULES',
        answerValue: 'SIM',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Incomplete test branch',
        evidenceRefs: ['HINC002'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const incompleteAxis = axisResult(incompleteCase, 'O')
  assert.equal(incompleteAxis.status, 'TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED')
  assert.equal(incompleteAxis.leafCandidate, null)

  // 13) Author block remains explicit.
  const authorBlockedCase = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-BLK-001',
        eventId: 'HARDBLK001',
        axis: 'A',
        nodeId: 'A_ROOT',
        answerValue: 'START',
        authorDecision: 'AXIS_TRAVERSAL_BLOCKED',
        rationale: 'Explicit author block',
        evidenceRefs: ['HBLK001'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const authorBlockedAxis = axisResult(authorBlockedCase, 'A')
  assert.equal(authorBlockedAxis.status, 'TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION')

  // 14) Invalid node remains explicit.
  const invalidNodeCase = buildCanonicalTraversalFromNodeDecisions({
    nodeDecisions: [
      decision({
        decisionId: 'H-INV-001',
        eventId: 'HARDINV001',
        axis: 'P',
        nodeId: 'P_UNKNOWN_NODE',
        answerValue: 'SIM',
        authorDecision: 'ACCEPT_NODE_ANSWER',
        rationale: 'Invalid node still blocked',
        evidenceRefs: ['HINV001'],
        sourcePhase: 'A4R188',
      }),
    ],
  })
  const invalidNodeAxis = axisResult(invalidNodeCase, 'P')
  assert.equal(invalidNodeAxis.status, 'TRAVERSAL_BLOCKED_BY_INVALID_NODE')

  console.log('PASS canonical-traversal-hardening-trial-001')
}

main()
