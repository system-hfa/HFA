# SERA — Revisão Metodológica: TEST-T2-W2-001

**Data:** 2026-05-14  
**Objetivo:** Determinar se o golden label atual (`O-A`) está metodologicamente correto ou se deve ser alterado.  
**Fontes consultadas:** fixture JSON, `O-A.json`, `O-B.json`, `O-C.json`, `O-D.json`, `BASELINE.md`, run ao vivo (3 runs, 2026-05-14).

---

## 1. Resumo da Fixture

| Campo | Conteúdo |
|-------|---------|
| **ID** | TEST-T2-W2-001 |
| **Título** | Ferramenta improvisada sob pressão de prazo |
| **Domínio** | Manutenção industrial |
| **Expected** | P-A / O-A / A-D / ERC 3 |
| **Precondições esperadas** | T2, W2, W1, O4 |

### Texto factual da fixture

> "Uma equipe precisava concluir uma intervenção antes do fim da janela de parada definida pela organização. A ferramenta especificada estava indisponível no posto, e o supervisor pressionava pela liberação no horário. **Para manter o prazo**, a equipe utilizou uma ferramenta improvisada que exigia postura instável e aplicação de força fora do eixo, degradando fisicamente a execução e dificultando o controle fino do torque."

### Rationale da fixture

> "P-A: a equipe percebia a condição e a limitação da ferramenta. O-A: a tarefa continuava sendo a intervenção regular, sem objetivo de dano. A-D: a ação ficou fisicamente degradada por ferramenta inadequada e postura restritiva. ERC 3: a execução degradada elevou risco técnico, mas sem dano imediato descrito."

### Discriminadores presentes

1. "Não é O-D: o objetivo formal ainda era completar a manutenção, e o foco do caso é reforçar pressão T2/W2 sobre execução física."
2. "Não é A-B: a etapa não foi omitida; foi executada em condição física inadequada."
3. "Não é P-B: não houve perda sensorial ou obstrução perceptiva."

---

## 2. Expected Atual

```json
{
  "perception_code": "P-A",
  "objective_code": "O-A",
  "action_code": "A-D",
  "erc_level": 3,
  "top_preconditions": ["T2", "W2", "W1", "O4"]
}
```

---

## 3. Resultados dos 3 Runs (2026-05-14)

| Run | P | O | A | ERC | Overall |
|-----|---|---|---|-----|---------|
| 0 | P-A ✓ | **O-A** ✓ | A-D ✓ | 3 ✓ | PASS |
| 1 | P-A ✓ | **O-C** ✗ | A-D ✓ | 3 ✓ | PARTIAL |
| 2 | P-A ✓ | **O-A** ✓ | A-D ✓ | 3 ✓ | PASS |

**Padrão:** P-A, A-D e ERC 3 são estáveis (gates determinísticos). O objetivo oscila entre O-A (correto) e O-C (incorreto) — 1 de 3 runs erra. No smoke global v0.1.1, a instabilidade era ainda mais alta (2/3 runs O-C).

---

## 4. Análise Metodológica

### 4.1 Há evidência explícita de proteção humana/altruística?

**Não.**

Nenhuma das seguintes palavras-chave ou conceitos estão presentes no relato: "proteger passageiro", "proteger paciente", "proteger pessoa", "proteger equipe", "salvar alguém", "emergência humana", "evitar dano imediato a pessoa", "socorro". A definição de O-C exige `"intenção explícita de proteção humana"` (O-C.json, campo `requires`). Essa condição não é satisfeita.

### 4.2 Há consciência explícita de violação?

**Sim — mas isso é irrelevante para a classificação do objective.**

A equipe sabia que a ferramenta especificada estava indisponível e que usaria uma improvisada. Há consciência de limitação instrumental. Porém, o campo `objective_code` classifica o **objetivo** do agente, não o grau de consciência da violação. O-A define: *"agente buscava cumprir a tarefa nominal sem intenção desviante explícita"*. Consciência de limitação não equivale a intenção desviante — o objetivo final continuava sendo completar a manutenção.

