import PDFDocument from 'pdfkit'

function s(v: unknown, fallback = '—'): string {
  if (v === null || v === undefined || v === '') return fallback
  return String(v)
}

/** PDF textual compacto (substitui WeasyPrint no ambiente serverless). */
export function generateSeraPdfBuffer(
  analysis: Record<string, unknown>,
  event: Record<string, unknown>
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' })
    const chunks: Buffer[] = []
    doc.on('data', (c) => chunks.push(c as Buffer))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const summaryText = s(
      analysis.summary || analysis.event_summary,
      ''
    )

    doc.fontSize(16).fillColor('#1e3a8a').text('Relatório de Análise SERA', { align: 'center' })
    doc.moveDown(0.5)
    doc.fontSize(10).fillColor('#64748b').text(
      `${s(event.title)} · ${s(event.operation_type)} · ${s(event.aircraft_type)}`,
      { align: 'center' }
    )
    doc.moveDown(1.2)

    doc.fillColor('#1e293b').fontSize(11).text('Etapa 1 — Resumo do Evento', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(10).text(summaryText || '—', { align: 'justify' })
    doc.moveDown(1)

    doc.fontSize(11).text('Etapa 2 — Ponto de Fuga', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(10).text(s(analysis.escape_point), { align: 'justify' })
    doc.moveDown(0.3)
    doc.fontSize(10).text(`Agente: ${s(analysis.unsafe_agent)}`)
    doc.text(`Ato inseguro: ${s(analysis.unsafe_act)}`)
    doc.moveDown(1)

    doc.fontSize(11).text('Etapas 3 · 4 · 5 — Falhas', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(10)
    doc.text(`Percepção: ${s(analysis.perception_code)} — ${s(analysis.perception_name)}`)
    doc.text(s(analysis.perception_justification).slice(0, 900))
    doc.moveDown(0.3)
    doc.text(`Objetivo: ${s(analysis.objective_code)} — ${s(analysis.objective_name)}`)
    doc.text(s(analysis.objective_justification).slice(0, 900))
    doc.moveDown(0.3)
    doc.text(`Ação: ${s(analysis.action_code)} — ${s(analysis.action_name)}`)
    doc.text(s(analysis.action_justification).slice(0, 900))
    doc.moveDown(1)

    const preconds = (analysis.preconditions as Array<Record<string, unknown>>) || []
    doc.fontSize(11).text('Pré-condições', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(9)
    if (!preconds.length) {
      doc.fillColor('#94a3b8').text('Nenhuma pré-condição registrada.')
    } else {
      for (const p of preconds) {
        doc.fillColor('#1e293b').text(
          `${s(p.code)} — ${s(p.name)} (etapa ${s(p.etapa)})`,
          { continued: false }
        )
        doc.fillColor('#475569').text(s(p.justification).slice(0, 400))
        doc.moveDown(0.2)
      }
    }
    doc.moveDown(0.8)
    doc.fillColor('#1e293b').fontSize(11).text('Conclusões', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(10).text(s(analysis.conclusions), { align: 'justify' })
    doc.moveDown(1)

    const recs = (analysis.recommendations as Array<Record<string, unknown>>) || []
    doc.fontSize(11).text('Recomendações', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(9)
    if (!recs.length) {
      doc.fillColor('#94a3b8').text('Nenhuma recomendação registrada.')
    } else {
      for (const r of recs) {
        doc.fillColor('#1e293b').text(`${s(r.related_code)} — ${s(r.title)}`)
        doc.fillColor('#475569').text(s(r.description).slice(0, 450))
        doc.moveDown(0.25)
      }
    }

    doc.moveDown(1)
    doc.fontSize(8).fillColor('#94a3b8').text(
      'HFA Platform — Metodologia SERA (Systematic Error and Risk Analysis)',
      { align: 'center' }
    )

    doc.end()
  })
}
