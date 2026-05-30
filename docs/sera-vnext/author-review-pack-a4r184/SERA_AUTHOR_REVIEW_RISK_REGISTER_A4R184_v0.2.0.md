# SERA Author Review Risk Register A4R184 v0.2.0

Status: RISK_REGISTER_ACTIVE
Phase: A4+R-184
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Propósito

Este registro documenta os riscos metodológicos que o autor deve ter em mente ao responder às perguntas do pacote A4R184. Os riscos são organizados por categoria e aplicam-se a um ou mais casos do BATCH_A.

Cada risco é listado com: descrição, casos afetados, sinal de alerta (como reconhecer que o risco está ocorrendo), e proteção metodológica recomendada.

---

## 2. Catálogo de riscos

### RISK-A4R184-001 — Hindsight bias (viés de resultado retrospectivo)

**Descrição:** Usar o outcome do evento (impacto, overrun, fuel exhaustion) como evidência de que a tripulação deveria ter percebido/decidido diferente em momento anterior.

**Casos afetados:** Todos os 5.

**Sinal de alerta:**
- "A tripulação deveria ter visto que estava indo para a pista errada porque o overrun prova que..."
- "O objetivo era errado porque o avião colidiu..."
- "O fato de não terem pousado imediatamente mostra que falharam em perceber..."

**Proteção:** O ponto de fuga e os eixos P/O/A devem ser ancorados no momento *anterior* ao outcome, com base em evidência factual disponível *naquele momento* no cockpit. O outcome é consequência, não evidência retroativa de percepção/objetivo/ação.

---

### RISK-A4R184-002 — Outcome bias (classificar por resultado e não por processo)

**Descrição:** Selecionar ou formular hipóteses de eixo com base na severidade do acidente e não na especificidade do processo cognitivo-operacional no ponto de fuga.

**Casos afetados:** American 1420 LIT, United 173 PDX, Comair 5191 LEX.

**Sinal de alerta:**
- "Como foi um overrun fatal, o A-axis deve capturar a falha mais grave..."
- "Como o fuel foi completamente consumido, o P-axis deve descrever falha total de percepção..."

**Proteção:** A escolha de código canônico (HYP_P-*, HYP_O-*, HYP_A-*) deve depender exclusivamente da especificidade factual do processo no EP normalizado, não da severidade do outcome.

---

### RISK-A4R184-003 — Technical dominance (deslocar EP para falha técnica/sistêmica)

**Descrição:** Deslocar o ponto de fuga ou ancorar os eixos em falhas técnicas de sistemas (A/T HOLD, FMC discontinuity, autospoiler asymmetry) em vez de no processo operacional humano associado a essas condições.

**Casos afetados:** Asiana 214 SFO (A/T HOLD), UPS 1354 BHM (FMC discontinuity), American 1420 LIT (autospoiler asymmetry).

**Sinal de alerta:**
- "O A/T HOLD causou o acidente..."
- "O FMC tinha uma descontinuidade, então o P-axis é sobre a falha do FMC..."
- "Os spoilers não foram acionados simetricamente, então o A-axis deve incluir a falha dos autospoilers..."

**Proteção:** As condições técnicas são o contexto operacional, não o EP primário. O EP normalizado captura o processo operacional da tripulação em relação a essa condição técnica (percepção, objetivo, ação). A condição técnica suporta o P-axis como "cue disponível não integrado", não como co-EP.

---

### RISK-A4R184-004 — Split PF/PM indevido nesta fase

**Descrição:** Tentar dividir responsabilidade entre PF e PM (ou captain/FO/FE) antes de que o autor autorize esse split com evidência factual específica, violando `actorSplitAllowedThisPhase=false`.

**Casos afetados:** Todos os 5.

**Sinal de alerta:**
- "O PM deveria ter chamado o go-around, então o A-axis é só do PM..."
- "O captain falhou em decidir, então P-axis é do captain e A-axis é do FO..."
- "O FE estava certo sobre o fuel, o problema foi o captain não ouvir..."

**Proteção:** Os eixos P/O/A nesta fase descrevem a tripulação como CREW_INTEGRATED_ACTOR_MODEL. O split de contribuição individual pode ser objeto de fase posterior se a evidência suportar e o autor assim deliberar. Não antecipar esse split nos eixos desta fase.

---

### RISK-A4R184-005 — Double-count P/A/O no mesmo fragmento

**Descrição:** Usar o mesmo fato factual para suportar P, O e A sem racional conceitual distinto para cada eixo.

**Casos afetados:** Asiana 214 (cues de PAPI/velocidade/razão de descida), UPS 1354 (mode change sem briefing), American 1420 (EGPWS sink rate), United 173 (fuel advisories do FE).

**Sinal de alerta:**
- O mesmo fragmento de evidência aparece na justificativa de dois ou três eixos sem diferenciação conceitual.
- P = "não percebeu o cue"; A = "não agiu por causa do mesmo cue" — sem racional distinto de por que esses são recortes conceituais separados.

