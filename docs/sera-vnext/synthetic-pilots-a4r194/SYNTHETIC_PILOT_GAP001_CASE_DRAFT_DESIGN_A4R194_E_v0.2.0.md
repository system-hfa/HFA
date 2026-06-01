# Synthetic Pilot GAP-001 Case Draft Design A4R194-E v0.2.0

## 0. Status e locks

- SYNTHETIC_DRAFT_DESIGN_ONLY
- NOT_A_REAL_EVENT
- NO_SYNTHETIC_FIXTURE
- NO_BASELINE
- NOT_FOR_PRODUCT
- NOT_FOR_CLASSIFICATION
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_ARMS_ERC
- NO_RECOMMENDATIONS

Declaracoes adicionais de seguranca:
- NOT_A_FIXTURE
- NOT_BASELINE
- syntheticCaseInstanceCreated = false
- completeNarrativeCreated = false
- Produto/UI/API permanece bloqueado.
- RR-001: `OPEN`
- RR-003: `PARTIALLY_MITIGATED`

Este documento e um rascunho estrutural design-only. Nao e uma narrativa final, nao e
caso sintetico executavel, nao e fixture e nao e baseline. Nenhuma instancia de caso
foi materializada nesta fase.

Fonte operacional de desenho: Daumas.

## 1. Synthetic pilot identity

- `syntheticPilotId`: SYN-PILOT-GAP001-PFPM-DRAFT-001
- `gapId`: GAP-001
- `gapName`: PF/PM separation
- `syntheticType`: TYPE-07_WARNING_TRAP
- `syntheticTypeAlternativeConsidered`: TYPE-02_PROGRESSIVE_HF_POSITIVE
- `realEventBasis`: Thebaud, Peasmarsh, Vigo, Colgan 3407
- `methodologicalPurpose`: testar separacao PF/PM, manter binding agent-act-moment e
  evitar agent migration.

### 1.1 Justificativa do syntheticType

`TYPE-07_WARNING_TRAP` foi escolhido porque a lacuna GAP-001 nasce exatamente da cadeia
warning/callout/go-around sem ator definido (observada em Peasmarsh e Thebaud) e do risco
de tratar o callout/aviso do PM como ancora do ponto de fuga. O warning trap exercita:

- separacao explicita entre o ato de primeira degradacao do PF e a obrigacao de
  monitoramento/callout do PM;
- rejeicao de warning/callout como ancora de escape point (mantendo o aviso na zona de
  consequencia);
- protecao contra agent migration entre PF e PM.

`TYPE-02_PROGRESSIVE_HF_POSITIVE` foi considerado como alternativa (degradacao progressiva
multi-ator), mas concentra-se em ancoragem de zona progressiva e nao no risco central de
warning-as-anchor que motiva GAP-001 nesta fase. Fica registrado como alternativa para
desenho futuro, nao materializado aqui.

## 2. Agent set

PF e PM sao atores separados, com `agentId` distinto e imutavel apos definicao do anchor
em fase futura. Nesta fase sao apenas placeholders de desenho.

| Ator | agentId | agentKind | role |
|------|---------|-----------|------|
| PF | synthetic-pf-001 | frontline_operator | pilot flying |
| PM | synthetic-pm-001 | frontline_operator | pilot monitoring |

Crew collective:
- e apenas contexto;
- `crewCollectiveContextOnly = true`;
- nao pode ser fallback de PF/PM;
- nao pode substituir PF/PM em nenhuma etapa.

## 3. Escape point draft

- `scopeId`: synthetic-gap001-pfpm-scope-draft-001
- `status`: DRAFT_NOT_APPROVED_NOT_ENFORCED
- `pointTopology`: DISCRETE

Justificativa de topologia: a primeira degradacao observavel do PF e um ato discreto unico.
O aviso/callout do PM pertence a zona de consequencia posterior e nao pode virar ancora.
A topologia e declarada antes da consequencia (pre-consequence), nunca inferida a partir
do desfecho.

