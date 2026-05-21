# SERA A3 — Consolidação da Auditoria Metodológica
## Governança Hendy-first, Papel de Daumas e Decisão de Arquitetura

**Versão:** v0.1.4-A3-a-final
**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-a-final
**Tipo:** Consolidação de governança — sem alteração de código, fixtures, candidates, baseline ou reports
**Fontes:** Revisão crítica Opus, auditoria empírica A3-a-mini, documentos A2-i a A2-n

---

**Nota pós-A3-b/A3-c:** este documento é uma consolidação A3-a-final pré-A3-b. Posteriormente, A3-b implementou `decision_trace`/`preconditions_trace` mínimos e A3-c formalizou `ADAPTATION_NOTES`. As recomendações de A3-b/A3-c neste texto devem ser lidas como histórico de decisão, não como tarefas pendentes.

## 1. Resumo Executivo

Esta consolidação integra três insumos — a revisão crítica Opus da auditoria A3, a auditoria empírica do código (A3-a-mini) e os documentos de cada fase A2 — para estabelecer a governança metodológica correta do HFA/SERA.

**Posição central:**

O SERA de Hendy define a **lógica causal original**. Daumas a **aplica e operacionaliza** no contexto offshore/MDC. O HFA/SERA a **implementa computacionalmente**, aproveitando ambos, documentando suas adaptações próprias.

**Estado atual:**

| Dimensão | Status |
|---|---|
| Resultado técnico A2 | A2-n (`N_RUNS=1`): 12/13 P/O/A, `FAIL=0`, `determinism_rate=100%`; A2-o (`N_RUNS=3`): 39 runs, `FAIL=0`, `ERROR=0`, `determinism_rate=92,3%` |
| Promoção para baseline metodológico oficial | NÃO AUTORIZADA |
| Implementação explícita de Step 1/2 de Hendy | AUSENTE |
| Ladders interrogativas com question IDs | AUSENTE — gates + LLM fallback |
| Preconditions por trace causal | AUSENTE — lookup por código P/O/A/ERC |
| decision_trace estruturado | AUSENTE no recorte A3-a; parcialmente endereçado em A3-b |
| Papel de Daumas documentado formalmente | AUSENTE (corrigido neste documento) |
| Próximo passo recomendado (histórico) | A3-b foi implementada; após A3-c, resolver pendências de ambiente/typecheck antes da próxima fase de código |

---

## 2. Governança Metodológica

### 2.1 Hendy como fonte primária da lógica original

Hendy (2003) define a estrutura lógica e causal do SERA:

- **IP/PCT** (Intentions, Perceptions, Capabilities, Tasks): o framework cognitivo que fundamenta a análise de unsafe acts.
- **Departure from safe operation**: o ponto de fuga como evento focal da análise.
- **Distinção unsafe act / unsafe condition**: ato humano vs. condição latente como categorias analíticas.
- **As três perguntas**: O que o operador queria alcançar (goal)? O que percebeu (perception)? Que ação executou (action)? Respondidas sequencialmente antes das ladders.
- **Active failures**: as falhas classificáveis pelos três eixos.
- **Preconditions**: condições latentes derivadas da active failure identificada, não inferidas genericamente.
- **Decision aid sequencial**: ferramenta de apoio à análise, não um algoritmo de classificação automática.
- **ERC (Error Recovery Characteristics)**: métrica de detectabilidade/reversibilidade, referência Hendy 2003.

Hendy prevalece em qualquer conflito conceitual direto com Daumas ou com adaptações HFA.

### 2.2 Daumas como operacionalização e melhoria aplicada

Daumas não é uma fonte secundária fraca. Daumas é a **aplicação prática do SERA no contexto offshore/MDC** e contribui com:

- **Tradução** dos conceitos Hendy para português e para linguagem operacional.
- **Organização prática** das etapas, níveis, nomes e códigos para facilitar aplicação em investigação real.
- **Instrumentação** via MDC (Método de Diagnóstico de Causas) para elicitação e aprofundamento narrativo — não como substituto do SERA, mas como técnica complementar de investigação.
- **Codificação sistemática** das falhas ativas (P-A/P-B/.../P-H, O-A/O-B/O-C/O-D, A-A/A-B/.../A-J) que torna a metodologia tabulável, comparável entre eventos e utilizável para dashboard, banco de dados, relatório e treinamento.
- **Separação didática das etapas** que facilita o ensino e a auditoria da análise.
- **Melhoras de aplicabilidade** que preservam a lógica causal de Hendy enquanto aumentam a usabilidade prática.

