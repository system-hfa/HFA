# RISK Contract Checker — v0.4

**Data:** 2026-05-17  
**Fase:** RISK v0.4  
**Branch:** main  
**Escopo:** Validador de contrato de risco — sem chamada ao motor SERA, sem LLM, sem comparação P/O/A

---

## 1. Objetivo

O script `tests/sera/analyze-risk-validation-contract.ts` valida que cada fixture `TEST-RISK-*` satisfaz o contrato de risco definido em `docs/RISK_VALIDATION_CONTRACT_v0.3.md`.

**O que este script NÃO faz:**
- Não chama o motor SERA (pipeline P/O/A)
- Não usa LLM
- Não compara P/O/A com `expected`
- Não altera runner, motor, baseline, fixtures ou UI

**O que este script valida:**
- Presença e completude dos campos `sera_context` e `risk_expected`
- Consistência dos enums (`event_type`, `arms_color`, `traditional_matrix_applicable`, etc.)
- 8 regras metodológicas derivadas do contrato ARMS/ERC/SIRA

---

## 2. Uso

```bash
# Modo default — exit 1 apenas se houver FAIL
npx tsx tests/sera/analyze-risk-validation-contract.ts

# Modo strict — exit 1 se houver WARN ou FAIL
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict

# Subconjunto de fixtures por prefixo
npx tsx tests/sera/analyze-risk-validation-contract.ts --prefix TEST-RISK-ERC-

# Ajuda
npx tsx tests/sera/analyze-risk-validation-contract.ts --help
```

**Exit codes:**
- `0` — sem FAIL (default) / sem WARN ou FAIL (--strict)
- `1` — ao menos um FAIL (default) / ao menos um WARN ou FAIL (--strict)

---

## 3. Regras de validação

### 3.1 Presença de campos obrigatórios (FAIL se ausente)

**`sera_context`:**
| Campo | Tipo |
|---|---|
| `focal_actor` | string |
| `focal_event_for_risk` | string |
| `sera_expected_frozen` | `{perception_code, objective_code, action_code}` |
| `acceptable_sera_variants` | `string[]` (ao menos 1) |
| `risk_scope_note` | string |

**`risk_expected`:**
| Campo | Tipo |
|---|---|
| `event_type` | `"historical_event" \| "safety_issue" \| "future_change"` |
| `arms_applicable` | boolean |
| `sira_applicable` | boolean |
| `traditional_matrix_applicable` | `"agreed" \| "limited" \| "not_applicable"` |
| `most_credible_accident_outcome` | string |
| `remaining_barrier_effectiveness` | `"effective" \| "limited" \| "minimal" \| "not_effective"` |
| `arms_risk_index_range` | string |
| `arms_color` | `"GREEN" \| "YELLOW" \| "RED" \| "N/A"` |
| `hfa_visual_category` | string |
| `probability_claim_allowed` | boolean |
| `probability_limitation_note` | string |
| `risk_profile_use` | `"allowed" \| "limited" \| "not_allowed"` |
| `anti_pattern` | string (≥20 chars) |

### 3.2 Regras metodológicas

| Regra | Nível | Condição |
|---|---|---|
| 4.1 | FAIL | `historical_event` com `probability_claim_allowed=true` |
| 4.1 | WARN | `historical_event` com `sira_applicable=true` sem `sira_note` |
| 4.1 | WARN | `historical_event` com `arms_applicable=false` (incomum) |
| 4.2 | FAIL | `safety_issue` com `sira_applicable≠true` |
| 4.2 | WARN | `safety_issue` sem `probability_limitation_note` de base de frequência |
| 4.3 | FAIL | `future_change` com `sira_applicable≠true` |
| 4.3 | WARN | `future_change` com `arms_applicable=true` (ERC é reativo, não prospectivo) |
| 4.4 | FAIL | `arms_applicable=true` sem `arms_risk_index_range`, `arms_color` ou `hfa_visual_category` |
| 4.5 | FAIL | `probability_claim_allowed=false` sem `probability_limitation_note` |
| 4.6 | WARN | `anti_pattern` com menos de 20 caracteres |
| 4.7 | WARN | `risk_profile_use=allowed` em `historical_event` isolado (`sira_applicable=false`) |
| 4.8 | WARN | `sira_applicable=true` sem `sira_note` |

---

## 4. Resultado da validação — Run 1 (2026-05-17)

### 4.1 Modo default

