// frontend/src/lib/sera/safety-issue-candidates.ts
//
// Pure helper — no Supabase, no React, no browser APIs.
// Derives Safety Issue Candidates from aggregated SERA analysis data.
//
// Candidates are recurrence signals, not formal Safety Issues.
// Promotion to formal Safety Issue requires human review, operational
// context, exposure analysis, barrier assessment and additional evidence.

export type SafetyIssueCandidatePatternType = 'P+O' | 'P+A' | 'O+A' | 'precondition'

export type SafetyIssueCandidateConfidence = 'preliminary' | 'moderate'

export type SafetyIssueCandidate = {
  id: string
  pattern_type: SafetyIssueCandidatePatternType
  primary_code: string
  secondary_code?: string
  label: string
  count: number
  share: number
  confidence: SafetyIssueCandidateConfidence
  rationale: string
  caveat: string
}

export type SafetyIssueCandidateCombinationInput = {
  type: 'P+O' | 'P+A' | 'O+A'
  first: string
  second: string
  count: number
}

export type SafetyIssueCandidatePreconditionInput = {
  code: string
  label?: string
  count: number
}

export type SafetyIssueCandidateInput = {
  totalAnalyses: number
  combinations?: SafetyIssueCandidateCombinationInput[]
  preconditions?: SafetyIssueCandidatePreconditionInput[]
}

const CAVEAT =
  'Candidato preliminar. Não constitui Safety Issue formal sem revisão de contexto, exposição operacional e barreiras.'

const MIN_COUNT = 3
const MIN_SHARE = 0.2
const MAX_CANDIDATES = 5

export function deriveSafetyIssueCandidates(
  input: SafetyIssueCandidateInput,
): SafetyIssueCandidate[] {
  const { totalAnalyses, combinations = [], preconditions = [] } = input

  if (totalAnalyses <= 0) return []

  const candidates: SafetyIssueCandidate[] = []

  // --- Combination candidates (P+O, P+A, O+A) ---
  for (const combo of combinations) {
    const { count, type, first, second } = combo
    if (count < MIN_COUNT) continue

    const share = count / totalAnalyses
    if (totalAnalyses >= 10 && share < MIN_SHARE) continue

    const confidence: SafetyIssueCandidateConfidence = totalAnalyses >= 10 ? 'moderate' : 'preliminary'
    const id = `${type}:${first}:${second}`
    const label = `${first} + ${second}`

    candidates.push({
      id,
      pattern_type: type,
      primary_code: first,
      secondary_code: second,
      label,
      count,
      share,
      confidence,
      rationale: `A combinação ${label} apareceu ${count} vez${count !== 1 ? 'es' : ''} em ${totalAnalyses} análise${totalAnalyses !== 1 ? 's' : ''} (${Math.round(share * 100)}%).`,
      caveat: CAVEAT,
    })
  }

  // --- Precondition candidates ---
  for (const pre of preconditions) {
    const { count, code } = pre
    if (count < MIN_COUNT) continue

    const share = count / totalAnalyses
    if (totalAnalyses >= 10 && share < MIN_SHARE) continue

    const confidence: SafetyIssueCandidateConfidence = totalAnalyses >= 10 ? 'moderate' : 'preliminary'
    const id = `precondition:${code}`
    const displayLabel = pre.label ? `${code} — ${pre.label}` : code

    candidates.push({
      id,
      pattern_type: 'precondition',
      primary_code: code,
      label: displayLabel,
      count,
      share,
      confidence,
      rationale: `A precondição ${code} apareceu ${count} vez${count !== 1 ? 'es' : ''} em ${totalAnalyses} análise${totalAnalyses !== 1 ? 's' : ''} (${Math.round(share * 100)}%).`,
      caveat: CAVEAT,
    })
  }

  // Sort: count desc, share desc (equal counts have equal shares, kept for stability),
  // then id asc for deterministic ordering.
  candidates.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    if (b.share !== a.share) return b.share - a.share
    return a.id.localeCompare(b.id)
  })

  return candidates.slice(0, MAX_CANDIDATES)
}
