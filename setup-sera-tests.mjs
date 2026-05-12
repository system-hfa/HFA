// setup-sera-tests.mjs
// Execute: node setup-sera-tests.mjs
// Cria toda a estrutura de testes SERA no repositório HFA

import fs from 'fs'
import path from 'path'

const root = process.cwd()

function write(relPath, content) {
  const abs = path.join(root, relPath)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, content, 'utf-8')
  console.log('  created:', relPath)
}

console.log('\n[SERA] Criando estrutura de testes...\n')

write('tests/sera/fixtures/TEST-A-B-001.json', `{
  "id": "TEST-A-B-001",
  "title": "Técnico omite pino de travamento ao reinstalar tampa de inspeção",
  "domain": "manutenção aeronáutica",
  "description": "Ao concluir inspeção de rotina em sistema de combustível, um técnico de manutenção reinstalou a tampa de acesso corretamente mas esqueceu de inserir o pino de travamento de segurança, que normalmente era o último item do procedimento. O técnico foi interrompido por colega durante a reinstalação (pergunta sobre turno seguinte), retornou à tarefa e concluiu sem perceber que havia pulado o último passo. O checklist pós-manutenção não incluía verificação específica do pino de travamento. A tampa se soltou em voo 3h depois. O técnico era certificado e experiente; a tarefa era de baixa complexidade.",
  "expected": {
    "perception_code": "P-G",
    "objective_code": "O-A",
    "action_code": "A-B",
    "erc_level": 3,
    "top_preconditions": [
      "W1",
      "O3",
      "O4",
      "P6"
    ]
  },
  "rationale": "A-B (Deslize/Omissão): o técnico sabia o procedimento correto, tinha a intenção de seguir o checklist, mas a interrupção criou lapso de memória que resultou em omissão do último passo. É falha de execução — a decisão estava correta, a execução falhou. P-G: a interrupção desviou a atenção do técnico; a informação (passo do pino) estava acessível (estava no procedimento), mas a atenção não estava focada — sem pressão de tempo. O-A: o objetivo era realizar a manutenção corretamente — sem violação.",
  "discriminators": [
    "NÃO é A-C (Falha de Feedback na Execução): A-C é sobre não verificar o resultado de uma ação executada; aqui o problema foi omitir a ação em si (não a verificação do resultado).",
    "NÃO é A-F (Seleção de Ação): A-F é seleção deliberada da ação errada; aqui foi esquecimento involuntário de um passo — lapso, não decisão.",
    "NÃO é O-B (Violação): pular o pino não era prática habitual do técnico ou do grupo."
  ]
}`)

write('tests/sera/fixtures/TEST-A-C-001.json', `{
  "id": "TEST-A-C-001",
  "title": "Piloto não verifica se trem de pouso recolheu após acionar alavanca",
  "domain": "aviação",
  "description": "Após a decolagem, o piloto acionou a alavanca de recolhimento do trem de pouso. Imediatamente após o acionamento, foi solicitado por ATC a mudar de frequência e iniciou comunicação com o novo setor. Não verificou se o indicador de trem de pouso confirmava o recolhimento completo (3 luzes verdes apagadas). O trem havia travado parcialmente — uma das pernas não recolheu. O alarme de trem não soou porque o circuito de alarme estava com defeito (fault latente). O piloto só descobriu o problema na aproximação final ao receber aviso de torre. A comunicação com ATC foi a única interrupção; não havia pressão de tempo excepcional.",
  "expected": {
    "perception_code": "P-G",
    "objective_code": "O-A",
    "action_code": "A-C",
    "erc_level": 2,
    "top_preconditions": [
      "W1",
      "S3",
      "O3",
      "P3"
    ]
  },
  "rationale": "A-C (Falha no Feedback na Execução): o piloto executou a ação (acionou a alavanca) mas não verificou o resultado da execução — o loop de feedback foi interrompido pela comunicação com ATC. A falha está em não confirmar que a ação produziu o efeito esperado. P-G: a distração da comunicação ATC desviou a atenção da verificação — informação disponível (indicadores) mas não consultada, sem pressão de tempo causal. O-A: o objetivo era recolher o trem corretamente, sem violação.",
  "discriminators": [
    "NÃO é A-G (Feedback de Decisão): A-G é sobre não verificar resultado de uma DECISÃO; A-C é específico para feedback durante EXECUÇÃO de ação física/procedimental.",
    "NÃO é A-J (Feedback por Pressão de Tempo): não havia pressão de tempo — a interrupção foi comunicação, não urgência temporal.",
    "NÃO é A-B (Deslize): o piloto acionou a alavanca corretamente — a falha foi não confirmar o resultado, não a execução da ação em si."
  ]
}`)

write('tests/sera/fixtures/TEST-A-D-001.json', `{
  "id": "TEST-A-D-001",
  "title": "Operador incapaz de fechar válvula manual por força insuficiente com luvas de proteção",
  "domain": "operações industriais — plataforma offshore",
  "description": "Durante procedimento de emergência em plataforma offshore, o operador de campo foi instruído a fechar manualmente a válvula de isolamento de emergência. A válvula requeria torque de 45 Nm para fechamento. O operador utilizava luvas de proteção química espessas (obrigatórias na área) que reduziam sua capacidade de preensão. Após 3 tentativas, não conseguiu aplicar torque suficiente. Chamou um segundo operador; juntos fecharam a válvula 4 minutos depois. O operador conhecia o procedimento e sabia exatamente o que fazer — apenas não conseguia executar fisicamente.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-A",
    "action_code": "A-D",
    "erc_level": 3,
    "top_preconditions": [
      "W1",
      "W2",
      "P1",
      "O2",
      "O4"
    ]
  },
  "rationale": "A-D (Inabilidade para a Resposta): o operador tinha percepção correta, objetivo correto e conhecia o procedimento — mas não conseguiu executar fisicamente a ação por limitação ergonômica (EPI incompatível com o torque exigido). É a brecha clássica entre intenção e capacidade física de resposta. P-A: percepção completamente correta — sabia o que estava acontecendo. O-A: objetivo correto — fechar a válvula era exatamente o que deveria fazer.",
  "discriminators": [
    "NÃO é A-E (Falha de Conhecimento): o operador sabia exatamente o que fazer — a falha foi física, não cognitiva.",
    "NÃO é A-B (Deslize): não houve erro de execução de procedimento conhecido; houve impossibilidade física de executar a ação.",
    "NÃO é A-F (Seleção errada): o operador selecionou a ação correta (fechar aquela válvula) — simplesmente não conseguiu executá-la."
  ]
}`)

