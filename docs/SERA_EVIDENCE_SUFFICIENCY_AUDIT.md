# SERA — Auditoria Transversal de Suficiência de Evidência

**Data:** 2026-05-15
**Versão do motor auditado:** v0.1.1 release candidate (pré-smoke global)
**Autor:** auditoria metodológica — não altera código
**Relacionado:** `SERA_EVIDENCE_SUFFICIENCY.md`, `SERA_INPUT_EVIDENCE_PHILOSOPHY.md`, `SERA_CODE_EVIDENCE_MATRIX.md`
**Revisado em:** 2026-05-15 — diagnóstico técnico corrigido após leitura de `all-steps.ts` completo (Step 3 e Step 5 têm gates determinísticos extensos; auditoria anterior estava incorreta)

---

## 1. Objetivo e Escopo

Este documento audita **onde o pipeline já trata insuficiência de evidência** e **onde força classificação indevida** — sem propor implementação ainda.

**Pergunta central:** em cada etapa (P, O, A, ERC, pré-condições), o motor é capaz de distinguir entre "evidência insuficiente para classificar" e "evidência suficiente para um código específico"?

**Fora do escopo:**
- Implementação de gates ou prompts
- Alteração de fixtures ou baseline
- Mudanças no motor (`all-steps.ts`, `select.ts`, regras JSON)

**Base empírica:** leitura completa de `frontend/src/lib/sera/all-steps.ts` (3148 linhas), `rules/objective/select.ts`, `rules/preconditions/select.ts`, e smoke run `tests/reports/run-1778818791061.json` (157/162 PASS, 5 PARTIAL).

---

## 2. Regra-mãe e Princípios de Suficiência

A regra-mãe já está documentada em `SERA_EVIDENCE_SUFFICIENCY.md`:

> **"Classificar quando há base; perguntar quando falta base; nunca inventar base."**

Os quatro estados de suficiência formalizados:

| Estado | Definição | Ação esperada do motor |
|---|---|---|
| **Suficiente** | Evidência clara e inequívoca para um código | Classificar com confiança |
| **Parcial** | Evidência compatível mas incompleta | Classificar provisoriamente, sinalizar baixa confiança |
| **Insuficiente** | Não há base para classificar | Gerar perguntas específicas, não classificar |
| **Contraditória** | Dois sinais mutuamente exclusivos | Reportar contradição, não resolver arbitrariamente |

**Diagnóstico imediato:** o motor não implementa esses quatro estados de forma explícita. Ele sempre produz uma classificação — nunca retorna "insuficiente" nem gera perguntas complementares. Isso é a lacuna sistêmica central, independente da cobertura de gates.

---

## 3. Diagnóstico — Step 3: Percepção (P)

### Gates determinísticos existentes

**Correção crítica de versão anterior:** Step 3 tem uma cascata extensa de gates determinísticos, executados em prioridade estrita antes de qualquer nó LLM. A versão anterior desta auditoria estava incorreta ao afirmar "Nenhum gate determinístico" e "delega integralmente ao LLM".

