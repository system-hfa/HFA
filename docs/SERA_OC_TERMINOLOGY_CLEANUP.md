# SERA O-C — Terminology Cleanup

**Data:** 2026-05-15
**Status:** Concluído — varredura metodológica pós-correção do motor (commit f61b8f1).
**Referência:** `docs/SERA_OBJECTIVE_OC_CORRECTION_AUDIT.md`

---

## 1. Resumo da correção conceitual

O commit `8958d28` introduziu uma restrição metodologicamente incorreta: exigia **intenção protetiva humana explícita** como requisito obrigatório para classificar O-C. Esse requisito não existe em Hendy (2003) nem em Daumas (2018).

**Definição correta de O-C:** violação excepcional/circunstancial — desvio consciente, pontual e não rotineiro de regra, procedimento ou expectativa operacional. A motivação pode ser conveniência, improviso, pressão situacional, atalho pontual, proteção humana ou qualquer outra razão circunstancial. Proteção humana é um **exemplo possível**, não um requisito definidor.

O motor foi corrigido em `f61b8f1`. Esta limpeza garante que documentos e páginas de UI estejam alinhados com a correção.

---

## 2. Lista de arquivos revisados

| # | Arquivo | Status |
|---|---|---|
| 1 | `docs/SERA_V0_1_1_RELEASE_CANDIDATE.md` | Corrigido |
| 2 | `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | Corrigido |
| 3 | `docs/SERA_CODE_EVIDENCE_MATRIX.md` | Corrigido |
| 4 | `docs/HFA_SITE_COPY_REVIEW.md` | Corrigido |
| 5 | `docs/SERA_INPUT_EVIDENCE_PHILOSOPHY.md` | Limpo — sem alteração |
| 6 | `docs/SERA_EVIDENCE_SUFFICIENCY.md` | Corrigido |
| 7 | `docs/SERA_OBJECTIVE_OC_CORRECTION_AUDIT.md` | Preservado — registro histórico |
| 8 | `frontend/src/app/(dashboard)/learn/codes/page.tsx` | Corrigido |
| 9 | `frontend/src/app/(dashboard)/dashboard/page.tsx` | Corrigido |
| 10 | `frontend/src/app/(dashboard)/learn/foundations/page.tsx` | Corrigido |
| 11 | `frontend/src/app/(dashboard)/learn/action/page.tsx` | Limpo — sem alteração |
| 12 | `frontend/src/app/(dashboard)/learn/pipeline/page.tsx` | Limpo — sem alteração |

---

## 3. Lista de arquivos alterados

| # | Arquivo | Mudanças |
|---|---|---|
| 1 | `docs/SERA_V0_1_1_RELEASE_CANDIDATE.md` | Seção 3.4: substituída definição "exige proteção humana" por "exige desvio consciente excepcional/não rotineiro"; seção 3.6: "objetivo protetivo" → "desvio consciente de objetivo" |
| 2 | `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | Escopo congelado: "O-C exige proteção humana explícita" → "O-C exige desvio consciente excepcional/não rotineiro"; proteção humana reposicionada como motivação válida, não requisito |
| 3 | `docs/SERA_CODE_EVIDENCE_MATRIX.md` | Seção O-C: definição, evidência positiva/negativa, confusões comuns, exemplos de fronteira e regra crítica completamente reescritas; seção O-A vs O-C: regra e tabela de casos atualizadas |
| 4 | `docs/HFA_SITE_COPY_REVIEW.md` | Seção 3.2: atualizada para refletir a correção já aplicada; tabela seção 4: definição de O-C corrigida; plano de implementação: status atualizado |
| 5 | `docs/SERA_EVIDENCE_SUFFICIENCY.md` | Seção Objetivo: "Objetivo protetivo excepcional" → "Violação excepcional/circunstancial"; requisito de proteção removido |
| 6 | `frontend/src/app/(dashboard)/learn/codes/page.tsx` | O-C: label "Violação excepcional" → "Violação excepcional/circunstancial"; when: "Desvio isolado e circunstancial" → "Desvio consciente, pontual e não rotineiro" |
| 7 | `frontend/src/app/(dashboard)/dashboard/page.tsx` | CODE_INFO O-C: nome, definição e exemplo atualizados; FAILURE_NAMES O-C: label atualizado |
| 8 | `frontend/src/app/(dashboard)/learn/foundations/page.tsx` | Seção PCT: descrição de O-C refinada para incluir "desvio consciente" e "não rotineiro"; frases-resumo adicionadas |

---

## 4. Trechos conceituais corrigidos