write('tests/sera/fixtures/TEST-A-E-001.json', `{
  "id": "TEST-A-E-001",
  "title": "Técnico não sabe diagnosticar falha em sistema fly-by-wire de novo modelo",
  "domain": "manutenção aeronáutica",
  "description": "Um técnico de manutenção certificado em aeronaves de geração anterior foi designado para diagnosticar uma falha intermitente no sistema fly-by-wire de um modelo recém-incorporado à frota. O técnico não havia recebido treinamento type-specific para aquele modelo. Consultou o manual mas não compreendeu a lógica de diagnóstico do sistema digital de auto-teste (BITE). Executou checagens analógicas habituais que não eram aplicáveis ao sistema digital, concluiu erroneamente que a falha era no atuador hidráulico e trocou uma peça saudável. A falha real era no módulo de controle eletrônico. A aeronave retornou ao hangar com a mesma falha 2 voos depois.",
  "expected": {
    "perception_code": "P-C",
    "objective_code": "O-A",
    "action_code": "A-E",
    "erc_level": 2,
    "top_preconditions": [
      "P6",
      "P7",
      "O4",
      "S3"
    ]
  },
  "rationale": "A-E (Falha de Conhecimento na Decisão): o técnico tinha habilidades básicas de manutenção mas carecia do conhecimento específico do sistema fly-by-wire para formular a ação diagnóstica correta. A falha está na tomada de decisão por ausência de conhecimento específico da tarefa — não na execução de um procedimento conhecido. P-C: a interpretação dos sintomas foi equivocada por falta de conhecimento do sistema — falha de conhecimento na percepção que alimentou a decisão errada.",
  "discriminators": [
    "NÃO é A-F (Seleção de Ação): A-F ocorre quando o operador TEM o conhecimento mas seleciona a ação errada por viés; aqui a lacuna de conhecimento impediu a formulação correta da solução.",
    "NÃO é A-D (Inabilidade): o técnico fisicamente conseguia executar qualquer procedimento — a limitação era cognitiva/de conhecimento.",
    "NÃO é P-B (Sensorial): os sintomas eram visíveis e os instrumentos funcionavam — a falha foi na interpretação por ausência de modelo mental correto do sistema."
  ]
}`)

write('tests/sera/fixtures/TEST-A-F-001.json', `{
  "id": "TEST-A-F-001",
  "title": "Piloto seleciona procedimento de emergência errado por similaridade",
  "domain": "aviação — procedimentos de emergência",
  "description": "Ao receber alerta de 'ENG 1 OIL PRESSURE LOW', o piloto iniciou o procedimento de 'ENG 1 FIRE' — procedimento adjacente na QRH (Quick Reference Handbook), com layout visual similar e localizado na mesma página. A aeronave tinha dois motores e o procedimento de fire incluía fechar combustível e desligar o motor. O copiloto acompanhava outro problema técnico e não monitorou a leitura do checklist. O motor foi desligado desnecessariamente. O piloto era experiente (8.400h). Não havia pressão de tempo excepcional — a pressão de óleo havia caído gradualmente.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-A",
    "action_code": "A-F",
    "erc_level": 2,
    "top_preconditions": [
      "P2",
      "W1",
      "P6",
      "S3"
    ]
  },
  "rationale": "A-F (Falha na Seleção de Ação): o piloto percebeu corretamente o alerta, tinha objetivo correto (responder à emergência), mas selecionou o procedimento errado. É uma falha de regra — 'first to match', selecionou a primeira entrada similar na QRH sem verificar a correspondência exata. P-A: o alerta foi percebido corretamente. O-A: a intenção era responder à emergência corretamente — sem violação.",
  "discriminators": [
    "NÃO é A-B (Deslize): A-B seria executar o procedimento correto com erro de execução; aqui houve seleção deliberada (porém errada) do procedimento.",
    "NÃO é A-E (Falha de Conhecimento): o piloto conhecia ambos os procedimentos — a falha foi na seleção, não na ausência de conhecimento do procedimento correto.",
    "NÃO é P-C (Conhecimento de Percepção): o piloto leu corretamente o alerta — a falha foi posterior, na escolha da resposta.",
    "NÃO é A-I (Seleção por Pressão de Tempo): a degradação de óleo foi gradual, sem urgência extrema — P-D/A-I requerem pressão de tempo causal."
  ]
}`)

write('tests/sera/fixtures/TEST-A-G-001.json', `{
  "id": "TEST-A-G-001",
  "title": "Supervisor não verifica resultado de ação corretiva após instruir técnico",
  "domain": "operações industriais",
  "description": "Um supervisor de operações instruiu um técnico a ajustar a pressão de uma linha de processo para 45 bar. O técnico ajustou para 54 bar por erro de leitura do manômetro. O supervisor, após dar a instrução, foi atender outra demanda e não retornou para confirmar o resultado do ajuste. Não havia pressão de tempo declarada naquele momento. O sistema operou por 2 horas na pressão incorreta antes de o problema ser detectado em inspeção de rotina. O supervisor afirmou que 'confia na equipe para executar procedimentos simples sem supervisão constante'.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-A",
    "action_code": "A-G",
    "erc_level": 3,
    "top_preconditions": [
      "P2",
      "S3",
      "O6"
    ]
  },
  "rationale": "A-G (Falha de Feedback — decisão, sem pressão de tempo): o supervisor tomou a decisão de não verificar o resultado da ação delegada. Os mecanismos de controle e correção de erros (verificação pós-ação) foram desativados prematuramente pela desatenção do supervisor após a instrução. Não havia pressão de tempo — critério que separa A-G de A-J. P-A: percepção correta da necessidade do ajuste. O-A: objetivo correto (ajustar pressão para 45 bar).",
  "discriminators": [
    "NÃO é A-C (Feedback na Execução): A-C é falha de feedback durante a execução da própria ação; aqui é falha de feedback sobre resultado de ação delegada — contexto de decisão.",
    "NÃO é A-J (Feedback por Pressão de Tempo): não havia pressão de tempo no momento — a ausência de verificação foi escolha, não imposição temporal.",
    "NÃO é A-B (Deslize): o supervisor não esqueceu de verificar de forma involuntária; havia uma disposição declarada ('confio na equipe') — foi omissão por crença, não lapso."
  ]
}`)

write('tests/sera/fixtures/TEST-A-I-001.json', `{
  "id": "TEST-A-I-001",
  "title": "Controlador de tráfego seleciona instrução de altitude errada sob alta demanda",
  "domain": "controle de tráfego aéreo",
  "description": "Durante pico de tráfego com conflito iminente detectado, o controlador tinha menos de 60 segundos para resolver a separação entre dois voos. Sob essa pressão, emitiu instrução de 'climb FL350' para o voo que deveria descer (deveria ser 'descend FL290'). O controlador estava gerenciando 5 comunicações simultâneas. Após a instrução, percebeu o erro e corrigiu em 8 segundos. O conflito foi resolvido mas com separação mínima. O controlador afirmou: 'tive que agir imediatamente, não havia tempo para confirmar o strips antes de transmitir'.",
  "expected": {
    "perception_code": "P-D",
    "objective_code": "O-A",
    "action_code": "A-I",
    "erc_level": 1,
    "top_preconditions": [
      "T1",
      "O1",
      "O2",
      "S3"
    ]
  },
  "rationale": "A-I (Seleção de Ação por Pressão de Tempo): a instrução errada foi selecionada sob pressão de tempo extrema e real — o controlador tinha menos de 60s para agir. A pressão temporal foi o fator causal direto na seleção incorreta da instrução. P-D: a percepção do conflito estava correta mas incompleta devido à pressão — não havia tempo para confirmar os strips (mesma lógica da pressão de tempo como causal). O-A: o objetivo era resolver o conflito corretamente.",
  "discriminators": [
    "NÃO é A-F (Seleção sem pressão): A-F ocorre quando há tempo para selecionar mas o operador escolhe errado; aqui a pressão temporal foi explicitamente causal.",
    "NÃO é A-H (Gerenciamento de Tempo): A-H é sobre falha em gerir o tempo disponível; aqui o tempo era objetivamente insuficiente para o número de tarefas simultâneas.",
    "NÃO é A-B (Deslize): houve seleção deliberada de instrução, não execução incorreta de uma instrução corretamente selecionada."
  ]
}`)

