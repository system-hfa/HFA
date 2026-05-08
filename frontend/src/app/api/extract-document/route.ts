import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import {
  assertFileSize,
  cleanExtractedText,
  countWords,
  detectDocumentKind,
  DocumentExtractError,
  extractTextFromBuffer,
} from '@/lib/sera/document-extraction'

const UPLOADS_PER_HOUR = 10

function clientError(code: DocumentExtractError['code'] | 'RATE_LIMIT', message: string) {
  return NextResponse.json({ error: code, message }, { status: 400 })
}

export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count, error: cErr } = await admin
      .from('sera_document_uploads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.userId)
      .gte('created_at', since)

    if (cErr) {
      console.warn('upload rate count:', cErr.message)
    } else if ((count ?? 0) >= UPLOADS_PER_HOUR) {
      return clientError(
        'RATE_LIMIT',
        'Limite de uploads atingido: no máximo 10 extrações por hora. Tente mais tarde.'
      )
    }

    const ct = req.headers.get('content-type') || ''
    if (!ct.includes('multipart/form-data')) {
      return NextResponse.json({ detail: 'Use multipart/form-data com campo "file"' }, { status: 400 })
    }

    const form = await req.formData()
    const file = form.get('file')
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ detail: 'Campo "file" obrigatório' }, { status: 400 })
    }

    assertFileSize(file.size)

    const lower = file.name.toLowerCase()
    if (!lower.endsWith('.pdf') && !lower.endsWith('.docx')) {
      return clientError('INVALID_TYPE', 'Apenas arquivos PDF ou DOCX são aceitos')
    }

    const buf = Buffer.from(await file.arrayBuffer())
    const kind = detectDocumentKind(buf)
    if (!kind) {
      return clientError('INVALID_TYPE', 'Apenas arquivos PDF ou DOCX são aceitos')
    }
    if (lower.endsWith('.pdf') && kind !== 'pdf') {
      return clientError('INVALID_TYPE', 'Apenas arquivos PDF ou DOCX são aceitos')
    }
    if (lower.endsWith('.docx') && kind !== 'docx') {
      return clientError('INVALID_TYPE', 'Apenas arquivos PDF ou DOCX são aceitos')
    }

    let raw: string
    try {
      raw = await extractTextFromBuffer(buf, kind, file.name)
    } catch (e) {
      if (e instanceof DocumentExtractError) {
        return NextResponse.json({ error: e.code, message: e.message }, { status: 400 })
      }
      throw e
    }

    const text = cleanExtractedText(raw)
    const wordCount = countWords(text)

    await admin.from('sera_document_uploads').insert({ user_id: user.userId })

    return NextResponse.json({
      text,
      wordCount,
      fileName: file.name,
    })
  } catch (e) {
    if (e instanceof Response) return e
    console.error(e)
    return NextResponse.json(
      { error: 'PARSE_FAILED', message: 'Não foi possível ler o arquivo. Verifique se ele está corrompido.' },
      { status: 400 }
    )
  }
}
