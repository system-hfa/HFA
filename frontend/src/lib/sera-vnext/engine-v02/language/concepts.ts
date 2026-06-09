export type SeraEvidenceConcept =
  | 'adequateAssessment'
  | 'inadequateAssessment'
  | 'sensoryLimitation'
  | 'knowledgeLimitation'
  | 'perceptionCapabilityPresent'
  | 'attentionPressure'
  | 'timeManagementPressure'
  | 'informationAmbiguous'
  | 'informationAvailableCorrect'
  | 'informationUnavailable'
  | 'safeGoal'
  | 'knownRule'
  | 'explicitAwareness'
  | 'consciousDeviation'
  | 'routineDeviation'
  | 'exceptionalDeviation'
  | 'managedRisk'
  | 'unmanagedRisk'
  | 'safeAction'
  | 'implementedAction'
  | 'feedbackImplementationFailure'
  | 'slipLapse'
  | 'correctAction'
  | 'incorrectAction'
  | 'physicalActionLimitation'
  | 'actionKnowledgeLimitation'
  | 'actionCapabilityPresent'
  | 'selectionUnderPressureFailed'
  | 'feedbackUnderPressureFailed'
  | 'selectionSubtype'
  | 'feedbackSubtype'
  | 'timeManagementAction'
  | 'postEscapeOutcome'
  | 'preconditionAsEscape'
  | 'oeCode'
  | 'inventedQuestion'

export type SeraConceptMatch = {
  statement: string
  concept: SeraEvidenceConcept
}

