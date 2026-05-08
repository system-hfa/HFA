/**
 * Steps 1–6/7 do SERA — lógica espelhada do Python (sequencial: cada step depende dos anteriores;
 * steps 3/4/5 NÃO são independentes, contrariando paralelização ingênua).
 */
import { loadDocJson } from '@/lib/sera/docs'
import { NO_ARTIFACTS } from '@/lib/sera/prompts'
import { ask, safeParse } from '@/lib/sera/llm'
import type {
  RawFlowNode,
  Step1Result,
  Step2Result,
  Step67Result,
  StepFlowResult,
} from '@/lib/sera/types'

export function flowResult(codigo: string, nos: RawFlowNode[], descartadas: string): StepFlowResult {
  return { codigo, nos_percorridos: nos, falhas_descartadas: descartadas }
}

export async function runStep1(relato: string): Promise<Step1Result> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON. No text, markdown, or explanation outside the JSON.
- NEVER invent data. If a field is not present in the report, return null for that field.
- NEVER reproduce the original report verbatim. Write a new narrative.
- If the report has fewer than 30 words, return {"error": "relato insuficiente"}.

OUTPUT FORMAT (strict):
{
  "summary": "string: narrativa objetiva 120-180 palavras em prosa corrida",
  "event_date": "string or null",
  "event_location": "string or null",
  "operation_type": "string or null",
  "occupants_count": "string or null",
  "flight_phase": "string or null",
  "weather_conditions": "string or null",
  "systems_involved": "string or null"
}

Você é um analista SERA. Analise o relato e extraia informações estritamente factuais.
${loadDocJson('Template.json', 1500)}

REGRAS OBRIGATÓRIAS:
1. NÃO reproduza trechos literais do relato — sintetize com suas próprias palavras
2. O campo "summary" deve incluir: tipo de aeronave, fase do voo, condições meteorológicas, local aproximado, envolvidos e o que aconteceu
3. Para campos estruturados: extrai APENAS o que está explícito no relato — null se não mencionado
4. summary: mínimo 120, máximo 180 palavras, linguagem objetiva e técnica`

  const r = await ask(system, `Relato: ${relato}\n\nResponda APENAS com JSON.`)
  return safeParse(r, 'Etapa 1') as Step1Result
}

export async function runStep2(relato: string): Promise<Step2Result> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER infer motivations or causes — describe only observable actions.
- NEVER identify more than ONE departure point. Pick the most critical moment after which there was no return to safety.
- NEVER use the words "porque", "pois", "visto que" in the unsafe_act field. The unsafe_act must describe WHAT happened, not WHY.
- If the report is insufficient, return {"error": "dados insuficientes para identificar ponto de fuga"}.

OUTPUT FORMAT (strict):
{
  "agente": "quem realizou o ato inseguro",
  "ato_inseguro_factual": "descrição observável do ato inseguro, verbo no passado",
  "momento": "quando ocorreu na sequência do evento",
  "justificativa": "por que este é o ponto de fuga, baseado no relato"
}

Você é um especialista SERA. Siga RIGOROSAMENTE as regras do Point.json.
${loadDocJson('Point.json')}

REGRAS ABSOLUTAS para o campo ato_inseguro_factual:
1. Use APENAS verbos de ação observável: puxou, acionou, não desacoplou, repetiu
2. PROIBIDO usar: incorreta, inadequada, errônea, sem saber, por engano, não planejada
3. PROIBIDO inferir motivações, causas ou intenções
4. PROIBIDO mencionar fatores latentes (arrogância, falta de conhecimento, etc.)`

  const r = await ask(system, `Relato: ${relato}\n\nResponda APENAS com JSON.`)
  return safeParse(r, 'Etapa 2') as Step2Result
}

export async function runStep3(relato: string, pontoFuga: Step2Result): Promise<StepFlowResult> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON for each node response. No text outside the JSON block.
- NEVER skip a decision node. Every YES/NO in the flow MUST be answered.
- NEVER classify a failure without explicit evidence from the report.
- NEVER mention internal variable names, node IDs, or step_ids in output.
- You MUST use CRITÉRIO_DECISOR to distinguish P-D from P-G:
  "Would more time have changed the outcome? YES → P-D. NO → P-G."
- If evidence is insufficient for a node, set justificativa to "DADO INSUFICIENTE" and do NOT advance to a positive conclusion.

