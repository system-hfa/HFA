import json
import asyncio
from pathlib import Path
from app.sera.ai_provider import call_ai
from app.database import get_supabase_admin

DOCS_PATH = Path(__file__).parent / "documents"

FAILURE_NAMES: dict[str, str] = {
    # Percepção
    "P-A": "Nenhuma Falha de Percepção",
    "P-B": "Falha Sensorial / Perceptual",
    "P-C": "Falha de Conhecimento / Reconhecimento",
    "P-D": "Falha de Memória",
    "P-E": "Falha no Gerenciamento do Tempo",
    "P-F": "Falha de Percepção / Informação Ambígua",
    "P-G": "Falha de Atenção",
    "P-H": "Falha de Comunicação / Informação",
    # Objetivo
    "O-A": "Nenhuma Falha de Objetivo",
    "O-B": "Violação Rotineira",
    "O-C": "Violação Excepcional",
    "O-D": "Falha de Intenção / Não Violação",
    # Ação
    "A-A": "Deslize, Lapso ou Erro de Execução",
    "A-B": "Falha de Feedback",
    "A-C": "Falha de Procedimento",
    "A-D": "Inabilidade para Resposta",
    "A-E": "Falha de Conhecimento / Decisão",
    "A-F": "Falha na Seleção da Ação",
    "A-G": "Lapso de Memória / Atenção",
    "A-H": "Falha no Gerenciamento do Tempo",
    "A-I": "Erro de Execução Motora",
}


def load_doc(filename: str, max_chars: int = 6000) -> str:
    path = DOCS_PATH / filename
    if path.exists():
        content = path.read_text(encoding="utf-8")
        return content[:max_chars] if len(content) > max_chars else content
    return "{}"


def safe_parse(raw: str, step: str) -> dict:
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Falha ao parsear JSON na {step}. Erro: {e}. Resposta: {raw[:500]}")


def ask(system: str, question: str) -> str:
    return call_ai(system, question)


# ── ETAPA 2: Ponto de Fuga ────────────────────────────────────────────────────

def run_step2(relato: str) -> dict:
    system = f"""Você é um especialista em análise SERA. Siga RIGOROSAMENTE as regras do Point.json.
{load_doc('Point.json')}

REGRAS OBRIGATÓRIAS:
1. Descreva o ato inseguro de forma FACTUAL — sem motivações, causas ou interpretações
2. Identifique UM ÚNICO agente e UM ÚNICO ato inseguro
3. NÃO inclua fatores latentes na descrição
4. Use apenas o que está explícito no relato"""

    r = ask(system, f"""Relato: {relato}

Responda APENAS com JSON:
{{
  "agente": "quem realizou o ato inseguro",
  "ato_inseguro_factual": "descrição objetiva e factual do que foi feito, sem causas ou motivações",
  "momento": "quando ocorreu na sequência do evento",
  "justificativa": "por que este é o ponto de fuga e não outro momento"
}}""")
    return safe_parse(r, "Etapa 2")


# ── ETAPA 3: Percepção — fluxo nó por nó ─────────────────────────────────────

