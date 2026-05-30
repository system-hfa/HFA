# SERA Author Review Pack A4R184 v0.2.0

Status: AUTHOR_REVIEW_PACK_ACTIVE
Phase: A4+R-184
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
notFinalClassification: true
poaClosureAllowed: false
sourcePhase: A4R183
sourcePhaseStatus: SCOPE_NORMALIZED_ADJUDICATION_DRAFT_COMPLETE

---

## 1. Propósito deste pacote

A4R184 é um pacote de revisão orientado para decisão humana. Ele consolida, para cada um dos 5 casos BATCH_A, os elementos necessários para que o autor decida:

- Se cada eixo P/O/A permanece como `UNKNOWN`;
- Se há base factual suficiente para propor uma hipótese canônica `HYP_P-*`, `HYP_O-*` ou `HYP_A-*`;
- Se é necessário mais evidência antes de decidir;
- Se a decisão deve ser adiada para fase posterior.

**Este pacote NÃO fecha P, O ou A. NÃO cria selectedCode. NÃO cria código liberado. NÃO cria fixture. NÃO altera baseline. `notFinalClassification=true` permanece em todos os 5 casos.**

---

## 2. Como usar este pacote

Para cada caso, leia as seções na ordem:

1. **Ponto de fuga aprovado** — âncora metodológica aprovada em A4R182.
2. **Estado seguro anterior / Transição insegura** — contexto factual do EP.
3. **Evidências factuais** — fragmentos com sourceAnchors que suportam cada eixo.
4. **Rationale A4R183** — formulação descritiva (não canônica) que veio do draft.
5. **Perguntas por eixo** — perguntas específicas que o autor deve responder.
6. **Opções autorais** — o que o autor pode decidir por eixo.
7. **Riscos por eixo** — erros metodológicos a evitar.
8. **Recomendação conservadora** — sugestão do pacote (nunca decisão final).

Para registrar suas decisões, use o documento A4R185 (fase seguinte).

---

## 3. Casos incluídos

| reviewId | sourceDraftId | eventKey |
|---|---|---|
| A4R184-REVIEW-0001 | A4R183-DRAFT-0001 | Asiana 214 SFO |
| A4R184-REVIEW-0002 | A4R183-DRAFT-0002 | Comair 5191 LEX |
| A4R184-REVIEW-0003 | A4R183-DRAFT-0003 | American 1420 LIT |
| A4R184-REVIEW-0006 | A4R183-DRAFT-0006 | UPS 1354 BHM |
| A4R184-REVIEW-0017 | A4R183-DRAFT-0017 | United 173 PDX |

Ver arquivos individuais em `review-packets/` para o pacote completo por caso.

---

## 4. Resumo por caso — estado de cada eixo antes da revisão autoral

| reviewId | eventKey | HYP_P | HYP_O | HYP_A | Prioridade | Lacuna crítica |
|---|---|---|---|---|---|---|
| A4R184-REVIEW-0001 | Asiana 214 SFO | UNKNOWN | UNKNOWN | UNKNOWN | ALTA | Boundary P/A temporal; CVR anchor discreto não isolado |
| A4R184-REVIEW-0002 | Comair 5191 LEX | UNKNOWN | UNKNOWN | UNKNOWN | ALTA | Separabilidade P/A no mesmo momento de lineup |
| A4R184-REVIEW-0003 | American 1420 LIT | UNKNOWN | UNKNOWN | UNKNOWN | MEDIA | Altitude/janela de go-around não especificada para A-axis |
| A4R184-REVIEW-0006 | UPS 1354 BHM | UNKNOWN | UNKNOWN | UNKNOWN | ALTA | Mode change: P vs A — alocação do mesmo fato |
| A4R184-REVIEW-0017 | United 173 PDX | UNKNOWN | UNKNOWN | UNKNOWN | MEDIA | OCR artifacts + timestamp/fuel quantity não isolado |

---

## 5. Caso A4R184-REVIEW-0001 — Asiana 214 SFO

### 5.1 Ponto de fuga aprovado (A4R182)

> Entrada em modo HOLD do autothrottle com início de saída do perfil de rampa não percebida adequadamente pela tripulação.

- **sourceA4R182Id:** A4R182-DEC-0001 (APPROVED_WITH_ADJUSTMENT)
- **escapePointId proposto:** ASIANA-214-ESCAPE-001
- **Tipo de escopo:** Momento técnico-operacional — transição de estado de automação + lacuna de percepção associada.
- **Ator integrado:** CREW_INTEGRATED_ACTOR_MODEL (captain-instrutor + captain-em-treinamento + relief crew)

### 5.2 Estado seguro anterior

Aeronave em aproximação visual à pista 28L com autothrottle ativo controlando velocidade automaticamente, perfil de descida nominal, configuração de pouso dentro de parâmetros. ILS glideslope inoperante por NOTAM; aproximação visual aceita pela tripulação.

