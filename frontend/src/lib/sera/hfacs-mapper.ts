export interface HfacsEntry {
  categoria_key: string
  subcategoria_key: string
  codigo_sera_origem: string
  justificativa_pt: string
  justificativa_en: string
}

export interface HfacsResult {
  nivel1_unsafe_acts: HfacsEntry[]
  nivel2_preconditions: HfacsEntry[]
  nivel3_supervision: HfacsEntry[]
  nivel4_organization: HfacsEntry[]
}

type MapEntry = {
  cat: string
  subcat: string
  justificativa_pt: string
  justificativa_en: string
}

/* ── Nível 1 — Atos Inseguros ──────────────────────────────────────── */
const NIVEL1_MAP: Record<string, MapEntry> = {
  'P-B': {
    cat: 'hfacs.errors', subcat: 'hfacs.perceptualError',
    justificativa_pt: 'Código SERA P-B (Falha Sensorial) corresponde a Erro de Percepção no HFACS — limitação física ou ambiental impediu a detecção do estímulo essencial.',
    justificativa_en: 'SERA code P-B (Sensory Failure) corresponds to Perceptual Error in HFACS — physical or environmental limitation prevented detection of the essential stimulus.',
  },
  'P-F': {
    cat: 'hfacs.errors', subcat: 'hfacs.perceptualError',
    justificativa_pt: 'Código SERA P-F (Informação Ilusória ou Ambígua) corresponde a Erro de Percepção no HFACS — o ambiente forneceu informações enganosas levando à percepção incorreta da situação.',
    justificativa_en: 'SERA code P-F (Illusory or Ambiguous Information) corresponds to Perceptual Error in HFACS — the environment provided misleading information leading to incorrect situational awareness.',
  },
  'P-C': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA P-C (Falha de Conhecimento) corresponde a Erro de Decisão no HFACS — o operador detectou o sinal mas não possuía conhecimento para interpretá-lo corretamente.',
    justificativa_en: 'SERA code P-C (Knowledge Failure) corresponds to Decision Error in HFACS — the operator detected the signal but lacked knowledge to correctly interpret it.',
  },
  'P-D': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA P-D (Atenção com Pressão de Tempo Externa) corresponde a Erro Baseado em Habilidade no HFACS — pressão de tempo imposta externamente capturou a atenção e impediu a percepção de informações críticas.',
    justificativa_en: 'SERA code P-D (Attention with External Time Pressure) corresponds to Skill-Based Error in HFACS — externally imposed time pressure captured attention and prevented perception of critical information.',
  },
  'P-E': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA P-E (Gerenciamento de Tempo) corresponde a Erro de Decisão no HFACS — o operador criou pressão de tempo por ansiedade ou impaciência, comprometendo a tomada de decisão.',
    justificativa_en: 'SERA code P-E (Time Management) corresponds to Decision Error in HFACS — the operator self-generated time pressure through anxiety or impatience, compromising decision-making.',
  },
  'P-G': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA P-G (Falha de Atenção) corresponde a Erro Baseado em Habilidade no HFACS — informação disponível e correta foi ignorada por distração ou viés cognitivo durante tarefa habitual.',
    justificativa_en: 'SERA code P-G (Attention Failure) corresponds to Skill-Based Error in HFACS — available and correct information was ignored due to distraction or cognitive bias during a routine task.',
  },
  'P-H': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA P-H (Falha de Comunicação) corresponde a Erro de Decisão no HFACS — a informação necessária para decisão não chegou ou chegou incorreta, comprometendo a percepção da situação.',
    justificativa_en: 'SERA code P-H (Communication Failure) corresponds to Decision Error in HFACS — required information for decision-making did not arrive or arrived incorrectly, compromising situational awareness.',
  },
  'A-B': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-B (Deslize, Lapso ou Omissão) corresponde a Erro Baseado em Habilidade no HFACS — ação não executada como planejada por erro motor involuntário em tarefa de alta automaticidade.',
    justificativa_en: 'SERA code A-B (Slip, Lapse or Omission) corresponds to Skill-Based Error in HFACS — action not executed as planned due to involuntary motor error in a highly automated task.',
  },
  'A-C': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-C (Falha de Feedback na Execução) corresponde a Erro Baseado em Habilidade no HFACS — ação iniciada corretamente mas o operador não percebeu o desvio durante a execução.',
    justificativa_en: 'SERA code A-C (Execution Feedback Failure) corresponds to Skill-Based Error in HFACS — action correctly initiated but the operator did not notice deviation during execution.',
  },
  'A-D': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-D (Inabilidade Física) corresponde a Erro Baseado em Habilidade no HFACS — o operador conhecia a ação correta mas limitação física impediu a execução adequada.',
    justificativa_en: 'SERA code A-D (Physical Inability) corresponds to Skill-Based Error in HFACS — the operator knew the correct action but physical limitation prevented adequate execution.',
  },
  'A-E': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA A-E (Falha de Conhecimento na Ação) corresponde a Erro de Decisão no HFACS — o operador não sabia qual ação executar e escolheu por analogia incorreta com situação familiar.',
    justificativa_en: 'SERA code A-E (Knowledge Failure in Action) corresponds to Decision Error in HFACS — the operator did not know which action to execute and chose by incorrect analogy with a familiar situation.',
  },
  'A-F': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA A-F (Seleção de Ação Errada) corresponde a Erro de Decisão no HFACS — com capacidade física e sem pressão excessiva, o operador selecionou o plano de ação incorreto.',
    justificativa_en: 'SERA code A-F (Wrong Action Selection) corresponds to Decision Error in HFACS — with physical capability and without excessive pressure, the operator selected the incorrect action plan.',
  },
  'A-G': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-G (Falha de Feedback na Decisão) corresponde a Erro Baseado em Habilidade no HFACS — o operador não monitorou o resultado da ação para verificar se o efeito pretendido foi atingido.',
    justificativa_en: 'SERA code A-G (Decision Feedback Failure) corresponds to Skill-Based Error in HFACS — the operator did not monitor the action outcome to verify if the intended effect was achieved.',
  },
  'A-H': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-H (Gerenciamento de Tempo na Ação) corresponde a Erro Baseado em Habilidade no HFACS — sob pressão real de tempo, o operador priorizou incorretamente suas atenções durante a execução.',
    justificativa_en: 'SERA code A-H (Time Management in Action) corresponds to Skill-Based Error in HFACS — under real time pressure, the operator incorrectly prioritized attention during execution.',
  },
  'A-I': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA A-I (Seleção de Ação sob Pressão) corresponde a Erro de Decisão no HFACS — a pressão de tempo foi determinante para a escolha incorreta do procedimento de emergência.',
    justificativa_en: 'SERA code A-I (Action Selection under Pressure) corresponds to Decision Error in HFACS — time pressure was decisive in the incorrect selection of the emergency procedure.',
  },
  'A-J': {
    cat: 'hfacs.errors', subcat: 'hfacs.skillBased',
    justificativa_pt: 'Código SERA A-J (Feedback por Pressão de Tempo) corresponde a Erro Baseado em Habilidade no HFACS — a pressão de tempo impediu que o operador verificasse se a ação estava produzindo o efeito correto.',
    justificativa_en: 'SERA code A-J (Feedback under Time Pressure) corresponds to Skill-Based Error in HFACS — time pressure prevented the operator from verifying if the action was producing the correct effect.',
  },
  'O-B': {
    cat: 'hfacs.violations', subcat: 'hfacs.routineViolation',
    justificativa_pt: 'Código SERA O-B (Violação Rotineira) corresponde a Violação Rotineira no HFACS — desvio habitual normalizado pela cultura operacional, reproduzido sistematicamente sem consequências percebidas.',
    justificativa_en: 'SERA code O-B (Routine Violation) corresponds to Routine Violation in HFACS — habitual deviation normalized by operational culture, systematically reproduced without perceived consequences.',
  },
  'O-C': {
    cat: 'hfacs.violations', subcat: 'hfacs.exceptionalViolation',
    justificativa_pt: 'Código SERA O-C (Violação Excepcional) corresponde a Violação Excepcional no HFACS — desvio isolado em circunstância específica, não representando padrão comportamental habitual do operador.',
    justificativa_en: "SERA code O-C (Exceptional Violation) corresponds to Exceptional Violation in HFACS — isolated deviation under specific circumstance, not representing the operator's habitual behavioral pattern.",
  },
  'O-D': {
    cat: 'hfacs.errors', subcat: 'hfacs.decisionError',
    justificativa_pt: 'Código SERA O-D (Intenção Não Conservativa) corresponde a Erro de Decisão no HFACS — objetivo formalmente válido mas o operador deliberadamente escolheu a opção mais arriscada disponível.',
    justificativa_en: 'SERA code O-D (Non-Conservative Intent) corresponds to Decision Error in HFACS — formally valid objective but the operator deliberately chose the riskier option available.',
  },
}

