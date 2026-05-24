> A4+R-96 STATUS: SUPERSEDED / INVALID_FOR_REFERENCE_USE  
> Reason: this document used reconstructed/generic P/O/A questions rather than the canonical SERA/CERA decision-tree questions.  
> Author feedback: “Essas não são as perguntas do SERA.”  
> Preserved for audit history only.  
> Do not use for front-end calibration display, methodological proof, or reference-case demonstration.  
> A corrected trace must be rebuilt only from the canonical SERA/CERA question tree.  
> If the canonical tree is unavailable, the rebuild is BLOCKED.

# Reference Case Trace — REAL-EVENT-0003 — P-G

## 1. Header
- referenceCaseId: RC-REAL-EVENT-0003-PG-A4R95
- caseId: REAL-EVENT-0003
- referenceType: POSITIVE_REFERENCE_CASE
- sourceAgency: TSB Canada
- officialSourceUrl: https://www.tsb.gc.ca/eng/rapports-reports/aviation/2015/a15p0217/a15p0217.html
- aircraft: Sikorsky S-76C+ (C-GHHJ)
- operation: night helicopter approach in medevac/medical transport context
- status: REFERENCE_TRACE_DRAFT
- currentEffectiveRelease: P-G only
- releaseStatusAfterA4R92: RELEASE_MAINTAINED
- intendedUse: internal calibration and future front-end demonstration
- notFor: scientific validation claim, full causal conclusion, HFACS, Risk/ERC, recommendations

## 2. Plain-language factual summary
During a night approach to the Tofino/Long Beach area, the helicopter transitioned from a controlled profile into a low-margin state.  
After autopilot disconnection, the approach evolved into low speed, high descent rate, and rotor speed decay.  
This created near-CFIT exposure at very low altitude and reduced control margin.  
The crew recovered at very low height and later completed a landing.  
This trace uses factual operational sequence and cue availability; it does not use external probable-cause text as SERA ground truth.

## 3. Source and quarantine
### factual sources used
- TSB A15P0217 official report locator (event identity, timeline family, operational context).
- Internal structured extraction: `A4R72-B2-001` (`REAL-EVENT-BATCH2-EXTRACTION-001`).
- Internal adjudication and rationale trail: `REAL-EVENT-BATCH2-ADJUDICATION-001`.
- Question-path backfill: `QUESTIONPATH-BACKFILL-BATCH2-001`.
- Pilot release history and retrospective review: A4+R-85 and A4+R-92 docs.

### source locator
- `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md`
- `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md`
- `docs/sera-vnext/real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-001.md`
- `docs/sera-vnext/release-pilot/P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85.md`

### conclusions quarantined
- probable cause/findings labels from the external investigation.
- contributing factors as direct SERA code labels.
- safety recommendations as classification drivers.
- legal/blame framing.

### what was not used as SERA evidence
- no direct import of external conclusion text as answer key.
- no HFACS/CRM external label conversion.
- no downstream outputs.

## 4. Safe-operation escape point
- escapePointStatement: The operation crossed out of a safely monitorable night approach when, after autopilot disconnection, the profile entered combined low-speed/high-descent/rotor-decay at low height with near-terrain exposure.
- why this is the escape point: It is the last clearly identifiable boundary where available cues and monitoring still could have maintained a stable profile before margin collapse became critical.
- evidence supporting escape point:
  - autopilot disconnected during approach segment;
  - low-speed/high-descent-rate state developed;
  - rotor speed decayed;
  - recovery occurred only at extremely low height.
- uncertainty:
  - exact PF/PM micro-sequence around cue uptake and callouts is incomplete;
  - exact action-mechanism attribution remains unresolved at A-axis level.

## 5. SERA P-axis flow
### P1. Was there a relevant operational state that required perception/monitoring?
- answer: YES
- evidence: critical approach stability variables (speed, descent rate, rotor RPM, terrain margin) were operationally relevant before near-CFIT exposure.
- limitation: exact callout timing is incomplete.
- rejectedAlternative: "No relevant perceptual demand" rejected because energy/path cues were clearly safety-critical.
- result: proceed with P-axis evaluation.

