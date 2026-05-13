import { selectDeterministicPreconditions } from '../../frontend/src/lib/sera/rules/preconditions'

type PreconditionsCase = {
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

const cases: PreconditionsCase[] = [
  {
    name: 'O-B/A-A generalization',
    codes: { perception_code: 'P-G', objective_code: 'O-B', action_code: 'A-A', erc_level: 1 },
    text: 'Equipe ignora checklist considerado burocracia e prática tolerada para ganhar tempo.',
    expected: ['P3', 'S3', 'O5', 'O6', 'T1'],
  },
  {
    name: 'O-C/A-A generalization',
    codes: { perception_code: 'P-A', objective_code: 'O-C', action_code: 'A-A', erc_level: 2 },
    text: 'Piloto pousa sem autorização para passageiro com suspeita de infarto e necessidade médica imediata.',
    expected: ['P2', 'S1', 'O3', 'T1'],
  },
  {
    name: 'O-D/A-A generalization',
    codes: { perception_code: 'P-A', objective_code: 'O-D', action_code: 'A-A', erc_level: 2 },
    text: 'Comandante escolhe rota mais curta para economizar combustível e cumprir janela de conexão.',
    expected: ['P2', 'S1', 'S2', 'O4', 'T2'],
  },
  {
    name: 'P-D/A-J generalization',
    codes: { perception_code: 'P-D', objective_code: 'O-A', action_code: 'A-J', erc_level: 1 },
    text: 'Controlador transmite alteração crítica mas não confirma recebimento em frequência congestionada.',
    expected: ['T1', 'O1', 'O2', 'S3', 'O6'],
  },
  {
    name: 'P-E/A-H generalization',
    codes: { perception_code: 'P-E', objective_code: 'O-A', action_code: 'A-H', erc_level: 2 },
    text: 'Piloto interrompe checklist por tempo insuficiente antes da aproximação.',
    expected: ['T1', 'P6', 'O1', 'S3'],
  },
  {
    name: 'A-G generalization',
    codes: { perception_code: 'P-A', objective_code: 'O-A', action_code: 'A-G', erc_level: 3 },
    text: 'Coordenador instruiu auxiliar a isolar circuito e liberou serviço sem confirmar execução.',
    expected: ['P2', 'S3', 'O6'],
  },
  {
    name: 'A-D generalization',
    codes: { perception_code: 'P-A', objective_code: 'O-A', action_code: 'A-D', erc_level: 3 },
    text: 'Operador não conseguiu acionar válvula por força insuficiente usando luvas de proteção.',
    expected: ['W1', 'W2', 'P1', 'O2', 'O4'],
  },
  {
    name: 'A-F generalization',
    codes: { perception_code: 'P-G', objective_code: 'O-A', action_code: 'A-F', erc_level: 2 },
    text: 'Operador selecionou procedimento errado por similaridade entre opções no painel.',
    expected: ['P2', 'W1', 'P6', 'S3'],
  },
  {
    name: 'P-G/A-B generalization',
    codes: { perception_code: 'P-G', objective_code: 'O-A', action_code: 'A-B', erc_level: 3 },
    text: 'Técnico omitiu etapa obrigatória de reinstalação de trava física prevista em checklist.',
    expected: ['W1', 'O3', 'O4', 'P6'],
  },
  {
    name: 'P-F/A-F generalization',
    codes: { perception_code: 'P-F', objective_code: 'O-A', action_code: 'A-F', erc_level: 2 },
    text: 'Piloto em voo noturno sem referências visuais sofreu ilusão vestibular e aplicou correção errada.',
    expected: ['P1', 'P2', 'W3', 'P6'],
  },
  {
    name: 'P-H/A-A generalization',
    codes: { perception_code: 'P-H', objective_code: 'O-A', action_code: 'A-A', erc_level: 3 },
    text: 'Briefing ambíguo e identificação de painel não padronizada levaram manutenção no sistema errado.',
    expected: ['S2', 'W1', 'O3', 'O4'],
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

console.log('PASS all static preconditions generalization cases')
