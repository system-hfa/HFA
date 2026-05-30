# A4R184 Review Packet — A4R184-REVIEW-0017 — United 173 PDX

Status: AUTHOR_REVIEW_PACKET_ACTIVE
reviewId: A4R184-REVIEW-0017
sourceDraftId: A4R183-DRAFT-0017
sourceA4R182Id: A4R182-DEC-0005
sourceA4R181Id: A4R181-ADJ-0017
eventKey: United 173 PDX (DC-8-61, fuel exhaustion, 1978)
methodology: SERA
notFinalClassification: true
poaClosureAllowed: false
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Ponto de fuga aprovado (A4R182)

> Manutenção de troubleshooting de gear malfunction quando a necessidade operacional já era abandonar o troubleshooting e executar pouso imediato.

- **authorDecision A4R182:** APPROVED (sem ajuste estrutural)
- **escapePointId proposto:** UNITED-173-ESCAPE-001
- **Tipo de escopo:** Janela de decisão operacional durante o holding (fuel state crítico + objetivo persistente de troubleshooting).
- **Clarificação de framing A4R182:** Ênfase na decisão ativa de manter troubleshooting — não apenas na janela temporal de combustível crítico. O framing é: a tripulação manteve o troubleshooting como objetivo operacional ativo quando a necessidade já era executar pouso imediato.
- **Nota de OCR:** Timestamp/fuel quantity exato da janela de EP não isolado com precisão — OCR artifacts no TXT fonte (NTSB AAR-79-07). Registrado como lacuna para A4R184.

---

## 2. Ator aprovado

- **integratedActorModel:** CREW_INTEGRATED_ACTOR_MODEL
- **Composição:** captain (PIC — decisão operacional primária) + first officer + flight engineer (fuel monitor)
- **actorSplitAllowedThisPhase:** false
- **Nota sobre papéis:** O FE exercia papel de fuel monitor; o captain exercia autoridade decisória; a coordenação entre eles é parte do bloco integrado para este escopo. Split captain/FE pode ser objeto de fase futura se o autor assim deliberar.

---

## 3. Estado seguro imediatamente anterior

Aeronave em holding autorizado por ATC, fuel acima de reserva mínima, gear troubleshooting em andamento com checklists sendo executados. Opção de "land now" ainda disponível com margem de fuel operacional.

**Âncoras:** U173-E1 (gear indication anomaly ao baixar trem); U173-E2 (crew executando holding autorizado com checklists e coordenação com ATC/maintenance); extração seção 13 (fuel inicial do holding ~12.000 lb estimado para DC-8-61)

---

## 4. Transição para estado inseguro

Durante o holding, o flight engineer verbalizou repetidamente atualizações de fuel state indicando redução progressiva. Em determinado momento, o fuel state atingiu nível próximo à reserva final (~3.000–5.000 lb, per extração seção 13). O captain manteve foco no troubleshooting/preparação de emergency landing em vez de transitar para execução imediata de pouso.

**Âncoras:** U173-E3 (crew attention coupled ao gear troubleshooting com low-fuel risk escalando); U173-E4/E5 (continuação de objetivo de troubleshooting com fuel risk piorando); U173-E6/E7 (timing de action choices)

**Nota crítica de OCR:** O timestamp/fuel quantity exato das verbalizações do FE e da janela de decisão disponível requerem verificação no TXT fonte (AAR-79-07) em fase posterior. OCR artifacts foram sinalizados na extração. Os fatos de alto nível (holding prolongado, FE verbalizando fuel advisories, captain mantendo foco em gear) são HIGH confidence; os detalhes finos de timing são MEDIUM por causa dos OCR artifacts.

---

## 5. Evidências factuais disponíveis

