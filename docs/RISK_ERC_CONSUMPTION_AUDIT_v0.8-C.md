# RISK ERC Consumption Audit — v0.8-C
**Versão:** v0.8-C  
**Data:** 2026-05-18  
**Fase:** RISK v0.8-C  
**Status:** Entregue — auditoria completa, bordas corrigidas, motor e banco intocados.

---

## 1. Objetivo

Auditar todo consumo direto de `analyses.erc_level` em UI/API, identificar pontos que exibiam ou agregavam o valor legacy como se fosse HFA ERC Category, e corrigir somente as bordas visuais, sem inverter o motor SERA nem migrar dados.

---

## 2. Por que v0.8-C não inverte o motor

`analyses.erc_level` é produzido pelo motor SERA com a escala legacy (1=crítico, 5=mínimo). Inverter o motor exigiria:

- Alterar `inferErcLevel()` em `pipeline.ts` e `inferDeterministicErcLevel()` em `all-steps.ts`
- Reescrever `rules/erc/levels.json`
- Decidir e executar migration dos dados históricos
- Revalidar 59 fixtures e o baseline `sera-v0.1.1`
- Reexecutar o smoke global 162/162

Em conformidade com princípios de gestão de risco estruturada (ISO 31000) e validação em sistemas críticos, mudanças de alta propagação devem ser isoladas, rastreáveis e testadas contra baseline. A estratégia segura é manter a origem legacy/opaca e converter nas **bordas de consumo**, usando a camada testada entregue em v0.8-A e v0.8-B.

---

## 3. Decisão de escala em vigor

| Legacy motor ERC (`analyses.erc_level`) | HFA ERC Category (visual/API) | ARMS barrier column |
|---:|---:|---:|
| 1 (crítico) | 5 | 1 (sem barreiras) |
| 2 | 4 | 2 |
| 3 | 3 | 3 |
| 4 | 2 | 4 |
| 5 (mínimo) | 1 | 4 (capped) |

Opção A adotada em RISK v0.7. `analyses.erc_level` permanece legacy motor scale.

---

## 4. Buscas realizadas

Termos pesquisados:
- `erc_level`
- `modal_erc_level`
- `ERC` (em `app/`, `components/`, `lib/`)
- `ercLevel`
- `risk.*level`, `category.*erc`, `erc.*category`

Escopo: `frontend/src`, `tests/`, `docs/` — excluídos `node_modules`, `.next`, `dist`, `build`.

---

## 5. Classificação dos achados

### Grupo A — Motor/legacy/protegido (não alterado)

| Arquivo | Linha(s) | Motivo |
|---|---|---|
| `frontend/src/lib/sera/pipeline.ts` | 298–306 | Motor SERA — produz `erc_level` legacy |
| `frontend/src/lib/sera/all-steps.ts` | 3152–3190 | Motor SERA — prompt ERC, tabela legacy |
| `frontend/src/lib/sera/types.ts` | 121 | Tipo interno do motor |

### Grupo B — API (já corrigida em v0.8-B)

| Arquivo | Linha(s) | Status |
|---|---|---|
| `frontend/src/app/api/org/intelligence/route.ts` | 69, 310 | ✅ Seleciona `erc_level`, calcula `modal_erc_level` via `calculateModalHfaErcCategory()` |

Nenhuma outra rota de API lê ou retorna `erc_level`.

### Grupo C — UI visual (corrigido em v0.8-C)

| Arquivo | Linhas | Problema | Correção |
|---|---|---|---|
| `risk-profile/page.tsx` | 656–658 | `modal_erc_level` (HFA 1–5) usado diretamente como coluna barrier ARMS (1–4) sem conversão. HFA 1=aceitável mapeava para barrier 1 (sem barreiras) — invertido. | `isHfaErcCategory` + `hfaErcToArmsBarrier` |
| `risk-profile/page.tsx` | 946–948 | Mesmo problema na função de raciocínio (`SeraReasoningPanel`) | `isHfaErcCategory` + `hfaErcToArmsBarrier` |

### Grupo C — UI visual auditado e não alterado

| Arquivo | Motivo |
|---|---|
| `events/page.tsx` | ERC calculado de P/O/A codes client-side via `computeErc()`. Não lê `analyses.erc_level`. ✅ |
| `events/[id]/page.tsx` | ERC calculado de P/O/A codes client-side via `computeEventRisk()`. Não lê `analyses.erc_level`. ✅ |