write('tests/sera/fixtures/TEST-A-J-001.json', `{
  "id": "TEST-A-J-001",
  "title": "Controlador não confirma leitura de instrução sob congestionamento de frequência",
  "domain": "controle de tráfego aéreo",
  "description": "Durante período de congestionamento de frequência com múltiplas aeronaves transmitindo simultaneamente, o controlador emitiu instrução de altitude para o voo TAM-789. O protocolo exige confirmação de leitura (read-back) antes de considerar a instrução aceita. Havia 4 outras aeronaves aguardando na frequência. O controlador, sem aguardar o read-back completo, passou imediatamente para a próxima instrução — havia ouvido o início da resposta do piloto mas não o conteúdo completo. O voo TAM-789 havia entendido altitude errada. O controlador afirmou: 'não havia tempo para aguardar todos os read-backs com aquela fila de aeronaves'.",
  "expected": {
    "perception_code": "P-D",
    "objective_code": "O-A",
    "action_code": "A-J",
    "erc_level": 1,
    "top_preconditions": [
      "T1",
      "O1",
      "O2",
      "S3",
      "O6"
    ]
  },
  "rationale": "A-J (Falha de Feedback por Pressão de Tempo): o controlador não completou o ciclo de feedback (confirmação do read-back) por pressão de tempo explícita e real — fila de aeronaves aguardando, congestionamento de frequência. A pressão temporal foi o fator direto que eliminou o feedback. P-D: a percepção do read-back foi incompleta sob pressão de tempo — ouviu o início mas não processou o conteúdo por sobrecarga temporal.",
  "discriminators": [
    "NÃO é A-G (Feedback sem pressão): A-G ocorre quando há tempo disponível mas o operador não verifica; aqui a pressão de tempo foi explicitamente causal e declarada.",
    "NÃO é A-C (Feedback na Execução): A-C é sobre feedback de ação física durante execução; A-J é feedback de decisão/comunicação sob pressão de tempo.",
    "NÃO é A-I (Seleção por Pressão): A-I é seleção da ação errada; aqui a ação (emitir instrução) foi correta — a falha foi não confirmar o feedback."
  ]
}`)

write('tests/sera/fixtures/TEST-COMBO-001.json', `{
  "id": "TEST-COMBO-001",
  "title": "Operador de sala de controle seleciona procedimento errado sob fadiga e alarmes simultâneos",
  "domain": "operações de plataforma offshore",
  "description": "Ao final de turno de 12 horas, operador de sala de controle recebeu 6 alarmes simultâneos de diferentes sistemas. Identificou o alarme prioritário (pressão alta no separador) corretamente. Ao abrir o manual de procedimentos de emergência no sistema digital, selecionou o procedimento de 'alta pressão no scrubber' — procedimento adjacente na interface, com nome similar ao correto ('alta pressão no separador'). Executou o procedimento completo incorreto. O procedimento errado não era prejudicial por si só, mas a falha real (separador) não foi tratada, resultando em shutdown automático 30 minutos depois. Não havia pressão de tempo aguda — o alarme era de nível 2 (não emergência imediata). O operador estava em hora 11 de turno.",
  "expected": {
    "perception_code": "P-G",
    "objective_code": "O-A",
    "action_code": "A-F",
    "erc_level": 2,
    "top_preconditions": [
      "P1",
      "P2",
      "W1",
      "O4",
      "P6"
    ]
  },
  "rationale": "P-G (Atenção sem pressão de tempo): o operador identificou o alarme correto — a falha de atenção ocorreu na seleção do procedimento na interface digital, por fadiga (hora 11 de turno). Não havia pressão de tempo aguda — era alarme nível 2. A-F (Seleção de Ação errada): selecionou deliberadamente o procedimento errado por similaridade de nome na interface — 'first to match' clássico sob fadiga. O-A: o objetivo era tratar o alarme corretamente — sem violação de intenção.",
  "discriminators": [
    "NÃO é P-D (Pressão de tempo): alarme era nível 2, não emergência imediata — não havia urgência temporal causal.",
    "NÃO é A-B (Deslize): houve seleção deliberada (clique no procedimento) — não foi execução incorreta de procedimento correto.",
    "NÃO é A-E (Conhecimento): o operador conhecia ambos os procedimentos — a falha foi na seleção entre similares, não em ausência de conhecimento.",
    "NÃO é P-F (Ilusão): não houve distorção perceptual fisiológica — foi falha de atenção por fadiga."
  ]
}`)

write('tests/sera/fixtures/TEST-COMBO-002.json', `{
  "id": "TEST-COMBO-002",
  "title": "Piloto viola altitude mínima de segurança em rota habitual para ganhar tempo",
  "domain": "aviação offshore",
  "description": "Piloto de helicóptero em rota regular para plataforma offshore voou a 800ft em vez da altitude mínima de segurança de 1.000ft definida no manual de operações da empresa. A redução de altitude nessa rota era prática comum na equipe para economizar combustível e encurtar o tempo de voo. Supervisores de linha conheciam a prática. Registros de telemetria mostraram que 11 dos últimos 14 voos daquele piloto nessa rota foram abaixo de 1.000ft. Em condições de neblina naquele dia, o piloto não avistou uma embarcação de apoio que cruzava a rota a 600ft, acionando TCAS.",
  "expected": {
    "perception_code": "P-G",
    "objective_code": "O-B",
    "action_code": "A-A",
    "erc_level": 1,
    "top_preconditions": [
      "P3",
      "S3",
      "O5",
      "O6",
      "T1"
    ]
  },
  "rationale": "O-B (Violação Rotineira): voar abaixo de 1.000ft era comportamento habitual, normalizado, conhecido e tolerado pela supervisão — 11 de 14 voos recentes. P-G: em condições de neblina, o piloto não percebeu a embarcação — atenção não voltada para o espaço aéreo abaixo (complacência da rota habitual). A-A: a execução do voo foi conforme a intenção — o erro estava no objetivo.",
  "discriminators": [
    "NÃO é O-C (Violação Excepcional): O-C requer comportamento atípico para o indivíduo — aqui era padrão habitual documentado em 11 de 14 voos.",
    "NÃO é P-B (Sensorial): em condições normais o piloto veria a embarcação — a falha de atenção foi por complacência da rota habitual, não impedimento sensorial."
  ]
}`)

