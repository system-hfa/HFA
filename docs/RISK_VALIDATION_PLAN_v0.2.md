# Plano de Validação — Matrizes de Risco HFA/SERA
**Versão:** v0.2  
**Data:** 2026-05-17  
**Autor:** Revisão técnica Claude (solicitada por Filipe Daumas)  
**Status:** Proposta — aguardando aprovação do autor do método  
**Dependência**: Executar após decisão formal sobre escala ERC canônica (`RISK_METHODOLOGY_GOVERNANCE_v0.1.md` seção 7.6)

---

## 1. Objetivo

Definir o conjunto mínimo de fixtures e critérios de aceitação necessários para:

1. Validar que a escala ERC canônica está implementada corretamente após resolução do F-001
2. Garantir que eventos de alto risco sempre recebem classificação de alta urgência (anti-regressão)
3. Habilitar deploy seguro de funcionalidades ERC para novos usuários

---

## 2. Tipos de Fixture

### Tipo A — ERC por evento (classificação individual)
Testam que a lookup table e `computeEventRisk()` produzem o nível ERC correto para uma célula (sevRow, barrierColumn).

- **Input**: sevRow (A/B/C/D) × barrierColumn (1–4)
- **Expected**: ERC nível N (1–5) + cor + label

### Tipo B — ERC via motor (inferência de pipeline)
Testam que `inferErcLevel()` e `inferDeterministicErcLevel()` retornam o nível correto para um relato textual com códigos SERA.

- **Input**: texto de relato + P code + O code + A code
- **Expected**: ERC nível N (motor)

### Tipo C — Concordância motor × UI
Testam que o nível retornado pelo motor e o nível calculado pela UI concordam para os mesmos inputs.

- **Input**: relato textual → pipeline → `analyses.erc_level` × `computeEventRisk()`
- **Expected**: ambos retornam o mesmo ERC N

### Tipo D — Perfil organizacional (ISO/ICAO)
Testam que a combinação sevRow × barrierLevel produz a zona de risco correta.

- **Input**: sevRow + score org 0–100 → barrierLevel → zona
- **Expected**: "Inaceitável" / "Elevado" / "Tolerável" / "Aceitável"

---

## 3. Tabela de Referência: Células ARMS × ERC HFA

Após adoção da Opção A (ERC 5 = perigo), o mapeamento esperado entre a matriz ARMS padrão e a escala HFA 1–5 é:

| Célula ARMS | Desfecho (Q1) | Barreira (Q2) | Índice ARMS | Cor ARMS | HFA `EV_ARMS_ERC` | ERC HFA esperado |
|---|---|---|---|---|---|---|
| A1 | Catastrófico | Não efetiva | 2500 | 🔴 RED | `A1` | **5** |
| A2 | Catastrófico | Mínima | 502 | 🔴 RED | `A2` | **5** |
| A3 | Catastrófico | Limitada | 102 | 🔴 RED | `A3` | **4** |
| A4 | Catastrófico | Efetiva | 50 | 🟡 YELLOW | `A4` | **3** |
| B1 | Maior | Não efetiva | 500 | 🔴 RED | `B1` | **4** |
| B2 | Maior | Mínima | 101 | 🔴 RED | `B2` | **4** |
| B3 | Maior | Limitada | 21 | 🟡 YELLOW | `B3` | **3** |
| B4 | Maior | Efetiva | 10 | 🟡 YELLOW | `B4` | **3** |
| C1 | Lesões/Danos | Não efetiva | 100 | 🟡 YELLOW | `C1` | **3** |
| C2 | Lesões/Danos | Mínima | 20 | 🟡 YELLOW | `C2` | **3** |
| C3 | Lesões/Danos | Limitada | 4 | 🟡 YELLOW | `C3` | **2** |
| C4 | Lesões/Danos | Efetiva | 2 | 🟢 GREEN | `C4` | **1** |
| D | Sem acidente | — | 1 | 🟢 GREEN | `D3`/`D4` | **1** |