### Antes (errado):
- "O-C exige proteção humana explícita"
- "O-C exige que o operador tenha desviado conscientemente de um protocolo conhecido, motivado por proteger uma pessoa de risco imediato"
- "O-C é a única categoria que exige desvio consciente de protocolo conhecido + motivação protetiva humana explícita"
- "O-C exige proteção humana explícita e literal no texto"
- "Circunstância excepcional sozinha não é O-C: [...] sem intenção protetiva declarada permanecem O-A"

### Depois (correto):
- "O-C exige desvio consciente, pontual e não rotineiro de regra, procedimento ou expectativa operacional"
- "A motivação pode ser conveniência, improviso, pressão situacional ou proteção humana — proteção humana é um exemplo possível, não um requisito"
- "O que define O-C é o desvio consciente e excepcional"
- "Circunstância excepcional sem desvio consciente não é O-C"

---

## 5. Definição final recomendada de O-A/O-B/O-C/O-D para docs e UI

### O-A — Nenhuma falha de objetivo
Objetivo operacional nominal, sem desvio consciente de regra ou procedimento. Inclui casos sob restrição externa (prazo, ferramenta indisponível) sem objetivo desviante explícito. A falha está em percepção, ação, conhecimento ou precondições.

**Frase-resumo:** "objetivo era nominal; a falha está em outro eixo ou nas precondições"

### O-B — Violação rotineira
Desvio habitual, normalizado e tolerado pela cultura organizacional. Há evidência de que o comportamento era comum, esperado ou aceito pela equipe/supervisão.

**Frase-resumo:** "fazemos assim normalmente"

### O-C — Violação excepcional/circunstancial
Desvio consciente, pontual e não rotineiro de regra, procedimento ou expectativa operacional. O operador normalmente cumpre as regras, mas desta vez decidiu desviar. A motivação pode ser conveniência, improviso, pressão situacional, atalho pontual ou proteção humana — proteção humana é um exemplo possível, não um requisito.

**Frase-resumo:** "fiz diferente desta vez"

### O-D — Intenção não conservativa
Escolha consciente de opção mais arriscada sem violação formal de regra. Motivada por eficiência, economia de tempo, produtividade ou outro objetivo operacional não conservativo. Não é simples pressão de prazo imposta externamente sem escolha deliberada de risco adicional.

**Frase-resumo:** "fiz para ganhar tempo/economizar/aumentar produtividade/otimizar"

---

## 6. Termos proibidos ou perigosos

| Termo | Motivo |
|---|---|
| "O-C exige proteção humana" | Falso — proteção humana é exemplo, não requisito |
| "O-C é objetivo protetivo humano" | Reduz O-C a uma única motivação |
| "O-C só existe para proteger pessoa em risco" | Falso — exclui outras motivações válidas |
| "O-C = violação altruística" | Incorreto — altruísmo é apenas uma motivação possível |
| "intenção protetiva" como critério definidor de O-C | Restringe indevidamente o código |
| "sem intenção protetiva → O-A" | Falso — desvio consciente não protetivo também é O-C |
| "ausência de risco humano imediato" como evidência negativa de O-C | Falso — O-C não exige risco humano |

---

## 7. Termos recomendados

| Termo | Uso |
|---|---|
| "Violação excepcional/circunstancial" | Label canônico de O-C em docs e UI |
| "Desvio consciente, pontual e não rotineiro" | Definição curta de O-C |
| "Desvio consciente de regra, procedimento ou expectativa operacional" | Definição completa de O-C |
| "Proteção humana é um exemplo possível, não um requisito" | Disclaimer obrigatório ao mencionar proteção humana como motivação de O-C |
| "O que define O-C é o desvio consciente e excepcional" | Fechamento após listar motivações |
| "Fazemos assim normalmente" (O-B) vs "Fiz diferente desta vez" (O-C) | Distinção coloquial O-B vs O-C |

---

## 8. Próximos pontos de atenção

1. **Novos documentos ou páginas:** qualquer texto futuro que mencione O-C deve usar a definição corrigida e evitar os termos proibidos.
2. **Fixtures futuras:** novos fixtures O-C devem cobrir motivações além de proteção humana (conveniência, improviso, pressão situacional) para validar que o motor captura O-C em todo o espectro.
3. **Revisão de gates:** verificar periodicamente que gates determinísticos não reintroduzam a restrição de proteção humana como requisito.
4. **Smoke global definitivo:** rodar quando houver janela disponível, conforme `docs/SERA_V0_1_1_FROZEN_SCOPE.md`.
5. **Traduções:** se houver i18n, garantir que as traduções de O-C reflitam a definição corrigida.
6. **Onboarding de novos colaboradores:** este documento deve ser parte do pacote de contexto metodológico.