write('tests/sera/fixtures/TEST-COMBO-003.json', `{
  "id": "TEST-COMBO-003",
  "title": "Médico de bordo administra dose errada por desconhecer protocolo de altitude",
  "domain": "aviação médica — saúde offshore",
  "description": "Médico de bordo recém-contratado administrou 500mg de paracetamol IV a paciente em aeronave pressurizada em cruzeiro. O protocolo da operadora para ambiente pressurizado especificava dose máxima de 250mg IV por absorção alterada em altitude. O médico conhecia o protocolo padrão hospitalar (500mg) mas não havia recebido treinamento específico para medicina aeronáutica/offshore. Não havia pressão de tempo — era atendimento eletivo. O paciente apresentou reação adversa leve. O médico tinha boa-fé e seguiu o que conhecia como protocolo correto.",
  "expected": {
    "perception_code": "P-C",
    "objective_code": "O-A",
    "action_code": "A-E",
    "erc_level": 2,
    "top_preconditions": [
      "P6",
      "P7",
      "O3",
      "O4",
      "S3"
    ]
  },
  "rationale": "P-C (Falha de Conhecimento/Percepção): o médico percebeu corretamente a condição do paciente mas interpretou a situação com base em conhecimento hospitalar — sem o modelo mental correto para o ambiente aeronáutico/pressurizado. A-E (Falha de Conhecimento na Decisão): a dose administrada foi baseada em conhecimento específico da tarefa insuficiente — não conhecia o protocolo de altitude. Tinha habilidades médicas mas carecia do conhecimento específico do contexto.",
  "discriminators": [
    "NÃO é O-C ou O-B (Violação): o médico acreditava estar seguindo o protocolo correto — não houve intenção de violar nenhuma regra.",
    "NÃO é A-F (Seleção): A-F requer que o operador TENHA o conhecimento e escolha errado; aqui a lacuna de conhecimento específico impediu a decisão correta.",
    "NÃO é A-B (Deslize): a dose foi calculada e administrada intencionalmente — não foi erro de execução de procedimento conhecido."
  ]
}`)

write('tests/sera/fixtures/TEST-O-B-001.json', `{
  "id": "TEST-O-B-001",
  "title": "Equipe omite checklist de pre-voo por ser considerado 'burocracia' na empresa",
  "domain": "aviação offshore",
  "description": "Em uma operadora de helicópteros offshore, a equipe de pilotos tinha o hábito estabelecido de não realizar o checklist completo de pre-voo para voos de posicionamento (ferry flights) internos, considerando-o 'desnecessário para voos curtos'. Este comportamento era conhecido pelos supervisores de linha, que nunca o questionaram. O manual de operações exigia checklist completo para TODOS os voos. Em um desses voos, a ausência do checklist levou à partida sem verificação do nível de óleo do rotor de cauda, resultando em falha mecânica em voo. Investigação confirmou que a prática de pular o checklist era rotineira há pelo menos 18 meses.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-B",
    "action_code": "A-A",
    "erc_level": 1,
    "top_preconditions": [
      "P3",
      "S3",
      "O5",
      "O6",
      "T1"
    ]
  },
  "rationale": "O-B (Violação Rotineira): pular o checklist era um desvio habitual, normalizado, tolerado pela supervisão e praticado sistematicamente há 18 meses. Não foi uma decisão isolada — era o comportamento padrão do grupo para esse tipo de voo. P-A: a percepção era correta — os pilotos sabiam que estavam pulando o checklist, o instrumento estava disponível, não havia falha sensorial ou de atenção. A-A: a ação de pular o checklist foi deliberada e executada conforme a intenção — não houve deslize de execução.",
  "discriminators": [
    "NÃO é O-C (Violação Excepcional): violação excepcional é atípica para o indivíduo, não sancionada; aqui era habitual, repetida e tolerada pela organização.",
    "NÃO é O-D (Falha de Intenção/não violação): O-D envolve escolha consciente de ação arriscada MAS dentro das regras. Aqui havia violação explícita de procedimento obrigatório.",
    "NÃO é A-B (Deslize): pular o checklist foi intencional — não foi um esquecimento acidental mas uma omissão deliberada e recorrente."
  ]
}`)

write('tests/sera/fixtures/TEST-O-C-001.json', `{
  "id": "TEST-O-C-001",
  "title": "Piloto pousa sem autorização para evitar piorar condição de passageiro doente",
  "domain": "aviação médica",
  "description": "Durante voo de transporte de passageiro com suspeita de infarto, o piloto avaliou que o aeródromo mais próximo (privado, sem torre) poderia acolher a aeronave apesar de não ter autorização de pouso para aquele aeródromo em seu certificado de habilitação. Contatou brevemente o operador do aeródromo por rádio, que confirmou pista livre. Pousou sem notificar o CINDACTA nem declarar emergência formalmente (o que daria cobertura legal). Este piloto nunca havia tomado decisão similar antes. Investigação confirmou que a declaração formal de emergência resolveria a questão legalmente e o piloto tinha conhecimento disso.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-C",
    "action_code": "A-A",
    "erc_level": 2,
    "top_preconditions": [
      "P2",
      "S1",
      "O3",
      "T1"
    ]
  },
  "rationale": "O-C (Violação Excepcional): o piloto sabia das regras (conhecia o procedimento de emergência formal), agiu contrariamente ao procedimento em uma situação específica e excepcional (passageiro em risco), pressionado pela urgência percebida. Este comportamento era atípico para ele — critério central de O-C vs O-B. P-A: percepção correta da situação — sabia o que estava fazendo e porque. A-A: executou exatamente o que pretendia — pouso e comunicação com operador do aeródromo.",
  "discriminators": [
    "NÃO é O-B (Violação Rotineira): O-B requer comportamento habitual normalizado. Este piloto nunca havia agido assim antes — foi uma decisão isolada em contexto excepcional.",
    "NÃO é O-D (Falha de Intenção): O-D ocorre quando a ação arriscada NÃO viola regras explícitas. Aqui havia violação clara de procedimento obrigatório (declaração de emergência).",
    "NÃO é A-F (Seleção de Ação errada): o piloto selecionou corretamente a ação de pousar; a falha foi no objetivo (meio escolhido viola procedimento), não na execução."
  ]
}`)

write('tests/sera/fixtures/TEST-O-D-001.json', `{
  "id": "TEST-O-D-001",
  "title": "Capitão decide navegar por rota não recomendada para economizar combustível",
  "domain": "navegação marítima",
  "description": "O capitão de uma embarcação de apoio offshore, enfrentando janela meteorológica apertada, optou por rota direta através de área com histórico de ondas de proa acima de 3m em vez da rota aprovada que contornava a área. A rota direta era tecnicamente permitida pelas regulamentações — não havia proibição explícita. O capitão avaliou o risco como 'aceitável' para as condições previstas, mas não consultou o meteorologista de bordo nem registrou a decisão no diário de bordo. A embarcação sofreu dano estrutural ao casco em ondas de 4,5m. O capitão era experiente e tinha plena consciência das condições.",
  "expected": {
    "perception_code": "P-A",
    "objective_code": "O-D",
    "action_code": "A-A",
    "erc_level": 2,
    "top_preconditions": [
      "P2",
      "S1",
      "S2",
      "O4",
      "T2"
    ]
  },
  "rationale": "O-D (Falha de Intenção — não violação): o capitão percebeu corretamente a situação e escolheu INTENCIONALMENTE uma ação arriscada, mas a rota não era proibida — havia discricionariedade. A falha está na avaliação de risco inadequada e na ausência de consulta ao meteorologista — escolha arriscada dentro dos limites formais da autoridade. P-A: percepção correta — o capitão sabia das condições e avaliou (incorretamente) o risco. A-A: a ação de navegar pela rota foi executada conforme a intenção.",
  "discriminators": [
    "NÃO é O-B (Violação Rotineira): a rota direta não era proibida — não houve violação de regra.",
    "NÃO é O-C (Violação Excepcional): O-C requer transgressão de regra explícita; aqui havia discricionariedade regulatória.",
    "NÃO é A-F: a seleção da rota foi deliberada e corretamente executada; a falha foi no julgamento de risco (etapa objetivo), não na execução (etapa ação)."
  ]
}`)