| fragmentId | sourceAnchor | Fato factual | Confiança | Uso potencial |
|---|---|---|---|---|
| U173-A4R183-F1 | U173-E1 | CVR com fuel advisories repetidos e queries explícitas sobre fuel restante | HIGH (alto nível) / MEDIUM (detalhes finos) | Ancora disponibilidade de informação de fuel (P-axis cues) |
| U173-A4R183-F2 | U173-E3 | Crew attention coupled ao gear troubleshooting com low-fuel risk escalando | HIGH (estrutural) | Ancora attentional focus como componente do P-axis hipótese |
| U173-A4R183-F3 | U173-E5 | Continuação de objetivo de troubleshooting com fuel risk piorando | HIGH (estrutural) | Ancora objetivo persistente (O-axis hipótese) |
| U173-A4R183-F4 | U173-E6/E7 | Timing de action choices indica boundary entre selection adequacy e feedback integration | MEDIUM | Ancora componente de ação ou omissão no EP |
| U173-A4R183-F5 | U173-E1 (contexto) | Gear indicator anomaly ao baixar trem | HIGH | Contexto do gatilho do holding — NÃO EP |

---

## 6. Rationale descritivo A4R183 (não canônico — para referência)

**P (UNKNOWN):** Hipótese de que a atenção da tripulação integrada estava acoplada ao gear troubleshooting de forma que as verbalizações repetidas do FE sobre fuel state crítico não foram integradas como gatilho imediato de "land now". A informação de fuel estado era factualmente disponível (vocalizada pelo FE), mas a percepção operacional da urgência de pouso imediato não foi consolidada.

**O (UNKNOWN):** Hipótese de que o objetivo operacional ativo do captain/tripulação era resolver ou confirmar o status do gear e preparar uma emergency landing adequada, antes de executar o pouso. Este objetivo era legítimo em fases anteriores do holding mas persistiu além da janela de segurança de fuel.

**A (UNKNOWN):** Hipótese de que a ausência de decisão e comando de "land now" na janela de fuel crítico (quando o FE verbalizava níveis próximos à reserva final) representa a omissão de ação no ponto de fuga normalizado.

---

## 7. Perguntas para decisão autoral

### Verificação de fonte (pré-requisito recomendado)

**V-1:** O autor deseja investir na verificação do TXT fonte (NTSB AAR-79-07) para isolar o timestamp/fuel quantity exato da janela do EP normalizado antes de responder às perguntas de eixo? Esta verificação é recomendada pelo pacote antes de qualquer proposta de candidato HYP_P-* ou HYP_A-*.

**V-2:** O autor considera que os fatos de alto nível (holding prolongado + FE verbalizando advisories + captain mantendo foco em gear) são suficientes para hipótese de nível MEDIUM sem verificação adicional de timing fino?

### Eixo P — Percepção

**P-1:** As verbalizações repetidas do FE sobre fuel state (F1, HIGH confidence no nível estrutural) são âncoras suficientes para hipótese de não-integração de urgência, ou os OCR artifacts nos detalhes de timing são impeditivos para proposta de HYP_P-*?

**P-2:** A formulação descritiva de "atenção acoplada ao troubleshooting" (F2) descreve adequadamente a hipótese P para este caso, ou o autor prefere formulação mais específica — ex.: "não integração de fuel state como prioridade operacional"?

### Eixo O — Objetivo

**O-1:** A persistência do objetivo de "resolver o gear antes de pousar" (F3) além da janela de segurança de fuel constitui hipótese O distinta com base factual razoável? O autor deve responder com atenção ao risco de outcome bias: o objetivo era legítimo no início do holding.

**O-2:** O author considera que este O-axis pode ser proposto como candidato mesmo com o risco de que o outcome (fuel exhaustion) seja interpretado retroativamente como evidência de que o objetivo estava "errado"?

### Eixo A — Ação

**A-1:** A janela aproximada de fuel crítico (~3.000–5.000 lb, per extração seção 13) é suficiente como âncora temporal para HYP_A-* em nível MEDIUM, ou o autor requer o timestamp exato antes de qualquer proposta?

**A-2:** O boundary P/A (atenção acoplada ao troubleshooting como razão para a omissão de "land now") pode ser resolvido — isto é, são hipóteses conceitualmente distintas com racional separado — ou permanecem sobrepostas nesta fase?

