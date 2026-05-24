# SERA Engine vNext Real Event Uncertainty Reduction Matrix A4R70 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-70 — Controlled Uncertainty Reduction Pack  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Mapear, por caso/eixo, quais incertezas impedem avanço metodológico controlado e qual evidência adicional seria necessária para reduzir ambiguidade sem overclassification.

## Tabela por caso/eixo
| caseId | axis | current draft | uncertainty level | dominant uncertainty reason | evidence needed | likely next action | canReduceNow | risk of overclassification if forced |
|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-ADJUDICATION-001 | P | P-G | MEDIUM | fronteira fina entre monitoramento degradado e cadeia comunicacional | refinamento temporal de monitoração PF/PM e callouts associados ao estado de energia | manter P-G draft e revalidar com evidência temporal adicional | partial | MEDIUM |
| REAL-EVENT-ADJUDICATION-001 | O | O-A | LOW/MEDIUM | baixa evidência de intenção desviante, mas com ambiguidade operacional residual | evidência adicional de framing decisório no momento da transição IFR->visual | manter O-A draft com nota de rastreabilidade | yes | LOW |
| REAL-EVENT-ADJUDICATION-001 | A | UNRESOLVED | HIGH | insufficient_pf_pm_decomposition e ausência de mecanismo ativo discriminado | decomposição PF/PM, callouts, inputs de controle, monitoramento cruzado e timing de correção | manter narrativa guardada e A unresolved até evidência mecanística | partial | HIGH |
| REAL-EVENT-ADJUDICATION-002 | P | UNRESOLVED | HIGH | warning_or_alert_mechanism_unclear (warning emitido sem mecanismo de não percepção discriminado) | cadeia de warning EGPWS, percepção efetiva, carga atencional e interpretação no trecho crítico | manter hold unresolved e coletar evidência focal de percepção | partial | HIGH |
| REAL-EVENT-ADJUDICATION-002 | O | O-A | MEDIUM | objetivo protetivo plausível, porém contexto sem rota de go-around robusta | evidência de briefing/planejamento da descontinuação e critérios de decisão | manter O-A draft com ressalva de robustez | partial | MEDIUM |
| REAL-EVENT-ADJUDICATION-002 | A | UNRESOLVED | HIGH | ambiguidade entre execução ativa insegura e limitação de planejamento/rota | trajetória detalhada da arremetida, go-around route/procedure e coordenação PF/PM | manter A unresolved; não fechar ação sem decomposição | partial | HIGH |
| REAL-EVENT-ADJUDICATION-003 | P | UNRESOLVED | HIGH | papel do alerta sonoro e mecanismo perceptivo não discriminados | cadeia de monitoramento vertical e papel factual do alerta sonoro no instante crítico | manter P unresolved sem inferir falha perceptiva automática | partial | HIGH |
| REAL-EVENT-ADJUDICATION-003 | O | O-A | MEDIUM | objetivo de treinamento SAR plausível com ambiguidade operacional residual | evidência adicional de brief/objetivo operacional no exercício | manter O-A draft | partial | MEDIUM |
| REAL-EVENT-ADJUDICATION-003 | A | UNRESOLVED | HIGH | multi_actor_not_decomposed (PF/PM/mission crew) | separação robusta de papéis PF/PM/mission crew e sequência de controle vertical | manter hold unresolved e evitar fechamento prematuro | partial | HIGH |
| REAL-EVENT-READJUDICATION-004-A4R68 | P | UNRESOLVED | HIGH | technical_failure_dominant com mecanismo perceptivo humano não demonstrado | timeline fina de percepções/sinais e avaliação de alternativas técnicas durante anomalia | manter P unresolved em narrativa guardada | partial | HIGH |
| REAL-EVENT-READJUDICATION-004-A4R68 | O | O-A | MEDIUM | objetivo de contenção/segurança dominante, sem evidência de intenção desviante | evidência complementar de decision points e prioridade operacional em emergência | manter O-A draft com rastreabilidade de decisão | yes | LOW/MEDIUM |
| REAL-EVENT-READJUDICATION-004-A4R68 | A | UNRESOLVED | HIGH | ausência de timeline checklist/resets/comandos e limiar de inevitabilidade vs escolha do ditching | timeline operacional mecanística (checklist/resets/decision points) e separação falha técnica vs resposta humana | manter A unresolved até decomposição suficiente | partial | HIGH |
| REAL-EVENT-TRIAGE-005 | P | UNRESOLVED | HIGH | source_partial sem base primária mínima | relatório oficial primário com locator verificável e fragmentos factuais por eixo | manter triage-only | no | HIGH |
| REAL-EVENT-TRIAGE-005 | O | UNRESOLVED | HIGH | source_partial sem framing operacional confiável | cronologia solo-ar e contexto decisório primário | manter triage-only | no | HIGH |
| REAL-EVENT-TRIAGE-005 | A | UNRESOLVED | HIGH | source_partial + multi-actor sem decomposição | layout/obstáculo, coordenação solo-ar e separação factual de atores | manter triage-only | no | HIGH |

## Leitura por caso
### 001
- Maior gap: eixo A.
- A narrativa guardada permanece válida sem liberar A.
- Redução agora é parcial e depende de decomposição PF/PM e timing de correção.

### 002
- P/A permanecem ambíguos.
- O-A pode permanecer draft, com ressalva explícita de robustez.
- Redução agora é parcial e depende da cadeia warning/go-around.

### 003
- P/A permanecem ambíguos.
- Ausência de alerta sonoro não deve ser convertida automaticamente em falha humana.
- Redução agora é parcial e depende da separação PF/PM/mission crew.

### 004
- P/A seguem unresolved com dominância técnica mantida.
- Narrativa guardada permanece válida sem release.
- Redução agora é parcial e depende de timeline mecanística de emergência.

### 005
- Mantido em backlog `TRIAGE_ONLY` por `SOURCE_PARTIAL`.
- Não foi encontrada fonte primária completa no repositório para saída de triage nesta fase.
