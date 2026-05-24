# SERA Engine vNext Release Criteria for Observed Codes A4R81 v0.2.0

Status: DESIGN_ONLY  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM

## Objective
Define future release-review criteria for the codes observed in the 30 real-event corpus. This document covers only draft codes already observed in A4+R-78/A4+R-80: `P-G`, `P-C`, `P-F`, `P-H`, `O-A`, `O-C`, `O-D`, and `A-F`.

## P-G
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: information available but not monitored, checked, or integrated in time, without dominant excessive time pressure. |
| required questionPath answers | `P_INFO_AVAILABLE=YES` or strongly anchored; `P_ATTENTION_MONITORING_DEGRADED=YES`; `P_TIME_PRESSURE_DOMINANT=NO/UNCLEAR but not dominant`; `P_PATH_RESULT=P-G`. |
| minimum evidence pattern | cue or operational information existed; monitoring/checking/integration failure is more specific than weather, condition, or action failure. |
| common false-positive traps | low visibility alone; warning existence without uptake trace; bad descent profile without monitoring mechanism; PF/PM role ambiguity. |
| release blockers | source partial; source identity mismatch; only outcome severity; action mechanism masquerading as perception; dominant time pressure suggesting P-D instead. |
| example candidate cases | REAL-EVENT-0001, REAL-EVENT-0003, PH-KHB, D-HHNH, HL9294, N200BK, N109W. |
| current corpus readiness | ENOUGH_FOR_DESIGN_ONLY; future release requires author review and case-level evidence checks. |

## P-C
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: signal perceived but interpreted incorrectly due to perceptual knowledge, mode/state understanding, or knowledge-mediated perception. |
| required questionPath answers | `P_INFO_AVAILABLE=YES`; `P_KNOWLEDGE_PERCEPTION_IMPAIRED=YES`; `P_ATTENTION_MONITORING_DEGRADED` does not better explain the dominant mechanism; `P_PATH_RESULT=P-C`. |
| minimum evidence pattern | mode/state or automation cue was available; actor interpretation of that cue/state is plausibly wrong; action chain remains separate. |
| common false-positive traps | calling any automation event P-C without mode-awareness evidence; confusing action selection with perception interpretation. |
| release blockers | no cue/state evidence; action input is the only known fact; unresolved automation trace. |
| example candidate cases | REAL-EVENT-0016, N11NM. |
| current corpus readiness | NEEDS_AUTHOR_REVIEW; enough for criteria design, not automatic release. |

## P-F
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: ambiguous, illusory, or distorted perception of available signals. |
| required questionPath answers | `P_SENSORY_ACCESS_IMPAIRED=YES` or contextual equivalent; `P_KNOWLEDGE_PERCEPTION_IMPAIRED` not dominant; `P_ATTENTION_MONITORING_DEGRADED` considered but rejected as less specific; `P_PATH_RESULT=P-F`. |
| minimum evidence pattern | night/visual/sea/terrain or similar perceptual environment plausibly distorts perceived attitude, height, or spatial relation. |
| common false-positive traps | low visibility alone; weather alone; no evidence that perception was distorted rather than unmonitored. |
| release blockers | no sensory/perceptual distortion anchor; P-G is equally or more specific; source lacks environmental detail. |
| example candidate cases | G-BHYB. |
| current corpus readiness | NEEDS_AUTHOR_REVIEW; single observed case means no automatic release pattern. |

## P-H
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: incomplete, ambiguous, incorrect, delayed, or missing transmitted information. |
| required questionPath answers | `P_COMMUNICATION_INFORMATION_PROBLEM=YES`; communication/information chain is more specific than monitoring alone; `P_PATH_RESULT=P-H`. |
| minimum evidence pattern | explicit communication, information transmission, instruction, clearance, motion information, or alignment information issue. |
| common false-positive traps | generic CRM weakness; coordination gap without information content; monitoring lapse mislabeled as communication. |
| release blockers | no information-chain anchor; PF/PM attribution unresolved; source needs enrichment. |
| example candidate cases | PR-CHI, BS211-Q400. |
| current corpus readiness | NEEDS_AUTHOR_REVIEW; PR-CHI needs enrichment, BS211 is stronger but still draft-only. |

