import type { SupabaseClient } from '@supabase/supabase-js'
import { buildAnalysisUpsertPayload, runSeraPipeline, type SourceMeta } from '@/lib/sera/pipeline'
import { assertFileSize, detectDocumentKind } from '@/lib/sera/document-extraction'

type UserCtx = { userId: string; tenantId: string }

/**
 * Após o evento existir (e crédito debitado), executa o pipeline SERA,
 * faz upsert em analyses e upload opcional do documento original.
 */
export async function completeSeraAnalysisAfterEventCreated(
  admin: SupabaseClient,
  user: UserCtx,
  eventId: string,
  rawInput: string,
  sourceMeta: SourceMeta,
  sourceFile: File | null
): Promise<{ analysisId: string }> {
  await admin.from('events').update({ status: 'processing' }).eq('id', eventId)

  sourceMeta.sourceType = sourceMeta.sourceType ?? 'text'

  const steps = await runSeraPipeline(rawInput)
  const payload = buildAnalysisUpsertPayload(eventId, user.tenantId, rawInput, steps, sourceMeta)

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
    const ext = sourceFile.name.toLowerCase().endsWith('.docx') || kind === 'docx' ? 'docx' : 'pdf'
    if (!kind || (ext === 'docx' && kind !== 'docx') || (ext === 'pdf' && kind !== 'pdf')) {
      throw new Error('Tipo de arquivo inválido para armazenamento')
    }
    const safeName = sourceFile.name.replace(/[^\w.\-]/g, '_').slice(0, 180)
    const path = `${user.userId}/${analysisId}/${safeName}`
    const { error: upErr } = await admin.storage.from('analysis-documents').upload(path, buf, {
      contentType:
        sourceFile.type ||
        (kind === 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
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

  return { analysisId }
}

/** Remove objeto do bucket analysis-documents quando existir path salvo na análise. */
export async function deleteAnalysisStorageObject(
  admin: SupabaseClient,
  sourceFileUrl: string | null | undefined
) {
  if (!sourceFileUrl?.trim()) return
  await admin.storage.from('analysis-documents').remove([sourceFileUrl.trim()])
}
