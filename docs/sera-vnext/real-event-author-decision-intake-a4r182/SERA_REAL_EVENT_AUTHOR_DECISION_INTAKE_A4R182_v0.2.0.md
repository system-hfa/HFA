# SERA Real Event Author Decision Intake A4R182 v0.2.0

Status: AUTHOR_DECISION_INTAKE_REGISTERED
Phase: A4+R-182
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
sourcePhase: A4R181

## 1. Objetivo

A4R182 registra as decisões autorais sobre escopo de ponto de fuga e modelo de ator para os 5 casos BATCH_A adjudicados em A4R181. Estas decisões são do tipo AUTHOR_SCOPE_DECISION_ONLY: delimitam o escopo metodológico para a próxima fase de draft de adjudicação normalizado (A4R183), sem fechar P/O/A, sem criar código liberado, sem promover fixture ou baseline.

## 2. Locks (esta fase não faz)

- Não fecha P, O ou A.
- Não cria selectedCode com status fechado.
- Não cria código liberado.
- Não cria fixture nem baseline.
- Não altera runner oficial, motor SERA, runtime, arquivos .ts.
- Não cria recomendações, HFACS, Risk/ERC, ARMS/ERC, finalConclusion, downstream.
- Não chama LLM/API externa.
- Não importa conclusão de relatório externo (NTSB/TSB) como código SERA.
- Não inventa fatos ausentes.

## 3. Natureza das decisões registradas

Todas as 5 decisões são classificadas como `decisionType: AUTHOR_SCOPE_DECISION_ONLY`. Isso significa:

- O escopo de ponto de fuga aprovado pelo autor é um marcador de ancoragem metodológica para A4R183.
- O modelo de ator aprovado (`CREW_INTEGRATED_ACTOR_MODEL`) é o enquadramento operacional para essa fase.
- Nenhuma dessas decisões fecha P, O ou A; `notFinalClassification=true` permanece em todos os 5 casos.
- Ajustes de ponto de fuga (casos Asiana, Comair, UPS) substituem as formulações mais amplas de A4R181 para fins de A4R183.
- Aprovações sem ajuste estrutural (American 1420, United 173) confirmam o escopo A4R181, com possível clarificação de framing onde indicada.

## 4. Decisões registradas

### A4R182-DEC-0001 — Asiana 214 SFO (A4R181-ADJ-0001)
**Decisão:** APPROVED_WITH_ADJUSTMENT

**Escopo aprovado:** A entrada em modo HOLD do autothrottle com início de saída do perfil não percebida pela tripulação como ator integrado.

**Ajuste em relação a A4R181:** A formulação de zona ampla (gate de estabilização com múltiplos cues integrados) foi substituída por ancoragem no momento técnico-operacional da transição para A/T HOLD e não-percepção da saída do perfil. O gate de estabilização (500/1.000 ft AFE) permanece como contexto operacional relevante, não como ponto de fuga primário.

**Modelo de ator:** Tripulação como ator operacional integrado. Sem split PF/PM nesta fase.

---

### A4R182-DEC-0002 — Comair 5191 LEX (A4R181-ADJ-0002)
**Decisão:** APPROVED_WITH_ADJUSTMENT

**Escopo aprovado:** Virada e alinhamento na pista 26 em vez da pista 22 — primeira ação errada da tripulação.

**Ajuste em relação a A4R181:** A formulação de zona ampla (hold-short / lineup / início de corrida) foi substituída por ancoragem na ação inicial errada de virar e alinhar na pista 26. O ponto de fuga é discreto, não uma zona de três momentos candidatos.

**Modelo de ator:** Tripulação como ator operacional integrado. Sem split PF/PM nesta fase.

---

### A4R182-DEC-0003 — American 1420 LIT (A4R181-ADJ-0003)
**Decisão:** APPROVED

**Escopo aprovado:** Continuação da aproximação final instável com perda de referência visual.

**Nota de framing:** A assimetria de spoilers e a dinâmica de rolagem pós-toque são consequência/agravamento operacional, não co-ponto de fuga. O escopo A4R181 está correto.

**Modelo de ator:** Tripulação como ator operacional integrado. Sem split PF/PM nesta fase.

---

### A4R182-DEC-0004 — UPS 1354 BHM (A4R181-ADJ-0006)
**Decisão:** APPROVED_WITH_ADJUSTMENT

**Escopo aprovado:** Não percepção do setup FMC inválido e não percepção da falha de engajamento do modo autopilot esperado.

**Ajuste em relação a A4R181:** O escopo primário foi deslocado do gate de aproximação estabilizada (1.000 ft AFE com 1.500 fpm) para o momento anterior de setup/mode engagement incorreto não percebido. O gate de 1.000 ft é consequência/agravamento operacional relevante, não o ponto de fuga causal primário.

**Modelo de ator:** Tripulação como ator operacional integrado. Sem split captain/FO nesta fase.

---

### A4R182-DEC-0005 — United 173 PDX (A4R181-ADJ-0017)
**Decisão:** APPROVED

**Escopo aprovado:** Manutenção de troubleshooting quando a necessidade operacional já era prosseguir para pouso imediato.

**Nota de framing:** A janela de combustível crítico está correta como âncora temporal, expressa como decisão de manter troubleshooting apesar das indicações de necessidade de pouso imediato. O escopo A4R181 está correto; a clarificação de framing não representa ajuste estrutural.

**Modelo de ator:** Tripulação como ator operacional integrado. Sem split Captain/FO/FE nesta fase.

---

## 5. Consolidação das decisões

| ID | Evento | Decisão | Ajuste EP | Modelo de ator |
|---|---|---|---|---|
| A4R182-DEC-0001 | Asiana 214 SFO | APPROVED_WITH_ADJUSTMENT | Sim — A/T HOLD + não-percepção | CREW_INTEGRATED |
| A4R182-DEC-0002 | Comair 5191 LEX | APPROVED_WITH_ADJUSTMENT | Sim — alinhamento pista 26 | CREW_INTEGRATED |
| A4R182-DEC-0003 | American 1420 LIT | APPROVED | Não | CREW_INTEGRATED |
| A4R182-DEC-0004 | UPS 1354 BHM | APPROVED_WITH_ADJUSTMENT | Sim — setup FMC + mode engagement | CREW_INTEGRATED |
| A4R182-DEC-0005 | United 173 PDX | APPROVED | Não (clarificação de framing) | CREW_INTEGRATED |

## 6. Implicações para A4R183

- Os 3 casos com ajuste (0001, 0002, 0004) devem usar o escopo aprovado neste documento como ancoragem, descartando a formulação de zona anterior.
- Os 2 casos aprovados sem ajuste (0003, 0017) mantêm o escopo A4R181 diretamente.
- Todos os 5 casos têm `actorSplitAllowedThisPhase=false`; o split PF/PM/FE pode ser objeto de decisão autoral em fase posterior se a evidência suportar e o autor assim deliberar.
- A4R183 é "scope-normalized adjudication draft": usa os escopos aprovados aqui para preparar rascunho de adjudicação normalizado, ainda sem fechar P/O/A.

## 7. Casos BATCH_B, BATCH_C, BATCH_D

Não são objeto desta fase. Permanecem nos status registrados em A4R181:
- BATCH_B: FRAMING_DECISION_REQUIRED (6 casos).
- BATCH_C: CONSOLIDATION_REQUIRED (6 casos, 3 pares de duplicatas).
- BATCH_D: holds diversos (7 casos).

## 8. Próximos passos

Ver `SERA_A4R183_NEXT_STEP_PLAN_v0.2.0.md` neste diretório.
