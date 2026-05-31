import assert from 'node:assert/strict'
import { buildReleasedCodeTraceability } from '../../frontend/src/lib/sera-vnext/code-traceability'
import { derivePreconditionsFromReleasedCodes } from '../../frontend/src/lib/sera-vnext/preconditions'
import { validateReleasedCodeSemanticConsistency } from '../../frontend/src/lib/sera-vnext/semantic-consistency'
import type {
  CodeReleaseGateResult,
  HumanValidatedAxisClassification,
  PoaAxis,
  PreconditionsFromReleasedCodesResult,
  ReleasedCodeSemanticConsistencyResult,
  ReleasedCodeTraceabilityResult,
  SemanticConsistencyGateResult,
  SeraVNextResult,
} from '../../frontend/src/lib/sera-vnext/types'

const OUTPUT_LOCKS = ['CLASSIFIED', 'finalConclusion', 'HFACS', 'Risk/ERC', 'ARMS/ERC']

function createBaseResult(inputId: string): SeraVNextResult {
  return {
    inputId,
    poaClassification: {
      perception: { axis: 'perception', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
      objective: { axis: 'objective', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
      action: { axis: 'action', selectedCode: 'UNRESOLVED', status: 'REVIEW_REQUIRED' },
    },
  } as unknown as SeraVNextResult
}

function release(axis: PoaAxis, code: string, overrides: Partial<HumanValidatedAxisClassification> = {}): HumanValidatedAxisClassification {
  return {
    axis,
    releasedCode: code,
    source: 'HUMAN_REVIEW',
    reviewerRationale: `Rationale for ${axis}/${code}`,
    evidenceReferences: [`Evidence for ${axis}/${code}`],
    acceptedUncertainties: [],
    waiverApplied: false,
    guardrailAcknowledgements: ['baseline acknowledgement'],
    releaseStatus: 'RELEASED_BY_HUMAN_REVIEW',
    releaseBlockingIssues: [],
    auditTrace: [`trace:${axis}:${code}`],
    ...overrides,
  }
}

function gate(inputId: string, axisReleases: HumanValidatedAxisClassification[], overrides: Partial<CodeReleaseGateResult> = {}): CodeReleaseGateResult {
  return {
    inputId,
    gateStatus: axisReleases.every((item) => item.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW')
      ? 'RELEASE_READY_FOR_CAUSAL_CORE'
      : 'RELEASE_BLOCKED',
    axisReleases,
    globalBlockingIssues: [],
    outputLocks: [...OUTPUT_LOCKS],
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
    ...overrides,
  }
}

function semanticAxis(result: SemanticConsistencyGateResult, axis: PoaAxis): ReleasedCodeSemanticConsistencyResult {
  const found = result.axisResults.find((item) => item.axis === axis)
  assert.ok(found, `Expected semantic axis result for ${axis}`)
  return found as ReleasedCodeSemanticConsistencyResult
}

function traceAxis(result: ReleasedCodeTraceabilityResult, axis: PoaAxis) {
  const found = result.traces.find((item) => item.axis === axis)
  assert.ok(found, `Expected traceability axis result for ${axis}`)
  return found
}

function preconditionAxis(result: PreconditionsFromReleasedCodesResult, axis: PoaAxis) {
  const found = result.candidates.find((item) => item.sourceAxis === axis)
  assert.ok(found, `Expected precondition candidate for ${axis}`)
  return found
}

function runSemantic(base: SeraVNextResult, inputId: string, axisReleases: HumanValidatedAxisClassification[]): SemanticConsistencyGateResult {
  return validateReleasedCodeSemanticConsistency({
    codeReleaseGateResult: gate(inputId, axisReleases),
    baseResult: base,
  })
}

async function main() {
  const base = createBaseResult('ADV-SET-2-BASE')

  // ADV-2-001
  const semantic001 = runSemantic(base, 'ADV-2-001', [
    release('perception', 'P-G', {
      evidenceReferences: ['weather degraded', 'warning did not trigger'],
      reviewerRationale: 'Perception failure inferred from weather/warning context.',
      guardrailAcknowledgements: ['perception reviewed'],
    }),
  ])
  const perception001 = semanticAxis(semantic001, 'perception')
  assert.notEqual(perception001.status, 'SEMANTICALLY_CONSISTENT', 'ADV-2-001: weather/warning-only must not be semantically consistent')

  // ADV-2-002
  const semantic002 = runSemantic(base, 'ADV-2-002', [
    release('action', 'A-D', {
      evidenceReferences: ['cockpit vibration and alarm occurred'],
      reviewerRationale: 'Aircraft state alone used to justify A-D.',
      guardrailAcknowledgements: ['action reviewed'],
    }),
  ])
  assert.equal(semanticAxis(semantic002, 'action').status, 'SEMANTICALLY_BLOCKED', 'ADV-2-002: A-D without physical/motor/ergonomic evidence must be blocked')

  // ADV-2-003
  for (const code of ['O-C', 'O-D'] as const) {
    const semantic003 = runSemantic(base, `ADV-2-003-${code}`, [
      release('objective', code, {
        evidenceReferences: ['operation continued after adverse context'],
        reviewerRationale: 'Continuation in hindsight without intent/rule-awareness support.',
        guardrailAcknowledgements: ['objective reviewed'],
      }),
    ])
    assert.equal(
      semanticAxis(semantic003, 'objective').status,
      'SEMANTICALLY_BLOCKED',
      `ADV-2-003: ${code} without intent/rule-awareness support must be blocked`
    )
  }

  // ADV-2-004
  const gate004aa = gate('ADV-2-004-AA', [
    release('action', 'A-A', {
      evidenceReferences: ['action sequence timing remained coherent'],
      reviewerRationale: 'No specific action failure mechanism observed.',
      guardrailAcknowledgements: ['action sequence timing verified'],
    }),
  ])
  const semantic004aa = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: gate004aa, baseResult: base })
  const trace004aa = buildReleasedCodeTraceability({ codeReleaseGateResult: gate004aa, semanticConsistencyGateResult: semantic004aa, baseResult: base })
  const pre004aa = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: gate004aa,
    semanticConsistencyGateResult: semantic004aa,
    traceabilityResult: trace004aa,
    baseResult: base,
  })
  assert.equal(traceAxis(trace004aa, 'action')?.isNoFailure, true, 'ADV-2-004: A-A must be no-failure')
  assert.equal(preconditionAxis(pre004aa, 'action')?.status, 'BLOCKED', 'ADV-2-004: A-A must not derive action-failure precondition')

  const gate004ac = gate('ADV-2-004-AC', [
    release('action', 'A-C', {
      evidenceReferences: ['action sequence completed but own-result verification failed with clear timing'],
      reviewerRationale: 'Post-action self-feedback/verification failed after execution.',
      guardrailAcknowledgements: ['action sequence timing reviewed'],
    }),
  ])
  const semantic004ac = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: gate004ac, baseResult: base })
  const trace004ac = buildReleasedCodeTraceability({ codeReleaseGateResult: gate004ac, semanticConsistencyGateResult: semantic004ac, baseResult: base })
  assert.equal(traceAxis(trace004ac, 'action')?.isNoFailure, false, 'ADV-2-004: A-C is not no-failure')

  // ADV-2-005
  for (const [code, expected] of [
    ['P-D', true],
    ['P-G', false],
  ] as const) {
    const trace = buildReleasedCodeTraceability({ codeReleaseGateResult: gate(`ADV-2-005-${code}`, [release('perception', code)]), baseResult: base })
    assert.equal(traceAxis(trace, 'perception')?.timePressureExcessive, expected, `ADV-2-005: ${code} timePressureExcessive contract`)
  }

  // ADV-2-006
  for (const [code, expected] of [
    ['A-F', false],
    ['A-I', true],
  ] as const) {
    const trace = buildReleasedCodeTraceability({ codeReleaseGateResult: gate(`ADV-2-006-${code}`, [release('action', code)]), baseResult: base })
    assert.equal(traceAxis(trace, 'action')?.timePressureExcessive, expected, `ADV-2-006: ${code} timePressureExcessive contract`)
  }

  // ADV-2-007
  for (const [code, expected] of [
    ['A-G', false],
    ['A-J', true],
  ] as const) {
    const trace = buildReleasedCodeTraceability({ codeReleaseGateResult: gate(`ADV-2-007-${code}`, [release('action', code)]), baseResult: base })
    assert.equal(traceAxis(trace, 'action')?.timePressureExcessive, expected, `ADV-2-007: ${code} timePressureExcessive contract`)
  }

  // ADV-2-008
  const semantic008ob = runSemantic(base, 'ADV-2-008-OB', [
    release('objective', 'O-B', {
      evidenceReferences: ['decision context indicates repeated shortcut behavior'],
      reviewerRationale: 'Decision context documented for routine objective deviation.',
      guardrailAcknowledgements: ['objective context reviewed'],
    }),
  ])
  assert.notEqual(semanticAxis(semantic008ob, 'objective').status, 'SEMANTICALLY_BLOCKED', 'ADV-2-008: O-B should not be hard-blocked when decision context exists')

  const semantic008oc = runSemantic(base, 'ADV-2-008-OC', [
    release('objective', 'O-C', {
      evidenceReferences: ['decision context without explicit intent/rule-awareness support'],
      reviewerRationale: 'No explicit intent/rule-awareness rationale.',
      guardrailAcknowledgements: ['objective reviewed'],
    }),
  ])
  assert.equal(semanticAxis(semantic008oc, 'objective').status, 'SEMANTICALLY_BLOCKED', 'ADV-2-008: O-C requires intent/rule-awareness semantics')

  // ADV-2-009
  for (const code of ['O-D', 'O-C'] as const) {
    const semantic009 = runSemantic(base, `ADV-2-009-${code}`, [
      release('objective', code, {
        evidenceReferences: ['continuation observed without intent/rule-awareness anchors'],
        reviewerRationale: 'No semantic support for intent/rule-awareness.',
        guardrailAcknowledgements: ['objective reviewed'],
      }),
    ])
    assert.notEqual(semanticAxis(semantic009, 'objective').status, 'SEMANTICALLY_CONSISTENT', `ADV-2-009: ${code} cannot be semantically consistent without semantic support`)
  }

  // ADV-2-010
  const trace010pb = buildReleasedCodeTraceability({ codeReleaseGateResult: gate('ADV-2-010-PB', [release('perception', 'P-B')]), baseResult: base })
  const trace010pc = buildReleasedCodeTraceability({ codeReleaseGateResult: gate('ADV-2-010-PC', [release('perception', 'P-C')]), baseResult: base })
  assert.equal(traceAxis(trace010pb, 'perception')?.hendyCategory, 3, 'ADV-2-010: P-B remains sensory limitation domain')
  assert.equal(traceAxis(trace010pc, 'perception')?.hendyCategory, 4, 'ADV-2-010: P-C remains interpretation/knowledge domain')

  // ADV-2-011
  const trace011ph = buildReleasedCodeTraceability({ codeReleaseGateResult: gate('ADV-2-011-PH', [release('perception', 'P-H')]), baseResult: base })
  const trace011aj = buildReleasedCodeTraceability({ codeReleaseGateResult: gate('ADV-2-011-AJ', [release('action', 'A-J')]), baseResult: base })
  assert.equal(traceAxis(trace011ph, 'perception')?.hendyCategory, 6, 'ADV-2-011: P-H maps to communication/information perception domain')
  assert.equal(traceAxis(trace011ph, 'perception')?.timePressureExcessive, null, 'ADV-2-011: P-H has no canonical time-pressure discriminator')
  assert.equal(traceAxis(trace011aj, 'action')?.hendyCategory, 12, 'ADV-2-011: A-J maps to feedback/communication action domain')
  assert.equal(traceAxis(trace011aj, 'action')?.timePressureExcessive, true, 'ADV-2-011: A-J requires timePressureExcessive=true')

  // ADV-2-012
  const gate012 = gate(
    'ADV-2-012',
    [
      release('perception', 'P-C', {
        evidenceReferences: [],
        reviewerRationale: '',
        releaseStatus: 'RELEASE_BLOCKED',
        releaseBlockingIssues: ['INSUFFICIENT_EVIDENCE'],
      }),
    ],
    { gateStatus: 'RELEASE_BLOCKED', globalBlockingIssues: ['INSUFFICIENT_EVIDENCE'] }
  )
  const semantic012 = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: gate012, baseResult: base })
  const pre012 = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: gate012,
    semanticConsistencyGateResult: semantic012,
    baseResult: base,
  })
  assert.equal(semanticAxis(semantic012, 'perception').status, 'SEMANTICALLY_BLOCKED', 'ADV-2-012: insufficient evidence must block semantic gate')
  assert.equal(preconditionAxis(pre012, 'perception')?.status, 'BLOCKED', 'ADV-2-012: insufficient evidence must block precondition derivation')

  // ADV-2-013
  const gate013 = gate('ADV-2-013', [
    release('objective', 'O-E', {
      evidenceReferences: ['attempt to use non-existent objective code'],
      reviewerRationale: 'O-E forced as active code.',
      guardrailAcknowledgements: ['objective reviewed'],
    }),
  ])
  const semantic013 = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: gate013, baseResult: base })
  const trace013 = buildReleasedCodeTraceability({ codeReleaseGateResult: gate013, semanticConsistencyGateResult: semantic013, baseResult: base })
  const pre013 = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: gate013,
    semanticConsistencyGateResult: semantic013,
    traceabilityResult: trace013,
    baseResult: base,
  })
  assert.equal(traceAxis(trace013, 'objective')?.status, 'NON_EXISTENT_CODE', 'ADV-2-013: O-E must remain NON_EXISTENT_CODE')
  assert.equal(preconditionAxis(pre013, 'objective')?.status, 'BLOCKED', 'ADV-2-013: O-E must never become active precondition candidate')

  // ADV-2-014
  const gate014 = gate('ADV-2-014', [
    release('perception', 'P-H', { evidenceReferences: ['multi-actor communication ambiguity recorded'] }),
    release('objective', 'O-B', { evidenceReferences: ['multi-actor routine objective drift context recorded'] }),
    release('action', 'A-G', { evidenceReferences: ['multi-actor supervision/coordination gap recorded'] }),
  ])
  const semantic014 = validateReleasedCodeSemanticConsistency({ codeReleaseGateResult: gate014, baseResult: base })
  const trace014 = buildReleasedCodeTraceability({ codeReleaseGateResult: gate014, semanticConsistencyGateResult: semantic014, baseResult: base })
  const pre014 = derivePreconditionsFromReleasedCodes({
    codeReleaseGateResult: gate014,
    semanticConsistencyGateResult: semantic014,
    traceabilityResult: trace014,
    baseResult: base,
  })
  assert.equal(trace014.traces.length, gate014.axisReleases.length, 'ADV-2-014: helper must not create multi-actor multi-classification expansion')
  assert.equal(semantic014.downstreamStillLocked, true, 'ADV-2-014: downstream remains locked')
  assert.equal(pre014.downstreamLocked, true, 'ADV-2-014: downstream remains locked in precondition layer')
  assert.equal(pre014.selectedCodesRemainUnresolved, true, 'ADV-2-014: selectedCode must remain unresolved')

  const summary = {
    adv2_001: perception001.status,
    adv2_002: semanticAxis(semantic002, 'action').status,
    adv2_003: 'O-C/O-D blocked without intent/rule-awareness',
    adv2_004: {
      aaNoFailure: traceAxis(trace004aa, 'action')?.isNoFailure,
      acNoFailure: traceAxis(trace004ac, 'action')?.isNoFailure,
    },
    adv2_005_to_007: 'timePressureExcessive contracts checked',
    adv2_008: {
      ob: semanticAxis(semantic008ob, 'objective').status,
      oc: semanticAxis(semantic008oc, 'objective').status,
    },
    adv2_009: 'O-D/O-C prevented from semantic consistency without support',
    adv2_010: 'P-B vs P-C traceability contract documented',
    adv2_011: 'P-H vs A-J traceability/time-pressure contract checked',
    adv2_012: preconditionAxis(pre012, 'perception')?.status,
    adv2_013: traceAxis(trace013, 'objective')?.status,
    adv2_014: {
      semanticGateStatus: semantic014.gateStatus,
      preconditionGateStatus: pre014.gateStatus,
    },
  }

  console.log(JSON.stringify(summary, null, 2))
  console.log('SERA vNext Adversarial Set 2 Contract Trial 001 PASS')
}

main().catch((error) => {
  console.error('SERA vNext Adversarial Set 2 Contract Trial 001 FAIL')
  console.error(error)
  process.exit(1)
})