**Âncora:** ASIANA-SRC-EV-002

### 5.3 Transição para estado inseguro

Seleção de modo no MCP + movimentação do thrust lever → A/T transita para modo HOLD (sem controle automático de velocidade). FMA continua exibindo estados que requeriam interpretação ativa para identificar ausência de controle. Velocidade começa a decair; perfil vertical diverge abaixo do PAPI. Tripulação não consolida percepção dessa transição.

**Âncora:** ASIANA-SRC-EV-001 (linhas ~566–583)

### 5.4 Evidências factuais disponíveis

| fragmentId | Fato | Uso potencial |
|---|---|---|
| ASIANA-A4R183-F1 | Transição A/T HOLD após seleções de modo/thrust; FMA exibindo estados que requeriam interpretação | Ancora a transição (P-axis cue) |
| ASIANA-A4R183-F2 | PAPI abaixo do glidepath; velocidade decaindo abaixo da bug; razão de descida elevada antes de 500 ft | Cues disponíveis não integrados (P-axis suporte) |
| ASIANA-A4R183-F3 | ILS RWY 28L inoperante por NOTAM; aproximação visual aceita | Contexto do estado seguro anterior |
| ASIANA-A4R183-F4 | Reconhecimento tardio de baixa velocidade/baixo perfil abaixo de 200 ft; go-around com margem reduzida | Consequência/agravamento — não co-EP |

### 5.5 Rationale descritivo A4R183 (não canônico)

- **P:** Tripulação integrada não consolidou percepção de que o A/T havia transitado para HOLD enquanto o perfil de energia divergia. Cues (PAPI, velocidade, razão de descida) estavam presentes mas não foram integrados em detecção ativa do modo.
- **O:** Objetivo operacional era a continuação e conclusão da aproximação visual, sem reavaliação do estado de automação quando o perfil de energia começou a divergir.
- **A:** Ausência de ação corretiva de velocidade (thrust manual, correção de atitude, ou go-around coordenado) após a transição A/T HOLD e início de decaimento de velocidade.

### 5.6 Perguntas por eixo

**P — Percepção:**
- A evidência disponível sustenta hipótese canônica de lacuna de percepção de modo A/T HOLD, ou deve permanecer UNKNOWN pela ausência de callout de CVR que ancore o momento discreto de não-percepção?
- O mismatch entre estado real (HOLD) e estado esperado (controle ativo de velocidade) é suficientemente âncorável factualmente para sustentar uma hipótese P?

**O — Objetivo:**
- O objetivo de "continuar a aproximação visual" é uma hipótese adequada, ou a confiança menor que o P-axis recomenda rebaixar para UNKNOWN?
- Há algum elemento de reavaliação explícita documentado em CVR — algo que sugira que o objetivo de completar a aproximação foi deliberadamente mantido apesar dos cues degradados?

**A — Ação:**
- O boundary temporal entre P (não-percepção) e A (ausência de ação corretiva) pode ser resolvido, ou as duas hipóteses permanecem sobrepostas no mesmo espaço temporal?
- Há um momento discreto em que o autor considera que a ação de go-around era operacionalmente possível e disponível, antes de 200 ft AGL?

### 5.7 Opções autorais por eixo

**P:**
- Manter UNKNOWN (recomendação conservadora do pacote — CVR anchor discreto não isolado nesta extração)
- Aprovar candidato HYP_P-* se o autor identificar evidência que ancora não-percepção em momento discreto
- Pedir mais evidência (callout de CVR ou transcrição direta)
- Adiar para fase posterior

**O:**
- Manter UNKNOWN (recomendação conservadora — O-axis tem confiança menor que P, per A4R183)
- Aprovar candidato HYP_O-* se o autor considerar que o objetivo de completar a aproximação é suficientemente âncorável
- Adiar para fase posterior

**A:**
- Manter UNKNOWN (recomendação conservadora — boundary com P não resolvido)
- Aprovar candidato HYP_A-* condicionado a resolução do boundary P/A
- Pedir mais evidência (altitude/timestamp da janela de go-around disponível)
- Adiar para fase posterior

### 5.8 Riscos de erro por eixo

| Eixo | Risco | Consequência |
|---|---|---|
| P | Importar "mode confusion" da narrativa NTSB sem evidência CVR discreto | Sobreclassificação baseada em rótulo externo |
| O | Forçar O-axis para caber em expectativa; não é necessário preencher todos os eixos | Hipótese sem base factual direta |
| A | Deslocar o A-axis para o go-around tardio abaixo de 200 ft (que é consequência/agravamento) | EP migra para outcome, não para ponto de fuga |
| P/A | Usar o mesmo fato (cue disponível não integrado) para suportar P e A sem racional distinto | Double-count de evidência |
| Geral | Reintroduzir gate de estabilização (500/1.000 ft AFE) como EP primário | Violação do escopo aprovado em A4R182 |

### 5.9 Recomendação conservadora do pacote

