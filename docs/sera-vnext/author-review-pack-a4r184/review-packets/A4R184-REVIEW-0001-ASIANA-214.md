# A4R184 Review Packet — A4R184-REVIEW-0001 — Asiana 214 SFO

Status: AUTHOR_REVIEW_PACKET_ACTIVE
reviewId: A4R184-REVIEW-0001
sourceDraftId: A4R183-DRAFT-0001
sourceA4R182Id: A4R182-DEC-0001
sourceA4R181Id: A4R181-ADJ-0001
eventKey: Asiana 214 SFO (Boeing 777-200ER, aproximação visual RWY 28L, 2013)
methodology: SERA
notFinalClassification: true
poaClosureAllowed: false
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Ponto de fuga aprovado (A4R182)

> Entrada em modo HOLD do autothrottle com início de saída do perfil de rampa não percebida adequadamente pela tripulação.

- **authorDecision A4R182:** APPROVED_WITH_ADJUSTMENT
- **escapePointId proposto:** ASIANA-214-ESCAPE-001
- **Tipo de escopo:** Momento técnico-operacional — transição de estado de automação + lacuna de percepção associada.
- **Ajuste A4R182:** Gate de estabilização (500/1.000 ft AFE) substituído por ancoragem no momento técnico-operacional da transição A/T → HOLD. O gate passa a ser contexto operacional relevante, não EP primário.

---

## 2. Ator aprovado

- **integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL
- **Composição:** captain-instrutor + captain-em-treinamento (PF) + relief crew (observador)
- **actorSplitAllowedThisPhase:** false

---

## 3. Estado seguro imediatamente anterior

Aeronave em aproximação visual diurna à pista 28L com autothrottle ativo controlando velocidade automaticamente. Perfil de descida nominal em relação ao glidepath PAPI. Configuração de pouso em progresso dentro de parâmetros operacionais esperados. ILS glideslope inoperante por NOTAM; aproximação visual aceita e briefada pela tripulação.

**Âncora:** ASIANA-SRC-EV-002

---

## 4. Transição para estado inseguro

Seleção de modo no MCP combinada com movimentação do thrust lever produziu transição do autothrottle para estado A/T HOLD. Neste modo, o controle automático ativo de velocidade não está presente. O FMA continuou exibindo estados que requeriam interpretação ativa para identificar a ausência de controle de velocidade. A tripulação integrada não consolidou percepção dessa transição enquanto a velocidade começava a decair e o perfil vertical desviava abaixo do glidepath PAPI.

**Âncora:** ASIANA-SRC-EV-001 (linhas ~566–583)

---

## 5. Evidências factuais disponíveis

| fragmentId | sourceAnchor | Fato factual | Confiança | Uso potencial |
|---|---|---|---|---|
| ASIANA-A4R183-F1 | ASIANA-SRC-EV-001 | Transição A/T HOLD após seleções de modo/thrust; FMA exibindo estados que requeriam interpretação | HIGH | Ancora a transição para estado inseguro; suporte ao P-axis (modo disponível não percebido) |
| ASIANA-A4R183-F2 | ASIANA-SRC-EV-001 | PAPI abaixo do glidepath; velocidade decaindo abaixo da bug; razão de descida elevada antes de 500 ft | HIGH | Cues disponíveis e observáveis; suporte ao P-axis |
| ASIANA-A4R183-F3 | ASIANA-SRC-EV-002 | ILS RWY 28L inoperante por NOTAM; aproximação visual aceita e briefada | HIGH | Contexto do estado seguro anterior |
| ASIANA-A4R183-F4 | ASIANA-SRC-EV-003 | Reconhecimento tardio de baixa velocidade/baixo perfil abaixo de 200 ft; go-around com margem reduzida | HIGH | Consequência/agravamento — NÃO co-EP |

---

## 6. Rationale descritivo A4R183 (não canônico — para referência)

**P (UNKNOWN):** Hipótese de que a tripulação integrada não consolidou a percepção de que o autothrottle havia transitado para estado HOLD (ausência de controle automático de velocidade) enquanto o perfil de energia da aeronave divergia do esperado. Os cues disponíveis (PAPI, velocidade, razão de descida) estavam factualmente presentes mas não foram integrados em detecção ativa do modo em que o sistema operava.

**O (UNKNOWN):** Hipótese de que o objetivo operacional em curso da tripulação era a continuação e conclusão da aproximação visual para pouso em 28L, sem reavaliação do estado de automação quando o perfil de energia começou a divergir.

**A (UNKNOWN):** Hipótese de que a ausência de ação corretiva de velocidade (thrust input manual, correção de atitude, ou comando de go-around coordenado) após a transição A/T HOLD e início de decaimento de velocidade representa o componente de ação (ou omissão de ação) no ponto de fuga.

