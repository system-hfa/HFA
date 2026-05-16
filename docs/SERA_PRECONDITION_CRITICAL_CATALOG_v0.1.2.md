# SERA Precondition-Critical Catalog — v0.1.2 Draft

**Data:** 2026-05-16
**Status:** Draft advisory — não altera runner, motor, baseline ou fixtures.
**Arquivo JSON:** `tests/sera/preconditions-critical-catalog.json`
**Relacionado:** `docs/SERA_PRECONDITIONS_POLICY_v0.1.2.md`, `docs/SERA_CODE_EVIDENCE_MATRIX_DRAFT_v0.1.2.md`

---

## 1. Objetivo

Este catálogo registra quais fixtures SERA devem ser tratadas como **precondition-critical** e classifica as preconditions de cada fixture em Critical, Expected, Optional e Noise_if_present.

**Este documento é puramente advisory.** Não altera:
- o runner SERA (`tests/sera/run.ts`);
- o motor (`frontend/src/lib/sera/`);
- as fixtures existentes;
- o baseline v0.1.1;
- o comportamento de qualquer gate.

O catálogo serve de referência para:
- futura implementação de `precondition_critical_recall` no runner;
- auditoria manual de resultados de preconditions;
- revisão de fixtures com top_preconditions inflados ou incorretos.

---

## 2. Relação com a Política

A política formal está em `docs/SERA_PRECONDITIONS_POLICY_v0.1.2.md`. Este catálogo implementa operacionalmente as classes descritas na seção 4 (Critical, Expected, Optional, Noise):

- **Seção 4.1** define o que é Critical.
- **Seção 5** define quando uma fixture deve bloquear release por precondition.
- **Seção 8** orienta como novas fixtures devem declarar top_preconditions.

O catálogo antecipa a estrutura que o runner precisará consumir quando o campo `precondition_policy` for implementado (v0.1.2-C ou posterior, conforme seção 7.2 da política).

---

## 3. Como interpretar as classes

| Classe | Definição operacional | Critério de inclusão |
|---|---|---|
| **Critical** | Pré-condição com evidência textual explícita e central no relato. Sua ausência indica miss metodológico grave. | Texto do relato menciona explicitamente o fator. Máximo 1–3 por fixture. |
| **Expected** | Pré-condição metodologicamente esperada para aquele código P/O/A, mas não necessariamente evidenciada com precisão textual. | Plausível e coerente com o caso, mas a ausência não bloqueia release. |
| **Optional** | Pré-condição que pode aparecer se o relato mencionar o fator, mas não obrigatória por metodologia. | Aparecimento ou ausência são ambos aceitáveis. |
| **Noise_if_present** | Pré-condição que, se retornada, indica inferência sem base textual ou recomendação metodologicamente incorreta. | Fator não mencionado no relato; presença distorce recomendações de prevenção. |

**Regra central:** o número de Critical deve ser mínimo e defensável textualmente. Não inflar Critical. **Derivação de regra matrix ou plausibilidade metodológica NÃO são suficientes para classificar uma precondition como Critical.**

### 3.1 catalog_role

Cada fixture no catálogo recebe um `catalog_role` que determina seu papel operacional:

| catalog_role | Definição | Implicação para release |
|---|---|---|
| **active** | Fixture tem pelo menos uma precondition Critical com evidência textual explícita. | Candidata a gate de release quando Critical ausente em 2/3 ou 3/3 runs. |
| **monitoring** | Fixture incluída para observação — nenhuma precondition com evidência textual suficiente para Critical. | NÃO bloqueia release. Incluída para rastrear comportamento do motor. |
| **audit_anomaly** | Fixture com top_preconditions provavelmente incorretos — recall = 0 em 3/3 runs ou evidência de top_pre inconsistente com o cenário. | NÃO bloqueia release. Requer revisão da fixture antes de qualquer uso como gate. |

**Apenas fixtures com `catalog_role: "active"` são candidatas a bloquear release.** Fixtures `monitoring` e `audit_anomaly` são incluídas exclusivamente para observação e auditoria.

---

## 4. Fixtures incluídas

### 4.1 Fixtures da baseline v0.1.1 (com dados de recall)

