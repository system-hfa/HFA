# SERA A4R188 Event-Specific Rationale Checklist v0.2.0

status: PREFLIGHT_CHECKLIST_ACTIVE
phase: A4R188
sourceAuditFinding: W-01 (rationales identicos por posicao de node na A4R187)
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM
DOCS_ONLY
NO_RUNTIME_CHANGE
NO_AXIS_DECISION

---

## Finalidade

Este checklist deve ser aplicado pelo autor para cada node antes de registrar authorDecision em A4R188. Garante que o rationale é factual, evento-específico e verificável — não genérico por posição de node.

---

## Checklist por node (aplicar a cada registro)

### Campo 1 — Identificação

- [ ] `intakeId`: registrado (A4R187-XXXX ou A4R188-EXT-XXXX)
- [ ] `eventKey`: registrado e correto (ASIANA_214 | COMAIR_5191 | AMERICAN_1420 | UPS_1354 | UNITED_173)
- [ ] `nodeId`: verificado em A4R185 (`usableForAxisDecision=true`)
- [ ] `axis`: registrado (P | O | A)

### Campo 2 — Ponto de fuga

- [ ] Escape point aprovado em A4R182 para este eventKey foi consultado
- [ ] O momento temporal do escape point é claro para o autor
- [ ] **Para United 173 especificamente**: `escapePointTemporalBoundary` foi declarado antes deste node (ver checklist United 173 na seção 4)

### Campo 3 — Leitura de evidência

- [ ] A extração A4R180 do evento foi lida antes de registrar a decisão
- [ ] Os fragmentos factuais relevantes para a pergunta `exactQuestionTextPt` foram identificados
- [ ] Os IDs dos fragmentos relevantes foram listados (ex.: ASIANA-A4R180-F1, UNITED-173-A4R180-F3)

### Campo 4 — Verificação do rationale

Antes de registrar `authorDecisionRationale`, confirmar:

- [ ] **O rationale conecta explicitamente**: [fragmento factual específico] → [resposta à pergunta canônica do node]
- [ ] **O rationale não é idêntico** ao rationale da A4R187 para este node (evitar cópia do texto preliminar genérico)
- [ ] **O rationale não descreve apenas estrutura**: não é "este node avalia se..." sem conectar com evento
- [ ] **O rationale não referencia apenas rótulo**: não usa apenas "ver ASIANA-A4R180-F1" sem usar conteúdo do fragmento
- [ ] **O rationale não reescreve conclusão NTSB/TSIB/AAIB**: não usa linguagem de relatório final como rationale SERA
- [ ] **O rationale pertence temporalmente ao escape point**: o fragmento usado descreve estado/ação no momento do ponto de fuga ou antes — não após

### Campo 5 — Verificação de não-uso de consequência posterior

Para cada fragmento de evidência usado no rationale:

- [ ] Verificar que o fragmento **não descreve estado ou ação posterior ao ponto de fuga aprovado em A4R182**
- [ ] Se o fragmento descreve recuperação, consequência ou resultado posterior: **rejeitar o fragmento**
- [ ] Se nenhum fragmento anterior ao escape point estiver disponível: registrar `NEEDS_MORE_EVIDENCE`

**Exemplos de consequências posteriores PROIBIDAS como causa:**
- Asiana 214: uso do touchdown abrupto, impacto com o seawall ou lesões como causa P/O/A
- Comair 5191: uso da saída da pista ou colisão como causa P/O/A
- American 1420: uso do incêndio pós-pouso ou evacuação como causa P/O/A
- UPS 1354: uso do impacto ou incêndio como causa P/O/A
- United 173: uso do flameout, queda de combustível total ou crash como causa P/O/A

### Campo 6 — Verificação de traversal extension

- [ ] Após registrar authorDecision, consultar `SERA_A4R188_TRAVERSAL_EXTENSION_POLICY_MATRIX_v0.2.0.csv` para este nodeId e esta decision
- [ ] Se a coluna `extensionRequiredWhen` se aplica: `TRAVERSAL_EXTENSION_REQUIRED` anotado
- [ ] Se extensão necessária: nodeId do próximo node verificado em A4R185 antes de criar registro de extensão

---

## Seção 2 — Evidência de referência por evento

### ASIANA 214 (SFO, 2013)

Escape point (A4R182): "Manutencao de approch com A/T em HOLD e deterioracao de perfil sem reconhecimento ou correcao pela tripulacao."

Fragmentos A4R180 disponíveis: ASIANA-A4R180-F1, ASIANA-A4R180-F2, ASIANA-A4R180-F3

Período relevante para P/O/A: intervalo entre transição A/T para HOLD e gate de instabilidade de aproximação — não o touchdown.

Proibições específicas:
- Não usar touchdown, impacto com seawall ou lesões como evidência causal
- Não usar ações de recuperação pós-gate como evidência de falha

---

### COMAIR 5191 (LEX, 2006)

Escape point (A4R182): "Inicio da corrida de decolagem na pista errada (Pista 26 em vez de Pista 22)."

Fragmentos A4R180 disponíveis: COMAIR-A4R180-F1, COMAIR-A4R180-F2, COMAIR-A4R180-F3

Período relevante para P/O/A: sequência de taxiamento até início da corrida de decolagem — não a colisão com o terreno.

Proibições específicas:
- Não usar saída da pista, CFIT ou colisão como evidência causal
- Não usar comunicações ATC pós-decolagem tentada como evidência de intenção

---

### AMERICAN 1420 (LIT, 1999)

Escape point (A4R182): "Decisao de prosseguir com pouso sob condicoes de tempestade severa abaixo de minimums operacionais sem abortar a aproximacao."

