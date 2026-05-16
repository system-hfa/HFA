# SERA Smoke Fast — v0.1.2 Draft

**Data:** 2026-05-16
**Status:** Implementado — validado em v0.1.2-C.
**Relacionado:** `docs/SERA_V0_1_2_PLAN.md`, `docs/SERA_PRECONDITIONS_POLICY_v0.1.2.md`

---

## 1. Objetivo

O smoke-fast é um gate rápido de regressão para uso em PRs e ciclos curtos de desenvolvimento. Ele cobre os eixos críticos do motor SERA em menos tempo do que o smoke global, com foco em detectar regressões óbvias.

**O smoke-fast NÃO substitui o smoke global de release.** Aprovação no smoke-fast não autoriza promoção de baseline nem release.

---

## 2. Escopo

| Parâmetro | Valor padrão | Override |
|---|---|---|
| Número de fixtures | 14 | Alterar `tests/sera/smoke-fast-fixtures.txt` |
| Runs por fixture | 1 | `SERA_N_RUNS=3 bash scripts/run-sera-smoke-fast.sh` |
| Arquivo de lista | `tests/sera/smoke-fast-fixtures.txt` | `FIXTURES_FILE=... bash ...` |
| Cobertura | P/O/A/ERC — todos os principais códigos | — |
| Preconditions | Não avaliadas neste gate | Regressão de preconditions → smoke global |

Uso recomendado:
- **1 run:** validação rápida de PR ou patch de fixture/doc.
- **3 runs:** validação de patch metodológico ou de motor (antes de abrir PR).

---

## 3. Composição

| Fixture ID | Eixo | Expected P/O/A/ERC | Por que incluída |
|---|---|---|---|
| TEST-P-D-001 | Percepção | P-D/O-A/A-A/ERC3 | Sobrecarga atencional — gate P-D, fronteira P/O |
| TEST-P-H-001 | Percepção | P-H/O-A/A-A/ERC3 | Informação ambígua/briefing — fronteira P-H vs. O-C |
| TEST-P-G-001 | Percepção | P-G/O-A/A-B/ERC3 | Falha de monitoramento — gate P-G |
| TEST-O-B-001 | Objetivo | P-A/O-B/A-A/ERC1 | Violação rotineira normalizada — gate O-B; ERC1 |
| TEST-O-C-001 | Objetivo | P-A/O-C/A-A/ERC2 | O-C protetivo canônico — sem regressão |
| TEST-GEN-OC-001 | Objetivo | P-A/O-C/A-A/ERC2 | O-C protetivo variação — generalização |
| TEST-O-D-001 | Objetivo | P-A/O-D/A-A/ERC2 | Eficiência/economia — gate O-D |
| TEST-GEN-OC-NP-001 | Objetivo | P-A/O-C/A-A/ERC2 | O-C não-protetivo — adicionada em v0.1.2-A |
| TEST-GEN-OC-NP-005 | Objetivo | P-C/O-A/A-E/ERC2 | Adversarial: parece O-C mas é O-A — gate de desvio consciente; v0.1.2-A |
| TEST-A-B-001 | Ação | P-G/O-A/A-B/ERC3 | Omissão de passo obrigatório — gate A-B; cascata P-G+A-B |
| TEST-A-C-001 | Ação | P-G/O-A/A-C/ERC2 | Fronteira A-B/A-C — auto-verificação falha |
| TEST-A-E-001 | Ação | P-C/O-A/A-E/ERC2 | Déficit de conhecimento — tríade P-C+O-A+A-E |
| TEST-COMBO-001 | Combo | P-G/O-A/A-F/ERC2 | Multi-step — cobre A-F e cenário composto |
| TEST-ERC-4-001 | ERC | P-A/O-A/A-B/ERC4 | ERC alta severidade — sem regressão em ERC4 |

**Cobertura por eixo:**

