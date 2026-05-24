# SERA Engine vNext Real Event Source Enrichment Execution v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-67 — Source Enrichment Execution  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Executar e registrar enriquecimento de fonte para os casos bloqueados `REAL-EVENT-ADJUDICATION-004` e `REAL-EVENT-TRIAGE-005`, sem alterar `proposedCode` e sem abrir downstream.

## Escopo
- `REAL-EVENT-ADJUDICATION-004` (5N-BQJ DAFCS/TRIM FAIL offshore ditching)
- `REAL-EVENT-TRIAGE-005` (HL9661 tail rotor strike / fuel bowser)

## Metodologia
- Busca local no repositório (`rg`) para ampliar ancoragem documental.
- Pesquisa externa para fonte primária/técnica, com registro de título/URL/data e utilidade factual.
- Separação explícita entre fato verificável e conclusão causal externa.
- Proibição de importação de julgamento externo como gabarito SERA.

## Evidência de pesquisa

### Busca local (repo)
Principais arquivos adicionais encontrados para 004:
- `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_REVIEW_DECISION_0003_0004_0006_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_INPUTS_SET_1_v0.1.4.md`

Principais arquivos adicionais encontrados para 005:
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_SOURCE_QUALITY_REVIEW_v0.1.4.md`

Leitura de qualidade local:
- 004 já possui trilha factual mais robusta no corpus interno (sequência operacional + papéis PF/PM + condição técnica recorrente).
- 005 permanece fortemente index-level/source-quality, sem deep extraction oficial dedicado no corpus.

### Pesquisa externa (executada em 2026-05-24)
Fontes-chave capturadas:
1. AIB/NSIB Nigeria — página do relatório final 5N-BQJ (oficial)
   - URL: `https://aib.gov.ng/reportaccident/accident-involving-a-bristow-helicopters-nigeria-limited-sikorsky-s76c-helicopter/`
   - Metadados observados: Report No `BHNL/2016/02/03/F`, Reg `5N-BQJ`, status final report, date released `April 25, 2019`.
2. NSIB — interim statement 5N-BQJ (oficial)
   - URL: `https://nsib.gov.ng/interim-statement-bristow-helicopters-nigeria-limited-5n-bqj/`
   - Fatos observados: decolagem de Lagos para ERHA, IFR/IMC, `2 crew + 9 passengers`, FO como PF e comandante como PM.
3. NSIB — final report page 5N-BQJ (oficial)
   - URL: `https://nsib.gov.ng/final-report-bristow-helicopters-nigeria-limited-5n-bqj/`
   - Confirma identificação do evento/código de relatório final.
4. BEA notified event 5N-BQJ (autoridade de investigação parceira/notificação)
   - URL: `https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-a-sikorsky-s76-registered-5n-bqj-and-operated-by-bristow-helicopters-ltd-occured-on-02-03-16-in-nigeria-investigation-led-by-aib---nigeria/`
   - Fatos observados: controlled ditching ~78 NM de Lagos; operador Bristow Nigeria; rota Erha -> Lagos; sem fatalidades.
5. ARAIB accident report listing (oficial index) para HL9661
   - URL: `https://araib.molit.go.kr/USR/airboard0201/m_34497/lst.jsp?en=&lcmspage=17&old_search_dept_nm=&psize=5&search_dept_id=&search_dept_nm=&searchopt=title&searchword=&st=`
   - Metadados indexados (cache web): ocorrência `2020/04/25`, publicação `2021/06/29`, operador `(주)헬리코리아`, tipo `S76C+`, matrícula `HL9661`.
6. Aerossurance HL9661 (técnica secundária, não-gabarito)
   - URL: `https://aerossurance.com/helicopters/firefighting-tr-strike-bowser/`
   - Valor: contextualiza que o relatório ARAIB existe e descreve cenário operacional; usar apenas para pistas de enrichment.

