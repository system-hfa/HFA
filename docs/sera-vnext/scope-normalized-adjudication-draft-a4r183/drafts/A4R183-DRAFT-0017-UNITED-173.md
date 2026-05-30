# A4R183 Draft — A4R183-DRAFT-0017 — United 173 PDX

Status: SCOPE_NORMALIZED_ADJUDICATION_DRAFT
draftId: A4R183-DRAFT-0017
sourceA4R181Id: A4R181-ADJ-0017
sourceA4R182Id: A4R182-DEC-0005
eventKey: United 173 PDX (DC-8-61, fuel exhaustion, 1978)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
notFinalClassification: true
poaClosureAllowed: false

---

## 1. Identificação do evento

United Airlines 173, McDonnell Douglas DC-8-61, vôo DEN → Portland (PDX), 28 dez 1978. Tripulação em holding para troubleshooting de gear malfunction. Fuel exhaustion por extensão excessiva do holding; aeronave impactou área residencial antes de atingir PDX.

---

## 2. Fontes internas lidas

- `A4R180-EXTRACTION-0017.md` — extração estruturada completa (seções 1–17)
- `AUTHOR_DECISION_PACKET_A4R181_0017_UNITED-173.md` — dossiê autoral BATCH_A
- `SERA_REAL_EVENT_AUTHOR_DECISION_INTAKE_A4R182_v0.2.0.md` — decisão autoral A4R182
- `SERA_REAL_EVENT_AUTHOR_DECISION_CHANGE_REGISTER_A4R182_v0.2.0.md` — change register (sem ajuste estrutural; clarificação de framing)
- sourceAnchors utilizados: U173-E1, U173-E2, U173-E3, U173-E4, U173-E5, U173-E6, U173-E7
- Nota: OCR artifacts no TXT fonte (NTSB AAR-79-07) sinalizam cautela na interpretação de detalhes finos; fatos de alto nível são HIGH confidence.

---

## 3. Decisão autoral A4R182 usada

- **sourceA4R182Id:** A4R182-DEC-0005
- **authorDecision:** APPROVED
- **escapePointAdjustmentRequired:** false
- **Clarificação de framing A4R182:** Ênfase na decisão ativa de manter troubleshooting — não apenas na janela temporal de combustível crítico. O framing é: a tripulação manteve o troubleshooting como objetivo operacional ativo quando a necessidade já era executar pouso imediato.

---

## 4. Ponto de fuga autoral normalizado

> Manutenção de troubleshooting de gear malfunction quando a necessidade operacional já era abandonar o troubleshooting e executar pouso imediato.

**Tipo de escopo:** Janela de decisão operacional durante o holding (fuel state crítico + objetivo persistente de troubleshooting).

**Âncora temporal:** Período em que o fuel state foi verbalizado pelo FE como próximo ao nível crítico e o captain manteve foco em gear status em vez de comandar "land now". O timestamp/fuel quantity exato desta janela não está isolado com precisão no slice disponível — registrado como lacuna para A4R184.

**Regra de ponto de fuga único:** Um único escapePointId. O fuel exhaustion dos motores e o impacto em área residencial são consequência. O gear malfunction inicial é contexto/gatilho do holding. O go-around tardio (se aplicável) é agravamento.

---

## 5. Estado seguro imediatamente anterior

Aeronave em holding autorizado por ATC, fuel acima de reserva mínima, gear troubleshooting em andamento com checklists sendo executados. Opção de "land now" ainda disponível com margem de fuel operacional.

**Âncora factual:** U173-E1 — gear indication anomaly ao baixar trem; U173-E2 — crew executando holding autorizado com checklists e coordenação com ATC/maintenance; extração seção 13 — holding começou com fuel ~12.000 lb estimado para DC-8-61.

---

## 6. Transição para estado inseguro

Durante o holding, o flight engineer verbalizou repetidamente atualizações de fuel state indicando redução progressiva. Em determinado momento, o fuel state atingiu nível próximo à reserva final (~3.000–5.000 lb, per extração seção 13), ponto em que a decisão de "land now" se tornava operacionalmente necessária. O captain manteve foco no troubleshooting/preparação de emergency landing em vez de transitar para execução imediata de pouso.

**Âncora factual:** U173-E3 — "crew attention coupled a gear troubleshooting enquanto low-fuel risk escalou"; U173-E4/E5 — "continuação de objetivo de troubleshooting persistiu com fuel risk piorando"; U173-E6/E7 — "timing de action choices sugere boundary entre selection adequacy e feedback integration".

---

## 7. Ato/condição insegura observável no ponto de fuga

Manutenção do objetivo de troubleshooting/preparação de emergency landing enquanto o FE verbalizava fuel state em nível crítico, sem transição do captain para decisão de "land now" imediato. As verbalizações do FE sobre fuel state eram factualmente observáveis/audíveis no cockpit.

**Âncora factual:** U173-E1 — "CVR com fuel advisories repetidos e queries explícitas sobre fuel restante"; U173-E3 — atenção acoplada ao troubleshooting; U173-E5 — objetivo persistente.

**Nota de OCR:** O timestamp/fuel quantity exato das verbalizações do FE e da janela de decisão disponível requerem verificação no TXT fonte (AAR-79-07) em fase posterior; OCR artifacts foram sinalizados na extração.

---

## 8. Ator operacional integrado

**integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL

Tripulação: captain (PIC — decisão operacional primária), first officer e flight engineer. Tratados como bloco integrado; não se aplica split Captain/FO/FE nesta fase (`actorSplitAllowedThisPhase=false`). O FE exercia papel de fuel monitor; o captain exercia autoridade decisória; a coordenação entre eles é parte do bloco integrado para este escopo.

---

