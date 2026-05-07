import type { TutorialRecord } from './types'

export const step5Tutorials: TutorialRecord = {
  "A-B": {
    oQueE: "Deslizes, Omissões e Lapsos: a ação foi implementada de forma diferente do que o operador planejava — erro de execução, não de decisão. O operador sabia o que fazer, tinha capacidade para fazer, mas a ação física resultou diferente do planejado (apertar botão errado, esquecer um passo da checagem, omitir uma etapa).",
    oQueConsiderarParaAlterar: "O operador executou exatamente o que planejava? Se sim (a ação foi correta na execução mas a escolha era errada), considere A-F ou A-G. A-B é exclusivamente erro de execução — o plano era certo, a execução falhou.",
    naoConfundirCom: [
      { codigo: "A-C", diferenca: "A-C é quando o operador não verifica se a ação foi corretamente executada — em A-B o erro está na execução em si." },
      { codigo: "A-F", diferenca: "A-F é escolha errada de ação — em A-B a escolha era certa, a execução que falhou." },
    ],
    exemplo: "Copiloto, ao executar checklist de emergência, aciona o extintor do motor 2 em vez do motor 1 — ação planejada era correta, mas o botão errado foi pressionado (deslize motor).",
    fonte: "Daumas (2018), Tabela 3; Hendy (2003), Figure 5 — Nó 1: NÃO",
  },
  "A-C": {
    oQueE: "Falha no Feedback da Execução: o operador executou a ação como planejada, mas não monitorou/verificou se a ação produziu o efeito esperado. A ação foi realizada, mas a ausência de verificação do resultado permitiu que o problema persistisse sem detecção.",
    oQueConsiderarParaAlterar: "O operador verificou o resultado da ação? Se verificou e o resultado pareceu correto (ilusão de feedback), considere A-G. A-C é quando houve ausência total de monitoramento do resultado.",
    naoConfundirCom: [
      { codigo: "A-G", diferenca: "A-G é quando o operador verificou mas o feedback era enganoso ou insuficiente; A-C é quando não houve verificação alguma." },
      { codigo: "A-B", diferenca: "A-B é erro na execução da ação; A-C é falta de verificação após a execução." },
    ],
    exemplo: "Piloto aciona sistema anti-ice mas não verifica indicadores de confirmação de ativação — o sistema não ativou por falha elétrica mas o piloto não detectou por não ter monitorado o feedback.",
    fonte: "Daumas (2018), Tabela 4; Hendy (2003), Figure 5 — Nó 1: NÃO (ação não implementada como pretendida)",
  },
  "A-D": {
    oQueE: "Inabilidade para a Resposta: o operador identificou a ação correta mas não tinha capacidade física, ergonômica ou motora para executá-la. Limitação de força, alcance, tempo de reação ou restrição ambiental impediu a execução da ação correta.",
    oQueConsiderarParaAlterar: "O operador tinha o conhecimento para saber qual ação era certa? Se não sabia qual ação era correta (problema de decisão, não de capacidade física), considere A-E. A-D requer que a barreira seja exclusivamente física/ergonômica.",
    naoConfundirCom: [
      { codigo: "A-E", diferenca: "A-E é falta de conhecimento ou habilidade de decisão; A-D é limitação física/ergonômica mesmo sabendo o que fazer." },
      { codigo: "A-F", diferenca: "A-F é escolha da ação errada; A-D é incapacidade de executar a ação certa que foi escolhida." },
    ],
    exemplo: "Em situação de emergência em plataforma, operador tenta ativar válvula de emergência mas não consegue porque o torque necessário supera sua capacidade física — a ação certa era conhecida, a limitação era física.",
    fonte: "Daumas (2018), Tabela 7; Hendy (2003), Figure 5",
  },
  "A-E": {
    oQueE: "Falha de Conhecimento/Decisão: o operador tinha capacidade física para executar a ação correta, mas lhe faltava o conhecimento técnico ou a habilidade de decisão para determinar qual ação era a correta naquela situação. O corpo estava apto, mas a mente não sabia o que o corpo deveria fazer.",
    oQueConsiderarParaAlterar: "O operador conhecia o procedimento correto? Se conhecia e mesmo assim escolheu o errado (tendo capacidade), considere A-F. A-E é reservado para lacunas genuínas de conhecimento ou treinamento que impediram a identificação da ação correta.",
    naoConfundirCom: [
      { codigo: "A-D", diferenca: "A-D é limitação física — A-E é limitação de conhecimento/decisão com capacidade física plena." },
      { codigo: "A-F", diferenca: "A-F é quando o operador SABIA o procedimento mas escolheu o errado; A-E é quando não sabia qual procedimento aplicar." },
    ],
    exemplo: "Piloto de helicóptero sem treinamento específico para condições de gelo encontra acumulação de gelo em rotor — não conhece os procedimentos de resposta e não consegue determinar qual ação tomar.",
    fonte: "Daumas (2018), Tabela 6; Hendy (2003), Figure 5",
  },
  "A-F": {
    oQueE: "Falha na Seleção da Ação: o operador tinha capacidade física e conhecimento suficiente, mas escolheu o plano ou procedimento errado para a situação — sem pressão excessiva de tempo. A ação foi corretamente executada conforme o planejado, mas o plano em si era inadequado.",
    oQueConsiderarParaAlterar: "Havia pressão de tempo excessiva influenciando a escolha? Se sim, reconsidere A-I. A-F é para seleção errada de plano em condições de tempo adequado — o operador tinha tempo para decidir bem mas decidiu errado.",
    naoConfundirCom: [
      { codigo: "A-G", diferenca: "A-G é quando o operador fez a escolha e não verificou o resultado; A-F é quando a própria escolha era errada desde o início." },
      { codigo: "A-I", diferenca: "A-I é seleção errada por pressão de tempo — A-F é seleção errada sem pressão de tempo determinante." },
      { codigo: "A-E", diferenca: "A-E é falta de conhecimento para decidir; A-F é conhecimento presente mas decisão incorreta." },
    ],
    exemplo: "Comandante seleciona procedimento de pousar em modo degradado em vez de realizar go-around após perda de potência em hovering — o procedimento de go-around era o correto, mas o comandante optou pelo de pouso (escolha errada, sem pressão de tempo extrema).",
    fonte: "Daumas (2018), Tabela 17; Hendy (2003), Figure 5 — Nó 4: NÃO pressão de tempo, Nó 5: A-F",
  },
  "A-G": {
    oQueE: "Falha de Feedback: o operador realizou a ação escolhida mas não recebeu ou não interpretou corretamente o retorno do sistema sobre o resultado daquela ação — sem pressão de tempo. O problema não é a ação em si, mas a ausência ou falha na leitura do feedback que indicaria se a ação funcionou.",
    oQueConsiderarParaAlterar: "O operador verificou ativamente o feedback e ele era enganoso, ou simplesmente não verificou? Se não verificou (ausência de monitoramento), considere A-C. A-G é quando houve tentativa de verificação mas o feedback disponível foi insuficiente, ambíguo ou mal interpretado.",
    naoConfundirCom: [
      { codigo: "A-C", diferenca: "A-C é ausência de verificação; A-G é verificação feita mas feedback mal interpretado ou enganoso." },
      { codigo: "A-F", diferenca: "A-F é seleção de ação errada; A-G é seleção correta mas falha no monitoramento do resultado." },
      { codigo: "A-J", diferenca: "A-J é exatamente A-G mas com pressão de tempo como causa da falha de feedback." },
    ],
    exemplo: "Copiloto ajusta potência e verifica indicador de torque, mas o indicador estava com leitura defasada por problema de sensor — acredita que a ação foi efetiva quando não foi. O feedback existia mas era enganoso.",
    fonte: "Daumas (2018), Tabela 13; Hendy (2003), Figure 5 — Nó 5: A-G (sem pressão de tempo)",
  },
  "A-H": {
    oQueE: "Falha no Gerenciamento do Tempo: o operador tinha o conhecimento correto e capacidade física, mas não gerenciou adequadamente o tempo disponível para executar as ações necessárias. Priorização incorreta de tarefas, demora excessiva em tarefas não críticas ou não alocar tempo para ações essenciais.",
    oQueConsiderarParaAlterar: "A pressão de tempo era excessiva a ponto de impossibilitar o gerenciamento? Se a quantidade de tarefas era objetivamente ingerenciável no tempo disponível, considere A-I ou A-J. A-H é quando o tempo era gerenciável mas foi mal alocado.",
    naoConfundirCom: [
      { codigo: "A-I", diferenca: "A-I é seleção errada de ação por pressão de tempo; A-H é gerenciamento deficiente do tempo disponível." },
    ],
    exemplo: "Piloto passa 4 minutos em comunicação com empresa sobre logística enquanto o combustível se aproximava do mínimo — havia tempo para verificar os instrumentos, mas foi alocado errado.",
    fonte: "Daumas (2018); Hendy (2003), Figure 5 — Nó 4: SIM pressão de tempo, Nó 5: A-H",
  },
  "A-I": {
    oQueE: "Falha na Seleção da Ação por Pressão do Tempo: o operador escolheu o plano ou procedimento errado porque a pressão de tempo excessiva comprometeu sua capacidade de avaliação e seleção. A decisão foi precipitada pela urgência da situação.",
    oQueConsiderarParaAlterar: "A pressão de tempo era real e determinante? Se havia tempo para decidir adequadamente mas o operador simplesmente escolheu errado, considere A-F. A-I exige que o tempo objetivamente insuficiente tenha sido o fator causal da decisão errada.",
    naoConfundirCom: [
      { codigo: "A-F", diferenca: "A-F é seleção errada sem pressão de tempo determinante; A-I é a mesma falha causada especificamente pela urgência temporal." },
      { codigo: "A-J", diferenca: "A-I é seleção de plano errado; A-J é falha no monitoramento do resultado — ambas sob pressão de tempo." },
    ],
    exemplo: "Com TCAS disparando e ATC chamando simultaneamente, comandante sob pressão extrema escolhe manobra de descida (instrução ATC) em vez de subida (TCAS RA) — a urgência da situação induziu a escolha errada.",
    fonte: "Daumas (2018), Tabela 19; Hendy (2003), Figure 5 — Nó 4: SIM, Nó 5: A-I",
  },
  "A-J": {
    oQueE: "Falha de Feedback por Pressão do Tempo: o operador realizou a ação mas, devido à pressão de tempo extrema, não pôde monitorar ou verificar adequadamente o resultado. A urgência da situação não deixou espaço para confirmar se a ação produziu o efeito esperado.",
    oQueConsiderarParaAlterar: "A pressão de tempo era determinante para a falta de feedback? Se havia tempo para verificar mas o operador não o fez, considere A-G ou A-C. A-J é quando o ambiente temporal impediu objetivamente a verificação.",
    naoConfundirCom: [
      { codigo: "A-G", diferenca: "A-G é falha de feedback sem pressão de tempo determinante; A-J é a mesma falha causada pela urgência." },
      { codigo: "A-I", diferenca: "A-I é seleção de ação errada sob pressão; A-J é falta de verificação do resultado sob pressão." },
    ],
    exemplo: "Piloto, em situação de emergência com múltiplos alarmes, aciona extintor de incêndio e imediatamente precisa gerenciar outros sistemas críticos — não tem tempo para confirmar extinção do fogo antes de outra emergência exigir atenção.",
    fonte: "Daumas (2018), Tabela 20; Hendy (2003), Figure 5 — Nó 4: SIM, Nó 5: A-J",
  },
}