### 3.1 unsafeActOrOmission por ator (rascunho, sem narrar evento final)

- PF: rascunho de ato/omissao observavel de primeira degradacao, descrito apenas como
  placeholder estrutural. Nenhuma narrativa final.
- PM: rascunho de obrigacao observavel de monitoramento/callout/go-around, descrito apenas
  como placeholder estrutural. Nenhuma narrativa final.

### 3.2 operationalMoment.sequenceRef por ator

- PF: `seq:synthetic:pf:03`
- PM: `seq:synthetic:pm:03`

Cada ator tem `sequenceRef` proprio. O `sequenceRef` macro nao substitui o `sequenceRef`
por ator.

### 3.3 boundaryEvidenceRefs (somente sinteticas)

- SYN-GAP001-EV-PF-001
- SYN-GAP001-EV-PM-001
- SYN-GAP001-EV-BOUNDARY-001

Estas referencias sao placeholders sinteticos. Nao sao fonte real, nao sao evidencia
empirica e nao podem ser tratadas como evidencia de evento real
(`boundaryEvidenceRefsAreSyntheticPlaceholders = true`).

## 4. Consequence boundary

- Ponto de fuga: a primeira degradacao observavel atribuivel ao PF, antes de qualquer
  consequencia. E o momento mais cedo em que ainda havia controle.
- Consequencia posterior: warning/callout do PM, trajetoria, tentativa de go-around e
  desfecho. Tudo isso esta na zona de consequencia, depois da queda da barreira.
- Proibicao: e proibido usar a consequencia (warning/callout/desfecho) como base de
  qualquer eixo P/O/A. Consequence-as-cause permanece bloqueado.

## 5. P/O/A handling

- Nenhum eixo P/O/A final foi preenchido.
- Nenhum `proposedCode` final foi criado.
- Nenhum codigo foi selecionado.
- `classificationTarget`: PENDING_FUTURE_MATERIALIZATION
- `poaClassification.status`: NOT_CLASSIFIED
- `selectedCode`: null (null proibitivo explicito, nao emissao de codigo)
- `releasedCode`: null (null proibitivo explicito, nao emissao de codigo)
- `finalConclusion`: null

Nenhuma pergunta de metodo foi inventada. Nenhum eixo recebeu pergunta ad hoc. A disciplina
canonica de perguntas permanece intacta.

## 6. Prohibited shortcuts

Sao explicitamente proibidos:

- crew collective fallback;
- post-event reasoning;
- consequence-as-cause;
- perguntas de metodo inventadas;
- synthetic-as-real;
- conversao em fixture/baseline;
- uso direto em produto.

## 7. Future materialization requirements

Antes de qualquer materializacao futura:

- autorizacao humana explicita registrada;
- auditoria independente Opus/GPT-5.5;
- revisao de RR-001;
- revisao de RR-003;
- checagem de locks;
- nao entrar em fixture/baseline sem fase dedicada especifica.

## 8. Real-event basis grounding

- Thebaud: `HOLD_AGENT_ACT_MOMENT` por fronteira PF/PM e `sequenceRef` por ator ainda
  incompletos.
- Peasmarsh: `SOURCE_EXTRACTION_REQUIRED` por cadeia warning/go-around com ator ambiguo.
- Vigo: `HOLD_SOURCE_INSUFFICIENT` por decomposicao PF/PM/mission-crew incompleta.
- Colgan 3407: `HOLD_AGENT_MIGRATION_RISK` por fronteira PF/PM ainda nao migration-safe.

Estas lacunas reais motivam o desenho do piloto sintetico, mas nenhum dado real e copiado
nem simulado como real neste rascunho.

## 9. Estado final desta fase

`SYNTHETIC_DRAFT_DESIGN_ONLY`.

Nenhum caso sintetico foi materializado, nenhuma narrativa final foi criada, nenhuma
fixture/baseline foi tocada, produto/UI/API permanece bloqueado.
