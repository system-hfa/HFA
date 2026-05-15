# SERA Objective O-C — Correction Audit

**Data:** 2026-05-14
**Status:** Auditoria pré-patch — nenhum arquivo de motor foi alterado ainda.
**Autor:** HFA/SERA internal review

---

## 1. Resumo executivo

O commit `8958d28` ("fix(sera): require explicit human protection for O-C objective") introduziu uma restrição metodologicamente incorreta no motor SERA: passou a exigir **intenção protetiva humana explícita** como requisito obrigatório para classificar O-C. Esse requisito não existe em Hendy (2003) nem em Daumas (2018).

**O-C correto per fonte:** violação excepcional/circunstancial — isolada, não rotineira, não normalizada. A motivação pode ser conveniência, improviso, pressão situacional, atalho pontual, proteção humana ou qualquer outra razão circunstancial. Proteção humana é um **exemplo possível**, não um requisito definidor.

**Efeito prático do erro:** qualquer violação consciente e excepcional que NÃO seja motivada por proteção humana é incorretamente classificada como O-A (objetivo nominal) em vez de O-C. O motor atual descarta O-C para casos válidos.

**Situação dos fixtures existentes:** nenhum fixture precisa ser alterado. Todos os fixtures O-C atuais envolvem proteção humana e continuam classificando corretamente sob a definição ampla. A correção só alarga O-C — não estreita O-A nem O-B.

**Situação de f8e58c3:** o gate de knowledge deficit é conceitualmente correto e independente da restrição errada. Deve ser mantido, com ajuste textual mínimo nas mensagens de log.

---

## 2. Evidência metodológica de Hendy/Daumas

### Hendy, K.C. (2003) — SERA

O fluxo de Step 4 (Objetivo) em Hendy (2003) discrimina falha de intenção em três categorias:

- **O-A:** sem falha de intenção — o operador buscava cumprir a tarefa nominal.
- **O-B:** violação rotineira/habitual — o desvio é prática normalizada, aceita implicitamente, tolerada pela organização.
- **O-C:** violação excepcional — o desvio é isolado, não rotineiro, não típico do indivíduo, normalmente não tolerado pela supervisão.
- **O-D:** falha de intenção sem violação — decisão/intenção não conservativa que não caracteriza quebra de regra formal.

O critério de distinção O-B vs O-C em Hendy é exclusivamente **rotineiro vs excepcional**. Nenhuma formulação em Hendy condiciona O-C à motivação protetiva ou altruística.

### Daumas, F.P. (2018) — Dissertação

A dissertação aplica e expande SERA ao contexto offshore. A distinção O-B/O-C segue o mesmo critério de Hendy: o caráter rotineiro ou excepcional da violação, não sua motivação. Proteção humana aparece como contexto de exemplo (pouso não autorizado para passageiro doente), mas nunca como critério definidor.

### Conclusão metodológica

O requisito "intenção protetiva humana explícita para O-C" **não tem origem em Hendy (2003) nem em Daumas (2018)**. Foi introduzido indevidamente no projeto entre os commits `4b3fd56` e `8958d28`.

---

## 3. Arquivos contaminados pela interpretação incorreta

### 3.1 Motor e regras (código em runtime)

| Arquivo | Contaminação | Tipo |
|---|---|---|
| `frontend/src/lib/sera/all-steps.ts` | Linhas 2008-2009: NEVER classify O-C sem "EXPLICIT human protective motive"; Nó 2 prompt usa "protecao_humana/rotineira/nominal"; código mapeia não-protetivo para O-A | **Crítico — altera classificação runtime** |
| `frontend/src/lib/sera/rules/objective/O-C.json` | `label: "altruística"`, `requires: ["intencao explicita de protecao humana"]` | **Crítico — define O-C incorretamente** |

### 3.2 Documentação estratégica

