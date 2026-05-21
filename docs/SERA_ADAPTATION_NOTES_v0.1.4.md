# SERA Adaptation Notes
## Registro Formal de Desvios, Adaptações e Lacunas Metodológicas

**Versão:** v0.1.4-A3-c
**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-c — ADAPTATION_NOTES formais
**Tipo:** Documentação de governança — sem alteração de código, fixtures, candidates, baseline ou reports
**Fontes:** GOVERNANCE_RULES v0.1.4, A3_AUDIT_CONSOLIDATION v0.1.4, STEP1_STEP2_CODE_AUDIT v0.1.4, DECISION_TRACE_MINIMUM v0.1.4, documentos A2-i a A2-n

---

## 1. Resumo Executivo

Este documento registra, de forma rastreável e honesta, as adaptações metodológicas do HFA/SERA em relação à fonte primária (Hendy 2003) e à operacionalização aplicada (Daumas). Cada nota identifica o status metodológico, o risco associado, o impacto no motor e a mitigação disponível ou recomendada.

**Estado atual do motor:** tecnicamente estável (12/13 P/O/A corretos, FAIL=0, determinism_rate=100% na iteração A2-n). Não é baseline metodológico autorizado. A promoção para baseline requer rastreabilidade completa documentada neste e nos documentos precedentes.

**Hierarquia de autoridade:**

| Nível | Fonte | Papel |
|---|---|---|
| 1 | Hendy (2003) | Lógica causal original do SERA |
| 2 | Daumas | Operacionalização e melhoria aplicada no contexto offshore/MDC |
| 3 | HFA/SERA | Implementação computacional auditável |
| 4 | Fixtures / candidates | Instrumentos de teste — não definem metodologia |

Divergência conceitual direta entre Hendy e Daumas: **Hendy prevalece**.

---

## 2. Regra de Governança

**HFA/SERA não é classificador direto de relato para P/O/A.**

O SERA é uma ferramenta de investigação baseada em perguntas. O motor HFA/SERA implementa computacionalmente esse processo. Ele não deve receber um relato e produzir P/O/A como um classificador de texto.

**A relação de derivação correta é:**

```
Hendy/Daumas
  → Metodologia
    → Motor
      → Fixtures (verificam o motor)
```

Nunca o inverso. Se uma fixture divergir da metodologia documentada, revisar a fixture — não adaptar a metodologia à fixture.

**Fluxo obrigatório de análise (conforme Governance Rules):**

```
relato
→ ponto de fuga da operação segura
→ unsafe act / unsafe condition (distinção explícita)
→ ator direto
→ goal / perception / action statements (antes das ladders)
→ ladders SERA (percursos interrogativos por eixo)
→ active failure (classificação)
→ preconditions (derivadas da active failure)
→ ERC / risco
→ recomendações
→ decision_trace (rastro auditável)
```

Saltos ou colapsamentos documentados neste arquivo como `HFA_ADAPTATION_REQUIRES_NOTE` ou `GAP`.

---

## 3. Como Ler Estas ADAPTATION_NOTES

Cada nota contém:

- **ID e Tema:** identificador único e descrição do ponto de adaptação.
- **Status metodológico:** exatamente um dos status da lista oficial (seção 3.1).
- **Risco:** impacto na validade metodológica se o desvio não for reconhecido.
- **Impacto no motor:** o que o desvio afeta no comportamento atual do pipeline.
- **Mitigação atual:** o que já existe para limitar o risco.
- **Fase futura recomendada:** o que precisa ser feito para resolver ou documentar formalmente o desvio.

### 3.1 Status Metodológicos Oficiais

| Status | Significado |
|---|---|
| `SOURCE_DIRECT_HENDY` | Deriva diretamente e fielmente de Hendy |
| `SOURCE_INFERRED_FROM_HENDY` | Inferência razoável a partir de Hendy, não declaração explícita |
| `DAUMAS_TRANSLATION` | Tradução de conceito Hendy para português/operacional |
| `DAUMAS_OPERATIONALIZATION` | Organização prática, codificação ou tabulação por Daumas/HFA |
| `DAUMAS_APPLIED_IMPROVEMENT` | Melhoria aplicada por Daumas que preserva a lógica Hendy |
| `HFA_ADAPTATION_REQUIRES_NOTE` | Adaptação computacional HFA que se afasta de Hendy ou Daumas |
| `TECHNICAL_HEURISTIC` | Heurística técnica sem pretensão de fidelidade metodológica estrita |
| `GAP` | Lacuna — elemento Hendy ausente na implementação atual |
| `UNCONFIRMED` | Status incerto — requer verificação adicional |

---

## 4. Tabela-Resumo das Adaptações

