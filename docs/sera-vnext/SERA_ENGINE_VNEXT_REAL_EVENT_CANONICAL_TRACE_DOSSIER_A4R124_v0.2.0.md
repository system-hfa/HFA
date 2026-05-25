# SERA Engine vNext Real Event Canonical Trace Dossier A4R124 v0.2.0

Status: REAL_EVENT_CANONICAL_DOSSIER
Phase: A4+R-124
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
boundaryRule: `docs/sera-vnext/SERA_ENGINE_VNEXT_TRACE_BOUNDARY_PATH_AND_ACTOR_SCOPE_RULE_A4R120_v0.2.0.md`
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## UPS-1354

### 1. Status
- review status: `PASS_WITH_LIMITATIONS`
- warning-bound status: `OPUS_DOUBLE_COUNTING_WARNING_ACTIVE`
- source status: official NTSB TXT/PDF usable
- release status: `NO_RELEASE`
- downstream status: `NO_DOWNSTREAM`

### 2. Operational window analyzed
- janela factual analisada: aproximação noturna nonprecision runway 18, transição de perfil inválido/FMC para vertical speed, perda de gates de estabilização, ausência de callouts e alerta EGPWS.
- por que essa janela foi escolhida: é a janela onde percepção, objetivo e ação podem ser distinguidos com evidência observável no mesmo segmento operacional.
- ponto de fuga da operação segura: abaixo de 1.000 ft AFE com >1.000 fpm sem estabilização, e novamente no MDA sem level-off/callout.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | UPS-E2, UPS-E3 | Crença inicial de perfil válido de aproximação | — | — |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | NÃO | UPS-E3, UPS-E5 | Não reconhecimento de path inválido e falha de integração de gates | P-A | Não inferir de outcome |
| 3 | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | SIM | UPS-E3, UPS-E5, UPS-E6 | Cues e alertas estavam disponíveis | P-B, P-C | — |
| 4 | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | NÃO | UPS-E1, UPS-E5 | Pressão existia, mas não dominante no slice | P-D, P-E | — |
| 5 | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | SIM | UPS-E3 | Ambiguidade/ilusão do VDI/FMC é eixo forte | P-G | Boundary P-F/P-G vivo |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | UPS-E1, UPS-E2 | Objetivo de completar aproximação e pouso | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | UPS-E2, UPS-E5 | Objetivo inicial era operacionalmente legítimo | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | NÃO | UPS-E5 | Continuação abaixo dos gates tornou o objetivo não conservador | O-A | O-D não pode ser por proximidade ao acidente |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | UPS-E2, UPS-E4, UPS-E5 | Ações centradas em modo VS, monitoramento e descida | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | SIM | UPS-E4, UPS-E5 | Execução parece intencional, não apenas slip | A-C | — |
| 3 | A_CORRECT | A ação foi a correta ou adequada? | NÃO | UPS-E4, UPS-E5 | Estratégia inadequada para estado da aproximação | A-A | — |
| 4 | A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | SIM | UPS-E5, UPS-E6 | Capacidade e cues presentes no recorte | A-D, A-E | — |
| 5 | A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | NÃO_SELECAO | UPS-E5, UPS-E6 | Falha primária draft de seleção/continuação | A-G | Boundary A-F/A-G vivo |

### 6. Boundaries and warnings
- boundaries vivos: `P-F/P-G` e `A-F/A-G`.
- double-counting warning: `UPS-E5` não pode ser usado como chave única para P/O/A.
- source caveat: não crítico (fonte forte), mas exige separação por eixo.
- actor scope caveat: não há split actor exigido no draft atual.
- outcome-bias caveat: O-D e A-F não derivam do impacto, mas da sequência observável anterior.

### 7. Why this is not a release
- não há author decision registrada.
- não há `releasedCode`.
- não há downstream.
- artefato é `review-ready/warning-bound`, não classificação final.

---

## COLGAN-3407

### 1. Status
- review status: `PASS_WITH_LIMITATIONS` (A-axis em `REVIEW_REQUIRED` boundary)
- warning-bound status: boundary A-F/A-E ativo
- source status: official NTSB TXT/PDF usable
- release status: `NO_RELEASE`
- downstream status: `NO_DOWNSTREAM`

