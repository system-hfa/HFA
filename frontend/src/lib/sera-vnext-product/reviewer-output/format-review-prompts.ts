export function escapePointReviewerQuestion(): string {
  return 'O ponto de fuga candidato está localizado corretamente no relato? O ator direto está identificado corretamente? O momento operacional está descrito com precisão?'
}

export function perceptionReviewerQuestion(): string {
  return 'A percepção descrita para este ator era fisicamente possível nesse momento? A evidência sustenta a falha ou limitação perceptual candidata?'
}

export function objectiveReviewerQuestion(): string {
  return 'O objetivo identificado para o ator nesse momento está sustentado por evidência explícita? Há indicação de objetivo inseguro ou de que o ator estava consciente do risco?'
}

export function actionReviewerQuestion(): string {
  return 'A ação ou omissão candidata ocorreu no ponto de fuga? É coerente com a percepção candidata? A evidência sustenta a categoria de ação sugerida?'
}

export function escapePointReviewerOptions(): string[] {
  return [
    'Confirmar ponto de fuga como hipótese de trabalho',
    'Rejeitar ponto de fuga — não sustentado pela evidência',
    'Solicitar evidência adicional antes de decidir',
    'Retornar para reanálise com nova delimitação de escopo',
  ]
}

export function reviewDecisionChecklist(): string[] {
  return [
    'O ponto de fuga candidato está localizado corretamente no relato?',
    'O ator direto está identificado corretamente?',
    'A percepção candidata está sustentada por evidência explícita?',
    'O objetivo candidato está sustentado por evidência explícita?',
    'A ação ou omissão candidata está sustentada por evidência explícita?',
    'Há precondição relevante que altere a interpretação?',
    'Existe evidência ausente que impediu a análise de ser conclusiva?',
    'A análise deve ser retornada para reanálise antes da decisão?',
  ]
}

export function axisReviewerMustDecide(axis: 'P' | 'O' | 'A'): string[] {
  if (axis === 'P') {
    return [
      'A falha ou limitação perceptual candidata realmente ocorreu nesse momento?',
      'Há evidência explícita que sustente a categoria de percepção sugerida?',
      'Existem evidências contraditórias que invalidem o código candidato?',
      'Uma categoria de percepção alternativa é mais consistente com o relato?',
    ]
  }
  if (axis === 'O') {
    return [
      'O objetivo identificado existia efetivamente nesse momento no ponto de fuga?',
      'Há indicação explícita de objetivo inseguro (O-C) ou o código mais neutro é mais adequado?',
      'A evidência de awareness explícita é suficientemente forte para sustentar O-C?',
      'Uma categoria de objetivo alternativa é mais consistente com a evidência disponível?',
    ]
  }
  return [
    'A ação ou omissão candidata realmente ocorreu no ponto de fuga?',
    'A ação era coerente com a percepção candidata (erro holisticamente consistente)?',
    'Houve falha de verificação ou feedback que explica a ação?',
    'A diferença entre ação ativa (A-B, A-C) e omissão (A-D) está clara na evidência?',
  ]
}