| Gate | Código | Função disparadora | Prioridade |
|---|---|---|---|
| Gate P-C (conhecimento) | P-C | `evidenceOfKnowledgeDeficit` | 1 |
| Gate P-C (interpretativo) | P-C | `evidenceOfInterpretiveKnowledgeDeficit` | 2 |
| Gate P-B (barreira sensorial) | P-B | `evidenceOfSensoryBarrier` | 3 |
| Gate P-A anti P-D físico | P-A | `evidenceOfPhysicalIncapacity` (sem alta demanda) | 4 |
| Gate P-H | P-H | `evidenceOfInformationChannelFailure` AND NOT `supervisionFailure` | 5 |
| Gate P-E forte | P-E | `evidenceOfVeryStrongTemporalPerceptionFailure` | 6 |
| Gate P-E | P-E | `evidenceOfTemporalPerceptionFailure` AND NOT `genuineHighDemand` | 7 |
| Gate P-G preemptivo | P-G | `evidenceOfMonitoringFailure` AND NOT `genuineHighDemand` AND NOT pura eficiência | 8 |
| Gate P-E preemptivo | P-E | temporal execution failure AND NOT `genuineHighDemand` | 9 |
| Gate P-D (pressão/comunicação) | P-D | `evidenceOfOperationalCommunicationPressure` | 10 |
| Gate P-D (alta demanda) | P-D | `evidenceOfAttentionOverload` | 11 |
| Gate P-G (monitoramento) | P-G | `evidenceOfMonitoringFailure` AND NOT pura eficiência | 12 |
| Gate P-G (checagem própria) | P-G | (`ownActionCheckFailure` OR `proceduralOmission`) AND NOT seleção AND NOT supervisão | 13 |
| Gate P-A | P-A | `physicalIncapacity` OR `selectionError` OR `supervisionFailure` OR pura eficiência | 14 |
| Gate P-F ilusão | P-F | `evidenceOfPerceptualIllusion` | 15 |
| **LLM: Nós 0–6** | P-A a P-H | **Somente se nenhum gate anterior se aplicou** | fallback |

Apenas casos não cobertos por nenhum dos ~15 gates acima chegam ao fluxo LLM (Nó 0–6).

### Comportamento observado no smoke

O único PARTIAL com componente de percepção é **TEST-O-B-001** (run2: classificou P-G em vez de P-A). Dado que gates P-G existem e são determinísticos, o mecanismo de erro **não é ausência de gate** — é que `evidenceOfMonitoringFailure` pode fazer match em contextos de violação rotineira (O-B), ativando o Gate P-G mesmo quando o mecanismo dominante é desvio de objetivo, não falha perceptiva de monitoramento.

### Lacunas identificadas (reframing pós-leitura do motor)

| Lacuna | Severidade | Descrição corrigida |
|---|---|---|
| **L3-01** | Alta | Gate P-G existe mas `evidenceOfMonitoringFailure` pode fazer over-match em contextos de O-B (violação rotineira): padrões de omissão procedural ativam o gate mesmo quando o mecanismo dominante é objetivo desviante, não falha perceptiva |
| **L3-02** | Baixa | P-D é coberto por dois gates (`evidenceOfAttentionOverload` + `evidenceOfOperationalCommunicationPressure`). Lacuna residual: sobrecarga descrita com vocabulário fora dos padrões desses gates |
| **L3-03** | Baixa | P-H é coberto por gate determinístico (`evidenceOfInformationChannelFailure`). Lacuna residual: briefings ambíguos descritos com terminologia fora dos padrões de `evidenceOfInformationChannelFailure` |
| **L3-04** | Baixa | P-F é coberto por gate determinístico (`evidenceOfPerceptualIllusion`). Lacuna residual: ilusões descritas com vocabulário não capturado pelos padrões regex da função |

**Diagnóstico correto para Step 3:** a cobertura determinística é ampla e bem estruturada. O problema real é de fronteira de padrão (L3-01): a função `evidenceOfMonitoringFailure` opera sobre léxico e pode ativar P-G em contextos que metodologicamente pertencem a O-B + P-A. Isso não é ausência de gate — é potencial over-reach de um gate existente.

---

## 4. Diagnóstico — Step 4: Objetivo (O)

### Gates determinísticos existentes

Step 4 tem a arquitetura de gates mais explicitamente documentada no pipeline:

```
classifyObjectiveByRules(text)
  → hasExplicitProtectiveHumanIntent  → O-C (se presente)
  → hasExplicitRoutineNormalization   → O-B (se presente)
  → hasExplicitEfficiencyObjective    → O-D (se presente)
  → null (se nenhum)

evidenceOfObjectiveCForbiddenContext(text)  → força O-A (contexto de comunicação ou eficiência operacional)

hasKnowledgeDeficitObjectiveContext(text)   → força O-A (contexto de desconhecimento)

LLM Nó 1: "Objetivo consistente com normas?"
  → "Sim" → LLM Nó 2: eficiência? → O-D ou O-A
  → "Não" → LLM Nó 2: rotineira/excepcional? → O-B ou O-C
```

