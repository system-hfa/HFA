# Real Event Trial 001 — Technical Investigation Report v0.1.4
Status: READ_ONLY_INVESTIGATION_REPORT  
Phase: A4+R-23 — Trial 001 Technical Investigation Report  
Scope: read-only technical investigation of first real-event system trial failure  
Non-scope: engine correction, fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, risk-layer redesign

## 1. Purpose
Este relatório localiza, em modo somente leitura, os pontos de código e pipeline onde provavelmente nascem as falhas metodológicas observadas no TRIAL-SET1-001 / REAL-EVENT-0001 (Thebaud), sem implementar correções.

## 2. Initial state
- Branch: `main`
- `HEAD`: `f05d8183c9afd942f67a32e1b846de47fed14f3a`
- `origin/main`: `f05d8183c9afd942f67a32e1b846de47fed14f3a`
- `HEAD == origin/main`: sim
- `git status --short`: apenas `?? tests/reports/candidates/`
- Tracked modified: zero
- Staged changes: zero

## 3. Files inspected
| File path | Reason inspected | Relevant functions/sections | Approximate line ranges |
|---|---|---|---|
| `frontend/src/lib/sera/all-steps.ts` | Seleção A-D, Step2/Step6-7 e prompts | `evidenceOfPhysicalIncapacity`, `runStep2`, `runStep5`, `remapOrganizationalActionIfInvalidAd`, `runStep6_7` | ~72-98, ~150-381, ~1868-1915, ~2746-3258, ~3749-3825 |
| `frontend/src/lib/sera/pipeline.ts` | Orquestração final, preconditions_trace, conclusão final persistida | `runSeraPipeline`, `buildPreconditionsTrace`, `buildAnalysisUpsertPayload`, `inferActionCode`, `computeCompleteness` | ~113-215, ~338-366, ~1910-1986, ~1999-2015, ~2062-2185 |
| `frontend/src/lib/sera/rules/action/A-D.json` | Evidência lexical de A-D | `positive_evidence`, `requires` | ~2-12 |
| `frontend/src/lib/sera/rules/preconditions/select.ts` | Seleção determinística e inclusão por `required` | `selectDeterministicPreconditions` | ~94-167 |
| `frontend/src/lib/sera/rules/preconditions/matrix.json` | Mapeamento A-D -> W1/W2/P1/O2/O4 e regras com W3 | Rule `A-D`, rules `P-F-A-F`/`P-F`/`P-B` | ~6-17, ~153-159, ~177-205 |
| `frontend/src/lib/sera/hfacs-mapper.ts` | Mapeamento HFACS downstream | `NIVEL1_MAP`, `NIVEL2_MAP`, `mapToHfacs` | ~24-120, ~123-189, ~254-279 |
| `frontend/src/app/(dashboard)/events/[id]/page.tsx` | Render preconditions/conclusão/HFACS/risk | `computeEventRisk`, render de preconditions/conclusion/HFACS | ~112-172, ~648-771 |
| `frontend/src/data/sera/Template.json` | Prompt/template de redação final | Etapas 3-7 e linguagem de "falha ativa" | ~14-67 |
| `frontend/src/data/sera/Guidelines.json` | Diretrizes injetadas no prompt | seção de classificação de falhas ativas | ~30-37, ~63-77 |
| `frontend/src/data/sera/Point.json` | Formulação do escape point | definição centrada em "decisão" | ~3-8, ~16-19, ~24-55 |
| `frontend/src/data/sera/3-Failures.json` | Semântica de P-A | entrada `#P-A` | ~20-25 |
| `frontend/src/data/sera/4-Failures.json` | Semântica de O-A | entrada `#O-A` | ~18-23 |
| `frontend/src/lib/sera/docs.ts` | Fonte dos docs injetados em Step6/7 | `loadDocJson` + bindings para Template/Guidelines/Pre-Conditions/tutorial | ~1-35 |
| `frontend/src/lib/server/complete-sera-analysis.ts` | Caminho de persistência | `runSeraPipeline` -> upsert | ~23-25 |

