import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  SeraVNextAnalysisRecord,
  SeraVNextAuditEventRecord,
  SeraVNextListAnalysesQuery,
  SeraVNextListResult,
  SeraVNextReviewRecord,
  SeraVNextRevisionRecord,
} from '../types'

export type InsertAnalysisRow = Omit<SeraVNextAnalysisRecord, 'id' | 'created_at' | 'updated_at'>
export type InsertRevisionRow = Omit<SeraVNextRevisionRecord, 'id' | 'created_at'>
export type InsertReviewRow = Omit<SeraVNextReviewRecord, 'id' | 'created_at' | 'updated_at'>
export type InsertAuditEventRow = Omit<SeraVNextAuditEventRecord, 'id' | 'created_at'>

export type SeraVNextProductRepository = {
  findAnalysisByClientRequest(tenantId: string, clientRequestId: string): Promise<SeraVNextAnalysisRecord | null>
  insertAnalysis(row: InsertAnalysisRow): Promise<SeraVNextAnalysisRecord>
  updateAnalysis(tenantId: string, id: string, patch: Partial<SeraVNextAnalysisRecord>): Promise<SeraVNextAnalysisRecord>
  getAnalysis(tenantId: string, id: string, options?: { includeArchived?: boolean }): Promise<SeraVNextAnalysisRecord | null>
  listAnalyses(tenantId: string, query: SeraVNextListAnalysesQuery): Promise<SeraVNextListResult>
  insertRevision(row: InsertRevisionRow): Promise<SeraVNextRevisionRecord>
  listRevisions(tenantId: string, analysisId: string): Promise<SeraVNextRevisionRecord[]>
  insertReview(row: InsertReviewRow): Promise<SeraVNextReviewRecord>
  listReviews(tenantId: string, analysisId: string): Promise<SeraVNextReviewRecord[]>
  insertAuditEvent(row: InsertAuditEventRow): Promise<SeraVNextAuditEventRecord>
  listAuditEvents(tenantId: string, analysisId: string): Promise<SeraVNextAuditEventRecord[]>
}

function assertNoError<T>(data: T | null, error: { message?: string } | null, action: string): T {
  if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_${action}: ${error.message ?? 'unknown error'}`)
  if (data === null) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_${action}: empty data`)
  return data
}

function sanitizeSummary(row: SeraVNextAnalysisRecord): SeraVNextListResult['items'][number] {
  const { narrative: _narrative, engine_input: _engineInput, engine_output: _engineOutput, ...rest } = row
  return {
    ...rest,
    narrative: undefined,
    engine_input: undefined,
    engine_output: undefined,
  }
}

export class SupabaseSeraVNextProductRepository implements SeraVNextProductRepository {
  private readonly client: SupabaseClient

  constructor(client: SupabaseClient = getSupabaseAdmin()) {
    this.client = client
  }

  async findAnalysisByClientRequest(tenantId: string, clientRequestId: string) {
    const { data, error } = await this.client
      .from('sera_vnext_analyses')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('client_request_id', clientRequestId)
      .maybeSingle()
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_FIND_IDEMPOTENT: ${error.message}`)
    return data as SeraVNextAnalysisRecord | null
  }

  async insertAnalysis(row: InsertAnalysisRow) {
    const { data, error } = await this.client
      .from('sera_vnext_analyses')
      .insert(row)
      .select('*')
      .single()
    return assertNoError(data as SeraVNextAnalysisRecord | null, error, 'INSERT_ANALYSIS')
  }

  async updateAnalysis(tenantId: string, id: string, patch: Partial<SeraVNextAnalysisRecord>) {
    const { data, error } = await this.client
      .from('sera_vnext_analyses')
      .update(patch)
      .eq('tenant_id', tenantId)
      .eq('id', id)
      .select('*')
      .single()
    return assertNoError(data as SeraVNextAnalysisRecord | null, error, 'UPDATE_ANALYSIS')
  }

  async getAnalysis(tenantId: string, id: string, options: { includeArchived?: boolean } = {}) {
    let query = this.client
      .from('sera_vnext_analyses')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)
    if (!options.includeArchived) query = query.is('deleted_at', null)
    const { data, error } = await query.maybeSingle()
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_GET_ANALYSIS: ${error.message}`)
    return data as SeraVNextAnalysisRecord | null
  }

  async listAnalyses(tenantId: string, queryInput: SeraVNextListAnalysesQuery) {
    let query = this.client
      .from('sera_vnext_analyses')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .is('deleted_at', null)

    if (queryInput.status) query = query.eq('status', queryInput.status)
    if (queryInput.reviewStatus) query = query.eq('review_status', queryInput.reviewStatus)
    if (queryInput.createdBy) query = query.eq('created_by', queryInput.createdBy)
    if (queryInput.search) query = query.ilike('title', `%${queryInput.search}%`)
    if (queryInput.from) query = query.gte('created_at', queryInput.from)
    if (queryInput.to) query = query.lte('created_at', queryInput.to)

    const ascending = queryInput.sort === 'created_at_asc'
    const orderColumn = queryInput.sort === 'updated_at_desc' ? 'updated_at' : 'created_at'
    const from = (queryInput.page - 1) * queryInput.pageSize
    const to = from + queryInput.pageSize - 1
    const { data, error, count } = await query.order(orderColumn, { ascending }).range(from, to)
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_LIST_ANALYSES: ${error.message}`)

    return {
      items: ((data ?? []) as SeraVNextAnalysisRecord[]).map(sanitizeSummary),
      page: queryInput.page,
      pageSize: queryInput.pageSize,
      total: count ?? 0,
    }
  }

  async insertRevision(row: InsertRevisionRow) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_revisions')
      .insert(row)
      .select('*')
      .single()
    return assertNoError(data as SeraVNextRevisionRecord | null, error, 'INSERT_REVISION')
  }

  async listRevisions(tenantId: string, analysisId: string) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_revisions')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('analysis_id', analysisId)
      .order('revision_number', { ascending: true })
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_LIST_REVISIONS: ${error.message}`)
    return (data ?? []) as SeraVNextRevisionRecord[]
  }

  async insertReview(row: InsertReviewRow) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_reviews')
      .insert(row)
      .select('*')
      .single()
    return assertNoError(data as SeraVNextReviewRecord | null, error, 'INSERT_REVIEW')
  }

  async listReviews(tenantId: string, analysisId: string) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_reviews')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('analysis_id', analysisId)
      .order('created_at', { ascending: true })
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_LIST_REVIEWS: ${error.message}`)
    return (data ?? []) as SeraVNextReviewRecord[]
  }

  async insertAuditEvent(row: InsertAuditEventRow) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_events')
      .insert(row)
      .select('*')
      .single()
    return assertNoError(data as SeraVNextAuditEventRecord | null, error, 'INSERT_EVENT')
  }

  async listAuditEvents(tenantId: string, analysisId: string) {
    const { data, error } = await this.client
      .from('sera_vnext_analysis_events')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('analysis_id', analysisId)
      .order('created_at', { ascending: true })
    if (error) throw new Error(`SERA_VNEXT_PRODUCT_BETA_REPOSITORY_LIST_EVENTS: ${error.message}`)
    return (data ?? []) as SeraVNextAuditEventRecord[]
  }
}

export function createSeraVNextProductRepository(): SeraVNextProductRepository {
  return new SupabaseSeraVNextProductRepository()
}
