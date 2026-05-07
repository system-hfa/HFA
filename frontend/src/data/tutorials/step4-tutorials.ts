import type { TutorialRecord } from './types'

export const step4Tutorials: TutorialRecord = {
  "O-B": {
    oQueE: "Violação Rotineira: o operador intencionalmente escolheu um objetivo que viola regras ou procedimentos, e essa violação é habitual — faz parte da cultura operacional local ou do comportamento repetido daquele operador. A palavra-chave é 'rotineira': já era prática recorrente.",
    oQueConsiderarParaAlterar: "Há evidência de que aquela violação era habitual, normalizada ou compartilhada pela equipe? Uma violação isolada sem histórico de repetição deve ser O-C, não O-B. O-B exige evidência de padrão comportamental.",
    naoConfundirCom: [
      { codigo: "O-C", diferenca: "O-C é violação excepcional — única, específica para aquela situação. O-B é violação que virou norma informal." },
      { codigo: "O-D", diferenca: "O-D não há violação de regra — em O-B há violação intencional e recorrente." },
    ],
    exemplo: "Operadora de helicóptero offshore onde é prática comum (documentada em investigações anteriores) decolar com passageiros sem briefing de segurança completo — o objetivo 'decolar rápido' viola o procedimento mas é rotina da base.",
    fonte: "Daumas (2018), Tabela 10; Hendy (2003), Figure 4",
  },
  "O-C": {
    oQueE: "Falha de Intenção / Violação Excepcional: o operador intencionalmente escolheu um objetivo que viola regras ou procedimentos, mas foi uma decisão pontual motivada pelas circunstâncias específicas daquele momento — não é comportamento habitual. O operador conhecia a regra mas decidiu violá-la naquela situação.",
    oQueConsiderarParaAlterar: "Há evidência de que o operador sabia que estava violando uma regra? Se o operador genuinamente não sabia que o objetivo era irregular, considere O-D. Se a violação era habitual, considere O-B.",
    naoConfundirCom: [
      { codigo: "O-B", diferenca: "O-B é violação habitual/rotineira; O-C é violação pontual, contextual." },
      { codigo: "O-D", diferenca: "Em O-D não há violação de regra — o objetivo era consistente com normas mas não conservativo. Em O-C há violação intencional." },
    ],
    exemplo: "Comandante decide pousar em plataforma com vento acima do limite operacional aprovado porque o combustível estava crítico e não havia alternativa próxima — decisão consciente de violar limite, mas excepcional.",
    fonte: "Daumas (2018), Tabela 11; Hendy (2003), Figure 4",
  },
  "O-D": {
    oQueE: "Falha de Intenção (Não Violação): o operador escolheu um objetivo que era consistente com as regras — não havia violação — mas que não era conservativo ou não gerenciava adequadamente os riscos presentes. O operador seguiu as regras mas escolheu o caminho menos seguro dentro do permitido.",
    oQueConsiderarParaAlterar: "Havia qualquer violação de regra ou limite operacional? Se sim, O-C ou O-B são mais adequados. O-D é específico para situações onde o procedimento foi seguido mas a escolha estratégica foi insuficientemente conservativa.",
    naoConfundirCom: [
      { codigo: "O-C", diferenca: "O-C viola uma regra — O-D está dentro das regras mas escolheu objetivo não conservativo." },
      { codigo: "O-B", diferenca: "O-B é violação habitual — O-D é escolha dentro das normas, não conservativa." },
    ],
    exemplo: "Piloto opta por aproximação ILS com mínimos exatos de visibilidade permitidos em vez de desviar para alternativa com melhores condições — dentro das regras, mas não conservativo dado o deterioramento climático previsto.",
    fonte: "Daumas (2018), Tabela 15; Hendy (2003), Figure 4 — 'Failure in intent, Non-violation'",
  },
}
