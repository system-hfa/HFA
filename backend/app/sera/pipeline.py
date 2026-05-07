import json
import asyncio
from pathlib import Path
from app.sera.ai_provider import call_ai
from app.database import get_supabase_admin

DOCS_PATH = Path(__file__).parent / "documents"

# ── Failure name table aligned with 5-Failures.json ───────────────────────────
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
    # Ação — alinhado com 5-Failures.json (Daumas 2018)
    "A-A": "Nenhuma Falha de Ação",
    "A-B": "Deslizes, Omissões e Lapsos",
    "A-C": "Falha no Feedback da Execução",
    "A-D": "Inabilidade para a Resposta",
    "A-E": "Falha de Conhecimento (Decisão)",
    "A-F": "Falha na Seleção da Ação",
    "A-G": "Falha de Feedback na Tomada de Decisão",
    "A-H": "Falha no Gerenciamento do Tempo",
    "A-I": "Falha na Seleção da Ação por Pressão do Tempo",
    "A-J": "Falha de Feedback por Pressão do Tempo",
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


# ── ETAPA 1: Resumo estruturado do evento ─────────────────────────────────────

def run_step1(relato: str) -> dict:
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON. No text, markdown, or explanation outside the JSON.
- NEVER invent data. If a field is not present in the report, return null for that field.
- NEVER reproduce the original report verbatim. Write a new narrative.
- If the report has fewer than 30 words, return {{"error": "relato insuficiente"}}.

OUTPUT FORMAT (strict):
{{
  "summary": "string: narrativa objetiva 120-180 palavras em prosa corrida",
  "event_date": "string or null",
  "event_location": "string or null",
  "operation_type": "string or null",
  "occupants_count": "string or null",
  "flight_phase": "string or null",
  "weather_conditions": "string or null",
  "systems_involved": "string or null"
}}

Você é um analista SERA. Analise o relato e extraia informações estritamente factuais.
{load_doc('Template.json', max_chars=1500)}

REGRAS OBRIGATÓRIAS:
1. NÃO reproduza trechos literais do relato — sintetize com suas próprias palavras
2. O campo "summary" deve incluir: tipo de aeronave, fase do voo, condições meteorológicas, local aproximado, envolvidos e o que aconteceu
3. Para campos estruturados: extrai APENAS o que está explícito no relato — null se não mencionado
4. summary: mínimo 120, máximo 180 palavras, linguagem objetiva e técnica"""

    r = ask(system, f"Relato: {relato}\n\nResponda APENAS com JSON.")
    return safe_parse(r, "Etapa 1")


# ── ETAPA 2: Ponto de Fuga ────────────────────────────────────────────────────

def run_step2(relato: str) -> dict:
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER infer motivations or causes — describe only observable actions.
- NEVER identify more than ONE departure point. Pick the most critical moment after which there was no return to safety.
- NEVER use the words "porque", "pois", "visto que" in the unsafe_act field. The unsafe_act must describe WHAT happened, not WHY.
- If the report is insufficient, return {{"error": "dados insuficientes para identificar ponto de fuga"}}.

OUTPUT FORMAT (strict):
{{
  "agente": "quem realizou o ato inseguro",
  "ato_inseguro_factual": "descrição observável do ato inseguro, verbo no passado",
  "momento": "quando ocorreu na sequência do evento",
  "justificativa": "por que este é o ponto de fuga, baseado no relato"
}}

Você é um especialista SERA. Siga RIGOROSAMENTE as regras do Point.json.
{load_doc('Point.json')}

REGRAS ABSOLUTAS para o campo ato_inseguro_factual:
1. Use APENAS verbos de ação observável: puxou, acionou, não desacoplou, repetiu
2. PROIBIDO usar: incorreta, inadequada, errônea, sem saber, por engano, não planejada
3. PROIBIDO inferir motivações, causas ou intenções
4. PROIBIDO mencionar fatores latentes (arrogância, falta de conhecimento, etc.)"""

    r = ask(system, f"Relato: {relato}\n\nResponda APENAS com JSON.")
    return safe_parse(r, "Etapa 2")


