# SERA v0.1.1 Frozen Scope

**Data:** 2026-05-14
**Status:** Release candidate congelado — smoke global definitivo pendente.

---

## 1. Propósito

Este documento define o escopo congelado do SERA v0.1.1 release candidate. Registra o que está validado e não deve ser alterado antes do smoke global definitivo, quais mudanças exigem reiniciar a validação e quais são permitidas sem impacto no processo de promoção de baseline.

---

## 2. Estado atual

**Versão:** SERA v0.1.1 — release candidate.
**Baseline oficial v0.1.1:** não promovido. Aguarda smoke global definitivo.

### Smoke global near-pass (último executado)

| Métrica | Valor |
|---|---|
| Fixtures testadas | 54 |
| Total de runs | 162 |
| PASS | 161 |
| PARTIAL | 1 |
| FAIL | 0 |
| ERROR | 0 |
| pass_rate | 99.38% |
| determinism_rate | 98.15% |
| Único bloqueio | TEST-COMBO-003 (objective O-A→O-C em 1/3 runs) |

O bloqueio TEST-COMBO-003 foi corrigido após o near-pass por gate determinístico em `runStep4`. O pipeline agora força O-A quando o relato contém evidência explícita de déficit de conhecimento/treinamento, antes de consultar o LLM.

### Validação seletiva pós-fix

| Fixture / Grupo | Runs | PASS | Det | Status |
|---|---|---|---|---|
| TEST-COMBO-003 | 10 | 10 | 100% | ✅ Corrigido |
| TEST-O-C-001 | 3 | 3 | 100% | ✅ O-C legítimo preservado |
| TEST-O-C-002 | 3 | 3 | 100% | ✅ O-C legítimo preservado |
| TEST-GEN-OC-001 | 3 | 3 | 100% | ✅ O-C legítimo preservado |
| TEST-GEN-OC-002 | 3 | 3 | 100% | ✅ O-C legítimo preservado |
| TEST-GEN-OC-003 | 3 | 3 | 100% | ✅ O-C legítimo preservado |
| TEST-O-D-001 | 3 | 3 | 100% | ✅ Improvement preservado |
| Grupo combo (3 fixtures) | 9 | 9 | 100% | ✅ |
| Grupo objective (5 fixtures) | 15 | 15 | 100% | ✅ |
| **Total seletivo** | **53** | **53** | **100%** | ✅ |

---

## 3. Escopo metodológico congelado

Os seguintes pontos metodológicos foram validados e estão congelados para esta release candidate:

- **Distinção O-D puro vs O-B rotineiro:** O-B exige histórico explícito de prática aceita/normalizada. Objetivo de eficiência sem normalização cultural permanece O-D.
- **TEST-O-D-001 classificado como P-A / O-D / A-A / ERC 2:** resultado golden validado, registrado como improvement sobre v0.1.
- **O-C exige proteção humana explícita:** o operador deve ter desviado conscientemente de protocolo *conhecido*, motivado por proteger uma pessoa de risco imediato.
- **Circunstância excepcional sozinha não é O-C:** pressão de prazo, ferramenta indisponível, omissão administrativa e situações forçadas sem intenção protetiva declarada permanecem O-A.
- **Déficit de conhecimento ou protocolo médico permanece O-A / A-E, não O-C:** lacuna instrucional não é desvio motivado por objetivo protetivo.
- **A-C cobre não verificação de parâmetro ou resultado da própria intervenção:** checks realizados após a intervenção principal — sem verificação do efeito produzido — são classificados como A-C.
- **Discriminators de fixtures são documentação/golden rationale, não input de runtime:** o classificador deve funcionar com relato bruto; enriquecer o input com metadados de fixture invalida o baseline.
- **Sistema deve funcionar com dados brutos e desorganizados:** entrevista estruturada é condição ideal, não pré-requisito.

---

## 4. Escopo técnico congelado

Os seguintes componentes técnicos estão validados e congelados:

- **Runner econômico:** modo de execução com n-runs configurável, filtros por fixture e grupo.
- **Comparador de baseline:** lógica de PASS/PARTIAL/FAIL/improvement/regression em relação ao baseline v0.1.
- **Scripts de smoke e promoção:** `run-sera-v0.1.1-smoke.sh` e `promote-sera-v0.1.1-baseline.sh`.
- **Retry/timeout/parse JSON:** pipeline reintenta falhas transitórias de LLM e JSON malformado antes de classificar como ERROR.
- **Correções de gates/prompt ligadas a O-A/O-C e A-C/A-A:** implementadas em `frontend/src/lib/sera/all-steps.ts`, validadas por smoke near-pass e validação seletiva.
- **`.DS_Store` ignorado:** adicionado ao `.gitignore`.