**Proteção:** Para cada fragmento factual, definir explicitamente qual eixo ele suporta e *por que* esse eixo específico (e não os outros). Se o mesmo fragmento suportar P e A, um dos eixos deve receber racional alternativo ou permanecer UNKNOWN.

---

### RISK-A4R184-006 — Deslocamento do EP para consequência

**Descrição:** Reintroduzir como co-EP elementos que foram explicitamente classificados como consequência/agravamento pelo autor em A4R182.

**Casos afetados:**
- Asiana 214: go-around tardio abaixo de 200 ft, impacto contra o seawall.
- Comair 5191: início da corrida de decolagem, overrun.
- American 1420: overrun pós-touchdown, assimetria de autospoilers.
- UPS 1354: gate de 1.000 ft AFE, MDA, EGPWS "sink rate" ~250 ft AGL.
- United 173: fuel exhaustion dos motores, impacto em área residencial.

**Sinal de alerta:**
- "O A-axis deve capturar o que aconteceu no rollout/overrun..."
- "O P-axis deve incluir a não-percepção do EGPWS a 250 ft..."
- "O go-around tardio abaixo de 200 ft é o momento chave..."

**Proteção:** O EP normalizado aprovado em A4R182 é a âncora. Consequências e agravamentos posteriores ao EP podem ser documentados como contexto ou suporte a P/A-axis (como cues disponíveis), mas nunca como co-EP nem como âncora primária dos eixos P/O/A.

---

### RISK-A4R184-007 — Importação de narrativa externa como código SERA

**Descrição:** Usar rótulos, categorias ou conclusões de relatórios NTSB/TSB diretamente como códigos SERA sem ancorar na evidência factual do slice de extração.

**Casos afetados:** Todos os 5, com ênfase em United 173 (CRM failure, captain authority gradient), Comair 5191 (single-controller, fadiga), American 1420 (fadiga, duty time), UPS 1354 (fadiga).

**Sinal de alerta:**
- "O relatório NTSB identificou CRM breakdown, então o O-axis deve ser sobre isso..."
- "A NTSB concluiu que havia problemas de coordenação, o que confirma o P-axis..."
- "O relatório menciona fadiga, então essa é uma hipótese P válida..."

**Proteção:** Todos os eixos devem ser ancorados em fragmentos factuais do slice de extração (A4R180-EXTRACTION-*) com sourceAnchors explícitos. Conclusões analíticas de relatórios externos são contexto, não código SERA. Fadiga é contexto operacional, não código P/O/A.

---

### RISK-A4R184-008 — Não-resolução de boundary P/A como proxy de fechamento

**Descrição:** Deixar o boundary P/A não resolvido por ser metodologicamente confortável, quando na verdade a resolução é necessária para que os eixos tenham conteúdo conceitual distinto.

**Casos afetados:** Asiana 214, UPS 1354, United 173 (todos têm boundary P/A explícito não resolvido).

**Sinal de alerta:**
- Hipóteses P e A têm formulações que descrevem o mesmo espaço temporal sem diferenciação conceitual.
- Qualquer fragmento factual suporta igualmente P e A.

**Proteção:** Se o boundary não pode ser resolvido com a evidência disponível, ao menos um dos eixos deve permanecer UNKNOWN até que evidência adicional permita diferenciação. Manter dois eixos com hipóteses sobrepostas sem racional distinto é metodologicamente insustentável para fechamento futuro.

---

## 3. Matriz de riscos por caso

| riskId | Asiana 214 | Comair 5191 | American 1420 | UPS 1354 | United 173 |
|---|---|---|---|---|---|
| RISK-001 (Hindsight) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RISK-002 (Outcome bias) | — | ✓ | ✓ | — | ✓ |
| RISK-003 (Technical dominance) | ✓ (A/T HOLD) | — | ✓ (spoilers) | ✓ (FMC) | — |
| RISK-004 (Split PF/PM) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RISK-005 (Double-count) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RISK-006 (EP deslocado) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RISK-007 (Importação narrativa) | — | ✓ | ✓ | ✓ | ✓ |
| RISK-008 (Boundary P/A) | ✓ | — | — | ✓ | ✓ |

---

## 4. Proteção sistêmica

Para qualquer decisão autoral que avance de UNKNOWN para HYP_P-*/HYP_O-*/HYP_A-*, o autor deve ser capaz de:

1. Citar o fragmento factual (fragmentId + sourceAnchor) que ancora a hipótese.
2. Confirmar que o mesmo fragmento não está sendo usado para suportar outro eixo sem racional distinto.
3. Confirmar que o EP normalizado aprovado em A4R182 não foi deslocado.
4. Confirmar que a hipótese não importa rótulo externo (NTSB/TSB) sem âncora factual interna.
5. Confirmar que `actorSplitAllowedThisPhase=false` foi respeitado.

Se qualquer um desses 5 itens não puder ser confirmado, a hipótese deve permanecer UNKNOWN.