Fragmentos A4R180 disponíveis: AA1420-A4R180-F2, AA1420-A4R180-F3, AA1420-A4R180-F4

Período relevante para P/O/A: tomada de decisão de continuar a aproximação nas condições de tempestade — não o pouso em si, incêndio ou evacuação.

Proibições específicas:
- Não usar incêndio pós-impacto, evacuação ou mortes como evidência causal
- Boundary P/A pode exigir escalação Opus (ver guardrails seção 7.3)

---

### UPS 1354 (BHM, 2013)

Escape point (A4R182): "Descida abaixo de MDA sem referencia visual adequada e sem executar procedimento de missed approach."

Fragmentos A4R180 disponíveis: UPS1354-A4R180-F1, UPS1354-A4R180-F2, UPS1354-A4R180-F3, UPS1354-A4R180-F4

Período relevante para P/O/A: descida abaixo de MDA — não o impacto com terreno ou incêndio.

Proibições específicas:
- Não usar impacto com terreno, incêndio ou mortes como evidência causal
- Não usar condições de fadiga pós-evento como evidência (fadiga pré-voo pode ser relevante se ancorada no momento do escape point)

---

### UNITED 173 (PDX, 1978)

Escape point (A4R182): "Manutencao de troubleshooting quando a necessidade operacional ja era prosseguir para pouso imediato."

**ATENÇÃO — TEMPORAL BOUNDARY REQUIRED**: Antes de qualquer node deste evento, declarar:
- `ESCAPE_POINT_TEMPORAL_BOUNDARY_REQUIRED: true`
- `escapePointTemporalBoundary`: janela temporal (ex.: "entre XX:XX e XX:XX UTC conforme A4R180-0017") dentro da qual o troubleshooting poderia ter sido interrompido com pouso seguro possível

Fragmentos A4R180 disponíveis: UNITED-173-A4R180-F1, UNITED-173-A4R180-F2, UNITED-173-A4R180-F3, UNITED-173-A4R180-F4

Proibições específicas (ver guardrails seção 6.4):
- **PROIBIDO**: usar flameout como causa causal P/O/A
- **PROIBIDO**: usar retorno de combustível zero como causa causal P/O/A
- **PROIBIDO**: usar crash como causa causal P/O/A
- Esses são consequências posteriores ao ponto de fuga — não causas

---

## Seção 3 — Exemplos de rationale insuficiente vs. suficiente

### Exemplo 1 — P_ASSESSMENT

**INSUFICIENTE (padrão A4R187, genérico — PROIBIDO):**
```
"Evidencia aponta avaliacao inadequada da situacao no ponto de fuga."
```

**SUFICIENTE (Asiana 214 — factual, evento-específico):**
```
"F1 registra transicao A/T para HOLD e deterioracao simultanea de PAPI, airspeed
e descent rate a partir de ~500ft AGL. Nenhum PF ou PM verbalizou o estado do
A/T ou o desvio de perfil no intervalo pre-gate. A4R180-F2 confirma ausencia de
callout de instabilidade. A avaliacao da situacao era inadequada — o crew nao
reconheceu o estado deteriorante da aproximacao no ponto de fuga aprovado."
```

---

### Exemplo 2 — O_RULES

**INSUFICIENTE (genérico — PROIBIDO):**
```
"O objetivo era inconsistente com regulamentos operacionais."
```

**SUFICIENTE (Comair 5191 — factual, evento-específico):**
```
"A4R180-F1 documenta que a tripulacao taxiou para Pista 26 em vez de Pista 22
conforme clearance ATC. O objetivo operacional (decolagem imediata) era
inconsistente com o procedimento de verificacao de pista exigido por SOP —
nao houve confirmacao de pista antes do inicio da corrida de decolagem."
```

---

### Exemplo 3 — A_IMPLEMENTED

**INSUFICIENTE (genérico — PROIBIDO):**
```
"A acao foi implementada mas era incorreta dado o contexto."
```

**SUFICIENTE (UPS 1354 — factual, evento-específico):**
```
"A4R180-F3 confirma que a tripulacao executou descida continuada abaixo de MDA
(conforme instrumentos) — a acao foi implementada como pretendida pela tripulacao.
Nao ha evidencia de deslize, lapso ou falta de feedback de execucao. O problema
nao estava na implementacao da acao mas em sua corretude (A_CORRECT)."
```

---

## Seção 4 — Checklist especial United 173 (pré-node)

Antes de qualquer node de United 173, completar:

- [ ] Li A4R180-EXTRACTION-0017 completo
- [ ] Identifiquei o momento exato (ou janela mínima) em que o troubleshooting poderia ter sido interrompido com pouso seguro ainda possível
- [ ] Esse momento é ancorado em evidência de A4R180-0017 (não inferência sem evidência)
- [ ] Registrei `escapePointTemporalBoundary` com essa janela
- [ ] Confirmei que os fragmentos que vou usar pertencem a esse período — não ao período pós-flameout

Se não puder completar este checklist:
- [ ] Registrar `AXIS_TRAVERSAL_BLOCKED` com rationale `ESCAPE_POINT_TEMPORAL_BOUNDARY_NOT_ESTABLISHED` para todos os eixos de United 173
- [ ] Escalar para revisão Opus (guardrails seção 7.3)

---

## Seção 5 — Critério de verificabilidade do rationale

O rationale está adequado quando um terceiro analista que:
1. Leia A4R180 do mesmo evento
2. Leia A4R99 para o mesmo nodeId
3. Conheça o escape point aprovado em A4R182

...puder verificar de forma independente se o authorDecision (SIM/NÃO/variante) é sustentado pelo rationale escrito.

Se o rationale não passar esse teste de verificabilidade independente, reescrever antes de registrar.
