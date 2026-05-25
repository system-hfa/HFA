# SERA Engine vNext Real Event Held and Rework Register A4R123 v0.2.0

Status: HELD_AND_REWORK_REGISTER
Phase: A4+R-123
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objetivo
Registrar, em um único lugar, os eventos reais fora do bundle consolidado após A4R122 e as condições de reabertura.

| eventId | currentStatus | reasonHeld | possibleFutureUse | requiredConditionToReopen |
|---|---|---|---|---|
| ATLAS-3591 | PATCHED_REVIEW_REQUIRED | Ainda há fragilidade no A-axis e sensibilidade de escopo multi-actor, apesar do patch A4R120 | Alto valor para P-F/P-G somatogravic e boundary training | Refinamento adicional de actor scope e redução de incerteza A-axis com evidência mais granular |
| AMERICAN-1420 | REWORK_REQUIRED | Overclassification risk substantivo em P/O/A; patch A4R117 não encerra retrace | Pode voltar como caso útil de disciplina conservadora | Retrace específico com suporte robusto por eixo e sem fechamento forçado |
| ASIANA-214 | HOLD_OVERCLASSIFICATION_RISK | Risco metodológico persistente de fechamento agressivo | Boundary/teaching case para controle de overclassification | Reforço factual por eixo ou downgrade explícito para SOURCE_SLICE_REQUIRED/UNRESOLVED |
| AMERICAN-965 | HOLD_OVERCLASSIFICATION_RISK | Evidência atual não sustenta estabilidade de fechamento full-axis | Caso útil para treino de prudência classificatória | Melhora de evidência por eixo e redução de ambiguidade de dominância |
| HELIOS-522 | HELD_SOURCE_INSUFFICIENT / ACTOR_SCOPE_REQUIRED | Limite de fonte e escopo de capability/actor ainda não resolvidos | Pode cobrir capability/actor boundaries em fase futura | Fonte mais robusta e definição clara de tracedActor/escopo causal |
| USAIR-427 | HELD_TECHNICAL_DOMINANT | Janela efetiva humana muito curta; technical-dominant permanece dominante | Boundary anchor para evitar human-failure forcing | Nova evidência que altere materialmente a janela efetiva de ação humana |
| TUROY-EC225 | BOUNDARY_ONLY_TECHNICAL_DOMINANT | Predomínio técnico com baixa sustentação para fechamento humano dominante | Boundary case para governança de escopo | Evidência nova que sustente lane humana sem violar critério de dominância técnica |
| KOREAN-801 | BOUNDARY_ONLY_P_ONLY | Permanece boundary/P-only sem expansão robusta O/A no estado atual | Pode servir como caso de expansão O/A controlada em fase dedicada | Source-slice expansion dedicada para O/A com evidência suficiente |
| EASTERN-401 (old hold) | SUPERSEDED_HOLD | `HOLD_OCR_REQUIRED` antigo foi superseded por A4R121/A4R122 | Já reentrou no set consolidado warning-bound | Condição já atendida; segue em lane `READY_WITH_WARNINGS` |

## Nota
Este registro não promove nenhum evento para bundle nem para release. Ele apenas fixa o estado de hold/rework e as condições de reabertura.
