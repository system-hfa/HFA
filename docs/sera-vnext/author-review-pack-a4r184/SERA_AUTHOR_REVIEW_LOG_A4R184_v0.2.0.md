# SERA Author Review Log A4R184 v0.2.0

Status: LOG_COMPLETE
Phase: A4+R-184
methodology: SERA
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

---

## 1. Resumo de execução

| Item | Valor |
|---|---|
| Fase | A4R184 |
| Data de execução | 2026-05-29 |
| HEAD no início | 3a8733cf89cd45a47c7f9f3cd39f482ca65267ab |
| origin/main no início | 3a8733cf89cd45a47c7f9f3cd39f482ca65267ab |
| HEAD == origin/main | PASS |
| Casos processados | 5 (BATCH_A de A4R181/A4R182/A4R183) |
| Pacotes de revisão criados | 5 |
| Fechamento P/O/A | Nenhum |
| Código liberado criado | Nenhum |
| Fixtures alteradas | Nenhuma |
| Baseline alterado | Nenhum |
| Runner oficial alterado | Nenhum |
| Arquivos .ts alterados | Nenhum |

---

## 2. Fontes lidas

| Arquivo | Tipo | Usada para |
|---|---|---|
| SERA_SCOPE_NORMALIZED_ADJUDICATION_DRAFT_A4R183_v0.2.0.md | Documento principal A4R183 | Sumário dos 5 drafts e locks de fase |
| SERA_SCOPE_NORMALIZED_ADJUDICATION_MATRIX_A4R183_v0.2.0.csv | Matriz A4R183 | Confirmação de campos estruturados por caso |
| SERA_SCOPE_NORMALIZED_ADJUDICATION_REVIEW_REGISTER_A4R183_v0.2.0.md | Register de boundary zones | Boundary zones não resolvidas por caso |
| SERA_A4R184_AUTHOR_REVIEW_PLAN_v0.2.0.md | Plano de fase A4R184 | Orientação de escopo e perguntas prioritárias |
| SERA_SCOPE_NORMALIZED_ADJUDICATION_LOG_A4R183_v0.2.0.md | Log A4R183 | Confirmação de validações e fontes da fase anterior |
| drafts/A4R183-DRAFT-0001-ASIANA-214.md | Draft Asiana 214 | Evidências, rationale, perguntas, locks |
| drafts/A4R183-DRAFT-0002-COMAIR-5191.md | Draft Comair 5191 | Evidências, rationale, perguntas, locks |
| drafts/A4R183-DRAFT-0003-AMERICAN-1420.md | Draft American 1420 | Evidências, rationale, perguntas, locks |
| drafts/A4R183-DRAFT-0006-UPS-1354.md | Draft UPS 1354 | Evidências, rationale, perguntas, locks |
| drafts/A4R183-DRAFT-0017-UNITED-173.md | Draft United 173 | Evidências, rationale, perguntas, locks |
| SERA_REAL_EVENT_AUTHOR_DECISION_INTAKE_A4R182_v0.2.0.md | Intake A4R182 | Confirmação dos escopos e modelos de ator aprovados |

---

## 3. Arquivos criados nesta fase

| Arquivo | Descrição |
|---|---|
| SERA_AUTHOR_REVIEW_PACK_A4R184_v0.2.0.md | Documento principal consolidando os 5 casos (10 seções por caso) |
| SERA_AUTHOR_REVIEW_MATRIX_A4R184_v0.2.0.csv | Matriz CSV com 5 linhas e campos de decisão pendente |
| SERA_AUTHOR_REVIEW_AXIS_OPTIONS_A4R184_v0.2.0.csv | Matriz de opções por eixo com 15 linhas |
| SERA_AUTHOR_REVIEW_RISK_REGISTER_A4R184_v0.2.0.md | Registro de 8 riscos metodológicos por caso |
| SERA_A4R185_AUTHOR_DECISION_INTAKE_PLAN_v0.2.0.md | Plano para a fase de intake de decisões autorais |
| SERA_AUTHOR_REVIEW_LOG_A4R184_v0.2.0.md | Este log de execução |
| review-packets/A4R184-REVIEW-0001-ASIANA-214.md | Pacote de revisão Asiana 214 |
| review-packets/A4R184-REVIEW-0002-COMAIR-5191.md | Pacote de revisão Comair 5191 |
| review-packets/A4R184-REVIEW-0003-AMERICAN-1420.md | Pacote de revisão American 1420 |
| review-packets/A4R184-REVIEW-0006-UPS-1354.md | Pacote de revisão UPS 1354 |
| review-packets/A4R184-REVIEW-0017-UNITED-173.md | Pacote de revisão United 173 |