# ── ETAPA 3: Percepção — fluxo nó por nó ─────────────────────────────────────

def run_step3(relato: str, ponto_fuga: dict) -> dict:
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON for each node response. No text outside the JSON block.
- NEVER skip a decision node. Every YES/NO in the flow MUST be answered.
- NEVER classify a failure without explicit evidence from the report.
- NEVER mention internal variable names, node IDs, or step_ids in output.
- You MUST use CRITÉRIO_DECISOR to distinguish P-D from P-G:
  "Would more time have changed the outcome? YES → P-D. NO → P-G."
- If evidence is insufficient for a node, set justificativa to "DADO INSUFICIENTE" and do NOT advance to a positive conclusion.

Você é um especialista SERA aplicando o fluxo de Percepção (3-Flow.json).
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
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER skip the first decision node: "Consistent with rules and regulations?" This MUST be answered before any other.
- NEVER classify O-D if there is evidence of rule violation — O-D requires the goal to be consistent with rules but not conservative.
- NEVER classify O-B (routine violation) without evidence of repeated behavior. A single violation with no evidence of habit MUST be O-C, not O-B.
- If evidence is insufficient, set justificativa to "DADO INSUFICIENTE".

Você é um especialista SERA aplicando o fluxo de Objetivo (4-Flow.json).
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


# ── ETAPA 5: Ação — fluxo completo com 5 nós ─────────────────────────────────
#
# Fluxo correto (Daumas 2018 / Hendy 2003, Figure 5):
#
#  Nó 1: Ação implementada como pretendida?
#    NÃO → Nó 2A: A-B (deslize/lapso) ou A-C (falha de feedback na execução)
#    SIM → Nó 2: Ação foi correta/adequada?
#      SIM → A-A (sem falha)
#      NÃO → Nó 3: Incapacidade vs. Seleção errada?
#        INCAPACIDADE → Nó 4A: A-D (física) ou A-E (conhecimento)
#        SELEÇÃO ERRADA → Nó 4: Pressão de tempo excessiva?
#          SIM → Nó 5A: A-H / A-I / A-J
#          NÃO → Nó 5B: A-F ou A-G

def run_step5(relato: str, ponto_fuga: dict, step3: dict, step4: dict) -> dict:
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER skip the action flow. Follow this EXACT sequence:
  NODE 1: Was the action implemented AS intended by the operator?
           YES → go to NODE 2 (was it correct?)
           NO  → execution failed → A-B (slip/lapse) or A-C (feedback failure)
  NODE 2: Was the action correct/adequate for the situation?
           YES → no action failure → return A-A
           NO  → go to NODE 3
  NODE 3: Was the error due to LACK OF CAPABILITY/KNOWLEDGE, or WRONG SELECTION/DECISION?
           INCAPACIDADE (capability) → go to NODE 4-CAPABILITY
           SELEÇÃO (selection)       → go to NODE 4-SELECTION
  NODE 4-CAPABILITY: Did the operator have prerequisite physical capability?
           NO  (physical limitation) → A-D
           YES (has physical, lacks decision knowledge) → A-E
  NODE 4-SELECTION: Was time pressure excessive?
           YES → NODE 5-TIME: A-H / A-I / A-J
           NO  → NODE 5-NOTM: A-F or A-G

- KEY DISTINCTION (NODE 1):
  "Operator intended AND executed the action (even if it was the wrong choice)" → NODE 1 = YES → Selection path
  "Operator intended but body/system did not comply; slip, lapse, omission" → NODE 1 = NO → Execution path
- NEVER mention node names or IDs in the output.

