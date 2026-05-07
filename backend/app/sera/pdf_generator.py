from pathlib import Path
import json


def generate_html_report(analysis: dict, event: dict) -> str:
    def badge(code: str) -> str:
        return f'<span class="badge">{code}</span>'

    recs = analysis.get("recommendations", [])
    recs_html = "".join([
        f'<div class="recommendation"><strong>{r["title"]}</strong> {badge(r.get("related_code",""))}<p>{r["description"]}</p></div>'
        for r in recs
    ])

    preconds = analysis.get("preconditions", [])
    pre_html = "".join([
        f'<tr><td class="code">{p["code"]}</td><td><strong>{p.get("name","")}</strong><br><small>{p.get("justification","")}</small></td></tr>'
        for p in preconds
    ])

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
  body {{ font-family: Arial, sans-serif; color: #1e293b; padding: 40px; max-width: 900px; margin: 0 auto; }}
  h1 {{ color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px; }}
  h2 {{ color: #1e40af; margin-top: 32px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }}
  .meta {{ color: #64748b; font-size: 13px; margin-bottom: 32px; }}
  .failure-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0; }}
  .failure-card {{ border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }}
  .failure-card .code {{ font-size: 24px; font-weight: bold; color: #1e40af; }}
  .failure-card .name {{ font-weight: bold; margin: 4px 0; }}
  .failure-card .just {{ font-size: 12px; color: #64748b; }}
  .badge {{ background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: bold; }}
  table {{ width: 100%; border-collapse: collapse; }}
  td, th {{ padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }}
  td.code {{ font-family: monospace; color: #d97706; font-weight: bold; width: 60px; }}
  .recommendation {{ border-left: 3px solid #1e40af; padding: 8px 16px; margin: 8px 0; }}
  .recommendation p {{ font-size: 13px; color: #64748b; margin: 4px 0 0; }}
  .section {{ background: #f8fafc; border-radius: 8px; padding: 16px; margin: 8px 0; font-size: 14px; line-height: 1.6; }}
  .footer {{ margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }}
</style>
</head>
<body>
  <h1>Relatório de Análise SERA</h1>
  <p class="meta">
    <strong>{event.get('title','')}</strong><br>
    {event.get('operation_type','')} • {event.get('aircraft_type','')} •
    Gerado em {__import__('datetime').datetime.now().strftime('%d/%m/%Y às %H:%M')}
  </p>

  <h2>Etapa 1 — Resumo do Evento</h2>
  <div class="section">{analysis.get('event_summary','')}</div>

  <h2>Etapa 2 — Ponto de Fuga da Operação Segura</h2>
  <div class="section">
    {analysis.get('escape_point','')}
    <br><br>
    <strong>Agente:</strong> {analysis.get('unsafe_agent','')}<br>
    <strong>Ato inseguro:</strong> {analysis.get('unsafe_act','')}
  </div>

  <h2>Etapas 3, 4 e 5 — Falhas Ativas</h2>
  <div class="failure-grid">
    <div class="failure-card">
      <div class="code">{analysis.get('perception_code','')}</div>
      <div class="name">{analysis.get('perception_name','')}</div>
      <div class="just">{analysis.get('perception_justification','')[:300]}...</div>
    </div>
    <div class="failure-card">
      <div class="code">{analysis.get('objective_code','')}</div>
      <div class="name">{analysis.get('objective_name','')}</div>
      <div class="just">{analysis.get('objective_justification','')[:300]}...</div>
    </div>
    <div class="failure-card">
      <div class="code">{analysis.get('action_code','')}</div>
      <div class="name">{analysis.get('action_name','')}</div>
      <div class="just">{analysis.get('action_justification','')[:300]}...</div>
    </div>
  </div>

  <h2>Pré-condições Identificadas</h2>
  <table><tbody>{pre_html}</tbody></table>

  <h2>Etapa 6 — Conclusões</h2>
  <div class="section">{analysis.get('conclusions','')}</div>

  <h2>Etapa 7 — Recomendações</h2>
  {recs_html}

  <div class="footer">
    HFA Platform — Human Factor Analysis • Metodologia SERA (Systematic Error and Risk Analysis)
  </div>
</body>
</html>"""


def generate_pdf(analysis: dict, event: dict) -> bytes:
    from weasyprint import HTML
    html = generate_html_report(analysis, event)
    return HTML(string=html).write_pdf()
