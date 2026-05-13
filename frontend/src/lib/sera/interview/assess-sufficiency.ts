import gatesData from './sufficiency-gates.json'
import type { EvidenceMap, SufficiencyGate, SufficiencyResult } from './types'

const gates = gatesData.gates as SufficiencyGate[]

function isEvidencePresent(
  evidenceMap: EvidenceMap,
  dimension: SufficiencyGate['dimension'],
  evidenceKeys: string[]
): boolean {
  const dimensionMap = evidenceMap[dimension]
  if (!dimensionMap) return false
  return evidenceKeys.some((key) => {
    const value = dimensionMap[key]
    if (value === undefined || value === null || value === false || value === '') return false
    if (Array.isArray(value)) return value.length > 0
    return true
  })
}

export function assessInterviewSufficiency(evidence: EvidenceMap): SufficiencyResult {
  const missingRequired: SufficiencyGate[] = []
  const missingRecommended: SufficiencyGate[] = []

  const byDimension: SufficiencyResult['byDimension'] = {}

  for (const gate of gates) {
    const present = isEvidencePresent(evidence, gate.dimension, gate.evidence_keys)

    if (!byDimension[gate.dimension]) {
      byDimension[gate.dimension] = {
        ready: true,
        missingRequired: [],
        missingRecommended: [],
      }
    }

    if (!present) {
      if (gate.minimum === 'required') {
        missingRequired.push(gate)
        byDimension[gate.dimension].missingRequired.push(gate.id)
        byDimension[gate.dimension].ready = false
      } else {
        missingRecommended.push(gate)
        byDimension[gate.dimension].missingRecommended.push(gate.id)
      }
    }
  }

  const followUpQuestions = [
    ...missingRequired.map((g) => g.missing_prompt),
    ...missingRecommended.map((g) => g.missing_prompt),
  ]

  return {
    ready: missingRequired.length === 0,
    missingRequired,
    missingRecommended,
    followUpQuestions,
    byDimension,
  }
}