**Nota sobre D1/D2 (desvio atual)**: Hoje `EV_ARMS_ERC['D1']=2` e `EV_ARMS_ERC['D2']=2`. Per ARMS padrão, a linha D inteira deveria ser ERC 1. Os fixtures ERC-11/12 cobrem este caso.

---

## 4. Casos Mínimos — 10 Fixtures Principais

### Fixture ERC-01: Conflito iminente sem barreiras (célula A1 — RED máximo)

**Tipo**: A + B + C  
**Célula ARMS**: A × 1 (Catastrófico × Não efetiva) → índice 2500, RED  
**Cenário**: Conflito de tráfego aéreo em fase crítica, sem nenhuma barreira funcional remanescente.

**Relato-tipo para motor**:
> "Conflito de separação vertical em rota de cruzeiro. Aeronave em rota de colisão detectada a menos de 500ft de separação. TCAS inoperante em ambas as aeronaves. Contato com ATC perdido há 8 minutos. Visibilidade zero (IMC). Crew alertado apenas por equipamento auxiliar degradado. Manobra de emergência executada."

**Inputs para lookup (Tipo A)**: `sevRow='A'`, `barrierColumn=1` (não efetiva)  
**Codes SERA (Tipo B)**: `perception='P-B'`, `objective='O-B'`, `action='A-I'`

**Expected outputs**:
- `EV_ARMS_ERC['A1']` = **5**
- `computeEventRisk().erc` = **5**
- Cor = **vermelho** (`bg-red-950` ou equivalente)
- Label = **"Ação imediata obrigatória"**
- Motor pós-inversão: `inferErcLevel(text, 'P-B', 'O-B', 'A-I')` = **5**

**Critério de aceitação**: BLOQUEANTE — falha aqui proíbe deploy.

---

### Fixture ERC-02: Quase-colisão com barreiras mínimas (célula A2 — RED)

**Tipo**: A + C  
**Célula ARMS**: A × 2 (Catastrófico × Mínima) → índice 502, RED  
**Cenário**: Quase-colisão aérea com apenas TCAS funcionando e radar ATC sem cobertura efetiva.

**Relato-tipo**:
> "TCAS RA durante aproximação ILS em aeroporto não-controlado. Aeronave VFR sem transponder Mode C detectada a 5NM. Separação recuperada com climbing RA. ATC sem radar efetivo para a área. Visual acquisition não confiável pela densidade de tráfego VFR."

**Inputs para lookup**: `sevRow='A'`, `barrierColumn=2` (mínima)

**Expected outputs**:
- `EV_ARMS_ERC['A2']` = **5**
- `computeEventRisk().erc` = **5**
- Cor = **vermelho**
- Label = **"Ação imediata obrigatória"**

**Critério de aceitação**: BLOQUEANTE.

---

### Fixture ERC-03: Catastrófico com barreiras limitadas (célula A3 — RED)

**Tipo**: A  
**Célula ARMS**: A × 3 (Catastrófico × Limitada) → índice 102, RED  
**Cenário**: Incursão de pista com potencial catastrófico, mas com algumas barreiras ativas (visibilidade parcial + aviso tardio de torre).

**Relato-tipo**:
> "Incursão de pista durante decolagem. Aeronave B entrou na pista ativa após autorização equivocada de terra. Tripulação da aeronave A avistou B a 600m e abortou. Torre alertou com 4s de antecedência. Visibilidade 1500m. Colisão evitada com margem mínima."

**Inputs para lookup**: `sevRow='A'`, `barrierColumn=3` (limitada)

**Expected outputs**:
- `EV_ARMS_ERC['A3']` = **4**
- `computeEventRisk().erc` = **4**
- Cor = **laranja** (ERC 4 = alta urgência mas não máxima)

**Critério de aceitação**: obrigatório (não bloqueante individual, mas parte do conjunto).

