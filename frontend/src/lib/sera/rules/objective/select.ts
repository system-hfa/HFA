export type ObjectiveOverrideResult = {
  code: 'O-B' | 'O-C' | 'O-D' | null
  reason: string
}

export function normalizeObjectiveText(text: string): string {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function has(text: string, token: string): boolean {
  return text.includes(token)
}

function hasAny(text: string, tokens: string[]): boolean {
  return tokens.some((token) => has(text, token))
}

export function classifyObjectiveByRules(text: string): ObjectiveOverrideResult {
  const t = normalizeObjectiveText(text)

  const protective =
    hasAny(t, [
      'passageiro doente',
      'evitar piorar',
      'piorar condicao',
      'evitar agravamento',
      'agravamento',
      'emergencia medica',
      'necessidade medica',
      'suspeita de infarto',
      'atendimento medico',
      'dano humano',
      'risco imediato',
    ]) ||
    (has(t, 'passageiro') && (has(t, 'doente') || has(t, 'infarto') || has(t, 'emergencia medica'))) ||
    (has(t, 'paciente') && (has(t, 'agravamento') || has(t, 'atendimento') || has(t, 'emergencia'))) ||
    (has(t, 'proteger') && (has(t, 'pessoa') || has(t, 'passageiro') || has(t, 'paciente'))) ||
    (has(t, 'condicao') && has(t, 'passageiro') && (has(t, 'piorar') || has(t, 'agravar')))

  if (protective) {
    return {
      code: 'O-C',
      reason: 'explicit human/protective objective',
    }
  }

  const routineViolation =
    hasAny(t, [
      'rota habitual',
      'rota conhecida',
      'rota costumeira',
      'por habito',
      'pratica habitual',
      'pratica ja era tolerada',
      'violacao rotineira',
      'desvio normalizado',
      'pratica tolerada',
      'pratica aceita',
      'tolerada',
      'considerado burocracia',
      'cultura informal',
      'todos faziam assim',
      'todos na oficina faziam assim',
      'sempre fazemos assim',
      'sempre fazia assim',
      'rotineira',
      'normalizado',
    ]) ||
    (has(t, 'altitude minima') && has(t, 'rota')) ||
    (has(t, 'altitude minima') && has(t, 'ganhar tempo') && (has(t, 'habitual') || has(t, 'rotina') || has(t, 'costumeira'))) ||
    (has(t, 'checklist') && (has(t, 'burocracia') || has(t, 'cultura informal')))

  if (routineViolation) {
    return {
      code: 'O-B',
      reason: 'routine or normalized violation',
    }
  }

  const efficiency = hasAny(t, [
    'rota mais curta',
    'economizar combustivel',
    'cumprir janela de conexao',
    'janela de conexao',
    'reduz tempo de voo',
    'reduzir tempo de voo',
    'cumprir horario',
    'ganhar tempo',
    'atalho operacional',
    'aumentar produtividade',
    'produtividade',
    'economia',
    'eficiencia',
  ])

  if (efficiency) {
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
