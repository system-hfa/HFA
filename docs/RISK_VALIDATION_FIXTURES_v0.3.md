# RISK Validation Fixtures — v0.3

**Data:** 2026-05-17  
**Fase:** RISK v0.3  
**Branch:** main  
**Escopo:** Fixtures de validação do modelo dual de risco (ERC × ISO/ICAO) — sem alteração de motor, UI, baseline ou schema  

---

## 1. Objetivo

Este documento registra os 10 fixtures criados para validar o modelo dual de risco conforme especificado em `docs/RISK_VALIDATION_PLAN_v0.2.md`. Os fixtures cobrem:

- **ERC anchors** (ERC-001 a ERC-005): um fixture por nível de risco ERC 5→1, ancorando o comportamento esperado em cada extremo da escala
- **Dual model** (DUAL-001, DUAL-002): cenários que demonstram a distinção entre resultado factual e risco potencial (ERC ≠ resultado do evento)
- **ISO boundary** (ISO-001): evento com modo de falha novel — demonstra por que a matriz tradicional falha quando não há dados de frequência
- **SIRA distinction** (SIRA-001, SIRA-002): eventos onde o ERC individual é baixo/médio mas o padrão recorrente ou a mudança operacional requer SIRA prospectivo

**Objetivo de validação:** documentar o comportamento atual do motor para esses cenários de risco, identificar divergências sistemáticas pré-normalização e definir critérios de aceitação para a fase de normalização (RISK v0.4+).

---

## 2. Fixtures criados

| ID | Título curto | Categoria | Expected P/O/A | Expected ERC (motor) |
|---|---|---|---|---|
| TEST-RISK-ERC-001 | Erro de unidade em formulário de combustível | ERC anchor 5 | P-A/O-A/A-A | 5 |
| TEST-RISK-ERC-002 | Decolagem sem verificação de itens de segurança de cabine | ERC anchor 4 | P-A/O-A/A-B | 4 |
| TEST-RISK-ERC-003 | Comandante não confirma referência altimétrica em IMC | ERC anchor 3 | P-B/O-A/A-C | 3 |
| TEST-RISK-ERC-004 | Aproximação instabilizada prosseguida contra call-out | ERC anchor 2 | P-B/O-B/A-D | 2 |
| TEST-RISK-ERC-005 | Quase colisão com aeronave VFR em tráfego intenso | ERC anchor 1 | P-B/O-A/A-G | 1 |
| TEST-RISK-DUAL-001 | Decolagem em pista com aeronave de carga — resultado menor, potencial catastrófico | Dual model | P-B/O-A/A-G | 1 |
| TEST-RISK-DUAL-002 | Fratura de passageiro por turbulência — ERC por barreiras, não por frequência | Dual model | P-B/O-A/A-C | 3 |
| TEST-RISK-ISO-001 | Comandante decide continuar com falha de modo não documentado no aileron | ISO boundary | P-B/O-A/A-C | 2 |
| TEST-RISK-SIRA-001 | Decolagem sem atualização de ATIS — evento isolado ERC 4, padrão é Safety Issue | SIRA distinction | P-A/O-A/A-B | 4 |
| TEST-RISK-SIRA-002 | Fadiga após redução de descanso sem avaliação de risco — ERC do evento vs SIRA da mudança | SIRA distinction | P-B/O-A/A-G | 2 |

**Escala ERC (motor):** 1 = risco imediato crítico, 5 = risco mínimo administrativo (escala `levels.json`).  
**Escala ERC (UI, pós-normalização Opção A):** invertida — UI ERC 5 = mais perigoso. Ver `future_expected.ui_erc_post_normalizacao` em cada fixture.

---

## 3. Resultados de validação — Run 1 (2026-05-17)

**Configuração:** `--filter TEST-RISK --n-runs 1 --compact` (fixtures executados individualmente por limitação de tempo da API deepseek-reasoner)