### P2. Was information potentially available through instruments/parameters/context?
- answer: YES
- evidence: extraction/adjudication trace identifies available approach-energy and state-transition cues; question-path entry `P_INFO_AVAILABLE=YES`.
- limitation: degree of effective cue integration by each crew role is uncertain.
- rejectedAlternative: "Information unavailable" rejected because objective state variables were monitorable.
- result: perception/monitoring pathway remains viable.

### P3. Did degradation occur before the safe-operation escape point?
- answer: YES
- evidence: chronology shows destabilization sequence (low speed, high descent, rotor decay) before recovery at very low height.
- limitation: exact second-by-second parameter timeline not fully reconstructed in the dossier.
- rejectedAlternative: "Degradation only after unavoidable point" rejected by sequence ordering.
- result: supports pre-escape perceptual-monitoring breakdown.

### P4. Is dominant P-axis mechanism best described as situational perception/monitoring degradation?
- answer: YES (for current effective release boundary)
- evidence: A4+R-85 and A4+R-92 maintain P-G rationale with available cues and delayed/inadequate integration in critical approach segment.
- limitation: interaction with possible action mechanism is acknowledged but not isolable.
- rejectedAlternative: "Pure action failure dominant" not established strongly enough inside current P-only release boundary.
- result: P-path remains anchored in monitoring/perception boundary.

### P5. Is there enough evidence to keep P-G rather than P-C/P-F/P-H/UNRESOLVED?
- answer: YES, with limitations explicitly preserved
- evidence:
  - `QUESTIONPATH-BACKFILL-BATCH2-001` resolves `P_PATH_RESULT=P-G`;
  - A4+R-92 retrospective author review maintained approval for P-G;
  - release tracker marks effective released status as maintained.
- limitation:
  - PF/PM and callout decomposition remains incomplete.
- rejectedAlternative:
  - `P-C` rejected as primary because mode/knowledge-interpretation mechanism is not dominant in available evidence.
  - `P-F` rejected as primary because sensory/illusion mechanism alone is not the dominant evidence path.
  - `P-H` rejected as primary because communication-transfer failure is not dominant.
  - `UNRESOLVED` rejected for P because current evidence threshold was judged sufficient for maintained P-G.
- result: **P-axis maintained as P-G (current effective release boundary).**

## 6. SERA O-axis flow
### O1. Is there sufficient objective-evidence basis to release an O-axis code in this reference pack?
- answer: NO (for release boundary)
- evidence:
  - this case is maintained as a P-only effective release after A4+R-92;
  - pilot release scope remains explicitly axis-limited.
- limitation: historical draft trails include O hypotheses, but no O release gate was executed for this reference boundary.
- rejectedAlternative: releasing O-axis from historical draft path is rejected in this pack due to insufficient release-scope evidence.
- result: O-axis remains NOT_RELEASED in this reference.

### O2. Is there sufficient evidence for O-B/O-C/O-D release decision here?
- answer: NO
- evidence: no dedicated O-axis release decision artifact for this case; downstream remains locked.
- limitation: objective pathway in earlier drafts is not treated as release authority.
- rejectedAlternative: O-axis release rejected at this stage.
- result: **O-axis = NOT_RELEASED / UNRESOLVED_OR_NOT_ASSESSED_FOR_REFERENCE.**

## 7. SERA A-axis flow
### A1. Is there enough separable action evidence to classify A-axis in this reference pack?
- answer: NO
- evidence:
  - backfill notes repeatedly state PF/PM and callout timeline is insufficient for action-axis closure;
  - A remained unresolved in historical adjudication and was never released.
- limitation: action chain exists at high level but lacks mechanism granularity.
- rejectedAlternative: forcing A-code from inferred handling sequence is rejected.
- result: keep A-axis unresolved/not released.

