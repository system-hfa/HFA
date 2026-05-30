# SERA Scope-Normalized Adjudication Draft A4R183 v0.2.0

Status: SCOPE_NORMALIZED_ADJUDICATION_DRAFT_COMPLETE
Phase: A4+R-183
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
sourcePhases: A4R180 / A4R181 / A4R182

## 1. Objetivo

A4R183 prepara rascunhos de adjudicação normalizados por escopo para os 5 casos BATCH_A aprovados em A4R182. Cada draft usa o `approvedEscapePointScope` de A4R182 como âncora e propõe hipóteses de trabalho (`HYP_*`) para P/O/A, sem fechá-las. Esta fase NÃO fecha eixos, não cria código liberado, não promove fixture ou baseline.

## 2. Locks (esta fase não faz)

- Não fecha P, O ou A.
- Não cria selectedCode com status fechado.
- Não cria código liberado.
- Não cria fixture nem baseline.
- Não altera runner oficial, motor SERA, runtime, arquivos .ts.
- Não cria recomendações, HFACS, Risk/ERC, ARMS/ERC, finalConclusion, downstream.
- Não chama LLM/API externa.
- Não importa conclusão de relatório externo (NTSB/TSB) como código SERA.

## 3. Natureza dos drafts

Cada draft em `drafts/` é um rascunho de adjudicação normalizado por escopo com as seguintes garantias:

- `notFinalClassification: true` em todos os 5.
- `poaClosureAllowed: false` em todos os 5.
- `dualAuthorReviewRequired: true` em todos os 5.
- Campos estruturados hypP/hypO/hypA usam apenas códigos canônicos HYP_P-*/HYP_O-*/HYP_A-* ou UNKNOWN — sem rótulos livres.
- Boundary zones e lacunas são explicitamente documentadas.
- Perguntas específicas para revisão autoral A4R184 são incluídas em cada draft.

## 4. Sumário dos 5 drafts

### A4R183-DRAFT-0001 — Asiana 214 SFO
- **Ponto de fuga normalizado:** Entrada em modo HOLD do autothrottle com início de saída do perfil não percebida pela tripulação.
- **HYP_P:** `UNKNOWN`
- **HYP_O:** `UNKNOWN`
- **HYP_A:** `UNKNOWN`
- **Confiança:** MEDIUM
- **Principal boundary não resolvido:** P vs A no espaço temporal da transição A/T HOLD.
- **readyForA4R184:** true

---

### A4R183-DRAFT-0002 — Comair 5191 LEX
- **Ponto de fuga normalizado:** Primeira ação errada da tripulação — virada à esquerda e alinhamento na pista 26.
- **HYP_P:** `UNKNOWN`
- **HYP_O:** `UNKNOWN`
- **HYP_A:** `UNKNOWN`
- **Confiança:** MEDIUM-HIGH (P e A âncoras factuais diretas)
- **Principal boundary não resolvido:** Separabilidade P (mismatch de heading não percebido) vs A (ação de lineup na pista errada).
- **readyForA4R184:** true

---

### A4R183-DRAFT-0003 — American 1420 LIT
- **Ponto de fuga normalizado:** Continuação da aproximação final instável com perda de referência visual.
- **HYP_P:** `UNKNOWN`
- **HYP_O:** `UNKNOWN`
- **HYP_A:** `UNKNOWN`
- **Confiança:** MEDIUM
- **Principal boundary não resolvido:** Assimetria de spoilers permanece como consequência técnica; não deve migrar para A-axis primário.
- **readyForA4R184:** true

---

### A4R183-DRAFT-0006 — UPS 1354 BHM
- **Ponto de fuga normalizado:** Não percepção do setup FMC inválido e não percepção da falha de engajamento do modo autopilot esperado.
- **HYP_P:** `UNKNOWN`
- **HYP_O:** `UNKNOWN`
- **HYP_A:** `UNKNOWN`
- **Confiança:** MEDIUM
- **Principal boundary não resolvido:** Mode change do captain (fato único que pode suportar P ou A-axis — requer racional distinto).
- **readyForA4R184:** true

---

### A4R183-DRAFT-0017 — United 173 PDX
- **Ponto de fuga normalizado:** Manutenção de troubleshooting quando a necessidade operacional era pouso imediato.
- **HYP_P:** `UNKNOWN`
- **HYP_O:** `UNKNOWN`
- **HYP_A:** `UNKNOWN`
- **Confiança:** MEDIUM
- **Principal boundary não resolvido:** Timestamp/fuel quantity exato do EP não isolado; OCR artifacts no TXT fonte requerem verificação.
- **readyForA4R184:** true

---

## 5. Riscos metodológicos preservados

1. **Outcome vs ponto de fuga:** O impacto, overrun ou fuel exhaustion não é ponto de fuga em nenhum dos 5 casos. O EP é sempre anterior.
2. **Double-count de evidência:** O mesmo fato não deve suportar P, O e A sem racional distinto. Registrado como risco em todos os drafts.
3. **Boundary P/A em espaço temporal compartilhado:** Presente em todos os 5 casos. Não resolvido; documentado para A4R184.
4. **Consequência como co-EP:** Gate de 1.000 ft (UPS), gate de estabilização (Asiana), hold-short/corrida (Comair), spoilers (American 1420) são consequência/agravamento — confirmado em todos os drafts.
5. **Importação de narrativa NTSB como código:** Todos os drafts são factual-first; hipóteses não importam análises causais externas.

## 6. Próximos passos

Ver `SERA_A4R184_AUTHOR_REVIEW_PLAN_v0.2.0.md` neste diretório.
