# SERA A4R184 Author Review Plan v0.2.0

Status: NEXT_STEP_PLAN
Phase: A4+R-184 (planejada)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
sourcePhase: A4R183

## 1. Objetivo de A4R184

A4R184 é a fase de revisão autoral dos 5 drafts de adjudicação normalizados preparados em A4R183. O autor responde às perguntas abertas de cada draft, resolve ou documenta os boundary zones P/A, e define se as hipóteses de eixo (em código canônico ou UNKNOWN) estão prontas para avançar para a fase de fechamento de eixo (que requer revisão dual-autor e será objeto de fase posterior).

## 2. O que A4R184 faz

Para cada um dos 5 drafts:
- O autor lê a seção "Perguntas para revisão autoral A4R184" do draft.
- Responde às perguntas com decisão autoral sobre cada ponto.
- Confirma, ajusta ou rebaixa cada hipótese de eixo.
- Documenta boundary zones resolvidos ou mantém como "NOT_RESOLVED_THIS_PHASE".
- Aprova ou ajusta os `escapePointId` propostos.
- Registra se o caso está pronto para passar a dual-autor review ou se precisa de ação adicional.

## 3. O que A4R184 não faz

- Não fecha P, O ou A definitivamente.
- Não cria código liberado.
- Não promove fixture ou baseline.
- Não altera runner oficial, motor SERA, arquivos .ts.
- Não cria downstream.
- Não inventa fatos ausentes para preencher lacunas.

## 4. Perguntas prioritárias por caso (da seção 14 de cada draft)

### Asiana 214 (A4R183-DRAFT-0001)
1. Há callout de CVR que ancora a não-percepção do A/T HOLD em momento discreto?
2. O boundary P/A deve ser resolvido ou mantido como sobrepostos?
3. A hipótese descritiva de continuidade da aproximação visual é sustentável ou deve ser rebaixada para UNKNOWN?
4. Algum momento suporta split PF/PM com evidência factual?
5. Aprovação de `ASIANA-214-ESCAPE-001` como escapePointId único.

### Comair 5191 (A4R183-DRAFT-0002)
1. P e A são hipóteses separadas ou unificadas como "runway awareness failure"?
2. A formulação de A-axis está adequada ou precisa de refinamento?
3. A omissão do ATC é registrada como fator contextual formal?
4. O timestamp/posição exata da virada precisa de verificação adicional?
5. Aprovação de `COMAIR-5191-ESCAPE-001` como escapePointId único.

### American 1420 (A4R183-DRAFT-0003)
1. O crosswind limit não verificado é elemento separado do P-axis?
2. Qual altitude/momento define a "janela de go-around" para ancorar o A-axis?
3. Confirmação de que spoilers/rolagem pós-toque permanecem como consequência técnica.
4. O despachante (sugestão de expedição) é registrado como fator contextual formal?
5. Aprovação de `AA1420-ESCAPE-001` como escapePointId único.

### UPS 1354 (A4R183-DRAFT-0006)
1. "Mode change sem briefing" vai para P-axis (FO não sabia) ou A-axis (captain omitiu)?
2. Gate de 1.000 ft / MDA / EGPWS permanecem como agravamento/consequência?
3. Split captain/FO é relevante nesta fase ou adiado?
4. Há evidência de CVR que ancora "nenhum piloto reconheceu" como fato discreto?
5. Aprovação de `UPS1354-ESCAPE-001` como escapePointId único.

### United 173 (A4R183-DRAFT-0017)
1. Verificação do TXT AAR-79-07 é pré-requisito antes de avançar para fechamento?
2. A hipótese descritiva de fixação atencional no troubleshooting está adequada?
3. O boundary P/A é resolvido ou mantido como sobrepostos?
4. O split Captain/FE é formalizado como contribuição de ator em fase futura?
5. Aprovação de `UNITED-173-ESCAPE-001` como escapePointId único.

## 5. Formato de resposta autoral esperado

Para cada pergunta, o autor responde com uma das seguintes:
- **CONFIRMO** — hipótese/decision mantida como está.
- **AJUSTO** — nova formulação fornecida pelo autor.
- **REBAIXO PARA UNKNOWN** — evidência insuficiente para manter hipótese.
- **ADIO PARA FASE POSTERIOR** — questão válida mas fora do escopo desta revisão.
- **PRECISO DE MAIS EVIDÊNCIA** — verificação adicional necessária antes de decidir.

## 6. Saída de A4R184

Um documento de decisões A4R184 para cada caso, com:
- Respostas às perguntas abertas.
- Hipóteses confirmadas, ajustadas ou rebaixadas.
- Lista de boundary zones resolvidos vs. adiados.
- Status do caso: READY_FOR_DUAL_AUTHOR_REVIEW ou NEEDS_ADDITIONAL_ACTION.
- Nenhum fechamento de P/O/A. `notFinalClassification: true` permanece.

## 7. Pré-requisito para fechamento futuro (além de A4R184)

O fechamento de P, O e A requer:
- Revisão dual-autor com concordância explícita.
- Evidência factual ancorada para cada eixo sem boundary zone aberta relevante.
- `notFinalClassification` removido (substituído por `finalClassification: true`) somente após essa revisão.
- Esta fase ainda não é esse momento.

## 8. Casos BATCH_B, BATCH_C, BATCH_D

Não são objeto de A4R184. Status inalterado de A4R181.