write('tests/sera/fixtures/TEST-P-B-001.json', `{
  "id": "TEST-P-B-001",
  "title": "Técnico não detecta alarme sonoro em ambiente ruidoso",
  "domain": "manutenção industrial",
  "description": "Durante a manutenção de uma válvula de pressão em uma plataforma offshore, um técnico utilizava protetores auriculares de alto nível de atenuação (NRR 33dB) enquanto trabalhava próximo a compressores em operação. O alarme sonoro de pressão excessiva foi ativado, porém o técnico não o detectou. Continuou o procedimento sem isolar o sistema, resultando em despressurização indevida e quase-acidente. Após o evento, o alarme foi testado e confirmou-se estar em pleno funcionamento. O técnico afirmou não ter ouvido nada.",
  "expected": {
    "perception_code": "P-B",
    "objective_code": "O-A",
    "action_code": "A-A",
    "erc_level": 3,
    "top_preconditions": [
      "W1",
      "W3",
      "P6"
    ]
  },
  "rationale": "P-B (Falha Sensorial): o sinal estava presente e funcionando, mas o técnico fisicamente não conseguiu detectá-lo devido ao EPI que atenuou o som além do necessário — limitação sensorial causada por equipamento/ambiente. O-A: não há evidência de violação ou intenção arriscada — o técnico seguia o procedimento normalmente, sem saber do alarme. A-A: a ação em si (continuação do procedimento) estava alinhada com o que ele percebia ser a situação correta; não houve falha de execução, seleção ou feedback independente.",
  "discriminators": [
    "NÃO é P-G (Atenção sem pressão): P-G requer que a informação fosse acessível atencionalmente — aqui havia impedimento físico-sensorial (EPI + ruído), não falha de foco.",
    "NÃO é P-F (Falha de Percepção/ilusão): P-F envolve distorção perceptual de informação recebida; aqui a informação simplesmente não chegou ao sistema sensorial.",
    "NÃO é A-B: não houve deslize de execução; o técnico fez exatamente o que pretendia fazer, baseado na percepção que tinha (ausência de alarme).",
    "NÃO é O-D: o técnico não escolheu uma ação arriscada conscientemente; ele acreditava estar agindo de forma segura."
  ]
}`)

write('tests/sera/fixtures/TEST-P-C-001.json', `{
  "id": "TEST-P-C-001",
  "title": "Piloto novato interpreta erroneamente leitura de altímetro em tipo de aeronave desconhecido",
  "domain": "aviação",
  "description": "Um piloto com 200 horas de voo, recentemente certificado em aeronave de turboélice, confundiu a escala secundária do altímetro barométrico de três ponteiros com a leitura de altitude em pés, interpretando 11.000ft como 1.100ft. O piloto nunca havia operado esse modelo de altímetro anteriormente — seu treinamento inicial foi realizado em aeronaves com altímetros digitais. Iniciou descida prematura, sendo alertado pelo TAWS a 800ft AGL. O piloto afirmou que 'a leitura parecia normal para o procedimento de descida'.",
  "expected": {
    "perception_code": "P-C",
    "objective_code": "O-A",
    "action_code": "A-A",
    "erc_level": 3,
    "top_preconditions": [
      "P6",
      "P7",
      "W1"
    ]
  },
  "rationale": "P-C (Falha de Conhecimento/Percepção): o piloto percebeu a informação do instrumento, mas carecia do conhecimento específico sobre aquele modelo de altímetro para interpretá-la corretamente. A falha está no modelo mental incompleto do sistema, não na atenção ou nos sentidos. O-A: o objetivo era executar a descida corretamente — não houve violação de intenção. A-A: a ação de iniciar a descida era coerente com a percepção equivocada que o piloto tinha.",
  "discriminators": [
    "NÃO é P-B (Falha Sensorial): os instrumentos funcionavam; o piloto VIU as agulhas — o problema foi a interpretação, não a detecção.",
    "NÃO é P-G (Atenção): o piloto estava atento ao altímetro; olhou para ele e o leu — o problema foi de conhecimento, não de foco.",
    "NÃO é P-F (Percepção/ilusão): P-F envolve ilusão sensorial fisiológica; aqui é lacuna de conhecimento técnico sobre um instrumento específico.",
    "NÃO é A-F (Seleção de Ação): o piloto escolheu corretamente iniciar a descida — o erro foi anterior, na leitura do instrumento."
  ]
}`)

write('tests/sera/fixtures/TEST-P-D-001.json', `{
  "id": "TEST-P-D-001",
  "title": "Controlador de tráfego aéreo não percebe conflito de rota sob alta demanda",
  "domain": "controle de tráfego aéreo",
  "description": "Durante um período de pico operacional com 14 aeronaves simultâneas no setor, um controlador estava coordenando clearances de subida quando recebeu simultaneamente 3 solicitações de mudança de rota. Ao emitir instrução para o voo XYZ-456, não percebeu que o voo ABC-123 havia sido vetorizado para a mesma altitude 90 segundos antes. O sistema TCAS alertou ambos os pilotos a 2,3 NM de separação. O controlador afirmou: 'não tive tempo de verificar o strip do ABC-123 antes de dar o clearance'. O número de aeronaves no setor naquele momento excedia a capacidade padrão de 10 definida nos procedimentos.",
  "expected": {
    "perception_code": "P-D",
    "objective_code": "O-A",
    "action_code": "A-A",
    "erc_level": 3,
    "top_preconditions": [
      "T1",
      "O1",
      "O2",
      "S3"
    ]
  },
  "rationale": "P-D (Falha de Atenção COM pressão de tempo): o controlador sabia o que verificar (strip do ABC-123), mas a sobrecarga de demandas simultâneas criou pressão de tempo que impediu essa verificação. O próprio controlador confirmou: 'não tive tempo'. Se houvesse tempo, o resultado teria sido diferente — critério decisor de P-D vs P-G. O-A: o objetivo era manter separação segura — não houve intenção de arriscar. A-A: a instrução emitida era tecnicamente correta para o contexto percebido.",
  "discriminators": [
    "NÃO é P-G (Atenção SEM pressão): P-G requer que mais tempo disponível NÃO mudaria o resultado. Aqui o próprio relato confirma que a pressão de tempo foi causal.",
    "NÃO é P-B (Sensorial): o strip estava visível; não houve falha sensorial.",
    "NÃO é A-H (Gerenciamento de tempo): A-H é sobre falha do operador em GERIR seu tempo; aqui o tempo disponível era objetivamente insuficiente para a carga (estrutural, não individual)."
  ]
}`)

