import type { SeraVNextEngineOutput } from '../../engine-contract'
import { buildCandidateEscapeWindow } from '../candidate-escape-window'
import { confidenceFromCount, excludedPostEscapeEvidence } from '../utils'

export function runStep03EscapePoint(input: {
  factualExtraction: SeraVNextEngineOutput['factualExtraction']
}): SeraVNextEngineOutput['escapePoint'] {
  const legacyWindow = buildCandidateEscapeWindow(input.factualExtraction.timeline)

  const latestSentenceIndex =
    input.factualExtraction.timeline.find((item) => item.statement === legacyWindow.latestCandidate)?.sourceSentenceIndex ?? null

  const status = legacyWindow.statement
    ? legacyWindow.counterEvidence.length > 0
      ? 'PROGRESSIVE_ZONE'
      : 'CANDIDATE'
    : 'INSUFFICIENT_EVIDENCE'

  return {
    status,
    statement: legacyWindow.earliestCandidate
      ? `Quando ${legacyWindow.earliestCandidate.replace(/^[A-Z]/, (m: string) => m.toLowerCase())}`
      : null,
    earliestCandidate: legacyWindow.earliestCandidate,
    latestCandidate: legacyWindow.latestCandidate,
    directActor: null,
    supportingEvidence: legacyWindow.supportingEvidence,
    counterEvidence: legacyWindow.counterEvidence,
    excludedPostEscapeEvidence: excludedPostEscapeEvidence(input.factualExtraction.timeline, latestSentenceIndex),
    confidence: confidenceFromCount(legacyWindow.supportingEvidence.length),
  }
}
