# SERA Adaptation Notes

**Versão:** v0.1.4-A3-c
**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-c-review
**Tipo:** Documentação de governança metodológica — sem alteração de código, fixtures, candidates, baseline ou reports

---

## 1. Propósito

Este documento registra formalmente todas as adaptações, heurísticas e desvios do pipeline HFA/SERA em relação ao SERA original de Hendy (2003). Cada item recebe um status metodológico, uma avaliação de risco e uma recomendação de evolução futura.

O objetivo não é justificar as adaptações, mas torná-las auditáveis. Um pipeline que admite abertamente seus desvios é mais confiável do que um que os silencia.

---

## 2. Resumo Executivo

**A2 foi um sucesso técnico.** O motor atingiu em A2-n 12/13 P/O/A corretos, FAIL=0, determinism_rate=100%. As correções aplicadas em A2-i a A2-n são tecnicamente estáveis e devem ser preservadas.

**A2 não é baseline metodológico.** Sucesso em fixtures não equivale a validação metodológica. O motor implementa Hendy de forma implícita e parcial: HFA Step 1/Step 2 não correspondem aos Hendy Step 1/2, goal/perception/action statements pré-ladder estão ausentes, preconditions são derivadas por lookup sem trace causal, e a rastreabilidade das decisões de classificação é insuficiente para auditoria externa.

**HFA/SERA tem adaptações úteis, mas precisam ser rastreadas.** Os gates determinísticos, a codificação Daumas, os anti-gates de supervisão e a distinção A-A/A-B são contribuições genuínas que aumentam a precisão diagnóstica. Seu valor não está em questão; o que precisa ser estabelecido é a rastreabilidade de cada adaptação para sua fonte metodológica.

**A3-b iniciou rastreabilidade mínima.** O `decision_trace` no `raw_llm_output` agora registra, para cada eixo, se o código veio de gate determinístico, nó LLM ou infer function. O `preconditions_trace` mínimo e o `sourceRuleId` foram preservados. Isso resolve a lacuna mais urgente de observabilidade, mas não resolve os problemas estruturais de Step 1/2, question_trace completo, unsafe_condition, direct_actor ou preconditions causal trace.

**Próximo passo.** Esta fase (A3-c) formaliza as ADAPTATION_NOTES. As próximas prioridades são: implementar Step 1/2 explícitos no sentido Hendy, evoluir o preconditions_trace para cadeia causal formal, e clarificar o papel da LLM como respondente de perguntas estruturadas — não como classificador livre.

---

## 3. Governança Metodológica

### Hendy como fonte primária da lógica original

Hendy (2003) define a estrutura causal do SERA:

- **Departure from safe operation**: ponto focal — o momento em que a operação se desviou de procedimentos seguros.
- **Unsafe act / unsafe condition**: distinção analítica entre ato humano e condição latente.
- **As três perguntas**: O que o operador queria alcançar (goal)? O que percebeu (perception)? Que ação executou (action)? Respondidas antes das ladders.
- **Active failures**: classificáveis pelos três eixos, após as três perguntas.
- **Preconditions**: derivadas da active failure identificada, não inferidas genericamente.
- **Decision aid sequencial**: ferramenta de apoio à análise, não algoritmo de classificação automática.
- **ERC**: métrica de detectabilidade/reversibilidade.

Em qualquer conflito conceitual direto entre Hendy e Daumas ou adaptações HFA, Hendy prevalece.

### Daumas como operacionalização e melhoria aplicada

Daumas não é uma fonte secundária fraca. É a aplicação prática do SERA no contexto offshore/MDC. Contribui com:

- **Tradução** dos conceitos Hendy para português e para linguagem operacional.
- **Codificação sistemática** das falhas ativas (P-A...P-H, O-A...O-D, A-A...A-J) que torna a metodologia tabulável, comparável e usável em banco de dados, dashboard, relatório e treinamento.
- **Separação didática das etapas** que facilita o ensino e a auditoria da análise.
- **MDC** (Método de Diagnóstico de Causas) como técnica complementar de elicitação narrativa — não substitui o SERA nem suas ladders.
- **Melhorias de aplicabilidade** que preservam a lógica causal de Hendy enquanto aumentam a usabilidade prática.

Quando Daumas apenas traduz, organiza ou melhora a aplicação sem romper a lógica de Hendy, o HFA/SERA pode e deve seguir Daumas.

### HFA/SERA como implementação computacional auditável

O HFA/SERA implementa o SERA computacionalmente. Suas responsabilidades de governança são:

1. Rastrear a origem de cada decisão de classificação.
2. Documentar ADAPTATION_NOTES para todos os desvios relevantes.
3. Não promover para baseline o que ainda não tem rastreabilidade suficiente.
4. Calibrar empiricamente via fixtures, reconhecendo que fixtures não são fontes metodológicas.

### Fixtures e candidates como instrumentos de teste

A relação de derivação correta é:

```
Hendy/Daumas → Metodologia → Motor → Fixtures (verificam o motor)
```

Se um fixture divergir da metodologia documentada, o fixture deve ser revisado — não a metodologia adaptada ao fixture.

### LLM como apoio a perguntas e evidência

A LLM não é autoridade metodológica. Seu papel ideal é responder perguntas internas estruturadas com `evidence`, `confidence` e `uncertainty`. Quando a evidência for insuficiente, a LLM deve poder retornar `insufficient_evidence` — não forçar classificação. No estado atual, a LLM opera em fallback sem estrutura de ladder formal; isso está documentado em AN-010.

