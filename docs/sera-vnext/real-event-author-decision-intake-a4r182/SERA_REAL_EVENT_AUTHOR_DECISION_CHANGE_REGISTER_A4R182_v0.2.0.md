# SERA Real Event Author Decision Change Register A4R182 v0.2.0

Status: CHANGE_REGISTER_ACTIVE
Phase: A4+R-182
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

Registrar de forma explícita as diferenças entre os escopos propostos em A4R181 e os escopos aprovados pelo autor em A4R182. Serve como referência para A4R183 ao construir o rascunho de adjudicação normalizado.

## 2. Casos sem ajuste estrutural

### A4R182-DEC-0003 — American 1420 LIT
- **Escopo A4R181:** Segmento de aproximação final quando windshear/crosswind/perda de referência visual estavam presentes antes do touchdown.
- **Escopo A4R182:** Continuação da aproximação final instável com perda de referência visual.
- **Diferença:** Nenhuma estrutural. A formulação A4R182 é mais concisa; o escopo causal é idêntico.
- **EP secundário (assimetria de spoilers):** Descartado como co-ponto de fuga. Permanece como consequência/agravamento operacional.
- **Impacto em A4R183:** Usar escopo A4R182 diretamente.

### A4R182-DEC-0005 — United 173 PDX
- **Escopo A4R181:** Janela durante o holding em que fuel-state advisories indicavam transição imediata de troubleshooting para landing execution.
- **Escopo A4R182:** Manutenção de troubleshooting quando a necessidade operacional já era prosseguir para pouso imediato.
- **Diferença:** Clarificação de framing — ênfase no ato de manter o troubleshooting como decisão operacional ativa, não apenas na janela temporal de combustível crítico.
- **Impacto em A4R183:** Usar framing A4R182 (decisão ativa de manter troubleshooting), mantendo a janela de combustível crítico como âncora temporal.

## 3. Casos com ajuste de ponto de fuga

### A4R182-DEC-0001 — Asiana 214 SFO

| Campo | A4R181 (substituído) | A4R182 (aprovado) |
|---|---|---|
| Tipo de escopo | Zona (gate de estabilização 500/1.000 ft AFE) | Momento técnico-operacional da transição A/T HOLD |
| Cue principal | PAPI baixo + velocidade decaindo + razão de descida elevada + estado A/T HOLD | Entrada em modo HOLD e início de saída do perfil não percebidos |
| Formulação de ator | Bloco de tripulação (PF/PM/observador integrado) | Tripulação como ator integrado — idêntico |
| Nota | Zona ampla substituída; gate de estabilização torna-se contexto operacional | Ancoragem no estado de automação que inicia a saída do estado seguro |

**Consequência para A4R183:** Não usar "gate de estabilização" como EP primário. Ancorar no momento de transição A/T HOLD + não-percepção da saída do perfil. A cue do PAPI/razão de descida/velocidade decaindo passa a suporte ao P-axis (informação disponível não integrada), não ao EP em si.

---

### A4R182-DEC-0002 — Comair 5191 LEX

| Campo | A4R181 (substituído) | A4R182 (aprovado) |
|---|---|---|
| Tipo de escopo | Zona de 3 momentos (hold-short / lineup / início de corrida) | Momento discreto: virada e alinhamento na pista 26 |
| Formulação SOURCE_PARTIAL | Mantida como zona | Resolvida: ponto de fuga é a primeira ação errada |
| Nota tracker A4R129 | "escape point statement não resolvido" | Resolvido pelo autor: ação inicial de alinhar na pista 26 |

**Consequência para A4R183:** Ancorar EP na virada e alinhamento na pista 26. Os momentos anteriores (cruzamento do hold-short) e posteriores (início da corrida) são contexto/consequência, não co-pontos de fuga.

---

### A4R182-DEC-0004 — UPS 1354 BHM

| Campo | A4R181 (substituído) | A4R182 (aprovado) |
|---|---|---|
| EP primário | Gate de 1.000 ft AFE com razão de descida > 1.000 fpm | Não percepção do setup FMC inválido e não engajamento do modo esperado |
| EP secundário | MDA com callouts ausentes | Descartado como co-EP; torna-se consequência |
| Mode change captain | Fator relevante sem posição clara | Componente do escopo aprovado (falha de engajamento de modo não percebida) |
| Nota | Slice identificou EP no gate 1.000 ft como "texto do relatório declarando go-around requerido" | Autor reposiciona: aquele gate é agravamento; o início causal é antes |

**Consequência para A4R183:** Ancorar EP na fase de setup FMC + primeira ausência de percepção do modo incorreto. O gate de 1.000 ft / MDA / EGPWS warning tornam-se cues de agravamento/consequência disponíveis para suporte ao P-axis (informação disponível não integrada) e A-axis (ação esperada não executada), mas não definem o EP.

## 4. Regra de ponto de fuga — impacto dos ajustes

Os ajustes A4R182 aplicam a regra SERA de ponto de fuga único:
- Um único escapePointId por escopo de análise.
- Os momentos descartados como co-EPs (gate de estabilização, zona hold-short/lineup, gate 1.000 ft) não criam novos escopos de ponto de fuga.
- Eventos posteriores ao ponto de fuga aprovado são consequência/agravamento/recuperação.
- O outcome (impacto, overrun, fuel exhaustion) não é ponto de fuga em nenhum dos 5 casos.

## 5. Proteções de escopo

- Nenhuma dessas mudanças fecha P/O/A.
- Nenhuma dessas mudanças cria selectedCode com status fechado ou código liberado.
- Nenhuma dessas mudanças altera fixtures, baseline, runner oficial ou motor SERA.
- As formulações aprovadas são ancoragens metodológicas de escopo autoral, não classificações finais.
