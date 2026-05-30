# A4R183 Draft — A4R183-DRAFT-0003 — American 1420 LIT

Status: SCOPE_NORMALIZED_ADJUDICATION_DRAFT
draftId: A4R183-DRAFT-0003
sourceA4R181Id: A4R181-ADJ-0003
sourceA4R182Id: A4R182-DEC-0003
eventKey: American 1420 LIT (MD-82, overrun em pouso, 1999)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
notFinalClassification: true
poaClosureAllowed: false

---

## 1. Identificação do evento

American Airlines 1420, MD-82, vôo DFW → Little Rock (LIT), 1 jun 1999. Último trecho do duty cycle da tripulação. Pouso em condições de tempestade convectiva com windshear, resultando em overrun após touchdown.

---

## 2. Fontes internas lidas

- `A4R180-EXTRACTION-0003.md` — extração estruturada completa (seções 1–17)
- `AUTHOR_DECISION_PACKET_A4R181_0003_AMERICAN-1420.md` — dossiê autoral BATCH_A
- `SERA_REAL_EVENT_AUTHOR_DECISION_INTAKE_A4R182_v0.2.0.md` — decisão autoral A4R182
- `SERA_REAL_EVENT_AUTHOR_DECISION_CHANGE_REGISTER_A4R182_v0.2.0.md` — change register (sem ajuste estrutural para este caso)
- sourceAnchors utilizados: AA1420-E1, AA1420-E2, AA1420-E3, AA1420-E4, AA1420-E5, AA1420-E6

---

## 3. Decisão autoral A4R182 usada

- **sourceA4R182Id:** A4R182-DEC-0003
- **authorDecision:** APPROVED
- **escapePointAdjustmentRequired:** false
- **Nota:** Escopo aprovado sem ajuste estrutural. A assimetria de spoilers e a dinâmica de rolagem pós-toque são consequência/agravamento operacional, não co-ponto de fuga.

---

## 4. Ponto de fuga autoral normalizado

> Continuação da aproximação final instável com perda de referência visual.

**Tipo de escopo:** Segmento operacional (continuação de aproximação com cues integrados de instabilidade presentes).

**Regra de ponto de fuga único:** Um único escapePointId para este escopo. O overrun pós-touchdown, a assimetria de spoilers e as condições meteorológicas são consequência/agravamento. A pressão de despachante (expedir chegada) é contexto pré-operacional.

---

## 5. Estado seguro imediatamente anterior

Aeronave vetorada para ILS pista 4R em Little Rock após perda inicial de referência visual na aproximação visual. ILS disponível e crew sob vectors ATC, com aproximação em progresso dentro do envelope de performance esperado antes da degradação final da referência visual.

**Âncora factual:** AA1420-E3 (linhas 636–700) — crew perdeu contato visual, foi vetorada para ILS 4R e retomou aproximação instrumentada; AA1420-E2 (linhas 580–626) — avisos de windshear recebidos do ATC.

---

## 6. Transição para estado inseguro

No segmento final do ILS, comentários de CVR ("I can't see it", "off course") indicavam degradação de referência visual e posicionamento lateral incerto. O EGPWS gerou alerta "sink rate" em baixa altitude antes do touchdown, indicando perfil de descida acima dos parâmetros nominais para pouso. A aproximação prosseguiu sem comando de go-around coordenado.

**Âncora factual:** AA1420-E4 (linhas 740–774) — comentários "off course" e "I can't see it"; EGPWS "sink rate" antes do touchdown.

---

## 7. Ato/condição insegura observável no ponto de fuga

Continuação da aproximação final com perda de referência visual confirmada verbalmente pelos pilotos, EGPWS sink rate ativo e condições de windshear conhecidas, sem decisão de go-around coordenada antes do touchdown.

**Âncora factual:** AA1420-E4 — comentários de dificuldade visual e EGPWS sink rate; AA1420-E2 — avisos de windshear previamente recebidos; AA1420-E5 — touchdown sob condições de windshear ativa.

---

## 8. Ator operacional integrado

**integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL

Tripulação: captain e FO operando como bloco. Não se aplica split PF/PM nesta fase (`actorSplitAllowedThisPhase=false`). Influências contextuais (despachante — sugestão de expedir chegada; ATC — vectors e avisos de windshear) são fatores de contexto operacional, não co-atores no ponto de fuga.

---

## 9. Evidências factuais extraídas