---

## 4. Estado de eixos por caso

| reviewId | HYP_P | HYP_O | HYP_A | candidateOptionStatus P | candidateOptionStatus O | candidateOptionStatus A |
|---|---|---|---|---|---|---|
| A4R184-REVIEW-0001 (Asiana 214) | UNKNOWN | UNKNOWN | UNKNOWN | CONSERVATIVE_UNKNOWN_RECOMMENDED | CONSERVATIVE_UNKNOWN_RECOMMENDED | NEEDS_MORE_EVIDENCE |
| A4R184-REVIEW-0002 (Comair 5191) | UNKNOWN | UNKNOWN | UNKNOWN | CONSERVATIVE_UNKNOWN_RECOMMENDED | CONSERVATIVE_UNKNOWN_RECOMMENDED | CONSERVATIVE_UNKNOWN_RECOMMENDED |
| A4R184-REVIEW-0003 (American 1420) | UNKNOWN | UNKNOWN | UNKNOWN | CONSERVATIVE_UNKNOWN_RECOMMENDED | CONSERVATIVE_UNKNOWN_RECOMMENDED | NEEDS_MORE_EVIDENCE |
| A4R184-REVIEW-0006 (UPS 1354) | UNKNOWN | UNKNOWN | UNKNOWN | CONSERVATIVE_UNKNOWN_RECOMMENDED | CONSERVATIVE_UNKNOWN_RECOMMENDED | NEEDS_MORE_EVIDENCE |
| A4R184-REVIEW-0017 (United 173) | UNKNOWN | UNKNOWN | UNKNOWN | NEEDS_MORE_EVIDENCE | CONSERVATIVE_UNKNOWN_RECOMMENDED | NEEDS_MORE_EVIDENCE |

---

## 5. Limitações e lacunas documentadas

| Lacuna | Casos afetados | Impacto |
|---|---|---|
| CVR callout discreto de não-percepção do A/T HOLD não isolado | Asiana 214 | Limita P-axis a MEDIUM; boundary P/A não resolvido |
| Timestamp/fuel quantity exato do EP não isolado | United 173 | Limita A-axis; OCR artifacts no TXT AAR-79-07 |
| OCR artifacts no TXT NTSB AAR-79-07 | United 173 | Detalhe fino de timing das verbalizações do FE requerem verificação |
| Altitude/timestamp da janela de go-around | American 1420 | A-axis sem âncora operacional precisa |
| Boundary P/A no mode change sem briefing | UPS 1354 | Fato único pode suportar P ou A — alocação pendente de decisão autoral |
| Separabilidade P/A no momento de lineup | Comair 5191 | P e A compartilham o mesmo ato observável |

---

## 6. O que não foi feito (confirmação de proteção)

- Nenhum eixo P, O ou A foi fechado.
- Nenhum selectedCode com status fechado foi criado.
- Nenhum código liberado foi criado.
- Nenhuma fixture foi criada ou alterada.
- Nenhum baseline foi criado ou alterado.
- Nenhum runner oficial foi alterado.
- Nenhum arquivo .ts foi alterado.
- Nenhum LLM/API externo foi chamado.
- Nenhuma conclusão de relatório externo importada como código SERA.
- Nenhum fato ausente inventado.
- HFACS, Risk/ERC, ARMS/ERC, finalConclusion, downstream: nenhum criado.
- Arquivos A4R183, A4R182, A4R181, A4R180 originais: não alterados.
- Tests, runner, fixtures, baseline, source-corpus, motor, UI/API/DB/migrations: não alterados.

---

## 7. Validações executadas

### Git state
- HEAD == origin/main == 3a8733cf89cd45a47c7f9f3cd39f482ca65267ab: PASS
- Arquivos tracked modificados inesperados: nenhum (PASS)
- Untracked em tmp/ e source-corpus recuperado: presentes mas não tocados (OK)