/* ── Nível 2 — Pré-condições ───────────────────────────────────────── */
const NIVEL2_MAP: Record<string, MapEntry> = {
  'P-B': {
    cat: 'hfacs.level2', subcat: 'hfacs.physEnv',
    justificativa_pt: 'P-B (Falha Sensorial) remete ao Ambiente Físico no HFACS Nível 2 — restrições sensoriais externas (névoa, ruído, iluminação) constituem condições subpadrão que comprometem a percepção do operador.',
    justificativa_en: 'P-B (Sensory Failure) maps to Physical Environment in HFACS Level 2 — external sensory restrictions (fog, noise, lighting) constitute substandard conditions that impair operator perception.',
  },
  'P-C': {
    cat: 'hfacs.level2', subcat: 'hfacs.physMentalLimits',
    justificativa_pt: 'P-C (Falha de Conhecimento) remete a Limitações Físicas/Mentais no HFACS Nível 2 — lacuna de conhecimento técnico representa limitação cognitiva que precede o ato inseguro.',
    justificativa_en: 'P-C (Knowledge Failure) maps to Physical/Mental Limitations in HFACS Level 2 — technical knowledge gap represents a cognitive limitation that precedes the unsafe act.',
  },
  'P-D': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'P-D (Pressão de Tempo Externa) remete a Estado Mental Adverso no HFACS Nível 2 — sobrecarga cognitiva induzida por urgência externa degrada a capacidade de monitoramento ambiental.',
    justificativa_en: 'P-D (External Time Pressure) maps to Adverse Mental States in HFACS Level 2 — cognitive overload induced by external urgency degrades environmental monitoring capacity.',
  },
  'P-E': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'P-E (Gerenciamento de Tempo) remete a Estado Mental Adverso no HFACS Nível 2 — ansiedade e impaciência autogeneradas são estados mentais adversos que comprometem a percepção segura.',
    justificativa_en: 'P-E (Time Management) maps to Adverse Mental States in HFACS Level 2 — self-generated anxiety and impatience are adverse mental states that compromise safe perception.',
  },
  'P-F': {
    cat: 'hfacs.level2', subcat: 'hfacs.physEnv',
    justificativa_pt: 'P-F (Informação Ilusória/Ambígua) remete ao Ambiente Físico no HFACS Nível 2 — o ambiente operacional forneceu estímulos enganosos que constituem condição subpadrão do espaço físico.',
    justificativa_en: 'P-F (Illusory/Ambiguous Information) maps to Physical Environment in HFACS Level 2 — the operational environment provided misleading stimuli constituting a substandard physical condition.',
  },
  'P-G': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'P-G (Falha de Atenção) remete a Estado Mental Adverso no HFACS Nível 2 — distração ou viés cognitivo representam estados mentais subpadrão que filtram seletivamente informações críticas.',
    justificativa_en: 'P-G (Attention Failure) maps to Adverse Mental States in HFACS Level 2 — distraction or cognitive bias represent substandard mental states that selectively filter critical information.',
  },
  'P-H': {
    cat: 'hfacs.level2', subcat: 'hfacs.crm',
    justificativa_pt: 'P-H (Falha de Comunicação) remete à Gestão de Recursos da Tripulação (CRM) no HFACS Nível 2 — falha na transferência de informação entre membros da equipe é a manifestação clássica de disfunção de CRM.',
    justificativa_en: 'P-H (Communication Failure) maps to Crew Resource Management (CRM) in HFACS Level 2 — failure in information transfer between crew members is the classic manifestation of CRM dysfunction.',
  },
  'A-D': {
    cat: 'hfacs.level2', subcat: 'hfacs.physMentalLimits',
    justificativa_pt: 'A-D (Inabilidade Física) remete a Limitações Físicas/Mentais no HFACS Nível 2 — restrição de força, alcance ou capacidade motora representa limitação física direta do operador.',
    justificativa_en: 'A-D (Physical Inability) maps to Physical/Mental Limitations in HFACS Level 2 — restriction of strength, reach or motor capacity represents a direct physical limitation of the operator.',
  },
  'A-E': {
    cat: 'hfacs.level2', subcat: 'hfacs.physMentalLimits',
    justificativa_pt: 'A-E (Falha de Conhecimento na Ação) remete a Limitações Físicas/Mentais no HFACS Nível 2 — déficit de treinamento ou experiência constitui limitação cognitiva que precede a seleção incorreta da ação.',
    justificativa_en: 'A-E (Knowledge Failure in Action) maps to Physical/Mental Limitations in HFACS Level 2 — training or experience deficit constitutes a cognitive limitation preceding incorrect action selection.',
  },
  'A-H': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'A-H (Gerenciamento de Tempo na Ação) remete a Estado Mental Adverso no HFACS Nível 2 — priorização inadequada da atenção sob pressão indica estado mental subpadrão durante a execução.',
    justificativa_en: 'A-H (Time Management in Action) maps to Adverse Mental States in HFACS Level 2 — inadequate attention prioritization under pressure indicates substandard mental state during execution.',
  },
  'A-I': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'A-I (Seleção sob Pressão) remete a Estado Mental Adverso no HFACS Nível 2 — a urgência que compromete a seleção do procedimento correto é um estado mental adverso situacional.',
    justificativa_en: 'A-I (Action Selection under Pressure) maps to Adverse Mental States in HFACS Level 2 — urgency that compromises correct procedure selection is a situational adverse mental state.',
  },
  'O-B': {
    cat: 'hfacs.level2', subcat: 'hfacs.personalReadiness',
    justificativa_pt: 'O-B (Violação Rotineira) remete a Prontidão Pessoal no HFACS Nível 2 — a normalização do desvio implica que o operador não manteve o padrão de prontidão e disciplina operacional esperado.',
    justificativa_en: 'O-B (Routine Violation) maps to Personal Readiness in HFACS Level 2 — normalization of deviation implies the operator did not maintain the expected standard of operational readiness and discipline.',
  },
  'O-D': {
    cat: 'hfacs.level2', subcat: 'hfacs.adverseMental',
    justificativa_pt: 'O-D (Intenção Não Conservativa) remete a Estado Mental Adverso no HFACS Nível 2 — tendência deliberada ao risco é uma disposição cognitiva adversa que se manifesta na seleção de objetivos.',
    justificativa_en: 'O-D (Non-Conservative Intent) maps to Adverse Mental States in HFACS Level 2 — deliberate risk tendency is an adverse cognitive disposition that manifests in objective selection.',
  },
}

