# Modal ERC Category — RISK v0.8-B
**Versão:** v0.8-B  
**Data:** 2026-05-18  
**Fase:** RISK v0.8-B  
**Status:** Entregue — F-002 resolvido. Nenhum motor/UI/banco alterado.

---

## 1. Propósito

Conectar `modal_erc_level` na API `org/intelligence`, substituindo o valor `null` hardcoded (F-002) por um cálculo real baseado nos dados de `analyses.erc_level`.

Pré-requisito: `motorErcToHfaCategory()` criado em RISK v0.8-A.

---

## 2. Definição de Modal ERC

O modal HFA ERC category é a categoria mais frequente entre todas as análises do tenant, após conversão da escala legacy do motor para a escala HFA (Opção A).

**Tie-breaker:** em caso de empate por frequência, vence a categoria mais alta (mais crítica). Isso garante que o sistema nunca subestima o risco em ambiguidade.

**Valores inválidos** (`null`, strings, floats, out-of-range) são silenciosamente ignorados via `coerceMotorErcToHfaCategory`.

---

## 3. Implementação

### Arquivo criado

`frontend/src/lib/sera/erc-modal.ts` — função pura, sem React, Supabase ou browser API.

### Alterações em `org/intelligence`

1. Query `analyses`: adicionado `erc_level` ao select
2. Import: `calculateModalHfaErcCategory` de `@/lib/sera/erc-modal`
3. Response: `modal_erc_level: calculateModalHfaErcCategory(analyses.map(a => a.erc_level))`

---

## 4. O que NÃO foi alterado

- Motor (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Banco (`analyses.erc_level` permanece na escala legacy)
- UI (nenhum componente React modificado)
- Fixtures, baseline ou checker

---

## 5. Como Testar

```bash
npx tsx tests/sera/test-erc-modal.ts
npx tsx tests/sera/test-erc-conversion.ts
cd frontend && npx tsc --noEmit
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
```

Resultado esperado: todos os testes passam, 0 erros de tipo, checker 10/10 OK.

---

## 6. Próxima Fase: RISK v0.8-C

Inversão do motor (`inferErcLevel` em `pipeline.ts` e `inferDeterministicErcLevel` em `all-steps.ts`) para alinhar a escala com a Opção A. Requer fixtures ERC 1–5 e baseline pré-inversão.

---

## 7. Referências

| Documento | Conteúdo relevante |
|---|---|
| `RISK_ERC_CONVERSION_v0.8-A.md` | Função de conversão (pré-requisito) |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | Plano técnico, fase v0.8-B |
| `frontend/src/lib/sera/erc-modal.ts` | Função modal |
| `frontend/src/lib/sera/erc-conversion.ts` | Conversão legacy→HFA |
| `tests/sera/test-erc-modal.ts` | Testes unitários |
