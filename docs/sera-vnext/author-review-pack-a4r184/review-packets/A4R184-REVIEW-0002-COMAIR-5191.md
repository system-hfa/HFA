# A4R184 Review Packet — A4R184-REVIEW-0002 — Comair 5191 LEX

Status: AUTHOR_REVIEW_PACKET_ACTIVE
reviewId: A4R184-REVIEW-0002
sourceDraftId: A4R183-DRAFT-0002
sourceA4R182Id: A4R182-DEC-0002
sourceA4R181Id: A4R181-ADJ-0002
eventKey: Comair 5191 LEX (Bombardier CL-600-2B19, decolagem em pista errada, 2006)
methodology: SERA
notFinalClassification: true
poaClosureAllowed: false
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Ponto de fuga aprovado (A4R182)

> Primeira ação errada da tripulação: virada à esquerda e alinhamento na pista 26 em vez de continuar para a pista 22 designada.

- **authorDecision A4R182:** APPROVED_WITH_ADJUSTMENT
- **escapePointId proposto:** COMAIR-5191-ESCAPE-001
- **Tipo de escopo:** Momento discreto — ação observável de lineup em pista errada.
- **Ajuste A4R182:** Zona de três momentos candidatos (hold-short / lineup / início de corrida) substituída por momento discreto único: virada à esquerda e alinhamento na pista 26. Tracker A4R129 resolvido pelo autor.

---

## 2. Ator aprovado

- **integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL
- **Composição:** FO (PF) + captain (PM)
- **actorSplitAllowedThisPhase:** false
- **Nota sobre ATC:** A omissão do controlador de confirmar a pista não é co-ator no EP primário; permanece como fator contextual.

---

## 3. Estado seguro imediatamente anterior

Aeronave em táxi pela taxiway A, orientada para cruzar o hold-short da pista 26 e continuar em direção ao limiar da pista 22. Briefing repetido referenciando pista 22; heading bugs ajustados para ~225°; clearance de táxi via taxiway A com destino à pista 22.

**Âncoras:** COMAIR-SRC-EV-001/002

---

## 4. Transição para estado inseguro

A tripulação, ao chegar ao ponto de entrada da pista 26, virou à esquerda e alinhou a aeronave na pista 26 (heading ~260°) em vez de continuar para a pista 22. O heading da aeronave divergiu dos heading bugs (~225°) sem que a discrepância fosse identificada ou verbalizada. Clearance de decolagem foi solicitada e concedida sem que o número da pista fosse explicitado em nenhum dos lados.

**Âncora:** COMAIR-SRC-EV-003 (linhas ~566–573)

---

## 5. Evidências factuais disponíveis

| fragmentId | sourceAnchor | Fato factual | Confiança | Uso potencial |
|---|---|---|---|---|
| COMAIR-A4R183-F1 | COMAIR-SRC-EV-001/002 | Briefing repetido com referência à pista 22; heading bugs ajustados para ~225° | HIGH | Estado seguro anterior; objetivo operacional declarado |
| COMAIR-A4R183-F2 | COMAIR-SRC-EV-002 | Clearance de táxi via taxiway A para pista 22 | HIGH | Contexto operacional e intenção ATC/crew |
| COMAIR-A4R183-F3 | COMAIR-SRC-EV-003 | Virada à esquerda para entrar na pista 26; heading da aeronave ~260° vs heading bugs ~225° | HIGH | Ancora EP — transição para estado inseguro e ato observável |
| COMAIR-A4R183-F4 | COMAIR-SRC-EV-003 (566–573) | Clearance de decolagem solicitada/concedida sem número de pista explicitado | HIGH | Contribuição contextual ATC — NÃO co-EP |
| COMAIR-A4R183-F5 | COMAIR-SRC-EV-003 (588–593) | Corrida de decolagem na pista 26; callouts V1/VR antecipados; overrun | HIGH | Consequência/agravamento — NÃO co-EP |

---

## 6. Rationale descritivo A4R183 (não canônico — para referência)

**P (UNKNOWN):** Hipótese de que a tripulação integrada não detectou o mismatch entre o heading de lineup na pista 26 (~260°) e o heading bugs configurados para a pista 22 (~225°), nem realizou verificação ativa de identidade de pista. A informação para verificação estava factualmente disponível no cockpit.

**O (UNKNOWN):** Hipótese de que o objetivo operacional da tripulação era a decolagem pela pista 22 (como briefada e clearada), mantido sem reavaliação quando o lineup divergiu. Não há evidência de que a tripulação reconheceu estar na pista 26.

**A (UNKNOWN):** Hipótese de que a ação de virar à esquerda e alinhar na pista 26 — sem cross-check de heading bug, marcações de pista ou verificação de identidade — constitui o ato observável no ponto de fuga.

---

## 7. Perguntas para decisão autoral