| ID | Motor P | Motor O | Motor A | Status | Observação |
|---|---|---|---|---|---|
| TEST-RISK-ERC-001 | P-A ✅ | O-A ✅ | A-C ⚠ | PARTIAL | A-C em vez de A-A (omissão de verificação vs ação errada direta) |
| TEST-RISK-ERC-002 | P-G ⚠ | O-A ✅ | A-B ✅ | PARTIAL | P-G em vez de P-A (ATIS disponível e não verificado → gate P-G) |
| TEST-RISK-ERC-003 | P-A ⚠ | O-A ✅ | A-B ⚠ | PARTIAL | P-A em vez de P-B; A-B em vez de A-C (omissão de passo vs não confirmação) |
| TEST-RISK-ERC-004 | P-G ⚠ | O-A ⚠ | A-C ⚠ | **FAIL** | P-G vs P-B; O-B não detectado; A-C vs A-D — todos divergem |
| TEST-RISK-ERC-005 | P-E ⚠ | O-A ✅ | A-C ⚠ | PARTIAL | P-E (erro de estimativa temporal — subcategoria válida de P-B); A-C vs A-G |
| TEST-RISK-DUAL-001 | P-A ⚠ | O-A ✅ | A-B ⚠ | PARTIAL | P-A vs P-B; A-B vs A-G (execução vs ação urgente) |
| TEST-RISK-DUAL-002 | P-A ⚠ | O-C ⚠ | A-A ⚠ | **FAIL** | P-A vs P-B; O-C gate disparou (atendimento ao passageiro = objetivo protetivo); A-A vs A-C |
| TEST-RISK-ISO-001 | P-A ⚠ | O-A ✅ | A-F ⚠ | PARTIAL | P-A vs P-B; A-F (seleção errada entre alternativas) vs A-C — A-F defensável |
| TEST-RISK-SIRA-001 | P-G ⚠ | O-A ✅ | A-B ✅ | PARTIAL | P-G vs P-A (ATIS disponível e não verificado → gate P-G) |
| TEST-RISK-SIRA-002 | P-G ⚠ | O-A ✅ | A-D ⚠ | PARTIAL | P-G vs P-B; A-D (limitação física por fadiga) vs A-G (ação urgente) |

**Totais:** PASS 0 · PARTIAL 8 · FAIL 2 · ERROR 0

---

## 4. Análise de divergências sistemáticas

### 4.1 Padrão P-G agressivo (7/10 fixtures)

O gate determinístico `P-G` dispara para qualquer cenário onde "informação estava disponível e deveria ter sido verificada pelo próprio operador." O resultado é que cenários que deveriam ser classificados como `P-A` (sem falha perceptiva) ou `P-B` (percepção degradada por condição externa) frequentemente chegam como `P-G`.

**Exemplos:**
- ERC-002 e SIRA-001: omissão de verificação de ATIS → P-G (correto: P-A, porque não havia falha de percepção, apenas de ação)
- ERC-004: comandante com indicadores de instabilização visíveis → P-G (esperado: P-B porque os dados estavam disponíveis mas a percepção estava distorcida por comprometimento cognitivo/atencional)
- SIRA-002: fadiga → P-G (esperado: P-B porque a capacidade perceptiva estava fisiologicamente comprometida)

**Causa raiz:** O gate P-G não distingue entre "informação disponível mas não acessada por omissão" (P-A ou P-G) e "informação disponível mas percepção comprometida por estado do operador" (P-B).

**Impacto:** Não bloqueia uso dos fixtures como referência de metodologia; afeta apenas a concordância quantitativa dos códigos de percepção.

### 4.2 P-B subreportado (0/5 fixtures esperavam P-B obtiveram P-B)

O gate determinístico de P-A é muito restritivo: exige evidência lexical explícita de falha perceptiva ("não viu", "não ouviu", "não percebeu"). Cenários com percepção degradada por condição fisiológica (fadiga), por resposta inesperada de sistema (falha de equipamento) ou por contexto de alta demanda cognitiva não são capturados como P-B.

**Referência ARMS:** P-B cobre qualitativa e funcionalmente qualquer situação onde o operador não percebeu o estado real por razão que não seja omissão pura de verificação — incluindo degradação fisiológica, distração atencional, equipamento transmitindo informação incorreta ou ausência de informação esperada.

### 4.3 O-B não detectado (ERC-004)