**Manter UNKNOWN nos 3 eixos nesta fase.** O P-axis tem suporte factual razoável (PAPI + velocidade + razão de descida como cues disponíveis), mas o momento discreto de não-percepção requer âncora de CVR que não foi isolada nesta extração. O O-axis tem confiança menor e pode ser rebaixado sem perda metodológica. O A-axis requer resolução do boundary P/A antes de avançar. Esta recomendação é do pacote; a decisão final é exclusivamente autoral.

---

## 6. Caso A4R184-REVIEW-0002 — Comair 5191 LEX

### 6.1 Ponto de fuga aprovado (A4R182)

> Primeira ação errada da tripulação: virada à esquerda e alinhamento na pista 26 em vez de continuar para a pista 22 designada.

- **sourceA4R182Id:** A4R182-DEC-0002 (APPROVED_WITH_ADJUSTMENT)
- **escapePointId proposto:** COMAIR-5191-ESCAPE-001
- **Tipo de escopo:** Momento discreto — ação observável de lineup em pista errada.
- **Ator integrado:** CREW_INTEGRATED_ACTOR_MODEL (FO como PF + captain como PM)

### 6.2 Estado seguro anterior

Aeronave em táxi pela taxiway A, orientada para cruzar o hold-short da 26 e continuar em direção ao limiar da pista 22. Briefing repetido referenciando pista 22; heading bugs ajustados para ~225°. Clearance de táxi via taxiway A com destino à pista 22.

**Âncora:** COMAIR-SRC-EV-001/002

### 6.3 Transição para estado inseguro

Tripulação virou à esquerda e alinhou a aeronave na pista 26 (heading ~260°) em vez de continuar para a pista 22. Heading da aeronave divergiu dos heading bugs (~225°) sem que a discrepância fosse identificada ou verbalizada. Clearance de decolagem solicitada e concedida sem que o número da pista fosse explicitado.

**Âncora:** COMAIR-SRC-EV-003 (linhas ~566–573)

### 6.4 Evidências factuais disponíveis

| fragmentId | Fato | Uso potencial |
|---|---|---|
| COMAIR-A4R183-F1 | Briefing repetido referenciando pista 22; heading bugs ~225° | Estado seguro anterior; objetivo declarado |
| COMAIR-A4R183-F2 | Clearance de táxi via taxiway A para pista 22 | Contexto operacional e intenção ATC/crew |
| COMAIR-A4R183-F3 | Virada à esquerda para pista 26; heading ~260° vs heading bugs ~225° | Ancora EP — transição para estado inseguro e ato observável |
| COMAIR-A4R183-F4 | Clearance de decolagem solicitada/concedida sem número de pista | Contribuição contextual ATC — não co-EP |
| COMAIR-A4R183-F5 | Corrida de decolagem na pista 26; V1/VR antecipados; overrun | Consequência/agravamento — posterior ao EP |

### 6.5 Rationale descritivo A4R183 (não canônico)

- **P:** Tripulação não detectou o mismatch entre heading de lineup (~260°) e heading bugs configurados (~225°), nem realizou verificação ativa de identidade de pista. Informação estava factualmente disponível no cockpit.
- **O:** Objetivo operacional era a decolagem pela pista 22, mantido sem reavaliação quando o lineup divergiu. Não há evidência de reconhecimento de estar na pista 26.
- **A:** Ação de virar à esquerda e alinhar na pista 26 sem cross-check de heading bug, marcações de pista ou verificação de identidade constitui o ato observável no EP.

### 6.6 Perguntas por eixo

**P — Percepção:**
- O mismatch de heading (bugs ~225° vs aeronave ~260°) é evidência suficiente para sustentar hipótese de não-percepção (P), ou o autor prefere evidência de CVR que confirme que o mismatch foi visto e não integrado?
- Há alguma verbalização no CVR que indique reconhecimento do mismatch seguido de não-ação, vs. ausência total de reconhecimento?

**O — Objetivo:**
- O objetivo de decolar pela pista 22 é evidenciado pelo briefing e pelos heading bugs — isso constitui base suficiente para hipótese O, ou o O-axis deve permanecer UNKNOWN porque não há evidência de objetivo incompatível (apenas continuidade de objetivo já declarado)?
- O O-axis deve capturar "objetivo compatível executado erroneamente" ou é melhor descrito no P e A eixos?

**A — Ação:**
- A ação de "virar à esquerda e alinhar na pista 26 sem verificação" é suficientemente específica como ato observável para sustentar hipótese A canônica?
- O autor prefere separar P e A como hipóteses distintas (não-percepção + ação errada), ou unificar como "runway awareness failure" nesta fase?

### 6.7 Opções autorais por eixo

**P:**
- Aprovar candidato HYP_P-* (evidência de MEDIUM-HIGH confidence; mismatch de heading factualmente documentado; ausência de callout de verificação consistente com comportamento)
- Manter UNKNOWN pendente de verificação adicional de CVR (se o autor quiser evidência de callout explícito)
- Adiar para fase posterior