const CONCEPT_PATTERNS: Record<SeraEvidenceConcept, RegExp[]> = {
  adequateAssessment: [
    /\b(recognized|noticed|saw|perceived|aware|identified)\b.*\b(in time|warning|trend|deviation|unstable|low|correct)\b/i,
    /\bwarning was available\b/i,
    /\b(reconheceu|percebeu|notou|viu|identificou)\b.*\b(a tempo|alerta|tend[eê]ncia|desvio|inst[aá]vel|baixo|corret[ao])\b/i,
  ],
  inadequateAssessment: [
    /\b(did not|failed to|without)\b.*\b(perceiv\w*|notic\w*|see|recogniz\w*|identify|awareness|deviation|warning)\b/i,
    /\bwrong runway|wrong surface|misidentified|believed existed did not match|perceived state did not match\b/i,
    /\b(n[aã]o|sem|falhou em)\b.*\b(perceber|percebeu|notar|notou|ver|viu|reconhecer|reconheceu|identificar|identificou|consci[eê]ncia|desvio|alerta)\b/i,
    /\b(pista errada|superf[ií]cie errada|identificou incorretamente|percep[cç][aã]o incorreta|avalia[cç][aã]o incorreta)\b/i,
  ],
  sensoryLimitation: [
    /\b(visibility|fog|night|low cloud|poor visibility|degraded visual|visual cues|did not see|failed to notice|visual environment)\b/i,
    /\b(visibilidade|nevoeiro|noite|nuvem baixa|baixa visibilidade|visual degradad[ao]|pistas visuais|n[aã]o viu|ambiente visual)\b/i,
  ],
  knowledgeLimitation: [
    /\b(unfamiliar|training|knowledge gap|competence|not trained|lack of knowledge)\b/i,
    /\b(n[aã]o familiar|treinamento|lacuna de conhecimento|compet[eê]ncia|n[aã]o treinad[ao]|desconhecia)\b/i,
  ],
  perceptionCapabilityPresent: [
    /\b(capable|had capability|available instruments|visual cues available|could see|could perceive|trained)\b/i,
    /\b(capaz|tinha capacidade|instrumentos dispon[ií]veis|pistas visuais dispon[ií]veis|podia ver|podia perceber|treinad[ao])\b/i,
  ],
  attentionPressure: [
    /\b(distraction|attention saturation|fixation|workload|rushed|time pressure)\b/i,
    /\b(distra[cç][aã]o|satura[cç][aã]o de aten[cç][aã]o|fixa[cç][aã]o|carga de trabalho|apressad[ao]|press[aã]o de tempo)\b/i,
  ],
  timeManagementPressure: [
    /\b(time pressure|urgency|expedite|rushed sequence|schedule pressure)\b/i,
    /\b(press[aã]o de tempo|urg[eê]ncia|acelerar|sequ[eê]ncia apressada|press[aã]o de escala|press[aã]o operacional)\b/i,
  ],
  informationAmbiguous: [
    /\b(ambiguous|illusory|misleading|confusing|deceptive|conflicting information)\b/i,
    /\b(amb[ií]gu[ao]|ilus[oó]ri[ao]|enganos[ao]|confus[ao]|informa[cç][aã]o conflitante)\b/i,
  ],
  informationAvailableCorrect: [
    /\b(information was available and correct|valid alert|correct indication|accurate information|correct information)\b/i,
    /\b(informa[cç][aã]o estava dispon[ií]vel e correta|alerta v[aá]lido|indica[cç][aã]o correta|informa[cç][aã]o precisa|informa[cç][aã]o correta)\b/i,
  ],
  informationUnavailable: [
    /\b(no warning|did not generate an alert|not available|missing information|failed alert|incorrect information|unavailable information)\b/i,
    /\b(sem alerta|n[aã]o gerou alerta|n[aã]o dispon[ií]vel|informa[cç][aã]o ausente|alerta falhou|informa[cç][aã]o incorreta|informa[cç][aã]o indispon[ií]vel)\b/i,
  ],
  safeGoal: [
    /\b(discontinued|go-around|go around|aborted|preserving safe|safe separation|recognized .* in time)\b/i,
    /\b(descontinuou|arremeteu|arremetida|abortou|preservando seguran[cç]a|separa[cç][aã]o segura|reconheceu .* a tempo)\b/i,
  ],
  knownRule: [
    /\b(known rule|briefed procedure|required by sop|procedure required|clearance required|rule required|knew the rule)\b/i,
    /\b(regra conhecida|procedimento conhecido|previsto no sop|procedimento exigia|autoriza[cç][aã]o exigida|sabia da regra)\b/i,
  ],
  explicitAwareness: [
    /\b(aware|recognized|knew|noticed|was warned|warning acknowledged|conscious of|despite knowing)\b/i,
    /\b(ciente|consciente|reconheceu|sabia|notou|foi alertad[ao]|alerta reconhecido|apesar de saber)\b/i,
  ],
  consciousDeviation: [
    /\b(knowingly|deliberately|intentionally|consciously|chose to deviate|intentional deviation|decided to violate)\b/i,
    /\b(deliberadamente|intencionalmente|conscientemente|optou por desviar|desvio intencional|decidiu violar)\b/i,
  ],
  routineDeviation: [
    /\b(routine violation|normal practice|customary deviation|habitual noncompliance|usually continued)\b/i,
    /\b(viola[cç][aã]o de rotina|pr[aá]tica de rotina|pr[aá]tica normal|desvio costumeiro|descumprimento habitual|costumava continuar)\b/i,
  ],
  exceptionalDeviation: [
    /\b(exceptional violation|one-off violation|isolated violation|unusual deliberate deviation)\b/i,
    /\b(viola[cç][aã]o excepcional|viola[cç][aã]o isolada|desvio deliberado incomum)\b/i,
  ],
  managedRisk: [
    /\b(discontinued|go-around|go around|aborted|preserving safe|safe separation|risk was managed)\b/i,
    /\b(descontinuou|arremeteu|arremetida|abortou|preservando seguran[cç]a|separa[cç][aã]o segura|risco foi gerenciado)\b/i,
  ],
  unmanagedRisk: [
    /\b(schedule pressure|save time|expedite|accept risk|rushed|risk not managed|did not limit risk)\b/i,
    /\b(press[aã]o de escala|ganhar tempo|acelerar|aceitou risco|apressad[ao]|risco n[aã]o gerenciado|n[aã]o limitou o risco)\b/i,
  ],
  safeAction: [
    /\b(executed a go-around|executed a safe go-around|discontinued|aborted|prompt correction|safe separation)\b/i,
    /\b(executou arremetida|arremeteu com seguran[cç]a|descontinuou|abortou|corre[cç][aã]o imediata|separa[cç][aã]o segura)\b/i,
  ],
  implementedAction: [
    /\b(executed|selected|configured|turned|descended|climbed|moved|lined up|applied|continued)\b/i,
    /\b(executou|selecionou|configurou|virou|desceu|subiu|moveu|alinhou|aplicou|continuou)\b/i,
  ],
  feedbackImplementationFailure: [
    /\b(readback failed|failed feedback|feedback was not checked|verification failed|did not cross-check|callout missed)\b/i,
    /\b(readback falhou|feedback falhou|retorno n[aã]o foi verificado|verifica[cç][aã]o falhou|n[aã]o cruzou a checagem|callout perdido)\b/i,
  ],
  slipLapse: [
    /\b(descended below|continued below|failed to monitor|did not verify|left an invalid|allowed .* to develop|late recovery|inadvertently)\b/i,
    /\b(desceu abaixo|continuou abaixo|falhou em monitorar|n[aã]o verificou|deixou .* inv[aá]lid[ao]|permitiu .* desenvolver|recupera[cç][aã]o tardia|inadvertidamente)\b/i,
  ],
  correctAction: [
    /\b(go-around|discontinued|aborted|prompt correction|safe separation|correct action|adequate action)\b/i,
    /\b(arremetida|descontinuou|abortou|corre[cç][aã]o imediata|separa[cç][aã]o segura|a[cç][aã]o correta|a[cç][aã]o adequada)\b/i,
  ],
  incorrectAction: [
    /\b(wrong runway|wrong surface|selected wrong|wrong mode|lined up toward|lined up on|continued below|descended below|unstable approach|incorrect action)\b/i,
    /\b(pista errada|superf[ií]cie errada|selecionou errado|modo errado|alinhou para|continuou abaixo|desceu abaixo|aproxima[cç][aã]o inst[aá]vel|a[cç][aã]o incorreta)\b/i,
  ],
  physicalActionLimitation: [
    /\b(unable physically|physical limitation|ergonomic|could not reach|fatigue|incapacitated)\b/i,
    /\b(in[aá]bil fisicamente|limita[cç][aã]o f[ií]sica|ergon[oô]mic[ao]|n[aã]o alcan[cç]ou|fadiga|incapacitad[ao])\b/i,
  ],
  actionKnowledgeLimitation: [
    /\b(training|skill|unfamiliar|knowledge gap|did not know how|not trained)\b/i,
    /\b(treinamento|habilidade|n[aã]o familiar|lacuna de conhecimento|n[aã]o sabia como|n[aã]o treinad[ao])\b/i,
  ],
  actionCapabilityPresent: [
    /\b(had the skill|trained|qualified|capable of responding|able to act|capability was present)\b/i,
    /\b(tinha habilidade|treinad[ao]|qualificad[ao]|capaz de responder|capaz de agir|capacidade presente)\b/i,
  ],
  selectionUnderPressureFailed: [
    /\b(no time to select|selection failed under time pressure|did not select because of time pressure)\b/i,
    /\b(sem tempo para selecionar|sele[cç][aã]o falhou sob press[aã]o de tempo|n[aã]o selecionou por press[aã]o de tempo)\b/i,
  ],
  feedbackUnderPressureFailed: [
    /\b(no time to verify feedback|feedback check skipped under time pressure|did not check feedback because of time pressure)\b/i,
    /\b(sem tempo para verificar feedback|checagem de feedback pulada sob press[aã]o de tempo|n[aã]o checou feedback por press[aã]o de tempo)\b/i,
  ],
  selectionSubtype: [
    /\b(wrong runway|wrong surface|selected wrong|wrong mode|lined up toward|lined up on|selection error)\b/i,
    /\b(pista errada|superf[ií]cie errada|selecionou errado|modo errado|alinhou para|erro de sele[cç][aã]o)\b/i,
  ],
  feedbackSubtype: [
    /\b(readback|communication breakdown|callout|feedback|cross-check)\b/i,
    /\b(readback|colacionamento|falha de comunica[cç][aã]o|callout|feedback|checagem cruzada)\b/i,
  ],
  timeManagementAction: [
    /\b(time pressure|rushed|late decision|urgency|schedule pressure)\b/i,
    /\b(press[aã]o de tempo|apressad[ao]|decis[aã]o tardia|urg[eê]ncia|press[aã]o de escala)\b/i,
  ],
  postEscapeOutcome: [
    /\b(crashed|collision|impact|injury|fatal|damage|loss of separation|runway excursion|afterward|subsequently)\b/i,
    /\b(colidiu|colis[aã]o|impacto|ferimento|fatal|dano|perda de separa[cç][aã]o|excurs[aã]o de pista|depois|posteriormente)\b/i,
  ],
  preconditionAsEscape: [
    /\b(precondition|underlying factor|organizational factor|maintenance context|training context)\b/i,
    /\b(precondi[cç][aã]o|fator subjacente|fator organizacional|contexto de manuten[cç][aã]o|contexto de treinamento)\b/i,
  ],
  oeCode: [/\bO-E\b/i],
  inventedQuestion: [
    /\b(reconstructed question|generic question|invented question|approximate question)\b/i,
    /\b(pergunta reconstru[ií]da|pergunta gen[eé]rica|pergunta inventada|pergunta aproximada)\b/i,
  ],
}

export function matchingConceptStatements(statements: string[], concept: SeraEvidenceConcept): string[] {
  const patterns = CONCEPT_PATTERNS[concept]
  return statements.filter((statement) => patterns.some((pattern) => pattern.test(statement)))
}

export function hasConcept(statements: string[], concept: SeraEvidenceConcept): boolean {
  return matchingConceptStatements(statements, concept).length > 0
}

export function collectConceptMatches(statements: string[], concepts: SeraEvidenceConcept[]): SeraConceptMatch[] {
  return concepts.flatMap((concept) =>
    matchingConceptStatements(statements, concept).map((statement) => ({
      statement,
      concept,
    })),
  )
}