def run_step3(relato: str, ponto_fuga: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Percepção (3-Flow.json).
Fluxo: {load_doc('3 - Flow.json')}
Falhas: {load_doc('3 - Failures.json', max_chars=4000)}"""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    # Nó 1: Capacidade sensorial
    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — O operador possuía capacidade sensorial e perceptual para perceber as informações relevantes no momento do ato inseguro?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 3 - Nó 1")

    if no1["resposta"].lower() == "não":
        codigo = "P-B"
        return _build_step3_result(codigo, [no1], "P-B e P-C descartadas pois resposta foi Não no Nó 1")

    # Nó 2: Pressão do tempo
    r2 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}
Nó 1: Capacidade sensorial = SIM (P-B e P-C DESCARTADAS)

NÓ 2 — Havia pressão de tempo extrema que impediu a percepção adequada?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 3 - Nó 2")

    if no2["resposta"].lower() == "sim":
        codigo = "P-E"
        return _build_step3_result(codigo, [no1, no2], "P-D descartada; pressão de tempo confirmada")

    # Nó 3: Informação disponível mas não percebida
    r3 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}
Nó 1: Capacidade = SIM | Nó 2: Pressão de tempo = NÃO (P-D e P-E DESCARTADAS)

NÓ 3 — A informação estava disponível no ambiente mas o operador não a percebeu ou interpretou incorretamente?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no3 = safe_parse(r3, "Etapa 3 - Nó 3")

    codigo = "P-F" if no3["resposta"].lower() == "sim" else "P-A"
    descartadas = "P-B, P-C, P-D, P-E descartadas pelos nós anteriores"
    return _build_step3_result(codigo, [no1, no2, no3], descartadas)


def _build_step3_result(codigo, nos, descartadas):
    return {
        "codigo": codigo,
        "nos_percorridos": nos,
        "falhas_descartadas": descartadas
    }


# ── ETAPA 4: Objetivo — fluxo nó por nó ──────────────────────────────────────

def run_step4(relato: str, ponto_fuga: dict, step3: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Objetivo (4-Flow.json).
Fluxo: {load_doc('4 - Flow.json')}
Falhas: {load_doc('4 - Failures.json', max_chars=4000)}"""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    # Nó 1: Objetivo consistente com normas
    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — O OBJETIVO do operador (o que ele pretendia alcançar) era consistente com as normas e regulamentos vigentes?
ATENÇÃO: Avalie o OBJETIVO (intenção), NÃO a forma de execução.
Responda APENAS com JSON: {{"resposta": "Sim/Não", "objetivo_identificado": "...", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 4 - Nó 1")

    if no1["resposta"].lower() == "não":
        # Nó 2: Violação rotineira vs excepcional
        r2 = ask(system, f"""Nó 1: Objetivo NÃO consistente com normas (O-D DESCARTADA)

NÓ 2 — Esta violação é rotineira (ocorre frequentemente no contexto operacional) ou excepcional (situação incomum)?
Responda APENAS com JSON: {{"tipo": "rotineira/excepcional", "justificativa": "..."}}""")
        no2 = safe_parse(r2, "Etapa 4 - Nó 2")
        codigo = "O-B" if no2["tipo"] == "rotineira" else "O-C"
        return {"codigo": codigo, "nos_percorridos": [no1, no2], "falhas_descartadas": "O-D descartada no Nó 1"}

    # Nó 2: Objetivo conservativo
    r2 = ask(system, f"""Nó 1: Objetivo SIM consistente com normas (O-B e O-C DESCARTADAS)

NÓ 2 — O objetivo era conservativo, com risco adequadamente gerenciado e alinhado aos procedimentos operacionais?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 4 - Nó 2")

    if no2["resposta"].lower() == "não":
        return {"codigo": "O-D", "nos_percorridos": [no1, no2], "falhas_descartadas": "O-B e O-C descartadas no Nó 1"}

    return {"codigo": "O-A", "nos_percorridos": [no1, no2], "falhas_descartadas": "O-B, O-C, O-D descartadas"}


# ── ETAPA 5: Ação — fluxo nó por nó ──────────────────────────────────────────

def run_step5(relato: str, ponto_fuga: dict, step3: dict, step4: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Ação (5-Flow.json).
Fluxo: {load_doc('5 - Flow.json')}
Falhas: {load_doc('5 - Failures.json', max_chars=4000)}"""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    # Nó 1: Ação implementada como pretendida
    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — A ação foi implementada como o operador pretendia (a execução correspondeu à intenção)?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 5 - Nó 1")

    if no1["resposta"].lower() == "não":
        r2 = ask(system, f"""Nó 1: Ação NÃO implementada como pretendida.

NÓ 2 — Foi um lapso de memória/atenção (A-F/A-G) ou erro de execução motora (A-H/A-I)?
Responda APENAS com JSON: {{"tipo": "lapso/execucao", "codigo_sugerido": "A-F/A-G/A-H/A-I", "justificativa": "..."}}""")
        no2 = safe_parse(r2, "Etapa 5 - Nó 2")
        return {"codigo": no2["codigo_sugerido"], "nos_percorridos": [no1, no2], "falhas_descartadas": "A-B a A-E descartadas no Nó 1"}

    # Nó 2: Ação correta/adequada
    r2 = ask(system, f"""Nó 1: Ação SIM implementada como pretendida.

NÓ 2 — A ação foi correta e adequada para a situação?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 5 - Nó 2")

    if no2["resposta"].lower() == "sim":
        return {"codigo": "A-A", "nos_percorridos": [no1, no2], "falhas_descartadas": "Todas descartadas — ação correta"}

    # Nó 3: Capacidade para a ação correta
    r3 = ask(system, f"""Nó 1: Implementada como pretendida = SIM
Nó 2: Ação adequada = NÃO (A-B, A-C DESCARTADAS)

NÓ 3 — O operador tinha capacidade (conhecimento, habilidade, treinamento) para executar a ação correta?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no3 = safe_parse(r3, "Etapa 5 - Nó 3")

    codigo = "A-D" if no3["resposta"].lower() == "não" else "A-E"
    return {"codigo": codigo, "nos_percorridos": [no1, no2, no3], "falhas_descartadas": "A-B, A-C descartadas no Nó 2"}


# ── ETAPA 6/7: Pré-condições + Recomendações ─────────────────────────────────

def run_step6_7(relato: str, ponto_fuga: dict, step3: dict, step4: dict, step5: dict) -> dict:
    system = f"""Você é um especialista SERA gerando pré-condições e recomendações.
Pré-condições disponíveis: {load_doc('Pre-Conditions.json', max_chars=4000)}
Guidelines: {load_doc('Guidelines.json')}
Template: {load_doc('Template.json')}"""

    r = ask(system, f"""Ato inseguro: {ponto_fuga.get('ato_inseguro_factual')}
Falha Percepção: {step3['codigo']}
Falha Objetivo: {step4['codigo']}
Falha Ação: {step5['codigo']}
Relato: {relato}

Gere pré-condições e recomendações. REGRAS:
1. Pré-condições organizadas por etapa (Etapa 3, 4 ou 5)
2. Sem duplicatas de código
3. Cada recomendação vinculada a uma falha específica com justificativa
4. Recomendações no formato: {{acao, falha_relacionada, justificativa}}

Responda APENAS com JSON:
{{
  "precondicoes": [
    {{"codigo": "XX", "descricao": "...", "etapa": "3/4/5", "evidencia_no_relato": "..."}}
  ],
  "conclusoes": "texto resumindo as lições aprendidas",
  "recomendacoes": [
    {{"acao": "...", "falha_relacionada": "X-X", "justificativa": "..."}}
  ]
}}""")
    return safe_parse(r, "Etapa 6-7")


# ── RUNNER PRINCIPAL ──────────────────────────────────────────────────────────

async def run_analysis(event_id: str, raw_input: str, tenant_id: str):
    admin = get_supabase_admin()
    try:
        admin.table("events").update({"status": "processing"}).eq("id", event_id).execute()

        step2 = run_step2(raw_input)
        step3 = run_step3(raw_input, step2)
        step4 = run_step4(raw_input, step2, step3)
        step5 = run_step5(raw_input, step2, step3, step4)
        step6_7 = run_step6_7(raw_input, step2, step3, step4, step5)

        step3_just = "; ".join([n.get("justificativa", "") for n in step3.get("nos_percorridos", []) if n.get("justificativa")])
        step4_just = "; ".join([n.get("justificativa", "") for n in step4.get("nos_percorridos", []) if n.get("justificativa")])
        step5_just = "; ".join([n.get("justificativa", "") for n in step5.get("nos_percorridos", []) if n.get("justificativa")])

        # Normalise preconditions: AI returns {codigo, descricao, etapa, evidencia_no_relato}
        # Frontend expects {code, name, justification}
        def norm_precondition(p: dict) -> dict:
            return {
                "code":         p.get("codigo") or p.get("code", ""),
                "name":         p.get("descricao") or p.get("name", ""),
                "justification": p.get("evidencia_no_relato") or p.get("justification", ""),
                "etapa":        p.get("etapa", ""),
            }

        # Normalise recommendations: AI returns {acao, falha_relacionada, justificativa}
        # Frontend expects {title, related_code, description}
        def norm_recommendation(r: dict) -> dict:
            return {
                "title":        r.get("acao") or r.get("title", ""),
                "related_code": r.get("falha_relacionada") or r.get("related_code", ""),
                "description":  r.get("justificativa") or r.get("description", ""),
            }

        p3 = step3.get("codigo", "")
        p4 = step4.get("codigo", "")
        p5 = step5.get("codigo", "")

        analysis_payload = {
            "event_id": event_id,
            "tenant_id": tenant_id,
            "event_summary": raw_input.strip()[:1000],
            "escape_point": step2.get("justificativa", ""),
            "unsafe_agent": step2.get("agente", ""),
            "unsafe_act": step2.get("ato_inseguro_factual", ""),
            "perception_code": p3,
            "perception_name": FAILURE_NAMES.get(p3, p3),
            "perception_justification": step3_just,
            "perception_discarded": {"falhas_descartadas": step3.get("falhas_descartadas"), "nos_percorridos": step3.get("nos_percorridos", [])},
            "objective_code": p4,
            "objective_name": FAILURE_NAMES.get(p4, p4),
            "objective_justification": step4_just,
            "objective_discarded": {"falhas_descartadas": step4.get("falhas_descartadas"), "nos_percorridos": step4.get("nos_percorridos", [])},
            "action_code": p5,
            "action_name": FAILURE_NAMES.get(p5, p5),
            "action_justification": step5_just,
            "action_discarded": {"falhas_descartadas": step5.get("falhas_descartadas"), "nos_percorridos": step5.get("nos_percorridos", [])},
            "preconditions": [norm_precondition(p) for p in step6_7.get("precondicoes", [])],
            "conclusions": step6_7.get("conclusoes", ""),
            "recommendations": [norm_recommendation(r) for r in step6_7.get("recomendacoes", [])],
            "raw_llm_output": {
                "step2": step2,
                "step3": step3,
                "step4": step4,
                "step5": step5,
                "step6_7": step6_7
            }
        }

        analysis = admin.table("analyses").upsert(analysis_payload, on_conflict="event_id").execute()

        admin.table("events").update({"status": "completed", "credits_used": 1}).eq("id", event_id).execute()
        return analysis.data

    except Exception as e:
        admin.table("events").update({"status": "failed"}).eq("id", event_id).execute()
        raise e