---

### Fixture ERC-04: Acidente maior sem barreiras (célula B1 — RED)

**Tipo**: A  
**Célula ARMS**: B × 1 (Maior × Não efetiva) → índice 500, RED  
**Cenário**: Acidente com potencial de 1–2 fatalidades, sem barreiras remanescentes.

**Relato-tipo**:
> "Colisão de alta velocidade durante taxi. Aeronave de manutenção cruzou pista ativa sem clearance. Tripulação não avistou. Ground radar inoperante. Dano severo em ambas as aeronaves. Dois ocupantes com lesões graves."

**Inputs para lookup**: `sevRow='B'`, `barrierColumn=1` (não efetiva)

**Expected outputs**:
- `EV_ARMS_ERC['B1']` = **4**
- `computeEventRisk().erc` = **4**
- Cor = **laranja / vermelho** (ERC 4)

---

### Fixture ERC-05: Catastrófico com barreiras efetivas (célula A4 — YELLOW)

**Tipo**: A  
**Célula ARMS**: A × 4 (Catastrófico × Efetiva) → índice 50, YELLOW  
**Cenário**: Potencial de colisão catastrófica, mas com barreiras efetivas que controlaram o evento.

**Relato-tipo**:
> "Loss of separation detectada a 20NM por radar ATC. TCAS com indicações válidas em ambas as aeronaves. ATC iniciou separação imediata. Tripulações executaram RA sem hesitação. Separação recuperada com 500ft de margem vertical. Protocolo funcionou conforme planejado."

**Inputs para lookup**: `sevRow='A'`, `barrierColumn=4` (efetiva)

**Expected outputs**:
- `EV_ARMS_ERC['A4']` = **3**
- `computeEventRisk().erc` = **3**
- Cor = **amarelo**
- Label = "Risco moderado — avaliar com mais detalhes"

**Critério de aceitação**: BLOQUEANTE — confirma que evento com barreiras efetivas não recebe urgência máxima.

---

### Fixture ERC-06: Lesões menores sem barreiras (célula C1 — YELLOW)

**Tipo**: A  
**Célula ARMS**: C × 1 (Lesões/Danos × Não efetiva) → índice 100, YELLOW  
**Cenário**: Turbulência com lesão a passageiro, sem nenhuma barreira (avisos ausentes, passageiros não cinturados).

**Relato-tipo**:
> "Turbulência severa não prevista em cruzeiro. Passageiro sem cinto em corredor projetado contra teto. Fratura de clavícula. Nenhum aviso meteorológico disponível. Sinal de cinto não estava ativado. Sem orientação de segurança para esse trecho."

**Inputs para lookup**: `sevRow='C'`, `barrierColumn=1` (não efetiva)

**Expected outputs**:
- `EV_ARMS_ERC['C1']` = **3**
- `computeEventRisk().erc` = **3**
- Cor = **amarelo**

---

### Fixture ERC-07: Falha técnica pós-pouso sem impacto de segurança (célula C4 — GREEN)

**Tipo**: A + B  
**Célula ARMS**: C × 4 (Lesões/Danos × Efetiva) → índice 2, GREEN  
**Cenário**: Falha técnica após aterrissagem segura. Barreiras efetivas, sem risco residual.

**Relato-tipo**:
> "Recolhimento de flaps travou após aterrissagem em chuva moderada. Mensagem ECAM 'FCTL FLAPS LOCKED'. Aeronave estacionou normalmente via tração própria. Manutenção acionada. Sem impacto em segurança de voo ou passageiros. Falha ocorrida após conclusão do pouso."

**Inputs para lookup**: `sevRow='C'`, `barrierColumn=4` (efetiva)  
**Codes SERA (Tipo B)**: `action='A-A'` (ação administrativa / manutenção de rotina, sem impacto operacional)

