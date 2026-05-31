# SERA Author Node Decision Risk Register A4R187 v0.2.0

## Riscos e mitigacoes

1. Risco: aceitar node sem evidencia suficiente.
Mitigacao: exigir rationale autoral com evidenciaAnchor; usar NEEDS_MORE_EVIDENCE quando necessario.

2. Risco: rejeitar node por leitura retrospectiva do desfecho.
Mitigacao: limitar justificativa ao ponto de fuga aprovado e aos anchors factuais A4R180/A4R186.

3. Risco: usar consequencia posterior como base principal da decisao.
Mitigacao: validar coerencia com approvedEscapePointScope antes da decisao por node.

4. Risco: confundir eixo de percepcao com eixo de acao.
Mitigacao: revisar axis do node e manter decisao vinculada ao exactQuestionTextPt do proprio node.

5. Risco: usar pergunta nao canonica.
Mitigacao: aceitar somente nodeId existente em A4R99/A4R185 e exactQuestionTextPt correspondente.

6. Risco: fechar eixo prematuramente.
Mitigacao: manter axisClosureAllowed=false, notFinalClassification=true e poaClosureAllowed=false.

7. Risco: transformar node decision em resultado conclusivo de eixo.
Mitigacao: registrar A4R187 apenas como intake documental para consolidacao posterior em A4R188.
