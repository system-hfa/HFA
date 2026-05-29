# SERA Real Event Author Adjudication Log A4R181 v0.2.0

Status: ADJUDICATION_LOG_PREPARED
Phase: A4+R-181
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo do log

Registrar de forma auditável o que foi feito em A4R181: arquivos lidos como fonte, critérios de roteamento por batch, distribuição de status, dossiês criados, validações executadas e limitações conhecidas. Este log não fecha eixo nem cria artefato downstream.

## 2. Arquivos lidos como fonte

Extrações estruturadas A4R180 (em `real-event-structured-extraction-a4r180/extractions/`):
- A4R180-EXTRACTION-0001 (Asiana 214 SFO)
- A4R180-EXTRACTION-0002 (Comair 5191 LEX)
- A4R180-EXTRACTION-0003 (American 1420 LIT)
- A4R180-EXTRACTION-0006 (UPS 1354 BHM)
- A4R180-EXTRACTION-0014 (Sikorsky S-76A)
- A4R180-EXTRACTION-0017 (United 173 PDX)
- A4R180-EXTRACTION-0021 (QuestionPath backfill)

Documentos de plano e regra:
- `SERA_A4R181_AUTHOR_ADJUDICATION_PLAN_v0.2.0.md` (plano de roteamento por batch)
- `SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md` (regra de ponto de fuga único + multi-actor)

As demais extrações (0004, 0005, 0007–0013, 0015, 0016, 0018–0020, 0022–0024) foram roteadas a partir do plano A4R181 e da matriz de enriquecimento A4R180B, sem necessidade de dossiê individual nesta fase.

## 3. Critérios de roteamento por batch

- **BATCH_A** — narrativeSufficiency = NARRATIVE_SUFFICIENT e fonte direta/primária; pronto para decisão direta. Recebe dossiê individual.
- **BATCH_B** — boundary ou multi-actor exigindo decisão de framing (single vs multi-actor; zona vs momento) antes de dossiê.
- **BATCH_C** — duplicatas que exigem consolidação obrigatória antes de qualquer decisão de eixo.
- **BATCH_D** — source enrichment, repair de fonte, boundary review técnico ou cross-reference; adjudicação suspensa.

## 4. Distribuição por batch e status

Batch:
- BATCH_A: 5 (0001, 0002, 0003, 0006, 0017)
- BATCH_B: 6 (0004, 0005, 0010, 0012, 0013, 0018)
- BATCH_C: 6 (0007, 0008, 0009, 0011, 0016, 0019)
- BATCH_D: 7 (0014, 0015, 0020, 0021, 0022, 0023, 0024)

Status (adjudicationStatus):
- READY_FOR_AUTHOR_DECISION: 5
- FRAMING_DECISION_REQUIRED: 6
- CONSOLIDATION_REQUIRED: 6
- HOLD_REPAIR_REQUIRED: 1
- HOLD_BOUNDARY_REVIEW: 1
- HOLD_UNRESOLVED: 1
- HOLD_CROSS_REFERENCE_ONLY: 2
- HOLD_SOURCE_ENRICHMENT_PENDING: 2

Total: 24.

## 5. Dossiês criados

Cinco dossiês BATCH_A em `author-decision-packets/`:
- AUTHOR_DECISION_PACKET_A4R181_0001_ASIANA-214.md
- AUTHOR_DECISION_PACKET_A4R181_0002_COMAIR-5191.md
- AUTHOR_DECISION_PACKET_A4R181_0003_AMERICAN-1420.md
- AUTHOR_DECISION_PACKET_A4R181_0006_UPS-1354.md
- AUTHOR_DECISION_PACKET_A4R181_0017_UNITED-173.md

Cada dossiê tem 12 seções: resumo curto, narrativa, ponto de fuga candidato, ator direto candidato, fatos que sustentam, fatos contra/limitações, alternativas, risco de overclassification, consequência se aprovado, consequência se rejeitado, pergunta simples (APROVO / NÃO APROVO / PRECISO REVISAR) e observação de locks.

## 6. Outros artefatos preparados

- `SERA_REAL_EVENT_AUTHOR_ADJUDICATION_PACK_A4R181_v0.2.0.md` (documento principal)
- `SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (matriz de 24 linhas)
- `SERA_REAL_EVENT_AUTHOR_ADJUDICATION_HOLD_REGISTER_A4R181_v0.2.0.md` (holds BATCH_C/D)
- `SERA_A4R182_AUTHOR_DECISION_INTAKE_PLAN_v0.2.0.md` (plano de intake da decisão)

## 7. Validações executadas

1. **Estado git**: branch `main`, HEAD `f03e657188f6a0ae0edaa4403b3818e74f661aa7` (igual ao esperado). Nenhum arquivo tracked modificado; apenas untracked esperados (pasta A4R181, tmp/, e um TXT recuperado pré-existente).
2. **Validadores P1** (todos exit 0):
   - validate-reference-p1-candidate-suite.mjs — officialFixturesTouched=false, baselineTouched=false, apiCall=false, llmCall=false
   - validate-reference-p1b-candidate-runner.mjs — idem
   - validate-sera-reference-p1a-fixtures.mjs — "draft fixtures are structurally valid"
   - validate-reference-p1a-candidate-runner.mjs — idem
3. **Validação CSV (Python)**: 24 linhas de dados; todas as colunas obrigatórias presentes; notFinalClassification=true em todas as 24 linhas; BATCH_A com exatamente 5 candidatos e 5 dossiês; potentialP/O/A são HYP_* ou UNKNOWN (nenhum código fechado); allowedAnswers contém APROVO em todas as linhas.
4. **Scans de termos proibidos**: zero ocorrências da terminologia incorreta do projeto; zero de "mais de um ponto de fuga"/"multiple escape point"; zero de fechamento de eixo fora de contexto; zero de status fechado fora de negação. Termos como código liberado aparecem apenas em listas de bloqueio/negação.
5. **Scope checks**: nenhum arquivo .ts alterado; `git diff --check` limpo; nenhuma alteração tracked em fixtures, baseline, source-corpus, tmp/ ou .zip.

## 8. Limitações conhecidas

- A matriz mantém 24 linhas (uma por extração); as duplicatas não foram fisicamente fundidas — a consolidação é marcada via coluna duplicateGroup + status CONSOLIDATION_REQUIRED e detalhada no hold register.
- Os campos potentialP/O/A são hipóteses de trabalho (HYP_*) ou UNKNOWN; nenhum é fechamento de eixo.
- Os escape points BATCH_A são formulados como zonas com SOURCE_PARTIAL; a priorização entre momentos sucessivos é decisão autoral pendente.
- A diferenciação PF/PM e os desdobramentos multi-actor permanecem por decidir.
- 0014 não pode ser adjudicado enquanto a fonte estiver com mismatch; 0015 aguarda boundary review técnico; 0023/0024 aguardam source enrichment.

## 9. Locks reafirmados

Esta fase não fechou P/O/A, não criou selectedCode com status fechado, não criou código liberado, fixture ou baseline, não alterou runner/motor SERA/runtime/.ts, não criou recomendações/HFACS/Risk/ERC/ARMS/ERC/finalConclusion/downstream, não chamou LLM/API e não importou conclusão de relatório externo como código SERA.