---

## 4. Como Ler as Adaptation Notes

Cada nota segue esta estrutura:

| Campo | Conteúdo |
|---|---|
| **ID** | Identificador único (AN-001...AN-012) |
| **Tema** | Nome curto da adaptação |
| **Status metodológico** | Um dos status definidos na seção 10 de GOVERNANCE_RULES |
| **Fonte/camada** | Hendy / Daumas / HFA / Heurística técnica |
| **O que o HFA/SERA faz hoje** | Descrição objetiva da implementação atual |
| **Por que é adaptação** | Por que se afasta do que Hendy exige ou do que Daumas especifica |
| **Risco metodológico** | Consequência se a adaptação produzir erros sistemáticos |
| **Mitigação atual** | O que está em vigor para controlar o risco |
| **Próxima evolução recomendada** | Caminho para reduzir ou eliminar o desvio |

---

## 5. Tabela-Resumo das Adaptation Notes

| ID | Tema | Status principal | Risco | Prioridade | Próxima fase |
|---|---|---|---|---|---|
| AN-001 | Códigos alfabéticos P/O/A | DAUMAS_OPERATIONALIZATION | Baixo/Médio | P2 | Matriz código→Hendy |
| AN-002 | HFA Step 1/Step 2 divergentes | HFA_ADAPTATION_REQUIRES_NOTE + GAP | Alto | P0 | Step 1/2 explícitos (A3-d) |
| AN-003 | Gates + LLM fallback em vez de ladders | TECHNICAL_HEURISTIC + HFA_ADAPTATION_REQUIRES_NOTE | Médio | P0 | question_trace formal (A3-d+) |
| AN-004 | O-C awareness estrito | HFA_ADAPTATION_REQUIRES_NOTE | Médio | P1 | Revisão Hendy-first casos implícitos |
| AN-005 | A-A vs A-B perception-anchored | SOURCE_INFERRED_FROM_HENDY + HFA_ADAPTATION_REQUIRES_NOTE | Médio | P1 | Validação casos canônicos A-B |
| AN-006 | P-H conflito multi-fonte | HFA_ADAPTATION_REQUIRES_NOTE | Médio | P1 | Perguntas explícitas fontes/conflito |
| AN-007 | P-G monitoring/checklist/fuel | UNCONFIRMED + HFA_ADAPTATION_REQUIRES_NOTE | Médio | P1 | Revisão P-G vs A-G |
| AN-008 | P-D/A-H pressão temporal lexical | DAUMAS_APPLIED_IMPROVEMENT + TECHNICAL_HEURISTIC | Médio | P2 | Evidência causal pressão temporal |
| AN-009 | Preconditions por lookup ou LLM | HFA_ADAPTATION_REQUIRES_NOTE | Alto | P0 | Cadeia causal active_failure→precondition (A3-e) |
| AN-010 | LLM como classificadora em fallback | TECHNICAL_HEURISTIC + HFA_ADAPTATION_REQUIRES_NOTE | Alto | P0 | LLM como respondente estruturado |
| AN-011 | Anti-gates supervisão/manutenção | HFA_ADAPTATION_REQUIRES_NOTE | Médio | P1 | direct_actor/actor_level explícito (A3-f) |
| AN-012 | Candidates A2: sucesso técnico, não baseline | TECHNICAL_HEURISTIC + HFA_ADAPTATION_REQUIRES_NOTE | Alto | P0 | Baseline só após trace+notes+preconditions (A3-g) |

---

## 6. AN-001 — Códigos Alfabéticos P/O/A

**Tema:** Taxonomia de falhas ativas (P-A...P-H, O-A...O-D, A-A...A-J)

**Status metodológico:** `DAUMAS_OPERATIONALIZATION`

**Fonte/camada:** Eixos P/O/A derivam de Hendy; códigos internos são operacionalização Daumas/HFA.

**O que o HFA/SERA faz hoje:**
Os Steps 3, 4 e 5 classificam a active failure em um código alfabético. Os **eixos Percepção / Objetivo / Ação** derivam diretamente das três perguntas de Hendy:
1. O que o operador queria alcançar? → Objetivo
2. O que o operador percebeu no momento do ato? → Percepção
3. Que ação o operador executou? → Ação

Os **códigos P-A/P-B.../P-H, O-A.../O-D, A-A.../A-J** são operacionalização Daumas/HFA. Nomeiam e tabelam as falhas dentro dos eixos, mas não existem com essa nomenclatura em Hendy 2003.

**Por que é adaptação:**
Hendy define as categorias lógicas e as perguntas das ladders. Daumas e HFA atribuíram códigos, nomes e descritores a essas categorias para fins de tabulação, banco de dados, comparação entre eventos, dashboard e treinamento. Essa codificação é útil e deve ser mantida; o que falta é o mapeamento explícito de cada código para a pergunta da ladder de Hendy que o originou.

**Risco metodológico:**
Baixo, se os códigos forem usados com mapeamento explícito para as categorias de Hendy. Médio, se forem tratados como nomenclatura original de Hendy ou como fonte metodológica independente. Em especial: ERC é referência Hendy 2003 e tem semântica precisa que não deve ser diluída pelo uso no pipeline.

