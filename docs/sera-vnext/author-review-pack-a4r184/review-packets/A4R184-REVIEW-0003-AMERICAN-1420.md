# A4R184 Review Packet — A4R184-REVIEW-0003 — American 1420 LIT

Status: AUTHOR_REVIEW_PACKET_ACTIVE
reviewId: A4R184-REVIEW-0003
sourceDraftId: A4R183-DRAFT-0003
sourceA4R182Id: A4R182-DEC-0003
sourceA4R181Id: A4R181-ADJ-0003
eventKey: American 1420 LIT (MD-82, overrun em pouso, 1999)
methodology: SERA
notFinalClassification: true
poaClosureAllowed: false
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Ponto de fuga aprovado (A4R182)

> Continuação da aproximação final instável com perda de referência visual.

- **authorDecision A4R182:** APPROVED (sem ajuste estrutural)
- **escapePointId proposto:** AA1420-ESCAPE-001
- **Tipo de escopo:** Segmento operacional — continuação de aproximação com cues integrados de instabilidade presentes.
- **Nota de framing A4R182:** A assimetria de autospoilers e a dinâmica de rolagem pós-toque são consequência/agravamento operacional, não co-ponto de fuga. O escopo A4R181 está correto.

---

## 2. Ator aprovado

- **integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL
- **Composição:** captain + FO
- **actorSplitAllowedThisPhase:** false
- **Nota sobre contexto:** Despachante (sugestão de expedição) e ATC (vectors e avisos de windshear) são fatores de contexto operacional, não co-atores no EP.

---

## 3. Estado seguro imediatamente anterior

Aeronave vetorada para ILS pista 4R em Little Rock após perda inicial de referência visual na aproximação visual. ILS disponível e crew sob vectors ATC, com aproximação em progresso dentro do envelope de performance esperado antes da degradação final da referência visual.

**Âncoras:** AA1420-E3 (linhas 636–700); AA1420-E2 (linhas 580–626)

---

## 4. Transição para estado inseguro

No segmento final do ILS, comentários de CVR ("I can't see it", "off course") indicavam degradação de referência visual e posicionamento lateral incerto. O EGPWS gerou alerta "sink rate" em baixa altitude antes do touchdown, indicando perfil de descida acima dos parâmetros nominais. A aproximação prosseguiu sem comando de go-around coordenado.

**Âncora:** AA1420-E4 (linhas 740–774)

---

## 5. Evidências factuais disponíveis

| fragmentId | sourceAnchor | Fato factual | Confiança | Uso potencial |
|---|---|---|---|---|
| AA1420-A4R183-F1 | AA1420-E1 (530–545) | Despachante sugeriu expedir chegada por trovoadas | MEDIUM | Contexto de pressão operacional — NÃO EP primário |
| AA1420-A4R183-F2 | AA1420-E2 (580–626) | ATC reportou windshear/vento/visibilidade; crew discutiu crosswind limit sem verificar manual | HIGH | Contexto operacional; informação disponível não totalmente integrada |
| AA1420-A4R183-F3 | AA1420-E3 (636–700) | Crew perdeu contato visual; recebeu vectors para ILS 4R | HIGH | Estado seguro imediatamente anterior ao EP |
| AA1420-A4R183-F4 | AA1420-E4 (740–774) | Comentários "I can't see it" / "off course"; EGPWS "sink rate" antes do touchdown | HIGH | Ancora transição para estado inseguro e ato observável no EP |
| AA1420-A4R183-F5 | AA1420-E6 (790–806) | Flight spoilers não desplegaram simetricamente | HIGH | Consequência/agravamento técnico — NÃO co-EP |

---

## 6. Rationale descritivo A4R183 (não canônico — para referência)

**P (UNKNOWN):** Hipótese de que a tripulação integrada operava com referência visual degradada (confirmada pelos próprios comentários de CVR) e com informação de windshear ativo disponível, sem integrar esses cues em decisão coordenada de go-around antes do touchdown. O alerta EGPWS "sink rate" representava cue adicional disponível.

**O (UNKNOWN):** Hipótese de que o objetivo operacional da tripulação era completar o pouso em LIT naquele trecho, mantido apesar das condições adversas e da degradação de referência visual.

**A (UNKNOWN):** Hipótese de que a ausência de comando de go-around quando os cues integrados (comentários crew + EGPWS sink rate + windshear ativo) indicavam aproximação fora de parâmetros representa o componente de ação (omissão) no ponto de fuga.

---

## 7. Perguntas para decisão autoral

### Eixo P — Percepção

**P-1:** Os comentários de CVR "I can't see it" e "off course" (AA1420-E4, HIGH confidence) são âncoras diretas de percepção degradada suficientes para HYP_P-*? Ou a hipótese P requer adicionalmente demonstrar que essa percepção degradada não foi integrada como gatilho de go-around?

**P-2:** O autor deseja ampliar o P-axis para incluir a não-integração do aviso de windshear (AA1420-E2) e a não-verificação do crosswind limit como elementos paralelos à perda de referência visual? Ou manter uma hipótese P única centrada na perda visual?