### Problema central identificado no smoke

O LLM em **Nó 1** não distingue entre:
- **Situação excepcional** (alta demanda, ilusão, ferramenta indisponível, briefing ambíguo) com objetivo conservativo → **O-A correto**
- **Violação excepcional de regra conhecida** (desvio consciente, pontual, não rotineiro) → **O-C correto**

Quando o LLM responde "Não" (objetivo inconsistente com normas) para casos de restrição externa, o fluxo vai para Nó 2. Nó 2 pergunta "rotineira ou excepcional?". O LLM responde "excepcional" pela mesma razão (situação externa excepcional), produzindo **O-C incorreto**.

### Quatro casos afetados no smoke

| Fixture | Expected | Classificado | Mecanismo de erro |
|---|---|---|---|
| TEST-P-D-001 | O-A | O-C (run0) | ATC sob alta demanda → LLM interpreta "não tive tempo" como desvio excepcional |
| TEST-P-F-001 | O-A | O-C (run2) | Piloto com ilusão vestibular → LLM interpreta desorientação como desvio consciente |
| TEST-P-H-001 | O-A | O-C (run1) | Técnico com briefing ambíguo → LLM interpreta inspeção do sistema errado como desvio |
| TEST-T2-W2-001 | O-A | O-C (run1) | Equipe sem ferramenta adequada → LLM interpreta uso de ferramenta improvisada como desvio |

### Lacunas identificadas

| Lacuna | Severidade | Descrição |
|---|---|---|
| **L4-01** | **Crítica** | Nó 1 do LLM não distingue "situação excepcional sem desvio consciente" de "violação excepcional de regra conhecida" |
| **L4-02** | **Crítica** | O caminho LLM → O-C não tem gate pós-LLM que verifique presença de evidência de desvio consciente, pontual e não rotineiro antes de retornar O-C |
| **L4-03** | Alta | Resultado de Step 3 (P-D, P-F, P-H) não é passado como contexto para Step 4 — o LLM de Step 4 opera sobre o relato bruto sem saber qual código de percepção foi classificado |
| **L4-04** | Média | `evidenceOfObjectiveCForbiddenContext` e `hasKnowledgeDeficitObjectiveContext` não cobrem padrões de restrição física (ferramenta indisponível, T2-W2, W2-W3) |

### O que funciona bem

- `hasExplicitProtectiveHumanIntent`: correto — captura O-C com motivação protetiva antes do LLM.
- `hasExplicitRoutineNormalization`: correto — O-B via gate é preciso.
- `hasKnowledgeDeficitObjectiveContext`: correto — bloqueia O-C/O-B quando há deficit de conhecimento explícito.

### Diagnóstico crítico e nota metodológica

**O caminho LLM → O-C carece de gate que verifique suficiência de evidência de desvio consciente.** O caminho existe legitimamente e pode produzir O-C correto, mas só deve fazê-lo quando houver evidência suficiente de desvio consciente, pontual e não rotineiro de regra/procedimento/expectativa conhecida. Na ausência de tal evidência, o motor deve retornar O-A conservador e/ou registrar lacuna de evidência.

**Nota metodológica obrigatória:** O-C NÃO exige proteção humana como motivação. O-C por conveniência, improviso, pressão circunstancial ou economia de esforço é igualmente válido. O que diferencia O-C de O-A é o caráter **consciente** e **não rotineiro** do desvio de regra/procedimento/expectativa operacional conhecida — não a motivação específica. Situação excepcional externa (alta demanda, ilusão, ferramenta indisponível) por si só não constitui O-C se não houver desvio consciente de regra conhecida.

---

## 5. Diagnóstico — Step 5: Ação (A)

### Gates determinísticos existentes