**Mitigação atual:**
Os nomes descritivos das falhas (ex: "P-C: Déficit de Conhecimento para Interpretação", "A-G: Falha de Supervisão de Delegação") preservam a semântica Hendy mesmo sem o mapeamento formal. A taxonomia de preconditions P1-P7, T1-T2, W1-W3, S1-S3, O1-O6 é compatível com as categorias de Hendy.

**Relação com A3-b:**
O `decision_trace` registra `source_name` do gate, mas não mapeia para a pergunta da ladder de Hendy correspondente ao código produzido.

**Próxima evolução recomendada:**
Documentar matriz explícita código → pergunta/nó Hendy antes de qualquer uso metodológico externo dos dados (A3-c ou A3-d). Não requer alteração de código.

---

## 7. AN-002 — HFA Step 1/Step 2 Divergentes de Hendy

**Tema:** Renumeração e colapso dos steps de Hendy

**Status metodológico:** `HFA_ADAPTATION_REQUIRES_NOTE` + `GAP`

**Fonte/camada:** HFA — adaptação computacional própria.

**O que o HFA/SERA faz hoje:**
- **HFA Step 1** (`runStep1`): extração de metadados factuais via LLM — tipo de aeronave, fase do voo, meteorologia, local, envolvidos. É um extrator de contexto, não uma identificação de departure point.
- **HFA Step 2** (`runStep2`): identificação do "Ponto de Desvio da Operação Segura" — ator, ato observável, momento e justificativa. Aproxima o conteúdo do Hendy Step 1.
- **Hendy Step 2** (goal/perception/action statements): não existe como etapa explícita. As três perguntas são respondidas implicitamente durante os Steps 3-5, não como statements afirmativos pré-ladder.

**Por que é adaptação:**
Hendy Step 1 = identificação do departure from safe operation. Hendy Step 2 = formulação explícita das três perguntas (goal, perception, action) antes de entrar nas ladders. No HFA, o departure point está em HFA Step 2, e as três perguntas estão colapsadas dentro dos LLM calls de Steps 3-5. A renumeração não é um problema funcional, mas representa um risco de comunicação, auditoria e ensino: quem lê "Step 1" no HFA não está vendo o Step 1 de Hendy.

**Risco metodológico:**
Alto. A ausência de goal/perception/action statements como etapa explícita pré-ladder elimina a camada de interpretação intermediária que Hendy prevê. Se o texto bruto for ambíguo, não há um estágio registrado de formulação do estado mental do operador antes da classificação. A ausência de distinção `unsafe_act` vs `unsafe_condition` no output impede análises epidemiológicas que dependam dessa categorização.

**Mitigação atual:**
O campo `escape_point` no payload é uma aproximação funcional do departure point de Hendy. O `raw_llm_output` contém a justificativa completa do Step 2.

**Relação com A3-b:**
O `decision_trace` em A3-b registra qual caminho foi tomado em cada eixo, mas não resolve a ausência de statements pré-ladder. O mapeamento HFA Step X → Hendy Step Y deve ser documentado explicitamente, mesmo sem alteração de código.

**Próxima evolução recomendada:**
A3-d: estudo de viabilidade de Step 1/2 explicit statements — extrair goal/perception/action como etapa nova, antes das ladders, medindo o impacto no motor. Pré-requisito: A3-c concluído.

---

## 8. AN-003 — Gates + LLM Fallback em Vez de Ladders Interrogativas Completas

**Tema:** Arquitetura de classificação: gates determinísticos + LLM, não ladder Hendy completa

**Status metodológico:** `TECHNICAL_HEURISTIC` + `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — decisão de arquitetura computacional.

**O que o HFA/SERA faz hoje:**
Cada Step 3/4/5 segue a estrutura:
```
[gate 1: evidenceOf*() → código imediato]
[gate 2: evidenceOf*() → código imediato]
... (10-15 gates) ...
[nenhum gate disparou → LLM responde nós 0, 1, 2... com perguntas sim/não]
```
Na maioria dos casos de fixtures calibrados, o código vem de um gate determinístico — o LLM não é consultado.

**Por que é adaptação:**
Hendy define ladders interrogativas com perguntas sequenciais aplicadas uniformemente a todos os casos. No HFA, casos onde um gate dispara não passam por nenhuma pergunta explícita; o gate afirma o resultado com base em matching lexical. A pergunta "o motor percorreu a ladder de Hendy?" não tem uma resposta única — depende do caminho percorrido para aquele caso específico.

**Risco metodológico:**
Médio. Gates determinísticos são conservadores e calibrados, mas não rastreiam causalidade — detectam tokens no texto normalizado. Um falso positivo em um gate produz um código sem justificativa de reasoning. O LLM fallback tem caráter interrogativo, mas não usa IDs de perguntas mapeados para a ladder de Hendy; e "DADO INSUFICIENTE" é tratado como justificativa de "Não", não como estado separado de evidência insuficiente.

**Relação com A3-b:**
O `decision_trace` em A3-b expõe se o código veio de `deterministic_gate`, `llm_node` ou `infer_function`. Isso resolve a observabilidade de execução, mas não implementa a ladder interrogativa completa. Para casos com gate determinístico, o trace informa qual gate disparou, mas não registra quais perguntas foram consideradas e descartadas.

**Próxima evolução recomendada:**
A3-d+: implementar question_trace formal com IDs de perguntas mapeados para a ladder de Hendy. De curto prazo, documentar para cada gate qual pergunta da ladder ele aproxima.

---

## 9. AN-004 — O-C Awareness Estrito

**Tema:** Guard O-C que exige 4 blocos lexicais simultâneos de awareness explícita

**Status metodológico:** `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — adaptação mais restritiva do que Hendy exige.