| ID | Tema | Status | Risco | Prioridade | Fase Futura |
|---|---|---|---|---|---|
| AN-001 | Códigos alfabéticos P/O/A | `DAUMAS_OPERATIONALIZATION` | Baixo se mapeados a Hendy; médio se tratados como fonte original | P1 | Matriz explícita código → nó Hendy |
| AN-002 | HFA Step 1/Step 2 divergentes de Hendy | `HFA_ADAPTATION_REQUIRES_NOTE` + `GAP` | Alto | P0 | A3-d: Step 1/2 explicit statements |
| AN-003 | Gates + LLM fallback no lugar de ladders interrogativas | `TECHNICAL_HEURISTIC` / `HFA_ADAPTATION_REQUIRES_NOTE` | Médio/Alto | P0 | Evoluir para question_trace |
| AN-004 | O-C awareness estrito (4 blocos lexicais) | `HFA_ADAPTATION_REQUIRES_NOTE` | Médio (falso-negativo) | P1 | Revisão Hendy-first |
| AN-005 | A-A vs A-B perception-anchored | `SOURCE_INFERRED_FROM_HENDY` / `HFA_ADAPTATION_REQUIRES_NOTE` | Médio (apagar A-B real) | P1 | Preservar exclusões específicas |
| AN-006 | P-H conflito multi-fonte | `HFA_ADAPTATION_REQUIRES_NOTE` | Médio (lexicalização) | P1 | Transformar em perguntas causais |
| AN-007 | P-G monitoring/checklist/fuel | `UNCONFIRMED` / `HFA_ADAPTATION_REQUIRES_NOTE` | Médio (confusão P vs A) | P1 | decision_trace / question_trace |
| AN-008 | P-D/A-H pressão temporal lexical | `DAUMAS_APPLIED_IMPROVEMENT` + `TECHNICAL_HEURISTIC` | Médio (lexical sem causal) | P2 | Futura evidência causal de time pressure |
| AN-009 | Preconditions por lookup P/O/A/ERC ou LLM | `HFA_ADAPTATION_REQUIRES_NOTE` | Alto | P0 | A3-e: preconditions causal trace |
| AN-010 | LLM como classificadora em fallback | `TECHNICAL_HEURISTIC` / `HFA_ADAPTATION_REQUIRES_NOTE` | Alto | P0 | LLM responder perguntas internas com evidence/confidence/uncertainty |
| AN-011 | Anti-gates supervisão/manutenção | `HFA_ADAPTATION_REQUIRES_NOTE` | Médio (bloquear falha ativa legítima) | P1 | A3-f: direct_actor/actor_level |
| AN-012 | Candidates A2 como sucesso técnico, não baseline metodológico | `TECHNICAL_HEURISTIC` | Alto se tratado como baseline | P0 | A3-g: promoção de baseline com rastreabilidade completa |

---

## 5. ADAPTATION_NOTE-001 — Códigos Alfabéticos P/O/A

**ID:** AN-001
**Tema:** Origem e status dos códigos internos P-A/P-B/.../P-H, O-A/O-B/O-C/O-D, A-A/A-B/.../A-J

### Descrição

Os **eixos Percepção / Objetivo / Ação** derivam diretamente das três perguntas de Hendy (2003):

1. O que o operador queria alcançar? → **Objetivo**
2. O que o operador percebeu no momento do ato? → **Percepção**
3. Que ação o operador executou? → **Ação**

Essa estrutura ternária é de Hendy. A distinção entre os três eixos é `SOURCE_DIRECT_HENDY`.

Os **códigos internos** (P-A, P-B, ..., P-H; O-A, O-B, O-C, O-D; A-A, A-B, ..., A-J) são a taxonomia criada pela operacionalização Daumas/HFA para nomear, tabular e comparar as falhas dentro dos eixos de Hendy. Esses códigos **não existem com essa nomenclatura em Hendy 2003**. Eles são `DAUMAS_OPERATIONALIZATION`.

### Status
- Eixos P/O/A: `SOURCE_DIRECT_HENDY`
- Códigos internos P-A...P-H, O-A...O-D, A-A...A-J: `DAUMAS_OPERATIONALIZATION`

### Risco
- **Baixo** quando cada código é mantido com mapeamento explícito para a categoria lógica de Hendy correspondente.
- **Médio** quando os códigos são tratados como se fossem nomenclatura original de Hendy — isso pode gerar confusão em revisões externas ou comparações com literatura.

### Impacto no motor
O motor usa os códigos como saída de classificação. Se um código for usado sem conhecimento de sua origem Daumas/HFA, a análise pode ser interpretada como "Hendy disse P-G" quando Hendy define a categoria de falha de monitoramento, mas não o código alfanumérico.

### Mitigação atual
- `SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md` seções 5.1, 5.2 e 5.3 documentam explicitamente a distinção.
- `SERA_METHODOLOGY_GOVERNANCE_RULES_v0.1.4.md` seção 4 estabelece a hierarquia.

### Fase futura recomendada
- Criar matriz explícita: código interno → nó/categoria/lógica Hendy correspondente.
- Incluir essa matriz no documento de referência metodológica para uso em treinamento e auditoria externa.

---

## 6. ADAPTATION_NOTE-002 — HFA Step 1/Step 2 Divergentes de Hendy

**ID:** AN-002
**Tema:** Numeração e conteúdo dos Steps HFA vs. Steps de Hendy

### Descrição

**HFA Step 1** é extração de metadados via LLM. Produz: `summary`, `event_date`, `event_location`, `operation_type`, `occupants_count`, `flight_phase`, `weather_conditions`, `systems_involved`. Não é o Step 1 de Hendy.

**Hendy Step 1** é a identificação do *departure from safe operation* — o ponto exato em que a operação se desviou, com identificação do unsafe act ou unsafe condition e do ator/crew diretamente envolvido. Esse conteúdo está no **HFA Step 2**, não no Step 1.

**HFA Step 2** identifica agente, ato inseguro factual, momento e justificativa do ponto de fuga. Aproxima o Step 1 de Hendy. Limitações: não distingue unsafe act de unsafe condition; o campo `agente` não é classificado explicitamente como direto vs. supervisório no output.

**Hendy Step 2** — formulação das três perguntas fundamentais como *statements* afirmativos antes das ladders (goal statement, perception statement, action statement) — **não existe como etapa explícita no HFA**. Essas perguntas são respondidas implicitamente *durante* as ladders nos Steps 3/4/5, não como entrada estruturada anterior a elas.

### Status
`HFA_ADAPTATION_REQUIRES_NOTE` (HFA Step 1) + `GAP` (Hendy Step 2 ausente)

