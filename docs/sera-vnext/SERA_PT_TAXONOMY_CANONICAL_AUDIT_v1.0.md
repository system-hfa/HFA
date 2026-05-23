# SERA-PT Taxonomy Canonical Audit v1.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-45b — SERA-PT Taxonomy Canonical Audit  
Scope: read-only/documental

## 1. Resumo Executivo
A taxonomia **não está pronta** para suportar A4+R-46 (Preconditions from Released Codes) sem uma canonização prévia.

Principais motivos bloqueantes:
- ambiguidade documental relevante em Ação (A-A vs A-C) no material de referência Daumas extraído;
- referência a `O-E` no vNext sem definição canônica correspondente na taxonomia operacional atual (legacy/rules e docs-base principais usam O-A..O-D);
- inconsistência entre textos internos sobre fronteira A-G vs A-J e requisito temporal;
- necessidade de consolidar fonte normativa única para labels/definições/exclusões antes de derivar preconditions.

Decisão recomendada: executar **A4+R-45c — Taxonomy Canonicalization/Errata** antes de A4+R-46.

Nota de governança posterior:
- os bloqueios desta auditoria foram tratados em A4+R-45c;
- a decisão autoral de A-A/A-C foi formalizada em A4+R-45d:
  - [SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0.md)

## 2. Fontes Analisadas
### 2.1 Hendy / SERA original
- [docs/reference/hendy-sera-2003.txt](/Users/filipedaumas/SAAS/HFA/docs/reference/hendy-sera-2003.txt)
- [metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf](/Users/filipedaumas/SAAS/HFA/metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf)

### 2.2 Dissertação / Anexo A (Daumas)
- [docs/reference/daumas-sera-offshore.txt](/Users/filipedaumas/SAAS/HFA/docs/reference/daumas-sera-offshore.txt)
- [metodologia/Dissertação - Filipe Daumas - ANÁLISE DE FATORES HUMANOS EM INCIDENTES NA AVIAÇÃO OFFSHORE.pdf](/Users/filipedaumas/SAAS/HFA/metodologia/Dissertação%20-%20Filipe%20Daumas%20-%20ANÁLISE%20DE%20FATORES%20HUMANOS%20EM%20INCIDENTES%20NA%20AVIAÇÃO%20OFFSHORE.pdf)

### 2.3 Docs internos HFA/SERA
- [docs/sera-vnext/SERA_ENGINE_VNEXT_REVIEW_TO_CLASSIFICATION_POLICY_v0.2.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_ENGINE_VNEXT_REVIEW_TO_CLASSIFICATION_POLICY_v0.2.0.md)
- [docs/sera-vnext/SERA_ENGINE_VNEXT_HUMAN_DECISION_INPUT_SCHEMA_v0.2.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_ENGINE_VNEXT_HUMAN_DECISION_INPUT_SCHEMA_v0.2.0.md)
- [docs/sera-vnext/SERA_ENGINE_VNEXT_SEMANTIC_CONSISTENCY_RELEASED_CODES_v0.2.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_ENGINE_VNEXT_SEMANTIC_CONSISTENCY_RELEASED_CODES_v0.2.0.md)
- [docs/SERA_CODE_EVIDENCE_MATRIX.md](/Users/filipedaumas/SAAS/HFA/docs/SERA_CODE_EVIDENCE_MATRIX.md)
- [docs/SERA_ADAPTATION_NOTES_v0.1.4.md](/Users/filipedaumas/SAAS/HFA/docs/SERA_ADAPTATION_NOTES_v0.1.4.md)

### 2.4 Implementação vNext (estado atual)
- [frontend/src/lib/sera-vnext/types.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/types.ts)
- [frontend/src/lib/sera-vnext/human-decision.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/human-decision.ts)
- [frontend/src/lib/sera-vnext/code-release.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/code-release.ts)
- [frontend/src/lib/sera-vnext/semantic-consistency.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/semantic-consistency.ts)
- [frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts)