**O:**
- Manter UNKNOWN (recomendação conservadora — objetivo de decolagem na pista 22 é consistente com atos anteriores, mas O-axis pode ser redundante se P e A capturam adequadamente o EP)
- Aprovar candidato HYP_O-* se o autor considerar que "objetivo mantido sem reavaliação" é uma hipótese O distinta
- Adiar para fase posterior

**A:**
- Aprovar candidato HYP_A-* (evidência de MEDIUM-HIGH confidence; alignment na pista 26 é fato factual HIGH confidence em COMAIR-SRC-EV-003)
- Manter UNKNOWN se o autor quiser resolver o boundary P/A antes de avançar
- Adiar para fase posterior

### 6.8 Riscos de erro por eixo

| Eixo | Risco | Consequência |
|---|---|---|
| P | Usar o mesmo fato (mismatch de heading) para P e A sem racional distinto | Double-count — o mesmo fragmento não pode suportar ambos os eixos sem separação conceitual |
| O | Forçar O-axis para capturar "objetivo de decolagem" quando o objetivo não estava em conflito com a intenção declarada | Hipótese O sem conteúdo conceitual distinto |
| A | Ampliar o A-axis para incluir o overrun (consequência) ou o cruzamento do hold-short (anterior ao EP) | Violação do escopo discreto aprovado em A4R182 |
| Geral | Reintroduzir zona ampla (hold-short / lineup / início de corrida) em vez de momento discreto | Violação do ajuste A4R182 |
| Geral | Importar "fadiga" ou "single-controller" da narrativa NTSB como código SERA | Rótulo sem evidência factual direta |

### 6.9 Recomendação conservadora do pacote

**Manter UNKNOWN nos 3 eixos nesta fase (CONSERVATIVE_UNKNOWN_RECOMMENDED em P, O e A).** O mismatch de heading é factualmente âncorável e a ausência de callout de verificação é consistente com o comportamento documentado, mas o boundary P/A não está resolvido — o mesmo fragmento (F3) pode suportar ambos os eixos sem racional distinto. Nenhum candidato HYP_P-* ou HYP_A-* deve ser proposto antes que o autor resolva a separabilidade P/A. O O-axis provavelmente permanece UNKNOWN ou adiado. Esta recomendação é do pacote; a decisão final é exclusivamente autoral.

---

## 7. Caso A4R184-REVIEW-0003 — American 1420 LIT

### 7.1 Ponto de fuga aprovado (A4R182)

> Continuação da aproximação final instável com perda de referência visual.

- **sourceA4R182Id:** A4R182-DEC-0003 (APPROVED)
- **escapePointId proposto:** AA1420-ESCAPE-001
- **Tipo de escopo:** Segmento operacional — continuação de aproximação com cues integrados de instabilidade presentes.
- **Ator integrado:** CREW_INTEGRATED_ACTOR_MODEL (captain + FO)

### 7.2 Estado seguro anterior

Aeronave vetorada para ILS pista 4R em Little Rock após perda inicial de referência visual. ILS disponível, crew sob vectors ATC, aproximação dentro do envelope de performance esperado antes da degradação final da referência visual.

**Âncoras:** AA1420-E3 (linhas 636–700); AA1420-E2 (linhas 580–626)

### 7.3 Transição para estado inseguro

No segmento final do ILS: comentários de CVR ("I can't see it", "off course") indicavam degradação de referência visual e posicionamento lateral incerto. EGPWS gerou alerta "sink rate" em baixa altitude. Aproximação prosseguiu sem comando de go-around coordenado.

**Âncora:** AA1420-E4 (linhas 740–774)

### 7.4 Evidências factuais disponíveis

| fragmentId | Fato | Uso potencial |
|---|---|---|
| AA1420-A4R183-F1 | Despachante sugeriu expedir chegada por trovoadas | Contexto de pressão operacional — não EP |
| AA1420-A4R183-F2 | ATC reportou windshear/vento/visibilidade; crew discutiu crosswind limit sem verificar manual | Contexto operacional; informação disponível não totalmente integrada |
| AA1420-A4R183-F3 | Crew perdeu contato visual; recebeu vectors para ILS 4R | Estado seguro anterior ao EP |
| AA1420-A4R183-F4 | Comentários "I can't see it" / "off course"; EGPWS "sink rate" | Ancora transição para estado inseguro e ato observável no EP |
| AA1420-A4R183-F5 | Flight spoilers não desplegaram simetricamente | Consequência/agravamento técnico — posterior ao EP |

### 7.5 Rationale descritivo A4R183 (não canônico)

- **P:** Tripulação operava com referência visual degradada (perda confirmada por CVR) e com informação de windshear disponível, sem integrar esses cues em decisão coordenada de go-around. EGPWS "sink rate" era cue adicional disponível.
- **O:** Objetivo operacional era completar o pouso em LIT naquele trecho, mantido apesar das condições adversas e da degradação de referência visual.
- **A:** Ausência de comando de go-around quando os cues integrados (comentários crew + EGPWS sink rate + windshear ativo) indicavam aproximação fora de parâmetros.