### Risco
- **Alto.** A ausência de goal/perception/action statements pré-ladder elimina o estágio de interpretação intermediário registrável que Hendy prevê. Quando o texto bruto é ambíguo, não há camada intermediária onde a interpretação seja registrada antes da classificação.
- A numeração inconsistente de steps pode gerar mal-entendido em auditorias externas: o "Step 1" do HFA não é o "Step 1" de Hendy.

### Impacto no motor
- Ausência dos campos `goal_statement`, `perception_statement`, `action_statement` no schema de output.
- Ausência do campo `unsafe_condition` (distinto de `unsafe_act`).
- `ator direto` existe internamente (`isMaintainenceOrOrganizationalAgent()`), mas não é exposto no output.

### Mitigação atual
- `SERA_STEP1_STEP2_PRECONDITIONS_CODE_AUDIT_v0.1.4.md` seções 3 e 4 auditam empiricamente e documentam os achados.
- `SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md` seção 7.1–7.3 classifica os desvios.
- `decision_trace` mínimo implementado em A3-b registra o caminho percorrido, mas não substitui os statements pré-ladder.

### Fase futura recomendada
- **A3-d:** Estudo de viabilidade de extração de goal/perception/action como etapa intermediária explícita.
- Adicionar `unsafe_condition` como campo distinto em fase própria (A3-f).
- Expor `direct_actor` no schema de output.
- Documentar formalmente o mapeamento HFA Steps → Hendy Steps para uso metodológico externo.

---

## 7. ADAPTATION_NOTE-003 — Gates + LLM Fallback no Lugar de Ladders Interrogativas Completas

**ID:** AN-003
**Tema:** Arquitetura de classificação P/O/A no motor atual

### Descrição

Hendy define *ladders* interrogativas: árvores de perguntas sequenciais com respostas sim/não/insuficiente, cada pergunta numerada, percurso registrado como question_trace.

A arquitetura atual do HFA/SERA é diferente:

```
[gate 1: evidenceOf*() → código imediato]
[gate 2: evidenceOf*() → código imediato]
... (10–15 gates determinísticos) ...
[nenhum gate disparou → LLM nó 0 sim/não → nó 1 sim/não → ...]
```

Na maioria dos casos dos fixtures calibrados, o resultado vem de um gate determinístico — o LLM não é consultado. Os gates são heurísticas lexicais sobre texto normalizado, não perguntas interrogativas aplicadas uniformemente a todos os casos.

Consequência direta: a pergunta "o motor passou pela ladder de Hendy?" não tem resposta única — depende de qual caminho foi percorrido para aquele caso específico.

O `decision_trace` mínimo implementado em A3-b registra `source` (deterministic_gate / llm_node / infer_function) e `source_name`, mas não mapeia os gates para as perguntas da ladder de Hendy.

### Status
`TECHNICAL_HEURISTIC` (gates determinísticos) / `HFA_ADAPTATION_REQUIRES_NOTE` (desvio estrutural da ladder Hendy)

### Risco
- **Médio/Alto.** Casos onde o gate determinístico dispara não têm o mesmo grau de interrogação causal que casos onde o LLM percorre os nós sim/não. A arquitetura é assimétrica.
- Sem `question_trace` completo, não é possível saber se a classificação resultou de uma ladder Hendy completa ou de uma heurística lexical de três palavras.
- O `decision_trace` atual é rastreabilidade mínima de execução, não evidência de seguimento da ladder.

### Impacto no motor
- Funciona corretamente para os fixtures calibrados (12/13 P/O/A em A2-n).
- Comportamento para casos não representados nos fixtures é menos previsível — o path LLM pode produzir resultados metodologicamente menos rastreáveis.

### Mitigação atual
- `decision_trace` mínimo implementado (A3-b): registra se o código veio de gate determinístico, infer function ou nó LLM.
- `nos_percorridos` e `falhas_descartadas` no `raw_llm_output` preservam trace parcial.
- `SERA_DECISION_TRACE_MINIMUM_v0.1.4.md` documenta as limitações desta fase.

### Fase futura recomendada
- Evoluir `decision_trace` para `question_trace` com IDs mapeados às perguntas da ladder de Hendy.
- Fase separada para avaliar reimplementação de ladders interrogativas com question IDs — alto impacto, requer nova campanha de fixtures.

---

## 8. ADAPTATION_NOTE-004 — O-C Awareness Estrito

**ID:** AN-004
**Tema:** Guard de O-C com quatro blocos lexicais simultâneos obrigatórios

### Descrição

A classificação O-C (*Desvio Consciente de Objetivo*) requer, na implementação atual, a combinação simultânea de quatro blocos lexicais:

1. awareness explícita (`ciente`, `consciencia explicita`, `aware`, `knowingly`, etc.)
2. limite/regra/procedimento explícito (`minimos`, `limite de visibilidade`, `regra`, `procedimento`, etc.)
3. marca de desvio/crossing (`ultrapassad`, `violou`, `descumpr`, `crossed`, etc.)
4. continuidade/prosseguimento (`continuou`, `prosseguiu`, `manteve`, `proceeded`, etc.)

Somente quando os quatro blocos estão presentes o classificador retorna O-C com precedência sobre O-D lexical. Implementado em `hasExplicitConsciousMinimumOrRuleDeviation` (A2-i).

Essa restrição é mais conservadora do que Hendy exige explicitamente. Hendy define O-C como desvio consciente de objetivo, mas não impõe quatro critérios lexicais simultâneos. O guard foi introduzido para reduzir falsos positivos O-C (classificar como O-C casos que deveriam ser O-D), e funcionou empiricamente para os fixtures.

### Status
`HFA_ADAPTATION_REQUIRES_NOTE`

