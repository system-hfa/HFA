# A4R183 Draft — A4R183-DRAFT-0001 — Asiana 214 SFO

Status: SCOPE_NORMALIZED_ADJUDICATION_DRAFT
draftId: A4R183-DRAFT-0001
sourceA4R181Id: A4R181-ADJ-0001
sourceA4R182Id: A4R182-DEC-0001
eventKey: Asiana 214 SFO (Boeing 777-200ER, aproximação visual RWY 28L, 2013)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
notFinalClassification: true
poaClosureAllowed: false

---

## 1. Identificação do evento

Asiana Airlines 214, Boeing 777-200ER, vôo Seul–San Francisco (SFO), julho de 2013. Aproximação visual diurna à pista 28L com ILS glideslope inoperante por NOTAM. Tripulação composta por captain-instrutor, captain-em-treinamento (PF) e relief crew observador.

---

## 2. Fontes internas lidas

- `A4R180-EXTRACTION-0001.md` — extração estruturada completa (seções 1–17)
- `AUTHOR_DECISION_PACKET_A4R181_0001_ASIANA-214.md` — dossiê autoral BATCH_A
- `SERA_REAL_EVENT_AUTHOR_DECISION_INTAKE_A4R182_v0.2.0.md` — decisão autoral A4R182
- `SERA_REAL_EVENT_AUTHOR_DECISION_CHANGE_REGISTER_A4R182_v0.2.0.md` — change register
- sourceAnchors utilizados: ASIANA-SRC-EV-001, ASIANA-SRC-EV-002, ASIANA-SRC-EV-003

---

## 3. Decisão autoral A4R182 usada

- **sourceA4R182Id:** A4R182-DEC-0001
- **authorDecision:** APPROVED_WITH_ADJUSTMENT
- **escapePointAdjustmentRequired:** true
- **Ajuste registrado:** Zona ampla de gate de estabilização (500/1.000 ft AFE) substituída. Escopo deslocado para o momento técnico-operacional da transição A/T → HOLD e não-percepção da saída do perfil. O gate de estabilização passa a ser contexto operacional relevante, não EP primário.

---

## 4. Ponto de fuga autoral normalizado

> Entrada em modo HOLD do autothrottle com início de saída do perfil de rampa não percebida adequadamente pela tripulação como ator integrado.

**Tipo de escopo:** Momento técnico-operacional (transição de estado de automação + lacuna de percepção associada).

**Regra de ponto de fuga único:** Um único escapePointId para este escopo de análise. O gate de estabilização (500/1.000 ft AFE), o go-around tardio abaixo de 200 ft, e o impacto contra o seawall são consequência/agravamento/recuperação — não co-pontos de fuga.

---

## 5. Estado seguro imediatamente anterior

Aeronave em aproximação visual final à pista 28L, com autothrottle ativo e controlando velocidade de forma automática, perfil de descida nominal em relação ao glidepath PAPI, configuração de pouso em progresso dentro de parâmetros operacionais esperados.

**Âncora factual:** ASIANA-SRC-EV-002 — aceitação da aproximação visual com A/T operacional e critérios de aproximação estabilizada aplicáveis; briefing de aproximação executado.

---

## 6. Transição para estado inseguro

Combinação de seleção de modo no MCP e movimentação do thrust lever produziu transição do autothrottle para estado A/T HOLD — modo em que o controle automático ativo de velocidade não está presente. O FMA continuou exibindo estados que requeriam interpretação ativa para identificar a ausência de controle de velocidade. A tripulação (PF, PM e observador) não consolidou percepção dessa transição enquanto a velocidade começava a decair e o perfil vertical desviava abaixo do glidepath PAPI.

**Âncora factual:** ASIANA-SRC-EV-001 (linhas ~566–583) — transição para A/T HOLD após seleções de modo/thrust; ASIANA-SRC-EV-002 — contexto AFDS e expectativa de modo.

---

## 7. Ato/condição insegura observável no ponto de fuga

Ausência de callout, ação corretiva de velocidade ou decisão de go-around coordenada durante o período imediatamente posterior à transição A/T → HOLD, enquanto a velocidade decaía e o perfil vertical divergia do glidepath nominal. Os cues externos (PAPI, variação de velocidade, razão de descida) estavam disponíveis e eram factualmente observáveis.

**Âncora factual:** ASIANA-SRC-EV-001 — PAPI mostrando perfil abaixo do glidepath; velocidade decaindo abaixo da bug; razão de descida elevada; ausência de callout de "speed" durante o decaimento (conforme narrativa de extração).

---

## 8. Ator operacional integrado

**integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL

Tripulação de vôo como bloco operacional integrado: captain-instrutor, captain-em-treinamento (PF) e relief crew (observador). Não se aplica split PF/PM nesta fase (`actorSplitAllowedThisPhase=false`). A responsabilidade diferencial interna ao bloco (quem deveria ter chamado / quem deveria ter agido) é questão para revisão autoral A4R184 se a evidência suportar.

---

## 9. Evidências factuais extraídas