| Arquivo | Contaminação | Tipo |
|---|---|---|
| `docs/SERA_V0_1_1_RELEASE_CANDIDATE.md` | Seção 3.4: "motivado por proteger uma pessoa de risco imediato" como requisito de O-C | Textual |
| `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | Item: "O-C exige proteção humana explícita" listado como escopo congelado | Textual |
| `docs/HFA_SITE_COPY_REVIEW.md` | Seção 4: "O-C = objetivo protetivo humano explícito, não apenas exceção isolada" | Textual |
| `docs/SERA_CODE_EVIDENCE_MATRIX.md` | Definição de O-C pode refletir restrição errada (a confirmar na revisão) | Textual |

### 3.3 UI/produto (textos de usuário final)

| Arquivo | Contaminação | Tipo |
|---|---|---|
| `frontend/src/app/(dashboard)/learn/objective/page.tsx` | Iteration anterior desta sessão introduziu "Objetivo protetivo humano" como label de O-C; já parcialmente corrigido, mas pode ainda ter resíduo | Textual — já em correção |

### 3.4 Arquivos NÃO contaminados

| Arquivo | Status |
|---|---|
| `frontend/src/lib/sera/rules/objective/select.ts` | `hasExplicitProtectiveHumanIntent` — CORRETO como gate POSITIVO de O-C (proteção humana implica O-C). Não restringe O-C, só expande detecção para um caso específico. |
| `tests/sera/fixtures/TEST-O-C-*.json` | CORRETOS — todos envolvem proteção humana, que ainda é O-C válido. Nenhum fixture precisa ser alterado. |
| `tests/sera/fixtures/TEST-COMBO-003.json` | CORRETO — O-A por knowledge deficit. Válido sob definição ampla (sem desvio consciente de protocolo). |
| `frontend/src/lib/sera/rules/objective/O-A.json` | CORRETO |
| `frontend/src/lib/sera/rules/objective/O-B.json` | CORRETO |
| `frontend/src/lib/sera/rules/objective/O-D.json` | CORRETO |

---

## 4. Commits suspeitos

### `8958d28` — "fix(sera): require explicit human protection for O-C objective"

**Arquivos modificados:** `all-steps.ts`, `select.ts` (2 arquivos, 20 ins / 7 del)

**O que fez:**
1. Adicionou ao system prompt de `runStep4`: "NEVER classify O-C without evidence of EXPLICIT human protective motive" e "A single non-routine violation with no explicit human protective motive remains O-A".
2. Trocou o Nó 2 de `rotineira/excepcional` para `protecao_humana/rotineira/nominal`.
3. Mudou o código de classificação: qualquer violação não protetiva e não rotineira → O-A (era → O-C).
4. Ampliou `hasExplicitProtectiveHumanIntent` em `select.ts` com novos padrões ("proteger equipe", "colega preso em area de risco").

**Avaliação:** **Deve ser substituído por patch correto.** Não deve ser revertido integralmente — parte das mudanças em `select.ts` (novos padrões) e a estrutura do Nó 2 são aproveitáveis. O que precisa mudar é a lógica "não-protetivo → O-A".

**Motivação original:** controlar uma regressão pontual onde o LLM classificava O-C em casos de violação não-protetiva. A solução correta era fortalecer a distinção O-B/O-C, não restringir O-C a proteção humana.

---

### `f8e58c3` — "fix(sera): keep medical knowledge deficits in O-A objective"

**Arquivos modificados:** `all-steps.ts` (13 ins)

**O que fez:**
- Adicionou gate `hasKnowledgeDeficitObjectiveContext` antes do LLM em `runStep4`.
- Gate detecta vocabulário de déficit de treinamento/conhecimento e força O-A.

**Avaliação:** **Manter — com ajuste textual mínimo.** O gate é conceitualmente correto sob a definição ampla: knowledge deficit → operador não desviou conscientemente de protocolo que conhecia → objetivo era nominal → O-A. O gate é independente da restrição errada de proteção humana. As mensagens de log fazem referência a "objetivo protetivo desviante" — isso precisa ser corrigido para "desvio consciente de objetivo".

---

### `4b3fd56` — "test(sera): clarify objective fixture discriminators"

**Não inspecionado diretamente**, mas provável origem de parte do framing "O-C = violação altruística" nos discriminators dos fixtures. Os fixtures existentes têm discriminators que enfatizam proteção humana como critério, o que não é errado (proteção humana É O-C válido) mas pode ter contribuído para a interpretação restritiva que culminou em `8958d28`.

---

## 5. Risco de manter o motor atual

### Casos afetados pela restrição incorreta

O motor atual não classifica O-C para:

| Cenário | Classificação atual (errada) | Classificação correta |
|---|---|---|
| Operador pula etapa de checklist uma única vez por considerar desnecessária | O-A | **O-C** (desvio consciente excepcional) |
| Profissional descumpre protocolo isoladamente por achar que "desta vez não teria problema" | O-A | **O-C** (desvio consciente excepcional) |
| Equipe improvisa atalho pontual não usual sem motivação protetiva | O-A | **O-C** (desvio consciente excepcional) |
| Operador viola procedimento por pressão situacional circunstancial (não habitual) | O-A | **O-C** (desvio consciente excepcional) |

### Impacto nos fixtures atuais

Nenhum. Todos os fixtures O-C atuais envolvem proteção humana, que continua sendo O-C válido. A correção não altera nenhum resultado existente.

### Impacto no baseline v0.1

Nenhum impacto direto. Os fixtures validados no baseline têm O-C com proteção humana — passam em ambas as definições.

### Risco residual

Após a correção, o Nó 2 voltará a ser "rotineira/excepcional". O risco de regressão em TEST-COMBO-003 é baixo porque o gate `hasKnowledgeDeficitObjectiveContext` (f8e58c3) atua ANTES do LLM e força O-A com base em vocabulário explícito de déficit de conhecimento — independentemente do que o Nó 2 perguntaria.

---

## 6. Plano de reversão/correção mínima

### 6.1 `frontend/src/lib/sera/all-steps.ts` — 5 pontos de mudança

**Ponto 1 — System prompt (linhas ~2008-2009):**

Remover:
```
- NEVER classify O-C without evidence of EXPLICIT human protective motive (proteger passageiro/paciente/colega/equipe de risco imediato). Exceptional circumstance alone (pressure, tool not available, knowledge gap, administrative omission) is NOT O-C.
- A single non-routine violation with no explicit human protective motive remains O-A (nominal objective, execution-level problem).
```

Substituir por:
```
- NEVER classify O-C unless there is evidence of a CONSCIOUS and DELIBERATE deviation from a known rule or procedure. O-C is exceptional/non-routine — not normalized, not habitual. The motive can be convenience, improvisation, situational pressure, protective intent, or any other circumstantial reason.
- A non-routine conscious violation that is NOT habitual and NOT driven primarily by efficiency/economy is O-C, not O-A.
```

**Ponto 2 — System prompt (linha ~2012):**

Remover:
```
- O-C requires explicit prosocial/protective motive (proteger pessoa/paciente/passageiro).
```

Substituir por:
```
- O-C requires evidence of a conscious, non-routine deviation from a rule or procedure. Protective human intent is one valid O-C motive, not the only one.
```

**Ponto 3 — Gate `evidenceOfObjectiveCForbiddenContext` return message (linha ~2069):**

Remover:
```
'O-B, O-C e O-D descartados — O-C exige intenção explícita de proteção humana'
```

Substituir por:
```
'O-B, O-C e O-D descartados — contexto de comunicação/coordenação operacional sem desvio consciente de objetivo'
```

**Ponto 4 — Gate `hasKnowledgeDeficitObjectiveContext` messages (linhas ~2078, ~2082):**

Linha 2078 (description do nó):
```
'Gate determinístico: déficit explícito de conhecimento/treinamento — causa instrucional sem desvio consciente de objetivo.'
```
(remover referência a "objetivo protetivo")

Linha 2082 (discarded message):
```
'O-B, O-C e O-D descartados — lacuna explícita de conhecimento/treinamento indica objetivo nominal sem desvio consciente de protocolo'
```

**Ponto 5 — Nó 2 prompt e código de classificação (linhas ~2116-2125):**

Prompt atual (errado):
```
NÓ 2 — Qual é a natureza da violação de objetivo? Escolha exatamente um:
• "protecao_humana": existe evidência EXPLÍCITA e LITERAL de que o objetivo da violação era proteger uma pessoa... → O-C
• "rotineira": existe evidência de violação normalizada... → O-B
• "nominal": a violação ocorreu no contexto de cumprir a tarefa nominal... → O-A
```

Prompt correto:
```
NÓ 2 — Esta violação de objetivo é rotineira ou excepcional?
• "rotineira": desvio normalizado, habitual, atalho cultural repetido, tolerado pela organização ("todos fazem", "burocracia", histórico) → O-B
• "excepcional": desvio consciente, pontual, isolado, não típico, não normalizado — qualquer motivação (conveniência, improviso, pressão situacional, proteção humana, atalho único) → O-C
Responda APENAS com JSON: {"tipo": "rotineira/excepcional", "justificativa": "..."}
```

Código atual (errado):
```typescript
const codigo: 'O-A' | 'O-B' | 'O-C' = tipo2.includes('rotineira') ? 'O-B' : tipo2.includes('protec') ? 'O-C' : 'O-A'
```

Código correto:
```typescript
const codigo: 'O-B' | 'O-C' = tipo2.includes('rotineira') ? 'O-B' : 'O-C'
```

Mensagem discarded2 atual (errada):
```
codigo === 'O-C' ? 'O-A, O-B e O-D descartados — objetivo protetivo humano explícito' : 'O-B, O-C e O-D descartados — objetivo nominal sem proteção humana'
```

Mensagem correta:
```
codigo === 'O-B' ? 'O-A, O-C e O-D descartados — violação rotineira/normalizada' : 'O-A, O-B e O-D descartados — violação consciente excepcional/não rotineira'
```

---

### 6.2 `frontend/src/lib/sera/rules/objective/O-C.json` — 3 campos

```json
{
  "code": "O-C",
  "label": "Violação excepcional/circunstancial",
  "description": "Desvio consciente e pontual de regra ou procedimento, isolado, não rotineiro, não normalizado pela equipe ou organização. A motivação pode ser conveniência, improviso, pressão situacional, proteção humana ou qualquer razão circunstancial.",
  "requires": ["desvio consciente nao rotineiro de regra ou procedimento conhecido"],
  ...
}
```

---

### 6.3 `frontend/src/lib/sera/rules/objective/select.ts` — nenhuma mudança de lógica necessária

`hasExplicitProtectiveHumanIntent` é um gate POSITIVO para O-C (detecta um caso válido de O-C). Não restringe O-C — apenas identifica um tipo específico. Manter como está.

---

### 6.4 Documentos estratégicos — ajustes textuais

| Arquivo | Linha afetada | Ação |
|---|---|---|
| `docs/SERA_V0_1_1_RELEASE_CANDIDATE.md` | Seção 3.4 | Remover "motivado por proteger uma pessoa de risco imediato" como requisito; manter "desvio consciente de protocolo conhecido" |
| `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | Item "O-C exige proteção humana explícita" | Substituir por "O-C exige desvio consciente excepcional/não rotineiro; proteção humana é motivação válida, não requisito" |
| `docs/HFA_SITE_COPY_REVIEW.md` | Seção 4, linha O-C | Corrigir descrição de O-C |
| `docs/SERA_CODE_EVIDENCE_MATRIX.md` | Seção O-C | Verificar e corrigir se necessário |