Quando Daumas apenas traduz, organiza ou melhora a aplicação sem romper a lógica de Hendy, o HFA/SERA pode e deve seguir Daumas.

### 2.3 HFA/SERA como implementação computacional auditável

O HFA/SERA implementa o SERA computacionalmente. Suas responsabilidades de governança são:

1. **Rastrear a origem de cada decisão de classificação**: o que vem de Hendy, o que vem de Daumas, o que é adaptação HFA própria.
2. **Documentar ADAPTATION_NOTES** para todas as adaptações computacionais relevantes.
3. **Não promover para baseline metodológico** o que ainda não tem rastreabilidade suficiente.
4. **Calibrar empiricamente** através de fixtures, mas reconhecer que fixtures não são fontes metodológicas.

### 2.4 Fixtures e candidates como instrumentos de teste

Fixtures e candidates são **instrumentos de teste**, não fontes metodológicas. Sua função é verificar se o motor se comporta de acordo com a metodologia documentada. A relação de derivação é:

```
Hendy/Daumas → Metodologia → Motor → Fixtures (verificam o motor)
```

Não:

```
Fixtures → Motor → Metodologia
```

Se um fixture estiver em conflito com a metodologia, o fixture precisa ser revisado, não a metodologia adaptada ao fixture.

### 2.5 Regras de precedência

| Situação | Regra |
|---|---|
| Conflito conceitual direto Hendy vs. Daumas | Hendy prevalece |
| Daumas apenas traduz ou nomeia conceito Hendy | Daumas pode ser seguido |
| Daumas organiza/melhora aplicação sem romper Hendy | Daumas pode e deve ser seguido |
| HFA introduz adaptação computacional sem fonte clara | Registrar como HFA_ADAPTATION_REQUIRES_NOTE |
| Fixture diverge da metodologia documentada | Revisar o fixture, não adaptar a metodologia |

---

## 3. Papel Específico de Daumas no HFA/SERA

### 3.1 DAUMAS_TRANSLATION — O que Daumas traduz

- "Departure from safe operation" → "Ponto de Desvio da Operação Segura" (documentado em `Point.json`)
- "Goal / Perception / Action" → "Objetivo / Percepção / Ação" (eixos P/O/A)
- "Active failure" → "Falha ativa"
- "Precondition" → "Pré-condição"

### 3.2 DAUMAS_OPERATIONALIZATION — O que Daumas organiza

Os **códigos alfabéticos internos P-A/O-A/A-A** e toda a taxonomia de falhas ativas (P-A a P-H, O-A a O-D, A-A a A-J) vêm da operacionalização Daumas/HFA, não da nomenclatura original de Hendy.

Hendy define as categorias e ladders; Daumas e HFA atribuem códigos, nomes e números às falhas dentro dessas categorias para fins de tabulação, banco de dados e comparação.

Essa codificação é **útil e deve ser mantida**, desde que mapeada explicitamente para as categorias e lógica de Hendy.

As categorias de preconditions P1–P7, T1–T2, W1–W3, S1–S3, O1–O6 (em `Pre-Conditions.json`) são compatíveis com a taxonomia de Hendy (Personnel, Task, Workplace, Supervision/Command/Control, Organisation) — essa compatibilidade é um ponto forte da implementação atual.

### 3.3 DAUMAS_APPLIED_IMPROVEMENT — O que Daumas melhora para aplicação

- **Separação didática das etapas**: HFA Steps 1–6/7 como estrutura de análise sequencial, ensinável e auditável.
- **MDC como técnica de elicitação**: para casos onde a narrativa é incompleta, o MDC (Método de Diagnóstico de Causas) oferece uma estrutura de perguntas para aprofundar o relato. Não substitui o SERA — é uma ferramenta de preparação da narrativa antes da análise.
- **Nomes descritivos das falhas** como "P-C: Déficit de Conhecimento", "A-G: Falha de Supervisão de Delegação" — facilitam comunicação entre analistas, treinamento e apresentação de resultados.
- **A-A como código de ação coerente com percepção incorreta**: a distinção A-A (ação coerente com percepção incorreta) vs. A-B (omissão procedural independente) é uma melhoria aplicada que aumenta a precisão diagnóstica sem romper a lógica de Hendy. Confirmada empiricamente em A2-n como clinicamente relevante.

