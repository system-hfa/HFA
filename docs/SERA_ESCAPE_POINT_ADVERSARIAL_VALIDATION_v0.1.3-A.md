# SERA — Validação Adversarial do Ponto de Fuga v0.1.3-A
**Versão:** v0.1.3-A  
**Data:** 2026-05-18  
**Fase:** RISK v0.7 — validação adversarial pós-implementação da regra de ancoragem  
**Status:** Fixtures criados — validação estática pendente de execução  

---

## 1. Objetivo

Validar que a regra de ancoragem do ponto de fuga da operação segura (`SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`) generaliza para domínios além do caso Copterline S-76C+. Oito fixtures adversariais testam diferentes agentes, domínios e mecanismos causais, incluindo casos onde:

1. A regra de manutenção (A-G + ERC 1) deve disparar via `maintenanceOmission`.
2. A regra de supervisão (A-G + ERC 3) deve disparar via `supervisionFailure` sem `maintenanceOmission`.
3. Agentes com objetivo desviante (O-D) produzem P-A/O-D/A-A, não o padrão de manutenção.
4. O piloto É o agente legítimo do ponto de fuga (violação normalizada).
5. A resposta do piloto à falha técnica é consequência, não ponto de fuga.

**Regra de não alteração do motor:** Nenhuma alteração de código de motor foi realizada nesta fase. Se fixtures falharem, as falhas são documentadas na Seção 7 deste documento e não geram patches.

---

## 2. Tabela de fixtures adversariais

| ID | Domínio | Agente do ponto de fuga | P | O | A | ERC motor | Caminho | Regra testada |
|---|---|---|---|---|---|---|---|---|
| TEST-ESCAPE-MAINT-001 | Manutenção de motor | gestão de manutenção | P-G | O-A | A-G | 1 | Determinístico | maintenanceOmission → A-G + ERC 1 |
| TEST-ESCAPE-DISPATCH-001 | Despacho operacional | despachante operacional | P-A | O-D | A-A | 2 | LLM | Agente com O-D → A-A, não A-G |
| TEST-ESCAPE-PLANNING-001 | Planejamento de carga | responsável por planejamento | P-G | O-A | A-B | 3 | LLM | Omissão de execução própria → A-B, não A-G |
| TEST-ESCAPE-SUPERVISION-001 | Supervisão de manutenção | supervisor de manutenção | P-G | O-A | A-G | 3 | Determinístico | supervisionFailure → A-G + ERC 3 (sem maintenanceOmission) |
| TEST-ESCAPE-TRAINING-001 | Instrução de voo | supervisor de treinamento | P-G | O-A | A-G | 3 | Determinístico | supervisionFailure fora de manutenção → A-G + ERC 3 |
| TEST-ESCAPE-DESIGN-001 | Engenharia de produto | depto. de engenharia | P-A | O-D | A-A | 2 | LLM | O-D em domínio de engenharia → A-A |
| TEST-ESCAPE-PILOT-LEGIT-001 | Voo / CFIT | capitão em comando | P-G | O-B | A-A | 1 | LLM | Piloto é agente legítimo (violação normalizada) |
| TEST-ESCAPE-POST-FAILURE-001 | Manutenção de cabos | gestão de manutenção | P-G | O-A | A-G | 1 | Determinístico | Resposta de piloto = consequência; A-G manutenção |

---

## 3. Cobertura de domínios

| Domínio | Fixture(s) |
|---|---|
| Manutenção de motor | TEST-ESCAPE-MAINT-001 |
| Despacho operacional | TEST-ESCAPE-DISPATCH-001 |
| Planejamento de carga (W&B) | TEST-ESCAPE-PLANNING-001 |
| Supervisão de manutenção | TEST-ESCAPE-SUPERVISION-001 |
| Instrução / treinamento de voo | TEST-ESCAPE-TRAINING-001 |
| Engenharia de produto / boletim de serviço | TEST-ESCAPE-DESIGN-001 |
| Piloto como agente legítimo (CFIT) | TEST-ESCAPE-PILOT-LEGIT-001 |
| Manutenção com resposta de piloto como consequência | TEST-ESCAPE-POST-FAILURE-001 |

---

## 4. Análise de dependências determinísticas

### 4.1 Fixtures com caminho determinístico para código A

Estes fixtures dependem de caminho determinístico no Step 5 (`runStep5`) para o código de ação:

**TEST-ESCAPE-MAINT-001** e **TEST-ESCAPE-POST-FAILURE-001**:
- `isMaintainenceOrOrganizationalAgent(pontoFuga.agente)` = true (agente contém 'gestao de manutencao'/'manutencao')
- `evidenceOfMaintenanceOmissionContext(relatoNorm)` = true (narrativa contém termos de omissão de inspeção/tarefa obrigatória)
- `maintenanceOmission` = true → gate A-D bloqueado; gate A-G dispara
- `inferDeterministicErcLevel('A-G', text)` com maintenanceOmissionContext → retorna 1

**TEST-ESCAPE-SUPERVISION-001**:
- `isMaintainenceOrOrganizationalAgent(pontoFuga.agente)` = true ('manutencao' em 'supervisor de manutenção')
- `evidenceOfMaintenanceOmissionContext(relatoNorm)` = **false** (narrativa não contém termos de inspeção obrigatória programada)
- `maintenanceOmission` = false
- `evidenceOfSupervisionFailure(relatoNorm)` = true ('supervisor' + 'delegou' + 'não retornou para verificar')
- Gate A-G dispara via `supervisionFailure` → ERC 3

**TEST-ESCAPE-TRAINING-001**:
- `isMaintainenceOrOrganizationalAgent(pontoFuga.agente)` = **false** ('treinamento' não consta da lista)
- `maintenanceOmission` = false
- `evidenceOfSupervisionFailure(relatoNorm)` = true ('supervisor de treinamento' + 'delegou' + 'não retornou para verificar')
- Gate A-G dispara via `supervisionFailure` → ERC 3

### 4.2 Fixtures com caminho LLM

**TEST-ESCAPE-DISPATCH-001, TEST-ESCAPE-PLANNING-001, TEST-ESCAPE-DESIGN-001, TEST-ESCAPE-PILOT-LEGIT-001**: nenhum gate determinístico de Step 5 dispara para o código A esperado. Os códigos P, O, A e ERC são LLM-dependentes.

### 4.3 Dependência de Step 2 para todos os fixtures

Mesmo os fixtures determinísticos dependem do LLM em Step 2 para extrair `pontoFuga.agente` corretamente. Se Step 2 extrair o agente errado, o flag `maintenanceOmission` não dispara e o Step 5 pode não produzir A-G determinístico.

### 4.4 Risco conhecido: gate A-E sem guard de maintenanceOmission

O gate A-E (Falha de Conhecimento) dispara ANTES do gate A-G no Step 5 e não possui guard `!maintenanceOmission`. Narrativas que contenham termos de déficit de conhecimento em cenários de manutenção podem fazer A-E disparar antes de A-G. Todos os fixtures de manutenção foram escritos sem termos de déficit de conhecimento para mitigar este risco.

---

## 5. O que cada fixture testa (regras de ancoragem)

### 5.1 Generalização de A-G por maintenanceOmission (MAINT-001, POST-FAILURE-001)
**Hipótese:** A regra maintenanceOmission → A-G + ERC 1 generaliza para domínios além de Copterline (rotor de helicóptero) — especificamente: motor turboélice (MAINT-001) e sistema de controle de cauda (POST-FAILURE-001).
**Falha confirmada se:** action_code ≠ 'A-G' ou erc_level ≠ 1.

### 5.2 A-G via supervisionFailure sem maintenanceOmission (SUPERVISION-001, TRAINING-001)
**Hipótese:** A regra supervisionFailure → A-G dispara quando o agente é supervisor (com ou sem 'manutencao' no nome) e há delegação sem confirmação de execução, produzindo ERC 3 (não ERC 1).
**Falha confirmada se:** action_code ≠ 'A-G' ou erc_level ≠ 3.

### 5.3 Agente com objetivo desviante não produz A-G (DISPATCH-001, DESIGN-001)
**Hipótese:** Agentes com O-D (pressão comercial / eficiência) produzem P-A/O-D/A-A, não o padrão de manutenção P-G/O-A/A-G. O sistema não generaliza incorretamente A-G para todos os agentes organizacionais.
**Falha confirmada se:** action_code = 'A-G' quando esperado é 'A-A', ou objective_code ≠ 'O-D'.

### 5.4 Omissão de execução própria não produz A-G (PLANNING-001)
**Hipótese:** Agente que executou diretamente a tarefa e omitiu passo obrigatório de verificação produz A-B, não A-G (A-G exige delegação a terceiro).
**Falha confirmada se:** action_code = 'A-G' quando esperado é 'A-B'.