Você é um especialista SERA aplicando o fluxo de Ação (5-Flow.json).
Fluxo: {load_doc('5 - Flow.json')}
Falhas com CRITÉRIO_DECISOR: {load_doc('5 - Failures.json', max_chars=4000)}
{NO_ARTIFACTS}
CRITÉRIO A-F vs A-I: Pressão de tempo excessiva? NÃO → A-F. SIM → A-I.
CRITÉRIO A-G vs A-J: Pressão de tempo excessiva? NÃO → A-G. SIM → A-J."""

    ato = ponto_fuga.get("ato_inseguro_factual", "")

    # NÓ 1 — Ação implementada como pretendida?
    r1 = ask(system, f"""Ato inseguro: {ato}
Relato: {relato}

NÓ 1 — A ação foi implementada COMO o operador pretendia?
• SIM: o operador quis fazer aquela ação e a executou exatamente como planejava (mesmo que fosse a escolha errada)
• NÃO: houve deslize, lapso, omissão involuntária, ou falha de feedback na execução
(Avaliar APENAS se a EXECUÇÃO correspondeu à INTENÇÃO — não se a ação era correta)
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no1 = safe_parse(r1, "Etapa 5 - Nó 1")

    if no1["resposta"].lower() == "não":
        # Execução falhou → A-B ou A-C
        r2 = ask(system, f"""Nó 1 = NÃO — a execução não correspondeu à intenção.
(A-A, A-D, A-E, A-F, A-G, A-H, A-I, A-J TODOS EXCLUÍDOS neste caminho)

NÓ 2 — Classifique a falha de execução:
• A-B: DESLIZE/LAPSO/OMISSÃO — ação automática/habitual ativada no lugar da planejada; esquecimento involuntário
• A-C: FALHA DE FEEDBACK — ação executada mas sem verificar/monitorar o resultado; loop de feedback ausente
Responda APENAS com JSON: {{"codigo": "A-B ou A-C", "justificativa": "..."}}""")
        no2 = safe_parse(r2, "Etapa 5 - Nó 2 (execução)")
        return _flow_result(
            no2["codigo"],
            [no1, no2],
            "A-A, A-D, A-E, A-F, A-G, A-H, A-I, A-J excluídos — Nó 1=NÃO (execução falhou)",
        )

    # NÓ 2 — Ação foi correta/adequada?
    r2 = ask(system, f"""Nó 1 = SIM — ação implementada como pretendida.
(A-B e A-C EXCLUÍDOS — não houve falha de execução)

NÓ 2 — A ação implementada foi CORRETA e ADEQUADA para a situação?
• SIM: a ação era a mais apropriada → NENHUMA FALHA DE AÇÃO (A-A)
• NÃO: a ação era a intenção do operador, mas foi a escolha errada ou inadequada
Responda APENAS com JSON: {{"resposta": "Sim/Não", "justificativa": "..."}}""")
    no2 = safe_parse(r2, "Etapa 5 - Nó 2")

    if no2["resposta"].lower() == "sim":
        return _flow_result("A-A", [no1, no2], "Ação correta e adequada — nenhuma falha de ação")

    # NÓ 3 — Incapacidade física/conhecimento  vs.  Seleção/decisão errada?
    r3 = ask(system, f"""Nó 1=SIM | Nó 2=NÃO — ação implementada como pretendida, mas foi a escolha errada.
(A-B, A-C excluídos no Nó 1)

NÓ 3 — A raiz da falha foi INCAPACIDADE do operador ou SELEÇÃO/DECISÃO errada?
• INCAPACIDADE: o operador não tinha condições físicas, motoras ou de conhecimento para executar a ação correta (→ A-D/A-E)
• SELEÇÃO: o operador tinha condições, mas escolheu/planejou a ação errada ou não monitorou o resultado (→ A-F/A-G/A-H/A-I/A-J)
Responda APENAS com JSON: {{"tipo": "incapacidade ou seleção", "justificativa": "..."}}""")
    no3 = safe_parse(r3, "Etapa 5 - Nó 3")

    if no3.get("tipo", "").lower() == "incapacidade":
        # Caminho capacidade → A-D ou A-E
        r4 = ask(system, f"""Nó 3 = INCAPACIDADE — operador não tinha condições para a resposta correta.
(A-B, A-C, A-F, A-G, A-H, A-I, A-J TODOS EXCLUÍDOS)

NÓ 4 — Classifique a incapacidade:
• A-D: INABILIDADE FÍSICA — limitação física, ergonômica, motora ou ambiental impediu a ação correta
• A-E: FALHA DE CONHECIMENTO/DECISÃO — operador tinha capacidade física, mas lhe faltava conhecimento ou habilidade de decisão
Responda APENAS com JSON: {{"codigo": "A-D ou A-E", "justificativa": "..."}}""")
        no4 = safe_parse(r4, "Etapa 5 - Nó 4 (capacidade)")
        return _flow_result(
            no4["codigo"],
            [no1, no2, no3, no4],
            "A-B, A-C excluídos no Nó 1; A-F, A-G, A-H, A-I, A-J excluídos no Nó 3 (incapacidade)",
        )

    # Caminho seleção → verificar pressão de tempo
    r4 = ask(system, f"""Nó 3 = SELEÇÃO ERRADA — operador tinha condições mas escolheu/decidiu errado.
(A-B, A-C, A-D, A-E TODOS EXCLUÍDOS)

NÓ 4 — A pressão de tempo era EXCESSIVA no momento do ato inseguro?
• SIM: pressão de tempo impediu avaliação adequada (→ A-H / A-I / A-J)
• NÃO: tomada de decisão deficiente sem pressão excessiva de tempo (→ A-F / A-G)
Responda APENAS com JSON: {{"pressao_tempo": "Sim/Não", "justificativa": "..."}}""")
    no4 = safe_parse(r4, "Etapa 5 - Nó 4 (pressão)")

    if no4.get("pressao_tempo", "").lower() == "sim":
        r5 = ask(system, f"""Pressão de tempo EXCESSIVA confirmada.
(Apenas A-H, A-I, A-J aplicáveis — A-B, A-C, A-D, A-E, A-F, A-G EXCLUÍDOS)

NÓ 5 — Classifique a falha sob pressão de tempo:
• A-H: GERENCIAMENTO DO TEMPO — falha em alocar/priorizar o tempo disponível
• A-I: SELEÇÃO DE AÇÃO sob pressão — escolha errada de plano/procedimento devido à pressão de tempo
• A-J: FALHA DE FEEDBACK sob pressão — não verificou/monitorou resultado por falta de tempo
Responda APENAS com JSON: {{"codigo": "A-H, A-I ou A-J", "justificativa": "..."}}""")
        no5 = safe_parse(r5, "Etapa 5 - Nó 5 (pressão tempo)")
        return _flow_result(
            no5["codigo"],
            [no1, no2, no3, no4, no5],
            "A-B, A-C excluídos no Nó 1; A-D, A-E excluídos no Nó 3; A-F, A-G excluídos no Nó 4",
        )

    r5 = ask(system, f"""Pressão de tempo NÃO excessiva.
(Apenas A-F, A-G aplicáveis — A-B, A-C, A-D, A-E, A-H, A-I, A-J EXCLUÍDOS)

NÓ 5 — Classifique a falha de seleção/decisão sem pressão de tempo:
• A-F: SELEÇÃO DE AÇÃO errada — escolheu plano/procedimento incorreto sem pressão de tempo
• A-G: FALHA DE FEEDBACK NA DECISÃO — não monitorou/verificou o resultado da sua decisão
Responda APENAS com JSON: {{"codigo": "A-F ou A-G", "justificativa": "..."}}""")
    no5 = safe_parse(r5, "Etapa 5 - Nó 5 (sem pressão)")
    return _flow_result(
        no5["codigo"],
        [no1, no2, no3, no4, no5],
        "A-B, A-C excluídos no Nó 1; A-D, A-E excluídos no Nó 3; A-H, A-I, A-J excluídos no Nó 4",
    )


