# SERA v0.1.1 — Riscos Conhecidos e Backlog

**Data:** 2026-05-15
**Versão:** v0.1.1 aprovada

Riscos identificados durante a validação v0.1.1. Nenhum bloqueia a v0.1.1. Todos são candidatos ao escopo v0.1.2.

---

## Risco 1 — Cobertura de O-C não protetivo

**Descrição:** O corpus atual cobre principalmente casos O-C com motivação de proteção humana. O gate do patch `4367228` trata desvio consciente em geral, mas não foi testado com fixtures adversariais de O-C não protetivo.

**Exemplos não cobertos por fixture:**
- Conveniência pontual sem proteção humana.
- Improviso consciente em situação não emergencial.
- Atalho consciente fora de procedimento por pressão de tempo não imposta externamente.
- Descumprimento excepcional por pressão organizacional.
- Violação não protetiva, não rotineira e não O-D.

**Recomendação v0.1.2:** Adicionar ao menos 3 fixtures O-C não protetivas com relatos claros de desvio consciente.

---

## Risco 2 — Política de preconditions não formalizada

**Descrição:** O runner calcula scores internos de preconditions que podem aparecer como PARTIAL/FAIL em runs individuais sem afetar o `overall`. Os critérios para quando esse resultado interno deve ou não promover falha global não estão documentados formalmente.

**Aspectos não definidos:**
- Quando precondition PARTIAL/FAIL deve afetar o overall.
- Diferença entre top_preconditions esperadas e seleção aceitável.
- Critérios formais de regressão de preconditions.

**Recomendação v0.1.2:** Formalizar política de preconditions em documento de governança. Criar fixtures de teste para o critério.

---

## Risco 3 — Governança de evidência insuficiente

**Descrição:** Quando o relato tem evidência insuficiente para classificar, o pipeline pode retornar hipótese ou aguardar complemento. Não há formalização de:
- Quando perguntas complementares devem ser geradas.
- Como rastrear a hipótese retornada.
- Qual evidência mínima por código é rastreável em auditoria.

**Recomendação v0.1.2:** Completar `docs/SERA_CODE_EVIDENCE_MATRIX.md` e formalizar fluxo de complemento de evidência.

---

## Risco 4 — Custo e latência do smoke

**Descrição:** O smoke global com `SERA_N_RUNS=3` realiza 162 chamadas LLM. Custo e latência variam por provedor e podem ser proibitivos para CI contínuo ou iterações frequentes.

**Recomendação v0.1.2:** Definir smoke seletivo rápido (subconjunto crítico de fixtures) para gate de PR, reservando smoke global para releases.

---

## Risco 5 — Dependência de provedor e modelo

**Descrição:** A baseline v0.1.1 foi gerada com DeepSeek/deepseek-reasoner. Resultados podem variar com outros modelos, versões ou parâmetros de geração.

**Recomendação v0.1.2:** Documentar modelo e temperatura em cada baseline. Avaliar portabilidade entre provedores antes de estabelecer como agnóstico.

---

## Risco 6 — Fixtures interindustriais e adversariais

**Descrição:** O corpus atual de 54 fixtures é majoritariamente aviação/industrial/offshore. Não há fixtures adversariais nem de setores como saúde, transporte público ou construção civil.

**Recomendação v0.1.2:** Adicionar fixtures de ao menos 2 novos setores com casos-limite (adversariais e ambíguos).

---

## Checklist de Recomendações para v0.1.2

- [ ] Adicionar fixtures O-C não protetivas (mínimo 3).
- [ ] Formalizar política de preconditions em documento de governança.
- [ ] Completar matriz de evidência código-evidência (`docs/SERA_CODE_EVIDENCE_MATRIX.md`).
- [ ] Criar checklist formal de release com critérios binários por gate.
- [ ] Documentar operação degradada e fallback em falha de IA.
- [ ] Definir smoke seletivo para gate de PR.
- [ ] Avaliar portabilidade da baseline entre provedores.
- [ ] Adicionar fixtures de ao menos 2 novos setores.
