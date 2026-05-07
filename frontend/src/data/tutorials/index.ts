export { step3Tutorials } from './step3-tutorials'
export { step4Tutorials } from './step4-tutorials'
export { step5Tutorials } from './step5-tutorials'
export type { ElementTutorial, TutorialRecord, NaoConfundirItem } from './types'

import { step3Tutorials } from './step3-tutorials'
import { step4Tutorials } from './step4-tutorials'
import { step5Tutorials } from './step5-tutorials'
import type { ElementTutorial } from './types'

export function getTutorial(code: string): ElementTutorial | null {
  return step3Tutorials[code] || step4Tutorials[code] || step5Tutorials[code] || null
}

// All valid failure codes by step
export const STEP3_CODES = ['P-A','P-B','P-C','P-D','P-E','P-F','P-G','P-H']
export const STEP4_CODES = ['O-A','O-B','O-C','O-D']
export const STEP5_CODES = ['A-A','A-B','A-C','A-D','A-E','A-F','A-G','A-H','A-I','A-J']

export const FAILURE_NAMES: Record<string, string> = {
  'P-A': 'Nenhuma Falha de Percepção',
  'P-B': 'Falha Sensorial',
  'P-C': 'Falha de Conhecimento/Percepção',
  'P-D': 'Falha de Atenção (com pressão de tempo)',
  'P-E': 'Falha no Gerenciamento do Tempo',
  'P-F': 'Falha de Percepção',
  'P-G': 'Falha de Atenção (sem pressão de tempo)',
  'P-H': 'Falha de Comunicação',
  'O-A': 'Nenhuma Falha de Objetivo',
  'O-B': 'Violação Rotineira',
  'O-C': 'Falha de Intenção / Violação Excepcional',
  'O-D': 'Falha de Intenção (Não Violação)',
  'A-A': 'Nenhuma Falha de Ação',
  'A-B': 'Deslizes, Omissões e Lapsos',
  'A-C': 'Falha no Feedback da Execução',
  'A-D': 'Inabilidade para a Resposta',
  'A-E': 'Falha de Conhecimento/Decisão',
  'A-F': 'Falha na Seleção da Ação',
  'A-G': 'Falha de Feedback',
  'A-H': 'Falha no Gerenciamento do Tempo',
  'A-I': 'Falha na Seleção da Ação por Pressão do Tempo',
  'A-J': 'Falha de Feedback por Pressão do Tempo',
}