| Dimensão | Códigos cobertos |
|---|---|
| Percepção | P-A, P-C, P-D, P-G, P-H |
| Objetivo | O-A, O-B, O-C (protetivo), O-C (não-protetivo), O-D; adversarial O-A |
| Ação | A-A, A-B, A-C, A-E, A-F |
| ERC | ERC1, ERC2, ERC3, ERC4 |

---

## 4. Comando

### Comando padrão (1 run — gate de PR)

```bash
bash scripts/run-sera-smoke-fast.sh
```

### Com 3 runs (patch metodológico)

```bash
SERA_N_RUNS=3 bash scripts/run-sera-smoke-fast.sh
```

### Como interpretar o resultado

O script exibe cada fixture em uma linha:

```
  TEST-O-C-001                                  ✓ PASS
  TEST-GEN-OC-NP-001                            ✓ PASS
  TEST-GEN-OC-NP-005                            ✗ FAIL
  ── output ───────────────────────────────────────
  [output do runner para a fixture que falhou]
  ── fim output ───────────────────────────────────
```

Ao final:
```
  Smoke Fast: 13/14 PASS  |  n-runs=1

  FAIL:
    - TEST-GEN-OC-NP-005

  Smoke fast REPROVADO.
```

O script retorna exit code 0 se todos passarem, exit code 1 se qualquer fixture falhar.

---

## 5. Critérios de PASS

| Critério | Valor |
|---|---|
| Taxa de PASS exigida | 100% (todas as 14 fixtures) |
| Runs por fixture | Conforme `SERA_N_RUNS` (padrão 1) |
| Tolerância a FAIL | Zero — qualquer FAIL bloqueia o gate |
| Tolerância a PARTIAL | Zero — exit code 1 se pass_rate < 70% em qualquer fixture |
| Tolerância a ERROR | Zero — exit code 1 em erro de execução |

**Aprovação no smoke-fast não autoriza:**
- Promoção de baseline.
- Release candidate.
- Alteração de expected labels.
- Alteração de motor sem validação seletiva completa.

---

## 6. Quando usar

| Situação | Smoke-fast? | Smoke global? |
|---|---|---|
| Antes de commit de patch de doc ou fixture nova | Sim | Não obrigatório |
| Antes de abrir PR com patch metodológico | Sim (3 runs) | Não obrigatório |
| Depois de adicionar fixture nova | Sim | Não obrigatório |
| Antes de qualquer alteração no motor | Sim (3 runs pré-alteração) | Obrigatório pós-alteração |
| Validação de ciclo curto / iteração | Sim | Não |
| Release candidate | Não suficiente | Obrigatório |
| Promoção de baseline | Não suficiente | Obrigatório |

---

## 7. Quando rodar smoke global

O smoke global (54+ fixtures × 3 runs) é obrigatório em:

- Fechamento de versão e promoção de baseline.
- Qualquer alteração no motor (`frontend/src/lib/sera/**`).
- Qualquer alteração no runner (`tests/sera/run.ts`, `tests/sera/runner.ts`).
- Alteração de taxonomia P/O/A/ERC.
- Alteração de expected labels em fixtures existentes.
- Alteração de baseline ou schema de fixtures.
- Release candidate.

Comando:
```bash
bash scripts/run-sera-v0.1.1-smoke.sh
```

---

## 8. Manutenção da lista

A lista `tests/sera/smoke-fast-fixtures.txt` deve ser atualizada quando:

| Evento | Ação |
|---|---|
| Nova fixture estável adicionada que cobre eixo não coberto | Adicionar à lista com justificativa |
| Fixture existente se tornar instável | Remover e documentar motivo |
| Novo código SERA adicionado à taxonomia | Avaliar necessidade de fixture representativa |
| Fixture na lista falhar consistentemente por instabilidade | Remover e substituir |

Regras:
- Não adicionar fixture sem expected claro e fundamentado.
- Não usar fixtures conhecidas por instabilidade de ERC ou preconditions.
- Manter entre 12 e 20 fixtures no total.
- Qualquer alteração na lista deve ser commitada com justificativa na mensagem de commit.