---

## 5. O que NÃO deve ser alterado antes do smoke definitivo

Os seguintes componentes não devem ser modificados antes da execução do smoke global definitivo e da promoção do baseline v0.1.1:

- Taxonomy e códigos SERA (P, O, A, ERC, precondições).
- Expected/golden labels das fixtures existentes.
- Baseline v0.1 (`tests/baselines/v0.1.json` ou equivalente).
- Runner de validação (`tests/sera/run.ts`).
- `pipeline_adapter` e integração com LLM.
- Lógica de Step 3 (percepção), Step 4 (objetivo), Step 5 (ação), Step 6/7 (ERC e precondições).
- Prompts metodológicos principais usados em runtime.
- Fixtures existentes (descrição, expected, golden rationale).
- Critérios de comparação do baseline (lógica de PASS/PARTIAL/FAIL).
- Scripts de promoção de baseline.

---

## 6. Mudanças que exigem novo smoke global

As seguintes alterações invalidam o status de release candidate e exigem novo smoke global antes de qualquer promoção de baseline:

- Qualquer alteração no motor SERA (steps, gates, lógica de decisão).
- Alteração de prompts enviados ao LLM em runtime.
- Alteração de gates determinísticos (novos gates ou modificação dos existentes).
- Alteração de expected/golden em fixtures existentes.
- Alteração no runner ou no comparador de baseline.
- Alteração no `pipeline_adapter` ou na integração com o provider LLM.
- Alteração no schema de relatório de smoke.
- Alteração em regras de ERC ou precondições.
- Troca de modelo, provider ou parâmetros relevantes de geração (temperatura, top_p).
- Alteração no formato do input enviado ao pipeline (estrutura do objeto, campos utilizados).

---

## 7. Mudanças permitidas sem smoke global imediato

As seguintes alterações não impactam o pipeline e são permitidas sem necessidade de novo smoke global:

- Documentação metodológica e de produto.
- Textos e conteúdo do site sem impacto no pipeline.
- Documentos de handoff e contexto para Claude/HFA.
- Organização de arquivos não usados em runtime (scripts auxiliares, artefatos de análise).
- Planejamento e registros de decisão.
- Comentários em código que não alterem comportamento em runtime.
- Limpeza de artefatos temporários e relatórios de smoke não utilizados.

---

## 8. Baseline v0.1.1

**O baseline oficial v0.1.1 não deve ser promovido ainda.**

- Não copiar o relatório near-pass (`run-1778786318335.json`) para baseline oficial.
- Não executar o script de promoção até que o smoke definitivo passe.
- O baseline v0.1.1 só deve ser promovido após o smoke global definitivo atingir:

| Critério | Valor exigido |
|---|---|
| Fixtures testadas | 54 |
| Total de runs | 162 |
| PASS | 162 |
| PARTIAL | 0 |
| FAIL | 0 |
| ERROR | 0 |
| determinism_rate | 100% |
| Regressions vs baseline v0.1 | 0 |
| TEST-O-D-001 | registrado como improvement |

---

## 9. Decisão operacional

- **v0.1.1 pode ser tratada como release candidate** com base nos resultados do near-pass e na validação seletiva pós-fix.
- **Não deve ser tratada como baseline oficial** até o smoke global definitivo.
- **A partir de agora, evitar novas correções no motor** salvo bug crítico que comprometa a validade da análise.
- **Qualquer nova correção metodológica antes do smoke definitivo** exige reinício da validação seletiva e possivelmente um novo smoke global antes da promoção.

---

## 10. Próximos passos

- [ ] Trabalhar textos do site para refletir a proposta de valor do SERA.
- [ ] Melhorar documentação de produto (suficiência, matriz de evidência, fluxo de análise).
- [ ] Organizar handoff e contexto para Claude/HFA.
- [ ] Preparar janela longa para smoke global definitivo.
- [ ] Promover baseline v0.1.1 somente após smoke definitivo passar nos critérios acima.
- [ ] Depois da promoção: evoluir fixtures multi-domínio (saúde, offshore, industrial).
- [ ] Depois da promoção: implementar camada explícita de suficiência com perguntas complementares.
