# SERA Baseline v0.1.1 Validation Plan

## 1. Objetivo da v0.1.1

A versão v0.1.1 é uma release corretiva e de refinamento metodológico sobre o baseline v0.1. Seu objetivo é resolver o único known issue da v0.1 (TEST-O-D-001) e consolidar a distinção entre eficiência pura e violação rotineira no eixo de percepção, sem introduzir regressões.

## 2. Diferença entre v0.1 e v0.1.1

| Aspecto | v0.1 | v0.1.1 |
|---|---|---|
| Fixtures | 54 | 54 (inalterado) |
| Known issue | TEST-O-D-001: P-G em vez de P-A para caso O-D puro | Corrigido |
| Distinção O-D / O-B | Indiferenciada — casos O-D podiam receber P-G | O-D puro → P-A; O-B rotineiro/normalizado → P-G |
| Baseline | `sera-baseline-v0.1-smoke.json` | A ser gerado como `sera-baseline-v0.1.1-smoke.json` |

## 3. Known issue corrigido: TEST-O-D-001

| Campo | v0.1 (antes) | v0.1.1 (esperado) |
|---|---|---|
| Percepção | P-G | P-A |
| Objetivo | O-D | O-D |
| Ação | A-A | A-A |
| ERC | 2 | 2 |

A correção está nos commits `c9d56ef` e `3dafb52`, que refinam a heurística de percepção para distinguir entre ameaça externa direta (O-D, percepção P-A) e violação rotineira normalizada (O-B, percepção P-G).

## 4. Refinamento metodológico

- **O-D puro (eficiência/ameaça direta)** permanece com percepção **P-A** — a ameaça é concreta e específica, não uma sensação difusa de perigo.
- **O-B rotineiro/normalizado (violação)** permanece com percepção **P-G** — o perigo é percebido como parte do ambiente, normalizado pela rotina.

Esta distinção era o que faltava no classificador v0.1 e foi implementada sem alterar fixtures ou a baseline anterior.

## 5. Commits relevantes

| Commit | Descrição |
|---|---|
| `c9d56ef` | fix(sera): keep pure efficiency decisions in P-A perception |
| `3dafb52` | fix(sera): distinguish pure efficiency from routine violation perception |

## 6. Critérios de aceite

- **54 fixtures** executadas (todas as fixtures do baseline v0.1)
- **54 PASS** — zero PARTIAL
- **0 FAIL**
- **0 ERROR**
- **determinism_rate 100%** (com `SERA_N_RUNS=3`)
- **regressions 0** no comparador contra v0.1
- **TEST-O-D-001** aparece como **improvement** no comparador (PARTIAL → PASS)

## 7. Critérios de bloqueio

A release **não pode prosseguir** se qualquer um destes ocorrer:

- Qualquer **FAIL**
- Qualquer **ERROR**
- Qualquer **regressão** detectada pelo comparador ( fixtures que eram PASS no v0.1 e passam a PARTIAL, FAIL ou ERROR no v0.1.1)
- Qualquer **PARTIAL** não explicado e justificado
- **determinism_rate** abaixo de **100%**

## 8. Comandos de validação

### Smoke global (recomendado)

```bash
SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact
```

O relatório será salvo em `tests/reports/run-<timestamp>.json`.

### Comparação contra baseline v0.1

```bash
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current <run-file>
```

Com `--fail-on-regression` para uso em CI:

```bash
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current <run-file> \
  --fail-on-regression
```

## 9. Salvamento do baseline v0.1.1

O baseline v0.1.1 **só deve ser salvo após revisão humana** do relatório de smoke e do output do comparador:

1. Executar o smoke global com `SERA_N_RUNS=3`.
2. Comparar contra `sera-baseline-v0.1-smoke.json`.
3. Revisar manualmente o diff de cada fixture com status diferente de `unchanged`.
4. Confirmar que TEST-O-D-001 está como `improvement` e nenhuma fixture está como `regression`.
5. Copiar o arquivo de run para `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`.

**Não automatizar este passo.** A decisão de homologar um novo baseline é humana.

---

_Data: 13/05/2026_
