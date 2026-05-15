# SERA v0.1.1 Frozen Scope

**Data:** 2026-05-14 · **Atualizado:** 2026-05-15
**Status:** Aprovada — baseline oficial promovido. Commit `0775dc2`.

---

## 1. Propósito

Este documento define o escopo congelado do SERA v0.1.1 release candidate. Registra o que está validado e não deve ser alterado antes do smoke global definitivo, quais mudanças exigem reiniciar a validação e quais são permitidas sem impacto no processo de promoção de baseline.

---

## 2. Estado atual

**Versão:** SERA v0.1.1 — **aprovada**.
**Baseline oficial v0.1.1:** promovido. `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`

### Smoke definitivo (2026-05-15)

| Métrica | Valor |
|---|---|
| Fixtures testadas | 54 |
| Runs por fixture | 3 |
| Total de runs | 162 |
| PASS | 162 |
| PARTIAL | 0 |
| FAIL | 0 |
| ERROR | 0 |
| pass_rate | 100% |
| determinism_rate | 100% |

Relatório fonte: `tests/reports/run-1778861714570.json`. Provedor: DeepSeek/deepseek-reasoner.

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
- **O-C exige desvio consciente excepcional/não rotineiro:** o operador deve ter desviado conscientemente de protocolo *conhecido* de forma pontual e não rotineira. A motivação pode ser conveniência, improviso, pressão situacional ou proteção humana — proteção humana é uma motivação válida, não um requisito.
- **Circunstância excepcional sozinha não é O-C:** pressão de prazo, ferramenta indisponível, omissão administrativa e situações forçadas sem desvio consciente de regra ou procedimento permanecem O-A.
- **Déficit de conhecimento ou protocolo médico permanece O-A / A-E, não O-C:** lacuna instrucional não é desvio consciente de objetivo.
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

**Baseline oficial v0.1.1 promovido em 2026-05-15.**

| Critério | Valor exigido | Obtido |
|---|---|---|
| Fixtures testadas | 54 | 54 |
| Total de runs | 162 | 162 |
| PASS | 162 | 162 |
| PARTIAL | 0 | 0 |
| FAIL | 0 | 0 |
| ERROR | 0 | 0 |
| determinism_rate | 100% | 100% |
| Regressions vs v0.1 | 0 | 0 |
| TEST-O-D-001 | improvement | ✅ confirmado |

Arquivo: `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`

---

## 9. Decisão operacional

- v0.1.1 **aprovada** como baseline oficial de regressão.
- Motor congelado — não alterar sem novo ciclo de validação.
- Próximas evoluções (fixtures adversariais, política de preconditions, setores adicionais) estão registradas em `docs/SERA_KNOWN_RISKS_v0.1.1.md`.

---

## 10. Backlog pós-v0.1.1

- Evoluir fixtures multi-domínio (saúde, offshore, construção civil).
- Adicionar fixtures O-C não protetivas.
- Formalizar política de preconditions.
- Implementar camada explícita de suficiência com perguntas complementares.
- Definir smoke seletivo para gate de PR.