### 3.4 MDC: posição correta

O MDC de Daumas é uma técnica de **elicitação e aprofundamento narrativo** — uma sequência estruturada de perguntas para extrair mais informação do relato antes ou durante a análise SERA. Não é um substituto para o SERA nem uma fonte das ladders de classificação.

---

## 4. Resultado Técnico A2 (A2-n e A2-o)

### 4.1 Status consolidado

O motor atingiu os seguintes resultados:

**A2-n (candidate-only `N_RUNS=1`):**

| Métrica | Valor |
|---|---|
| P/O/A corretos | 12/13 |
| PASS (P/O/A + ERC corretos) | 5 |
| PARTIAL (apenas ERC divergente) | 8 |
| FAIL | 0 |
| ERROR | 0 |
| determinism_rate | 100% |
| Divergência remanescente | A0-CHK-002-ADJ: P-A actual vs P-D expected (MOVE_TO_EXPLORATORY) |

**A2-o (candidate-only `N_RUNS=3`):**
- 13 fixtures × 3 = 39 runs
- `FAIL=0`
- `ERROR=0`
- `determinism_rate=92,3%`
- estabilidade técnica dos anchors confirmada, sem autorizar baseline metodológico

### 4.2 Trajetória A2

| Fase | Problema resolvido | P/O/A corretos |
|---|---|---|
| A2-i | O-C awareness estrito (A0-DAUMAS-E02-A) | ~4/13 |
| A2-j | P-C/A-E knowledge-gap automação (A0-AUTO-001, A0-DAUMAS-E01-B) | ~6/13 |
| A2-k | P-D/A-H temporal pressure / atenção capturada (A0-AUTO-003, A0-DAUMAS-E02-B) | ~6/13 |
| A2-l | A-G feedback/check explícito (A0-CHK-003, A0-AUTO-004-ADJ) | ~6/13 |
| A2-m | P-H conflito multi-fonte + P-G monitoramento/checklist/fuel (VIS-004-ADJ, VIS-005, CHK-003, FUEL-002) | 7/13 |
| A2-n | A-A vs A-B perception-anchored (CHK-001, FUEL-002, VIS-003, VIS-004-ADJ, VIS-005) | **12/13** |

### 4.3 Por que A2 não é baseline metodológico

Sucesso técnico em fixtures não equivale a validação metodológica. As razões específicas:

1. A maior parte das fixtures foi criada iterativamente durante o processo de calibração — há risco de circularidade entre motor e fixtures.
2. O motor implementa Hendy de forma implícita e parcial (ver seção 7).
3. As preconditions são derivadas por lookup, não por trace causal.
4. A2-o submeteu candidate-only `N_RUNS=3` e confirmou estabilidade técnica (0 FAIL/ERROR), mas isso não elimina os gaps metodológicos estruturais.
5. Decisão Opus: confirmar empiricamente Step 1/2 e preconditions antes de qualquer promoção.

---

## 5. Correção Conceitual: Eixos Percepção/Objetivo/Ação

### 5.1 Origem dos eixos

Os **eixos Percepção / Objetivo / Ação** derivam diretamente das **três perguntas de Hendy**:

1. O que o operador queria alcançar? → **Objetivo**
2. O que o operador percebeu no momento do ato? → **Percepção**
3. Que ação o operador executou? → **Ação**

Essas três perguntas são o ponto de entrada para as ladders de classificação. Essa estrutura é de Hendy — não é uma contribuição de Daumas ou do HFA.

### 5.2 Origem dos códigos internos

Os **códigos P-A/P-B/.../P-H, O-A/O-B/O-C/O-D, A-A/A-B/.../A-J** são uma **operacionalização Daumas/HFA**. Eles nomeiam e tabelam as falhas dentro dos eixos de Hendy, mas não existem com essa nomenclatura em Hendy 2003.

### 5.3 Implicação para documentação

Todo documento e relatório HFA/SERA deve deixar claro que:

- Os eixos P/O/A são de Hendy.
- Os códigos internos (P-A, O-C, A-J, etc.) são da operacionalização Daumas/HFA.
- ERC como métrica é de Hendy 2003.
- A taxonomia de preconditions (P1–P7, T1–T2, W1–W3, S1–S3, O1–O6) é compatível com Hendy e operacionalizada por Daumas/HFA.

---

## 6. Achados da Revisão Opus

### 6.1 Pontos confirmados pela auditoria empírica

| Achado Opus | Confirmação A3-a-mini |
|---|---|
| Hendy-first está correto | Confirmado — a lógica causal do SERA é de Hendy |
| Eixos P/O/A derivam das três perguntas de Hendy | Confirmado — são as três perguntas formuladas por Hendy |
| Step 1/2 ausentes ou colapsados | Confirmado — HFA Step 1 é metadados; Hendy Step 2 não existe como etapa explícita |
| Preconditions como camada decorativa se forem LLM/tags | Confirmado parcialmente — são lookup de código P/O/A/ERC, não causal chain |
| LLM como classificadora livre | Confirmado para o fallback path — gates determinísticos precedem, mas casos sem match vão ao LLM sem estrutura formal de ladder |
| Gates lexicais sem ancoragem causal | Confirmado — funções `evidenceOf*()` são heurísticas lexicais, não rastreamento causal |
| Ator direto como base dos anti-gates | Confirmado — `isMaintainenceOrOrganizationalAgent()` existe mas não está exposto no output |

### 6.2 Pontos parciais ou com nuance

| Achado Opus | Nuance |
|---|---|
| O-C awareness estrito como adaptação | Correto — é explicitamente HFA_ADAPTATION. A regra de 4 blocos simultâneos é mais restritiva do que Hendy exige. É conservadora na direção certa, mas precisa de ADAPTATION_NOTE |
| Codes alfabéticos P-A/O-A/A-A vêm de Daumas/HFA, não de Hendy | Correto — confirmado. Daumas organiza e nomeia; Hendy define as categorias lógicas |
| Daumas é aplicação secundária | CORRIGIDO neste documento — Daumas é operacionalização aplicada com valor próprio, não apenas uma fonte fraca |

### 6.3 Riscos prioritários (mantidos)

Os cinco riscos identificados pela revisão Opus permanecem válidos após a auditoria empírica:

1. **Step 1/2 ausentes ou colapsados**: confirmado. HFA Step 2 aproxima o Hendy Step 1; Hendy Step 2 (goal/perception/action statements pré-ladder) não existe.
2. **Preconditions como lookup**: confirmado. `matrix.json` é "HFA fixture-derived operationalization" — depende da qualidade dos fixtures, não de análise causal.
3. **LLM como classificadora livre**: confirmado para o fallback path. Quando nenhum gate dispara, o LLM responde nós sim/não sem estrutura de ladder formal.
4. **Gates lexicais sem ancoragem causal**: confirmado. As funções `evidenceOf*()` detectam tokens no texto normalizado — úteis e calibradas, mas não rastreiam causalidade.
5. **Anti-gates de supervisão/manutenção dependem de ator direto**: confirmado. `isMaintainenceOrOrganizationalAgent()` guia gates internos mas não é exposto — se a identificação do agente no Step 2 for errada, os anti-gates falham silenciosamente.

### 6.4 Recomendação Opus — posição

A recomendação Opus de não promover baseline, confirmar empiricamente Step 1/2 e preconditions antes de avançar para decision_trace, é mantida e endossada.

A auditoria A3-a-mini confirmou empiricamente os pontos que a revisão Opus levantou como hipóteses. Historicamente, o próximo passo foi A3-b (rastreabilidade mínima), já implementada posteriormente.

---

## 7. Achados da Auditoria Empírica de Código (A3-a-mini)

### 7.1 HFA Step 1 é extração de metadados, não Hendy Step 1

`runStep1` (L1799, `all-steps.ts`) extrai: `summary`, `event_date`, `event_location`, `operation_type`, `occupants_count`, `flight_phase`, `weather_conditions`, `systems_involved`. É um extrator de contexto factual do relato, não uma identificação de departure point.

**Impacto:** A numeração de steps no HFA não corresponde à numeração de steps de Hendy. Isso não é um problema funcional, mas é um risco de comunicação e governança.

### 7.2 HFA Step 2 aproxima o Hendy Step 1

