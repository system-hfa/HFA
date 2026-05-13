export type ObjectiveOverrideResult = {
  code: 'O-B' | 'O-C' | 'O-D' | null
  reason: string
}

export function normalizeObjectiveText(text: string): string {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['"''""\u2018\u2019\u201c\u201d`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function has(text: string, token: string): boolean {
  return text.includes(token)
}

function hasAny(text: string, tokens: string[]): boolean {
  return tokens.some((token) => has(text, token))
}

function hasExplicitProtectiveHumanIntent(text: string): boolean {
  const directPositive =
    hasAny(text, [
      'passageiro doente',
      'suspeita de infarto',
      'suspeita de avc',
      'emergencia medica',
      'necessidade medica',
      'evitar agravamento',
      'evitar piorar',
      'preservar paciente',
      'proteger pessoa',
      'proteger passageiro',
      'proteger paciente',
      'pessoa presa em area de risco',
      'dano humano iminente',
      'deterioracao clinica',
      'mitigacao de dano humano',
      'atendimento imediato',
      'precisava de atendimento',
    ]) ||
    (has(text, 'passageiro') && (has(text, 'doente') || has(text, 'infarto') || has(text, 'avc') || has(text, 'deterioracao'))) ||
    (has(text, 'condicao') && has(text, 'passageiro') && (has(text, 'piorar') || has(text, 'agravar'))) ||
    (has(text, 'paciente') && (has(text, 'agravamento') || has(text, 'emergencia medica')))

  if (!directPositive) return false

  const explicitNegative = hasAny(text, [
    'nao havia passageiro em emergencia medica',
    'nao havia passageiro com emergencia medica',
    'nao havia passageiro doente',
    'nao havia emergencia medica',
    'nao havia situacao de risco humano imediato',
    'nao havia risco humano imediato',
    'sem situacao de risco humano imediato',
    'sem risco humano imediato',
    'atendimento eletivo',
    'ferramenta improvisada',
    'pressao de prazo',
    'para manter o prazo',
    'janela de parada',
  ])

  return !explicitNegative
}

function hasExplicitRoutineNormalization(text: string): boolean {
  const directPositive = hasAny(text, [
    'pratica tolerada',
    'pratica ja era tolerada',
    'pratica aceita',
    'pratica comum na equipe',
    'todos faziam assim',
    'todos na oficina faziam assim',
    'sempre fazemos assim',
    'sempre fazia assim',
    'rotina informal',
    'cultura informal',
    'atalho aceito informalmente',
    'desvio normalizado',
    'violacao rotineira',
    'considerado burocracia',
    'burocracia na empresa',
    'burocracia pela empresa',
    'burocracia pela equipe',
    'formalidade dispensavel',
    'todo mundo usa',
    'nunca ninguem foi cobrado',
    'rota habitual',
    'rota conhecida',
    'rota costumeira',
    'por habito',
    'pratica habitual',
    'habito estabelecido',
    'era rotineira',
  ]) ||
    (has(text, 'altitude minima') && has(text, 'rota') && has(text, 'ganhar tempo'))

  if (!directPositive) return false

  const explicitNegative = hasAny(text, [
    'nao havia historico de pratica similar',
    'nao havia cultura informal',
    'nao tinha historico de simplificar procedimentos',
    'nao tinha historico estabelecido',
    'nao havia historico estabelecido',
    'decisao pontual',
    'decisao individual',
  ])

  return !explicitNegative
}

function hasExplicitEfficiencyObjective(text: string): boolean {
  return hasAny(text, [
    'reduzir consumo de combustivel',
    'economizar combustivel',
    'rota mais curta',
    'rota operacional mais curta',
    'cumprir janela de conexao',
    'janela de conexao',
    'perder a janela',
    'cumprir horario',
    'aumentar produtividade',
    'aumentar a produtividade',
    'produtividade',
    'metodo mais rapido',
    'mais rapido',
    'reduzir tempo',
    'reduzir tempo de voo',
    'ganho operacional',
    'eficiencia operacional',
    'eficiencia',
    'economia operacional',
    'atalho operacional',
    'avaliou o risco como aceitavel',
  ])
}

export function classifyObjectiveByRules(text: string): ObjectiveOverrideResult {
  const t = normalizeObjectiveText(text)

  if (hasExplicitProtectiveHumanIntent(t)) {
    return {
      code: 'O-C',
      reason: 'explicit human/protective objective',
    }
  }

  if (hasExplicitRoutineNormalization(t)) {
    return {
      code: 'O-B',
      reason: 'routine or normalized violation',
    }
  }

  if (hasExplicitEfficiencyObjective(t)) {
    return {
      code: 'O-D',
      reason: 'efficiency, economy, time, connection, fuel, or productivity objective',
    }
  }

  return {
    code: null,
    reason: 'no strong deterministic objective rule matched',
  }
}
