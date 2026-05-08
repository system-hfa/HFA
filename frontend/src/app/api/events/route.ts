import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { buildAnalysisUpsertPayload, runSeraPipeline, type SourceMeta } from '@/lib/sera/pipeline'
import { assertFileSize, detectDocumentKind } from '@/lib/sera/document-extraction'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

async function ensurePublicUserRow(
  admin: ReturnType<typeof getSupabaseAdmin>,
  tenantId: string,
  authUserId: string,
  email: string | undefined,
  role: string
) {
  const em = email ?? ''
  const { data: existing } = await admin.from('users').select('id').eq('email', em).limit(1).maybeSingle()
  if (existing?.id) return existing.id as string
  await admin.from('users').insert({
    id: authUserId,
    tenant_id: tenantId,
    email: em,
    full_name: em ? em.split('@')[0] : 'user',
    role: role || 'admin',
    is_active: true,
  })
  return authUserId
}

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('events')
      .select('*')
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })
    if (error) return jsonError(error.message, 400)
    return NextResponse.json(data ?? [])
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const ct = req.headers.get('content-type') || ''

    let title: string
    let raw_input: string
    let operation_type: string | null = null
    let aircraft_type: string | null = null
    let occurred_at: string | null = null
    let input_type: 'text' | 'pdf' | 'docx' = 'text'
    let sourceMeta: SourceMeta = { sourceType: 'text' }
    let sourceFile: File | null = null

    if (ct.includes('multipart/form-data')) {
      const form = await req.formData()
      title = String(form.get('title') || '')
      raw_input = String(form.get('raw_input') || '')
      operation_type = form.get('operation_type') ? String(form.get('operation_type')) : null
      aircraft_type = form.get('aircraft_type') ? String(form.get('aircraft_type')) : null
      occurred_at = form.get('occurred_at') ? String(form.get('occurred_at')) : null
      const it = form.get('input_type')
      if (it === 'pdf' || it === 'docx' || it === 'text') input_type = it
      const st = form.get('source_type')
      if (st === 'pdf' || st === 'docx') {
        sourceMeta.sourceType = st
        input_type = st
      }
      const fn = form.get('source_file_name')
      if (fn) sourceMeta.sourceFileName = String(fn)
      const wc = form.get('source_word_count')
      if (wc) sourceMeta.sourceWordCount = Number(wc)
      const f = form.get('file')
      if (f && f instanceof File && f.size > 0) sourceFile = f
    } else {
      const body = (await req.json()) as Record<string, unknown>
      title = String(body.title || '')
      raw_input = String(body.raw_input || '')
      operation_type = body.operation_type != null ? String(body.operation_type) : null
      aircraft_type = body.aircraft_type != null ? String(body.aircraft_type) : null
      occurred_at = body.occurred_at != null ? String(body.occurred_at) : null
      const it = body.input_type
      if (it === 'pdf' || it === 'docx' || it === 'text') input_type = it
      const st = body.source_type
      if (st === 'pdf' || st === 'docx') {
        sourceMeta.sourceType = st
        input_type = st
      }
      if (body.source_file_name) sourceMeta.sourceFileName = String(body.source_file_name)
      if (body.source_word_count != null) sourceMeta.sourceWordCount = Number(body.source_word_count)
    }

    if (!title.trim() || !raw_input.trim()) {
      return jsonError('Título e relato são obrigatórios', 400)
    }

    const submittedById = await ensurePublicUserRow(
      admin,
      user.tenantId,
      user.userId,
      user.email,
      user.role
    )

    const { data: tenant, error: terr } = await admin
      .from('tenants')
      .select('plan, credits_balance')
      .eq('id', user.tenantId)
      .single()
    if (terr || !tenant) return jsonError('Tenant não encontrado', 400)

    const isEnterprise = tenant.plan === 'enterprise'
    if (!isEnterprise && (tenant.credits_balance ?? 0) < 1) {
      return jsonError('Créditos insuficientes', 402)
    }

    const { data: eventRow, error: eerr } = await admin
      .from('events')
      .insert({
        tenant_id: user.tenantId,
        submitted_by: submittedById,
        title,
        raw_input,
        input_type,
        operation_type,
        aircraft_type,
        occurred_at: occurred_at || null,
        status: 'received',
      })
      .select('id')
      .single()

    if (eerr || !eventRow) {
      return jsonError(`Falha ao criar evento: ${eerr?.message || 'unknown'}`, 400)
    }

    const eventId = eventRow.id as string

    if (!isEnterprise) {
      await admin
        .from('tenants')
        .update({ credits_balance: (tenant.credits_balance ?? 0) - 1 })
        .eq('id', user.tenantId)
    }

    await admin.from('credit_transactions').insert({
      tenant_id: user.tenantId,
      user_id: submittedById,
      type: 'consumption',
      amount: -1,
      event_id: eventId,
      description: `Análise SERA: ${title}`,
    })

    await admin.from('events').update({ status: 'processing' }).eq('id', eventId)

    sourceMeta.sourceType = sourceMeta.sourceType ?? (input_type === 'text' ? 'text' : input_type)

    try {
      const steps = await runSeraPipeline(raw_input)
      const payload = buildAnalysisUpsertPayload(
        eventId,
        user.tenantId,
        raw_input,
        steps,
        sourceMeta
      )

      const { data: upserted, error: aerr } = await admin
        .from('analyses')
        .upsert(payload, { onConflict: 'event_id' })
        .select('id')
        .single()

      if (aerr || !upserted) throw new Error(aerr?.message || 'Falha ao gravar análise')

      const analysisId = upserted.id as string

      if (sourceFile) {
        assertFileSize(sourceFile.size)
        const buf = Buffer.from(await sourceFile.arrayBuffer())
        const kind = detectDocumentKind(buf)
        const ext =
          sourceFile.name.toLowerCase().endsWith('.docx') || kind === 'docx' ? 'docx' : 'pdf'
        if (!kind || (ext === 'docx' && kind !== 'docx') || (ext === 'pdf' && kind !== 'pdf')) {
          throw new Error('Tipo de arquivo inválido para armazenamento')
        }
        const safeName = sourceFile.name.replace(/[^\w.\-]/g, '_').slice(0, 180)
        const path = `${user.userId}/${analysisId}/${safeName}`
        const { error: upErr } = await admin.storage.from('analysis-documents').upload(path, buf, {
          contentType: sourceFile.type || (kind === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
          upsert: true,
        })
        if (!upErr) {
          await admin
            .from('analyses')
            .update({ source_file_url: path, source_file_name: sourceFile.name })
            .eq('id', analysisId)
        }
      }

      await admin.from('events').update({ status: 'completed', credits_used: 1 }).eq('id', eventId)
    } catch (err) {
      await admin.from('events').update({ status: 'failed' }).eq('id', eventId)
      console.error(err)
      return jsonError(err instanceof Error ? err.message : 'Falha na análise SERA', 500)
    }

    return NextResponse.json({ event_id: eventId, status: 'completed' })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