### Validadores P1 (executados após criação dos arquivos)
Ver saída das validações na seção de validação do relatório final.

### Validação Python CSV A4R184
- Número de linhas matriz: 5 — PASS
- Número de linhas axis options: 15 — PASS
- integratedActorModel == CREW_INTEGRATED_ACTOR_MODEL (todos): PASS
- actorSplitAllowedThisPhase == false (todos): PASS
- notFinalClassification == true (todos): PASS
- poaClosureAllowed == false (todos): PASS
- currentHypP/O/A == UNKNOWN (todos): PASS
- candidateOption em padrão canônico ou UNKNOWN (todos): PASS
- candidateOptionStatus em vocabulário válido (todos): PASS

### Scans de ausência
- Terminologia incorreta do projeto: OK
- Fraseamento proibido de status fechado/liberado (patterns de classificação ativa ou código liberado): OK
- Fraseamento perigoso de ponto de fuga múltiplo: OK
- Fraseamento de fechamento prematuro: OK

### Scope checks git diff
- git diff --check: limpo
- Arquivos .ts modificados: zero
- Caminhos proibidos (tests/sera/fixtures/, baseline, reports/baseline, source-corpus): zero

---

## 8. Fix pass A4R184-fix (2026-05-29) — coerência candidateOption / candidateOptionStatus

### Problema identificado

4 linhas do CSV `SERA_AUTHOR_REVIEW_AXIS_OPTIONS_A4R184_v0.2.0.csv` tinham `candidateOption=UNKNOWN` combinado com `candidateOptionStatus=OPTION_FOR_AUTHOR_REVIEW`. Essa combinação é semanticamente incoerente: se o candidato é UNKNOWN, não pode estar marcado como opção pronta para revisão autoral.

### Correções aplicadas no CSV

| reviewId | axis | Status anterior | Status corrigido | Motivo |
|---|---|---|---|---|
| A4R184-REVIEW-0002 (Comair 5191) | P | OPTION_FOR_AUTHOR_REVIEW | CONSERVATIVE_UNKNOWN_RECOMMENDED | Boundary P/A não resolvido — mesmo fragmento (F3) pode suportar P e A sem racional distinto |
| A4R184-REVIEW-0002 (Comair 5191) | A | OPTION_FOR_AUTHOR_REVIEW | CONSERVATIVE_UNKNOWN_RECOMMENDED | Boundary P/A não resolvido — separabilidade dos eixos não demonstrada |
| A4R184-REVIEW-0003 (American 1420) | P | OPTION_FOR_AUTHOR_REVIEW | CONSERVATIVE_UNKNOWN_RECOMMENDED | Risco de double-count com A-axis (EGPWS sink rate suportando ambos) não resolvido |
| A4R184-REVIEW-0006 (UPS 1354) | P | OPTION_FOR_AUTHOR_REVIEW | CONSERVATIVE_UNKNOWN_RECOMMENDED | Boundary P/A no fato F2 (mode change sem briefing) não resolvido; alocação precede proposta de candidato |

### Documentos atualizados neste fix pass

- `SERA_AUTHOR_REVIEW_AXIS_OPTIONS_A4R184_v0.2.0.csv` — 4 células corrigidas
- `SERA_AUTHOR_REVIEW_LOG_A4R184_v0.2.0.md` — tabela seção 4 e este registro
- `SERA_AUTHOR_REVIEW_PACK_A4R184_v0.2.0.md` — seções 6.9, 7.9 e 8.9
- `review-packets/A4R184-REVIEW-0002-COMAIR-5191.md` — seções 8 (P e A) e 10
- `review-packets/A4R184-REVIEW-0003-AMERICAN-1420.md` — seções 8 (P) e 10
- `review-packets/A4R184-REVIEW-0006-UPS-1354.md` — seções 8 (P) e 10

### Invariantes preservados

- Todos os 15 eixos permanecem `candidateOption=UNKNOWN`
- Nenhum eixo foi fechado
- Nenhum selectedCode ou código liberado criado
- `notFinalClassification=true` e `poaClosureAllowed=false` em todos os casos
- Nenhum arquivo `.ts`, fixture, baseline, runner ou source-corpus alterado
- A4R183, A4R182, A4R181 não alterados
