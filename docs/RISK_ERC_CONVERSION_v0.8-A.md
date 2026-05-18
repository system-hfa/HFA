# ERC Conversion Utility — RISK v0.8-A
**Versão:** v0.8-A  
**Data:** 2026-05-17  
**Fase:** RISK v0.8-A  
**Commit:** (ver git log)  
**Status:** Entregue — função criada, testada, documentada. Nenhum código de motor/UI/banco alterado.

---

## 1. Propósito

O sistema HFA/SERA mantém duas escalas ERC incompatíveis:

| Escala | Onde existe | ERC 1 | ERC 5 |
|---|---|---|---|
| `legacy_motor_erc_level` | `analyses.erc_level` (DB), `pipeline.ts`, `all-steps.ts` | Crítico/perigo | Mínimo/administrativo |
| `hfa_erc_category` | UI (`events/[id]`, `events/`, `risk-profile`) | Aceitável | Crítico/ação imediata |

Esta incompatibilidade (F-001) foi documentada em `RISK_IMPLEMENTATION_AUDIT_v0.5.md` e a decisão formal (Opção A) foi registrada em `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6`.

O arquivo `frontend/src/lib/sera/erc-conversion.ts` implementa a conversão segura entre as duas escalas. É o pré-requisito técnico para conectar `modal_erc_level` (F-002) em RISK v0.8-B.

---

## 2. Mapeamento

```
motor ERC 1  →  HFA category 5  (crítico)
motor ERC 2  →  HFA category 4  (alto)
motor ERC 3  →  HFA category 3  (moderado — simétrico)
motor ERC 4  →  HFA category 2  (baixo)
motor ERC 5  →  HFA category 1  (aceitável)
```

A função é **auto-inversa**: aplicá-la duas vezes retorna o valor original.

---

## 3. API Exportada

```typescript
// Tipos
export type LegacyMotorErcLevel = 1 | 2 | 3 | 4 | 5
export type HfaErcCategory      = 1 | 2 | 3 | 4 | 5

// Conversão principal
export function motorErcToHfaCategory(level: LegacyMotorErcLevel): HfaErcCategory

// Conversão inversa (idêntica — auto-inversa)
export function hfaCategoryToMotorErc(category: HfaErcCategory): LegacyMotorErcLevel

// Type guards
export function isLegacyMotorErcLevel(value: unknown): value is LegacyMotorErcLevel
export function isHfaErcCategory(value: unknown): value is HfaErcCategory

// Coerção segura (para inputs não confiáveis)
export function coerceMotorErcToHfaCategory(value: unknown): HfaErcCategory | null
```

---

## 4. O que a Função NÃO Faz

- **Não altera o motor** (`pipeline.ts`, `all-steps.ts`, `levels.json`).
- **Não lê nem escreve no banco** (`analyses.erc_level` permanece como está).
- **Não altera a UI** (nenhum componente React foi modificado).
- **Não implementa o ARMS Risk Index canônico** (1–2500). Isso é trabalho futuro, fora do escopo.
- **Não implementa SIRA** (Safety Issue Risk Assessment).
- **Não altera fixtures nem baseline**.
- **Não conecta `modal_erc_level`** — isso é RISK v0.8-B.

---

## 5. Como Testar

```bash
# Executar testes unitários
npx tsx tests/sera/test-erc-conversion.ts

# Typecheck
cd frontend && npx tsc --noEmit

# Risk contract checker
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
```

Resultado esperado:
- Teste unitário: todos os casos passam, exit 0
- Typecheck: 0 erros
- Checker: 10/10 OK, WARN 0, FAIL 0

---

## 6. Próxima Fase: RISK v0.8-B

`motorErcToHfaCategory()` é o pré-requisito para conectar `modal_erc_level` na API `org/intelligence`:

```typescript
// frontend/src/app/api/org/intelligence/route.ts
import { coerceMotorErcToHfaCategory } from '@/lib/sera/erc-conversion'

// Em vez de:
modal_erc_level: null,

// Usar:
modal_erc_level: coerceMotorErcToHfaCategory(modalMotorErc),
```

Isso resolve F-002 sem alterar o motor nem exigir migration de banco.

---

## 7. Referências

| Documento | Conteúdo relevante |
|---|---|
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Decisão formal Opção A |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | Plano técnico completo, descrição da Estratégia C |
| `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6` | Decisão registrada por Filipe Daumas (2026-05-17) |
| `RISK_IMPLEMENTATION_AUDIT_v0.5.md §4.1` | F-001 como implementação pendente |
| `frontend/src/lib/sera/erc-conversion.ts` | Arquivo da função |
| `tests/sera/test-erc-conversion.ts` | Testes unitários |