Você é um especialista SERA aplicando o fluxo de Percepção (3-Flow.json).
Fluxo: ${loadDocJson('3-Flow.json')}
Falhas com CRITÉRIO_DECISOR: ${loadDocJson('3-Failures.json', 4000)}
${NO_ARTIFACTS}
CRITÉRIO P-D vs P-G: Se houvesse mais tempo, o resultado seria diferente? SIM → P-D. NÃO → P-G.`

  const ato = String(pontoFuga.ato_inseguro_factual || '')

  const r1 = await ask(
    system,
    `Ato inseguro: ${ato}
Relato: ${relato}

NÓ 1 — O operador possuía capacidade sensorial e perceptual para perceber as informações relevantes no momento do ato inseguro?
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no1 = safeParse(r1, 'Etapa 3 - Nó 1') as RawFlowNode

  if (String(no1.resposta || '').toLowerCase() === 'não') {
    return flowResult(
      'P-B',
      [no1],
      'P-C, P-D, P-E, P-F, P-G, P-H descartadas — operador sem capacidade sensorial'
    )
  }

  const r2 = await ask(
    system,
    `Ato inseguro: ${ato}
Relato: ${relato}
Nó 1: Capacidade sensorial = SIM (P-B e P-C DESCARTADAS)

NÓ 2 — Havia pressão de tempo extrema que impediu a percepção adequada no momento do ato inseguro?
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no2 = safeParse(r2, 'Etapa 3 - Nó 2') as RawFlowNode

  if (String(no2.resposta || '').toLowerCase() === 'sim') {
    return flowResult('P-E', [no1, no2], 'P-B, P-C, P-D descartadas; pressão de tempo confirmada')
  }

  const r3 = await ask(
    system,
    `Ato inseguro: ${ato}
Relato: ${relato}
Nó 1: Capacidade = SIM | Nó 2: Pressão de tempo = NÃO (P-B, P-C, P-D, P-E DESCARTADAS)

NÓ 3 — A informação estava disponível no ambiente mas o operador não a percebeu corretamente ou a interpretou de forma ambígua/ilusória?
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no3 = safeParse(r3, 'Etapa 3 - Nó 3') as RawFlowNode

  const codigo = String(no3.resposta || '').toLowerCase() === 'sim' ? 'P-F' : 'P-A'
  return flowResult(codigo, [no1, no2, no3], 'P-B, P-C, P-D, P-E descartadas pelos nós anteriores')
}

export async function runStep4(relato: string, pontoFuga: Step2Result, step3: StepFlowResult): Promise<StepFlowResult> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER skip the first decision node: "Consistent with rules and regulations?" This MUST be answered before any other.
- NEVER classify O-D if there is evidence of rule violation — O-D requires the goal to be consistent with rules but not conservative.
- NEVER classify O-B (routine violation) without evidence of repeated behavior. A single violation with no evidence of habit MUST be O-C, not O-B.
- If evidence is insufficient, set justificativa to "DADO INSUFICIENTE".

Você é um especialista SERA aplicando o fluxo de Objetivo (4-Flow.json).
Fluxo: ${loadDocJson('4-Flow.json')}
Falhas: ${loadDocJson('4-Failures.json', 4000)}
${NO_ARTIFACTS}
CRITÉRIO O-D: Objetivo consistente com normas MAS não conservativo/não gerencia risco → O-D (Hendy 2003, Figure 5 — 'Failure in intent, Non-violation').`

  const ato = String(pontoFuga.ato_inseguro_factual || '')

  const r1 = await ask(
    system,
    `Ato inseguro: ${ato}
Relato: ${relato}

NÓ 1 — O OBJETIVO do operador (o que ele pretendia alcançar) era consistente com as normas e regulamentos vigentes?
ATENÇÃO: Avalie o OBJETIVO (intenção), NÃO a forma de execução.
Responda APENAS com JSON: {"resposta": "Sim/Não", "objetivo_identificado": "...", "justificativa": "..."}`
  )
  const no1 = safeParse(r1, 'Etapa 4 - Nó 1') as RawFlowNode

  if (String(no1.resposta || '').toLowerCase() === 'não') {
    const r2 = await ask(
      system,
      `Nó 1: Objetivo NÃO consistente com normas (O-A e O-D DESCARTADOS).

