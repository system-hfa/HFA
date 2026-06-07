import assert from 'node:assert/strict'
import { buildReviewerOutput } from '../../frontend/src/lib/sera-vnext-product/reviewer-output'
import type { SeraVNextEngineOutput } from '../../frontend/src/lib/sera-vnext/engine-contract'

const TRIAL_ID = 'reviewer-output-contract-trial-001'
const checks: Array<{ name: string; status: 'PASS' | 'FAIL' | 'SKIP'; detail: string }> = []

function check(name: string, fn: () => void) {
  try {
    fn()
    checks.push({ name, status: 'PASS', detail: 'ok' })
  } catch (err) {
    checks.push({ name, status: 'FAIL', detail: String(err) })
  }
}

function makeEngineOutput(overrides: Partial<SeraVNextEngineOutput> = {}): SeraVNextEngineOutput {
  const base: SeraVNextEngineOutput = {
    engineVersion: 'sera-vnext-v0.2.0',
    methodologyVersion: 'SERA_PT_CANONICAL_v1.0',
    baselineId: 'SERA_VNEXT_BASELINE_V0',
    fixtureSetId: 'SERA_VNEXT_FIXTURE_SET_V0',
    mode: 'CANDIDATE_ONLY',
    factualExtraction: { facts: [], timeline: [], evidence: [], explicitlyUnsupportedClaims: [] },
    safeOperationModel: { expectedSafeState: null, expectedSafeAction: null, evidence: [], confidence: 'LOW' },
    escapePoint: {
      status: 'CANDIDATE',
      statement: 'O copiloto deixou de monitorar a altitude durante a aproximação final.',
      earliestCandidate: null,
      latestCandidate: null,
      directActor: 'COPILOTO',
      supportingEvidence: ['FDR mostra desvio de altitude não anunciado', 'ATC emitiu alerta de GPWS'],
      counterEvidence: ['Checklist foi executado parcialmente'],
      excludedPostEscapeEvidence: [],
      confidence: 'MEDIUM',
    },
    unsafeState: { statement: null, evidence: [] },
    unsafeActOrCondition: { type: 'UNSAFE_ACT', statement: null, evidence: [] },
    directActor: { actor: 'COPILOTO', status: 'IDENTIFIED', alternatives: [], actorMigrationWarnings: [] },
    axes: {
      perception: {
        axis: 'P',
        proposedCode: 'P-B',
        status: 'CANDIDATE',
        actor: 'COPILOTO',
        statementAtEscapePoint: 'Copiloto não detectou desvio de altitude apesar de indicações disponíveis.',
        supportingEvidence: ['FDR registra altitude 200ft abaixo do perfil', 'Sem callout de altitude'],
        counterEvidence: ['Possível saturação de tarefas'],
        excludedPostEscapeEvidence: [],
        alternativesConsidered: ['P-A: Informação ausente — rejeitado, altímetro funcionava', 'P-C: Percepção distorcida — insuficiente evidência'],
        canonicalPath: ['Q1', 'Q3', 'Q7'],
        confidence: 'MEDIUM',
      },
      objective: {
        axis: 'O',
        proposedCode: 'O-B',
        status: 'CANDIDATE',
        actor: 'COPILOTO',
        statementAtEscapePoint: 'Objetivo do copiloto era ambíguo — não está claro se pretendia manter perfil.',
        supportingEvidence: ['Sem instrução explícita de manutenção de perfil'],
        counterEvidence: ['Procedimento padrão implica manutenção de perfil'],
        excludedPostEscapeEvidence: [],
        alternativesConsidered: ['O-A: Objetivo seguro — evidência insuficiente', 'O-C: Violação consciente — sem evidência'],
        canonicalPath: ['Q1', 'Q2'],
        confidence: 'LOW',
      },
      action: {
        axis: 'A',
        proposedCode: 'A-D',
        status: 'CANDIDATE',
        actor: 'COPILOTO',
        statementAtEscapePoint: 'Copiloto omitiu callout de altitude e não corrigiu desvio.',
        supportingEvidence: ['CVR sem callout de altitude', 'FDR sem input de correção'],
        counterEvidence: [],
        excludedPostEscapeEvidence: ['Arremetida imediata após GPWS — posterior ao ponto de fuga'],
        alternativesConsidered: ['A-C: Ação incorreta não intencional — possível mas omissão é mais direta'],
        canonicalPath: ['Q1', 'Q4', 'Q8'],
        confidence: 'HIGH',
      },
    },
    preconditions: [
      {
        id: 'pc-001',
        label: 'Pressão de tempo excessiva',
        description: 'Tripulação operando sob checklist tardio que comprimiu tempo disponível para monitoramento.',
        category: 'TIME_PRESSURE',
        evidence: ['CVR registra checklist a 500ft', 'Procedimento padrão recomenda conclusão a 1000ft'],
        relationship: 'contributing_factor' as const,
        sourceEvidence: [],
        sourceRuleIds: [],
        linkedActor: 'COPILOTO',
        explicitlyNotEscapePoint: true,
        basedOnCandidateCode: true,
        nonFinal: true,
        confidence: 'MEDIUM',
      },
    ],
    canonicalTraversal: { status: 'COMPLETED_CANDIDATE_ONLY', paths: [], unansweredQuestions: [] },
    guardrails: {
      consequenceUsedAsCause: false,
      postEscapeHuntingDetected: false,
      oeUsed: false,
      inventedQuestionDetected: false,
      actorMigrationDetected: false,
      preconditionUsedAsEscapePoint: false,
    },
    uncertainties: ['Não confirmado se briefing de aproximação cobriu perfil de descida', 'Qualidade do CVR limitada nos últimos 30s'],
    limitations: [],
    decisionTrace: [],
    evidenceTrace: [],
    humanReviewPackage: {
      inputSummary: 'Tripulação em aproximação ILS, copiloto não monitorou altitude.',
      escapePointCandidate: null as unknown as SeraVNextEngineOutput['escapePoint'],
      directActor: null as unknown as SeraVNextEngineOutput['directActor'],
      axes: null as unknown as SeraVNextEngineOutput['axes'],
      preconditions: [],
      uncertainties: ['Não confirmado se briefing cobriu perfil'],
      unansweredQuestions: ['O copiloto tinha visibilidade do altímetro no momento?'],
      criticalWarnings: [],
      reviewerDecisionsRequired: ['Confirmar se P-B é o código mais adequado', 'Confirmar se omissão (A-D) é mais precisa que ação incorreta'],
    },
    humanReviewRequired: true,
    selectedCode: null,
    releasedCode: null,
    finalConclusion: null,
    classifiedOutput: false,
    readyPromotion: false,
    downstreamAllowed: false,
  }
  return { ...base, ...overrides }
}

