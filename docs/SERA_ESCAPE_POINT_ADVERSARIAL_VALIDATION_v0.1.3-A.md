# SERA — Validação Adversarial do Ponto de Fuga v0.1.3-A
**Versão:** v0.1.3-A  
**Data:** 2026-05-18  
**Fase:** RISK v0.7 — validação adversarial pós-implementação da regra de ancoragem  
**Status:** Runner executado (TEST-ESCAPE + Copterline) — validação estática (JSON/preconditions-static) não executada nesta rodada  

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

Não executado nesta rodada.

| Fixture | JSON válido | Erro |
|---|---|---|
| TEST-ESCAPE-MAINT-001 | Não verificado | n/a |
| TEST-ESCAPE-DISPATCH-001 | Não verificado | n/a |
| TEST-ESCAPE-PLANNING-001 | Não verificado | n/a |
| TEST-ESCAPE-SUPERVISION-001 | Não verificado | n/a |
| TEST-ESCAPE-TRAINING-001 | Não verificado | n/a |
| TEST-ESCAPE-DESIGN-001 | Não verificado | n/a |
| TEST-ESCAPE-PILOT-LEGIT-001 | Não verificado | n/a |
| TEST-ESCAPE-POST-FAILURE-001 | Não verificado | n/a |

### 7.2 Validação de precondições estáticas

Não executado nesta rodada.

### 7.3 Resultados do runner SERA (se executado)

Executado com `N_RUNS=1`:
- Adversarial ESCAPE (8 fixtures): `tests/reports/run-1779153720233.json`
- Controle Copterline (1 fixture): `tests/reports/run-1779154661767.json`

Resumo ESCAPE: **0 PASS, 8 PARTIAL, 0 FAIL, 0 ERROR** (`pass_rate=0`, `determinism_rate=1.0`).  
Resumo Copterline: **0 PASS, 1 PARTIAL, 0 FAIL, 0 ERROR** (`pass_rate=0`, `determinism_rate=1.0`).

| Fixture | P esperado | P obtido | O esperado | O obtido | A esperado | A obtido | ERC esperado | ERC obtido | Status |
|---|---|---|---|---|---|---|---|---|---|
| TEST-ESCAPE-MAINT-001 | P-G | P-A | O-A | O-A | A-G | A-G | 1 | 1 | PARTIAL |
| TEST-ESCAPE-DISPATCH-001 | P-A | P-A | O-D | O-A | A-A | A-I | 2 | 2 | PARTIAL |
| TEST-ESCAPE-PLANNING-001 | P-G | P-A | O-A | O-A | A-B | A-B | 3 | 3 | PARTIAL |
| TEST-ESCAPE-SUPERVISION-001 | P-G | P-A | O-A | O-A | A-G | A-D | 3 | 3 | PARTIAL |
| TEST-ESCAPE-TRAINING-001 | P-G | P-A | O-A | O-A | A-G | A-G | 3 | 3 | PARTIAL |
| TEST-ESCAPE-DESIGN-001 | P-A | P-A | O-D | O-A | A-A | A-A | 2 | 5 | PARTIAL |
| TEST-ESCAPE-PILOT-LEGIT-001 | P-G | P-G | O-B | O-D | A-A | A-A | 1 | 2 | PARTIAL |
| TEST-ESCAPE-POST-FAILURE-001 | P-G | P-G | O-A | O-A | A-G | A-B | 1 | 3 | PARTIAL |

### 7.4 Falhas documentadas

| Fixture | Campo(s) divergente(s) | Esperado | Obtido | Nota de causa provável |
|---|---|---|---|---|
| TEST-ESCAPE-DESIGN-001 | O, ERC | O-D, ERC 2 | O-A, ERC 5 | LLM não sustentou hipótese de desvio de objetivo por pressão comercial; colapsou para cenário conservativo sem violação. |
| TEST-ESCAPE-DISPATCH-001 | O, A | O-D, A-A | O-A, A-I | LLM deslocou de decisão organizacional para execução/controle operacional; padrão não alinhado com premissa de O-D. |
| TEST-ESCAPE-MAINT-001 | P | P-G | P-A | Falha apenas em percepção; trilha O/A/ERC manteve o caminho esperado de maintenanceOmission. |
| TEST-ESCAPE-PILOT-LEGIT-001 | O, ERC | O-B, ERC 1 | O-D, ERC 2 | LLM interpretou como desvio excepcional (O-D) em vez de violação normalizada (O-B), elevando ERC no motor legacy. |
| TEST-ESCAPE-PLANNING-001 | P | P-G | P-A | Falha apenas em percepção; O/A/ERC corretos. |
| TEST-ESCAPE-POST-FAILURE-001 | A, ERC | A-G, ERC 1 | A-B, ERC 3 | Falha no eixo de ação: ponto de fuga foi tratado como execução direta (A-B), não supervisão/manutenção (A-G). |
| TEST-ESCAPE-SUPERVISION-001 | P, A | P-G, A-G | P-A, A-D | LLM rompeu o caminho de supervisionFailure e classificou como limitação operacional/execução. |
| TEST-ESCAPE-TRAINING-001 | P | P-G | P-A | Falha apenas em percepção; O/A/ERC corretos. |