### A2. Is action mechanism separable from perception/monitoring in available evidence?
- answer: NO (not sufficiently)
- evidence: A4R80 backfill and A4R85 release limitations explicitly preserve unresolved action mechanism.
- limitation: no complete PF/PM micro-timeline in the current source packet.
- rejectedAlternative: A-F/A-C/A-H closure rejected due to insufficient separable evidence.
- result: **A-axis = NOT_RELEASED / UNRESOLVED_OR_NOT_ASSESSED_FOR_REFERENCE.**

## 8. Preconditions/contextual factors
- not assessed for this reference trace as a released/precondition claim.
- contextual factors may be discussed descriptively, but no downstream precondition conclusion is produced in this phase.

## 9. Final classification boundary
- classified/released only: **P-G** (effective maintained release after A4+R-92).
- not released: O-axis.
- not released: A-axis.
- no case-level finalConclusion.
- no HFACS output.
- no Risk/ERC output.
- no recommendations output.

## 10. Evidence table
| evidenceId | source | factualElement | supportsWhichQuestion | limitation | quarantineNote |
|---|---|---|---|---|---|
| EV-0003-01 | REAL-EVENT-BATCH2-EXTRACTION-001 | night approach toward Tofino/Long Beach in medevac context | P1, P2 | does not isolate PF/PM micro-actions | external causal labels excluded |
| EV-0003-02 | REAL-EVENT-BATCH2-EXTRACTION-001 | autopilot disconnected during approach | P2, P3, P4 | reason for disconnect not fully decomposed | not treated as causal verdict |
| EV-0003-03 | REAL-EVENT-BATCH2-EXTRACTION-001 | low-speed/high-descent state and rotor decay | P1, P3, P4, P5 | parameter granularity is partial | no probable-cause import |
| EV-0003-04 | REAL-EVENT-BATCH2-EXTRACTION-001 | recovery at very low height after near-CFIT exposure | P3, P4 | does not alone resolve action mechanism | no recommendation import |
| EV-0003-05 | QUESTIONPATH-BACKFILL-BATCH2-001 | P-path answers preserve P-G and A unresolved | P4, P5, A1, A2 | backfill confidence medium | backfill is documentary, not automatic release |
| EV-0003-06 | P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85 + A4R92 docs | P-G was maintained by retrospective author review | P5, final boundary | scope is P-only | O/A not released by this evidence |

## 11. Rejected alternatives
- `P-C` rejected because available evidence does not make knowledge/system/mode interpretation the dominant P mechanism.
- `P-F` rejected because sensory limitation alone is not established as dominant mechanism.
- `P-H` rejected because communication-transfer failure is not dominant in current evidence.
- `UNRESOLVED` rejected for P because author-reviewed trace deemed P-G sufficiently supported for maintained release.
- O-axis release rejected due to insufficient objective release basis in this pack.
- A-axis release rejected due to insufficient separable action evidence.

## 12. Why this is a reference case
- It is the only P-axis release that remained effective after A4+R-92 retrospective review.
- It is a strong calibration example for situational perception/monitoring boundary in night approach degradation.
- It demonstrates strict separation between maintained P release and non-released O/A axes.
- It demonstrates quarantine discipline: factual use without external causal-answer import.
- It demonstrates a key boundary lesson: reference case does not equal full accident conclusion.

## 13. Front-end display notes
- cardTitle: REAL-EVENT-0003 — Night Approach Perception Boundary (P-G)
- shortLearningObjective: Show how a P-only maintained release is justified while O/A remain unreleased.
- sections to display:
  - factual summary
  - safe-operation escape point
  - P-axis trace
  - O/A not released boundary
  - evidence table
  - caveats/quarantine
  - calibration lesson
- warning:
  - do not display as final accident cause;
  - do not display as HFACS/Risk/ERC/recommendations output.

## 14. Author/reviewer decision
- authorDecision: MAINTAIN_APPROVAL
- decisionSource: A4+R-92 retrospective author review
- effectiveStatus: P-G maintained
- limitationsAcknowledged: PF/PM-action decomposition incomplete; O/A not released
- noDownstreamOpened: true
