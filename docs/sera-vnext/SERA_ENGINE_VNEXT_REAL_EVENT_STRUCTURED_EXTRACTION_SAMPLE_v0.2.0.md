# SERA Engine vNext Real Event Structured Extraction Sample v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-62 — Real Event Structured Extraction Sample

## Objetivo
Executar uma extração factual estruturada inicial de eventos reais/candidatos já inventariados, sem classificar P/O/A e sem promover qualquer artefato para fixture, baseline ou downstream.

## Relação com A4+R-61
A4+R-61 fez o inventário de corpus e selecionou 12 candidatos (`not yet classified`).
A4+R-62 executa a próxima etapa planejada: subamostragem segura + extração factual padronizada para preparação da adjudicação AI/Author.

## Contexto da conversa “Validação de Eventos HFA/SERA”
Esta fase segue explicitamente o alinhamento metodológico já registrado:
- baseline causal v0.1.4 previamente estabilizada;
- primeiro extrair fatos e evidências, sem importar conclusões antigas como gabarito;
- só depois avançar para adjudicação AI/Author controlada;
- sem abertura de A5/risk/downstream nesta etapa.

## Subamostra selecionada
Subamostra final: 5 casos (dentro da faixa ideal 5, máximo 6).

Casos:
- REAL-EVENT-0001 (Thebaud)
- REAL-EVENT-0002 (Peasmarsh)
- REAL-EVENT-0004 (Vigo)
- REAL-EVENT-0006 (5N-BQJ)
- REAL-EVENT-0028 (HL9661)

## Critérios de seleção
- evidência textual factual já disponível em `docs/real-event-harvest/*`;
- variedade metodológica (offshore, percepção/comunicação, ação/monitoramento, objetivo/continuação, ambiguidade);
- sem dependência de OCR pesado;
- sem necessidade de classificação SERA nesta fase;
- inclusão de um caso explicitamente `SOURCE_PARTIAL` para testar trilha de incerteza.

## Casos extraídos
Arquivos criados em `docs/sera-vnext/real-event-extractions/`:
- `REAL-EVENT-EXTRACTION-001.md` (REAL-EVENT-0001)
- `REAL-EVENT-EXTRACTION-002.md` (REAL-EVENT-0002)
- `REAL-EVENT-EXTRACTION-003.md` (REAL-EVENT-0004)
- `REAL-EVENT-EXTRACTION-004.md` (REAL-EVENT-0006)
- `REAL-EVENT-EXTRACTION-005.md` (REAL-EVENT-0028)

Campos estruturados aplicados por caso:
- `extractionId`
- `sourceDocument`
- `sourceLocator`
- `originalCandidateId`
- `shortLabel`
- `sourceType`
- `extractionConfidence`
- `factualSummary`
- `eventSequence`
- `unsafeStateCandidate`
- `unsafeActConditionCandidate`
- `directActorCandidate`
- `evidenceFragments`
- `uncertaintyNotes`
- `excludedInformation`
- `possibleEvidenceCategoryHints` (passivo/opcional)
- `adjudicationQuestions`
- `nextStepRecommendation`

## Qualidade da extração
- HIGH: 2 casos (0001, 0002)
- MEDIUM: 2 casos (0004, 0006)
- LOW: 1 caso (0028, `SOURCE_PARTIAL`)

Leitura geral:
- amostra já útil para adjudicação controlada;
- há heterogeneidade de qualidade deliberada para capturar gaps de fonte e ambiguidade metodológica.

## Dúvidas/adjudication questions encontradas
Principais grupos de dúvida:
- fronteira entre não percepção de alerta vs execução de trajetória (0002);
- fronteira entre carga de missão/monitoramento vs falha ativa de ação (0004);
- limiar para manter caso como unsafe-condition-dominant sem forçar eixo ativo (0006);
- critério mínimo de ancoragem de fonte para avançar caso `SOURCE_PARTIAL` (0028);
- ancoragem do safe operation escape point em transição de modo vs degradação detectável (0001).

## O que foi excluído propositalmente
- conclusões finais/prováveis causas de investigações originais;
- recomendações de segurança e julgamentos de culpa/performance;
- qualquer classificação antiga como gabarito;
- preenchimento de P/O/A, preconditions formais, HFACS, Risk/ERC, finalConclusion ou recommendations.

## Confirmação metodológica
- Nenhuma classificação SERA foi executada nesta fase.
- Nenhum `expectedCode`, `releasedCode`, `selectedCode CLASSIFIED` foi criado.
- Conclusões antigas dos documentos-fonte não foram importadas como verdade metodológica.

## Limitações
- inexistência local dos arquivos físicos `pdf24_merged*.pdf` referenciados em índices;
- parte da subamostra depende de documentos intermediários de extração e não de fonte primária paginada;
- um caso com `SOURCE_PARTIAL` mantido com confiança baixa por desenho metodológico.

## Próxima fase recomendada
A4+R-63 — AI/Author SERA Adjudication Pilot.
