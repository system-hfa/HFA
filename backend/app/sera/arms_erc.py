"""
arms_erc.py — Cálculo de efetividade das barreiras remanescentes (ARMS-ERC)

Eixo X da matriz ARMS-ERC: Efetividade das Barreiras Remanescentes
  1 — Nenhuma   (nenhuma barreira funcionou)
  2 — Mínima    (barreiras presentes mas majoritariamente ineficazes)
  3 — Limitada  (alguma barreira funcionou parcialmente)
  4 — Efetiva   (barreiras funcionaram, falha foi isolada)

A pergunta central do ARMS-ERC (EASA/ARMS Working Group, 2010) é:
  "Quão efetivas eram as barreiras de segurança no MOMENTO do evento?"

Isso é independente do score HFA. O score HFA mede a carga de falhas
organizacionais/humanas — mas barreiras técnicas e procedimentais podem
ter funcionado mesmo quando o score HFA é alto.

Fontes:
  ARMS Working Group (2010). ARMS Methodology for Operational Risk Assessment.
  EASA AMC 20-8.
  Reason, J. (1990). Human Error. Cambridge University Press.
  EU 376/2014.
"""

from __future__ import annotations


ERC_LEVEL = int  # 1, 2, 3 ou 4


class ERCResult:
    def __init__(
        self,
        level: ERC_LEVEL,
        label: str,
        rationale: str,
        technical_barriers: str,
        procedural_barriers: str,
        hfa_adjustment: str,
    ):
        self.level = level
        self.label = label
        self.rationale = rationale
        self.technical_barriers = technical_barriers
        self.procedural_barriers = procedural_barriers
        self.hfa_adjustment = hfa_adjustment

    def to_dict(self) -> dict:
        return {
            "erc_level": self.level,
            "erc_label": self.label,
            "erc_rationale": self.rationale,
            "erc_technical_barriers": self.technical_barriers,
            "erc_procedural_barriers": self.procedural_barriers,
            "erc_hfa_adjustment": self.hfa_adjustment,
        }


ERC_LABELS = {
    1: "Nenhuma",
    2: "Mínima",
    3: "Limitada",
    4: "Efetiva",
}

# Falhas de percepção
PERCEPTION_NO_BARRIER = {"P-B", "P-F"}
PERCEPTION_WEAK       = {"P-G", "P-D"}
PERCEPTION_PROC_FAIL  = {"P-H"}
PERCEPTION_OK         = {"P-A", "P-C", "P-E"}

# Falhas de objetivo
OBJECTIVE_VIOLATION   = {"O-B", "O-C"}
OBJECTIVE_RISKY       = {"O-D"}
OBJECTIVE_OK          = {"O-A"}

# Falhas de ação
ACTION_NO_BARRIER     = {"A-D", "A-E"}
ACTION_SELECTION_FAIL = {"A-F", "A-I"}
ACTION_FEEDBACK_FAIL  = {"A-C", "A-G", "A-J"}
ACTION_SLIP           = {"A-B"}
ACTION_OK             = {"A-A"}


def _count_barrier_failures(p: str, o: str, a: str) -> tuple[int, list[str]]:
    failures = []

    # Só conta como falha de barreira se a barreira técnica estava AUSENTE.
    # PERCEPTION_WEAK (P-D, P-G) = barreira presente, operador não a utilizou —
    # não conta como falha de barreira, apenas como fator atenuante.
    if p in PERCEPTION_NO_BARRIER:
        failures.append("barreira_tecnica_ausente")
    elif p in PERCEPTION_PROC_FAIL:
        failures.append("barreira_comunicacao_falhou")

    if o in OBJECTIVE_VIOLATION:
        failures.append("barreira_procedimental_violada")
    elif o in OBJECTIVE_RISKY:
        failures.append("barreira_procedimental_insuficiente")

    if a in ACTION_NO_BARRIER:
        failures.append("barreira_capacitacao_ausente")
    elif a in ACTION_SELECTION_FAIL:
        failures.append("barreira_decisao_falhou")
    elif a in ACTION_FEEDBACK_FAIL:
        failures.append("barreira_feedback_ausente")
    elif a in ACTION_SLIP:
        failures.append("barreira_execucao_deslize")

    return len(failures), failures


def _hfa_note(hfa_score: int | None) -> str:
    if hfa_score is None:
        return "Score HFA não disponível — avaliação baseada exclusivamente nas falhas SERA."
    if hfa_score >= 70:
        return (
            f"Score HFA={hfa_score} indica múltiplas falhas organizacionais/humanas simultâneas "
            "(EASA AMC 20-8). Usado como confirmação, não como determinante principal do ERC. "
            "O nível de efetividade foi determinado pelas falhas SERA identificadas."
        )
    return (
        f"Score HFA={hfa_score}. Fatores organizacionais moderados. "
        "Nível de efetividade determinado pelas falhas SERA identificadas."
    )