### 2.5 Referência histórica (legacy, sem alteração)
- [frontend/src/lib/sera/rules/BASELINE.md](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/BASELINE.md)
- [frontend/src/lib/sera/rules/perception/*.json](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/perception)
- [frontend/src/lib/sera/rules/objective/*.json](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/objective)
- [frontend/src/lib/sera/rules/action/*.json](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/action)
- [frontend/src/lib/sera/rules/exclusions/*.json](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/exclusions)

## 3. Fora de Escopo
Ficaram explicitamente fora desta auditoria:
- MDC (modelagem/integração);
- entrevista estruturada;
- HFACS;
- Risk/ERC e ARMS/ERC;
- recomendações;
- UI/API/DB;
- múltiplos unsafe acts no data model;
- implementação de código nesta fase.

## 4. Matriz Canônica Preliminar (P/O/A)

### 4.1 Percepção
| code | axis | label atual | definição operacional | origem | evidência mínima | exclusões-chave | dependências | ambiguidade | decisão recomendada |
|---|---|---|---|---|---|---|---|---|---|
| P-A | P | Sem falha perceptiva específica | default sem evidência perceptiva dominante | HFA adaptation + Daumas operacional | ausência de evidência de falha perceptiva | P-B..P-H | evidência negativa clara | baixa | CONFIRM |
| P-B | P | Falha sensorial física | estímulo não detectado por limitação sensorial/ambiental | Hendy+Daumas | barreira sensorial explícita | P-C/P-F | distinção de mecanismo sensorial vs interpretação | baixa | CONFIRM |
| P-C | P | Falha de interpretação/conhecimento perceptivo | estímulo percebido, interpretação comprometida por lacuna de conhecimento | Hendy+Daumas | déficit explícito de conhecimento interpretativo | P-B/P-G | separar de A-E | média | NEEDS_DOC_ONLY_CLARIFICATION |
| P-D | P | Sobrecarga atencional | falha de atenção sob pressão temporal/alta demanda | Hendy+Daumas | demanda/pressão explícita | P-E/P-G | evidência de tempo/carga | baixa | CONFIRM |
| P-E | P | Erro de gerenciamento temporal perceptivo | priorização temporal inadequada na percepção | Hendy+Daumas | erro de estratégia temporal | P-D | distinção operacional P-D vs P-E | média | NEEDS_DOC_ONLY_CLARIFICATION |
| P-F | P | Ilusão/distorção perceptiva | percepção ambígua/ilusória | Hendy+Daumas | evidência de ilusão/ambiguidade perceptiva | P-B/P-C | ambiente/display/vestibular | baixa | CONFIRM |
| P-G | P | Falha de monitoramento/verificação | informação disponível não foi monitorada/checada | Hendy+Daumas/HFA | informação disponível + não checagem | P-A/P-D/P-H | exige distinção de A-G | média | NEEDS_CODE_CHANGE_LATER |
| P-H | P | Falha de comunicação/informação | falha de transmissão humano-humano ou humano-máquina | Hendy+Daumas | evidência de transmissão incompleta/incorreta | P-C/P-G | gradiente de autoridade/comunicação | média | NEEDS_DOC_ONLY_CLARIFICATION |

### 4.2 Objetivo
| code | axis | label atual | definição operacional | origem | evidência mínima | exclusões-chave | dependências | ambiguidade | decisão recomendada |
|---|---|---|---|---|---|---|---|---|---|
| O-A | O | Objetivo operacional correto | objetivo nominal sem desvio intencional explícito | Hendy+Daumas/HFA | ausência de intenção desviante | O-B/O-C/O-D | relação com percepção correta | baixa | CONFIRM |
| O-B | O | Violação rotineira normalizada | desvio habitual/culturalmente tolerado | Hendy+Daumas | evidência de rotina/normalização | O-C/O-D | prova de habitualidade | média | NEEDS_DOC_ONLY_CLARIFICATION |
| O-C | O | Violação excepcional/circunstancial | desvio consciente pontual não rotineiro | Hendy+Daumas/HFA | desvio consciente + não rotineiro | O-B/O-D/O-A | intenção e awareness de regra | média | NEEDS_AUTHOR_DECISION |
| O-D | O | Objetivo de eficiência/economia | objetivo arriscado sem violação formal | Hendy+Daumas/HFA | evidência explícita de eficiência/economia | O-B/O-C/O-A | diferenciação de O-B/O-C | média | NEEDS_AUTHOR_DECISION |
| O-E | O | **não definido canonicamente** | referenciado em vNext guardrails sem definição em baseline operacional | vNext-only reference | inexistente hoje | n/a | exige definição formal e origem | **alta** | **BLOCKS_PRECONDITIONS** |

### 4.3 Ação
| code | axis | label atual | definição operacional | origem | evidência mínima | exclusões-chave | dependências | ambiguidade | decisão recomendada |
|---|---|---|---|---|---|---|---|---|---|
| A-A | A | Sem falha de ação específica (legacy) | ação coerente com percepção/objetivo, sem mecanismo específico de falha de ação | HFA adaptation | ausência de mecanismo específico | A-B..A-J | coerência com O/P | **alta (conflito com Daumas txt)** | **BLOCKS_PRECONDITIONS** |
| A-B | A | Omissão/lapso/deslize procedural | passo omitido/execução incompleta | Hendy+Daumas/HFA | omissão procedural específica | A-D/A-E/A-F/A-G/A-J | separar de A-C | média | NEEDS_DOC_ONLY_CLARIFICATION |
| A-C | A | Não verificar resultado da própria ação (legacy) | falha de verificação pós-ação própria | HFA adaptation + Daumas (em parte) | ação executada + falta de checagem | A-G/A-J | feedback próprio vs de terceiros | **alta (A-C aparece como “nenhuma falha” em Daumas txt extraído)** | **BLOCKS_PRECONDITIONS** |
| A-D | A | Incapacidade física/ergonômica/motora | limitação física impediu execução | Hendy+Daumas/HFA | evidência física/motora/ergonômica explícita | A-B/A-E/A-F | vínculo físico comprovado | baixa | CONFIRM |
| A-E | A | Falta de conhecimento/habilidade operacional | não sabia o que fazer corretamente | Hendy+Daumas/HFA | déficit de conhecimento/treino | A-F/A-B | distinção conhecimento vs seleção | média | NEEDS_DOC_ONLY_CLARIFICATION |
| A-F | A | Seleção errada entre alternativas | escolha errada entre opções conhecidas | Hendy+Daumas/HFA | erro de seleção explícito | A-E/A-I | pressão temporal separa de A-I | média | NEEDS_DOC_ONLY_CLARIFICATION |
| A-G | A | Falha de supervisão/delegação/verificação de terceiros | falha de feedback sobre ação de terceiro | HFA adaptation (com base Hendy feedback) | ação de terceiro + dever de supervisão | A-C/A-J | fronteira A-C vs A-G | média | NEEDS_AUTHOR_DECISION |
| A-H | A | Falha de gerenciamento temporal na execução | priorização temporal inadequada na execução | Hendy+Daumas/HFA | falha de tempo na execução | A-I | pressão temporal explícita | média | NEEDS_DOC_ONLY_CLARIFICATION |
| A-I | A | Seleção/instrução inadequada sob pressão | erro de seleção sob pressão temporal/carga explícita | Hendy+Daumas/HFA | pressão temporal + seleção errada | A-F/A-H | relação explícita com tempo | baixa | CONFIRM |
| A-J | A | Falha de confirmação/readback/comunicação operacional | falha de comunicação/feedback operacional | HFA adaptation + Daumas (feedback sob tempo) | falha de confirmação/readback/recepção | A-G/A-C | requisito temporal não está canônico em todos os artefatos | **alta** | **BLOCKS_PRECONDITIONS** |

## 5. Auditorias Específicas
1. A-C está duplicado ou ambíguo?  
Sim. No material Daumas extraído aparece `A-C` como “Falha de Feedback” e também como “Nenhuma Falha de Ação”. Isso conflita com a taxonomia legacy atual (`A-A` = nenhuma falha de ação; `A-C` = não verificar resultado da própria ação).

2. A-A significa falha ou ausência de falha?  
No runtime legacy atual, `A-A` = ausência de falha de ação específica. No texto Daumas extraído, `A-A` aparece associado a “deslize/lapso/erro”. Há inconsistência documental que exige errata canônica.

3. Existe código explícito para “nenhuma falha de ação”?  
Sim no runtime (`A-A`). Porém há conflito textual em fonte de referência (menção de `A-C`).

4. A-F/A-I dependem de pressão temporal?  
Canonicamente, sim para distinção: `A-F` sem pressão temporal explícita; `A-I` com pressão temporal/carga explícita.

5. A-G/A-J dependem de pressão temporal?  
No Hendy/Daumas, variantes de feedback sob pressão são diferenciadas. No material HFA atual, fronteira A-G/A-J ainda precisa canonização explícita (temporalidade não está uniforme em todos os artefatos).

6. P-D/P-G dependem de pressão temporal?  
Sim, distinção principal esperada: `P-D` com pressão/alta demanda; `P-G` sem pressão temporal dominante.

7. O-C/O-D/O-E exigem intenção/consciência/regra?  
`O-C` e `O-D` sim (com nuances diferentes). `O-E` não pode ser avaliado: código não está canonicamente definido.

8. “Objetivo” preserva o sentido de Goal/PCT?  
Sim. A tradução “Objetivo” está semanticamente alinhada ao Goal do PCT/Hendy no corpus analisado.

9. O semantic guard A4+R-45 está coerente com taxonomia canônica?  
Parcialmente coerente. Está correto em travas metodológicas (A-D físico; O-intent/rule-awareness; percepção mecanismo). Mas referencia `O-E` sem definição canônica vigente e precisa ajuste após canonização.

## 6. Decisões Recomendadas
| item | decisão |
|---|---|
| Confirmar eixo Goal->Objetivo e P/O/A como estrutura principal | CONFIRM |
| Confirmar distinção P-D vs P-G por pressão temporal | CONFIRM |
| Confirmar distinção A-F vs A-I por pressão temporal | CONFIRM |
| Resolver conflito A-A vs A-C (nenhuma falha vs feedback/slip-lapse) | BLOCKS_PRECONDITIONS |
| Definir/retirar `O-E` do contrato vNext | BLOCKS_PRECONDITIONS |
| Canonizar fronteira A-G vs A-J (incluindo temporalidade) | BLOCKS_PRECONDITIONS |
| Consolidar matriz única de labels/definições/exclusões (fonte normativa única) | BLOCKS_PRECONDITIONS |
| Ajustes posteriores no guard semântico para aderir ao canon final | NEEDS_CODE_CHANGE_LATER |
| Clarificações de documentação para O-B/O-C/O-D e A-B/A-C/A-G | NEEDS_DOC_ONLY_CLARIFICATION |

## 7. Bloqueios para A4+R-46
Bloqueia iniciar Preconditions from Released Codes enquanto não fechar:
- canon oficial para A-A/A-C;
- decisão formal sobre existência/definição de O-E;
- regra canônica A-G vs A-J;
- documento único de taxonomia (v1.0 canonical) com errata explícita de conflitos Daumas extraído vs runtime.

## 8. Próximos Passos
Recomendado executar **A4+R-45c — Taxonomy Canonicalization/Errata** com entregáveis mínimos:
1. tabela canônica final P-A..P-H / O-A..O-D (ou O-E se aprovado) / A-A..A-J;
2. errata explícita para ambiguidade A-A/A-C do material extraído;
3. decisão de autor para O-E;
4. regra final A-G/A-J;
5. patch de alinhamento em docs e, só depois, ajustes de código onde necessário.

Após isso: seguir para **A4+R-46 Preconditions from Released Codes**.