### Risco
- **Médio.** O guard pode produzir falso-negativo: um caso de desvio consciente onde a awareness é implícita/cultural (não lexicalizada nos quatro blocos) não será classificado como O-C.
- Violações de regra por cultura de normalização de desvio — onde a crew sabe que está violando sem nomear explicitamente — podem ser classificadas incorretamente como O-D.

### Impacto no motor
- O-C é bloqueado quando a awareness não é lexicalmente explícita. Motor retorna O-D por ausência de sinal, não por análise causal do objetivo do operador.

### Mitigação atual
- Revisão humana de casos O-C/O-D divergentes.
- `decision_trace` registra se o código veio de gate determinístico.
- `SERA_METHOD_FIXTURES_A2_OC_AWARENESS_GUARD_v0.1.4.md` documenta a regra e sua motivação.

### Fase futura recomendada
- Revisão Hendy-first da fronteira O-C/O-D: verificar o que Hendy define como critério mínimo de awareness para O-C.
- Desenvolver question_trace para O-C: "havia regra ou limite estabelecido? o operador tinha conhecimento desse limite? o desvio foi consciente?".

---

## 9. ADAPTATION_NOTE-005 — A-A vs A-B Perception-Anchored Coherent Action

**ID:** AN-005
**Tema:** Guard de A-A para ação coerente com percepção incorreta, prevenindo dupla contagem com P

### Descrição

A implementação atual (A2-n) inclui `evidenceOfPerceptionAnchoredCoherentAction`, que classifica como A-A (ação coerente com percepção incorreta) casos onde:

1. Há falha perceptual dominante capturada no eixo P (P-G ou P-H).
2. A ação foi continuação natural da percepção incorreta, não uma omissão procedural independente.
3. Não há omissão física específica e obrigatória (sem `'nao instalou'`, `'nao travou'`, `'pino de travamento'`).

O guard existe para evitar dupla contagem: quando P já captura a falha dominante (monitoramento, conflito de fontes), classificar A como A-B ("omissão de verificação") seria contar a mesma falha duas vezes.

A distinção A-A vs A-B como melhoria diagnóstica foi confirmada empiricamente em A2-n (5/5 fixtures do cluster). A lógica tem base em Hendy — a ação coerente com percepção incorreta é o mecanismo central de A-A — mas a operacionalização computacional do guard (três blocos + negação física) é uma inferência HFA, não uma declaração explícita de Hendy.

### Status
`SOURCE_INFERRED_FROM_HENDY` (distinção A-A/A-B) / `HFA_ADAPTATION_REQUIRES_NOTE` (operacionalização do guard)

### Risco
- **Médio.** O guard pode suprimir um A-B real se a fixture contiver marcadores de monitoramento/conflito sem que haja realmente uma omissão física independente.
- O terceiro bloco (negação física) é proteção parcial: cobre casos canônicos de A-B, mas não todos.

### Impacto no motor
- A-A determinístico é produzido para casos P-G/P-H quando a ação foi prosseguimento coerente.
- Gates A-G, A-H, A-E, A-F, A-C precedem o guard — casos com falha de supervisão, temporal, knowledge gap ou selection error são protegidos.

### Mitigação atual
- Exclusões explícitas no guard: `!feedbackCheckFailure`, `!supervisionFailure`, `!maintenanceOmission`, `!temporalExecutionFailure`, `!communicationConfirmationFailure`, `!technicalKnowledgeDeficit`, `!evidenceOfSelectionError`.
- A-B canônico (TEST-A-B-001) e outros fixtures A-B preservados após A2-n (PASS sem regressão).
- `SERA_METHOD_FIXTURES_A2_ACTION_BOUNDARY_AA_AB_v0.1.4.md` documenta o diagnóstico e o mecanismo.

### Fase futura recomendada
- Preservar exclusões para A-G, A-H, A-E, A-F, omissão física/procedural independente, comunicação.
- Revisar com casos reais de A-B para confirmar que o guard não suprime casos legítimos.
- Mapear explicitamente a distinção A-A/A-B para as categorias Hendy correspondentes.

---

## 10. ADAPTATION_NOTE-006 — P-H Conflito Multi-Fonte

**ID:** AN-006
**Tema:** Guard lexical para P-H baseado em conflito radar/visual/GPS/FMS entre fontes independentes

### Descrição

A função `evidenceOfConflictingOperationalInformation` (A2-m) classifica P-H quando há:

1. Contexto multi-source com conflito (ex: `'conflito radar versus visual'`, `'fontes nao foram integradas'`, `'identificacao positiva por fontes independentes'`).
2. Conflito não resolvido antes da ação (ex: `'nao foi resolvido'`, `'sem resolver o conflito'`, `'identificacao incompleta'`).

Esse guard é uma extensão HFA do conceito de canal de informação conflitante de Hendy — Hendy define falhas de percepção por canal de informação, mas a operacionalização específica de conflito multi-fonte em contexto offshore (radar/visual/GPS/FMS/rádio) é uma adaptação HFA calibrada para os fixtures disponíveis.

### Status
`HFA_ADAPTATION_REQUIRES_NOTE`

### Risco
- **Médio.** O guard pode lexicalizar *communication/information failure* — classificar como P-H (falha de percepção) o que é uma falha de comunicação (ATC, instrução verbal), que seria P-H por `evidenceOfInformationChannelFailure` (gate diferente) ou poderia ser outro código.
- Termos como `'confirmacao de radio e cross-check'` no Bloco 1 estão na fronteira entre conflito de fontes e falha de comunicação.

### Impacto no motor
- P-H determinístico para casos com conflito multi-fonte explícito.
- Gate inserido antes do P-G preemptivo para interceptar casos que teriam sido classificados erroneamente como P-G.

