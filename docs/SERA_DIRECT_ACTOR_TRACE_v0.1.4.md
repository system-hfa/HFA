# SERA Direct Actor Trace
## v0.1.4-A3-d4

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d4  
**Tipo:** Evolução observacional de trace em `raw_llm_output` (sem alteração classificatória)

---

## 1. Objetivo da A3-d4

Melhorar a identificação observacional de ator direto em `raw_llm_output.step1_step2_explicit_trace`, adicionando evidência e incerteza explícitas para `direct_actor` e `actor_level`.

## 2. Definições de direct_actor e actor_level

- `direct_actor`: agente que controlava diretamente a variável crítica no ponto de fuga, derivado prioritariamente de `step2.agente`.
- `actor_level` (valores permitidos): `crew`, `maintenance`, `supervision`, `organization`, `frontline_operator`, `unknown`.

## 3. Campos adicionados

- `actor_evidence`
- `actor_level_evidence`
- `actor_uncertainty`

## 4. Como o actor trace é derivado

- O cálculo é feito em helper puro/read-only (`deriveActorTrace`) durante a montagem final do trace.
- O helper usa cópias de strings de:
  - `step2.agente`, `step2.ato_inseguro_factual`, `step2.justificativa`
  - `rawInput`
  - `step3/step4/step5.nos_percorridos` apenas como contexto de incerteza
- Regra principal: quando `step2.agente` traz evidência de tripulação/piloto, mantém `direct_actor` e `actor_level` nesse eixo mesmo com menções contextuais de supervisão/manutenção/organização.

## 5. Regras anti-confusão com preconditions

- Menções de supervisão, organização, manutenção, treinamento, cultura ou fatores latentes contextuais não substituem automaticamente `direct_actor`.
- Quando texto sugere apenas contexto de precondition sem ator direto explícito, `direct_actor` permanece `null` e a incerteza é registrada.
- Flags em `unanswered_questions` cobrem ambiguidades (`direct_actor_not_explicit`, `actor_context_may_be_precondition_not_direct_actor`, etc.).

## 6. Relação com a tentativa A3-d3 rejeitada

- A3-d3 foi rejeitada por alterar anchor forte em fase observacional.
- A3-d4 aplica a lição de isolamento: helper puro, pós-processamento e sem efeitos colaterais em objetos de classificação.

## 7. O que não foi alterado

- Classificação P/O/A/ERC.
- Gates.
- Prompts classificatórios Step 3/4/5.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.

## 8. Limitações conhecidas

- `actor_level` continua heurística conservadora.
- Em casos multiator ou ambíguos, o resultado permanece `unknown` com `actor_uncertainty`.
- Identificação definitiva do ator direto ainda depende de question_trace explícito futuro.

## 9. Próxima fase recomendada

- Avaliar A3-d3b somente com desenho de isolamento adicional para `unsafe_act`/`unsafe_condition`, ou avançar para refinamento de question_trace explícito antes de qualquer uso metodológico externo.