**O que o HFA/SERA faz hoje:**
O gate O-C (`hasExplicitConsciousMinimumOrRuleDeviation`) retorna `true` somente quando o texto normalizado contém simultaneamente:
1. Awareness explícita (ex: "consciência explicita", "ciente", "aware", "knowingly")
2. Limite/regra/procedimento explícito (ex: "minimos", "limite de visibilidade", "ceiling minimum")
3. Marca de desvio/crossing (ex: "ultrapassad", "violou", "descumpr", "crossed")
4. Continuidade/prosseguimento (ex: "continuou", "prosseguiu", "manteve", "proceeded")

A regra foi implementada em A2-i para corrigir a divergência A0-DAUMAS-E02-A (O-D → O-C).

**Por que é adaptação:**
Hendy exige, para O-C, que o operador tenha consciência de que estava cruzando um limite e prosseguiu assim mesmo. O HFA exige que essa consciência seja **lexicalmente explícita** no relato — mais restritivo. Violações culturalmente normalizadas ou descritas de forma indireta não dispararão O-C, podendo ser classificadas incorretamente como O-D.

**Risco metodológico:**
Médio. O risco principal é falso-negativo: situações de violação consciente onde o relato não usa os termos esperados são classificadas em outro código. A direção do erro é conservadora (subnotifica O-C), mas pode distorcer análises populacionais de violações com awareness em contextos com linguagem de relato mais formal ou indireta.

**Mitigação atual:**
A regra é conservadora por design. O `decision_trace` (A3-b) registra quando o gate O-C disparou, permitindo revisão humana. Revisão manual é recomendada para casos classificados como O-D em eventos com potencial O-C.

**Próxima evolução recomendada:**
Revisão Hendy-first para casos de O-C implícito ou cultural: desenvolver question_trace para O-C que inclua perguntas sobre motivação do prosseguimento, mesmo sem vocabulário explícito de awareness.

---

## 10. AN-005 — A-A vs A-B Perception-Anchored Coherent Action

**Tema:** Guard que distingue ação coerente com percepção incorreta (A-A) de omissão procedural independente (A-B)

**Status metodológico:** `SOURCE_INFERRED_FROM_HENDY` + `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** Distinção A-A/A-B operacionalizada por Daumas/HFA; regra de não-dupla-contagem causal inferida de Hendy.

**O que o HFA/SERA faz hoje:**
O gate `evidenceOfPerceptionAnchoredCoherentAction` (implementado em A2-n) retorna `true` quando:
1. O texto contém marcadores de falha perceptual dominante (P-G/P-H)
2. A ação foi uma continuação coerente com o estado perceptivo
3. Não há marcadores de omissão física específica (ex: "não instalou", "não travou", "pino de travamento")

Quando o guard dispara (e os gates de A-G, A-H, A-E, A-F não dispararam), o motor retorna A-A determinístico, evitando que o LLM classifique como A-B.

**Por que é adaptação:**
A distinção A-A/A-B é operacionalização Daumas/HFA, não nomenclatura original de Hendy. A lógica de não-dupla-contagem (quando P captura a falha dominante, A deve refletir o prosseguimento coerente, não repetir a mesma falha como omissão) é uma inferência razoável de Hendy, mas não é explicitamente declarada por ele. A regra de 3 blocos + negação física é calibração empírica dos fixtures A2-n, não uma derivação causal formal.

**Risco metodológico:**
Médio. O risco principal é apagar um A-B real: se um caso contiver tanto uma falha perceptiva (P-G/P-H) quanto uma omissão procedural genuinamente independente, o guard pode classificar incorretamente como A-A. As exclusões explícitas para A-G, A-H, A-E, A-F e omissão física/procedural independente reduzem o risco, mas não o eliminam para omissões físicas não cobertas pelos termos do Bloco 3.

**Mitigação atual:**
As exclusões `!feedbackCheckFailure`, `!supervisionFailure`, `!maintenanceOmission`, `!temporalExecutionFailure`, `!communicationConfirmationFailure`, `!technicalKnowledgeDeficit` e `!evidenceOfSelectionError` protegem os casos canônicos. A2-n confirmou zero regressão nos fixtures oficiais de A-B. O `decision_trace` (A3-b) registra quando o gate A-A disparou.

**Próxima evolução recomendada:**
Documentar a matriz A-A/A-B com casos canônicos de cada lado. Verificar se a regra se sustenta para casos fora do contexto offshore (plataforma/atenção capturada por proximidade).

---

## 11. AN-006 — P-H Conflito Multi-Fonte

**Tema:** Guard para conflito não resolvido entre fontes de informação operacional independentes

**Status metodológico:** `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — extensão do conceito de canal de informação de Hendy para cenário multi-fonte.

**O que o HFA/SERA faz hoje:**
O gate `evidenceOfConflictingOperationalInformation` (A2-m) retorna `true` quando o texto contém simultaneamente:
1. Contexto multi-source com conflito (ex: radar/visual/GPS/FMS/fontes independentes em conflito)
2. Conflito não resolvido antes da ação (ex: "não foi resolvido", "sem resolver o conflito", "identificação incompleta")