**Correção crítica de versão anterior:** Step 5 tem a arquitetura de gates determinísticos mais extensa de todo o pipeline, cobrindo virtualmente todos os códigos A-A a A-J antes de qualquer nó LLM. A versão anterior desta auditoria estava incorreta ao afirmar "Nenhum gate determinístico" e "delega integralmente ao LLM".

| Gate | Código | Função disparadora |
|---|---|---|
| Gate A-F (ilusão perceptiva) | A-F | `evidenceOfPerceptualIllusionAction` |
| Gate A-A (barreira sensorial) | A-A | `evidenceOfSensoryBarrier` |
| Gate A-A (déficit interpretativo) | A-A | `evidenceOfInterpretiveKnowledgeDeficit` |
| Gate A-D | A-D | `evidenceOfPhysicalIncapacity` |
| Gate A-E | A-E | `evidenceOfKnowledgeDeficit` |
| Gate A-A (briefing/informação ambígua) | A-A | `evidenceOfInformationChannelFailure` AND NOT `supervisionFailure` |
| Gate A-G | A-G | `evidenceOfSupervisionFailure` |
| Gate A-J (comunicação central) | A-J | `evidenceOfCentralCommunicationFailure` |
| Gate A-J | A-J | `evidenceOfCommunicationConfirmationFailure` |
| Gate A-H | A-H | `evidenceOfTemporalExecutionFailure` |
| Gate A-A (objetivo O-C forçado) | A-A | `forceObjectiveOverride` → O-C |
| Gate A-A (administrativo redundante) | A-A | `evidenceOfAdministrativeRedundantNoOperationalImpact` |
| Gate A-A (sobrecarga atencional) | A-A | `evidenceOfExplicitHighDemandOperationalContext` AND NOT seleção errada |
| Gate A-I | A-I | `evidenceOfWrongOperationalSelectionUnderLoad` |
| Gate A-F | A-F | `evidenceOfSelectionError` |
| Gate A-A (violação rotineira) | A-A | `evidenceOfRoutineViolation` |
| Gate A-C | A-C | `evidenceOfOwnActionCheckFailure` AND NOT `proceduralOmission` |
| Gate A-A (objetivo protetivo) | A-A | `evidenceOfProtectiveObjective` |
| Gate A-B | A-B | `evidenceOfProceduralOmission` |
| Gate A-A (eficiência) | A-A | `evidenceOfEfficiencyObjective` |
| **LLM: Nós 1, 1B, 1C, 1C-B, 2+** | vários | **Somente se nenhum gate anterior se aplicou** |

Apenas casos residuais não cobertos por nenhum dos ~20 gates chegam ao LLM.

### Comportamento observado no smoke

Nenhum PARTIAL atribuível exclusivamente a Step 5 nos 5 casos analisados. Os PARTIALs foram em Step 3 (P-G falso) e Step 4 (O-C falso). Isso é consistente com a alta cobertura de gates determinísticos em Step 5.

### Lacunas identificadas (reframing pós-leitura do motor)

| Lacuna | Severidade | Descrição corrigida |
|---|---|---|
| **L5-01** | Média | A-C e A-B têm gates determinísticos distintos (`evidenceOfOwnActionCheckFailure` → A-C; `evidenceOfProceduralOmission` → A-B). A lacuna real é de prioridade: se ambas as funções dispararem simultaneamente, o gate A-C é bloqueado por `AND NOT proceduralOmission`, priorizando A-B. A lógica está correta mas a fronteira entre omissão procedural e falha de verificação pode ser tênue em relatos ambíguos |
| **L5-02** | Baixa | A-B tem gate determinístico (`evidenceOfProceduralOmission`). Lacuna residual: `evidenceOfProceduralOmission` verifica padrões léxicos de omissão mas não exige prova de involuntariedade — omissões voluntárias (O-C) podem ativar o gate |
| **L5-03** | Baixa | A-G e A-C têm gates determinísticos distintos: A-G dispara em supervisão (terceiro), A-C dispara em checagem da própria ação (sem omissão). A fronteira está explicitamente codificada. Lacuna residual: relatos com ambas as falhas |
| **L5-04** | Baixa | A-D tem gate determinístico (`evidenceOfPhysicalIncapacity`). A-E tem gate determinístico (`evidenceOfKnowledgeDeficit`). Lacuna residual: overlap entre os dois quando o relato menciona limitação e falta de treino simultaneamente |

