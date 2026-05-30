# A4R183 Draft — A4R183-DRAFT-0002 — Comair 5191 LEX

Status: SCOPE_NORMALIZED_ADJUDICATION_DRAFT
draftId: A4R183-DRAFT-0002
sourceA4R181Id: A4R181-ADJ-0002
sourceA4R182Id: A4R182-DEC-0002
eventKey: Comair 5191 LEX (Bombardier CL-600-2B19, decolagem em pista errada, 2006)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
notFinalClassification: true
poaClosureAllowed: false

---

## 1. Identificação do evento

Comair 5191, Bombardier CL-600-2B19 (CRJ-100), vôo doméstico noturno LEX → ATL, 27 ago 2006. Aeronave designada para pista 22 (7.000 ft), decolou na pista 26 (3.500 ft) após lineup errado, resultando em overrun.

---

## 2. Fontes internas lidas

- `A4R180-EXTRACTION-0002.md` — extração estruturada completa (seções 1–17)
- `AUTHOR_DECISION_PACKET_A4R181_0002_COMAIR-5191.md` — dossiê autoral BATCH_A
- `SERA_REAL_EVENT_AUTHOR_DECISION_INTAKE_A4R182_v0.2.0.md` — decisão autoral A4R182
- `SERA_REAL_EVENT_AUTHOR_DECISION_CHANGE_REGISTER_A4R182_v0.2.0.md` — change register
- sourceAnchors utilizados: COMAIR-SRC-EV-001, COMAIR-SRC-EV-002, COMAIR-SRC-EV-003

---

## 3. Decisão autoral A4R182 usada

- **sourceA4R182Id:** A4R182-DEC-0002
- **authorDecision:** APPROVED_WITH_ADJUSTMENT
- **escapePointAdjustmentRequired:** true
- **Ajuste registrado:** Zona de três momentos candidatos (cruzamento de hold-short / lineup / início de corrida) substituída por momento discreto único. Escopo normalizado: virada à esquerda e alinhamento na pista 26 como primeira ação errada da tripulação. O tracker A4R129 que marcava "escape point statement não resolvido" é resolvido pelo autor.

---

## 4. Ponto de fuga autoral normalizado

> Primeira ação errada da tripulação: virada à esquerda e alinhamento na pista 26 em vez de continuar para a pista 22 designada.

**Tipo de escopo:** Momento discreto (ação observável de lineup em pista errada).

**Regra de ponto de fuga único:** Um único escapePointId para este escopo. O cruzamento do hold-short da 26 (anterior) é contexto/táxi. O início da corrida de decolagem e o overrun (posteriores) são consequência/agravamento.

---

## 5. Estado seguro imediatamente anterior

Aeronave em táxi pela taxiway A, orientada para cruzar o hold-short da pista 26 e continuar em direção ao limiar da pista 22 (designada), com briefing repetido referenciando pista 22 e heading bugs ajustados para ~225°.

**Âncora factual:** COMAIR-SRC-EV-001/002 — briefing com referência à pista 22; heading bugs em ~225°; clearance de táxi via taxiway A com destino à pista 22.

---

## 6. Transição para estado inseguro

A tripulação, ao chegar ao ponto de entrada da pista 26, virou à esquerda e alinhou a aeronave na pista 26 (heading ~260°) em vez de continuar em frente pelo restante da taxiway A até o limiar da pista 22. Nesse momento, o heading da aeronave divergiu dos heading bugs (~225°) sem que a discrepância fosse identificada ou verbalizada. A clearance de decolagem foi solicitada e concedida sem que o número da pista fosse explicitado em nenhum dos lados.

**Âncora factual:** COMAIR-SRC-EV-003 — cruzamento do hold-short da 26 e virada à esquerda para entrar na pista 26; omissão do número da pista na clearance (linhas ~566–573).

---

## 7. Ato/condição insegura observável no ponto de fuga

Aeronave alinhada na pista 26 com heading ~260° enquanto os heading bugs do PFD indicavam ~225° (referência à pista 22 briefada). Cue de mismatch de heading disponível e factualmente observável no cockpit; iluminação diferencial entre as duas pistas também disponível como cue visual externo. Nenhum callout de verificação de identidade de pista registrado antes da solicitação de clearance de decolagem.

**Âncora factual:** COMAIR-SRC-EV-003 — aeronave na pista 26 com heading ~260°; heading bugs em ~225°; omissão de verificação de pista antes da decolagem.

---

## 8. Ator operacional integrado

**integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL

Tripulação: FO como PF e captain como PM nesse vôo. Tratados como bloco integrado; não se aplica split PF/PM nesta fase (`actorSplitAllowedThisPhase=false`). A contribuição contextual do ATC (omissão de confirmação de pista na clearance) não é co-ponto de fuga neste escopo; permanece como fator contextual para registro.

---

## 9. Evidências factuais extraídas