### Mitigação atual
- `evidenceOfInformationChannelFailure` (gate anterior) cobre casos de briefing ambíguo/instrução verbal — semanticamente distinto do conflito entre fontes simultâneas.
- `SERA_METHOD_FIXTURES_A2_BROAD_ALIGNMENT_PASS_v0.1.4.md` documenta a causa técnica e o patch.

### Fase futura recomendada
- Transformar em perguntas causais: "havia múltiplas fontes? apresentavam informações conflitantes? o conflito foi reconhecido? foi resolvido antes da ação? a ação prosseguiu com conflito não resolvido?"
- Revisar fronteira P-H multi-fonte vs. P-H briefing ambíguo vs. communication/information failure.

---

## 11. ADAPTATION_NOTE-007 — P-G Monitoring/Checklist/Fuel

**ID:** AN-007
**Tema:** Guard P-G com termos adicionados iterativamente para monitoramento, checklist e combustível

### Descrição

A função `evidenceOfMonitoringFailure` (Gate P-G preemptivo) foi expandida em A2-m com termos adicionais:

```
'monitoramento periodico de combustivel'
'combustivel remanescente cruzou o minimo'
'retornou ao painel de combustivel'
'checklist declarado e estado real'
'alerta automatico sinalizou configuracao incorreta'
'item critico pendente'
```

P-G como código pode capturar tanto *attention failure* (o operador não monitorou porque a atenção estava em outro lugar) quanto *feedback failure* (o operador não monitorou porque o processo de feedback esperado não ocorreu). A distinção é metodologicamente relevante mas não está implementada no gate atual — o gate dispara para qualquer texto que contenha os marcadores, independentemente do mecanismo causal.

Adicionalmente, há potencial sobreposição entre P-G (falha de monitoramento, eixo Percepção) e A-G (falha de supervisão/feedback, eixo Ação). Em fixtures onde P-G e A-G coexistem, a prioridade dos gates determina qual eixo captura a falha dominante.

### Status
`UNCONFIRMED` / `HFA_ADAPTATION_REQUIRES_NOTE`

O status `UNCONFIRMED` reflete que a operacionalização atual de P-G ainda não foi verificada contra a definição precisa de Hendy para cada subcategoria de falha de monitoramento.

### Risco
- **Médio.** Confusão entre eixo P (percepção — o operador não percebeu o estado) e A-G (feedback check failure — o operador não verificou o resultado de uma ação executada).
- Termos adicionados iterativamente com base em fixtures — não derivados de análise Hendy-first da categoria P-G.

### Impacto no motor
- P-G determinístico para casos com marcadores de monitoramento/checklist/fuel.
- Gate P-G precede o fallback LLM — casos com esses marcadores não chegam ao LLM no eixo P.

### Mitigação atual
- `decision_trace` mínimo registra quando P-G vem de gate determinístico.
- `SERA_METHOD_FIXTURES_A2_BROAD_ALIGNMENT_PASS_v0.1.4.md` documenta os termos adicionados e suas justificativas por fixture.

### Fase futura recomendada
- Revisar a definição Hendy de P-G vs. A-G: quando a falha é de monitoramento (P) e quando é de feedback check (A)?
- Desenvolver `question_trace` para P-G: "o operador tinha informação disponível? o operador realizou o monitoramento esperado? o estado do sistema estava dentro dos limites?"
- Confirmar ou refutar a classificação P-G nos casos UNCONFIRMED com revisão Hendy-first.

---

## 12. ADAPTATION_NOTE-008 — P-D/A-H Pressão Temporal Lexical

**ID:** AN-008
**Tema:** Guard de P-D/A-H baseado em combinação de blocos lexicais específicos a contexto offshore

### Descrição

A função `evidenceOfSpeedManagementAttentionCapture` (A2-k) classifica P-D (atenção capturada com parâmetro degradando) e A-H (falha de gerenciamento temporal de execução) quando há:

**Bloco 1:** parâmetro crítico degradando (`'velocidade continuou caindo'`, `'abaixo da faixa segura'`, `'ias continuou caindo'`, etc.)
**Bloco 2:** atenção capturada por tarefa de proximidade operacional (`'atencao da tripulacao estava capturada'`, `'capturada pela proximidade da plataforma'`, `'sobrevoo de plataforma'`, etc.)

A base metodológica existe em Hendy/Daumas — time pressure e attention capture são conceitos definidos. Mas a implementação atual é um guard lexical calibrado para o contexto offshore de sobrevoo de plataforma, não uma análise causal de relação tempo disponível × carga cognitiva.

### Status
`DAUMAS_APPLIED_IMPROVEMENT` (base conceitual) + `TECHNICAL_HEURISTIC` (implementação lexical)

### Risco
- **Médio.** O guard pode classificar por palavras-chave sem que haja relação causal entre tempo disponível e carga cognitiva — classificar como P-D/A-H um caso onde a velocidade caiu por outra razão, e a proximidade da plataforma era contexto neutro.
- Os termos do Bloco 2 são específicos ao contexto offshore de helicóptero. Em outros domínios de aviação, o mesmo padrão pode não ser coberto.

### Impacto no motor
- P-D e A-H determinísticos para casos com os dois blocos presentes.
- A0-CHK-002-ADJ: permanece PARTIAL/MOVE_TO_EXPLORATORY porque `'continuou perdendo velocidade e altura'` não triggera o guard.

### Mitigação atual
- Guard conservador: exige combinação de ambos os blocos — mitiga falsos positivos por presença de apenas um marcador.
- `SERA_METHOD_FIXTURES_A2_TEMPORAL_PRESSURE_GUARD_v0.1.4.md` documenta o diagnóstico e o patch.