O gate determinístico de O-C captura violações excepcionais/circunstanciais, mas o motor não detecta O-B (violação normalizada/padrão). O-B requer evidência de que o operador havia internalizado o desvio como comportamento habitual. O motor parece convergir para O-A (objetivo nominal) quando O-B não tem trigger lexical explícito.

**Impacto em ERC-004:** a recusa ao call-out de go-around é um indicador claro de O-B, mas o motor classificou O-A porque não há frase explícita indicando que o comandante "habitualmente" ignorava call-outs.

### 4.4 A-G raramente classificado (0/3 fixtures esperavam A-G obtiveram A-G)

`A-G` (ação especial sob urgência/emergência) não é detectado quando existe uma path de A-A (decisão racional) ou A-D (limitação física). O motor prioriza a ação do protagonista como racional ou como limitação, nunca como resposta de emergência urgente.

**Referência ARMS:** A-G deveria ser aplicado quando a ação principal do evento foi uma resposta a uma condição de urgência imediata — transferência de controles em emergência, manobra evasiva de última instância, etc.

### 4.5 O-C gate sensível a comportamentos protetivos (DUAL-002)

O fixture DUAL-002 gerou FAIL porque o gate O-C detectou "objetivo protetivo/humano explícito" a partir da descrição do atendimento ao passageiro pela tripulação de cabine. O gate classificou O-C (violação excepcional com objetivo de proteção humana), levando a A-A automático.

**Causa raiz:** O gate O-C foi acionado pela ação de atendimento da tripulação de cabine (terceiros no evento), não pela ação do protagonista (piloto que não recebeu SIGMET). O gate não distingue entre o protagonista do evento e os demais atores.

---

## 5. Análise por fixture

### TEST-RISK-ERC-001 — ERC anchor: risco mínimo (5)

**Conceito:** Erro administrativo de unidade em formulário de combustível — sem impacto imediato à segurança operacional. Demonstra que ERC existe em todo o espectro, incluindo eventos sem risco operacional direto.

**Expected:** P-A/O-A/A-A/ERC 5  
**Motor:** P-A/O-A/A-C/PARTIAL

**Análise:** A-C (falha em verificar resultado da ação) vs A-A (ação diretamente errada). O motor detectou corretamente que o operador não verificou a unidade ao preencher o formulário — A-C é tecnicamente defensável. A distinção entre A-A (ação errada direta) e A-C (não confirmar resultado) para este cenário é um caso-limite genuíno do modelo.

**Bloqueante para normalização?** Não. A divergência A-A vs A-C não altera o ERC computado para este nível de risco mínimo.

---

### TEST-RISK-ERC-002 — ERC anchor: risco baixo (4)

**Conceito:** Omissão procedimental com barreira de detecção efetiva. Demonstra ERC 4 — consequência indireta, dependente de degradação adicional.

**Expected:** P-A/O-A/A-B/ERC 4  
**Motor:** P-G/O-A/A-B/PARTIAL

**Análise:** A-B ✅ (match exato). P-G vs P-A: ambos indicam ausência de falha perceptiva primária — P-G é uma subcategoria de P-A no contexto ARMS. A divergência é de granularidade, não de direção.

**Bloqueante para normalização?** Não. O-A ✅ e A-B ✅ são as classificações mais impactantes para o ERC.

---

### TEST-RISK-ERC-003 — ERC anchor: risco moderado (3)

**Conceito:** Omissão CRM em contexto de falha de instrumento em IMC. O comandante não confirma a transição de referência altimétrica com o copiloto.

**Expected:** P-B/O-A/A-C/ERC 3  
**Motor:** P-A/O-A/A-B/PARTIAL

**Análise:** O-A ✅. P-A vs P-B: o gate P-A capturou a ausência de evidência lexical de falha perceptiva; P-B seria mais preciso dado o contexto de degradação do instrumento. A-B vs A-C: A-B (omissão de passo) vs A-C (não confirmar resultado) — ambos capturaram a falha de confirmação CRM, diferindo na sub-categorização.

**Bloqueante para normalização?** Não. A divergência está na granularidade das subcategorias, não na direção do risco.

---

### TEST-RISK-ERC-004 — ERC anchor: risco alto (2)