| fragmentId | sourceAnchor | Fato factual | Uso no draft |
|---|---|---|---|
| COMAIR-A4R183-F1 | COMAIR-SRC-EV-001/002 | Briefing repetido com referência à pista 22; heading bugs ajustados para ~225° | Estado seguro anterior; objetivo operacional estabelecido |
| COMAIR-A4R183-F2 | COMAIR-SRC-EV-002 | Clearance de táxi via taxiway A para pista 22 | Contexto operacional e intenção ATC/crew |
| COMAIR-A4R183-F3 | COMAIR-SRC-EV-003 | Virada à esquerda para entrar na pista 26; heading da aeronave ~260° vs heading bugs ~225° | Ancora a transição para estado inseguro e ato observável no EP |
| COMAIR-A4R183-F4 | COMAIR-SRC-EV-003 (566–573) | Clearance de decolagem solicitada/concedida sem número de pista explicitado | Contribuição contextual ATC; não co-EP |
| COMAIR-A4R183-F5 | COMAIR-SRC-EV-003 (588–593) | Corrida de decolagem na pista 26; callouts V1/VR antecipados; overrun | Consequência/agravamento — posterior ao EP |

---

## 10. Hipótese preliminar de Percepção (HYP_P)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a tripulação integrada não detectou o mismatch entre o heading de lineup na pista 26 (~260°) e o heading bugs configurados para a pista 22 (~225°), nem realizou verificação ativa de identidade de pista (marcações, iluminação diferencial, comprimento visual) no momento do alinhamento. A informação para verificação estava factualmente disponível no cockpit.

**Confiança:** MEDIUM-HIGH (o mismatch de heading é factualmente âncorável — COMAIR-SRC-EV-003 e extração seção 14 step 4; ausência de callout de verificação é consistente com comportamento observado).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 11. Hipótese preliminar de Objetivo (HYP_O)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que o objetivo operacional da tripulação era a decolagem pela pista 22 (como briefada e clearada), mantido sem reavaliação quando o lineup divergiu. Não há evidência de que a tripulação reconheceu estar na pista 26; o objetivo de decolagem em si não estava em conflito com a intenção declarada.

**Confiança:** MEDIUM (objetivo de decolagem em pista 22 é consistente com todos os atos anteriores; a manutenção desse objetivo enquanto o lineup divergia é hipótese, não declaração explícita).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 12. Hipótese preliminar de Ação (HYP_A)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a ação de virar à esquerda e alinhar na pista 26 — sem cross-check de heading bug, marcações de pista ou verificação de identidade — constitui o ato observável no ponto de fuga. A ação de alignment em si pode ser descrita sem inferir intenção.

**Confiança:** MEDIUM-HIGH (virada à esquerda e alinhamento na pista 26 são factualmente documentados em COMAIR-SRC-EV-003 com HIGH confidence na extração).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 13. Lacunas e riscos

**L1 — Separação P vs A na mesma ação:** O ato de virar/alinhar na pista 26 (A-axis hipótese) é simultaneamente o momento em que a não-percepção do mismatch (P-axis hipótese) era observável. A linha divisória entre "ação errada" e "percepção errada que levou à ação" requer boundary resolution autoral se for relevante para a próxima fase.

**L2 — Timestamp/posição exata do lineup:** A extração ancora o lineup factualmente mas não isola o segundo/posição GPS exata do momento de virada. Para escopo discreto (não zona), o autor pode querer ancorar mais precisamente em A4R184.

**L3 — Papel contextual do ATC:** A omissão de confirmação de pista pelo controlador (solo, noturno) é fato contextual documentado. Não é co-ponto de fuga neste escopo, mas pode ser relevante para framing de atores contextuais em fase futura.

**R1 — Risco de reintroduzir a zona:** Em A4R184, evitar recuar o EP para o hold-short crossing (anterior) ou avançar para o início da corrida (posterior). O escopo está ancorado na virada e alinhamento.

**R2 — Risco de importar narrativa NTSB de fadiga/single-controller:** Manter factual-first. Não usar fadiga ou single-controller como código SERA sem evidência factual direta.

---

## 14. Perguntas para revisão autoral A4R184

1. **P-axis:** A hipótese descritiva de não-integração da identidade/heading de pista é adequada? Há evidência de CVR de que o mismatch de heading foi visto/comentado e ignorado, vs. não visto de fato?
2. **A-axis:** A formulação descritiva de alinhamento em pista incorreta descreve suficientemente o ato observável, ou o autor prefere uma formulação mais específica (ex.: "ausência de callout de verificação de pista antes do lineup")?
3. **Boundary P/A:** O autor deseja manter P e A como hipóteses separadas, ou tratá-los como uma única entrada de "runway awareness failure" nesta fase?
4. **ATC contextual:** O autor confirma que a omissão do controlador permanece fora do escopo primário de EP, registrada apenas como fator contextual?
5. **escapePointId:** O autor aprova `COMAIR-5191-ESCAPE-001` como identificador único para este escopo?

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
