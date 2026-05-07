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

NO_ARTIFACTS = """
PROIBIDO incluir na justificativa qualquer referência a: "nó", "input", "fluxo", "SERA",
"step_id", nomes de variáveis ou estrutura interna do sistema.
Escreva apenas a análise substantiva do evento em linguagem técnica aeronáutica."""


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


# ── ETAPA 1: Resumo didático do evento ────────────────────────────────────────

def run_step1(relato: str) -> str:
    system = f"""Você é um analista SERA. Escreva um resumo didático do evento.
{load_doc('Template.json', max_chars=1500)}

REGRAS OBRIGATÓRIAS:
1. NÃO reproduza trechos literais do relato — sintetize com suas próprias palavras
2. Inclua: tipo de aeronave, fase do voo, condições meteorológicas, local aproximado, envolvidos e o que aconteceu
3. Máximo 150 palavras, linguagem objetiva e técnica
4. Escreva em prosa corrida, sem títulos, listas ou marcadores"""

    return ask(system, f"Relato: {relato}\n\nEscreva APENAS o texto do resumo.")


# ── ETAPA 2: Ponto de Fuga ────────────────────────────────────────────────────

def run_step2(relato: str) -> dict:
    system = f"""Você é um especialista SERA. Siga RIGOROSAMENTE as regras do Point.json.
{load_doc('Point.json')}

REGRAS ABSOLUTAS para o campo ato_inseguro_factual:
1. Use APENAS verbos de ação observável: puxou, acionou, não desacoplou, repetiu
2. PROIBIDO usar: incorreta, inadequada, errônea, sem saber, por engano, não planejada
3. PROIBIDO inferir motivações, causas ou intenções
4. PROIBIDO mencionar fatores latentes (arrogância, falta de conhecimento, etc.)
5. A descrição deve ser tão objetiva que qualquer pessoa lendo concordaria com os fatos"""

    r = ask(system, f"""Relato: {relato}

Responda APENAS com JSON:
{{
  "agente": "quem realizou o ato inseguro",
  "ato_inseguro_factual": "descrição objetiva usando apenas verbos de ação observável, sem causas ou motivações",
  "momento": "quando ocorreu na sequência do evento",
  "justificativa": "por que este é o ponto de fuga e não outro momento"
}}""")
    return safe_parse(r, "Etapa 2")


# ── ETAPA 3: Percepção — fluxo nó por nó ─────────────────────────────────────