**Por que é adaptação:**
Hendy prevê, no eixo de percepção, falhas de canal de informação. O HFA estendeu esse conceito para o padrão específico de conflito entre fontes operacionais simultâneas (radar vs. visual, GPS vs. FMS) sem que o operador tenha resolvido a discrepância. Essa extensão é coerente com a lógica Hendy, mas sua operacionalização como 2 blocos lexicais é uma heurística HFA sem mapeamento explícito para as perguntas da ladder de Hendy para P-H.

**Risco metodológico:**
Médio. O risco principal é lexicalizar communication/information failure: o gate pode disparar por correspondência de tokens sem verificar se há realmente um conflito de fontes no sentido de Hendy — ou seja, se o operador tinha acesso simultâneo a fontes discordantes e não reconciliou a discordância antes de agir.

**Mitigação atual:**
O Bloco 2 exige evidência de conflito não resolvido, não apenas de múltiplas fontes. O gate precede P-G preemptivo para evitar contaminação. Fixtures TEST-P-H-001 e TEST-P-H-002 foram preservados em A2-m.

**Próxima evolução recomendada:**
Converter o gate em perguntas explícitas: (1) O operador tinha acesso a fontes independentes? (2) Essas fontes indicavam estados conflitantes? (3) O operador resolveu a discordância antes de agir? (4) A ação foi tomada com a discordância não resolvida? Isso aproxima o gate da lógica interrogativa de Hendy.

---

## 12. AN-007 — P-G Monitoring/Checklist/Fuel

**Tema:** Gate para lacunas de monitoramento de parâmetro, checklist ou combustível

**Status metodológico:** `UNCONFIRMED` + `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — operacionalização lexical de failure modes de percepção.

**O que o HFA/SERA faz hoje:**
O gate P-G preemptivo (`evidenceOfMonitoringFailure`) detecta termos de monitoramento periódico de combustível, discrepância entre checklist declarado e estado real, e item crítico pendente com prosseguimento. Termos foram adicionados incrementalmente em A2-m para os clusters CHK-001, CHK-003, FUEL-002.

**Por que é adaptação:**
P-G captura falha de monitoramento no eixo de percepção: o operador não percebeu o estado real por falha de atenção ou monitoramento. Mas o mesmo padrão pode ser A-G (feedback check failure): o operador não verificou o resultado de sua ação. A distinção entre P-G (falha de percepção) e A-G (falha de feedback sobre ação) é metodologicamente importante, mas o gate atual detecta vocabulário compatível com ambos os casos.

O status `UNCONFIRMED` reflete que, para alguns fixtures (ex: A0-CHK-001), não foi confirmado se a falha dominante é perceptiva (P-G) ou de feedback de ação (A-G). A0-CHK-003 tem tanto P-G quanto A-G como expected, confirmando a ambiguidade.

**Risco metodológico:**
Médio. Confundir eixo P (falha perceptiva) com A-G (feedback failure) pode produzir análises causais incorretas a nível de preconditions: as preconditions de P-G (atenção, monitoramento de ambiente) são diferentes das de A-G (verificação de ação, supervisão). Em banco de dados, essa confusão pode distorcer análises de distribuição de fatores contribuintes.

**Mitigação atual:**
A ordem de gates em Step 3 faz P-H preceder P-G, evitando que conflito multi-fonte seja confundido com monitoring failure. O gate A-G no Step 5 usa `feedbackCheckFailure` como variável separada.

**Próxima evolução recomendada:**
Separar o decision_trace de P-G vs A-G por caso. Quando ambos disparam no mesmo relato, documentar qual eixo é dominante e qual é derivado. Implementar question_trace com a pergunta explícita de Hendy sobre eixo perceptivo vs. eixo de ação para esse padrão.

---

## 13. AN-008 — P-D/A-H Pressão Temporal Lexical

**Tema:** Guard para gerenciamento temporal com atenção capturada (P-D) e falha de execução temporal (A-H)

**Status metodológico:** `DAUMAS_APPLIED_IMPROVEMENT` + `TECHNICAL_HEURISTIC`

**Fonte/camada:** Base em Hendy/Daumas para time pressure/time management; implementação HFA lexical e específica ao contexto offshore.

**O que o HFA/SERA faz hoje:**
O gate `evidenceOfSpeedManagementAttentionCapture` (A2-k) retorna `true` quando o texto contém simultaneamente:
1. Parâmetro crítico degradando abaixo de limite seguro (ex: "velocidade continuou caindo", "abaixo da faixa segura")
2. Atenção capturada por tarefa de proximidade operacional (ex: "atenção capturada pela proximidade da plataforma", "sobrevoo de plataforma")

O mesmo guard dispara tanto P-D (Step 3) quanto A-H (Step 5), capturando o padrão de falha de gerenciamento temporal durante execução de tarefa com atenção capturada.

**Por que é adaptação:**
Hendy e Daumas reconhecem time pressure e time management como categorias válidas nos eixos de percepção e ação. A implementação atual é uma heurística específica ao contexto de plataforma offshore: os marcadores precisos identificados em A2-k (A0-AUTO-003, A0-DAUMAS-E02-B) não são a definição geral de pressão temporal. O `DAUMAS_APPLIED_IMPROVEMENT` reflete a base conceitual de Daumas para pressão temporal MDC; o `TECHNICAL_HEURISTIC` reflete a calibração empírica dos dois fixtures específicos.

**Risco metodológico:**
Médio. O risco principal é classificar P-D/A-H por correspondência lexical sem evidência causal de que havia uma relação real entre tempo disponível e carga cognitiva. A especificidade dos termos reduz mas não elimina esse risco.

**Mitigação atual:**
Dois blocos obrigatórios simultâneos aumentam a precisão. Os fixtures de regressão TEST-P-D-001, TEST-A-H-002, TEST-A-C-001/002 foram preservados em A2-k.

**Próxima evolução recomendada:**
Desenvolver evidência causal para P-D/A-H que inclua a relação entre tempo disponível, carga cognitiva e o parâmetro degradado. Verificar se o gate generaliza para contextos além do offshore.

---

## 14. AN-009 — Preconditions por Lookup P/O/A/ERC ou LLM

**Tema:** Derivação de preconditions sem trace causal active_failure → precondition → evidence

**Status metodológico:** `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — mecanismo de derivação funcional mas sem cadeia causal explícita.