**Armadilha semântica:** O-C chama-se "Violação excepcional/altruística". O LLM pode inferir que "violação em circunstância excepcional" → O-C, quando a definição correta é "violação motivada por proteção humana". A fixture não tem discriminador que explicite essa distinção.

### 4.3 A ação foi nominal, protetiva, rotina normalizada, eficiência ou outro padrão?

A ação (`A-D`) foi de **execução fisicamente degradada** — a equipe tentou executar a tarefa nominal mas a qualidade de execução foi comprometida pela ferramenta inadequada. O gate `A-D` dispara deterministicamente ("limitação física, motora, ergonômica, EPI, força, alcance ou equipamento impediu a execução") e está correto.

O padrão da situação é: **coerção circunstancial** — a equipe não escolheu desviar do objetivo; foi forçada por ausência de recurso (W1, W2) e pressão externa (T2). O objetivo permaneceu nominal.

### 4.4 "Para manter o prazo" é O-D ou algo dentro de O-A?

A frase-chave é *"Para manter o prazo"*. Poderia isso justificar O-D?

**Não**, pelas seguintes razões:

| Critério | O-D (eficiência/economia) | Este cenário |
|---------|--------------------------|-------------|
| Motivação | Ganho operacional proativo (economizar tempo, combustível, custo) | Reação a constrangimento (prazo imposto pelo supervisor) |
| Resultado | Procedimento mais rápido/barato do que o correto | Procedimento mais lento/difícil do que o correto (postura instável, mais esforço) |
| Caráter | Decisão de otimização | Adaptação forçada por escassez de recurso |

O-D requer evidência de que a eficiência era o **objetivo desviante**: *"Objetivo de ganho operacional, economia, tempo, produtividade"* (O-D.json, `description`). Aqui não há ganho — a execução com ferramenta improvisada foi degradada. O prazo era uma restrição organizacional externa, não uma escolha de otimização do agente.

O discriminador da própria fixture confirma: *"o objetivo formal ainda era completar a manutenção."*

### 4.5 Por que o LLM converge para O-C (e não O-B ou O-D)?

O modelo parece raciocinar:
1. "A equipe sabia que a ferramenta era inadequada" → há consciência de desvio
2. "A situação era incomum" (ferramenta indisponível, supervisor pressionando) → "excepcional"
3. O-C = "Violação excepcional" → **confusão semântica**: "circunstância excepcional" ≠ "motivação altruística"
4. Os discriminadores da fixture não mencionam "Não é O-C" → sem guardrail explícito para essa confusão

O-B e O-D são rejeitados corretamente pelo LLM porque não há evidência de rotina normalizada nem de ganho operacional. O-C se torna o "melhor fit errado" na ausência de discriminador.

---

## 5. Conclusão

### O golden label `O-A` está **correto**.

**Fundamentação metodológica completa:**

| Código | Por que não se aplica |
|--------|-----------------------|
| **O-C** | Requer "intenção explícita de proteção humana" (O-C.json). Não há passageiro, paciente nem pessoa em risco sendo protegida. A motivação foi completar a manutenção dentro do prazo, não salvar alguém. |
| **O-D** | Requer ganho de eficiência/economia como objetivo desviante. A execução com ferramenta improvisada foi mais difícil, não mais eficiente. "Manter o prazo" é uma restrição externa, não uma escolha de otimização. |
| **O-B** | Requer normalização/rotina ("todos fazem assim"). Não há evidência de prática habitual ou cultura de atalho. |
| **O-A** | O objetivo era completar a intervenção de manutenção — tarefa nominal. O desvio (ferramenta improvisada) foi instrumental (meio), não um desvio no objetivo. Nenhuma intenção desviante explícita. **Correto.** |

**O problema é exclusivamente um gap no classificador, não um erro no golden.**

---

## 6. Análise da Causa Raiz da Instabilidade

### Gap 1 — Discriminador O-C ausente na fixture

