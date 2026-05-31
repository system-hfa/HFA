# SERA United 173 Escape Point Temporal Boundary Note — A4R188 Preflight v0.2.0

status: PREFLIGHT_NOTE_ACTIVE
phase: A4R188-PREFLIGHT
eventKey: UNITED_173
sourceAuditFinding: W-02 (ponto de fuga de United 173 e temporalmente difuso sem momento singular de primeira acao errada)
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM
DOCS_ONLY
NO_RUNTIME_CHANGE
NO_AXIS_DECISION
NO_POA_DECISION_IN_THIS_DOCUMENT

---

## 1. Escopo e finalidade

Este documento documenta o risco específico de United 173 relacionado ao ponto de fuga temporalmente difuso aprovado em A4R182. **Não registra authorDecision, não resolve P/O/A, não produz análise causal.** Serve como nota de alerta metodológico para o autor de A4R188.

---

## 2. Ponto de fuga aprovado em A4R182

O ponto de fuga aprovado para United 173 é:

```
escapePointScope: "Manutencao de troubleshooting quando a necessidade operacional ja era prosseguir para pouso imediato."
```

---

## 3. O problema do limite temporal difuso

### 3.1 Por que United 173 difere dos outros 4 eventos

Os outros 4 eventos de BATCH_A têm pontos de fuga com momento singular observável:

| Evento | Natureza do ponto de fuga |
|---|---|
| Asiana 214 | Momento observável: continuação da aproximação com A/T em HOLD sem reconhecimento |
| Comair 5191 | Momento observável: início de corrida de decolagem na pista errada |
| American 1420 | Momento observável: decisão de prosseguir abaixo de minimums |
| UPS 1354 | Momento observável: descida abaixo de MDA sem referência visual |

United 173 **não tem um momento observável singular**. O ponto de fuga é a **manutenção** de um estado (troubleshooting continuado) em vez de uma **ação** discreta. Isso cria:

- **Difusão temporal**: "quando a necessidade operacional já era prosseguir para pouso imediato" descreve uma janela, não um instante
- **Ambiguidade de boundary**: não está claro por A4R180-0017 em qual momento exato o pouso imediato se tornou necessidade operacional inevitável
- **Risco de drift causal**: sem boundary definido, o autor pode usar fragmentos de evidência que pertencem ao período pós-flameout como se fossem causas

### 3.2 Consequência para análise P/O/A

Sem delimitação temporal do ponto de fuga, qualquer authorDecision para qualquer node de United 173 ficará sem âncora temporal válida. O autor pode, sem perceber:

- Atribuir como causa P/O/A o estado que é **consequência** do troubleshooting (ex.: combustível crítico)
- Usar o flameout (evento posterior) como âncora causal
- Usar o crash como âncora causal

Todos esses são **proibidos** (guardrails seção 6.4).

---

## 4. Exigência de boundary declaration

### 4.1 O que o autor deve declarar antes de qualquer node de United 173

```
ESCAPE_POINT_TEMPORAL_BOUNDARY_REQUIRED: true
eventKey: UNITED_173
sourceEvidenceFile: A4R180-EXTRACTION-0017
escapePointTemporalBoundary: [a preencher pelo autor — ver 4.2]
temporalBoundaryBasis: [a preencher pelo autor — fragmento específico de A4R180-0017]
```

### 4.2 Como formular o temporalBoundary

O autor deve identificar em A4R180-EXTRACTION-0017:
- O momento mais tardio em que as evidências indicam que o pouso imediato era operacionalmente possível sem comprometer a segurança
- A evidência específica que ancora esse momento (nível de combustível registrado, comunicação ATC, readout de instrumentos, ou declaração de tripulação)

**Exemplos de formulação aceitável (formato — não são decisões P/O/A):**
```
"Entre HH:MM e HH:MM UTC, quando combustivel ainda permitia abordagem imediata
com margem para missed approach — conforme fragmento UNITED-173-A4R180-F2."
```

```
"Aproximadamente HH:MM UTC, antes do primeiro callout de combustivel critico —
conforme fragmento UNITED-173-A4R180-F1."
```

**Exemplos de formulação inaceitável:**
```
"Quando o combustivel atingiu zero." [— este é um evento posterior, não o ponto de fuga]
"No momento do flameout." [— evento posterior ao ponto de fuga]
"Ao longo de toda a fase de troubleshooting." [— sem delimitação temporal — inaceitável]
```

---

## 5. O que fazer se o boundary não puder ser estabelecido

Se após leitura completa de A4R180-EXTRACTION-0017 e A4R180B, o autor não puder delimitar temporalmente o ponto de fuga de United 173 com evidência suficiente:

1. **Não prosseguir** com nenhum node de United 173
2. Registrar `AXIS_TRAVERSAL_BLOCKED` para todos os eixos (P, O, A) com:
   ```
   blockedReason: ESCAPE_POINT_TEMPORAL_BOUNDARY_NOT_ESTABLISHED
   eventKey: UNITED_173
   ```
3. **Escalar para revisão Opus** (guardrails seção 7.3):
   ```
   ESCALATION_REQUIRED: true
   escalationReason: UNITED_173_TEMPORAL_BOUNDARY_UNRESOLVABLE_WITH_AVAILABLE_EVIDENCE
   ```

---

## 6. Fragmentos de evidência de referência

Os fragmentos de A4R180-EXTRACTION-0017 relevantes para a delimitação temporal são (identificadores — conteúdo a verificar no arquivo):

- UNITED-173-A4R180-F1: [verificar em A4R180-0017 — referência ao estado de combustível]
- UNITED-173-A4R180-F2: [verificar em A4R180-0017 — referência às comunicações ATC/tripulação]
- UNITED-173-A4R180-F3: [verificar em A4R180-0017 — referência ao estado dos sistemas]
- UNITED-173-A4R180-F4: [verificar em A4R180-0017 — referência ao timeline do voo]

O autor deve ler esses fragmentos diretamente de A4R180-EXTRACTION-0017, não usar descrições de segunda mão.

---

## 7. Proibições específicas para United 173

As seguintes âncoras causais são **proibidas** como causa P/O/A para qualquer eixo de United 173 (guardrails seção 6.4):

| Evento posterior | Por que é proibido |
|---|---|
| Flameout do motor | Consequência do troubleshooting prolongado — não causa |
| Retorno de combustível zero | Consequência do troubleshooting prolongado — não causa |
| Crash/impacto | Consequência do troubleshooting prolongado — não causa |
| Perda de comunicação por bateria baixa | Consequência do troubleshooting prolongado — não causa |
| Evacuação pós-crash | Muito posterior ao ponto de fuga — não causa |

Ao verificar fragmentos de evidência, confirmar que o fragmento não descreve nenhum desses estados.

---

## 8. Relação com os locks de A4R188

Este documento **não abre** e **não constitui**:
- authorDecision para qualquer node de United 173
- Análise P/O/A de United 173
- Seleção de leaf code para United 173
- código selecionado, código liberado, fixture, baseline

Este documento é exclusivamente uma nota metodológica que documenta o risco identificado na auditoria pós-A4R187 e os procedimentos que o autor deve seguir antes de iniciar a análise de United 173 em A4R188.