**O que o HFA/SERA faz hoje:**
Dois mecanismos derivam as preconditions:

1. **Determinístico** (`selectDeterministicPreconditions`): consulta `matrix.json` com regras do tipo "se action_code = A-D → preconditions W1, W2, P1, O2, O4". Fonte declarada do matrix: "HFA fixture-derived operationalization of SERA/Hendy/Daumas preconditions". Verifica evidência textual para cada precondition, mas o vínculo é lookup de código, não análise causal.

2. **LLM** (`runStep6_7`): o LLM recebe os três códigos + relato e gera preconditions com `evidencia_no_relato`. Usado quando o mecanismo determinístico não dispara.

O mecanismo determinístico tem prioridade quando dispara.

**Por que é adaptação:**
Hendy define preconditions como condições latentes derivadas por análise da active failure identificada — a derivação é causal. A derivação HFA por lookup de código é uma operacionalização que mapeia códigos para preconditions prováveis, não uma análise causal do evento específico. A validade das preconditions depende da qualidade do matrix (fixture-derived), não de uma análise causal do relato.

**Risco metodológico:**
Alto. Se as preconditions são derivadas por lookup e não por análise causal, podem virar camada decorativa: presentes no output, mas sem vínculo verificável com a narrativa. Em uso clínico (investigação de acidente), essa limitação é crítica. Em uso epidemiológico, a falta de trace causal impede verificar que a precondition reflete realmente o evento.

**Relação com A3-b:**
A3-b preservou `sourceRuleId` nas preconditions determinísticas e adicionou `preconditions_trace` mínimo (mecanismo: `deterministic_matrix`, `llm`, `mixed`). Isso expõe a origem de cada precondition, mas não é a cadeia causal `active_failure → precondition → evidence` que Hendy exige. O vínculo entre active failure e precondition ainda é implícito na regra do matrix.

**Próxima evolução recomendada:**
A3-e: revisão do `matrix.json` com derivação explícita de cada regra a partir da cadeia `active_failure → precondition → evidence`, com referência metodológica Hendy/Daumas. Estrutura de output alvo:
```json
{
  "active_failure": "A-D",
  "precondition": "W1",
  "causal_link": "...",
  "evidence_in_report": "..."
}
```

---

## 15. AN-010 — LLM como Classificadora em Fallback

**Tema:** LLM participa de decisões de classificação quando nenhum gate determinístico dispara

