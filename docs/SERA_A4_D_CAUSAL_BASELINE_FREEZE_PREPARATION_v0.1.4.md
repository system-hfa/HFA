# SERA v0.1.4-A4-d - Causal Baseline Freeze Preparation

Status: preparation/audit only  
Scope: causal-only baseline reporting readiness  
Non-scope: baseline promotion, engine patch, expected change, risk-layer redesign

## 1. Escopo da fase

Esta fase prepara a baseline causal v0.1.4 com separacao formal entre:

- resultado causal SERA (unsafe act/condition + P/O/A + preconditions + explicacao causal);
- camada legada de risco HFA (`erc_level` e derivados).

Nao houve promocao de baseline nesta fase.

## 2. Decisao normativa (causal x risk layer)

Com base em A4-c e no contrato metodologico:

- `erc_level` atual permanece metadado legado da HFA Risk Layer;
- validade causal SERA nao deve ser bloqueada por `erc_level` fora de fase especifica de validacao de risco;
- candidate pode ser `CAUSAL_PASS` e simultaneamente `RISK_HOLD` (caso `A0-VIS-003`).

## 3. Auditoria do scorer atual

Arquivos auditados: `tests/sera/compare.ts`, `tests/sera/runner.ts`, `tests/sera/report.ts`, `tests/sera/run.ts`, `tests/sera/fixtures/schema.ts`.

### 3.1 Onde `overall` e calculado

- `tests/sera/compare.ts` (`scoreResult`):
  - `criticalPass = perceptionPass && objectivePass && actionPass`;
  - `overall = PASS` somente quando `criticalPass && ercPass`;
  - `overall = PARTIAL` quando `criticalPass` sem `ercPass`;
  - `overall = PARTIAL` tambem quando apenas parte de P/O/A passa;
  - `overall = FAIL` quando P/O/A falha de forma total.

### 3.2 Como `erc_level` afeta `overall`

- `erc_level` e gate direto de `PASS` em `overall`.
- Qualquer mismatch de `erc_level` converte um run causalmente correto em `PARTIAL`.

### 3.3 Se preconditions entram no `overall`

- Nao entram.
- `preconditions` e calculado separadamente em `scores.preconditions`, mas nao participa do gate de `overall`.

### 3.4 Separacao atual entre causal e risk layer

- Nao existe scorer oficial causal-only.
- A separacao hoje e possivel apenas por analise do report (`scores` por run), sem rerun.

### 3.5 Dados suficientes no report para causal-only sem rerun

- Sim. O report contem:
  - `scores` por run (perception/objective/action/preconditions/erc/overall);
  - `actual` e `expected` por run;
  - consistencia por fixture.
- Isso permite recalcular visao causal-only offline.

## 4. Auditoria do report A4-b

Report auditado: `tests/reports/candidates/methodology-gate-run-1779497843.json`.

### 4.1 Verificacoes solicitadas

- 9/9 fixtures com P/O/A em `PASS` 3/3.
- 9/9 fixtures com `preconditions` em `PASS` 3/3.
- Unico problema fora do causal: `erc_level` de `A0-VIS-003` (runs `3/3/2` vs expected `2`).
- Sem `FAIL`, sem `ERROR`.

## 5. Resultado causal-only calculado

Definicao usada nesta fase:

- `CAUSAL_PASS` por run: P/O/A `PASS` + `preconditions` `PASS` + sem erro.
- `CAUSAL_PARTIAL`: restante com algum sinal causal parcial.
- `CAUSAL_FAIL`: falha causal total.
- `CAUSAL_ERROR`: run com erro de execucao.

Resultado no report A4-b:

- `causal_total_runs`: 27
- `causal_pass`: 27
- `causal_partial`: 0
- `causal_fail`: 0
- `causal_error`: 0
- `causal_pass_rate`: 100%
- `causal_determinism_rate`: 100% (consistencia de status causal por fixture nos 3 runs)

## 6. Tabela por candidate

| Candidate | P/O/A | Preconditions | Causal status | Risk layer status | Decisao |
|---|---|---|---|---|---|
| A0-AUTO-001 | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-AUTO-003 | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-AUTO-004-ADJ | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-CHK-003 | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-DAUMAS-E01-B | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-DAUMAS-E02-A | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-VIS-003 | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_HOLD (`erc_level`) | CAUSAL_PASS_RISK_HOLD |
| A0-VIS-004-ADJ | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |
| A0-VIS-005 | 3/3 PASS | 3/3 PASS | CAUSAL_PASS | RISK_PASS | ELIGIBLE_CAUSAL_FREEZE |

## 7. Candidates elegiveis para causal baseline freeze

Elegiveis (8):

- A0-AUTO-001
- A0-AUTO-003
- A0-AUTO-004-ADJ
- A0-CHK-003
- A0-DAUMAS-E01-B
- A0-DAUMAS-E02-A
- A0-VIS-004-ADJ
- A0-VIS-005

Causal-pass com hold de risco (1):

- A0-VIS-003

## 8. Blockers restantes

1. Scorer oficial ainda acopla `overall` a `erc_level` e nao emite resumo causal-only nativo.
2. Nao existe artefato oficial de baseline causal-only em `tests/reports/baseline/`.
3. Governanca da HFA Risk Layer segue pendente (matriz tradicional, ARMS/ERC, `erc_level` legado, risk profile).

Observacao: houve variacao de lista de preconditions em `A0-AUTO-003` e `A0-VIS-003` entre runs, embora `scores.preconditions` tenha permanecido `PASS` 3/3.

## 9. Mudancas necessarias antes do freeze

Minimo recomendado antes do freeze causal oficial:

1. Formalizar scorer/report causal-only oficial (separado do `overall` legacy).
2. Definir artefato baseline causal freeze dedicado (sem gate de `erc_level`).
3. Manter risk-layer como trilha separada, sem bloquear freeze causal.

## 10. Helper auxiliar criado nesta fase

Foi criado helper de analise offline:

- `tests/sera/analyze-sera-causal-report.js`

Motivo de localizacao:

- `scripts/` esta ignorado por `.gitignore`, entao `scripts/analyze-sera-causal-report.js` nao seria versionavel nesta repo.
- O helper foi colocado em caminho versionavel equivalente para manter historico auditavel.

Uso:

```bash
node tests/sera/analyze-sera-causal-report.js tests/reports/candidates/methodology-gate-run-1779497843.json
```

## 11. Necessidade de scorer causal-only oficial

Sim. E necessario criar scorer causal-only oficial (A4-e ou A4-d2), para:

- evitar que `overall` legacy oculte validade causal;
- padronizar gate de freeze causal;
- produzir relatorio oficial com separacao causal vs risk layer.

## 12. Plano proposto (A4-e ou A4-d2)

1. Introduzir relatorio oficial com duas visoes:
   - `overall_legacy` (com `erc_level`);
   - `overall_causal` (P/O/A/preconditions).
2. Definir guardrails formais de freeze causal (`PASS/PARTIAL/FAIL/ERROR` causal e determinismo causal).
3. Publicar baseline causal-only inicial sem promover risk-layer baseline.
4. Abrir fase dedicada de validacao/calibracao da HFA Risk Layer.
