export const NO_ARTIFACTS = `
PROIBIDO incluir na justificativa qualquer referência a: "nó", "input", "fluxo", "SERA",
"step_id", nomes de variáveis ou estrutura interna do sistema.
Escreva apenas a análise substantiva do evento em linguagem técnica aeronáutica.`

/** FASE 2 — PDF INPUT (Vercel Python Serverless, futuro)
 * 1. POST /api/extract-pdf.py recebe PDF
 * 2. Python extrai texto (pdfplumber)
 * 3. Texto vira SeraInput.eventoNarrativa
 * 4. Pipeline TS segue igual
 */
