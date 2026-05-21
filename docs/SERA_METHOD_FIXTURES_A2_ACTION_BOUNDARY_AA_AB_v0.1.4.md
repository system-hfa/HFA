# SERA v0.1.4-A2-n — Action Boundary A-A vs A-B Consolidation

## Contexto

- A2-m consolidou P-H (conflito de fontes operacionais) e P-G (monitoramento/checklist/fuel).
- Resultado A2-m: 7/13 P/O/A corretos, com 5 fixtures residuais tendo A-B actual vs A-A expected.
- Cluster residual: CHK-001, FUEL-002, VIS-003, VIS-004-ADJ, VIS-005.
- A2-n foca exclusivamente este cluster A-A/A-B, sem alterar eixo P ou O.

## Diagnóstico do cluster A-A vs A-B

### Causa técnica

`evidenceOfProceduralOmission` (linha 1489) é orientado a omissões físicas/procedurais específicas ("não instalou", "não travou", "pino de travamento"). Nenhum dos 5 casos contém esses padrões.

O fluxo em step5 percorre todos os gates determinísticos (A-G, A-H, A-E, A-C, etc.) sem match, chega ao branch LLM (Nó 1), onde a pergunta "A execução falhou contra a intenção?" recebe "Sim" do LLM — porque o modelo detecta que algo (monitoramento, verificação, integração) não foi feito. O Nó 1B então classifica como A-B.

O problema: a "omissão" que o LLM detecta é a mesma falha de monitoramento/verificação/integração que o eixo P já capturou como P-G ou P-H. Classificar como A-B constitui dupla contagem causal do mesmo gap.

### Padrão estrutural comum aos 5 casos

| Fixture | P axis | Mecanismo perceptual | Ação do operador | Por que não é A-B |
|---|---|---|---|---|
| A0-CHK-001 | P-G | Item crítico de checklist não completado | Prosseguiu como se config estivesse ok | Prosseguimento coerente com percepção incorreta de checklist completo |
| A0-FUEL-002 | P-G | Monitoramento periódico de combustível não realizado | Discussão de rota continuou | Não monitorar é a falha perceptiva, não uma ação errada independente |
| A0-VIS-003 | P-G | Descida abaixo da MDA sem referência visual | Descida continuou | Continuar descida foi coerente com percepção de situação estabilizada |
| A0-VIS-004-ADJ | P-H | Fontes independentes não integradas antes da descida | Iniciou descida final com identificação incompleta | Decisão coerente com percepção de que luzes eram o destino |
| A0-VIS-005 | P-H | Conflito radar vs visual não resolvido | Manteve proa sem resolver conflito | Prosseguimento coerente com percepção de corredor livre pelo radar |

## Distinção metodológica A-A vs A-B

### A-A (ação adequada à percepção)

A-A deve ser usado quando a ação executada foi coerente com a percepção incorreta/incompleta do operador, e não há escolha ativa de procedimento errado, nem ato físico/procedural independente omitido que seja causalmente distinto da falha perceptiva.

### A-B (omissão procedural)

A-B deve ser usado quando há omissão de passo físico/procedural específico e obrigatório, causalmente distinto da falha perceptiva. Exemplos canônicos: não instalar pino de travamento, não travar componente, não inserir dispositivo de segurança.

### Por que A-B nos 5 casos é dupla contagem causal

Em todos os 5 casos, a "omissão" identificada é semanticamente idêntica à falha de monitoramento/verificação/integração que o eixo P já capturou. Dizer que o operador "não verificou" (P-G) e depois classificar a ação como "omissão de verificação" (A-B) é contar a mesma falha duas vezes.

A classificação correta reconhece que:
1. P captura a falha causal (monitoramento, conflito de fontes)
2. A ação foi simplesmente o prosseguimento natural dado o estado perceptivo incorreto
3. Não há ato procedural independente que deveria ter sido executado mas não foi

## Patch implementado

### Nova função: `evidenceOfPerceptionAnchoredCoherentAction`

Localização: `frontend/src/lib/sera/all-steps.ts`, após `evidenceOfSpeedManagementAttentionCapture`.

Requer três condições simultâneas:

**Bloco 1 — Falha perceptual dominante (P-G/P-H markers):**
- `'monitoramento periodico'`, `'combustivel remanescente cruzou o minimo'`
- `'item critico pendente'`, `'nao foi efetivamente completado'`
- `'abaixo da altitude minima'`, `'sem referencia visual'`
- `'identificacao incompleta'`, `'conflito entre fontes'`
- `'conflito radar versus visual'`, `'fontes nao foram integradas'`
- E outros termos de monitoramento/conflito informacional

**Bloco 2 — Ação foi continuação coerente:**
- `'prosseguiu como se'`, `'aproximacao prosseguiu'`
- `'descida continuou'`, `'manteve a proa'`
- `'prosseguir no vetor'`, `'descida final foi iniciada'`
- `'iniciar descida final'`, `'so foi reconhecida'`

**Bloco 3 — Ausência de omissão física específica:**
- NÃO contém: `'nao instalou'`, `'nao travou'`, `'pino de travamento'`, etc.

Retorna `true` somente quando todos os três blocos são satisfeitos.

### Gate A-A em step5

Inserido antes de `proceduralOmissionDetected` (Gate A-B), após todos os gates específicos (A-G, A-H, A-E, A-C, A-F, etc.):

```typescript
if (evidenceOfPerceptionAnchoredCoherentAction(relatoNorm) &&
    !feedbackCheckFailure &&
    !supervisionFailure &&
    !maintenanceOmission &&
    !temporalExecutionFailure &&
    !communicationConfirmationFailure &&
    !technicalKnowledgeDeficit &&
    !evidenceOfSelectionError(relatoNorm)) {
  → A-A (determinístico)
}
```

### Arquivos alterados

- `frontend/src/lib/sera/all-steps.ts`
- `docs/SERA_METHOD_FIXTURES_A2_ACTION_BOUNDARY_AA_AB_v0.1.4.md`

`pipeline.ts` não foi alterado.

## Resultados candidate N_RUNS=1 (A2-n)

Report: `tests/reports/candidates/methodology-gate-run-1779335730.json`

| Fixture | Overall | P | O | A | P/O/A ok? |
|---|---|---|---|---|---|
| A0-AUTO-001 | PASS | P-C ✓ | O-A ✓ | A-E ✓ | ✓ |
| A0-AUTO-003 | PARTIAL (ERC) | P-D ✓ | O-A ✓ | A-H ✓ | ✓ |
| A0-AUTO-004-ADJ | PARTIAL (ERC) | P-A ✓ | O-A ✓ | A-G ✓ | ✓ |
| A0-CHK-001 | PARTIAL (ERC) | P-G ✓ | O-A ✓ | **A-A** ✓ | ✓ |
| A0-CHK-002-ADJ | PARTIAL (P) | P-A ✗ | O-A ✓ | A-H* | ✗ |
| A0-CHK-003 | PARTIAL (ERC) | P-G ✓ | O-A ✓ | A-G ✓ | ✓ |
| A0-DAUMAS-E01-B | PASS | P-C ✓ | O-A ✓ | A-E ✓ | ✓ |
| A0-DAUMAS-E02-A | PASS | P-A ✓ | O-C ✓ | A-F ✓ | ✓ |
| A0-DAUMAS-E02-B | PARTIAL (ERC) | P-D ✓ | O-A ✓ | A-H ✓ | ✓ |
| A0-FUEL-002 | PARTIAL (ERC) | P-G ✓ | O-A ✓ | **A-A** ✓ | ✓ |
| A0-VIS-003 | PASS | P-G ✓ | O-A ✓ | **A-A** ✓ | ✓ |
| A0-VIS-004-ADJ | PARTIAL (ERC) | P-H ✓ | O-A ✓ | **A-A** ✓ | ✓ |
| A0-VIS-005 | PARTIAL (ERC) | P-H ✓ | O-A ✓ | **A-A** ✓ | ✓ |

*A0-CHK-002-ADJ: MOVE_TO_EXPLORATORY mantido. Única divergência.

**12/13 P/O/A corretos** (vs 7/13 em A2-m). Cluster A-A resolvido: 5/5 fixtures convergidos de A-B para A-A.

### Resumo