| Fixture ID | P/O/A/ERC | catalog_role | pre_pass (baseline) | avg_recall | Critical | Expected | Motivo de inclusão |
|---|---|---|---|---|---|---|---|
| TEST-P-D-001 | P-D/O-A/A-A/ERC3 | active | 0/3 | 0.42 | T1, O1 | O2 | Alta demanda explícita; O1 nunca retornado (gap EVM-009) |
| TEST-P-C-001 | P-C/O-A/A-A/ERC3 | active | 0/3 | 0.33 | P6 | — | Déficit de treinamento central; top_pre inflado (P7, W1) |
| TEST-P-G-001 | P-G/O-A/A-B/ERC3 | **monitoring** | 0/3 | 0.75 | **—** | P6, O3, O4 | Complacência em piloto experiente; regra matrix retorna W1 sem base textual (EVM-008) |
| TEST-A-E-001 | P-C/O-A/A-E/ERC2 | active | 0/3 | 0.50 | P6 | O4 | Déficit de conhecimento central; P7 inflado |
| TEST-ERC-4-001 | P-A/O-A/A-B/ERC4 | **audit_anomaly** | 0/3 | 0.00 | **—** | O3 | **Anomalia: recall=0, top_pre provavelmente incorreto — não usar como gate (EVM-007)** |
| TEST-COMBO-003 | P-C/O-A/A-E/ERC2 | active | 0/3 | 0.40 | P6 | O3, O4 | Médico sem treinamento aeronáutico; cenário rico |
| TEST-O-B-001 | P-A/O-B/A-A/ERC1 | active | 3/3 | 1.00 | P3, S3 | O5, O6 | Referência positiva O-B; recall perfeito |
| TEST-O-C-001 | P-A/O-C/A-A/ERC2 | active | 3/3 | 1.00 | S1, O3 | P2, T1 | Referência positiva O-C protetivo; recall perfeito |

**Nota sobre TEST-P-G-001:** Fixture descreve piloto com 3.200 horas de experiência que falhou por complacência. O texto não menciona déficit de treinamento (P6 derivado da regra matrix, não do texto) nem ausência de procedimento formal (O3 — checklist existe e foi ignorado por complacência, não por inexistência). Por isso, nenhuma precondition tem evidência textual suficiente para Critical. Fixture classificada como `monitoring`, sem bloqueio de release. A regra matrix P-G+A-B retorna W1 sem base textual — ver issue EVM-008.

**Nota sobre TEST-ERC-4-001:** Motor retorna P2/T2/S3/O4 com variação não determinística; nunca retorna W1 ou O3 (top_pre declarados). Recall = 0.00 em 3/3 runs. Fixture não deve ser usada como gate de precondition até revisão do top_preconditions. Classificada como `audit_anomaly`. Ver issue EVM-007.

### 4.2 Fixtures v0.1.2-A (sem dados de baseline — validadas em v0.1.2-A)

| Fixture ID | P/O/A/ERC | catalog_role | pre_pass (v0.1.2-A) | avg_recall | Critical | Expected | Motivo de inclusão |
|---|---|---|---|---|---|---|---|
| TEST-GEN-OC-NP-001 | P-A/O-C/A-A/ERC2 | active | N/A | N/A | P2, O3 | — | O-C não-protetivo; risco EVM-001 (S1 não deve ser acionado) |
| TEST-GEN-OC-NP-005 | P-C/O-A/A-E/ERC2 | active | N/A | N/A | P5 | — | Adversarial O-A; qualificação específica ausente |

---

## 5. Critério futuro de bloqueio

**Somente fixtures com `catalog_role: "active"` são candidatas a bloquear release.**

Uma fixture `active` deve bloquear release **somente quando**:

1. A fixture está marcada explicitamente como `precondition-critical` (neste catálogo ou no runner).
2. Uma precondition de classe **Critical** está ausente em **2/3 ou 3/3 runs** da validação.
3. Há evidência textual explícita no relato para aquela precondition (não inferência).
4. A ausência não é explicada por ambiguidade metodológica aceitável.
5. Revisão humana confirma que a ausência não é alternativa válida.

**Não devem bloquear release:**
- Ausência de precondition Expected ou Optional.
- Presença de Noise_if_present (é um flag de qualidade, não de bloqueio).
- Divergência de ordenação (mesmas preconditions em ordem diferente).
- Recall < 100% em fixtures não marcadas como precondition-critical.
- Qualquer falha de precondition em fixtures com `catalog_role: "monitoring"` ou `"audit_anomaly"`.

---

## 6. Limitações

| Limitação | Detalhe |
|---|---|
| Runner não consome o catálogo | O runner não lê `preconditions-critical-catalog.json`. Uso é puramente documental. |
| Catálogo não muda baseline | Nenhuma modificação em `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`. |
| Catálogo não retroaltera fixtures | Os arquivos JSON em `tests/sera/fixtures/` não são modificados. |
| Recall de NP-001 e NP-005 desconhecido | Fixtures v0.1.2-A não passaram por medição de precondition_recall. |
| ERC-4-001 com anomalia não resolvida | top_preconditions provavelmente incorretos — não usar para gate até revisão. Catalog_role: audit_anomaly. |
| P-G-001 sem Critical definido | Nenhuma precondition com evidência textual suficiente para Critical — catalog_role: monitoring, sem bloqueio de release. |
| Classificação Critical é provisional | Baseada em análise de relato e baseline; pode mudar com revisão metodológica. |
| Fixtures `monitoring` e `audit_anomaly` incluídas apenas para observação | Sua presença no catálogo não implica que serão usadas como gate. |