### 2. Operational window analyzed
- janela factual analisada: aproximação final com decaimento de velocidade, onset de stick shaker/autopilot disconnect e respostas subsequentes.
- por que essa janela foi escolhida: concentra sinais P/O/A no mesmo encadeamento temporal de baixa velocidade.
- ponto de fuga da operação segura: onset de shaker/disconnect e, secundariamente, fase de decaimento anterior.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | COL3407-E1, COL3407-E2, COL3407-E3 | Crença sobre estado de aproximação/energia | — | — |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | NÃO | COL3407-E2, COL3407-E3, COL3407-E6 | Cues de baixa energia não integrados a tempo | P-A | — |
| 3 | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | SIM | COL3407-E3, COL3407-E6 | Cues estavam presentes | P-B, P-C | — |
| 4 | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | NÃO | COL3407-E1, COL3407-E2 | Pressão não dominante no branch | P-D, P-E | — |
| 5 | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | NÃO | COL3407-E3, COL3407-E6 | Cues eram diretos (não ilusórios) | P-F | — |
| 6 | P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | SIM | COL3407-E3, COL3407-E6 | Branch de atenção com informação disponível | P-H | — |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | COL3407-E1, COL3407-E2 | Objetivo de completar ILS/pouso | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | COL3407-E1 | Objetivo inicial nominal | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | SIM | COL3407-E1 | O draft atual não sustenta falha de intenção independente | O-D | O-axis pode reabrir se evidência nova surgir |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | COL3407-E3, COL3407-E4, COL3407-E5 | Sequência de resposta ao shaker/pusher/flaps | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | SIM | COL3407-E4, COL3407-E5 | Inputs parecem executados intencionalmente | A-C | — |
| 3 | A_CORRECT | A ação foi a correta ou adequada? | NÃO | COL3407-E4, COL3407-E5 | Resposta inadequada ao estado de estol | A-A | — |
| 4 | A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | SIM | COL3407-E3, COL3407-E6 | Draft mantém capability presente no recorte | A-D, A-E | A-E permanece boundary live |
| 5 | A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | NÃO_SELECAO | COL3407-E4, COL3407-E5 | A-F draft branch | A-G | A-axis review-required A-F/A-E |

### 6. Boundaries and warnings
- boundaries vivos: `A-F/A-E`.
- double-counting warnings: separar cue de baixa velocidade (P) de resposta de controle (A).
- source caveats: fonte boa; cautela principal é interpretação de dominância A-F vs A-E.
- actor scope caveats: multi-crew, mas sem necessidade de split formal no draft atual.
- outcome-bias caveats: não classificar A/O pelo impacto final.

### 7. Why this is not a release
- sem decisão autoral.
- sem `releasedCode`.
- sem downstream.
- draft `review-ready/warning-bound`, não fechamento final.

---

## US-AIRWAYS-1549

### 1. Status
- review status: `PASS_WITH_LIMITATIONS` (nominal lane)
- warning-bound status: nominal com caveat de revisão
- source status: official NTSB TXT/PDF usable
- release status: `NO_RELEASE`
- downstream status: `NO_DOWNSTREAM`

### 2. Operational window analyzed
- janela factual analisada: pós-bird strike, perda de empuxo dual, avaliação de viabilidade de retorno e decisão de ditching.
- por que essa janela foi escolhida: é o segmento crítico para validar lane nominal P/O/A sob emergência real.
- ponto de fuga da operação segura: janela decisória em que retorno de pista se torna inviável e objetivo muda para pouso na água gerenciado.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | US1549-E1, US1549-E2, US1549-E5 | Reconhecimento de perda de empuxo e viabilidade de pista | — | — |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | SIM | US1549-E1, US1549-E2, US1549-E5 | Avaliação adequada do estado e das limitações | P failure leaves | Não confundir sucesso de outcome com prova única |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | US1549-E3, US1549-E4, US1549-E5 | Objetivo evolui para sobrevivência/ditching | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | US1549-E3, US1549-E5 | Objetivo conservador sob emergência | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | SIM | US1549-E5, US1549-E6 | Meta permaneceu gerenciando risco | O-D | — |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | US1549-E3, US1549-E6 | Ações coerentes com checklist/ditching | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | SIM | US1549-E3, US1549-E6 | Execução compatível com intenção | A-C, A-B | — |
| 3 | A_CORRECT | A ação foi a correta ou adequada? | SIM | US1549-E5, US1549-E6 | Seleção adequada sob constraints | A-F, A-G, A-E | Manter caveat non-dominant operacional |

### 6. Boundaries and warnings
- boundaries vivos: baixos; caso nominal draft.
- double-counting warnings: separar percepção de perda de empuxo (P) de seleção de ditching (O/A).
- source caveats: mínimos no recorte principal.
- actor scope caveats: gestão multi-crew, sem conflito de escopo no draft.
- outcome-bias caveats: resultado de sobrevivência não é gabarito automático de A-A.