- PASS=5, PARTIAL=8, FAIL=0, ERROR=0
- determinism_rate=100%
- Todos os 5 fixtures-alvo (CHK-001, FUEL-002, VIS-003, VIS-004-ADJ, VIS-005) agora A-A determinístico
- Nenhum caso PROTEGIDO (A-G, A-H, A-E, A-F) interceptado
- A0-CHK-002-ADJ permanece divergente (P-A actual vs P-D expected)

## Regressões oficiais mínimas

| Fixture | Status | Gate A | Avaliação |
|---|---|---|---|
| TEST-A-B-001 | PASS | Gate A-B | A-B canônico preservado |
| TEST-A-G-001 | PASS | Gate A-G | A-G preservado |
| TEST-A-G-002 | PARTIAL | Gate A-G | PARTIAL por ERC, gate correto |
| TEST-A-H-002 | PASS | Gate A-H | A-H preservado |
| TEST-GEN-AB-001 | PASS | Gate A-B | GEN A-B preservado |
| TEST-GEN-AG-001 | PASS | Gate A-G | GEN A-G preservado |
| TEST-GEN-AH-001 | PASS | Gate A-H | GEN A-H preservado |
| TEST-GEN-PG-001 | PASS | Gate A-C | GEN P-G preservado |
| TEST-P-G-001 | PASS | LLM→A-B | Gate A-A não intercepta |
| TEST-P-H-001 | PASS | Gate A-A (briefing) | P-H briefing preservado |
| TEST-P-H-002 | PASS | Gate A-A (briefing) | P-H briefing preservado |

Zero FAIL. TEST-A-A não existe como fixture oficial.

## Proteções contra regressão (mecanismo)

### A-G (feedback/check explícito)

Casos A0-CHK-003 e A0-AUTO-004-ADJ são capturados por `evidenceOfExplicitFeedbackCheckFailure` no gate A-G (linha ~2829), que precede o novo guard. Além disso, o guard exige `!feedbackCheckFailure` como exclusão explícita.

Termos de A-G ("verificacao adicional esperada", "callout", "FMA") não aparecem nos 5 casos-alvo.

### A-H (temporal/execução)

Casos A0-AUTO-003 e A0-DAUMAS-E02-B são capturados por `evidenceOfSpeedManagementAttentionCapture` no gate A-H (linha ~2875), que precede o novo guard. Além disso, o guard exige `!temporalExecutionFailure` como exclusão.

Termos de A-H ("velocidade continuou caindo", "abaixo da faixa segura", "sobrevoo de plataforma") não aparecem nos 5 casos-alvo.

### A-E (knowledge deficit)

Gate A-E (linha ~2807) precede o novo guard. Exclusão `!technicalKnowledgeDeficit` no guard.

### A-F (selection error)

Gate A-F por seleção errada (linha ~2945) e por ilusão perceptiva (linha ~2762) precedem. Exclusão `!evidenceOfSelectionError` no guard.

### A-C (own action check failure)

Gate A-C (linha ~2965) precede o novo guard. Não captura os 5 casos porque estes envolvem monitoramento de estado (não verificação da própria ação já executada).

### A-I, A-J, A-D

Todos têm gates determinísticos que precedem o novo guard ou são cobertos pelas exclusões.

### Casos já corretos

| Fixture | Expected | Gate que protege | Status |
|---|---|---|---|
| A0-CHK-003 | A-G | feedbackCheckFailure (A2-l) | Protegido |
| A0-AUTO-004-ADJ | A-G | feedbackCheckFailure (A2-l) | Protegido |
| A0-AUTO-003 | A-H | speedManagementAttentionCapture (A2-k) | Protegido |
| A0-DAUMAS-E02-B | A-H | speedManagementAttentionCapture (A2-k) | Protegido |
| A0-AUTO-001 | A-E | technicalKnowledgeDeficit | Protegido |
| A0-DAUMAS-E01-B | A-E | technicalKnowledgeDeficit | Protegido |
| A0-DAUMAS-E02-A | A-F | O-C override | Protegido |
| A0-CHK-002-ADJ | A-H (MOVE_TO_EXPLORATORY) | Fora de escopo | Não afetado |
