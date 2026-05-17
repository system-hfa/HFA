# Decisão: Modelo Dual de Matrizes — HFA/SERA
**Versão:** v0.2  
**Data:** 2026-05-17  
**Autor:** Revisão técnica Claude (solicitada por Filipe Daumas)  
**Status:** Proposta — aguardando aprovação do autor do método  
**Relacionado a:** `RISK_ERC_SCIENTIFIC_REVIEW_v0.2.md`, `RISK_VALIDATION_PLAN_v0.2.md`, `RISK_METHODOLOGY_GOVERNANCE_v0.1.md`

---

## 1. Objetivo

Este documento define:

1. O papel de cada matriz no HFA/SERA e como distingui-las na UI
2. O que cada matriz pode e não pode afirmar
3. A recomendação técnica para resolução do F-001 (escala ERC canônica)
4. Quais componentes precisam mudar e quais estão corretos

Este documento **não autoriza mudanças de código**. A autorização formal cabe ao autor do método (seção 7.6 de `RISK_METHODOLOGY_GOVERNANCE_v0.1.md`).

---

## 2. As Duas Matrizes no HFA/SERA

O HFA/SERA usa dois instrumentos de avaliação de risco distintos, para propósitos distintos:

| Característica | Matriz ERC (evento individual) | Matriz ISO/ICAO (perfil organizacional) |
|---|---|---|
| **Tela** | `/events/[id]` | `/risk-profile` |
| **Objeto** | Um evento específico | A organização como um todo |
| **Dimensões** | Desfecho potencial × efetividade de barreira | Severidade ISO × nível de barreira heurístico |
| **Lookup** | `EV_ARMS_ERC` (sevRow × barrier) | `ARMS_ERC` (sevRow × barrierLevel(score 0–100)) |
| **Output** | ERC 1–5 + cor + label de urgência | Zona de risco (Inaceitável / Elevado / Tolerável / Aceitável) |
| **Referência metodológica** | ARMS ERC (ARMS WG 2010) | ISO 31000:2018 + ICAO Doc 9859 |
| **Análogo ARMS padrão** | ERC | SIRA (aproximação conceitual) |
| **Calculado em** | Client-side, `computeEventRisk()` | Client-side, `risk-profile/page.tsx` |
| **Armazenado no banco?** | Sim (`analyses.erc_level` — motor, não UI) | Não (calculado on-the-fly) |

**Princípio de separação obrigatório**: estas duas matrizes devem ser apresentadas como instrumentos distintos na UI. Misturar seus outputs ou usar o resultado de um como input do outro sem conversão explícita é um erro metodológico.

---

## 3. Matriz ERC: Evento Individual

### 3.1 Função

Triagem imediata de cada relato de segurança. Responde: *"Quão preocupante foi este evento — quão perto chegou de uma consequência grave?"*

O resultado orienta a urgência da resposta: investigação imediata, encaminhamento prioritário, ou incorporação à base estatística para análise futura.

### 3.2 O que pode afirmar

- "Este evento, no dia em que ocorreu, tinha potencial para [desfecho]"
- "Com as barreiras remanescentes naquele momento, a proteção era [alta / limitada / mínima / inexistente]"
- "A urgência de investigar este evento é [imediata / elevada / normal]"
- "O risco relativo deste evento comparado a outros na base de dados é [maior / menor]"
- (Agregado) "O risco acumulado de eventos em [período / aeroporto / tipo] foi [X]"

### 3.3 O que NÃO pode afirmar

- "A probabilidade de que este tipo de evento ocorra novamente é X%" — ERC não avalia recorrência
- "A organização tem risco elevado de acidente catastrófico" — isso é resultado da análise de padrões (SIRA / ISO)
- "Este evento causou risco ERC 5 à organização como um todo" — o ERC é do evento, não da organização
- "O risco da organização aumentou este mês" — ERC individual não é indicador de tendência (séries de ERCs podem ser, mas com análise adicional)

### 3.4 Linguagem recomendada na UI

| ERC | Cor | Label atual | Label recomendado (se diferente) |
|---|---|---|---|
| 5 | Vermelho | "Ação imediata obrigatória" | ✅ Adequado |
| 4 | Laranja | — | "Risco elevado — investigação prioritária" |
| 3 | Amarelo | — | "Risco moderado — avaliar com mais detalhes" |
| 2 | Verde-claro | — | "Risco baixo — incorporar ao monitoramento" |
| 1 | Verde | "Aceitável" | ✅ Adequado |

**Tooltip recomendado** (ausente hoje): *"Classificação baseada no potencial de desfecho deste evento específico — não representa a probabilidade de recorrência."*

---

## 4. Matriz ISO/ICAO: Perfil Organizacional

### 4.1 Função

Indicador de saúde de segurança da organização, baseado nos padrões de severidade dos eventos registrados e na capacidade de resposta organizacional (score 0–100 da API `org/intelligence`).

### 4.2 O que pode afirmar