### Eixo P — Percepção

**P-1:** O mismatch entre heading de lineup (~260°) e heading bugs (~225°) — documentado com HIGH confidence em COMAIR-SRC-EV-003 — é evidência suficiente para hipótese canônica de não-detecção de mismatch de identidade de pista, ou o autor prefere evidência de CVR que confirme explicitamente que o mismatch foi visto e não integrado vs. não visto de fato?

**P-2:** Há verbalização no CVR nesta janela que indique algum tipo de awareness sobre a pista ou heading — positiva ou negativa — que sirva como âncora de percepção?

### Eixo O — Objetivo

**O-1:** O objetivo de decolagem pela pista 22 é evidenciado pelo briefing (F1) e pela clearance (F2). Isso constitui base para HYP_O-*, capturando o objetivo mantido sem reavaliação? Ou o O-axis é redundante aqui porque o objetivo era correto e o problema era de percepção e ação?

**O-2:** O autor prefere manter P e A como hipóteses distintas, ou considera que "runway awareness failure" é uma formulação mais útil que integra P e A nesta fase?

### Eixo A — Ação

**A-1:** A formulação "alinhamento em pista incorreta sem cross-check de heading bug ou verificação de identidade de pista" descreve suficientemente o ato observável no EP para hipótese canônica A? Ou o autor prefere uma formulação mais específica?

**A-2:** O ato de virar/alinhar na pista 26 (A-axis hipótese) é separável da não-percepção do mismatch (P-axis hipótese) com racional distinto, ou são o mesmo evento descrito por dois ângulos?

### ATC contextual e aprovação de escapePointId

**C-1:** O autor confirma que a omissão do controlador (não explicitação do número de pista na clearance) permanece como fator contextual fora do escopo primário do EP?

**EP-1:** O autor aprova `COMAIR-5191-ESCAPE-001` como identificador único para este escopo?

---

## 8. Opções autorais por eixo

### Eixo P
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN + AJUSTO → HYP_P-* | Evidência de MEDIUM-HIGH confidence; mismatch de heading factualmente documentado; ausência de callout de verificação consistente. Candidato disponível para revisão autoral. |
| CONFIRMO UNKNOWN | Manter UNKNOWN pendente de confirmação por CVR de que o mismatch foi "não visto" vs "visto e não integrado" |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar CVR evidence explícita sobre awareness de heading/pista |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONSERVATIVE_UNKNOWN_RECOMMENDED — boundary P/A não resolvido; manter UNKNOWN até que o autor separe os eixos com racional distinto.

### Eixo O
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — objetivo de decolagem na pista 22 era correto; O-axis pode ser redundante com P e A |
| AJUSTO → HYP_O-* | Propor código canônico específico se "objetivo mantido sem reavaliação" é hipótese O distinta |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN ou ADIO.

### Eixo A
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN + AJUSTO → HYP_A-* | Evidência de MEDIUM-HIGH confidence; alinhamento na pista 26 factualmente documentado com HIGH confidence. Candidato disponível para revisão autoral. |
| CONFIRMO UNKNOWN | Manter UNKNOWN se o boundary P/A não puder ser resolvido com racional distinto |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** A-axis tem base factual razoável para proposta de candidato — decisão autoral.

---

## 9. Riscos de erro por eixo

| Eixo | Risco | Sinal de alerta |
|---|---|---|
| P | Double-count: usar mismatch de heading (F3) para suportar P e A sem racional distinto | F3 aparece na justificativa de ambos os eixos sem diferenciação |
| O | Forçar O-axis para capturar objetivo de decolagem que era correto operacionalmente | O-axis sem conteúdo conceitual distinto de P e A |
| A | Ampliar A-axis para incluir a corrida de decolagem (F5) ou o cruzamento do hold-short | EP migra para consequência ou para contexto anterior ao EP |
| Geral | Importar "fadiga do controlador" ou "single-controller" da narrativa NTSB | Rótulo sem fragmentId + sourceAnchor interno |
| Geral | Reintroduzir zona ampla em vez de momento discreto aprovado em A4R182 | EP perde ancoragem discreta; volta para zona de 3 candidatos |

---

## 10. Recomendação conservadora do pacote

Manter UNKNOWN nos 3 eixos nesta fase (CONSERVATIVE_UNKNOWN_RECOMMENDED em P, O e A). O mismatch de heading (~260° vs ~225°) e a ação de alinhamento na pista 26 são ambos documentados com HIGH confidence em COMAIR-SRC-EV-003, mas o boundary P/A não está resolvido — o mesmo fragmento (F3) pode suportar ambos os eixos sem racional distinto. Nenhum candidato HYP_P-* ou HYP_A-* deve ser proposto antes que o autor resolva a separabilidade P/A. O O-axis provavelmente permanece UNKNOWN ou adiado.

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