### Multi-actor e aprovação de escapePointId

**M-1:** O split Captain (decisão) / FE (fuel monitor) é relevante para o escopo metodológico desta fase ou deve ser adiado? Em qual fase o autor quer formalizar?

**EP-1:** O autor aprova `UNITED-173-ESCAPE-001` como identificador único para este escopo?

---

## 8. Opções autorais por eixo

### Eixo P
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — OCR artifacts limitam confiança em detalhes finos; timestamp de verbalizações do FE não verificado |
| AJUSTO → HYP_P-* | Propor código canônico específico se o autor considera fatos de alto nível (F1+F2) suficientes para nível MEDIUM sem verificação de timing fino |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar verificação do TXT AAR-79-07 antes de decidir |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** PRECISO_DE_MAIS_EVIDENCIA (verificar TXT) ou CONFIRMO UNKNOWN nesta fase.

### Eixo O
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — risco de outcome bias é real; o objetivo era legítimo no início do holding |
| AJUSTO → HYP_O-* | Propor código canônico específico se o autor considera que a persistência além da janela de segurança é hipótese O distinta, com cautela explícita sobre outcome bias |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** CONFIRMO UNKNOWN com cautela explícita sobre outcome bias, ou ADIO.

### Eixo A
| Opção | Descrição |
|---|---|
| CONFIRMO UNKNOWN | Manter UNKNOWN — timestamp/fuel quantity exato não isolado; boundary P/A não resolvido |
| AJUSTO → HYP_A-* | Propor código canônico específico se o autor aceita a janela aproximada (~3.000–5.000 lb) como âncora suficiente em nível MEDIUM |
| PRECISO_DE_MAIS_EVIDENCIA | Solicitar verificação do TXT AAR-79-07 para isolar timestamp da janela de "land now" necessário |
| ADIO | Adiar para fase posterior |

**Recomendação conservadora do pacote:** PRECISO_DE_MAIS_EVIDENCIA (verificar TXT) ou CONFIRMO UNKNOWN nesta fase.

---

## 9. Riscos de erro por eixo

| Eixo | Risco | Sinal de alerta |
|---|---|---|
| P | Importar "attentional fixation" como rótulo sem evidência factual direta de CVR | Hipótese P sem fragmentId + sourceAnchor específico para o momento de não-integração |
| O | Usar outcome (fuel exhaustion) como prova retroativa de que o objetivo estava "errado" desde o início | O-axis ancorado no outcome em vez de na persistência documentada do objetivo além da janela de segurança |
| A | Ausência de timestamp/fuel quantity exato torna A-axis sem especificidade operacional | A-axis com âncora apenas em ~3.000–5.000 lb sem momento discreto verificado |
| P/A | Usar o mesmo espaço temporal (fixação + omissão de land now) para P e A sem racional distinto | P e A têm a mesma formulação temporal sem diferenciação conceitual |
| Geral | Importar "CRM failure" ou "captain authority gradient" da análise NTSB como código SERA | Rótulo externo sem fragmentId interno |
| Geral | Reintroduzir a gear indicator anomaly (F5) como componente do EP | Gear anomaly é o gatilho do holding, não o EP; violação do escopo |
| Geral | Não registrar a lacuna de OCR como limitação ativa antes de propor candidatos | Hipóteses com confiança aparente maior do que a real |

---

## 10. Recomendação conservadora do pacote

Manter UNKNOWN nos 3 eixos nesta fase, prioritariamente em razão dos OCR artifacts e da ausência de timestamp/fuel quantity exato da janela de EP.

**Alternativa:** Se o autor considerar os fatos de alto nível suficientes para nível MEDIUM, o O-axis tem suporte conceitual mais sólido do que P e A (objetivo de troubleshooting persistindo além da segurança é estruturalmente documentado em F3), mas ainda requer cuidado explícito com outcome bias.

A verificação do TXT AAR-79-07 é recomendada antes de qualquer proposta de candidato para P ou A eixo.

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