## 9. Evidências factuais extraídas

| fragmentId | sourceAnchor | Fato factual | Uso no draft |
|---|---|---|---|
| U173-A4R183-F1 | U173-E1 | CVR com fuel advisories repetidos e queries sobre fuel restante | Ancora disponibilidade de informação de fuel (P-axis cues) |
| U173-A4R183-F2 | U173-E3 | Crew attention coupled a gear troubleshooting com low-fuel risk escalando | Ancora a attentional fixation como componente do P-axis hipótese |
| U173-A4R183-F3 | U173-E5 | Continuação de objetivo de troubleshooting com fuel risk piorando | Ancora o objetivo persistente (O-axis hipótese) |
| U173-A4R183-F4 | U173-E6/E7 | Timing de action choices indica boundary entre selection adequacy e feedback integration | Ancora o componente de ação (ou omissão) no EP |
| U173-A4R183-F5 | U173-E1 (contexto) | Gear indicator anomaly ao baixar trem | Contexto do gatilho do holding — não EP |

---

## 10. Hipótese preliminar de Percepção (HYP_P)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a atenção da tripulação integrada estava acoplada ao gear troubleshooting de forma que as verbalizações repetidas do FE sobre fuel state crítico não foram integradas como gatilho imediato de "land now". A informação de fuel estado era factualmente disponível (vocalizada pelo FE), mas a percepção operacional da urgência de pouso imediato não foi consolidada.

**Confiança:** MEDIUM (verbalizações repetidas do FE são factualmente âncorável em CVR; que o captain "não integrou" como gatilho é inferência do comportamento observado — a transição não ocorreu cedo o suficiente per extração).

**Nota de OCR:** Detalhes finos sobre o timing das verbalizações do FE dependem de verificação no TXT fonte; confiança limitada a MEDIUM por este motivo.

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`.

---

## 11. Hipótese preliminar de Objetivo (HYP_O)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que o objetivo operacional ativo do captain/tripulação era resolver ou confirmar o status do gear e preparar uma emergency landing adequada, antes de executar o pouso. Este objetivo era legítimo em fases anteriores do holding mas persistiu além da janela de segurança de fuel.

**Confiança:** MEDIUM (objetivo de resolver gear antes de pousar é consistente com ações documentadas — checklists, coordenação com maintenance, discussão de opções; a persistência além da janela de segurança é inferência do outcome).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`. Não usar o fuel exhaustion como prova retroativa de que o objetivo estava "errado" desde o início.

---

## 12. Hipótese preliminar de Ação (HYP_A)

**Tag:** `UNKNOWN`

**Rationale (descritivo, não canônico):** ver formulação textual abaixo.

**Formulação:** Hipótese de que a ausência de decisão e comando de "land now" na janela de fuel crítico (quando o FE verbalizava níveis próximos à reserva final) representa a omissão de ação no ponto de fuga normalizado.

**Confiança:** MEDIUM (a transição não ocorreu cedo o suficiente — fato factual de HIGH confidence per extração seção 13; o momento preciso da "janela" requer timestamp de verificação de OCR).

**Proteção:** Hipótese de trabalho. `notFinalClassification=true`. Boundary com P-axis (attentional fixation como razão para a omissão) ainda presente.

---

## 13. Lacunas e riscos

**L1 — Timestamp/fuel quantity exato não isolado:** A extração descreve a janela de fuel crítico em termos aproximados (~3.000–5.000 lb, per seção 13 narrativa) mas não isola o timestamp/fuel quantity exato em que a decisão de "land now" era operacionalmente necessária. Para fechamento futuro, verificação direta no AAR-79-07 é necessária.

**L2 — OCR artifacts no TXT fonte:** A extração sinaliza OCR noise no TXT do NTSB AAR-79-07. Detalhes finos de timing das verbalizações do FE requerem verificação contra o PDF/transcrito limpo antes de qualquer fechamento.

**L3 — Multi-actor potencial não resolvido:** O capitão (decisão), o FO (monitoramento/suporte) e o FE (fuel monitor) têm papéis distintos que poderiam eventualmente suportar actorContributionIds separados. Nesta fase, bloco integrado. Registrar para decisão autoral futura.

**R1 — Risco de importar "CRM failure" como código:** Não usar terminologia de CRM, crew coordination failure, ou treinamento como código SERA a partir da análise NTSB. Manter factual-first.

**R2 — Boundary P/A:** A attentional fixation (P) e a ausência de "land now" (A) compartilham o mesmo espaço temporal. A separação exata exige evidência que discerna quando o captain teria podido decidir se a percepção do fuel crítico fosse diferente.

**R3 — Gear indicator como contexto:** A anomalia do indicador de gear é o gatilho operacional do holding, não um elemento do EP. Em A4R184, não reintroduzi-la como componente do ponto de fuga.

---

## 14. Perguntas para revisão autoral A4R184

1. **Timestamp:** O autor deseja investir na verificação do TXT fonte (NTSB AAR-79-07) para isolar o timestamp/fuel quantity exato do EP normalizado, ou mantê-lo como janela aproximada?
2. **P-axis:** A hipótese descritiva de fixação atencional no troubleshooting é adequada para este caso? O autor prefere uma formulação alternativa (ex.: "não integração de fuel state como prioridade operacional")?
3. **Boundary P/A:** O autor deseja resolver o boundary entre attentional fixation (P) e ausência de "land now" (A), ou manter como hipóteses sobrepostas nesta fase?
4. **Multi-actor:** O split Captain (decisão) / FE (fuel monitor) é relevante para o escopo metodológico? Se sim, em qual fase o autor quer formalizar?
5. **escapePointId:** O autor aprova `UNITED-173-ESCAPE-001` como identificador único para este escopo?

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