**Conceito:** Aproximação instabilizada prosseguida pelo comandante contra call-out do copiloto e contra procedimento mandatório de go-around. Dano estrutural confirmado.

**Expected:** P-B/O-B/A-D/ERC 2  
**Motor:** P-G/O-A/A-C/FAIL

**Análise:** Divergência tripla. P-G vs P-B: a "informação disponível" (indicadores, call-out do copiloto) foi captada pelo gate P-G, mas o cenário descreve percepção comprometida por comprometimento cognitivo/atencional (P-B seria correto). O-A vs O-B: o motor não detectou o padrão de violação normalizada — não há trigger lexical explícito de "hábito" ou "padrão"; o motor foi para O-A. A-C vs A-D: o motor detectou "não verificar resultado da própria ação" (A-C) em vez de "continuar com dados inválidos" (A-D).

**Bloqueante para normalização?** Sim — este é o fixture de referência para ERC 2 (alto risco). A não-detecção de O-B é a divergência mais significativa, pois O-B é um indicador de padrão sistêmico que distingue ERC 2 de ERC 3. Deve ser endereçado na normalização do motor para O-B.

---

### TEST-RISK-ERC-005 — ERC anchor: risco crítico (1)

**Conceito:** Quase colisão com 2 segundos de margem em área de tráfego VFR intenso, sem transponder na aeronave VFR, sem cobertura de radar ATC. Barreiras mínimas.

**Expected:** P-B/O-A/A-G/ERC 1  
**Motor:** P-E/O-A/A-C/PARTIAL

**Análise:** O-A ✅. P-E vs P-B: P-E (erro de estimativa temporal) é uma subcategoria válida e mais específica do que P-B para este cenário — o piloto subestimou o tempo disponível para detectar e evitar a colisão. P-E é mais preciso do que P-B genérico. A-G vs A-C: o motor classificou A-C (não verificar tráfego antes de continuar a descida) em vez de A-G (ação evasiva de emergência). A divergência reflete que A-G seria a resposta à situação de quase colisão (manobra evasiva), enquanto A-C captura o lapso que causou a situação.

**Bloqueante para normalização?** Não para ERC — a combinação P-E/O-A/A-C com ERC 1 (barreiras mínimas) é metodologicamente coerente com ARMS. P-E é aceitável como substituto de P-B aqui.

---

### TEST-RISK-DUAL-001 — Dual model: resultado menor, potencial catastrófico

**Conceito:** Decolagem com aeronave de carga na pista — quase colisão resolvida por rotação antecipada. Resultado factual: voo sem contato. Potencial: perda de ambas as aeronaves. Demonstra que ERC é determinado pelo potencial e pelas barreiras, não pelo resultado.

**Expected:** P-B/O-A/A-G/ERC 1  
**Motor:** P-A/O-A/A-B/PARTIAL

**Análise:** O-A ✅. P-A vs P-B: o gate P-A capturou a ausência de evidência lexical. P-B seria mais preciso dado que a falha de comunicação torre/solo criou percepção incorreta sobre o estado da pista. A-B vs A-G: o motor classificou a omissão de verificação da pista (A-B) em vez da rotação antecipada de emergência (A-G). A-B captura a causa, A-G captura a resposta — ambos são factualmente corretos, apenas para momentos diferentes do evento.

**Bloqueante para normalização?** Não para o conceito central (ERC ≠ resultado). A divergência P-B/A-G vs P-A/A-B não altera a demonstração do modelo dual.

---

### TEST-RISK-DUAL-002 — Dual model: ERC por barreiras, não por frequência de recorrência

**Conceito:** Fratura de passageiro por turbulência severa. Sinal de cinto ativo, orientação 8 minutos antes, uplink ACARS com atraso. ERC 3 determinado pelas barreiras daquele dia, não pela frequência de turbulência na rota.

**Expected:** P-B/O-A/A-C/ERC 3  
**Motor:** P-A/O-C/A-A/FAIL

