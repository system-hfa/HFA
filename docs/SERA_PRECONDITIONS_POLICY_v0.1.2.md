# SERA Preconditions Policy — v0.1.2 Draft

**Data:** 2026-05-16
**Baseado em:** `docs/SERA_VALIDATION_v0.1.1.md`, `docs/SERA_EVIDENCE_SUFFICIENCY_AUDIT.md`, `docs/SERA_V0_1_2_PLAN.md`, `frontend/src/lib/sera/rules/preconditions/README.md`, `frontend/src/lib/sera/rules/preconditions/matrix.json`
**Status:** Draft — não implementado; precisa de aprovação antes de qualquer alteração no runner.

---

## 1. Estado Atual

### 1.1 Como preconditions são avaliadas hoje

O runner SERA avalia preconditions como dimensão separada do resultado global. O fluxo atual é:

1. O LLM de Step 6-7 produz uma lista de pré-condições com justificativas.
2. `selectDeterministicPreconditions` (em `rules/preconditions/select.ts`) executa em seguida e, quando a combinação `(perception_code, objective_code, action_code)` possui regra na `matrix.json`, **sobrescreve completamente** o output do LLM.
3. O runner compara as pré-condições produzidas com o campo `top_preconditions` da fixture e calcula um `precondition_recall`.
4. O `overall` de cada run é determinado exclusivamente por P/O/A/ERC — preconditions **não** entram no cálculo de `overall`.

### 1.2 Resultado na v0.1.1

- Baseline aprovado: **162/162 PASS**, pass_rate 100%, determinism_rate 100%.
- O `overall` de cada fixture foi determinado por P/O/A/ERC.
- Scores internos de preconditions podem apresentar PARTIAL/FAIL em runs individuais sem invalidar a classificação principal. Isso foi aceito na v0.1.1 por ausência de política formalizada.
- Exemplo documentado: `TEST-O-B-001` teve 1/12 runs com P-G em vez de P-A (não-determinismo) sem bloquear o overall PASS da v0.1.1.

### 1.3 Por que formalizar agora

Durante v0.1.2-A (fixtures O-C não-protetivo), o `precondition_recall` das NP fixtures ficou em 60% no conjunto. Isso não bloqueou os resultados — 15/15 PASS em P/O/A/ERC — mas evidencia que:

- A ausência de política cria ambiguidade entre "falha de precondition" e "falha global".
- Métricas de precondition aparecem no relatório sem critério de interpretação.
- Fixtures novas podem ter `top_preconditions` subótimas sem mecanismo de detecção.
- Regra `O-C__A-A` na `matrix.json` tem vocabulário de evidência enviesado para casos protetivos (S1: "passageiro", "paciente", "pessoa", "medica", "doente") — lacuna para O-C não-protetivo.

---

## 2. Separação entre Classificação Primária e Fatores Contribuintes

### 2.1 Definições

| Dimensão | Componentes | Papel |
|---|---|---|
| **Classificação primária** | Perception (P) / Objective (O) / Action (A) / ERC | Determina o `overall`. Bloqueia release quando incorreta. |
| **Fatores contribuintes** | Preconditions (top_preconditions) | Explicação, prevenção e recomendação. Não determinam `overall` sozinhos. |

### 2.2 Justificativa para a separação

Preconditions têm múltiplas respostas metodologicamente aceitáveis para o mesmo evento. Um caso O-C com A-A pode ter P2 (julgamento) e S1 (pressão social) igualmente válidos, e ambos podem ser corretos dependendo do relato. O `top_preconditions` da fixture é um **conjunto de referência ouro** — não uma lista exaustiva e exclusiva.

Tratar precondition FAIL como overall FAIL introduziria falsos negativos estruturais: casos classificados corretamente em P/O/A/ERC falhariam por variação legítima na seleção de fatores contribuintes.

### 2.3 Regra de prioridade vigente

> **Enquanto esta política não for transformada em gate de runner, `overall` continua priorizando P/O/A/ERC. Scores de precondition são reportados como métrica secundária.**

---

## 3. `top_preconditions` — Definição Operacional

### 3.1 O que é

`top_preconditions` é o **conjunto de referência ouro** para recall de pré-condições de uma fixture. É declarado pelo autor da fixture com base no relato e na metodologia SERA.