### 5.5 Piloto como agente legítimo (PILOT-LEGIT-001)
**Hipótese:** O sistema classifica P-G/O-B/A-A quando o piloto é o agente legítimo do ponto de fuga, sem viés de atribuição a manutenção/organização.
**Falha confirmada se:** action_code ≠ 'A-A', ou objective_code ≠ 'O-B', ou o sistema atribui incorretamente o ponto de fuga à supervisão/organização.

### 5.6 Resposta de piloto = consequência, não ponto de fuga (POST-FAILURE-001)
**Hipótese:** Quando a narrativa descreve falha de manutenção + resposta de piloto subsequente, o sistema classifica o agente de manutenção como ponto de fuga (A-G), não o piloto (A-D).
**Falha confirmada se:** action_code = 'A-D' (atribuindo a incapacidade física ao piloto como ponto de fuga).

---

## 6. Nota sobre escala ERC nos fixtures

Todos os valores `expected.erc_level` nos fixtures desta fase usam a **escala legacy do motor SERA**:
- **1** = crítico / risco imediato (maior criticidade)
- **5** = mínimo / administrativo (menor criticidade)

A UI converte via `coerceMotorErcToHfaCategory` (motor 1 → HFA 5 = vermelho, motor 3 → HFA 3 = amarelo). Ver `RISK_ERC_CANONICAL_DECISION_v0.7.md` para decisão formal sobre escala canônica.

---

## 7. Registro de resultados de validação

### 7.1 Validação de JSON (npx tsc --noEmit e formato)

*A preencher após execução.*

| Fixture | JSON válido | Erro |
|---|---|---|
| TEST-ESCAPE-MAINT-001 | — | — |
| TEST-ESCAPE-DISPATCH-001 | — | — |
| TEST-ESCAPE-PLANNING-001 | — | — |
| TEST-ESCAPE-SUPERVISION-001 | — | — |
| TEST-ESCAPE-TRAINING-001 | — | — |
| TEST-ESCAPE-DESIGN-001 | — | — |
| TEST-ESCAPE-PILOT-LEGIT-001 | — | — |
| TEST-ESCAPE-POST-FAILURE-001 | — | — |

### 7.2 Validação de precondições estáticas

*A preencher após execução de `npx tsx tests/sera/preconditions-static.ts`.*

### 7.3 Resultados do runner SERA (se executado)

*A preencher após execução de `npx tsx tests/sera/runner.ts` com as fixtures adversariais.*

| Fixture | P esperado | P obtido | O esperado | O obtido | A esperado | A obtido | ERC esperado | ERC obtido | Status |
|---|---|---|---|---|---|---|---|---|---|
| TEST-ESCAPE-MAINT-001 | P-G | — | O-A | — | A-G | — | 1 | — | — |
| TEST-ESCAPE-DISPATCH-001 | P-A | — | O-D | — | A-A | — | 2 | — | — |
| TEST-ESCAPE-PLANNING-001 | P-G | — | O-A | — | A-B | — | 3 | — | — |
| TEST-ESCAPE-SUPERVISION-001 | P-G | — | O-A | — | A-G | — | 3 | — | — |
| TEST-ESCAPE-TRAINING-001 | P-G | — | O-A | — | A-G | — | 3 | — | — |
| TEST-ESCAPE-DESIGN-001 | P-A | — | O-D | — | A-A | — | 2 | — | — |
| TEST-ESCAPE-PILOT-LEGIT-001 | P-G | — | O-B | — | A-A | — | 1 | — | — |
| TEST-ESCAPE-POST-FAILURE-001 | P-G | — | O-A | — | A-G | — | 1 | — | — |

### 7.4 Falhas documentadas

*Descrever aqui cada falha de teste: fixture ID, campo divergente, valor esperado, valor obtido, análise de causa (gate incorreto? Step 2 extraiu agente errado? LLM divergiu da metodologia Hendy?).*

---

## 8. Referências

| Documento | Relevância |
|---|---|
| `SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md` | Definição do ponto de fuga, regra anti-migração, regras por agente |
| `tests/sera/fixtures/TEST-COPTERLINE-S76C-001.json` | Fixture original — referência de formato e padrão A-G com ERC 1 |
| `frontend/src/lib/sera/all-steps.ts` | Motor — `isMaintainenceOrOrganizationalAgent`, `evidenceOfMaintenanceOmissionContext`, `evidenceOfSupervisionFailure`, `runStep5` |
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Decisão formal sobre escala ERC e nota sobre fixtures |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | Plano técnico RISK v0.8 (inversão do motor) |
