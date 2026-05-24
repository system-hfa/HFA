# Real Event Structured Extraction 004

Status:
- STRUCTURED_EXTRACTION_DRAFT
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM

- extractionId: REAL-EVENT-EXTRACTION-004
- sourceDocument: `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md` and `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`
- sourceLocator: `PART C — REAL-EVENT-0006`, sections 27–37; factual harvest section 7
- originalCandidateId: REAL-EVENT-0006
- shortLabel: 5N-BQJ offshore DAFCS/TRIM FAIL ditching
- sourceType: OFFICIAL_REPORT / PRELIMINARY_REPORT / INTERIM_STATEMENT via curated extraction documents
- extractionConfidence: MEDIUM

## factualSummary
No retorno offshore ERHA FPSO → Lagos (S-76C++), com FO como PF e comandante como PM, ocorreram indicações recorrentes de DAFCS/TRIM FAIL (com registros também na perna anterior). A tripulação consultou procedimentos de emergência, manteve atenção manual aos controles e o voo evoluiu para ditching a cerca de 77 NM offshore. Não houve fatalidades; aeronave perdida por submersão em água salgada.

## eventSequence
1. Trecho Lagos → ERHA FPSO com indicação prévia de anomalias DAFCS/TRIM FAIL.
2. Reset das indicações na etapa anterior (conforme material preliminar).
3. Início do retorno ERHA FPSO → Lagos com 2 tripulantes e 9 passageiros.
4. Recorrência de indicações TRIM FAIL/DAFCS no retorno.
5. Consulta de material de procedimento de emergência.
6. Instrução operacional para PF manter mãos/pés nos controles.
7. Degradação operacional evolui para ditching offshore.
8. Sobrevivência dos ocupantes; perda da aeronave.

## unsafeStateCandidate
Condição anormal recorrente de automação/trim com possível degradação de controlabilidade em voo offshore, culminando em ditching.

## unsafeActConditionCandidate
Candidato preliminar (não conclusivo): indefinido nesta fase; evidência atual suporta melhor leitura de condição insegura dominante com múltiplas hipóteses de resposta da tripulação ainda abertas.

## directActorCandidate
Tripulação de voo (FO como PF e comandante como PM), com ressalva de possível dominância técnica/sistêmica sobre conduta ativa.

## evidenceFragments
- "repeated DAFCS/TRIM FAIL indications"
- "First Officer was the Pilot Flying ... Captain was the Pilot Monitoring"
- "Emergency/operating procedure material was consulted"
- "PF was instructed to keep hands and feet on the controls"
- "aircraft ditched ... approximately 77 NM offshore"

## uncertaintyNotes
- Modo de falha técnico exato e sua cadeia causal permanecem abertos.
- Não há, nesta fase, base suficiente para eleger mecanismo ativo humano dominante.
- Detalhe temporal de checklist/resets e decisão de ditching ainda limitado.

## excludedInformation
- Declarações causais preliminares/interinas como valor esperado.
- Julgamentos de conformidade de checklist ou performance da tripulação como verdade final.
- Conversão automática de anomalia técnica em erro de ação humana.
- Qualquer classificação P/O/A, preconditions formais, HFACS, Risk/ERC.

## possibleEvidenceCategoryHints
- PHYSICAL_CAPABILITY
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- TIME_PRESSURE
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestions
- O caso deve permanecer em trilha "unsafe-condition-dominant" até fonte primária mais completa?
- Há evidência factual suficiente para separar falha de execução de falha de compreensão do estado de sistema?
- Em adjudicação futura, qual limiar mínimo para sair de "insufficient axis evidence"?

## nextStepRecommendation
Manter como caso de alta utilidade adversarial para A4+R-63, enfatizando disciplina de não forçar classificação causal ativa sem evidência robusta.