def _flow_result(codigo: str, nos: list, descartadas: str) -> dict:
    return {"codigo": codigo, "nos_percorridos": nos, "falhas_descartadas": descartadas}


# ── ETAPA 6/7: Pré-condições + Recomendações ─────────────────────────────────

def run_step6_7(relato: str, ponto_fuga: dict, step3: dict, step4: dict, step5: dict) -> dict:
    system = f"""CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER repeat information already stated in steps 3, 4, or 5.
- NEVER create a recommendation without a direct link to an identified failure code.
- NEVER duplicate recommendations — each must address a distinct failure or precondition.
- Each recommendation MUST target what CAN be changed (precondition/systemic factor), not the active failure itself.
- Minimum 3, maximum 6 recommendations.
- Each precondition MUST have direct evidence from the report — no inferences.
- If evidence is insufficient for a conclusion, state it explicitly.

OUTPUT FORMAT (strict):
{{
  "precondicoes": [
    {{"codigo": "string: e.g. P2", "descricao": "nome da pré-condição", "etapa": "3, 4 ou 5", "evidencia_no_relato": "citação ou paráfrase do relato"}}
  ],
  "conclusoes": "síntese das descobertas, 80-120 palavras",
  "recomendacoes": [
    {{"acao": "ação concreta e específica", "falha_relacionada": "X-X", "justificativa": "por que essa ação mitiga essa falha"}}
  ]
}}

Você é um especialista SERA gerando pré-condições e recomendações.
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
5. Recomendações vinculadas aos códigos reais identificados ({step3['codigo']}, {step4['codigo']}, {step5['codigo']})

Responda APENAS com JSON.""")
    return safe_parse(r, "Etapa 6-7")