write('tests/sera/fixtures/TEST-P-E-001.json', `{
  "id": "TEST-P-E-001",
  "title": "Piloto não conclui checklist por subestimar tempo necessário",
  "domain": "aviação",
  "description": "Durante preparação para voo IFR, o piloto calculou que teria 12 minutos para completar o checklist de pre-voo completo antes do slot de decolagem. O checklist levava habitualmente 18 minutos. O piloto não ajustou seu plano ao perceber que estava atrasado — continuou no ritmo normal, chegou ao fim do tempo disponível com 4 itens pendentes e decidiu pular os itens restantes. Um dos itens pulados era a verificação dos alternadores. Em voo, falha elétrica foi detectada. O piloto tinha plena consciência do tempo disponível mas não tomou nenhuma ação para reorganizar a execução do checklist.",
  "expected": {
    "perception_code": "P-E",
    "objective_code": "O-A",
    "action_code": "A-H",
    "erc_level": 2,
    "top_preconditions": [
      "T1",
      "P6",
      "O1",
      "S3"
    ]
  },
  "rationale": "P-E (Falha no Gerenciamento de Tempo): o piloto percebeu corretamente a situação e os itens do checklist, mas falhou em gerenciar o tempo disponível para completar a tarefa — não reorganizou a execução nem priorizou itens críticos quando percebeu o atraso. A-H (Falha no Gerenciamento do Tempo na Ação): a execução da tarefa não foi adaptada à restrição temporal — continuou no ritmo normal sem estratégia de gestão. O-A: o objetivo era completar o checklist corretamente, sem violação de intenção.",
  "discriminators": [
    "NÃO é P-D (Atenção com pressão): P-D é quando a pressão de tempo impede a percepção; aqui o piloto percebeu tudo corretamente — a falha foi no gerenciamento, não na percepção.",
    "NÃO é A-B (Deslize): pular os itens foi decisão consciente, não lapso involuntário.",
    "NÃO é O-D (Falha de Intenção): o piloto não escolheu intencionalmente uma ação arriscada; ele falhou em reorganizar a execução dentro do tempo disponível."
  ]
}`)

write('tests/sera/fixtures/TEST-P-F-001.json', `{
  "id": "TEST-P-F-001",
  "title": "Piloto entra em ilusão de Leans e nivela com asa inclinada",
  "domain": "aviação — voo por instrumentos",
  "description": "Em voo noturno sobre oceano sem referências visuais externas, um piloto entrou em nuvem inesperadamente. Após 4 minutos em IMC, seus instrumentos indicavam inclinação de 15° para a esquerda. O piloto, no entanto, tinha forte sensação de estar nivelado. Corrigiu os instrumentos 'para nivelar' (aplicou aileron direito), aumentando a inclinação para 28°. O copiloto interveio. Laudo médico confirmou desorientação espacial — os canais semicirculares do piloto haviam se adaptado à inclinação gradual, criando ilusão de voo nivelado.",
  "expected": {
    "perception_code": "P-F",
    "objective_code": "O-A",
    "action_code": "A-F",
    "erc_level": 2,
    "top_preconditions": [
      "P1",
      "P2",
      "W3",
      "P6"
    ]
  },
  "rationale": "P-F (Falha de Percepção/Ilusão): o piloto recebeu informação correta dos instrumentos, mas sua percepção fisiológica (vestibular) criou uma realidade distorcida que sobrepôs a informação instrumental. É uma distorção perceptual ativa — diferente de não ver (P-B) ou não saber interpretar (P-C). O-A: o objetivo era manter voo nivelado — correto. A-F (Falha na Seleção de Ação): o piloto selecionou a ação errada (aileron direito para 'corrigir' o que percebia como inclinação esquerda dos instrumentos) baseado em sua percepção distorcida.",
  "discriminators": [
    "NÃO é P-B (Sensorial): os instrumentos eram visíveis e legíveis — o piloto VIU os instrumentos mas não acreditou neles devido à ilusão vestibular.",
    "NÃO é P-C (Conhecimento): o piloto sabia ler altímetro/horizonte artificial — a falha foi fisiológica, não de treinamento técnico.",
    "NÃO é P-G (Atenção): o piloto estava atento e monitorando ativamente — a falha foi de distorção perceptual fisiológica.",
    "A-F (não A-B): não foi um deslize involuntário — foi uma seleção deliberada e incorreta de ação baseada em percepção distorcida."
  ]
}`)

write('tests/sera/fixtures/TEST-P-G-001.json', `{
  "id": "TEST-P-G-001",
  "title": "Piloto não verifica nível de combustível antes da decolagem por complacência",
  "domain": "aviação geral",
  "description": "Um piloto experiente com 3.200 horas de voo realizou o pre-flight check de uma aeronave que voava há 7 anos. Durante a inspeção, o checklist prevê verificação visual do nível de combustível nas asas. O piloto passou pelos tanques sem realizar a verificação visual, assumindo que estavam cheios como de costume. A aeronave foi abastecida apenas parcialmente pelo técnico em serviço — informação que constava no board de operações, que o piloto não consultou. A aeronave pousou de emergência 45 minutos depois por combustível insuficiente. A jornada de trabalho do piloto era normal (6h), sem pressão de tempo declarada.",
  "expected": {
    "perception_code": "P-G",
    "objective_code": "O-A",
    "action_code": "A-B",
    "erc_level": 3,
    "top_preconditions": [
      "P2",
      "P6",
      "O4",
      "O3"
    ]
  },
  "rationale": "P-G (Atenção SEM pressão de tempo): a informação estava disponível (board + tanques visíveis), a jornada era normal, não havia sobrecarga. A falha foi de atenção/complacência — o piloto assumiu o estado sem verificar. Mais tempo NÃO teria mudado o resultado, pois o piloto não tinha intenção de verificar. O-A: não houve violação; o piloto acreditava estar seguindo o procedimento. A-B (Deslize/Omissão): a omissão da verificação visual é um deslize/lapso de execução do checklist — a ação de verificar estava no procedimento mas não foi realizada.",
  "discriminators": [
    "NÃO é P-D (Atenção COM pressão): o relato não indica pressão de tempo; a jornada era normal e não havia urgência declarada no evento.",
    "NÃO é P-B (Sensorial): o nível de combustível era visível; não houve impedimento sensorial.",
    "NÃO é O-B (Violação Rotineira): pular a verificação não era um desvio habitual sancionado pelo grupo/organização — era um lapso individual naquele evento.",
    "A ação É A-B (não A-A) porque a omissão da verificação constitui falha de execução do checklist — ação prevista não realizada."
  ]
}`)