### 3.2 O que não é

- Não é lista estrita e exclusiva de todas as pré-condições válidas.
- Não é lista obrigatória que deve aparecer integralmente em todo run.
- Não é lista ordenada semanticamente — a ordem pode variar conforme seleção do motor.

### 3.3 Como deve ser interpretado no runner

| Situação | Interpretação |
|---|---|
| Motor retorna todas as preconditions de `top_preconditions` | Recall perfeito — ideal |
| Motor retorna subset correto de `top_preconditions` | Recall parcial — aceitável se P/O/A/ERC corretos |
| Motor retorna precondition não presente em `top_preconditions` mas plausível pelo relato | Não é erro — é alternativa válida |
| Motor retorna precondition sem evidência textual no relato | Potencial "noise" — a investigar |
| Motor não retorna precondition crítica explicitamente evidenciada | Regressão candidata — verificar |

### 3.4 Inconsistência conhecida

A regra `O-C__A-A` da `matrix.json` lista evidências de S1 como `["passageiro", "paciente", "pessoa", "equipe", "medica", "doente"]` — vocabulário exclusivamente protetivo. Fixtures O-C não-protetivo (NP-001 a NP-004) não acionam essa evidência, gerando recall parcial mesmo quando a classificação P/O/A/ERC está correta. Esta inconsistência está registrada como issue EVM-001 — requer validação seletiva antes de qualquer correção. Precondition_recall não deve ser usado como métrica de qualidade para O-C não-protetivo até que a correção seja validada.

---

## 4. Classes de Severidade de Preconditions

Proposta de classificação para uso futuro em fixtures e runner.

### 4.1 Critical

**Definição:** pré-condição que deve aparecer quando há evidência textual explícita e central no relato.

**Critério de inclusão:** a fixture deve ter campo `precondition_class: "critical"` para marcar casos desse tipo.

**Critério de regressão:** ausência de precondition Critical em 2/3 ou 3/3 runs é candidata a bloqueio de release — especialmente se a fixture estiver marcada como `precondition-critical` nos metadados.

**Exemplos:**
- T1 (pressão temporal) em cenário onde "pressão de tempo" é causa central explícita.
- P6 (falta de treinamento) em cenário onde "não havia recebido treinamento específico" é fato declarado.
- S1 (pressão social/organizacional) em cenário onde a hierarquia é mencionada explicitamente como fator decisor.

### 4.2 Expected

**Definição:** pré-condição que deveria aparecer por associação metodológica ao código P/O/A/ERC, mas cuja ausência não bloqueia o overall.

**Critério de regressão:** ausência sistemática (em grupo inteiro de fixtures do mesmo tipo) pode indicar gap na `matrix.json`.

**Exemplos:**
- O3 (ausência de procedimento) em cenários O-C — esperada, mas relato pode não mencionar procedimentos explicitamente.
- P2 (julgamento individual) em cenários O-C ou O-D.

### 4.3 Optional / Contextual

**Definição:** pré-condição aceitável se o relato mencionar o fator, mas não obrigatória por metodologia.

**Critério de regressão:** nenhum. Aparecimento ou ausência são ambos aceitáveis.

**Exemplos:**
- W1 (falha de equipamento) em cenários de ação sem causa de equipamento — pode aparecer como fator contextual sem ser central.
- P1 (fisiológico) em cenários sem menção a fadiga ou limitação física.

### 4.4 Noise

**Definição:** pré-condição que aparece sem base textual suficiente — inferência do LLM não ancorada no relato.

**Critério de detecção:** pré-condição retornada que não aparece em `top_preconditions` e não tem correspondência lexical no relato.

**Exemplos históricos:**
- P1/P2 fisiológico/psicológico inseridos por plausibilidade contextual mesmo sem menção a fadiga, estresse ou estado psicológico.
- S3 (supervisão) inserido em cenários onde supervisão não foi mencionada como fator.

**Risco:** noise em preconditions muda recomendações de prevenção sem base metodológica — é o tipo de erro mais perigoso operacionalmente.

---

## 5. Quando Preconditions Devem Bloquear Release

### 5.1 Critérios de bloqueio (proposta)

Release deve ser bloqueada por preconditions **apenas quando**:

1. **Regressão em fixture precondition-critical:** fixture marcada como `precondition-critical` perde uma precondition de classe Critical em 2/3 ou 3/3 runs, em comparação com baseline anterior.
2. **Noise grave:** surge pré-condição de classe Noise que altera materialmente a recomendação de prevenção (ex.: atribui causa fisiológica sem base textual em caso puramente organizacional).
3. **Regressão sistemática:** recall de preconditions cai em grupo inteiro de fixtures do mesmo tipo de código (ex.: todas as fixtures O-B perdem S3 em todos os runs), sugerindo quebra na `matrix.json` ou no selector.
4. **Alteração no motor ou selector:** qualquer mudança em `preconditions/select.ts`, `preconditions/matrix.json` ou no prompt de Step 6-7 exige validação seletiva de preconditions antes de promover baseline.

### 5.2 Critérios de não-bloqueio

Release **não deve ser bloqueada** quando:

- P/O/A/ERC estão corretos em todos os runs.
- Precondition recall parcial é explicado por múltiplas causas plausíveis não presentes no relato.
- `top_preconditions` da fixture inclui fatores não mencionados explicitamente no relato (inflação de top_preconditions na fixture).
- Divergência é apenas de ordenação — mesmas pré-condições em ordem diferente.
- Recall de 60% ou mais em fixtures novas sem regressão comparativa ao baseline anterior.
- Pré-condição alternativa plausível retornada em substituição à esperada.

### 5.3 Situação atual (v0.1.2)

Para v0.1.2-B, nenhum critério de bloqueio automático está implementado. A política acima é **proposta documental** — não entra em vigor no runner até ser aprovada e implementada.

---

## 6. Métricas Recomendadas

### 6.1 Métricas atuais

| Métrica | Calculada? | Usa para overall? | Reportada? |
|---|---|---|---|
| `overall_accuracy` (P/O/A/ERC) | Sim | Sim — determina overall | Sim |
| `precondition_recall` | Sim | Não | Sim (por fixture) |
| `determinism_rate` | Sim | Não | Sim (por grupo) |

### 6.2 Métricas a criar no runner (proposta futura)

| Métrica | Definição | Prioridade |
|---|---|---|
| `precondition_noise_rate` | Proporção de runs com pelo menos uma precondition Noise | Alta |
| `precondition_critical_recall` | Recall apenas das preconditions de classe Critical | Alta |
| `precondition_recall_by_group` | Recall médio por grupo de código (O-B, O-C, etc.) | Média |
| `precondition_stability` | Consistência da seleção de preconditions entre runs | Média |

### 6.3 Separação de relatório

O runner deve gerar (futuramente) um relatório separado de preconditions que não misture `overall` com `precondition_recall`. O investigador deve poder ler: "fixture PASS em P/O/A/ERC; recall de preconditions: 60%; pré-condições ausentes: [lista]".

---

## 7. Implicações para o Runner

**Regra atual:** não alterar o runner antes desta política estar aprovada (conforme `docs/SERA_V0_1_2_PLAN.md`).

### 7.1 Mudanças futuras recomendadas (sem implementar agora)

1. **Campo `precondition_policy` por fixture:** permitir marcação `"precondition_policy": "critical" | "advisory" | "skip"` para controlar comportamento do runner por fixture.
2. **Grupos de preconditions por classe:** suporte a `"precondition_class": "critical" | "expected" | "optional"` em cada item de `top_preconditions`.
3. **Cálculo de recall por classe:** `critical_recall`, `expected_recall`, `optional_recall` separados.
4. **Relatório de preconditions desacoplado:** não misturar `precondition_fail` com `overall_fail` sem política explícita.
5. **Detecção de noise:** flag quando precondition retornada não tem match lexical mínimo no relato.

### 7.2 Sequência recomendada de implementação

1. Aprovar esta política (v0.1.2-B).
2. Marcar fixtures precondition-critical (v0.1.2-B).
3. Propor e validar correção em `matrix.json` para O-C não-protetivo (v0.1.2-C ou posterior — issue EVM-001).
4. Implementar campo `precondition_policy` no runner (v0.1.2-C ou posterior).
5. Calcular `precondition_critical_recall` no relatório (v0.1.2-C ou posterior).
6. Implementar detecção de noise (v0.1.3 ou posterior).

---