### Nota sobre A-C no motor

O motor Step 5 classifica A-C via Gate determinístico `evidenceOfOwnActionCheckFailure` (quando sem omissão procedural) e também via Nó 1B do LLM (branch de execução: "A-B ou A-C?"). A menção na versão anterior desta auditoria ao "ramo n1 YES → n1_verify NO" era referência à página Learn (`learn/action/page.tsx`), não ao motor — a nota estava incorreta.

**Diagnóstico correto para Step 5:** a cobertura determinística é a mais ampla do pipeline. O LLM de Step 5 opera em espaço residual estreito. As lacunas são de fronteira de padrão entre funções de evidência, não de ausência de gates.

---

## 6. Diagnóstico — Steps 6-7: ERC e Pré-condições

### Gates e sistemas determinísticos existentes

Steps 6-7 não delegam integralmente ao LLM. Há dois mecanismos determinísticos:

**1. `inferDeterministicErcLevel` (pós-LLM):** função determinística que recebe `(text, perceptionCode, objectiveCode, actionCode, currentErcLevel)` e retorna um nível ERC fixo para ~12 combinações conhecidas de códigos. Exemplos:
- `O-B + A-A` → ERC 1
- `P-H + A-A` → ERC 3
- `P-D + A-A` → ERC 3
- `A-C` (qualquer) → ERC 2
- `A-B` (qualquer) → ERC 3

O resultado do LLM é sobrescrito por este gate quando há match.

**2. `selectDeterministicPreconditions` em `rules/preconditions/select.ts`:** sistema matricial ativo, invocado em `pipeline.ts:301` após `runStep6_7`. Recebe a tupla final `(perception_code, objective_code, action_code, erc_level)` e o texto do relato. Quando retorna resultado, **sobrescreve completamente** as pré-condições geradas pelo LLM (`step6_7.precondicoes = deterministicPreconditions...`). A seleção é baseada em regras de especificidade, evidência léxica no relato (`matchedEvidence`) e lista de bloqueados por combinação de códigos. O mecanismo é análogo ao `inferDeterministicErcLevel`: LLM executa primeiro, determinístico sobrescreve quando há match.

**3. Constraint de prompt:** o prompt de `runStep6_7` inclui instrução explícita: *"Cada pré-condição deve ter evidência DIRETA no relato — sem inferências"*. Isso é uma restrição de suficiência no nível de prompt, não um gate de código.

### Lacunas identificadas

| Lacuna | Severidade | Descrição |
|---|---|---|
| **L6-01** | Média | Quando `selectDeterministicPreconditions` não retorna resultado (nenhuma regra da matriz faz match para a tupla de códigos), as pré-condições do LLM são mantidas. Nesse caso, o único controle de suficiência é a constraint de prompt — não há gate de código que verifique se a evidência citada pelo LLM existe de fato no relato |
| **L6-02** | Média | ERC: `inferDeterministicErcLevel` cobre ~12 combinações. Casos não cobertos delegam ao LLM sem override |
| **L6-03** | Média | P1 (fisiológico) e P2 (psicológico) são pré-condições inferíveis por plausibilidade — fadiga, estresse, ansiedade são sugeridos contextualmente sem evidência direta. Mesmo com `selectDeterministicPreconditions` ativo, se a tupla de códigos não tiver regra de bloqueio para P1/P2, o LLM pode incluí-los sem evidência |
| **L6-04** | Eliminada | `selectDeterministicPreconditions` confirmado como ativo em `pipeline.ts:301` — invocação verificada, não é função dormante |

### Risco sistêmico