write('tests/sera/fixtures/TEST-P-H-001.json', `{
  "id": "TEST-P-H-001",
  "title": "Técnico executa manutenção em sistema errado por briefing ambíguo",
  "domain": "manutenção aeronáutica",
  "description": "O supervisor de manutenção passou verbalmente a ordem de serviço para o técnico: 'vá na aeronave PR-XYZ e verifique o sistema hidráulico 2'. O técnico entendeu 'sistema hidráulico 1' — a numeração dos sistemas naquele hangar era apresentada de forma não-padronizada nos painéis (sistema 1 à direita, sistema 2 à esquerda, inversamente ao manual). Não havia ordem de serviço escrita. O técnico realizou o procedimento no sistema errado, deixando o sistema 2 (com vazamento real) sem inspeção. O técnico era experiente e executou o procedimento corretamente no sistema que acreditava ser o correto.",
  "expected": {
    "perception_code": "P-H",
    "objective_code": "O-A",
    "action_code": "A-A",
    "erc_level": 3,
    "top_preconditions": [
      "S2",
      "W1",
      "O3",
      "O4"
    ]
  },
  "rationale": "P-H (Falha de Comunicação): a falha está no canal de comunicação — instrução verbal ambígua sem confirmação escrita, combinada com painéis não-padronizados que tornaram a mensagem equívoca. O técnico percebeu a instrução, mas o canal comunicacional falhou em transmiti-la com fidelidade. O-A: o objetivo do técnico (verificar o sistema indicado) estava correto. A-A: a execução técnica foi correta para o sistema que o técnico acreditava estar inspecionando.",
  "discriminators": [
    "NÃO é P-C (Conhecimento): o técnico sabia identificar sistemas hidráulicos — o problema foi na comunicação da instrução, não no conhecimento técnico.",
    "NÃO é P-G (Atenção): o técnico prestou atenção ao briefing — ouviu e executou; a ambiguidade estava na mensagem em si.",
    "NÃO é A-F (Seleção de Ação): o técnico selecionou corretamente o procedimento para o sistema que acreditava ser o alvo — a falha foi anterior, na percepção da instrução."
  ]
}`)

write('tests/reports/.gitignore', `*\n!.gitignore\n`)

write('tests/sera/fixtures/schema.ts', `// tests/sera/fixtures/schema.ts
export interface SeraFixture {
  id: string
  title: string
  domain: string
  description: string
  expected: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level: number
    top_preconditions?: string[]
  }
  rationale: string
  discriminators: string[]
}

export interface TestResult {
  fixture_id: string
  title: string
  run_index: number
  timestamp: string
  actual: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level: number
    preconditions: string[]
  }
  expected: SeraFixture['expected']
  scores: {
    perception: 'PASS' | 'FAIL'
    objective: 'PASS' | 'FAIL'
    action: 'PASS' | 'FAIL'
    erc_level: 'PASS' | 'FAIL'
    preconditions: 'PASS' | 'PARTIAL' | 'FAIL'
    overall: 'PASS' | 'PARTIAL' | 'FAIL'
  }
  duration_ms: number
  error?: string
}

export interface FixtureReport {
  fixture_id: string
  title: string
  expected_codes: string
  runs: TestResult[]
  consistency: {
    perception_consistent: boolean
    objective_consistent: boolean
    action_consistent: boolean
    erc_consistent: boolean
    fully_deterministic: boolean
  }
  accuracy: {
    perception_accuracy: number
    objective_accuracy: number
    action_accuracy: number
    erc_accuracy: number
    precondition_recall: number
    overall_accuracy: number
  }
}

export interface RunReport {
  run_id: string
  timestamp: string
  n_runs_per_fixture: number
  fixtures_tested: number
  summary: {
    total_runs: number
    pass: number
    partial: number
    fail: number
    error: number
    pass_rate: number
    determinism_rate: number
  }
  by_fixture: FixtureReport[]
  confusion_matrix: Record<string, Record<string, number>>
  weakest_fixtures: string[]
}
`)

write('tests/sera/compare.ts', `// tests/sera/compare.ts
import fs from 'fs'
import path from 'path'
import type { SeraFixture, TestResult, FixtureReport } from './fixtures/schema'

export function scoreResult(
  fixture: SeraFixture,
  actual: TestResult['actual'],
  runIndex: number,
  durationMs: number
): TestResult {
  const perceptionPass = actual.perception_code === fixture.expected.perception_code
  const objectivePass  = actual.objective_code  === fixture.expected.objective_code
  const actionPass     = actual.action_code     === fixture.expected.action_code
  const ercPass        = actual.erc_level       === fixture.expected.erc_level

  let preconditionScore: 'PASS' | 'PARTIAL' | 'FAIL' = 'PASS'
  if (fixture.expected.top_preconditions?.length) {
    const expected = fixture.expected.top_preconditions
    const found = expected.filter(p => actual.preconditions.includes(p))
    const recall = found.length / expected.length
    preconditionScore = recall === 1 ? 'PASS' : recall >= 0.5 ? 'PARTIAL' : 'FAIL'
  }

  const criticalPass = perceptionPass && objectivePass && actionPass
  const overall: 'PASS' | 'PARTIAL' | 'FAIL' =
    criticalPass && ercPass ? 'PASS' :
    criticalPass ? 'PARTIAL' :
    (perceptionPass || objectivePass || actionPass) ? 'PARTIAL' : 'FAIL'

  return {
    fixture_id: fixture.id,
    title: fixture.title,
    run_index: runIndex,
    timestamp: new Date().toISOString(),
    actual,
    expected: fixture.expected,
    scores: {
      perception: perceptionPass ? 'PASS' : 'FAIL',
      objective:  objectivePass  ? 'PASS' : 'FAIL',
      action:     actionPass     ? 'PASS' : 'FAIL',
      erc_level:  ercPass        ? 'PASS' : 'FAIL',
      preconditions: preconditionScore,
      overall,
    },
    duration_ms: durationMs,
  }
}

export function buildFixtureReport(fixture: SeraFixture, results: TestResult[]): FixtureReport {
  const uniq = (arr: string[]) => [...new Set(arr)]
  return {
    fixture_id: fixture.id,
    title: fixture.title,
    expected_codes: \`\${fixture.expected.perception_code} / \${fixture.expected.objective_code} / \${fixture.expected.action_code}\`,
    runs: results,
    consistency: {
      perception_consistent: uniq(results.map(r => r.actual.perception_code)).length === 1,
      objective_consistent:  uniq(results.map(r => r.actual.objective_code)).length === 1,
      action_consistent:     uniq(results.map(r => r.actual.action_code)).length === 1,
      erc_consistent:        uniq(results.map(r => String(r.actual.erc_level))).length === 1,
      fully_deterministic:   ['perception_code','objective_code','action_code'].every(
        k => uniq(results.map(r => (r.actual as any)[k])).length === 1
      ),
    },
    accuracy: {
      perception_accuracy: results.filter(r => r.scores.perception === 'PASS').length / results.length,
      objective_accuracy:  results.filter(r => r.scores.objective  === 'PASS').length / results.length,
      action_accuracy:     results.filter(r => r.scores.action     === 'PASS').length / results.length,
      erc_accuracy:        results.filter(r => r.scores.erc_level  === 'PASS').length / results.length,
      precondition_recall: results.filter(r => r.scores.preconditions !== 'FAIL').length / results.length,
      overall_accuracy:    results.filter(r => r.scores.overall === 'PASS').length / results.length,
    },
  }
}
`)