```
Fixtures: tests/sera/fixtures/TEST-RISK-*.json  (10 encontrados)
Modo:     default (apenas FAIL bloqueia)

ID                         event_type       ARMS  SIRA  Trad.         P.allow RiskProf   STATUS
TEST-RISK-DUAL-001         historical_event true  true  limited       false   not_allowed ✓ OK
TEST-RISK-DUAL-002         historical_event true  true  limited       false   not_allowed ✓ OK
TEST-RISK-ERC-001          historical_event true  false agreed        false   not_allowed ✓ OK
TEST-RISK-ERC-002          historical_event true  false agreed        false   not_allowed ✓ OK
TEST-RISK-ERC-003          historical_event true  false agreed        false   not_allowed ✓ OK
TEST-RISK-ERC-004          historical_event true  true  limited       false   limited     ✓ OK
TEST-RISK-ERC-005          historical_event true  true  agreed        false   not_allowed ✓ OK
TEST-RISK-ISO-001          historical_event true  true  not_applicable false  not_allowed ✓ OK
TEST-RISK-SIRA-001         historical_event true  true  agreed        false   limited     ✓ OK
TEST-RISK-SIRA-002         historical_event true  true  limited       false   limited     ✓ OK

Total: 10 · OK: 10 · WARN: 0 · FAIL: 0
exit code: 0
```

### 4.2 Modo --strict

```
Total: 10 · OK: 10 · WARN: 0 · FAIL: 0
exit code: 0
```

**Observação:** 3 fixtures tinham `arms_color` com faixas (`"YELLOW a RED"`, `"GREEN a YELLOW"`) que violavam o enum single-value do contrato. Foram corrigidos para o valor conservador (maior risco):
- `TEST-RISK-ISO-001`: `"YELLOW a RED"` → `"RED"`
- `TEST-RISK-SIRA-001`: `"GREEN a YELLOW"` → `"YELLOW"`
- `TEST-RISK-SIRA-002`: `"YELLOW a RED"` → `"RED"`

O campo `arms_risk_index_range` documenta a faixa completa para cada caso de borda.

---

## 5. Resumo SERA context (referência)

| ID | Frozen P/O/A | Variantes aceitas |
|---|---|---|
| TEST-RISK-DUAL-001 | P-B/O-A/A-G | P-B/O-A/A-G, P-A/O-A/A-B, P-A/O-A/A-G |
| TEST-RISK-DUAL-002 | P-B/O-A/A-C | P-B/O-A/A-C, P-A/O-A/A-C, P-A/O-C/A-A |
| TEST-RISK-ERC-001 | P-A/O-A/A-A | P-A/O-A/A-A, P-A/O-A/A-C |
| TEST-RISK-ERC-002 | P-A/O-A/A-B | P-A/O-A/A-B, P-G/O-A/A-B |
| TEST-RISK-ERC-003 | P-B/O-A/A-C | P-B/O-A/A-C, P-A/O-A/A-C, P-A/O-A/A-B, P-B/O-A/A-B |
| TEST-RISK-ERC-004 | P-B/O-B/A-D | P-B/O-B/A-D, P-G/O-A/A-C, P-B/O-A/A-D |
| TEST-RISK-ERC-005 | P-B/O-A/A-G | P-B/O-A/A-G, P-E/O-A/A-C, P-B/O-A/A-C |
| TEST-RISK-ISO-001 | P-B/O-A/A-C | P-B/O-A/A-C, P-A/O-A/A-F, P-B/O-A/A-F, P-A/O-A/A-C |
| TEST-RISK-SIRA-001 | P-A/O-A/A-B | P-A/O-A/A-B, P-G/O-A/A-B |
| TEST-RISK-SIRA-002 | P-B/O-A/A-G | P-B/O-A/A-G, P-G/O-A/A-D, P-B/O-A/A-D |

> Esta tabela documenta as classificações SERA para referência — **não é critério de sucesso do contrato de risco.** O status P/O/A não determina se um fixture de risco é válido.

---

## 6. Integridade do motor

Nenhum arquivo do motor SERA, runner, baseline ou UI foi alterado nesta fase.

Arquivos alterados nesta fase (RISK v0.4):
- `tests/sera/analyze-risk-validation-contract.ts` — script criado
- `docs/RISK_VALIDATION_CONTRACT_CHECKER_v0.4.md` — este documento
- `tests/sera/fixtures/TEST-RISK-ISO-001.json` — `arms_color` corrigido para enum válido
- `tests/sera/fixtures/TEST-RISK-SIRA-001.json` — `arms_color` corrigido para enum válido
- `tests/sera/fixtures/TEST-RISK-SIRA-002.json` — `arms_color` corrigido para enum válido

Arquivos protegidos (sem alteração):
- `frontend/src/lib/sera/**`
- `tests/sera/baseline.json`
- `tests/sera/run.ts`
- `tests/sera/fixtures/schema.ts`
- `schema/migrations/**`
- `scripts/**`

---

## 7. Próximos passos — RISK v0.5

1. Implementar runner de risco que extraia `computeEventRisk()` output e compare com `risk_expected.arms_color` e `arms_risk_index_range`
2. Verificar os 6 critérios bloqueantes da seção 6 do CONTRACT v0.3 (todos "a verificar")
3. Executar decisão F-001 (Opção A: inversão de escala motor vs UI) e atualizar fixtures `future_expected`
4. Adereçar backlog de motor causal (MOTOR-001 a MOTOR-004) em fase separada
