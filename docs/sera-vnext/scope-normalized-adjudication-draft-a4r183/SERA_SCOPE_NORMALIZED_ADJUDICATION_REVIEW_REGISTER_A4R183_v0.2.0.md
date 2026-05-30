# SERA Scope-Normalized Adjudication Review Register A4R183 v0.2.0

Status: REVIEW_REGISTER_ACTIVE
Phase: A4+R-183
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

Registrar boundary zones não resolvidas, lacunas documentais e perguntas abertas de cada draft A4R183, para que a revisão autoral A4R184 tenha uma lista estruturada de itens a decidir.

## 2. Boundary zones não resolvidas por caso

### A4R183-DRAFT-0001 — Asiana 214 SFO

| # | Boundary | Descrição | Impacto se não resolvido |
|---|---|---|---|
| B1 | P vs A (A/T HOLD) | Não-percepção do modo HOLD (P) e ausência de ação corretiva/go-around (A) compartilham o mesmo espaço temporal | Sem resolução, ambas as hipóteses permanecem sobrepostas |
| B2 | O-axis confiança | O objetivo de "continuar aproximação visual" é consistente mas com confiança menor que P | Pode ser rebaixado para UNKNOWN se evidência não suportar |
| B3 | Gate de estabilização como suporte | Cues de PAPI/velocidade/razão de descida suportam P-axis mas não definem o EP | Risco de reintroduzir gate como EP em A4R184 |

**Questão prioritária A4R184:** Há callout de CVR que ancora não-percepção do A/T HOLD em momento discreto?

---

### A4R183-DRAFT-0002 — Comair 5191 LEX

| # | Boundary | Descrição | Impacto se não resolvido |
|---|---|---|---|
| B1 | P vs A (lineup) | Mismatch de heading não percebido (P) vs ação de alignment na pista errada (A) são simultâneos | Pode ser tratado como entrada única ou duas hipóteses separadas |
| B2 | Timestamp exato | Posição/segundo exato da virada não isolado com precisão de GPS | EP discreto aprovado mas sem âncora de coordenada exata |
| B3 | ATC contextual | Omissão do controlador de confirmar pista é fato documentado mas fora do EP primário | Pode ser relevante para ator contextual formal em fase futura |

**Questão prioritária A4R184:** O autor mantém P e A como hipóteses separadas, ou unifica em "runway awareness failure"?

---

### A4R183-DRAFT-0003 — American 1420 LIT

| # | Boundary | Descrição | Impacto se não resolvido |
|---|---|---|---|
| B1 | Spoilers como A-axis secundário | Assimetria de autospoilers é fato técnico posterior ao EP; deve permanecer como consequência | Se migrar para A-axis, desloca o EP para o pós-touchdown |
| B2 | Altitude de "janela de go-around" | Não especificada com precisão na extração | Precisa de anchor altitude/timestamp para fechar A-axis futuramente |
| B3 | Crosswind limit não verificado | Discussão de crosswind sem verificação de manual (AA1420-E2) pode suportar P-axis adicional | Risco de double-count se combinado com hipótese descritiva de perda de referência visual |

**Questão prioritária A4R184:** O autor deseja registrar a omissão de verificação de crosswind como elemento separado do P-axis, ou manter uma formulação descritiva única para este eixo?

---

### A4R183-DRAFT-0006 — UPS 1354 BHM

| # | Boundary | Descrição | Impacto se não resolvido |
|---|---|---|---|
| B1 | Mode change: P ou A? | "Captain mudou para vertical speed sem briefar FO" pode suportar ambos os axes | Se P: FO não soube do modo; se A: captain omitiu briefing — racional distinto necessário |
| B2 | Gate de 1.000 ft como suporte | 1.500 fpm sustentado documenta agravamento factual; não deve ser reintroduzido como EP | Risco de substituir EP normalizado por gate de 1.000 ft |
| B3 | Split captain/FO | O mode change sem briefing sugere split de contribuição; não permitido nesta fase | Decisão adiada; registrada para A4R184+ |

**Questão prioritária A4R184:** O fato "mode change sem briefing" deve ser alocado ao P-axis (FO não sabia) ou ao A-axis (captain omitiu coordenação)?

---

### A4R183-DRAFT-0017 — United 173 PDX

| # | Boundary | Descrição | Impacto se não resolvido |
|---|---|---|---|
| B1 | Timestamp/fuel exato | Janela de fuel crítico não isolada com precisão no slice disponível | EP normalizado tem âncora temporal aproximada; fechamento futuro exige verificação do AAR-79-07 |
| B2 | OCR artifacts | TXT fonte com noise; detalhes finos das verbalizações do FE requerem verificação | Confiança nas hipóteses limitada a MEDIUM por este motivo |
| B3 | P vs A (attentional fixation) | Fixação de atenção (P) e ausência de "land now" (A) compartilham o mesmo espaço temporal | Sem resolução, ambas as hipóteses permanecem sobrepostas |
| B4 | Multi-actor (Captain/FE) | FE como fuel monitor e Captain como decision authority têm papéis distintos | Não resolvido nesta fase; registrado para decisão futura |

**Questão prioritária A4R184:** O autor deseja investir na verificação do TXT AAR-79-07 antes de avançar para o fechamento de P/A?

---

## 3. Lacunas documentais comuns

| Lacuna | Casos afetados | Ação recomendada |
|---|---|---|
| Timestamp/altitude exato do EP | 0001 (Asiana), 0017 (United) | Verificação de fonte primária em A4R184 ou fase posterior |
| Callouts de CVR específicos no EP | 0001 (Asiana), 0002 (Comair) | Cruzamento com transcrição CVR no slice |
| OCR artifacts no TXT fonte | 0017 (United) | Verificação contra PDF/transcrição limpa antes de fechamento |
| Diferenciação PF/PM no EP | Todos os 5 | Decisão autoral em fase posterior se evidência suportar split |

## 4. O que não precisa ser resolvido em A4R184

- Fechamento definitivo de P/O/A — não é objetivo de A4R184.
- Split PF/PM/FE — pode ser deixado para fase posterior.
- Atores contextuais (ATC, despachante) — permanecem em contexto operacional.
- Casos BATCH_B/C/D — fora do escopo de A4R184.