def calculate_erc(
    perception_code: str,
    objective_code: str,
    action_code: str,
    preconditions: list[dict] | None = None,
    hfa_score: int | None = None,
) -> ERCResult:
    p = perception_code or ""
    o = objective_code or ""
    a = action_code or ""

    n_failures, failure_types = _count_barrier_failures(p, o, a)

    # Regra 1 — Violação intencional de procedimento
    if o in OBJECTIVE_VIOLATION:
        if p in PERCEPTION_NO_BARRIER and a in (ACTION_NO_BARRIER | ACTION_SELECTION_FAIL):
            return ERCResult(
                level=1,
                label=ERC_LABELS[1],
                rationale=(
                    f"Violação deliberada de procedimento ({o}) combinada com ausência "
                    f"de barreira técnica ({p}) e falha de execução ({a}). "
                    "Nenhuma das três camadas de barreira estava efetiva no momento do evento."
                ),
                technical_barriers="Ausente ou ineficaz",
                procedural_barriers=f"Violada intencionalmente ({o})",
                hfa_adjustment=_hfa_note(hfa_score),
            )
        return ERCResult(
            level=2,
            label=ERC_LABELS[2],
            rationale=(
                f"Violação de procedimento ({o}) indica que a barreira procedimental "
                "foi ignorada. Barreiras técnicas presentes mas não suficientes para "
                f"compensar a violação. Falha de ação: {a}."
            ),
            technical_barriers="Presente mas insuficiente para compensar violação",
            procedural_barriers=f"Violada intencionalmente ({o})",
            hfa_adjustment=_hfa_note(hfa_score),
        )

    # Regra 2 — Três camadas falharam
    if n_failures >= 3:
        return ERCResult(
            level=1,
            label=ERC_LABELS[1],
            rationale=(
                f"Falhas em todas as três camadas de barreira: percepção ({p}), "
                f"objetivo ({o}), ação ({a}). Caracteriza ausência efetiva de barreiras "
                "remanescentes no momento do evento."
            ),
            technical_barriers="Ausente ou ineficaz",
            procedural_barriers="Ausente ou ineficaz",
            hfa_adjustment=_hfa_note(hfa_score),
        )

    # Regra 3 — Duas camadas falharam
    if n_failures == 2:
        if "barreira_comunicacao_falhou" in failure_types:
            return ERCResult(
                level=2,
                label=ERC_LABELS[2],
                rationale=(
                    f"Falha de comunicação ({p}) e falha adicional "
                    f"(objetivo={o}, ação={a}). Canal de comunicação não funcionou "
                    "como barreira, mas outros sistemas procedimentais estavam presentes."
                ),
                technical_barriers="Presente mas comprometida por falha de comunicação",
                procedural_barriers="Parcialmente presente",
                hfa_adjustment=_hfa_note(hfa_score),
            )
        return ERCResult(
            level=2,
            label=ERC_LABELS[2],
            rationale=(
                f"Duas camadas de barreira com falha: {', '.join(failure_types[:2])}. "
                f"Falhas SERA: percepção={p}, objetivo={o}, ação={a}. "
                "Barreiras minimamente presentes mas majoritariamente ineficazes."
            ),
            technical_barriers="Presente mas ineficaz" if p not in PERCEPTION_NO_BARRIER else "Ausente",
            procedural_barriers="Presente mas ineficaz" if o in OBJECTIVE_OK else "Violada ou insuficiente",
            hfa_adjustment=_hfa_note(hfa_score),
        )

    # Regra 4 — Apenas uma camada falhou
    if n_failures == 1:
        if a in ACTION_SLIP and o in OBJECTIVE_OK and p in PERCEPTION_OK:
            return ERCResult(
                level=4,
                label=ERC_LABELS[4],
                rationale=(
                    f"Deslize ou lapso isolado ({a}) com percepção correta ({p}) e "
                    f"objetivo adequado ({o}). As barreiras técnicas e procedimentais "
                    "estavam efetivas — a falha foi pontual na execução."
                ),
                technical_barriers="Efetiva",
                procedural_barriers="Efetiva",
                hfa_adjustment=_hfa_note(hfa_score),
            )
        return ERCResult(
            level=3,
            label=ERC_LABELS[3],
            rationale=(
                f"Falha isolada em uma camada: {failure_types[0]}. "
                f"Falhas SERA: percepção={p}, objetivo={o}, ação={a}. "
                "As demais camadas de barreira estavam funcionando."
            ),
            technical_barriers="Efetiva" if p in PERCEPTION_OK else "Limitada",
            procedural_barriers="Efetiva" if o in OBJECTIVE_OK else "Limitada",
            hfa_adjustment=_hfa_note(hfa_score),
        )

    # Regra 5 — Sem falhas de barreira
    if a in ACTION_OK and o in OBJECTIVE_OK:
        return ERCResult(
            level=4,
            label=ERC_LABELS[4],
            rationale=(
                f"Sem falhas de ação ({a}) e objetivo correto ({o}). "
                "As barreiras estavam efetivas. A falha pode ter origem em fator "
                f"não capturado pelas etapas principais (percepção: {p})."
            ),
            technical_barriers="Efetiva",
            procedural_barriers="Efetiva",
            hfa_adjustment=_hfa_note(hfa_score),
        )

    # Fallback conservador
    return ERCResult(
        level=2,
        label=ERC_LABELS[2],
        rationale=(
            f"Classificação conservadora. Falhas SERA: percepção={p}, objetivo={o}, ação={a}. "
            "Evidência insuficiente para determinar quais barreiras estavam efetivas."
        ),
        technical_barriers="Indeterminado",
        procedural_barriers="Indeterminado",
        hfa_adjustment=_hfa_note(hfa_score),
    )


def erc_from_analysis(analysis_payload: dict) -> dict:
    """
    Recebe o payload completo da análise (como montado em pipeline.py)
    e retorna os campos ERC para adicionar ao banco.

    Uso em pipeline.py — run_analysis():
        erc = erc_from_analysis(analysis_payload)
        analysis_payload.update(erc)
    """
    result = calculate_erc(
        perception_code=analysis_payload.get("perception_code", ""),
        objective_code=analysis_payload.get("objective_code", ""),
        action_code=analysis_payload.get("action_code", ""),
        preconditions=analysis_payload.get("preconditions"),
        hfa_score=None,
    )
    return result.to_dict()