---

### 6.5 UI — `learn/objective/page.tsx`

Já parcialmente corrigido nesta sessão. Verificar se ainda existe qualquer referência residual a "objetivo protetivo" como requisito.

---

## 7. Testes seletivos a rodar após o patch

| Grupo/Fixture | Runs | Objetivo | Risco esperado |
|---|---|---|---|
| `TEST-O-C-001` | 3 | Continua O-C (passageiro com infarto — O-C válido sob definição ampla) | Nenhum |
| `TEST-O-C-002` | 3 | Continua O-C (passageiro com deterioração) | Nenhum |
| `TEST-GEN-OC-001` | 3 | Continua O-C (AVC passageiro) | Nenhum |
| `TEST-GEN-OC-002` | 3 | Continua O-C (colega em área de risco) | Nenhum |
| `TEST-GEN-OC-003` | 3 | Continua O-C (emergência em aeródromo) | Nenhum |
| `TEST-COMBO-003` | 10 | Continua O-A (knowledge deficit; gate f8e58c3 atua antes do LLM) | Baixo — gate independente do patch |
| `TEST-O-B-001` | 3 | Continua O-B (violação rotineira normalizada) | Nenhum |
| `TEST-O-D-001` | 3 | Continua O-D (improvement do v0.1.1) | Nenhum |
| Grupo `objective` (5 fixtures) | 15 | Todos devem passar 15/15 | Baixo |
| Grupo `combo` (3 fixtures) | 9 | Todos devem passar 9/9 | Baixo |