NÓ 2 — Esta violação é rotineira (padrão no contexto operacional) ou excepcional (situação incomum)?
Responda APENAS com JSON: {"tipo": "rotineira/excepcional", "justificativa": "..."}`
    )
    const no2 = safeParse(r2, 'Etapa 4 - Nó 2') as RawFlowNode
    const codigo = String(no2.tipo || '').toLowerCase() === 'rotineira' ? 'O-B' : 'O-C'
    return flowResult(codigo, [no1, no2], 'O-A e O-D descartados no Nó 1')
  }

  const r2 = await ask(
    system,
    `Nó 1: Objetivo SIM consistente com normas (O-B e O-C DESCARTADOS).

NÓ 2 — O objetivo era conservativo, com risco adequadamente gerenciado e alinhado aos procedimentos operacionais?
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no2 = safeParse(r2, 'Etapa 4 - Nó 2') as RawFlowNode

  if (String(no2.resposta || '').toLowerCase() === 'não') {
    return flowResult('O-D', [no1, no2], 'O-B e O-C descartados no Nó 1')
  }

  return flowResult('O-A', [no1, no2], 'O-B, O-C, O-D descartados')
}

export async function runStep5(
  relato: string,
  pontoFuga: Step2Result,
  _step3: StepFlowResult,
  _step4: StepFlowResult
): Promise<StepFlowResult> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER skip the action flow. Follow this EXACT sequence:
  NODE 1: Was the action implemented AS intended by the operator?
           YES → go to NODE 2 (was it correct?)
           NO  → execution failed → A-B (slip/lapse) or A-C (feedback failure)
  NODE 2: Was the action correct/adequate for the situation?
           YES → no action failure → return A-A
           NO  → go to NODE 3
  NODE 3: Did the operator have prerequisite capability? (physical AND technical ability to do the correct action)
           YES (had capability, chose wrong) → go to NODE 4 (time pressure check)
           NO  (lacked capability)           → classify between A-D and A-E:
               A-D: physical/motor/environmental limitation
               A-E: lacked knowledge or decision skill
  NODE 4: Was time pressure excessive?
           YES → NODE 5-TIME: classify between A-H / A-I / A-J
           NO  → NODE 5-NOTM: classify between A-F or A-G

- KEY DISTINCTION (NODE 1):
  "Operator intended AND executed the action (even if it was the wrong choice)" → NODE 1 = YES → Selection path
  "Operator intended but body/system did not comply; slip, lapse, omission" → NODE 1 = NO → Execution path
- NEVER mention node names or IDs in the output.

Você é um especialista SERA aplicando o fluxo de Ação (5-Flow.json).
Fluxo: ${loadDocJson('5-Flow.json')}
Falhas com CRITÉRIO_DECISOR: ${loadDocJson('5-Failures.json', 4000)}
${NO_ARTIFACTS}
CRITÉRIO A-F vs A-I: Pressão de tempo excessiva? NÃO → A-F. SIM → A-I.
CRITÉRIO A-G vs A-J: Pressão de tempo excessiva? NÃO → A-G. SIM → A-J.`

  const ato = String(pontoFuga.ato_inseguro_factual || '')

  const r1 = await ask(
    system,
    `Ato inseguro: ${ato}
Relato: ${relato}