const output = makeEngineOutput()
const ro = buildReviewerOutput(output)

check('reviewer_output_exists', () => {
  assert.ok(ro, 'reviewerOutput must exist')
})

check('summary_exists', () => {
  assert.ok(ro.summary, 'summary must exist')
  assert.ok(typeof ro.summary.headline === 'string', 'headline must be a string')
  assert.ok(typeof ro.summary.nonFinalNotice === 'string', 'nonFinalNotice must be a string')
  assert.ok(ro.summary.headline.length > 0, 'headline must not be empty')
})

check('escape_point_review_exists', () => {
  assert.ok(ro.escapePointReview, 'escapePointReview must exist')
  assert.ok(typeof ro.escapePointReview.reviewerQuestion === 'string', 'reviewerQuestion must be a string')
  assert.ok(ro.escapePointReview.reviewerQuestion.length > 0, 'reviewerQuestion must not be empty')
  assert.ok(Array.isArray(ro.escapePointReview.supportingEvidence), 'supportingEvidence must be array')
  assert.ok(Array.isArray(ro.escapePointReview.counterEvidence), 'counterEvidence must be array')
  assert.ok(ro.escapePointReview.supportingEvidence.length > 0, 'supportingEvidence must have items from engine output')
})

check('axis_reviews_all_present', () => {
  assert.ok(ro.axisReviews.perception, 'perception card must exist')
  assert.ok(ro.axisReviews.objective, 'objective card must exist')
  assert.ok(ro.axisReviews.action, 'action card must exist')
})

check('perception_card_has_required_fields', () => {
  const p = ro.axisReviews.perception
  assert.equal(p.axis, 'P')
  assert.ok(typeof p.plainLanguageQuestion === 'string' && p.plainLanguageQuestion.length > 0)
  assert.ok(typeof p.candidateStatus === 'string' && p.candidateStatus.length > 0)
  assert.equal(p.candidateCode, 'P-B')
  assert.ok(typeof p.candidateMeaning === 'string' && p.candidateMeaning!.length > 0, 'candidateMeaning must be populated')
  assert.ok(typeof p.statementAtEscapePoint === 'string', 'statementAtEscapePoint must be present')
  assert.ok(Array.isArray(p.whyCandidateWasSuggested) && p.whyCandidateWasSuggested.length > 0)
  assert.ok(Array.isArray(p.whyItMayBeWrong) && p.whyItMayBeWrong.length > 0)
  assert.ok(Array.isArray(p.alternativesConsidered) && p.alternativesConsidered.length > 0)
  assert.ok(Array.isArray(p.reviewerMustDecide) && p.reviewerMustDecide.length > 0)
  assert.ok(typeof p.confidence === 'string' && p.confidence.length > 0)
})

check('objective_card_has_required_fields', () => {
  const o = ro.axisReviews.objective
  assert.equal(o.axis, 'O')
  assert.equal(o.candidateCode, 'O-B')
  assert.ok(typeof o.candidateMeaning === 'string' && o.candidateMeaning!.length > 0)
  assert.ok(Array.isArray(o.reviewerMustDecide) && o.reviewerMustDecide.length > 0)
})

check('action_card_has_required_fields', () => {
  const a = ro.axisReviews.action
  assert.equal(a.axis, 'A')
  assert.equal(a.candidateCode, 'A-D')
  assert.ok(typeof a.candidateMeaning === 'string' && a.candidateMeaning!.length > 0)
  assert.ok(Array.isArray(a.evidenceExcluded) && a.evidenceExcluded.length > 0, 'excluded post-escape evidence present')
})