def run_step3(relato: str, ponto_fuga: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Percepção (3-Flow.json).
Fluxo: {load_doc('3 - Flow.json')}
Falhas com CRITÉRIO_DECISOR: {load_doc('3 - Failures.json', max_chars=4000)}
{NO_ARTIFACTS}
CRITÉRIO P-D vs P-G: Se houvesse mais tempo, o resultado seria diferente? SIM → P-D. NÃO → P-G."""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — O operador possuía capacidade sensorial e perceptual para perceber as informações relevantes no momento do ato inseguro?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 3 - Nó 1")

    if no1["resposta"].lower() == "não":
        return _flow_result("P-B", [no1], "P-C, P-D, P-E, P-F, P-G, P-H descartadas — operador sem capacidade sensorial")

    r2 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}
Nó 1: Capacidade sensorial = SIM (P-B e P-C DESCARTADAS)

NÓ 2 — Havia pressão de tempo extrema que impediu a percepção adequada no momento do ato inseguro?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 3 - Nó 2")

    if no2["resposta"].lower() == "sim":
        return _flow_result("P-E", [no1, no2], "P-B, P-C, P-D descartadas; pressão de tempo confirmada")

    r3 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}
Nó 1: Capacidade = SIM | Nó 2: Pressão de tempo = NÃO (P-B, P-C, P-D, P-E DESCARTADAS)

NÓ 3 — A informação estava disponível no ambiente mas o operador não a percebeu corretamente ou a interpretou de forma ambígua/ilusória?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no3 = safe_parse(r3, "Etapa 3 - Nó 3")

    codigo = "P-F" if no3["resposta"].lower() == "sim" else "P-A"
    return _flow_result(codigo, [no1, no2, no3], "P-B, P-C, P-D, P-E descartadas pelos nós anteriores")


# ── ETAPA 4: Objetivo — fluxo nó por nó ──────────────────────────────────────

def run_step4(relato: str, ponto_fuga: dict, step3: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Objetivo (4-Flow.json).
Fluxo: {load_doc('4 - Flow.json')}
Falhas: {load_doc('4 - Failures.json', max_chars=4000)}
{NO_ARTIFACTS}
CRITÉRIO O-D: Objetivo consistente com normas MAS não conservativo/não gerencia risco → O-D (Hendy 2003, Figure 5 — 'Failure in intent, Non-violation')."""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — O OBJETIVO do operador (o que ele pretendia alcançar) era consistente com as normas e regulamentos vigentes?
ATENÇÃO: Avalie o OBJETIVO (intenção), NÃO a forma de execução.
Responda APENAS com JSON: {{"resposta": "Sim/Não", "objetivo_identificado": "...", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 4 - Nó 1")

    if no1["resposta"].lower() == "não":
        r2 = ask(system, f"""Nó 1: Objetivo NÃO consistente com normas (O-A e O-D DESCARTADOS).

NÓ 2 — Esta violação é rotineira (padrão no contexto operacional) ou excepcional (situação incomum)?
Responda APENAS com JSON: {{"tipo": "rotineira/excepcional", "justificativa": "..."}}""")
        no2 = safe_parse(r2, "Etapa 4 - Nó 2")
        codigo = "O-B" if no2.get("tipo", "").lower() == "rotineira" else "O-C"
        return _flow_result(codigo, [no1, no2], "O-A e O-D descartados no Nó 1")

    r2 = ask(system, f"""Nó 1: Objetivo SIM consistente com normas (O-B e O-C DESCARTADOS).

NÓ 2 — O objetivo era conservativo, com risco adequadamente gerenciado e alinhado aos procedimentos operacionais?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 4 - Nó 2")

    if no2["resposta"].lower() == "não":
        return _flow_result("O-D", [no1, no2], "O-B e O-C descartados no Nó 1")

    return _flow_result("O-A", [no1, no2], "O-B, O-C, O-D descartados")


# ── ETAPA 5: Ação — fluxo nó por nó ──────────────────────────────────────────

def run_step5(relato: str, ponto_fuga: dict, step3: dict, step4: dict) -> dict:
    system = f"""Você é um especialista SERA aplicando o fluxo de Ação (5-Flow.json).
Fluxo: {load_doc('5 - Flow.json')}
Falhas com CRITÉRIO_DECISOR: {load_doc('5 - Failures.json', max_chars=4000)}
{NO_ARTIFACTS}
CRITÉRIO A-F vs A-I: Pressão de tempo excessiva? NÃO → A-F. SIM → A-I.
CRITÉRIO A-G vs A-J: Pressão de tempo excessiva? NÃO → A-G. SIM → A-J.

ATENÇÃO — REGRA CRÍTICA DO FLUXO:
- Nó 1: "A ação foi implementada COMO PRETENDIDA?" avalia se a EXECUÇÃO correspondeu à INTENÇÃO
  → Se o operador QUIS fazer aquela ação e a FEZ (mesmo que fosse errada), a resposta é SIM
  → Só é NÃO se a mão escorregou, confundiu o botão, ou executou algo diferente do que pretendia
- Se Nó 1 = SIM: os únicos códigos possíveis são A-A, A-D ou A-E (A-B e A-C são EXCLUÍDOS)
- Se Nó 1 = NÃO: os únicos códigos possíveis são A-B ou A-C (todos os outros são EXCLUÍDOS)"""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — O operador PRETENDIA fazer exatamente essa ação e a executou como planejava?
(NÃO se pergunta se a ação era correta — apenas se a execução correspondeu à intenção)
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 5 - Nó 1")

    if no1["resposta"].lower() == "não":
        r2 = ask(system, f"""Nó 1 = NÃO (A-A, A-D, A-E, A-F, A-G, A-H, A-I, A-J TODOS EXCLUÍDOS).

NÓ 2 — Foi um lapso/deslize/omissão (A-B) ou falha de feedback na execução (A-C)?
- A-B: comportamento automático indevido, esquecimento, desvio involuntário do plano
- A-C: ação executada mas sem verificar o feedback do resultado
Responda APENAS com JSON: {{"codigo": "A-B ou A-C", "justificativa": "..."}}""")
        no2 = safe_parse(r2, "Etapa 5 - Nó 2 (não implementada)")
        return _flow_result(
            no2["codigo"],
            [no1, no2],
            "A-A, A-D, A-E, A-F, A-G, A-H, A-I excluídos — Nó 1 = NÃO"
        )

    r2 = ask(system, f"""Nó 1 = SIM — ação implementada como pretendida (A-B e A-C EXCLUÍDOS).

NÓ 2 — A ação foi correta e adequada para a situação?
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 5 - Nó 2")

    if no2["resposta"].lower() == "sim":
        return _flow_result("A-A", [no1, no2], "Todos descartados — ação correta e adequada")

    r3 = ask(system, f"""Nó 1 = SIM | Nó 2 = NÃO (A-B, A-C, A-F, A-G, A-H, A-I excluídos).

NÓ 3 — O operador tinha CAPACIDADE FÍSICA para dar a resposta correta?
- A-D: NÃO tinha capacidade física/motora (limitação física, ergonômica ou ambiental)
- A-E: SIM tinha capacidade física, mas faltou conhecimento ou habilidade de decisão
Responda APENAS com JSON: {{"codigo": "A-D ou A-E", "justificativa": "..."}}""")
    no3 = safe_parse(r3, "Etapa 5 - Nó 3")
    return _flow_result(
        no3["codigo"],
        [no1, no2, no3],
        "A-B, A-C excluídos no Nó 1; A-F, A-G, A-H, A-I excluídos no Nó 2"
    )


def _flow_result(codigo: str, nos: list, descartadas: str) -> dict:
    return {"codigo": codigo, "nos_percorridos": nos, "falhas_descartadas": descartadas}


# ── ETAPA 6/7: Pré-condições + Recomendações ─────────────────────────────────

def run_step6_7(relato: str, ponto_fuga: dict, step3: dict, step4: dict, step5: dict) -> dict:
    system = f"""Você é um especialista SERA gerando pré-condições e recomendações.
Pré-condições disponíveis: {load_doc('Pre-Conditions.json', max_chars=4000)}
Guidelines: {load_doc('Guidelines.json')}
Template: {load_doc('Template.json')}
Base científica e critérios decisores (tutorial): {load_doc('tutorial.json', max_chars=3000)}"""

    r = ask(system, f"""Ato inseguro: {ponto_fuga.get('ato_inseguro_factual')}
Falha Percepção: {step3['codigo']}
Falha Objetivo: {step4['codigo']}
Falha Ação: {step5['codigo']}
Relato: {relato}

REGRAS OBRIGATÓRIAS:
1. Cada pré-condição deve ter evidência DIRETA no relato — sem inferências
2. Organize por etapa: cada pré-condição pertence a Etapa 3, 4 ou 5
3. SEM duplicatas de código
4. Se pressão de tempo foi descartada no fluxo de Percepção, T1 só pode aparecer vinculada à Etapa 4 ou 5 com justificativa específica
5. Cada recomendação no formato exato: acao + falha_relacionada + justificativa
6. Recomendações vinculadas aos códigos reais identificados ({step3['codigo']}, {step4['codigo']}, {step5['codigo']})

Responda APENAS com JSON:
{{
  "precondicoes": [
    {{"codigo": "XX", "descricao": "...", "etapa": "3", "evidencia_no_relato": "citação direta ou paráfrase próxima do relato"}}
  ],
  "conclusoes": "texto síntese das lições aprendidas",
  "recomendacoes": [
    {{"acao": "ação concreta e específica", "falha_relacionada": "X-X", "justificativa": "por que essa ação mitiga essa falha"}}
  ]
}}""")
    return safe_parse(r, "Etapa 6-7")


# ── RUNNER PRINCIPAL ──────────────────────────────────────────────────────────

async def run_analysis(event_id: str, raw_input: str, tenant_id: str):
    admin = get_supabase_admin()
    try:
        admin.table("events").update({"status": "processing"}).eq("id", event_id).execute()

        step1  = run_step1(raw_input)
        step2  = run_step2(raw_input)
        step3  = run_step3(raw_input, step2)
        step4  = run_step4(raw_input, step2, step3)
        step5  = run_step5(raw_input, step2, step3, step4)
        step6_7 = run_step6_7(raw_input, step2, step3, step4, step5)

        step3_just = "; ".join([n.get("justificativa", "") for n in step3.get("nos_percorridos", []) if n.get("justificativa")])
        step4_just = "; ".join([n.get("justificativa", "") for n in step4.get("nos_percorridos", []) if n.get("justificativa")])
        step5_just = "; ".join([n.get("justificativa", "") for n in step5.get("nos_percorridos", []) if n.get("justificativa")])

        def norm_precondition(p: dict) -> dict:
            return {
                "code":          p.get("codigo") or p.get("code", ""),
                "name":          p.get("descricao") or p.get("name", ""),
                "justification": p.get("evidencia_no_relato") or p.get("justification", ""),
                "etapa":         p.get("etapa", ""),
            }

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
            "event_id":    event_id,
            "tenant_id":   tenant_id,
            "summary":     step1,
            "event_summary": raw_input.strip()[:1000],
            "escape_point":  step2.get("justificativa", ""),
            "unsafe_agent":  step2.get("agente", ""),
            "unsafe_act":    step2.get("ato_inseguro_factual", ""),
            "perception_code":          p3,
            "perception_name":          FAILURE_NAMES.get(p3, p3),
            "perception_justification": step3_just,
            "perception_discarded": {
                "falhas_descartadas": step3.get("falhas_descartadas"),
                "nos_percorridos":    step3.get("nos_percorridos", []),
            },
            "objective_code":          p4,
            "objective_name":          FAILURE_NAMES.get(p4, p4),
            "objective_justification": step4_just,
            "objective_discarded": {
                "falhas_descartadas": step4.get("falhas_descartadas"),
                "nos_percorridos":    step4.get("nos_percorridos", []),
            },
            "action_code":          p5,
            "action_name":          FAILURE_NAMES.get(p5, p5),
            "action_justification": step5_just,
            "action_discarded": {
                "falhas_descartadas": step5.get("falhas_descartadas"),
                "nos_percorridos":    step5.get("nos_percorridos", []),
            },
            "preconditions":  [norm_precondition(p) for p in step6_7.get("precondicoes", [])],
            "conclusions":    step6_7.get("conclusoes", ""),
            "recommendations": [norm_recommendation(r) for r in step6_7.get("recomendacoes", [])],
            "raw_llm_output": {
                "step1": step1,
                "step2": step2,
                "step3": step3,
                "step4": step4,
                "step5": step5,
                "step6_7": step6_7,
            },
        }

        analysis = admin.table("analyses").upsert(analysis_payload, on_conflict="event_id").execute()

        admin.table("events").update({"status": "completed", "credits_used": 1}).eq("id", event_id).execute()
        return analysis.data

    except Exception as e:
        admin.table("events").update({"status": "failed"}).eq("id", event_id).execute()
        raise e