- "Os eventos desta organização, em seu conjunto, apontam para um perfil de severidade [X]"
- "A capacidade de resposta organizacional estimada sugere nível de proteção [Y]"
- "O perfil de risco organizacional está na zona [Inaceitável / Elevado / Tolerável / Aceitável]"
- "Comparado ao período anterior, o perfil de risco [melhorou / piorou / está estável]"

### 4.3 O que NÃO pode afirmar

- "Cada evento individualmente tem risco nesta zona" — o perfil é agregado, não por evento
- "A efetividade de barreira para este evento específico é X%" — a barreira no perfil org é estimativa heurística
- "A organização tem probabilidade X de sofrer um acidente catastrófico" — isso requer SIRA estruturado com dados de frequência
- "O código P-B indica que a barreira específica foi [descrição]" — a dimensão de barreira aqui é do score org, não da análise ARMS por evento
- "O perfil de risco está completo e representa a realidade da organização" — com amostra pequena de eventos (ex: < 10 análises), o perfil é um indicador em formação, não uma fotografia consolidada

### 4.4 Linguagem recomendada na UI

| Zona | Linguagem atual | Linguagem recomendada |
|---|---|---|
| Inaceitável | "Inaceitável" | "Perfil de risco crítico — revisão gerencial urgente" |
| Elevado | "Elevado" | "Perfil de risco elevado — atenção requerida" |
| Tolerável | "Tolerável" | "Perfil de risco tolerável — monitorar tendência" |
| Aceitável | "Aceitável" | "Perfil de risco dentro do nível tolerado" |
| Score 0–100 | "Score organizacional" | "Índice de saúde de segurança — quanto maior o valor, maior a atenção requerida" |

**Tooltip recomendado** (ausente hoje): *"Estimativa baseada nos padrões de eventos e nos indicadores de resposta da organização. Não substitui avaliação formal de Safety Issue."*

---

## 5. Arquitetura Conceitual Recomendada

```
RELATO DE EVENTO
       │
       ▼
ERC (classificação imediata)
 ├─ output: urgência de resposta (ERC 1–5, cor)
 └─ output: índice numérico para estatística
       │
       ▼
ANÁLISE SERA (PIPELINE)
 ├─ precondições (P/O/A codes)
 ├─ erc_level → analyses.erc_level (banco)
 └─ recomendações
       │
       ▼
BANCO DE DADOS (analyses, corrective_actions)
       │
       ▼
ANÁLISE AGREGADA (org/intelligence API)
 ├─ distribuição de P/O/A codes
 ├─ padrões → Safety Issues potenciais
 └─ score organizacional 0–100
       │
       ▼
PERFIL ORGANIZACIONAL (ISO/ICAO matrix)
 └─ output: zona de risco (Inaceitável→Aceitável)
```

**Invariante**: ERC e Perfil Organizacional são instrumentos diferentes. O output de um nunca é input direto do outro sem conversão e justificativa explícita.

---

## 6. Recomendação para a Escala ERC Canônica (F-001)

### 6.1 Estado atual do problema

Existem hoje duas escalas incompatíveis no sistema:

| Componente | Escala | ERC 1 significa | ERC 5 significa |
|---|---|---|---|
| Motor: `inferErcLevel()`, `levels.json` | Motor | Risco imediato, crítico (MAIS PERIGOSO) | Risco mínimo (MAIS SEGURO) |
| UI: `EV_ARMS_ERC`, `ERC_STYLE`, `ercLabels` | UI | Aceitável (MAIS SEGURO) | Ação imediata obrigatória (MAIS PERIGOSO) |

O campo `analyses.erc_level` (gerado pelo motor) **nunca é exibido na UI** — `computeEventRisk()` recalcula independentemente. A inconsistência não causa erro visual hoje, mas impede qualquer conexão futura entre motor e UI.

### 6.2 Avaliação das opções

**Opção A — ERC 5 = perigo (adotar escala da UI como canônica)**

- **Prós**:
  - Alinhado com o índice ARMS: no padrão, 1 = menor risco ("sem acidente") e 2500 = maior risco. "Número maior = maior risco" é intrínseco ao design ARMS.
  - UI já correta — `ERC_STYLE[5]` = vermelho, `ercLabels[5]` = "Ação imediata obrigatória"
  - Lookup tables `EV_ARMS_ERC` e `ARMS_ERC` já usam Opção A — sem mudanças necessárias nelas
  - Intuitivo para o usuário: número maior = risco maior

- **Contras**:
  - Motor precisa ser invertido (`inferErcLevel`, `inferDeterministicErcLevel`)
  - `levels.json` precisa ser reescrito
  - Dados históricos em `analyses.erc_level` têm semântica invertida — necessita política de migração

**Opção B — ERC 1 = perigo (adotar escala do motor como canônica)**

- **Prós**:
  - `levels.json` já usa esta convenção ("ERC 1 = Risco imediato, crítico")