### 7. Why this is not a release
- não houve author decision.
- não existe `releasedCode`.
- downstream permanece fechado.
- status é nominal draft review-ready, não referência final aprovada.

---

## UNITED-173

### 1. Status
- review status: `REVIEW_REQUIRED` com `KEEP_FOR_FUTURE_AUTHOR_REVIEW_WITH_OCR_WARNING`
- warning-bound status: OCR/source-quality caution ativa
- source status: official NTSB TXT usable com caveat OCR
- release status: `NO_RELEASE`
- downstream status: `NO_DOWNSTREAM`

### 2. Operational window analyzed
- janela factual analisada: troubleshooting de gear + progressiva degradação de combustível até transição tardia para execução de pouso.
- por que essa janela foi escolhida: concentra competição entre objetivo operacional legítimo inicial e falha de gerenciamento de risco na fase crítica.
- ponto de fuga da operação segura: momento em que avisos/estimativas de combustível exigiam abandono do troubleshooting e priorização imediata de pouso.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | U173-E1, U173-E2 | Crença mesclou foco em gear com risco de combustível crescente | — | OCR caution |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | NÃO | U173-E1, U173-E3 | Integração de risco de combustível foi insuficiente | P-A | — |
| 3 | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | SIM | U173-E1, U173-E2 | Informações e callouts estavam disponíveis | P-B, P-C | — |
| 4 | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | NÃO | U173-E2, U173-E3 | Pressão emergiu, mas informação permaneceu legível | P-D, P-E | P-D fica boundary live |
| 5 | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | NÃO | U173-E1, U173-E2 | Dados de combustível não eram inerentemente ambíguos | P-F | — |
| 6 | P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | SIM | U173-E1, U173-E2 | Branch de atenção/integração falha | P-H | OCR legibility mantém warning |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | U173-E4, U173-E5 | Objetivo inicial de resolver gear e pousar com configuração assegurada | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | U173-E4 | Objetivo inicial legítimo | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | NÃO | U173-E5 | Continuação tardia tornou meta não conservadora | O-A | O-D depende de legibilidade de sequência fuel/gear |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | U173-E6, U173-E7 | Ações de checklist/comunicação/preparo com transição tardia | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | SIM | U173-E6 | Ação intencional com possível priorização inadequada | A-C | — |
| 3 | A_CORRECT | A ação foi a correta ou adequada? | NÃO | U173-E6, U173-E7 | Estratégia inadequada no contexto fuel-critical | A-A | — |
| 4 | A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | SIM | U173-E6 | Capacidade não aparece como limitador primário | A-D, A-E | — |
| 5 | A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | NÃO_SELECAO | U173-E7 | Branch draft A-F | A-G | A-G permanece boundary live |

### 6. Boundaries and warnings
- boundaries vivos: `P-D`, `A-G`.
- double-counting warnings: evitar usar mesmas linhas de fuel-state para fechar simultaneamente P, O e A sem lógica separada.
- source caveats: OCR/source quality caution obrigatória.
- actor scope caveats: foco em crew combined, sem split per-actor nesta fase.
- outcome-bias caveats: O-D/A-F não vêm do desfecho, mas da continuidade observável.

### 7. Why this is not a release
- sem decisão autoral.
- sem `releasedCode`.
- sem downstream.
- permanece draft warning-bound para futura review lane.

---

## UNITED-232

### 1. Status
- review status: `PASS_WITH_LIMITATIONS` + `KEEP_FOR_FUTURE_AUTHOR_REVIEW_WITH_DISPLAY_WARNING`
- warning-bound status: nominal/adversarial display warning obrigatório
- source status: official NTSB TXT/PDF strong
- release status: `NO_RELEASE`
- downstream status: `NO_DOWNSTREAM`

### 2. Operational window analyzed
- janela factual analisada: pós-falha hidráulica catastrófica com perda de controlabilidade e formação de estratégia adaptativa por thrust differential.
- por que essa janela foi escolhida: permite testar lane nominal/adversarial com alta carga técnica sem colapsar para outcome bias.
- ponto de fuga da operação segura: transição inicial para estratégia coordenada de emergência sob limitações extremas.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | U232-E1, U232-E2 | Reconhecimento rápido da degradação severa de controle | — | — |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | SIM | U232-E1, U232-E2 | Avaliação coerente com estado observado | P-G | Não inferir por severidade do acidente |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | U232-E3, U232-E4 | Objetivo de pouso de emergência com sobrevivência | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | U232-E3 | Objetivo conservador frente à falha | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | SIM | U232-E3, U232-E4 | Branch nominal de intenção no recorte atual | O-D | Revisão pode reabrir se surgir evidência de drift de objetivo |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | U232-E5, U232-E6, U232-E7 | Estratégia adaptativa coordenada por thrust differential | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | SIM | U232-E5, U232-E6 | Implementação coerente com intenção emergencial | A-C, A-B | — |
| 3 | A_CORRECT | A ação foi a correta ou adequada? | SIM | U232-E6, U232-E7 | Adequação nominal sob constraints extremos | A-F | Warning nominal/adversarial obrigatório |