`runStep2` (L1841, `all-steps.ts`) produz: `agente`, `ato_inseguro_factual`, `momento`, `justificativa`. É a identificação do "Ponto de Desvio da Operação Segura" (conforme `Point.json`). Captura o ator, o ato observável e o momento — elementos centrais do Hendy Step 1.

Limitações: não distingue unsafe act de unsafe condition; o campo `agente` não é explicitamente classificado como direto vs. supervisório no output.

### 7.3 Hendy Step 2 (goal/perception/action statements) não existe como etapa explícita

As três perguntas de Hendy não são respondidas como statements afirmativos antes de entrar nas ladders. Elas são respondidas **durante** a classificação nos Steps 3/4/5:
- goal → implícito no `objetivo_code` + `objective_justification`
- perception → implícito no `perception_code` + `perception_justification`
- action → implícito no `action_code` + `action_justification` (e parcialmente em `unsafe_act`)

Isso não compromete o resultado da classificação, mas elimina a camada de interpretação intermediária registrável que Hendy prevê.

### 7.4 Steps 3–5 são gates determinísticos + LLM fallback, não ladders interrogativas puras

A arquitetura real de cada step é:

```
[gate 1: evidenceOf*() → código imediato] →
[gate 2: evidenceOf*() → código imediato] →
... (10–15 gates) ...
[nenhum gate disparou → LLM nó 0 sim/não → nó 1 sim/não → ...]
```

Na maioria dos casos de fixtures calibrados, o resultado vem de um gate determinístico, não dos nós LLM.

**Implicação:** A pergunta "o motor passou pela ladder de Hendy?" não tem uma resposta única — depende de qual caminho foi percorrido para aquele caso específico. Sem `decision_trace`, não é possível saber.

### 7.5 Preconditions derivadas por lookup P/O/A/ERC, não por trace causal active_failure → precondition → evidence

O mecanismo determinístico (`selectDeterministicPreconditions()`) usa `matrix.json` com regras do tipo "se action_code = A-D → preconditions W1, W2, P1, O2, O4". A fonte declarada do matrix é "HFA fixture-derived operationalization of SERA/Hendy/Daumas preconditions".

O mecanismo LLM (`runStep6_7()`) pede ao LLM que gere preconditions com evidência direta no relato.

Ambos os mecanismos produzem preconditions funcionais. Nenhum dos dois produz um trace explícito `active_failure → precondition → evidence`.

**Implicação:** A validade das preconditions depende da qualidade do matrix (mecanismo determinístico) ou da instrução ao LLM (mecanismo LLM). Sem preconditions_trace, não é possível auditar de onde veio cada precondition em um caso específico.

### 7.6 Output/schema: lacunas de rastreabilidade confirmadas

| Campo ausente | Impacto |
|---|---|
| `unsafe_condition` | Não é possível distinguir unsafe act de unsafe condition nas análises |
| `direct_actor` | A separação ator direto / supervisão é interna, não auditável externamente |
| `goal_statement` | Nenhuma formulação pré-ladder do objetivo do operador |
| `perception_statement` | Nenhuma formulação pré-ladder do que o operador percebeu |
| `action_statement` | Apenas `unsafe_act` como proxy aproximado |
| `decision_trace` | Não é possível saber se o código veio de gate determinístico, infer function ou LLM |
| `preconditions_trace` | `sourceRuleId` existe internamente mas é descartado; sem vínculo explícito active_failure → precondition |
| `unanswered_questions` | "DADO INSUFICIENTE" é forçado para branch Não; sistema sempre classifica |

---

## 8. Classificação dos Desvios

### DAUMAS_OPERATIONALIZATION
- Códigos P-A/P-B/.../P-H, O-A/O-B/O-C/O-D, A-A/A-B/.../A-J como taxonomia de falhas ativas.
- Categorias P1–P7, T1–T2, W1–W3, S1–S3, O1–O6 como taxonomia de preconditions.
- Separação das análises de percepção, objetivo e ação como steps numerados.
- Nomes descritivos de falhas (ex: "P-C: Déficit de Conhecimento para Interpretação").

### DAUMAS_APPLIED_IMPROVEMENT
- Distinção A-A (coerente com percepção incorreta) vs. A-B (omissão procedural independente): melhoria diagnóstica confirmada empiricamente em A2-n.
- Estrutura de nós sim/não nos LLM fallback paths: preserva o espírito interrogativo das ladders de Hendy no path não-determinístico.
- Point.json como definição operacional do ponto de fuga: captura a essência do Hendy Step 1 em formato aplicável.