| fragmentId | sourceAnchor | Fato factual | Uso no draft |
|---|---|---|---|
| ASIANA-A4R183-F1 | ASIANA-SRC-EV-001 | Transição A/T HOLD após seleções de modo/thrust; FMA exibindo estados que requeriam interpretação | Ancora a transição para estado inseguro |
| ASIANA-A4R183-F2 | ASIANA-SRC-EV-001 | PAPI mostrando perfil abaixo do glidepath; velocidade decaindo abaixo da bug; razão de descida elevada antes de 500 ft | Cues disponíveis não integrados — suporte ao P-axis hipótese |
| ASIANA-A4R183-F3 | ASIANA-SRC-EV-002 | Glideslope ILS RWY 28L inoperante por NOTAM; aproximação visual aceita pela tripulação | Contexto operacional do estado seguro anterior |
| ASIANA-A4R183-F4 | ASIANA-SRC-EV-003 | Reconhecimento explícito tardio de baixa velocidade/baixo perfil abaixo de 200 ft; go-around comandado com margem reduzida | Consequência/agravamento — não co-EP |

---

## 10. Hipótese preliminar de Percepção (HYP_P)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a tripulação integrada não consolidou a percepção de que o autothrottle havia transitado para estado HOLD (ausência de controle automático de velocidade) enquanto o perfil de energia da aeronave divergia do esperado. Os cues disponíveis (PAPI, velocidade, razão de descida) estavam factualmente presentes mas não foram integrados em detecção ativa do modo em que o sistema operava.

**Confiança:** MEDIUM (slice marca A/T HOLD como factual HIGH; percepção da tripulação é inferência do comportamento observado, não declaração direta de CVR isolada nesta extração).

**Proteção:** Esta é hipótese de trabalho. Não é código fechado. `notFinalClassification=true`.

---

## 11. Hipótese preliminar de Objetivo (HYP_O)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que o objetivo operacional em curso da tripulação era a continuação e conclusão da aproximação visual para pouso em 28L, sem reavaliação do estado de automação quando o perfil de energia começou a divergir.

**Confiança:** MEDIUM (objetivo de completar aproximação é factualmente consistente com ações observadas; não há evidência direta de avaliação explícita de "continuar vs arremetar" nesta janela).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`. Boundary com P-axis ainda presente.

---

## 12. Hipótese preliminar de Ação (HYP_A)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a ausência de ação corretiva de velocidade (thrust input manual, correção de atitude, ou comando de go-around coordenado) após a transição A/T HOLD e início de decaimento de velocidade representa o componente de ação (ou omissão de ação) no ponto de fuga.

**Confiança:** MEDIUM (ausência de callout de "speed" e de go-around no gate de 500 ft é factualmente âncorável; o exato momento de decisão operacional ainda requer boundary com P-axis).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`. Boundary P/A não resolvido nesta fase.

---

## 13. Lacunas e riscos

**L1 — Boundary P vs A não resolvido:** A não-percepção do modo A/T HOLD (P-axis hipótese) e a ausência de ação corretiva (A-axis hipótese) compartilham o mesmo espaço temporal. A separação exata exige evidência de CVR que discerna quando a tripulação teria podido agir se soubesse. Esta lacuna é reconhecida e registrada; não pode ser resolvida sem revisão autoral de evidência adicional.

**L2 — O-axis com confiança menor:** O objetivo operacional de "continuar a aproximação" é hipótese consistente, mas o slice (A4R180-F2) indica que a confiança no O-axis é menor do que no P-axis. Não forçar O-axis para caber em expectativa.

**L3 — Gate de estabilização como cue, não EP:** Cuidado em A4R184 para não reintroduzir o gate de estabilização como EP primário. O PAPI baixo + velocidade decaindo + razão de descida elevada são suporte ao P-axis (informação disponível não integrada), não delimitadores do EP.

**R1 — Risco de overclassification:** Importar "mode confusion" ou "automation reliance" como código fechado SERA a partir da narrativa NTSB. Este draft mantém factual-first; hipóteses são tags de trabalho.

**R2 — Risco de confundir outcome com ponto de fuga:** O impacto contra o seawall é consequência; o go-around tardio abaixo de 200 ft é consequência/agravamento. O ponto de fuga normalizado é a transição A/T HOLD + não-percepção.

---

## 14. Perguntas para revisão autoral A4R184

1. **P-axis:** A hipótese descritiva de lacuna de consciência de modo é sustentável com base em evidência de CVR disponível? Há callout ausente ou comentário de crew que ancora a não-percepção do A/T HOLD em momento discreto?
2. **Boundary P/A:** O autor deseja resolver o boundary entre não-percepção do modo (P) e ausência de ação corretiva (A), ou mantê-los como hipóteses sobrepostas para a próxima fase?
3. **O-axis:** A hipótese descritiva de continuidade da aproximação visual deve ser mantida, rebaixada para UNKNOWN, ou refinada com evidência adicional de discussão pré-pouso?
4. **Ator integrado:** Há momento na evidência em que split PF/PM seria metodologicamente justificado e suportado por evidência factual específica (ex.: um piloto chamou e outro não respondeu)?
5. **escapePointId:** O autor aprova `ASIANA-214-ESCAPE-001` como identificador único para este escopo?

---

## 15. Locks de não fechamento

- `NOT_FINAL_P_O_A` — nenhuma hipótese neste draft fecha P, O ou A.
- `NOT_RELEASED_CODE` — nenhum código liberado criado.
- `NOT_FOR_FIXTURE` — nenhuma fixture criada ou alterada.
- `NOT_FOR_BASELINE` — nenhum baseline criado ou alterado.
- `NOT_DOWNSTREAM` — nenhum downstream criado.
- `notFinalClassification: true`
- `poaClosureAllowed: false`
- `dualAuthorReviewRequired: true` — nenhum fechamento de eixo sem revisão dual-autor.