/* ── Nível 3 — Supervisão ──────────────────────────────────────────── */
const NIVEL3_MAP: Record<string, MapEntry> = {
  'O-B': {
    cat: 'hfacs.level3', subcat: 'hfacs.failedCorrect',
    justificativa_pt: 'O-B (Violação Rotineira) remete a Falha em Corrigir Problema Conhecido no HFACS Nível 3 — a normalização do desvio pressupõe que a supervisão teve oportunidade de identificar e corrigir o padrão mas não o fez.',
    justificativa_en: 'O-B (Routine Violation) maps to Failed to Correct Known Problem in HFACS Level 3 — normalization of deviation presupposes supervision had opportunity to identify and correct the pattern but did not.',
  },
  'O-C': {
    cat: 'hfacs.level3', subcat: 'hfacs.inadequateSup',
    justificativa_pt: 'O-C (Violação Excepcional) remete a Supervisão Inadequada no HFACS Nível 3 — mesmo em situações excepcionais, supervisão adequada deve prever e mitigar condições que induzam desvios isolados.',
    justificativa_en: 'O-C (Exceptional Violation) maps to Inadequate Supervision in HFACS Level 3 — even in exceptional situations, adequate supervision must anticipate and mitigate conditions inducing isolated deviations.',
  },
  'O-D': {
    cat: 'hfacs.level3', subcat: 'hfacs.plannedInappropriate',
    justificativa_pt: 'O-D (Intenção Não Conservativa) remete a Operação Planejada Inadequada no HFACS Nível 3 — a aceitação de objetivos não conservativos sugere que a supervisão planejou ou tolerou operações com margens insuficientes de segurança.',
    justificativa_en: 'O-D (Non-Conservative Intent) maps to Planned Inappropriate Operations in HFACS Level 3 — acceptance of non-conservative objectives suggests supervision planned or tolerated operations with insufficient safety margins.',
  },
  'P-E': {
    cat: 'hfacs.level3', subcat: 'hfacs.inadequateSup',
    justificativa_pt: 'P-E (Gerenciamento de Tempo) remete a Supervisão Inadequada no HFACS Nível 3 — a pressão de tempo autogenerada frequentemente resulta de cultura organizacional permissiva com práticas inseguras.',
    justificativa_en: 'P-E (Time Management) maps to Inadequate Supervision in HFACS Level 3 — self-generated time pressure frequently results from an organizational culture permissive of unsafe practices.',
  },
}