### HFA_ADAPTATION_REQUIRES_NOTE
1. **HFA Step 1 ≠ Hendy Step 1**: terminologia inconsistente; Hendy Step 1 está no HFA Step 2.
2. **Hendy Step 2 colapsado**: goal/perception/action statements não existem como etapa explícita pré-ladder.
3. **unsafe_act como único campo sem `unsafe_condition`**: o campo `ato_inseguro_factual` captura ambos sem distinguir.
4. **Ator direto não exposto no output**: `isMaintainenceOrOrganizationalAgent()` existe internamente mas `unsafe_agent` no payload não discrimina nível hierárquico.
5. **Preconditions por lookup P/O/A/ERC**: derivação funcional mas sem trace causal explícito.
6. **`sourceRuleId` descartado**: vínculo precondition ↔ regra não persiste no output.
7. **O-C awareness estrito (4 blocos lexicais)**: mais restritivo que Hendy exige; calibrado para reduzir falsos positivos, mas representa uma adaptação HFA.

### TECHNICAL_HEURISTIC
1. **Gates determinísticos `evidenceOf*()`**: heurísticas lexicais sobre texto normalizado, funcionalmente calibradas, sem ancoragem causal explícita.
2. **`infer*()` functions em `pipeline.ts`**: segunda camada de fallback heurístico (keyword-matching) quando o output do LLM não é válido.
3. **A-A vs A-B: `evidenceOfPerceptionAnchoredCoherentAction()`**: três blocos lexicais simultâneos. Calibração empírica em A2-n confirma adequação para os fixtures atuais; não é uma análise causal explícita.
4. **O-C awareness: quatro blocos simultâneos obrigatórios**: heurística restritiva calibrada para fixtures com awareness lexical explícita.
5. **P-D: `evidenceOfSpeedManagementAttentionCapture()`**: dois blocos (velocidade degradando + atenção capturada por proximidade), específico ao contexto de plataforma offshore.
6. **P-H conflito multi-fonte: `evidenceOfConflictingOperationalInformation()`**: dois blocos (multi-source + conflito não resolvido), calibrado para fixtures de conflito radar/visual.
7. **`DADO INSUFICIENTE` como branch Não**: evidência insuficiente não produz estado estruturado; o sistema sempre classifica.

### GAP
1. `unsafe_condition` ausente em toda a stack.
2. `goal_statement`, `perception_statement`, `action_statement` ausentes antes das ladders.
3. `decision_trace` estruturado ausente: não é possível saber o caminho percorrido por cada análise.
4. `preconditions_trace` ausente: vínculo `active_failure → precondition → evidence` implícito, não estruturado.
5. `unanswered_questions` ausente: sem estado de "classificação inconclusiva".

---

## 9. Adaptações que Devem Receber ADAPTATION_NOTE

Cada item abaixo deve ser formalmente documentado como ADAPTATION_NOTE antes de qualquer uso metodológico externo dos dados HFA/SERA:

| Adaptação | Classificação | Impacto |
|---|---|---|
| HFA Step 1 = metadados (não Hendy Step 1) | HFA_ADAPTATION_REQUIRES_NOTE | Terminologia inconsistente com Hendy |
| HFA Step 2 = escape point (≈ Hendy Step 1) | HFA_ADAPTATION_REQUIRES_NOTE | Renumeração; Hendy Step 2 (statements) ausente |
| Ausência de goal/perception/action statements pré-ladder | HFA_ADAPTATION_REQUIRES_NOTE | Rastreabilidade pré-ladder ausente |
| O-C awareness estrito: 4 blocos lexicais obrigatórios | HFA_ADAPTATION_REQUIRES_NOTE | Mais restritivo que Hendy; pode excluir O-C válidos |
| A-A vs A-B perception-anchored: 3 blocos + negação física | TECHNICAL_HEURISTIC → documentar | Calibração empírica, não derivação causal |
| P-H conflito multi-fonte: 2 blocos lexicais | TECHNICAL_HEURISTIC → documentar | Extensão HFA do conceito de canal de informação |
| P-G: monitoramento/checklist/fuel com termos adicionados | TECHNICAL_HEURISTIC → documentar | Termos adicionados iterativamente em A2-m |
| P-D/A-H: velocidade degradando + atenção capturada por plataforma | TECHNICAL_HEURISTIC → documentar | Específico a contexto offshore, não genérico |
| Anti-gates supervisão/manutenção dependentes de ator direto | HFA_ADAPTATION_REQUIRES_NOTE | Falha silenciosa se agente for identificado erroneamente |
| Preconditions por lookup matrix.json (P/O/A/ERC) | HFA_ADAPTATION_REQUIRES_NOTE | Fixture-derived; sem trace causal explícito |
| LLM fallback sem estrutura de ladder formal | TECHNICAL_HEURISTIC → documentar | Comportamento variável para casos sem gate determinístico |