Steps 6-7 têm o maior risco de "invenção de base": o LLM tende a completar a narrativa com fatores plausíveis mesmo quando o relato não os menciona. A constraint de prompt mitiga mas não elimina esse risco.

---

## 7. Análise Consolidada dos 5 PARTIAL do Smoke

| Fixture | Step 3 | Step 4 | Causa raiz | Tipo de falha |
|---|---|---|---|---|
| **TEST-P-D-001** | P-D ✓ | O-A esperado, O-C entregue | L4-01: Nó 1 LLM confunde workload com desvio objetivo | Falso O-C (LLM path) |
| **TEST-P-F-001** | P-F ✓ | O-A esperado, O-C entregue | L4-01: Nó 1 LLM confunde ilusão vestibular com desvio consciente | Falso O-C (LLM path) |
| **TEST-P-H-001** | P-H ✓ | O-A esperado, O-C entregue | L4-01: Nó 1 LLM confunde ambiguidade de briefing com desvio voluntário | Falso O-C (LLM path) |
| **TEST-T2-W2-001** | P-A ✓ | O-A esperado, O-C entregue | L4-01 + L4-04: improviso forçado por indisponibilidade de ferramenta interpretado como desvio | Falso O-C (LLM path) |
| **TEST-O-B-001** | P-A esperado, P-G entregue (run2) | Step 4 não afetado | L3-01: `evidenceOfMonitoringFailure` faz over-match no contexto O-B — gate P-G existente disparou incorretamente | Gate P-G over-match |

**Padrão nos 4 falsos O-C:** os 4 casos envolvem restrição externa (workload, ilusão, comunicação, equipamento) sem desvio consciente de regra conhecida. O LLM de Nó 1 confunde "excepcional enquanto situação" com "excepcional enquanto violação de regra". A correção é um gate que exija evidência de desvio consciente antes de retornar O-C pelo caminho LLM.

**TEST-O-B-001:** o gate determinístico P-G disparou — o problema é que `evidenceOfMonitoringFailure` sobre-generaliza para contextos onde o mecanismo dominante é desvio de objetivo, não falha perceptiva. Aqui o gate existe mas sua função é over-broad.

**Determinismo:** 4 dos 5 casos são não-determinísticos (PARTIAL com runs divergentes), confirmando que o LLM opera na região de baixa confiança sem gate de saída.

---

## 8. Pontos Cegos Transversais

Pontos cegos que afetam múltiplas etapas:

### PCC-01 — Pipeline não tem estado "insuficiente"

**Afeta:** Steps 3, 4, 5, 6, 7
**Descrição:** O motor sempre produz uma classificação. Nenhum gate retorna "evidência insuficiente — perguntas complementares necessárias". Quando nenhum gate determinístico dispara, o LLM classifica mesmo com evidência ambígua.
**Risco:** Classificações de baixa confiança entram no baseline sem sinalização.

### PCC-02 — Confiança não é reportada nem usada

**Afeta:** Steps 3, 4, 5
**Descrição:** O LLM pode ter baixa confiança interna mas o pipeline não captura nem reporta isso. O resultado final aparece como classificação sem qualificação de confiança.
**Risco:** Investigador trata como determinístico o que foi probabilístico.

### PCC-03 — Caminho LLM → O-C sem gate de desvio consciente

**Afeta:** Step 4 especificamente
**Descrição:** Para O-C, o gate determinístico pré-LLM (`hasExplicitProtectiveHumanIntent`) captura casos com motivação protetiva. O caminho LLM→O-C existe para outros casos válidos de O-C (conveniência, improviso, pressão circunstancial), mas não tem gate pós-LLM que verifique evidência de desvio **consciente**, **pontual** e **não rotineiro** de regra/procedimento/expectativa operacional conhecida.

**Nota:** Steps 3, 5, e 6-7 têm situação diferente: a maioria dos códigos tem gates determinísticos baseados em funções de evidência lexical. O problema de ausência de gate de suficiência está concentrado no caminho LLM→O-C de Step 4 e nos casos residuais LLM de Step 3 (P-G over-match).
**Risco:** O-C por "situação excepcional" sem desvio consciente — como nos 4 PARTIALs identificados.