### 7.6 Perguntas por eixo

**P — Percepção:**
- Os comentários de CVR ("I can't see it", "off course") são âncoras diretas de percepção degradada suficientes para sustentar HYP_P-*?
- O autor deseja ampliar o P-axis para incluir a não-integração do aviso de windshear como elemento paralelo à perda de referência visual, ou manter uma hipótese P única centrada na perda visual?

**O — Objetivo:**
- O objetivo de completar o pouso em LIT é evidenciado pelo comportamento observado (não go-around) — isso constitui base para HYP_O-*, ou é melhor deixar em UNKNOWN porque o objetivo em si não era incompatível com operação segura (apenas a sua persistência)?
- A pressão do despachante (AA1420-E1) é um elemento que sustenta hipótese O de incompatibilidade de objetivo, ou permanece como contexto operacional sem peso canônico?

**A — Ação:**
- Qual altitude ou momento específico o autor considera como "janela de go-around com margem operacional disponível"? Este timestamp ancora o A-axis de forma precisa.
- O EGPWS "sink rate" sozinho é âncora suficiente para o A-axis (cue disponível + ação não executada), ou o autor prefere esperar por mais evidência da janela exata?

### 7.7 Opções autorais por eixo

**P:**
- Aprovar candidato HYP_P-* (CVR comments "I can't see it" são âncoras factuais diretas de HIGH confidence na extração; perda de referência visual é factualmente âncorável)
- Manter UNKNOWN se o autor quiser separar "perda de referência" de "não-integração como gatilho de go-around"
- Adiar para fase posterior

**O:**
- Manter UNKNOWN (recomendação conservadora — o objetivo de completar o pouso não era em si operacionalmente incompatível; a pressão do despachante não foi confirmada como código O-axis)
- Aprovar candidato HYP_O-* se o autor considerar que a persistência do objetivo além da segurança operacional constitui hipótese O distinta
- Adiar para fase posterior

**A:**
- Manter UNKNOWN pendente de identificação de altitude/timestamp da janela de go-around (recomendação do pacote — sem essa âncora, A-axis fica sem especificidade operacional)
- Aprovar candidato HYP_A-* se o autor definir a janela explicitamente
- Pedir mais evidência (altitude em que go-around era factualmente disponível)
- Adiar para fase posterior

### 7.8 Riscos de erro por eixo

| Eixo | Risco | Consequência |
|---|---|---|
| P | Double-count: usar EGPWS sink rate para suportar tanto P quanto A sem racional distinto | O mesmo fragmento não pode suportar ambos sem separação conceitual |
| O | Importar "pressão do despachante" como código fechado de O-axis sem evidência factual direta de violação de objetivo operacional nominal | Sobreclassificação |
| A | Migrar o A-axis para incluir a assimetria de autospoilers pós-toque (AA1420-E5) como ação humana primária | EP migra para pós-touchdown; violação do escopo aprovado |
| A | Usar o overrun como evidência retroativa de que a janela de go-around existia | Outcome bias — outcome não é evidência de janela disponível |
| Geral | Usar fadiga/duty time como código SERA sem evidência factual direta | Rótulo externo sem base canônica |

### 7.9 Recomendação conservadora do pacote

**Manter UNKNOWN nos 3 eixos nesta fase (CONSERVATIVE_UNKNOWN_RECOMMENDED em P e O; NEEDS_MORE_EVIDENCE em A).** O P-axis tem suporte factual razoável (CVR comments HIGH confidence), mas o risco de double-count com o A-axis (EGPWS sink rate suportando ambos os eixos) não está resolvido. O A-axis requer identificação da janela de go-around (altitude/timestamp) antes de ser proposto com especificidade operacional. O O-axis provavelmente permanece UNKNOWN. Esta recomendação é do pacote; a decisão final é exclusivamente autoral.

---

## 8. Caso A4R184-REVIEW-0006 — UPS 1354 BHM

### 8.1 Ponto de fuga aprovado (A4R182)

> Não percepção do problema do setup do FMC e não percepção de que o autopilot não engajou o modo como esperado.

- **sourceA4R182Id:** A4R182-DEC-0004 (APPROVED_WITH_ADJUSTMENT)
- **escapePointId proposto:** UPS1354-ESCAPE-001
- **Tipo de escopo:** Momento operacional — lacuna de percepção de estado de sistema + ausência de verificação de setup, anterior à descida com parâmetros incorretos.
- **Ator integrado:** CREW_INTEGRATED_ACTOR_MODEL (captain + first officer)

### 8.2 Estado seguro anterior