---

## 10. Decisão de Arquitetura (Histórico)

### 10.1 Não reescrever o motor agora

No recorte A3-a, o motor estava tecnicamente estável em A2-n (12/13 P/O/A, `FAIL=0`, `determinism_rate=100%` em `N_RUNS=1`). Posteriormente, A2-o confirmou em `N_RUNS=3` (39 runs) `FAIL=0`, `ERROR=0` e `determinism_rate=92,3%`. Reescrever a arquitetura de gates para ladders interrogativas com question IDs, ou adicionar uma etapa de extração de goal/perception/action statements, continua sendo mudança de alto impacto que requer nova campanha de fixtures e validação extensiva.

Essas mudanças são desejáveis no longo prazo, mas não agora.

### 10.2 Não promover baseline agora

O baseline oficial exige que o motor implemente a metodologia de forma rastreável e documentada. As lacunas de rastreabilidade identificadas no recorte A3-a foram parcialmente endereçadas em A3-b (`decision_trace`/`preconditions_trace` mínimos), mas permanecem abertas lacunas estruturais (Hendy Step 2 explícito, question_trace completo, preconditions causal trace) antes de qualquer promoção de baseline.

### 10.3 Histórico A3-b: decision_trace mínimo sem alterar classificação

A3-b foi implementada com escopo cirúrgico: adicionar rastreabilidade ao que já existe, sem alterar a lógica de classificação.

O objetivo é que, para cada análise, seja possível saber:
- Para cada código P/O/A: o resultado veio de gate determinístico, infer function ou nó LLM?
- Para cada precondition: de qual regra do matrix.json ela veio?
- Há incerteza ou flag de confiança baixa?

Isso resolve a lacuna mais urgente (auditabilidade) sem nenhuma mudança de comportamento classificatório.

### 10.4 Preservar o que funcionou tecnicamente em A2

As correções de A2-i a A2-n (O-C awareness, P-C/A-E, P-D/A-H, A-G, P-H, P-G, A-A/A-B) são tecnicamente estáveis e devem ser preservadas. Seu status metodológico é TECHNICAL_HEURISTIC ou HFA_ADAPTATION_REQUIRES_NOTE — funcionam empiricamente e A3-b preservou esse comportamento.

---

## 11. Escopo Recomendado para A3-b

### Dentro do escopo

1. **Adicionar `decision_trace` ao payload** (`buildAnalysisUpsertPayload`):
   - Para cada step (3, 4, 5): `{ step: 3, source: 'deterministic_gate' | 'infer_function' | 'llm_node', gate_name: '...' }`
   - Sem alterar lógica de classificação — apenas registrar qual caminho foi percorrido.

2. **Preservar `sourceRuleId` nas preconditions**:
   - Expor `sourceRuleId` no campo `preconditions` do payload.
   - Implementação mínima: adicionar campo ao `normPrecondition()` e ao tipo de precondition.

3. **Adicionar `preconditions_mechanism`** por precondition:
   - `'deterministic'` (veio de `selectDeterministicPreconditions`) ou `'llm'` (veio de `runStep6_7`).

4. **Registrar `confidence` quando disponível**:
   - Para nós LLM: se a justificativa contém "DADO INSUFICIENTE", registrar `confidence: 'low'`.
   - Para gates determinísticos: `confidence: 'high'` (por definição).

5. **Adicionar ADAPTATION_NOTES formais** aos documentos de referência metodológica.
   - Não requer alteração de código.

### Fora do escopo para A3-b