**Análise:** Divergência tripla. O gate O-C foi acionado pelo texto de atendimento ao passageiro pela tripulação de cabine, identificando "objetivo protetivo/humano explícito." O gate não distingue entre a ação do protagonista (piloto que não recebeu SIGMET) e a ação de terceiros (tripulação de cabine prestando socorro). O resultado em cascata foi: O-C → A-A automático (gate A-A O-C).

**Causa específica do FAIL:** o gate O-C atua sobre o texto completo do relato, capturando ações de qualquer ator presente — não apenas do protagonista. Para eventos com múltiplos atores, isso gera falsos positivos de O-C.

**Bloqueante para normalização?** Sim — o comportamento de O-C sobre ações de terceiros é um problema de escopo do gate, não de interpretação do fixture. Deve ser endereçado na normalização do gate O-C para restringir ao protagonista da ação insegura.

---

### TEST-RISK-ISO-001 — ISO boundary: ERC determinístico, matriz tradicional falha

**Conceito:** Comandante decide continuar com falha não documentada no atuador de aileron primário, ao invés de diversionar. O QRH não tem procedimento para o modo de falha. Demonstra que ERC é determinístico mesmo para primeiro evento sem histórico — a matriz tradicional (probabilidade × severidade) falha porque a probabilidade é desconhecida.

**Expected:** P-B/O-A/A-C/ERC 2  
**Motor:** P-A/O-A/A-F/PARTIAL

**Análise:** O-A ✅. P-A vs P-B: o gate P-A capturou ausência de evidência lexical explícita. P-B é mais preciso porque a falha intermitente e não reproduzível do atuador criou percepção incompleta e degradada do estado real do sistema. A-F vs A-C: o gate A-F (seleção errada entre alternativas) capturou o núcleo do ato inseguro — o comandante selecionou "continuar" em vez de "diversionar." A-F é metodologicamente defensável e possivelmente mais preciso que A-C (não verificar resultado) para este cenário.

**Bloqueante para normalização?** Não para o conceito central (ERC determinístico para primeiro evento). A-F é aceitável como substituto de A-C.

---

### TEST-RISK-SIRA-001 — SIRA distinction: ERC baixo isolado vs Safety Issue de padrão

**Conceito:** Decolagem sem verificação de ATIS — quarto evento similar em 3 meses na companhia. ERC 4 para o evento isolado. O padrão é Safety Issue que requer SIRA.

**Expected:** P-A/O-A/A-B/ERC 4  
**Motor:** P-G/O-A/A-B/PARTIAL

**Análise:** O-A ✅, A-B ✅. P-G vs P-A: P-G capturou "ATIS disponível e não conferido" — semanticamente muito próximo de P-A para este cenário. A distinção P-A vs P-G é de granularidade; ambos indicam ausência de falha perceptiva primária.

**Bloqueante para normalização?** Não. A-B ✅ e O-A ✅ são as classificações primárias para o conceito de Safety Issue vs ERC individual.

---

### TEST-RISK-SIRA-002 — SIRA distinction: ERC do incidente vs SIRA para mudança operacional

**Conceito:** Fadiga severa do comandante durante aproximação após redução de descanso mínimo sem avaliação de risco. ERC do incidente = 2. A causa-raiz é mudança operacional (11h→9h de descanso) implementada sem SIRA prospectivo.

**Expected:** P-B/O-A/A-G/ERC 2  
**Motor:** P-G/O-A/A-D/PARTIAL

**Análise:** O-A ✅. P-G vs P-B: o gate P-G capturou "parâmetro não conferido," mas P-B seria mais preciso — a fadiga comprometeu fisiologicamente a capacidade perceptiva, não apenas a verificação de informação disponível. A-D vs A-G: o motor classificou corretamente a limitação física por fadiga (A-D), mas A-G capturaria a transferência de controles como ação de emergência. A-D é factualmente correto para a causa; A-G seria correto para a resposta de recuperação.

**Bloqueante para normalização?** Não para o conceito central (ERC do evento ≠ avaliação de segurança da mudança operacional). O par A-D/A-G captura aspectos diferentes do mesmo evento.

---

## 6. Padrões de divergência — sumário para normalização