NÓ 1 — A ação foi implementada COMO o operador pretendia?
• SIM: o operador quis fazer aquela ação e a executou exatamente como planejava (mesmo que fosse a escolha errada)
• NÃO: houve deslize, lapso, omissão involuntária, ou falha de feedback na execução
(Avaliar APENAS se a EXECUÇÃO correspondeu à INTENÇÃO — não se a ação era correta)
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no1 = safeParse(r1, 'Etapa 5 - Nó 1') as RawFlowNode

  if (String(no1.resposta || '').toLowerCase() === 'não') {
    const r2 = await ask(
      system,
      `Nó 1 = NÃO — a execução não correspondeu à intenção.
(A-A, A-D, A-E, A-F, A-G, A-H, A-I, A-J TODOS EXCLUÍDOS neste caminho)

NÓ 2 — Classifique a falha de execução:
• A-B: DESLIZE/LAPSO/OMISSÃO — ação automática/habitual ativada no lugar da planejada; esquecimento involuntário
• A-C: FALHA DE FEEDBACK — ação executada mas sem verificar/monitorar o resultado; loop de feedback ausente
Responda APENAS com JSON: {"codigo": "A-B ou A-C", "justificativa": "..."}`
    )
    const no2 = safeParse(r2, 'Etapa 5 - Nó 2 (execução)') as RawFlowNode & { codigo?: string }
    const cod = String(no2.codigo || '').includes('B') ? 'A-B' : 'A-C'
    return flowResult(cod, [no1, no2], 'A-A, A-D, A-E, A-F, A-G, A-H, A-I, A-J excluídos — Nó 1=NÃO (execução falhou)')
  }

  const r2 = await ask(
    system,
    `Nó 1 = SIM — ação implementada como pretendida.
(A-B e A-C EXCLUÍDOS — não houve falha de execução)

NÓ 2 — A ação implementada foi CORRETA e ADEQUADA para a situação?
• SIM: a ação era a mais apropriada → NENHUMA FALHA DE AÇÃO (A-A)
• NÃO: a ação era a intenção do operador, mas foi a escolha errada ou inadequada
Responda APENAS com JSON: {"resposta": "Sim/Não", "justificativa": "..."}`
  )
  const no2 = safeParse(r2, 'Etapa 5 - Nó 2') as RawFlowNode

  if (String(no2.resposta || '').toLowerCase() === 'sim') {
    return flowResult('A-A', [no1, no2], 'Ação correta e adequada — nenhuma falha de ação')
  }

  const r3 = await ask(
    system,
    `Nó 1=SIM | Nó 2=NÃO — ação implementada como pretendida, mas foi a escolha errada.
(A-B, A-C excluídos no Nó 1)

NÓ 3 — O operador tinha CAPACIDADE PRÉ-REQUISITO para executar a ação correta?
(avalie: tinha força física, alcance, habilidade motora E conhecimento técnico para realizar a ação certa)
• SIM: tinha capacidade mas ainda assim escolheu/decidiu errado → ir para Nó 4 (pressão de tempo)
• NÃO: não tinha capacidade física ou conhecimento → classificar entre A-D e A-E
  - A-D: INABILIDADE FÍSICA — limitação física, ergonômica, motora ou ambiental (força, alcance, tempo de reação)
  - A-E: FALHA DE CONHECIMENTO/DECISÃO — tinha capacidade física, mas lhe faltava o conhecimento ou a habilidade de decisão
Responda APENAS com JSON: {"capacidade": "Sim/Não", "codigo_se_nao": "A-D ou A-E ou null", "justificativa": "..."}`
  )
  const no3 = safeParse(r3, 'Etapa 5 - Nó 3') as RawFlowNode

  if (String(no3.capacidade || '').toLowerCase() === 'não') {
    let cod = String(no3.codigo_se_nao || 'A-E')
    if (cod !== 'A-D' && cod !== 'A-E') cod = 'A-E'
    return flowResult(
      cod,
      [no1, no2, no3],
      'A-B, A-C excluídos no Nó 1; A-F, A-G, A-H, A-I, A-J excluídos no Nó 3 (sem capacidade)'
    )
  }

  const r4 = await ask(
    system,
    `Nó 3 = SIM — operador tinha capacidade pré-requisito mas escolheu/decidiu errado.
(A-B, A-C, A-D, A-E TODOS EXCLUÍDOS)

NÓ 4 — A pressão de tempo era EXCESSIVA no momento do ato inseguro?
• SIM: pressão de tempo impediu avaliação adequada (→ A-H / A-I / A-J)
• NÃO: tomada de decisão deficiente sem pressão excessiva de tempo (→ A-F / A-G)
Responda APENAS com JSON: {"pressao_tempo": "Sim/Não", "justificativa": "..."}`
  )
  const no4 = safeParse(r4, 'Etapa 5 - Nó 4 (pressão)') as RawFlowNode

  if (String(no4.pressao_tempo || '').toLowerCase() === 'sim') {
    const r5 = await ask(
      system,
      `Pressão de tempo EXCESSIVA confirmada.
(Apenas A-H, A-I, A-J aplicáveis — A-B, A-C, A-D, A-E, A-F, A-G EXCLUÍDOS)

NÓ 5 — Classifique a falha sob pressão de tempo:
• A-H: GERENCIAMENTO DO TEMPO — falha em alocar/priorizar o tempo disponível
• A-I: SELEÇÃO DE AÇÃO sob pressão — escolha errada de plano/procedimento devido à pressão de tempo
• A-J: FALHA DE FEEDBACK sob pressão — não verificou/monitorou resultado por falta de tempo
Responda APENAS com JSON: {"codigo": "A-H, A-I ou A-J", "justificativa": "..."}`
    )
    const no5 = safeParse(r5, 'Etapa 5 - Nó 5 (pressão tempo)') as RawFlowNode & { codigo?: string }
    return flowResult(
      String(no5.codigo || 'A-H'),
      [no1, no2, no3, no4, no5],
      'A-B, A-C excluídos no Nó 1; A-D, A-E excluídos no Nó 3; A-F, A-G excluídos no Nó 4'
    )
  }

  const r5 = await ask(
    system,
    `Pressão de tempo NÃO excessiva.
(Apenas A-F, A-G aplicáveis — A-B, A-C, A-D, A-E, A-H, A-I, A-J EXCLUÍDOS)

NÓ 5 — Classifique a falha de seleção/decisão sem pressão de tempo:
• A-F: SELEÇÃO DE AÇÃO errada — escolheu plano/procedimento incorreto sem pressão de tempo
• A-G: FALHA DE FEEDBACK — não monitorou/verificou o resultado da sua decisão (trocou atenção antes de confirmar)
Responda APENAS com JSON: {"codigo": "A-F ou A-G", "justificativa": "..."}`
  )
  const no5 = safeParse(r5, 'Etapa 5 - Nó 5 (sem pressão)') as RawFlowNode & { codigo?: string }
  return flowResult(
    String(no5.codigo || 'A-F'),
    [no1, no2, no3, no4, no5],
    'A-B, A-C excluídos no Nó 1; A-D, A-E excluídos no Nó 3; A-H, A-I, A-J excluídos no Nó 4'
  )
}

