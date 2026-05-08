import { NextResponse } from 'next/server'

/**
 * FASE 2 — Entrada por PDF (placeholder)
 *
 * Quando necessário, implementar como Vercel Python Serverless Function (ex.: `/api/extract-pdf.py`
 * na pasta `api/`), extraindo texto com pdfplumber e encaminhando para o pipeline TypeScript
 * como narrativa em texto puro. O endpoint atual exposto em Node é `/api/extract-document`
 * (pdf-parse + mammoth).
 */
export async function POST() {
  return NextResponse.json(
    {
      detail:
        'Placeholder: extração PDF em Python será configurada como serverless function na Fase 2. Use POST /api/extract-document para PDF/DOCX.',
    },
    { status: 501 }
  )
}