---

## 7. Issues abertas identificadas nesta fase

| Issue | Fixture | Descrição |
|---|---|---|
| **EVM-001** (existente) | GEN-OC-NP-001..004 | Regra O-C__A-A na matrix.json com S1 enviesado para vocabulário protetivo |
| **EVM-007** (nova) | TEST-ERC-4-001 | top_preconditions [W1, O3] provavelmente incorretos — recall=0 em 3/3 runs; motor retorna preconditions completamente diferentes |
| **EVM-008** (nova) | TEST-P-G-001 | Regra P-G+A-B retorna W1 como precondition; W1 sem base textual no cenário (complacência, não falha de equipamento) |
| **EVM-009** (nova) | TEST-P-D-001 | O1 (alta demanda operacional) com evidência textual clara ('14 aeronaves simultâneas') nunca retornado pelo motor — gap de recall sem causa aparente |
| **EVM-010** (nova) | Múltiplas (P-C, A-E) | P7 presente em top_preconditions de fixtures P-C/A-E sem evidência textual explícita de estado psicológico — candidato a remoção retroativa |

---

## 8. Resumo estatístico do catálogo

| Métrica | Valor |
|---|---|
| Total de fixtures no catálogo | 10 |
| Fixtures `active` (Critical ≥ 1, candidatas a gate) | 8 |
| Fixtures `monitoring` (Critical = 0, observação apenas) | 1 — TEST-P-G-001 |
| Fixtures `audit_anomaly` (top_pre requer revisão) | 1 — TEST-ERC-4-001 |
| Máximo de preconditions Critical por fixture | 2 (TEST-P-D-001, TEST-O-B-001, TEST-O-C-001, TEST-GEN-OC-NP-001) |

---

## 9. Script de análise report-only (v0.1.2-E)

O script `tests/sera/analyze-precondition-critical-recall.ts` lê o catálogo e um report do runner e calcula métricas de critical recall. **Não altera runner, motor, baseline, fixtures nem expected labels.**

### Uso

```bash
# Análise padrão — exit code 0 mesmo com WARN
npx tsx tests/sera/analyze-precondition-critical-recall.ts \
  --report tests/reports/baseline/sera-baseline-v0.1.1-smoke.json \
  --catalog tests/sera/preconditions-critical-catalog.json

# Modo estrito — exit code 1 se houver WARN_CRITICAL_MISSING
npx tsx tests/sera/analyze-precondition-critical-recall.ts \
  --report <path> --catalog <path> --strict
```

### Como interpretar o output

| Status | Significado |
|---|---|
| `✓ OK` | Todas as preconditions Critical encontradas em ≥ 2/3 runs |
| `⚠ WARN_CRITICAL_MISSING` | Critical ausente em ≥ 2 runs — achado diagnóstico; NÃO altera overall |
| `- NOT_IN_REPORT` | Fixture ativa mas não presente no report (ex: fixtures v0.1.2-A no baseline v0.1.1) |
| `- NO_CRITICAL` | Fixture `active` sem Critical definido — não incluída na métrica |
| `~ SKIPPED (monitoring)` | catalog_role = monitoring — NÃO é release-blocking |
| `~ SKIPPED (audit_anomaly)` | catalog_role = audit_anomaly — NÃO é release-blocking; top_pre requer revisão |

### Regras importantes

- **WARN não é falha de release** — o `overall` do runner não muda.
- **Fixtures `monitoring` e `audit_anomaly` são sempre skipped** — nunca bloqueiam release.
- **`--strict` é para CI exploratório opcional** — default é exit code 0.
- O script pode ser rodado contra qualquer report JSON gerado pelo runner.

### Resultado contra baseline v0.1.1

```
Active fixtures encontradas no baseline: 6/8
Active not in report (v0.1.2-A): 2 (NP-001, NP-005)
Avg critical recall: 0.917
WARN_CRITICAL_MISSING: 1 (TEST-P-D-001 — O1 nunca retornado, issue EVM-009)
```

---

## 10. Próximo passo

v0.1.2-F (futura) pode adicionar suporte no runner para:

1. Integrar `precondition_critical_recall` como campo separado no report JSON.
2. Flag de `noise_detected` quando precondition listada como `noise_if_present` for retornada.
3. Filtrar por `catalog_role: "active"` para aplicar bloqueio — ignorar `monitoring` e `audit_anomaly`.

Esta integração **não deve misturar `precondition_critical_recall` com `overall`** sem revisão e aprovação da política.