**Status metodológico:** `TECHNICAL_HEURISTIC` + `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — decisão arquitetural de usar LLM como fallback interrogativo.

**O que o HFA/SERA faz hoje:**
Quando nenhum gate determinístico dispara em Steps 3/4/5, o motor consulta o LLM com perguntas sim/não ("Nó 0", "Nó 1", etc.). A resposta é normalizada para "Sim" ou "Não". "DADO INSUFICIENTE" é tratado como justificativa de "Não" — o sistema sempre produz um código, mesmo com evidência insuficiente.

**Por que é adaptação:**
Hendy define uma decision aid sequencial: o analista responde perguntas em sequência, percorrendo a ladder. O LLM como fallback tem o espírito interrogativo das ladders, mas sem IDs de perguntas, sem estado `insufficient_evidence` estruturado, e sem mapeamento para as perguntas formais da ladder de Hendy. "DADO INSUFICIENTE" forçado para branch "Não" pode produzir um código mesmo quando a evidência não sustenta nenhuma classificação.

**Risco metodológico:**
Alto. O risco principal é que o LLM substitua o decision aid por classificador direto: em vez de responder perguntas específicas com evidência rastreável, o modelo pode inferir o código a partir de padrões gerais do relato, sem passar pela sequência lógica de Hendy. Sem `question_trace`, não é possível verificar post-hoc qual raciocínio o LLM usou para casos sem gate.

**Relação com A3-b:**
O `decision_trace` de A3-b expõe quando o código veio de `llm_node`, distinguindo-o de `deterministic_gate` e `infer_function`. Isso é um avanço importante, mas não resolve o problema estrutural de ausência de question_trace formal.

**Próxima evolução recomendada:**
Reformular o papel da LLM: ao invés de responder sim/não em nós genéricos, o LLM deve receber `step_id + question_id + pergunta específica` e retornar `answer + evidence + confidence + uncertainty`. Quando a evidência for insuficiente, retornar `insufficient_evidence` como estado — não forçar classificação.

---

## 16. AN-011 — Anti-Gates Supervisão/Manutenção

**Tema:** Gates que bloqueiam supervisão/manutenção como ator de active failure

**Status metodológico:** `HFA_ADAPTATION_REQUIRES_NOTE`

**Fonte/camada:** HFA — adaptação para evitar colapso de precondition em active failure.

**O que o HFA/SERA faz hoje:**
As funções `isMaintainenceOrOrganizationalAgent()` e `isEscapePointOrganizationalAgent()` detectam se o agente identificado no Step 2 é organizacional (manutenção, supervisão, organização). Quando isso ocorre, certos gates de active failure são suprimidos ou redirecionados para evitar que uma precondition de supervisão/organização seja classificada incorretamente como active failure do operador direto.

Essa lógica é interna: afeta o comportamento dos gates mas não produz um campo `direct_actor` ou `actor_level` no output.

**Por que é adaptação:**
A separação ator direto / supervisão é fundamental em Hendy para a correta derivação de preconditions. O HFA implementa essa separação internamente, mas não a expõe no schema de output. A identificação do ator direto — que guia todos os gates internos — é opaca externamente.

**Risco metodológico:**
Médio. O risco principal é bloquear uma active failure legítima quando supervisão ou manutenção **é** o ator direto: se um supervisor tomou uma decisão operacional direta, o anti-gate pode suprimir incorretamente um código de active failure válido. A identificação do agente no Step 2 é uma extração LLM — se o agente for identificado erroneamente como organizacional, os anti-gates falham silenciosamente, sem nenhum campo no output indicando que o redirecionamento ocorreu.

**Mitigação atual:**
O Step 2 usa `Point.json` com instrução de identificar o ator diretamente envolvido. O `raw_llm_output.step2` preserva a justificativa completa da identificação do agente.

**Próxima evolução recomendada:**
A3-f: adicionar campos `direct_actor` e `actor_level` ao schema de output, tornando explícita a classificação do agente. Isso permite auditar externamente se os anti-gates foram aplicados corretamente.

---

## 17. AN-012 — Candidates A2 como Sucesso Técnico, Não Baseline Metodológico

**Tema:** Resultado 12/13 P/O/A corretos em A2-n é validação técnica de fixtures, não promoção de baseline

**Status metodológico:** `TECHNICAL_HEURISTIC` com observação de validação técnica; `HFA_ADAPTATION_REQUIRES_NOTE` quando relacionado ao uso de candidates como critério de decisão metodológica.

**Fonte/camada:** HFA — resultado de calibração empírica com fixtures.

**O que o HFA/SERA faz hoje:**
O motor atingiu em A2-n 12/13 P/O/A corretos, FAIL=0, determinism_rate=100%, com 5 PASS e 8 PARTIAL (divergência apenas em ERC, que é LLM-variável). A única divergência P/O/A remanescente é A0-CHK-002-ADJ (P-A actual vs P-D expected, MOVE_TO_EXPLORATORY). Esse resultado foi obtido por calibração iterativa em A2-i a A2-n, com cada fase atacando um cluster de divergências.

**Por que é adaptação:**
Sucesso técnico em fixtures não equivale a validação metodológica pelas seguintes razões:
1. A maioria das fixtures foi criada iterativamente durante a calibração — há risco de circularidade entre motor e fixtures.
2. O motor implementa Hendy de forma implícita e parcial (ver AN-002, AN-003).
3. Preconditions são derivadas por lookup, não por trace causal (ver AN-009).
4. A2-n não foi submetido a N_RUNS=3 (critério de estabilidade estatística).
5. `decision_trace` e `preconditions_trace` formais estavam ausentes até A3-b.

**Risco metodológico:**
Alto. Usar "12/13" como justificativa para promover baseline é o risco principal. Cada gate adicionado em A2 foi calibrado para acertar fixtures específicos — o sucesso técnico pode refletir overfitting aos casos de calibração em vez de generalização metodológica. Se os candidates A2 forem promovidos a baseline metodológico sem as condições da Regra 11 da GOVERNANCE_RULES, qualquer uso externo dos dados HFA/SERA estará baseado em uma implementação com desvios metodológicos não rastreados.

**Mitigação atual:**
A GOVERNANCE_RULES seção 11 bloqueia explicitamente a promoção de baseline até: `decision_trace` implementado, `preconditions_trace` com vínculo causal, ADAPTATION_NOTES formais, N_RUNS adequado, e confirmação de que fixtures não foram usados como fonte metodológica.

**Próxima evolução recomendada:**
A3-g (pós A3-b + A3-c + A3-e): avaliação formal de promoção de baseline. Pré-requisitos mínimos: este documento, preconditions causal trace (A3-e), N_RUNS=3 candidate-only, e revisão humana dos gaps AN-002 e AN-009.

---

## 18. Relação com A3-b Decision Trace

A3-b adicionou rastreabilidade mínima ao pipeline sem alterar a lógica de classificação:

| Implementado em A3-b | Status |
|---|---|
| `decision_trace` por eixo em `raw_llm_output` | Implementado — distingue `deterministic_gate`, `llm_node`, `infer_function` |
| `preconditions_trace` mínimo em `raw_llm_output` | Implementado — mecanismo: `deterministic_matrix`, `llm`, `mixed` |
| Preservação de `sourceRuleId` nas preconditions | Implementado — exposto no payload normalizado |
| Contagem de nós percorridos | Implementado |
| Detecção de `DADO INSUFICIENTE` | Implementado |

| Ainda ausente após A3-b | Impacto |
|---|---|
| Ladder Hendy completa com question IDs | Não é possível mapear decisões para perguntas formais de Hendy |
| goal/perception/action statements pré-ladder | Interpretação intermediária do estado mental do operador ausente |
| `unsafe_condition` como campo separado | Não é possível distinguir unsafe act de unsafe condition |
| `direct_actor` / `actor_level` | Identificação do nível do agente interna, não auditável externamente |
| Preconditions causal trace explícito | Vínculo `active_failure → precondition → evidence` ainda implícito |
| `unanswered_questions` estruturado | Sistema sempre classifica; evidência insuficiente não produz estado separado |

---

## 19. Matriz de Prioridade

### P0 — Bloqueadores de confiabilidade metodológica

Estes itens precisam ser endereçados antes de qualquer uso metodológico externo dos dados:

| Item | Nota | Razão de prioridade |
|---|---|---|
| Step 1/2 explícitos no sentido Hendy | AN-002 | Fundamento da análise; ausência compromete interpretação de todos os resultados |
| Preconditions causal trace | AN-009 | Preconditions sem trace causal não sustentam análise de risk management |
| LLM como respondente estruturado | AN-010 | LLM como classificador livre pode produzir resultados não auditáveis |
| Baseline não promovido sem trace | AN-012 | Promoção prematura contamina uso externo dos dados |

### P1 — Lacunas diagnósticas com risco de erro sistemático

| Item | Nota | Razão de prioridade |
|---|---|---|
| Revisão P-G vs A-G | AN-007 | Confusão de eixo compromete derivação de preconditions |
| O-C awareness implícito | AN-004 | Subnotificação de violações conscientes em narrativas indiretas |
| P-H perguntas explícitas | AN-006 | Gate lexical pode lexicalizar o que deveria ser análise de fontes |
| A-A/A-B validação canônica | AN-005 | Risco de apagar A-B real em casos fora do padrão offshore calibrado |
| Anti-gates actor_level | AN-011 | Falha silenciosa se agente identificado incorretamente |

### P2 — Melhorias de rastreabilidade e documentação

| Item | Nota | Razão de prioridade |
|---|---|---|
| Matriz código → Hendy | AN-001 | Útil para auditoria; não bloqueia uso atual |
| P-D/A-H evidência causal | AN-008 | Heurística funcionalmente estável; evolução de médio prazo |

---

## 20. Regras para Futuras Mudanças de Motor

Todo novo gate, patch ou adaptação deve:

1. **Citar uma ADAPTATION_NOTE existente ou criar uma nova** — não há mudança metodologicamente "neutra".
2. **Declarar qual pergunta do fluxo SERA o gate representa** — se não houver pergunta correspondente, o gate é `TECHNICAL_HEURISTIC` e deve ser rotulado como tal.
3. **Declarar o status metodológico** — usando exatamente os status da seção 10 de GOVERNANCE_RULES; nenhum status novo pode ser criado sem revisão formal.
4. **Toda fixture nova deve separar metodologia de expected técnico** — o expected deve derivar de análise metodológica, não do output atual do motor.
5. **Nenhuma mudança deve buscar apenas "acertar fixture"** — se o único argumento para um gate é que ele faz o motor acertar um fixture, o gate não deve ser criado.
6. **Todo patch de motor deve verificar regressão nos fixtures oficiais** — não apenas nos fixtures-alvo.
7. **Gates que afetam a fronteira entre eixos** (ex: P-G vs A-G, A-A vs A-B) devem documentar o critério de desambiguação com referência metodológica.

---

## 21. Conclusão

O pipeline HFA/SERA em A3-c tem:

- **Resultado técnico sólido**: 12/13 P/O/A corretos, FAIL=0, determinism_rate=100%, motor determinístico e estável.
- **Rastreabilidade mínima inaugurada**: A3-b adicionou `decision_trace` e `preconditions_trace` mínimos, expondo o caminho de classificação para cada análise.
- **Adaptações documentadas**: este documento formaliza 12 notas com status, risco e evolução recomendada para cada desvio em relação a Hendy/Daumas.

O pipeline HFA/SERA ainda **não é um baseline metodológico**. Os gaps de P0 — Step 1/2 explícitos, preconditions causal trace, papel estruturado da LLM — precisam ser endereçados antes de qualquer promoção. Esses gaps não são críticas à implementação atual; são reconhecimentos honestos de que um pipeline computacional de análise de fatores humanos requer mais do que acerto de fixtures para ser metodologicamente auditável.

**Daumas é parte estrutural deste pipeline**, não uma fonte secundária. A codificação sistemática das falhas ativas, a separação didática das etapas e as melhorias de aplicabilidade de Daumas são contribuições que devem ser preservadas e expandidas — sempre com mapeamento explícito para a lógica causal de Hendy.

O caminho à frente é rastreabilidade crescente: question_trace → goal/perception/action statements → preconditions causal trace → unsafe_condition/direct_actor → avaliação de baseline. Cada passo deve ser cirúrgico, sem alterar o que já funciona empiricamente, e sem prometer o que ainda não está validado.

---

*Documento criado em 2026-05-21 como parte da fase SERA v0.1.4-A3-c-review. Nenhum código, fixture, candidate, baseline ou report foi alterado. Este documento é governança e documentação metodológica read-only.*
