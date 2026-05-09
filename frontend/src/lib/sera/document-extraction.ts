import mammoth from 'mammoth'
import PDFParse from 'pdf-parse-fork'

const MAX_BYTES = 10 * 1024 * 1024

export class DocumentExtractError extends Error {
  constructor(
    public code:
      | 'INVALID_TYPE'
      | 'TOO_LARGE'
      | 'PDF_PASSWORD'
      | 'PDF_NO_TEXT'
      | 'CORRUPT'
      | 'PARSE_FAILED',
    message: string
  ) {
    super(message)
    this.name = 'DocumentExtractError'
  }
}

export function detectDocumentKind(buffer: Uint8Array): 'pdf' | 'docx' | null {
  if (buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return 'pdf'
  }
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07) &&
    (buffer[3] === 0x04 || buffer[3] === 0x06 || buffer[3] === 0x08)
  ) {
    return 'docx'
  }
  return null
}

/** Remove linhas em branco excessivas; heurística leve para linhas curtas repetidas (cabeçalhos). */
export function cleanExtractedText(raw: string): string {
  let s = raw.replace(/\r\n/g, '\n').replace(/\u00a0/g, ' ')
  const lines = s.split('\n')
  const seen = new Map<string, number>()
  const out: string[] = []
  for (const line of lines) {
    const t = line.trim()
    if (t.length > 0 && t.length < 120) {
      const n = (seen.get(t) ?? 0) + 1
      seen.set(t, n)
      if (n >= 4) continue
    }
    out.push(line)
  }
  s = out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  return s
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length
}

export async function extractTextFromBuffer(
  buffer: Buffer,
  kind: 'pdf' | 'docx',
  _fileName: string
): Promise<string> {
  if (buffer.length > MAX_BYTES) {
    throw new DocumentExtractError('TOO_LARGE', 'O arquivo não pode ultrapassar 10MB')
  }

  if (kind === 'docx') {
    try {
      const { value } = await mammoth.extractRawText({ buffer })
      return value || ''
    } catch {
      throw new DocumentExtractError('CORRUPT', 'Não foi possível ler o arquivo. Verifique se ele está corrompido.')
    }
  }

  const parser = new PDFParse({ data: new Uint8Array(buffer) })
  try {
    const textResult = await parser.getText()
    await parser.destroy().catch(() => {})
    const text = (textResult.text || '').trim()
    if (!text || text.length < 25) {
      throw new DocumentExtractError('PDF_NO_TEXT', '')
    }
    return textResult.text || ''
  } catch (err) {
    await parser.destroy().catch(() => {})
    if (err instanceof DocumentExtractError) {
      if (err.code === 'PDF_NO_TEXT') {
        throw new DocumentExtractError(
          'PDF_NO_TEXT',
          'Este PDF contém apenas imagens e não pode ser processado automaticamente. Por favor, digite o texto manualmente.'
        )
      }
      throw err
    }
    const msg = err instanceof Error ? err.message.toLowerCase() : ''
    if (msg.includes('password') || msg.includes('encrypt')) {
      throw new DocumentExtractError(
        'PDF_PASSWORD',
        'Este PDF está protegido. Remova a senha antes de fazer o upload.'
      )
    }
    if (msg.includes('invalid') || msg.includes('eof') || msg.includes('xref')) {
      throw new DocumentExtractError(
        'CORRUPT',
        'Não foi possível ler o arquivo. Verifique se ele está corrompido.'
      )
    }
    throw new DocumentExtractError(
      'PARSE_FAILED',
      'Não foi possível ler o arquivo. Verifique se ele está corrompido.'
    )
  }
}

export function assertFileSize(size: number) {
  if (size > MAX_BYTES) {
    throw new DocumentExtractError('TOO_LARGE', 'O arquivo não pode ultrapassar 10MB')
  }
}
