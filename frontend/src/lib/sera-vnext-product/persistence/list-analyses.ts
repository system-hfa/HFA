import type { SeraVNextListAnalysesQuery, SeraVNextListResult, SeraVNextProductContext } from '../types'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export async function listSeraVNextAnalyses(args: {
  query: SeraVNextListAnalysesQuery
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}): Promise<SeraVNextListResult> {
  const repository = args.repository ?? createSeraVNextProductRepository()
  return repository.listAnalyses(args.context.tenantId, args.query)
}
