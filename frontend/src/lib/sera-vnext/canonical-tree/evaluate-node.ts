import type { SeraConfidence } from '../engine-contract'
import type { SeraEvidenceItem } from '../evidence'
import { axisToEvidenceUse, isEvidenceUsableFor } from '../evidence'
import type { CanonicalSeraAxis } from '../types'
import type { SeraCanonicalNode } from './types'

export type SeraNodeEvidenceContext = {
  axis: CanonicalSeraAxis
  node: SeraCanonicalNode
  evidence: SeraEvidenceItem[]
  statementAtEscapePoint: string | null
}

export type SeraNodeAnswer = {
  nodeId: string
  question: string
  exactQuestionTextENAnchor: string
  answer: 'START' | 'SIM' | 'NÃO' | 'NÃO_SENSORIAL' | 'NÃO_CONHECIMENTO' | 'SIM_ATENCAO' | 'SIM_GERENCIAMENTO' | 'NÃO_DESLIZE_LAPSO_ERRO' | 'NÃO_FEEDBACK' | 'NÃO_INABILIDADE' | 'NÃO_SELECAO' | 'SIM_SELECAO' | 'SIM_FEEDBACK' | 'INSUFFICIENT_EVIDENCE'
  nextNodeId: string | null
  terminalCode: string | null
  supportingEvidence: string[]
  counterEvidence: string[]
  prohibitedInferenceChecks: string[]
  confidence: SeraConfidence
  rationale: string
}

type BranchAnswer = SeraNodeAnswer['answer']

