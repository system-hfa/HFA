import datetime


def generate_html_report(analysis: dict, event: dict) -> str:
    def badge(code: str) -> str:
        return f'<span class="badge">{code}</span>'

    def s(v, fallback="—"):
        return v if v else fallback

    # Narrative summary: prefer AI-generated, fall back to raw event summary
    summary_text = s(analysis.get("summary") or analysis.get("event_summary"))

    recs = analysis.get("recommendations", []) or []
    recs_html = "".join([
        f'''<div class="rec">
          <div class="rec-head">{badge(r.get("related_code",""))} {r.get("title","")}</div>
          <p>{r.get("description","")}</p>
        </div>'''
        for r in recs
    ])

    preconds = analysis.get("preconditions", []) or []
    pre_html = "".join([
        f'''<tr>
          <td class="code">{p.get("code","")}</td>
          <td><strong>{p.get("name","")}</strong>
          {f'<span class="stage">Etapa {p["etapa"]}</span>' if p.get("etapa") else ""}
          <br><small>{p.get("justification","")}</small></td>
        </tr>'''
        for p in preconds
    ])

    date_val = ""
    if event.get("occurred_at"):
        try:
            date_val = datetime.datetime.fromisoformat(
                event["occurred_at"].replace("Z", "+00:00")
            ).strftime("%d/%m/%Y")
        except Exception:
            date_val = event["occurred_at"]
    else:
        date_val = datetime.date.today().strftime("%d/%m/%Y")

    generated_at = datetime.datetime.now().strftime("%d/%m/%Y às %H:%M")

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
  * {{ box-sizing: border-box; }}
  body {{ font-family: Arial, sans-serif; color: #1e293b; padding: 36px 48px; max-width: 960px; margin: 0 auto; font-size: 13px; line-height: 1.55; }}
  h1 {{ color: #1e3a8a; font-size: 20px; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 4px; }}
  .meta {{ color: #64748b; font-size: 12px; margin-bottom: 28px; }}
  h2 {{ color: #1e3a8a; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin: 28px 0 8px; border-left: 3px solid #1e3a8a; padding-left: 8px; }}
  .section {{ background: #f8fafc; border-radius: 6px; padding: 12px 16px; margin: 4px 0; font-size: 13px; }}
  .meta-grid {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px; }}
  .meta-item {{ background: #f1f5f9; border-radius: 4px; padding: 6px 10px; }}
  .meta-item label {{ display: block; font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }}
  .escape {{ background: #fefce8; border: 1px solid #fde047; border-radius: 6px; padding: 12px 16px; }}
  .escape-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }}
  .escape-item {{ background: #fef9c3; border-radius: 4px; padding: 6px 10px; }}
  .escape-item label {{ font-size: 10px; color: #92400e; text-transform: uppercase; letter-spacing: .5px; display: block; margin-bottom: 2px; }}
  .failure-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 8px 0; }}
  .failure-card {{ border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; }}
  .failure-card .code {{ font-size: 22px; font-weight: 700; color: #166534; }}
  .failure-card .name {{ font-weight: 600; margin: 4px 0 6px; font-size: 12px; }}
  .failure-card .just {{ font-size: 11px; color: #64748b; }}
  .badge {{ background: #dbeafe; color: #1e40af; padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 700; }}
  table {{ width: 100%; border-collapse: collapse; }}
  td, th {{ padding: 7px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; vertical-align: top; }}
  td.code {{ font-family: monospace; color: #b45309; font-weight: 700; width: 56px; }}
  .stage {{ display: inline-block; background: #f1f5f9; color: #64748b; font-size: 10px; border-radius: 3px; padding: 1px 5px; margin-left: 4px; }}
  .rec {{ border-left: 3px solid #1e40af; padding: 8px 12px; margin: 6px 0; background: #f8fafc; }}
  .rec-head {{ font-weight: 600; margin-bottom: 4px; }}
  .rec p {{ font-size: 12px; color: #475569; margin: 2px 0 0; }}
  .footer {{ margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; text-align: center; }}
  @media print {{
    body {{ padding: 20px; }}
    h2 {{ page-break-after: avoid; }}
  }}
</style>
</head>
<body>
  <h1>Relatório de Análise SERA</h1>
  <p class="meta">
    <strong>{s(event.get("title"))}</strong> &nbsp;·&nbsp;
    {s(event.get("operation_type"))} &nbsp;·&nbsp; {s(event.get("aircraft_type"))} &nbsp;·&nbsp;
    Gerado em {generated_at}
  </p>

  <!-- ETAPA 1 -->
  <h2>Etapa 1 — Resumo do Evento</h2>
  <div class="meta-grid">
    <div class="meta-item"><label>Data do evento</label>{date_val}</div>
    <div class="meta-item"><label>Tipo de operação</label>{s(event.get("operation_type"))}</div>
    <div class="meta-item"><label>Aeronave / tipo</label>{s(event.get("aircraft_type"))}</div>
  </div>
  <div class="section">{summary_text}</div>

  <!-- ETAPA 2 -->
  <h2>Etapa 2 — Ponto de Fuga da Operação Segura</h2>
  <div class="escape">
    <p>{s(analysis.get("escape_point"))}</p>
    <div class="escape-grid">
      <div class="escape-item"><label>Agente</label>{s(analysis.get("unsafe_agent"))}</div>
      <div class="escape-item"><label>Ato Inseguro</label>{s(analysis.get("unsafe_act"))}</div>
    </div>
  </div>

  <!-- ETAPAS 3/4/5 -->
  <h2>Etapas 3 · 4 · 5 — Falhas Ativas</h2>
  <div class="failure-grid">
    <div class="failure-card">
      <div class="code">{s(analysis.get("perception_code"))}</div>
      <div class="name">Falha de Percepção<br>{s(analysis.get("perception_name"))}</div>
      <div class="just">{s(analysis.get("perception_justification",""))[:400]}</div>
    </div>
    <div class="failure-card">
      <div class="code">{s(analysis.get("objective_code"))}</div>
      <div class="name">Falha de Objetivo<br>{s(analysis.get("objective_name"))}</div>
      <div class="just">{s(analysis.get("objective_justification",""))[:400]}</div>
    </div>
    <div class="failure-card">
      <div class="code">{s(analysis.get("action_code"))}</div>
      <div class="name">Falha de Ação<br>{s(analysis.get("action_name"))}</div>
      <div class="just">{s(analysis.get("action_justification",""))[:400]}</div>
    </div>
  </div>

  <!-- PRÉ-CONDIÇÕES -->
  <h2>Pré-condições Identificadas</h2>
  <table>
    <tbody>{pre_html if pre_html else "<tr><td colspan='2' style='color:#94a3b8'>Nenhuma pré-condição registrada.</td></tr>"}</tbody>
  </table>

  <!-- ETAPA 6 -->
  <h2>Etapa 6 — Conclusão da Análise</h2>
  <div class="section">{s(analysis.get("conclusions"))}</div>

  <!-- ETAPA 7 -->
  <h2>Etapa 7 — Ações de Mitigação e Prevenção</h2>
  {recs_html if recs_html else '<div class="section" style="color:#94a3b8">Nenhuma recomendação registrada.</div>'}

  <div class="footer">
    HFA Platform — Human Factor Analysis &nbsp;·&nbsp; Metodologia SERA (Systematic Error and Risk Analysis)
  </div>
</body>
</html>"""


def generate_pdf(analysis: dict, event: dict) -> bytes:
    from weasyprint import HTML
    html = generate_html_report(analysis, event)
    return HTML(string=html).write_pdf()
