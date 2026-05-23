import type { FactualSummary, SeraVNextInput } from '../types'

export function runStep01FactualExtraction(input: SeraVNextInput): FactualSummary {
  // TODO(A4+R-30): replace placeholder extraction with methodology-grounded parser.
  return {
    actors: [],
    aircraftOrSystem: [],
    operationType: null,
    phase: null,
    sequence: [input.narrative.trim()].filter(Boolean),
    environment: [],
    availableCues: [],
    missingData: ['Skeleton step: factual extraction not implemented yet'],
  }
}