## 4. Failure F-003: A-D unsupported selection
### Onde A-D é selecionado?
- Principalmente em `runStep5` (`frontend/src/lib/sera/all-steps.ts`) por:
  - gate determinístico direto (`if (evidenceOfPhysicalIncapacity(...)) -> A-D`) (~2897-2904);
  - branch LLM de incapacidade (`Nó 1C`, `Nó 3`, `Nó 3B`) que permite `A-D` ou `A-E` (~3165-3258, ~3534-3542, ~3603-3611).

### Qual função/gate seleciona A-D?
- Gate lexical: `evidenceOfPhysicalIncapacity` (~72-98).
- Gate decisório: `Gate A-D` em `runStep5` (~2899-2903).
- Gate LLM: prompts de incapacidade misturam física/técnica e deixam escolha `A-D/A-E` (~3170-3191, ~3228-3248).

### Há evidência de que wording de "warning system", "equipment" ou "engine torque" poderia disparar A-D?
- Sim, provável por múltiplos caminhos:
  - `A-D.json` inclui `"torque"` em `positive_evidence` (~6).
  - `inferActionCode` em `pipeline.ts` retorna `A-D` se detectar `torque`, `forca`, `alcance`, `ergonom`, `fisic` (~138-147). Esse caminho é fallback quando Step5 não retorna código válido.
  - prompts LLM de incapacidade incluem `equipamento` como sinal de incapacidade (~3171, ~3229, ~3244), o que pode confundir falha de sistema/barreira com limitação física humana.

### Existem anti-gates para separar aircraft-system/barrier degradation de operator physical/equipment inability?
- Parcial e insuficiente:
  - há remapeamento para contexto organizacional (`remapOrganizationalActionIfInvalidAd`) (~2782-2792), mas só atua quando `organizationalEscapePoint` é verdadeiro.
  - não há anti-gate explícito para caso de tripulação com degradação técnica/sistema de alerta sem incapacidade física humana.
  - existe `evidenceOfPilotResponseToTechnicalFailure` (~350-381), mas não é usado em `runStep5`.

### Hipótese final
- **Likely**: falso positivo A-D nasce da combinação de prompts amplos de incapacidade + vocabulário lexical sensível (`torque`/`equipamento`) sem anti-gate robusto para distinguir falha técnica de sistema/barreira versus incapacidade física do operador.

## 5. Failures F-001/F-002/F-004: P-A/O-A conclusion contradiction
### Onde a conclusão textual é gerada?
- Em `runStep6_7` (`frontend/src/lib/sera/all-steps.ts`) via chamada LLM que retorna `conclusoes` (~3749-3825).
- Persistida sem pós-validação semântica em `buildAnalysisUpsertPayload` (`conclusions: step6_7.conclusoes`) (~2144).

### Ela trata P-A/O-A como "falhas"?
- Indiretamente, sim:
  - contexto de template/docs enfatiza "falhas ativas" em todas as etapas (`Template.json`, `Guidelines.json`, `tutorial.json`) e Step6 descreve “falhas identificadas” de forma geral.
  - não há renderer code-aware que force semântica especial para `P-A/O-A/A-A`.

### Ela usa labels/códigos normalizados ou inferência solta?
- **Mixed com predominância de inferência livre de LLM**:
  - recebe os códigos finais no prompt (`Falha Percepção: ${step3.codigo}` etc.) (~3804-3806),
  - mas não há validação semântica pós-geração garantindo que `P-A/O-A` sejam descritos como “nenhuma falha”.

### Por que P-A/O-A podem ser descritos como "percepção inadequada" e "objetivo inadequado"?
- Mecanismo provável:
  - prompt/template pede síntese narrativa de “falhas identificadas” sem regra explícita de semântica negativa de `*-A`;
  - LLM tende a recontar narrativa factual do evento e reinterpretar código default (`P-A/O-A`) como falha ativa nominal.