Limitações técnicas observadas:
- `aib.gov.ng` PDF direto apresentou problema de certificado SSL no `curl` do terminal.
- `araib.molit.go.kr` apresentou intermitência/timeout para páginas detalhadas (`dtl.jsp`) no ambiente atual.
- Portanto, para 005 houve melhoria de anchor por listagem oficial + referência secundária, mas sem acesso consistente ao relatório completo.

## Resultado por caso

### REAL-EVENT-ADJUDICATION-004 (5N-BQJ)
- currentStatus: `EVIDENCE_ENRICHMENT_REQUIRED`
- sourceAnchorBefore: curated extraction + factual harvest internos com família de fonte NSIB/AIB.
- localSearchResults:
  - confirmação de sequência recorrente DAFCS/TRIM FAIL;
  - papéis PF/PM explícitos;
  - referência consistente a ditching offshore (~77 NM);
  - perguntas de incerteza já delimitadas (causal vs sintomático; selected vs forced ditching).
- externalSearchResults:
  - identificação oficial de final report com código e data de release;
  - interim oficial com contexto IFR/IMC e composição da tripulação/passageiros;
  - notificação BEA corroborando parâmetros gerais do evento.
- newFactsFound:
  - `Report No BHNL/2016/02/03/F` (final report);
  - `Date Released: April 25, 2019`;
  - `2 crew + 9 passengers`, FO=PF, Captain=PM;
  - referência externa consistente de ditching controlado próximo a 78 NM de Lagos.
- sourceQualityAfter: `IMPROVED_MEDIUM`
- stillMissing:
  - extração integral do PDF final oficial no ambiente atual;
  - granularidade de checklist/resets por timestamp;
  - discriminação robusta do limiar "selected vs unavoidable ditching".
- canExitEnrichment: `yes` (para rodada de adjudicação controlada com locks)
- canProceedToAdjudication: `yes`
- rationale:
  - há anchor oficial suficiente para sair do estado estritamente bloqueado de coleta, mantendo `P/A=UNRESOLVED` até refinamento factual adicional.

### REAL-EVENT-TRIAGE-005 (HL9661)
- currentStatus: `TRIAGE_ONLY + EVIDENCE_ENRICHMENT_REQUIRED`
- sourceAnchorBefore: apenas index/source-quality local com `SOURCE_PARTIAL`.
- localSearchResults:
  - reforço de metadados em Batch 1/2 index e source quality review;
  - ausência de deep extraction factual robusto dedicado;
  - ausência de fonte primária consolidada dentro do corpus local.
- externalSearchResults:
  - listagem oficial ARAIB com metadados de ocorrência/publicação/matrícula;
  - referência técnica secundária (Aerossurance) citando relatório ARAIB;
  - acesso instável ao detalhe oficial (`dtl.jsp`) no ambiente atual.
- newFactsFound:
  - confirmação externa do registro `HL9661` no catálogo oficial ARAIB;
  - data de ocorrência/publicação conforme listagem indexada;
  - contexto mínimo de operação firefighting/utility com tail rotor strike em fuel bowser.
- sourceQualityAfter: `IMPROVED_LOW`
- stillMissing:
  - relatório oficial completo acessível e extraível;
  - cronologia operacional detalhada;
  - decomposição de comunicação e coordenação solo-ar;
  - locator de evidência por seção/página para cadeia factual completa.
- canExitEnrichment: `no`
- canProceedToAdjudication: `no` (somente triage continuado)
- rationale:
  - apesar de melhora de anchor, o caso ainda não atinge o mínimo para adjudicação causal controlada além de `UNRESOLVED` triage.

## Critérios mínimos de saída de enrichment (mantidos)
- fonte identificável;
- locator/página/seção ou URL confiável;
- sequência factual mínima;
- atores mínimos;
- evidência para separar condição técnica vs resposta humana;
- incertezas explícitas.

## Resultado esperado / lock de fase
- Nenhum `proposedCode` foi alterado.
- Nenhum `releasedCode` foi criado.
- Nenhum downstream foi aberto.
- Se houver ajuste de código no futuro, deve ocorrer apenas em nova fase de adjudicação, nunca automático a partir desta coleta.
