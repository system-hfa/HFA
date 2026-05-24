# Canonical Withdrawn / Boundary Reference Pack — P-Axis A4+R-102

## 1. Header
- referencePackId: RC-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102
- methodology: SERA
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- validationChecklist: SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md
- referenceType: WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE
- cases: REAL-EVENT-0015, N109W, N11NM
- status: CANONICAL_BOUNDARY_REFERENCE_DRAFT
- frontendUse: NOT_READY_AUTHOR_REVIEW_REQUIRED
- notFor: final accident conclusion, blame, HFACS, Risk/ERC, recommendations

## 2. Why this pack exists
- Três pilot releases do eixo P foram retirados por revisão autoral em A4R92.
- A retirada foi controle metodológico para evitar manutenção de classificação fraca.
- Este pack preserva calibração negativa: quando retornar para `P_UNRESOLVED` é tecnicamente mais seguro do que forçar P-G/P-C.
- O objetivo é disciplinar fronteiras, não criar nova análise causal.

## 3. Canonical asset preflight
| assetFile | coverageMatrixFile | checklistFile | requiredCodes | requiredNodes | missingNodeStatus | rebuildAllowed | limitations |
|---|---|---|---|---|---|---|---|
| `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md` | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md` | `P-G`, `P-C`, `P_UNRESOLVED` boundary usage | `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE` | none | true | boundary pack does not assert positive P release for withdrawn trio |

## 4. Case A — REAL-EVENT-0015
- caseId: REAL-EVENT-0015
- previousReleasedCode: P-G
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED
- canonicalStatus: WITHDRAWN_BOUNDARY_REFERENCE
- factualSummary: PH-KHB S-76B em aproximação offshore noturna após go-around; segunda aproximação com degradação de energia/altura e impacto na água.
- whyItInitiallyLookedLikePG: ambiente dark-night com baixa referência visual e sinais de degradação de monitoramento no trecho final.
- authorReasonForWithdrawal: o evento parece mais compatível com ação inadequada/gerenciamento de energia e incapacidade, tempo insuficiente ou habilidade insuficiente para corrigir; parâmetros errados provavelmente foram percebidos, logo não há sustentação suficiente para manter P-G.
- canonicalTreeUse: perguntas canônicas da árvore P foram usadas como limite metodológico para não manter código positivo sem dominância perceptiva sustentada.
- nodesConsideredFromAsset: `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_INFORMATION_AVAILABLE`.
- exactQuestionTextPT:
  - `O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?`
  - `Avaliação correta ou adequada da situação?`
  - `Possuía a capacidade necessária para sentir e perceber a situação?`
  - `A informação estava disponível e correta?`
- exactQuestionTextENAnchor:
  - `What did the operator or crewmember believe was the state of the world with respect to the goal(s)?`
  - `Correct or adequate assessment of the situation?`
  - `Had the pre-requisite capability to sense and perceive the situation?`
  - `Information available and correct?`
- answerOptionSelected: not asserted for positive release in this boundary pack.
- whyPositivePReleaseIsNotSupported: evidência local não sustenta dominância de falha perceptiva P-G sobre mecanismo ação/energia/recuperação tardia.
- evidenceRefs:
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-005.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-005.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_WITHDRAWAL_A4R92_v0.2.0.md`
- limitations: sequência PF/PNF e decomposição fina de inputs/callouts permanece parcial.
- quarantine: conclusões externas e linguagem de causa provável permanecem fora do answer key SERA.
- boundaryLesson: resultado severo com referência visual degradada não autoriza manter P-G automaticamente.
- frontendNote: mostrar “antes P-G / depois withdrawn para P_UNRESOLVED” com ênfase em disciplina de fronteira.

## 5. Case B — N109W
- caseId: N109W
- previousReleasedCode: P-G
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED
- canonicalStatus: WITHDRAWN_BOUNDARY_REFERENCE
- factualSummary: A109A II em voo VFR em área montanhosa com meteorologia em deterioração e impacto em terreno.
- whyItInitiallyLookedLikePG: contexto de monitoramento terreno/meteo com continuidade em condições degradadas.
- authorReasonForWithdrawal: condições meteorológicas degradadas alteraram as fontes adequadas para percepção; a falha parece mais ligada a processar/usar instrumentos em contexto degradado, não a simples monitoramento situacional normal P-G.
- canonicalTreeUse: árvore canônica usada para bloquear simplificação indevida de P-G quando o regime de fontes perceptivas está alterado.
- nodesConsideredFromAsset: `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE`.
- exactQuestionTextPT:
  - `O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?`
  - `Avaliação correta ou adequada da situação?`
  - `Possuía a capacidade necessária para sentir e perceber a situação?`
  - `A informação era ilusória ou ambígua?`
  - `A informação estava disponível e correta?`
- exactQuestionTextENAnchor:
  - `What did the operator or crewmember believe was the state of the world with respect to the goal(s)?`
  - `Correct or adequate assessment of the situation?`
  - `Had the pre-requisite capability to sense and perceive the situation?`
  - `Information illusory or ambiguous?`
  - `Information available and correct?`