**Comando de execução seletiva (após patch, sem smoke global):**

```bash
npx tsx tests/sera/run.ts --filter TEST-O-C-001,TEST-O-C-002,TEST-GEN-OC-001,TEST-GEN-OC-002,TEST-GEN-OC-003,TEST-COMBO-003,TEST-O-B-001,TEST-O-D-001 --n-runs 3 --compact
npx tsx tests/sera/run.ts --filter TEST-COMBO-003 --n-runs 10 --compact
```

---

## 8. Recomendação por mudança recente

| Commit / Arquivo | Ação recomendada | Justificativa |
|---|---|---|
| `8958d28` — prompt e lógica Nó 2 em `all-steps.ts` | **Substituir por patch corrigido** (não reverter integralmente) | A estrutura do Nó 2 melhorou, mas a restrição a proteção humana é metodologicamente incorreta |
| `8958d28` — extensão de `select.ts` (novos padrões protetivos) | **Manter** | `hasExplicitProtectiveHumanIntent` é um gate POSITIVO correto; ampliar padrões de detecção é válido |
| `f8e58c3` — gate `hasKnowledgeDeficitObjectiveContext` | **Manter, com ajuste textual** | Gate correto conceptualmente; apenas as mensagens de log fazem referência indevida a "objetivo protetivo" |
| `O-C.json` — label e requires | **Corrigir** | "altruística" e "intencao explicita de protecao humana" como label/requires são incorretos |
| `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | **Corrigir texto** | "O-C exige proteção humana explícita" está listado como escopo congelado — é um erro que deve ser corrigido antes de ser tratado como referência |
| `docs/SERA_V0_1_1_RELEASE_CANDIDATE.md` | **Corrigir texto** | Seção 3.4 mistura corretamente "desvio consciente de protocolo" com incorretamente "motivado por proteger uma pessoa" |
| Fixtures `TEST-O-C-*` e `TEST-GEN-OC-*` | **Manter sem alteração** | Todos descrevem O-C válido; passar na definição ampla e na restrita |
| `learn/objective/page.tsx` | **Verificar resíduo** | Já corrigido nesta sessão para "violação excepcional"; confirmar ausência de "objetivo protetivo" como requisito |

---

## 9. Patch mínimo — resumo executivo de implementação

O patch mínimo altera **2 arquivos de motor** (`all-steps.ts` e `O-C.json`) e **2 documentos estratégicos** (`SERA_V0_1_1_FROZEN_SCOPE.md`, `SERA_V0_1_1_RELEASE_CANDIDATE.md`).

Não altera: fixtures, baseline JSON, runner, `select.ts` (lógica), outros steps.

Estimativa de linhas: ~25 linhas alteradas em `all-steps.ts`, 4 linhas em `O-C.json`, ajustes textuais pontuais nos docs.

**Antes de aplicar:** mostrar diff completo ao autor para confirmação.
**Depois de aplicar:** rodar validação seletiva dos grupos objective e combo (53 runs).
**Smoke global:** apenas se a validação seletiva indicar comportamento inesperado.