export async function runStep6_7(
  relato: string,
  pontoFuga: Step2Result,
  step3: StepFlowResult,
  step4: StepFlowResult,
  step5: StepFlowResult
): Promise<Step67Result> {
  const system = `CRITICAL RULES:
- Return ONLY valid JSON. No text outside the JSON block.
- NEVER repeat information already stated in steps 3, 4, or 5.
- NEVER create a recommendation without a direct link to an identified failure code.
- NEVER duplicate recommendations — each must address a distinct failure or precondition.
- Each recommendation MUST target what CAN be changed (precondition/systemic factor), not the active failure itself.
- Minimum 3, maximum 6 recommendations.
- Each precondition MUST have direct evidence from the report — no inferences.
- If evidence is insufficient for a conclusion, state it explicitly.

OUTPUT FORMAT (strict):
{
  "precondicoes": [
    {"codigo": "string: e.g. P2", "descricao": "nome da pré-condição", "etapa": "3, 4 ou 5", "evidencia_no_relato": "citação ou paráfrase do relato"}
  ],
  "conclusoes": "síntese das descobertas, 80-120 palavras",
  "recomendacoes": [
    {"acao": "ação concreta e específica", "falha_relacionada": "X-X", "justificativa": "por que essa ação mitiga essa falha"}
  ]
}

Você é um especialista SERA gerando pré-condições e recomendações.
Pré-condições disponíveis: ${loadDocJson('Pre-Conditions.json', 4000)}
Guidelines: ${loadDocJson('Guidelines.json')}
Template: ${loadDocJson('Template.json')}
Base científica e critérios decisores (tutorial): ${loadDocJson('tutorial.json', 3000)}`

  const r = await ask(
    system,
    `Ato inseguro: ${pontoFuga.ato_inseguro_factual}
Falha Percepção: ${step3.codigo}
Falha Objetivo: ${step4.codigo}
Falha Ação: ${step5.codigo}
Relato: ${relato}

REGRAS OBRIGATÓRIAS:
1. Cada pré-condição deve ter evidência DIRETA no relato — sem inferências
2. Organize por etapa: cada pré-condição pertence a Etapa 3, 4 ou 5
3. SEM duplicatas de código
4. Se pressão de tempo foi descartada no fluxo de Percepção, T1 só pode aparecer vinculada à Etapa 4 ou 5 com justificativa específica
5. Recomendações vinculadas aos códigos reais identificados (${step3.codigo}, ${step4.codigo}, ${step5.codigo})

Responda APENAS com JSON.`
  )
  return safeParse(r, 'Etapa 6-7') as unknown as Step67Result
}