### 6. Boundaries and warnings
- boundaries vivos: `A-F` somente adversarial boundary.
- double-counting warnings: separar evidência de falha técnica (contexto) da adequação da ação humana (A).
- source caveats: não críticos; principal caveat é interpretação técnica-dominante.
- actor scope caveats: multi-crew com papel adaptativo; evitar narrativa heroica como prova.
- outcome-bias caveats: desfecho catastrófico não derruba automaticamente A-A.

### 7. Why this is not a release
- sem author decision.
- sem `releasedCode`.
- sem downstream.
- referência nominal/adversarial ainda warning-bound.

---

## EASTERN-401

### 1. Status
- review status: `REVIEW_AFTER_MINOR_PATCH_APPLIED`
- warning-bound status: `READY_WITH_WARNINGS` / `REVIEW_READY_WITH_WARNINGS`
- source status: official recovered TXT com `LEGACY_SCAN_LIMITED_LEGIBILITY`
- release status: `NO_RELEASE`
- downstream status: `CLOSED`

### 2. Operational window analyzed
- janela factual analisada: troubleshooting de gear-light na faixa de 2.000 ft com deriva de altitude não integrada e recuperação tardia.
- por que essa janela foi escolhida: concentra o conflito P/O/A com cues de altitude disponíveis e resposta incompleta.
- ponto de fuga da operação segura: onset do intervalo de alertas/cues de desvio de altitude durante troubleshooting.

### 3. Perception axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | START | E401-E1, E401-E2 | Crença ficou dominada por troubleshooting do gear | — | LEGACY_SCAN_LIMITED_LEGIBILITY |
| 2 | P_ASSESSMENT | Avaliação correta ou adequada da situação? | NÃO | E401-E1, E401-E2 | Tendência de descida não foi sustentadamente avaliada | P-A | — |
| 3 | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | SIM | E401-E1 | Cues de instrumentos presentes | P-B, P-C | — |
| 4 | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | NÃO | E401-E2 | Pressão não dominante no branch | P-D, P-E | — |
| 5 | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | NÃO | E401-E1 | Ambiguidade não dominante no recorte | P-F | P-F segue boundary live |
| 6 | P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | SIM | E401-E1 | Falha de integração atencional com informação disponível | P-H | — |

### 4. Objective axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | START | E401-E4, E401-E5 | Objetivo de resolver gear indication e retornar para pouso | — | — |
| 2 | O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | SIM | E401-E4 | Objetivo inicial legítimo | O-B, O-C | — |
| 3 | O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | NÃO | E401-E5 | Continuação na janela crítica com risco de altitude degradado | O-A | O-A só como alternativa early-phase |

### 5. Action axis canonical path
| step | nodeId | exactQuestionTextPT | answerSelected | evidenceRefs | rationale | alternativesRejected | warning |
|---:|---|---|---|---|---|---|---|
| 1 | A_ROOT | Como o operador estava tentando atingir o objetivo? | START | E401-E6, E401-E7 | Sequência inclui troubleshooting, redistribuição de tarefas e resposta incompleta | — | — |
| 2 | A_IMPLEMENTED | A ação foi implementada como pretendida? | NÃO_DESLIZE_LAPSO_ERRO | E401-E6, E401-E7 | Draft plausível de falha de implementação/recuperação tardia | A-F, A-G | A-axis permanece boundary-live |

### 6. Boundaries and warnings
- boundaries vivos: `P-F`, `A-F`, `A-G`.
- double-counting warnings: seção explícita de controle P/A evita usar núcleo factual único para fechar dois eixos sem rationale distinto.
- source caveats: `LEGACY_SCAN_LIMITED_LEGIBILITY` obrigatório.
- actor scope caveats: interpretação de integração de tarefas deve permanecer conservadora.
- outcome-bias caveats: O-D e A-C não são inferidos do crash; são inferidos da continuidade observável sob cues de altitude.

### 7. Why this is not a release
- não há decisão autoral.
- não há `releasedCode`.
- não há downstream.
- status é `review-ready/warning-bound` após patch, não fechamento final.