### PCC-04 — Step 3 e Step 4 operam de forma independente

**Afeta:** Step 4 especialmente
**Descrição:** Step 3 embute alguma detecção de contexto de objetivo (via `isPureEfficiencyObjective`) para bloquear P-G, mas Step 4 não usa o resultado de Step 3. O LLM de Step 4 opera sobre o relato bruto sem saber que Step 3 classificou P-D, P-F ou P-H — o que seria evidência forte de O-A.
**Risco:** Combinações metodologicamente inconsistentes (P-D + O-C, P-F + O-C) passam pelo pipeline sem detecção.

### PCC-05 — Regra-mãe não está implementada como comportamento

**Afeta:** Todo o pipeline
**Descrição:** "Classificar quando há base; perguntar quando falta base; nunca inventar base" está documentada em `SERA_EVIDENCE_SUFFICIENCY.md` mas não há caminho de retorno "perguntas complementares". Os gates determinísticos implementam parte da regra (classificar quando há padrão explícito; bloquear quando contexto proibido), mas não o ramo "perguntar quando falta base".
**Risco:** A regra existe apenas no papel para o caso de evidência insuficiente.

---

## 9. Recomendações por Prioridade

### Prioridade Crítica (bloqueia qualidade do motor)

| Ref | Recomendação | Lacuna relacionada |
|---|---|---|
| **R-01** | Implementar gate pós-LLM `hasConsciousObjectiveDeviationEvidence` em `runStep4` antes de retornar O-C pelo caminho LLM — deve exigir evidência de desvio **consciente**, **pontual** e **não rotineiro** de regra/procedimento/expectativa conhecida | L4-01, L4-02 |
| **R-02** | Adicionar ao prompt de Nó 1 distinção explícita entre "situação excepcional sem desvio consciente" e "violação excepcional de regra conhecida"; incluir exemplos negativos (P-D, P-F, P-H, T2-W2 não são O-C) | L4-01 |
| **R-03** | Estender `evidenceOfObjectiveCForbiddenContext` ou criar gate similar para padrões de restrição física (ferramenta indisponível, equipamento ausente, T2-W2, W2-W3) | L4-04 |

### Prioridade Alta (afeta determinismo e confiança)

| Ref | Recomendação | Lacuna relacionada |
|---|---|---|
| **R-04** | Auditar `evidenceOfMonitoringFailure` para verificar se faz over-match em contextos de violação rotineira (O-B); adicionar exclusão para contextos onde `evidenceOfRoutineViolation` ou `evidenceOfRoutineOrNormalizedViolation` dispara | L3-01 |
| **R-05** | Adicionar campo `confidence: 'high' \| 'low' \| 'partial'` ao resultado de classificação de cada step; reportar ao investigador | PCC-02 |
| **R-06** | Passar código de Step 3 como contexto adicional para LLM de Step 4 — quando Step 3 retorna P-D, P-F ou P-H, o prompt de Nó 1 deve saber que o mecanismo perceptivo foi externo/involuntário | PCC-04 |

### Prioridade Média (robustez e completude)

| Ref | Recomendação | Lacuna relacionada |
|---|---|---|
| **R-07** | Auditar fronteira entre `evidenceOfOwnActionCheckFailure` (→ A-C) e `evidenceOfProceduralOmission` (→ A-B): garantir que omissões voluntárias (O-C) não ativem Gate A-B indevidamente | L5-02 |
| **R-08** | Verificar se `selectDeterministicPreconditions` de `preconditions/select.ts` é invocada no pipeline em produção; se não, avaliar integração | L6-04 |
| **R-09** | Revisar prompt de Step 6-7 para reforçar a distinção "evidência no relato" vs "plausível por contexto" para P1/P2 fisiológico/psicológico | L6-03 |