- **Contras**:
  - Contraintuitivo: número menor = mais perigoso
  - **Não alinhado com o padrão ARMS**: no índice ARMS, 1 é o MENOR risco (célula "sem acidente") — ERC 1 = perigo seria semanticamente oposto ao padrão
  - UI inteira precisa ser invertida (`ERC_STYLE`, `ercLabels`, `EV_ARMS_ERC`, `ARMS_ERC`)
  - A lookup table (hoje `A1=5`) precisaria virar `A1=1` — mais confusa de ler

### 6.3 Recomendação: Opção A (ERC 5 = perigo)

**Justificativa técnica**: No índice de risco ERC padrão ARMS, o valor 1 representa o evento de menor risco ("sem potencial de acidente") e o valor 2500 representa o maior risco ("catástrofe sem barreiras"). A escala cresce na direção do perigo. A Opção A (ERC 5=perigo) está alinhada com esta direção.

**Justificativa prática**: A maior parte do código que precisa ser alterada está no motor (poucas funções com lógica simples de inversão). A UI — onde o impacto em usuários é direto — já está correta e não precisa ser modificada.

Esta recomendação é técnica. A decisão formal cabe ao autor do método, com registro em `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` seção 7.6.

---

## 7. O que Precisa Mudar (por Componente)

### 7.1 Componentes que requerem mudança (para Opção A)

| Arquivo | O que mudar | Tipo de mudança |
|---|---|---|
| `frontend/src/lib/sera/rules/erc/levels.json` | Inverter descrições: nível 1 = "sem potencial de acidente / ERC mínimo", nível 5 = "risco catastrófico / ERC máximo" | Redefinição semântica |
| `frontend/src/lib/sera/pipeline.ts` — `inferErcLevel()` | Inverter todos os `return N`: 1↔5, 2↔4 (3 mantém) | Inversão de lógica |
| `frontend/src/lib/sera/all-steps.ts` — `inferDeterministicErcLevel()` | Inverter todos os `return N`: mesma lógica | Inversão de lógica |
| `analyses.erc_level` (banco de dados) | **Política de migração requerida**: recalcular, marcar como `legacy_erc_level`, ou manter como está com documentação | Decisão de dados |

### 7.2 Componentes que NÃO precisam mudar (já corretos com Opção A)

| Arquivo / Componente | Por que está correto |
|---|---|
| `events/[id]/page.tsx` — `EV_ARMS_ERC` | `A1=5` (catastrófico × sem barreiras = ERC 5) ✅ |
| `events/[id]/page.tsx` — `ERC_STYLE` | `ERC_STYLE[5]` = vermelho, `ERC_STYLE[1]` = verde ✅ |
| `events/[id]/page.tsx` — `ercLabels` | ERC 5 = "Ação imediata obrigatória", ERC 1 = "Aceitável" ✅ |
| `risk-profile/page.tsx` — `ARMS_ERC` | Mesma lookup table, mesma direção ✅ |
| `risk-profile/page.tsx` — `SEVERITY_MAP` | Mapeamento P codes → severidade ISO — não afetado pelo F-001 |
| `computeEventRisk()` (client-side) | Recalcula ERC sem ler `analyses.erc_level` — já usa Opção A ✅ |
| `risk-profile/page.tsx` — `barrierLevel()` | Heurística de barreira por score org — não afetada pelo F-001 |

### 7.3 Componente condicional: `modal_erc_level` (F-002)

Atualmente hardcoded como `null` na API `org/intelligence`. Só deve ser conectado a `analyses.erc_level` **após** a resolução do F-001 e da política de migração de dados. Conectar antes produziria inversão: um evento ERC motor=1 (= perigo no motor) seria exibido como "ERC 1 = Aceitável" na UI.

---

## 8. Sequência de Implementação Recomendada

1. **Decisão formal**: autor do método preenche `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` seção 7.6
2. **Fixtures**: criar os 10 casos mínimos do `RISK_VALIDATION_PLAN_v0.2.md`
3. **Validação pré-implementação**: rodar fixtures com motor atual para documentar estado antes da mudança
4. **Inversão do motor**: alterar `inferErcLevel()`, `inferDeterministicErcLevel()`, `levels.json`
5. **Validação pós-implementação**: rodar fixtures com motor invertido — confirmar concordância motor × UI
6. **Política de migração**: decidir e executar política para `analyses.erc_level` histórico
7. **Conectar F-002**: substituir `modal_erc_level: null` por dado real
8. **Deploy**: somente após todos os fixtures passarem e migração executada

---

## 9. O que NÃO precisa mudar

- A arquitetura dual (ERC individual + ISO/ICAO organizacional) — conceitualmente correta
- A UI de exibição do ERC por evento — já correta com Opção A
- As lookup tables `EV_ARMS_ERC` e `ARMS_ERC` — já corretas com Opção A
- O cálculo `computeEventRisk()` client-side — já correto
- A distinção entre tela de evento e tela de perfil organizacional — já correta
- A `SEVERITY_MAP` para ISO 31000 — questão separada (F-006/F-007), não afetada pelo F-001