/* ── Nível 4 — Influências Organizacionais ─────────────────────────── */
const NIVEL4_MAP: Record<string, MapEntry> = {
  'O-B': {
    cat: 'hfacs.level4', subcat: 'hfacs.orgClimate',
    justificativa_pt: "O-B (Violação Rotineira) remete ao Clima Organizacional no HFACS Nível 4 — violações habituais indicam que a cultura da organização tolera ou normaliza desvios, criando ambiente propício a acidentes.",
    justificativa_en: "O-B (Routine Violation) maps to Organizational Climate in HFACS Level 4 — habitual violations indicate the organization's culture tolerates or normalizes deviations, creating an accident-prone environment.",
  },
  'O-D': {
    cat: 'hfacs.level4', subcat: 'hfacs.orgProcess',
    justificativa_pt: 'O-D (Intenção Não Conservativa) remete ao Processo Organizacional no HFACS Nível 4 — a escolha sistemática de opções mais arriscadas sugere ausência ou inadequação de procedimentos operacionais padronizados.',
    justificativa_en: 'O-D (Non-Conservative Intent) maps to Organizational Process in HFACS Level 4 — systematic choice of riskier options suggests absence or inadequacy of standardized operational procedures.',
  },
  'P-H': {
    cat: 'hfacs.level4', subcat: 'hfacs.orgProcess',
    justificativa_pt: 'P-H (Falha de Comunicação) remete ao Processo Organizacional no HFACS Nível 4 — falhas sistemáticas de comunicação apontam para deficiências nos processos, protocolos e canais formais de troca de informação.',
    justificativa_en: 'P-H (Communication Failure) maps to Organizational Process in HFACS Level 4 — systematic communication failures point to deficiencies in processes, protocols and formal channels of information exchange.',
  },
}