### Prioridade Baixa (melhorias futuras)

| Ref | Recomendação | Lacuna relacionada |
|---|---|---|
| **R-10** | Implementar estado "insuficiente" com geração de perguntas complementares (Fase 7 do plano) | PCC-01, PCC-05 |
| **R-11** | Adicionar fixtures específicas para casos de boundary O-A vs O-C para cada tipo de restrição externa (P-D, P-F, P-H, T2-W2) | L4-01 |
| **R-12** | Criar fixture de teste para P-G com e sem contexto de O-B para verificar comportamento de `evidenceOfMonitoringFailure` | L3-01 |

---

## 10. Critérios de Aceite para Implementação Futura

Qualquer implementação baseada nesta auditoria deve satisfazer:

### Para R-01 (gate pós-LLM O-C)

- Os 4 casos falsos (TEST-P-D-001, TEST-P-F-001, TEST-P-H-001, TEST-T2-W2-001) passam de PARTIAL para PASS
- Casos O-C legítimos com motivação diversa (conveniência, improviso, pressão circunstancial, economia de esforço — não apenas proteção humana) continuam PASS
- 0 novas regressões no smoke completo

### Para R-04 (exclusão O-B em evidenceOfMonitoringFailure)

- TEST-O-B-001 passa de PARTIAL para PASS
- Fixtures com P-G legítimo (monitoramento real) continuam PASS
- 0 novas regressões

### Restrição metodológica obrigatória para qualquer patch de O-C

O gate `hasConsciousObjectiveDeviationEvidence` deve aceitar desvio consciente por **qualquer** motivação (conveniência, improviso, atalho situacional, pressão circunstancial, pressão de tempo não imposta externamente, economia de esforço, **ou** proteção humana). Não deve restringir O-C apenas a casos protetivos. Isso preserva a definição metodológica correta pós-fix `f61b8f1`.

### Para qualquer gate novo

- Validação seletiva 3/3 runs, 100% determinístico nas fixtures afetadas
- Smoke completo 162/162 PASS antes de promoção de baseline
- Revisão humana dos casos de boundary antes de confirmar labels

---

## Apêndice — Mapa de Cobertura Real (corrigido)

| Step | Gates determinísticos | LLM | Suficiência tratada? |
|---|---|---|---|
| **Step 3 (P)** | ~15 gates pré-LLM cobrindo P-A, P-B, P-C, P-D, P-E, P-F, P-G, P-H | Somente casos residuais | **Parcial** — cobertura ampla; lacuna em over-match de `evidenceOfMonitoringFailure` em contexto O-B (L3-01) |
| **Step 4 (O)** | 3 pré-LLM (O-C, O-B, O-D) + 2 override (forbidden, knowledge) | Fallback para casos não cobertos | **Parcial** — lacuna crítica: caminho LLM→O-C sem gate de desvio consciente (L4-01, L4-02) |
| **Step 5 (A)** | ~20 gates pré-LLM cobrindo A-A a A-J | Somente casos residuais estreitos | **Parcial** — cobertura mais ampla que Step 4; lacunas em fronteiras de padrão entre funções de evidência |
| **Steps 6-7 (ERC/Pré)** | ERC: `inferDeterministicErcLevel` pós-LLM (~12 combinações); Pré: `selectDeterministicPreconditions` pós-LLM em `pipeline.ts:301` (sobrescreve LLM quando há match) | Fallback quando determinístico não faz match | **Parcial** — ERC e pré-condições têm override determinístico; quando nenhuma regra da matriz faz match para a tupla, pré-condições do LLM são mantidas com constraint de prompt como único controle |

**Conclusão corrigida:** o motor tem cobertura determinística substancial em Steps 3 e 5 — muito maior do que a versão anterior da auditoria indicava. A lacuna crítica está concentrada em Step 4, no caminho LLM→O-C sem gate de suficiência para desvio consciente. Steps 6-7 têm lacuna de suficiência nas pré-condições fisiológicas/psicológicas.