## 8. Implicações para Fixtures

### 8.1 Fixtures existentes (não alterar retroativamente)

- Fixtures da baseline v0.1.1 não devem ter `top_preconditions` alterados sem decisão metodológica explícita.
- Alteração retroativa de `top_preconditions` para fazer recall subir é proibida — equivale a ajustar a régua.
- Se uma fixture existente tiver `top_preconditions` inflado (fatores não evidenciados no relato), a correção deve ser proposta como mudança metodológica documentada, não como ajuste silencioso.

### 8.2 Novas fixtures (v0.1.2 em diante)

- Novas fixtures podem declarar `top_preconditions` com anotação de classe por item (quando o runner suportar).
- Fixtures de O-C não-protetivo devem ter `top_preconditions` que não dependem do vocabulário protetivo de S1 (`matrix.json` — regra `O-C__A-A`).
- Fixtures precondition-critical devem ter evidência textual explícita no relato para cada precondition marcada como Critical.
- Evitar `top_preconditions` inflados: listas longas sem ancoragem textual prejudicam o recall sem razão metodológica.

### 8.3 Inconsistência candidata a correção na `matrix.json` (issue EVM-001)

A regra `O-C__A-A` é candidata a ampliação para cobrir O-C não-protetivo (requer validação seletiva antes de implementar — ver Apêndice do SERA_CODE_EVIDENCE_MATRIX_DRAFT_v0.1.2.md):
- S1 atual: `["passageiro", "paciente", "pessoa", "equipe", "medica", "doente"]`
- S1 proposta: adicionar `["pressao propria", "julgamento proprio", "decisao individual", "pontual", "sem autorizacao"]`
- P2 atual: `["decidiu", "aceitou", "julgou", "priorizou"]` — já adequado para O-C não-protetivo.
- O3 atual: `["procedimento", "autorizacao", "padrao", "controle"]` — já adequado.
- T1 atual: `["urgencia", "emergencia", "tempo", "agravamento", "imediato", "necessidade medica", "infarto"]` — enviesado para emergência médica; adicionar `["pressao de tempo", "pressao auto-imposta", "concluir antes", "fin do turno"]`.

Esta correção requer validação seletiva antes de ser promovida.

---

## 9. Critérios de Aceite Futuros

Para que a política de preconditions seja considerada operacional (não apenas documental), os seguintes critérios devem ser atendidos:

| Critério | Estado atual | Estado alvo |
|---|---|---|
| Política documentada | ✅ Este documento | — |
| Pelo menos 3 fixtures marcadas como precondition-critical | ❌ Não implementado | v0.1.2-B |
| `matrix.json` corrigida para O-C não-protetivo | ❌ Não implementado | v0.1.2-C ou posterior — issue EVM-001 |
| Runner com campo `precondition_policy` por fixture | ❌ Não implementado | v0.1.2-C |
| `precondition_critical_recall` no relatório | ❌ Não implementado | v0.1.2-C |
| Detecção de noise | ❌ Não implementado | v0.1.3 |
| Plano de migração incremental documentado | ✅ Seção 7.2 acima | — |
| Nenhum impacto na baseline v0.1.1 | ✅ — política documental | — |

---

## 10. Decisão v0.1.2

### 10.1 Decisão registrada

Para v0.1.2-B:

> **Preconditions continuam como métrica secundária. Nenhuma alteração automática no `overall`. O runner não é alterado nesta fase. Esta política é documental e serve de base para implementação futura.**

### 10.2 Próximos passos autorizados em v0.1.2-B

1. Publicar este documento.
2. Publicar `docs/SERA_CODE_EVIDENCE_MATRIX_DRAFT_v0.1.2.md`.
3. Anotar nos metadados de fixtures qual(is) são candidatas a `precondition-critical` (sem alterar os arquivos JSON ainda).
4. Registrar a inconsistência de `matrix.json` para O-C não-protetivo como issue aberta.

### 10.3 O que não fazer em v0.1.2-B

- Não alterar `preconditions/matrix.json` ainda — requer validação seletiva.
- Não alterar `preconditions/select.ts`.
- Não alterar o runner para usar precondition como bloqueio de overall.
- Não alterar fixtures existentes para melhorar recall.
- Não promover novo baseline por conta desta fase documental.