Tripulação concluiu briefing de profile approach com FMC vertical guidance. Expectativa operacional: autopilot irá engajar modo "profile" e gerenciar a trajetória vertical até a decision altitude. Setup de rota FMC em progresso, antes da ativação da sequência de aproximação.

**Âncoras:** UPS-E2 (linhas 503–511); UPS-E1 (492–498)

### 8.3 Transição para estado inseguro

Setup da rota FMC continha descontinuidade remanescente que tornava o glidepath gerado inválido. Nenhum piloto reconheceu. Ao entrar no segmento de aproximação, autopilot não engajou modo "profile" como esperado. Captain selecionou modo "vertical speed" sem briefar a FO, mudando o controle vertical de gerenciamento automatizado para razão de descida manual.

**Âncoras:** UPS-E3 (515–541); UPS-E4 (542–554)

### 8.4 Evidências factuais disponíveis

| fragmentId | Fato | Uso potencial |
|---|---|---|
| UPS1354-A4R183-F1 | Descontinuidade FMC tornou glidepath gerado inválido; nenhum piloto reconheceu | Ancora lacuna de percepção do setup FMC (P-axis) |
| UPS1354-A4R183-F2 | Captain mudou para vertical speed sem briefar FO | Ancora ausência de coordenação de modo (A-axis ou P-axis — boundary não resolvido) |
| UPS1354-A4R183-F3 | Crew briefou profile approach com FMC vertical guidance até DA | Estado seguro anterior; expectativa operacional estabelecida |
| UPS1354-A4R183-F4 | Callout 1.000 ft; descida sustentada a 1.500 fpm; gate estabilizado não atendido | Consequência/agravamento posterior ao EP normalizado |
| UPS1354-A4R183-F5 | EGPWS "sink rate" caution ~250 ft AGL | Cue final de agravamento — posterior ao EP normalizado |

### 8.5 Rationale descritivo A4R183 (não canônico)

- **P:** Tripulação não percebeu que o glidepath FMC era inválido (descontinuidade) e não percebeu que o autopilot havia deixado de engajar o modo "profile" esperado. Informação sobre descontinuidade FMC e estado de modo era disponível para verificação no cockpit.
- **O:** Objetivo operacional era executar a profile approach usando o FMC vertical guidance presumido válido até a decision altitude. O objetivo não estava em conflito com operação nominal; problema é a desconexão entre objetivo e estado real do sistema.
- **A:** Ausência de verificação da validade do glidepath FMC após setup com descontinuidade; ausência de coordenação explícita sobre o mode change (captain não briefou FO).

### 8.6 Perguntas por eixo

**P — Percepção:**
- "Nenhum piloto reconheceu" (UPS-E3) é âncora factual suficiente para HYP_P-*, ou o autor prefere evidência de CVR que discerna explicitamente o momento em que a verificação deveria ter ocorrido e não ocorreu?
- O P-axis deve cobrir dois recortes separados (não-percepção da descontinuidade FMC + não-percepção do modo não engajado), ou uma formulação unificada é adequada?

**O — Objetivo:**
- O objetivo de executar a profile approach com FMC guidance é evidenciado pelo briefing (UPS-E2). Isso constitui base para HYP_O-* ou é melhor deixar em UNKNOWN porque o objetivo era operacionalmente correto (o problema era a desconexão entre objetivo e estado real)?
- O O-axis captura algo metodologicamente distinto de P e A neste caso, ou pode ser adiado para fase posterior?

**A — Ação:**
- O fato "captain mudou para vertical speed sem briefar FO" (UPS-E4) deve ser alocado ao P-axis (FO não sabia do modo) ou ao A-axis (captain omitiu coordenação)? Esta é a pergunta de boundary mais crítica deste caso.
- A ausência de verificação de validade do glidepath FMC pré-descida é um componente do A-axis distinto da percepção (P-axis) da descontinuidade?

### 8.7 Opções autorais por eixo

**P:**
- Aprovar candidato HYP_P-* se o autor considerar "nenhum piloto reconheceu" âncora factual suficiente (confiança MEDIUM; HIGH no fato da descontinuidade, MEDIUM na não-percepção)
- Manter UNKNOWN se o autor quiser CVR evidence que discerne o momento específico
- Adiar para fase posterior

**O:**
- Manter UNKNOWN (recomendação conservadora — o objetivo era operacionalmente correto; O-axis pode não ter conteúdo conceitual distinto de P e A neste caso)
- Aprovar candidato HYP_O-* se o autor considerar que "objetivo desconectado do estado real do sistema" é hipótese O distinta
- Adiar para fase posterior

**A:**
- Manter UNKNOWN pendente de resolução do boundary P/A no mode change (recomendação do pacote)
- Aprovar candidato HYP_A-* para a ausência de verificação FMC (se o autor separar essa verificação do P-axis)
- Pedir mais evidência sobre o moment exato do mode change
- Adiar para fase posterior

### 8.8 Riscos de erro por eixo