| Item | Motivo |
|---|---|
| Reimplementar ladders interrogativas com question IDs | Alto impacto; requer nova campanha de fixtures |
| Extrair goal/perception/action statements como etapa nova | Altera o pipeline; requer validação extensiva |
| Introduzir `unsafe_condition` como campo | Requer revisão de schema de banco; fase própria |
| Mudar motor P/O/A (lógica de classificação) | Fora de escopo por definição |
| Mudar expected dos candidates | Não autorizado sem decisão formal |
| Promover baseline | Bloqueado até rastreabilidade completa |
| Mudar schema de banco de dados | Fase própria (A3-f) |
| Reclassificar preconditions | Fora de escopo |
| Alterar Step 1/2 funcional | Fora de escopo |

---

## 12. Itens Fora de Escopo para A3-b (reiteração)

Reiterando explicitamente para evitar scope creep:

- Nenhuma alteração na lógica dos gates `evidenceOf*()`.
- Nenhuma alteração no `classifyObjectiveByRules()`.
- Nenhuma alteração nos prompts LLM de Step 1/2/3/4/5/6-7.
- Nenhuma alteração no `matrix.json` de preconditions.
- Nenhuma alteração nos fixtures, candidates ou baseline.
- Nenhum smoke global.
- Nenhum N_RUNS > 1.

---

## 13. Próximas Fases Propostas (Histórico)

| Fase | Foco | Pré-requisito |
|---|---|---|
| **A3-b** | `decision_trace` mínimo + `preconditions_trace` mínimo + ADAPTATION_NOTES formais | Este documento + auditoria A3-a-mini |
| **A3-c** | ADAPTATION_NOTES formais em todos os pontos identificados + mapeamento explícito de cada código para Hendy/Daumas/HFA | A3-b completo |
| **A3-d** | Estudo de viabilidade de Step 1/2 explicit statements: extrair goal/perception/action antes das ladders, com impacto no motor medido | A3-c completo + decisão humana |
| **A3-e** | Preconditions causal trace: revisar matrix.json com derivação explícita da cadeia active_failure → precondition → evidence | A3-d ou paralelo a A3-d |
| **A3-f** | Avaliação de `unsafe_condition` e `direct_actor` no schema de banco | A3-c + decisão de produto |
| **A3-g** | Avaliação de promoção de baseline | A3-b + A3-c completos + N_RUNS=3 candidate |

A ordem de A3-d, A3-e, A3-f pode ser ajustada por decisão humana conforme prioridade de negócio. Como A3-b e A3-c já foram executadas, o próximo passo prático é resolver pendências de ambiente/typecheck antes de nova fase de código e, depois, avançar para Step 1/2 explícitos ou preconditions causal trace conforme decisão humana.

---

## 14. Conclusão

A2 foi um **sucesso técnico**: em A2-n (`N_RUNS=1`), 12/13 P/O/A corretos com `FAIL=0` e `determinism_rate=100%`; em A2-o (`N_RUNS=3`), 39 runs com `FAIL=0`, `ERROR=0` e `determinism_rate=92,3%`, confirmando estabilidade técnica dos anchors sem promoção metodológica. As correções de A2-i a A2-n resolveram clusters específicos com precisão cirúrgica e sem regressões.

A2 **não é um baseline metodológico**: o motor implementa Hendy de forma implícita e parcial, as preconditions não têm trace causal, e a rastreabilidade das decisões de classificação é insuficiente para auditoria externa.

**Daumas não é uma fonte secundária fraca**. É a operacionalização aplicada do SERA no contexto offshore/MDC que torna a metodologia ensinável, tabulável, comparável e utilizável em banco de dados e dashboards. As melhorias de Daumas — especialmente a codificação sistemática das falhas e a separação didática das etapas — devem ser aproveitadas e mantidas quando preservam a lógica causal de Hendy.

**O próximo passo após A3-c é consolidar ambiente/typecheck antes de nova fase de código.** Com A3-b já implementada (`decision_trace`/`preconditions_trace` mínimos) e A3-c formalizada (ADAPTATION_NOTES), a evolução seguinte deve ser decidida entre Step 1/2 explícitos e preconditions causal trace, sem alterar classificações sem decisão humana explícita.

---

*Documento criado em 2026-05-21 como parte da fase SERA v0.1.4-A3-a-final. Nenhum código, fixture, candidate, baseline ou report foi alterado. Este documento é governança e consolidação read-only.*