Padrão consolidado:
- **Percepção P-G → P-A** em 4/8 fixtures (MAINT, PLANNING, SUPERVISION, TRAINING), com impacto direto no overall PARTIAL.
- **Objetivo esperado O-D** não sustentado em 2/2 fixtures (DESIGN e DISPATCH).
- **Quebra da ancoragem A-G** em 2 fixtures críticas (SUPERVISION e POST-FAILURE).

### 7.5 Controle Copterline (fixture original)

Relatório: `tests/reports/run-1779154661767.json`

| Fixture | P esperado | P obtido | O esperado | O obtido | A esperado | A obtido | ERC esperado | ERC obtido | Status | Preconditions |
|---|---|---|---|---|---|---|---|---|---|---|
| TEST-COPTERLINE-S76C-001 | P-G | P-A | O-A | O-A | A-G | A-G | 1 | 1 | PARTIAL | PASS (recall 1.0) |

Observação: o controle Copterline repetiu o mesmo padrão de divergência de percepção (P-G→P-A), com preservação de O/A/ERC.

---

## 9. Correção funcional v0.1.3-B

### 9.1 Alterações implementadas

Foram aplicadas correções funcionais mínimas e cirúrgicas em:

- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/rules/objective/select.ts`
- `frontend/src/lib/sera/pipeline.ts`

Mudanças principais:

1. **Percepção P-G organizacional reforçada**:
- novo contexto de agente organizacional + barreira/requisito + falha de verificação/rastreio;
- novos termos de monitoramento e de requisito obrigatório (incluindo W&B e treinamento).

2. **Bloqueio de A-D indevido**:
- remoção de gatilho lexical amplo (`torque` isolado) para incapacidade física;
- remapeamento de `A-D` para alternativas compatíveis em agente organizacional sem evidência física explícita.

3. **A-G fortalecido para supervisão/manutenção**:
- reforço de `supervisionFailure` e `maintenanceOmission`;
- separação entre contexto de manutenção real e contexto de engenharia/design para evitar `A-G` espúrio.

4. **O-B/O-D estabilizados**:
- ampliação lexical de O-D para pressão comercial/operacional e pontualidade;
- ampliação lexical de O-B para normalização/rotina recorrente;
- gate de Step 5 para manter `A-A` quando o desvio dominante é O-D (sem mecanismo concorrente).

5. **Correção estrutural no pipeline**:
- remoção do override que forçava `P-A` sempre que `A-G` era retornado.

6. **Estabilização do anti-gate de engenharia/design (residual DESIGN-001)**:
- na rodada N_RUNS=3 imediatamente posterior à v0.1.3-B inicial (relatório `tests/reports/run-1779159412281.json`), o `TEST-ESCAPE-DESIGN-001` apresentou 1/3 PARTIAL com `A-G/ERC=1` no lugar de `A-A/ERC=2`. Causa raiz: o anti-gate `engineeringDesignDominant` em `runStep3`/`runStep5` era avaliado sobre `relatoNorm = relato + pontoFuga.ato_inseguro_factual`. Quando o LLM do Step 2 inseria termos como "ordem de serviço", "inspeção programada" ou "manutenção programada" no `ato_inseguro_factual`, o filtro `hasExecutableMaintenanceTask` virava `true`, derrubando o anti-gate de engenharia e permitindo que `maintenanceOmission` disparasse o gate A-G.
- Correção cirúrgica: `engineeringDesignDominant` (e os dois `evidenceOf*` que compõem `maintenanceOmission`) passam a ser avaliados sobre o **relato bruto normalizado**, isolando o anti-gate da flutuação do Step 2. Mudanças em `frontend/src/lib/sera/all-steps.ts`: linhas ~1762 (`runStep3` — nova `relatoOnlyForAntiGates`) e ~2568, 2574-2575 (`runStep5` — uso de `relatoOnlyNorm` já existente para `engineeringDesignDominant`, `evidenceOfMaintenanceSystemContext` e `evidenceOfMaintenanceOmissionContext`).
- Nenhuma alteração em motor de conversão ERC, baseline, expected, Risk Profile, UI/produto, schema ou billing.

### 9.2 Verificações executadas

| Verificação | Resultado |
|---|---|
| Parse JSON de `TEST-ESCAPE-*` + `TEST-COPTERLINE-S76C-001` | PASS |
| `tests/sera/preconditions-static.ts` | PASS |
| `tests/sera/preconditions-generalization-static.ts` | PASS |
| `tests/sera/objective-generalization-static.ts` | PASS |

### 9.3 Run IDs e resultados finais

Pré-correção do residual DESIGN-001 (rodada intermediária N_RUNS=3 ainda com fragilidade):
| Bateria | N | Run ID | Resultado |
|---|---|---|---|
| TEST-ESCAPE-* (intermediário) | 3 | `run-1779159412281` | PASS 23 / PARTIAL 1 / FAIL 0 — DESIGN-001 run 0 saiu A-G/ERC1 |

Pós-correção definitiva v0.1.3-B (após estabilizar `engineeringDesignDominant` sobre o relato bruto):
| Bateria | N | Run ID | Resultado |
|---|---|---|---|
| TEST-ESCAPE-* | 1 | `run-1779163949241` | PASS 8 / PARTIAL 0 / FAIL 0 / ERROR 0 (rate 100%, det 100%) |
| Copterline | 1 | `run-1779186638365` | PASS 1 / PARTIAL 0 / FAIL 0 / ERROR 0 (rate 100%, det 100%) |
| TEST-ESCAPE-* | 3 | `run-1779186743207` | PASS 24 / PARTIAL 0 / FAIL 0 / ERROR 0 (rate 100%, det 100%) |
| Copterline | 3 | `run-1779188916713` | PASS 3 / PARTIAL 0 / FAIL 0 / ERROR 0 (rate 100%, det 100%) |
| Regressões legítimas (A-D, A-G, A-B, O-B, O-C) | 1 | `run-1779189220618` (sequência) | 5/5 PASS, 100% det |

### 9.4 Estado final por fixture

| Fixture | Resultado final |
|---|---|
| TEST-ESCAPE-MAINT-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-DISPATCH-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-PLANNING-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-SUPERVISION-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-TRAINING-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-DESIGN-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-PILOT-LEGIT-001 | PASS (N=1 e N=3) |
| TEST-ESCAPE-POST-FAILURE-001 | PASS (N=1 e N=3) |
| TEST-COPTERLINE-S76C-001 | PASS (N=1 e N=3) |

### 9.5 Regressões seletivas legítimas

Conjunto pequeno de regressões executado em N_RUNS=1 para cobrir os eixos que poderiam ser impactados pela correção do anti-gate de engenharia/design:

| Fixture | Eixo coberto | Resultado |
|---|---|---|
| `TEST-A-D-001` | A-D legítimo (incapacidade física) | PASS |
| `TEST-A-G-001` | A-G legítimo (supervisão + delegação + falha de verificação) | PASS |
| `TEST-A-B-001` | A-B execução direta (omissão procedural) | PASS |
| `TEST-GEN-OB-001` | O-B (violação rotineira/normalizada) | PASS |
| `TEST-GEN-OC-001` | O-C (objetivo protetivo/humano) | PASS |

P-G, O-D e A-G já estão exaustivamente cobertos pelas 8 escape fixtures + Copterline em N_RUNS=3 (27/27 PASS). Não foi rodado smoke global.

### 9.6 Riscos remanescentes

- A correção depende de o relato bruto da fixture conter os marcadores discriminativos de manutenção/engenharia (HELOTRAC, ordem de serviço, programa de manutenção, controle de aeronavegabilidade, retorno ao serviço, intervalo de manutenção). Fixtures novas com narrativa truncada ou descontextualizada podem fugir ao anti-gate; recomenda-se reforçar o vocabulário canônico no relato.
- O anti-gate `engineeringDesignDominant` continua heurístico (lista lexical). Uma reformulação semântica (Step 2 decide "domínio causal" em vez de apenas extrair texto) eliminaria a fragilidade residual, mas está fora do escopo da v0.1.3-B.
- O eixo de precondições do `TEST-ESCAPE-DESIGN-001` permanece dependente do LLM; nenhuma divergência observada em N_RUNS=3 pós-correção, mas é o eixo de menor estabilidade estrutural entre os adversariais.

### 9.7 Confirmação de não-regressão (escopo do commit)

- `expected` das fixtures: **não alterado**.
- Baseline oficial: **não alterado**.
- UI/produto/conversão ERC: **não alterado**.
- Risk Profile congelado: **não alterado**.
- Schema/migrations: **não alterado**.
- Billing/Stripe: **não alterado**.

---

## 10. Referências

| Documento | Relevância |
|---|---|
| `SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md` | Definição do ponto de fuga, regra anti-migração, regras por agente |
| `tests/sera/fixtures/TEST-COPTERLINE-S76C-001.json` | Fixture original — referência de formato e padrão A-G com ERC 1 |
| `frontend/src/lib/sera/all-steps.ts` | Motor — `isMaintainenceOrOrganizationalAgent`, `evidenceOfMaintenanceOmissionContext`, `evidenceOfSupervisionFailure`, `runStep5` |
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Decisão formal sobre escala ERC e nota sobre fixtures |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | Plano técnico RISK v0.8 (inversão do motor) |