check('precondition_review_exists', () => {
  assert.ok(ro.preconditionReview, 'preconditionReview must exist')
  assert.ok(Array.isArray(ro.preconditionReview.cards), 'cards must be array')
  assert.ok(ro.preconditionReview.cards.length > 0, 'cards must have items from engine output')
})

check('precondition_card_has_required_fields', () => {
  const card = ro.preconditionReview.cards[0]
  assert.ok(typeof card.category === 'string')
  assert.ok(typeof card.plainLanguageLabel === 'string' && card.plainLanguageLabel.length > 0)
  assert.ok(typeof card.description === 'string' && card.description.length > 0)
  assert.ok(Array.isArray(card.evidence))
  assert.ok(typeof card.relationship === 'string' && card.relationship.length > 0)
  assert.equal(card.explicitlyNotEscapePoint, true)
  assert.ok(typeof card.reviewerQuestion === 'string' && card.reviewerQuestion.length > 0)
  assert.ok(typeof card.confidence === 'string' && card.confidence.length > 0)
})

check('uncertainty_review_exists', () => {
  assert.ok(ro.uncertaintyReview, 'uncertaintyReview must exist')
  assert.ok(Array.isArray(ro.uncertaintyReview.uncertainties))
  assert.ok(Array.isArray(ro.uncertaintyReview.unansweredQuestions))
  assert.ok(Array.isArray(ro.uncertaintyReview.evidenceNeeded))
  assert.ok(ro.uncertaintyReview.uncertainties.length > 0, 'uncertainties from engine output')
})

check('human_decision_guide_exists', () => {
  assert.ok(ro.humanDecisionGuide, 'humanDecisionGuide must exist')
  assert.ok(['ACCEPT_AS_WORKING_HYPOTHESIS', 'REJECT_WORKING_HYPOTHESIS', 'REQUIRES_MORE_EVIDENCE', 'RETURN_FOR_REANALYSIS'].includes(ro.humanDecisionGuide.recommendedNextStep))
  assert.ok(typeof ro.humanDecisionGuide.rationale === 'string' && ro.humanDecisionGuide.rationale.length > 0)
  assert.ok(Array.isArray(ro.humanDecisionGuide.decisionChecklist) && ro.humanDecisionGuide.decisionChecklist.length >= 8)
})

check('non_final_locks_intact', () => {
  assert.equal(output.selectedCode, null)
  assert.equal(output.releasedCode, null)
  assert.equal(output.finalConclusion, null)
  assert.equal(output.classifiedOutput, false)
  assert.equal(output.readyPromotion, false)
  assert.equal(output.downstreamAllowed, false)
})

check('non_final_notice_present', () => {
  assert.ok(ro.summary.nonFinalNotice.length > 0)
  const notice = ro.summary.nonFinalNotice.toLowerCase()
  assert.ok(
    notice.includes('candidate-only') || notice.includes('não final') || notice.includes('não representa'),
    'nonFinalNotice must mention candidate-only or non-final'
  )
})

check('no_selected_code_in_output', () => {
  const roStr = JSON.stringify(ro)
  assert.ok(!roStr.includes('"selectedCode"'), 'reviewerOutput must not contain selectedCode field')
  assert.ok(!roStr.includes('"releasedCode"'), 'reviewerOutput must not contain releasedCode field')
  assert.ok(!roStr.includes('"finalConclusion"'), 'reviewerOutput must not contain finalConclusion field')
})

check('empty_preconditions_handled', () => {
  const outputNoPrecond = makeEngineOutput({ preconditions: [] })
  const roNoPrecond = buildReviewerOutput(outputNoPrecond)
  assert.ok(Array.isArray(roNoPrecond.preconditionReview.cards) && roNoPrecond.preconditionReview.cards.length === 0)
  assert.ok(roNoPrecond.preconditionReview.absentOrInsufficient.length > 0, 'must explain absent preconditions')
})

check('insufficient_evidence_escape_point_handled', () => {
  const outputInsuff = makeEngineOutput({
    escapePoint: {
      ...makeEngineOutput().escapePoint,
      status: 'INSUFFICIENT_EVIDENCE',
      statement: null,
      supportingEvidence: [],
    },
  })
  const roInsuff = buildReviewerOutput(outputInsuff)
  assert.ok(roInsuff.summary.overallUsefulnessWarning, 'must warn when escape point not viable')
  assert.equal(roInsuff.humanDecisionGuide.recommendedNextStep, 'REQUIRES_MORE_EVIDENCE')
})

const pass = checks.filter((c) => c.status === 'PASS').length
const fail = checks.filter((c) => c.status === 'FAIL').length

console.log(JSON.stringify({
  trial: TRIAL_ID,
  pass,
  fail,
  skip: checks.filter((c) => c.status === 'SKIP').length,
  status: fail === 0 ? 'REVIEWER_OUTPUT_CONTRACT_PASS' : 'REVIEWER_OUTPUT_CONTRACT_FAIL',
  checks,
}, null, 2))

if (fail > 0) {
  process.exit(1)
}
