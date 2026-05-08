/** Espelha backend/app/sera/flow_renderer.py */

export function buildPerceptionMermaid(flowData: {
  nos_percorridos?: unknown[]
  codigo?: string | null
}): string {
  const nos = flowData.nos_percorridos || []
  const codigo = flowData.codigo || ''

  let mermaid = `flowchart TD
    START([PERCEPÇÃO\\nO que o operador acreditou?])
    START --> Q1

    Q1{Avaliação correta\\nou adequada?}
    Q1 -->|SIM| PA([P-A\\nNenhuma Falha])
    Q1 -->|NÃO| Q2

    Q2{Capacidade sensorial\\ne perceptual?}
    Q2 -->|NÃO| PB([P-B\\nFalha Sensorial])
    Q2 -->|NÃO| PC([P-C\\nFalha Conhecimento])
    Q2 -->|SIM| Q3

    Q3{Pressão do\\ntempo excessiva?}
    Q3 -->|SIM| PE([P-E\\nFalha no Gerenciamento])
    Q3 -->|NÃO| Q4

    Q4{Informação ilusória\\nou ambígua?}
    Q4 -->|SIM| PF([P-F\\nFalha de Percepção])
    Q4 -->|NÃO| Q5

    Q5{Informação disponível\\ne correta?}
    Q5 -->|NÃO| PH([P-H\\nFalha Comunicação])
    Q5 -->|SIM| PG([P-G\\nFalha de Atenção])
`

  const estilos: string[] = []
  const mapaNos: Record<number, string> = { 0: 'Q1', 1: 'Q2', 2: 'Q3', 3: 'Q4', 4: 'Q5' }

  for (let i = 0; i < nos.length; i++) {
    const nodeId = mapaNos[i]
    if (nodeId) {
      estilos.push(`style ${nodeId} fill:#2563eb,color:#fff,stroke:#1d4ed8`)
    }
  }

  const codigoMap: Record<string, string> = {
    'P-A': 'PA',
    'P-B': 'PB',
    'P-C': 'PC',
    'P-E': 'PE',
    'P-F': 'PF',
    'P-G': 'PG',
    'P-H': 'PH',
  }
  if (codigo in codigoMap) {
    estilos.push(`style ${codigoMap[codigo]} fill:#16a34a,color:#fff,stroke:#15803d`)
  }

  if (estilos.length) mermaid += '\n' + estilos.join('\n')
  return mermaid
}

export function buildObjectiveMermaid(flowData: {
  nos_percorridos?: unknown[]
  codigo?: string | null
}): string {
  const nos = flowData.nos_percorridos || []
  const codigo = flowData.codigo || ''

  let mermaid = `flowchart TD
    START([OBJETIVO\\nQual era a intenção?])
    START --> Q1

    Q1{Consistente com\\nnormas e regulamentos?}
    Q1 -->|SIM| Q2
    Q1 -->|NÃO| Q3

    Q2{Conservativo, risco\\ngerenciado, procedimentos?}
    Q2 -->|SIM| OA([O-A\\nNenhuma Falha])
    Q2 -->|NÃO| OD([O-D\\nFalha de Intenção\\nNão Violação])

    Q3{Violação\\nde rotina?}
    Q3 -->|SIM| OB([O-B\\nViolação Rotineira])
    Q3 -->|NÃO| OC([O-C\\nViolação Excepcional])
`

  const estilos: string[] = []
  const mapaNos: Record<number, string> = { 0: 'Q1', 1: 'Q2' }

  for (let i = 0; i < nos.length; i++) {
    const nodeId = mapaNos[i]
    if (nodeId) {
      estilos.push(`style ${nodeId} fill:#2563eb,color:#fff,stroke:#1d4ed8`)
    }
  }

  const codigoMap: Record<string, string> = {
    'O-A': 'OA',
    'O-B': 'OB',
    'O-C': 'OC',
    'O-D': 'OD',
  }
  if (codigo in codigoMap) {
    estilos.push(`style ${codigoMap[codigo]} fill:#16a34a,color:#fff,stroke:#15803d`)
  }

  if (estilos.length) mermaid += '\n' + estilos.join('\n')
  return mermaid
}

export function buildActionMermaid(flowData: {
  nos_percorridos?: unknown[]
  codigo?: string | null
}): string {
  const nos = flowData.nos_percorridos || []
  const codigo = flowData.codigo || ''

  let mermaid = `flowchart TD
    START([AÇÃO\\nComo tentou atingir o objetivo?])
    START --> Q1

    Q1{Implementada\\ncomo pretendida?}
    Q1 -->|NÃO| AA([A-A\\nDeslize, Lapso ou Erro])
    Q1 -->|SIM| Q2

    Q2{Ação correta\\nou adequada?}
    Q2 -->|SIM| AB([A-B\\nFalha de Feedback])
    Q2 -->|NÃO| Q3

    Q3{Capacidade para\\nresposta adequada?}
    Q3 -->|NÃO| AD([A-D\\nInabilidade para Resposta])
    Q3 -->|SIM| Q4

    Q4{Pressão do tempo\\nexcessiva?}
    Q4 -->|SIM| AH([A-H\\nFalha Gerenciamento Tempo])
    Q4 -->|NÃO| Q5

    Q5{Falha no processo\\nde decisão?}
    Q5 -->|SIM| AE([A-E\\nFalha de Conhecimento/Decisão])
    Q5 -->|NÃO| AF([A-F\\nFalha na Seleção da Ação])
`

  const estilos: string[] = []
  const mapaNos: Record<number, string> = { 0: 'Q1', 1: 'Q2', 2: 'Q3', 3: 'Q4', 4: 'Q5' }

  for (let i = 0; i < nos.length; i++) {
    const nodeId = mapaNos[i]
    if (nodeId) {
      estilos.push(`style ${nodeId} fill:#2563eb,color:#fff,stroke:#1d4ed8`)
    }
  }

  const codigoMap: Record<string, string> = {
    'A-A': 'AA',
    'A-B': 'AB',
    'A-D': 'AD',
    'A-E': 'AE',
    'A-F': 'AF',
    'A-H': 'AH',
  }
  if (codigo in codigoMap) {
    estilos.push(`style ${codigoMap[codigo]} fill:#16a34a,color:#fff,stroke:#15803d`)
  }

  if (estilos.length) mermaid += '\n' + estilos.join('\n')
  return mermaid
}