- answerOptionSelected: not asserted for positive release in this boundary pack.
- whyPositivePReleaseIsNotSupported: não há fechamento robusto para manter P-G em cenário com fontes perceptivas não normais e sem evidência suficiente para alternativa específica.
- evidenceRefs:
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-008.md`
  - `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-008.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_WITHDRAWAL_A4R92_v0.2.0.md`
- limitations: cadeia detalhada de processamento instrumental/mode-state não está completamente fechada na base atual.
- quarantine: narrativas externas de causalidade não são usadas como resposta de árvore.
- boundaryLesson: meteorologia degradada muda o regime de fontes e exige prudência contra overclassification em P-G.
- frontendNote: exibir como boundary de “weather-source regime shift”, não como prova de causa final.

## 6. Case C — N11NM
- caseId: N11NM
- previousReleasedCode: P-C
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED
- canonicalStatus: WITHDRAWN_BOUNDARY_REFERENCE
- factualSummary: AW109S em contexto noturno IMC durante missed approach com desestabilização de atitude/energia e dinâmica de LOC.
- whyItInitiallyLookedLikePC: narrativa de automação/modo e interpretação de estado no cockpit sugeria fronteira de conhecimento/percepção.
- authorReasonForWithdrawal: não há prova direta de déficit técnico de capacidade/conhecimento para perceber/processar a situação; ambiente degradado e provável desorientação não sustentam P-C sem evidência adicional de confusão de sistema, modo, automação, configuração ou conhecimento técnico.
- canonicalTreeUse: a árvore canônica foi usada para impedir manutenção de P-C sem evidência de limiar específico do nó de capacidade/conhecimento.
- nodesConsideredFromAsset: `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`.
- exactQuestionTextPT:
  - `O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?`
  - `Avaliação correta ou adequada da situação?`
  - `Possuía a capacidade necessária para sentir e perceber a situação?`
- exactQuestionTextENAnchor:
  - `What did the operator or crewmember believe was the state of the world with respect to the goal(s)?`
  - `Correct or adequate assessment of the situation?`
  - `Had the pre-requisite capability to sense and perceive the situation?`
- answerOptionSelected: not asserted for positive release in this boundary pack.
- whyPositivePReleaseIsNotSupported: contexto IFR/fog/desorientação não demonstra sozinho o requisito probatório para P-C e não autoriza substituição automática por outro P positivo.
- evidenceRefs:
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-009.md`
  - `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-009.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_WITHDRAWAL_A4R92_v0.2.0.md`
- limitations: evidência de mismatch técnico de modo/sistema/configuração permanece insuficiente para limiar P-C.
- quarantine: probable cause/recommendations externas não entram como evidência decisória de nó.
- boundaryLesson: desorientação e severidade operacional não substituem prova de mecanismo específico para P-C.
- frontendNote: exibir como “threshold discipline case”, com retirada como melhoria metodológica.

## 7. Cross-case canonical lessons
- Resultado ruim não prova P-G.
- Evento action-dominant não deve virar P-G por atalho.
- Meteorologia degradada muda as fontes adequadas de percepção.
- Desorientação não prova P-C.
- IFR/fog/loss of control não é atalho para P-C.
- `UNRESOLVED` é decisão válida.
- Withdrawal é controle metodológico.
- A árvore SERA impede overclassification.

## 8. Evidence/quarantine table
| evidenceId | caseId | factualElement | source | supportsBoundaryFinding | limitation | quarantineNote |
|---|---|---|---|---|---|---|
| BND-EV-001 | REAL-EVENT-0015 | segunda aproximação noturna com degradação de energia/altura e impacto na água | `real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-005.md` | sim | sequência fina PF/PNF parcialmente reconstruída | sem import de causa provável |
| BND-EV-002 | REAL-EVENT-0015 | revisão autoral retirou P-G e retornou para unresolved | `SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md` | sim | revisão documental, sem release novo | sem uso de conclusão externa como answer key |
| BND-EV-003 | N109W | continuação VFR em meteo degradada com conflito de terreno | `real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-008.md` | sim | cadeia instrumental detalhada incompleta | sem import de causa provável |
| BND-EV-004 | N109W | retirada de P-G por mudança de regime de fontes perceptivas | `SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md` | sim | revisão documental, sem novo julgamento de eixo A/O | sem uso de texto externo como gabarito |
| BND-EV-005 | N11NM | contexto noturno IMC/missed approach com instabilidade de atitude/energia | `real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-009.md` | sim | insuficiência para prova direta de limiar P-C | sem import de causa provável |
| BND-EV-006 | N11NM | retirada de P-C por ausência de prova direta de déficit técnico | `SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md` | sim | revisão documental, sem reclassificação positiva | sem uso de conclusão externa como answer key |

## 9. Front-end display guidance
- usar como “Boundary calibration” apenas após author review;
- mostrar antes/depois (pilot release retirado -> `P_UNRESOLVED`);
- mostrar por que retirar foi metodologicamente melhor;
- não mostrar como erro operacional simplificado;
- não mostrar como causa final do acidente;
- não abrir HFACS/Risk/ERC/recommendations.

## 10. Validation checklist result
- usesCanonicalAsset: yes
- exactQuestionTextPT: yes
- exactQuestionTextENAnchor: yes
- allAnswerOptionsInAsset: yes (where explicitly asserted)
- noGenericQuestions: yes
- noSeraCeraTerminology: yes
- noActiveOE: yes
- noDownstream: yes
- validationStatus: REVIEW_REQUIRED

## Boundary scope guardrails
- No novo release.
- Nenhuma restauração automática de release retirado.
- Nenhuma criação de O/A release.
- Nenhuma redução de `UNRESOLVED`.
