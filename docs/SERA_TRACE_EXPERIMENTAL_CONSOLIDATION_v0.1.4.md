# SERA Trace Experimental Consolidation
## v0.1.4-A3-d5d2-consolidation

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5d2-consolidation  
**Tipo:** Consolidação técnica e metodológica (somente documental)

## 1. Propósito

Consolidar o estado técnico/metodológico dos subtraces experimentais isolados já implementados em `raw_llm_output.trace_experimental`, preservando a regra de invariância classificatória e registrando decisões para fases futuras.

Escopo consolidado nesta fase:
- `perception_question_trace`
- `objective_question_trace`
- `action_question_trace`
- `preconditions_question_trace`

## 2. Estado técnico atual

### 2.1 `raw_llm_output.question_trace` principal

O `question_trace` principal permanece restrito às perguntas de Step 1/Step 2.  
Não foi expandido para perguntas de Perception, Objective, Action ou Preconditions.

### 2.2 `raw_llm_output.trace_experimental`

O subcampo experimental contém, de forma isolada:
- `perception_question_trace`
- `objective_question_trace`
- `action_question_trace`
- `preconditions_question_trace`

Esses subtraces são observacionais/experimentais, não classificatórios.

### 2.3 `raw_llm_output.trace_isolation`

`trace_isolation` registra a disciplina de snapshot/read-only e comparação de invariantes antes/depois da construção de traces experimentais, com os campos críticos:
- `perception_code`
- `objective_code`
- `action_code`
- `erc_level`
- `precondition_codes`
- `recommendations_count`

Resultado esperado e observado na consolidação: `stable_after_trace_build = true` e `changed_fields = []`.

### 2.4 Regra metodológica consolidada

- Subtraces experimentais ficam fora do `question_trace` principal.
- P/O/A/ERC continuam sendo definidos pelo pipeline classificatório existente.
- Traces experimentais não podem retroalimentar gates, prompts ou decisão final.

## 3. Linha do tempo das fases

- **A3-d5b**: inclusão de `question_trace: []` no payload.
- **A3-d5c**: preenchimento de Step 1/2 no `question_trace` principal.
- **A3-d5d**: tentativa de incluir P/O/A no `question_trace` principal rejeitada por segurança (regressão em anchor forte).
- **A3-isolation-implementation**: implantação de snapshot pós-classificação + `trace_isolation`.
- **A3-d5d2-perception**: subtrace experimental isolado de Perception.
- **A3-d5d2-objective**: subtrace experimental isolado de Objective.
- **A3-d5d2-action**: subtrace experimental isolado de Action.
- **A3-d5d2-preconditions**: subtrace experimental isolado de Preconditions.

## 4. Tabela dos subtraces

| Subtrace | Local | Itens | Fonte principal | Status | Pode influenciar classificação? |
|---|---|---:|---|---|---|
| `question_trace` (Step 1/2) | `raw_llm_output.question_trace` | 9 | `step2` + `step1_step2_explicit_trace` | Ativo (principal) | Não |
| `perception_question_trace` | `raw_llm_output.trace_experimental.perception_question_trace` | 6 | `snapshot.perception_code` + `snapshot.step3_final.nos_percorridos` | Experimental isolado | Não |
| `objective_question_trace` | `raw_llm_output.trace_experimental.objective_question_trace` | 5 | `snapshot.objective_code` + `snapshot.step4_final.nos_percorridos` | Experimental isolado | Não |
| `action_question_trace` | `raw_llm_output.trace_experimental.action_question_trace` | 7 | `snapshot.action_code` + `snapshot.step5_final.nos_percorridos` | Experimental isolado | Não |
| `preconditions_question_trace` | `raw_llm_output.trace_experimental.preconditions_question_trace` | 3 | `snapshot.precondition_codes` + `snapshot.step6_7_final.precondicoes` | Experimental isolado | Não |
| `trace_isolation` | `raw_llm_output.trace_isolation` | 6 | snapshot before/after de campos críticos | Ativo (guarda de invariância) | Não |

## 5. Invariantes mantidas

Invariantes consolidadas e mantidas na sequência A3-d5d2:
- P/O/A/ERC não alterados.
- Gates não alterados.
- Prompts classificatórios não alterados.
- Schema/migrations não alterados.
- Fixtures/baseline não alterados.
- `question_trace` principal não recebeu perguntas P/O/A/Preconditions.
- Subtraces experimentais mantidos isolados em `trace_experimental`.
- `trace_isolation` permanece referência obrigatória para futuras fases.
- Gate de validação prática manteve `FAIL=0` e `ERROR=0` em candidate-only.
- Anchors fortes foram preservados, com foco em `A0-DAUMAS-E02-A` e `A0-DAUMAS-E02-B`.

## 6. Riscos abertos

1. `trace_experimental` ainda não é contrato público/versionado para consumidores externos.
2. `evidence` pode refletir caminho interno do motor e não fato independente do relato.
3. Preconditions ainda podem refletir matriz/heurística e não cadeia causal Hendy completa.
4. Subtraces P/O/A não devem ser mesclados no `question_trace` principal sem nova validação.
5. ERC ainda não foi incorporado ao pacote experimental.
6. Crescimento contínuo de `raw_llm_output` pode impactar manutenção e consumo.
7. Exposição de trace sem caveats pode gerar falsa percepção de auditabilidade plena.

## 7. Decisão sobre merge no `question_trace` principal

**Decisão atual: NÃO mesclar agora** os seguintes subtraces no `raw_llm_output.question_trace` principal:
- `perception_question_trace`
- `objective_question_trace`
- `action_question_trace`
- `preconditions_question_trace`

Condições mínimas para considerar merge futuro:
- validação candidate-only com `N_RUNS=3`;
- comparação explícita de invariância (`trace_isolation` antes/depois);
- documentação de limitações por item;
- revisão metodológica humana;
- possível introdução de fixtures com `expected_question_trace`;
- decisão explícita de versionamento/contrato do trace.

## 8. Decisão sobre ERC

Opções registradas:
- **Opção A**: adicionar `trace_experimental.erc_question_trace` imediatamente.
- **Opção B**: manter ERC fora por enquanto e consolidar somente P/O/A/Preconditions.
- **Opção C**: produzir desenho documental de ERC antes de implementação.

**Recomendação desta consolidação: Opção C.**  
Justificativa: ERC envolve semântica de risco/recuperabilidade e exige alinhamento metodológico prévio de escala, evidência e interpretação antes de virar trace experimental.

## 9. Próxima fase recomendada

Executar uma fase documental dedicada a ERC (ex.: `A3-d5d2-erc-design`) com:
- contrato de `question_id` ERC;
- mapeamento de `answer/confidence` por nível ERC;
- limites de inferência e caveats obrigatórios;
- plano de validação candidate-only e critério de promoção.

Somente após esse desenho: avaliar implementação de `trace_experimental.erc_question_trace`.

## 10. Conclusão

O pacote experimental de subtraces (`Perception`, `Objective`, `Action`, `Preconditions`) está consolidado, isolado e sem impacto classificatório no estado atual.  
`question_trace` principal permanece corretamente restrito a Step 1/2.  
A regra de snapshot/read-only via `trace_isolation` permanece mandatória, e qualquer promoção para o `question_trace` principal depende de nova validação metodológica e técnica explícita.
