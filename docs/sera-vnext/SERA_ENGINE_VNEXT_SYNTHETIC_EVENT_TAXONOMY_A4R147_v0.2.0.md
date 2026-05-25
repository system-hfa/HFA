# SERA Engine vNext Synthetic Event Taxonomy A4R147 v0.2.0

Status: SYNTHETIC_TAXONOMY_RECORDED
Phase: A4R147
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Define the initial governed taxonomy for synthetic event types used in future SERA vNext internal testing and calibration.

## taxonomy table

| syntheticType | purpose | contaminationRisk | abstractExample | expectedMethodBehavior | prohibitedMethodBehavior |
|---|---|---|---|---|---|
| TYPE-01_DISCRETE_HF_POSITIVE | Validate clean discrete escape-point handling with human-factor signal at first departure | MEDIUM | Crew changes mode and first unsafe path deviation starts immediately | Anchor at discrete first departure; allow analysis only if evidence supports gate | Do not anchor on warning/outcome or inject hidden cause labels |
| TYPE-02_PROGRESSIVE_HF_POSITIVE | Validate progressive escape-zone handling and earliest-zone anchoring | HIGH | Trajectory degrades across a short window before critical point | Declare progressive zone and anchor at earliest documentable zone start | Do not use critical point/outcome as first departure |
| TYPE-03_TECHNICAL_NEGATIVE_CONTROL | Validate non-forcing behavior when first departure is technical | LOW | Flight-control channel fails and departure starts from system loss | Preserve technical onset and block unsupported frontline overclassification | Do not force positive frontline P/O/A by consequence hindsight |
| TYPE-04_ENVIRONMENTAL_NEGATIVE_CONTROL | Validate non-forcing behavior under dominant exogenous/environmental onset | LOW | Severe microburst onset drives first departure | Preserve environmental onset and keep human inference constrained | Do not force human-positive label without near-anchor evidence |
| TYPE-05_MIXED_TECH_HUMAN_BOUNDARY | Validate separation logic when technical and human signals coexist | HIGH | Sensor degradation plus delayed mode-management response | Separate candidate anchors and keep unresolved where separation is not supportable | Do not collapse mixed signals into single deterministic label without evidence |
| TYPE-06_SOURCE_INSUFFICIENT | Validate blocking behavior under intentionally insufficient evidence | LOW | Narrative omits exact anchor timing and actor-state details | Trigger blockers and keep unsupported outputs unresolved | Do not complete classification by guesswork |
| TYPE-07_WARNING_TRAP | Validate rejection of warning-as-escape-anchor | MEDIUM | Warning appears after unsafe path already started | Keep warning in consequence zone and anchor earlier | Do not treat first warning as automatic escape point |
| TYPE-08_OUTCOME_TRAP | Validate rejection of outcome-driven anchor selection | MEDIUM | Outcome is salient but first departure occurred earlier | Isolate pre-outcome marker and protect anchor discipline | Do not infer anchor from impact/crash endpoint |
| TYPE-09_VIOLATION_LANGUAGE_TRAP | Validate "Quando..." wording neutrality enforcement | MEDIUM | Draft uses violation language instead of observable condition | Reject or rewrite to observable neutral nucleus | Do not accept cause/violation-coded "Quando..." |
| TYPE-10_ORGANIZATIONAL_BOUNDARY | Validate separation of systemic context from frontline escape-point attribution | HIGH | Organizational scheduling pressure exists without direct frontline act at first departure | Record systemic factor and avoid unsupported frontline mapping | Do not convert systemic context into frontline P/O/A without anchor evidence |

## locks preserved

- no synthetic final case created
- no synthetic fixture created
- no real-event modification
- no releasedCode
- no downstream
- no finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations
