import json
from pathlib import Path
from app.config import settings
from app.database import get_supabase_admin
from app.sera.ai_provider import call_ai

DOCS_PATH = Path(__file__).parent / "documents"


def load_doc(filename: str) -> str:
    path = DOCS_PATH / filename
    if path.exists():
        return path.read_text(encoding="utf-8")
    return "{}"


async def run_analysis(event_id: str, raw_input: str, tenant_id: str):
    admin = get_supabase_admin()

    # Atualiza status para processing
    admin.table("events")\
        .update({"status": "processing"})\
        .eq("id", event_id)\
        .execute()

    try:
        results = {}

        # CHAMADA 1: Etapas 1 e 2
        system_1 = f"""Você é um analista SERA. Analise o evento e retorne JSON com:
{{
  "event_summary": "resumo detalhado do evento",
  "escape_point": "descrição do ponto de fuga da operação segura",
  "unsafe_agent": "agente do ato inseguro",
  "unsafe_act": "descrição do ato inseguro"
}}
Baseie-se nesta referência metodológica:
{load_doc('point.json')}
Retorne APENAS o JSON, sem texto adicional."""

        r1 = call_ai(system_1, f"RELATO DO EVENTO:\n{raw_input}")
        results["step_1_2"] = json.loads(r1)

        # CHAMADA 2: Etapa 3 - Percepção
        system_3 = f"""Você é um analista SERA. Analise a FALHA DE PERCEPÇÃO seguindo RIGOROSAMENTE o fluxo abaixo.
Percorra cada pergunta do fluxo em sequência e justifique cada resposta.
Retorne JSON:
{{
  "perception_code": "P-X",
  "perception_name": "nome da falha",
  "perception_justification": "justificativa detalhada com o fluxo percorrido",
  "perception_discarded": [{{"code": "P-X", "justification": "motivo"}}],
  "preconditions_step3": [{{"code": "XX", "name": "nome", "justification": "justificativa"}}]
}}

FLUXO OBRIGATÓRIO:
{load_doc('3-flow.json')}

FALHAS DISPONÍVEIS:
{load_doc('3-failures.json')}

PRÉ-CONDIÇÕES:
{load_doc('3-pre.json')}

Retorne APENAS o JSON."""

        context_3 = f"""RELATO: {raw_input}
RESUMO DO EVENTO: {results['step_1_2']['event_summary']}
ATO INSEGURO: {results['step_1_2']['unsafe_act']}
AGENTE: {results['step_1_2']['unsafe_agent']}"""

        r3 = call_ai(system_3, context_3)
        results["step_3"] = json.loads(r3)

        # CHAMADA 3: Etapa 4 - Objetivo
        system_4 = f"""Você é um analista SERA. Analise a FALHA DE OBJETIVO seguindo RIGOROSAMENTE o fluxo.
Retorne JSON:
{{
  "objective_code": "O-X",
  "objective_name": "nome da falha",
  "objective_justification": "justificativa com fluxo percorrido",
  "objective_discarded": [{{"code": "O-X", "justification": "motivo"}}],
  "preconditions_step4": [{{"code": "XX", "name": "nome", "justification": "justificativa"}}]
}}

FLUXO OBRIGATÓRIO:
{load_doc('4-flow.json')}

FALHAS DISPONÍVEIS:
{load_doc('4-failures.json')}

PRÉ-CONDIÇÕES:
{load_doc('4-pre.json')}

Retorne APENAS o JSON."""

        context_4 = f"""RELATO: {raw_input}
ATO INSEGURO: {results['step_1_2']['unsafe_act']}
FALHA DE PERCEPÇÃO IDENTIFICADA: {results['step_3']['perception_code']} — {results['step_3']['perception_name']}"""

        r4 = call_ai(system_4, context_4)
        results["step_4"] = json.loads(r4)

        # CHAMADA 4: Etapa 5 - Ação
        system_5 = f"""Você é um analista SERA. Analise a FALHA DE AÇÃO seguindo RIGOROSAMENTE o fluxo.
Retorne JSON:
{{
  "action_code": "A-X",
  "action_name": "nome da falha",
  "action_justification": "justificativa com fluxo percorrido",
  "action_discarded": [{{"code": "A-X", "justification": "motivo"}}],
  "preconditions_step5": [{{"code": "XX", "name": "nome", "justification": "justificativa"}}]
}}

FLUXO OBRIGATÓRIO:
{load_doc('5-flow.json')}

FALHAS DISPONÍVEIS:
{load_doc('5-failures.json')}

PRÉ-CONDIÇÕES:
{load_doc('5-pre.json')}

Retorne APENAS o JSON."""

        context_5 = f"""RELATO: {raw_input}
ATO INSEGURO: {results['step_1_2']['unsafe_act']}
FALHA DE PERCEPÇÃO: {results['step_3']['perception_code']}
FALHA DE OBJETIVO: {results['step_4']['objective_code']}"""

        r5 = call_ai(system_5, context_5)
        results["step_5"] = json.loads(r5)

        # CHAMADA 5: Etapas 6 e 7
        system_6_7 = """Você é um analista SERA. Com base nas falhas identificadas, elabore conclusões e recomendações práticas.
Retorne JSON:
{
  "conclusions": "texto das conclusões integradas",
  "recommendations": [
    {
      "title": "título da recomendação",
      "description": "descrição detalhada e acionável",
      "related_code": "código da falha relacionada"
    }
  ]
}
Retorne APENAS o JSON."""

        context_6_7 = f"""RESUMO: {results['step_1_2']['event_summary']}
PONTO DE FUGA: {results['step_1_2']['escape_point']}
PERCEPÇÃO: {results['step_3']['perception_code']} — {results['step_3']['perception_justification']}
OBJETIVO: {results['step_4']['objective_code']} — {results['step_4']['objective_justification']}
AÇÃO: {results['step_5']['action_code']} — {results['step_5']['action_justification']}"""

        r6_7 = call_ai(system_6_7, context_6_7)
        results["step_6_7"] = json.loads(r6_7)

        # Consolida pré-condições de todas as etapas
        all_preconditions = []
        for stage, key in [("3", "preconditions_step3"), ("4", "preconditions_step4"), ("5", "preconditions_step5")]:
            for p in results.get(f"step_{stage}", {}).get(key, []):
                p["stage"] = stage
                all_preconditions.append(p)

        # Salva análise no banco
        analysis = admin.table("analyses").insert({
            "event_id": event_id,
            "tenant_id": tenant_id,
            "event_summary": results["step_1_2"]["event_summary"],
            "escape_point": results["step_1_2"]["escape_point"],
            "unsafe_agent": results["step_1_2"]["unsafe_agent"],
            "unsafe_act": results["step_1_2"]["unsafe_act"],
            "perception_code": results["step_3"]["perception_code"],
            "perception_name": results["step_3"]["perception_name"],
            "perception_justification": results["step_3"]["perception_justification"],
            "perception_discarded": results["step_3"]["perception_discarded"],
            "objective_code": results["step_4"]["objective_code"],
            "objective_name": results["step_4"]["objective_name"],
            "objective_justification": results["step_4"]["objective_justification"],
            "objective_discarded": results["step_4"]["objective_discarded"],
            "action_code": results["step_5"]["action_code"],
            "action_name": results["step_5"]["action_name"],
            "action_justification": results["step_5"]["action_justification"],
            "action_discarded": results["step_5"]["action_discarded"],
            "conclusions": results["step_6_7"]["conclusions"],
            "recommendations": results["step_6_7"]["recommendations"],
            "preconditions": all_preconditions,
            "raw_llm_output": results
        }).execute()

        analysis_id = analysis.data[0]["id"]

        # Cria ações corretivas automaticamente
        for rec in results["step_6_7"]["recommendations"]:
            admin.table("corrective_actions").insert({
                "analysis_id": analysis_id,
                "tenant_id": tenant_id,
                "title": rec["title"],
                "description": rec["description"],
                "related_failure": rec.get("related_code"),
                "status": "pending"
            }).execute()

        # Atualiza status do evento
        admin.table("events")\
            .update({"status": "completed", "credits_used": 1})\
            .eq("id", event_id)\
            .execute()

    except Exception as e:
        admin.table("events")\
            .update({"status": "failed"})\
            .eq("id", event_id)\
            .execute()
        raise e
