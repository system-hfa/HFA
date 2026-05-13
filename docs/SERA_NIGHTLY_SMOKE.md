# SERA Nightly Smoke

## 1. Objetivo

O smoke noturno é a execução programada do classificador SERA sobre todas as fixtures de validação, com múltiplas runs por fixture, para detectar regressões, não-determinismo ou erros de execução. Ele é o gate principal antes da homologação de qualquer baseline.

## 2. Pré-condição

O repositório deve estar limpo antes da execução:

```bash
git status --short
```

Saída esperada: vazia (ou apenas arquivos de run anteriores em `tests/reports/`).

Se houver alterações não commitadas em código ou fixtures, o smoke **não é válido** — os resultados não podem ser atribuídos a um commit específico.

## 3. Execução

### 3.1 Verificar status

```bash
git status --short
git log --oneline -1
```

Anotar o commit hash atual. O baseline será vinculado a este commit.

### 3.2 Rodar smoke global

```bash
SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact
```

Este comando:
- Executa todas as 54 fixtures.
- Roda cada fixture 3 vezes para aferir determinismo.
- Gera saída compacta no terminal.
- Salva o relatório completo em `tests/reports/run-<timestamp>.json`.

### 3.3 Identificar o último run gerado

```bash
ls -t tests/reports/run-*.json | head -1
```

O arquivo mais recente é o relatório do smoke recém-executado.

### 3.4 Comparar com baseline v0.1

```bash
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current $(ls -t tests/reports/run-*.json | head -1)
```

## 4. Interpretação dos resultados

### Sucesso total

Saída esperada do smoke:

```
[SERA] 54f × 3r | PASS 54 | PARTIAL 0 | FAIL 0 | ERROR 0 | rate 100.0% | det 100.0%
```

Saída esperada do comparador:

```
[BASELINE] 98.1% → 100.0% (+1.9%) | regressions 0 | improvements 1 | changed 0
```

- `improvements 1` = TEST-O-D-001 (era PARTIAL, agora PASS).
- `regressions 0` = nenhuma fixture piorou.

### PARTIAL

Se houver PARTIAL além de TEST-O-D-001 (que agora deve ser PASS):

- Identificar quais fixtures estão parciais.
- Verificar quais eixos divergem.
- Se for caso novo: **bloqueia release**. Investigar antes de prosseguir.
- Se for TEST-O-D-001 ainda PARTIAL: a correção não surtiu efeito. Bloqueia release.

### FAIL ou ERROR

Qualquer FAIL ou ERROR **bloqueia release imediatamente**:

- Não apagar o arquivo de run.
- Anotar as fixtures com FAIL/ERROR.
- Reportar para investigação.
- **Não criar baseline.**

### Regressão no comparador

Se `regressions > 0`:

- Listar as fixtures com status `regression`.
- Verificar se a regressão é no eixo de percepção (provável área de impacto das correções).
- Bloqueia release até análise.

## 5. O que fazer se passar

1. **Não copiar o run para baseline automaticamente.**
2. Revisar manualmente o output completo do comparador.
3. Confirmar que `improvements` contém TEST-O-D-001 e nenhuma surpresa.
4. Confirmar que `regressions` = 0.
5. Confirmar que `determinism_rate` = 100%.
6. **Avisar** antes de copiar para `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`.

## 6. O que fazer se falhar

1. **Não apagar o arquivo de run** — ele é a evidência do problema.
2. Identificar e listar as fixtures problemáticas.
3. Para cada fixture problemática, verificar no JSON do run:
   - Entrada (`rawText`)
   - Saída esperada (`expected`)
   - Saída obtida (`actual`)
   - Runs individuais (se houve não-determinismo)
4. Reportar as fixtures com o diff de cada uma.
5. **Não criar baseline v0.1.1.**

## 7. Periodicidade

Executar uma vez ao dia, preferencialmente à noite (horário de baixa utilização da API). O custo estimado é de 54 × 3 = 162 chamadas ao modelo.

---

_Data: 13/05/2026_