### Fase futura recomendada
- Desenvolver evidência causal de time pressure: "qual era o tempo disponível? qual era a carga cognitiva? havia múltiplas tarefas simultâneas? o parâmetro crítico foi monitorado?"
- Generalizar o guard para outros padrões de time pressure além do contexto offshore específico.

---

## 13. ADAPTATION_NOTE-009 — Preconditions por Lookup P/O/A/ERC ou LLM

**ID:** AN-009
**Tema:** Derivação de preconditions por matrix lookup, não por trace causal active_failure → precondition → evidence

### Descrição

Hendy define preconditions como condições latentes derivadas por análise da active failure identificada. O vínculo correto é: `active_failure → precondition → evidence`.

A implementação atual usa dois mecanismos:

**Mecanismo 1 — Determinístico (`selectDeterministicPreconditions()`):** consulta `matrix.json` com regras do tipo "se action_code = A-D → preconditions W1, W2, P1, O2, O4". A fonte do matrix é declarada como `"HFA fixture-derived operationalization of SERA/Hendy/Daumas preconditions"` — uma operacionalização baseada em fixtures, não em análise causal.

**Mecanismo 2 — LLM (`runStep6_7()`):** LLM recebe os três códigos + relato e gera preconditions. Cada precondition tem `evidencia_no_relato`, mas não há vínculo estruturado com a active failure específica que a motivou.

A taxonomia de categorias (P1–P7, T1–T2, W1–W3, S1–S3, O1–O6) é compatível com as categorias de Hendy — esse é um ponto forte da implementação. Mas o mecanismo de derivação não percorre a cadeia causal.

O campo `sourceRuleId` existe internamente no mecanismo determinístico, mas é descartado antes de chegar ao payload final.

### Status
`HFA_ADAPTATION_REQUIRES_NOTE`

### Risco
- **Alto.** Se o matrix.json foi calibrado com base em fixtures limitados ou tendenciosos, as preconditions produzidas refletem esse viés. Não há mecanismo interno para detectar quando uma precondition derivada por lookup não se sustenta na narrativa específica.
- As preconditions podem tornar-se camada decorativa: produzidas automaticamente por lookup de código, sem análise real da cadeia causal do evento.

### Impacto no motor
- Preconditions determinísticas têm prioridade sobre as LLM quando o matrix dispara.
- `sourceRuleId` não é preservado no output — auditoria externa não pode rastrear a origem de cada precondition.
- `preconditions_trace` mínimo implementado em A3-b registra o mecanismo (deterministic_matrix / llm), mas não a cadeia causal.

### Mitigação atual
- `preconditions_trace` mínimo implementado (A3-b): `mechanism` (deterministic_matrix / llm), `source_rule_ids` quando disponíveis.
- Taxonomia de categorias compatível com Hendy (P/T/W/S/O).
- `SERA_STEP1_STEP2_PRECONDITIONS_CODE_AUDIT_v0.1.4.md` seção 6 audita o mecanismo em detalhe.

### Fase futura recomendada
- **A3-e:** Revisão do `matrix.json` com derivação explícita da cadeia `active_failure → precondition → evidence` para cada regra.
- Expor `sourceRuleId` no payload normalizado de preconditions.
- Desenvolver `preconditions_trace` com vínculo explícito: qual active failure motivou qual precondition, com que evidência no relato.

---

## 14. ADAPTATION_NOTE-010 — LLM como Classificadora em Fallback

**ID:** AN-010
**Tema:** Papel da LLM no fallback path de classificação P/O/A

### Descrição

Nos Steps 3/4/5, quando nenhum gate determinístico dispara, a LLM é consultada com nós sim/não. A LLM responde perguntas do tipo "O operador tinha percepção incorreta do estado?" com Sim/Não, e seu output determina o código final.

Esse mecanismo tem o espírito interrogativo das ladders de Hendy — a LLM é consultada por nós sim/não sequenciais. Mas há dois problemas estruturais:

1. A LLM não responde perguntas com `evidence + confidence + uncertainty` estruturado — responde Sim/Não com justificativa textual.
2. Quando a evidência é insuficiente, "DADO INSUFICIENTE" é tratado como justificativa de Não (branch negativo), não como terceiro estado `insufficient_evidence`. O sistema sempre classifica — nunca retorna `{unanswered_questions: [...]}`.

Isso significa que a LLM pode estar substituindo o decision aid em vez de respondendo perguntas internas dele.

### Status
`TECHNICAL_HEURISTIC` / `HFA_ADAPTATION_REQUIRES_NOTE`

### Risco
- **Alto.** A LLM pode produzir resultados variáveis para casos não representados nos fixtures calibrados. O `decision_trace` atual registra se o código veio de nó LLM, mas não audita a qualidade do raciocínio LLM para aquele caso específico.
- `DADO INSUFICIENTE` como branch Não impede distinguir "classificado por evidência positiva" de "classificado por ausência de evidência contrária" — infla artificialmente a confiança nos dados.

### Impacto no motor
- Para os fixtures calibrados (A2-n), a maioria dos casos corretos vem de gates determinísticos. O LLM fallback foi o mecanismo para casos onde os gates não disparam.
- `determinism_rate=100%` reflete que, em runs repetidos, o resultado é estável — mas não indica se a estabilidade vem de gates ou de LLM determinístico.

### Mitigação atual
- Gates determinísticos precedem o LLM na maioria dos códigos — reduzem o percentual de casos que chegam ao fallback LLM.
- `decision_trace` mínimo (A3-b) registra `source: 'llm_node'` quando o código vem do LLM.
- `has_dado_insuficiente` flag no `decision_trace` registra quando "DADO INSUFICIENTE" apareceu.