### Hipótese final
- **Confirmed**: não existe guardrail code-aware pós-LLM para coerência semântica de `P-A/O-A/A-A`; por isso a conclusão pode contradizer os próprios códigos finais.

## 6. Failure F-005: Preconditions mismatch
### Onde preconditions são determinadas?
- Primeira geração em `runStep6_7` via LLM (`precondicoes`) (~3769-3772, ~3801-3820).
- Em seguida, sobrescrita determinística em `runSeraPipeline` por `selectDeterministicPreconditions(...)` (~1950-1967), depois `sanitizePreconditions` (~1968-1971).

### Onde são renderizadas/concluídas?
- UI renderiza `analysis.preconditions` (lista normalizada) (`page.tsx` ~648-673).
- Conclusão textual renderiza `analysis.conclusions` diretamente (`page.tsx` ~684-687).

### Como W3 poderia aparecer sem estar na lista?
- Porque `conclusoes` vem do bloco LLM antes da sobrescrita determinística de `precondicoes`.
- Se o LLM inferir W3 no texto, esse texto permanece; depois a lista final pode virar `P1/W1/W2/O2/O4` pelo rule `A-D` (matrix rule com `required: true`) (~6-14 em `matrix.json`; inclusão por `required` em `select.ts` ~123).

### O texto final usa preconditions_trace ou inferência independente?
- Usa inferência independente do LLM. `preconditions_trace` é apenas metadado em `raw_llm_output` (~2062-2064, ~2154) e não dirige o texto final nem a renderização da conclusão.

### Hipótese final
- **Confirmed**: mismatch nasce de ordem de pipeline (conclusão gerada antes, preconditions determinísticas aplicadas depois) + ausência de reconciliação textual.

## 7. Failure F-006: HFACS downstream contamination
### Onde HFACS é mapeado?
- `mapToHfacs` em `frontend/src/lib/sera/hfacs-mapper.ts` (~254-279), consumido em `page.tsx` (~763-770).

### O mapeamento confere se o código está suportado por evidência?
- Não. Mapeia por presença do código ativo (`perception/objective/action`) em tabelas estáticas, sem checar consistência causal ou confiança.

### A-D sempre vira skill-based / physical limitation?
- Sim para as tabelas que incluem A-D:
  - Nível 1: `A-D -> hfacs.skillBased` (~70-74);
  - Nível 2: `A-D -> hfacs.physMentalLimits` (~159-163).

### HFACS deveria ser bloqueado se causal consistency falha?
- Não há bloqueio implementado. Renderização é condicionada apenas à existência de algum código P/O/A (`page.tsx` ~763).

### Hipótese final
- **Confirmed**: contaminação downstream ocorre automaticamente quando código upstream está inconsistente/suportado de forma fraca.

## 8. ERC/risk display dependency
### ERC/risk é exibido independentemente de contradições causais?
- Sim.
- O card de risco em `page.tsx` é calculado diretamente de P/O/A (`computeEventRisk`) (~148-172, ~495-500) e não verifica contradições semânticas/confiabilidade.

### Existe guard para causal assurance?
- Não foi encontrado guard de causal assurance no fluxo de UI/API para bloquear/atenuar risco quando há contradições P/O/A-conclusão-preconditions.

### Recomendação futura: caveat, suppression ou consistency gate?
- **Consistency gate + caveat**: suprimir cálculo/rótulo final quando consistência causal falhar; mostrar estado “inconclusivo/under review” com caveat explícito.

## 9. Escape point investigation
### O código favorece formulação decision-centered?
- Sim.
- `Point.json` define ponto de desvio associado a “uma única decisão” e exemplos majoritariamente “decide/opta” (~3-8, ~24-55).

### O prompt ou template induz "optou por/prosseguiu" como ponto de fuga?
- Sim, provável.
- `runStep2` injeta `Point.json` diretamente no prompt (~1884-1886), reforçando esse viés lexical/estrutural.

