# SERA-PT Taxonomy Canonical v1.0

Status: DRAFT_FOR_AUTHOR_REVIEW  
Phase: A4+R-45c — Taxonomy Canonicalization / Errata  
Scope: taxonomy-only

## 1. Decisão de Escopo
Fora de escopo desta fase:
- MDC;
- entrevista estruturada;
- HFACS;
- Risk/ERC e ARMS/ERC;
- recomendações;
- UI/API/DB;
- múltiplos unsafe acts no data model;
- Preconditions.

## 2. Fontes
- Hendy / SERA original:
  - [docs/reference/hendy-sera-2003.txt](/Users/filipedaumas/SAAS/HFA/docs/reference/hendy-sera-2003.txt)
  - [metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf](/Users/filipedaumas/SAAS/HFA/metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf)
- Dissertação Filipe Daumas / Anexo A (material textual extraído):
  - [docs/reference/daumas-sera-offshore.txt](/Users/filipedaumas/SAAS/HFA/docs/reference/daumas-sera-offshore.txt)
  - [metodologia/Dissertação - Filipe Daumas - ANÁLISE DE FATORES HUMANOS EM INCIDENTES NA AVIAÇÃO OFFSHORE.pdf](/Users/filipedaumas/SAAS/HFA/metodologia/Dissertação%20-%20Filipe%20Daumas%20-%20ANÁLISE%20DE%20FATORES%20HUMANOS%20EM%20INCIDENTES%20NA%20AVIAÇÃO%20OFFSHORE.pdf)
- Auditoria A4+R-45b:
  - [docs/sera-vnext/SERA_PT_TAXONOMY_CANONICAL_AUDIT_v1.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_PT_TAXONOMY_CANONICAL_AUDIT_v1.0.md)
- Docs HFA/SERA relevantes:
  - [docs/SERA_CODE_EVIDENCE_MATRIX.md](/Users/filipedaumas/SAAS/HFA/docs/SERA_CODE_EVIDENCE_MATRIX.md)
  - [docs/SERA_ADAPTATION_NOTES_v0.1.4.md](/Users/filipedaumas/SAAS/HFA/docs/SERA_ADAPTATION_NOTES_v0.1.4.md)
- vNext atual:
  - [frontend/src/lib/sera-vnext/types.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/types.ts)
  - [frontend/src/lib/sera-vnext/human-decision.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/human-decision.ts)
  - [frontend/src/lib/sera-vnext/semantic-consistency.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/semantic-consistency.ts)
- Legacy apenas como referência histórica:
  - [frontend/src/lib/sera/rules/BASELINE.md](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules/BASELINE.md)
  - [frontend/src/lib/sera/rules](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera/rules)

## 3. Princípios Canônicos
1. P/O/A é a estrutura principal da taxonomia ativa (Perception/Objective/Action).
2. “Objetivo” no SERA-PT corresponde ao conceito de Goal no framing IP/PCT de Hendy.
3. Cada código canônico deve ter significado operacional único.
4. Nenhum código pode carregar dois significados operacionais simultâneos.
5. “Ausência de falha” não pode colidir com código de falha ativa.
6. Pressão temporal é variável explícita quando separa classes semânticas.
7. O-C e O-D exigem evidência de intenção e de relação com regra/risco conforme seu critério.
8. O-E não pode permanecer ativo sem definição formal aprovada.

## 4. Decisões Canônicas Obrigatórias

### 4.1 Decisão A-A / A-C
Decisão canônica v1.0:
- `A-A` = **sem falha de ação específica** (ação coerente com percepção e objetivo já estabelecidos; não há mecanismo de falha de ação mais específico).
- `A-C` = **falha de feedback/verificação pós-ação própria** (o agente executa a ação, mas falha em verificar o resultado da própria ação).

Ratificação autoral:
- decisão formalmente ratificada em A4+R-45d:
  - [SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0.md)

Resolução normativa:
- o runtime HFA/SERA segue esta definição canônica v1.0;
- trechos ambíguos extraídos da dissertação (incluindo mapeamentos textuais conflitantes entre A-A e A-C) são tratados como **ambiguidade de fonte secundária**, não como fonte normativa operacional.

### 4.2 Decisão O-E
Decisão canônica v1.0:
- `O-E` = **RESERVED / NOT_ACTIVE**.

Resolução normativa:
- eixo Objective ativo em v1.0: `O-A`, `O-B`, `O-C`, `O-D`;
- `O-E` fica reservado para eventual futura formalização, com definição e evidências mínimas aprovadas;
- `O-E` não deve ser exigido pelo semantic guard nesta fase.