**Expected outputs**:
- `EV_ARMS_ERC['C4']` = **1**
- `computeEventRisk().erc` = **1**
- Cor = **verde**
- Label = **"Aceitável"**
- Motor pós-inversão: `inferDeterministicErcLevel(text, ..., 'A-A')` = **1**

**Critério de aceitação**: BLOQUEANTE — confirma que eventos sem risco real não recebem urgência alta.

---

### Fixture ERC-08: Ocorrência administrativa sem potencial de acidente (célula D — GREEN)

**Tipo**: A + B  
**Célula ARMS**: D (Sem acidente) → índice 1, GREEN  
**Cenário**: Ocorrência operacional sem nenhum impacto de segurança de voo.

**Relato-tipo**:
> "Atraso de 45 minutos por indisponibilidade de gate no aeroporto destino. Passageiros permaneceram a bordo da aeronave estacionada com motores desligados. Sem intercorrências de segurança. Abastecimento complementar realizado. Evento registrado para fins estatísticos."

**Inputs para lookup**: `sevRow='D'`, `barrierColumn=3` ou `4`  
**Codes SERA (Tipo B)**: percepção administrativa, objetivo/ação sem impacto operacional

**Expected outputs**:
- `EV_ARMS_ERC['D3']` ou `EV_ARMS_ERC['D4']` = **1**
- `computeEventRisk().erc` = **1**
- Cor = **verde**
- Label = **"Aceitável"**

**Critério de aceitação**: BLOQUEANTE.

---

### Fixture ERC-09: Acidente maior com barreiras limitadas (célula B3 — YELLOW)

**Tipo**: A  
**Célula ARMS**: B × 3 (Maior × Limitada) → índice 21, YELLOW  
**Cenário**: Aproximação instabilizada com potencial de acidente maior, barreiras parcialmente presentes.

**Relato-tipo**:
> "Aproximação instabilizada detectada abaixo de 1000ft. Tripulação não executou go-around conforme procedimento. Aterrissagem com bouncing e toque duro. Aeronave intacta após inspeção. Passageiros sem lesões. Copiloto verbalizou dúvida sobre continuar; capitão recusou go-around."

**Inputs para lookup**: `sevRow='B'`, `barrierColumn=3` (limitada)

**Expected outputs**:
- `EV_ARMS_ERC['B3']` = **3**
- `computeEventRisk().erc` = **3**
- Cor = **amarelo**

---

### Fixture ERC-10: Lesões com barreiras limitadas (célula C3 — YELLOW/GREEN border)

**Tipo**: A  
**Célula ARMS**: C × 3 (Lesões/Danos × Limitada) → índice 4, YELLOW  
**Cenário**: Turbulência com potencial de lesões menores, barreiras limitadas mas presentes.

**Relato-tipo**:
> "Turbulência moderada em descida. Sinal de cinto ativado 3 minutos antes. Um passageiro ainda em pé na cabine levou queda e contusão leve. Passageiros orientados previamente. Piloto tinha aviso meteorológico parcial para a área."

**Inputs para lookup**: `sevRow='C'`, `barrierColumn=3` (limitada)

**Expected outputs**:
- `EV_ARMS_ERC['C3']` = **2**
- `computeEventRisk().erc` = **2**
- Cor = **verde-claro** (ERC 2 = baixo, monitorar)

---

## 5. Fixtures Adicionais: Desvio da Linha D (Tipo A — integridade da lookup table)

Estes dois fixtures cobrem o desvio do HFA em relação ao padrão ARMS (linha D dividida em colunas):

### Fixture ERC-11: Célula D1 — desvio atual vs esperado ARMS

**Inputs**: `sevRow='D'`, `barrierColumn=1`  
**Hoje**: `EV_ARMS_ERC['D1']` = **2** ⚠️ (desvio — ARMS padrão retornaria 1)  
**Esperado per ARMS**: **1**  
**Decisão pendente**: manter D1=2 (adaptação intencional documentada) ou corrigir para D1=1

