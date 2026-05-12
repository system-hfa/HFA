import { selectDeterministicPreconditions } from '../../frontend/src/lib/sera/rules/preconditions'

type StaticCase = {
  name: string
  codes: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level?: number
  }
  text: string
  expected: string[]
}

const cases: StaticCase[] = [
  {
    name: 'A-D',
    codes: { perception_code: 'P-A', objective_code: 'O-A', action_code: 'A-D' },
    text: 'operador não conseguiu fechar válvula manual por força insuficiente usando luvas de proteção',
    expected: ['W1', 'W2', 'P1'],
  },
  {
    name: 'A-E / P-C',
    codes: { perception_code: 'P-C', objective_code: 'O-A', action_code: 'A-E' },
    text: 'técnico não sabia diagnosticar sistema de novo modelo por falta de treinamento',
    expected: ['P6', 'P7'],
  },
  {
    name: 'A-J / P-D',
    codes: { perception_code: 'P-D', objective_code: 'O-A', action_code: 'A-J' },
    text: 'controlador não confirmou readback em frequência congestionada sob alta demanda',
    expected: ['T1', 'O1', 'O2', 'S3', 'O6'],
  },
  {
    name: 'O-B / A-A',
    codes: { perception_code: 'P-G', objective_code: 'O-B', action_code: 'A-A' },
    text: 'piloto em rota habitual violou altitude mínima para ganhar tempo, prática tolerada na operação',
    expected: ['P3', 'S3', 'O5', 'O6', 'T1'],
  },
  {
    name: 'O-D / A-A',
    codes: { perception_code: 'P-A', objective_code: 'O-D', action_code: 'A-A' },
    text: 'comandante escolheu atalho operacional para cumprir janela de conexão e reduzir tempo de voo',
    expected: ['P2', 'S1', 'S2', 'O4', 'T2'],
  },
  {
    name: 'P-G / A-C',
    codes: { perception_code: 'P-G', objective_code: 'O-A', action_code: 'A-C' },
    text: 'técnico acionou reset e não verificou indicador de pressão estabilizada no painel',
    expected: ['W1', 'S3', 'O3', 'P3'],
  },
]

let failed = false

for (const testCase of cases) {
  const selected = selectDeterministicPreconditions(testCase.codes, testCase.text)
  const selectedCodes = new Set(selected.map((item) => item.code))
  const missing = testCase.expected.filter((code) => !selectedCodes.has(code))

  if (missing.length === 0) {
    console.log(`PASS ${testCase.name} -> [${[...selectedCodes].join(', ')}]`)
    continue
  }

  failed = true
  console.error(`FAIL ${testCase.name}`)
  console.error(`  missing: [${missing.join(', ')}]`)
  console.error(`  selected: [${[...selectedCodes].join(', ')}]`)
}

if (failed) process.exit(1)

console.log('PASS all static preconditions cases')