## O-A
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: compatible operational objective without positive evidence of objective failure. |
| required questionPath answers | `O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION=YES`; deviation and inadequate-objective questions are `NO` or bounded `UNCLEAR`; `O_PATH_RESULT=O-A`. |
| minimum evidence pattern | target operation, emergency response, approach, landing, taxi, or continuation goal is identifiable and not positively shown as unsafe objective/violation. |
| common false-positive traps | using O-A as default for unknown objective; converting non-existent Objective alternatives into O-A; ignoring weak O-D/O-C signals. |
| release blockers | objective evidence is unknown; source partial; source identity mismatch; O-C/O-D evidence unresolved; O-A used as fallback. |
| example candidate cases | Most O-axis draft cases in the corpus, including Thebaud, Tofino, N8DX, N56RD, G-BHYB, N11NM, and technical-dominant negative controls. |
| current corpus readiness | ENOUGH_FOR_DESIGN_ONLY; not automatic release despite 22 observed drafts. |

## O-C
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: exceptional or circumstantial conscious deviation from known rule, procedure, clearance, or operational constraint. |
| required questionPath answers | `O_CONSCIOUS_RULE_DEVIATION_EVIDENCE=YES`; `O_EXCEPTIONAL_DEVIATION_EVIDENCE=YES/UNCLEAR but not routine`; `O_ROUTINE_DEVIATION_EVIDENCE=NO`; `O_PATH_RESULT=O-C`. |
| minimum evidence pattern | known instruction/rule/procedure plus factual anchor showing exceptional departure or non-compliance, without treating report conclusion as expected value. |
| common false-positive traps | assuming violation from unstable outcome; inferring consciousness from severity; using O-C when O-D or O-A is better supported. |
| release blockers | rule/procedure not identified; awareness not evidenced; only one corpus draft; author uncertainty remains. |
| example candidate cases | BS211-Q400. |
| current corpus readiness | NEEDS_AUTHOR_REVIEW / NOT_ENOUGH_FOR_RELEASE. |

## O-D
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: less conservative efficiency/economy/operational-gain objective without explicit formal violation proof. |
| required questionPath answers | `O_NON_VIOLATION_INADEQUATE_OBJECTIVE=YES`; conscious rule deviation not sufficiently proven for O-C; `O_PATH_RESULT=O-D`. |
| minimum evidence pattern | continuation, operational gain, mission pressure, economy, or less conservative choice is factually anchored; violation evidence remains insufficient. |
| common false-positive traps | treating any continued approach as O-D; importing report probable cause; ignoring O-C if conscious rule deviation is better evidenced. |
| release blockers | no objective-gain anchor; only adverse weather/outcome; rule-awareness evidence points to O-C instead. |
| example candidate cases | HL9294, N109W. |
| current corpus readiness | ENOUGH_FOR_DESIGN_ONLY; release would still require careful author review. |

## A-F
| item | criterion |
|---|---|
| definition reference | SERA-PT v1.0: wrong selection among known alternatives, without dominant excessive time pressure. |
| required questionPath answers | `A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED=YES`; `A_ACTION_APPROPRIATE_TO_SITUATION=NO`; `A_ACTION_SELECTION_FAILURE=YES`; `A_TIME_PRESSURE_DOMINANT=NO/UNCLEAR but not dominant`; `A_PATH_RESULT=A-F`. |
| minimum evidence pattern | available alternatives are identifiable; selected option or flight path is factually anchored as inappropriate; execution/selection boundary is clear enough. |
| common false-positive traps | any undesirable path labeled wrong selection; action inferred from outcome; PF/PM or CRM timeline missing; dominant time pressure suggesting A-I. |
| release blockers | only one observed A-F draft; cockpit transcript/CRM detail still relevant; actor/action uncertainty not fully eliminated. |
| example candidate cases | BS211-Q400. |
| current corpus readiness | NOT_ENOUGH_FOR_RELEASE; eligible only for author review in a future pilot. |

## Design Conclusion
The observed-code set is sufficient to design criteria. It is not sufficient to authorize release. Rare codes (`A-F`, `O-C`, `P-F`) require especially careful author review; high-frequency `O-A` requires a guardrail against default/fallback use.