### Grupo D — Documentação

| Arquivo | Ação |
|---|---|
| Docs históricos (`v0.5`, `v0.7`, `v0.7-B`, `v0.8-A`, `v0.8-B`) | Não alterados — descrevem estado da época |
| `docs/RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md` | Criado (este documento) |

---

## 6. Arquivos alterados

| Arquivo | Tipo | Descrição |
|---|---|---|
| `frontend/src/lib/sera/erc-presentation.ts` | Criado | Helper `hfaErcToArmsBarrier(HfaErcCategory): 1\|2\|3\|4` |
| `tests/sera/test-erc-presentation.ts` | Criado | Testes unitários do helper (9 cenários) |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | Alterado | Import + correção linhas 656–658, 946–948 |
| `docs/RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md` | Criado | Este documento |

---

## 7. Arquivos NÃO alterados (protegidos)

- `frontend/src/lib/sera/pipeline.ts`
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/rules/erc/levels.json`
- `tests/sera/fixtures/` (todos)
- `tests/reports/baseline/` (todos)
- `frontend/src/lib/sera/erc-conversion.ts` (sem bug)
- `frontend/src/lib/sera/erc-modal.ts` (sem bug)

---

## 8. Regras aplicadas

**Conversão individual:** `coerceMotorErcToHfaCategory(raw)` — para valores individuais de `analyses.erc_level`.

**Agregação/modal:** `calculateModalHfaErcCategory(values)` — para array de `analyses.erc_level` (implementado em v0.8-B).

**Conversão ARMS barrier:** `hfaErcToArmsBarrier(hfaCategory)` — para usar HFA ERC Category como coluna na matriz ARMS-ERC (novo em v0.8-C).

**Fallback para inválidos:** `isHfaErcCategory(value)` — se falso, usar `barrierLevel(score)` como fallback estimado. `coerceMotorErcToHfaCategory` retorna `null` para inválidos.

---

## 9. Lacunas remanescentes

| Lacuna | Prioridade | Fase sugerida |
|---|---|---|
| Motor `inferErcLevel()` ainda produz escala legacy | Baixa (não afeta UI) | RISK v0.9 ou posterior |
| Migration de `analyses.erc_level` histórico | Baixa (dados não exibidos raw) | RISK v0.9 ou posterior |
| Testes de contrato API → UI (regressão de escala) | Média | RISK v0.8-D |
| `frontend/src/lib/sera/types.ts:121` `erc_level?: number` sem tipo explícito legacy | Baixa | RISK v0.8-D |

---

## 10. Validações executadas

```
npx tsx tests/sera/test-erc-conversion.ts    → PASS (75 testes)
npx tsx tests/sera/test-erc-modal.ts         → PASS (10 testes)
npx tsx tests/sera/test-erc-presentation.ts  → PASS (9 testes)
cd frontend && npx tsc --noEmit              → 0 erros
npx tsx tests/sera/analyze-risk-validation-contract.ts           → 10/10 OK
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict  → 10/10 OK, WARN 0, FAIL 0
```

---

## 11. Próxima fase recomendada

**RISK v0.8-D — Testes de contrato para API/UI de ERC visual**

Criar fixtures pequenas ou scripts que validem end-to-end que:
- `org/intelligence` retorna `modal_erc_level` como HFA ERC Category (nunca raw legacy)
- `risk-profile` usa HFA ERC → barrier column com `hfaErcToArmsBarrier`
- Impedir regressão futura de escala invertida

Alternativamente: **RISK v0.9-A — Revisão metodológica do risk profile organizacional** (score, separação evento/Safety Issue/tendência).

---

## 12. Referências

| Documento | Relevância |
|---|---|
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Opção A — escala crescente |
| `RISK_ERC_CONVERSION_v0.8-A.md` | Função de conversão legacy → HFA |
| `RISK_ERC_MODAL_v0.8-B.md` | `modal_erc_level` calculado |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | Plano técnico, fases v0.8-A→E |
| `frontend/src/lib/sera/erc-presentation.ts` | Helper `hfaErcToArmsBarrier` |
| `tests/sera/test-erc-presentation.ts` | Testes do helper |