### Fixture ERC-12: Célula D2 — desvio atual vs esperado ARMS

**Inputs**: `sevRow='D'`, `barrierColumn=2`  
**Hoje**: `EV_ARMS_ERC['D2']` = **2** ⚠️  
**Esperado per ARMS**: **1**  
**Decisão pendente**: mesma lógica do ERC-11

---

## 6. Critérios de Aceitação

### 6.1 Critérios BLOQUEANTES (proíbem deploy se falharem)

- [ ] **ERC-01**: `computeEventRisk()` retorna ERC 5 para célula A1
- [ ] **ERC-02**: `computeEventRisk()` retorna ERC 5 para célula A2
- [ ] **ERC-05**: `computeEventRisk()` retorna ERC 3 para célula A4 (não ERC 4 ou 5 — barreira efetiva conta)
- [ ] **ERC-07**: `computeEventRisk()` retorna ERC 1 para célula C4
- [ ] **ERC-08**: `computeEventRisk()` retorna ERC 1 para célula D
- [ ] **Motor pós-inversão**: `inferErcLevel(text, 'P-B', 'O-B', 'A-I')` retorna **5** (não 1)
- [ ] **Motor pós-inversão**: relato administrativo retorna **1** (não 5)
- [ ] **Concordância**: para todos os fixtures com Tipo C, motor e UI retornam o mesmo ERC N

### 6.2 Critérios obrigatórios pré-expansão (não bloqueam deploy inicial, mas devem ser resolvidos antes de expor a novos clientes)

- [ ] Todos os 10 fixtures principais passam
- [ ] Cobertura de todas as 5 cores: pelo menos 1 fixture vermelho (ERC 5), 1 laranja (ERC 4), 1 amarelo (ERC 3), 1 verde-claro (ERC 2), 1 verde (ERC 1)
- [ ] Política para ERC-11 e ERC-12 (D1/D2) decidida e documentada
- [ ] `modal_erc_level` (F-002) conectado a dado real e validado com pelo menos 2 fixtures (1 alto, 1 baixo)

### 6.3 Cobertura mínima de tipos de fixture

| Tipo | Mínimo exigido | Motivo |
|---|---|---|
| Tipo A (lookup) | Todas as 13 células | Integridade da tabela — automatizável |
| Tipo B (motor) | 5 casos (ERC 1, 2, 3, 4, 5) | Verificar inversão do motor |
| Tipo C (concordância) | 5 casos (1 por ERC nível) | Detectar divergência futura motor × UI |
| Tipo D (perfil org) | 3 casos (Inaceitável, Tolerável, Aceitável) | Integridade do perfil organizacional |

---

## 7. Caso de Teste de Regressão para F-001

Este é o teste mais crítico — detecta se a inversão do motor foi implementada corretamente ou se foi revertida acidentalmente:

```typescript
// REGRESSÃO F-001: Motor e UI devem concordar após Opção A
describe('Regressão F-001 — Inversão de escala ERC', () => {
  it('Relato catastrófico sem barreiras → ERC 5 em ambos', () => {
    const motorResult = inferErcLevel(RELATO_CONFLITO_IMINENTE, 'P-B', 'O-B', 'A-I')
    const uiResult = EV_ARMS_ERC['A1']
    expect(motorResult).toBe(5)  // FALHA antes da inversão (retorna 1)
    expect(uiResult).toBe(5)     // Já estava correto
    expect(motorResult).toBe(uiResult)  // Concordância
  })

  it('Relato sem potencial de acidente → ERC 1 em ambos', () => {
    const motorResult = inferDeterministicErcLevel(RELATO_ADMINISTRATIVO, 'P-A', 'O-A', 'A-A')
    const uiResult = EV_ARMS_ERC['D4']
    expect(motorResult).toBe(1)  // FALHA antes da inversão (retorna 5)
    expect(uiResult).toBe(1)     // Já estava correto
    expect(motorResult).toBe(uiResult)  // Concordância
  })
})
```