write('tests/sera/runner.ts', `// tests/sera/runner.ts
// ATENÇÃO: adapte o import do pipeline ao caminho real no seu projeto
import fs from 'fs'
import path from 'path'
import type { SeraFixture, TestResult, RunReport } from './fixtures/schema'
import { scoreResult, buildFixtureReport } from './compare'

// TODO: substitua pelo import real do seu pipeline
// import { runSeraPipeline } from '../../src/lib/sera/pipeline'
async function runSeraPipeline(_input: { rawText: string }): Promise<any> {
  throw new Error('pipeline não configurado — edite tests/sera/runner.ts e importe seu pipeline real')
}

const FIXTURES_DIR = path.join(__dirname, 'fixtures')

export async function loadFixtures(): Promise<SeraFixture[]> {
  return fs.readdirSync(FIXTURES_DIR)
    .filter(f => f.endsWith('.json') && !f.includes('schema') && !f.includes('index'))
    .map(f => JSON.parse(fs.readFileSync(path.join(FIXTURES_DIR, f), 'utf-8')))
}

export async function runSingleFixture(fixture: SeraFixture, runIndex: number): Promise<TestResult> {
  const start = Date.now()
  try {
    const result = await runSeraPipeline({ rawText: fixture.description })
    return scoreResult(fixture, {
      perception_code: result.perception_code ?? '',
      objective_code:  result.objective_code  ?? '',
      action_code:     result.action_code     ?? '',
      erc_level:       result.erc_level       ?? 0,
      preconditions:   result.preconditions?.map((p: any) => p.code ?? p) ?? [],
    }, runIndex, Date.now() - start)
  } catch (err: any) {
    return {
      fixture_id: fixture.id, title: fixture.title, run_index: runIndex,
      timestamp: new Date().toISOString(),
      actual: { perception_code: '', objective_code: '', action_code: '', erc_level: 0, preconditions: [] },
      expected: fixture.expected,
      scores: { perception:'FAIL', objective:'FAIL', action:'FAIL', erc_level:'FAIL', preconditions:'FAIL', overall:'FAIL' },
      duration_ms: Date.now() - start,
      error: err.message,
    }
  }
}

export async function runAllFixtures(fixtures: SeraFixture[], nRuns = 3): Promise<RunReport> {
  const runId = \`run-\${Date.now()}\`
  console.log(\`\n[SERA] \${fixtures.length} fixtures × \${nRuns} runs = \${fixtures.length * nRuns} chamadas\n\`)
  const byFixture = []
  const matrix: Record<string, Record<string, number>> = {}

  for (const fixture of fixtures) {
    console.log(\`  → \${fixture.id}\`)
    const results: TestResult[] = []
    for (let i = 0; i < nRuns; i++) {
      process.stdout.write(\`     run \${i+1}/\${nRuns}... \`)
      const r = await runSingleFixture(fixture, i)
      results.push(r)
      console.log(r.scores.overall + (r.error ? \` ⚠ \${r.error}\` : ''))
      const exp = fixture.expected.perception_code
      const act = r.actual.perception_code
      if (!matrix[exp]) matrix[exp] = {}
      matrix[exp][act] = (matrix[exp][act] ?? 0) + 1
    }
    byFixture.push(buildFixtureReport(fixture, results))
    await new Promise(r => setTimeout(r, 500))
  }

  const all = byFixture.flatMap(f => f.runs)
  const pass    = all.filter(r => r.scores.overall === 'PASS').length
  const partial = all.filter(r => r.scores.overall === 'PARTIAL').length
  const fail    = all.filter(r => r.scores.overall === 'FAIL').length
  const errors  = all.filter(r => r.error).length
  const detCount = byFixture.filter(f => f.consistency.fully_deterministic).length

  return {
    run_id: runId,
    timestamp: new Date().toISOString(),
    n_runs_per_fixture: nRuns,
    fixtures_tested: fixtures.length,
    summary: { total_runs: all.length, pass, partial, fail, error: errors,
      pass_rate: pass / all.length,
      determinism_rate: detCount / fixtures.length },
    by_fixture: byFixture,
    confusion_matrix: matrix,
    weakest_fixtures: [...byFixture]
      .sort((a,b) => a.accuracy.overall_accuracy - b.accuracy.overall_accuracy)
      .slice(0,5).map(f => f.fixture_id),
  }
}
`)

write('tests/sera/report.ts', `// tests/sera/report.ts
import fs from 'fs'
import path from 'path'
import type { RunReport } from './fixtures/schema'

const REPORTS_DIR = path.join(__dirname, '../../tests/reports')

export function saveReport(report: RunReport): string {
  fs.mkdirSync(REPORTS_DIR, { recursive: true })
  const filePath = path.join(REPORTS_DIR, \`\${report.run_id}.json\`)
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2))
  return filePath
}

export function printSummary(report: RunReport): void {
  const s = report.summary
  const pct = (n: number) => \`\${(n * 100).toFixed(1)}%\`
  const fx = report.by_fixture
  const avg = (key: keyof typeof fx[0]['accuracy']) =>
    pct(fx.reduce((a,f) => a + f.accuracy[key], 0) / fx.length)

  console.log('\n' + '═'.repeat(60))
  console.log('  SERA CONFORMANCE REPORT')
  console.log('═'.repeat(60))
  console.log(\`  Run       : \${report.run_id}\`)
  console.log(\`  Fixtures  : \${report.fixtures_tested} × \${report.n_runs_per_fixture} runs\`)
  console.log(\`\n  PASS      : \${s.pass} (\${pct(s.pass_rate)})\`)
  console.log(\`  PARTIAL   : \${s.partial}\`)
  console.log(\`  FAIL      : \${s.fail}\`)
  console.log(\`  ERRORS    : \${s.error}\`)
  console.log(\`\n  DETERMINISMO : \${pct(s.determinism_rate)}\`)
  console.log('\n  PRECISÃO POR ETAPA:')
  console.log(\`    Percepção    : \${avg('perception_accuracy')}\`)
  console.log(\`    Objetivo     : \${avg('objective_accuracy')}\`)
  console.log(\`    Ação         : \${avg('action_accuracy')}\`)
  console.log(\`    ERC Level    : \${avg('erc_accuracy')}\`)
  console.log(\`    Pré-cond.    : \${avg('precondition_recall')} (recall)\`)
  console.log('\n  FIXTURES MAIS FRACOS:')
  report.weakest_fixtures.forEach((id, i) => {
    const f = fx.find(x => x.fixture_id === id)!
    console.log(\`    \${i+1}. \${id} — \${pct(f.accuracy.overall_accuracy)} — esperado: \${f.expected_codes}\`)
  })
  console.log('═'.repeat(60) + '\n')
}
`)

write('tests/sera/run.ts', `// tests/sera/run.ts
import { loadFixtures, runAllFixtures } from './runner'
import { saveReport, printSummary } from './report'

const N_RUNS   = parseInt(process.env.SERA_N_RUNS   ?? '3', 10)
const FILTER   = process.env.SERA_FIXTURE

async function main() {
  const all = await loadFixtures()
  const fixtures = FILTER ? all.filter(f => f.id.includes(FILTER)) : all
  if (!fixtures.length) { console.error('Nenhum fixture encontrado'); process.exit(1) }
  const report = await runAllFixtures(fixtures, N_RUNS)
  const file = saveReport(report)
  printSummary(report)
  console.log(\`  Relatório: \${file}\n\`)
  if (report.summary.pass_rate < 0.7) {
    console.error(\`  ⚠ Pass rate abaixo de 70%\`)
    process.exit(1)
  }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1) })
`)

console.log(`\n[SERA] Estrutura criada com sucesso!`)
console.log('  Próximo passo: abra CODEX_PROMPT.md e cole no Codex do VSCode')
console.log('  Depois adicione ao package.json:')
console.log('    "test:sera": "tsx tests/sera/run.ts"')
console.log('')