### 4.3 Decisão A-G / A-J
Decisão canônica v1.0:
- `A-G` = falha de feedback/verificação/supervisão envolvendo ação de terceiro ou coordenação, **sem pressão temporal dominante**.
- `A-J` = falha de feedback/comunicação/readback/recebimento **sob pressão temporal dominante** (variante temporal-comunicacional).

Fronteiras canônicas:
- `A-C`: verificação da própria ação.
- `A-G`: verificação/supervisão/coordenação sobre ação de terceiro ou coordenação operacional.
- `A-J`: falha de feedback/comunicação com pressão temporal dominante.

### 4.4 Variável de pressão temporal
Definição conceitual v1.0 (sem novo schema nesta fase):
- `timePressureExcessive` = percepção operacional de tempo insuficiente para processar informações e agir adequadamente no contexto.

Uso canônico:
- separa `P-D` de `P-G`;
- separa `A-F` de `A-I`;
- separa `A-G` de `A-J`.

## 5. Matriz Canônica Final

### 5.1 Perception
| code | axis | canonical label | canonical definition | minimum evidence | exclusions | dependencies | source | status |
|---|---|---|---|---|---|---|---|---|
| P-A | P | Sem falha perceptiva específica | Default sem evidência perceptiva de falha dominante | ausência de evidência perceptiva ativa | P-B..P-H | coerência com evidência negativa | HFA adaptation (Hendy-aligned) | ACTIVE |
| P-B | P | Falha sensorial física | Sinal não detectado por limitação sensorial/ambiental | barreira sensorial explícita | P-C/P-F | causalidade sensorial | Hendy + Daumas | ACTIVE |
| P-C | P | Falha de interpretação por conhecimento perceptivo | Sinal percebido, mas mal interpretado por déficit de conhecimento | déficit de conhecimento interpretativo explícito | P-B/P-G | distinção de A-E | Hendy + Daumas + HFA adaptation | ACTIVE |
| P-D | P | Sobrecarga atencional | Falha de atenção com alta demanda e pressão temporal dominante | demanda/carga/pressão explícita | P-E/P-G | `timePressureExcessive` | Hendy + Daumas | ACTIVE |
| P-E | P | Falha de gerenciamento temporal perceptivo | Priorização temporal perceptiva inadequada | erro de estratégia temporal explícito | P-D | tempo e priorização | Hendy + Daumas | ACTIVE |
| P-F | P | Ilusão ou distorção perceptiva | Percepção ambígua/ilusória de sinais disponíveis | evidência de ilusão/distorção | P-B/P-C | contexto perceptivo | Hendy + Daumas | ACTIVE |
| P-G | P | Falha de monitoramento/verificação | Informação disponível não foi monitorada/verificada sem pressão dominante | informação disponível + não monitoramento | P-D/P-H | não dominar `timePressureExcessive` | Hendy + Daumas + HFA adaptation | ACTIVE |
| P-H | P | Falha de comunicação/informação | Falha de transmissão humano-humano ou humano-máquina | evidência de informação incompleta/ambígua/incorreta transmitida | P-C/P-G | cadeia de comunicação | Hendy + Daumas | ACTIVE |

### 5.2 Objective
| code | axis | canonical label | canonical definition | minimum evidence | exclusions | dependencies | source | status |
|---|---|---|---|---|---|---|---|---|
| O-A | O | Objetivo operacional correto | Objetivo nominal sem desvio intencional explícito | ausência de intenção desviante | O-B/O-C/O-D | relação com percepção e regra | Hendy + Daumas + HFA adaptation | ACTIVE |
| O-B | O | Violação rotineira normalizada | Desvio habitual/culturalmente normalizado | evidência de repetição/normalização/tolerância | O-C/O-D | prova de habitualidade | Hendy + Daumas | ACTIVE |
| O-C | O | Violação excepcional/circunstancial | Desvio consciente pontual não rotineiro de regra/procedimento conhecido | evidência de consciência + desvio + não rotina | O-B/O-D/O-A | intenção consciente e awareness de regra | Hendy + Daumas + HFA adaptation | ACTIVE |
| O-D | O | Objetivo de eficiência/economia | Objetivo de ganho operacional sem violação formal explícita, mas menos conservador | evidência explícita de eficiência/economia/ganho operacional | O-B/O-C/O-A | relação com gestão de risco | Hendy + Daumas + HFA adaptation | ACTIVE |
| O-E | O | Reserved (not active) | Código reservado sem definição formal aprovada no v1.0 | n/a | n/a | decisão futura do autor | HFA placeholder | RESERVED |

