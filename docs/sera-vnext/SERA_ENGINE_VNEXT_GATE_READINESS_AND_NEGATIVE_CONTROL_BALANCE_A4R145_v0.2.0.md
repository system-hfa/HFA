# SERA Engine vNext Gate Readiness and Negative Control Balance A4R145 v0.2.0

Status: PRE_GATE_AND_NEGATIVE_CONTROL_BALANCE_RECORDED
Phase: A4R145
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Create a balanced pre-reaudit preparation layer after A4R144 by combining:
- pre-gate readiness for the three strongest Lane A candidates (COMAIR-5191, UPS-1354, UNITED-173);
- negative-control validation for technical/environmental dominant cases (US-AIRWAYS-1549, DELTA-191).

No P/O/A classification is executed in this phase.

## relationship to A4R143 and A4R144

- A4R143 restricted A4R142 to intake-only usage and required lane discipline.
- A4R144 produced source-slice intake and ranked COMAIR-5191, UPS-1354, and UNITED-173 as most ready for planning.
- A4R145 adds methodological balance: positive candidate pre-gate preparation plus anti-overclassification controls.

## why balancing positives and negative controls is mandatory

- Positive candidates are needed to prepare future escape-point gate work.
- Negative controls are needed to ensure the method does not force frontline human-factor P/O/A when first departure is technical/environmental/exogenous.
- This balance enforces A4R137/A4R138/A4R140 anchor discipline and avoids post-outcome bias.

## summary table — positive candidates (pre-gate)

| event | sourceQuality | candidateWhenStatement (draft only) | preGateStatus | key caution |
|---|---|---|---|---|
| COMAIR-5191 | HIGH | "Quando a aeronave cruzou o hold short e iniciou alinhamento/decolagem na pista 26 sob autorizacao operacional para pista 22." | PRE_GATE_READY_FOR_ESCAPE_POINT_GATE | exige fixar micro-ancora entre cruzamento, alinhamento e inicio de corrida |
| UPS-1354 | HIGH | "Quando, na transicao para modo vertical-speed sem perfil vertical valido, a descida prosseguiu para abaixo dos minimos sem correção." | PRE_GATE_READY_WITH_CAUTION | separar claramente transicao de modo vs. consequencia de impacto |
| UNITED-173 | MEDIUM | "Quando a permanencia em espera continuou apos alertas criticos de combustivel sem transicao imediata para estrategia de pouso." | PRE_GATE_READY_WITH_CAUTION | risco de contaminacao por sequencia tardia de flameout |

## summary table — negative controls

| event | sourceQuality | firstDepartureType | negativeControlStatus | anti-overclassification lesson |
|---|---|---|---|---|
| US-AIRWAYS-1549 | HIGH | TECHNICAL_ENVIRONMENTAL_EXOGENOUS | NEGATIVE_CONTROL_READY | resposta humana posterior nao deve reescrever a natureza tecnica do primeiro afastamento |
| DELTA-191 | LOW | TECHNICAL_ENVIRONMENTAL_EXOGENOUS (from available local evidence layer) | NEGATIVE_CONTROL_READY_WITH_CAUTION | quando o texto local falha, manter controle negativo com cautela e pedir source recovery antes de uso fino |

## methodology warnings

1. PRE_GATE output is planning material only, never P/O/A authority.
2. candidateWhenStatement is draft and does not constitute approved escape-point gate.
3. Critical point and accident outcome remain non-anchor evidence under A4R140.
4. Negative controls must preserve technical/environmental onset and prevent forced frontline attribution.

## next recommended phase

A4R146 should execute escape-point gate package drafting (still no P/O/A) for:
1. COMAIR-5191;
2. UPS-1354;
3. UNITED-173;

and in parallel open targeted source recovery for DELTA-191 local text quality.

## locks preserved

- no P/O/A classified
- no releasedCode
- no selectedCode CLASSIFIED
- no downstream
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations
- no code
- no fixtures
- no baseline
- no corpus/source modification
