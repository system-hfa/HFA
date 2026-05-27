# SERA Daumas Extraction Log — A4R167 v0.2.0

## 1. Arquivos lidos

| Arquivo | Caminho | Tamanho | Linhas |
|---------|---------|---------|--------|
| Dissertacao (PDF) | `metodologia/Dissertacao - Filipe Daumas - ANALISE DE FATORES HUMANOS EM INCIDENTES NA AVIACAO OFFSHORE.pdf` | 1.8MB | — |
| Dissertacao (TXT) | `docs/reference/daumas-sera-offshore.txt` | 273KB | 5680 |
| Method Question Lock | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md` | — | 94 |
| Document Authority Index | `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md` | — | 206 |
| Single Escape Point Rule | `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md` | — | 102 |
| A4R166 Test | `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md` | — | 81 |
| A4R166 Dossier | `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md` | — | 174 |

## 2. Secoes consultadas da dissertacao

| Secao | Paginas | Conteudo |
|-------|---------|----------|
| Resumo | p.8-9 | Visao geral da metodologia MDC+SERA |
| Cap 4 — Entrevista 1 | p.52-63 | Evento 1 completo: relato, MDC, SERA |
| Cap 4 — Entrevista 2 | p.64-72 | Evento 2 completo: relato, MDC, SERA |
| Cap 4 — Entrevista 3 | p.74-85 | Evento 3 completo: relato, MDC, SERA |
| Cap 4 — Entrevista 4 | p.86-96 | Evento 4 completo: relato, MDC, SERA |
| Consideracoes Finais | p.97-98 | Sintese dos 4 eventos |

## 3. Termos buscados

- "ponto de fuga" — encontrado nos 4 eventos
- "ato ou condicao insegura" — encontrado nos 4 eventos
- "Objetivo" / "PERCEPCAO" / "ACAO" — encontrado nos 4 eventos
- "Pre-condicoes" — encontrado nos 4 eventos (tabelas)
- "FALHA DE" — encontrado; 10 codigos distintos usados na dissertacao
- "Resultados do Evento" — encontrado; tabelas 7, 10, 14, 18

## 4. Casos encontrados

4 casos, correspondendo as 4 entrevistas MDC:

1. **DAUMAS-CASE-1**: P-C / O-A / A-E — instrucao de voo com falha de conhecimento do aluno
2. **DAUMAS-CASE-2**: P-D / O-A / A-H — aproximacao com transferencia negativa de aprendizado entre equipamentos
3. **DAUMAS-CASE-3**: P-H / O-C / A-G — violacao excepcional por fadiga + defeito tecnico oculto
4. **DAUMAS-CASE-4**: P-G / O-D / A-F — decisao de pouso com vies de confirmacao

## 5. Campos encontrados em todos os casos

- Relato ipsis litteris do piloto
- Recontagem do evento
- Linha do tempo (figura)
- Aprofundamento progressivo (MDC)
- Ponto de fuga da operacao segura
- Ato ou condicao insegura
- 3 questoes SERA (Objetivo, Percepcao, Acao)
- Analise detalhada das falhas (com sub-questoes)
- Tabelas de pre-condicoes
- Resultados do evento (falhas + pre-condicoes)
- Questoes "E se?"

## 6. Campos nao encontrados ou ambiguos

### Campos ausentes na dissertacao

- **escapePointId**: A dissertacao nao usa IDs padronizados. Atribuidos nesta reproducao como DAUMAS-CASE-X.
- **actorContributionId**: A dissertacao nao separa contribuicoes por ator. Todos os casos sao single-actor na analise SERA.
- **confidence level**: A dissertacao nao atribui nivel de confianca (HIGH/MEDIUM/LOW) as classificacoes.
- **nextDecision**: A dissertacao nao define proxima decisao metodologica.
- **sourceSufficient / escapePointObservable / directActorIdentifiable**: Campos do A4R166 matrix nao usados na dissertacao.

### Campos ambiguos

- **P-H (Falha de Comunicacao) no Evento 3**: A dissertacao usa P-H para falha homem-maquina (defeito sem indicacao). No canonical question tree A4R166, o codigo P-H nao aparece como opcao canonica. E necessario verificar se equivale a P-G (informacao nao disponivel) ou se e um caso distinto.
- **A-E (Falha de Conhecimento/Decisao) no Evento 1**: No A4R166, A-E pode ter correspondencia diferente. A dissertacao descreve como "operador nao sabia a resposta correta".
- **A-F (Falha na Selecao da Acao) no Evento 4**: No A4R166, e necessario verificar se A-F tem correspondencia direta.
- **A-H (Falha no Gerenciamento do Tempo) no Evento 2**: A dissertacao relaciona A-H a pressao de tempo. No A4R166, A-H e definido como "acao apressada/urgency" e pode ter escopo diferente.

## 7. Diferencas metodologicas identificadas

| Aspecto | Dissertacao Daumas (2018) | A4R166 v0.2.0 |
|---------|---------------------------|---------------|
| Versao SERA | v0.1 (taxonomia completa com HFACS) | vNext (P/O/A focado) |
| Metodo complementar | MDC (Metodo da Decisao Critica) | Nao usa MDC |
| Pre-condicoes | Sim (tabelas completas HFACS) | Nao (apenas lock explicito) |
| Actor split | Nao (single-actor) | Sim (multi-actor contributions) |
| Escape point ID | Nao usa | Sim (formato canonico) |
| Fonte dos eventos | Entrevistas (nao oficiais) | Relatorios oficiais (NTSB) |
| Tipo de evento | Incidentes (sem investigacao formal) | Acidentes (com investigacao formal) |
| Idiomas dos codigos | Portugues (FALHA DE CONHECIMENTO/PERCEPCAO) | Ingles (P-C, O-A, etc.) |

## 8. Duvidas para revisao autoral

1. **Mapeamento de codigos SERA v0.1 → vNext**: Os codigos P-H, A-E, A-F, A-H usados na dissertacao precisam ser verificados contra o canonical question tree A4R166. Alguns podem nao ter correspondencia direta.

2. **Actor split para os casos Daumas**: Os casos 1 e 2 envolvem claramente dois pilotos com papeis distintos. Um actor split similar ao feito para EXECUFLIGHT-1526 poderia ser aplicavel, mas nao esta na dissertacao.

3. **Pre-condicoes como parte do pacote**: O A4R166 explicitamente bloqueia HFACS. Mas a dissertacao usa pre-condicoes HFACS como parte integral da analise. E necessario decidir se as pre-condicoes extraidas sao "SOURCE_REPRODUCTION" (permitido) ou "HFACS" (bloqueado).

4. **Status dos eventos como "nao oficiais"**: Os 4 casos Daumas sao eventos relatados em entrevistas, nao investigados formalmente. Isso os diferencia dos eventos A4R166 (COMAIR, EXECUFLIGHT, US-AIRWAYS) que tem relatorios oficiais NTSB.

5. **Uso do MDC como metodo complementar**: A dissertacao usa MDC para aprofundamento cognitivo antes do SERA. O A4R166 nao preve MDC. E necessario decidir se o MDC e aceitavel como "source enrichment" ou se configura metodo nao canonico.

## 9. Status final da extracao

- Total de casos encontrados: 4
- Total de casos extraidos: 4
- Total de campos extraidos por caso: 9 (identificacao, resumo, timeline, escape point, unsafe act, O, P, A, pre-condicoes)
- Status: EXTRACTION_COMPLETE / AWAITING_AUTHOR_REVIEW

## 10. Decisoes autorais — A4R167

**Data**: 2026-05-27

### Aprovacao dos 4 casos

Todos os 4 casos extraidos da dissertacao Daumas (2018) receberam status **AUTHOR_APPROVED_FOR_REPRODUCTION**:

| Caso | caseId | P | O | A | Status |
|------|--------|---|---|---|--------|
| DAUMAS-CASE-1 | (antes: DAUMAS-ENTREVISTA-1) | P-C | O-A | A-E | AUTHOR_APPROVED_FOR_REPRODUCTION |
| DAUMAS-CASE-2 | (antes: DAUMAS-ENTREVISTA-2) | P-D | O-A | A-H | AUTHOR_APPROVED_FOR_REPRODUCTION |
| DAUMAS-CASE-3 | (antes: DAUMAS-ENTREVISTA-3) | P-H | O-C | A-G | AUTHOR_APPROVED_FOR_REPRODUCTION |
| DAUMAS-CASE-4 | (antes: DAUMAS-ENTREVISTA-4) | P-G | O-D | A-F | AUTHOR_APPROVED_FOR_REPRODUCTION |

### Renomeacao de caseId

Todos os caseIds foram renomeados de `DAUMAS-ENTREVISTA-X` para `DAUMAS-CASE-X` (X = 1..4). A numeracao permanece a mesma.

### Decisao de escopo — Caso Daumas 2

- **Escopo 2A**: Mantido como na dissertacao — escape point = cancelamento do automatismo + reducao manual de velocidade.
- **Escopo 2B**: NAO ABERTO. A barreira de 500 pes (decisao de continuar em condicoes abaixo dos minimos) permanece como contexto/MDC, registrada como informacao relevante da dissertacao, mas sem abertura de novo escape point.
- **Futuro**: Uma eventual reanalise SERA vNext devera ocorrer em fase separada, com escopo proprio de ponto de fuga e, se necessario, contribuicoes de ator documentadas dentro desse escopo.

### Locks mantidos

- NO_RELEASED_CODE (todos os 4 casos)
- NO_DOWNSTREAM (todos os 4 casos)
- Os demais locks do pacote A4R167 permanecem inalterados (NO_FINAL_CONCLUSION, NO_HFACS, NO_RISK_ERC, NO_ARMS_ERC, NO_RECOMMENDATIONS)

### Duvidas para revisao autoral (secao 8)

As 5 duvidas listadas na secao 8 permanecem validas como questoes metodologicas abertas. Nenhuma foi resolvida nesta fase. Em particular:

1. **Mapeamento SERA v0.1 → vNext**: Pendente de revisao autoral. Codigos P-H, A-E, A-F, A-H usados na dissertacao precisam ser verificados contra o canonical question tree A4R166.
2. **Actor split**: Reconhecido como nao aplicavel nesta reproducao (fonte = dissertacao single-actor). Nao sera feito no A4R167.
3. **Pre-condicoes**: Mantidas como SOURCE_REPRODUCTION (extraidas da dissertacao, nao inferidas). Status de compatibilidade com bloqueio HFACS do A4R166 permanece em aberto.
4. **Status nao oficial**: Confirmado que os 4 casos sao eventos de entrevista, nao investigacoes formais.
5. **MDC**: Mantido como metodo complementar da dissertacao. Nao configura metodo nao canonico para fins de A4R167 (SOURCE_REPRODUCTION).