### 5.3 Action
| code | axis | canonical label | canonical definition | minimum evidence | exclusions | dependencies | source | status |
|---|---|---|---|---|---|---|---|---|
| A-A | A | Sem falha de ação específica | Ação coerente com percepção/objetivo; sem mecanismo específico de falha de ação | ausência de mecanismo específico de falha | A-B..A-J | coerência causal com P/O | HFA adaptation (Hendy/Daumas aligned) | ACTIVE |
| A-B | A | Omissão/lapso/deslize procedural | Omissão de passo procedural/físico esperado | omissão procedural específica | A-D/A-E/A-F/A-G/A-J | execução vs seleção | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-C | A | Falha de feedback pós-ação própria | Não verificação do resultado da própria ação após execução | ação própria executada + ausência de verificação | A-G/A-J | feedback da própria ação | HFA adaptation + Daumas aligned | ACTIVE |
| A-D | A | Incapacidade física/ergonômica/motora | Limitação física/motora/ergonômica impediu execução correta | evidência física/motora/ergonômica explícita | A-B/A-E/A-F | capacidade de resposta | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-E | A | Falta de conhecimento/habilidade operacional | Falha por desconhecimento técnico/procedimental | déficit explícito de conhecimento/habilidade | A-F/A-B | conhecimento vs seleção | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-F | A | Seleção errada entre alternativas | Escolha errada entre alternativas conhecidas, sem pressão dominante | seleção errada explícita | A-E/A-I | ausência de `timePressureExcessive` dominante | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-G | A | Falha de feedback/supervisão de terceiros | Falha de verificação/supervisão/coordenação sobre ação de terceiros | ação de terceiro + dever de verificação | A-C/A-J | domínio de terceiro, sem pressão dominante | HFA adaptation (Hendy feedback branch) | ACTIVE |
| A-H | A | Falha de gerenciamento temporal na execução | Sequenciamento/priorização temporal inadequados na execução | erro temporal de execução explícito | A-I | estratégia temporal | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-I | A | Seleção/instrução inadequada sob pressão | Seleção errada sob pressão temporal dominante | pressão temporal + seleção errada | A-F/A-H | `timePressureExcessive` | Hendy + Daumas + HFA adaptation | ACTIVE |
| A-J | A | Falha de feedback/comunicação sob pressão temporal | Falha de readback/recebimento/comunicação/fechamento de loop sob pressão temporal dominante | evidência de falha comunicacional + pressão temporal dominante | A-C/A-G | `timePressureExcessive` + comunicação operacional | HFA adaptation (temporal feedback branch) | ACTIVE |

## 6. Errata / Canonical Resolution of Source Ambiguities
1. Ambiguidade A-A/A-C em fonte textual extraída (Daumas) foi resolvida por decisão canônica v1.0:
- A-A = sem falha de ação específica;
- A-C = falha de feedback pós-ação própria.

2. O-E sem definição formal foi removido do conjunto ativo e definido como `RESERVED`.

3. Fronteira A-G/A-J foi canonizada por critério de pressão temporal dominante e natureza da falha (supervisão/coordenação vs comunicação/readback em pressão).

4. Em conflito entre trecho textual ambíguo e contrato canônico v1.0, prevalece este documento canônico.

## 7. Impacto no Semantic Guard (A4+R-45)
Estado esperado após canonização:
- semantic guard deve tratar objetivo estrito apenas com códigos ativos (`O-C`, `O-D`);
- `O-E` não deve ser exigido nem classificado como ativo no guard semântico nesta fase;
- locks permanecem inalterados: sem downstream, sem finalConclusion, sem HFACS/Risk/ERC/ARMS.

Arquivos de impacto:
- [docs/sera-vnext/SERA_ENGINE_VNEXT_SEMANTIC_CONSISTENCY_RELEASED_CODES_v0.2.0.md](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/SERA_ENGINE_VNEXT_SEMANTIC_CONSISTENCY_RELEASED_CODES_v0.2.0.md)
- [frontend/src/lib/sera-vnext/semantic-consistency.ts](/Users/filipedaumas/SAAS/HFA/frontend/src/lib/sera-vnext/semantic-consistency.ts)

## 8. Bloqueios Restantes para A4+R-46
Com esta canonização, o bloqueio taxonômico de definição foi reduzido para implementação pontual de alinhamento no semantic guard.

Decisão desta fase:
- após alinhar `O-E` para `RESERVED` no semantic guard e validar suite vNext, **A4+R-46 pode prosseguir**.
