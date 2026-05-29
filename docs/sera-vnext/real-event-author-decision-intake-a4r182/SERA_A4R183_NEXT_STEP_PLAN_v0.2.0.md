# SERA A4R183 Next Step Plan v0.2.0

Status: NEXT_STEP_PLAN
Phase: A4+R-183 (planejada)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
sourcePhase: A4R182

## 1. Objetivo de A4R183

A4R183 é a fase de "scope-normalized adjudication draft" (rascunho de adjudicação normalizado por escopo). Usa os 5 escopos de ponto de fuga aprovados em A4R182 para preparar rascunhos de adjudicação SERA para cada caso BATCH_A, ainda sem fechar P/O/A.

## 2. O que A4R183 faz

- Para cada um dos 5 casos, usa o `approvedEscapePointScope` de A4R182 como âncora.
- Prepara draft de trace P/O/A: hipóteses de trabalho baseadas em evidência factual ancorada, com `HYP_*` tags e nota `NOT_FINAL_P_O_A`.
- Mantém `notFinalClassification=true` em todos os casos.
- Registra explicitamente o racional de cada hipótese de eixo com referência ao sourceAnchor.
- Sinaliza boundary zones que precisam de revisão dual-autor antes de qualquer fechamento.

## 3. O que A4R183 não faz

- Não fecha P, O ou A.
- Não cria selectedCode com status fechado.
- Não cria código liberado.
- Não promove fixture ou baseline.
- Não altera runner oficial, motor SERA, arquivos .ts.
- Não cria recomendações, HFACS, Risk/ERC, ARMS/ERC, finalConclusion, downstream.
- Não chama LLM/API.
- Não importa conclusão NTSB/TSB como código SERA.

## 4. Entradas de A4R183

| Entrada | Origem | Status |
|---|---|---|
| Escopos aprovados (5 casos) | A4R182 matriz CSV | READY |
| Dossiês autorais BATCH_A (5 casos) | A4R181 author-decision-packets/ | READY |
| Extrações estruturadas A4R180 (5 casos) | A4R180/extractions/ | READY |
| Slices de fonte oficial (5 casos) | A4R115/A4R119 source slices | READY |
| Regra de ponto de fuga único | A4R166 | READY |

## 5. Escopo por caso em A4R183

### A4R183-DRAFT-0001 — Asiana 214 SFO
- EP anchor: Entrada em modo HOLD do autothrottle com início de saída do perfil não percebida pela tripulação.
- P-axis draft: Hipótese de não-percepção do estado A/T HOLD e da saída do perfil; cues disponíveis (PAPI, velocidade, razão de descida) não integrados.
- O-axis draft: Hipótese de objetivo de continuação da aproximação visual sem reavaliação do estado de automação.
- A-axis draft: Hipótese de ausência de ação de go-around quando a margem operacional ainda era nominal.
- Boundary a resolver: Distinção entre P (não-consciência do estado) e A (ausência de go-around) — boundary expressamente reconhecido em A4R181.

### A4R183-DRAFT-0002 — Comair 5191 LEX
- EP anchor: Virada e alinhamento na pista 26 em vez da pista 22.
- P-axis draft: Hipótese de não-percepção do mismatch entre heading bug (~225°) e heading da aeronave (~260°) no momento de lineup.
- O-axis draft: Hipótese de objetivo de decolagem persistente sem verificação de identidade de pista.
- A-axis draft: Hipótese de execução de lineup na pista errada sem cue check ativo.
- Boundary a resolver: Distinção entre falha de percepção do heading bug (P) e ausência de verificação ativa (A).

### A4R183-DRAFT-0003 — American 1420 LIT
- EP anchor: Continuação da aproximação final instável com perda de referência visual.
- P-axis draft: Hipótese de percepção degradada das condições de windshear + perda visual com GPWS sink rate.
- O-axis draft: Hipótese de objetivo de completar o pouso sob condições adversas já sinalizadas.
- A-axis draft: Hipótese de ausência de go-around quando cues integrados (comentários crew + EGPWS) indicavam condições fora de parâmetros.
- Boundary a resolver: Separação entre componente operacional (decisão de prosseguir) e componente técnico (autospoiler asymmetry como A-axis secundário).

### A4R183-DRAFT-0004 — UPS 1354 BHM
- EP anchor: Não percepção do setup FMC inválido e não percepção da falha de engajamento do modo autopilot esperado.
- P-axis draft: Hipótese de não-percepção do glidepath FMC inválido e do estado de modo após mode change do captain.
- O-axis draft: Hipótese de objetivo de executar aproximação não-precisão com guidance que se supunha válida.
- A-axis draft: Hipótese de mode change sem briefing como falha de coordenação; ausência de verificação de glidepath como omissão de ação.
- Boundary a resolver: Categorização do mode change (falha de seleção vs falha de coordenação); evitar double-count do mesmo fato em P e A.

### A4R183-DRAFT-0005 — United 173 PDX
- EP anchor: Manutenção de troubleshooting quando a necessidade operacional já era prosseguir para pouso imediato.
- P-axis draft: Hipótese de attentional fixation em gear troubleshooting apesar das verbalizações repetidas de fuel state pelo FE.
- O-axis draft: Hipótese de objetivo persistente de resolver/confirmar gear status e preparar emergency landing em vez de transitar para land now.
- A-axis draft: Hipótese de ausência de decisão de "land now" na janela de combustível crítico.
- Boundary a resolver: Boundary P (attentional fixation) vs A (action selection adequacy); OCR artifacts na fonte requerem cuidado.

## 6. Ferramentas de rastreabilidade

Para cada draft em A4R183, registrar:
- `escapePointId`: único por caso, sem reutilização.
- `sourceAnchorIds`: lista de fragmentos de evidência que suportam cada hipótese de eixo.
- `notFinalClassification: true`.
- `boundaryNotes`: descrição de cada boundary zone identificada.
- `dualAuthorReviewRequired: true` — nenhum fechamento antes de revisão dual-autor.

## 7. Sequência recomendada para A4R183

1. Começar pelos 2 casos aprovados sem ajuste (American 1420, United 173) — escopo já estável.
2. Continuar com os 3 casos com ajuste, usando os escopos aprovados A4R182 como ancoragem explícita.
3. Para cada caso, preparar draft completo de trace P/O/A com evidência ancorada antes de avançar para o próximo.
4. Ao final dos 5, preparar matriz de draft de adjudicação com todos os campos HYP_* e boundary notes.

## 8. Casos BATCH_B, BATCH_C, BATCH_D

Não são objeto de A4R183. Retornam à fila somente após:
- BATCH_B: decisão de framing autoral (não resolvida).
- BATCH_C: consolidação dos 3 pares de duplicatas.
- BATCH_D: ações prévias específicas por caso (ver hold register A4R181).