type Decision = {
  answer: BranchAnswer
  supportingEvidence: string[]
  rationale: string
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

function confidenceFromEvidence(count: number): SeraConfidence {
  if (count >= 3) return 'HIGH'
  if (count === 2) return 'MEDIUM'
  return 'LOW'
}

function usableStatements(ctx: SeraNodeEvidenceContext): string[] {
  const use = axisToEvidenceUse(ctx.axis)
  return unique([
    ...ctx.evidence.filter((item) => isEvidenceUsableFor(item, use)).map((item) => item.statement),
    ctx.statementAtEscapePoint ?? '',
  ])
}

function matching(statements: string[], patterns: RegExp[]): string[] {
  return statements.filter((statement) => patterns.some((pattern) => pattern.test(statement)))
}

function hasText(statements: string[], patterns: RegExp[]): boolean {
  return matching(statements, patterns).length > 0
}

function decideP(nodeId: string, statements: string[]): Decision {
  switch (nodeId) {
    case 'P_ROOT':
      return { answer: 'START', supportingEvidence: statements.slice(0, 2), rationale: 'Root node starts canonical perception traversal.' }
    case 'P_ASSESSMENT': {
      const positive = matching(statements, [/\b(recognized|noticed|saw|perceived|aware|identified)\b.*\b(in time|warning|trend|deviation|unstable|low)\b/i, /\bwarning was available\b/i])
      const negative = matching(statements, [/\b(did not|failed to|without)\b.*\b(perceiv|notice|see|recogniz|identify|awareness|deviation)\b/i, /\bwrong runway|wrong surface|misidentified|believed existed did not match|perceived state did not match\b/i])
      if (positive.length > 0) return { answer: 'SIM', supportingEvidence: positive, rationale: 'Pre-escape evidence supports adequate perception or timely recognition.' }
      if (negative.length > 0) return { answer: 'NÃO', supportingEvidence: negative, rationale: 'Pre-escape evidence supports inaccurate or inadequate situation assessment.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'No pre-escape evidence answers whether assessment was adequate.' }
    }
    case 'P_CAPABILITY': {
      const sensory = matching(statements, [/\b(visibility|fog|night|low cloud|poor visibility|degraded visual|visual cues|did not see|failed to notice|visual environment)\b/i])
      const knowledge = matching(statements, [/\b(unfamiliar|training|knowledge gap|competence|not trained)\b/i])
      if (sensory.length > 0) return { answer: 'NÃO_SENSORIAL', supportingEvidence: sensory, rationale: 'Evidence localizes the perception issue to sensory/perceptual capability.' }
      if (knowledge.length > 0) return { answer: 'NÃO_CONHECIMENTO', supportingEvidence: knowledge, rationale: 'Evidence localizes the perception issue to knowledge/training capability.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'The text does not identify a canonical capability subtype.' }
    }
    case 'P_TIME_PRESSURE': {
      const attention = matching(statements, [/\b(distraction|attention saturation|fixation|workload|rushed|time pressure)\b/i])
      const management = matching(statements, [/\b(time pressure|urgency|expedite|rushed sequence)\b/i])
      if (attention.length > 0) return { answer: 'SIM_ATENCAO', supportingEvidence: attention, rationale: 'Evidence supports attention impact under perceived time pressure.' }
      if (management.length > 0) return { answer: 'SIM_GERENCIAMENTO', supportingEvidence: management, rationale: 'Evidence supports time-management pressure.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'No evidence supports a time-pressure perception subtype.' }
    }
    case 'P_INFORMATION_AMBIGUOUS': {
      const ambiguous = matching(statements, [/\b(ambiguous|illusory|misleading|confusing|deceptive)\b/i])
      if (ambiguous.length > 0) return { answer: 'SIM', supportingEvidence: ambiguous, rationale: 'Information ambiguity is explicit.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'No explicit ambiguity evidence is available.' }
    }
    case 'P_INFORMATION_AVAILABLE': {
      const unavailable = matching(statements, [/\b(no warning|did not generate an alert|not available|missing information|failed alert)\b/i])
      if (unavailable.length > 0) return { answer: 'NÃO', supportingEvidence: unavailable, rationale: 'Evidence supports missing or unavailable information.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'Available/correct information is not established strongly enough for a P-G/P-H leaf.' }
    }
    default:
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: `Unsupported perception node ${nodeId}.` }
  }
}

function decideO(nodeId: string, statements: string[]): Decision {
  switch (nodeId) {
    case 'O_ROOT':
      return { answer: 'START', supportingEvidence: statements.slice(0, 2), rationale: 'Root node starts canonical objective traversal.' }
    case 'O_RULES': {
      const safeGoal = matching(statements, [/\b(discontinued|go-around|go around|aborted|preserving safe|safe separation|recognized .* in time)\b/i])
      const unsafeContinuation = matching(statements, [/\b(continue|continued|decided to continue|pressed on|despite (?:the )?warning|wrong runway|wrong surface|below profile|unstable approach|moved the lever out of stop)\b/i])
      if (safeGoal.length > 0) return { answer: 'SIM', supportingEvidence: safeGoal, rationale: 'Objective evidence supports a safe or rule-consistent goal.' }
      if (unsafeContinuation.length > 0) return { answer: 'NÃO', supportingEvidence: unsafeContinuation, rationale: 'Objective evidence supports continuation of an unsafe operational goal.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'No pre-escape goal evidence answers rule/risk consistency.' }
    }
    case 'O_ROUTINE': {
      const routine = matching(statements, [/\b(continue|continued|despite (?:the )?warning|pressed on|wrong runway|wrong surface|below profile|unstable approach)\b/i])
      const deliberate = matching(statements, [/\b(knowingly|deliberately|intentionally|consciously)\b/i])
      if (routine.length > 0) return { answer: 'SIM', supportingEvidence: routine, rationale: 'Evidence supports unsafe continuation as the objective pattern; no O-C/O-D is inferred without stronger intent evidence.' }
      if (deliberate.length > 0) return { answer: 'NÃO', supportingEvidence: deliberate, rationale: 'Deliberate violation evidence is explicit.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'Violation subtype is not established.' }
    }
    case 'O_MANAGED_RISK': {
      const managed = matching(statements, [/\b(discontinued|go-around|go around|aborted|preserving safe|safe separation|recognized .* in time)\b/i])
      const unmanaged = matching(statements, [/\b(schedule pressure|save time|expedite|accept risk|rushed)\b/i])
      if (managed.length > 0) return { answer: 'SIM', supportingEvidence: managed, rationale: 'Risk was actively managed by the objective evidence.' }
      if (unmanaged.length > 0) return { answer: 'NÃO', supportingEvidence: unmanaged, rationale: 'Evidence supports unmanaged/risk-accepting goal pressure.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'Managed-risk status is not established.' }
    }
    default:
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: `Unsupported objective node ${nodeId}.` }
  }
}

function decideA(nodeId: string, statements: string[]): Decision {
  switch (nodeId) {
    case 'A_ROOT':
      return { answer: 'START', supportingEvidence: statements.slice(0, 2), rationale: 'Root node starts canonical action traversal.' }
    case 'A_IMPLEMENTED': {
      const safeAction = matching(statements, [/\b(executed a go-around|executed a safe go-around|discontinued|aborted|prompt correction|recognized .* in time)\b/i])
      const slipOrLapse = matching(statements, [/\b(descended below|continued below|failed to monitor|did not verify|did not perceive|left an invalid|allowed .* to develop|low airspeed|high descent rate|late recovery)\b/i])
      const selected = matching(statements, [/\b(wrong runway|wrong surface|selected wrong|wrong mode|lined up toward|lined up on)\b/i])
      if (safeAction.length > 0 || selected.length > 0) return { answer: 'SIM', supportingEvidence: [...safeAction, ...selected], rationale: 'Evidence supports that an action was implemented and can be tested for adequacy.' }
      if (slipOrLapse.length > 0) return { answer: 'NÃO_DESLIZE_LAPSO_ERRO', supportingEvidence: slipOrLapse, rationale: 'Evidence supports a slip/lapse/error in action implementation before the consequence.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'No pre-escape action implementation evidence is sufficient.' }
    }
    case 'A_CORRECT': {
      const correct = matching(statements, [/\b(go-around|discontinued|aborted|prompt correction|preserving safe|safe separation|recognized .* in time)\b/i])
      const incorrect = matching(statements, [/\b(wrong runway|wrong surface|selected wrong|wrong mode|lined up toward|lined up on|continued below|descended below|unstable approach)\b/i])
      if (correct.length > 0) return { answer: 'SIM', supportingEvidence: correct, rationale: 'Action evidence supports an adequate response.' }
      if (incorrect.length > 0) return { answer: 'NÃO', supportingEvidence: incorrect, rationale: 'Action evidence supports an implemented but inadequate action.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'Correctness of action is not established.' }
    }
    case 'A_CAPABILITY': {
      const physical = matching(statements, [/\b(unable physically|physical limitation|ergonomic|could not reach|fatigue)\b/i])
      const knowledge = matching(statements, [/\b(training|skill|unfamiliar|knowledge gap)\b/i])
      if (physical.length > 0) return { answer: 'NÃO_INABILIDADE', supportingEvidence: physical, rationale: 'Evidence supports physical/capability limitation.' }
      if (knowledge.length > 0) return { answer: 'NÃO_CONHECIMENTO', supportingEvidence: knowledge, rationale: 'Evidence supports knowledge/skill limitation.' }
      return { answer: 'SIM', supportingEvidence: statements.slice(0, 2), rationale: 'No capability-limitation evidence; traversal proceeds to action-selection subtype.' }
    }
    case 'A_TIME_PRESSURE': {
      const feedback = matching(statements, [/\b(readback|communication breakdown|callout)\b/i])
      const rushed = matching(statements, [/\b(time pressure|rushed|late decision|urgency)\b/i])
      const selection = matching(statements, [/\b(wrong runway|wrong surface|selected wrong|wrong mode|lined up toward|lined up on)\b/i])
      if (feedback.length > 0) return { answer: 'SIM_FEEDBACK', supportingEvidence: feedback, rationale: 'Evidence supports feedback/communication action subtype.' }
      if (selection.length > 0) return { answer: 'SIM_SELECAO', supportingEvidence: selection, rationale: 'Evidence supports selection/action-choice subtype.' }
      if (rushed.length > 0) return { answer: 'SIM_GERENCIAMENTO', supportingEvidence: rushed, rationale: 'Evidence supports time-management action subtype.' }
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: 'Action subtype under time pressure is not established.' }
    }
    default:
      return { answer: 'INSUFFICIENT_EVIDENCE', supportingEvidence: [], rationale: `Unsupported action node ${nodeId}.` }
  }
}

export function evaluateCanonicalNode(ctx: SeraNodeEvidenceContext): SeraNodeAnswer {
  const statements = usableStatements(ctx)
  const decision = ctx.axis === 'P'
    ? decideP(ctx.node.nodeId, statements)
    : ctx.axis === 'O'
      ? decideO(ctx.node.nodeId, statements)
      : decideA(ctx.node.nodeId, statements)

  const branchTarget = decision.answer === 'INSUFFICIENT_EVIDENCE'
    ? null
    : ctx.node.branchMap[decision.answer]

  const terminalCode = branchTarget?.includes('-') ? branchTarget : null
  const nextNodeId = branchTarget && !terminalCode ? branchTarget : null
  const supportingEvidence = unique(decision.supportingEvidence).slice(0, 4)
  const counterEvidence = hasText(statements, [/\b(does not establish|not established|not clearly established|unclear whether)\b/i])
    ? matching(statements, [/\b(does not establish|not established|not clearly established|unclear whether)\b/i]).slice(0, 3)
    : []

  return {
    nodeId: ctx.node.nodeId,
    question: ctx.node.question,
    exactQuestionTextENAnchor: ctx.node.exactQuestionTextENAnchor,
    answer: branchTarget ? decision.answer : 'INSUFFICIENT_EVIDENCE',
    nextNodeId,
    terminalCode,
    supportingEvidence,
    counterEvidence,
    prohibitedInferenceChecks: ctx.node.prohibitedInferences,
    confidence: confidenceFromEvidence(supportingEvidence.length),
    rationale: branchTarget ? decision.rationale : `${decision.rationale} Traversal stops without a reconstructed leaf.`,
  }
}