# ── RUNNER PRINCIPAL ──────────────────────────────────────────────────────────

async def run_analysis(event_id: str, raw_input: str, tenant_id: str):
    admin = get_supabase_admin()
    try:
        admin.table("events").update({"status": "processing"}).eq("id", event_id).execute()

        step1   = run_step1(raw_input)
        step2   = run_step2(raw_input)
        step3   = run_step3(raw_input, step2)
        step4   = run_step4(raw_input, step2, step3)
        step5   = run_step5(raw_input, step2, step3, step4)
        step6_7 = run_step6_7(raw_input, step2, step3, step4, step5)

        # step1 is now a dict; extract fields
        step1_summary  = step1.get("summary", "") if isinstance(step1, dict) else str(step1)

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

        def _s1(key: str):
            return step1.get(key) if isinstance(step1, dict) else None

        analysis_payload = {
            "event_id":    event_id,
            "tenant_id":   tenant_id,
            # Etapa 1 — summary + structured fields
            "summary":            step1_summary,
            "event_date":         _s1("event_date"),
            "event_location":     _s1("event_location"),
            "occupants_count":    _s1("occupants_count"),
            "flight_phase":       _s1("flight_phase"),
            "weather_conditions": _s1("weather_conditions"),
            "systems_involved":   _s1("systems_involved"),
            # Raw input kept for backwards compat
            "event_summary": raw_input.strip()[:1000],
            # Etapa 2
            "escape_point":  step2.get("justificativa", ""),
            "unsafe_agent":  step2.get("agente", ""),
            "unsafe_act":    step2.get("ato_inseguro_factual", ""),
            # Etapas 3/4/5
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
            # Etapas 6/7
            "preconditions":   [norm_precondition(p) for p in step6_7.get("precondicoes", [])],
            "conclusions":     step6_7.get("conclusoes", ""),
            "recommendations": [norm_recommendation(r) for r in step6_7.get("recomendacoes", [])],
            "raw_llm_output": {
                "step1":   step1,
                "step2":   step2,
                "step3":   step3,
                "step4":   step4,
                "step5":   step5,
                "step6_7": step6_7,
            },
        }

        analysis = admin.table("analyses").upsert(analysis_payload, on_conflict="event_id").execute()

        admin.table("events").update({"status": "completed", "credits_used": 1}).eq("id", event_id).execute()
        return analysis.data

    except Exception as e:
        admin.table("events").update({"status": "failed"}).eq("id", event_id).execute()
        raise e
