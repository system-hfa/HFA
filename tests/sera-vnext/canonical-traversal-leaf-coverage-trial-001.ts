import assert from 'node:assert/strict'
import { assertNoFinalClassification, runCanonicalAxisTraversal } from '../../frontend/src/lib/sera-vnext/canonical-traversal'
import type { CanonicalSeraAxis } from '../../frontend/src/lib/sera-vnext/types'

type AxisPath = {
  axis: CanonicalSeraAxis
  expectedLeaf: string
  answers: Array<{ nodeId: string; answerValue: string }>
}

const COVERAGE_PATHS: AxisPath[] = [
  // Perception coverage targets.
  {
    axis: 'P',
    expectedLeaf: 'P-A',
    answers: [
      { nodeId: 'P_ROOT', answerValue: 'START' },
      { nodeId: 'P_ASSESSMENT', answerValue: 'SIM' },
    ],
  },
  {
    axis: 'P',
    expectedLeaf: 'P-D',
    answers: [
      { nodeId: 'P_ROOT', answerValue: 'START' },
      { nodeId: 'P_ASSESSMENT', answerValue: 'NÃO' },
      { nodeId: 'P_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'P_TIME_PRESSURE', answerValue: 'SIM_ATENCAO' },
    ],
  },
  {
    axis: 'P',
    expectedLeaf: 'P-E',
    answers: [
      { nodeId: 'P_ROOT', answerValue: 'START' },
      { nodeId: 'P_ASSESSMENT', answerValue: 'NÃO' },
      { nodeId: 'P_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'P_TIME_PRESSURE', answerValue: 'SIM_GERENCIAMENTO' },
    ],
  },
  {
    axis: 'P',
    expectedLeaf: 'P-G',
    answers: [
      { nodeId: 'P_ROOT', answerValue: 'START' },
      { nodeId: 'P_ASSESSMENT', answerValue: 'NÃO' },
      { nodeId: 'P_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'P_TIME_PRESSURE', answerValue: 'NÃO' },
      { nodeId: 'P_INFORMATION_AMBIGUOUS', answerValue: 'NÃO' },
      { nodeId: 'P_INFORMATION_AVAILABLE', answerValue: 'SIM' },
    ],
  },
  {
    axis: 'P',
    expectedLeaf: 'P-H',
    answers: [
      { nodeId: 'P_ROOT', answerValue: 'START' },
      { nodeId: 'P_ASSESSMENT', answerValue: 'NÃO' },
      { nodeId: 'P_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'P_TIME_PRESSURE', answerValue: 'NÃO' },
      { nodeId: 'P_INFORMATION_AMBIGUOUS', answerValue: 'NÃO' },
      { nodeId: 'P_INFORMATION_AVAILABLE', answerValue: 'NÃO' },
    ],
  },
  // Objective coverage targets.
  {
    axis: 'O',
    expectedLeaf: 'O-A',
    answers: [
      { nodeId: 'O_ROOT', answerValue: 'START' },
      { nodeId: 'O_RULES', answerValue: 'SIM' },
      { nodeId: 'O_MANAGED_RISK', answerValue: 'SIM' },
    ],
  },
  {
    axis: 'O',
    expectedLeaf: 'O-B',
    answers: [
      { nodeId: 'O_ROOT', answerValue: 'START' },
      { nodeId: 'O_RULES', answerValue: 'NÃO' },
      { nodeId: 'O_ROUTINE', answerValue: 'SIM' },
    ],
  },
  {
    axis: 'O',
    expectedLeaf: 'O-C',
    answers: [
      { nodeId: 'O_ROOT', answerValue: 'START' },
      { nodeId: 'O_RULES', answerValue: 'NÃO' },
      { nodeId: 'O_ROUTINE', answerValue: 'NÃO' },
    ],
  },
  {
    axis: 'O',
    expectedLeaf: 'O-D',
    answers: [
      { nodeId: 'O_ROOT', answerValue: 'START' },
      { nodeId: 'O_RULES', answerValue: 'SIM' },
      { nodeId: 'O_MANAGED_RISK', answerValue: 'NÃO' },
    ],
  },
  // Action coverage targets.
  {
    axis: 'A',
    expectedLeaf: 'A-A',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' },
      { nodeId: 'A_CORRECT', answerValue: 'SIM' },
    ],
  },
  {
    axis: 'A',
    expectedLeaf: 'A-C',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'NÃO_DESLIZE_LAPSO_ERRO' },
    ],
  },
  {
    axis: 'A',
    expectedLeaf: 'A-D',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' },
      { nodeId: 'A_CORRECT', answerValue: 'NÃO' },
      { nodeId: 'A_CAPABILITY', answerValue: 'NÃO_INABILIDADE' },
    ],
  },
  {
    axis: 'A',
    expectedLeaf: 'A-F',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' },
      { nodeId: 'A_CORRECT', answerValue: 'NÃO' },
      { nodeId: 'A_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'A_TIME_PRESSURE', answerValue: 'NÃO_SELECAO' },
    ],
  },
  {
    axis: 'A',
    expectedLeaf: 'A-J',
    answers: [
      { nodeId: 'A_ROOT', answerValue: 'START' },
      { nodeId: 'A_IMPLEMENTED', answerValue: 'SIM' },
      { nodeId: 'A_CORRECT', answerValue: 'NÃO' },
      { nodeId: 'A_CAPABILITY', answerValue: 'SIM' },
      { nodeId: 'A_TIME_PRESSURE', answerValue: 'SIM_FEEDBACK' },
    ],
  },
]

function assertCandidateOnlyTraversalResult(path: AxisPath) {
  const result = runCanonicalAxisTraversal({
    axis: path.axis,
    answers: path.answers.map((answer) => ({
      nodeId: answer.nodeId,
      answerValue: answer.answerValue,
      answerSource: 'TEST_FIXTURE',
    })),
  })

  assert.equal(
    result.status,
    'LEAF_REACHED_NOT_CLASSIFIED',
    `Expected LEAF_REACHED_NOT_CLASSIFIED for ${path.axis}/${path.expectedLeaf}.`
  )

  assert.equal(
    result.leafCandidate?.candidateOnlyLeafCode,
    path.expectedLeaf,
    `Unexpected leaf for ${path.axis} path.`
  )

  assert.equal(result.leafCandidate?.candidateOnly, true)
  assert.equal(result.leafCandidate?.classificationAllowed, false)
  assert.equal(result.leafCandidate?.notFinalClassification, true)
  assert.equal(result.leafCandidate?.selectedCodeAllowed, false)
  assert.equal(result.leafCandidate?.releasedCodeAllowed, false)

  assert.equal(result.selectedCodeAllowed, false)
  assert.equal(result.releasedCodeAllowed, false)
  assert.equal(result.notFinalClassification, true)
  assert.equal('selectedCode' in (result as unknown as Record<string, unknown>), false)
  assert.equal('releasedCode' in (result as unknown as Record<string, unknown>), false)
  assert.notEqual(result.status, 'CLASSIFIED')

  assertNoFinalClassification(result)
}

function main() {
  for (const path of COVERAGE_PATHS) {
    assertCandidateOnlyTraversalResult(path)
  }

  console.log('PASS canonical-traversal-leaf-coverage-trial-001')
}

main()
