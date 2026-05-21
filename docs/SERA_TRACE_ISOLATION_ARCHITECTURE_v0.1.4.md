# SERA Trace Isolation Architecture
## v0.1.4-A3-isolation-plan

## 1. Propósito

- Definir arquitetura segura para traces avançados.
- Evitar que pós-processamento observacional altere classificação.
- Preparar futuras fases A3-d3b e A3-d5d2.

## 2. Contexto

- A3-d1/d2/d4/d5b/d5c tiveram sucesso.
- A3-d3 e A3-d5d foram rejeitadas por alterar anchor forte.
- A regressão recorrente foi `A0-DAUMAS-E02-A` mudando de `P-A/O-C/A-F` para `P-A/O-C/A-A`.
- Isso indica risco de acoplamento indireto em `pipeline.ts` ou em helpers compartilhados.

## 3. Diagnóstico Conceitual do Risco

Uma fase “observacional” pode afetar classificação se:

- mutar objetos `step3`/`step4`/`step5`/`step6_7`;
- alterar referências compartilhadas;
- reaproveitar helpers usados por classificação;
- modificar `raw_llm_output` antes do cálculo final estabilizado;
- interferir em ordem de construção do payload;
- alterar normalização de estruturas usadas pelo runner;
- alterar tipos de forma que mude coerção/fallback;
- reusar objetos por referência ao invés de snapshots.

## 4. Princípio de Isolamento Obrigatório

Toda trace avançada futura deve ser:

- pós-classificação;
- read-only;
- pure function;
- sem efeitos colaterais;
- calculada a partir de snapshot imutável;
- sem chamadas LLM novas, salvo fase própria;
- sem uso por gates;
- sem uso por inferência P/O/A/ERC;
- sem alterar preconditions/recommendations;
- sem modificar objetos originais.

## 5. Snapshot Imutável Proposto

```ts
interface SeraFinalClassificationSnapshot {
  perception_code: string | null
  objective_code: string | null
  action_code: string | null
  erc_level: number | null
  step3_final: DeepReadonly<Step3Result>
  step4_final: DeepReadonly<Step4Result>
  step5_final: DeepReadonly<Step5Result>
  step6_7_final: DeepReadonly<Step67Result>
  raw_input: string
  step1_step2_explicit_trace?: DeepReadonly<SeraStep1Step2ExplicitTrace>
  decision_trace?: DeepReadonly<SeraDecisionTrace>
}
```

O snapshot acima é conceitual nesta fase (não implementar agora).

## 6. Ordem Segura de Execução Futura

1. executar classificação completa;
2. congelar/capturar snapshot final de P/O/A/ERC;
3. montar payload classificatório estável;
4. calcular traces avançados a partir do snapshot;
5. anexar traces em `raw_llm_output`;
6. nunca recalcular P/O/A/ERC depois dos traces;
7. validar snapshot antes/depois.

## 7. Regra de Comparação Antes/Depois

Toda fase futura de trace avançado deve comparar explicitamente:

Antes:

- `perception_code`
- `objective_code`
- `action_code`
- `erc_level`
- `preconditions` (tamanho e códigos)
- `recommendations` (tamanho, se aplicável)

Depois:

- os mesmos campos.

Se qualquer um mudar:

- restaurar patch automaticamente;
- criar documento de rejeição;
- não commitar código.

## 8. Anchors Obrigatórios para Validação

- `A0-DAUMAS-E02-A = P-A/O-C/A-F`
- `A0-AUTO-001 = P-C/O-A/A-E`
- `A0-DAUMAS-E01-B = P-C/O-A/A-E`
- `A0-AUTO-003 = P-D/O-A/A-H`
- `A0-DAUMAS-E02-B = P-D/O-A/A-H`
- `A0-AUTO-004-ADJ = P-A/O-A/A-G`
- `A0-CHK-003 = P-G/O-A/A-G`
- `A0-CHK-001 = P-G/O-A/A-A`
- `A0-FUEL-002 = P-G/O-A/A-A`
- `A0-VIS-003 = P-G/O-A/A-A`
- `A0-VIS-004-ADJ = P-H/O-A/A-A`
- `A0-VIS-005 = P-H/O-A/A-A`

`A0-CHK-002-ADJ` deve permanecer exploratório/conhecido.

## 9. Estratégia para A3-d3b Futura

Nova tentativa de `unsafe_act`/`unsafe_condition` só pode:

- usar snapshot final;
- não tocar helper compartilhado;
- não alterar Step 1/2 trace existente;
- gerar resultado em subcampo isolado, por exemplo:
  - `raw_llm_output.trace_experimental.unsafe_event_trace`
- não sobrescrever `unsafe_event_type` existente até validação.

## 10. Estratégia para A3-d5d2 Futura

Nova tentativa de P/O/A `question_trace` só pode:

- começar por um único eixo, preferencialmente Perception;
- adicionar itens em subarray isolado antes de mesclar;
- comparar anchors antes/depois;
- não usar `produced_code` para reclassificar;
- não preencher evidence factual a partir de código;
- registrar `evidence_may_reflect_engine_path_not_independent_fact`.

## 11. Regras para Helpers Futuros

Todo helper de trace avançado deve:

- receber snapshot como input;
- retornar novo objeto/array;
- não modificar argumentos;
- não importar funções de classificação;
- não ser importado por `all-steps.ts`;
- não ser chamado antes da finalização do payload;
- ser pequeno e testável.

## 12. Regras de Documentação

Toda tentativa futura deve documentar:

- se foi sucesso ou rejeição;
- report id;
- anchors comparados;
- campos adicionados;
- invariância confirmada;
- limitações.

## 13. Riscos e Mitigação

- Acoplamento por referência:
  - mitigação: snapshot deep-readonly e proibição de mutação in-place.
- Mutação acidental:
  - mitigação: helpers puros, lint/review focado em imutabilidade, escopo restrito.
- Reordenação do payload:
  - mitigação: ordem fixa “classificação -> snapshot -> traces”.
- Falso senso de auditabilidade:
  - mitigação: limitações explícitas em cada trace e flags de evidência parcial.
- Divergência entre trace e classificação:
  - mitigação: comparação antes/depois + anchors obrigatórios por fase.
- Custo de validação:
  - mitigação: candidate-only N_RUNS=1 com anchor gating obrigatório.
- Crescimento excessivo de `raw_llm_output`:
  - mitigação: subcampos experimentais versionados e escopo incremental por eixo.

## 14. Próxima Fase Recomendada

- Executar **A3-isolation-check** ou **A3-d5d2-plan** antes de novo código.
- Não retentar P/O/A `question_trace` diretamente.
- Não retentar `unsafe_act/unsafe_condition` diretamente.
- Primeiro implementar ou planejar função/snapshot de isolamento.

## 15. Conclusão

- Traces avançados são auditabilidade, não classificação.
- A prioridade é invariância.
- A recorrência de regressão em `A0-DAUMAS-E02-A` justifica arquitetura de isolamento antes de novas features.