| fragmentId | sourceAnchor | Fato factual | Uso no draft |
|---|---|---|---|
| AA1420-A4R183-F1 | AA1420-E1 (530–545) | Despachante sugeriu expedir chegada por trovoadas | Contexto de pressão operacional — não EP |
| AA1420-A4R183-F2 | AA1420-E2 (580–626) | ATC reportou windshear/vento/visibilidade; crew discutiu crosswind limit sem verificar manual | Contexto operacional; informação disponível não totalmente integrada |
| AA1420-A4R183-F3 | AA1420-E3 (636–700) | Crew perdeu contato visual; recebeu vectors para ILS 4R | Estado seguro imediatamente anterior ao EP |
| AA1420-A4R183-F4 | AA1420-E4 (740–774) | Comentários "I can't see it" / "off course"; EGPWS "sink rate" | Ancora a transição para estado inseguro e ato observável no EP |
| AA1420-A4R183-F5 | AA1420-E6 (790–806) | Flight spoilers não desplegaram simetricamente | Consequência/agravamento técnico — posterior ao EP |

---

## 10. Hipótese preliminar de Percepção (HYP_P)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a tripulação integrada operava com referência visual degradada (perda confirmada pelos próprios comentários de CVR) e com informação de windshear ativo disponível, sem integrar esses cues em decisão coordenada de go-around antes do touchdown. O alerta EGPWS "sink rate" representava cue adicional disponível.

**Confiança:** MEDIUM (comentários "I can't see it"/"off course" são âncoras factuais diretas de CVR com HIGH confidence na extração; a integração ou não desses cues como gatilho de go-around permanece hipótese).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 11. Hipótese preliminar de Objetivo (HYP_O)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que o objetivo operacional da tripulação era completar o pouso em LIT naquele trecho, mantido apesar das condições adversas e da degradação de referência visual.

**Confiança:** MEDIUM (objetivo de completar o pouso é consistente com o comportamento observado; a extração nota pressão de despachante e ciclo de duty como contexto, mas não como evidência direta de violação de objetivo operacional nominal).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`. Não importar pressão de despachante como código fechado de O-axis.

---

## 12. Hipótese preliminar de Ação (HYP_A)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a ausência de comando de go-around quando os cues integrados (comentários crew + EGPWS sink rate + windshear ativo) indicavam aproximação fora de parâmetros representa o componente de ação (omissão) no ponto de fuga.

**Confiança:** MEDIUM (ausência de go-around é factualmente documentada — a aeronave prosseguiu até o touchdown; o momento exato de "janela de go-around com margem suficiente" requer verificação de altitude/velocidade em A4R184).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 13. Lacunas e riscos

**L1 — Separação componente operacional vs técnico:** A assimetria de spoilers no rolamento pós-toque é confirmada pelo FDR (AA1420-E6). Deve permanecer como consequência técnica/agravamento, não como co-ponto de fuga. Em A4R184, certificar-se de que o A-axis não migra para incluir a falha de autospoiler como ação humana primária.

**L2 — Crosswind limit não verificado:** A extração nota que a tripulação discutiu o crosswind limit mas não verificou o valor exato no manual para pista molhada (AA1420-E2). Este fato pode suportar P-axis complementar (informação disponível não integrada), mas requer cautela para não double-count com a hipótese descritiva de perda de referência visual.

**L3 — Duty time e fadiga:** A extração registra que era o último trecho do duty cycle. Não usar fadiga como código SERA sem evidência factual direta; registrar como contexto operacional apenas.

**R1 — Risco de double-count de fatos:** O EGPWS sink rate pode suportar tanto P-axis (cue disponível não integrado) quanto A-axis (ação esperada não executada). Em A4R184, resolver qual axis cada fragmento suporta com racional distinto para evitar double-count.

**R2 — Risco de incluir overrun como prova de EP:** O overrun é consequência factual; o EP normalizado é na continuação da aproximação antes do touchdown.

---

## 14. Perguntas para revisão autoral A4R184

1. **P-axis:** A hipótese descritiva de perda de referência visual está adequadamente âncorável nos comentários de CVR? O autor deseja ampliar para incluir a não-integração do aviso de windshear como elemento paralelo, ou manter separado?
2. **A-axis:** Qual momento específico (altitude/fase) o autor considera como "janela de go-around com margem operacional disponível"? Isso ancora o A-axis de forma mais precisa.
3. **Spoilers:** O autor confirma que a assimetria de autospoilers (AA1420-E6) deve permanecer como consequência/agravamento técnico, fora do A-axis primário?
4. **Despachante:** O autor deseja registrar a sugestão de expedição (AA1420-E1) como fator contextual formal (com ID de contribuição) ou apenas como nota operacional?
5. **escapePointId:** O autor aprova `AA1420-ESCAPE-001` como identificador único para este escopo?

---

## 15. Locks de não fechamento

- `NOT_FINAL_P_O_A` — nenhuma hipótese neste draft fecha P, O ou A.
- `NOT_RELEASED_CODE` — nenhum código liberado criado.
- `NOT_FOR_FIXTURE` — nenhuma fixture criada ou alterada.
- `NOT_FOR_BASELINE` — nenhum baseline criado ou alterado.
- `NOT_DOWNSTREAM` — nenhum downstream criado.
- `notFinalClassification: true`
- `poaClosureAllowed: false`
- `dualAuthorReviewRequired: true`