| Eixo | Risco | Consequência |
|---|---|---|
| P | Usar "nenhum piloto reconheceu" para suportar P sem verificar se esse fato não é melhor alocado ao A-axis (ausência de ação de verificação) | Double-count ou alocação incorreta do fato |
| O | Forçar O-axis para "objetivo de executar profile approach" quando esse objetivo era correto — problema estava no estado do sistema, não no objetivo | Hipótese O sem conteúdo distinto |
| A | Deslocar o A-axis para o gate de 1.000 ft / MDA / EGPWS (todos são consequência/agravamento posterior ao EP normalizado) | Violação do ajuste A4R182 |
| P/A | Usar o mesmo fato (mode change sem briefing) para P e A sem racional distinto | Double-count — o mesmo fragmento não pode suportar ambos sem separação conceitual |
| Geral | Importar "fadiga" do duty cycle final como código SERA | Rótulo sem evidência factual direta |

### 8.9 Recomendação conservadora do pacote

**Manter UNKNOWN nos 3 eixos nesta fase (CONSERVATIVE_UNKNOWN_RECOMMENDED em P e O; NEEDS_MORE_EVIDENCE em A).** A questão metodológica central é a alocação do fato "mode change sem briefing" (F2) ao P ou A eixo — essa decisão deve preceder qualquer proposta de candidato para ambos. Nenhum candidato HYP_P-* deve ser proposto enquanto F2 não for alocado, pois o mesmo fragmento pode suportar P ou A sem racional distinto. O O-axis provavelmente permanece UNKNOWN. Esta recomendação é do pacote; a decisão final é exclusivamente autoral.

---

## 9. Caso A4R184-REVIEW-0017 — United 173 PDX

### 9.1 Ponto de fuga aprovado (A4R182)

> Manutenção de troubleshooting de gear malfunction quando a necessidade operacional já era abandonar o troubleshooting e executar pouso imediato.

- **sourceA4R182Id:** A4R182-DEC-0005 (APPROVED)
- **escapePointId proposto:** UNITED-173-ESCAPE-001
- **Tipo de escopo:** Janela de decisão operacional durante o holding (fuel state crítico + objetivo persistente de troubleshooting).
- **Ator integrado:** CREW_INTEGRATED_ACTOR_MODEL (captain + FO + flight engineer)

### 9.2 Estado seguro anterior

Aeronave em holding autorizado por ATC, fuel acima de reserva mínima, gear troubleshooting em andamento com checklists sendo executados. Opção de "land now" ainda disponível com margem de fuel operacional.

**Âncoras:** U173-E1; U173-E2; extração seção 13 (~12.000 lb fuel no início do holding)

### 9.3 Transição para estado inseguro

FE verbalizou repetidamente atualizações de fuel state indicando redução progressiva. Em determinado momento, fuel state atingiu nível próximo à reserva final (~3.000–5.000 lb, per extração seção 13). Captain manteve foco no troubleshooting/preparação de emergency landing em vez de transitar para execução imediata de pouso.

**Âncoras:** U173-E3; U173-E4/E5; U173-E6/E7
**Nota:** Timestamp/fuel quantity exato não isolado com precisão — OCR artifacts no TXT fonte (NTSB AAR-79-07).

### 9.4 Evidências factuais disponíveis

| fragmentId | Fato | Uso potencial |
|---|---|---|
| U173-A4R183-F1 | CVR com fuel advisories repetidos e queries sobre fuel restante | Ancora disponibilidade de informação de fuel (P-axis cues) |
| U173-A4R183-F2 | Crew attention coupled ao gear troubleshooting com low-fuel risk escalando | Ancora attentional fixation como componente do P-axis hipótese |
| U173-A4R183-F3 | Continuação de objetivo de troubleshooting com fuel risk piorando | Ancora objetivo persistente (O-axis hipótese) |
| U173-A4R183-F4 | Timing de action choices indica boundary entre selection adequacy e feedback integration | Ancora componente de ação ou omissão no EP |
| U173-A4R183-F5 | Gear indicator anomaly ao baixar trem | Contexto do gatilho do holding — não EP |

### 9.5 Rationale descritivo A4R183 (não canônico)

- **P:** Atenção da tripulação estava acoplada ao gear troubleshooting de forma que verbalizações repetidas do FE sobre fuel state crítico não foram integradas como gatilho imediato de "land now". Informação de fuel era factualmente disponível (vocalizada pelo FE), mas percepção operacional da urgência não foi consolidada.
- **O:** Objetivo operacional ativo era resolver ou confirmar o status do gear e preparar uma emergency landing adequada, antes de executar o pouso. Objetivo persistiu além da janela de segurança de fuel.
- **A:** Ausência de decisão e comando de "land now" na janela de fuel crítico (quando FE verbalizava níveis próximos à reserva final) representa a omissão de ação no EP normalizado.

### 9.6 Perguntas por eixo