---

## 8. Especificações de Testes Automatizados Futuros

### 8.1 Teste de integridade da lookup table (Tipo A — completo)

```typescript
describe('EV_ARMS_ERC — integridade completa', () => {
  const EXPECTED = {
    A1: 5, A2: 5, A3: 4, A4: 3,
    B1: 4, B2: 4, B3: 3, B4: 3,
    C1: 3, C2: 3, C3: 2, C4: 1,
    D1: 1, D2: 1, D3: 1, D4: 1,  // D1/D2 requerem decisão sobre desvio
  }
  Object.entries(EXPECTED).forEach(([cell, expectedErc]) => {
    it(`célula ${cell} → ERC ${expectedErc}`, () => {
      expect(EV_ARMS_ERC[cell]).toBe(expectedErc)
    })
  })
})
```

### 8.2 Teste de inferência do motor (Tipo B — pós-inversão)

```typescript
describe('inferErcLevel — pós Opção A', () => {
  it('O-B code → ERC 5 (catastrófico)', () => {
    expect(inferErcLevel('', 'P-X', 'O-B', 'A-X')).toBe(5)
  })
  it('A-I code → ERC 5', () => {
    expect(inferErcLevel('', 'P-X', 'P-X', 'A-I')).toBe(5)
  })
  it('keywords de conflito iminente → ERC 5', () => {
    expect(inferErcLevel('conflito iminente', 'P-X', 'O-X', 'A-X')).toBe(5)
  })
})

describe('inferDeterministicErcLevel — pós Opção A', () => {
  it('A-A + sem impacto operacional → ERC 1', () => {
    expect(inferDeterministicErcLevel('manutenção de rotina sem impacto', 'P-A', 'O-A', 'A-A')).toBe(1)
  })
  it('O-B + A-A → ERC 5', () => {
    expect(inferDeterministicErcLevel('', 'P-X', 'O-B', 'A-A')).toBe(5)
  })
})
```

### 8.3 Teste de concordância motor × UI (Tipo C)

```typescript
describe('Concordância motor × UI', () => {
  ERC_FIXTURES_TIPO_C.forEach(fixture => {
    it(`${fixture.id}: motor e UI concordam em ERC ${fixture.expectedErc}`, async () => {
      const motorResult = await runSeraPipeline(fixture.rawText)
      const uiResult = EV_ARMS_ERC[`${fixture.sevRow}${fixture.barrierCol}`]
      expect(motorResult.erc_level).toBe(fixture.expectedErc)
      expect(uiResult).toBe(fixture.expectedErc)
      expect(motorResult.erc_level).toBe(uiResult)
    })
  })
})
```

---

## 9. Sequência de Validação Antes de Deploy

| Etapa | Ação | Bloqueante? |
|---|---|---|
| 1 | Rodar fixtures com motor ATUAL (pré-inversão) — documentar resultados como baseline | Não |
| 2 | Implementar Opção A: inverter `inferErcLevel()`, `inferDeterministicErcLevel()`, `levels.json` | — |
| 3 | Rodar fixtures ERC-01, 02, 05, 07, 08 (bloqueantes) com motor invertido | ✅ SIM |
| 4 | Rodar fixtures ERC-03, 04, 06, 09, 10 (complementares) | Não |
| 5 | Rodar teste de concordância motor × UI para 5 fixtures | ✅ SIM |
| 6 | Definir e executar política de migração para `analyses.erc_level` histórico | ✅ SIM (antes F-002) |
| 7 | Conectar `modal_erc_level` (F-002) e validar com ERC-01 e ERC-08 | Não (mas antes de expansão) |
| 8 | Rodar todos os 13 casos de integridade de lookup (automático) | ✅ SIM antes de expansão |
| 9 | Deploy em staging + validação com dados reais | Recomendado |
| 10 | Deploy em produção | — |