### Fase futura recomendada
- Definir papel formal da LLM: responder perguntas internas com `{ step_id, question_id, pergunta, answer, evidence, confidence, uncertainty }`.
- Implementar `insufficient_evidence` como estado estruturado — não forçar classificação quando evidência é insuficiente.
- Desenvolver `question_trace` que registre as perguntas respondidas pela LLM com evidência textual por pergunta.

---

## 15. ADAPTATION_NOTE-011 — Anti-Gates Supervisão/Manutenção

**ID:** AN-011
**Tema:** Funções de identificação de agente organizacional como anti-gates de falha ativa

### Descrição

O motor implementa internamente as funções `isMaintainenceOrOrganizationalAgent()` e `isEscapePointOrganizationalAgent()` para identificar quando o agente do ponto de fuga é de nível supervisório, de manutenção ou organizacional. Quando essas funções disparam, certos gates de falha ativa são bloqueados — o motor evita classificar como falha ativa direta do operador o que é uma falha organizacional ou de supervisão.

Esses anti-gates são úteis para evitar colapso de precondition em active failure: uma falha de supervisão não deve ser classificada como A-A ou A-B do operador de linha.

O problema: a lógica interna existe mas **não é exposta no output**. O payload final contém apenas `unsafe_agent` sem discriminar nível hierárquico. Se a identificação do agente no HFA Step 2 for incorreta, os anti-gates falham silenciosamente — o motor produz uma classificação baseada em premissa errada sobre quem era o ator direto.

### Status
`HFA_ADAPTATION_REQUIRES_NOTE`

### Risco
- **Médio.** Se `isMaintainenceOrOrganizationalAgent()` identificar incorretamente o agente, pode bloquear uma falha ativa legítima (um operador de linha tratado como agente organizacional não terá gates A-A/A-B ativos).
- O inverso também é possível: falha organizacional identificada como operador de linha, sem bloqueio dos anti-gates.
- A ausência de `direct_actor` no schema impede auditoria externa da premissa sobre o ator.

### Impacto no motor
- Anti-gates afetam Steps 3/4/5 silenciosamente.
- `decision_trace` mínimo (A3-b) não expõe qual anti-gate bloqueou quais branches.

### Mitigação atual
- `SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md` seção 7.5 documenta o achado.
- `SERA_STEP1_STEP2_PRECONDITIONS_CODE_AUDIT_v0.1.4.md` seção 3 item 7/8 audita a separação interna.

### Fase futura recomendada
- **A3-f:** Avaliação de `direct_actor` e `actor_level` no schema de output.
- Expor no `decision_trace` quando anti-gates de agente organizacional bloquearam branches.
- Documentar formalmente os critérios de `isMaintainenceOrOrganizationalAgent()` com referência à distinção Hendy entre unsafe act (ator direto) e unsafe condition (contexto organizacional).

---

## 16. ADAPTATION_NOTE-012 — Candidates A2 como Sucesso Técnico, Não Baseline Metodológico

**ID:** AN-012
**Tema:** O resultado A2-n (12/13 P/O/A) é validação técnica dos fixtures, não validação metodológica do motor

### Descrição

A trajetória A2-i a A2-n atingiu 12/13 P/O/A corretos, FAIL=0, determinism_rate=100%. É um sucesso técnico.

Esse resultado **não equivale a validação metodológica** pelas seguintes razões específicas:

1. A maior parte das fixtures candidatas foi criada iterativamente durante o processo de calibração — há risco real de circularidade entre motor e fixtures. A expected de um fixture pode refletir o comportamento atual do motor, não a análise independente da metodologia.

2. As adaptações AN-001 a AN-011 documentadas neste arquivo são pressupostos não validados metodologicamente que afetam o resultado dos fixtures.

3. O motor não implementa Hendy de forma explícita: Step 1/2 colapsados (AN-002), ladders não interrogativas (AN-003), preconditions sem trace causal (AN-009), LLM sem estrutura de pergunta formal (AN-010).

4. A2-n não foi submetido a N_RUNS=3 (critério de estabilidade estatística para promoção de baseline).

5. A divergência remanescente A0-CHK-002-ADJ (P-A actual vs P-D expected, MOVE_TO_EXPLORATORY) é um caso não resolvido, não um caso inexistente.

### Status
`TECHNICAL_HEURISTIC` (validação técnica) — **nota:** o status `TECHNICAL_VALIDATION_ONLY` não existe na lista oficial; usa-se `TECHNICAL_HEURISTIC` com esta observação.

### Risco
- **Alto se tratado como baseline.** Transformar fixtures em fonte metodológica inverte a hierarquia correta: `Hendy/Daumas → Metodologia → Motor → Fixtures`.
- Usar A2-n como referência externa ("o motor está validado") sem as ressalvas deste documento é metodologicamente incorreto.

### Impacto no motor
- Motor está tecnicamente estável e não deve ser alterado antes de rastreabilidade completa (AN-002 a AN-011).
- Os resultados A2-n são o ponto de partida documentado para as fases A3-c em diante.

### Mitigação atual
- `SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md` seção 4.3 enumera explicitamente por que A2 não é baseline metodológico.
- `SERA_METHODOLOGY_GOVERNANCE_RULES_v0.1.4.md` seção 11 define os pré-requisitos para promoção de baseline.

### Fase futura recomendada
- **A3-g:** Avaliação formal de promoção de baseline — somente após:
  1. `decision_trace` implementado e funcional (A3-b — concluído).
  2. `ADAPTATION_NOTES` formais para todos os desvios (este documento — A3-c).
  3. `preconditions_trace` com vínculo causal (A3-e).
  4. N_RUNS=3 candidate sem FAIL.
  5. Confirmação de que fixtures não foram usados como fonte metodológica.

---

## 17. Relação com A3-b — Decision Trace Mínimo

