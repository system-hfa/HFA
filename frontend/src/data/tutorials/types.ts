export interface NaoConfundirItem {
  codigo: string
  diferenca: string
}

export interface ElementTutorial {
  oQueE: string
  porQueClassificouAssim?: string   // dynamic — filled by component from flow path
  oQueConsiderarParaAlterar: string
  naoConfundirCom: NaoConfundirItem[]
  exemplo: string
  fonte: string
}

export type TutorialRecord = Record<string, ElementTutorial>