**P-3:** O EGPWS "sink rate" (AA1420-E4) deve suportar o P-axis (cue disponível não integrado) ou o A-axis (cue disponível que deveria ter desencadeado ação) — ou ambos com racional distinto?

### Eixo O — Objetivo

**O-1:** O objetivo de completar o pouso em LIT é evidenciado pelo comportamento observado (não go-around). Isso constitui base para HYP_O-* — capturando o objetivo mantido apesar da degradação — ou é melhor deixar em UNKNOWN porque o objetivo em si não era incompatível com operação segura em condições normais?

**O-2:** A pressão do despachante (AA1420-E1) integra o O-axis como fator de objetivo operacional, ou permanece como contexto externo sem peso canônico?

### Eixo A — Ação

**A-1:** Qual altitude ou momento específico o autor considera como "janela de go-around com margem operacional disponível"? Essa âncora é necessária para especificar o A-axis com precisão operacional.

**A-2:** O autor confirma que a assimetria de autospoilers (AA1420-E6, F5) deve permanecer como consequência/agravamento técnico, fora do A-axis primário?

### Outros elementos

**C-1:** O autor deseja registrar a sugestão de expedição do despachante (AA1420-E1, F1) como fator contextual formal com ID de contribuição, ou apenas como nota operacional?

**EP-1:** O autor aprova `AA1420-ESCAPE-001` como identificador único para este escopo?

---

## 8. Opções autorais por eixo

### Eixo P
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN + AJUSTO → HYP_P-* | CVR comments "I can't see it" são âncoras factuais diretas de HIGH confidence; perda de referência visual é factualmente âncorável. Candidato disponível para revisão autoral. |
| CONFIRMO UNKNOWN | Manter UNKNOWN se o autor quiser separar "perda de referência" (percepção degradada) de "não-integração como gatilho de go-around" (processo de integração) |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar evidência que distingue percepção degradada de não-integração como gatilho |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONSERVATIVE_UNKNOWN_RECOMMENDED — risco de double-count com A-axis não resolvido (EGPWS sink rate suportando P e A); manter UNKNOWN até decisão autoral sobre separação dos eixos.

### Eixo O
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — objetivo de completar o pouso não era em si operacionalmente incompatível; pressão do despachante não confirmada como código O-axis |
| AJUSTO → HYP_O-* | Propor código canônico específico se o autor considerar que a persistência do objetivo apesar da degradação é hipótese O distinta |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN.

### Eixo A
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — janela de go-around (altitude/timestamp) não está especificada; sem essa âncora A-axis fica sem especificidade operacional |
| AJUSTO → HYP_A-* | Propor código canônico específico se o autor definir explicitamente a altitude/janela de go-around disponível |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar altitude em que go-around era factualmente disponível com margem suficiente |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** PRECISO_DE_MAIS_EVIDENCIA ou CONFIRMO UNKNOWN.

---

## 9. Riscos de erro por eixo

| Eixo | Risco | Sinal de alerta |
|---|---|---|
| P | Double-count: EGPWS sink rate suporta tanto P (cue não integrado) quanto A (ação não executada) sem racional distinto | F4 aparece na justificativa de P e A sem diferenciação |
| O | Importar pressão do despachante como código fechado O-axis sem evidência factual direta de violação de objetivo operacional nominal | O-axis sem fragmentId de F1 como âncora direta de objetivo |
| A | Migrar A-axis para assimetria de autospoilers pós-toque (F5) como ação humana primária | EP migra para pós-touchdown; violação do escopo aprovado |
| A | Usar o overrun como evidência retroativa de que a janela de go-around existia (outcome bias) | Sem âncora de altitude; A-axis ancorado no resultado |
| Geral | Usar fadiga/duty time como código SERA sem evidência factual direta | Rótulo contextual elevado a código P/O/A |

---

## 10. Recomendação conservadora do pacote

Manter UNKNOWN nos 3 eixos nesta fase (CONSERVATIVE_UNKNOWN_RECOMMENDED em P e O; NEEDS_MORE_EVIDENCE em A). O P-axis tem suporte factual razoável (CVR comments HIGH confidence), mas o risco de double-count com o A-axis (EGPWS sink rate suportando ambos) não está resolvido. O A-axis requer identificação da janela de go-around (altitude/timestamp) antes de ser proposto com especificidade operacional. O O-axis provavelmente permanece UNKNOWN.

Esta recomendação é do pacote de revisão. A decisão final é exclusivamente autoral.

---

## 11. Locks de não fechamento

- `NOT_FINAL_P_O_A` — nenhuma hipótese neste pacote fecha P, O ou A.
- `NOT_RELEASED_CODE` — nenhum código liberado criado.
- `NOT_FOR_FIXTURE` — nenhuma fixture criada ou alterada.
- `NOT_FOR_BASELINE` — nenhum baseline criado ou alterado.
- `NOT_DOWNSTREAM` — nenhum downstream criado.
- `notFinalClassification: true`
- `poaClosureAllowed: false`
- `dualAuthorReviewRequired: true`