O `decision_trace` mínimo implementado em A3-b representa o primeiro passo de rastreabilidade operacional do motor. Ele registra:

- Por eixo (P/O/A): `step`, `final_code`, `source` (deterministic_gate / llm_node / infer_function / unknown), `source_name`, `nodes_count`, `discarded_codes`, `has_dado_insuficiente`.
- Por precondição: `mechanism` (deterministic_matrix / llm / mixed / none), `total`, `source_rule_ids`.

**O que o decision_trace já resolve:**
- Saber se um código específico veio de gate determinístico ou de nó LLM (endereça parcialmente AN-003 e AN-010).
- Saber quando "DADO INSUFICIENTE" apareceu em um case (endereça parcialmente o risco de AN-010).
- Saber o mecanismo de geração de preconditions (endereça parcialmente AN-009).

**O que o decision_trace ainda não resolve (e não pretende):**
- Não é ladder Hendy completa — não mapeia gates para perguntas de Hendy (AN-003).
- Não cria statements de goal/perception/action antes da classificação (AN-002).
- Não distingue unsafe_act de unsafe_condition (AN-002).
- Não expõe direct_actor ou actor_level (AN-011).
- Não implementa insufficient_evidence como estado estruturado (AN-010).
- Não é preconditions_trace causal (AN-009).

---

## 18. Matriz de Prioridade

### P0 — Bloqueadores para qualquer promoção de baseline

| Nota | Item | Por que P0 |
|---|---|---|
| AN-002 | Step 1/2 explicit statements | Sem statements pré-ladder, a rastreabilidade pré-classificação é estruturalmente ausente |
| AN-003 | Question trace completo | Sem saber se o motor percorreu a ladder de Hendy, a classificação não é auditável |
| AN-009 | Preconditions causal trace | Sem vínculo active_failure → precondition → evidence, as preconditions são operacionalmente frágeis |
| AN-010 | LLM com evidence/confidence/uncertainty | Sem estado de insufficient_evidence, a classificação pode inflar confiança artificialmente |
| AN-012 | Promoção de baseline requer rastreabilidade completa | A2-n é ponto de partida, não destino |

### P1 — Importantes para qualidade metodológica

| Nota | Item |
|---|---|
| AN-004 | Revisão O-C awareness com análise Hendy-first |
| AN-005 | Validação da distinção A-A/A-B com casos reais |
| AN-006 | P-H multi-fonte como perguntas causais |
| AN-007 | Confirmação P-G vs A-G (UNCONFIRMED) |
| AN-011 | Exposição de direct_actor no schema |

### P2 — Melhorias de qualidade que não bloqueiam baseline

| Nota | Item |
|---|---|
| AN-001 | Matriz código → nó Hendy |
| AN-008 | Generalização de P-D/A-H para além do offshore |

---

## 19. Regras para Futuras Mudanças de Motor

Toda mudança no motor HFA/SERA após este documento deve:

1. **Citar uma ADAPTATION_NOTE existente** ou criar uma nova se a mudança não for coberta pelas notas AN-001 a AN-012.
2. **Declarar qual pergunta do fluxo SERA** a mudança representa (relato → ponto de fuga → unsafe act → ator direto → goal/perception/action → ladders → active failure → preconditions → ERC → recomendações → decision_trace).
3. **Declarar o status metodológico** da mudança usando exatamente um dos status da seção 3.1.
4. **Toda fixture nova** deve separar: (a) justificativa metodológica (Hendy/Daumas), (b) expected técnico, (c) risco de circularidade com o motor atual.
5. **Não criar gate, patch ou expected apenas para acertar fixture** — a relação de derivação é sempre `Metodologia → Motor → Fixtures`.
6. **Mudanças que ampliem o role da LLM** como classificadora devem documentar como isso se encaixa ou diverge da regra sobre LLM (Governance Rules seção 8 e AN-010 deste documento).

---

## 20. Conclusão

Este documento registra 12 notas de adaptação metodológica do HFA/SERA, cobrindo a totalidade dos desvios conhecidos em relação a Hendy e Daumas identificados até a fase A3-c.

**O que está bem documentado e funcionando:**
- Resultados técnicos A2-n: 12/13 P/O/A, FAIL=0, determinism_rate=100%.
- decision_trace mínimo implementado (A3-b).
- Hierarquia metodológica Hendy → Daumas → HFA → Fixtures formalmente estabelecida.
- Status de cada adaptação claramente declarado.

**O que está documentado como gap honesto:**
- Step 1/2 de Hendy ausentes como etapas explícitas (AN-002) — risco alto.
- Ladders não implementadas como ladders interrogativas completas (AN-003) — risco médio/alto.
- Preconditions sem trace causal active_failure → precondition → evidence (AN-009) — risco alto.
- LLM sem estado insufficient_evidence estruturado (AN-010) — risco alto.
- A2-n é validação técnica, não baseline metodológico (AN-012) — risco alto se tratado como baseline.

**O que este documento não faz:**
- Não suaviza nenhum gap.
- Não promove A2-n como baseline.
- Não propõe patch de motor.
- Não altera código, fixtures, candidates ou baseline.

As notas AN-001 a AN-012 são o registro honesto do estado atual. Elas não são crítica à trajetória A2 — que foi tecnicamente bem conduzida — mas a declaração necessária de que sucesso técnico em fixtures não é o mesmo que validação metodológica de uma ferramenta de investigação de fatores humanos.

O próximo passo permanece: rastreabilidade antes de classificação nova.

---

*Documento criado em 2026-05-21 como parte da fase SERA v0.1.4-A3-c. Nenhum código, fixture, candidate, baseline ou report foi alterado. Este documento é governança read-only.*