**P — Percepção:**
- As verbalizações repetidas do FE sobre fuel state são âncoras suficientes para hipótese de não-integração de urgência (P), ou os OCR artifacts no TXT fonte limitam demais a confiança para proposta de candidato?
- O autor deseja verificar o TXT AAR-79-07 antes de avançar para proposta de HYP_P-*, ou considera as âncoras atuais suficientes para uma hipótese de nível MEDIUM?

**O — Objetivo:**
- O objetivo de resolver o gear antes de pousar é documentado pelo comportamento observado. Isso constitui base para HYP_O-*, capturando a persistência de um objetivo que se tornou incompatível com a segurança operacional?
- O objetivo de "preparar emergency landing adequada" era operacionalmente legítimo no início do holding — o que torna esta hipótese metodologicamente delicada (evitar outcome bias: o objetivo só se tornou problemático em retrospecto).

**A — Ação:**
- A ausência de decisão "land now" na janela de fuel crítico é âncorável factualmente, mas o timestamp exato da janela não está isolado. O autor considera essa lacuna impeditiva para proposta de HYP_A-*, ou aceitável em nível MEDIUM?
- O boundary P/A (fixação atencional como razão para a omissão de "land now") pode ser resolvido, ou as hipóteses permanecem sobrepostas?

### 9.7 Opções autorais por eixo

**P:**
- Manter UNKNOWN pendente de verificação do TXT AAR-79-07 (recomendação do pacote — OCR artifacts limitam confiança em detalhes finos de timing)
- Aprovar candidato HYP_P-* se o autor considerar que as âncoras de alto nível (CVR fuel advisories + atenção acoplada ao troubleshooting) são suficientes para nível MEDIUM
- Pedir mais evidência (verificação do TXT fonte)
- Adiar para fase posterior

**O:**
- Aprovar candidato HYP_O-* se o autor considerar que a persistência do objetivo de troubleshooting além da janela de segurança é hipótese O metodologicamente distinta (com cautela para não usar outcome como prova)
- Manter UNKNOWN se o autor considerar que o O-axis é melhor descrito pelos P e A eixos
- Adiar para fase posterior

**A:**
- Manter UNKNOWN pendente de timestamp/fuel quantity exato do EP (recomendação do pacote — sem âncora temporal precisa, A-axis fica sem especificidade)
- Aprovar candidato HYP_A-* em nível MEDIUM se o autor aceitar a janela aproximada (~3.000–5.000 lb) como âncora suficiente
- Pedir mais evidência (verificação do TXT fonte)
- Adiar para fase posterior

### 9.8 Riscos de erro por eixo

| Eixo | Risco | Consequência |
|---|---|---|
| P | Importar "attentional fixation" como rótulo sem evidência factual direta de CVR | Rótulo externo (CRM/HFACS) sem base canônica SERA |
| O | Usar outcome (fuel exhaustion) como prova retroativa de que o objetivo estava "errado" desde o início | Outcome bias — o objetivo era legítimo no início do holding |
| A | Ausência de timestamp/fuel quantity exato: janela de "land now disponível" não está precisamente ancorada | A-axis sem especificidade operacional |
| P/A | Usar o mesmo espaço temporal (fixação + omissão de land now) para P e A sem racional distinto | Double-count |
| Geral | Importar "CRM failure" ou "captain authority gradient" da análise NTSB como código SERA | Rótulo sem evidência factual direta na extração |
| Geral | Reintroduzir a gear indicator anomaly como componente do EP | Gear anomaly é o gatilho do holding, não o EP |

### 9.9 Recomendação conservadora do pacote

**Manter UNKNOWN nos 3 eixos nesta fase, prioritariamente em razão dos OCR artifacts e da ausência de timestamp/fuel quantity exato.** O O-axis tem suporte conceitual razoável (objetivo de troubleshooting persistindo além da segurança) mas requer cuidado com outcome bias. P e A compartilham o mesmo espaço temporal sem resolução de boundary. A verificação do TXT AAR-79-07 é recomendada antes de qualquer proposta de candidato. Esta recomendação é do pacote; a decisão final é exclusivamente autoral.

---

## 10. Locks de não fechamento (todos os 5 casos)

- `NOT_FINAL_P_O_A` — nenhuma hipótese neste pacote fecha P, O ou A.
- `NOT_RELEASED_CODE` — nenhum código liberado criado.
- `NOT_FOR_FIXTURE` — nenhuma fixture criada ou alterada.
- `NOT_FOR_BASELINE` — nenhum baseline criado ou alterado.
- `NOT_DOWNSTREAM` — nenhum downstream criado.
- `notFinalClassification: true` em todos os 5 casos.
- `poaClosureAllowed: false` em todos os 5 casos.
- `dualAuthorReviewRequired: true` — nenhum fechamento de eixo sem revisão dual-autor.

---

## 11. Próximos passos

Ver `SERA_A4R185_AUTHOR_DECISION_INTAKE_PLAN_v0.2.0.md` para o formato de registro de respostas autorais.
