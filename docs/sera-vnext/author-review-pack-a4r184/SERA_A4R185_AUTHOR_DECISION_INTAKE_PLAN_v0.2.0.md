# SERA A4R185 Author Decision Intake Plan v0.2.0

Status: NEXT_STEP_PLAN
Phase: A4+R-185 (planejada)
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM
sourcePhase: A4R184

---

## 1. Objetivo de A4R185

A4R185 registra as respostas autorais às perguntas do pacote A4R184 para os 5 casos BATCH_A. Cada resposta usa o vocabulário padronizado e é registrada em documento de decisão por caso, com rastreabilidade para as perguntas originais de A4R184.

A4R185 NÃO fecha P, O ou A definitivamente. `notFinalClassification=true` permanece. A4R185 documenta a posição autoral atual para que a fase seguinte (revisão dual-autor) possa ser iniciada.

---

## 2. O que A4R185 faz

Para cada um dos 5 casos:

- O autor registra resposta a cada pergunta de A4R184 usando o vocabulário padronizado.
- O autor confirma, ajusta ou rebaixa cada hipótese de eixo.
- O autor documenta boundary zones resolvidos vs. mantidos como `NOT_RESOLVED_THIS_PHASE`.
- O autor registra se o caso está pronto para `READY_FOR_DUAL_AUTHOR_REVIEW` ou requer `NEEDS_ADDITIONAL_ACTION`.
- O autor aprova ou ajusta os `escapePointId` propostos.

## 3. O que A4R185 não faz

- Não fecha P, O ou A definitivamente.
- Não cria código liberado.
- Não promove fixture ou baseline.
- Não altera runner oficial, motor SERA, arquivos .ts.
- Não cria downstream.
- Não inventa fatos ausentes para preencher lacunas.

---

## 4. Vocabulário de resposta autoral

O autor deve responder a cada pergunta com uma das seguintes:

| Resposta | Significado |
|---|---|
| `CONFIRMO` | A hipótese/decisão atual (UNKNOWN ou candidato proposto) é mantida como está. |
| `AJUSTO` | Nova formulação ou código canônico fornecido pelo autor em substituição à opção atual. |
| `REBAIXO_PARA_UNKNOWN` | A hipótese proposta não tem base suficiente; eixo retorna ou permanece em UNKNOWN. |
| `ADIO` | Questão válida mas fora do escopo desta revisão; adiada para fase posterior. |
| `PRECISO_DE_MAIS_EVIDENCIA` | Verificação adicional necessária antes de decidir. Especificar o que é necessário. |

---

## 5. Formato de documento por caso em A4R185

Cada documento de decisão A4R185 deve incluir:

```
# A4R185 — Decisão Autoral — [EVENTO] — [DATA]

## Identificação
- reviewId: A4R184-REVIEW-XXXX
- sourceDraftId: A4R183-DRAFT-XXXX
- authorDecisionDate: YYYY-MM-DD
- notFinalClassification: true
- poaClosureAllowed: false

## Respostas às perguntas de A4R184

### Eixo P
Resposta: [CONFIRMO|AJUSTO|REBAIXO_PARA_UNKNOWN|ADIO|PRECISO_DE_MAIS_EVIDENCIA]
[Formulação autoral se AJUSTO]
[Código canônico proposto se AJUSTO: HYP_P-*]
[Justificativa]

### Eixo O
Resposta: [...]
[...]

### Eixo A
Resposta: [...]
[...]

## Boundary zones
- [B1]: RESOLVIDO / NOT_RESOLVED_THIS_PHASE — [descrição]
- [B2]: ...

## escapePointId
Aprovado: [SIM/AJUSTADO]
[Novo ID se ajustado]

## Status do caso
READY_FOR_DUAL_AUTHOR_REVIEW / NEEDS_ADDITIONAL_ACTION
[Motivo se NEEDS_ADDITIONAL_ACTION]

## Locks de não fechamento
- notFinalClassification: true
- poaClosureAllowed: false
```

---

## 6. Arquivos a criar em A4R185

Criar novo diretório:
```
docs/sera-vnext/author-decision-intake-a4r185/
```

Criar estes arquivos:

1. `SERA_AUTHOR_DECISION_INTAKE_A4R185_v0.2.0.md` — documento principal com sumário das 5 decisões.
2. `SERA_AUTHOR_DECISION_MATRIX_A4R185_v0.2.0.csv` — matriz com uma linha por caso e campos de decisão.
3. `SERA_AUTHOR_DECISION_LOG_A4R185_v0.2.0.md` — log de fontes lidas e validações.
4. `decisions/A4R185-DEC-0001-ASIANA-214.md`
5. `decisions/A4R185-DEC-0002-COMAIR-5191.md`
6. `decisions/A4R185-DEC-0003-AMERICAN-1420.md`
7. `decisions/A4R185-DEC-0006-UPS-1354.md`
8. `decisions/A4R185-DEC-0017-UNITED-173.md`

---

## 7. Validações obrigatórias em A4R185

- `notFinalClassification=true` em todos os 5 casos.
- `poaClosureAllowed=false` em todos os 5 casos.
- Nenhum código P/O/A fechado sem evidência factual ancorada.
- Nenhum fixture, baseline, runner oficial, ou arquivo .ts alterado.
- Validadores P1 executados e passando.

---

## 8. Pré-requisito para fechamento futuro (além de A4R185)

O fechamento definitivo de P, O e A requer:

- Revisão dual-autor com concordância explícita.
- Evidência factual ancorada para cada eixo sem boundary zone aberta relevante.
- `notFinalClassification` removido (substituído por `finalClassification: true`) somente após essa revisão.
- Esta fase ainda não é esse momento.

---

## 9. Casos com pré-requisito de verificação antes de A4R185

| Caso | Pré-requisito | Criticidade |
|---|---|---|
| United 173 PDX | Verificação do TXT AAR-79-07 para isolar timestamp/fuel quantity exato | ALTA — OCR artifacts limitam confiança nos eixos P e A |
| Asiana 214 SFO | CVR callout de não-percepção do A/T HOLD em momento discreto | MEDIA — pode avançar sem isso em nível MEDIUM |
| American 1420 LIT | Altitude/timestamp da janela de go-around | MEDIA — necessário para ancorar A-axis especificamente |
| UPS 1354 BHM | Decisão de alocação do mode change ao P ou A eixo | ALTA — boundary não resolvido bloqueia ambos os eixos |
| Comair 5191 LEX | Sem pré-requisito crítico — pode avançar com evidência atual | BAIXA |