function toEntry(code: string, m: MapEntry): HfacsEntry {
  return {
    categoria_key: m.cat,
    subcategoria_key: m.subcat,
    codigo_sera_origem: code,
    justificativa_pt: m.justificativa_pt,
    justificativa_en: m.justificativa_en,
  }
}

function dedup(entries: HfacsEntry[]): HfacsEntry[] {
  const seen = new Set<string>()
  return entries.filter((e) => {
    const key = `${e.categoria_key}|${e.subcategoria_key}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function mapToHfacs(codes: {
  perception?: string | null
  objective?: string | null
  action?: string | null
}): HfacsResult {
  const active = [codes.perception, codes.objective, codes.action].filter(Boolean) as string[]

  const nivel1: HfacsEntry[] = []
  const nivel2: HfacsEntry[] = []
  const nivel3: HfacsEntry[] = []
  const nivel4: HfacsEntry[] = []

  for (const code of active) {
    if (NIVEL1_MAP[code]) nivel1.push(toEntry(code, NIVEL1_MAP[code]))
    if (NIVEL2_MAP[code]) nivel2.push(toEntry(code, NIVEL2_MAP[code]))
    if (NIVEL3_MAP[code]) nivel3.push(toEntry(code, NIVEL3_MAP[code]))
    if (NIVEL4_MAP[code]) nivel4.push(toEntry(code, NIVEL4_MAP[code]))
  }

  return {
    nivel1_unsafe_acts: dedup(nivel1),
    nivel2_preconditions: dedup(nivel2),
    nivel3_supervision: dedup(nivel3),
    nivel4_organization: dedup(nivel4),
  }
}
