import type { TutorialRecord } from './types'

export const step3Tutorials: TutorialRecord = {
  "P-B": {
    oQueE: "Falha Sensorial: o operador não conseguiu fisicamente perceber o estímulo — seja por limitação visual, auditiva, ou porque o sinal simplesmente não chegou aos seus sentidos. A informação não entrou no sistema perceptual do operador.",
    oQueConsiderarParaAlterar: "Havia evidência de que o operador PODIA fisicamente detectar o sinal (visão, audição, tato normais)? Se sim, a falha é de outra categoria. P-B só se aplica quando o canal sensorial estava comprometido ou o estímulo era imperceptível nas condições do momento.",
    naoConfundirCom: [
      { codigo: "P-F", diferenca: "P-F é quando o sinal estava disponível mas foi mal interpretado — em P-B o sinal nunca chegou ao operador." },
      { codigo: "P-D", diferenca: "P-D é quando o operador percebeu o sinal mas não o processou corretamente por pressão de tempo — em P-B não houve percepção alguma." },
    ],
    exemplo: "Em operação offshore, um copiloto com fone com defeito não ouve o alerta ATC sobre tráfego conflitante. A falha é sensorial — o canal auditivo estava bloqueado, não houve percepção.",
    fonte: "Daumas (2018), Tabela 2; Hendy (2003), Annex A — Perception node 1",
  },
  "P-C": {
    oQueE: "Falha de Conhecimento/Percepção: o operador percebeu o sinal, mas não possuía o conhecimento técnico necessário para reconhecer o que aquele sinal significava. O estímulo foi recebido, mas não pôde ser corretamente interpretado por falta de treinamento ou experiência.",
    oQueConsiderarParaAlterar: "O operador já havia sido treinado para reconhecer aquele tipo de sinal ou situação? Se sim, o problema não é falta de conhecimento — considere P-D ou P-G. P-C requer evidência explícita de lacuna de treinamento ou inexperiência.",
    naoConfundirCom: [
      { codigo: "P-F", diferenca: "P-F é distorção perceptual ou ambiguidade — o operador tentou interpretar mas errou. Em P-C, o operador não tinha base de conhecimento para interpretar." },
      { codigo: "P-D", diferenca: "P-D envolve pressão de tempo impedindo o processamento — em P-C o problema é estrutural (falta de conhecimento), não situacional (falta de tempo)." },
    ],
    exemplo: "Piloto recém-contratado não reconhece que a oscilação no torque indicada no MFD é sinal de início de vórtice de rotor — nunca havia sido treinado para aquela assinatura de falha específica.",
    fonte: "Daumas (2018), Tabela 5; Hendy (2003), Annex A",
  },
  "P-D": {
    oQueE: "Falha de Atenção (com pressão de tempo): o operador tinha capacidade sensorial e conhecimento, mas a pressão de tempo extrema impediu o processamento adequado da informação disponível. A pergunta-chave: 'Se houvesse mais tempo, o desfecho seria diferente?' — a resposta é SIM.",
    oQueConsiderarParaAlterar: "Havia pressão de tempo real e documentada no relato? Se o operador tinha tempo suficiente mas simplesmente não prestou atenção, o código correto é P-G. P-D exige que a pressão temporal seja causa determinante da falha de processamento.",
    naoConfundirCom: [
      { codigo: "P-G", diferenca: "P-G é exatamente igual exceto pela pressão de tempo: em P-G, mais tempo NÃO mudaria o resultado. Em P-D, mais tempo provavelmente mudaria." },
      { codigo: "P-E", diferenca: "P-E é falha no gerenciamento do tempo disponível — o operador tinha tempo mas não o usou bem. P-D é quando o tempo era objetivamente insuficiente." },
    ],
    exemplo: "Durante aproximação de emergência com vento cortante, o copiloto não processa o callout do GPWS pois está sobrecarregado gerenciando listas de checagem e comunicações simultâneas. Mais tempo resolveria o problema.",
    fonte: "Daumas (2018), Tabela 8; Hendy (2003), Figure 3 — CRITÉRIO: mais tempo mudaria o resultado? SIM → P-D",
  },
  "P-E": {
    oQueE: "Falha no Gerenciamento do Tempo: o operador tinha tempo disponível para perceber e processar as informações, mas não o utilizou corretamente — priorizou tarefas erradas, demorou excessivamente em uma tarefa não crítica, ou perdeu a janela de percepção.",
    oQueConsiderarParaAlterar: "O tempo objetivo era insuficiente? Se sim, considere P-D. P-E é para casos onde o operador tinha tempo mas o gerenciou mal — há evidência de escolhas ou prioridades incorretas no uso do tempo.",
    naoConfundirCom: [
      { codigo: "P-D", diferenca: "Em P-D o tempo era objetivamente escasso; em P-E o tempo existia mas foi mal usado." },
    ],
    exemplo: "Piloto pasa 3 minutos configurando o FMS após pouso enquanto o combustível abaixo do mínimo estava sinalizado — o tempo para verificar o indicador existia mas foi alocado errado.",
    fonte: "Daumas (2018); Hendy (2003), Annex A",
  },
  "P-F": {
    oQueE: "Falha de Percepção: a informação estava presente e detectável, mas o operador a percebeu de forma distorcida, ambígua ou ilusória. O sinal chegou, o operador tentou interpretá-lo, mas a interpretação foi incorreta — ilusão sensorial, ambiguidade ambiental ou leitura errada de instrumento.",
    oQueConsiderarParaAlterar: "O operador simplesmente não atentou para o sinal (P-G/P-D) ou ativamente o interpretou de forma errada? P-F requer evidência de distorção ativa da percepção, não apenas falta de atenção.",
    naoConfundirCom: [
      { codigo: "P-D", diferenca: "Em P-D o operador não processou por pressão de tempo; em P-F o operador processou mas percebeu errado." },
      { codigo: "P-G", diferenca: "Em P-G o operador simplesmente não direcionou atenção; em P-F o operador direcionou atenção mas obteve percepção incorreta." },
    ],
    exemplo: "Em voo noturno offshore, piloto interpreta luzes de plataforma petrolífera como luzes de aeronave em tráfego conflitante e faz manobra de evitação desnecessária.",
    fonte: "Daumas (2018); Hendy (2003), Annex A — node 3",
  },
  "P-G": {
    oQueE: "Falha de Atenção (sem pressão de tempo): o operador tinha capacidade sensorial, conhecimento e tempo suficiente, mas não direcionou atenção para a informação relevante. A pergunta-chave: 'Se houvesse mais tempo, o desfecho seria diferente?' — a resposta é NÃO.",
    oQueConsiderarParaAlterar: "Havia pressão de tempo no evento? Se sim, reconsidere P-D. P-G é para falhas de vigilância, complacência ou distração em ambiente com tempo adequado — o operador simplesmente não olhou ou não percebeu o que estava disponível.",
    naoConfundirCom: [
      { codigo: "P-D", diferenca: "P-D tem pressão de tempo como causa — mais tempo mudaria o resultado. Em P-G, mais tempo NÃO mudaria porque o problema é atenção/vigilância, não velocidade de processamento." },
    ],
    exemplo: "Piloto não detecta vazamento de óleo indicado por luz âmbar no painel durante cruzeiro porque estava em conversa com passageiros — tempo havia, mas atenção estava desviada.",
    fonte: "Daumas (2018), Tabela 16; Hendy (2003) — CRITÉRIO: mais tempo mudaria o resultado? NÃO → P-G",
  },
  "P-H": {
    oQueE: "Falha de Comunicação: a percepção falhou porque a informação necessária não foi comunicada adequadamente entre membros da equipe, ou foi transmitida de forma ambígua/incorreta. O operador dependia de outra pessoa para receber a informação e essa transferência falhou.",
    oQueConsiderarParaAlterar: "A falha de percepção foi causada por comunicação deficiente entre pessoas? Se a falha é de sistema (instrumento, display), considere P-F. P-H requer que a cadeia humano→humano de informação tenha sido o elo quebrado.",
    naoConfundirCom: [
      { codigo: "P-F", diferenca: "P-F é falha na interpretação de sinais ambientais ou de equipamento; P-H é falha na cadeia de comunicação humana." },
    ],
    exemplo: "Técnico de manutenção não informa ao comandante sobre limitação temporária do piloto automático — durante voo, comandante assume capacidade plena do sistema e não monitora manualmente.",
    fonte: "Daumas (2018), Tabela 12; Hendy (2003)",
  },
}
