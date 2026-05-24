# SERA Engine vNext External Batch 1 Evidence Normalization A4R89 v0.2.0

Status: EVIDENCE_NORMALIZATION  
Phase: A4+R-89  
DOCS_ONLY  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_NEW_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Normalize the 12 A4+R-88 external factual extractions into common evidence categories for later trace analysis. This document does not answer any axis question and does not create or change any code.

## Evidence Categories
- timeline_sequence
- aircraft_system_state
- alert_warning_chronology
- automation_mode_state
- crew_role_pf_pm
- communication_callout
- procedure_reference
- feedback_checking
- action_execution_observable
- objective_context
- environmental_condition
- technical_condition_dominant
- source_limitation
- quarantined_conclusion

## Normalized Matrix
| extractionId | candidateId | sourceQuality | extractionConfidence | availableEvidenceCategories | strongestEvidenceCategories | missingEvidenceCategories | evidenceStrength | sourceLimitations | normalizedEvidenceSummary | excludedConclusionsPreserved |
|---|---|---|---|---|---|---|---|---|---|---|
| EXT-BATCH1-EXTRACTION-001 | A4R87-EXT-001 | HIGH | HIGH | timeline_sequence; aircraft_system_state; crew_role_pf_pm; procedure_reference; feedback_checking; action_execution_observable; environmental_condition; source_limitation; quarantined_conclusion | timeline_sequence; aircraft_system_state; procedure_reference; feedback_checking | alert_warning_chronology detail; communication_callout detail | STRONG | Full source still requires field-level trace slicing before adjudication use | Offshore low-energy approach sequence with role/procedure and feedback-checking evidence available for later trace anchoring | yes |
| EXT-BATCH1-EXTRACTION-002 | A4R87-EXT-002 | HIGH | HIGH | timeline_sequence; aircraft_system_state; alert_warning_chronology; crew_role_pf_pm; communication_callout; feedback_checking; action_execution_observable; environmental_condition; source_limitation; quarantined_conclusion | alert_warning_chronology; timeline_sequence; feedback_checking; crew_role_pf_pm | procedure_reference depth requires more granular capture | STRONG | Strong external causal language must remain quarantined | Warning-rich night-water sequence suitable for structured alert/monitoring evidence normalization | yes |
| EXT-BATCH1-EXTRACTION-003 | A4R87-EXT-003 | MEDIUM | MEDIUM | timeline_sequence; aircraft_system_state; procedure_reference; environmental_condition; source_limitation; quarantined_conclusion | environmental_condition; procedure_reference | alert_warning_chronology; communication_callout; crew_role_pf_pm detail; automation_mode_state | MEDIUM | Legacy/scanned source limits machine-readable extraction | Historical offshore approach anchor useful for context and enrichment, but not yet deep trace use | yes |
| EXT-BATCH1-EXTRACTION-004 | A4R87-EXT-004 | HIGH | HIGH | timeline_sequence; aircraft_system_state; crew_role_pf_pm; procedure_reference; feedback_checking; environmental_condition; source_limitation; quarantined_conclusion | timeline_sequence; procedure_reference; environmental_condition | alert_warning_chronology detail; communication_callout detail | STRONG | Needs field-level extraction before direct comparison against internal trace records | Repeated approach and transition sequence provides strong approach-monitoring evidence shape | yes |
| EXT-BATCH1-EXTRACTION-005 | A4R87-EXT-005 | LOW | LOW | automation_mode_state; procedure_reference; source_limitation; quarantined_conclusion | automation_mode_state | timeline_sequence; alert_warning_chronology; crew_role_pf_pm; feedback_checking | LOW | Partial access and limited report-body detail | Mode/configuration event is useful as locator for future mode-awareness evidence but not ready for deep trace work | yes |
| EXT-BATCH1-EXTRACTION-006 | A4R87-EXT-006 | HIGH | HIGH | timeline_sequence; aircraft_system_state; alert_warning_chronology; procedure_reference; objective_context; environmental_condition; action_execution_observable; source_limitation; quarantined_conclusion | procedure_reference; objective_context; alert_warning_chronology; timeline_sequence | crew_role_pf_pm fine detail; communication_callout detail | STRONG | High risk of importing probable-cause language | Strong procedure/objective-context evidence available for adversarial and future adjudication preparation | yes |
| EXT-BATCH1-EXTRACTION-007 | A4R87-EXT-007 | MEDIUM | MEDIUM | timeline_sequence; aircraft_system_state; action_execution_observable; feedback_checking; procedure_reference; environmental_condition; source_limitation; quarantined_conclusion | action_execution_observable; aircraft_system_state; feedback_checking | alert_warning_chronology; communication_callout detail; crew_role_pf_pm detail | MEDIUM | Fast-pass extraction did not fully parse detailed terminal sequence | Helideck terminal handling sequence is useful for action/feedback evidence templates | yes |
| EXT-BATCH1-EXTRACTION-008 | A4R87-EXT-008 | HIGH | HIGH | timeline_sequence; aircraft_system_state; automation_mode_state; crew_role_pf_pm; procedure_reference; feedback_checking; action_execution_observable; environmental_condition; source_limitation; quarantined_conclusion | automation_mode_state; aircraft_system_state; feedback_checking; procedure_reference | communication_callout detail | STRONG | Needs separation of automation behavior from crew interpretation evidence | Strong offshore automation/mode evidence package for later trace anchoring | yes |
| EXT-BATCH1-EXTRACTION-009 | A4R87-EXT-009 | MEDIUM | MEDIUM | timeline_sequence; aircraft_system_state; environmental_condition; technical_condition_dominant; action_execution_observable; source_limitation; quarantined_conclusion | technical_condition_dominant; environmental_condition; aircraft_system_state | crew_role_pf_pm detail; alert_warning_chronology; procedure_reference detail | MEDIUM | Post-strike parameter detail not fully normalized | Condition-dominant evidence package for overclassification control and rollback-signal awareness | yes |
| EXT-BATCH1-EXTRACTION-010 | A4R87-EXT-010 | PRELIMINARY | LOW | timeline_sequence; environmental_condition; source_limitation; quarantined_conclusion | source_limitation | aircraft_system_state; crew_role_pf_pm; alert_warning_chronology; procedure_reference; feedback_checking | LOW | Notified-event locator only; primary report absent | Source locator records offshore context but cannot support deeper evidence normalization | yes |
| EXT-BATCH1-EXTRACTION-011 | A4R87-EXT-011 | PRELIMINARY | LOW | timeline_sequence; environmental_condition; source_limitation; quarantined_conclusion | source_limitation | aircraft_system_state; crew_role_pf_pm; alert_warning_chronology; procedure_reference; feedback_checking | LOW | Notified-event locator only; primary report absent | Existing-case locator useful for source governance and enrichment routing only | yes |
| EXT-BATCH1-EXTRACTION-012 | A4R87-EXT-012 | MEDIUM | MEDIUM | timeline_sequence; aircraft_system_state; automation_mode_state; action_execution_observable; feedback_checking; procedure_reference; source_limitation; quarantined_conclusion | automation_mode_state; action_execution_observable; feedback_checking | crew_role_pf_pm fine detail; communication_callout detail | MEDIUM | Needs more granular mode/status chronology before strong use | Fixed-wing automation comparator with usable mode/status evidence and medium readiness | yes |

## Normalization Counts
- strongEvidenceStrength=5
- mediumEvidenceStrength=4
- lowEvidenceStrength=3
- excludedConclusionsPreserved=12
- newClassificationCount=0
- proposedCodeCount=0
- newReleasedCodeCount=0