### Há campo separado para operational unsafe state?
- Parcial e indireto.
- Existe `unsafe_condition_statement` em `step1_step2_explicit_trace` (`pipeline.ts` ~691-701, ~813), mas isso é derivado em pós-processamento e não substitui o output principal de Step2 no fluxo de decisão.

### Recomendação futura
- Separar explicitamente “decision antecedent” de “operational unsafe state threshold” como campos distintos obrigatórios antes de Step3/4/5.

## 10. Root-cause hypotheses
| Hypothesis | Support level | Evidence | Risk | Likely patch area |
|---|---|---|---|---|
| H1: A-D falso positivo por linguagem de equipamento/sistema | likely | `A-D.json` com `torque`; prompts de incapacidade amplos; falta de anti-gate técnico para crew | Alto | `all-steps.ts` (`runStep5`, `evidenceOfPhysicalIncapacity`), `rules/action/A-D.json` |
| H2: Conclusão trata `*-A` como falha ativa | confirmed | `runStep6_7` gera narrativa livre; sem pós-validação semântica; templates orientam narrativa genérica de falhas | Alto | `all-steps.ts` Step6/7 + renderer code-aware pós-LLM |
| H3: Conclusão não ancorada no estado final normalizado | confirmed | conclusão persiste como `step6_7.conclusoes`; não reconcilia após normalização/sanitização | Alto | `pipeline.ts` pós-processamento antes de `conclusions` |
| H4: preconditions mismatch por ordem de execução | confirmed | Step6/7 gera texto/preconditions; depois `selectDeterministicPreconditions` sobrescreve lista | Alto | `pipeline.ts` sequência Step6/7 + reconciliação |
| H5: HFACS sem gate de consistência | confirmed | `mapToHfacs` mapeia somente por código; UI sempre renderiza com qualquer código ativo | Médio-alto | `hfacs-mapper.ts`, `page.tsx` |
| H6: risco/ERC sem gate de consistência causal | confirmed | `computeEventRisk` usa apenas P/O/A; sem checagem de contradições/assurance | Médio-alto | `page.tsx`, possível backend flag |
| H7: escape point viés de decisão | likely | `Point.json` e `runStep2` incentivam framing de decisão singular | Médio | `Point.json`, prompt de `runStep2` |

## 11. Patch recommendations, sem implementar
- Introduzir anti-gate A-D para separar explicitamente degradação de sistema/barreira (`warning/alert/system failure`) de incapacidade física humana.
- Tornar Step6/7 code-aware: `P-A/O-A/A-A` devem ser narrados como “sem falha ativa no eixo”, nunca como falha positiva.
- Adicionar consistency guard entre códigos finais e narrativa de conclusão (bloquear persistência de conclusão incoerente).
- Regerar ou reconciliar conclusão após seleção determinística final de preconditions.
- Tornar a conclusão de preconditions estritamente ancorada em `preconditions_trace`/lista final normalizada.
- Aplicar supressão de HFACS quando código ativo estiver sem suporte causal suficiente.
- Aplicar caveat/supressão de risk/ERC quando consistência causal falhar.
- Ajustar Step2 para separar "decisão antecedente" de "estado operacional inseguro" e reduzir viés decision-centered.

## 12. Minimal validation plan for future patch
- Reexecutar `TRIAL-SET1-001` completo após patch.
- Confirmar baseline causal oficial inalterado.
- Confirmar que fixtures legítimas de `A-D` continuam passando.
- Validar semântica de conclusão para `P-A/O-A/A-A` (sem contradição textual).
- Validar que conclusão de preconditions coincide com trace/lista final.
- Validar que HFACS não é renderizado quando código causal está sem suporte.
- Não executar trials 002–005 enquanto 001 não passar assurance.
- Não iniciar A5 Risk Layer antes do fechamento de 001.

## 13. Final status
- read-only investigation completed.
- no code changed.
- trials 002–005 remain blocked.
- A5 Risk Layer remains blocked.
- next phase should be A4+R-24 guardrail patch only after human review.