---

## 7. Perguntas para decisão autoral

### Eixo P — Percepção

**P-1:** A hipótese descritiva de lacuna de consciência de modo A/T HOLD é sustentável com base na evidência disponível nesta extração? Há callout de CVR que ancora a não-percepção do A/T HOLD em momento discreto (ex.: ausência de callout "A/T" ou "speed" em momento específico após a transição)?

**P-2:** Os cues disponíveis (PAPI abaixo glidepath + velocidade decaindo + razão de descida elevada) são suficientes para sustentar hipótese P em nível MEDIUM, ou o autor prefere âncora mais específica de CVR antes de avançar?

### Eixo O — Objetivo

**O-1:** O objetivo de "continuar a aproximação visual" é uma hipótese adequada com base na confiança disponível (MEDIUM, menor que P-axis), ou deve ser rebaixado para UNKNOWN por ausência de evidência direta de avaliação explícita?

**O-2:** Há qualquer elemento de reavaliação de objetivo documentado em CVR nesta janela — algo que sugira que a decisão de continuar vs. arremetar foi deliberadamente avaliada e o pouso foi escolhido?

### Eixo A — Ação

**A-1:** O boundary temporal entre P (não-percepção do modo HOLD) e A (ausência de ação corretiva) pode ser resolvido, ou as duas hipóteses permanecem sobrepostas no mesmo espaço temporal?

**A-2:** Existe um momento discreto — com âncora factual — em que o autor considera que a ação de go-around era operacionalmente possível e disponível com margem suficiente, antes do reconhecimento tardio abaixo de 200 ft?

### Aprovação de escapePointId

**EP-1:** O autor aprova `ASIANA-214-ESCAPE-001` como identificador único para este escopo? Ou prefere ajustar a formulação?

---

## 8. Opções autorais por eixo

### Eixo P
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — CVR anchor discreto não isolado nesta extração; confiança MEDIUM insuficiente para candidato |
| AJUSTO → HYP_P-* | Propor código canônico específico se o autor identificar âncora de CVR que ancora não-percepção em momento discreto |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar verificação de callout de CVR ou transcrição direta antes de decidir |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN nesta fase.

### Eixo O
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — O-axis tem confiança menor que P; não há evidência direta de avaliação "continuar vs arremetar" |
| AJUSTO → HYP_O-* | Propor código canônico específico se o autor considerar "objetivo de completar aproximação" suficientemente âncorável |
| ADIO | Adiar para fase posterior (O-axis pode não ser necessário se P e A capturam adequadamente o EP) |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN ou ADIO.

### Eixo A
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — boundary com P não resolvido; janela de go-around antes de 200 ft não especificada |
| AJUSTO → HYP_A-* | Propor código canônico específico condicionado a: (a) resolução do boundary P/A, e (b) identificação de altitude/timestamp da janela de go-around disponível |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar altitude/timestamp da janela de go-around antes de decidir |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN ou PRECISO_DE_MAIS_EVIDENCIA.

---

## 9. Riscos de erro por eixo

| Eixo | Risco | Sinal de alerta |
|---|---|---|
| P | Importar "mode confusion" ou "automation surprise" da narrativa NTSB sem âncora CVR interna | Hipótese P sem fragmentId + sourceAnchor específico |
| P | Reintroduzir gate de estabilização (500/1.000 ft AFE) como EP primário em vez de contexto operacional | Hipótese P formula EP como gate e não como transição A/T |
| O | Forçar O-axis para caber em expectativa; O-axis com confiança menor pode ser rebaixado | O-axis sem evidência direta de avaliação de objetivo na janela do EP |
| A | Deslocar A-axis para go-around tardio abaixo de 200 ft (consequência/agravamento) | A-axis ancorado em evento posterior ao EP normalizado |
| P/A | Double-count: mesmo fato (cue disponível não integrado) suporta P e A sem racional distinto | Frag F2 aparece em justificativa de ambos os eixos sem diferenciação |

---

## 10. Recomendação conservadora do pacote

Manter UNKNOWN nos 3 eixos nesta fase.

**Justificativa:**
- P-axis tem suporte factual razoável (PAPI + velocidade + razão de descida como cues disponíveis, F1 e F2) mas o momento discreto de não-percepção do A/T HOLD requer âncora de CVR que não foi isolada nesta extração. Avançar para HYP_P-* requer confirmação autoral de que o nível MEDIUM é suficiente ou identificação de âncora adicional.
- O-axis tem confiança menor que P e pode ser rebaixado ou adiado sem perda metodológica.
- A-axis requer resolução do boundary P/A e identificação da janela de go-around antes de avançar.

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