| Padrão | Fixtures afetados | Prioridade para v0.4 |
|---|---|---|
| Gate P-G agressivo sobrescreve P-A e P-B | ERC-002, ERC-004, ERC-003¹, ERC-005¹, DUAL-001¹, DUAL-002, ISO-001¹, SIRA-001, SIRA-002 | Alta (P-B) / Média (P-A vs P-G) |
| Gate P-B requer evidência lexical explícita | ERC-003, ERC-004, ERC-005, DUAL-001, DUAL-002, ISO-001, SIRA-002 | Alta |
| O-B não detectado sem trigger lexical de "hábito" | ERC-004 | Alta (bloqueia ERC anchor 2) |
| Gate O-C dispara para ações de terceiros no relato | DUAL-002 | Alta (bloqueia FAIL) |
| A-G raramente classificado (A-A ou A-D dominam) | ERC-005, DUAL-001, SIRA-002 | Média |
| A-A vs A-C vs A-B em ações diretas vs de verificação | ERC-001, ERC-003 | Baixa (casos-limite) |

¹ Para estes fixtures o gate P-G dispara mas não gera FAIL — a divergência é de granularidade.

---

## 7. Critérios de bloqueio

**Bloqueantes para produção (não podem ir para usuário final):**
- ❌ Gate O-C disparando para ações de terceiros no relato (DUAL-002 FAIL)
- ❌ O-B não detectado sem trigger lexical — âncora ERC 2 inacessível (ERC-004 FAIL)

**Não-bloqueantes (divergências documentadas, aceitáveis no estado atual):**
- ⚠ P-G vs P-A: granularidade dentro da família de ausência de falha perceptiva
- ⚠ P-G vs P-B: P-B requer normalização futura — não impede operação
- ⚠ A-G vs A-B/A-C/A-D: captura diferentes momentos do mesmo evento
- ⚠ A-F vs A-C: ambos defensáveis metodologicamente

---

## 8. Integridade do motor

Os fixtures criados nesta fase não alteram nenhum arquivo do motor SERA, baseline, schema ou scripts. Verificação:

```
tests/sera/fixtures/TEST-RISK-*.json  → novos fixtures (read-only para o runner)
docs/RISK_VALIDATION_FIXTURES_v0.3.md → este documento
```

Arquivos protegidos (sem alteração):
- `frontend/src/lib/sera/**` — pipeline SERA intacto
- `tests/sera/baseline.json` — baseline de smoke intacto
- `tests/sera/run.ts` — runner intacto
- `tests/sera/fixtures/schema.ts` — schema intacto
- `schema/migrations/**` — sem alteração
- `scripts/**` — sem alteração

---

## 9. Future expected (pós-normalização Opção A)

Cada fixture contém um campo `future_expected` com:
- `arms_risk_index_reference`: range de valores do índice ARMS (1–2500) correspondente
- `arms_color`: cor ARMS (GREEN/YELLOW/RED)
- `arms_matrix_cell`: célula na matriz ARMS 4×4
- `ui_erc_post_normalizacao`: ERC na escala UI pós-Opção A (5=mais perigoso)
- `traditional_matrix_note`: análise da matriz tradicional probabilidade × severidade
- `sira_applicable`: se o evento qualifica Safety Issue para avaliação SIRA
- `sira_note`: orientação específica de SIRA se aplicável
- `anti_pattern`: erro metodológico comum que este fixture documenta (onde aplicável)

---

## 10. Próximos passos (RISK v0.4)

1. **Corrigir gate O-C** para restringir escopo ao protagonista da ação insegura (remove FAIL de DUAL-002)
2. **Melhorar detecção de O-B** com critérios baseados em padrão comportamental inferido, não apenas triggers lexicais de "hábito"
3. **Calibrar gate P-B vs P-G** para distinguir "informação disponível não verificada" (P-G) de "percepção fisiologicamente ou ambientalmente comprometida" (P-B)
4. **Calibrar A-G** para capturar respostas de emergência/urgência como ação principal em vez de A-A ou A-D
5. **Rodar 3 runs adicionais** (n=3) nos 10 fixtures após as correções para avaliar estabilidade determinística
6. **Execução do plano de validação completo** de `docs/RISK_VALIDATION_PLAN_v0.2.md` (Tipos A, B, C, D)
