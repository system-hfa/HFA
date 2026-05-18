# RISK ERC API→UI Contract — v0.8-D
**Versão:** v0.8-D  
**Data:** 2026-05-18  
**Fase:** RISK v0.8-D  
**Status:** Entregue — testes de contrato criados, motor e banco intocados.

---

RISK v0.8-D adds regression tests for the ERC visual scale contract across API and UI boundaries.

The purpose is to ensure that `analyses.erc_level` remains treated as legacy motor scale, that `modal_erc_level` is HFA ERC Category, and that risk-profile presentation converts HFA category into the ARMS-style barrier column before visual display.

This phase does not invert the motor and does not migrate persisted data. It protects the boundary-conversion strategy introduced in v0.8-A, v0.8-B and v0.8-C.

---

## 1. Objetivo

Proteger por testes o contrato do fluxo API→UI da escala ERC visual:

```
analyses.erc_level (legacy motor)
→ coerceMotorErcToHfaCategory / motorErcToHfaCategory
→ calculateModalHfaErcCategory  (= modal_erc_level na API)
→ hfaErcToArmsBarrier
→ coluna barrier visual na matriz ARMS-ERC do risk-profile
```

Impedir que alterações futuras reintroduzam a inversão de escala que existia antes de v0.8-A/B/C.

---

## 2. Decisão vigente

| Dado | Escala | Origem |
|---|---|---|
| `analyses.erc_level` | Legacy motor (1=crítico, 5=mínimo) | Motor SERA |
| `modal_erc_level` (API) | HFA ERC Category (5=crítico, 1=aceitável) | Calculado em `org/intelligence` |
| Coluna barrier ARMS | 1–4 (1=sem barreiras, 4=barreiras fortes) | Calculado em `risk-profile` |

`analyses.erc_level` **permanece** legacy motor scale. A conversão ocorre nas bordas de consumo.

---

## 3. Contratos protegidos

### 3.1 Conversão individual

| Entrada (legacy) | Saída esperada (HFA) | Semântica |
|---:|---:|---|
| motor 1 | HFA 5 | Crítico nunca vira visual baixo |
| motor 5 | HFA 1 | Baixo nunca vira visual crítico |
| motor 3 | HFA 3 | Simétrico |

### 3.2 Round-trip auto-inverso

Para qualquer valor em {1,2,3,4,5}:
- `hfaCategoryToMotorErc(motorErcToHfaCategory(n)) === n`
- `motorErcToHfaCategory(hfaCategoryToMotorErc(n)) === n`

### 3.3 Modal da API — usa HFA

| Entrada legacy (array) | `modal_erc_level` esperado |
|---|---:|
| `[1]` | 5 |
| `[5]` | 1 |
| `[1,1,5]` | 5 (maioria) |
| `[5,5,1]` | 1 (maioria) |
| `[1,5]` | 5 (empate conservador) |

### 3.4 Inválidos ignorados

- `null`, `undefined`, strings, floats, NaN, fora de {1..5} → `null`
- Array de apenas inválidos → `null`

### 3.5 HFA → ARMS barrier visual

| HFA ERC Category | Coluna barrier ARMS |
|---:|---:|
| 5 (crítico) | 1 (sem barreiras) |
| 4 | 2 |
| 3 | 3 |
| 2 | 4 |
| 1 (aceitável) | 4 (capped) |

### 3.6 Fluxo integrado API→UI

| Legacy (DB) | HFA modal | Barrier visual |
|---:|---:|---:|
| `[1]` | 5 | 1 (mais perigoso) |
| `[5]` | 1 | 4 (menos perigoso) |
| `[3]` | 3 | 3 (simétrico) |
| `[1,5]` empate | 5 | 1 (conservador) |

---

## 4. O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Banco de dados / schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- UI (`risk-profile/page.tsx`, `events/page.tsx`, `events/[id]/page.tsx`)
- API routes (`org/intelligence/route.ts`)
- Lógica P/O/A
- ARMS Risk Index canônico (1–2500) — não implementado
- SIRA — não implementado

---

## 5. Como rodar

```bash
# Teste de contrato API→UI (esta fase)
npx tsx tests/sera/test-erc-api-ui-contract.ts

# Testes unitários das fases anteriores
npx tsx tests/sera/test-erc-conversion.ts
npx tsx tests/sera/test-erc-modal.ts
npx tsx tests/sera/test-erc-presentation.ts

# Typecheck
cd frontend && npx tsc --noEmit && cd ..

# Risk contract checker
npx tsx tests/sera/analyze-risk-validation-contract.ts
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
```

---

## 6. Arquivos

| Arquivo | Tipo | Fase |
|---|---|---|
| `frontend/src/lib/sera/erc-conversion.ts` | Helper puro | v0.8-A |
| `frontend/src/lib/sera/erc-modal.ts` | Helper puro | v0.8-B |
| `frontend/src/lib/sera/erc-presentation.ts` | Helper puro | v0.8-C |
| `tests/sera/test-erc-conversion.ts` | Testes unitários | v0.8-A |
| `tests/sera/test-erc-modal.ts` | Testes unitários | v0.8-B |
| `tests/sera/test-erc-presentation.ts` | Testes unitários | v0.8-C |
| `tests/sera/test-erc-api-ui-contract.ts` | **Testes de contrato** | **v0.8-D** |

---

## 7. Próxima fase recomendada

**RISK v0.9-A — Auditoria metodológica do Risk Profile Organizacional**

Objetivo:
- Revisar se o score organizacional está metodologicamente correto
- Separar evento individual, Safety Issue e tendência organizacional
- Evitar médias ou agregações frágeis de categorias ordinais
- Alinhar risk profile com a tese do produto: "diagnóstico de fator humano organizacional"

---

## 8. Referências

| Documento | Relevância |
|---|---|
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Opção A — escala crescente |
| `RISK_ERC_CONVERSION_v0.8-A.md` | Função de conversão legacy → HFA |
| `RISK_ERC_MODAL_v0.8-B.md` | `modal_erc_level` calculado |
| `RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md` | Auditoria de bordas visuais |
| `tests/sera/test-erc-api-ui-contract.ts` | Testes de contrato desta fase |
