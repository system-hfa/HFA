# SERA Engine vNext Adversarial Set 2 Contract Tests v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-51 — Adversarial Set 2 Contract Tests

## Objetivo
Converter materialmente o Adversarial Set 2 (A4+R-50) em contratos técnicos executáveis e determinísticos no core vNext, sem abrir downstream e sem promover consensus reference case.

## Relação com A4+R-50
A4+R-50 definiu o design dos 14 cenários adversariais (`DESIGN_ONLY`).  
A4+R-51 implementa contratos trial em:
- `tests/sera-vnext/adversarial-set-2-contract-trial-001.ts`

Escopo desta fase:
- execução local de contratos sintéticos;
- uso apenas de helpers vNext já existentes (`semantic-consistency`, `code-traceability`, `preconditions`);
- sem LLM, sem engine legacy, sem fixtures oficiais.

## O que virou teste executável
Contratos implementados e executáveis:
1. ADV-2-001 Weather/warning-only não pode virar falha perceptiva semanticamente consistente.
2. ADV-2-002 A-D sem semântica física/motora/ergonômica bloqueia.
3. ADV-2-003 O-C/O-D sem intent/rule-awareness bloqueiam.
4. ADV-2-004 A-A preserva no-failure; A-C preserva falha de feedback pós-ação própria.
5. ADV-2-005 P-D vs P-G por `timePressureExcessive` (`true` vs `false`).
6. ADV-2-006 A-F vs A-I por `timePressureExcessive` (`false` vs `true`).
7. ADV-2-007 A-G vs A-J por `timePressureExcessive` (`false` vs `true`).
8. ADV-2-008 Fronteira O-B vs O-C com exigência semântica de intent/rule-awareness onde aplicável.
9. ADV-2-009 O-D/O-C sem suporte semântico não podem ficar `SEMANTICALLY_CONSISTENT`.
10. ADV-2-010 Contrato P-B vs P-C documentado por traceability (Hendy #3 vs #4).
11. ADV-2-011 Fronteira P-H vs A-J validada via traceability/Hendy/timePressure.
12. ADV-2-012 Evidência insuficiente bloqueia trilha semântica e preconditions.
13. ADV-2-013 O-E permanece `NON_EXISTENT_IN_SERA_PT_V1` e bloqueado para candidato ativo.
14. ADV-2-014 Contexto multi-ator tratado como fronteira: sem expansão para múltiplas classificações finais/downstream.

## O que ficou apenas documentado
- ADV-2-010 permanece sem runtime guard dedicado para distinção semântica profunda P-B vs P-C; nesta fase o contrato é de rastreabilidade/documentação (não gate semântico novo).
- ADV-2-014 não implementa suporte a múltiplos unsafe acts; valida somente preservação dos limites atuais.

## Limitações
- Não materializa consensus reference cases reais.
- Não executa protocolo inter-rater.
- Não adiciona novos gates metodológicos; valida os contratos com o runtime vNext já disponível.
- Não altera schema/UI/API/DB, Risk/ERC, HFACS, recommendations, finalConclusion.

## Cenários cobertos
Cobertura integral dos 14 cenários do Adversarial Set 2 em formato de contrato vNext (executável ou documental controlado, conforme seção anterior).

## Locks preservados
Nos contratos executados:
- downstream continua locked;
- `selectedCode` base permanece `UNRESOLVED`;
- sem promoção automática para `CLASSIFIED`;
- sem `finalConclusion`;
- sem HFACS;
- sem Risk/ERC;
- sem ARMS/ERC;
- sem recommendations.

## Próxima fase recomendada
A4+R-52:
1. aprofundar guards semânticos ainda documentais (principalmente P-B/P-C e limites multi-ator);
2. iniciar materialização controlada de consensus reference cases (sem usar ainda como consenso validado);
3. preparar execução piloto do protocolo inter-rater sobre subconjunto adversarial.