A fixture tem "Não é O-D" mas não tem "Não é O-C". Como O-C é o "segundo código mais tentador" quando há consciência de desvio em circunstância excepcional, a ausência desse discriminador deixa o LLM sem guardrail para a confusão mais frequente.

### Gap 2 — Ambiguidade semântica do label O-C

O-C se chama "Violação excepcional/altruística". O termo "excepcional" é semanticamente ambíguo: pode significar "incomum/especial" (→ circunstância) ou "por proteção humana" (→ motivação). O LLM tende a usar o primeiro significado. A `description` no O-C.json é precisa ("Objetivo pró-social conflitante com regra/procedimento para proteger pessoa, passageiro, paciente ou equipe"), mas o label por si só pode sobrepor o contexto.

### Gap 3 — Nenhum gate determinístico no step 4 cobre este padrão

Para P-A e A-D há gates determinísticos que disparam corretamente nesta fixture. Para O-A não há gate que valide: "cenário com ferramenta indisponível + pressão de prazo + objetivo nominal intacto → O-A." O step 4 vai ao LLM sem guardrail específico para este padrão de coerção circunstancial.

---

## 7. Recomendação

### Decisão: **manter O-A como golden + corrigir o classificador**

Não alterar o golden label. A análise metodológica confirma O-A. As correções necessárias são no classificador:

#### 7.1 Adicionar discriminador O-C na fixture (sem alterar golden)

```json
"discriminators": [
  "Não é O-C: O-C requer intenção explícita de proteger uma pessoa (passageiro, paciente, colega em risco imediato). Aqui o desvio foi instrumental — a equipe não tinha motivação altruística, buscava apenas concluir a tarefa nominal com a ferramenta disponível.",
  "Não é O-D: ...",
  "Não é A-B: ...",
  "Não é P-B: ..."
]
```

**Risco:** Baixo. Adicionar discriminador não altera o golden, apenas guia o classificador. Pode ser feito antes do próximo smoke.

#### 7.2 Fortalecer o gate O-A no step 4 (médio prazo)

Adicionar em `all-steps.ts` (step 4) um gate determinístico que reconheça o padrão "coerção circunstancial por ausência de recurso + objetivo nominal preservado → O-A": quando o relato contém ferramenta indisponível/inadequada E pressão de prazo E não há evidência de proteção humana nem eficiência proativa → forçar O-A.

**Risco:** Médio. Alterar lógica de step 4 afeta todas as fixtures. Requer validação com grupo completo antes de merge.

#### 7.3 Não é recomendado

- **Criar nova fixture separada:** o cenário é válido e cobre um padrão real (T2/W2 → A-D). Não justifica fragmentação.
- **Alterar o golden para O-C:** metodologicamente incorreto. O-C requer proteção humana explícita que está ausente.
- **Alterar o golden para O-D:** metodologicamente questionável. Não há evidência de ganho de eficiência como objetivo desviante.

---

## 8. Riscos Metodológicos

| Ação | Risco | Mitigação |
|------|-------|-----------|
| Adicionar discriminador O-C na fixture | Baixo | Apenas texto; não altera golden nem código |
| Gate O-A no step 4 | Médio | Validar com smoke de grupo antes de merge |
| Alterar golden para O-C | **Alto** — metodologicamente errado | Não fazer |
| Alterar golden para O-D | Médio — ambíguo | Não fazer; O-D requer ganho positivo de eficiência |
| Manter status quo sem correção | Médio | Fixture permanece instável; prejudica determinism_rate |

---

## 9. Critério de Sucesso

Após adicionar o discriminador O-C na fixture:
- Run 3/3 PASS em run isolado de TEST-T2-W2-001
- Nenhuma regressão nos fixtures TEST-GEN-OC-* (verificar que O-C legítimo não é afetado)

O smoke completo deve ser rodado apenas após todas as correções do Grupo B estarem prontas (ver `docs/SERA_V0_1_1_FAILED_SMOKE_TRIAGE.md`).
